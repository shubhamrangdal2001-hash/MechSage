"""Hybrid Retriever for MechSage.

Combines Dense retrieval (ChromaDB) and Sparse retrieval (BM25)
using Reciprocal Rank Fusion (RRF).
"""

from __future__ import annotations

import re
from typing import Any

import chromadb
import numpy as np
from rank_bm25 import BM25Okapi

from app.core.rag.chunking import Chunk
from app.core.rag.config import RAGConfig
from app.core.rag.embedding import EmbeddingModel


def tokenize(text: str) -> list[str]:
    """Simple alphanumeric lower-cased tokenizer."""
    return re.findall(r"\w+", text.lower())


class HybridRetriever:
    """Combines semantic vector search with keyword-based BM25 retrieval."""

    def __init__(
        self,
        config: RAGConfig,
        collection: chromadb.Collection,
        embed_model: EmbeddingModel,
        chunks: list[Chunk]
    ):
        """Initialize retriever with configuration, collections, and base chunks."""
        self.config = config
        self.collection = collection
        self.embed_model = embed_model
        self.chunks = chunks
        self.chunk_lookup = {c.chunk_id: c for c in chunks}
        
        # Build BM25 index over the chunks
        self.corpus_texts = [c.text for c in chunks]
        self.tokenized_corpus = [tokenize(t) for t in self.corpus_texts]
        self.bm25 = BM25Okapi(self.tokenized_corpus)

    def retrieve_dense(self, query: str, top_k: int, where_filter: dict | None = None) -> list[dict[str, Any]]:
        """Perform semantic search using ChromaDB HNSW."""
        query_vector = self.embed_model.embed_query(query).tolist()
        
        results = self.collection.query(
            query_embeddings=[query_vector],
            n_results=top_k,
            where=where_filter,
            include=["documents", "metadatas", "distances"]
        )
        
        dense_results = []
        if results["ids"] and results["ids"][0]:
            ids = results["ids"][0]
            metadatas = results["metadatas"][0]
            distances = results["distances"][0]
            documents = results["documents"][0]
            
            for i in range(len(ids)):
                # Distances in Chroma for cosine space are 1 - cosine_similarity.
                # Let's keep it as is or transform to a standard similarity score.
                dense_results.append({
                    "chunk_id": ids[i],
                    "text": documents[i],
                    "metadata": metadatas[i],
                    "raw_score": distances[i],
                    "retriever": "dense"
                })
        return dense_results

    def retrieve_sparse(self, query: str, top_k: int, asset_filter: str | None = None) -> list[dict[str, Any]]:
        """Perform keyword search using BM25, optionally filtering by asset type."""
        tokenized_query = tokenize(query)
        scores = self.bm25.get_scores(tokenized_query)
        top_indices = np.argsort(scores)[::-1][:top_k]
        
        sparse_results = []
        for idx in top_indices:
            score = scores[idx]
            if score <= 0:
                continue  # Skip chunks with zero keyword overlap
            chunk = self.chunks[idx]
            
            # Apply asset filter if provided (always include general guidelines)
            if asset_filter and chunk.asset_type not in [asset_filter, "general"]:
                continue
                
            sparse_results.append({
                "chunk_id": chunk.chunk_id,
                "text": chunk.text,
                "metadata": {
                    "chunk_type": chunk.chunk_type,
                    "parent_id": chunk.parent_id,
                    "entry_id": chunk.entry_id,
                    "fault_mode": chunk.fault_mode,
                    "asset_type": chunk.asset_type,
                },
                "raw_score": float(score),
                "retriever": "sparse"
            })
        return sparse_results

    def reciprocal_rank_fusion(
        self,
        dense_results: list[dict[str, Any]],
        sparse_results: list[dict[str, Any]]
    ) -> list[dict[str, Any]]:
        """Merge dense and sparse search rankings using Reciprocal Rank Fusion (RRF)."""
        rrf_scores: dict[str, float] = {}
        rrf_k = self.config.rrf_k
        
        # Track ranks for each system
        for rank, res in enumerate(dense_results, start=1):
            cid = res["chunk_id"]
            rrf_scores[cid] = rrf_scores.get(cid, 0.0) + (1.0 / (rrf_k + rank))
            
        for rank, res in enumerate(sparse_results, start=1):
            cid = res["chunk_id"]
            rrf_scores[cid] = rrf_scores.get(cid, 0.0) + (1.0 / (rrf_k + rank))
            
        # Sort chunks by final RRF score
        sorted_chunk_ids = sorted(rrf_scores.keys(), key=lambda x: rrf_scores[x], reverse=True)
        
        fused_results = []
        for cid in sorted_chunk_ids:
            chunk = self.chunk_lookup[cid]
            fused_results.append({
                "chunk_id": chunk.chunk_id,
                "text": chunk.text,
                "rrf_score": rrf_scores[cid],
                "metadata": {
                    "chunk_type": chunk.chunk_type,
                    "parent_id": chunk.parent_id,
                    "entry_id": chunk.entry_id,
                    "fault_mode": chunk.fault_mode,
                    "components": chunk.components,
                    "sensor_cues": chunk.sensor_cues,
                    "asset_type": chunk.asset_type
                }
            })
        return fused_results

    def retrieve(self, query: str, asset_filter: str | None = None) -> list[dict[str, Any]]:
        """Execute hybrid search returning fused top candidate chunks, optionally filtered by asset type."""
        where_filter = None
        if asset_filter:
            where_filter = {"asset_type": {"$in": [asset_filter, "general"]}}
            
        dense = self.retrieve_dense(query, self.config.dense_top_k, where_filter=where_filter)
        sparse = self.retrieve_sparse(query, self.config.bm25_top_k, asset_filter=asset_filter)
        return self.reciprocal_rank_fusion(dense, sparse)
