"""End-to-end orchestration for data preparation, training, tuning, and reporting."""

import json
import logging
import os
import shutil
import time
from typing import Iterable, Optional

import joblib
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from catboost import CatBoostRegressor
from lightgbm import LGBMClassifier, LGBMRegressor
from sklearn.ensemble import IsolationForest, RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.svm import OneClassSVM
from xgboost import XGBRegressor

from src.data_loader import compute_dataset_version, get_dataset_file_paths, load_cmapss_data
from src.data_validation import validate_dataframe
from src.evaluate import compute_anomaly_metrics, compute_regression_metrics
from src.feature_engineering import engineer_features, get_flat_features
from src.hyperparameter_tuning import run_all_tuning
from src.logging_config import configure_logging as configure_root_logging
from src.mlflow_tracking import (
    log_final_best_model,
    log_model_run,
    plot_feature_importance,
    save_predictions,
    setup_mlflow,
    write_json,
)
from src.model_registry import build_model_version, save_model_card
from src.preprocessing import INFORMATIVE_SENSORS, OP_SETTINGS, get_feature_columns, select_informative_sensors
from src.utils import ensure_directories, get_project_root, plot_confusion_matrix, plot_rul_predictions, set_seed
from src.visualization import plot_precision_recall_curve, plot_residuals, plot_roc_curve


LOGGER = logging.getLogger("mechsage.pipeline")


def configure_logging() -> None:
    """Configure logging when the pipeline is run without the CLI wrapper."""
    if not logging.getLogger().handlers:
        configure_root_logging()


def _safe_name(value: str) -> str:
    return "".join(ch if ch.isalnum() or ch in ("-", "_") else "_" for ch in value)


def _runtime_dirs() -> dict:
    ensure_directories()
    root = get_project_root()
    dirs = {
        "root": root,
        "artifacts": os.path.join(root, "artifacts"),
        "models": os.path.join(root, "models"),
        "reports": os.path.join(root, "reports"),
        "logs": os.path.join(root, "logs"),
    }
    for key, path in dirs.items():
        if key != "root":
            os.makedirs(path, exist_ok=True)
    return dirs


def _limit_units(df: pd.DataFrame, max_units: Optional[int]) -> pd.DataFrame:
    if not max_units:
        return df
    keep = sorted(df["unit_number"].unique())[:max_units]
    return df[df["unit_number"].isin(keep)].copy()


def _split_train_validation_by_unit(train_df: pd.DataFrame, validation_size: float, seed: int):
    units = np.array(sorted(train_df["unit_number"].unique()))
    if len(units) < 2:
        raise ValueError("Need at least two engine units to create a validation split.")
    val_count = max(1, int(round(len(units) * validation_size)))
    val_count = min(val_count, len(units) - 1)
    train_units, val_units = train_test_split(units, test_size=val_count, random_state=seed, shuffle=True)
    train_part = train_df[train_df["unit_number"].isin(train_units)].copy()
    val_part = train_df[train_df["unit_number"].isin(val_units)].copy()
    return train_part, val_part, train_units.tolist(), val_units.tolist()


def _normalize_splits(train_df: pd.DataFrame, val_df: pd.DataFrame, test_df: pd.DataFrame):
    feature_cols = get_feature_columns(train_df)
    scaler = MinMaxScaler()
    train_df = train_df.copy()
    val_df = val_df.copy()
    test_df = test_df.copy()
    train_df[feature_cols] = scaler.fit_transform(train_df[feature_cols])
    val_df[feature_cols] = scaler.transform(val_df[feature_cols])
    test_df[feature_cols] = scaler.transform(test_df[feature_cols])
    return train_df, val_df, test_df, scaler, feature_cols


def write_validation_reports(data: dict, reports_dir: str, dataset_id: str) -> str:
    """Validate prepared train/validation/test splits and save a JSON report.

    Args:
        data: Prepared pipeline data dictionary.
        reports_dir: Report output directory.
        dataset_id: C-MAPSS dataset identifier.

    Returns:
        Path to the saved validation report.
    """
    required_columns = ["unit_number", "time_in_cycles", "RUL", "RUL_raw", "anomaly"]
    reports = [
        validate_dataframe(data["train_df"], "train", required_columns, ["RUL", "anomaly"]),
        validate_dataframe(data["val_df"], "validation", required_columns, ["RUL", "anomaly"]),
        validate_dataframe(data["test_df"], "test", required_columns, ["RUL", "anomaly"]),
    ]
    payload = {
        "dataset_id": dataset_id,
        "reports": [report.to_dict() for report in reports],
        "has_errors": any(report.errors for report in reports),
    }
    output_path = os.path.join(reports_dir, f"data_validation_{dataset_id}.json")
    write_json(output_path, payload)

    for report in reports:
        for warning in report.warnings:
            LOGGER.warning("Data validation warning [%s]: %s", report.dataset_name, warning)
        for error in report.errors:
            LOGGER.error("Data validation error [%s]: %s", report.dataset_name, error)
    return output_path


def prepare_data(args) -> dict:
    dataset_version = compute_dataset_version(args.dataset)
    train_df, test_df = load_cmapss_data(
        dataset_id=args.dataset,
        max_rul_clip=args.rul_clip,
        anomaly_threshold=args.anomaly_threshold,
    )

    train_limit = args.max_train_units
    test_limit = args.max_test_units
    if args.profile == "quick":
        train_limit = train_limit or 10
        test_limit = test_limit or 8

    train_df = _limit_units(train_df, train_limit)
    test_df = _limit_units(test_df, test_limit)
    train_df = engineer_features(select_informative_sensors(train_df), window_sizes=args.rolling_windows)
    test_df = engineer_features(select_informative_sensors(test_df), window_sizes=args.rolling_windows)
    train_part, val_part, train_units, val_units = _split_train_validation_by_unit(
        train_df, args.validation_size, args.seed
    )
    
    # Sort and reset indexes to ensure alignment
    train_part = train_part.sort_values(["unit_number", "time_in_cycles"]).reset_index(drop=True)
    val_part = val_part.sort_values(["unit_number", "time_in_cycles"]).reset_index(drop=True)
    test_df = test_df.sort_values(["unit_number", "time_in_cycles"]).reset_index(drop=True)

    feature_cols = get_feature_columns(train_part)

    # Unscaled flat features for scikit-learn models (which will use scaling inside a Pipeline)
    X_train, y_train_rul, y_train_anomaly = get_flat_features(train_part, feature_cols)
    X_val, y_val_rul, y_val_anomaly = get_flat_features(val_part, feature_cols)
    X_test, y_test_rul, y_test_anomaly = get_flat_features(test_df, feature_cols)

    train_groups = train_part["unit_number"]
    val_groups = val_part["unit_number"]
    test_groups = test_df["unit_number"]

    # Alignments & Assertions
    assert len(X_train) == len(y_train_rul) == len(train_groups)
    assert len(X_val) == len(y_val_rul) == len(val_groups)
    assert len(X_test) == len(y_test_rul) == len(test_groups)

    split_details = {
        "train_rows": len(train_part),
        "validation_rows": len(val_part),
        "test_rows": len(test_df),
        "train_units": len(train_units),
        "validation_units": len(val_units),
        "test_units": int(test_df["unit_number"].nunique()),
        "validation_size": args.validation_size,
        "split_strategy": "engine_unit_holdout_validation_plus_official_test",
        "seed": args.seed,
        "max_train_units": train_limit or "all",
        "max_test_units": test_limit or "all",
    }
    
    # Fit scaler strictly on training split for PyTorch sequence building & metadata logging
    scaler = MinMaxScaler()
    train_part_scaled = train_part.copy()
    val_part_scaled = val_part.copy()
    test_df_scaled = test_df.copy()

    train_part_scaled[feature_cols] = scaler.fit_transform(train_part[feature_cols])
    val_part_scaled[feature_cols] = scaler.transform(val_part[feature_cols])
    test_df_scaled[feature_cols] = scaler.transform(test_df[feature_cols])

    preprocessing = {
        "steps": [
            "select_informative_sensors",
            "engine_unit_train_validation_split",
            "minmax_scale_features_fit_on_train_only",
        ],
        "informative_sensors": INFORMATIVE_SENSORS,
        "operational_settings": OP_SETTINGS,
        "scaler": scaler.__class__.__name__,
        "rul_clip": args.rul_clip,
        "anomaly_threshold": args.anomaly_threshold,
    }
    feature_engineering = {
        "steps": ["rolling_mean", "rolling_std", "sensor_delta", "expanding_mean"],
        "rolling_windows": list(args.rolling_windows),
        "feature_count": len(feature_cols),
    }
    context = {
        "dataset_id": args.dataset,
        "dataset_version": dataset_version,
        "seed": args.seed,
        "main_metric": "RMSE",
        "split_details": split_details,
        "preprocessing": preprocessing,
        "feature_engineering": feature_engineering,
        "dataset_files": get_dataset_file_paths(args.dataset),
    }

    # ----- Mutual exclusion assertions -----
    _train_units_set = set(train_part["unit_number"].unique())
    _val_units_set = set(val_part["unit_number"].unique())
    _test_units_set = set(test_df["unit_number"].unique())
    assert _train_units_set.isdisjoint(_val_units_set), "Train/val engine units overlap!"
    # Note: The official C-MAPSS test set is completely disjoint by design;
    # train/test may share unit numbers but they represent different engine populations.

    # ----- Save split manifest -----
    manifest_rows = []
    for unit in sorted(_train_units_set):
        manifest_rows.append({"unit_number": unit, "split": "train", "dataset_id": args.dataset, "random_seed": args.seed})
    for unit in sorted(_val_units_set):
        manifest_rows.append({"unit_number": unit, "split": "validation", "dataset_id": args.dataset, "random_seed": args.seed})
    for unit in sorted(_test_units_set):
        manifest_rows.append({"unit_number": unit, "split": "test", "dataset_id": args.dataset, "random_seed": args.seed})

    from src.feature_engineering import build_sequence_windows
    seq_len = 30
    X_train_seq, y_train_rul_seq, y_train_anomaly_seq = build_sequence_windows(train_part_scaled, feature_cols, seq_len)
    X_val_seq, y_val_rul_seq, y_val_anomaly_seq = build_sequence_windows(val_part_scaled, feature_cols, seq_len)
    X_test_seq, y_test_rul_seq, y_test_anomaly_seq = build_sequence_windows(test_df_scaled, feature_cols, seq_len)

    return {
        "context": context,
        "feature_cols": feature_cols,
        "split_manifest": pd.DataFrame(manifest_rows),
        "train_df": train_part,
        "val_df": val_part,
        "test_df": test_df,
        "X_train": X_train,
        "y_train_rul": y_train_rul,
        "y_train_anomaly": y_train_anomaly,
        "X_val": X_val,
        "y_val_rul": y_val_rul,
        "y_val_anomaly": y_val_anomaly,
        "X_test": X_test,
        "y_test_rul": y_test_rul,
        "y_test_anomaly": y_test_anomaly,
        "train_groups": train_groups,
        "val_groups": val_groups,
        "test_groups": test_groups,
        "X_train_seq": X_train_seq,
        "y_train_rul_seq": y_train_rul_seq,
        "y_train_anomaly_seq": y_train_anomaly_seq,
        "X_val_seq": X_val_seq,
        "y_val_rul_seq": y_val_rul_seq,
        "y_val_anomaly_seq": y_val_anomaly_seq,
        "X_test_seq": X_test_seq,
        "y_test_rul_seq": y_test_rul_seq,
        "y_test_anomaly_seq": y_test_anomaly_seq,
    }


def _build_rul_models(seed: int, profile: str, requested: Optional[Iterable[str]] = None) -> dict:
    quick = profile == "quick"
    models = {
        "LinearRegression": LinearRegression(),
        "RandomForest": RandomForestRegressor(
            n_estimators=25 if quick else 150,
            max_depth=5 if quick else 12,
            random_state=seed,
            n_jobs=1 if quick else -1,
        ),
    }
    if profile in ("standard", "full"):
        models["LightGBM"] = LGBMRegressor(
            n_estimators=150,
            learning_rate=0.05,
            max_depth=8,
            random_state=seed,
            n_jobs=-1,
            verbose=-1,
        )
    if profile == "full":
        models["XGBoost"] = XGBRegressor(
            n_estimators=250,
            learning_rate=0.05,
            max_depth=6,
            subsample=0.85,
            colsample_bytree=0.85,
            random_state=seed,
            n_jobs=-1,
            verbosity=0,
        )
        models["CatBoost"] = CatBoostRegressor(
            iterations=250,
            learning_rate=0.05,
            depth=6,
            random_seed=seed,
            verbose=0,
            allow_writing_files=False,
        )
    if requested:
        models = {name: model for name, model in models.items() if name in set(requested)}
    return models


def _build_dl_rul_models(input_size: int, profile: str, requested: Optional[Iterable[str]] = None) -> dict:
    from src.train_rul_models import LSTMRegressor, GRURegressor, CNNRegressor, TransformerRegressor
    dl_models = {
        "LSTM": LSTMRegressor(input_size=input_size),
        "GRU": GRURegressor(input_size=input_size),
    }
    if profile == "full":
        dl_models["CNN_1D"] = CNNRegressor(input_size=input_size)
        dl_models["Transformer"] = TransformerRegressor(input_size=input_size)

    if requested:
        dl_models = {name: model for name, model in dl_models.items() if name in set(requested)}
    else:
        dl_models = {}
    return dl_models


def _build_anomaly_models(profile: str, requested: Optional[Iterable[str]] = None) -> list:
    names = ["IsolationForest", "LightGBM_Anomaly"]
    if profile == "full":
        names.append("OneClassSVM")
    if requested:
        names = [name for name in names if name in set(requested)]
    return names


def _build_dl_anomaly_models(input_size: int, profile: str, requested: Optional[Iterable[str]] = None) -> dict:
    from src.train_anomaly_models import Autoencoder, LSTMAutoencoder
    dl_models = {
        "Autoencoder": Autoencoder(input_size=input_size),
        "LSTM_Autoencoder": LSTMAutoencoder(input_size=input_size),
    }

    if requested:
        dl_models = {name: model for name, model in dl_models.items() if name in set(requested)}
    else:
        dl_models = {}
    return dl_models


def _model_params(model) -> dict:
    return model.get_params() if hasattr(model, "get_params") else {}


def _save_local_model(model, model_name: str, dataset_id: str, models_dir: str) -> str:
    path = os.path.join(models_dir, f"{_safe_name(model_name)}_{dataset_id}.joblib")
    joblib.dump(model, path)
    return path


def train_rul_model(model_name: str, model, data: dict, dirs: dict, dataset_context: dict) -> dict:
    LOGGER.info("Training RUL model: %s", model_name)
    started = time.perf_counter()
    model.fit(data["X_train"], data["y_train_rul"])
    runtime = time.perf_counter() - started
    n_features = len(data["feature_cols"])

    train_pred = model.predict(data["X_train"])
    val_pred = model.predict(data["X_val"])
    test_pred = model.predict(data["X_test"])
    metrics_by_split = {
        "train": compute_regression_metrics(data["y_train_rul"], train_pred, n_features=n_features),
        "validation": compute_regression_metrics(data["y_val_rul"], val_pred, n_features=n_features),
        "test": compute_regression_metrics(data["y_test_rul"], test_pred, n_features=n_features),
    }

    safe = f"{_safe_name(model_name)}_{dataset_context['dataset_id']}"
    prediction_plot = os.path.join(dirs["artifacts"], f"{safe}_rul_predictions.png")
    prediction_csv = os.path.join(dirs["artifacts"], f"{safe}_rul_predictions.csv")
    feature_plot_path = os.path.join(dirs["artifacts"], f"{safe}_feature_importance.png")
    residual_plot = os.path.join(dirs["artifacts"], f"{safe}_residuals.png")
    context_json = os.path.join(dirs["artifacts"], f"{safe}_run_context.json")
    local_model = _save_local_model(model, model_name, dataset_context["dataset_id"], dirs["models"])

    plot_rul_predictions(data["y_test_rul"], test_pred, title=f"{model_name} RUL Predictions", save_path=prediction_plot)
    plot_residuals(data["y_test_rul"], test_pred, title=f"{model_name} Residuals", save_path=residual_plot)
    save_predictions(prediction_csv, data["y_test_rul"], test_pred)
    feature_plot = plot_feature_importance(model, data["feature_cols"], feature_plot_path)
    write_json(context_json, dataset_context)

    artifacts = [prediction_plot, residual_plot, prediction_csv, feature_plot, context_json, local_model]
    log_info = log_model_run(
        model=model,
        model_name=model_name,
        task_type="rul_regression",
        dataset_context=dataset_context,
        params=_model_params(model),
        metrics_by_split=metrics_by_split,
        artifacts=[path for path in artifacts if path],
        model_flavor="sklearn",
        tags={"profile": dataset_context.get("profile", "unknown")},
    )

    return {
        "Model name": model_name,
        "Best hyperparameters": json.dumps(_model_params(model), sort_keys=True, default=str),
        "Train score": metrics_by_split["train"]["RMSE"],
        "Validation score": metrics_by_split["validation"]["RMSE"],
        "Test score": metrics_by_split["test"]["RMSE"],
        "Main metric": "RMSE",
        "Runtime": runtime,
        "MLflow run ID": log_info["run_id"],
        "Model artifact path": log_info["model_artifact_path"],
        "Task": "RUL Regression",
        "Estimator": model,
        "Best params dict": _model_params(model),
        "Test metrics dict": metrics_by_split["test"],
        "Local model path": local_model,
    }


def _threshold_predictions(scores, threshold):
    return (np.asarray(scores) >= threshold).astype(int)


def _best_threshold(y_true, scores):
    best_threshold = float(np.percentile(scores, 95))
    best_f1 = -1.0
    for threshold in np.quantile(scores, np.linspace(0.5, 0.98, 25)):
        pred = _threshold_predictions(scores, threshold)
        score = f1_score(y_true, pred, zero_division=0)
        if score > best_f1:
            best_f1 = score
            best_threshold = float(threshold)
    return best_threshold


def train_anomaly_model(model_name: str, data: dict, dirs: dict, dataset_context: dict, seed: int) -> dict:
    LOGGER.info("Training anomaly model: %s", model_name)
    started = time.perf_counter()
    X_train, y_train = data["X_train"], data["y_train_anomaly"]
    X_val, y_val = data["X_val"], data["y_val_anomaly"]
    X_test, y_test = data["X_test"], data["y_test_anomaly"]
    nominal_train = X_train[y_train == 0]

    if model_name == "IsolationForest":
        model = IsolationForest(n_estimators=100, contamination=0.05, random_state=seed, n_jobs=1)
        model.fit(nominal_train)
        train_scores = -model.score_samples(X_train)
        val_scores = -model.score_samples(X_val)
        test_scores = -model.score_samples(X_test)
        threshold = _best_threshold(y_val, val_scores)
        params = {**_model_params(model), "threshold": threshold, "fit_data": "nominal_train_rows"}
    elif model_name == "OneClassSVM":
        model = OneClassSVM(kernel="rbf", gamma="scale", nu=0.05)
        model.fit(nominal_train[: min(10000, len(nominal_train))])
        train_scores = -model.decision_function(X_train)
        val_scores = -model.decision_function(X_val)
        test_scores = -model.decision_function(X_test)
        threshold = _best_threshold(y_val, val_scores)
        params = {**_model_params(model), "threshold": threshold, "fit_data": "nominal_train_rows"}
    elif model_name == "LightGBM_Anomaly":
        params = {
            "n_estimators": 120 if dataset_context.get("profile") == "quick" else 250,
            "learning_rate": 0.05,
            "max_depth": 6,
            "num_leaves": 31,
            "class_weight": "balanced",
            "random_state": seed,
            "n_jobs": 1 if dataset_context.get("profile") == "quick" else -1,
            "verbose": -1,
        }
        model = LGBMClassifier(**params)
        model.fit(X_train, y_train)
        train_scores = model.predict_proba(X_train)[:, 1]
        val_scores = model.predict_proba(X_val)[:, 1]
        test_scores = model.predict_proba(X_test)[:, 1]
        threshold = _best_threshold(y_val, val_scores)
        params = {**params, "threshold": threshold, "threshold_source": "validation_f1"}
    else:
        raise ValueError(f"Unsupported anomaly model: {model_name}")

    train_pred = _threshold_predictions(train_scores, threshold)
    val_pred = _threshold_predictions(val_scores, threshold)
    test_pred = _threshold_predictions(test_scores, threshold)
    runtime = time.perf_counter() - started
    metrics_by_split = {
        "train": compute_anomaly_metrics(y_train, train_pred, y_prob=train_scores),
        "validation": compute_anomaly_metrics(y_val, val_pred, y_prob=val_scores),
        "test": compute_anomaly_metrics(y_test, test_pred, y_prob=test_scores),
    }

    safe = f"{_safe_name(model_name)}_{dataset_context['dataset_id']}"
    cm_png = os.path.join(dirs["artifacts"], f"{safe}_confusion_matrix.png")
    cm_json = os.path.join(dirs["artifacts"], f"{safe}_confusion_matrix.json")
    prediction_csv = os.path.join(dirs["artifacts"], f"{safe}_anomaly_predictions.csv")
    feature_plot_path = os.path.join(dirs["artifacts"], f"{safe}_feature_importance.png")
    roc_plot = os.path.join(dirs["artifacts"], f"{safe}_roc_curve.png")
    pr_plot = os.path.join(dirs["artifacts"], f"{safe}_precision_recall_curve.png")
    context_json = os.path.join(dirs["artifacts"], f"{safe}_run_context.json")
    local_model = _save_local_model(model, model_name, dataset_context["dataset_id"], dirs["models"])

    plot_confusion_matrix(metrics_by_split["test"]["Confusion_Matrix"], title=f"{model_name} Confusion Matrix", save_path=cm_png)
    write_json(cm_json, {"confusion_matrix": metrics_by_split["test"]["Confusion_Matrix"]})
    save_predictions(prediction_csv, y_test, test_pred, y_score=test_scores)
    feature_plot = plot_feature_importance(model, data["feature_cols"], feature_plot_path)
    roc_plot = plot_roc_curve(y_test, test_scores, title=f"{model_name} ROC Curve", save_path=roc_plot)
    pr_plot = plot_precision_recall_curve(
        y_test,
        test_scores,
        title=f"{model_name} Precision-Recall Curve",
        save_path=pr_plot,
    )
    write_json(context_json, dataset_context)

    anomaly_context = dict(dataset_context)
    anomaly_context["main_metric"] = "F1_Score"
    artifacts = [cm_png, cm_json, prediction_csv, feature_plot, roc_plot, pr_plot, context_json, local_model]
    log_info = log_model_run(
        model=model,
        model_name=model_name,
        task_type="anomaly_detection",
        dataset_context=anomaly_context,
        params=params,
        metrics_by_split=metrics_by_split,
        artifacts=[path for path in artifacts if path],
        model_flavor="sklearn",
        tags={"profile": dataset_context.get("profile", "unknown")},
    )

    return {
        "Model name": model_name,
        "Best hyperparameters": json.dumps(params, sort_keys=True, default=str),
        "Train score": metrics_by_split["train"]["F1_Score"],
        "Validation score": metrics_by_split["validation"]["F1_Score"],
        "Test score": metrics_by_split["test"]["F1_Score"],
        "Main metric": "F1_Score",
        "Runtime": runtime,
        "MLflow run ID": log_info["run_id"],
        "Model artifact path": log_info["model_artifact_path"],
        "Task": "Anomaly Detection",
        "Estimator": model,
        "Best params dict": params,
        "Test metrics dict": metrics_by_split["test"],
        "Local model path": local_model,
    }


DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


def train_pytorch_rul_model_pipeline(
    model_name: str, model, data: dict, dirs: dict, dataset_context: dict,
    epochs: int, batch_size: int = 64, lr: float = 1e-3, seed: int = 42
) -> dict:
    set_seed(seed)
    model = model.to(DEVICE)
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    criterion = nn.MSELoss()
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, patience=5, factor=0.5)

    X_tr = torch.tensor(data["X_train_seq"], dtype=torch.float32)
    y_tr = torch.tensor(data["y_train_rul_seq"], dtype=torch.float32)
    train_loader = DataLoader(TensorDataset(X_tr, y_tr), batch_size=batch_size, shuffle=True)

    X_val = torch.tensor(data["X_val_seq"], dtype=torch.float32)
    y_val = torch.tensor(data["y_val_rul_seq"], dtype=torch.float32)
    val_loader = DataLoader(TensorDataset(X_val, y_val), batch_size=batch_size, shuffle=False)

    LOGGER.info("Training PyTorch model %s for %d epochs...", model_name, epochs)
    started = time.perf_counter()
    for epoch in range(1, epochs + 1):
        model.train()
        epoch_loss = 0.0
        for X_batch, y_batch in train_loader:
            X_batch, y_batch = X_batch.to(DEVICE), y_batch.to(DEVICE)
            optimizer.zero_grad()
            preds = model(X_batch)
            loss = criterion(preds, y_batch)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item() * len(y_batch)
        
        # Validation loss
        model.eval()
        val_loss = 0.0
        with torch.no_grad():
            for X_batch, y_batch in val_loader:
                X_batch, y_batch = X_batch.to(DEVICE), y_batch.to(DEVICE)
                preds = model(X_batch)
                val_loss += criterion(preds, y_batch).item() * len(y_batch)
        avg_val_loss = val_loss / len(y_val)
        scheduler.step(avg_val_loss)

        if epoch % 10 == 0 or epoch == epochs:
            LOGGER.info("  [%s] Epoch %d/%d | Train Loss: %.4f | Val Loss: %.4f",
                        model_name, epoch, epochs, epoch_loss / len(y_tr), avg_val_loss)

    runtime = time.perf_counter() - started

    # Evaluate on all splits
    model.eval()
    with torch.no_grad():
        train_pred = model(torch.tensor(data["X_train_seq"], dtype=torch.float32).to(DEVICE)).cpu().numpy()
        val_pred = model(torch.tensor(data["X_val_seq"], dtype=torch.float32).to(DEVICE)).cpu().numpy()
        test_pred = model(torch.tensor(data["X_test_seq"], dtype=torch.float32).to(DEVICE)).cpu().numpy()

    n_features = len(data["feature_cols"])
    metrics_by_split = {
        "train": compute_regression_metrics(data["y_train_rul_seq"], train_pred, n_features=n_features),
        "validation": compute_regression_metrics(data["y_val_rul_seq"], val_pred, n_features=n_features),
        "test": compute_regression_metrics(data["y_test_rul_seq"], test_pred, n_features=n_features),
    }

    # Save local model
    safe = f"{_safe_name(model_name)}_{dataset_context['dataset_id']}"
    prediction_plot = os.path.join(dirs["artifacts"], f"{safe}_rul_predictions.png")
    prediction_csv = os.path.join(dirs["artifacts"], f"{safe}_rul_predictions.csv")
    context_json = os.path.join(dirs["artifacts"], f"{safe}_run_context.json")
    
    local_model = os.path.join(dirs["models"], f"{safe}.pt")
    torch.save(model.state_dict(), local_model)

    plot_rul_predictions(data["y_test_rul_seq"], test_pred, title=f"{model_name} RUL Predictions", save_path=prediction_plot)
    save_predictions(prediction_csv, data["y_test_rul_seq"], test_pred)
    write_json(context_json, dataset_context)

    artifacts = [prediction_plot, prediction_csv, context_json, local_model]
    
    params = {
        "epochs": epochs,
        "batch_size": batch_size,
        "lr": lr,
        "optimizer": "Adam",
        "device": DEVICE
    }
    if hasattr(model, "lstm"):
        params["hidden_size"] = model.lstm.hidden_size
        params["num_layers"] = model.lstm.num_layers
    elif hasattr(model, "gru"):
        params["hidden_size"] = model.gru.hidden_size
        params["num_layers"] = model.gru.num_layers

    log_info = log_model_run(
        model=model,
        model_name=model_name,
        task_type="rul_regression",
        dataset_context=dataset_context,
        params=params,
        metrics_by_split=metrics_by_split,
        artifacts=[path for path in artifacts if path],
        model_flavor="pytorch",
        tags={"profile": dataset_context.get("profile", "unknown")},
    )

    return {
        "Model name": model_name,
        "Best hyperparameters": json.dumps(params, sort_keys=True, default=str),
        "Train score": metrics_by_split["train"]["RMSE"],
        "Validation score": metrics_by_split["validation"]["RMSE"],
        "Test score": metrics_by_split["test"]["RMSE"],
        "Main metric": "RMSE",
        "Runtime": runtime,
        "MLflow run ID": log_info["run_id"],
        "Model artifact path": log_info["model_artifact_path"],
        "Task": "RUL Regression",
        "Estimator": model,
        "Best params dict": params,
        "Test metrics dict": metrics_by_split["test"],
        "Local model path": local_model,
    }


def train_pytorch_anomaly_model_pipeline(
    model_name: str, model, data: dict, dirs: dict, dataset_context: dict,
    epochs: int, batch_size: int = 64, lr: float = 1e-3, seed: int = 42
) -> dict:
    set_seed(seed)
    model = model.to(DEVICE)
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    criterion = nn.MSELoss()

    is_seq = (model_name == "LSTM_Autoencoder")

    # Get training nominal data
    if is_seq:
        y_train_anomaly = data["y_train_anomaly_seq"]
        X_train_nominal = data["X_train_seq"][y_train_anomaly == 0]
        X_tr = torch.tensor(X_train_nominal, dtype=torch.float32)
    else:
        y_train_anomaly = data["y_train_anomaly"]
        X_train_nominal = data["X_train"][y_train_anomaly == 0]
        X_tr = torch.tensor(X_train_nominal, dtype=torch.float32)

    train_loader = DataLoader(TensorDataset(X_tr), batch_size=batch_size, shuffle=True)

    LOGGER.info("Training PyTorch Anomaly model %s for %d epochs...", model_name, epochs)
    started = time.perf_counter()
    for epoch in range(1, epochs + 1):
        model.train()
        epoch_loss = 0.0
        for (X_batch,) in train_loader:
            X_batch = X_batch.to(DEVICE)
            optimizer.zero_grad()
            recon = model(X_batch)
            loss = criterion(recon, X_batch)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item() * len(X_batch)

        if epoch % 10 == 0 or epoch == epochs:
            LOGGER.info("  [%s] Epoch %d/%d | Loss: %.6f",
                        model_name, epoch, epochs, epoch_loss / len(X_tr))

    runtime = time.perf_counter() - started

    # Evaluate reconstruction error
    model.eval()
    with torch.no_grad():
        if is_seq:
            # Seq eval
            X_tr_all = torch.tensor(data["X_train_seq"], dtype=torch.float32).to(DEVICE)
            X_val_all = torch.tensor(data["X_val_seq"], dtype=torch.float32).to(DEVICE)
            X_te_all = torch.tensor(data["X_test_seq"], dtype=torch.float32).to(DEVICE)

            train_recon = model(X_tr_all)
            val_recon = model(X_val_all)
            test_recon = model(X_te_all)

            train_errors = ((train_recon - X_tr_all) ** 2).mean(dim=[1, 2]).cpu().numpy()
            val_errors = ((val_recon - X_val_all) ** 2).mean(dim=[1, 2]).cpu().numpy()
            test_errors = ((test_recon - X_te_all) ** 2).mean(dim=[1, 2]).cpu().numpy()

            y_tr_true = data["y_train_anomaly_seq"]
            y_val_true = data["y_val_anomaly_seq"]
            y_te_true = data["y_test_anomaly_seq"]
        else:
            # Flat eval
            X_tr_all = torch.tensor(data["X_train"], dtype=torch.float32).to(DEVICE)
            X_val_all = torch.tensor(data["X_val"], dtype=torch.float32).to(DEVICE)
            X_te_all = torch.tensor(data["X_test"], dtype=torch.float32).to(DEVICE)

            train_recon = model(X_tr_all)
            val_recon = model(X_val_all)
            test_recon = model(X_te_all)

            train_errors = ((train_recon - X_tr_all) ** 2).mean(dim=1).cpu().numpy()
            val_errors = ((val_recon - X_val_all) ** 2).mean(dim=1).cpu().numpy()
            test_errors = ((test_recon - X_te_all) ** 2).mean(dim=1).cpu().numpy()

            y_tr_true = data["y_train_anomaly"]
            y_val_true = data["y_val_anomaly"]
            y_te_true = data["y_test_anomaly"]

    # Threshold tuning on validation set
    threshold = _best_threshold(y_val_true, val_errors)

    train_pred = _threshold_predictions(train_errors, threshold)
    val_pred = _threshold_predictions(val_errors, threshold)
    test_pred = _threshold_predictions(test_errors, threshold)

    metrics_by_split = {
        "train": compute_anomaly_metrics(y_tr_true, train_pred, y_prob=train_errors),
        "validation": compute_anomaly_metrics(y_val_true, val_pred, y_prob=val_errors),
        "test": compute_anomaly_metrics(y_te_true, test_pred, y_prob=test_errors),
    }

    # Save local model
    safe = f"{_safe_name(model_name)}_{dataset_context['dataset_id']}"
    cm_png = os.path.join(dirs["artifacts"], f"{safe}_confusion_matrix.png")
    cm_json = os.path.join(dirs["artifacts"], f"{safe}_confusion_matrix.json")
    prediction_csv = os.path.join(dirs["artifacts"], f"{safe}_anomaly_predictions.csv")
    context_json = os.path.join(dirs["artifacts"], f"{safe}_run_context.json")
    
    local_model = os.path.join(dirs["models"], f"{safe}.pt")
    torch.save(model.state_dict(), local_model)

    plot_confusion_matrix(metrics_by_split["test"]["Confusion_Matrix"], title=f"{model_name} Confusion Matrix", save_path=cm_png)
    write_json(cm_json, {"confusion_matrix": metrics_by_split["test"]["Confusion_Matrix"]})
    save_predictions(prediction_csv, y_te_true, test_pred, y_score=test_errors)
    write_json(context_json, dataset_context)

    artifacts = [cm_png, cm_json, prediction_csv, context_json, local_model]
    
    params = {
        "epochs": epochs,
        "batch_size": batch_size,
        "lr": lr,
        "threshold": threshold,
        "device": DEVICE
    }

    log_info = log_model_run(
        model=model,
        model_name=model_name,
        task_type="anomaly_detection",
        dataset_context=dataset_context,
        params=params,
        metrics_by_split=metrics_by_split,
        artifacts=[path for path in artifacts if path],
        model_flavor="pytorch",
        tags={"profile": dataset_context.get("profile", "unknown")},
    )

    return {
        "Model name": model_name,
        "Best hyperparameters": json.dumps(params, sort_keys=True, default=str),
        "Train score": metrics_by_split["train"]["F1_Score"],
        "Validation score": metrics_by_split["validation"]["F1_Score"],
        "Test score": metrics_by_split["test"]["F1_Score"],
        "Main metric": "F1_Score",
        "Runtime": runtime,
        "MLflow run ID": log_info["run_id"],
        "Model artifact path": log_info["model_artifact_path"],
        "Task": "Anomaly Detection",
        "Estimator": model,
        "Best params dict": params,
        "Test metrics dict": metrics_by_split["test"],
        "Local model path": local_model,
    }


def _rows_for_csv(rows: list) -> pd.DataFrame:
    drop = {"Estimator", "Best params dict", "Test metrics dict"}
    return pd.DataFrame([{key: value for key, value in row.items() if key not in drop} for row in rows])


def _best_rul_row(rows: list) -> Optional[dict]:
    """Select best RUL model by VALIDATION score — never test score."""
    candidates = [row for row in rows if row.get("Task") == "RUL Regression"]
    return min(candidates, key=lambda row: row["Validation score"]) if candidates else None


def _best_anomaly_row(rows: list) -> Optional[dict]:
    """Select best anomaly model by VALIDATION score — never test score."""
    candidates = [row for row in rows if row.get("Task") == "Anomaly Detection"]
    return max(candidates, key=lambda row: row["Validation score"]) if candidates else None


def _save_best_outputs(best_row: dict, task_label: str, dirs: dict, dataset_context: dict, data: dict = None):
    if not best_row:
        return None
    params_path = os.path.join(dirs["reports"], f"best_{task_label}_params_{dataset_context['dataset_id']}.json")
    metrics_path = os.path.join(dirs["reports"], f"best_{task_label}_metrics_{dataset_context['dataset_id']}.json")
    
    # Choose file extension dynamically
    model_ext = ".pt" if (best_row.get("Local model path") and best_row["Local model path"].endswith(".pt")) else ".joblib"
    model_path = os.path.join(dirs["models"], f"best_{task_label}_model_{dataset_context['dataset_id']}{model_ext}")
    model_card_path = os.path.join(dirs["reports"], f"best_{task_label}_model_card_{dataset_context['dataset_id']}.json")
    
    write_json(params_path, best_row.get("Best params dict", {}))
    write_json(metrics_path, best_row.get("Test metrics dict", {}))
    
    if best_row.get("Local model path") and os.path.exists(best_row["Local model path"]):
        shutil.copy2(best_row["Local model path"], model_path)
    else:
        if model_ext == ".pt":
            torch.save(best_row["Estimator"].state_dict(), model_path)
        else:
            joblib.dump(best_row["Estimator"], model_path)

    # Run SHAP Analysis
    shap_artifacts = []
    top_features = []
    shap_plots = {}
    if data is not None:
        try:
            from src.shap_explain import run_shap_analysis
            LOGGER.info("Generating SHAP explanations for best %s model...", task_label)
            shap_results = run_shap_analysis(
                model=best_row["Estimator"],
                data=data,
                task_type=task_label,
                model_name=best_row["Model name"],
                dataset_id=dataset_context["dataset_id"],
                save_dir=dirs["artifacts"]
            )
            if shap_results:
                shap_plots = shap_results.get("plots", {})
                top_features = shap_results.get("top_features", [])
                for plot_path in shap_plots.values():
                    if os.path.exists(plot_path):
                        shap_artifacts.append(plot_path)
                LOGGER.info("SHAP explanations generated for best %s model.", task_label)
        except Exception as e:
            LOGGER.error("Failed to run SHAP interpretation for best %s model: %s", task_label, e)

    best_context = dict(dataset_context)
    best_context["main_metric"] = best_row["Main metric"]
    
    # EXPORT RUL TRAJECTORIES FOR DASHBOARD
    if data is not None and task_label == "rul":
        try:
            import pandas as pd
            LOGGER.info("Exporting RUL trajectories for dashboard...")
            x_test = data["X_test"]
            y_test = data["y_test_rul"]
            test_df = data["test_df"]  # Assuming the original test dataframe is in data
            preds = best_row["Estimator"].predict(x_test)
            
            traj_data = []
            for unit in test_df["unit_number"].unique():
                unit_mask = test_df["unit_number"] == unit
                unit_cycles = test_df.loc[unit_mask, "time_in_cycles"].values
                unit_true = y_test.loc[unit_mask].values if isinstance(y_test, pd.Series) else y_test[unit_mask]
                unit_preds = preds[unit_mask]
                
                trajectory = [
                    {"cycle": int(cyc), "true_rul": float(tru), "predicted_rul": float(prd)}
                    for cyc, tru, prd in zip(unit_cycles, unit_true, unit_preds)
                ]
                traj_data.append({
                    "unit_number": int(unit),
                    "is_sample": False,
                    "trajectory": trajectory
                })
            
            traj_path = os.path.join(dirs["reports"], f"rul_trajectories_{dataset_context['dataset_id']}.json")
            with open(traj_path, "w") as f:
                json.dump(traj_data, f, indent=2)
            LOGGER.info("Exported RUL trajectories to %s", traj_path)
        except Exception as e:
            LOGGER.error("Failed to export RUL trajectories: %s", e)

    model_flavor = "pytorch" if model_ext == ".pt" else "sklearn"
    
    log_info = log_final_best_model(
        model=best_row["Estimator"],
        model_name=best_row["Model name"],
        task_type=task_label,
        dataset_context=best_context,
        params=best_row.get("Best params dict", {}),
        metrics=best_row.get("Test metrics dict", {}),
        artifacts=[params_path, metrics_path, model_path] + shap_artifacts,
        model_flavor=model_flavor,
    )
    model_card = build_model_version(
        model_name=best_row["Model name"],
        dataset_version=dataset_context["dataset_version"],
        run_id=log_info["run_id"],
    )
    model_card.update(
        {
            "task": task_label,
            "main_metric": best_row["Main metric"],
            "test_score": best_row["Test score"],
            "local_model_path": model_path,
            "mlflow_model_artifact_path": log_info["model_artifact_path"],
        }
    )
    save_model_card(model_card_path, model_card)
    return {
        "params_path": params_path,
        "metrics_path": metrics_path,
        "model_path": model_path,
        "model_card_path": model_card_path,
        "mlflow_run_id": log_info["run_id"],
        "mlflow_model_artifact_path": log_info["model_artifact_path"],
        "top_features": top_features,
        "shap_plots": shap_plots,
    }


def _save_final_report(rows: list, best_rul: Optional[dict], best_anomaly: Optional[dict], outputs: dict, dirs: dict, context: dict):
    comparison = _rows_for_csv(rows)
    comparison_path = os.path.join(dirs["reports"], f"model_comparison_{context['dataset_id']}.csv")
    final_json = os.path.join(dirs["reports"], f"final_report_{context['dataset_id']}.json")
    final_md = os.path.join(dirs["reports"], f"final_report_{context['dataset_id']}.md")
    comparison.to_csv(comparison_path, index=False)

    report = {
        "dataset": context["dataset_id"],
        "dataset_version": context["dataset_version"],
        "split_details": context["split_details"],
        "preprocessing": context["preprocessing"],
        "feature_engineering": context["feature_engineering"],
        "comparison_table": comparison.to_dict(orient="records"),
        "best_rul_model": None if not best_rul else {
            "model_name": best_rul["Model name"],
            "test_score": best_rul["Test score"],
            "main_metric": best_rul["Main metric"],
            "mlflow_run_id": best_rul["MLflow run ID"],
            "model_artifact_path": best_rul["Model artifact path"],
        },
        "best_anomaly_model": None if not best_anomaly else {
            "model_name": best_anomaly["Model name"],
            "test_score": best_anomaly["Test score"],
            "main_metric": best_anomaly["Main metric"],
            "mlflow_run_id": best_anomaly["MLflow run ID"],
            "model_artifact_path": best_anomaly["Model artifact path"],
        },
        "saved_outputs": outputs,
        "mlflow_ui_command": "mlflow ui --backend-store-uri ./mlruns",
        "mlflow_ui_url": "http://127.0.0.1:5000",
    }
    write_json(final_json, report)

    lines = [
        f"# Final ML Report - {context['dataset_id']}",
        "",
        f"- Dataset version: `{context['dataset_version']}`",
        f"- Features used: `{context['feature_engineering']['feature_count']}`",
        f"- Train rows: `{context['split_details']['train_rows']}`",
        f"- Validation rows: `{context['split_details']['validation_rows']}`",
        f"- Test rows: `{context['split_details']['test_rows']}`",
        "",
        "## Best Models",
    ]
    if best_rul:
        lines.append(f"- Best RUL model: `{best_rul['Model name']}` with test RMSE `{best_rul['Test score']:.4f}`")
    if best_anomaly:
        lines.append(f"- Best anomaly model: `{best_anomaly['Model name']}` with test F1 `{best_anomaly['Test score']:.4f}`")

    # Add SHAP Model Interpretability Section
    lines.extend([
        "",
        "## Model Interpretability (SHAP Analysis)",
        ""
    ])

    if best_rul and outputs.get("best_rul") and outputs["best_rul"].get("top_features"):
        lines.extend([
            "### Remaining Useful Life (RUL) Regression Interpretability",
            "",
            "Top features contributing to RUL predictions:",
            ""
        ])
        for feat, val in outputs["best_rul"]["top_features"]:
            lines.append(f"- `{feat}`: Shapley value magnitude `{val:.4f}`")
        lines.extend([
            "",
            "SHAP explanation plots:",
            f"- [Summary Bar Plot](../artifacts/best_rul_shap_summary_bar_{context['dataset_id']}.png)",
            f"- [Beeswarm Plot](../artifacts/best_rul_shap_summary_beeswarm_{context['dataset_id']}.png)",
            f"- [Dependence Plot](../artifacts/best_rul_shap_dependence_{context['dataset_id']}.png)",
            ""
        ])

    if best_anomaly and outputs.get("best_anomaly") and outputs["best_anomaly"].get("top_features"):
        lines.extend([
            "### Anomaly & Degradation Detection Interpretability",
            "",
            "Top features contributing to anomaly classification:",
            ""
        ])
        for feat, val in outputs["best_anomaly"]["top_features"]:
            lines.append(f"- `{feat}`: Shapley value magnitude `{val:.4f}`")
        lines.extend([
            "",
            "SHAP explanation plots:",
            f"- [Summary Bar Plot](../artifacts/best_anomaly_shap_summary_bar_{context['dataset_id']}.png)",
            f"- [Beeswarm Plot](../artifacts/best_anomaly_shap_summary_beeswarm_{context['dataset_id']}.png)",
            f"- [Dependence Plot](../artifacts/best_anomaly_shap_dependence_{context['dataset_id']}.png)",
            ""
        ])

    lines.extend(
        [
            "",
            "## MLflow",
            "",
            "Run `mlflow ui --backend-store-uri ./mlruns` from this project folder, then open http://127.0.0.1:5000.",
            "",
            "## Comparison Table",
            "",
            "```",
            comparison.to_string(index=False) if not comparison.empty else "No model rows were produced.",
            "```",
        ]
    )
    with open(final_md, "w", encoding="utf-8") as handle:
        handle.write("\n".join(lines))
    return {"comparison_csv": comparison_path, "final_json": final_json, "final_markdown": final_md}


def run_pipeline(args) -> dict:
    configure_logging()
    set_seed(args.seed)
    dirs = _runtime_dirs()
    setup_mlflow(args.experiment_name or f"MechSage_{args.dataset}", tracking_uri=args.tracking_uri)

    LOGGER.info("Preparing data for dataset %s", args.dataset)
    data = prepare_data(args)
    context = data["context"]
    context["profile"] = args.profile
    write_json(os.path.join(dirs["reports"], f"pipeline_context_{args.dataset}.json"), context)
    validation_report_path = write_validation_reports(data, dirs["reports"], args.dataset)
    LOGGER.info("Data validation report: %s", validation_report_path)

    # Save split manifest for reproducibility
    manifest_path = os.path.join(dirs["artifacts"], f"split_manifest_{args.dataset}.csv")
    data["split_manifest"].to_csv(manifest_path, index=False)
    LOGGER.info("Split manifest saved: %s", manifest_path)

    # Set epochs based on profile
    if args.profile == "quick":
        dl_epochs = 1
    elif args.profile == "standard":
        dl_epochs = 20
    else:
        dl_epochs = 40

    rows = []

    # 1. Train ML RUL Models
    for model_name, model in _build_rul_models(args.seed, args.profile, args.models).items():
        rows.append(train_rul_model(model_name, model, data, dirs, context))

    # 2. Train DL RUL Models
    for model_name, model in _build_dl_rul_models(len(data["feature_cols"]), args.profile, args.models).items():
        rows.append(train_pytorch_rul_model_pipeline(model_name, model, data, dirs, context, epochs=dl_epochs, seed=args.seed))

    if args.tune:
        LOGGER.info("Running hyperparameter tuning methods: %s", ", ".join(args.tuning_methods))
        tuning_rows = run_all_tuning(
            data["X_train"],
            data["y_train_rul"],
            data["train_groups"],   # GroupKFold groups — NO test data
            data["X_val"],
            data["y_val_rul"],
            dataset_context=context,
            artifacts_dir=dirs["artifacts"],
            feature_names=data["feature_cols"],
            model_names=args.tuning_models,
            methods=args.tuning_methods,
            n_trials=args.n_trials,
            n_splits=args.cv,
            seed=args.seed,
            profile=args.profile,
        )
        rows.extend(tuning_rows)

    if not args.skip_anomaly:
        # 3. Train ML Anomaly Models
        for model_name in _build_anomaly_models(args.profile, args.anomaly_models):
            rows.append(train_anomaly_model(model_name, data, dirs, context, args.seed))

        # 4. Train DL Anomaly Models
        for model_name, model in _build_dl_anomaly_models(len(data["feature_cols"]), args.profile, args.anomaly_models).items():
            rows.append(train_pytorch_anomaly_model_pipeline(model_name, model, data, dirs, context, epochs=dl_epochs, seed=args.seed))

    best_rul = _best_rul_row(rows)
    best_anomaly = _best_anomaly_row(rows)
    saved_outputs = {
        "best_rul": _save_best_outputs(best_rul, "rul", dirs, context, data) if best_rul else None,
        "best_anomaly": _save_best_outputs(best_anomaly, "anomaly", dirs, context, data) if best_anomaly else None,
    }
    report_paths = _save_final_report(rows, best_rul, best_anomaly, saved_outputs, dirs, context)
    LOGGER.info("Pipeline complete.")
    LOGGER.info("Comparison table: %s", report_paths["comparison_csv"])
    return {
        "rows": rows,
        "best_rul": best_rul,
        "best_anomaly": best_anomaly,
        "report_paths": report_paths,
        "saved_outputs": saved_outputs,
    }
