"""Configuration settings for the MechSage Agentic Orchestration Layer."""

from dataclasses import dataclass

@dataclass
class OrchestratorConfig:
    """Config settings for agent thresholds and routing logic."""
    
    # ------------------------------------------------------------------------
    # Routing Thresholds
    # ------------------------------------------------------------------------
    # If ML predicts RUL below this, it triggers escalation to Diagnostics.
    rul_alert_threshold: int = 50
    
    # If ML anomaly score is above this, it triggers escalation to Diagnostics.
    anomaly_score_threshold: float = 0.5
    
    # If Diagnostics RAG similarity score/confidence is below this, 
    # it abstains from generating a work order and routes to human.
    diagnosis_confidence_cutoff: float = 0.50
    
    # ------------------------------------------------------------------------
    # Model Settings (Gemini via AI Studio)
    # ------------------------------------------------------------------------
    # Used for cheap/fast tasks: Supervisor routing, Work-Order formatting
    cheap_model: str = "gemini-3.1-flash-lite"
    
    # Used for complex reasoning: Diagnostics
    strong_model: str = "gemini-3.1-pro"
    
    # ------------------------------------------------------------------------
    # Simulation & ML Paths
    # ------------------------------------------------------------------------
    # If True, bypasses loading .joblib models and returns mock output
    # (Useful for demos when the ML pipeline hasn't been run yet)
    use_simulated_ml: bool = False
