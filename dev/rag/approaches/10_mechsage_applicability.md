# 🎯 MechSage Applicability — Decision Matrix & Roadmap

> **Purpose:** Maps every approach to MechSage's constraints and lays out a phased adoption plan.

---

## 1. The Recommended MechSage RAG Stack

| Layer | v1 Choice | v2 Evolution | Rationale |
|---|---|---|---|
| **Architecture** | Advanced RAG | Agentic RAG | Right complexity → LangGraph-native iteration |
| **Chunking** | Hierarchical | + Contextual summaries | Matches manual structure (Fault → Sensor → Action) |
| **Embedding** | `text-embedding-3-small` | Consider BGE-M3 (local) | Best quality/cost at $0.0002 total |
| **ANN Index** | HNSW via ChromaDB | Same (scales to 100K+) | Default, zero config, sub-ms at 200 docs |
| **Distance** | Cosine Similarity | Same | Matches embedding training objective |
| **Retrieval** | Hybrid (Dense + BM25) + Reranking | + Multi-query, HyDE | Catches both semantics + exact sensor IDs |
| **Reranker** | `ms-marco-MiniLM-L-6-v2` | `bge-reranker-v2-m3` | Free, local, 100ms for 10 candidates |
| **Graph** | None | Property Graph (NetworkX) | Corpus too small for v1; natural fit at 200+ |
| **Evaluation** | RAGAS + LLM-as-Judge | + DeepEval CI/CD | Already in eval plan with targets |

---

## 2. Full Decision Matrix

### RAG Architecture Decision

| Approach | Corpus Fit (30-200) | Cost Fit (<$0.05) | Latency Fit (<2s) | LangGraph Fit | Verdict |
|---|:---:|:---:|:---:|:---:|:---:|
| Naive RAG | ✅ | ✅ | ✅ | ✅ | ❌ Won't hit 0.90 faithfulness |
| **Advanced RAG** | **✅** | **✅** | **✅** | **✅** | **✅ v1** |
| Modular RAG | ✅ | ✅ | ✅ | ✅ | ⚠️ Over-engineered |
| **Agentic RAG** | **✅** | **✅** | **⚠️** | **✅** | **✅ v2** |
| Self-RAG | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ Sprint 3 |
| CRAG | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ Sprint 3 |
| Adaptive RAG | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ Future |
| MemoRAG | ❌ | ❌ | ❌ | ❌ | ❌ Wrong scale |

### Chunking Strategy Decision

| Strategy | Structured Data Fit | Short Entries Fit | Preserves Hierarchy | Cost | Verdict |
|---|:---:|:---:|:---:|:---:|:---:|
| Fixed-Size | ❌ | ❌ | ❌ | Free | ❌ |
| Recursive | ⚠️ | ✅ | ❌ | Free | ⚠️ Baseline |
| Semantic | ⚠️ | ❌ (overkill) | ❌ | $ | ❌ |
| **Hierarchical** | **✅** | **✅** | **✅** | **Free** | **✅ Pick** |
| Late | ❌ | ❌ | ❌ | $$ | ❌ |
| Agentic | ✅ | ❌ (overkill) | ✅ | $$$ | ❌ |

### ANN Algorithm Decision

| Algorithm | 200 Vectors | 10K Vectors | 100K+ Vectors | ChromaDB Support | Verdict |
|---|:---:|:---:|:---:|:---:|:---:|
| Flat (brute) | ✅ | ⚠️ | ❌ | ✅ | ⚠️ Viable now |
| **HNSW** | **✅** | **✅** | **✅** | **✅ (default)** | **✅ Pick** |
| DiskANN | ✅ | ✅ | ✅ | ❌ | ❌ |
| IVF-PQ | ❌ | ✅ | ✅ | ❌ | ❌ |
| LSH | ❌ | ⚠️ | ⚠️ | ❌ | ❌ |
| Annoy | ⚠️ | ✅ | ⚠️ | ❌ | ❌ |

### Distance Metric Decision

| Metric | Matches Embedding | Captures Semantics | Normalized Invariant | Verdict |
|---|:---:|:---:|:---:|:---:|
| **Cosine Similarity** | **✅** | **✅** | **✅** | **✅ Pick** |
| Dot Product | ✅ (equivalent) | ✅ | ✅ | ⚠️ Same result |
| Euclidean (L2) | ⚠️ | ⚠️ | ⚠️ | ❌ |
| Manhattan (L1) | ❌ | ❌ | ❌ | ❌ |

### Retrieval Approach Decision

| Approach | Catches Sensor IDs | Catches Semantics | Latency | Cost | Verdict |
|---|:---:|:---:|:---:|:---:|:---:|
| BM25 only | ✅ | ❌ | <1ms | Free | ⚠️ Part of hybrid |
| Dense only | ⚠️ | ✅ | <1ms | $ | ⚠️ Part of hybrid |
| **Hybrid + RRF** | **✅** | **✅** | **<1ms** | **$** | **✅ Retrieval** |
| **+ Cross-Encoder** | **✅** | **✅** | **+100ms** | **Free** | **✅ Reranking** |
| + HyDE | ⚠️ | ✅ | +LLM call | $$ | ⚠️ v2 |
| + Multi-Query | ✅ | ✅ | +LLM calls | $$$ | ⚠️ v2 |

---

## 3. Phased Adoption Roadmap

### Sprint 1: Baseline RAG ✅ Advanced RAG

```
Goal: Get RAG working end-to-end with measurable quality.

┌─────────────────────────────────────────────────────────┐
│  knowledge_base.json (expand to 30+ entries)            │
│          ↓                                               │
│  Hierarchical Chunking (parent + child)                 │
│          ↓                                               │
│  text-embedding-3-small (embed all chunks)              │
│          ↓                                               │
│  ChromaDB (HNSW index + metadata)                       │
│          ↓                                               │
│  Hybrid Retrieval (Dense + BM25 via ChromaDB)           │
│          ↓                                               │
│  Cross-Encoder Reranking (MiniLM-L-6-v2)                │
│          ↓                                               │
│  Top-3 passages → Diagnostics Agent → Explanation       │
└─────────────────────────────────────────────────────────┘

Evaluation:
  - RAGAS on 30-query test set
  - Targets: Faithfulness > 0.90, Context Precision > 0.80
  - LLM-as-Judge on 50-scenario golden set
  - Target: ≥ 4.0/5.0 average rubric score
```

### Sprint 2: Enhanced RAG + Graph Foundation

```
Goal: Improve quality, expand corpus, lay groundwork for graph.

Enhancements:
  ├── Expand KB to 200+ entries (all fault modes + AI4I types)
  ├── Add contextual summaries to chunks (Contextual Retrieval)
  ├── Upgrade reranker to bge-reranker-v2-m3
  ├── Build Property Graph from KB (NetworkX)
  │     └── Nodes: Components, Faults, Sensors, Procedures, Parts
  │     └── Edges: detects, fixed_by, requires
  └── Add DeepEval assertions to CI/CD pipeline

Evaluation:
  - RAGAS on expanded test set (50+ queries)
  - Graph quality check (entity/relationship accuracy)
  - Cost benchmarking against PRD targets
```

### Sprint 3: Agentic RAG + Self-Correction

```
Goal: Make the Diagnostics Agent's retrieval adaptive and self-correcting.

Enhancements:
  ├── Agentic RAG via LangGraph tool nodes
  │     └── Agent decides: retrieve? rewrite query? retrieve again?
  ├── Self-RAG critique (is this passage sufficient?)
  ├── CRAG fallback (if retrieval quality is low → abstain)
  ├── Multi-query retrieval (generate query variants)
  └── Integrate Property Graph queries alongside vector search

Evaluation:
  - A/B test: Advanced RAG vs Agentic RAG
  - Measure: faithfulness improvement, latency impact, cost impact
  - Regression suite: ensure v1 metrics don't degrade
```

### Sprint 4: Production Hardening

```
Goal: Production-ready RAG with monitoring and continuous evaluation.

Enhancements:
  ├── LangSmith tracing for all retrieval decisions
  ├── TruLens production monitoring
  ├── Feedback loop: feedback_record → KB improvement
  ├── Semantic caching (via LLM Gateway) for repeated queries
  └── Final benchmark against all PRD targets

Evaluation:
  - Full evaluation report against all PRD metrics
  - Gap analysis: what targets were met, what needs iteration
  - Human evaluation protocol (evaluation_plan.md §5)
```

---

## 4. Cost Impact Summary

| Component | Sprint 1 Cost | Monthly Running Cost | Notes |
|---|---|---|---|
| KB Embedding (30 entries) | $0.0001 | $0 (one-time) | Negligible |
| KB Embedding (200 entries) | $0.0002 | $0 (one-time) | Negligible |
| Query Embeddings (100/day) | — | $0.003 | 3000 queries × $0.00002/1K tokens |
| Cross-Encoder Reranking | $0 | $0 | Free, runs locally |
| BM25 Index | $0 | $0 | In-memory, no API |
| ChromaDB | $0 | $0 | Local, open-source |
| **Total Monthly RAG Cost** | — | **< $0.01/month** | Well within $1.50/asset budget |

---

## 5. Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| KB too small (5 entries) | Low faithfulness, frequent `NO_RELEVANT_PASSAGE` | Expand to 30+ entries in Sprint 1 |
| Embedding model deprecation | Re-embed entire corpus | Small corpus (~$0.001); one-time migration |
| Cross-encoder quality insufficient | Irrelevant passages in top-3 | Upgrade to larger reranker model |
| HNSW recall degradation at scale | Missed relevant passages | Monitor Recall@k; tune ef_search |
| Hybrid search adds complexity | Debugging difficulty | Log dense and sparse scores separately |

---

## 6. What NOT to Adopt (and Why)

| Approach | Why Not for MechSage |
|---|---|
| GraphRAG (v1) | 30-200 docs too small for community detection |
| Late Chunking | Manual entries are 1-3 sentences; no cross-chunk context to preserve |
| E5-Mistral-7B | 7B model for 200 docs is a freight train delivering a letter |
| DiskANN | SSD-optimized for billions of vectors; MechSage has 200 |
| LSH | 60-80% recall is unacceptable for safety-critical maintenance |
| Agentic Chunking | $2-10 LLM cost to chunk 200 short JSON entries |
| MemoRAG | Research-stage dual-system for massive corpora |
| ColBERT | Per-token storage for 200 docs adds infrastructure with no quality gain |

---

*This document completes the `dev/rag_approaches/` reference folder.*
