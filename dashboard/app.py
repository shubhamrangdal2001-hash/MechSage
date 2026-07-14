import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import yaml
from pathlib import Path
import sys

_REPO_ROOT = Path(__file__).resolve().parent.parent
if str(_REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(_REPO_ROOT))

from dashboard.data_loader import get_latest_live_log, get_baseline_data, get_sensors_list
from dashboard.drift_utils import calculate_psi, calculate_wasserstein

# ── Config & Setup ─────────────────────────────────────────────────────────────

st.set_page_config(
    page_title="MechSage ML Monitoring",
    page_icon="⚙️",
    layout="wide",
    initial_sidebar_state="expanded",
)

@st.cache_resource
def load_config():
    config_path = _REPO_ROOT / "configs" / "dashboard_config.yaml"
    with open(config_path, "r") as f:
        return yaml.safe_load(f)

CONFIG = load_config()

# ── Sidebar & Data Loading ────────────────────────────────────────────────────

st.sidebar.title("⚙️ MechSage MLOps")

df_live = get_latest_live_log()

if df_live is None or df_live.empty:
    st.error("No live inference logs found. Please run `python inference/run_live.py` first.")
    st.stop()

# Ensure raw features exist
sensors = get_sensors_list()
has_sensors = all(s in df_live.columns for s in sensors)

# Sidebar Filters
datasets_available = df_live["dataset_variant"].unique()
selected_ds = st.sidebar.selectbox("Dataset Variant", options=datasets_available)

df_filtered = df_live[df_live["dataset_variant"] == selected_ds]

machines_available = ["All"] + list(df_filtered["machine_id"].unique())
selected_machine = st.sidebar.selectbox("Machine ID", options=machines_available)

if selected_machine != "All":
    df_filtered = df_filtered[df_filtered["machine_id"] == selected_machine]

st.sidebar.markdown("---")
if st.sidebar.button("🔄 Refresh Data"):
    st.rerun()

st.sidebar.markdown(f"**Total Records:** {len(df_filtered)}")
if "timestamp" in df_filtered.columns and not df_filtered.empty:
    st.sidebar.markdown(f"**Latest:** {df_filtered['timestamp'].max().strftime('%H:%M:%S')}")


# ── Tabs ──────────────────────────────────────────────────────────────────────

tab1, tab2, tab3, tab4 = st.tabs([
    "🚀 Fleet Health", 
    "📉 Degradation", 
    "⚠️ Drift & Anomalies", 
    "⚙️ System Health"
])

# ── Tab 1: Fleet Health ───────────────────────────────────────────────────────
with tab1:
    st.header("Live Fleet Status")
    
    if df_filtered.empty:
        st.info("No data for current selection.")
    else:
        # Get latest status per machine
        latest_status = df_filtered.sort_values("cycle").groupby("machine_id").tail(1)
        
        # Metrics Row
        col1, col2, col3 = st.columns(3)
        col1.metric("Active Engines", len(latest_status))
        col2.metric("Critical / Emergency", len(latest_status[latest_status["rul_alert"] == True]))
        col3.metric("Anomalies Detected", len(latest_status[latest_status["anomaly_alert"] == True]))
        
        st.markdown("### Engine Status Matrix")
        
        # Display as a dataframe styled
        def color_status(val):
            if val == "EMERGENCY":
                return 'background-color: #8b0000; color: white'
            elif val == "CRITICAL":
                return 'background-color: #ff8c00; color: white'
            elif val == "ANOMALY DETECTED":
                return 'background-color: #8b0000; color: white'
            return ''
            
        display_df = latest_status[["machine_id", "cycle", "rul_prediction", "rul_severity", "anomaly_score", "anomaly_severity"]]
        st.dataframe(display_df.style.map(color_status, subset=['rul_severity', 'anomaly_severity']), use_container_width=True)

# ── Tab 2: Degradation ────────────────────────────────────────────────────────
with tab2:
    st.header("RUL Degradation Trajectory")
    
    if selected_machine == "All":
        st.info("Please select a specific Machine ID from the sidebar to view degradation curves.")
    else:
        fig = px.line(
            df_filtered, 
            x="cycle", 
            y="rul_prediction", 
            title=f"Predicted RUL over time for {selected_machine}",
            markers=True,
            line_shape="linear"
        )
        
        # Add threshold lines
        fig.add_hline(y=CONFIG["thresholds"]["rul"]["alert_cycles"], line_dash="dash", line_color="orange", annotation_text="Critical (30)")
        fig.add_hline(y=CONFIG["thresholds"]["rul"]["emergency_cycles"], line_dash="dash", line_color="red", annotation_text="Emergency (5)")
        
        fig.update_layout(yaxis_title="Remaining Useful Life (Cycles)", xaxis_title="Cycle")
        st.plotly_chart(fig, use_container_width=True)
        
        st.markdown("### Anomaly Score Trend")
        fig2 = px.line(
            df_filtered,
            x="cycle",
            y="anomaly_score",
            title=f"Anomaly Score over time for {selected_machine}",
            markers=True
        )
        # Add threshold line
        thresh = df_filtered["anomaly_threshold"].iloc[0] if not df_filtered.empty else 0.5
        fig2.add_hline(y=thresh, line_dash="dash", line_color="red", annotation_text="Threshold")
        st.plotly_chart(fig2, use_container_width=True)

# ── Tab 3: Drift & Anomalies ──────────────────────────────────────────────────
with tab3:
    st.header("Data & Concept Drift Monitoring")
    
    st.markdown("### Concept Drift (Predictions)")
    col_a, col_b = st.columns(2)
    
    with col_a:
        st.markdown("**RUL Prediction Distribution**")
        fig_rul = px.histogram(df_filtered, x="rul_prediction", nbins=30, opacity=0.7)
        st.plotly_chart(fig_rul, use_container_width=True)
        
    with col_b:
        st.markdown("**Alert Frequencies**")
        alerts = df_filtered[["rul_alert", "anomaly_alert"]].sum().reset_index()
        alerts.columns = ["Alert Type", "Count"]
        fig_alerts = px.bar(alerts, x="Alert Type", y="Count", color="Alert Type")
        st.plotly_chart(fig_alerts, use_container_width=True)
    
    st.markdown("---")
    st.markdown("### Data Drift (Covariate Shift)")
    
    if not has_sensors:
        st.warning("Live logs do not contain raw sensor features. Please run the updated `run_live.py`.")
    else:
        # Load baseline for this dataset
        baseline_df = get_baseline_data(selected_ds)
        
        # Calculate PSI for all sensors
        st.markdown(f"Comparing live `{selected_ds}` data to training baseline.")
        
        psi_results = []
        for s in sensors:
            psi_val = calculate_psi(baseline_df[s], df_filtered[s], buckets=10)
            status = "🟢 Normal"
            if psi_val > CONFIG["thresholds"]["drift"]["psi_critical"]:
                status = "🔴 Critical Drift"
            elif psi_val > CONFIG["thresholds"]["drift"]["psi_warning"]:
                status = "🟡 Warning"
                
            psi_results.append({
                "Feature": s,
                "PSI": round(psi_val, 4),
                "Status": status
            })
            
        psi_df = pd.DataFrame(psi_results)
        st.dataframe(psi_df, use_container_width=True)
        
        # Feature Inspector
        st.markdown("#### Feature Inspector")
        inspect_feat = st.selectbox("Select Feature to compare distributions:", options=sensors)
        
        fig_feat = go.Figure()
        fig_feat.add_trace(go.Histogram(x=baseline_df[inspect_feat], name="Training Baseline", opacity=0.5, histnorm='probability density'))
        fig_feat.add_trace(go.Histogram(x=df_filtered[inspect_feat], name="Live Inference", opacity=0.5, histnorm='probability density'))
        fig_feat.update_layout(barmode='overlay', title=f"Distribution of {inspect_feat}")
        st.plotly_chart(fig_feat, use_container_width=True)

# ── Tab 4: System Health ──────────────────────────────────────────────────────
with tab4:
    st.header("System Health & Latency")
    st.info("Latency metrics require timestamp diffs from a real API or explicit latency logs. Showing throughput based on timestamps.")
    
    if "timestamp" in df_filtered.columns and len(df_filtered) > 1:
        # Calculate time diffs
        df_sorted = df_filtered.sort_values("timestamp")
        time_diffs = df_sorted["timestamp"].diff().dt.total_seconds().dropna()
        
        col_t1, col_t2 = st.columns(2)
        
        with col_t1:
            avg_diff = time_diffs.mean()
            throughput = 1.0 / avg_diff if avg_diff > 0 else 0
            st.metric("Avg Throughput (Predictions / Sec)", round(throughput, 2))
            
        with col_t2:
            st.metric("Total Predictions Analyzed", len(df_filtered))
            
        fig_time = px.line(time_diffs.reset_index(drop=True), title="Time between predictions (seconds)")
        st.plotly_chart(fig_time, use_container_width=True)
    else:
        st.warning("Not enough timestamp data to calculate throughput.")
