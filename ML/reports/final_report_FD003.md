# Final ML Report - FD003

- Dataset version: `bb1be79f3434`
- Features used: `129`
- Train rows: `2416`
- Validation rows: `659`
- Test rows: `1211`

## Best Models
- Best RUL model: `LinearRegression` with test RMSE `16.1727`
- Best anomaly model: `IsolationForest` with test F1 `0.0000`

## Model Interpretability (SHAP Analysis)

### Remaining Useful Life (RUL) Regression Interpretability

Top features contributing to RUL predictions:

- `sensor_12_expanding_mean`: Shapley value magnitude `41.5317`
- `sensor_7_expanding_mean`: Shapley value magnitude `35.3683`
- `sensor_15_expanding_mean`: Shapley value magnitude `24.0583`
- `sensor_14_expanding_mean`: Shapley value magnitude `12.7433`
- `sensor_13_expanding_mean`: Shapley value magnitude `12.6357`

SHAP explanation plots:
- [Summary Bar Plot](../artifacts/best_rul_shap_summary_bar_FD003.png)
- [Beeswarm Plot](../artifacts/best_rul_shap_summary_beeswarm_FD003.png)
- [Dependence Plot](../artifacts/best_rul_shap_dependence_FD003.png)

### Anomaly & Degradation Detection Interpretability

Top features contributing to anomaly classification:

- `sensor_7_roll_mean_10`: Shapley value magnitude `0.0721`
- `sensor_7_expanding_mean`: Shapley value magnitude `0.0634`
- `sensor_12_roll_mean_10`: Shapley value magnitude `0.0567`
- `sensor_15_roll_mean_20`: Shapley value magnitude `0.0518`
- `sensor_13_roll_mean_20`: Shapley value magnitude `0.0518`

SHAP explanation plots:
- [Summary Bar Plot](../artifacts/best_anomaly_shap_summary_bar_FD003.png)
- [Beeswarm Plot](../artifacts/best_anomaly_shap_summary_beeswarm_FD003.png)
- [Dependence Plot](../artifacts/best_anomaly_shap_dependence_FD003.png)


## MLflow

Run `mlflow ui --backend-store-uri ./mlruns` from this project folder, then open http://127.0.0.1:5000.

## Comparison Table

```
      Model name                                                                                                                                                                                                                                                                                                                                                                                   Best hyperparameters  Train score  Validation score  Test score Main metric  Runtime                    MLflow run ID                                                                                                                                        Model artifact path              Task                                                                                       Local model path
LinearRegression                                                                                                                                                                                                                                                                                                               {"copy_X": true, "fit_intercept": true, "n_jobs": null, "positive": false, "tol": 1e-06}     8.642309         17.880765   16.172716        RMSE 0.019681 d431d0b27dfd42f1bd5849577798ab9f file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/706136071177237741/d431d0b27dfd42f1bd5849577798ab9f/artifacts/model    RUL Regression C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\LinearRegression_FD003.joblib
    RandomForest {"bootstrap": true, "ccp_alpha": 0.0, "criterion": "squared_error", "max_depth": 5, "max_features": 1.0, "max_leaf_nodes": null, "max_samples": null, "min_impurity_decrease": 0.0, "min_samples_leaf": 1, "min_samples_split": 2, "min_weight_fraction_leaf": 0.0, "monotonic_cst": null, "n_estimators": 25, "n_jobs": 1, "oob_score": false, "random_state": 42, "verbose": 0, "warm_start": false}     6.200184         19.432663   15.367971        RMSE 2.300157 26517d6eed1d498bbc487c1748693b93 file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/706136071177237741/26517d6eed1d498bbc487c1748693b93/artifacts/model    RUL Regression     C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\RandomForest_FD003.joblib
 IsolationForest                                                                                                                                                    {"bootstrap": false, "contamination": 0.05, "fit_data": "nominal_train_rows", "max_features": 1.0, "max_samples": "auto", "n_estimators": 100, "n_jobs": 1, "random_state": 42, "threshold": 0.6483689995847156, "verbose": 0, "warm_start": false}     0.288660          0.852174    0.000000    F1_Score 0.172538 645fc7bc8fdf4ad59908ab7533cb8b9c file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/706136071177237741/645fc7bc8fdf4ad59908ab7533cb8b9c/artifacts/model Anomaly Detection  C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\IsolationForest_FD003.joblib
LightGBM_Anomaly                                                                                                                                                                       {"class_weight": "balanced", "learning_rate": 0.05, "max_depth": 6, "n_estimators": 120, "n_jobs": 1, "num_leaves": 31, "random_state": 42, "threshold": 0.9836335030265554, "threshold_source": "validation_f1", "verbose": -1}     1.000000          0.834783    0.000000    F1_Score 0.504490 e296ef8f5d0d4546b7f2612a57a457a6 file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/706136071177237741/e296ef8f5d0d4546b7f2612a57a457a6/artifacts/model Anomaly Detection C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\LightGBM_Anomaly_FD003.joblib
```