import sys
import json
from app.core.rag.rag_pipeline import manual_retrieval_rag

res = manual_retrieval_rag(
    query="Engine Unit #3 (FD001) detected anomalous sensor readings at cycle 42. Flagged sensors: sensor_7, sensor_12. Anomaly score: 0.524. Diagnose the probable fault mode and recommend corrective action.",
    degrading_sensors=["sensor_7", "sensor_12"],
    fault_hypothesis="HPC degradation",
    asset_id="FD001-Engine-3"
)
print(json.dumps(res, indent=2))
