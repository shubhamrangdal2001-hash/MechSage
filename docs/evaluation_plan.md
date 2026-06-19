# 📐 Evaluation Plan — Mech Sage

**Sprint:** 0 · Discover & Define
**Last updated:** 2026-06-19
**Status:** Plan — implementation begins Sprint 1

---

## 1. Evaluation Philosophy

> Every claim about the system's value must be **backed by a number, measured against a baseline**.

The evaluation pipeline is designed around the PRD's success metrics. Each metric has a defined measurement method, a baseline, a target, and a testing cadence.

---

## 2. Metrics → Evaluation Mapping

| Metric | Type | Baseline | Target | Evaluation Method |
|---|:---:|---|---|---|
| ⏱️ Early-detection lead time | ⭐ North-star | ~12 hours | 5–7 days | Offline backtest on C-MAPSS test set |
| 🔕 False-alarm rate | 🛡️ Guardrail | ~25% | < 5% | Precision measurement on labeled test set |
| 🎯 Critical failure recall | 🛡️ Guardrail | Unknown | > 95% | Recall measurement on labeled test set |
| 🧠 RUL explanation quality | ✅ Supporting | N/A | ≥ 4.0/5.0 | LLM-as-judge + human spot-check |
| 📝 Work-order usefulness | ✅ Supporting | N/A | > 85% approval | LLM-as-judge + human spot-check |
| 💸 Cost per asset monitored | 🛡️ Guardrail | $50+ | < $1.50/month | Token counting via LiteLLM gateway logs |
| ⏳ Per-asset latency | ✅ Supporting | N/A | < 30 seconds | End-to-end timing in test harness |

---

## 3. Evaluation Components

### 3.1 Offline Backtest (Quantitative — RUL & Detection)

**What:** Run the full pipeline on C-MAPSS test engines and compare predictions against known ground-truth RUL labels.

**Datasets:**
- **FD001 test set** (100 engines) — primary evaluation
- **FD003 test set** (100 engines, 2 fault modes) — multi-fault evaluation
- **FD002/FD004** — stretch evaluation under multiple operating conditions

**Metrics computed:**
| Metric | Formula | Target |
|---|---|---|
| RMSE (RUL) | √(mean(predicted_RUL - actual_RUL)²) | < 20 cycles |
| MAE (RUL) | mean(\|predicted_RUL - actual_RUL\|) | < 15 cycles |
| Early-detection lead time | Cycles between first credible alert and actual failure | 30–50 cycles (≈ 5–7 days) |
| Precision | TP / (TP + FP) | > 95% |
| Recall (critical) | TP / (TP + FN) | > 95% |
| F1 Score | 2 × (P × R) / (P + R) | > 0.90 |

**Procedure:**
1. Load C-MAPSS test set with known RUL labels
2. Run each engine's trajectory through the detection + RUL pipeline
3. Record: cycle of first alert, predicted RUL at each cycle, final RUL prediction
4. Compare against ground truth; compute metrics
5. Report per-engine and aggregate results

### 3.2 Golden Set (Qualitative — Explanations & Work Orders)

**What:** A curated set of ~50 representative scenarios that test the quality of the copilot's outputs.

**Golden set composition:**
| Category | Count | Purpose |
|---|:---:|---|
| Clear HPC degradation (s3, s11 drift) | 10 | Verify correct diagnosis and explanation |
| Fan degradation (s13, s15 drift) | 10 | Verify multi-fault-mode handling |
| Healthy engine (no degradation) | 10 | Verify no false alarm is raised |
| Sensor fault (single channel anomaly) | 5 | Verify sensor-fault vs. degradation distinction |
| Ambiguous / borderline cases | 5 | Verify abstention ("Manual Audit Required") |
| Late-stage critical (RUL < 10 cycles) | 5 | Verify urgency escalation and correct work order |
| Multi-condition regime shift (FD002) | 5 | Verify regime-aware analysis |

**Each golden-set entry includes:**
- Input: sensor trajectory (last N cycles)
- Expected output: alert (yes/no), fault mode, explanation, RUL estimate, work-order draft
- Evaluation criteria: correctness, groundedness, completeness, actionability

### 3.3 RAGAS Evaluation (RAG Quality)

**What:** Evaluate the retrieval-augmented generation pipeline using the RAGAS framework.

**Metrics:**
| RAGAS Metric | What it measures | Target |
|---|---|---|
| **Faithfulness** | Is the answer grounded in the retrieved context? | > 0.90 |
| **Answer relevancy** | Is the answer relevant to the question? | > 0.85 |
| **Context precision** | Are the retrieved passages relevant? | > 0.80 |
| **Context recall** | Were all necessary passages retrieved? | > 0.80 |

**Procedure:**
1. Build a test set of 30+ queries (e.g., "What causes rising HPC outlet temperature?")
2. For each query, define the expected retrieval passages from `knowledge_base.json`
3. Run the RAG pipeline; collect retrieved contexts and generated answers
4. Score with RAGAS; report per-metric results

### 3.4 LLM-as-Judge (Explanation & Work-Order Quality)

**What:** Use a strong LLM (GPT-4 / Gemini Pro) to judge the quality of generated explanations and work orders on a structured rubric.

**Rubric for explanations:**
| Criterion | Score | Definition |
|---|:---:|---|
| **Correctness** | 1–5 | Does the diagnosis match the actual fault mode? |
| **Groundedness** | 1–5 | Does it cite specific sensor values and trends? |
| **Clarity** | 1–5 | Can a reliability engineer understand it without follow-up? |
| **Confidence calibration** | 1–5 | Does the stated confidence match the actual certainty? |

**Rubric for work orders:**
| Criterion | Score | Definition |
|---|:---:|---|
| **Completeness** | 1–5 | Does it include: fault mode, component, procedure, parts? |
| **Actionability** | 1–5 | Can a technician execute it without a follow-up call? |
| **Safety** | 1–5 | Does it avoid unsafe recommendations? |
| **Grounding** | 1–5 | Does it reference manual passages or sensor evidence? |

**Target:** Average score ≥ 4.0 / 5.0 across all criteria.

**Calibration:** Run the judge on 20 human-annotated examples first. If judge agreement with human < 80%, recalibrate the rubric.

### 3.5 Cost & Latency Benchmarking

**What:** Measure the real-world cost and latency of processing the full test fleet.

**Procedure:**
1. Process all 100 test engines (FD001) through the full pipeline
2. Log every LLM API call via LiteLLM: model used, tokens in/out, cost, latency
3. Compute:
   - Total cost / 100 engines = cost per asset per run
   - Extrapolate to monthly (assuming daily screening): cost × 30
   - P50 and P95 latency per asset
4. Compare against guardrails: < $1.50/asset/month, < 30s/asset

**Cost breakdown:**
| Path | Model Tier | Expected Cost |
|---|---|---|
| Cheap path (daily screening) | Free/small model (DeepSeek, Gemini Flash free) | ~$0.00 |
| Expensive path (escalation) | Stronger model (GPT-4o-mini, Gemini Pro) | ~$0.01–0.05 per escalation |
| RAG retrieval | Embedding model | ~$0.001 per query |

---

## 4. Evaluation Cadence

| Sprint | What is evaluated | How |
|---|---|---|
| **Sprint 0** | Evaluation plan defined (this document) | Peer review |
| **Sprint 1** | Golden set created; RAGAS baseline; first backtest on FD001 | Automated + manual |
| **Sprint 2** | End-to-end pipeline evaluation; cost baseline | Full harness run |
| **Sprint 3** | A/B test (with/without DSPy optimization); regression suite | Automated |
| **Sprint 4** | Final benchmark against all baselines; gap analysis vs. PRD | Full report |

---

## 5. Human Evaluation Protocol

**Who:** Team members rotate as evaluators (each person evaluates scenarios they did not build).

**When:** Sprint 2 onwards — after the core agent path is working.

**Process:**
1. Evaluator receives 10 randomly sampled golden-set outputs (blind — no metadata about which model/config generated them)
2. Evaluator scores each output on the rubric (1–5 per criterion)
3. Results are aggregated; inter-rater agreement is measured
4. If agreement < 70%, recalibrate rubric and re-evaluate

---

## 6. Reporting

Each sprint review includes an **evaluation summary table**:

```
┌─────────────────────────────┬───────────┬───────────┬────────┐
│ Metric                      │ Baseline  │ Current   │ Target │
├─────────────────────────────┼───────────┼───────────┼────────┤
│ Early-detection lead time   │ 12 hours  │ ____ days │ 5-7 d  │
│ False-alarm rate            │ 25%       │ ____%     │ < 5%   │
│ Critical failure recall     │ unknown   │ ____%     │ > 95%  │
│ RUL explanation quality     │ N/A       │ __/5.0    │ ≥ 4.0  │
│ Work-order usefulness       │ N/A       │ ____%     │ > 85%  │
│ Cost per asset/month        │ $50+      │ $____     │ <$1.50 │
│ Per-asset latency (P95)     │ N/A       │ ____s     │ < 30s  │
│ RAGAS faithfulness          │ N/A       │ ____      │ > 0.90 │
│ RAGAS context precision     │ N/A       │ ____      │ > 0.80 │
└─────────────────────────────┴───────────┴───────────┴────────┘
```

**Gap analysis:** If any metric misses target by > 20%, document the root cause and the remediation plan.
