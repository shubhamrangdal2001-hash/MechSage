# Data Card — N-CMAPSS (New C-MAPSS) **[STRETCH]**

> **Status in Mech Sage:** Stretch / realism dataset — used only if time and compute allow, to show the design generalises beyond the classic benchmark.

---

## Overview

| Field | Value |
|---|---|
| **Full name** | N-CMAPSS — New CMAPSS Turbofan Engine Degradation Dataset (run-to-failure under real flight conditions) |
| **Source** | NASA PCoE / Arias Chao, Kulkarni, Goebel et al. (2021) |
| **Domain** | Aerospace — turbofan prognostics, realistic flight envelopes |
| **Task** | RUL regression (also supports degradation-state estimation) |
| **Format** | HDF5 (`.h5`) |
| **Size** | Multi-GB (large) |
| **License** | Public / open (NASA) |

---

## What makes it "new"

N-CMAPSS was created to fix the main criticism of classic C-MAPSS — that it was too clean and unrealistic. It adds:

- **Real flight profiles** — degradation simulated over full commercial flights (climb, cruise, descent) rather than abstract cycles.
- **More sensors & virtual sensors** — richer measurement set plus modelled health parameters.
- **Explicit flight envelope data** — altitude, Mach, throttle, ambient conditions.
- **8 sub-datasets (DS01–DS08)** spanning different fault modes and flight classes.

## Structure (per HDF5 file)

Typical groups inside each `.h5`:

| Group | Contents |
|---|---|
| `W` | Flight/scenario descriptors (altitude, Mach, TRA, T2…) |
| `X_s` | Measured sensor signals |
| `X_v` | Virtual / unobservable sensors |
| `T` | Health-parameter degradation (ground truth) |
| `Y` | RUL label |
| `A` | Auxiliary (unit, cycle, flight class, fault type) |

## Fit for Mech Sage

- ✅ Much closer to a real fleet → stronger "this generalises" story.
- ✅ More fault modes → richer diagnosis explanations.
- ➖ **Compute-heavy** — multi-GB HDF5; slow to load/train on free tiers.
- ➖ **More data engineering** — HDF5 parsing, flight-segment windowing.
- ➖ Doesn't change the agent architecture — just raises the bar (and the cost).

## Decision

Keep as a **post-MVP stretch**. Build and benchmark on C-MAPSS first; if the sprint has slack, run one N-CMAPSS sub-dataset (e.g. DS02) to demonstrate the pipeline scales to realistic data.

## Known caveats

- Large memory footprint — needs chunked / lazy loading.
- Steeper learning curve (HDF5, more variables).
- Easy to blow the time budget — hence "stretch only".

## Citation

M. Arias Chao, C. Kulkarni, K. Goebel, O. Fink, "Aircraft Engine Run-to-Failure Dataset under Real Flight Conditions for Prognostics and Diagnostics," *Data*, 2021.
