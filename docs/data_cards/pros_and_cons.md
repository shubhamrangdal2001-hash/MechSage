# Stage 5 — Dataset Pros & Cons + Decision Matrix

> Side-by-side comparison of every dataset we evaluated, and why we landed where we did.

---

## 1. At-a-glance comparison

| Dimension | C-MAPSS **[PRIMARY]** | N-CMAPSS **[STRETCH]** | AI4I 2020 **[PROTOTYPE]** |
|---|---|---|---|
| **Task** | RUL regression | RUL regression | Failure classification |
| **Run-to-failure?** | ✅ Yes | ✅ Yes | ❌ No |
| **Time-series?** | ✅ Yes (per cycle) | ✅ Yes (per flight) | ❌ Row snapshots |
| **Size** | ~Tens of MB | Multi-GB | ~1 MB |
| **Compute** | 🟢 Laptop-friendly | 🔴 Heavy | 🟢 Trivial |
| **Realism** | 🟡 Simulated, clean | 🟢 Realistic flights | 🔴 Synthetic, shallow |
| **Fault modes** | 1–2 | Many | 5 (labelled) |
| **Format** | Plain text | HDF5 | CSV |
| **Benchmark heritage** | 🟢 Huge (PHM08) | 🟡 Growing | 🟡 Educational |
| **Supports north-star (lead time)?** | ✅ Yes | ✅ Yes | ❌ No |

---

## 2. C-MAPSS — pros & cons

**Pros**
- ✅ Purpose-built for RUL — matches our core goal exactly.
- ✅ True run-to-failure → clean, derivable labels.
- ✅ Lightweight, plain text → no data-engineering tax.
- ✅ Four difficulty tiers (FD001→FD004) → incremental build.
- ✅ Massive published baseline set → our numbers are comparable & credible.

**Cons**
- ➖ Simulated → cleaner than real industrial sensors.
- ➖ Some sensors are flat/non-informative → needs feature selection.
- ➖ Multi-condition sets need per-condition normalisation.

**Verdict:** ⭐ **Primary** — best balance of fit, size, and credibility.

---

## 3. N-CMAPSS — pros & cons

**Pros**
- ✅ Realistic full-flight degradation → strong generalisation story.
- ✅ More sensors + flight envelope → richer diagnosis.
- ✅ Many fault modes → more interesting explanations.

**Cons**
- ➖ Multi-GB HDF5 → slow on free tiers, eats the sprint.
- ➖ More data engineering (HDF5, flight windowing).
- ➖ No architectural change vs C-MAPSS — just more cost.

**Verdict:** 🎯 **Stretch** — do it only if there's slack, to prove scale.

---

## 4. AI4I 2020 — pros & cons

**Pros**
- ✅ Tiny & instant → trains in seconds.
- ✅ Labelled failure modes → good for the diagnosis path.
- ✅ Ideal scaffolding → wire the agent loop before the RUL model is ready.

**Cons**
- ➖ Not run-to-failure → no RUL, no lead-time.
- ➖ Synthetic & shallow → no real degradation dynamics.
- ➖ Heavily imbalanced (~3.4% failures).

**Verdict:** 🔧 **Prototype only** — smoke-test harness, never a headline result.

---

## 5. Decision matrix (weighted)

Scored 1–5 (5 = best) against our Stage 5 requirements. Weights reflect what matters for Mech Sage.

| Criterion | Weight | C-MAPSS | N-CMAPSS | AI4I 2020 |
|---|---|---|---|---|
| Supports RUL / lead-time | ×5 | 5 | 5 | 1 |
| Run-to-failure labels | ×4 | 5 | 5 | 1 |
| Compute fits free tier | ×4 | 5 | 2 | 5 |
| Low data-eng overhead | ×3 | 5 | 2 | 5 |
| Realism / client story | ×3 | 3 | 5 | 2 |
| Benchmark credibility | ×2 | 5 | 4 | 2 |
| **Weighted total** | | **🥇 100** | **84** | **52** |

*(C-MAPSS: 25+20+20+15+9+10 = 100 · N-CMAPSS: 25+20+8+6+15+8 = 82–84 · AI4I: 5+4+20+15+6+4 = 52.)*

---

## 6. Final call

1. **Build & benchmark on C-MAPSS** (start FD001, scale toward FD004).
2. **Prototype the agent loop on AI4I 2020** in parallel so the plumbing is ready early.
3. **Attempt one N-CMAPSS sub-dataset as a stretch** to show the pipeline scales to realistic flight data — only if time/compute allow.

This gives us a credible headline result (C-MAPSS), fast iteration (AI4I), and an optional realism flex (N-CMAPSS) — without risking the sprint.
