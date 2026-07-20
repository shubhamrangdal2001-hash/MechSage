"""Embedding Module for MechSage RAG Pipeline.

Supports two providers:
1. Local: sentence-transformers (all-MiniLM-L6-v2) — free, no API key
2. OpenAI: text-embedding-3-small — requires OPENAI_API_KEY env var

The local model is the default. It runs on CPU and produces 384-dim vectors.
Quality is slightly lower than OpenAI but sufficient for a 30-entry corpus.
"""

from __future__ import annotations

import os
from typing import Optional

import numpy as np


class EmbeddingModel:
    """Unified embedding interface for local and OpenAI models."""

    def __init__(self, provider: str = "local", model_name: Optional[str] = None):
        """Initialize the embedding model.

        Args:
            provider: "local" for sentence-transformers, "openai" for OpenAI API.
            model_name: Model name override. Defaults to config-driven model.
        """
        self.provider = provider

        if provider == "local":
            from sentence_transformers import SentenceTransformer

            self.model_name = model_name or "all-MiniLM-L6-v2"
            print(f"[Embedding] Loading local model: {self.model_name}...")
            self._model = SentenceTransformer(self.model_name)
            self.dimension = self._model.get_sentence_embedding_dimension()
            print(f"[Embedding] Loaded. Dimension: {self.dimension}")

        elif provider == "openai":
            try:
                import openai
            except ImportError:
                raise ImportError("Install openai package: pip install openai")

            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                raise ValueError(
                    "OPENAI_API_KEY environment variable is required for OpenAI embeddings."
                )

            self.model_name = model_name or "text-embedding-3-small"
            self._client = openai.OpenAI(api_key=api_key)
            self.dimension = 1536
            print(f"[Embedding] Using OpenAI model: {self.model_name} (dim={self.dimension})")

        else:
            raise ValueError(f"Unknown embedding provider: {provider}. Use 'local' or 'openai'.")

    def embed(self, texts: list[str]) -> np.ndarray:
        """Embed a list of texts into dense vectors.

        Args:
            texts: List of text strings to embed.

        Returns:
            numpy array of shape (len(texts), dimension).
        """
        if not texts:
            # Return correctly shaped empty array — shape (0, dimension) not (0,)
            return np.empty((0, self.dimension), dtype=np.float32)

        if self.provider == "local":
            return self._embed_local(texts)
        else:
            return self._embed_openai(texts)

    def embed_query(self, query: str) -> np.ndarray:
        """Embed a single query string.

        Args:
            query: The query text.

        Returns:
            numpy array of shape (dimension,).
        """
        result = self.embed([query])
        return result[0]

    def _embed_local(self, texts: list[str]) -> np.ndarray:
        """Embed using sentence-transformers (local CPU)."""
        embeddings = self._model.encode(
            texts,
            show_progress_bar=False,
            normalize_embeddings=True,  # L2-normalize for cosine similarity
        )
        return np.array(embeddings, dtype=np.float32)

    def _embed_openai(self, texts: list[str]) -> np.ndarray:
        """Embed using OpenAI API with L2-normalization to match local model output."""
        # OpenAI has a batch limit of 2048 texts per call
        all_embeddings = []
        batch_size = 100

        for i in range(0, len(texts), batch_size):
            batch = texts[i : i + batch_size]
            response = self._client.embeddings.create(
                model=self.model_name,
                input=batch,
            )
            batch_embeddings = [item.embedding for item in response.data]
            all_embeddings.extend(batch_embeddings)

        arr = np.array(all_embeddings, dtype=np.float32)
        # L2-normalize so dot product == cosine similarity (consistent with local model)
        norms = np.linalg.norm(arr, axis=1, keepdims=True)
        norms = np.where(norms == 0, 1.0, norms)  # avoid division by zero
        return arr / norms


if __name__ == "__main__":
    # Quick test with local model
    model = EmbeddingModel(provider="local")

    test_texts = [
        "Rising HPC outlet temperature indicates compressor degradation",
        "Bearing vibration amplitude is increasing",
        "Fan imbalance detected from vibration pattern",
    ]

    embeddings = model.embed(test_texts)
    print(f"Embedded {len(test_texts)} texts → shape: {embeddings.shape}")

    # Cosine similarity between first two
    from numpy.linalg import norm

    sim = np.dot(embeddings[0], embeddings[1]) / (
        norm(embeddings[0]) * norm(embeddings[1])
    )
    print(f"Cosine sim (HPC vs bearing): {sim:.4f}")

    sim2 = np.dot(embeddings[0], embeddings[2]) / (
        norm(embeddings[0]) * norm(embeddings[2])
    )
    print(f"Cosine sim (HPC vs fan): {sim2:.4f}")
