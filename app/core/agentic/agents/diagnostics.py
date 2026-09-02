"""Diagnostics Agent — RAG boundary + strong-model reasoning.

This is the brain of the pipeline. It:
1. Maps degrading sensors to a fault hypothesis via fault_signatures.
2. Calls the RAG pipeline to retrieve relevant maintenance manual passages.
3. If RAG abstains (no relevant passage / low confidence), routes to human.
4. If passages are found, synthesises a grounded diagnosis using the PRO model.

Model: google/gemini-2.5-pro (strong reasoning — this is where accuracy matters most).
All LLM calls are routed through the centralized gateway (litellm + circuit breaker).

CRITICAL FIX: exceptions during LLM generation are no longer masked as successful
diagnoses. Any failure routes to human review via status="failed".
"""

from __future__ import annotations

import textwrap
from pathlib import Path

from app.core.agentic.state import MechSageState
from app.core.agentic.config import OrchestratorConfig
from app.core.agentic.tools import rag_retrieve
from app.core.agentic.fault_signatures import lookup_fault_hypothesis
from app.core.gateway import llm_complete
from app.core.circuit_breaker import CircuitOpenError

# Load .env from project root
try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).resolve().parents[3] / ".env"
    load_dotenv(dotenv_path=_env_path, override=False)
except ImportError:
    pass

_config = OrchestratorConfig()


def _get_system_instruction() -> str:
    return textwrap.dedent("""\
        You are the Diagnostics Engine for MechSage, a predictive-maintenance
        AI for industrial turbofan engines.

        You receive:
        - ML telemetry signals (RUL estimate, anomaly flags, degrading sensors)
        - A fault hypothesis derived from sensor patterns
        - Retrieved passages from maintenance manuals (SOPs, equipment profiles)

        Your job is to synthesise a concise, technically accurate diagnosis
        STRICTLY grounded in the retrieved passages. You must:
        1. Explain the likely root cause based on the evidence.
        2. Reference specific manual sections or document IDs.
        3. NEVER invent facts, procedures, or failure modes not in the passages.
        4. If the passages don't contain enough information, say so explicitly.

        Keep your diagnosis to 3-5 sentences. Be precise and actionable.
    """)


def diagnostics_node(state: MechSageState) -> dict:
    """
    LangGraph node function for the Diagnostics Agent.

    Steps:
        1. Map degrading_sensors → fault_hypothesis via lookup table.
        2. Call rag_retrieve() with the hypothesis.
        3. If abstention → route to human (set status='abstain').
        4. If passages found → call Pro model via gateway to generate diagnosis.
        5. If confidence < cutoff → route to human.
        6. If LLM call fails (CircuitOpenError or any exception) → route to human.
           NEVER set status='diagnosed' when generation fails.
    """
    asset_id = state["asset_id"]
    degrading_sensors = state.get("degrading_sensors", [])
    rul = state.get("rul_estimate", 0)

    # Step 1: Map sensors to fault hypothesis
    fault_hypothesis = lookup_fault_hypothesis(degrading_sensors)
    print(f"[Diagnostics] Fault hypothesis: '{fault_hypothesis}' "
          f"(from sensors: {degrading_sensors})")

    # Step 2: Call RAG pipeline
    print(f"[Diagnostics] Querying RAG pipeline for asset '{asset_id}'...")
    rag_result = rag_retrieve(
        asset_id=asset_id,
        degrading_sensors=degrading_sensors,
        fault_hypothesis=fault_hypothesis,
    )

    passages = rag_result.get("passages", [])
    confidence = rag_result.get("confidence", 0.0)
    citation = rag_result.get("citation", "")
    error_code = rag_result.get("error_code")

    # Step 3: Check for RAG abstention
    if error_code or not passages:
        reason = rag_result.get("message", "No relevant passages found.")
        msg = (
            f"[Diagnostics] ⛔ RAG ABSTAINED for '{fault_hypothesis}': "
            f"{reason}. Routing to human review."
        )
        print(msg)
        return {
            "fault_hypothesis": fault_hypothesis,
            "retrieved_passages": [],
            "diagnosis": "unresolved",
            "confidence": 0.0,
            "citation": "",
            "status": "abstain",
            "messages": [msg],
        }

    print(f"[Diagnostics] RAG returned {len(passages)} passages "
          f"(confidence: {confidence:.4f})")

    # Step 4: Check confidence threshold
    if confidence < _config.diagnosis_confidence_cutoff:
        msg = (
            f"[Diagnostics] ⚠ Low confidence ({confidence:.4f} < "
            f"{_config.diagnosis_confidence_cutoff}). Routing to human."
        )
        print(msg)
        return {
            "fault_hypothesis": fault_hypothesis,
            "retrieved_passages": passages,
            "diagnosis": "unresolved",
            "confidence": confidence,
            "citation": citation,
            "status": "abstain",
            "messages": [msg],
        }

    # Step 5: Generate diagnosis using the Pro model via gateway
    print(f"[Diagnostics] Generating diagnosis with {_config.strong_model} via gateway...")

    context_block = "\n\n".join(
        f"[Doc {i+1} — {p.get('doc_ref', 'unknown')}]\n{p.get('text', '')}"
        for i, p in enumerate(passages)
    )

    prompt = (
        f"ASSET: {asset_id}\n"
        f"RUL ESTIMATE: {rul:.0f} cycles remaining\n"
        f"DEGRADING SENSORS: {', '.join(degrading_sensors)}\n"
        f"FAULT HYPOTHESIS: {fault_hypothesis}\n\n"
        f"RETRIEVED MAINTENANCE MANUAL PASSAGES:\n{context_block}\n\n"
        f"Based on the above evidence, provide your diagnosis. "
        f"Reference specific document IDs. Be concise (3-5 sentences)."
    )

    try:
        diagnosis = llm_complete(
            model=_config.strong_model,
            system=_get_system_instruction(),
            user=prompt,
            max_tokens=512,
            temperature=0.1,
        )
    except CircuitOpenError as exc:
        # ── FIXED: circuit open → route to human, NOT mark as diagnosed ──
        msg = (
            f"[Diagnostics] ⚡ Circuit breaker OPEN — LLM gateway unavailable. "
            f"Routing to human review. Details: {exc}"
        )
        print(msg)
        return {
            "fault_hypothesis": fault_hypothesis,
            "retrieved_passages": passages,
            "diagnosis": "unresolved",
            "confidence": confidence,
            "citation": citation,
            "status": "failed",
            "error": str(exc),
            "messages": [msg],
        }
    except Exception as exc:
        # ── FIXED: any LLM generation failure → route to human, NOT diagnose ──
        msg = (
            f"[Diagnostics] ❌ LLM generation failed — routing to human review. "
            f"Error: {type(exc).__name__}: {exc}"
        )
        print(msg)
        return {
            "fault_hypothesis": fault_hypothesis,
            "retrieved_passages": passages,
            "diagnosis": "unresolved",
            "confidence": confidence,
            "citation": citation,
            "status": "failed",
            "error": str(exc),
            "messages": [msg],
        }

    msg = (
        f"[Diagnostics] ✓ Diagnosis complete (confidence: {confidence:.4f}, "
        f"model: {_config.strong_model})"
    )
    print(msg)
    print(f"[Diagnostics] Diagnosis: {diagnosis[:200]}...")

    return {
        "fault_hypothesis": fault_hypothesis,
        "retrieved_passages": passages,
        "diagnosis": diagnosis,
        "confidence": confidence,
        "citation": citation,
        "status": "diagnosed",
        "messages": [msg],
    }
