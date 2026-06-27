# Data Card — AI4I 2020 Predictive Maintenance **[PROTOTYPING]**

> **Status in Mech Sage:** Prototyping / smoke-test dataset — used early to wire and exercise the agent loop (detect → diagnose → draft work order) before the real RUL model exists.

---

## Overview

| Field | Value |
|---|---|
| **Full name** | AI4I 2020 Predictive Maintenance Dataset |
| **Source** | UCI Machine Learning Repository (synthetic, by Stephan Matzka) |
| **Domain** | Generic industrial machine (milling-style) |
| **Task** | Binary failure **classification** (+ failure-type labels) |
| **Format** | Single CSV |
| **Size** | 10,000 rows × 14 columns (tiny) |
| **License** | Open (UCI / CC BY) |

---

## Schema

| Column | Meaning |
|---|---|
| `UID` / `Product ID` | Row + product identifier |
| `Type` | Product quality variant: L / M / H |
| `Air temperature [K]` | Ambient temperature |
| `Process temperature [K]` | Process temperature |
| `Rotational speed [rpm]` | Spindle speed |
| `Torque [Nm]` | Applied torque |
| `Tool wear [min]` | Cumulative tool wear |
| `Machine failure` | Target — did it fail (0/1) |
| `TWF, HDF, PWF, OSF, RNF` | Specific failure modes (tool wear, heat dissipation, power, overstrain, random) |

## Fit for Mech Sage

- ✅ **Instant** — trains in seconds; zero data-engineering overhead.
- ✅ **Has failure-mode labels** → great for testing the Diagnostics agent's classification + explanation path.
- ✅ **Perfect scaffolding** → stand up the full agent loop end-to-end while the real RUL model is still in progress.
- ➖ **Not run-to-failure** → no RUL trajectories, so it can't train our north-star (lead-time) model.
- ➖ **Synthetic & shallow** → row-wise snapshots, not time-series degradation.
- ➖ **Imbalanced** → only ~3.4% failures; needs care if used for any real classification metric.

## Decision

Use purely as a **smoke-test / prototyping harness**. It lets us validate the agent plumbing (contracts, tool calls, work-order drafting, human approval) on a trivial dataset, then swap in the C-MAPSS RUL model without changing the architecture. Never reported as a headline result.

## Known caveats

- Strong class imbalance (~3.4% positive).
- Synthetic — relationships are engineered, not observed.
- Classification only — cannot demonstrate RUL or early-detection lead time.

## Citation

S. Matzka, "Explainable Artificial Intelligence for Predictive Maintenance Applications," *AI4I 2020*. Dataset via UCI Machine Learning Repository.
