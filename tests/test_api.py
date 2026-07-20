import asyncio
import json
from app.main import diagnose, DiagnoseRequest

async def run():
    req = DiagnoseRequest(
        query="Engine Unit #3 (FD001) detected anomalous sensor readings at cycle 42. Flagged sensors: sensor_7, sensor_12. Anomaly score: 0.524. Diagnose the probable fault mode and recommend corrective action.",
        asset_id="FD001-Engine-3",
        degrading_sensors=["sensor_7", "sensor_12"],
        fault_hypothesis="HPC degradation",
        top_k=3,
        generate_answer=True
    )
    res = await diagnose(req)
    print(res.model_dump_json(indent=2))

asyncio.run(run())
