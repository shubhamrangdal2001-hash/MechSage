"""LangGraph Orchestration Graph — wires all 5 agents into a stateful pipeline.

Graph topology:
    fleet_supervisor → per_asset_monitor → [conditional]
        ├─ normal    → END (asset healthy)
        └─ escalate  → diagnostics → [conditional]
                          ├─ abstain       → human_review → END
                          └─ diagnosed     → work_order   → scheduling → END
"""

from __future__ import annotations

from langgraph.graph import StateGraph, END

from dev.agentic.state import MechSageState
from dev.agentic.agents.supervisor import supervisor_node
from dev.agentic.agents.monitor import monitor_node
from dev.agentic.agents.diagnostics import diagnostics_node
from dev.agentic.agents.work_order import work_order_node
from dev.agentic.agents.scheduling import scheduling_node


# -----------------------------------------------------------------------
# Human Review node (terminal node for the abstain path)
# -----------------------------------------------------------------------
def human_review_node(state: MechSageState) -> dict:
    """
    Terminal node that logs that the pipeline has routed to human review.
    In production, this would send a notification to the maintenance team
    via Pub/Sub, Slack, or a dashboard alert.
    """
    asset_id = state.get("asset_id", "unknown")
    fault = state.get("fault_hypothesis", "unknown")
    diagnosis = state.get("diagnosis", "unresolved")

    msg = (
        f"[HumanReview] 🔴 HUMAN REVIEW REQUIRED\n"
        f"  Asset:      {asset_id}\n"
        f"  Hypothesis:  {fault}\n"
        f"  Diagnosis:   {diagnosis}\n"
        f"  Reason:      The system could not produce a confident, grounded\n"
        f"               diagnosis from the available maintenance manuals.\n"
        f"  Action:      A human maintenance engineer must review this case."
    )
    print(msg)

    return {
        "status": "human_review",
        "approval_status": "needs_human",
        "messages": [msg],
    }


# -----------------------------------------------------------------------
# Conditional edge functions
# -----------------------------------------------------------------------
def route_after_monitor(state: MechSageState) -> str:
    """After the Monitor node, decide whether to escalate or end."""
    if state.get("status") == "escalate":
        return "diagnostics"
    return "end_healthy"


def route_after_diagnostics(state: MechSageState) -> str:
    """After the Diagnostics node, decide whether to draft a work order or
    route to human review."""
    if state.get("status") == "abstain" or state.get("diagnosis") == "unresolved":
        return "human_review"
    return "work_order"


# -----------------------------------------------------------------------
# Build the graph
# -----------------------------------------------------------------------
def build_graph() -> StateGraph:
    """Construct and compile the MechSage orchestration graph."""

    graph = StateGraph(MechSageState)

    # Add nodes
    graph.add_node("supervisor", supervisor_node)
    graph.add_node("monitor", monitor_node)
    graph.add_node("diagnostics", diagnostics_node)
    graph.add_node("work_order", work_order_node)
    graph.add_node("scheduling", scheduling_node)
    graph.add_node("human_review", human_review_node)

    # Set entry point
    graph.set_entry_point("supervisor")

    # Linear edge: supervisor → monitor
    graph.add_edge("supervisor", "monitor")

    # Conditional edge after monitor
    graph.add_conditional_edges(
        "monitor",
        route_after_monitor,
        {
            "diagnostics": "diagnostics",
            "end_healthy": END,
        },
    )

    # Conditional edge after diagnostics
    graph.add_conditional_edges(
        "diagnostics",
        route_after_diagnostics,
        {
            "work_order": "work_order",
            "human_review": "human_review",
        },
    )

    # Linear edges: work_order → scheduling → END
    graph.add_edge("work_order", "scheduling")
    graph.add_edge("scheduling", END)

    # Human review → END
    graph.add_edge("human_review", END)

    return graph.compile()


# Singleton compiled graph
mechsage_graph = build_graph()
