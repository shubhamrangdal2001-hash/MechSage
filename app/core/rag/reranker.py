"""Cross-Encoder Reranker for MechSage.

Re-scores stage 1 candidates using a local cross-encoder model
for optimal precision.
"""

from __future__ import annotations

import logging
from typing import Any

from sentence_transformers import CrossEncoder

from app.core.rag.config import RAGConfig

logger = logging.getLogger(__name__)


class CrossEncoderReranker:
    """Uses a local Cross-Encoder transformer to rank retrieval candidates."""

    def __init__(self, config: RAGConfig):
        """Initialize and load the Cross-Encoder model."""
        self.config = config
        logger.info(f"[Reranker] Loading Cross-Encoder: {self.config.reranker_model}...")
        self.model = CrossEncoder(self.config.reranker_model)
        logger.info("[Reranker] Loaded successfully.")

    def rerank(self, query: str, candidates: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """Rerank candidates based on joint query-passage attention.

        Args:
            query: The user query string.
            candidates: Fused list of candidate results.

        Returns:
            Reranked candidate list sorted by cross-encoder score.
            Candidates with score < min_reranker_score are filtered out
            before the top-k cutoff to prevent garbage passages passing through.
        """
        if not candidates:
            return []

        # Prepare pairs for cross-encoder inference
        pairs = [[query, c["text"]] for c in candidates]
        
        # Predict relevance scores (usually sigmoidal logits)
        scores = self.model.predict(pairs)
        
        # Attach scores to candidates
        for idx, score in enumerate(scores):
            candidates[idx]["rerank_score"] = float(score)
            
        # Filter out clearly irrelevant candidates (negative scores indicate no relevance)
        # min_reranker_score is -2.0 by default — generous enough to not drop true positives
        min_score = self.config.min_reranker_score
        filtered = [c for c in candidates if c["rerank_score"] >= min_score]

        if not filtered:
            logger.warning(
                "[Reranker] All %d candidates scored below threshold %.1f. "
                "Returning empty list — pipeline will trigger NO_RELEVANT_PASSAGE.",
                len(candidates), min_score,
            )
            return []

        # Sort by rerank score in descending order and apply top-k cutoff
        reranked = sorted(filtered, key=lambda x: x["rerank_score"], reverse=True)
        return reranked[:self.config.reranker_top_k]
