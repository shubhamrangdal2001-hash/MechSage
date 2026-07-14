"""
agent_feed.py
-------------
Formats the dual-model prediction dict into a structured JSON payload
for downstream agents (RAG retrieval, LLM maintenance advisor, etc.).

Payload contract:
  {
    "timestamp": "<ISO-8601>",
    "machine_id": "SIM-FD004",
    "dataset_variant": "FD004",
    "cycle": 142,
    "rul": {
      "prediction_cycles": 23.0,
      "alert": true,
      "severity": "CRITICAL",
      "threshold_cycles": 30
    },
    "anomaly": {
      "score": 0.7821,
      "alert": true,
      "severity": "ANOMALY DETECTED",
      "threshold": 0.5152,
      "model_type": "LightGBM"
    },
    "trigger_agent": true,
    "agent_instruction": "..."    <- plain-English directive for the LLM agent
  }
"""

from __future__ import annotations

import json
from datetime import datetime, timezone


# ── Severity → human-readable instruction ─────────────────────────────────────

_RUL_INSTRUCTIONS: dict[str, str] = {
    "EMERGENCY": (
        "ENGINE FAILURE IMMINENT (RUL ≤ 5 cycles). "
        "Initiate emergency shutdown protocol. "
        "Retrieve Ironside maintenance SOP for immediate engine replacement."
    ),
    "CRITICAL": (
        "Engine has less than 30 cycles of useful life remaining. "
        "Schedule immediate maintenance window. "
        "Retrieve Ironside planned maintenance checklist and spare parts manifest."
    ),
    "NORMAL": None,
}

_ANOMALY_INSTRUCTIONS: dict[str, str] = {
    "ANOMALY DETECTED": (
        "Sensor degradation anomaly detected above confidence threshold. "
        "Retrieve Ironside diagnostic procedures for sensor fault investigation."
    ),
    "NORMAL": None,
}


def build_payload(prediction: dict, timestamp: datetime | None = None) -> dict:
    """
    Convert a raw prediction dict (from predictor.predict_cycle) into a
    structured, agent-ready JSON payload.

    Args:
        prediction: Output dict from predictor.predict_cycle().
        timestamp:  Override timestamp (default: UTC now).

    Returns:
        Structured payload dict.
    """
    ts = timestamp or datetime.now(tz=timezone.utc)

    # Build agent instruction (combine both if both firing)
    instructions = []
    rul_instr = _RUL_INSTRUCTIONS.get(prediction["rul_severity"])
    anomaly_instr = _ANOMALY_INSTRUCTIONS.get(prediction["anomaly_severity"])
    if rul_instr:
        instructions.append(rul_instr)
    if anomaly_instr:
        instructions.append(anomaly_instr)
    if not instructions:
        instructions.append("System nominal. No agent action required.")

    payload = {
        "timestamp": ts.isoformat(),
        "machine_id": prediction["machine_id"],
        "dataset_variant": prediction["dataset_variant"],
        "cycle": prediction["cycle"],
        "rul": {
            "prediction_cycles": prediction["rul_prediction"],
            "alert": prediction["rul_alert"],
            "severity": prediction["rul_severity"],
            "threshold_cycles": 30,
        },
        "anomaly": {
            "score": prediction["anomaly_score"],
            "alert": prediction["anomaly_alert"],
            "severity": prediction["anomaly_severity"],
            "threshold": prediction["anomaly_threshold"],
            "model_type": prediction["anomaly_model_type"],
        },
        "trigger_agent": prediction["trigger_agent"],
        "agent_instruction": " | ".join(instructions),
    }
    return payload


def format_console_row(payload: dict) -> str:
    """
    Return a single compact console line for one engine's cycle result.
    Used by run_live.py for the real-time table display.

    Example:
        [SIM-FD004 | cycle=142] RUL=23.0 [!!] CRITICAL | Anomaly=0.78 [!!] ANOMALY -> AGENT TRIGGERED
    """
    ds = payload["dataset_variant"]
    cycle = payload["cycle"]
    rul_val = payload["rul"]["prediction_cycles"]
    rul_sev = payload["rul"]["severity"]
    a_score = payload["anomaly"]["score"]
    a_sev = payload["anomaly"]["severity"]
    trigger = payload["trigger_agent"]

    rul_icon = "[!!]" if payload["rul"]["alert"] else "[ OK]"
    anom_icon = "[!!]" if payload["anomaly"]["alert"] else "[ OK]"
    trigger_str = " -> !! AGENT TRIGGERED" if trigger else ""

    return (
        f"  [{ds} | cycle={cycle:>3}] "
        f"RUL={rul_val:>6.1f} {rul_icon} {rul_sev:<9} | "
        f"Anomaly={a_score:.4f} {anom_icon} {a_sev}{trigger_str}"
    )


def to_json(payload: dict, indent: int = 2) -> str:
    """Serialise payload to a JSON string."""
    return json.dumps(payload, indent=indent, default=str)
