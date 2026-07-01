"""Tests for data loading, validation, preprocessing, and feature generation."""

from types import SimpleNamespace

import numpy as np

from src.pipeline import prepare_data


def _args():
    return SimpleNamespace(
        dataset="FD001",
        profile="quick",
        seed=42,
        validation_size=0.25,
        rul_clip=125,
        anomaly_threshold=30,
        rolling_windows=(3,),
        max_train_units=6,
        max_test_units=4,
    )


def test_prepare_data_loads_engineers_splits_and_scales():
    data = prepare_data(_args())

    assert data["X_train"].shape[0] > 0
    assert data["X_val"].shape[0] > 0
    assert data["X_test"].shape[0] > 0
    assert data["X_train"].shape[1] == len(data["feature_cols"])
    assert np.isfinite(data["X_train"]).all()
    assert np.isfinite(data["X_val"]).all()
    assert np.isfinite(data["X_test"]).all()
    assert data["context"]["dataset_version"]

    train_units = set(data["train_df"]["unit_number"].unique())
    val_units = set(data["val_df"]["unit_number"].unique())
    assert train_units.isdisjoint(val_units)
    assert "cycle_norm" in data["feature_cols"]
