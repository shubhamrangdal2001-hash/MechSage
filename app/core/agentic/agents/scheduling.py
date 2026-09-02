"""Scheduling Agent — Propose maintenance downtime and gate behind human approval.

This is the final agent in the happy path. It proposes a maintenance schedule
based on the RUL urgency and work order priority, then STOPS at a human-approval
interrupt. Nothing commits without explicit human sign-off.

Model: google/gemini-2.5-flash (simple scheduling logic).
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
    2. Proposes a maintenance window using the flash model via gateway.
    3. Sets approval_status = 'pending_review' to signal the frontend.
       (The actual halt is managed by LangGraph's checkpointer + interrupt_before).
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
        schedule_text = llm_complete(
            model=_config.cheap_model,
            system=_get_system_instruction(),
            user=prompt,
            max_tokens=256,
            temperature=0.0,
        )
    except CircuitOpenError as exc:
        schedule_text = f"[SchedulingError] Circuit OPEN: {exc}"
        print(f"[Scheduling] ERROR: {exc}")
    except Exception as exc:
        schedule_text = f"[SchedulingError] Generation failed: {exc}"
        print(f"[Scheduling] ERROR: {exc}")

    msg = (
        "[Scheduling] ✓ Schedule proposed. "
        "Awaiting human approval (approval_status='pending_review')."
    )
    print(msg)
    print(f"[Scheduling] Proposal:\n{schedule_text}")

    return {
        "schedule_proposal": schedule_text,
        "approval_status": "pending_review",
        # We removed "status": "awaiting_approval" so the graph handles the 
        # pause naturally via checkpointer, without custom routing hacks.
        "messages": [msg],
    }
