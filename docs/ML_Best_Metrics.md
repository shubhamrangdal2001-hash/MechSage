# MechSage — ML Best Model Metrics

**Dataset:** NASA C-MAPSS Turbofan Engine Degradation (FD001 – FD004)
**Source:** Actual model artifact outputs — zero estimated values
**Test set:** Official NASA C-MAPSS held-out test set

---

## Task 1 — RUL Regression

**Primary metric: RMSE (lower is better)**

| Dataset | Best Model | MAE | RMSE | R² | Adj. R² | MAPE (%) | NASA PHM Score |
|---|---|---|---|---|---|---|---|
| FD001 | LinearRegression | 29.6866 | 34.5906 | −4.6357 | −8.6302 | 24.8246 | 14,941.32 |
| FD002 | LinearRegression | 23.1768 | 27.1321 | 0.2380 | 0.1399 | 24.3781 | 16,177.01 |
| FD003 | LinearRegression | 12.4787 | 16.1727 | 0.4876 | 0.4265 | 13.8664 | 7,391.97 |
| FD004 | LinearRegression | 13.7888 | 18.3613 | 0.5197 | 0.4634 | 16.2841 | 7,394.51 |

> **FD001 Note:** R² = −4.64 indicates the model performs worse than a naive mean predictor on the official test set. Cause: only 5 training engines — insufficient diversity to generalise. Best validation model was `RandomForest_optuna` (Val RMSE = 29.53, R² = 0.50).

---

## Task 2 — Anomaly Detection

**Primary metrics: F1-Score, ROC-AUC, Balanced Accuracy (imbalanced classes)**

### FD001 — Best Model: `IsolationForest`

| Metric | Value |
|---|---|
| Accuracy | 0.9872 |
| Precision | 0.0000 |
| Recall (Sensitivity) | 0.0000 |
| F1-Score | 0.0000 |
| Specificity (TNR) | 0.9872 |
| ROC-AUC | — |
| PR-AUC | — |
| Balanced Accuracy | 0.0000 |

| | Pred: Normal | Pred: Anomaly |
|---|---|---|
| **True: Normal** | TN = 308 | FP = 4 |
| **True: Anomaly** | FN = 0 | TP = 0 |

> Test set contains **zero anomaly samples** — F1/Recall/MCC = 0 by construction, not model failure.

---

### FD002 — Best Model: `LightGBM_Anomaly`

**Hyperparameters:** n_estimators=120 · learning_rate=0.05 · max_depth=6 · num_leaves=31 · class_weight=balanced · threshold=0.9209 (tuned on validation F1)

| Metric | Value |
|---|---|
| Accuracy | 0.9620 |
| Precision | 0.6571 |
| Recall (Sensitivity) | 0.4259 |
| F1-Score | 0.5169 |
| Specificity (TNR) | 0.9889 |
| ROC-AUC | 0.9674 |
| PR-AUC | 0.5548 |
| Balanced Accuracy | 0.7074 |
| FPR | 0.0111 |
| FNR | 0.5741 |

| | Pred: Normal | Pred: Anomaly |
|---|---|---|
| **True: Normal** | TN = 1,066 | FP = 12 |
| **True: Anomaly** | FN = 31 | TP = 23 |

---

### FD003 — Best Model: `IsolationForest`

**Hyperparameters:** n_estimators=100 · contamination=0.05 · threshold=0.6484

| Metric | Value |
|---|---|
| Accuracy | 0.9967 |
| Precision | 0.0000 |
| Recall (Sensitivity) | 0.0000 |
| F1-Score | 0.0000 |
| Specificity (TNR) | 1.0000 |
| ROC-AUC | 0.9946 |
| PR-AUC | 0.2650 |
| Balanced Accuracy | 0.5000 |
| FPR | 0.0000 |
| FNR | 1.0000 |

| | Pred: Normal | Pred: Anomaly |
|---|---|---|
| **True: Normal** | TN = 1,207 | FP = 0 |
| **True: Anomaly** | FN = 4 | TP = 0 |

> Threshold (0.6484) too conservative — all 4 anomaly samples missed. ROC-AUC = 0.9946 shows the model's scores are well-ranked but the threshold requires lowering.

---

### FD004 — Best Model: `LightGBM_Anomaly` ⭐ Overall Best

**Hyperparameters:** n_estimators=120 · learning_rate=0.05 · max_depth=6 · num_leaves=31 · class_weight=balanced · threshold=0.5152 (tuned on validation F1)

| Metric | Value |
|---|---|
| Accuracy | 0.9805 |
| Precision | 0.5313 |
| Recall (Sensitivity) | 0.6538 |
| F1-Score | 0.5862 |
| Specificity (TNR) | 0.9875 |
| ROC-AUC | 0.8863 |
| PR-AUC | 0.6330 |
| Balanced Accuracy | 0.8207 |
| FPR | 0.0124 |
| FNR | 0.3462 |

| | Pred: Normal | Pred: Anomaly |
|---|---|---|
| **True: Normal** | TN = 1,190 | FP = 15 |
| **True: Anomaly** | FN = 9 | TP = 17 |

---

## Quick Reference Summary

| Dataset | Task | Best Model | Key Metric | Value |
|---|---|---|---|---|
| FD001 | RUL Regression | LinearRegression | RMSE | 34.5906 |
| FD002 | RUL Regression | LinearRegression | RMSE | 27.1321 |
| FD003 | RUL Regression | LinearRegression | RMSE | **16.1727** ✅ |
| FD004 | RUL Regression | LinearRegression | RMSE | 18.3613 |
| FD001 | Anomaly Detection | IsolationForest | F1 | 0.0000 ⚠️ |
| FD002 | Anomaly Detection | LightGBM_Anomaly | F1 | 0.5169 |
| FD003 | Anomaly Detection | IsolationForest | F1 | 0.0000 ⚠️ |
| FD004 | Anomaly Detection | LightGBM_Anomaly | F1 | **0.5862** ✅ |
