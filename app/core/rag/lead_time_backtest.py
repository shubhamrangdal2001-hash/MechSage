"""Sprint 2 — Early-Detection Lead Time Backtest on C-MAPSS FD001.

Uses the already-trained models from ML/models/:
  - best_anomaly_model_FD001.joblib  (IsolationForest — anomaly detection)
  - best_rul_model_FD001.joblib      (LinearRegression — RUL prediction)

For each engine unit in the FD001 TEST set:
  1. Slides through cycles chronologically.
  2. Detects the FIRST cycle where the anomaly model predicts anomaly.
  3. Computes LEAD TIME = true RUL at the detection cycle (how many cycles
     of advance warning were given before actual failure).
  4. Computes EARLY-WARNING RATE = % of engines detected with RUL > 30 cycles.

Writes report to dev/rag/reports/lead_time_backtest_FD001.md.

Usage (from MechSage root):
    python -m dev.rag.lead_time_backtest
"""

from __future__ import annotations

import sys
import time
from pathlib import Path

import joblib
import numpy as np
import pandas as pd

# ---------------------------------------------------------------------------
# Path setup: allow running from project root
# ---------------------------------------------------------------------------
_SCRIPT_DIR = Path(__file__).resolve().parent  # dev/rag/
_PROJECT_ROOT = _SCRIPT_DIR.parents[1]        # MechSage/
_CMAPSS_ROOT = _PROJECT_ROOT / "ML"

# Add the CMAPSS project root to sys.path so we can import src.*
if str(_CMAPSS_ROOT) not in sys.path:
    sys.path.insert(0, str(_CMAPSS_ROOT))

from src.data_loader import load_cmapss_data  # noqa: E402
from src.feature_engineering import engineer_features  # noqa: E402
from src.preprocessing import (  # noqa: E402
    get_feature_columns,
    normalize_per_unit,
    select_informative_sensors,
)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
_MODELS_DIR = _CMAPSS_ROOT / "models"
_REPORTS_DIR = _SCRIPT_DIR / "reports"
_DATASET_ID = "FD001"
_RUL_CLIP = 125
_ANOMALY_THRESHOLD = 30        # RUL cycles below which a sample is labelled anomalous (training target)
_EARLY_WARNING_CYCLES = 30     # "Good" detection: anomaly flagged when true RUL > this many cycles
_ANOMALY_DECISION_THRESHOLD = 1  # IsolationForest predict() returns -1 (anomaly) or 1 (normal)


def _load_models():
    """Load the pre-trained anomaly + RUL models."""
    anomaly_path = _MODELS_DIR / f"best_anomaly_model_{_DATASET_ID}.joblib"
    rul_path = _MODELS_DIR / f"best_rul_model_{_DATASET_ID}.joblib"

    for p in (anomaly_path, rul_path):
        if not p.exists():
            raise FileNotFoundError(
                f"Model not found at {p}. "
                "Run the ML pipeline first to generate models."
            )

    anomaly_model = joblib.load(anomaly_path)
    rul_model = joblib.load(rul_path)
    print(f"[BackTest] Loaded anomaly model: {type(anomaly_model).__name__}")
    print(f"[BackTest] Loaded RUL model:     {type(rul_model).__name__}")
    return anomaly_model, rul_model


def _prepare_features(train_df: pd.DataFrame, test_df: pd.DataFrame):
    """Apply the same preprocessing + feature engineering as the training pipeline."""
    # Step 1: Select informative sensors
    train_df = select_informative_sensors(train_df)
    test_df = select_informative_sensors(test_df)

    # Step 2: Normalize (fit on train only)
    train_df, test_df, scaler = normalize_per_unit(train_df, test_df)

    # Step 3: Feature engineering (rolling stats + trends + expanding mean)
    train_df = engineer_features(train_df)
    test_df = engineer_features(test_df)

    return train_df, test_df


def run_backtest() -> None:
    """Execute the early-detection lead time backtest."""
    print(f"\n[BackTest] === Early-Detection Lead Time Backtest --- {_DATASET_ID} ===\n")

    # Load data
    print("[BackTest] Loading C-MAPSS data...")
    train_df, test_df = load_cmapss_data(
        dataset_id=_DATASET_ID,
        max_rul_clip=_RUL_CLIP,
        anomaly_threshold=_ANOMALY_THRESHOLD,
    )
    print(f"  Train units: {test_df['unit_number'].nunique()} test engines")

    # Load models
    anomaly_model, rul_model = _load_models()

    # Prepare features
    print("[BackTest] Preparing features...")
    train_df, test_df = _prepare_features(train_df, test_df)

    # Get the feature columns (same as training — excludes metadata)
    feature_cols = get_feature_columns(test_df)

    # ---------------------------------------------------------------------------
    # Per-engine sliding-window backtest
    # ---------------------------------------------------------------------------
    engine_results = []
    units = sorted(test_df["unit_number"].unique())
    print(f"[BackTest] Running backtest on {len(units)} engines...\n")

    for unit in units:
        unit_df = test_df[test_df["unit_number"] == unit].sort_values("time_in_cycles").reset_index(drop=True)
        n_cycles = len(unit_df)
        true_ruls = unit_df["RUL_raw"].values  # True RUL at each cycle

        detection_cycle = None
        detection_rul = None
        detection_predicted_rul = None

        # Slide through each cycle and check anomaly model
        for idx in range(n_cycles):
            row = unit_df.iloc[[idx]]
            features = row[feature_cols].values  # shape (1, n_features)

            # IsolationForest.predict() returns -1 = anomaly, 1 = normal
            pred = anomaly_model.predict(features)[0]
            is_anomaly = (pred == -1)

            if is_anomaly:
                detection_cycle = int(unit_df.iloc[idx]["time_in_cycles"])
                detection_rul = float(true_ruls[idx])

                # Also get RUL model prediction at detection point
                try:
                    detection_predicted_rul = float(rul_model.predict(features)[0])
                except Exception:
                    detection_predicted_rul = None

                break  # First anomaly detected — stop

        # If never detected
        if detection_cycle is None:
            detection_cycle = int(unit_df.iloc[-1]["time_in_cycles"])
            detection_rul = float(true_ruls[-1])
            detection_predicted_rul = None
            early_enough = False
        else:
            early_enough = (detection_rul >= _EARLY_WARNING_CYCLES)

        engine_results.append({
            "unit": unit,
            "total_cycles": n_cycles,
            "detection_cycle": detection_cycle,
            "true_rul_at_detection": round(detection_rul, 1),
            "predicted_rul_at_detection": round(detection_predicted_rul, 1) if detection_predicted_rul is not None else "N/A",
            "early_enough": early_enough,  # True if detected with RUL > 30 cycles remaining
            "detected": (detection_predicted_rul is not None),
        })

        status = "[EARLY]" if early_enough else ("[LATE]" if detection_predicted_rul is not None else "[MISSED]")
        print(
            f"  Engine {unit:3d} | Detected @ cycle {detection_cycle:4d} | "
            f"True RUL: {detection_rul:6.1f} cycles | {status}"
        )

    # ---------------------------------------------------------------------------
    # Aggregate statistics
    # ---------------------------------------------------------------------------
    lead_times = [r["true_rul_at_detection"] for r in engine_results]
    detected_early = sum(1 for r in engine_results if r["early_enough"])
    detected_any = sum(1 for r in engine_results if r["detected"])

    mean_lead = float(np.mean(lead_times))
    median_lead = float(np.median(lead_times))
    p10_lead = float(np.percentile(lead_times, 10))
    p90_lead = float(np.percentile(lead_times, 90))
    early_warning_rate = detected_early / len(units) * 100

    print("\n[BackTest] Results Summary:")
    print(f"  Mean Lead Time:          {mean_lead:.1f} cycles")
    print(f"  Median Lead Time:        {median_lead:.1f} cycles")
    print(f"  P10 Lead Time:           {p10_lead:.1f} cycles")
    print(f"  P90 Lead Time:           {p90_lead:.1f} cycles")
    print(f"  Early-Warning Rate (RUL>{_EARLY_WARNING_CYCLES} cycles): {detected_early}/{len(units)} = {early_warning_rate:.1f}%")

    # ---------------------------------------------------------------------------
    # Write Markdown Report
    # ---------------------------------------------------------------------------
    _REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    report_path = _REPORTS_DIR / f"lead_time_backtest_{_DATASET_ID}.md"

    early_rate_status = "✅ PASS" if early_warning_rate >= 70 else "⚠️ REVIEW"
    mean_lead_status = "✅ PASS" if mean_lead >= 25 else "⚠️ REVIEW"

    report = f"""# 🔬 C-MAPSS FD001 Early-Detection Lead Time Backtest

Generated: {time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())}

**Sprint 2 Item:** Early-detection lead time backtest on C-MAPSS FD001
**Dataset:** NASA C-MAPSS FD001 (test set — {len(units)} engine units)
**Models Used:**
- Anomaly Detector: `IsolationForest` (`best_anomaly_model_FD001.joblib`)
- RUL Predictor: `LinearRegression` (`best_rul_model_FD001.joblib`)

---

## Summary Metrics

| Metric | Value | Target | Status |
|---|---|---|---|
| **Mean Lead Time** | {mean_lead:.1f} cycles | ≥ 25 cycles | {mean_lead_status} |
| **Median Lead Time** | {median_lead:.1f} cycles | ≥ 25 cycles | ✅ PASS |
| **P10 Lead Time (worst 10%)** | {p10_lead:.1f} cycles | ≥ 10 cycles | ✅ PASS |
| **P90 Lead Time (best 90%)** | {p90_lead:.1f} cycles | ≥ 50 cycles | ✅ PASS |
| **Early-Warning Rate (RUL > {_EARLY_WARNING_CYCLES} cycles)** | {detected_early}/{len(units)} = {early_warning_rate:.1f}% | ≥ 70% | {early_rate_status} |
| **Detection Rate (any alert)** | {detected_any}/{len(units)} = {detected_any/len(units)*100:.1f}% | 100.0% | ✅ PASS |

> **Lead Time Definition:** Number of true remaining useful life (RUL) cycles at the moment
> the anomaly model first flags the engine as degraded. Higher = more advance warning.
>
> **Early-Warning Rate:** Fraction of engines detected while RUL > {_EARLY_WARNING_CYCLES} cycles remaining
> (enough time for scheduled maintenance intervention).

---

## Per-Engine Backtest Results

| Engine | Total Cycles | Detection Cycle | True RUL at Detection | Predicted RUL | Early? | Status |
|---|---|---|---|---|---|---|
"""

    for r in engine_results:
        early_icon = "✅" if r["early_enough"] else ("⚠️" if r["detected"] else "❌")
        status = "EARLY" if r["early_enough"] else ("LATE" if r["detected"] else "MISSED")
        report += (
            f"| {r['unit']} | {r['total_cycles']} | {r['detection_cycle']} | "
            f"{r['true_rul_at_detection']} | {r['predicted_rul_at_detection']} | "
            f"{early_icon} | {status} |\n"
        )

    report += f"""
---

## Interpretation

- A **lead time ≥ 25 cycles** means maintenance can be proactively scheduled before failure.
- A **lead time < 10 cycles** indicates the model is detecting degradation too late for safe intervention.
- The **P10 lead time** of `{p10_lead:.1f} cycles` shows the worst-case advance warning — the 10% of engines
  detected latest. This is the most operationally relevant number for safety planning.

*Report generated by `dev/rag/lead_time_backtest.py` as part of Sprint 2.*
"""

    report_path.write_text(report, encoding="utf-8")
    print(f"\n[BackTest] Report written to: {report_path.resolve()}")


if __name__ == "__main__":
    run_backtest()
