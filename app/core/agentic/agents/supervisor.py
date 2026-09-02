"""Fleet Supervisor Agent — Triage incoming requests and route to the correct asset.

This is the entry-point node in the LangGraph pipeline. It receives a fleet-level
request (which may contain telemetry from one or more assets), selects the most
urgent asset, and populates the shared state with asset_id, asset_type, and
raw_telemetry so downstream agents can process it.

Model: google/gemini-2.5-flash (cheap — this is pure routing, not reasoning).
All LLM calls are routed through the centralized gateway (litellm + circuit breaker).
"""

from __future__ import annotations

import textwrap
from pathlib import Path

from app.core.agentic.state import MechSageState
from app.core.agentic.config import OrchestratorConfig
from app.core.gateway import llm_complete
from app.core.circuit_breaker import CircuitOpenError

# Load .env from project root
try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).resolve().parents[3] / ".env"
    load_dotenv(dotenv_path=_env_path, override=False)
except ImportError:
    pass

_config = OrchestratorConfig()


def _get_system_instruction() -> str:
    return textwrap.dedent("""\
        You are the Fleet Supervisor for MechSage, a predictive-maintenance
        platform for industrial turbofan engines.

        Your job is to triage incoming telemetry alerts and decide which
        asset needs immediate attention. You do NOT diagnose faults — you
        only select and route.

        Always respond in this exact format:
        ASSET_ID: <the asset identifier>
        ASSET_TYPE: <turbofan | milling_machine | ironside>
        REASON: <one sentence explaining why this asset was prioritised>
    """)


def supervisor_node(state: MechSageState) -> dict:
    """
    LangGraph node function for the Fleet Supervisor.

    If asset_id is already set in the state (e.g. by a demo script that
    pre-populates the request), we skip the LLM call and just validate.
    Otherwise we ask the LLM to pick the most urgent asset from the
    telemetry payload.

    All LLM calls go through the centralized gateway with circuit breaker.
    """
    # -------------------------------------------------------------------
    # Fast path: asset already selected (demo / single-asset mode)
    # -------------------------------------------------------------------
    if state.get("asset_id") and state.get("raw_telemetry"):
        asset_type = state.get("asset_type", "turbofan")
        print(f"[Supervisor] Asset pre-selected: {state['asset_id']} (type={asset_type})")
        return {
            "status": "supervisor_done",
            "asset_type": asset_type,
            "messages": [
                f"[Supervisor] Routed to asset {state['asset_id']} ({asset_type})."
            ],
        }

    # -------------------------------------------------------------------
    # LLM path: multiple assets, need triage via gateway
    # -------------------------------------------------------------------
    telemetry = state.get("raw_telemetry", {})

    # If telemetry contains multiple assets (keys are asset IDs)
    if isinstance(telemetry, dict) and len(telemetry) > 1 and all(isinstance(v, dict) for v in telemetry.values()):
        import concurrent.futures
        
        def _score_asset(asset_key: str, data: dict) -> tuple[str, str, str, float]:
            prompt = (
                f"Evaluate urgency for asset {asset_key} given telemetry:\n{data}\n"
                f"Respond in format:\nASSET_ID: {asset_key}\nASSET_TYPE: turbofan\nREASON: <reason>\nURGENCY_SCORE: <1-10>"
            )
            try:
                res = llm_complete(
                    model=_config.cheap_model, system=_get_system_instruction(), user=prompt, max_tokens=128, temperature=0.0
                )
                reason = "Unknown"
                score = 0.0
                for line in res.splitlines():
                    if line.startswith("REASON:"): reason = line.split(":", 1)[1].strip()
                    elif line.startswith("URGENCY_SCORE:"):
                        try: score = float(line.split(":", 1)[1].strip())
                        except ValueError: pass
                return (asset_key, "turbofan", reason, score)
            except Exception:
                return (asset_key, "turbofan", "Failed to evaluate", 0.0)

        print(f"[Supervisor] Concurrently evaluating {len(telemetry)} assets...")
        best_asset, best_type, best_reason, max_score = "", "turbofan", "", -1.0
        with concurrent.futures.ThreadPoolExecutor(max_workers=min(10, len(telemetry))) as executor:
            futures = [executor.submit(_score_asset, k, v) for k, v in telemetry.items()]
            for future in concurrent.futures.as_completed(futures):
                a_id, a_type, reason, score = future.result()
                if score > max_score:
                    best_asset, best_type, best_reason, max_score = a_id, a_type, reason, score

        if best_asset:
            print(f"[Supervisor] Concurrent triage → selected {best_asset} (score {max_score}): {best_reason}")
            return {
                "asset_id": best_asset,
                "asset_type": best_type,
                "status": "supervisor_done",
                "messages": [f"[Supervisor] {best_reason}"],
            }

    # Fallback to single triage call
    prompt = (
        f"The following telemetry snapshot has arrived:\n"
        f"{telemetry}\n\n"
        f"Which asset needs the most urgent attention? Respond in the "
        f"required format."
    )

    try:
        text = llm_complete(
            model=_config.cheap_model,
            system=_get_system_instruction(),
            user=prompt,
            max_tokens=128,
            temperature=0.0,
        )

        # Parse the structured response
        asset_id, asset_type, reason = "", "turbofan", ""
        for line in text.splitlines():
            line = line.strip()
            if line.startswith("ASSET_ID:"):
                asset_id = line.split(":", 1)[1].strip()
            elif line.startswith("ASSET_TYPE:"):
                asset_type = line.split(":", 1)[1].strip().lower()
            elif line.startswith("REASON:"):
                reason = line.split(":", 1)[1].strip()

        print(f"[Supervisor] Gateway triage → {asset_id} ({asset_type}): {reason}")
        return {
            "asset_id": asset_id,
            "asset_type": asset_type,
            "status": "supervisor_done",
            "messages": [f"[Supervisor] {reason}"],
        }

    except CircuitOpenError as exc:
        # Circuit is open — cannot make routing decision safely
        print(f"[Supervisor] Circuit OPEN: {exc}")
        return {
            "status": "failed",
            "error": f"LLM gateway unavailable (circuit open): {exc}",
            "messages": [f"[Supervisor] CIRCUIT OPEN — routing to human review."],
        }
    except Exception as exc:
        print(f"[Supervisor] LLM call failed via gateway: {exc}")
        return {
            "status": "failed",
            "error": str(exc),
            "messages": [f"[Supervisor] ERROR: {exc}"],
        }
