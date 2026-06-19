# 🔍 Stage 1 · Discovery Brief

## Mech Sage — Predictive-Maintenance Operations Copilot

**Sprint:** 0 · Discover & Probe
**Last updated:** 2026-06-19

---

## 1. The Engagement

Ironside Manufacturing runs a fleet of expensive, hard-working industrial machines. When one fails without warning, the line stops — and an unplanned outage costs far more than a planned repair. Each machine streams sensor data (temperatures, pressures, speeds, vibration, wear) continuously during operation.

**Today's workflow:** A small reliability team watches dashboards and reacts when something trips a static threshold — which is often too late. The signal that a machine is heading for failure is usually there **days earlier**, buried in the data.

**What Ironside wants:** Not another dashboard. An **agentic operations copilot** that watches the whole fleet, catches degradation early, explains what is wrong in plain language, estimates remaining useful life, and drafts the work order and schedule — without drowning the team in false alarms, and within a cost budget at fleet scale.

---

## 2. Data Profiling — NASA C-MAPSS (Primary Dataset)

### 2.1 Why C-MAPSS?

NASA C-MAPSS (Commercial Modular Aero-Propulsion System Simulation) is the canonical **run-to-failure benchmark** for predictive maintenance. It was selected as the primary dataset because:

- **Run-to-failure trajectories** directly support the north-star metric (early-detection lead time) and RUL estimation
- **21 sensor channels** match the "sensor stream → early warning" workflow Ironside needs
- **4 sub-datasets** provide a difficulty ladder from simple (single condition, single fault) to complex (multiple conditions, multiple faults)
- **Public domain** (NASA), no licensing friction
- **Well-documented** in PHM research — easy to benchmark against published results

### 2.2 Sub-Dataset Overview

| Sub-dataset | Train Engines | Test Engines | Operating Conditions | Fault Modes | Difficulty |
|---|:---:|:---:|:---:|:---:|:---:|
| **FD001** | 100 | 100 | 1 (sea level) | 1 (HPC degradation) | ⭐ Easiest |
| **FD002** | 260 | 259 | 6 (varying altitude/Mach) | 1 (HPC degradation) | ⭐⭐ |
| **FD003** | 100 | 100 | 1 (sea level) | 2 (HPC + Fan) | ⭐⭐⭐ |
| **FD004** | 248 | 249 | 6 (varying altitude/Mach) | 2 (HPC + Fan) | ⭐⭐⭐⭐ Hardest |

**Total:** 708 training engines + 708 test engines across all sub-datasets.

### 2.3 Schema (26 columns per row)

```
unit_id | cycle | op1 | op2 | op3 | s1 | s2 | ... | s21
```

- **Column 1:** Engine unit ID
- **Column 2:** Time cycle (1-indexed, sequential per engine)
- **Columns 3–5:** Operational settings (altitude, Mach number, throttle resolver angle)
- **Columns 6–26:** 21 sensor measurements

### 2.4 Sensor Inventory (21 channels)

| Sensor | Description | Component | Signal Type |
|:---:|---|---|---|
| s1 | Total temperature at fan inlet | Fan | Temperature |
| s2 | Total temperature at LPC outlet | LPC | Temperature |
| s3 | Total temperature at HPC outlet | HPC | Temperature |
| s4 | Total temperature at LPT outlet | LPT | Temperature |
| s5 | Total pressure at fan inlet | Fan | Pressure |
| s6 | Total pressure in bypass duct | Bypass | Pressure |
| s7 | Total pressure at HPC outlet | HPC | Pressure |
| s8 | Physical fan speed | Fan | Speed |
| s9 | Physical core speed | Core | Speed |
| s10 | Engine pressure ratio (P50/P2) | Engine | Ratio |
| s11 | Static pressure at HPC outlet | HPC | Pressure |
| s12 | Ratio of fuel flow to Ps30 | Combustor | Ratio |
| s13 | Corrected fan speed | Fan | Speed |
| s14 | Corrected core speed | Core | Speed |
| s15 | Bypass ratio | Bypass | Ratio |
| s16 | Burner fuel-air ratio | Combustor | Ratio |
| s17 | Bleed enthalpy | Bleed | Energy |
| s18 | Demanded fan speed | Fan | Speed |
| s19 | Demanded corrected fan speed | Fan | Speed |
| s20 | HPT coolant bleed | HPT | Flow |
| s21 | LPT coolant bleed | LPT | Flow |

### 2.5 Informative vs. Non-Informative Sensors

Not all 21 sensors carry predictive signal. Profiling reveals:

| Category | Sensors | Count | Note |
|---|---|:---:|---|
| **High signal** | s2, s3, s4, s7, s8, s9, s11, s12, s13, s14, s15, s17, s20, s21 | 14 | Show clear degradation trends |
| **Near-constant / low variance** | s1, s5, s6, s10, s16, s18, s19 | 7 | Flat or near-zero variance — can be dropped without information loss |

> **Implication:** The agent should focus on the **14 informative sensors** for anomaly detection. This reduces token cost and noise in LLM explanations.

### 2.6 Sequence Length Distribution

| Statistic | FD001 (train) |
|---|---|
| **Min cycles** | ~128 |
| **Max cycles** | ~362 |
| **Mean cycles** | ~206 |
| **Median cycles** | ~199 |

- Each engine runs from healthy → degraded → failure
- **Most of each trajectory is healthy** — only the last 20–30% of cycles show measurable degradation
- RUL labels are capped at **125 cycles** for training stability (engines with >125 remaining cycles are all labeled 125)

### 2.7 Degradation Pattern

**Type:** Gradual (not sudden)

- Sensor values drift **exponentially** in the final 30–50 cycles before failure
- Key degradation indicators: HPC outlet temperature (s3) rises, corrected fan speed (s13) drops, static HPC pressure (s11) increases
- Degradation is visible across **multiple correlated sensors**, not just one — this enables multi-sensor consensus in alerts

```
Healthy phase          Degradation onset       Failure
────────────────────── ╱─────────────╲ ╱──── ×
(flat signals)        (gradual drift)  (exponential)
                      ↑
              Detection target: catch it HERE (5-7 days early)
```

> **Implication:** Gradual degradation is ideal for MechSage's early-detection goal. The system should detect the onset of drift (not wait for exponential blowup).

### 2.8 Known Gaps & Limitations

| Gap | Impact | Mitigation |
|---|---|---|
| **Simulated data** — not real-world sensor noise | Model may overfit to clean signals | Augment with synthetic noise profiles (Sprint 1) |
| **No maintenance-log text** | RAG retrieval has no real maintenance corpus | Use `knowledge_base.json` (5 illustrative manual passages) + synthetic logs |
| **Single domain** (turbofan) | Cannot directly generalize to other asset types | Design agent contracts to be asset-agnostic; turbofan is the v1 focus |
| **RUL cap at 125** | Truncates early-life labels | By design — focus prediction effort on the degradation window |
| **No sudden failures** | Cannot test sudden-failure detection | Add synthetic sudden-failure trajectories in Sprint 1 |

---

## 3. Secondary Dataset — AI4I 2020 Predictive Maintenance

### 3.1 Overview

| Dimension | Detail |
|---|---|
| **Source** | UCI Machine Learning Repository (dataset #601) |
| **License** | CC BY 4.0 |
| **Records** | 10,000 |
| **Failure rate** | ~3.4% (339 failures / 10,000) |
| **Failure modes** | 5 labeled: Tool Wear (TWF), Heat Dissipation (HDF), Power (PWF), Overstrain (OSF), Random (RNF) |

### 3.2 Features

| Feature | Unit | Type |
|---|---|---|
| Air temperature | K | Continuous |
| Process temperature | K | Continuous |
| Rotational speed | rpm | Continuous |
| Torque | Nm | Continuous |
| Tool wear | min | Continuous |
| Machine failure | 0/1 | Binary label |
| TWF, HDF, PWF, OSF, RNF | 0/1 each | Multi-label failure modes |

### 3.3 Why Secondary?

- **Adds failure-mode classification** — C-MAPSS only has HPC/Fan degradation; AI4I gives 5 distinct failure types
- **Supports work-order specificity** — knowing the failure *type* makes the drafted work order more actionable
- **Tabular, not time-series** — cannot be used for RUL prediction; only complements classification

### 3.4 Class Imbalance

| Mode | Count | % of Total |
|---|:---:|:---:|
| No failure | 9,661 | 96.6% |
| HDF | 115 | 1.15% |
| PWF | 95 | 0.95% |
| OSF | 98 | 0.98% |
| TWF | 45 | 0.45% |
| RNF | 19 | 0.19% |

> ⚠️ **Severe imbalance** — RNF has only 19 samples. Synthetic augmentation is required for rare modes.

---

## 4. Persona Set

| Persona | Role | Goal | Frustration |
|---|---|---|---|
| **Priya** | Reliability Engineer *(primary)* | Catch degradation early and trust every alert | Drowning in dashboards & false alarms; spends 60% of day triaging noise |
| **Ravi** | Maintenance Technician | Get a clear, actionable work order | Vague "check the machine" tickets requiring 30 min investigation before starting |
| **Meera** | Operations Lead | Maximize uptime within budget | No visibility into cost-vs-risk tradeoffs; approves blindly or delays |
| **Arjun** | ML / Platform Engineer | Keep the system observable, cheap, and debuggable | Black-box pipelines with no tracing; runaway token costs |

*(Full persona details → [personas.md](personas.md))*

---

## 5. Jobs To Be Done

| Persona | Job To Be Done |
|---|---|
| **Priya** | *"Tell me which asset is heading for failure, why, and how sure you are — before it stops the line."* |
| **Ravi** | *"Hand me a work order I can act on without a follow-up call."* |
| **Meera** | *"Show me the cost-vs-risk picture so I can approve the schedule."* |
| **Arjun** | *"Give me traces, costs, and a kill switch — so I can sleep at night."* |

---

## 6. Probing Questions & Assumptions

### 6.1 Questions We Would Ask Ironside

| # | Question | Why It Matters |
|---|---|---|
| Q1 | What is the exact fleet size and peak streaming pattern? | Determines scaling requirements |
| Q2 | What actions must **never** be automated, even with high confidence? | Defines the HITL boundary |
| Q3 | What is the acceptable false-alarm rate before the team stops trusting it? | Sets the guardrail metric target |
| Q4 | Is there an existing CMMS or ticketing system? | Determines integration scope |
| Q5 | What is the hard budget ceiling per asset per month? | Constrains model-routing design |
| Q6 | Are there regulatory/compliance requirements for audit trails? | May require additional logging |

### 6.2 Stated Assumptions

> Since Ironside is a fictional engagement, we state assumptions explicitly and mark them.

| # | Assumption | Fallback if Wrong |
|---|---|---|
| 🔖 A1 | Fleet size is **~218 active assets** streaming telemetry in 10-minute windows | Re-architect for larger scale |
| 🔖 A2 | Sensors are **pre-calibrated**; extreme outliers outside physical limits are noise | Add calibration validation step |
| 🔖 A3 | Degradation is **gradual** (30–50 cycle drift window), not sudden step-failures | Add sudden-failure detection path |
| 🔖 A4 | **All physical actions** require human approval (HITL) — no autonomous execution | Tighten safety constraints further |
| 🔖 A5 | Budget ceiling: **$1.50/asset/month** for inference costs | Use even cheaper models or reduce frequency |
| 🔖 A6 | Human approval turnaround: **< 4 hours** for non-critical, **< 30 min** for critical | RUL window may expire before action |
| 🔖 A7 | Work orders are **drafted for human copy-paste**; no direct CMMS integration in v1 | Build API integration later |

---

## 7. Teardown: Alert → Action (2 Products)

### 7.1 AWS Monitron

| Aspect | Detail |
|---|---|
| **What it does** | End-to-end industrial monitoring: sensors → gateway → cloud ML → alerts |
| **Pattern to borrow** | **Automatic sensor-to-asset mapping.** Groups anomalous vibration + temperature events directly into equipment-level events. The operator sees "Machine X is degrading" not "Sensor 47 exceeded threshold." |
| **Anti-pattern to avoid** | **Proprietary black-box thresholding.** Operators cannot adjust warning sensitivity or understand why a threshold was set. Trust erodes when the team can't explain the alert logic. |

### 7.2 Rockwell FactoryTalk Analytics

| Aspect | Detail |
|---|---|
| **What it does** | Plant-level analytics platform that aggregates sensor data across production lines |
| **Pattern to borrow** | **Plant-hierarchy blast-radius view.** Shows exactly which downstream lines and processes are affected by a machine warning. Gives the Operations Lead context for scheduling decisions. |
| **Anti-pattern to avoid** | **Manual escalation workflow.** Engineers must copy-paste alerts from FactoryTalk into external CMMS tools. The handoff is error-prone and adds latency between detection and action. |

### 7.3 Design Implications for Mech Sage

| Lesson | How we apply it |
|---|---|
| Group sensors into **asset-level events** | The copilot explains at the asset level ("Engine 077 is degrading"), not at the sensor level |
| Show **blast radius** | Include downstream impact in alerts (which production lines are affected) |
| **Explain the reasoning** | Never black-box — always cite which sensors, what trend, how confident |
| **Automate the handoff** | Draft the work order inside the system — no copy-paste to external tools |

---

## 8. Prioritized Map of the Work

### 8.1 Priority Stack (MoSCoW)

| Priority | Capability | Rationale |
|---|---|---|
| **Must** | Early degradation detection (5–7 day lead time) | North-star metric; the core reason the system exists |
| **Must** | RUL estimation with confidence | Enables scheduling; meaningless without it |
| **Must** | Plain-language explanation | Builds trust; prevents alarm fatigue |
| **Must** | Work-order drafting | The action output; makes the alert actionable |
| **Must** | Human-in-the-loop approval | Safety-critical domain; non-negotiable |
| **Should** | Maintenance scheduling suggestion | High value but depends on RUL accuracy |
| **Should** | Cost & latency observability | Essential for operations but not user-facing |
| **Should** | Alarm suppression / severity ranking | Prevents fatigue; depends on detection accuracy |
| **Could** | Multi-fault-mode classification (AI4I) | Enriches work orders; secondary dataset |
| **Could** | Blast-radius / downstream impact view | Borrowed from FactoryTalk; high UX value |
| **Won't (v1)** | Autonomous action execution | Out of scope — safety constraint |
| **Won't (v1)** | CMMS/ERP integration | Future sprint |

---

## ✅ Exit Criteria Check

| Sprint 0 Exit Criterion | Status | Where |
|---|---|---|
| Profiled data and prioritized map | ✅ | Sections 2, 3, 8 |
| Personas | ✅ | Section 4 + `personas.md` |
| PRD v1 with metrics and baselines | ✅ | `docs/02_prd.md` |
| Risk register v1 | ⏳ | `docs/risk_register.md` (next) |
| Evaluation plan | ⏳ | `docs/evaluation_plan.md` (next) |
