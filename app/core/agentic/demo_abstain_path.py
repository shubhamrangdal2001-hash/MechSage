"""Abstain Path Demo — Triggers the RAG abstention → human review route.

Uses an out-of-scope fault (e.g. "hydraulic actuator failure" which is not
in the turbofan knowledge base) to demonstrate that the pipeline correctly
routes to human review instead of hallucinating a diagnosis.

Run from project root:
    python -m dev.agentic.demo_abstain_path
"""

from __future__ import annotations

import sys
import os

# Ensure project root is on the path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from app.core.agentic.graph import mechsage_graph


def main():
    print("=" * 72)
    print("    MECHSAGE AGENTIC ORCHESTRATION — ABSTAIN PATH DEMO")
    print("    (Out-of-Scope Query • Hydraulic Actuator Failure)")
    print("=" * 72)

    # Simulate an engine with sensor patterns that don't match any known
    # fault signature in the knowledge base. The sensors here are set to
    # trigger the anomaly flag in ML but won't match any turbofan fault.
    initial_state = {
        "asset_id": "hydraulic-press-007",
        "asset_type": "turbofan",  # Intentionally mismatched to test abstention
        "raw_telemetry": {
            # Sensors set to trigger anomaly but with unfamiliar pattern
            "s2": 700.0,
            "s3": 1200.0,   # Not high enough to trigger HPC signature
            "s4": 1100.0,
            "s7": 600.0,
            "s8": 2100.0,
            "s9": 8500.0,
            "s11": 40.0,    # Normal range — won't trigger bearing wear
            "s12": 400.0,
            "s13": 2100.0,
            "s14": 7800.0,
            "s15": 9.0,
            "s17": 350.0,
            "s20": 30.0,
            "s21": 20.0,
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

    print("\n[Demo] Starting graph execution (expecting abstain path)...\n")
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
    print(f"📉 RUL Estimate:    {final_state.get('rul_estimate')}")
    print(f"⚠  Anomaly:         {final_state.get('anomaly_flag')}")
    print(f"🔍 Fault:           {final_state.get('fault_hypothesis')}")
    print(f"📋 Diagnosis:       {final_state.get('diagnosis')}")
    print(f"✅ Approval Status: {final_state.get('approval_status')}")

    # Verify the pipeline correctly abstained
    if final_state.get("status") == "human_review":
        print("\n✅ PASS: Pipeline correctly abstained and routed to human review!")
        print("   No work order was generated. No hallucinated diagnosis.")
    else:
        print("\n❌ UNEXPECTED: Pipeline did not abstain. Check the flow.")

    wo = final_state.get("work_order", {})
    if wo and wo.get("raw_text"):
        print("\n⚠ WARNING: A work order was generated when it should NOT have been!")
    else:
        print("✅ No work order generated (correct behavior for abstain path).")

    print(f"\n--- MESSAGE LOG ({len(final_state.get('messages', []))} entries) ---")
    for i, msg in enumerate(final_state.get("messages", []), 1):
        print(f"  {i}. {msg}")

    print("\n" + "=" * 72)
    print("    DEMO COMPLETE")
    print("=" * 72)


if __name__ == "__main__":
    main()
