# Mech Sage — Stage 5: Data Decision & Dataset Strategy

> **Stage:** 5 (Data) · builds on the Stage 3 design and PRD v1.0
> **Project:** Mech Sage — agentic predictive-maintenance copilot for Ironside Manufacturing
> **Owner:** Ayush Patil (Reliability & Data) · reviewed by Sudhanshu & Shubham
> **Status:** Draft for review

---

## 0. What this folder contains

| File | Purpose |
|---|---|
| `README.md` (this file) | **Why** we chose the datasets we did, and the reasoning behind every call |
| `datacard_cmapss.md` | Data card — NASA C-MAPSS (FD001–FD004) **[PRIMARY]** |
| `datacard_ncmapss.md` | Data card — N-CMAPSS (DS01–DS08) **[STRETCH]** |
| `datacard_ai4i2020.md` | Data card — AI4I 2020 Predictive Maintenance **[PROTOTYPING]** |
| `pros_and_cons.md` | Side-by-side pros/cons + the final decision matrix |

---

## 1. What we actually need from a dataset

Mech Sage predicts **how much life a machine has left (RUL)** and explains **why**, then drafts a work order. So the dataset has to support that exact loop. Our hard requirements:

1. **Run-to-failure trajectories** — we need machines that degrade over time until they fail, not just a snapshot. RUL is meaningless without the full life history.
2. **Multivariate sensor time-series** — multiple sensors per machine over time, so the anomaly + RUL model has real signal to learn from.
3. **A clear, derivable RUL label** — we must be able to compute "cycles remaining until failure" for supervised training.
4. **Manageable size & compute** — this is a capstone on free tiers; the data must train on a laptop / free cloud, not a GPU cluster.
5. **Well-documented & citable** — a recognised PHM benchmark so our results are comparable and credible.
6. **A realistic story for an industrial client** — it should plausibly stand in for Ironside's rotating equipment.

---

## 2. The decision (TL;DR)

> **Primary dataset: NASA C-MAPSS (FD001–FD004).**
> **Stretch/realism dataset: N-CMAPSS.**
> **Prototyping/smoke-test dataset: AI4I 2020.**

We build and benchmark on **C-MAPSS** because it is the canonical RUL run-to-failure benchmark and hits every requirement above. We keep **N-CMAPSS** as a stretch goal for realism if time/compute allow, and use **AI4I 2020** early to smoke-test the *agent loop* (detect → diagnose → work order) before the real RUL model is ready.

---

## 3. Why C-MAPSS is primary

- ✅ **Purpose-built for RUL.** It is *the* benchmark for remaining-useful-life prediction — exactly our north-star (early-detection lead time).
- ✅ **True run-to-failure.** Every engine unit runs from healthy to failure, so the RUL label is directly derivable (`max_cycle − current_cycle`).
- ✅ **Rich but tabular-friendly.** 21 sensors + 3 operational settings per cycle — enough signal, but small enough to window and model on a laptop.
- ✅ **Four difficulty tiers (FD001–FD004).** We can start on the easy single-condition/single-fault set (FD001) and scale to multi-condition/multi-fault (FD004) — perfect for an incremental capstone.
- ✅ **Battle-tested & documented.** Used in the PHM08 challenge and hundreds of papers, so we have baselines (RUL RMSE, scoring function) to compare against.
- ✅ **Right size.** Tens of MB, plain text — no data-engineering overhead steals time from the agent work.

## 4. Why N-CMAPSS is the stretch dataset (not primary)

- ➕ **Far more realistic** — full flight envelopes, real degradation modelling, more sensors.
- ➖ **Heavy** — multi-GB HDF5 files; training is slow on free tiers and would eat the sprint.
- ➖ **Overkill for a v1 demo** — the extra realism doesn't change the agent architecture; it just raises the compute bill.
- **Verdict:** ideal "if we have time" upgrade to show the design generalises; not where we start.

## 5. Why AI4I 2020 is for prototyping only

- ➕ **Tiny & instant** — 10k rows, plain CSV, trains in seconds.
- ➕ **Great for wiring the agent loop early** — we can exercise detect → diagnose → draft-work-order before the real RUL model exists.
- ➖ **Not run-to-failure** — it's a *classification* dataset (will it fail / failure type), not RUL trajectories.
- ➖ **Synthetic & shallow** — no time-series degradation to learn lead time from.
- **Verdict:** a scaffolding/smoke-test dataset, never the headline benchmark.

---

## 6. How the datasets map to the build

| Need | Dataset we use | Why |
|---|---|---|
| Train the RUL/anomaly model | **C-MAPSS** | Real run-to-failure trajectories + RUL labels |
| Prove the design generalises (stretch) | **N-CMAPSS** | Realistic flight data, more fault modes |
| Smoke-test the agent loop early | **AI4I 2020** | Tiny, instant, end-to-end in minutes |
| Report headline metrics (Stage 7) | **C-MAPSS** | Comparable to published baselines |

---

## 7. Stage 5 data tasks (per roadmap)

- [ ] Download C-MAPSS FD001–FD004 (and AI4I 2020 for prototyping)
- [ ] Clean + window into features; engineer the RUL label (with a clip cap, e.g. RUL capped at 125)
- [ ] Time-ordered train/val/test split (guard against leakage — see Stage 4 R6)
- [ ] Baseline EDA: sensor trends vs RUL, which sensors actually signal degradation
- [ ] Write dataset cards (this folder) + record measured stats to replace PRD §9 `TBD` baselines

---

## 8. Key risks carried from Stage 4

- **R6 Data leakage** — strict time-ordered splits; windows must never cross the failure boundary.
- **R1 Missed failure** — tune for recall; this is measured on the C-MAPSS held-out test set in Stage 7.
- **Single-dataset acceptance** — we knowingly accept that the demo trains on turbofan data, not Ironside's real fleet (documented accepted risk).

---

*Feeds Stage 6 (Build — model training) and Stage 7 (Verify — metrics on held-out data).*
