import sys
import glob
from pathlib import Path
import pandas as pd
import streamlit as st

_REPO_ROOT = Path(__file__).resolve().parent.parent
_PROJECT_ROOT = _REPO_ROOT / "NASA_CMAPSS_RUL_Project"
if str(_PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(_PROJECT_ROOT))

from src.data_loader import load_cmapss_data

def get_latest_live_log() -> pd.DataFrame | None:
    """Find and load the most recent live_results_*.csv from inference/logs."""
    logs_dir = _REPO_ROOT / "inference" / "logs"
    csv_files = glob.glob(str(logs_dir / "live_results_*.csv"))
    if not csv_files:
        return None
    
    # Sort by filename (timestamp is in name)
    latest_file = sorted(csv_files)[-1]
    df = pd.read_csv(latest_file)
    if not df.empty and "timestamp" in df.columns:
        df["timestamp"] = pd.to_datetime(df["timestamp"])
    return df

@st.cache_data
def get_baseline_data(dataset_variant: str) -> pd.DataFrame:
    """Load the training data for the specified dataset to serve as the baseline."""
    # load_cmapss_data returns (train_df, test_df)
    train_df, _ = load_cmapss_data(dataset_variant)
    return train_df

def get_sensors_list() -> list[str]:
    """Return the list of sensors to monitor for drift."""
    from src.preprocessing import INFORMATIVE_SENSORS, OP_SETTINGS
    return OP_SETTINGS + INFORMATIVE_SENSORS
