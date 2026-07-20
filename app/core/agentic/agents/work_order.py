"""Work-Order Drafting Agent — Generate structured maintenance work orders.

Takes the diagnosis, retrieved passages, and ML signals, and produces a
structured work order in plain plant language that a technician can execute.

Hard rule: stays grounded in retrieved passages only. Never invents procedures.

Model: gemini-3.1-flash-lite (formatting task, not deep reasoning).
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
        You are a maintenance work order generator for MechSage.

        You draft structured work orders from diagnostic results and
        maintenance manual passages. Your output must be actionable for
        a field technician.

        RULES:
        - Only reference procedures, parts, and safety steps found in the
          provided manual passages. NEVER invent a procedure.
        - Use clear, numbered steps.
        - Include safety/LOTO requirements if mentioned in the passages.
        - Estimate priority based on the RUL value:
            * RUL < 20 cycles → CRITICAL
            * RUL 20-50 → HIGH
            * RUL 50-80 → MEDIUM
            * RUL > 80 → LOW

        Respond in this exact structured format:
        WORK_ORDER_ID: WO-<asset_id>-<timestamp>
        PRIORITY: <CRITICAL|HIGH|MEDIUM|LOW>
        ASSET_ID: <asset id>
        FAULT: <fault hypothesis>
        RUL_ESTIMATE: <number> cycles
        DIAGNOSIS: <brief diagnosis summary>
        RECOMMENDED_ACTIONS:
        1. <step 1>
        2. <step 2>
        ...
        REQUIRED_PARTS: <parts list from manual, or "See manual">
        ESTIMATED_DOWNTIME: <estimate based on procedures>
        SAFETY_REQUIREMENTS: <LOTO/safety notes from manual>
        MANUAL_REFERENCE: <document citations>
    """)


def _estimate_priority(rul: float) -> str:
    """Derive work order priority from RUL estimate."""
    if rul < 20:
        return "CRITICAL"
    elif rul < 50:
        return "HIGH"
    elif rul < 80:
        return "MEDIUM"
    return "LOW"


def work_order_node(state: MechSageState) -> dict:
    """
    LangGraph node function for Work-Order Drafting.

    Takes the diagnosis and retrieved passages from the Diagnostics node
    and generates a structured work order using the flash-lite model.
    """
    asset_id = state["asset_id"]
    rul = state.get("rul_estimate", 0)
    diagnosis = state.get("diagnosis", "")
    fault = state.get("fault_hypothesis", "")
    passages = state.get("retrieved_passages", [])
    citation = state.get("citation", "")
    degrading_sensors = state.get("degrading_sensors", [])

    priority = _estimate_priority(rul)

    print(f"[WorkOrder] Drafting work order for {asset_id} "
          f"(priority: {priority}, model: {_config.cheap_model})...")

    # Build context from retrieved passages
    context_block = "\n\n".join(
        f"[{p.get('doc_ref', 'unknown')}]\n{p.get('text', '')}"
        for p in passages
    )

    prompt = (
        f"Generate a work order for the following:\n\n"
        f"ASSET ID: {asset_id}\n"
        f"FAULT HYPOTHESIS: {fault}\n"
        f"RUL ESTIMATE: {rul:.0f} cycles\n"
        f"PRIORITY: {priority}\n"
        f"DEGRADING SENSORS: {', '.join(degrading_sensors)}\n"
        f"DIAGNOSIS: {diagnosis}\n\n"
        f"MAINTENANCE MANUAL PASSAGES:\n{context_block}\n\n"
        f"MANUAL REFERENCES: {citation}\n\n"
        f"Draft the work order now."
    )

    try:
        work_order_text = _call_llm(
            system_instruction=_get_system_instruction(),
            prompt=prompt,
            max_tokens=768,
            temperature=0.1
        )
    except Exception as exc:
        work_order_text = f"[WorkOrderError] Generation failed: {exc}"
        print(f"[WorkOrder] ERROR: {exc}")

    # Parse into a structured dict
    work_order = {
        "raw_text": work_order_text,
        "asset_id": asset_id,
        "priority": priority,
        "fault": fault,
        "rul_estimate": rul,
        "diagnosis_summary": diagnosis[:300],
        "citation": citation,
    }

    msg = f"[WorkOrder] ✓ Work order drafted (priority: {priority})"
    print(msg)

    return {
        "work_order": work_order,
        "status": "work_order_ready",
        "messages": [msg],
    }
