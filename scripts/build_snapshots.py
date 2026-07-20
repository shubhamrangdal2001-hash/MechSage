import os
import json
import time
import glob
import csv

DASHBOARD_DIR = "mechsage-dashboard"
DATA_DIR = os.path.join(DASHBOARD_DIR, "data")
RAG_OUT = os.path.join(DATA_DIR, "rag_metrics_snapshot.json")
DATA_JS = os.path.join(DASHBOARD_DIR, "data.js")
DATASETS = ["FD001", "FD002", "FD003", "FD004"]

def safe_load(path, default=None):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return default if default is not None else {}

def build_ml_snapshot(dataset="FD001"):
    # Load sources
    best_rul = safe_load(f"ML/reports/best_rul_metrics_{dataset}.json")
    best_anom = safe_load(f"ML/reports/best_anomaly_metrics_{dataset}.json")
    final_rep = safe_load(f"ML/reports/final_report_{dataset}.json")
    traj = safe_load(f"ML/reports/rul_trajectories_{dataset}.json")
    drift = safe_load("ML/reports/drift_metrics.json")  # Drift might be global or per dataset, assume global if only one

    # Build Schema
    ml_snap = {
        "dataset": dataset,
        "available_datasets": DATASETS,
        "generated_at": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
    }
    
    # rul_regression
    ml_snap["rul_regression"] = {
        "dataset_id": dataset,
        "RMSE": best_rul.get("RMSE", 0.0),
        "MAE": best_rul.get("MAE", 0.0),
        "R2": best_rul.get("R2", 0.0),
        "lead_time_cycles": 45  # Hardcoded based on lead time eval, as requested
    }
    
    # anomaly_classification
    ml_snap["anomaly_classification"] = {
        "model_name": final_rep.get("best_anomaly_model", {}).get("model_name", "Unknown"),
        "threshold": 0.9198, # Using best threshold
        "F1_Score": best_anom.get("F1_Score", 0.0),
        "Accuracy": best_anom.get("Accuracy", 0.0)
    }
    
    # feature_importance
    features = final_rep.get("saved_outputs", {}).get("best_rul", {}).get("top_features", [])
    ml_snap["feature_importance"] = {
        "features": features
    }
    
    # data_drift
    if drift:
        ml_snap["data_drift"] = drift
    else:
        ml_snap["data_drift"] = {
            "threshold": 0.2,
            "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
            "is_sample": True,
            "features": {}
        }
        
    # parse live results if available
    live_traj = []
    try:
        log_dir = os.path.join("inference", "logs")
        if os.path.exists(log_dir):
            live_files = glob.glob(os.path.join(log_dir, "live_results_*.csv"))
            if live_files:
                latest_live = max(live_files, key=os.path.getctime)
                with open(latest_live, "r", encoding="utf-8") as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        if row.get("dataset_variant") == dataset:
                            cycle = int(row["cycle"])
                            pred = float(row["rul_prediction"])
                            # No true_rul in live run
                            live_traj.append({"cycle": cycle, "predicted_rul": pred})
    except Exception as e:
        print(f"Failed to parse live log: {e}")

    # rul_trajectories
    units_list = []
    if traj:
        ml_snap["rul_trajectories"] = {
            "is_sample": False,
            "units": traj
        }
        units_list = ml_snap["rul_trajectories"]["units"]
    else:
        units_list = [{
            "unit_number": 1,
            "life": 192,
            "trajectory": [{"cycle": 1, "true_rul": 192, "predicted_rul": 185.4}]
        }]
        ml_snap["rul_trajectories"] = {
            "is_sample": True,
            "units": units_list
        }
        
    if live_traj:
        # Prepend the LIVE unit
        units_list.insert(0, {
            "unit_number": "LIVE",
            "life": len(live_traj),
            "trajectory": live_traj
        })
        
    return ml_snap

def build_rag_snapshot():
    rag_metrics = safe_load("dev/rag/reports/rag_eval_metrics.json")
    if not rag_metrics:
        # Fallback empty structure with sample true
        return {
            "generated_at": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
            "ragas_scores": { "context_precision_at_3":0, "context_recall_at_3":0, "faithfulness":0, "answer_relevancy":0 },
            "retrieval_at_k": { "k_values":[1,3,5], "hit_rate":[0,0,0], "precision":[0,0,0], "recall":[0,0,0], "mrr":0 },
            "guardrails": { "overall_success_rate":0, "off_domain_abstain_rate":0, "similarity_threshold_used":0, "total_abstentions":0 },
            "latency": { "average_ms":0, "p50_ms":0, "p95_ms":0, "p99_ms":0 },
            "latency_histogram": { "bin_edges_ms":[], "counts":[], "is_sample": True },
            "queries": []
        }
    
    # Ensure latency histogram exists (is_sample=True since we didn't calculate full bins)
    if "latency_histogram" not in rag_metrics and "latency" in rag_metrics:
        rag_metrics["latency"]["histogram_is_sample"] = True
        rag_metrics["latency"]["histogram"] = [
            {"range": "0-500", "count": 0},
            {"range": "500-1000", "count": 0},
            {"range": "1000-1500", "count": 0},
            {"range": "1500-2000", "count": 0}
        ]
        
    # Wrap queries inside records
    if "queries" in rag_metrics and isinstance(rag_metrics["queries"], list):
        rag_metrics["queries"] = {
            "is_sample": False,
            "records": rag_metrics["queries"]
        }
        
    return rag_metrics

def main():
    os.makedirs(DATA_DIR, exist_ok=True)
    
    rag_snap = build_rag_snapshot()
    
    with open(RAG_OUT, "w", encoding="utf-8") as f:
        json.dump(rag_snap, f, indent=2)
    print(f"Wrote {RAG_OUT}")

    all_ml_snaps = {}
    for ds in DATASETS:
        ml_snap = build_ml_snapshot(ds)
        all_ml_snaps[ds] = ml_snap
        
        ds_out = os.path.join(DATA_DIR, f"ml_metrics_snapshot_{ds}.json")
        with open(ds_out, "w", encoding="utf-8") as f:
            json.dump(ml_snap, f, indent=2)
        print(f"Wrote {ds_out}")
        
    # Build data.js with dictionary structure for offline fallback
    data_js_content = f"window.MECHSAGE_DATA = {json.dumps({'ml': all_ml_snaps, 'rag': rag_snap}, indent=2)};\n"
    with open(DATA_JS, "w", encoding="utf-8") as f:
        f.write(data_js_content)
    print(f"Wrote {DATA_JS}")

if __name__ == "__main__":
    main()
