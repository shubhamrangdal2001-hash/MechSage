# ── Stage 1: Build dependencies ───────────────────────────────────────────────
FROM python:3.11-slim AS builder

WORKDIR /build

# Install system build tools (needed by chromadb, lightgbm, sentence-transformers)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    g++ \
    libgomp1 \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --prefix=/install -r requirements.txt


# ── Stage 2: Production runtime ────────────────────────────────────────────────
FROM python:3.11-slim AS runtime

WORKDIR /app

# Runtime system deps only (libgomp1 for LightGBM shared lib)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy installed Python packages from builder stage
COPY --from=builder /install /usr/local

# Copy application source code
COPY app/              ./app/
COPY dev/              ./dev/
COPY NASA_CMAPSS_RUL_Project/ ./NASA_CMAPSS_RUL_Project/
COPY inference/        ./inference/

# Copy pre-built ChromaDB vector index (avoid re-indexing in container)
COPY dev/rag/chroma_db/ ./dev/rag/chroma_db/

# Copy pre-built knowledge base
COPY dev/rag/knowledge_base/ ./dev/rag/knowledge_base/

# Copy ML model artifacts
COPY models/           ./models/

# Environment defaults (Cloud Run overrides PORT at runtime)
ENV PORT=8080 \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

EXPOSE 8080

# Health check for Cloud Run container readiness
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:${PORT}/health')"

# Entrypoint: Cloud Run injects $PORT at runtime
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT} --workers 1"]
