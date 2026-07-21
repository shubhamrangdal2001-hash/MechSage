"""
feature_builder.py
------------------
Maintains a streaming rolling history per engine unit and builds the exact
same 136-feature matrix that the models were trained on.

Design:
  - On first use for a dataset, loads the training data, fits a MinMaxScaler
    on the same columns (op_settings + 14 informative sensors), and caches it.
  - For each incoming raw sensor row, appends to a per-unit history buffer,
    then re-computes rolling/delta/expanding features over that buffer using
    the project's native feature_engineering functions.
  - Returns the last row of the engineered frame as a 1×136 feature vector
    ready for model.predict().
"""

from __future__ import annotations

import sys
from pathlib import Path

# Ensure project src is importable when running from the repo root
_PROJECT_ROOT = Path(__file__).resolve().parent.parent / "ML"
if str(_PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(_PROJECT_ROOT))

import pandas as pd
from sklearn.preprocessing import MinMaxScaler

from src.data_loader import load_cmapss_data
from src.feature_engineering import engineer_features
from src.preprocessing import get_feature_columns, INFORMATIVE_SENSORS, OP_SETTINGS

# ── Threshold / config (matches validation-tuned values) ──────────────────────
ANOMALY_THRESHOLDS: dict[str, float] = {
    "FD001": 0.5449128243760192,
    "FD002": 0.9209352615971793,
    "FD003": 0.6483689995847156,
    "FD004": 0.5151814730674342,
}

RUL_ALERT_THRESHOLD = 30       # cycles — matches training anomaly label definition
RUL_EMERGENCY_THRESHOLD = 5    # cycles — critical band

# Columns produced by synthetic_generator that need to be present in the buffer
_SENSOR_COLS = INFORMATIVE_SENSORS  # 14 sensors
_OP_COLS = OP_SETTINGS              # 3 op settings


class StreamingFeatureBuilder:
    """
    Maintains a per-engine rolling window buffer and builds 136 features
    on demand.

    Args:
        dataset_id: One of "FD001", "FD002", "FD003", "FD004".
        warmup_cycles: Number of cycles needed before rolling features
            stabilise (window=20 → 20 cycles minimum). Predictions before
            this point are labelled as 'warming up'.
    """

    def __init__(self, dataset_id: str, warmup_cycles: int = 20) -> None:
        self.dataset_id = dataset_id
        self.warmup_cycles = warmup_cycles
        self._history: list[pd.Series] = []
        self._scaler: MinMaxScaler | None = None
        self._feature_cols: list[str] | None = None
        self._scaler_fitted = False

        # Fit the scaler immediately on training data
        self._fit_scaler()

    # ── Scaler fitting ────────────────────────────────────────────────────────

    def _fit_scaler(self) -> None:
        """
        Load C-MAPSS training data for this dataset and fit a MinMaxScaler
        on the same feature columns the pipeline used.  The scaler is then
        stored in self._scaler and used to transform every incoming cycle.
        """
        train_df, _ = load_cmapss_data(self.dataset_id)

        # Apply same feature engineering as training
        train_df = select_informative(train_df)
        train_eng = engineer_features(train_df)
        feature_cols = get_feature_columns(train_eng)

        scaler = MinMaxScaler()
        scaler.fit(train_eng[feature_cols])

        self._scaler = scaler
        self._feature_cols = feature_cols
        self._scaler_fitted = True

    # ── Public API ────────────────────────────────────────────────────────────

    def add_cycle(self, raw_row: pd.Series) -> pd.DataFrame | None:
        """
        Accept one new raw sensor reading and return a scaled 1×136 feature
        DataFrame ready for inference.

        Args:
            raw_row: pd.Series with keys matching the synthetic generator output
                     (unit_number, time_in_cycles, op_setting_*, sensor_*).

        Returns:
            DataFrame with one row and self._feature_cols columns (scaled),
            or None if still in warm-up phase.
        """
        self._history.append(raw_row)

        if len(self._history) < self.warmup_cycles:
            return None   # not enough history for rolling windows

        # Build a small DataFrame from the buffer (capped at last 50 rows for speed)
        buf = pd.DataFrame(self._history[-50:]).reset_index(drop=True)
        buf = select_informative(buf)
        eng = engineer_features(buf)

        # Take the last row — that is the current cycle's features
        last = eng.iloc[[-1]][self._feature_cols].copy()
        last[self._feature_cols] = self._scaler.transform(last[self._feature_cols])
        return last

    def reset(self) -> None:
        """Clear history (call when engine resets or new engine starts)."""
        self._history = []

    @property
    def n_cycles(self) -> int:
        return len(self._history)

    @property
    def is_warmed_up(self) -> bool:
        return len(self._history) >= self.warmup_cycles


# ── Helpers ────────────────────────────────────────────────────────────────────

def select_informative(df: pd.DataFrame) -> pd.DataFrame:
    """
    Retain only the columns the models were trained on:
    metadata + 3 op_settings + 14 informative sensors.
    Non-feature sensor columns (1,5,6,10,16,18,19) are dropped.
    """
    keep = {"unit_number", "time_in_cycles"} | set(_OP_COLS) | set(_SENSOR_COLS)
    keep = [c for c in keep if c in df.columns]
    return df[keep].copy()


def build_builders(
    datasets: tuple[str, ...] = ("FD001", "FD002", "FD003", "FD004"),
) -> dict[str, "StreamingFeatureBuilder"]:
    """
    Instantiate one StreamingFeatureBuilder per dataset.
    Scalers are fitted from the real training data on creation.
    """
    print("Fitting MinMaxScalers from training data...")
    builders: dict[str, StreamingFeatureBuilder] = {}
    for ds in datasets:
        print(f"  [{ds}] loading training data and fitting scaler...")
        builders[ds] = StreamingFeatureBuilder(dataset_id=ds)
        print(f"  [{ds}] done - {len(builders[ds]._feature_cols)} feature columns")
    print("All scalers ready.\n")
    return builders
