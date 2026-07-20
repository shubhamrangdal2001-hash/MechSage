import json, math, random, datetime

random.seed(7)
NOW = datetime.datetime(2026, 7, 16, 12, 0, 0).isoformat() + "Z"

# ---------------------------------------------------------------
# REAL values are taken verbatim from the Antigravity data contract.
# SAMPLE series are representative placeholders that match the exact
# target schema, used until the export scripts are added to the repo.
# Every sample block is tagged "is_sample": true.
# ---------------------------------------------------------------

# ---- RUL trajectory (SAMPLE, schema-accurate) -----------------
def make_trajectory(life, cap=125, noise=6.0, bias=-2.0):
    traj = []
    for c in range(1, life + 1):
        true_rul = min(cap, life - c)
        pred = true_rul + bias + random.gauss(0, noise) + (0.04 * (life - c))
        pred = max(0.0, pred)
        traj.append({"cycle": c, "true_rul": round(true_rul, 1), "predicted_rul": round(pred, 1)})
    return traj

rul_trajectories = [
    {"unit_number": 1, "life": 192, "trajectory": make_trajectory(192)},
    {"unit_number": 2, "life": 287, "trajectory": make_trajectory(287, noise=8.0)},
    {"unit_number": 3, "life": 155, "trajectory": make_trajectory(155, noise=5.0)},
]

# ---- Drift (SAMPLE, schema-accurate) --------------------------
drift_sensors = {
    "sensor_2": 0.04, "sensor_3": 0.07, "sensor_4": 0.23, "sensor_7": 0.09,
    "sensor_8": 0.05, "sensor_11": 0.14, "sensor_12": 0.03, "sensor_15": 0.27,
    "sensor_17": 0.11, "sensor_20": 0.06, "sensor_21": 0.08,
}
def drift_status(psi):
    if psi >= 0.2: return "drift_detected"
    if psi >= 0.1: return "watch"
    return "stable"
drift_features = {s: {"psi": p, "status": drift_status(p)} for s, p in drift_sensors.items()}

# ---- Feature importance (top 2 REAL + augmented SAMPLE) --------
feature_importance = [
    ["sensor_17_roll_mean_20", 15.331, True],
    ["sensor_4_roll_mean_20", 10.638, True],
    ["sensor_11_roll_mean_20", 8.204, False],
    ["sensor_15_expanding_mean", 6.917, False],
    ["sensor_7_expanding_mean", 5.482, False],
    ["sensor_12_roll_std_20", 4.113, False],
    ["sensor_2_roll_mean_20", 3.006, False],
    ["sensor_21_delta", 2.244, False],
]

ml = {
    "generated_at": NOW,
    "dataset": "FD001",
    "available_datasets": ["FD001", "FD002", "FD003", "FD004"],
    "rul_regression": {
        "dataset_id": "FD001", "RMSE": 23.338, "MAE": 19.265,
        "R2": -3.108, "lead_time_cycles": 45, "model_name": "LinearRegression"
    },
    "anomaly_classification": {
        "model_name": "LightGBM_Anomaly", "threshold": 0.9198,
        "F1_Score": 0.0, "Accuracy": 1.0, "Precision": 0.0, "Recall": 0.0
    },
    "feature_importance": {
        "note": "Top 2 confirmed from final_report_FD001.json; remainder representative.",
        "features": [[f, v] for f, v, _ in feature_importance],
        "confirmed": [f for f, _, real in feature_importance if real]
    },
    "rul_trajectories": {"is_sample": True, "units": rul_trajectories},
    "data_drift": {"is_sample": True, "timestamp": NOW, "threshold": 0.2, "features": drift_features},
}

# ---- RAG (all headline numbers REAL from contract) -------------
queries = [
    ("q_001", "High exhaust gas temperature on HPC module", "MAN-01", ["MAN-01", "MAN-05"], [0.769, 0.231], False, True),
    ("q_002", "Fan speed deviation and vibration alarm", "MAN-03", ["MAN-03", "MAN-07"], [0.812, 0.144], False, True),
    ("q_003", "Bearing wear inspection interval turbofan", "MAN-02", ["MAN-02"], [0.741, 0.0], False, True),
    ("q_004", "Milling machine spindle overheating", "MAN-11", ["MAN-11", "MAN-12"], [0.688, 0.203], False, True),
    ("q_005", "How to bake a chocolate cake", None, [], [], True, False),
    ("q_006", "Compressor stall recovery procedure", "MAN-04", ["MAN-04", "MAN-01"], [0.803, 0.176], False, True),
    ("q_007", "Coolant pressure low ironside line 3", "MAN-21", ["MAN-21"], [0.719, 0.0], False, True),
    ("q_008", "Weather forecast tomorrow", None, [], [], True, False),
    ("q_009", "Turbine hot-section degradation signature", "MAN-06", ["MAN-06", "MAN-04"], [0.774, 0.158], False, True),
    ("q_010", "Replace lubricant grade for gearbox", "MAN-09", ["MAN-09"], [0.702, 0.0], False, True),
    ("q_011", "Sensor 15 rising trend meaning", "MAN-05", ["MAN-08", "MAN-05"], [0.401, 0.658], False, True),
    ("q_012", "Random unrelated gibberish xyz123", None, [], [], True, False),
]
query_records = [
    {"query_id": q, "query_text": t, "expected_doc": e, "retrieved_docs": r,
     "reranker_scores": s, "abstained": a, "hit_at_3": h}
    for (q, t, e, r, s, a, h) in queries
]

# latency distribution (SAMPLE histogram; percentiles REAL)
lat_buckets = [
    {"range": "400-600", "count": 3}, {"range": "600-800", "count": 9},
    {"range": "800-1000", "count": 14}, {"range": "1000-1200", "count": 7},
    {"range": "1200-1400", "count": 4}, {"range": "1400-1600", "count": 2},
]

rag = {
    "generated_at": NOW,
    "ragas_scores": {
        "context_precision_at_3": 0.95, "context_recall_at_3": 0.9667,
        "faithfulness": 0.9828, "answer_relevancy": 1.0
    },
    "retrieval_at_k": {
        "k_values": [1, 3, 5],
        "hit_rate": [0.933, 0.967, 0.967],
        "precision": [0.933, 0.322, 0.200],
        "recall": [0.60, 0.90, 0.95],
        "mrr": 0.95,
        "recall_is_sample": True
    },
    "guardrails": {
        "overall_success_rate": 1.0, "off_domain_abstain_rate": 1.0,
        "similarity_threshold_used": 0.42, "total_abstentions": 15
    },
    "latency": {
        "average_ms": 871.1, "p50_ms": 941.6, "p95_ms": 1377.7, "p99_ms": 1437.4,
        "histogram_is_sample": True, "histogram": lat_buckets
    },
    "queries": {"is_sample": True, "records": query_records},
}

import os
os.makedirs("/data/mechsage-dashboard/data", exist_ok=True)
with open("/data/mechsage-dashboard/data/ml_metrics_snapshot.json", "w") as f:
    json.dump(ml, f, indent=2)
with open("/data/mechsage-dashboard/data/rag_metrics_snapshot.json", "w") as f:
    json.dump(rag, f, indent=2)
with open("/data/mechsage-dashboard/data.js", "w") as f:
    f.write("window.MECHSAGE_DATA = " + json.dumps({"ml": ml, "rag": rag}) + ";\n")
print("wrote ml + rag snapshots and data.js")
print("trajectory points unit1:", len(rul_trajectories[0]["trajectory"]))
