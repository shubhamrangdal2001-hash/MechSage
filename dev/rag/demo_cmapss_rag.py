"""C-MAPSS Dataset End-to-End RAG Simulator.

This script demonstrates how the MechSage RAG pipeline integrates with raw sensor
telemetry from the primary C-MAPSS dataset. It loads the dataset, filters for a
high-cycle engine (near failure), extracts real sensor values, generates natural
language queries, and retrieves the matching maintenance manual recommendations
using asset-scoped filtering.
"""

import pandas as pd
from dev.rag.rag_pipeline import manual_retrieval_rag


def simulate_e2e_cmapss_rag() -> None:
    txt_path = r"NASA_CMAPSS_RUL_Project/data/test_FD001.txt"
    print("=" * 70)
    print("          MECHSAGE C-MAPSS END-TO-END RAG SIMULATOR")
    print("=" * 70)
    print(f"[Demo] Loading C-MAPSS dataset from: {txt_path} ...")
    
    try:
        # Load space-separated C-MAPSS text file
        df = pd.read_csv(txt_path, sep=r"\s+", header=None)
    except FileNotFoundError:
        print(f"[Error] C-MAPSS dataset not found at {txt_path}. Please check the path.")
        return

    print(f"[Demo] Loaded {len(df)} records.")

    # We want to pull rows from Engine 1 at different cycles to simulate degradation
    engine_df = df[df[0] == 1]
    
    # 1. Early cycle (Normal operation)
    early_row = engine_df.iloc[0] # cycle 1
    # 2. Mid cycle (Some symptoms starting to show)
    mid_row = engine_df.iloc[len(engine_df) // 2] # mid cycle
    # 3. Late cycle (Critical degradation - near failure)
    late_row = engine_df.iloc[-1] # final cycle (close to failure)

    # Let's map columns to sensor names according to standard C-MAPSS sensor mapping
    # Column index 5 = s1, 6 = s2, etc. (1-indexed sensors)
    def extract_sensors(row) -> dict:
        return {
            "s2": float(row[6]),
            "s3": float(row[7]),
            "s4": float(row[8]),
            "s7": float(row[11]),
            "s8": float(row[12]),
            "s9": float(row[13]),
            "s11": float(row[15]),
            "s12": float(row[16]),
            "s13": float(row[17]),
            "s14": float(row[18]),
            "s15": float(row[19]),
            "s17": float(row[21]),
            "s20": float(row[24]),
            "s21": float(row[25]),
        }

    scenarios = [
        {
            "name": "Normal Operation (Early Cycle)",
            "row": early_row,
            "hypothesis": "general",
            "degrading_sensors": [],
            "query_template": "Engine is running normally. Static pressure s11 is {s11:.2f} and core speed s9 is {s9:.2f}."
        },
        {
            "name": "High Pressure Compressor Degradation (Late Cycle)",
            "row": late_row,
            "hypothesis": "high pressure compressor degradation",
            "degrading_sensors": ["s2", "s3", "s4", "s7", "s11"],
            "query_template": "Observed high core temperatures: s2={s2:.2f}, s3={s3:.2f}, s4={s4:.2f}. Static HPC pressure s11 is elevated at {s11:.2f} and outlet pressure s7 is {s7:.2f}."
        },
        {
            "name": "Bearing Wear Alert (Late Cycle)",
            "row": late_row,
            "hypothesis": "bearing wear",
            "degrading_sensors": ["s11", "s12"],
            "query_template": "Sustained increase in core vibration s11 at {s11:.2f} combined with thermal rise s12 at {s12:.2f}."
        },
        {
            "name": "Fan Blade Degradation Alert (Late Cycle)",
            "row": late_row,
            "hypothesis": "fan degradation",
            "degrading_sensors": ["s8", "s13", "s15"],
            "query_template": "Decrease in corrected fan speed s13 at {s13:.2f} and bypass ratio s15 at {s15:.2f} with physical fan speed s8 at {s8:.2f}."
        }
    ]

    print("-" * 70)
    
    for idx, sc in enumerate(scenarios, start=1):
        row = sc["row"]
        cycle = int(row[1])
        engine_id = int(row[0])
        sensors = extract_sensors(row)
        
        # Formulate query using sensor values
        query = sc["query_template"].format(**sensors)
        
        print(f"\n[TRIGGER] DIAGNOSTIC ESCALATION (Engine ID: {engine_id}, Cycle: {cycle})")
        print(f"  * Scenario:      {sc['name']}")
        print(f"  * Sensor Telemetry:")
        print(f"    - LPC temp (s2):   {sensors['s2']:.2f}")
        print(f"    - HPC temp (s3):   {sensors['s3']:.2f}")
        print(f"    - HPC press (s7):  {sensors['s7']:.2f}")
        print(f"    - Fan speed (s8):  {sensors['s8']:.2f}")
        print(f"    - Core speed (s9): {sensors['s9']:.2f}")
        print(f"    - Static press (s11): {sensors['s11']:.2f}")
        print(f"    - Fuel flow (s12): {sensors['s12']:.2f}")
        print(f"    - Corr fan (s13):  {sensors['s13']:.2f}")
        print(f"    - Bypass ratio (s15): {sensors['s15']:.2f}")
        print(f"  * Synthesized Query: \"{query}\"")

        # Call RAG tool with asset-scoped routing (asset_id maps to turbofan engine scope)
        result = manual_retrieval_rag(
            query=query,
            degrading_sensors=sc["degrading_sensors"],
            fault_hypothesis=sc["hypothesis"],
            top_k=2,
            asset_id=f"engine-{engine_id:03d}"
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
    simulate_e2e_cmapss_rag()
