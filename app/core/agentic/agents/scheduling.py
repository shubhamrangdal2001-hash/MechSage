"""Scheduling Agent — Propose maintenance downtime and gate behind human approval.

This is the final agent in the happy path. It proposes a maintenance schedule
based on the RUL urgency and work order priority, then STOPS at a human-approval
interrupt. Nothing commits without explicit human sign-off.

Model: gemini-3.1-flash-lite (simple scheduling logic).
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
        You are the Maintenance Scheduler for MechSage.

        Given a work order with priority and RUL estimate, propose a
        maintenance window. Consider:
        - CRITICAL priority → immediate (within 4 hours)
        - HIGH priority → within 24 hours
        - MEDIUM priority → within 72 hours (next planned window)
        - LOW priority → next scheduled maintenance cycle

        Respond in this exact format:
        PROPOSED_WINDOW: <timeframe description>
        JUSTIFICATION: <one sentence explaining urgency>
        REQUIRES_SHUTDOWN: <Yes|No>
        ESTIMATED_DURATION: <hours>
    """)


def scheduling_node(state: MechSageState) -> dict:
    """
    LangGraph node function for the Scheduling Agent.

    1. Reads the work order from state.
    2. Proposes a maintenance window using flash-lite.
    3. Sets approval_status = 'pending' to trigger human interrupt.
    """
    work_order = state.get("work_order", {})
    asset_id = state.get("asset_id", "unknown")
    rul = state.get("rul_estimate", 0)
    priority = work_order.get("priority", "MEDIUM")

    prompt = (
        f"Propose a maintenance schedule for the following:\n\n"
        f"ASSET: {asset_id}\n"
        f"PRIORITY: {priority}\n"
        f"RUL: {rul:.0f} cycles remaining\n"
        f"FAULT: {work_order.get('fault', 'unknown')}\n\n"
        f"Propose the maintenance window now."
    )

    try:
        schedule_text = _call_llm(
            system_instruction=_get_system_instruction(),
            prompt=prompt,
            max_tokens=256,
            temperature=0.0
        )
    except Exception as exc:
        schedule_text = f"[SchedulingError] {exc}"
        print(f"[Scheduling] ERROR: {exc}")

    msg = (
        "[Scheduling] ✓ Schedule proposed. "
        "Awaiting human approval (approval_status='pending')."
    )
    print(msg)
    print(f"[Scheduling] Proposal:\n{schedule_text}")

    return {
        "schedule_proposal": schedule_text,
        "approval_status": "pending",
        "status": "awaiting_approval",
        "messages": [msg],
    }
