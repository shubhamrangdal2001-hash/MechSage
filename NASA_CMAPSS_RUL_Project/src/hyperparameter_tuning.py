"""Hyperparameter tuning with GridSearchCV, RandomizedSearchCV, and Optuna."""

import itertools
import json
import os
import time
from typing import Iterable, Optional

import mlflow
import mlflow.sklearn
import optuna
from catboost import CatBoostRegressor
from lightgbm import LGBMRegressor
from sklearn.base import clone
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from xgboost import XGBRegressor

from src.evaluate import compute_regression_metrics
from src.mlflow_tracking import (
    log_metrics,
    log_params,
    log_tuning_trial,
    mark_best_trial,
    plot_feature_importance,
    save_predictions,
)
from src.utils import set_seed


optuna.logging.set_verbosity(optuna.logging.WARNING)


def _rmse_score(metrics: dict) -> float:
    return float(metrics["RMSE"])


def _space_size(param_space: dict) -> int:
    size = 1
    for values in param_space.values():
        if isinstance(values, (list, tuple)):
            size *= len(values)
        else:
            return 10**9
    return size


def _evaluate_candidate(estimator, params, X_train, y_train, X_val, y_val, X_test, y_test):
    model = clone(estimator).set_params(**params)
    started = time.perf_counter()
    model.fit(X_train, y_train)
    runtime = time.perf_counter() - started
    n_features = X_train.shape[1]

    train_pred = model.predict(X_train)
    val_pred = model.predict(X_val)
    test_pred = model.predict(X_test)
    train_metrics = compute_regression_metrics(y_train, train_pred, n_features=n_features)
    val_metrics = compute_regression_metrics(y_val, val_pred, n_features=n_features)
    test_metrics = compute_regression_metrics(y_test, test_pred, n_features=n_features)

    summary = {
        "train_score": _rmse_score(train_metrics),
        "validation_score": _rmse_score(val_metrics),
        "test_score": _rmse_score(test_metrics),
        "runtime_seconds": runtime,
        "train_RMSE": train_metrics["RMSE"],
        "validation_RMSE": val_metrics["RMSE"],
        "test_RMSE": test_metrics["RMSE"],
        "test_MAE": test_metrics["MAE"],
        "test_MSE": test_metrics["MSE"],
        "test_R2": test_metrics["R2"],
        "test_Adjusted_R2": test_metrics["Adjusted_R2"],
        "test_MAPE": test_metrics["MAPE"],
        "test_NASA_Score": test_metrics["NASA_Score"],
    }
    return model, train_metrics, val_metrics, test_metrics, summary


def _base_specs(seed: int, profile: str) -> dict:
    quick = profile == "quick"
    return {
        "RandomForest": {
            "estimator": RandomForestRegressor(random_state=seed, n_jobs=1 if quick else -1),
            "grid": {
                "n_estimators": [20] if quick else [100, 200],
                "max_depth": [4] if quick else [6, 10, None],
                "min_samples_leaf": [1] if quick else [1, 2],
            },
            "random": {
                "n_estimators": [20, 40, 60] if quick else [100, 150, 200, 300],
                "max_depth": [3, 5, 8, None] if quick else [4, 6, 10, 14, None],
                "min_samples_leaf": [1, 2, 4],
                "max_features": ["sqrt", None],
            },
        },
        "XGBoost": {
            "estimator": XGBRegressor(random_state=seed, n_jobs=1 if quick else -1, verbosity=0),
            "grid": {
                "n_estimators": [50] if quick else [150, 250],
                "learning_rate": [0.1] if quick else [0.05, 0.1],
                "max_depth": [3] if quick else [3, 6],
            },
            "random": {
                "n_estimators": [50, 80] if quick else [100, 200, 350],
                "learning_rate": [0.02, 0.05, 0.1, 0.2],
                "max_depth": [2, 3, 5] if quick else [3, 5, 7, 9],
                "subsample": [0.7, 0.85, 1.0],
                "colsample_bytree": [0.7, 0.85, 1.0],
            },
        },
        "LightGBM": {
            "estimator": LGBMRegressor(random_state=seed, n_jobs=1 if quick else -1, verbose=-1),
            "grid": {
                "n_estimators": [50] if quick else [150, 250],
                "learning_rate": [0.1] if quick else [0.05, 0.1],
                "max_depth": [3] if quick else [4, 8, -1],
            },
            "random": {
                "n_estimators": [50, 80] if quick else [100, 200, 350],
                "learning_rate": [0.02, 0.05, 0.1, 0.2],
                "max_depth": [3, 5, -1] if quick else [4, 6, 10, -1],
                "num_leaves": [15, 31, 63],
                "subsample": [0.7, 0.85, 1.0],
            },
        },
        "CatBoost": {
            "estimator": CatBoostRegressor(random_seed=seed, verbose=0, allow_writing_files=False),
            "grid": {
                "iterations": [50] if quick else [150, 250],
                "learning_rate": [0.1] if quick else [0.05, 0.1],
                "depth": [3] if quick else [4, 6],
            },
            "random": {
                "iterations": [50, 80] if quick else [100, 200, 350],
                "learning_rate": [0.02, 0.05, 0.1, 0.2],
                "depth": [3, 4, 6] if quick else [4, 6, 8],
                "l2_leaf_reg": [0.1, 1.0, 3.0, 10.0],
            },
        },
    }


def _suggest_params(trial, model_name: str, quick: bool):
    if model_name == "RandomForest":
        return {
            "n_estimators": trial.suggest_int("n_estimators", 20 if quick else 80, 70 if quick else 350),
            "max_depth": trial.suggest_int("max_depth", 2, 8 if quick else 18),
            "min_samples_leaf": trial.suggest_int("min_samples_leaf", 1, 4 if quick else 8),
            "max_features": trial.suggest_categorical("max_features", ["sqrt", None]),
        }
    if model_name == "XGBoost":
        return {
            "n_estimators": trial.suggest_int("n_estimators", 40 if quick else 100, 90 if quick else 450),
            "learning_rate": trial.suggest_float("learning_rate", 0.02, 0.2, log=True),
            "max_depth": trial.suggest_int("max_depth", 2, 5 if quick else 10),
            "subsample": trial.suggest_float("subsample", 0.7, 1.0),
            "colsample_bytree": trial.suggest_float("colsample_bytree", 0.7, 1.0),
        }
    if model_name == "LightGBM":
        return {
            "n_estimators": trial.suggest_int("n_estimators", 40 if quick else 100, 90 if quick else 450),
            "learning_rate": trial.suggest_float("learning_rate", 0.02, 0.2, log=True),
            "max_depth": trial.suggest_int("max_depth", 2, 6 if quick else 12),
            "num_leaves": trial.suggest_int("num_leaves", 15, 63 if quick else 150),
            "subsample": trial.suggest_float("subsample", 0.7, 1.0),
        }
    if model_name == "CatBoost":
        return {
            "iterations": trial.suggest_int("iterations", 40 if quick else 100, 90 if quick else 450),
            "learning_rate": trial.suggest_float("learning_rate", 0.02, 0.2, log=True),
            "depth": trial.suggest_int("depth", 3, 5 if quick else 10),
            "l2_leaf_reg": trial.suggest_float("l2_leaf_reg", 0.1, 10.0, log=True),
        }
    raise ValueError(f"No Optuna space configured for {model_name}")


def _write_best_artifacts(
    model,
    model_name: str,
    method: str,
    dataset_id: str,
    artifacts_dir: str,
    feature_names: list,
    y_test,
    test_pred,
):
    safe_name = f"{method}_{model_name}_{dataset_id}"
    prediction_path = os.path.join(artifacts_dir, f"{safe_name}_predictions.csv")
    save_predictions(prediction_path, y_test, test_pred)
    importance_path = plot_feature_importance(
        model,
        feature_names,
        os.path.join(artifacts_dir, f"{safe_name}_feature_importance.png"),
    )
    return [path for path in [prediction_path, importance_path] if path]


def _finalize_parent_run(
    model,
    model_name: str,
    method: str,
    best_params: dict,
    train_metrics: dict,
    val_metrics: dict,
    test_metrics: dict,
    runtime_seconds: float,
    dataset_context: dict,
    artifacts: Iterable[str],
):
    log_params(best_params, prefix="best_hp_")
    log_metrics(train_metrics, prefix="best_train_")
    log_metrics(val_metrics, prefix="best_validation_")
    log_metrics(test_metrics, prefix="best_test_")
    mlflow.log_metric("best_train_score", train_metrics["RMSE"])
    mlflow.log_metric("best_validation_score", val_metrics["RMSE"])
    mlflow.log_metric("best_test_score", test_metrics["RMSE"])
    mlflow.log_metric("runtime_seconds", runtime_seconds)
    for path in artifacts:
        if path and os.path.exists(path):
            mlflow.log_artifact(path)
    mlflow.sklearn.log_model(model, artifact_path="model")
    return {
        "Model name": f"{model_name}_{method}",
        "Best hyperparameters": json.dumps(best_params, sort_keys=True),
        "Train score": train_metrics["RMSE"],
        "Validation score": val_metrics["RMSE"],
        "Test score": test_metrics["RMSE"],
        "Main metric": dataset_context.get("main_metric", "RMSE"),
        "Runtime": runtime_seconds,
        "MLflow run ID": mlflow.active_run().info.run_id,
        "Model artifact path": mlflow.get_artifact_uri("model"),
        "Task": "RUL Regression",
        "Estimator": model,
        "Best params dict": best_params,
        "Test metrics dict": test_metrics,
    }


def _run_cv_search(
    method: str,
    model_name: str,
    estimator,
    param_space: dict,
    X_train,
    y_train,
    X_val,
    y_val,
    X_test,
    y_test,
    dataset_context: dict,
    artifacts_dir: str,
    feature_names: list,
    seed: int,
    n_trials: int,
    cv: int,
):
    search_cls = GridSearchCV if method == "grid" else RandomizedSearchCV
    kwargs = {
        "estimator": estimator,
        "scoring": "neg_root_mean_squared_error",
        "cv": cv,
        "return_train_score": True,
        "n_jobs": 1,
        "refit": True,
    }
    if method == "grid":
        kwargs["param_grid"] = param_space
    else:
        kwargs["param_distributions"] = param_space
        kwargs["n_iter"] = min(n_trials, _space_size(param_space))
        kwargs["random_state"] = seed

    parent_started = time.perf_counter()
    with mlflow.start_run(run_name=f"Tuning_{method}_{model_name}_{dataset_context.get('dataset_id')}"):
        mlflow.set_tag("task_type", "tuning_parent")
        mlflow.set_tag("model_name", model_name)
        mlflow.set_tag("tuning_method", method)
        log_params(dataset_context, prefix="context_")
        log_params(param_space, prefix="search_space_")

        search = search_cls(**kwargs)
        search.fit(X_train, y_train)

        trial_run_ids = []
        best_index = int(search.best_index_)
        for trial_number, params in enumerate(search.cv_results_["params"]):
            model, train_metrics, val_metrics, test_metrics, metrics = _evaluate_candidate(
                estimator, params, X_train, y_train, X_val, y_val, X_test, y_test
            )
            metrics["cv_train_score"] = -float(search.cv_results_["mean_train_score"][trial_number])
            metrics["cv_validation_score"] = -float(search.cv_results_["mean_test_score"][trial_number])
            metrics["best_trial_flag"] = 1.0 if trial_number == best_index else 0.0
            run_id = log_tuning_trial(
                trial_number,
                params,
                metrics,
                model_name,
                dataset_context,
                method,
                best_trial=trial_number == best_index,
            )
            trial_run_ids.append(run_id)

        mark_best_trial(trial_run_ids[best_index])

        best_params = search.best_params_
        best_model, train_metrics, val_metrics, test_metrics, _ = _evaluate_candidate(
            estimator, best_params, X_train, y_train, X_val, y_val, X_test, y_test
        )
        test_pred = best_model.predict(X_test)
        artifacts = _write_best_artifacts(
            best_model,
            model_name,
            method,
            dataset_context.get("dataset_id"),
            artifacts_dir,
            feature_names,
            y_test,
            test_pred,
        )
        runtime = time.perf_counter() - parent_started
        return _finalize_parent_run(
            best_model,
            model_name,
            method,
            best_params,
            train_metrics,
            val_metrics,
            test_metrics,
            runtime,
            dataset_context,
            artifacts,
        )


def _run_optuna(
    model_name: str,
    estimator,
    X_train,
    y_train,
    X_val,
    y_val,
    X_test,
    y_test,
    dataset_context: dict,
    artifacts_dir: str,
    feature_names: list,
    seed: int,
    n_trials: int,
    profile: str,
):
    parent_started = time.perf_counter()
    quick = profile == "quick"

    with mlflow.start_run(run_name=f"Tuning_optuna_{model_name}_{dataset_context.get('dataset_id')}"):
        mlflow.set_tag("task_type", "tuning_parent")
        mlflow.set_tag("model_name", model_name)
        mlflow.set_tag("tuning_method", "optuna")
        log_params(dataset_context, prefix="context_")

        trial_run_ids = {}

        def objective(trial):
            params = _suggest_params(trial, model_name, quick)
            _, _, _, _, metrics = _evaluate_candidate(
                estimator, params, X_train, y_train, X_val, y_val, X_test, y_test
            )
            run_id = log_tuning_trial(
                trial.number,
                params,
                metrics,
                model_name,
                dataset_context,
                "optuna",
                best_trial=False,
            )
            trial_run_ids[trial.number] = run_id
            return metrics["validation_score"]

        study = optuna.create_study(
            direction="minimize",
            sampler=optuna.samplers.TPESampler(seed=seed),
        )
        study.optimize(objective, n_trials=n_trials, show_progress_bar=False)

        best_trial_number = study.best_trial.number
        mark_best_trial(trial_run_ids.get(best_trial_number))
        best_params = study.best_params
        best_model, train_metrics, val_metrics, test_metrics, _ = _evaluate_candidate(
            estimator, best_params, X_train, y_train, X_val, y_val, X_test, y_test
        )
        test_pred = best_model.predict(X_test)
        artifacts = _write_best_artifacts(
            best_model,
            model_name,
            "optuna",
            dataset_context.get("dataset_id"),
            artifacts_dir,
            feature_names,
            y_test,
            test_pred,
        )
        runtime = time.perf_counter() - parent_started
        return _finalize_parent_run(
            best_model,
            model_name,
            "optuna",
            best_params,
            train_metrics,
            val_metrics,
            test_metrics,
            runtime,
            dataset_context,
            artifacts,
        )


def run_all_tuning(
    X_train,
    y_train,
    X_val,
    y_val,
    X_test,
    y_test,
    dataset_context: dict,
    artifacts_dir: str,
    feature_names: list,
    model_names: Optional[Iterable[str]] = None,
    methods: Iterable[str] = ("grid", "random", "optuna"),
    n_trials: int = 10,
    cv: int = 3,
    seed: int = 42,
    profile: str = "full",
):
    """
    Run GridSearchCV, RandomizedSearchCV, and Optuna for suitable sklearn RUL models.
    Every candidate is logged to MLflow as a child run.
    """
    set_seed(seed)
    specs = _base_specs(seed=seed, profile=profile)
    selected = list(model_names or specs.keys())
    selected = [name for name in selected if name in specs]
    selected_methods = [method.lower() for method in methods]

    results = []
    for model_name in selected:
        spec = specs[model_name]
        estimator = spec["estimator"]
        if "grid" in selected_methods:
            results.append(
                _run_cv_search(
                    "grid",
                    model_name,
                    estimator,
                    spec["grid"],
                    X_train,
                    y_train,
                    X_val,
                    y_val,
                    X_test,
                    y_test,
                    dataset_context,
                    artifacts_dir,
                    feature_names,
                    seed,
                    n_trials,
                    cv,
                )
            )
        if "random" in selected_methods:
            results.append(
                _run_cv_search(
                    "random",
                    model_name,
                    estimator,
                    spec["random"],
                    X_train,
                    y_train,
                    X_val,
                    y_val,
                    X_test,
                    y_test,
                    dataset_context,
                    artifacts_dir,
                    feature_names,
                    seed,
                    n_trials,
                    cv,
                )
            )
        if "optuna" in selected_methods:
            results.append(
                _run_optuna(
                    model_name,
                    estimator,
                    X_train,
                    y_train,
                    X_val,
                    y_val,
                    X_test,
                    y_test,
                    dataset_context,
                    artifacts_dir,
                    feature_names,
                    seed,
                    n_trials,
                    profile,
                )
            )

    return results
