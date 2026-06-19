# Dataset Card - NASA C-MAPSS (PRIMARY)

## Summary
NASA Commercial Modular Aero-Propulsion System Simulation (C-MAPSS) turbofan degradation
dataset. Four sub-datasets FD001-FD004 with run-to-failure trajectories under different
operating conditions and fault modes. The canonical PHM run-to-failure benchmark.

## Why primary
Per-engine trajectories to failure support both failure-within-horizon classification and
RUL regression with realistic degradation - exactly the copilot's core tasks.

## Schema (parsed by `src/ironside/datasets/cmapss.py`)
- Whitespace-delimited txt, no header, 26 columns:
  `unit_id, cycle, op1, op2, op3, s1 ... s21`.
- `RUL` is derived per engine (`max_cycle - cycle`), capped at **125** for training stability.
- Test RUL uses the official end-of-life `RUL_FDxxx.txt` labels.

## Sub-datasets
- FD001: single condition, single fault (HPC degradation) - first target.
- FD002 / FD004: six operating conditions - regime handling.
- FD003 / FD004: two fault modes - multi-fault diagnosis.

## Provenance & licence
- Source: NASA Prognostics Center of Excellence (PCoE), via Kaggle
  (`bishals098/nasa-turbofan-engine-degradation-simulation`).
- Licence: NASA open data (US Gov work, public domain). **Confirm on the dataset page.**
- Raw files tracked with DVC (`data/cmapss.dvc`); never committed to git.

## Limitations
- Simulated (not field) sensor data; idealised noise vs. real fleets.
- RUL cap at 125 truncates very-early-life labels by design.
- Operating-condition shift across FD002/FD004 requires regime-aware normalisation.

## Ethical / safety
No personal data. Predictions are decision-support only; all maintenance actions remain
human-approved (HITL).
