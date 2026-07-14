"""
predictor.py
------------
Loads the RUL and Anomaly models for all four datasets and runs dual-model
inference on a pre-built feature vector.

Threshold logic:
  - RUL < RUL_EMERGENCY_THRESHOLD (5 cycles)  → severity = EMERGENCY
  - RUL < RUL_ALERT_THRESHOLD     (30 cycles) → severity = CRITICAL
  - anomaly_score > dataset threshold          → alert = True

Both alerts can fire simultaneously.
"""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

_REPO_ROOT = Path(__file__).resolve().parent.parent
_PROJECT_ROOT = _REPO_ROOT / "NASA_CMAPSS_RUL_Project"
if str(_PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(_PROJECT_ROOT))

import joblib
import numpy as np
import pandas as pd

from inference.feature_builder import (
    ANOMALY_THRESHOLDS,
    RUL_ALERT_THRESHOLD,
    RUL_EMERGENCY_THRESHOLD,
)

# ── Constants ──────────────────────────────────────────────────────────────────

SERVE_MODELS_DIR = _REPO_ROOT / "serve_models"

DATASETS = ("FD001", "FD002", "FD003", "FD004")

# Model types per dataset (matches training selection)
ANOMALY_MODEL_TYPE: dict[str, str] = {
    "FD001": "IsolationForest",
    "FD002": "LightGBM",
    "FD003": "IsolationForest",
    "FD004": "LightGBM",
}


# ── Model loading ─────────────────────────────────────────────────────────────

def load_all_models() -> dict[str, dict[str, Any]]:
    """
    Load RUL and Anomaly models for all four datasets from serve_models/.

    Returns:
        {
          "FD001": {"rul": <model>, "anomaly": <model>},
          "FD002": {...},
          ...
        }
    """
    registry: dict[str, dict[str, Any]] = {}
    for ds in DATASETS:
        rul_path = SERVE_MODELS_DIR / f"RUL_{ds}_model.joblib"
        anomaly_path = SERVE_MODELS_DIR / f"Anomaly_{ds}_model.joblib"

        if not rul_path.exists():
            raise FileNotFoundError(f"RUL model not found: {rul_path}")
        if not anomaly_path.exists():
            raise FileNotFoundError(f"Anomaly model not found: {anomaly_path}")

        print(f"  [{ds}] Loading RUL model ({rul_path.stat().st_size // 1024} KB) ...")
        rul_model = joblib.load(rul_path)
        print(f"  [{ds}] Loading Anomaly model ({anomaly_path.stat().st_size // 1024} KB) ...")
        anomaly_model = joblib.load(anomaly_path)

        registry[ds] = {"rul": rul_model, "anomaly": anomaly_model}
    return registry


# ── Core prediction function ───────────────────────────────────────────────────

def predict_cycle(
    dataset_id: str,
    feature_row: pd.DataFrame,
    models: dict[str, dict[str, Any]],
    cycle: int,
    machine_id: str,
) -> dict:
    """
    Run RUL + Anomaly inference for a single cycle.

    Args:
        dataset_id:  "FD001"–"FD004"
        feature_row: 1×136 scaled feature DataFrame
        models:      Loaded model registry from load_all_models()
        cycle:       Current cycle number (for the output payload)
        machine_id:  Engine identifier string

    Returns:
        dict with full prediction result and alert flags.
    """
    rul_model = models[dataset_id]["rul"]
    anomaly_model = models[dataset_id]["anomaly"]
    anomaly_threshold = ANOMALY_THRESHOLDS[dataset_id]
    anomaly_model_type = ANOMALY_MODEL_TYPE[dataset_id]

    X = feature_row.values  # shape (1, 136)

    # ── RUL prediction ────────────────────────────────────────────────────────
    rul_raw = float(rul_model.predict(X)[0])
    rul_pred = max(0.0, round(rul_raw, 2))   # clip to 0 minimum

    # Severity tiers
    if rul_pred <= RUL_EMERGENCY_THRESHOLD:
        rul_severity = "EMERGENCY"
        rul_alert = True
    elif rul_pred <= RUL_ALERT_THRESHOLD:
        rul_severity = "CRITICAL"
        rul_alert = True
    else:
        rul_severity = "NORMAL"
        rul_alert = False

    # ── Anomaly score ─────────────────────────────────────────────────────────
    if anomaly_model_type == "LightGBM":
        # LightGBM classifier: use predict_proba → probability of class 1
        anomaly_score = float(anomaly_model.predict_proba(X)[0][1])
        anomaly_flag = int(anomaly_score >= anomaly_threshold)
    else:
        # IsolationForest: decision_function returns negativeness of anomaly
        # We convert to a 0–1 score using a sigmoid-like normalisation
        raw_score = float(anomaly_model.decision_function(X)[0])
        # Clip to [-1, 1] then shift to [0, 1] range
        anomaly_score = round(1 / (1 + np.exp(raw_score * 5)), 4)
        anomaly_flag = int(anomaly_score >= anomaly_threshold)

    anomaly_alert = bool(anomaly_flag)
    anomaly_severity = "ANOMALY DETECTED" if anomaly_alert else "NORMAL"

    trigger_agent = rul_alert or anomaly_alert

    return {
        "machine_id": machine_id,
        "dataset_variant": dataset_id,
        "cycle": cycle,
        "rul_prediction": rul_pred,
        "rul_alert": rul_alert,
        "rul_severity": rul_severity,
        "anomaly_score": round(anomaly_score, 4),
        "anomaly_threshold": round(anomaly_threshold, 4),
        "anomaly_alert": anomaly_alert,
        "anomaly_severity": anomaly_severity,
        "anomaly_model_type": anomaly_model_type,
        "trigger_agent": trigger_agent,
    }
