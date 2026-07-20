"""Fleet Supervisor Agent — Triage incoming requests and route to the correct asset.

This is the entry-point node in the LangGraph pipeline. It receives a fleet-level
request (which may contain telemetry from one or more assets), selects the most
urgent asset, and populates the shared state with asset_id, asset_type, and
raw_telemetry so downstream agents can process it.

Model: gemini-3.1-flash-lite (cheap — this is pure routing, not reasoning).
"""

from __future__ import annotations

import os
import textwrap
from pathlib import Path

from openai import OpenAI

from app.core.agentic.state import MechSageState
from app.core.agentic.config import OrchestratorConfig

# Load .env from project root
try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).resolve().parents[3] / ".env"
    load_dotenv(dotenv_path=_env_path, override=False)
except ImportError:
    pass


_config = OrchestratorConfig()


def _call_llm(system_instruction: str, prompt: str, max_tokens: int, temperature: float) -> str:
    """Helper to call OpenRouter."""
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        default_headers={"HTTP-Referer": "https://github.com/MechSage", "X-Title": "MechSage"}
    )
    response = client.chat.completions.create(
        model=_config.cheap_model,
        messages=[
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": prompt}
        ],
        max_tokens=max_tokens,
        temperature=temperature
    )
    return response.choices[0].message.content.strip()

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
    # LLM path: multiple assets, need triage
    # -------------------------------------------------------------------
    telemetry = state.get("raw_telemetry", {})
    
    prompt = (
        f"The following telemetry snapshot has arrived:\n"
        f"{telemetry}\n\n"
        f"Which asset needs the most urgent attention? Respond in the "
        f"required format."
    )

    try:
        text = _call_llm(
            system_instruction=_get_system_instruction(),
            prompt=prompt,
            max_tokens=128,
            temperature=0.0
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

        print(f"[Supervisor] LLM triage → {asset_id} ({asset_type}): {reason}")
        return {
            "asset_id": asset_id,
            "asset_type": asset_type,
            "status": "supervisor_done",
            "messages": [f"[Supervisor] {reason}"],
        }

    except Exception as exc:
        print(f"[Supervisor] LLM call failed: {exc}")
        return {
            "status": "supervisor_error",
            "error": str(exc),
            "messages": [f"[Supervisor] ERROR: {exc}"],
        }
