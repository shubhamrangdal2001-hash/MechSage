"""MechSage FastAPI Backend — v3.0.

Exposes the RAG pipeline + LLM generator over HTTP.
Now returns structured diagnosis: severity, confidence, RUL estimate,
work order, and approval workflow.

Run with:
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
"""

from __future__ import annotations

import asyncio
import json
import os
import textwrap
import time
import uuid
from pathlib import Path
from typing import Dict, List, Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel

from app.db import (
    insert_work_order,
    get_work_orders,
    get_work_order,
    update_work_order_status,
    get_summary_counts,
)

# Load .env from project root
try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parents[1] / ".env", override=False)
except ImportError:
    pass

from app.core.rag.rag_pipeline import manual_retrieval_rag
from app.core.rag.generator import MechSageGenerator
from app.core.rag.config import RAGConfig

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

app = FastAPI(
    title="MechSage API",
    description="Predictive Maintenance AI — RAG + structured diagnosis + approval workflow",
    version="3.0.0",
    docs_url="/docs" if ENVIRONMENT != "production" else None,
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files (frontend)
static_dir = Path(__file__).parent / "static"
static_dir.mkdir(exist_ok=True)
app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")


# ---------------------------------------------------------------------------
# Health & readiness endpoints (required by Cloud Run load balancer)
# ---------------------------------------------------------------------------

@app.get("/health", tags=["ops"])
async def health_check():
    """Liveness probe — returns 200 when the process is alive."""
    return {"status": "ok", "environment": ENVIRONMENT}


@app.get("/readiness", tags=["ops"])
async def readiness_check():
    """Readiness probe — returns 200 when the app is ready to serve traffic."""
    # Quick check: can we reach the DB?
    try:
        from app.db import get_summary_counts
        get_summary_counts()
        db_ok = True
    except Exception:
        db_ok = False

    if not db_ok:
        from fastapi.responses import JSONResponse
        return JSONResponse(status_code=503, content={"status": "unavailable", "db": False})

    return {"status": "ready", "db": True, "environment": ENVIRONMENT}

# C-MAPSS dataset directory
CMAPSS_DATA_DIR = Path(__file__).resolve().parents[1] / "ML" / "data"

# Informative sensors to stream (14 selected features)
KEY_SENSORS = [
    "sensor_2", "sensor_3", "sensor_4", "sensor_7", "sensor_8",
    "sensor_11", "sensor_12", "sensor_13", "sensor_14", "sensor_15",
]

CMAPSS_COLUMNS = [
    "unit_number", "time_in_cycles",
    "op_setting_1", "op_setting_2", "op_setting_3",
] + [f"sensor_{i}" for i in range(1, 22)]

# ---------------------------------------------------------------------------
# Lazy generator singleton
# ---------------------------------------------------------------------------

_generator: Optional[MechSageGenerator] = None

def get_generator() -> MechSageGenerator:
    global _generator
    if _generator is None:
        config = RAGConfig()
        _generator = MechSageGenerator(
            model=config.openrouter_model,
            base_url=config.openrouter_base_url,
        )
    return _generator


# ---------------------------------------------------------------------------
# Structured diagnosis prompt
# ---------------------------------------------------------------------------

DIAGNOSIS_PROMPT = textwrap.dedent("""\
    You are MechSage, an expert maintenance AI. Based on the provided context and query,
    produce a COMPLETE structured diagnosis. You MUST return a valid JSON object only —
    no markdown, no extra text, just JSON.

    CONTEXT:
    {context}

    QUERY: {query}
    DEGRADING SENSORS: {sensors}
    FAULT HYPOTHESIS: {hypothesis}

    Return this exact JSON structure (fill all fields accurately):
    {{
      "failure_mode": "<concise name of the failure mode>",
      "severity": "<low | medium | high>",
      "confidence": <float 0.0-1.0 representing how certain you are>,
      "rul_estimate_cycles": <integer: estimated remaining useful life in operating cycles, or null if unknown>,
      "explanation": "<2-4 sentence plain-English explanation of what is failing and why>",
      "recommended_action": "<specific maintenance action to take>",
      "parts_needed": ["<part 1>", "<part 2>"],
      "priority": "<low | medium | high>",
      "estimated_duration_hrs": <float: estimated repair time in hours>,
      "technician_notes": "<specific instructions for the technician, referencing the context>",
      "evidence_sensors": ["<sensor id 1>", "<sensor id 2>"]
    }}
""")


def generate_structured_diagnosis(
    gen: MechSageGenerator,
    query: str,
    passages: list[dict],
    degrading_sensors: list[str],
    fault_hypothesis: str,
) -> dict:
    """Call the LLM to produce a structured diagnosis JSON."""
    context = "\n\n".join(
        f"[Doc {i+1} — {p.get('doc_ref','?')}]\n{p.get('text','')}"
        for i, p in enumerate(passages)
    )
    prompt = DIAGNOSIS_PROMPT.format(
        context=context[:2000],
        query=query,
        sensors=", ".join(degrading_sensors) if degrading_sensors else "not specified",
        hypothesis=fault_hypothesis or "not specified",
    )
    raw = gen._call_with_retry(
        [{"role": "user", "content": prompt}],
        max_tokens=600,
        temperature=0.0,
    )
    # Strip markdown code fences if present
    raw = raw.strip()
    if raw.startswith("```"):
        blocks = raw.split("```")
        if len(blocks) > 1:
            raw = blocks[1]
            if raw.strip().startswith("json"):
                raw = raw.strip()[4:].strip()
    else:
        # Sometimes models wrap JSON in markdown but add text before it
        import re
        match = re.search(r'```json\s*(.*?)\s*```', raw, re.DOTALL)
        if match:
            raw = match.group(1).strip()

    raw = raw.strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {
            "failure_mode": fault_hypothesis or "Unknown",
            "severity": "medium",
            "confidence": 0.5,
            "rul_estimate_cycles": None,
            "explanation": raw[:400],
            "recommended_action": "Manual inspection recommended.",
            "parts_needed": [],
            "priority": "medium",
            "estimated_duration_hrs": 2.0,
            "technician_notes": "Consult retrieved passages for details.",
            "evidence_sensors": degrading_sensors,
        }


# ---------------------------------------------------------------------------
# Request / Response models
# ---------------------------------------------------------------------------

class DiagnoseRequest(BaseModel):
    query: str
    asset_id: str = ""
    degrading_sensors: List[str] = []
    fault_hypothesis: str = ""
    top_k: int = 3
    generate_answer: bool = True


class PassageOut(BaseModel):
    doc_ref: str
    fault_mode: str
    text: str
    relevance_score: float


class WorkOrderOut(BaseModel):
    failure_mode: str
    severity: str                       # low | medium | high
    priority: str                       # low | medium | high
    recommended_action: str
    parts_needed: List[str]
    estimated_duration_hrs: float
    technician_notes: str
    evidence_sensors: List[str]


class DiagnoseResponse(BaseModel):
    status: str                          # "ok" | "abstain" | "error"
    error_code: Optional[str] = None
    message: Optional[str] = None
    passages: List[PassageOut] = []

    # Structured diagnosis (new)
    diagnosis_id: Optional[str] = None
    explanation: Optional[str] = None
    confidence: Optional[float] = None
    rul_estimate_cycles: Optional[int] = None
    work_order: Optional[WorkOrderOut] = None

    # Free-form answer (legacy / supplementary)
    answer: Optional[str] = None

    # Latency & cost
    retrieval_latency_ms: Optional[int] = None
    generation_latency_ms: Optional[int] = None
    estimated_cost_usd: Optional[float] = None
    corpus_version: Optional[str] = None


class HealthResponse(BaseModel):
    status: str
    llm_provider: str
    model: str
    api_key_set: bool


class ApprovalRequest(BaseModel):
    decision: str   # "approve" | "reject" | "escalate"
    notes: str = ""


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/", response_class=FileResponse)
async def serve_ui():
    """Serve the main HTML frontend."""
    return FileResponse(str(static_dir / "index.html"))


@app.get("/dashboard", response_class=FileResponse)
async def serve_dashboard():
    """Serve the interactive live anomaly detection dashboard."""
    return FileResponse(str(static_dir / "dashboard.html"))


@app.get("/work-orders", response_class=FileResponse)
async def serve_work_orders():
    """Serve the Work Orders / HITL review dashboard."""
    return FileResponse(str(static_dir / "work_orders.html"))


@app.get("/health", response_model=HealthResponse)
async def health():
    """Health check — confirms API key and model config."""
    config = RAGConfig()
    key = (os.getenv("OPENROUTER_API_KEY") or os.getenv("OPENROUTER_KEY") or "").strip()
    return HealthResponse(
        status="ok",
        llm_provider=config.llm_provider,
        model=config.openrouter_model,
        api_key_set=bool(key),
    )


@app.post("/api/diagnose", response_model=DiagnoseResponse)
async def diagnose(req: DiagnoseRequest):
    """
    Full RAG + LLM structured diagnosis pipeline.

    Stages:
    1. Hybrid retrieval + reranking
    2. LLM structured diagnosis (severity, RUL, work order, confidence)
    """
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="query must not be empty")

    # --- Stage 1: RAG Retrieval ---
    rag_result = manual_retrieval_rag(
        query=req.query,
        degrading_sensors=req.degrading_sensors or None,
        fault_hypothesis=req.fault_hypothesis,
        top_k=req.top_k,
        asset_id=req.asset_id,
    )

    if "error_code" in rag_result:
        return DiagnoseResponse(
            status="abstain",
            error_code=rag_result["error_code"],
            message=rag_result.get("message", ""),
        )

    passages_raw = rag_result.get("retrieved_passages", [])
    passages_out = [
        PassageOut(
            doc_ref=p["doc_ref"],
            fault_mode=p["fault_mode"],
            text=p["text"],
            relevance_score=round(p["relevance_score"], 4),
        )
        for p in passages_raw
    ]

    explanation: Optional[str] = None
    confidence: Optional[float] = None
    rul_estimate: Optional[int] = None
    work_order: Optional[WorkOrderOut] = None
    answer: Optional[str] = None
    gen_latency: Optional[int] = None
    # Rough cost estimate: ~$3 per 1M tokens for claude-sonnet
    # Avg ~800 tokens per structured diagnosis call
    estimated_cost = None

    # --- Stage 2: LLM Structured Diagnosis ---
    if req.generate_answer:
        try:
            gen = get_generator()
            t0 = time.perf_counter()

            diag = generate_structured_diagnosis(
                gen,
                req.query,
                passages_raw,
                req.degrading_sensors,
                req.fault_hypothesis,
            )

            gen_latency = int((time.perf_counter() - t0) * 1000)
            # Rough cost estimate: $3/1M input + $15/1M output ≈ $0.002 per call
            estimated_cost = round(gen_latency / 1000 * 0.0008, 5)

            explanation = diag.get("explanation")
            confidence = diag.get("confidence")
            rul_raw = diag.get("rul_estimate_cycles")
            rul_estimate = int(rul_raw) if rul_raw is not None else None

            work_order = WorkOrderOut(
                failure_mode=diag.get("failure_mode", req.fault_hypothesis or "Unknown"),
                severity=diag.get("severity", "medium"),
                priority=diag.get("priority", "medium"),
                recommended_action=diag.get("recommended_action", "Manual inspection"),
                parts_needed=diag.get("parts_needed", []),
                estimated_duration_hrs=float(diag.get("estimated_duration_hrs", 2.0)),
                technician_notes=diag.get("technician_notes", ""),
                evidence_sensors=diag.get("evidence_sensors", req.degrading_sensors),
            )

        except Exception as exc:
            answer = f"[GenerationError] {exc}"
            explanation = f"Automated diagnosis fallback: {req.fault_hypothesis or 'Inspection required'}. Details: {exc}"
            confidence = 0.60
            rul_estimate = 30
            work_order = WorkOrderOut(
                failure_mode=req.fault_hypothesis or "Degradation Flagged",
                severity="medium",
                priority="medium",
                recommended_action=passages_out[0].text[:150] if passages_out else "Perform manual inspection.",
                parts_needed=[],
                estimated_duration_hrs=2.0,
                technician_notes="Created via RAG retrieval fallback.",
                evidence_sensors=req.degrading_sensors,
            )

    diag_id = str(uuid.uuid4()) if req.generate_answer else None

    # --- Persist to SQLite DB ---
    if diag_id and work_order:
        rag_snippet = passages_out[0].text[:300] if passages_out else ""
        try:
            insert_work_order(
                wo_id=diag_id,
                asset_id=req.asset_id or "UNKNOWN",
                failure_mode=work_order.failure_mode,
                severity=work_order.severity,
                priority=work_order.priority,
                recommended_action=work_order.recommended_action,
                explanation=explanation or "",
                parts_needed=work_order.parts_needed,
                estimated_duration_hrs=work_order.estimated_duration_hrs,
                technician_notes=work_order.technician_notes,
                evidence_sensors=work_order.evidence_sensors,
                confidence=confidence,
                rul_estimate_cycles=rul_estimate,
                rag_snippet=rag_snippet,
            )
        except Exception as db_exc:
            print(f"[DB] Failed to persist work order: {db_exc}")

    return DiagnoseResponse(
        status="ok",
        diagnosis_id=diag_id,
        passages=passages_out,
        explanation=explanation,
        confidence=confidence,
        rul_estimate_cycles=rul_estimate,
        work_order=work_order,
        answer=answer,
        retrieval_latency_ms=rag_result.get("retrieval_latency_ms"),
        generation_latency_ms=gen_latency,
        estimated_cost_usd=estimated_cost,
        corpus_version=rag_result.get("corpus_version"),
    )


class ApprovalRequestFull(BaseModel):
    decision: str           # "approve" | "reject" | "escalate"
    notes: str = ""
    assigned_technician: str = ""
    proposed_start: str = ""
    approved_by: str = ""


@app.post("/api/diagnose/{diagnosis_id}/approve")
async def approve_diagnosis(diagnosis_id: str, req: ApprovalRequestFull):
    """
    Human-in-the-loop approval endpoint.
    Writes decision + technician assignment to the SQLite work orders DB.
    """
    status_map = {"approve": "APPROVED", "reject": "REJECTED", "escalate": "ESCALATED"}
    new_status = status_map.get(req.decision.lower(), "PENDING_APPROVAL")

    updated = update_work_order_status(
        wo_id=diagnosis_id,
        new_status=new_status,
        assigned_technician=req.assigned_technician,
        proposed_start=req.proposed_start,
        decision_notes=req.notes,
        approved_by=req.approved_by,
    )

    msg_map = {
        "APPROVED":  "Work order approved and scheduled.",
        "REJECTED":  "Work order rejected and de-escalated.",
        "ESCALATED": "Escalated to senior engineer.",
    }
    print(f"[Approval] id={diagnosis_id} status={new_status} tech={req.assigned_technician!r}")
    return {
        "status": "recorded",
        "diagnosis_id": diagnosis_id,
        "new_status": new_status,
        "db_updated": updated,
        "message": msg_map.get(new_status, "Decision recorded."),
    }


@app.get("/api/work-orders")
async def list_work_orders(
    status: str = Query("ALL"),
    priority: str = Query("ALL"),
):
    """Return all work orders, optionally filtered by status/priority."""
    records = get_work_orders(
        status_filter=status if status != "ALL" else None,
        priority_filter=priority if priority != "ALL" else None,
    )
    return {"work_orders": records, "total": len(records)}


@app.get("/api/work-orders/summary")
async def work_orders_summary():
    """Return KPI counts for the Work Orders dashboard."""
    return get_summary_counts()


@app.get("/api/work-orders/{wo_id}")
async def get_single_work_order(wo_id: str):
    """Return a single work order by ID."""
    rec = get_work_order(wo_id)
    if not rec:
        raise HTTPException(status_code=404, detail="Work order not found")
    return rec


@app.post("/api/retrieve-only", response_model=DiagnoseResponse)
async def retrieve_only(req: DiagnoseRequest):
    """RAG retrieval only — no LLM generation."""
    req.generate_answer = False
    return await diagnose(req)


# ---------------------------------------------------------------------------
# Dashboard streaming endpoints
# ---------------------------------------------------------------------------

@app.get("/api/datasets")
async def list_datasets():
    """List available C-MAPSS dataset IDs."""
    available = []
    for ds_id in ["FD001", "FD002", "FD003", "FD004"]:
        train_file = CMAPSS_DATA_DIR / f"train_{ds_id}.txt"
        test_file  = CMAPSS_DATA_DIR / f"test_{ds_id}.txt"
        if train_file.exists() and test_file.exists():
            available.append({
                "id": ds_id,
                "fault_modes": "HPC Degradation" if ds_id in ("FD001","FD002") else "HPC + Fan Degradation",
                "conditions": "1 (Sea Level)" if ds_id in ("FD001","FD003") else "6 Operating Conditions",
            })
    return {"datasets": available}


@app.get("/api/fleet-summary")
async def fleet_summary(dataset_id: str = Query("FD001", regex="^FD00[1-4]$")):
    """Return engine unit IDs, max cycles, and final RUL for a dataset."""
    test_file = CMAPSS_DATA_DIR / f"test_{dataset_id}.txt"
    rul_file  = CMAPSS_DATA_DIR / f"RUL_{dataset_id}.txt"
    if not test_file.exists():
        raise HTTPException(status_code=404, detail=f"Dataset {dataset_id} not found")

    # Parse RUL ground truth
    rul_values: List[int] = []
    if rul_file.exists():
        with open(rul_file) as fh:
            for line in fh:
                v = line.strip()
                if v:
                    rul_values.append(int(v))

    # Collect max cycle per unit from test file
    unit_cycles: Dict[int, int] = {}
    with open(test_file) as fh:
        for line in fh:
            parts = line.strip().split()
            if len(parts) >= 2:
                u, c = int(parts[0]), int(parts[1])
                if c > unit_cycles.get(u, 0):
                    unit_cycles[u] = c

    units = []
    for idx, (unit, max_cycle) in enumerate(sorted(unit_cycles.items())):
        final_rul = rul_values[idx] if idx < len(rul_values) else None
        units.append({
            "unit_id": unit,
            "max_cycle": max_cycle,
            "final_rul": final_rul,
            "health_pct": min(100, round((final_rul / 150) * 100)) if final_rul else None,
        })

    return {"dataset_id": dataset_id, "units": units, "total": len(units)}


@app.get("/api/stream")
async def stream_sensor_data(
    dataset_id: str = Query("FD001", regex="^FD00[1-4]$"),
    unit_id: int = Query(1, ge=1),
    speed_ms: int = Query(400, ge=50, le=5000),
    start_cycle: int = Query(1, ge=1),
):
    """
    Stream C-MAPSS test sensor data as Server-Sent Events.

    Each event is a JSON object with:
      unit, cycle, sensors (dict), z_scores (dict),
      anomaly_score (float 0-1), is_anomaly (bool),
      anomaly_sensors (list[str]), rul_estimate (int), progress (float).
    """
    test_file = CMAPSS_DATA_DIR / f"test_{dataset_id}.txt"
    rul_file  = CMAPSS_DATA_DIR / f"RUL_{dataset_id}.txt"
    if not test_file.exists():
        raise HTTPException(status_code=404, detail=f"Dataset {dataset_id} not found")

    # Parse final RUL
    rul_values: List[int] = []
    if rul_file.exists():
        with open(rul_file) as fh:
            for line in fh:
                v = line.strip()
                if v:
                    rul_values.append(int(v))

    def get_op_cond(row):
        return round(row.get("op_setting_1", 0.0))

    # Read rows for requested unit, and collect healthy samples for all conditions
    healthy_samples: Dict[int, Dict[str, List[float]]] = {}
    unit_rows: List[Dict] = []
    
    with open(test_file) as fh:
        for line in fh:
            parts = line.strip().split()
            if not parts:
                continue
            u = int(parts[0])
            c = int(parts[1])
            
            row: Dict = {}
            for j, col in enumerate(CMAPSS_COLUMNS):
                if j < len(parts):
                    try:
                        row[col] = float(parts[j])
                    except ValueError:
                        row[col] = 0.0
            
            if c <= 30:
                op_cond = get_op_cond(row)
                if op_cond not in healthy_samples:
                    healthy_samples[op_cond] = {s: [] for s in KEY_SENSORS}
                for s in KEY_SENSORS:
                    if s in row:
                        healthy_samples[op_cond][s].append(row[s])

            if u == unit_id:
                unit_rows.append(row)

    if not unit_rows:
        raise HTTPException(status_code=404, detail=f"Unit {unit_id} not found in {dataset_id}")

    # Resolve final RUL for this unit (unit IDs are 1-indexed in order)
    final_rul = rul_values[unit_id - 1] if unit_id - 1 < len(rul_values) else 0
    max_cycle = int(unit_rows[-1]["time_in_cycles"])

    # Compute baseline stats per condition
    baseline_per_cond: Dict[int, Dict[str, Dict[str, float]]] = {}
    for op_cond, sensors_data in healthy_samples.items():
        baseline_per_cond[op_cond] = {}
        for sensor, vals in sensors_data.items():
            if not vals:
                baseline_per_cond[op_cond][sensor] = {"mean": 0.0, "std": 1.0}
            else:
                mean = sum(vals) / len(vals)
                variance = sum((v - mean) ** 2 for v in vals) / len(vals)
                std = variance ** 0.5 or 1e-6
                baseline_per_cond[op_cond][sensor] = {"mean": mean, "std": std}
                
    # Fallback global baseline from the current unit's first 30 cycles
    global_baseline = {}
    for sensor in KEY_SENSORS:
        vals = [r[sensor] for r in unit_rows[:min(30, len(unit_rows))] if sensor in r]
        if vals:
            mean = sum(vals) / len(vals)
            std = (sum((v - mean) ** 2 for v in vals) / len(vals)) ** 0.5 or 1e-6
            global_baseline[sensor] = {"mean": mean, "std": std}
        else:
            global_baseline[sensor] = {"mean": 0.0, "std": 1.0}

    async def event_generator():
        for i, row in enumerate(unit_rows):
            cycle = int(row["time_in_cycles"])
            if cycle < start_cycle:
                continue

            # Compute per-sensor Z-scores
            sensor_vals: Dict[str, float] = {}
            z_scores: Dict[str, float] = {}
            anomaly_sensors: List[str] = []

            op_cond = get_op_cond(row)
            b_cond = baseline_per_cond.get(op_cond, global_baseline)

            for sensor in KEY_SENSORS:
                if sensor not in row:
                    continue
                val = row[sensor]
                b = b_cond.get(sensor, global_baseline[sensor])
                z_raw = (val - b["mean"]) / b["std"]
                z_abs = abs(z_raw)
                
                sensor_vals[sensor] = round(val, 4)
                z_scores[sensor] = round(z_raw, 3)
                
                if z_abs > 2.5:
                    anomaly_sensors.append(sensor)

            max_z = max([abs(z) for z in z_scores.values()]) if z_scores else 0.0
            anomaly_score = round(min(1.0, max_z / 5.0), 3)
            is_anomaly = (len(anomaly_sensors) >= 2) and (anomaly_score > 0.4)

            rul_at_cycle = (max_cycle - cycle) + final_rul

            payload = json.dumps({
                "unit": unit_id,
                "cycle": cycle,
                "dataset": dataset_id,
                "sensors": sensor_vals,
                "z_scores": z_scores,
                "anomaly_score": anomaly_score,
                "is_anomaly": is_anomaly,
                "anomaly_sensors": anomaly_sensors,
                "rul_estimate": max(0, rul_at_cycle),
                "progress": round((i + 1) / len(unit_rows) * 100, 1),
            })
            yield f"data: {payload}\n\n"
            await asyncio.sleep(speed_ms / 1000.0)

        yield f"data: {json.dumps({'event': 'complete', 'unit': unit_id, 'dataset': dataset_id})}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


# ---------------------------------------------------------------------------
# Entrypoint — respects Cloud Run's dynamic $PORT env var
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8001"))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=ENVIRONMENT == "development")
