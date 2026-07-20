# Dataset Card - NASA N-CMAPSS (OPTIONAL, stretch)

## Summary
New C-MAPSS (N-CMAPSS) extends C-MAPSS with full-flight, realistic operating profiles and
richer, more gradual degradation - closer to real fleet behaviour.

## Provenance & licence
- Source: NASA PCoE, via Kaggle (`bishals098/nasa-cmapss-2-engine-degradation`).
- Licence: NASA open data; confirm on the dataset page.
- DVC-tracked under `data/raw/NCMAPSS/`; not committed.

## Status in this repo
Documented as a realism stretch. The primary loaders target classic C-MAPSS; adopting
N-CMAPSS means mapping its HDF5/flight-cycle schema into the same
`unit_id, cycle, op*, s*` frame before reuse of the existing feature/model code.

## Limitations
- Larger and HDF5-based; needs more preprocessing and memory.
- Different sensor set/naming than classic C-MAPSS.

## Ethical / safety
No personal data; decision-support only, human-approved actions.
