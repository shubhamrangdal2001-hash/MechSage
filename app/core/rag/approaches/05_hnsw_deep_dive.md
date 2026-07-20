# 🕸️ HNSW Deep Dive — Technical Reference

> **Purpose:** Deep technical documentation of HNSW — the industry-standard graph-based ANN algorithm selected for MechSage.
>
> **MechSage Configuration:** HNSW via ChromaDB with default parameters (M=16, ef_construction=200)

---

## 1. Core Concept

HNSW (Hierarchical Navigable Small World) is a **multi-layer proximity graph** inspired by skip lists. It builds a hierarchy of graphs where:
- **Top layers** have few nodes with long-range connections (for fast coarse navigation)
- **Bottom layers** have all nodes with short-range connections (for precise local search)

```
Layer 3:  [A] ─────────────────────── [F]              Entry point: A
           │                            │
Layer 2:  [A] ──── [C] ──── [F] ──── [H]
           │        │        │         │
Layer 1:  [A] ─ [B] ─ [C] ─ [D] ─ [F] ─ [G] ─ [H]
           │    │    │    │    │    │    │    │
Layer 0:  [A] ─ [B] ─ [C] ─ [D] ─ [E] ─ [F] ─ [G] ─ [H]   (all nodes)
```

### Search Algorithm (Greedy)
1. Start at the **entry point** on the top layer
2. Greedily move to the neighbor closest to the query
3. When no closer neighbor exists, **drop to the next layer**
4. Repeat until reaching Layer 0
5. On Layer 0, do a more thorough beam search (width = `ef_search`) to find the k nearest neighbors

### Why It Works
- **Top layers act as an express highway** — skip large portions of the search space
- **Bottom layers provide precision** — fine-grained neighborhood search
- **Small-world property** — most nodes are reachable in O(log n) hops
- **No backtracking needed** — greedy search on well-constructed graphs converges reliably

---

## 2. Construction Parameters

### M (Maximum Connections per Node)

**What it controls:** The maximum number of neighbors each node maintains on each layer.

```
M = 4:   A ─── B        Low connectivity, small graph, fast but lower recall
         │ ╲ ╱ │
         C ─── D

M = 16:  A ─── B ─── E   High connectivity, large graph, slower but higher recall
         │ ╲ ╱ │ ╲ ╱ │
         C ─── D ─── F
         │ ╲   │   ╱ │
         G ─── H ─── I
```

| M Value | Memory | Build Time | Recall | Recommendation |
|:---:|---|---|---|---|
| 4–8 | Low | Fast | 90–95% | Memory-constrained systems |
| **12–16** | **Medium** | **Medium** | **97–99%** | **General purpose (default)** |
| 32–64 | High | Slow | 99.5%+ | Maximum recall required |

**MechSage setting: M = 16** (ChromaDB default). At 200 vectors, this gives effectively perfect recall.

---

### ef_construction (Build-Time Quality)

**What it controls:** Size of the dynamic candidate list during graph construction. Higher = more neighbors considered = better graph quality = slower build.

| ef_construction | Build Time | Graph Quality | Recommendation |
|:---:|---|---|---|
| 64 | Fast | Good | Rapid prototyping |
| 128 | Medium | Very Good | Development |
| **200** | **Medium** | **Excellent** | **Production (default)** |
| 400–800 | Slow | Near-optimal | Maximum quality |

**MechSage setting: ef_construction = 200** (ChromaDB default). Building a graph of 200 vectors takes < 100ms regardless of this parameter.

**Rule of thumb:** `ef_construction` should be ≥ `2 × M` and ideally ≥ `ef_search`.

---

### Layer Assignment Probability

**What it controls:** The probability that a node appears on layer L.

```
P(node on layer L) = (1/M_L)^L

Where M_L is a normalization parameter (typically = M)
```

For M = 16:
- Layer 0: 100% of nodes (all 200 in MechSage)
- Layer 1: ~6.25% of nodes (~12)
- Layer 2: ~0.4% of nodes (~1)
- Layer 3: ~0.02% (entry point only)

**This is not configurable** — it's derived from M. The exponential thinning ensures O(log n) layers.

---

## 3. Search Parameters

### ef_search (Search-Time Quality/Speed Trade-off)

**What it controls:** Size of the priority queue during search. Higher ef_search = more candidates evaluated = better recall = slower query.

```
ef_search = 10:   Quick search, checks ~10 candidates  → 95% recall
ef_search = 50:   Thorough search, checks ~50 candidates → 99% recall
ef_search = 200:  Exhaustive search, checks ~200 candidates → 99.9% recall
```

| ef_search | Latency (1M vectors) | Recall@10 | Recommendation |
|:---:|---|---|---|
| 10 | ~0.1ms | 90–95% | Speed-critical, recall-tolerant |
| **50** | **~0.5ms** | **98–99%** | **Balanced (recommended)** |
| 100 | ~1ms | 99–99.5% | High-recall applications |
| 200 | ~2ms | 99.9%+ | Near-exact search |

**MechSage setting: ef_search = 50** (or higher — at 200 vectors, even ef_search = 200 takes < 0.1ms)

**Constraint:** `ef_search` must be ≥ k (the number of results requested). If you request top-5, ef_search must be ≥ 5.

---

## 4. Parameter Interaction Summary

```
┌───────────────────────────────────────────────────────────────────┐
│                    HNSW PARAMETER EFFECTS                        │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  M ↑         → Memory ↑,  Build time ↑,  Search quality ↑       │
│  ef_construct ↑ → Build time ↑,  Graph quality ↑                │
│  ef_search ↑  → Query latency ↑,  Recall ↑                      │
│                                                                   │
│  Sweet spot for MechSage (200 vectors):                          │
│    M = 16, ef_construction = 200, ef_search = 50                 │
│    → < 0.1ms query, > 99.9% recall, ~1MB memory                 │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 5. Memory Estimation

**Formula:**
```
Memory ≈ n × (d × 4 bytes + M × 2 × 8 bytes)
         vector storage    graph structure
```

Where:
- `n` = number of vectors
- `d` = dimensionality
- `M` = max connections
- Factor of 2 accounts for bidirectional edges
- 8 bytes per edge (4-byte node ID + 4-byte distance)

**MechSage estimate:**
```
n = 200, d = 1536, M = 16

Vector storage: 200 × 1536 × 4 = 1,228,800 bytes ≈ 1.2 MB
Graph structure: 200 × 16 × 2 × 8 = 51,200 bytes ≈ 50 KB

Total: ~1.25 MB
```

This is trivial — fits in L1 cache of any modern CPU.

---

## 6. 2025–2026 HNSW Variants

### 6.1 d-HNSW (Disaggregated HNSW)

**Problem:** Standard HNSW requires the entire graph in RAM. At billion scale, this can be hundreds of GB.

**Approach:** Extend HNSW to RDMA-based disaggregated memory systems. The graph structure and vectors are distributed across multiple memory nodes. Search traverses the graph across network boundaries using Remote Direct Memory Access.

**Key innovation:** Separates compute (search logic) from storage (graph + vectors), enabling elastic scaling.

**MechSage relevance:** ❌ None. MechSage's graph is 1.25 MB.

---

### 6.2 ACORN-1 (Filtered HNSW)

**Problem:** Standard HNSW struggles with **filtered queries** — when metadata constraints (e.g., "only HPC faults") reduce the search space, the graph traversal can become inefficient because neighbors that satisfy the filter may be far apart in the graph.

**Approach:** Modify graph construction to be filter-aware. During construction, ensure that subgraphs induced by common filter predicates remain well-connected.

**Key innovation:** Maintains navigability within filtered subsets of the graph.

**MechSage relevance:** ⚠️ Interesting for future. When the corpus grows and metadata filtering is used (e.g., "retrieve only HPC-related manuals"), ACORN-style filter-aware graphs could improve retrieval. Currently, with 200 entries, filtering then brute-force is fast enough.

---

### 6.3 Probabilistic Exploration of Neighbors (PEOs)

**Problem:** Standard HNSW greedy search can get stuck in local minima, especially in high dimensions.

**Approach:** Instead of always moving to the nearest neighbor, introduce probabilistic exploration — sometimes explore a non-optimal neighbor to escape local minima.

**Key innovation:** Improved throughput by avoiding redundant graph traversals.

**MechSage relevance:** ❌ Negligible benefit at 200 vectors.

---

### 6.4 Projection-Augmented Graphs (PAG)

**Problem:** Graph-based ANN performance degrades in very high dimensions (1000+).

**Approach:** Integrate dimensionality reduction (random projection or PCA) into graph construction. Build the graph in a lower-dimensional projected space, but store and compare in the original space during search.

**Key innovation:** Better graph structure through dimensionality reduction, with full-precision distance computation.

**MechSage relevance:** ⚠️ Potentially useful. MechSage's 1536-dim embeddings are in the "very high" range. However, at 200 vectors, the dimensionality doesn't cause practical issues.

---

## 7. Implementation Libraries

| Library | HNSW Implementation | Used By | License | Notes |
|---|---|---|---|---|
| **HNSWlib** | Original reference implementation | Many | Apache 2.0 | Pure C++ with Python bindings |
| **FAISS** | Optimized HNSW (`IndexHNSWFlat`) | Meta, production-grade | MIT | Also supports IVF, PQ, and hybrid |
| **ChromaDB** | HNSWlib under the hood | MechSage ✅ | Apache 2.0 | Default index type; zero config |
| **Qdrant** | Custom Rust HNSW | Production vector DB | Apache 2.0 | Filtered search optimized |
| **Weaviate** | Custom Go HNSW | Production vector DB | BSD-3 | ACORN-style filtering |
| **Milvus** | KNOWHERE (HNSW + IVF) | Enterprise vector DB | Apache 2.0 | Distributed HNSW |
| **Pinecone** | Proprietary (HNSW-based) | Managed vector DB | Commercial | Serverless, fully managed |

**MechSage uses ChromaDB** (per architecture decision in `02_prd.md` §12). ChromaDB wraps HNSWlib with a Python-friendly API, persistent storage, and metadata filtering.

---

## 8. Common Pitfalls

### 8.1 Recall Degradation at Scale
HNSW recall can degrade as the corpus grows, even if latency remains stable. This happens because the graph becomes harder to navigate as density increases. **Monitor Recall@k** in production.

### 8.2 Insert/Delete Challenges
HNSW graphs are not designed for efficient deletion. Deleting a node can leave "holes" in the graph structure, degrading connectivity. Options:
- **Tombstone + rebuild:** Mark deleted nodes and periodically rebuild the index
- **Soft delete:** Filter out deleted nodes at query time

### 8.3 Over-Tuning ef_search
Setting ef_search too high wastes compute without improving results. At 200 vectors, ef_search = 200 means searching the entire graph — equivalent to brute force. Start at 50 and increase only if Recall@k measurements justify it.

---

## 9. MechSage HNSW Configuration Summary

| Parameter | Value | Rationale |
|---|---|---|
| **Algorithm** | HNSW (via ChromaDB) | Default, industry standard, zero config |
| **M** | 16 | ChromaDB default; > 99% recall at any scale up to 100K |
| **ef_construction** | 200 | ChromaDB default; excellent graph quality |
| **ef_search** | 50 | Balanced recall/speed; at 200 vectors, effectively exact |
| **Distance metric** | Cosine | Matches `text-embedding-3-small` training objective |
| **Memory footprint** | ~1.25 MB | Trivial |
| **Query latency** | < 0.1 ms | Well within the 2s retrieval SLA |

---

*Next: [06_distance_metrics.md](06_distance_metrics.md) — The math behind similarity measurement*
