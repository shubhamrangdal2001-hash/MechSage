"""MechSage persistence layer.

Supports two backends controlled by the DATABASE_URL environment variable:
  - SQLite  (default / local dev): no DATABASE_URL set
  - PostgreSQL (GCP Cloud SQL):    DATABASE_URL=postgresql://user:pass@host/db

Uses the same API surface so all callers in main.py are unchanged.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Dict, List, Optional

DATABASE_URL = os.getenv("DATABASE_URL", "")
_USE_POSTGRES = DATABASE_URL.startswith("postgresql")

# ── Backend-specific imports ──────────────────────────────────────────────────
if _USE_POSTGRES:
    import psycopg2
    import psycopg2.extras
else:
    import sqlite3

# ── SQLite path (dev only) ────────────────────────────────────────────────────
_SQLITE_PATH = Path(__file__).parent.parent / "mechsage.db"


# ── Connection helpers ────────────────────────────────────────────────────────

def _get_connection():
    """Return a DB connection appropriate for the current environment."""
    if _USE_POSTGRES:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=psycopg2.extras.RealDictCursor)
        return conn
    else:
        conn = sqlite3.connect(str(_SQLITE_PATH))
        conn.row_factory = sqlite3.Row
        return conn


def _placeholder() -> str:
    """Return the correct SQL placeholder for the active backend."""
    return "%s" if _USE_POSTGRES else "?"


def _ensure_returning(query: str) -> str:
    """Postgres requires RETURNING for INSERT; SQLite ignores it."""
    return query  # callers handle this themselves


# ── Schema creation ────────────────────────────────────────────────────────────

_CREATE_TABLE_SQLITE = """
    CREATE TABLE IF NOT EXISTS work_orders (
        id                   TEXT PRIMARY KEY,
        asset_id             TEXT NOT NULL DEFAULT '',
        failure_mode         TEXT NOT NULL DEFAULT 'Unknown',
        severity             TEXT NOT NULL DEFAULT 'medium',
        priority             TEXT NOT NULL DEFAULT 'medium',
        recommended_action   TEXT NOT NULL DEFAULT '',
        explanation          TEXT NOT NULL DEFAULT '',
        parts_needed         TEXT NOT NULL DEFAULT '[]',
        estimated_duration_hrs REAL NOT NULL DEFAULT 2.0,
        technician_notes     TEXT NOT NULL DEFAULT '',
        evidence_sensors     TEXT NOT NULL DEFAULT '[]',
        confidence           REAL,
        rul_estimate_cycles  INTEGER,
        anomaly_score        REAL,
        rag_snippet          TEXT NOT NULL DEFAULT '',
        status               TEXT NOT NULL DEFAULT 'PENDING_APPROVAL',
        assigned_technician  TEXT NOT NULL DEFAULT '',
        proposed_start       TEXT NOT NULL DEFAULT '',
        decision_notes       TEXT NOT NULL DEFAULT '',
        approved_by          TEXT NOT NULL DEFAULT '',
        created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
"""

_CREATE_TABLE_POSTGRES = """
    CREATE TABLE IF NOT EXISTS work_orders (
        id                   TEXT PRIMARY KEY,
        asset_id             TEXT NOT NULL DEFAULT '',
        failure_mode         TEXT NOT NULL DEFAULT 'Unknown',
        severity             TEXT NOT NULL DEFAULT 'medium',
        priority             TEXT NOT NULL DEFAULT 'medium',
        recommended_action   TEXT NOT NULL DEFAULT '',
        explanation          TEXT NOT NULL DEFAULT '',
        parts_needed         TEXT NOT NULL DEFAULT '[]',
        estimated_duration_hrs DOUBLE PRECISION NOT NULL DEFAULT 2.0,
        technician_notes     TEXT NOT NULL DEFAULT '',
        evidence_sensors     TEXT NOT NULL DEFAULT '[]',
        confidence           DOUBLE PRECISION,
        rul_estimate_cycles  INTEGER,
        anomaly_score        DOUBLE PRECISION,
        rag_snippet          TEXT NOT NULL DEFAULT '',
        status               TEXT NOT NULL DEFAULT 'PENDING_APPROVAL',
        assigned_technician  TEXT NOT NULL DEFAULT '',
        proposed_start       TEXT NOT NULL DEFAULT '',
        decision_notes       TEXT NOT NULL DEFAULT '',
        approved_by          TEXT NOT NULL DEFAULT '',
        created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
"""


def init_db() -> None:
    """Create tables if they don't exist (idempotent)."""
    conn = _get_connection()
    cursor = conn.cursor()

    if _USE_POSTGRES:
        cursor.execute(_CREATE_TABLE_POSTGRES)
    else:
        cursor.execute(_CREATE_TABLE_SQLITE)
        # Migrate existing SQLite DBs with missing columns (non-destructive)
        existing_cols = {row[1] for row in cursor.execute("PRAGMA table_info(work_orders)")}
        new_cols = {
            "confidence":           "REAL",
            "rul_estimate_cycles":  "INTEGER",
            "anomaly_score":        "REAL",
            "rag_snippet":          "TEXT NOT NULL DEFAULT ''",
            "explanation":          "TEXT NOT NULL DEFAULT ''",
            "assigned_technician":  "TEXT NOT NULL DEFAULT ''",
            "proposed_start":       "TEXT NOT NULL DEFAULT ''",
            "decision_notes":       "TEXT NOT NULL DEFAULT ''",
            "approved_by":          "TEXT NOT NULL DEFAULT ''",
        }
        for col, col_type in new_cols.items():
            if col not in existing_cols:
                cursor.execute(f"ALTER TABLE work_orders ADD COLUMN {col} {col_type}")

    conn.commit()
    conn.close()


# ── Public API ─────────────────────────────────────────────────────────────────

def insert_work_order(
    wo_id: str,
    asset_id: str,
    failure_mode: str,
    severity: str,
    priority: str,
    recommended_action: str,
    explanation: str,
    parts_needed: List[str],
    estimated_duration_hrs: float,
    technician_notes: str,
    evidence_sensors: List[str],
    confidence: Optional[float] = None,
    rul_estimate_cycles: Optional[int] = None,
    anomaly_score: Optional[float] = None,
    rag_snippet: str = "",
    status: str = "PENDING_APPROVAL",
) -> None:
    p = _placeholder()
    conn = _get_connection()
    cursor = conn.cursor()
    cursor.execute(f"""
        INSERT INTO work_orders (
            id, asset_id, failure_mode, severity, priority, recommended_action,
            explanation, parts_needed, estimated_duration_hrs, technician_notes,
            evidence_sensors, confidence, rul_estimate_cycles, anomaly_score,
            rag_snippet, status
        ) VALUES ({p},{p},{p},{p},{p},{p},{p},{p},{p},{p},{p},{p},{p},{p},{p},{p})
    """, (
        wo_id, asset_id, failure_mode, severity, priority, recommended_action,
        explanation, json.dumps(parts_needed), estimated_duration_hrs, technician_notes,
        json.dumps(evidence_sensors), confidence, rul_estimate_cycles, anomaly_score,
        rag_snippet, status,
    ))
    conn.commit()
    conn.close()


def _row_to_dict(row: Any) -> Dict[str, Any]:
    """Normalise a DB row to a plain dict regardless of backend."""
    r = dict(row)
    r["parts_needed"] = json.loads(r["parts_needed"]) if r.get("parts_needed") else []
    r["evidence_sensors"] = json.loads(r["evidence_sensors"]) if r.get("evidence_sensors") else []
    return r


def get_work_orders(
    status_filter: Optional[str] = None,
    priority_filter: Optional[str] = None,
) -> List[Dict[str, Any]]:
    p = _placeholder()
    conn = _get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM work_orders WHERE 1=1"
    params: List[Any] = []

    if status_filter and status_filter.upper() != "ALL":
        query += f" AND status = {p}"
        params.append(status_filter.upper())

    if priority_filter and priority_filter.upper() != "ALL":
        query += f" AND priority = {p}"
        params.append(priority_filter.lower())

    query += " ORDER BY created_at DESC"
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    return [_row_to_dict(r) for r in rows]


def get_work_order(wo_id: str) -> Optional[Dict[str, Any]]:
    p = _placeholder()
    conn = _get_connection()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM work_orders WHERE id = {p}", (wo_id,))
    row = cursor.fetchone()
    conn.close()
    return _row_to_dict(row) if row else None


def update_work_order_status(
    wo_id: str,
    new_status: str,
    assigned_technician: str = "",
    proposed_start: str = "",
    decision_notes: str = "",
    approved_by: str = "",
) -> bool:
    p = _placeholder()
    conn = _get_connection()
    cursor = conn.cursor()
    cursor.execute(f"""
        UPDATE work_orders
        SET status = {p},
            assigned_technician = {p},
            proposed_start = {p},
            decision_notes = {p},
            approved_by = {p},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = {p}
    """, (new_status, assigned_technician, proposed_start, decision_notes, approved_by, wo_id))
    updated = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return updated


def get_summary_counts() -> Dict[str, int]:
    """Return dashboard KPI counts."""
    conn = _get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM work_orders")
    total = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM work_orders WHERE status = 'PENDING_APPROVAL'")
    pending = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM work_orders WHERE status = 'APPROVED'")
    approved = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM work_orders WHERE status = 'REJECTED'")
    rejected = cursor.fetchone()[0]
    conn.close()
    return {"total": total, "pending": pending, "active": approved, "rejected": rejected}


# Initialise DB on import
init_db()

