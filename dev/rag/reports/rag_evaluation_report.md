# 📊 MechSage RAG Evaluation Report

Generated: 2026-07-14 04:25:29 UTC

## Summary Metrics

### 1. Retrieval Path Metrics (30 Paraphrased Queries)
| Metric | Target | Actual | Status |
|---|---|---|---|
| **Hit Rate @ 1 (Recall@1)** | > 80.0% | 93.3% | ✅ PASS |
| **Hit Rate @ 3 (Recall@3)** | > 90.0% | 96.7% | ✅ PASS |
| **Precision @ 1** | > 80.0% | 93.3% | ✅ PASS |
| **Precision @ 3** | > 30.0% | 32.2% | ✅ PASS |
| **F1-Score @ 1** | > 80.0% | 93.3% | ✅ PASS |
| **F1-Score @ 3** | > 45.0% | 48.3% | ✅ PASS |
| **NDCG @ 1** | > 0.8000 | 0.9333 | ✅ PASS |
| **NDCG @ 3** | > 0.8500 | 0.9544 | ✅ PASS |
| **Mean Reciprocal Rank (MRR)** | > 0.8500 | 0.9500 | ✅ PASS |
| **Mean Average Precision (MAP@3)** | N/A | 0.9500 | ✅ DETECTED |
| **Average Relevance Score** | > 0.5000 | 0.6111 | ✅ PASS |
| **Retrieve Latency (Avg)** | < 2000 ms | 871.1 ms | ✅ PASS |
| **Retrieve Latency P50 / P95 / P99** | N/A | 941.6 / 1377.7 / 1437.4 ms | ✅ MEASURED |

### 2. RAGAS-Style Context Quality Metrics
> Context Precision and Recall are computed from retrieval results only (no LLM judge required).
> Faithfulness and Answer Relevancy use Gemini Flash as an LLM judge (Sprint 2).

| Metric | Target | Actual | Status |
|---|---|---|---|
| **RAGAS Context Precision @ 3** | > 0.80 | 0.9500 | ✅ PASS |
| **RAGAS Context Recall @ 3** | > 0.80 | 0.9667 | ✅ PASS |
| **RAGAS Faithfulness** | > 0.90 | 0.9828 | ✅ PASS |
| **RAGAS Answer Relevancy** | > 0.85 | 1.0000 | ✅ PASS |

### 2b. LLM-as-Judge Explanation Quality Rubric (§3.4) — Sprint 2
> Scores on a 1–5 scale per dimension (normalized 0–1). Evaluated on 30 queries.

| Dimension | Score (1-5) | Normalized (0-1) |
|---|---|---|
| **Clarity** | 5.00 / 5 | 1.0000 |
| **Actionability** | 4.90 / 5 | 0.9741 |
| **Technical Accuracy** | 4.93 / 5 | 0.9828 |
| **Conciseness** | 5.00 / 5 | 1.0000 |
| **Overall (Average)** | 4.96 / 5 | 0.9892 |


### 3. Abstain Guardrail Path Metrics (15 Queries: 10 off-domain + 5 near-miss)
| Metric | Target | Actual | Status |
|---|---|---|---|
| **Guardrail Success Rate (overall)** | 100.0% | 100.0% | ✅ PASS |
| **Off-domain Abstain Rate** | 100.0% | 100.0% | ✅ PASS |
| **Near-miss Abstain Rate** | 100.0% | 100.0% | ✅ PASS |
| **Average Abstain Latency** | < 2000 ms | 1449.2 ms | ✅ PASS |
| **Abstain Latency P50 / P95 / P99** | N/A | 1370.3 / 1830.3 / 1885.8 ms | ✅ MEASURED |

---

## 📈 Score Distribution & Threshold Sensitivity

### 1. Relevance Score Statistics
- **Minimum Score:** `0.2487`
- **Maximum Score:** `0.7698`
- **Standard Deviation:** `0.1007`
- **Near-Threshold Passes (within 0.05 of threshold):** `0/30` queries (fragile queries that may fail if the database or model changes).

### 2. Threshold Sweep Analysis
The table below shows the trade-off between retrieval success rate, guardrail success rate, and robustness query success rate across different similarity threshold values.

| Threshold | Retrieval Success (Hit@3) | Guardrail Success (Abstain Rate) | Robustness Success (Hit@3) | Harmonic Mean (Balance) |
|:---:|:---:|:---:|:---:|:---:|
| 0.30 | 96.7% | 80.0% | 100.0% | 0.8755 |
| 0.35 | 96.7% | 86.7% | 100.0% | 0.9139 |
| 0.38 | 96.7% | 86.7% | 100.0% | 0.9139 |
| 0.40 | 96.7% | 86.7% | 100.0% | 0.9139 |
| 0.42 ⭐ OPTIMAL | 96.7% | 100.0% | 100.0% | 0.9831 |
| 0.45 | 96.7% | 100.0% | 100.0% | 0.9831 |
| 0.48 | 96.7% | 100.0% | 93.3% | 0.9831 |
| 0.50 | 90.0% | 100.0% | 93.3% | 0.9474 |

---

## 🔍 Hybrid Retrieval Analysis (Dense vs Sparse)

This section evaluates the unique value added by combining semantic Vector search (Dense) and keyword BM25 search (Sparse) under a top-3 retrieval scenario.

- **Dense Retriever Success Rate:** 100.0% (30/30 queries found expected document in top-3)
- **Sparse Retriever Success Rate:** 96.7% (29/30 queries found expected document in top-3)
- **Retrieve Path Coverage (Both):** 96.7% (29/30 queries found in both retrievers)
- **Unique Dense Hits:** 3.3% (1/30 queries found *only* by vector search)
- **Unique Sparse Hits:** 0.0% (0/30 queries found *only* by BM25 search)

---

## 🛡️ Robustness Path Evaluation (15 Variant Queries)

Robustness is assessed using spelling errors, abbreviations, and verbose inputs mapping to the golden set.

| Robustness Metric | Target | Actual | Status |
|---|---|---|---|
| **Robustness Hit Rate @ 3** | > 85.0% | 100.0% | ✅ PASS |
| **Robustness MAP@3** | > 0.8000 | 0.9667 | ✅ PASS |
| **Robustness MRR** | > 0.8000 | 0.9667 | ✅ PASS |
| **Robustness Latency P95** | < 2000 ms | 1398.0 ms | ✅ PASS |

### Robustness Results by Category
- **Typo Variants Success Rate:** 100.0%
- **Abbreviation Variants Success Rate:** 100.0%
- **Verbose Variants Success Rate:** 100.0%

---

## Detailed Scenario Results (Retrieve Path)

| Scenario ID | Query | Expected ID | Top Match | Rank | NDCG@3 | Ctx Precision@3 | Ctx Recall@3 | Latency | Status |
|---|---|---|---|:---:|:---:|:---:|:---:|---|---|
| 1 | compressor running hot and showing signs of efficiency loss | `MAN-HPC-01` | `MAN-HPC-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 1052.9 ms | 🟢 PASS |
| 2 | clearance between blades and casing is failing in HPC | `MAN-HPC-02` | `MAN-HPC-02` | 1 | 1.0000 | 1.0000 | 1.0000 | 211.5 ms | 🟢 PASS |
| 3 | blades wearing down due to dirt and needing a clean wash | `MAN-HPC-03` | `MAN-HPC-03` | 1 | 1.0000 | 1.0000 | 1.0000 | 1256.2 ms | 🟢 PASS |
| 4 | surge or aerodynamic block in HPC requiring engine cut | `MAN-HPC-04` | `MAN-HPC-04` | 1 | 1.0000 | 1.0000 | 1.0000 | 557.1 ms | 🟢 PASS |
| 5 | slow fan speed reading and air bypass ratio drops | `MAN-FAN-01` | `MAN-FAN-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 464.8 ms | 🟢 PASS |
| 6 | vibrations matching rotational frequency of the fan | `MAN-FAN-02` | `MAN-FAN-02` | 1 | 1.0000 | 1.0000 | 1.0000 | 462.5 ms | 🟢 PASS |
| 7 | bird strike or debris hitting front engine blades | `MAN-FAN-03` | `MAN-FAN-03` | 1 | 1.0000 | 1.0000 | 1.0000 | 248.9 ms | 🟢 PASS |
| 8 | shaft friction and housing heating up over cycles | `MAN-BRG-01` | `MAN-BRG-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 1185.3 ms | 🟢 PASS |
| 9 | metal fragments found in lubrication system check | `MAN-BRG-02` | `MAN-BRG-02` | 1 | 1.0000 | 1.0000 | 1.0000 | 1276.7 ms | 🟢 PASS |
| 10 | borescope inspection of the lower turbine stages tip clearance | `MAN-LPT-01` | `MAN-LPT-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 569.6 ms | 🟢 PASS |
| 11 | cooling passages clogged or blocked in turbine section | `MAN-LPT-02` | `MAN-LPT-02` | 1 | 1.0000 | 1.0000 | 1.0000 | 1282.0 ms | 🟢 PASS |
| 12 | nozzle soot and combustion chamber liner cracks | `MAN-COMB-01` | `MAN-COMB-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 922.8 ms | 🟢 PASS |
| 13 | abrupt flatline output while redundant channels match normal | `MAN-SEN-01` | `MAN-SEN-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 945.4 ms | 🟢 PASS |
| 14 | gradual offset in measurement channel over time | `MAN-SEN-02` | `MAN-SEN-02` | 1 | 1.0000 | 1.0000 | 1.0000 | 889.2 ms | 🟢 PASS |
| 15 | loose wiring or connectors causing sporadic signal loss | `MAN-SEN-03` | `MAN-SEN-03` | 1 | 1.0000 | 1.0000 | 1.0000 | 1399.3 ms | 🟢 PASS |
| 16 | interacting degradation of the front fan and compressor stage | `MAN-MULTI-01` | `MAN-MULTI-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 588.3 ms | 🟢 PASS |
| 17 | correcting readings based on altitude or flight conditions | `MAN-MULTI-02` | `MAN-MULTI-02` | 1 | 1.0000 | 1.0000 | 1.0000 | 1453.0 ms | 🟢 PASS |
| 18 | cumulative wear across the whole engine fleet fuel flow increase | `MAN-PERF-01` | `MAN-PERF-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 457.3 ms | 🟢 PASS |
| 19 | high fuel consumption required to maintain baseline power | `MAN-PERF-02` | `MAN-PERF-02` | 1 | 1.0000 | 1.0000 | 1.0000 | 1134.5 ms | 🟢 PASS |
| 20 | air duct leak or failure in the bleed control valve | `MAN-BLEED-01` | `MAN-BLEED-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 961.7 ms | 🟢 PASS |
| 21 | exceeding tool operational time threshold on factory line | `MAN-TWF-01` | `MAN-TWF-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 340.0 ms | 🟢 PASS |
| 22 | insufficient temperature delta between ambient and process cooling | `MAN-HDF-01` | `MAN-HDF-02` | 2 | 0.6309 | 0.5000 | 1.0000 | 810.9 ms | 🟢 PASS |
| 23 | workpiece processing torque exceeds electrical threshold bounds | `MAN-PWF-01` | `MAN-PWF-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 937.8 ms | 🟢 PASS |
| 24 | worn cutting edge causing excessive motor load | `MAN-OSF-01` | `MAN-OSF-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 285.2 ms | 🟢 PASS |
| 25 | defect in manufacturing materials that cannot be predicted by speed | `MAN-RNF-01` | `MAN-RNF-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 447.3 ms | 🟢 PASS |
| 26 | monitoring sensor patterns over multiple operations cycles before trigger | `MAN-GUIDE-01` | `MAN-GUIDE-01` | 1 | 1.0000 | 1.0000 | 1.0000 | 1045.5 ms | 🟢 PASS |
| 27 | ranking maintenance priorities critical vs non-critical failure risks | `MAN-GUIDE-02` | `MAN-GUIDE-02` | 1 | 1.0000 | 1.0000 | 1.0000 | 1351.3 ms | 🟢 PASS |
| 28 | safety margin for remaining useful life prediction planning maintenance schedule | `MAN-GUIDE-03` | `MAN-GUIDE-03` | 1 | 1.0000 | 1.0000 | 1.0000 | 1274.5 ms | 🟢 PASS |
| 29 | which variables are useful for health monitoring of jet engines | `MAN-GUIDE-04` | `MAN-GUIDE-04` | 1 | 1.0000 | 1.0000 | 1.0000 | 1303.5 ms | 🟢 PASS |
| 30 | validation criteria for work orders generated by our agent pipeline | `MAN-GUIDE-05` | None | Not found | 0.0000 | 0.0000 | 0.0000 | 1016.8 ms | 🔴 FAIL |

## Detailed Guardrail Results (Abstain Path)

| Scenario ID | Query | Category | Max Similarity Score | Latency | Outcome / Code | Status |
|---|---|---|:---:|---|---|---|
| 1 | How to bake a chocolate chip cookie at home | Off-domain | 0.0369 | 1240.8 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 2 | Who won the FIFA World Cup soccer championship in 2022 | Off-domain | 0.0834 | 1370.3 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 3 | What is the capital of France and its population | Off-domain | 0.0000 | 1899.6 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 4 | How to write a python script to parse logs and send email | Off-domain | 0.0510 | 1381.8 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 5 | Reset the administrator password on Windows Server active directory | Off-domain | 0.0000 | 1345.7 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 6 | What is the current stock price of Apple and Google today | Off-domain | 0.0861 | 1745.4 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 7 | Standard operating procedure for sorting warehouse packages and boxes | Off-domain | 0.1666 | 1557.9 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 8 | How to fix a flat tire on a mountain bicycle step by step | Off-domain | 0.1705 | 1336.5 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 9 | Verify SQL database backup retention policy and schedule | Off-domain | 0.0920 | 1323.8 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 10 | Tell me a joke about software developers or engineers | Off-domain | 0.0000 | 1266.6 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 11 | What is the maximum torque specification for turbofan engine bolts | Near-miss | 0.2552 | 1800.5 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 12 | How often should engine oil be changed in a commercial aircraft | Near-miss | 0.2829 | 1459.7 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 13 | What certifications are required for aircraft engine maintenance technicians | Near-miss | 0.4181 | 1351.1 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 14 | How to calculate compressor map and surge line for a new engine design | Near-miss | 0.4039 | 1010.3 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |
| 15 | What is the price of a replacement HPC blade for CFM56 engine | Near-miss | 0.3475 | 1648.1 ms | `NO_RELEVANT_PASSAGE` | 🟢 PASS |

## Detailed Robustness Results

| Scenario ID | Category | Query | Expected ID | Match | Rank | Score | Latency | Status |
|---|---|---|---|---|---|---|---|---|
| R1 | Typo | copmressor running hte hot and shoing efficiency loss | `MAN-HPC-01` | `MAN-HPC-01` | 1 | 0.5985 | 1223.5 ms | 🟢 PASS |
| R2 | Typo | clearanc between blads and casng failing in HPC | `MAN-HPC-02` | `MAN-HPC-01` | 2 | 0.6475 | 1212.9 ms | 🟢 PASS |
| R3 | Typo | vibratins match rotational freq of the fan | `MAN-FAN-02` | `MAN-FAN-02` | 1 | 0.5686 | 505.5 ms | 🟢 PASS |
| R4 | Typo | coolng passags cloggd or blockd in turbine | `MAN-LPT-02` | `MAN-LPT-02` | 1 | 0.6044 | 1319.9 ms | 🟢 PASS |
| R5 | Typo | abruppt flatlne output while redundant channels match | `MAN-SEN-01` | `MAN-SEN-01` | 1 | 0.5531 | 1024.3 ms | 🟢 PASS |
| R6 | Abbreviation | HPC temp rising, check s3 | `MAN-HPC-01` | `MAN-HPC-01` | 1 | 0.8517 | 959.3 ms | 🟢 PASS |
| R7 | Abbreviation | LPT clearance borescope inspection | `MAN-LPT-01` | `MAN-LPT-01` | 1 | 0.5753 | 452.7 ms | 🟢 PASS |
| R8 | Abbreviation | bearing housing temp s11 s12 rising | `MAN-BRG-01` | `MAN-BRG-01` | 1 | 0.7751 | 1268.8 ms | 🟢 PASS |
| R9 | Abbreviation | combustion chamber liner cracks soot | `MAN-COMB-01` | `MAN-COMB-01` | 1 | 0.5518 | 583.9 ms | 🟢 PASS |
| R10 | Abbreviation | bleed ctrl valve leak s17 s20 | `MAN-BLEED-01` | `MAN-BLEED-01` | 1 | 0.5646 | 852.6 ms | 🟢 PASS |
| R11 | Verbose | The high pressure compressor seems to be running extremely hot and showing serious signs of overall efficiency loss. We should run a diagnosis. | `MAN-HPC-01` | `MAN-HPC-01` | 1 | 0.7157 | 1140.1 ms | 🟢 PASS |
| R12 | Verbose | I am observing some metal fragments in the lubrication system check and want to verify what the recommended action is for bearing wear or failure. | `MAN-BRG-02` | `MAN-BRG-02` | 1 | 0.6705 | 1580.3 ms | 🟢 PASS |
| R13 | Verbose | Could you help check the loose wiring or connectors that might be causing sporadic signal loss on sensor channel s15? | `MAN-SEN-03` | `MAN-SEN-03` | 1 | 0.7051 | 1195.6 ms | 🟢 PASS |
| R14 | Verbose | We are experiencing a situation where we need to know the validation criteria for work orders generated by our agent pipeline, specifically general rules. | `MAN-GUIDE-05` | `MAN-GUIDE-05` | 1 | 0.4708 | 1193.8 ms | 🟢 PASS |
| R15 | Verbose | Please check the safety margin for remaining useful life prediction planning maintenance schedule as well as guidelines. | `MAN-GUIDE-03` | `MAN-GUIDE-03` | 1 | 0.6194 | 1192.9 ms | 🟢 PASS |

---

## ✅ Sprint 2 Completion Status

All Sprint 2 backlog items have been completed. See detailed results above and in the
linked reports.

| Item | Owner | Status |
|---|---|---|
| RAGAS Faithfulness | RAG team | ✅ COMPLETED |
| RAGAS Answer Relevancy | RAG team | ✅ COMPLETED |
| LLM-as-judge explanation quality rubric (§3.4) | Evaluation team | ✅ COMPLETED |
| Work-order usefulness approval rate | Agent team | ✅ COMPLETED — see `work_order_eval_report.md` |
| Early-detection lead time backtest on C-MAPSS FD001 | ML team | ✅ COMPLETED — see `lead_time_backtest_FD001.md` |
