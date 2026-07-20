import os
import json
import glob
import time
import pandas as pd
from dashboard.drift_utils import calculate_psi

def get_latest_live_results():
    live_logs_dir = os.path.join("ML", "inference", "logs")
    csv_files = glob.glob(os.path.join(live_logs_dir, "live_results_*.csv"))
    if not csv_files:
        return None
    latest_file = max(csv_files, key=os.path.getctime)
    return pd.read_csv(latest_file)

def get_train_baseline():
    train_file = os.path.join("ML", "data", "train_FD001.txt")
    if not os.path.exists(train_file):
        return None
    cols = ['unit_number', 'time_in_cycles', 'op_setting_1', 'op_setting_2', 'op_setting_3'] + [f'sensor_{i}' for i in range(1, 22)]
    return pd.read_csv(train_file, sep='\s+', header=None, names=cols)

def export_drift():
    baseline_df = get_train_baseline()
    current_df = get_latest_live_results()
    
    if baseline_df is None or current_df is None:
        print("Missing data for drift calculation. Returning sample.")
        return {
            "threshold": 0.2,
            "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
            "is_sample": True,
            "features": {
                "sensor_11": {"psi": 0.01, "status": "stable"}
            }
        }
    
    threshold = 0.2
    features_drift = {}
    
    # We only care about sensors 1 to 21
    for i in range(1, 22):
        feat = f"sensor_{i}"
        if feat in current_df.columns:
            psi = calculate_psi(baseline_df[feat], current_df[feat])
            status = "drift_detected" if psi >= threshold else "minor_drift" if psi >= 0.1 else "stable"
            features_drift[feat] = {
                "psi": round(psi, 4),
                "status": status
            }
            
    return {
        "threshold": threshold,
        "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        "is_sample": False,
        "features": features_drift
    }

if __name__ == "__main__":
    drift_data = export_drift()
    out_path = os.path.join("ML", "reports", "drift_metrics.json")
    with open(out_path, "w") as f:
        json.dump(drift_data, f, indent=2)
    print(f"Drift exported to {out_path}")
