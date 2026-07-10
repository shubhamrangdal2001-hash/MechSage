# MechSage — NASA C-MAPSS Model Comparison Report

This report provides a side-by-side performance evaluation of the Machine Learning models trained on the **NASA C-MAPSS Turbofan Engine Degradation Dataset** (subsets FD001, FD002, FD003, and FD004). 

It compares models across two key predictive maintenance tasks:
1. **Task A: Remaining Useful Life (RUL) Regression** (North-star predictive capability)
2. **Task B: Anomaly & Degradation Detection** (Always-on fleet monitoring alert gateway)

---

## 1. Executive Summary

* **Best RUL Regression Model**: **Random Forest** is best for single-operating-condition environments (FD001 & FD003). For complex multi-operating condition environments (FD002 & FD004), **Linear Regression** currently shows better generalized stability in our pipeline, though tree-boosting algorithms (XGBoost/LightGBM) are recommended for final production once multi-regime normalization is fully configured.
* **Best Anomaly Detection Model**: **LightGBM Anomaly Classifier** (Supervised) comprehensively dominates Isolation Forest (Unsupervised) across all subsets, achieving a peak validation/test F1-score of **0.8079** (on FD003) and ROC-AUCs consistently **> 0.98**.

---

## 2. RUL Regression Model Comparison (Task A)

The models predict the exact number of cycles remaining before engine failure. The primary optimization metric is **Root Mean Squared Error (RMSE)** (lower is better).

| Dataset Subset | Model Name | RMSE (Cycles) ↓ | MAE (Cycles) ↓ | R² Score ↑ | Status |
|---|---|---|---|---|---|
| **FD001** <br> *(1 operating condition, 1 fault)* | Linear Regression <br> **Random Forest** | 14.64 <br> **13.37** | 11.71 <br> **9.27** | 0.718 <br> **0.765** | **Winner: Random Forest** |
| **FD002** <br> *(6 operating conditions, 1 fault)* | **Linear Regression** <br> Random Forest | **15.31** <br> 18.69 | **12.27** <br> 14.58 | **0.718** <br> 0.580 | **Winner: Linear Regression** |
| **FD003** <br> *(1 operating condition, 2 faults)* | Linear Regression <br> **Random Forest** | 13.11 <br> **11.55** | 10.06 <br> **6.99** | 0.721 <br> **0.784** | **Winner: Random Forest** |
| **FD004** <br> *(6 operating conditions, 2 faults)* | **Linear Regression** <br> Random Forest | **14.99** <br> 16.74 | **11.11** <br> 11.55 | **0.654** <br> 0.568 | **Winner: Linear Regression** |

### Key Takeaways (RUL Regression):
* **Non-Linear Dynamics**: For simple datasets with a single operating condition (FD001, FD003), Random Forest outperforms Linear Regression by capturing non-linear decay curves. It achieves a test RMSE of **11.55** cycles on FD003.
* **Multi-Regime Challenges**: On complex multi-regime datasets (FD002, FD004), Random Forest's performance degrades (RMSE climbs to 18.69 on FD002). This highlights the need for advanced feature normalization (such as regime-based scaling) to prevent tree-based models from splitting inappropriately on operational settings rather than degradation patterns.

---

## 3. Anomaly Detection Model Comparison (Task B)

The models classify if an engine cycle is within 30 cycles of predicted failure (`RUL <= 30` labeled as `anomaly = 1`). The primary optimization metric is the **F1-Score** (harmonic mean of precision and recall).

| Dataset | Anomaly Model | ROC-AUC ↑ | PR-AUC ↑ | F1-Score ↑ | Precision ↑ | Recall ↑ |
|---|---|---|---|---|---|---|
| **FD001** | Isolation Forest <br> **LightGBM Anomaly** | 0.9625 <br> **0.9952** | 0.4085 <br> **0.8548** | 0.5000 <br> **0.7386** | 0.5160 <br> **0.8391** | 0.4849 <br> **0.6596** |
| **FD002** | Isolation Forest <br> **LightGBM Anomaly** | 0.4577 <br> **0.9884** | 0.0270 <br> **0.7999** | 0.0532 <br> **0.7092** | 0.0283 <br> **0.6384** | 0.4526 <br> **0.7976** |
| **FD003** | Isolation Forest <br> **LightGBM Anomaly** | 0.9492 <br> **0.9982** | 0.2054 <br> **0.9184** | 0.2513 <br> **0.8079** | 0.1598 <br> **0.7796** | 0.5876 <br> **0.8385** |
| **FD004** | Isolation Forest <br> **LightGBM Anomaly** | 0.5201 <br> **0.9875** | 0.0206 <br> **0.6931** | 0.0430 <br> **0.6279** | 0.0224 <br> **0.6194** | 0.5347 <br> **0.6366** |

### Key Takeaways (Anomaly Detection):
* **Supervised Dominance**: The supervised **LightGBM Anomaly Classifier** massively outperforms Isolation Forest. Since we can derive ground-truth failure labels from historical run-to-failure records, supervised training is highly recommended.
* **The Failure of Unsupervised Models in Multi-Regime Datasets**: Unsupervised **Isolation Forest** collapses entirely on FD002 and FD004 (F1-Scores **< 0.06**). Because the engines change altitude, speed, and settings across 6 regimes, the unsupervised model flags normal operational transitions as anomalies, resulting in severe false alarm rates. LightGBM handles this easily by learning to ignore operational settings when predicting actual failure signs.

---

## 4. Final Recommendations for MechSage Architecture

1. **Anomaly Gateway (Fleet Monitoring)**:
   * **Deploy Supervised LightGBM Classifier**. It minimizes alarm fatigue by maintaining a high Precision (up to **83.9%** on FD001) while achieving high Recall (**83.8%** on FD003) to ensure failures are not missed.
   * *Keep Isolation Forest only as a fallback option* for new asset types where no historical run-to-failure (RUL) training datasets have been recorded yet.

2. **RUL Diagnosis Agent**:
   * **Deploy Random Forest** (or a tuned gradient booster like XGBoost/LightGBM Regressor) as the core engine for single-regime assets.
   * Prior to scaling the tree-based RUL model to multi-operating assets, implement **regime-based normalization** (standardizing sensor readings relative to their specific operational envelope clusters) rather than global MinMax scaling.
