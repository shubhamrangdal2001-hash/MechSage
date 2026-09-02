# C-MAPSS Feature Selection & Feature Engineering Mathematics Guide

This document presents the complete mathematical formulation, domain rationale, and code implementation details for **Feature Selection** and **Feature Engineering** in the MechSage Predictive Maintenance pipeline.

---

## 1. Feature Selection Strategy

### A. Raw Sensor Analysis
The NASA C-MAPSS dataset provides 21 sensor signals and 3 operational settings for turbofan engines. During exploratory data analysis (EDA), variance testing revealed that 7 of the 21 sensors are near-constant or contain uninformative flat noise across all engine cycles.

### B. Selection & Rejection Matrix

| Column Category | Feature Names | Action | Rationale |
| :--- | :--- | :--- | :--- |
| **Operational Settings** | `op_setting_1`, `op_setting_2`, `op_setting_3` | **Retained (3)** | Captures flight altitude, Mach number, and throttle resolver angle |
| **Informative Sensors** | `sensor_2`, `sensor_3`, `sensor_4`, `sensor_7`, `sensor_8`, `sensor_9`, `sensor_11`, `sensor_12`, `sensor_13`, `sensor_14`, `sensor_15`, `sensor_17`, `sensor_20`, `sensor_21` | **Retained (14)** | High signal variance; directly correlates with mechanical/thermal degradation |
| **Uninformative Sensors** | `sensor_1`, `sensor_5`, `sensor_6`, `sensor_10`, `sensor_16`, `sensor_18`, `sensor_19` | **Dropped (7)** | Near-zero variance across all cycles ($\sigma^2 \approx 0$) |

### C. Implementation Code
Location: `ML/src/preprocessing.py`

```python
INFORMATIVE_SENSORS = [
    "sensor_2", "sensor_3", "sensor_4", "sensor_7", "sensor_8", "sensor_9",
    "sensor_11", "sensor_12", "sensor_13", "sensor_14", "sensor_15",
    "sensor_17", "sensor_20", "sensor_21"
]
OP_SETTINGS = ["op_setting_1", "op_setting_2", "op_setting_3"]
NON_FEATURE_COLS = ["unit_number", "time_in_cycles", "RUL", "RUL_raw", "anomaly"]

def select_informative_sensors(df: pd.DataFrame) -> pd.DataFrame:
    keep_cols = NON_FEATURE_COLS + OP_SETTINGS + INFORMATIVE_SENSORS
    return df[[c for c in keep_cols if c in df.columns]].copy()
```

---

## 2. Feature Engineering Mathematical Formulas

To capture time-series context without causing future temporal data leakage, all features are generated per engine unit (`unit_number`) sorted strictly by cycle order (`time_in_cycles`).

Let $S_{u, t}$ denote the raw reading of sensor $S$ for engine unit $u$ at cycle $t$.

---

### A. Rolling Mean ($\text{RollMean}_{W}$)
- **Concept**: Smooths out high-frequency sensor noise to track short-term, medium-term, and long-term trend lines.
- **Window Sizes**: $W \in \{5, 10, 20\}$ cycles.
- **Formula**:
  $$\text{RollMean}_{W}(S_{u, t}) = \frac{1}{\min(t, W)} \sum_{k=\max(1, t - W + 1)}^{t} S_{u, k}$$
- **Generated Features**: $14 \text{ sensors} \times 3 \text{ windows} = 42 \text{ features}$.
  - Examples: `sensor_2_roll_mean_5`, `sensor_4_roll_mean_10`, `sensor_11_roll_mean_20`.

```python
df[f"{sensor}_roll_mean_{w}"] = (
    df.groupby("unit_number")[sensor]
    .transform(lambda x: x.rolling(window=w, min_periods=1).mean())
)
```

---

### B. Rolling Standard Deviation ($\text{RollStd}_{W}$)
- **Concept**: Measures micro-instability and vibration increase as engine parts degrade over time.
- **Window Sizes**: $W \in \{5, 10, 20\}$ cycles.
- **Formula**:
  $$\text{RollStd}_{W}(S_{u, t}) = \sqrt{ \frac{1}{\min(t, W)} \sum_{k=\max(1, t - W + 1)}^{t} \left( S_{u, k} - \text{RollMean}_{W}(S_{u, t}) \right)^2 }$$
- **Generated Features**: $14 \text{ sensors} \times 3 \text{ windows} = 42 \text{ features}$.
  - Examples: `sensor_7_roll_std_5`, `sensor_14_roll_std_20`.

```python
df[f"{sensor}_roll_std_{w}"] = (
    df.groupby("unit_number")[sensor]
    .transform(lambda x: x.rolling(window=w, min_periods=1).std().fillna(0))
)
```

---

### C. Degradation Delta ($\text{Delta}_{10}$)
- **Concept**: Quantifies immediate acceleration in component wear by measuring how far the current cycle's reading deviates from its 10-cycle local baseline.
- **Formula**:
  $$\text{Delta}_{10}(S_{u, t}) = S_{u, t} - \text{RollMean}_{10}(S_{u, t})$$
- **Generated Features**: $14 \text{ features}$.
  - Examples: `sensor_2_delta`, `sensor_14_delta`.

```python
df[f"{sensor}_delta"] = df[sensor] - df[f"{sensor}_roll_mean_10"]
```

---

### D. Expanding Mean ($\text{ExpandingMean}$)
- **Concept**: Calculates the cumulative lifetime average of a sensor from cycle 1 up to current cycle $t$. Tracks lifetime baseline drift without future leakage.
- **Formula**:
  $$\text{ExpandingMean}(S_{u, t}) = \frac{1}{t} \sum_{k=1}^{t} S_{u, k}$$
- **Generated Features**: $14 \text{ features}$.
  - Examples: `sensor_3_expanding_mean`, `sensor_21_expanding_mean`.

```python
df[f"{sensor}_expanding_mean"] = (
    df.groupby("unit_number")[sensor]
    .transform(lambda x: x.expanding(min_periods=1).mean())
)
```

---

### E. 3D Sequence Windows (Deep Learning Tensors)
- **Concept**: For LSTM, GRU, 1D-CNN, and Transformer architectures, continuous sequential arrays are constructed using a 30-cycle sliding window.
- **Tensor Shape**: $(N_{\text{samples}}, 30, F)$ where $F = 129$ or $136$ engineered features.
- **Formula**:
  $$X_i = \begin{bmatrix} 
  x_{t-29, 1} & x_{t-29, 2} & \dots & x_{t-29, F} \\
  x_{t-28, 1} & x_{t-28, 2} & \dots & x_{t-28, F} \\
  \vdots & \vdots & \ddots & \vdots \\
  x_{t, 1} & x_{t, 2} & \dots & x_{t, F}
  \end{bmatrix}, \quad y_i = \text{RUL}_t$$

---

## 3. Total Feature Count Breakdown

| Feature Category | Count Calculation | Total |
| :--- | :--- | :--- |
| **Operational Settings** | Raw inputs | 3 |
| **Informative Sensors** | Raw inputs | 14 |
| **Rolling Means** | $14 \text{ sensors} \times 3 \text{ windows } (5, 10, 20)$ | 42 |
| **Rolling Std Deviations** | $14 \text{ sensors} \times 3 \text{ windows } (5, 10, 20)$ | 42 |
| **Degradation Deltas** | $14 \text{ sensors} \times 1 \text{ delta } (\text{window}=10)$ | 14 |
| **Expanding Means** | $14 \text{ sensors} \times 1 \text{ expanding mean}$ | 14 |
| **Total Model Inputs ($F$)** | $3 + 14 + 42 + 42 + 14 + 14$ | **129 Features** |
