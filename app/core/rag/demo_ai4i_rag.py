"""AI4I 2020 Dataset End-to-End RAG Simulator.

This script demonstrates how the MechSage RAG pipeline integrates with raw sensor
telemetry from the AI4I 2020 dataset. It loads the dataset, filters for machine
failures, extracts actual telemetry conditions, generates natural language queries,
and retrieves the matching maintenance manual recommendations using asset-scoped filtering.
"""

import json
import pandas as pd
from app.core.rag.rag_pipeline import manual_retrieval_rag


def simulate_e2e_rag() -> None:
    csv_path = r"C:\Users\siddp\Downloads\ai4i2020.csv"
    print("=" * 70)
    print("          MECHSAGE AI4I 2020 END-TO-END RAG SIMULATOR")
    print("=" * 70)
    print(f"[Demo] Loading AI4I dataset from: {csv_path} ...")
    
    try:
        df = pd.read_csv(csv_path)
    except FileNotFoundError:
        print(f"[Error] AI4I dataset not found at {csv_path}. Please check the path.")
        return

    # Filter for rows that actually failed
    failed_rows = df[df["Machine failure"] == 1]
    print(f"[Demo] Found {len(failed_rows)} machine failure instances out of {len(df)} records.")

    # We want to pull one sample for each failure mode
    failure_modes = {
        "TWF": {
            "name": "Tool Wear Failure",
            "sensors": ["Tool wear [min]", "Torque [Nm]"],
            "hypothesis": "tool wear failure",
            "query_template": "High spindle torque of {Torque} Nm observed. Cutter has been in service for {Tool_wear} minutes showing chatter marks."
        },
        "HDF": {
            "name": "Heat Dissipation Failure",
            "sensors": ["Air temperature [K]", "Process temperature [K]", "Rotational speed [rpm]"],
            "hypothesis": "heat dissipation failure",
            "query_template": "Process temperature is {Process_temperature} K with ambient air at {Air_temperature} K. ROT speed is low at {Rotational_speed} rpm causing heat dissipation failure."
        },
        "PWF": {
            "name": "Power Failure",
            "sensors": ["Rotational speed [rpm]", "Torque [Nm]"],
            "hypothesis": "power failure",
            "query_template": "Rotational speed is {Rotational_speed} rpm with torque at {Torque} Nm, indicating motor power calculation is out of safe envelope."
        },
        "OSF": {
            "name": "Overstrain Failure",
            "sensors": ["Torque [Nm]", "Tool wear [min]"],
            "hypothesis": "overstrain failure",
            "query_template": "Severe overstrain load on cutter. Spindle torque load is {Torque} Nm and tool wear has accumulated to {Tool_wear} minutes."
        },
        "RNF": {
            "name": "Random Failure",
            "sensors": [],
            "hypothesis": "random failure",
            "query_template": "Unexpected spindle interruption or manufacturing material defect. Spindle speed fell to 0 rpm randomly."
        }
    }

    print("-" * 70)
    
    for code, info in failure_modes.items():
        # Find the first row where this failure mode is active
        mode_failures = failed_rows[failed_rows[code] == 1]
        if mode_failures.empty:
            print(f"[Warning] No samples found with active failure mode: {info['name']}")
            continue

        sample_row = mode_failures.iloc[0]
        
        # Extract telemetry details
        air_temp = float(sample_row["Air temperature [K]"])
        proc_temp = float(sample_row["Process temperature [K]"])
        speed = int(sample_row["Rotational speed [rpm]"])
        torque = float(sample_row["Torque [Nm]"])
        wear = int(sample_row["Tool wear [min]"])
        product_id = str(sample_row["Product ID"])
        udi = int(sample_row["UDI"])

        # Format natural language query from template
        query = info["query_template"].format(
            Torque=torque,
            Tool_wear=wear,
            Process_temperature=proc_temp,
            Air_temperature=air_temp,
            Rotational_speed=speed
        )

        print(f"\n[TRIGGER] DIAGNOSTIC ESCALATION (UDI: {udi}, Product ID: {product_id})")
        print(f"  * Failure Mode:  {info['name']} ({code})")
        print(f"  * Sensor Telemetry:")
        print(f"    - Air Temp:         {air_temp} K")
        print(f"    - Process Temp:     {proc_temp} K  (Delta: {round(proc_temp - air_temp, 2)} K)")
        print(f"    - Spindle Speed:    {speed} rpm")
        print(f"    - Spindle Torque:   {torque} Nm")
        print(f"    - Spindle Tool Wear: {wear} min")
        print(f"  * Synthesized Query: \"{query}\"")

        # Define degrading sensor names mapping to standard RAG schemas
        degrading_sensors = []
        if code == "TWF":
            degrading_sensors = ["tool_wear", "torque"]
        elif code == "HDF":
            degrading_sensors = ["air_temperature", "process_temperature"]
        elif code == "PWF":
            degrading_sensors = ["rotational_speed", "torque"]
        elif code == "OSF":
            degrading_sensors = ["torque", "tool_wear"]

        # Call RAG tool with asset-scoped routing (asset_id maps to milling machine scope)
        result = manual_retrieval_rag(
            query=query,
            degrading_sensors=degrading_sensors,
            fault_hypothesis=info["hypothesis"],
            top_k=2,
            asset_id=f"machine-{product_id}"
        )

        # Print RAG outcomes
        print(f"  * RAG Retrieval Output:")
        if "error_code" in result:
            print(f"    [ABSTAIN] RAG ABSTAINED: {result['error_code']} - {result['message']}")
        else:
            print(f"    Latency: {result['retrieval_latency_ms']} ms")
            print(f"    Matches found (top-1 match displayed):")
            passage = result["retrieved_passages"][0]
            print(f"      - Doc Reference:   {passage['doc_ref']}")
            print(f"      - Relevance Score: {passage['relevance_score']:.4f}")
            print(f"      - Manual Content:  {passage['text']}")
            
        print("-" * 70)


if __name__ == "__main__":
    simulate_e2e_rag()
