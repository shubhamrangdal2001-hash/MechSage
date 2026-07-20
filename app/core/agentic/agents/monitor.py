"""Per-Asset Monitor Agent — ML boundary node.

This node wraps the existing ML pipeline (RUL regression + anomaly classification).
It calls the ml_predict tool, writes the ML signals into the shared state, and
decides whether to escalate to Diagnostics or declare the asset healthy.

Model: NONE — this is pure Python; no LLM call. The ML models are sklearn/LightGBM
       loaded via joblib.
"""

from __future__ import annotations

from app.core.agentic.state import MechSageState
from app.core.agentic.config import OrchestratorConfig
from app.core.agentic.tools import ml_predict

_config = OrchestratorConfig()


def monitor_node(state: MechSageState) -> dict:
    """
    LangGraph node function for the Per-Asset Monitor.

    1. Calls ml_predict() with the asset's raw telemetry.
    2. Writes rul_estimate, anomaly_flag, anomaly_score, degrading_sensors.
    3. Sets status to either 'normal' or 'escalate' based on thresholds.
    """
    asset_id = state["asset_id"]
    raw_telemetry = state.get("raw_telemetry", {})

    print(f"[Monitor] Running ML inference for asset {asset_id}...")

    # Call the ML pipeline wrapper
    ml_result = ml_predict(
        asset_id=asset_id,
        raw_telemetry=raw_telemetry,
    )

    rul = ml_result["rul_estimate"]
    anomaly = ml_result["anomaly_flag"]
    score = ml_result["anomaly_score"]
    sensors = ml_result["degrading_sensors"]

    # Log results
    print(f"[Monitor] RUL estimate: {rul:.1f} cycles")
    print(f"[Monitor] Anomaly flag: {anomaly} (score: {score:.2f})")
    print(f"[Monitor] Degrading sensors: {sensors}")

    # -------------------------------------------------------------------
    # Decision: should we escalate to Diagnostics?
    # -------------------------------------------------------------------
    should_escalate = (
        anomaly
        or rul < _config.rul_alert_threshold
        or score > _config.anomaly_score_threshold
    )

    if should_escalate:
        status = "escalate"
        msg = (
            f"[Monitor] ⚠ ESCALATING asset {asset_id}: "
            f"RUL={rul:.0f}, anomaly={anomaly}, "
            f"degrading={sensors}"
        )
    else:
        status = "normal"
        msg = (
            f"[Monitor] ✓ Asset {asset_id} is healthy: "
            f"RUL={rul:.0f}, no anomaly detected."
        )

    print(msg)

    return {
        "rul_estimate": rul,
        "anomaly_flag": anomaly,
        "anomaly_score": score,
        "degrading_sensors": sensors,
        "status": status,
        "messages": [msg],
    }
