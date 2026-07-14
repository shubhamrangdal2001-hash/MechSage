# 🔬 C-MAPSS FD001 Early-Detection Lead Time Backtest

Generated: 2026-07-14 04:38:51 UTC

**Sprint 2 Item:** Early-detection lead time backtest on C-MAPSS FD001
**Dataset:** NASA C-MAPSS FD001 (test set — 100 engine units)
**Models Used:**
- Anomaly Detector: `IsolationForest` (`best_anomaly_model_FD001.joblib`)
- RUL Predictor: `LinearRegression` (`best_rul_model_FD001.joblib`)

---

## Summary Metrics

| Metric | Value | Target | Status |
|---|---|---|---|
| **Mean Lead Time** | 205.5 cycles | ≥ 25 cycles | ✅ PASS |
| **Median Lead Time** | 198.0 cycles | ≥ 25 cycles | ✅ PASS |
| **P10 Lead Time (worst 10%)** | 152.0 cycles | ≥ 10 cycles | ✅ PASS |
| **P90 Lead Time (best 90%)** | 262.0 cycles | ≥ 50 cycles | ✅ PASS |
| **Early-Warning Rate (RUL > 30 cycles)** | 100/100 = 100.0% | ≥ 70% | ✅ PASS |
| **Detection Rate (any alert)** | 100/100 = 100.0% | 100.0% | ✅ PASS |

> **Lead Time Definition:** Number of true remaining useful life (RUL) cycles at the moment
> the anomaly model first flags the engine as degraded. Higher = more advance warning.
>
> **Early-Warning Rate:** Fraction of engines detected while RUL > 30 cycles remaining
> (enough time for scheduled maintenance intervention).

---

## Per-Engine Backtest Results

| Engine | Total Cycles | Detection Cycle | True RUL at Detection | Predicted RUL | Early? | Status |
|---|---|---|---|---|---|---|
| 1 | 31 | 1 | 142.0 | 1780324.4 | ✅ | EARLY |
| 2 | 49 | 1 | 146.0 | 1780424.8 | ✅ | EARLY |
| 3 | 126 | 1 | 194.0 | 1780452.3 | ✅ | EARLY |
| 4 | 106 | 1 | 187.0 | 1780390.4 | ✅ | EARLY |
| 5 | 98 | 1 | 188.0 | 1780671.6 | ✅ | EARLY |
| 6 | 105 | 1 | 197.0 | 1780522.8 | ✅ | EARLY |
| 7 | 160 | 1 | 250.0 | 1780468.3 | ✅ | EARLY |
| 8 | 166 | 1 | 260.0 | 1780505.3 | ✅ | EARLY |
| 9 | 55 | 1 | 165.0 | 1780376.2 | ✅ | EARLY |
| 10 | 192 | 1 | 287.0 | 1780354.6 | ✅ | EARLY |
| 11 | 83 | 1 | 179.0 | 1780488.4 | ✅ | EARLY |
| 12 | 217 | 1 | 340.0 | 1780460.0 | ✅ | EARLY |
| 13 | 195 | 1 | 289.0 | 1780413.1 | ✅ | EARLY |
| 14 | 46 | 1 | 152.0 | 1780497.4 | ✅ | EARLY |
| 15 | 76 | 1 | 158.0 | 1780454.3 | ✅ | EARLY |
| 16 | 113 | 1 | 196.0 | 1780313.4 | ✅ | EARLY |
| 17 | 165 | 1 | 214.0 | 1780134.2 | ✅ | EARLY |
| 18 | 133 | 1 | 160.0 | 1780501.7 | ✅ | EARLY |
| 19 | 135 | 1 | 221.0 | 1780315.9 | ✅ | EARLY |
| 20 | 184 | 1 | 199.0 | 1780243.5 | ✅ | EARLY |
| 21 | 148 | 1 | 204.0 | 1780646.6 | ✅ | EARLY |
| 22 | 39 | 1 | 149.0 | 1780380.3 | ✅ | EARLY |
| 23 | 130 | 1 | 242.0 | 1780132.6 | ✅ | EARLY |
| 24 | 186 | 1 | 205.0 | 1780274.6 | ✅ | EARLY |
| 25 | 48 | 1 | 192.0 | 1780334.5 | ✅ | EARLY |
| 26 | 76 | 1 | 194.0 | 1779850.6 | ✅ | EARLY |
| 27 | 140 | 1 | 205.0 | 1780134.2 | ✅ | EARLY |
| 28 | 158 | 1 | 254.0 | 1780594.9 | ✅ | EARLY |
| 29 | 171 | 1 | 260.0 | 1780349.2 | ✅ | EARLY |
| 30 | 143 | 1 | 257.0 | 1780413.9 | ✅ | EARLY |
| 31 | 196 | 1 | 203.0 | 1780415.4 | ✅ | EARLY |
| 32 | 145 | 1 | 192.0 | 1780138.0 | ✅ | EARLY |
| 33 | 50 | 1 | 155.0 | 1780538.1 | ✅ | EARLY |
| 34 | 203 | 1 | 209.0 | 1780280.4 | ✅ | EARLY |
| 35 | 198 | 1 | 208.0 | 1780496.0 | ✅ | EARLY |
| 36 | 126 | 1 | 144.0 | 1780548.3 | ✅ | EARLY |
| 37 | 121 | 1 | 141.0 | 1780469.5 | ✅ | EARLY |
| 38 | 125 | 1 | 174.0 | 1780376.8 | ✅ | EARLY |
| 39 | 37 | 1 | 178.0 | 1780177.1 | ✅ | EARLY |
| 40 | 133 | 1 | 160.0 | 1780837.4 | ✅ | EARLY |
| 41 | 123 | 1 | 140.0 | 1780199.7 | ✅ | EARLY |
| 42 | 156 | 1 | 165.0 | 1780668.3 | ✅ | EARLY |
| 43 | 172 | 1 | 230.0 | 1780658.3 | ✅ | EARLY |
| 44 | 54 | 1 | 162.0 | 1780313.0 | ✅ | EARLY |
| 45 | 152 | 1 | 265.0 | 1780459.6 | ✅ | EARLY |
| 46 | 146 | 1 | 192.0 | 1780135.5 | ✅ | EARLY |
| 47 | 73 | 1 | 207.0 | 1780519.7 | ✅ | EARLY |
| 48 | 78 | 1 | 169.0 | 1780454.1 | ✅ | EARLY |
| 49 | 303 | 1 | 323.0 | 1780216.7 | ✅ | EARLY |
| 50 | 74 | 1 | 152.0 | 1780447.1 | ✅ | EARLY |
| 51 | 144 | 1 | 257.0 | 1780165.3 | ✅ | EARLY |
| 52 | 189 | 1 | 217.0 | 1780148.4 | ✅ | EARLY |
| 53 | 164 | 1 | 189.0 | 1780123.3 | ✅ | EARLY |
| 54 | 121 | 1 | 217.0 | 1780562.8 | ✅ | EARLY |
| 55 | 113 | 1 | 249.0 | 1780500.1 | ✅ | EARLY |
| 56 | 136 | 1 | 150.0 | 1780888.1 | ✅ | EARLY |
| 57 | 160 | 1 | 262.0 | 1780754.4 | ✅ | EARLY |
| 58 | 176 | 1 | 212.0 | 1780559.1 | ✅ | EARLY |
| 59 | 94 | 1 | 207.0 | 1780232.0 | ✅ | EARLY |
| 60 | 147 | 1 | 246.0 | 1780173.7 | ✅ | EARLY |
| 61 | 159 | 1 | 179.0 | 1780315.1 | ✅ | EARLY |
| 62 | 232 | 1 | 285.0 | 1780143.3 | ✅ | EARLY |
| 63 | 155 | 1 | 226.0 | 1780313.4 | ✅ | EARLY |
| 64 | 168 | 1 | 195.0 | 1780586.2 | ✅ | EARLY |
| 65 | 71 | 1 | 198.0 | 1780616.9 | ✅ | EARLY |
| 66 | 147 | 1 | 160.0 | 1780692.0 | ✅ | EARLY |
| 67 | 71 | 1 | 147.0 | 1780519.5 | ✅ | EARLY |
| 68 | 187 | 1 | 194.0 | 1780365.6 | ✅ | EARLY |
| 69 | 54 | 1 | 174.0 | 1780315.4 | ✅ | EARLY |
| 70 | 152 | 1 | 245.0 | 1780550.1 | ✅ | EARLY |
| 71 | 68 | 1 | 185.0 | 1780336.4 | ✅ | EARLY |
| 72 | 131 | 1 | 180.0 | 1780069.4 | ✅ | EARLY |
| 73 | 112 | 1 | 242.0 | 1780442.5 | ✅ | EARLY |
| 74 | 137 | 1 | 262.0 | 1780438.0 | ✅ | EARLY |
| 75 | 88 | 1 | 200.0 | 1780401.4 | ✅ | EARLY |
| 76 | 205 | 1 | 214.0 | 1780852.5 | ✅ | EARLY |
| 77 | 162 | 1 | 195.0 | 1780279.1 | ✅ | EARLY |
| 78 | 72 | 1 | 178.0 | 1780586.2 | ✅ | EARLY |
| 79 | 101 | 1 | 163.0 | 1780519.9 | ✅ | EARLY |
| 80 | 133 | 1 | 222.0 | 1780377.3 | ✅ | EARLY |
| 81 | 213 | 1 | 220.0 | 1780534.9 | ✅ | EARLY |
| 82 | 162 | 1 | 170.0 | 1780670.3 | ✅ | EARLY |
| 83 | 73 | 1 | 209.0 | 1780368.3 | ✅ | EARLY |
| 84 | 172 | 1 | 229.0 | 1780669.9 | ✅ | EARLY |
| 85 | 34 | 1 | 151.0 | 1780162.1 | ✅ | EARLY |
| 86 | 110 | 1 | 198.0 | 1780538.6 | ✅ | EARLY |
| 87 | 56 | 1 | 171.0 | 1780497.2 | ✅ | EARLY |
| 88 | 68 | 1 | 182.0 | 1780423.3 | ✅ | EARLY |
| 89 | 177 | 1 | 312.0 | 1780421.9 | ✅ | EARLY |
| 90 | 146 | 1 | 173.0 | 1780260.5 | ✅ | EARLY |
| 91 | 234 | 1 | 271.0 | 1780397.1 | ✅ | EARLY |
| 92 | 150 | 1 | 169.0 | 1780435.0 | ✅ | EARLY |
| 93 | 244 | 1 | 328.0 | 1780604.1 | ✅ | EARLY |
| 94 | 133 | 1 | 187.0 | 1780332.4 | ✅ | EARLY |
| 95 | 89 | 1 | 216.0 | 1780498.0 | ✅ | EARLY |
| 96 | 97 | 1 | 233.0 | 1780422.6 | ✅ | EARLY |
| 97 | 134 | 1 | 215.0 | 1780433.9 | ✅ | EARLY |
| 98 | 121 | 1 | 179.0 | 1780443.8 | ✅ | EARLY |
| 99 | 97 | 1 | 213.0 | 1780105.2 | ✅ | EARLY |
| 100 | 198 | 1 | 217.0 | 1780331.9 | ✅ | EARLY |

---

## Interpretation

- A **lead time ≥ 25 cycles** means maintenance can be proactively scheduled before failure.
- A **lead time < 10 cycles** indicates the model is detecting degradation too late for safe intervention.
- The **P10 lead time** of `152.0 cycles` shows the worst-case advance warning — the 10% of engines
  detected latest. This is the most operationally relevant number for safety planning.

*Report generated by `dev/rag/lead_time_backtest.py` as part of Sprint 2.*
