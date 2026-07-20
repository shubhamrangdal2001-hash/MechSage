"""RAG Pipeline Orchestrator for MechSage.

Implements the manual_retrieval_rag tool interface conforming to the project contracts.
"""

from __future__ import annotations

import logging
import threading
import time
import traceback
from typing import Any, Union

import numpy as np

logger = logging.getLogger(__name__)

from app.core.rag.chunking import chunk_knowledge_base, get_parent_chunks
from app.core.rag.config import RAGConfig
from app.core.rag.embedding import EmbeddingModel
from app.core.rag.indexer import ChromaIndexer
from app.core.rag.reranker import CrossEncoderReranker
from app.core.rag.retriever import HybridRetriever


class MechSageRAGPipeline:
    """Orchestrates chunking, indexing, hybrid retrieval, reranking, and parent retrieval."""

    def __init__(self, config: RAGConfig, rebuild_index: bool = False):
        """Initialize the pipeline, loading necessary models and indexing if required."""
        self.config = config
        self.embed_model = EmbeddingModel(provider=self.config.embedding_provider)
        self.indexer = ChromaIndexer(self.config, self.embed_model)
        
        # Load chunks from knowledge base
        self.chunks = chunk_knowledge_base(self.config.kb_path)
        self.parent_lookup = get_parent_chunks(self.chunks)
        
        # Initialize or rebuild collection
        if rebuild_index:
            self.collection = self.indexer.build_index(self.chunks)
        else:
            try:
                self.collection = self.indexer.get_collection()
            except Exception:
                logger.warning("[RAGPipeline] Collection not found. Building new index...")
                self.collection = self.indexer.build_index(self.chunks)
                
        # Initialize retriever and reranker
        self.retriever = HybridRetriever(
            self.config, self.collection, self.embed_model, self.chunks
        )
        self.reranker = CrossEncoderReranker(self.config)

        # Pre-compute and cache parent chunk embeddings to avoid re-embedding on every search call.
        # Parent texts are static — no need to recompute them at query time.
        logger.info("[RAGPipeline] Pre-computing parent chunk embeddings...")
        parent_ids = list(self.parent_lookup.keys())
        parent_texts = [self.parent_lookup[pid].text for pid in parent_ids]
        parent_vecs = self.embed_model.embed(parent_texts)  # shape: (n_parents, dim)
        self._parent_vector_cache: dict[str, np.ndarray] = {
            pid: parent_vecs[i] for i, pid in enumerate(parent_ids)
        }
        logger.info(f"[RAGPipeline] Cached {len(self._parent_vector_cache)} parent embeddings.")

    def search(
        self,
        query: str,
        degrading_sensors: list[str] = None,
        fault_hypothesis: str = "",
        top_k: int = 3,
        asset_filter: str | None = None
    ) -> Union[dict[str, Any], list[dict[str, Any]]]:
        """Orchestrate the retrieval pipeline according to the manual_retrieval_rag contract.

        Args:
            query: User search query.
            degrading_sensors: List of sensors showing anomalies (e.g. ["s3", "s11"]).
            fault_hypothesis: Predicted/hypothesized fault mode.
            top_k: Number of final passages to return.
            asset_filter: Optional filter to restrict search to 'turbofan' or 'milling_machine' corpus.

        Returns:
            Dict conforming to output schema, or error dict.
        """
        start_time = time.perf_counter()
        
        # Ensure we have a valid index/collection
        if not self.collection:
            return {
                "error_code": "CORPUS_UNAVAILABLE",
                "message": "RAG index is not available or reachable."
            }
            
        # Combine inputs to form a highly descriptive query if sparse inputs are provided
        search_terms = []
        if query:
            search_terms.append(query)
        if fault_hypothesis:
            search_terms.append(fault_hypothesis)
        if degrading_sensors:
            search_terms.extend(degrading_sensors)
            
        combined_query = " ".join(search_terms) if search_terms else query
        
        try:
            # 1. Stage 1: Hybrid Retrieval
            candidates = self.retriever.retrieve(combined_query, asset_filter=asset_filter)
            if not candidates:
                return {
                    "error_code": "NO_RELEVANT_PASSAGE",
                    "message": f"All passages score < {self.config.min_relevance_score:.2f} cosine similarity"
                }
                
            # 2. Stage 2: Reranking
            reranked_candidates = self.reranker.rerank(combined_query, candidates)
            
            # 3. Retrieve parents and calculate cosine similarity
            retrieved_passages = []
            seen_parents = set()
            
            query_vector = self.embed_model.embed_query(combined_query)
            
            for cand in reranked_candidates:
                parent_id = cand["metadata"]["parent_id"]
                if parent_id in seen_parents:
                    continue
                seen_parents.add(parent_id)
                
                parent_chunk = self.parent_lookup[parent_id]
                
                # Use pre-cached parent embedding — avoids re-embedding on every search call.
                # Both local and OpenAI embeddings are L2-normalized, so dot product == cosine sim.
                parent_vector = self._parent_vector_cache[parent_id]
                cosine_sim = float(np.dot(query_vector, parent_vector))
                
                retrieved_passages.append({
                    "doc_ref": parent_chunk.entry_id,
                    "fault_mode": parent_chunk.fault_mode,
                    "text": parent_chunk.text,
                    "relevance_score": cosine_sim
                })
                
            # Sort passages by cosine similarity descending
            retrieved_passages = sorted(
                retrieved_passages, key=lambda x: x["relevance_score"], reverse=True
            )
            
            # Apply top-k limit
            retrieved_passages = retrieved_passages[:top_k]
            
            # Check relevance threshold against configurable min_relevance_score
            if not retrieved_passages or retrieved_passages[0]["relevance_score"] < self.config.min_relevance_score:
                return {
                    "error_code": "NO_RELEVANT_PASSAGE",
                    "message": f"All passages score < {self.config.min_relevance_score:.2f} cosine similarity"
                }
                
            latency_ms = int((time.perf_counter() - start_time) * 1000)
            
            return {
                "retrieved_passages": retrieved_passages,
                "retrieval_latency_ms": latency_ms,
                "corpus_version": "2.0.0"
            }
            
        except Exception as e:
            traceback.print_exc()
            return {
                "error_code": "CORPUS_UNAVAILABLE",
                "message": f"Internal RAG pipeline error: {str(e)}"
            }


# Module-level singleton: avoids cold-init (model load + BM25 build) on every call.
_PIPELINE_SINGLETON: MechSageRAGPipeline | None = None
_PIPELINE_LOCK = threading.Lock()  # Guards singleton creation against concurrent requests


def get_pipeline(config: RAGConfig | None = None, rebuild_index: bool = False) -> MechSageRAGPipeline:
    """Return the shared pipeline singleton, initialising it on first call.

    Thread-safe: uses a lock to prevent double-initialisation under concurrent
    requests (e.g. FastAPI with multiple workers sharing the same process).

    Args:
        config: Optional RAGConfig override. Uses default if None.
        rebuild_index: Force a full index rebuild (useful for tests / re-indexing).

    Returns:
        The shared MechSageRAGPipeline instance.
    """
    global _PIPELINE_SINGLETON
    if _PIPELINE_SINGLETON is None or rebuild_index:
        with _PIPELINE_LOCK:
            # Double-checked locking: re-check inside the lock to avoid
            # a second thread creating a new instance after the first finishes.
            if _PIPELINE_SINGLETON is None or rebuild_index:
                _config = config or RAGConfig()
                _PIPELINE_SINGLETON = MechSageRAGPipeline(_config, rebuild_index=rebuild_index)
    return _PIPELINE_SINGLETON


# Conforms to manual_retrieval_rag tool interface
def manual_retrieval_rag(
    query: str,
    degrading_sensors: list[str] = None,
    fault_hypothesis: str = "",
    top_k: int = 3,
    asset_id: str = ""
) -> dict[str, Any]:
    """Canonical entry point wrapper matching project specifications.

    Uses a module-level singleton pipeline to avoid 3-5 second cold-init on every call.
    Uses asset_id to apply scope filtering (turbofan vs milling_machine).
    """
    asset_filter = None
    if asset_id:
        asset_id_lower = asset_id.lower()
        # Ironside Manufacturing machine IDs take priority
        if any(kw in asset_id_lower for kw in (
            "ism", "cnc", "hyd", "gbx", "cmr", "cvy", "ironside", "wo-"
        )):
            asset_filter = "ironside"
            logger.info(
                f"[manual_retrieval_rag] Scoping search to 'ironside' documents "
                f"based on asset_id '{asset_id}'"
            )
        elif any(kw in asset_id_lower for kw in ("engine", "unit", "fd0")):
            asset_filter = "turbofan"
            logger.info(f"[manual_retrieval_rag] Scoping search to 'turbofan' documents based on asset_id '{asset_id}'")
        elif any(kw in asset_id_lower for kw in ("machine", "milling", "tool")):
            asset_filter = "milling_machine"
            logger.info(f"[manual_retrieval_rag] Scoping search to 'milling_machine' documents based on asset_id '{asset_id}'")
        else:
            logger.warning(
                f"[manual_retrieval_rag] Unknown asset_id '{asset_id}' pattern. "
                "Retrieving without scope filter."
            )
            
    pipeline = get_pipeline()
    return pipeline.search(
        query=query,
        degrading_sensors=degrading_sensors,
        fault_hypothesis=fault_hypothesis,
        top_k=top_k,
        asset_filter=asset_filter
    )


if __name__ == "__main__":
    # Test query
    config = RAGConfig()
    pipeline = MechSageRAGPipeline(config, rebuild_index=True)
    
    result = pipeline.search(
        query="rising s3 temperature anomalies observed",
        degrading_sensors=["s3"],
        fault_hypothesis="high pressure compressor degradation"
    )
    print("Search Result:")
    import json
    print(json.dumps(result, indent=2))
