# Dataset Card - AI4I 2020 Predictive Maintenance (OPTIONAL, classification angle)

## Summary
UCI benchmark of 10,000 records with process parameters and five labelled failure modes
(TWF, HDF, PWF, OSF, RNF) plus a binary `Machine failure` flag. Cited public data - not data
we produced.

## Schema (parsed by `src/ironside/datasets/ai4i.py`)
- Columns include `Type`, `Air temperature [K]`, `Process temperature [K]`,
  `Rotational speed [rpm]`, `Torque [Nm]`, `Tool wear [min]`, `Machine failure`,
  and the five failure-mode flags `TWF/HDF/PWF/OSF/RNF`.

## Provenance & licence
- Source: UCI Machine Learning Repository, dataset id **601**.
- Licence: **CC BY 4.0**. Confirm on the dataset page.
- DVC-tracked under `data/raw/AI4I/`; not committed.

## Use in this repo
Optional classification angle (failure / failure-mode prediction) complementing the
C-MAPSS RUL+classification core. Loader maps the five failure modes for multi-label work.

## Limitations
- Tabular snapshots, not run-to-failure trajectories (no RUL).
- Class imbalance across failure modes (RNF especially rare).

## Ethical / safety
No personal data; decision-support only, human-approved actions.
