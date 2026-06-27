# 🛡️ Risk Register v1 — Mech Sage

**Sprint:** 0 · Assess & Mitigate Risk (Stage 4)
**Last updated:** 2026-06-19
**Status:** Living document — updated every sprint

---

## Risk Matrix Overview

| Risk ID | Risk | Likelihood | Impact | Risk Score | Owner |
|:---:|---|:---:|:---:|:---:|---|
| R1 | Missed critical failure | 2/5 Low | 5/5 Critical | 🔴 **10** | Reliability Eng. (Priya) |
| R2 | Alarm fatigue (too many false alarms) | 4/5 High | 4/5 Major | 🔴 **16** | Product (Meera) |
| R3 | Wrong or unsafe maintenance action | 3/5 Medium | 5/5 Critical | 🔴 **15** | Ops Lead (Meera) |
| R4 | Hallucinated diagnosis | 3/5 Medium | 4/5 Major | 🟡 **12** | ML Engineer (Arjun) |
| R5 | Scale and cost blowup | 4/5 High | 3/5 Moderate | 🟡 **12** | Architect (Arjun) |
| R6 | Data drift / model staleness | 3/5 Medium | 3/5 Moderate | 🟡 **9** | ML Engineer (Arjun) |
| R7 | LLM API outage or latency spike | 3/5 Medium | 3/5 Moderate | 🟡 **9** | Platform Eng. (Arjun) |
| R8 | Sensor fault mistaken for degradation | 2/5 Low | 3/5 Moderate | 🟢 **6** | Reliability Eng. (Priya) |

> **Risk Score** = Likelihood × Impact. 🔴 ≥ 12 = high priority. 🟡 8–11 = monitor. 🟢 ≤ 7 = acceptable.

---

## Detailed Risk Register

### R1 · Missed Critical Failure

| Dimension | Detail |
|---|---|
| **Description** | The system fails to flag an asset that is heading for a critical failure (false negative). The machine fails without warning. |
| **Likelihood** | 2/5 — Low, because C-MAPSS degradation is gradual and multi-sensor |
| **Impact** | 5/5 — Critical: line stops, safety risk, maximum cost |
| **Mitigation** | Bias recall on critical fault modes to > 95%. Set conservative telemetry safety thresholds that bypass the LLM layer entirely — if any sensor exceeds a hard physical limit, alert immediately via rule-based path. |
| **Design decision** | Dual-path architecture: rule-based safety thresholds (always on) + agent-based early detection (value-add) |
| **Residual risk** | Negligible for gradual failures. Sudden failures remain a gap (mitigated by synthetic augmentation in Sprint 1). |

---

### R2 · Alarm Fatigue

| Dimension | Detail |
|---|---|
| **Description** | Too many false or low-value alerts cause the team to stop trusting and responding to the system. |
| **Likelihood** | 4/5 — High, because current threshold-based systems already have ~25% false-alarm rate |
| **Impact** | 4/5 — Major: if the team ignores alerts, the system's value drops to zero |
| **Mitigation** | Multi-agent consensus validation: require ≥ 2 correlated sensor signals before raising an alert. Severity ranking: suppress low-confidence alerts and batch them into daily summaries. Guardrail metric: false-alarm rate must stay < 5% (hard ceiling: 10%). |
| **Design decision** | Alert confidence threshold of ≥ 0.80. Alerts below 0.60 are suppressed entirely. Alerts between 0.60–0.80 go to a "watch list" (not active alert). |
| **Residual risk** | Low — multi-sensor consensus significantly reduces false positives. |

---

### R3 · Wrong or Unsafe Maintenance Action

| Dimension | Detail |
|---|---|
| **Description** | The system drafts a work order that is incorrect, incomplete, or could cause harm if executed (e.g., wrong component, wrong procedure). |
| **Likelihood** | 3/5 — Medium, because LLMs can plausibly generate incorrect procedures |
| **Impact** | 5/5 — Critical: wrong maintenance can damage equipment or injure personnel |
| **Mitigation** | (1) RAG retrieval from maintenance manuals — ground every procedure in documented text. (2) Schema constraints on work-order format — required fields prevent incomplete orders. (3) **Human-in-the-loop approval** — no work order executes without explicit human sign-off. |
| **Design decision** | The system is an **advisor, not an executor**. HITL is non-negotiable for all physical actions. |
| **Residual risk** | Low — human approval catches errors. Remaining risk: human rubber-stamps without reading (mitigated by clear formatting and highlighting of key decisions). |

---

### R4 · Hallucinated Diagnosis

| Dimension | Detail |
|---|---|
| **Description** | The LLM invents a cause or explanation that is not grounded in the sensor data or maintenance documentation. The team acts on a false diagnosis. |
| **Likelihood** | 3/5 — Medium, inherent to LLMs |
| **Impact** | 4/5 — Major: misleads the reliability team, wastes time, erodes trust |
| **Mitigation** | (1) All explanations must cite **specific sensor readings** (s3 = X, s11 = Y). (2) RAG retrieval provides grounding passages from `knowledge_base.json`. (3) If the system cannot ground a cause, it must output: *"Cause uncertain — recommend manual inspection."* (4) RAGAS evaluation pipeline checks faithfulness and groundedness. |
| **Design decision** | Refusal-when-unsure policy: confidence < 0.60 triggers "Manual Audit Required" instead of a fabricated explanation. |
| **Residual risk** | Low — grounding + refusal policy significantly reduces hallucination risk. |

---

### R5 · Scale and Cost Blowup

| Dimension | Detail |
|---|---|
| **Description** | Monitoring a fleet of 218+ assets drives LLM API costs beyond the budget ceiling, or per-asset latency exceeds the SLA. |
| **Likelihood** | 4/5 — High, because naive per-asset-per-cycle LLM calls would be extremely expensive |
| **Impact** | 3/5 — Moderate: system becomes uneconomical but not dangerous |
| **Mitigation** | (1) **Cheap path / expensive path routing**: use free/small models for routine daily screening, escalate to stronger models only when anomaly confidence ≥ 0.70. (2) **Semantic caching**: cache repeated sensor-pattern explanations. (3) **Hard budget with alarms**: alert at 80% of monthly ceiling; auto-throttle at 100%. (4) Cost guardrail: < $1.50/asset/month (hard ceiling: $3.00). |
| **Design decision** | Model-routing policy as a decision table in the LLM gateway (LiteLLM). |
| **Residual risk** | Low — cheap-path-first architecture keeps routine costs near zero. |

---

### R6 · Data Drift / Model Staleness

| Dimension | Detail |
|---|---|
| **Description** | Over time, real sensor distributions shift from the training data. Model accuracy degrades silently. |
| **Likelihood** | 3/5 — Medium (inevitable over months, but slow) |
| **Impact** | 3/5 — Moderate: gradual accuracy loss, eventually missed alerts |
| **Mitigation** | (1) Monitor prediction confidence distributions — alert if median confidence drops below threshold. (2) Track RUL prediction error on recent confirmed failures. (3) Retrain trigger when drift is detected (Sprint 3+ scope). |
| **Design decision** | Observability-first: log every prediction confidence score for trend analysis. |
| **Residual risk** | Medium — drift detection is in place, but retraining pipeline is Sprint 3+. |

---

### R7 · LLM API Outage or Latency Spike

| Dimension | Detail |
|---|---|
| **Description** | The LLM provider experiences downtime or extreme latency. The copilot's agent layer becomes unavailable. |
| **Likelihood** | 3/5 — Medium (cloud APIs have periodic issues) |
| **Impact** | 3/5 — Moderate: agent layer is down, but safety is preserved via fallback |
| **Mitigation** | (1) **Graceful degradation**: if LLM API error rate > 5% or latency > 60s, auto-fallback to rule-based threshold alerts. (2) LiteLLM gateway handles retries, timeouts, and provider fallback chains. (3) Rule-based safety thresholds continue independently of the agent layer. |
| **Design decision** | The system is designed so that the **rule-based layer never depends on the LLM layer**. |
| **Residual risk** | Low — degraded mode still provides basic monitoring. |

---

### R8 · Sensor Fault Mistaken for Degradation

| Dimension | Detail |
|---|---|
| **Description** | A faulty sensor (step change, flatline, noise spike) is misinterpreted as mechanical degradation, triggering a false alert. |
| **Likelihood** | 2/5 — Low (can be detected by cross-sensor correlation) |
| **Impact** | 3/5 — Moderate: unnecessary dispatch, wasted technician time |
| **Mitigation** | (1) Cross-sensor validation: if a single channel shows anomaly but correlated channels are nominal, flag as "Possible sensor fault" (per `MAN-SEN-02` in knowledge base). (2) Require ≥ 2 correlated sensors before raising a degradation alert. |
| **Design decision** | Multi-sensor consensus is a prerequisite for degradation alerts. |
| **Residual risk** | Negligible — single-sensor anomalies are routed to sensor-fault investigation, not maintenance. |

---

## Kill Switch & Graceful Fallback

### Kill Switch

```bash
export DISABLE_AGENTS=true
```

- **Effect:** Instantly suspends all LLM agent executions across the fleet
- **Fallback:** System reverts to **threshold-only mode** (rule-based alerts using static sensor limits)
- **Who can trigger:** Arjun (Platform Engineer) or any on-call engineer
- **Recovery:** Set `DISABLE_AGENTS=false` and restart the agent orchestrator

### Graceful Degradation Triggers

| Trigger | Action |
|---|---|
| LLM API error rate > 5% (rolling 5 min) | Auto-fallback to rule-based alerts; notify Arjun |
| Per-asset latency > 60 seconds | Skip agent analysis; serve cached last-known-good assessment |
| Monthly cost at 80% of ceiling | Alert Arjun; reduce screening frequency |
| Monthly cost at 100% of ceiling | Auto-throttle: agent layer paused until next billing cycle |
| Confidence < 0.60 on any prediction | Output "Manual Audit Required" instead of alert |

---

## Risk Heat Map

```
         Low (1-2)    Medium (3)    High (4-5)
        ┌────────────┬────────────┬────────────┐
High    │            │ R4  R6     │ R2  R5     │  ← Likelihood
(4-5)   │            │ Halluc.    │ Alarm      │
        │            │ Drift      │ Cost       │
        ├────────────┼────────────┼────────────┤
Medium  │            │ R7         │ R3         │
(3)     │            │ API outage │ Wrong WO   │
        ├────────────┼────────────┼────────────┤
Low     │ R8         │ R1         │            │
(1-2)   │ Sensor     │ Missed     │            │
        │ fault      │ failure    │            │
        └────────────┴────────────┴────────────┘
             Low         Medium       High
                       Impact →
```
