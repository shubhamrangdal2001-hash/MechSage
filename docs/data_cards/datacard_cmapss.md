# Data Card — NASA C-MAPSS Turbofan Degradation **[PRIMARY]**

> **Status in Mech Sage:** Primary training & benchmark dataset for the RUL/anomaly model.

---

## Overview

| Field | Value |
|---|---|
| **Full name** | Commercial Modular Aero-Propulsion System Simulation (C-MAPSS) Turbofan Engine Degradation Simulation Data Set |
| **Source** | NASA Prognostics Center of Excellence (PCoE) |
| **Domain** | Aerospace — turbofan engine prognostics |
| **Task** | Remaining Useful Life (RUL) regression |
| **Format** | Plain-text, space-separated `.txt` files |
| **Size** | ~Tens of MB (lightweight) |
| **License** | Public / open (US Government work, NASA PCoE) |
| **Benchmark heritage** | PHM08 Prognostics Challenge; hundreds of published baselines |

---

## Structure

Four independent sub-datasets of increasing difficulty:

| Sub-set | Operating conditions | Fault modes | Train units | Test units |
|---|---|---|---|---|
| **FD001** | 1 | 1 (HPC degradation) | 100 | 100 |
| **FD002** | 6 | 1 (HPC degradation) | 260 | 259 |
| **FD003** | 1 | 2 (HPC + Fan) | 100 | 100 |
| **FD004** | 6 | 2 (HPC + Fan) | 248 | 249 |

Each sub-set ships as: `train_FDxxx.txt`, `test_FDxxx.txt`, `RUL_FDxxx.txt`.

## Schema (per row = one engine, one cycle)

| Column | Meaning |
|---|---|
| 1 | `unit_number` (engine ID) |
| 2 | `time_in_cycles` |
| 3–5 | `op_setting_1..3` (operational settings) |
| 6–26 | `sensor_1..21` (21 sensor measurements) |

- **Train files:** each engine runs from healthy until it fails (run-to-failure).
- **Test files:** each engine series ends *some time before* failure; the true RUL at that point is in `RUL_FDxxx.txt`.

## Label engineering

- **Training RUL:** `RUL = max(time_in_cycles for unit) − current_cycle`.
- **Common practice:** clip RUL at a cap (e.g. 125 cycles) — health is roughly flat early in life, so a piecewise-linear label trains better.
- **Test RUL:** provided directly, one value per test engine.

## Standard evaluation

- **RUL RMSE** (lower is better).
- **PHM08 asymmetric scoring** (penalises late predictions — over-estimating RUL — more than early ones), which matches our safety bias toward catching failures early.

## Fit for Mech Sage

- ✅ Directly supports RUL (our north-star metric, early-detection lead time).
- ✅ Run-to-failure → clean supervised labels.
- ✅ Multivariate sensors → real signal for anomaly + RUL model.
- ✅ Difficulty tiers → incremental build (start FD001, scale to FD004).
- ⚠️ Some sensors are flat/non-informative → feature selection needed in EDA.
- ⚠️ Simulated (not real flight) → N-CMAPSS is the realism upgrade.

## Known caveats

- Several sensors carry little/no degradation signal (drop in EDA).
- Multi-condition sets (FD002/FD004) need per-condition normalisation.
- Simulated data — cleaner than real industrial sensors (no missing values / dropouts).

## Citation

A. Saxena, K. Goebel, D. Simon, N. Eklund, "Damage Propagation Modeling for Aircraft Engine Run-to-Failure Simulation," *PHM 2008*. Dataset via NASA PCoE Prognostics Data Repository.
