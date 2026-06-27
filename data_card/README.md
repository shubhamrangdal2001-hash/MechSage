# Data

| File | What it is | Real or synthetic |
|---|---|---|
| `cmapss_synthetic.csv` | Generated run-to-failure data (100 engines, 21 sensors + 3 op settings + RUL) | **SYNTHETIC** |
| `splits.csv` | Asset-grouped train/val/test assignment (leakage-safe) | derived |
| `knowledge_base.json` | Maintenance-manual passages used by RAG (5 fault modes) | illustrative |
| `cmapss.dvc` | DVC pointer for the **real** NASA C-MAPSS dataset (not committed) | pointer |

The synthetic schema **exactly matches** NASA C-MAPSS so you can drop in the real data without code
changes. See `dataset_card_synthetic.md` and `dataset_card_real.md`.

## Swap to real data
1. Download NASA C-MAPSS (FD001-FD004) and place under `data/CMAPSS_real/`.
2. `dvc add data/CMAPSS_real && dvc push` (pointer is `cmapss.dvc`).
3. Point `scripts/make_data.py` at the real loader (column names already align).
