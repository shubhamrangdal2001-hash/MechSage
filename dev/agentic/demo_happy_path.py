"""Happy Path Demo — Full pipeline execution with HPC degradation scenario.

Simulates a late-cycle turbofan engine with High Pressure Compressor degradation.
The graph should traverse: Supervisor → Monitor (escalate) → Diagnostics (confident)
→ Work-Order → Scheduling → Human Approval.

Run from project root:
    python -m dev.agentic.demo_happy_path
"""

from __future__ import annotations

import sys
import os

# Ensure project root is on the path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from dev.agentic.graph import mechsage_graph


def main():
    print("=" * 72)
    print("    MECHSAGE AGENTIC ORCHESTRATION — HAPPY PATH DEMO")
    print("    (HPC Degradation Scenario • Late-Cycle Turbofan)")
    print("=" * 72)

    # Simulate a late-cycle turbofan with elevated temperatures and pressures
    # These are real-ish C-MAPSS sensor values for a degrading engine.
    initial_state = {
        "asset_id": "engine-001",
        "asset_type": "turbofan",
        "raw_telemetry": {
            # Operational settings
            "op_setting_1": 0.0023,
            "op_setting_2": 0.0003,
            "op_setting_3": 100.0,
            # Informative sensors (elevated = degradation)
            "s2": 642.36,   # LPC outlet temp (↑ rising)
            "s3": 1590.52,  # HPC outlet temp (↑ HIGH — triggers hypothesis)
            "s4": 1408.93,  # LPT outlet temp (↑ rising)
            "s7": 550.41,   # HPC outlet pressure (↓ dropping)
            "s8": 2387.89,  # Physical fan speed
            "s9": 9062.17,  # Physical core speed
            "s11": 47.82,   # HPC static pressure (↑ elevated)
            "s12": 522.16,  # Fuel flow ratio
            "s13": 2387.96, # Corrected fan speed
            "s14": 8139.38, # Corrected core speed
            "s15": 8.3841,  # Bypass ratio
            "s17": 393.21,  # Bleed enthalpy
            "s20": 38.95,   # Bleed pressure
            "s21": 23.3735, # HPT coolant bleed
        },
        "status": "initiated",
        "messages": [],
        "error": None,
        # Initialize downstream fields
        "rul_estimate": None,
        "anomaly_flag": False,
        "anomaly_score": 0.0,
        "degrading_sensors": [],
        "fault_hypothesis": "",
        "retrieved_passages": [],
        "diagnosis": "",
        "confidence": 0.0,
        "citation": "",
        "work_order": {},
        "schedule_proposal": "",
        "approval_status": "",
    }

    print("\n[Demo] Starting graph execution...\n")
    print("-" * 72)

    # Run the graph
    final_state = mechsage_graph.invoke(initial_state)

    # -------------------------------------------------------------------
    # Print final results
    # -------------------------------------------------------------------
    print("\n" + "=" * 72)
    print("    FINAL PIPELINE OUTPUT")
    print("=" * 72)

    print(f"\n📊 Status:          {final_state.get('status')}")
    print(f"🔧 Asset:           {final_state.get('asset_id')}")
    print(f"📉 RUL Estimate:    {final_state.get('rul_estimate'):.0f} cycles")
    print(f"⚠  Anomaly:         {final_state.get('anomaly_flag')}")
    print(f"🔍 Fault:           {final_state.get('fault_hypothesis')}")
    print(f"📋 Confidence:      {final_state.get('confidence', 0):.4f}")
    print(f"📖 Citation:        {final_state.get('citation')}")
    print(f"✅ Approval Status: {final_state.get('approval_status')}")

    print(f"\n--- DIAGNOSIS ---")
    print(final_state.get("diagnosis", "(none)"))

    wo = final_state.get("work_order", {})
    if wo:
        print(f"\n--- WORK ORDER (Priority: {wo.get('priority', '?')}) ---")
        print(wo.get("raw_text", "(none)"))

    sched = final_state.get("schedule_proposal", "")
    if sched:
        print(f"\n--- SCHEDULE PROPOSAL ---")
        print(sched)

    print(f"\n--- MESSAGE LOG ({len(final_state.get('messages', []))} entries) ---")
    for i, msg in enumerate(final_state.get("messages", []), 1):
        print(f"  {i}. {msg}")

    print("\n" + "=" * 72)
    print("    DEMO COMPLETE")
    print("=" * 72)


if __name__ == "__main__":
    main()
