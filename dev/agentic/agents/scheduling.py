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

import google.generativeai as genai

from dev.agentic.state import MechSageState
from dev.agentic.config import OrchestratorConfig

# Load .env from project root
try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).resolve().parents[3] / ".env"
    load_dotenv(dotenv_path=_env_path, override=False)
except ImportError:
    pass

_config = OrchestratorConfig()


def _get_model() -> genai.GenerativeModel:
    """Lazy-init the cheap Gemini model for Scheduling."""
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    return genai.GenerativeModel(
        model_name=_config.cheap_model,
        system_instruction=textwrap.dedent("""\
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
        """),
    )


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

    print(f"[Scheduling] Proposing maintenance window for {asset_id} "
          f"(priority: {priority}, RUL: {rul:.0f})...")

    model = _get_model()

    prompt = (
        f"Propose a maintenance schedule for the following:\n\n"
        f"ASSET: {asset_id}\n"
        f"PRIORITY: {priority}\n"
        f"RUL: {rul:.0f} cycles remaining\n"
        f"FAULT: {work_order.get('fault', 'unknown')}\n\n"
        f"Propose the maintenance window now."
    )

    try:
        response = model.generate_content(
            prompt,
            generation_config={"max_output_tokens": 256, "temperature": 0.0},
        )
        schedule_text = response.text.strip()
    except Exception as exc:
        schedule_text = f"[SchedulingError] {exc}"
        print(f"[Scheduling] ERROR: {exc}")

    msg = (
        f"[Scheduling] ✓ Schedule proposed. "
        f"Awaiting human approval (approval_status='pending')."
    )
    print(msg)
    print(f"[Scheduling] Proposal:\n{schedule_text}")

    return {
        "schedule_proposal": schedule_text,
        "approval_status": "pending",
        "status": "awaiting_approval",
        "messages": [msg],
    }
