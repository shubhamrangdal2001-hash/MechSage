# 📜 Product Requirements Document (PRD) v1

## Mech Sage — Predictive-Maintenance Operations Copilot

**Client:** Ironside Manufacturing (fictional persona)
**Squad:** Sudhanshu Biswas · Ayush Patil · Shubham Rangdal
**Sprint:** 0 — Discover & Define
**Status:** Draft v1
**Last updated:** 2026-06-19

---

## Table of Contents

- [1. Problem Statement](#1-problem-statement)
- [2. Target Users & Jobs To Be Done](#2-target-users--jobs-to-be-done)
- [3. Scope & Non-Scope](#3-scope--non-scope)
- [4. Assumptions & Open Questions](#4-assumptions--open-questions)
- [5. Success Metrics](#5-success-metrics)
- [6. Non-Functional Requirements](#6-non-functional-requirements)

---

## 1. Problem Statement

### The Situation

Ironside Manufacturing operates a fleet of expensive, hard-working industrial machines. Each machine streams sensor data — temperatures, pressures, speeds, vibration, and wear indicators — continuously during operation.

### The Pain

Today, a small reliability team watches dashboards and reacts when a sensor trips a static threshold. By the time a threshold fires, the machine is often **hours away from failure**, not days. The result:

| Impact | Current State |
|---|---|
| **Unplanned downtime** | Line stops without warning; emergency repairs cost 3–5× more than planned ones |
| **Late detection** | Threshold-based alerts fire ~12 hours before failure on average |
| **Alarm fatigue** | ~25% of alerts are false positives; team starts ignoring them |
| **No explanation** | Dashboards show red/green lights but don't say *what* is going wrong or *why* |
| **Manual work orders** | Technicians receive vague "check the machine" tickets with no actionable detail |
| **No cost visibility** | Operations leads have no view of cost-vs-risk tradeoffs for scheduling repairs |

### The Ask

Ironside's leadership does **not** want another dashboard of red and green lights. They want:

> An **agentic operations copilot** that watches the whole fleet, catches degradation early, explains in plain language what is going wrong and how sure it is, estimates remaining useful life, and drafts the work order and the maintenance schedule for a human to approve — without drowning the team in false alarms, and within a cost budget at fleet scale.

---

## 2. Target Users & Jobs To Be Done

### 2.1 Persona Set

| Persona | Role | Goal | Frustration |
|---|---|---|---|
| **Priya** | Reliability Engineer *(primary user)* | Catch degradation early and trust every alert she receives | Drowning in dashboards and false alarms; spends 60% of her day triaging noise |
| **Ravi** | Maintenance Technician | Get a clear, actionable work order he can execute without a follow-up call | Vague "check the machine" tickets that require 30 min of investigation before he can even start |
| **Meera** | Operations Lead | Maximize uptime within budget; approve schedules with confidence | No visibility into cost-vs-risk tradeoffs; approves blindly or delays and hopes for the best |
| **Arjun** | ML / Platform Engineer | Keep the system observable, cheap, and easy to debug | Black-box pipelines with no tracing; runaway token costs discovered only at month-end |

### 2.2 Jobs To Be Done (one sentence each)

| Persona | Job To Be Done |
|---|---|
| **Priya** (Reliability Eng.) | *"Tell me which asset is heading for failure, why, and how sure you are — before it stops the line."* |
| **Ravi** (Technician) | *"Hand me a work order I can act on without a follow-up call."* |
| **Meera** (Ops Lead) | *"Show me the cost-vs-risk picture so I can approve the schedule."* |
| **Arjun** (ML/Platform Eng.) | *"Give me traces, costs, and a kill switch — so I can sleep at night."* |

---

## 3. Scope & Non-Scope

### ✅ In Scope (v1)

| # | Capability | Description |
|---|---|---|
| S1 | **Fleet-wide sensor monitoring** | Ingest and process telemetry from all assets in the fleet continuously |
| S2 | **Early degradation detection** | Identify anomalous sensor drift days before a threshold-based system would fire |
| S3 | **Remaining Useful Life (RUL) estimation** | Predict how many cycles/days an asset has before failure, with a confidence score |
| S4 | **Plain-language explanation** | Explain *what* is going wrong, *which* sensors are driving the alert, and *how confident* the system is |
| S5 | **Work-order drafting** | Auto-generate a structured, actionable work order a technician can execute |
| S6 | **Maintenance scheduling** | Suggest a repair window based on RUL estimate and production schedule |
| S7 | **Human-in-the-loop approval** | Every action (work order, schedule change) requires explicit human approval before execution |
| S8 | **Cost & latency observability** | Track and display per-asset inference cost, latency, and token usage |
| S9 | **Alarm suppression / ranking** | Rank alerts by severity and suppress low-value noise to prevent alarm fatigue |

### ❌ Non-Scope (v1)

| # | Out of Scope | Why |
|---|---|---|
| N1 | **Autonomous action execution** | Safety-critical domain; human must approve every action |
| N2 | **Physical sensor installation / calibration** | We consume pre-existing sensor streams; hardware is out of scope |
| N3 | **ERP / CMMS integration** | Work orders are drafted for human copy-paste; direct system integration is a future sprint |
| N4 | **Real-time sub-second streaming** | Cycle-level (1 Hz equivalent) processing is sufficient; sub-second is not required |
| N5 | **Multi-domain asset types** | v1 focuses on turbofan-class rotating machinery; other asset types are future work |
| N6 | **Retraining pipeline** | Model fine-tuning and retraining is Sprint 3+ scope |
| N7 | **Mobile app** | Web-based interface only for v1 |

---

## 4. Assumptions & Open Questions

### 🔖 Assumptions

| # | Assumption | Impact if Wrong |
|---|---|---|
| A1 | Sensors are pre-calibrated; extreme outliers outside physical limits are sensor noise, not real events | Would miss real extreme-condition failures |
| A2 | Fleet size is ~100–250 assets for v1 (based on C-MAPSS scale) | Architecture may not scale if fleet is 10,000+ |
| A3 | Degradation is **gradual** (exponential drift over 30–50 cycles), not sudden step-function failures | Sudden failures would require a fundamentally different detection approach |
| A4 | Technicians can read English-language work orders | Would need multi-language support otherwise |
| A5 | Sensor data arrives reliably; no prolonged connectivity outages | Would need offline buffering and catch-up logic |
| A6 | Budget ceiling of ~$1.50 per asset per month for inference costs is acceptable to the client | Would need even cheaper models or less frequent monitoring |
| A7 | Human approval turnaround is < 4 hours for non-critical alerts, < 30 min for critical | Longer turnaround could mean the RUL window expires before action |

### ❓ Open Questions

| # | Question | Who Decides | Status |
|---|---|---|---|
| Q1 | What is the exact fleet size and peak streaming pattern (assets × sensors × frequency)? | Client / Ops Lead | 🔖 Assumed: 218 assets, 21 sensors, 1 Hz |
| Q2 | What actions must **never** be automated, even with high confidence? | Client | 🔖 Assumed: All physical actions need HITL |
| Q3 | What is the acceptable **false-alarm rate** before the team stops trusting the system? | Reliability Eng. | 🔖 Assumed: < 5% target |
| Q4 | Is there an existing CMMS or ticketing system work orders should feed into? | Client / IT | 🔖 Assumed: No — draft for human copy-paste |
| Q5 | What is the **hard budget ceiling** per asset monitored per month? | Ops Lead / Finance | 🔖 Assumed: $1.50/asset/month |
| Q6 | Are there regulatory or compliance requirements for audit trails on maintenance decisions? | Client / Legal | 🔖 Assumed: No formal requirements for v1 |

---

## 5. Success Metrics

> 📏 **Rule:** Every metric carries a **baseline + target**. A target without a baseline cannot be judged.

### 5.1 North-Star Metric

| Metric | What it measures | Baseline (current state) | Target (Mech Sage v1) |
|---|---|---|---|
| ⏱️ **Early-detection lead time** | How far ahead of failure the system raises a credible alert | **~12 hours** (threshold-based) | **5–7 days** (sensor-drift detection) |

### 5.2 Guardrail Metrics (must never cross, even when north-star improves)

| Metric | What it measures | Baseline | Target | Hard Ceiling |
|---|---|---|---|---|
| 🔕 **False-alarm rate** | % of alerts that are false positives | ~25% | < 5% | **Never exceed 10%** |
| 💸 **Cost per asset monitored** | Total API + infra cost per asset per month | $50+ (manual labor) | < $1.50 | **Never exceed $3.00** |

### 5.3 Supporting Metrics

| Metric | What it measures | Baseline | Target |
|---|---|---|---|
| 🧠 **RUL explanation quality** | User approval rating of RUL reasoning (Likert 1–5) | N/A (no RUL today) | ≥ 4.0 / 5.0 (> 90% rated "useful") |
| 📝 **Work-order usefulness** | % of drafted work orders approved without major edits | N/A (manual drafting) | > 85% direct approval rate |
| 🎯 **Critical failure recall** | % of actual critical failures correctly flagged | Unknown | > 95% (bias toward recall) |
| ⏳ **Per-asset analysis latency** | Time to process one asset's full sensor window | N/A | < 30 seconds |

### 5.4 Operational Definitions

| Term | Definition |
|---|---|
| **Credible alert** | An alert with confidence ≥ 0.80 that is backed by at least 2 correlated sensor signals |
| **False alarm** | An alert where the asset did not fail or show measurable degradation within 2× the predicted RUL window |
| **Direct approval** | A work order that a technician marks "approved as-is" without substantive edits |
| **Critical failure** | A failure that would halt the production line or pose a safety risk |

---

## 6. Non-Functional Requirements

### 6.1 Latency Budget

| Operation | Budget |
|---|---|
| Per-asset sensor analysis (cheap path) | < 5 seconds |
| Per-asset full diagnostic (escalated path) | < 30 seconds |
| Work-order generation | < 60 seconds |
| End-to-end: sensor anomaly → draft work order | < 2 minutes |

### 6.2 Cost Ceiling

| Dimension | Ceiling |
|---|---|
| Per-asset inference cost (monthly) | **< $1.50** |
| Total fleet cost (218 assets, monthly) | **< $327** |
| Per-escalation cost (strong model call) | < $0.05 |
| Cost alert threshold | Alarm at **80%** of monthly ceiling |

**Cost strategy:**
- **Cheap path (routine):** Small/free models (DeepSeek, Qwen, Llama, Gemini Flash free tier) for daily sensor screening
- **Expensive path (escalated):** Stronger model only when anomaly confidence ≥ 0.70 and needs detailed diagnosis
- **Semantic caching:** Cache repeated sensor-pattern explanations to avoid redundant API calls

### 6.3 Safety Bar

| Principle | Implementation |
|---|---|
| **Human-in-the-loop** | Every work order, schedule change, and escalation requires explicit human approval |
| **Abstain when unsure** | If confidence < 0.60, system flags as "Manual Audit Required" instead of generating an alert |
| **Grounded reasoning** | All explanations must reference specific sensor readings and, where possible, maintenance manual passages |
| **No hallucinated diagnoses** | If the system cannot ground a cause in data, it must say "cause uncertain — recommend manual inspection" |
| **Kill switch** | Global `DISABLE_AGENTS=true` flag instantly suspends all agent activity and falls back to threshold-only mode |
| **Graceful degradation** | If LLM API error rate > 5% or latency > 60s, auto-fallback to rule-based alerts with human notification |

### 6.4 Availability & Reliability

| Dimension | Target |
|---|---|
| System uptime | 99% (allows ~7 hours downtime/month for a non-safety-critical advisory system) |
| Data freshness | Sensor data processed within 10 minutes of arrival |
| Fallback mode | Rule-based threshold alerts continue even if LLM/agent layer is down |

---

## Appendix A: Primary Dataset Justification

### Selected: NASA C-MAPSS (Turbofan Engine Degradation Simulation)

| Dimension | Detail |
|---|---|
| **Source** | NASA Prognostics Center of Excellence (PCoE) via Kaggle |
| **License** | Public domain (NASA) |
| **Scale** | 4 sub-datasets (FD001–FD004); 100–260 engines per set |
| **Sensors** | 21 sensor channels + 3 operational settings per cycle |
| **Labels** | Run-to-failure with known RUL at every cycle |
| **Degradation** | Gradual (exponential drift, last 30–50 cycles) |
| **Missing values** | 0% (simulated) |

**Why C-MAPSS?**
- It is the **benchmark** run-to-failure dataset cited in the project brief
- Directly supports the **north-star metric** (early-detection lead time) and **RUL estimation**
- 21 sensor channels match the "sensor stream → early warning" workflow
- 4 sub-datasets provide a difficulty ladder (single condition → multiple conditions × multiple faults)

**Secondary (stretch):** AI4I 2020 Predictive Maintenance (UCI) — adds 5 labeled failure modes for the **work-order usefulness** metric (failure type → more specific work order)

---

## Appendix B: Glossary

| Term | Definition |
|---|---|
| **RUL** | Remaining Useful Life — estimated cycles/days until failure |
| **HITL** | Human-In-The-Loop — a human must approve before action |
| **CMMS** | Computerized Maintenance Management System |
| **C-MAPSS** | Commercial Modular Aero-Propulsion System Simulation (NASA) |
| **Alarm fatigue** | When too many false/low-value alerts cause operators to ignore all alerts |
| **Guardrail metric** | A metric that must never be crossed, even if the north-star improves |
| **Cheap path** | Routine monitoring using small/free models |
| **Expensive path** | Escalated diagnosis using stronger, costlier models |

---

*This PRD is a living document. It will be updated as the team progresses through Sprint 1 (Design) and beyond.*
