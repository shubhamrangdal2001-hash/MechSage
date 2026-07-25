# 📊 MechSage – Detailed ML Model Metrics

---

## 1️⃣ Anomaly Detection Model Metrics

| Dataset | Model | Precision | Recall | F1‑Score | ROC‑AUC | PR‑AUC |
|--------|-------|-----------|--------|----------|---------|--------|
| **FD001** | Isolation Forest | 51.6% (0.5160) | 48.5% (0.4849) | **0.5000** | 0.9625 | 0.4085 |
| **FD001** | **LightGBM (Best)** | **83.9% (0.8391)** | **66.0% (0.6596)** | **0.7386** | **0.9952** | **0.8548** |
| **FD002** | Isolation Forest | 2.8% (0.0283) | 45.3% (0.4526) | **0.0532** | 0.4577 | 0.0270 |
| **FD002** | **LightGBM (Best)** | **63.8% (0.6384)** | **79.8% (0.7976)** | **0.7092** | **0.9884** | **0.7999** |
| **FD003** | Isolation Forest | 16.0% (0.1598) | 58.8% (0.5876) | **0.2513** | 0.9492 | 0.2054 |
| **FD003** | **LightGBM (Best)** | **78.0% (0.7796)** | **83.9% (0.8385)** | **0.8079** | **0.9982** | **0.9184** |
| **FD004** | Isolation Forest | 2.2% (0.0224) | 53.5% (0.5347) | **0.0430** | 0.5201 | 0.0206 |
| **FD004** | **LightGBM (Best)** | **61.9% (0.6194)** | **63.7% (0.6366)** | **0.6279** | **0.9875** | **0.6931** |

> **Key Insight** – The unsupervised **IsolationForest** collapses on multi‑regime datasets (FD002, FD004) with F1‑Scores < 0.06, while the supervised **LightGBM** consistently delivers strong F1 (≈0.7‑0.81) and high PR‑AUC (≈0.70‑0.92).

---

## 2️⃣ Remaining Useful Life (RUL) Regression Model Metrics

| Dataset | Model | RMSE (cycles) ⬇️ | MAE (cycles) ⬇️ | $R^2$ ⬆️ |
|--------|-------|-------------------|----------------|-----------|
| **FD001** | **RandomForest (Best)** | **13.37** | **9.27** | **0.7650** |
| **FD001** | Linear Regression | 14.64 | 11.71 | 0.7183 |
| **FD002** | **Linear Regression (Best)** | **15.31** | **12.27** | **0.7179** |
| **FD002** | RandomForest | 18.69 | 14.58 | 0.5798 |
| **FD003** | **RandomForest (Best)** | **11.55** | **6.99** | **0.7839** |
| **FD003** | Linear Regression | 13.11 | 10.06 | 0.7212 |
| **FD004** | **Linear Regression (Best)** | **14.99** | **11.11** | **0.6536** |
| **FD004** | RandomForest | 16.74 | 11.55 | 0.5678 |

> **Key Insight** – For single‑regime datasets (FD001 & FD003) the **RandomForest** regressor yields the lowest RMSE (≈11‑13 cycles) and the highest $R^2$ (> 0.76). For the more complex FD002/FD004 sets the linear model performs marginally better, but errors remain > 15 cycles, indicating room for feature engineering or deeper models.

---

## 3️⃣ Summary & Recommendations

1. **Anomaly Detection** – Deploy **LightGBM** as the production anomaly detector for all datasets. Its high ROC‑AUC/PR‑AUC and robust F1 justify the extra training cost.
2. **RUL Regression** – Use **RandomForest** for FD001 & FD003 (the majority of the fleet). For FD002/FD004 consider more expressive models (e.g., Gradient Boosting, LSTM‑based sequence models) to push RMSE below the 15‑cycle threshold.
3. **Context Windows & Temperature** – The Diagnostics Agent (which consumes RUL & anomaly scores) runs with a low temperature (0.1) and a large context window (~8 k tokens) to ensure deterministic, fact‑grounded diagnoses.
4. **Future Work** – Add feature scaling & hyper‑parameter optimisation for the linear models, and explore ensemble stacking of RandomForest + LightGBM predictions to further improve RUL accuracy.

---

*All numbers are taken from the latest evaluation runs under `ML/reports/` and `app/core/rag/reports/`.*
