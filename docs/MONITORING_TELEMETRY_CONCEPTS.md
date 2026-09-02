# MechSage Production Monitoring Architecture & Telemetry Formulas

This document provides a detailed technical guide to the monitoring concepts, telemetry formulas, and real-time computation architecture powering the **MechSage Production Monitoring Dashboard**.

---

## 1. Monitoring Architecture: Live vs. Static Data

The MechSage Monitoring Dashboard operates in a **Live Hybrid Telemetry Mode**:

- **Live Polling Loop (Every 5 seconds)**: The frontend continuously polls backend endpoints (`/api/metrics`, `/api/fleet-summary`, `/api/work-orders`). Real-time incoming inference requests update KPIs such as P95 latency, request rates, error rates, agent costs, pending alerts, and fleet RUL scores.
- **Seeded Baselines (Fallback & Benchmark Data)**: For multi-day historical distributions (e.g., 30-day concept drift, RAGAS quality benchmarks) or when no active traffic is flowing, deterministic seed distributions render realistic baseline visuals.

---

## 2. System Health Overview Metrics

### A. P95 API Latency ($L_{\text{P95}}$)
- **Concept**: Evaluates tail latency across a rolling window of $N = 100$ requests.
- **Formula**:
  Sort latency measurements $L = [l_1, l_2, \dots, l_N]$ in ascending order:
  $$L_{\text{P95}} = l_{\lceil 0.95 \times N \rceil}$$
- **SLO Target**: $< 400\text{ ms}$.

### B. Inference Requests per Hour ($R_{\text{hour}}$)
- **Concept**: Measures system throughput over a 60-minute sliding window.
- **Formula**:
  $$R_{\text{hour}} = \sum_{t = T - 3600}^{T} \text{Request}(t)$$

### C. System Error Rate ($E_{\text{rate}}$)
- **Concept**: Proportion of HTTP 5xx responses or uncaught agent exceptions relative to total API calls.
- **Formula**:
  $$E_{\text{rate}} = \left( \frac{N_{\text{errors}}}{N_{\text{total}}} \right) \times 100\%$$
- **SLO Target**: $< 5.0\%$.

---

## 3. Data & Concept Drift Detection

### A. Jensen-Shannon Divergence ($D_{\text{JS}}$) per Sensor Feature
- **Concept**: Quantifies shifts in sensor feature distributions between incoming streaming inference data ($P$) and the baseline training dataset ($Q$).
- **Formula**:
  $$D_{\text{JS}}(P \parallel Q) = \frac{1}{2} D_{\text{KL}}(P \parallel M) + \frac{1}{2} D_{\text{KL}}(Q \parallel M)$$
  where:
  $$M = \frac{1}{2}(P + Q)$$
  and $D_{\text{KL}}$ is the Kullback-Leibler divergence:
  $$D_{\text{KL}}(P \parallel M) = \sum_{x \in \mathcal{X}} P(x) \log \left( \frac{P(x)}{M(x)} \right)$$
- **Score Interpretation**:
  - $D_{\text{JS}} < 0.10$: Low drift (Normal operation)
  - $0.10 \le D_{\text{JS}} < 0.25$: Moderate drift (Warning threshold)
  - $D_{\text{JS}} \ge 0.25$: High drift (Action required / Retraining trigger)

### B. Concept Drift Index & Retrain Gate
- **Concept**: Aggregates output prediction variance against the baseline confidence gate threshold ($\tau = 0.75$).
- **Formula**:
  $$\text{Drift Index} = \frac{1}{F} \sum_{i=1}^{F} \mathbb{I}(D_{\text{JS}, i} > \text{Threshold}_{\text{drift}})$$
- **Retrain Trigger**: If $\text{Drift Index} \ge 40\%$ or $30\text{ days}$ pass since last retrain.

---

## 4. LLM Gateway & Cost Calculation Architecture

### A. Agent Token Cost Formula
- **Concept**: Token usage is captured per agent execution via the LiteLLM Gateway middleware and billed dynamically by model tier.
- **Formula**:
  $$\text{Cost}_{\text{Agent}} = \sum_{\text{calls}} \left( T_{\text{input}} \times R_{\text{input}} + T_{\text{output}} \times R_{\text{output}} \right)$$
  Where:
  - $T_{\text{input}}, T_{\text{output}}$: Number of input and output tokens consumed.
  - $R_{\text{input}}, R_{\text{output}}$: Cost per token for the specific model tier.

### B. Model Tier Distribution & Routing Strategy

| Agent Name | Model Tier | Primary Model | Cost Weight | Purpose / Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Fleet Supervisor** | Cheap | `Gemini 1.5 Flash` / `Haiku` | ~8% | High-frequency fleet telemetry polling |
| **Per-Asset Monitor** | Cheap | `Gemini 1.5 Flash` / `Haiku` | ~6% | Anomaly flag check per engine unit |
| **Scheduling Agent** | Mid | `Claude 3.5 Sonnet` / `GPT-4o-mini` | ~14% | Maintenance window & resource planning |
| **Work-Order Agent** | Mid | `Claude 3.5 Sonnet` / `GPT-4o-mini` | ~21% | JSON payload drafting for work orders |
| **Diagnostics Agent** | Strong | `Claude 3.5 Sonnet` / `GPT-4o` | ~50% | Multi-step RAG root cause analysis |

### C. Daily Agent Cost Allocation Example ($\$0.84$ Total Budget)
- **Diagnostics Agent**: $\$0.84 \times 0.50 = \$0.4200$
- **Work-Order Agent**: $\$0.84 \times 0.21 = \$0.1764$
- **Scheduling Agent**: $\$0.84 \times 0.14 = \$0.1176$
- **Fleet Supervisor**: $\$0.84 \times 0.08 = \$0.0672$
- **Per-Asset Monitor**: $\$0.84 \times 0.06 = \$0.0504$

---

## 5. Confidence Gate & Alert Quality Metrics

### A. Auto-Draft Rate ($A_{\text{draft}}$)
- **Concept**: Percentage of diagnostic assessments exceeding the confidence threshold ($\tau = 0.75$) that automatically generate work orders without human intervention.
- **Formula**:
  $$A_{\text{draft}} = \left( \frac{N_{\text{confidence} \ge \tau}}{N_{\text{total diagnoses}}} \right) \times 100\%$$

### B. Human Escalation Rate ($H_{\text{esc}}$)
- **Concept**: Percentage of ambiguous cases ($C < \tau$) routed to human maintenance engineers.
- **Formula**:
  $$H_{\text{esc}} = 100\% - A_{\text{draft}} = \left( \frac{N_{\text{confidence} < \tau}}{N_{\text{total diagnoses}}} \right) \times 100\%$$

### C. False Alarm Rate ($F_{\text{alarm}}$)
- **Concept**: Proportion of generated anomaly alerts deemed false positives after inspection.
- **Formula**:
  $$F_{\text{alarm}} = \left( \frac{\text{False Positives (FP)}}{\text{True Positives (TP)} + \text{False Positives (FP)}} \right) \times 100\%$$
- **SLO Target**: $< 10.0\%$.

### D. Work-Order Accuracy ($W_{\text{acc}}$)
- **Concept**: Percentage of auto-drafted work orders approved and closed without human correction.
- **Formula**:
  $$W_{\text{acc}} = \left( \frac{N_{\text{accurate WOs}}}{N_{\text{total approved WOs}}} \right) \times 100\%$$
