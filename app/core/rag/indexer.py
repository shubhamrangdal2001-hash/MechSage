"""ChromaDB HNSW Indexer for MechSage.

Loads chunked data, generates embeddings, and indexes them in ChromaDB
using HNSW configuration.
"""

from __future__ import annotations

from typing import Any

import chromadb
from chromadb.config import Settings

from app.core.rag.chunking import Chunk, chunk_knowledge_base
from app.core.rag.config import RAGConfig
from app.core.rag.embedding import EmbeddingModel


class ChromaIndexer:
    """Manages the creation and updates of the ChromaDB HNSW vector index."""

    def __init__(self, config: RAGConfig, embed_model: EmbeddingModel):
        """Initialize indexer with config and embedding model."""
        self.config = config
        self.embed_model = embed_model
        
        # Ensure persist directory exists
        self.config.chroma_persist_dir.mkdir(parents=True, exist_ok=True)
        
        # Initialize persistent Chroma client
        self.client = chromadb.PersistentClient(
            path=str(self.config.chroma_persist_dir),
            settings=Settings(anonymized_telemetry=False)
        )

    def delete_collection(self) -> None:
        """Delete the existing collection to rebuild from scratch."""
        try:
            self.client.delete_collection(self.config.collection_name)
            print(f"[Indexer] Collection '{self.config.collection_name}' deleted.")
        except Exception:
            # Collection may not exist yet, ignore
            pass

    def build_index(self, chunks: list[Chunk]) -> chromadb.Collection:
        """Create collection, generate embeddings, and insert chunks.

        Configures HNSW parameters in metadata.
        """
        # Re-build collection
        self.delete_collection()
        
        # Setup HNSW metadata overrides
        hnsw_metadata = {
            "hnsw:space": self.config.distance_metric,
            "hnsw:construction_ef": self.config.hnsw_ef_construction,
            "hnsw:M": self.config.hnsw_m,
            "hnsw:search_ef": self.config.hnsw_ef_search
        }
        
        print(f"[Indexer] Creating collection '{self.config.collection_name}' with HNSW settings: {hnsw_metadata}")
        collection = self.client.create_collection(
            name=self.config.collection_name,
            metadata=hnsw_metadata
        )
        
        if not chunks:
            print("[Indexer] No chunks to index.")
            return collection
            
        print(f"[Indexer] Generating embeddings for {len(chunks)} chunks...")
        texts = [chunk.text for chunk in chunks]
        embeddings = self.embed_model.embed(texts)
        
        # Prepare data for Chroma
        ids = [chunk.chunk_id for chunk in chunks]
        metadatas: list[dict[str, Any]] = []
        for chunk in chunks:
            # Flatten list fields into comma-separated strings for Chroma metadata support
            meta = {
                "chunk_type": chunk.chunk_type,
                "parent_id": chunk.parent_id,
                "entry_id": chunk.entry_id,
                "fault_mode": chunk.fault_mode,
                "components": ",".join(chunk.components),
                "sensor_cues": ",".join(chunk.sensor_cues),
                "asset_type": chunk.asset_type
            }
            metadatas.append(meta)
            
        print(f"[Indexer] Adding {len(chunks)} documents to ChromaDB...")
        collection.add(
            ids=ids,
            embeddings=embeddings.tolist(),
            documents=texts,
            metadatas=metadatas
        )
        
        print(f"[Indexer] Successfully indexed {len(chunks)} chunks.")
        return collection

    def get_collection(self) -> chromadb.Collection:
        """Retrieve the existing collection."""
        return self.client.get_collection(name=self.config.collection_name)


if __name__ == "__main__":
    # Test index building flow
    config = RAGConfig()
    embed_model = EmbeddingModel(provider=config.embedding_provider)
    
    # Chunk the expanded knowledge base
    chunks = chunk_knowledge_base(config.kb_path)
    
    # Index
    indexer = ChromaIndexer(config, embed_model)
    collection = indexer.build_index(chunks)
    
    print(f"Collection items count: {collection.count()}")
