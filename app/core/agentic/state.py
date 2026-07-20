"""LangGraph Shared State Definitions for the MechSage Orchestration Layer."""

from typing import TypedDict, Annotated, Optional
import operator


class MechSageState(TypedDict):
    """
    The shared state dictionary passed between all agentic nodes in the pipeline.
    Fields are updated progressively as the graph executes.
    """
    
    # ------------------------------------------------------------------------
    # Pipeline Metadata
    # ------------------------------------------------------------------------
    status: str
    error: Optional[str]
    messages: Annotated[list, operator.add]
    
    # ------------------------------------------------------------------------
    # 1. Fleet Supervisor Output
    # ------------------------------------------------------------------------
    asset_id: str
    asset_type: str
    raw_telemetry: dict
    
    # ------------------------------------------------------------------------
    # 2. Per-Asset Monitor Output (ML Signals)
    # ------------------------------------------------------------------------
    rul_estimate: Optional[float]
    anomaly_flag: bool
    anomaly_score: float
    degrading_sensors: list[str]
    
    # ------------------------------------------------------------------------
    # 3. Diagnostics Output (RAG + Reasoning)
    # ------------------------------------------------------------------------
    fault_hypothesis: str
    retrieved_passages: list[dict]
    diagnosis: str
    confidence: float
    citation: str
    
    # ------------------------------------------------------------------------
    # 4. Work-Order Drafting Output
    # ------------------------------------------------------------------------
    work_order: dict
    
    # ------------------------------------------------------------------------
    # 5. Scheduling Output
    # ------------------------------------------------------------------------
    schedule_proposal: str
    approval_status: str  # "pending", "approved", "rejected"
