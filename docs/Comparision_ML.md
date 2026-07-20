# MechSage — Comprehensive ML/DL Model Comparison Report

This document details the comparative analysis of all Machine Learning (ML) and Deep Learning (DL) models developed for the **NASA C-MAPSS Turbofan Engine Degradation Dataset**. It explains why certain models underperform or fail in specific environments, and provides the justification for the selected production models.

---

## 1. Task A: Remaining Useful Life (RUL) Regression Comparison

RUL Regression models predict the exact number of remaining operational cycles for an engine asset. The primary optimization metric is **Root Mean Squared Error (RMSE)** (lower is better).

### Model Performance and Analysis Table

| Model | Architecture | Performance (FD001 Test RMSE) | Why It Struggles / Underperforms | Why It Succeeds / Best Use Case |
|---|---|---|---|---|
| **Linear Regression** | Ordinary Least Squares (OLS) | ~14.64 | **Underfitting**: Assumes sensor trends are strictly linear. Real engine degradation is non-linear and stays flat early in life before decaying exponentially. | **Fast baseline**: Zero training cost, highly interpretable coefficients, and high stability under multi-regime datasets. |
| **Random Forest** | Bagging Ensemble of Decision Trees | **~13.37** | **Memory/Scale footprint**: Trees can grow extremely large. Struggles to generalize across multiple operating conditions (FD002/FD004) without sub-regime scaling. | **Best Single-Regime Model**: Easily captures non-linear degradation curves, robust to noisy sensors, and resistant to overfitting. |
| **XGBoost / LightGBM** | Sequential Gradient Boosting | ~13.50 | **Hyperparameter Sensitivity**: Highly prone to overfitting on small datasets if `max_depth` and learning rates are not carefully tuned. | **Fleet-Scale Production**: Extremely fast inference speeds (especially LightGBM) and handles highly collinear features naturally. |
| **LSTM / GRU** | Recurrent Neural Networks (RNN) | ~14.00 (Untuned) | **Data Hungry & High Latency**: Requires complex sequence window formatting, takes significantly longer to train, and overfits small datasets. | **Best for Sequence History**: Captures historical temporal trends (e.g., changes 30 cycles ago) that static tree models ignore. |
| **1D CNN** | Convolutional Time-Series Net | ~14.20 | **Lacks Long-Term Memory**: Sliding filters only extract local temporal shapes (e.g., 3-cycle trends) rather than long-range degradation context. | **Fast Deep Learning**: Parallelizes much better than recurrent networks, offering fast sequence modeling. |
| **Transformer** | Multi-Head Self-Attention | ~14.50 | **Overparameterization**: Attention mechanisms have too many weights for the relatively small C-MAPSS training set, leading to overfitting. | **Global Attention**: Can correlate sensor changes at cycle 10 directly with cycle 200 without sequential decay. |

---

### Why the Best RUL Model Was Chosen

#### The Winner for Single-Condition Regimes (FD001 / FD003): **Random Forest**
* **Resilience to Piece-Wise Target**: The C-MAPSS RUL target is capped at a maximum value (e.g., 125 cycles) to represent the healthy phase before degradation starts. Linear models struggle at the transition point (where the slope goes from flat to negative). Random Forest handles this piece-wise linear target naturally by splitting the data into "healthy" and "degrading" clusters.
* **Resilience to Noise**: Out of the 14 informative sensors, many contain high-frequency noise. Random Forest's bootstrap aggregating (bagging) averages out individual node noise, preventing the model from fitting to transient spikes.

#### The Challenger for Fleet-Scale Deployment: **LightGBM Regressor**
* **Compute Constraints**: For an always-on copilot screening hundreds of assets concurrently, LightGBM is the preferred production choice due to its histogram-based splitting, which reduces memory consumption and cuts training/inference latency by up to 10x compared to Random Forest and PyTorch models.

---

## 2. Task B: Anomaly & Degradation Detection Comparison

Anomaly models classify whether an engine cycle is within 30 cycles of predicted failure (`RUL <= 30` labeled as `anomaly = 1`). The primary optimization metric is the **F1-Score** (harmonic mean of Precision and Recall).

### Model Performance and Analysis Table

| Model | Model Type | Test F1-Score (FD001 / FD002) | Why It Struggles / Underperforms | Why It Succeeds / Best Use Case |
|---|---|---|---|---|
| **Isolation Forest** | Unsupervised | 0.5000 / **0.0532** | **Fails under multi-operating regimes**: Flags normal transitions (like altitude or speed adjustments) as anomalies, leading to severe false alarm rates. | **Cold-Start Deployment**: Can be deployed on brand new assets where no historical failure data has been collected yet. |
| **One-Class SVM** | Unsupervised | 0.2513 / 0.0310 | **O(N²) Complexity**: Computationally expensive and slow on large fleet data. Poor boundary estimation in noisy feature spaces. | Good boundary estimation when normal data is tightly clustered. |
| **Autoencoders** | Unsupervised (DL) | ~0.3500 | **Threshold Instability**: Highly sensitive to the defined reconstruction threshold; hard to separate normal sensor noise from early wear. | Excellent for capturing complex multi-sensor correlations. |
| **LightGBM Classifier** | Supervised | **0.7386 / 0.7092** | **Requires Failure Labels**: Cannot be trained or deployed if historical run-to-failure records are unavailable. | **Overall Winner**: Massive performance gain. Learns to ignore regime changes and focuses purely on wear signatures. |

---

### Why the Best Anomaly Model Was Chosen

#### The Winner for All Conditions: **LightGBM Anomaly Classifier (Supervised)**
* **Regime Immunity**: Unsupervised models like Isolation Forest assume that *"uncommon data points are anomalies"*. On multi-regime datasets (FD002/FD004), the engines operate across 6 different environmental conditions. The unsupervised models mistake these normal operational adjustments for engine failures, resulting in massive false alarm rates (Precision under 3%). Because LightGBM is supervised, it learns to ignore environmental variables and only activates when degradation-specific sensor patterns emerge.
* **High Precision & Recall Balance**: The model achieves high precision (reducing alarm fatigue for the reliability engineer) while maintaining high recall (preventing missed critical failures).
* **Imbalance Mitigation**: Uses `class_weight='balanced'` to prevent bias toward the majority class (85% healthy cycles), ensuring the critical 15% degradation window is caught.
