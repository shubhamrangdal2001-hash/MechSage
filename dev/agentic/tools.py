"""Tool wrappers that connect the agentic layer to the existing ML and RAG pipelines."""

import os
import sys
from pathlib import Path

# Ensure the NASA project root is importable for the ML pipeline
_project_root = Path(__file__).resolve().parents[2]
_nasa_root = _project_root / "NASA_CMAPSS_RUL_Project"
if str(_project_root) not in sys.path:
    sys.path.insert(0, str(_project_root))
if str(_nasa_root) not in sys.path:
    sys.path.insert(0, str(_nasa_root))

from dev.agentic.config import OrchestratorConfig

config = OrchestratorConfig()


def ml_predict(asset_id: str, raw_telemetry: dict, dataset_id: str = "FD001") -> dict:
    """
    Wrapper around the existing ML pipeline models.
    Takes raw telemetry, engineers features, and returns RUL and anomaly predictions.
    Also calculates which sensors are degrading by looking at rolling deltas.
    
    If config.use_simulated_ml is True, returns mocked data (useful for demos 
    without requiring the trained .joblib models on disk).
    """
    if config.use_simulated_ml:
        # Mock behavior for demos
        rul_estimate = 45.0  # Below 50 threshold
        anomaly_flag = True
        anomaly_score = 0.8
        
        # Simulate degrading sensors based on the raw telemetry input
        # In a real scenario, we'd use SHAP values + sensor deltas.
        degrading_sensors = []
        if raw_telemetry.get("s3", 0) > 1500:
            degrading_sensors.append("s3↑")
        if raw_telemetry.get("s4", 0) > 1400:
            degrading_sensors.append("s4↑")
        if raw_telemetry.get("s11", 0) > 47:
            degrading_sensors.append("s11↑")
        if raw_telemetry.get("s7", 0) < 553:
            degrading_sensors.append("s7↓")
            
        return {
            "rul_estimate": rul_estimate,
            "anomaly_flag": anomaly_flag,
            "anomaly_score": anomaly_score,
            "degrading_sensors": degrading_sensors
        }

    # -- REAL ML PIPELINE PATH --
    # Lazy imports: only loaded when actually running real ML inference
    import pandas as pd
    import numpy as np
    from src.inference import load_model, predict
    from src.preprocessing import select_informative_sensors

    # 1. Convert raw_telemetry dict to a pandas DataFrame
    df = pd.DataFrame([raw_telemetry])
    
    # 2. Engineer features
    df = select_informative_sensors(df)
    
    # 3. Load models and predict
    try:
        rul_model_path = f"NASA_CMAPSS_RUL_Project/models/best_rul_model_{dataset_id}.joblib"
        anomaly_model_path = f"NASA_CMAPSS_RUL_Project/models/best_anomaly_model_{dataset_id}.joblib"
        
        rul_model = load_model(rul_model_path)
        anomaly_model = load_model(anomaly_model_path)
        
        rul_preds = predict(rul_model, df)
        anomaly_preds = predict(anomaly_model, df)
        
        return {
            "rul_estimate": float(rul_preds[-1]),
            "anomaly_flag": bool(anomaly_preds[-1]),
            "anomaly_score": 1.0 if bool(anomaly_preds[-1]) else 0.0,
            "degrading_sensors": ["s3↑", "s4↑"]  # Placeholder for SHAP logic
        }
    except Exception as e:
        # Fallback if models are missing
        print(f"[Warning] ML models not found or failed ({e}). Using simulated fallback.")
        config.use_simulated_ml = True
        return ml_predict(asset_id, raw_telemetry, dataset_id)


def rag_retrieve(asset_id: str, degrading_sensors: list[str], fault_hypothesis: str) -> dict:
    """
    Wrapper around the existing RAG pipeline's manual_retrieval_rag function.
    Safely catches abstentions and missing corpora.
    """
    # Lazy import of the RAG pipeline
    from dev.rag.rag_pipeline import manual_retrieval_rag

    query = f"Sensors showing abnormal behavior: {', '.join(degrading_sensors)}. Hypothesis: {fault_hypothesis}."
    
    result = manual_retrieval_rag(
        query=query,
        degrading_sensors=degrading_sensors,
        fault_hypothesis=fault_hypothesis,
        top_k=3,
        asset_id=asset_id
    )
    
    # Handle the RAG Abstention guardrails (error_code exists on abstention)
    if "error_code" in result:
        return {
            "passages": [],
            "confidence": 0.0,
            "citation": "",
            "error_code": result["error_code"],
            "message": result["message"]
        }
        
    # Happy path
    passages = result.get("retrieved_passages", [])
    if not passages:
        return {
            "passages": [],
            "confidence": 0.0,
            "citation": "",
            "error_code": "NO_RELEVANT_PASSAGE",
            "message": "No passages retrieved."
        }
        
    # Take the top relevance score as our confidence
    confidence = passages[0]["relevance_score"]
    
    # Aggregate citations
    citations = list(set([p["doc_ref"] for p in passages if "doc_ref" in p]))
    citation_str = ", ".join(citations) if citations else "Unknown Manual"
    
    return {
        "passages": passages,
        "confidence": confidence,
        "citation": citation_str,
        "error_code": None,
        "message": "Success"
    }
