"""RAG Pipeline Configuration for MechSage.

Centralizes all settings for the RAG pipeline components.
"""

from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional


@dataclass
class RAGConfig:
    """Configuration for the MechSage RAG pipeline."""

    # --- Paths ---
    kb_path: Path = field(
        default_factory=lambda: Path(__file__).parent / "knowledge_base" / "knowledge_base_v2.json"
    )
    chroma_persist_dir: Path = field(
        default_factory=lambda: Path(__file__).parent / "chroma_db"
    )
    test_queries_path: Path = field(
        default_factory=lambda: Path(__file__).parent / "test_queries.json"
    )
    abstain_queries_path: Path = field(
        default_factory=lambda: Path(__file__).parent / "abstain_queries.json"
    )
    robustness_queries_path: Path = field(
        default_factory=lambda: Path(__file__).parent / "robustness_queries.json"
    )

    # --- Embedding ---
    embedding_model: str = "all-MiniLM-L6-v2"  # Local free model (no API key needed)
    # Set to "openai" and provide OPENAI_API_KEY env var to use text-embedding-3-small
    embedding_provider: str = "local"  # "local" or "openai"
    openai_embedding_model: str = "text-embedding-3-small"
    embedding_dimension: int = 384  # 384 for MiniLM, 1536 for OpenAI

    # --- LLM Generation (OpenRouter) ---
    llm_provider: str = "openrouter"  # Uses OpenAI-compatible API via OpenRouter
    openrouter_model: str = "anthropic/claude-sonnet-4-5"  # Model slug from openrouter.ai/models
    openrouter_base_url: str = "https://openrouter.ai/api/v1"

    # --- ChromaDB / HNSW ---
    collection_name: str = "mechsage_manuals"
    hnsw_m: int = 16
    hnsw_ef_construction: int = 200
    hnsw_ef_search: int = 50
    distance_metric: str = "cosine"

    # --- Retrieval ---
    dense_top_k: int = 10  # Dense retrieval candidates
    bm25_top_k: int = 10  # BM25 retrieval candidates
    rrf_k: int = 60  # RRF constant
    final_top_k: int = 3  # Final results after reranking

    # --- Reranker ---
    reranker_model: str = "cross-encoder/ms-marco-MiniLM-L-6-v2"
    reranker_top_k: int = 3  # Top-k after reranking
    # Cross-encoder score floor. Scores are unbounded logits; genuinely irrelevant
    # passages typically score < -2.0. Set to -inf to disable filtering.
    min_reranker_score: float = -15.0

    # --- Quality thresholds (from MechSage design spec) ---
    # Note: threshold raised from 0.40 → 0.42 after near-miss audit revealed
    # "compressor map and surge line" (design-adjacent, not in KB) scored 0.4039.
    # All valid KB queries score ≥ 0.50, so this change does NOT affect true positives.
    min_relevance_score: float = 0.42  # Below this → NO_RELEVANT_PASSAGE
    confidence_cap_no_passage: float = 0.60  # Confidence cap when no passage found
    confidence_cap_no_corpus: float = 0.50  # Confidence cap when corpus unavailable

    def __post_init__(self):
        """Resolve paths and validate config."""
        self.kb_path = Path(self.kb_path)
        self.chroma_persist_dir = Path(self.chroma_persist_dir)

        # Auto-detect OpenAI if key is available
        import os
        if os.getenv("OPENAI_API_KEY") and self.embedding_provider == "local":
            print("[RAGConfig] OPENAI_API_KEY detected. Set embedding_provider='openai' to use it.")

        # Set dimension based on provider
        if self.embedding_provider == "openai":
            self.embedding_dimension = 1536
        else:
            self.embedding_dimension = 384
