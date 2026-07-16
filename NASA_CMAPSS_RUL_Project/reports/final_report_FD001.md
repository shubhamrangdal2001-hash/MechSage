# Final ML Report - FD001

- Dataset version: `4694059ff322`
- Features used: `129`
- Train rows: `1648`
- Validation rows: `488`
- Test rows: `841`

## Best Models
- Best RUL model: `RandomForest` with test RMSE `23.3381`
- Best anomaly model: `LightGBM_Anomaly` with test F1 `0.0000`

## Model Interpretability (SHAP Analysis)

### Remaining Useful Life (RUL) Regression Interpretability

Top features contributing to RUL predictions:

- `sensor_17_roll_mean_20`: Shapley value magnitude `15.3316`
- `sensor_4_roll_mean_20`: Shapley value magnitude `10.6384`
- `sensor_12_roll_mean_10`: Shapley value magnitude `2.9479`
- `sensor_3_expanding_mean`: Shapley value magnitude `2.6466`
- `sensor_4_expanding_mean`: Shapley value magnitude `1.8863`

SHAP explanation plots:
- [Summary Bar Plot](../artifacts/best_rul_shap_summary_bar_FD001.png)
- [Beeswarm Plot](../artifacts/best_rul_shap_summary_beeswarm_FD001.png)
- [Dependence Plot](../artifacts/best_rul_shap_dependence_FD001.png)

### Anomaly & Degradation Detection Interpretability

Top features contributing to anomaly classification:

- `sensor_2_roll_mean_10`: Shapley value magnitude `1.0234`
- `sensor_4_roll_mean_5`: Shapley value magnitude `0.3865`
- `sensor_2_roll_mean_5`: Shapley value magnitude `0.1846`
- `sensor_17_roll_mean_20`: Shapley value magnitude `0.1307`
- `sensor_17_roll_mean_10`: Shapley value magnitude `0.0963`

SHAP explanation plots:
- [Summary Bar Plot](../artifacts/best_anomaly_shap_summary_bar_FD001.png)
- [Beeswarm Plot](../artifacts/best_anomaly_shap_summary_beeswarm_FD001.png)
- [Dependence Plot](../artifacts/best_anomaly_shap_dependence_FD001.png)


## MLflow

Run `mlflow ui --backend-store-uri ./mlruns` from this project folder, then open http://127.0.0.1:5000.

## Comparison Table

```
      Model name                                                                                                                                                                                                                                                                                                                                                                                   Best hyperparameters  Train score  Validation score  Test score Main metric  Runtime                    MLflow run ID                                                                                                                                        Model artifact path              Task                                                                                       Local model path
LinearRegression                                                                                                                                                                                                                                                                                                               {"copy_X": true, "fit_intercept": true, "n_jobs": null, "positive": false, "tol": 1e-06}    10.395136         22.450612   25.547416        RMSE 0.033869 a51710b2ed64448db32ed1fc45413130 file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/NASA_CMAPSS_RUL_Project/mlruns/276288110817582266/a51710b2ed64448db32ed1fc45413130/artifacts/model    RUL Regression C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\NASA_CMAPSS_RUL_Project\models\LinearRegression_FD001.joblib
    RandomForest {"bootstrap": true, "ccp_alpha": 0.0, "criterion": "squared_error", "max_depth": 5, "max_features": 1.0, "max_leaf_nodes": null, "max_samples": null, "min_impurity_decrease": 0.0, "min_samples_leaf": 1, "min_samples_split": 2, "min_weight_fraction_leaf": 0.0, "monotonic_cst": null, "n_estimators": 25, "n_jobs": 1, "oob_score": false, "random_state": 42, "verbose": 0, "warm_start": false}     5.271843         17.293261   23.338122        RMSE 1.384677 1d02d08046ee4756955887b64d04f213 file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/NASA_CMAPSS_RUL_Project/mlruns/276288110817582266/1d02d08046ee4756955887b64d04f213/artifacts/model    RUL Regression     C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\NASA_CMAPSS_RUL_Project\models\RandomForest_FD001.joblib
 IsolationForest                                                                                                                                                    {"bootstrap": false, "contamination": 0.05, "fit_data": "nominal_train_rows", "max_features": 1.0, "max_samples": "auto", "n_estimators": 100, "n_jobs": 1, "random_state": 42, "threshold": 0.5303415697072599, "verbose": 0, "warm_start": false}     0.873606          0.909091    0.000000    F1_Score 0.140674 d72c22d0705e4da382b8f663051aee9c file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/NASA_CMAPSS_RUL_Project/mlruns/276288110817582266/d72c22d0705e4da382b8f663051aee9c/artifacts/model Anomaly Detection  C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\NASA_CMAPSS_RUL_Project\models\IsolationForest_FD001.joblib
LightGBM_Anomaly                                                                                                                                                                       {"class_weight": "balanced", "learning_rate": 0.05, "max_depth": 6, "n_estimators": 120, "n_jobs": 1, "num_leaves": 31, "random_state": 42, "threshold": 0.9198779254958696, "threshold_source": "validation_f1", "verbose": -1}     1.000000          0.958678    0.000000    F1_Score 0.502549 e47153a8be01429f83c78c150469ecab file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/NASA_CMAPSS_RUL_Project/mlruns/276288110817582266/e47153a8be01429f83c78c150469ecab/artifacts/model Anomaly Detection C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\NASA_CMAPSS_RUL_Project\models\LightGBM_Anomaly_FD001.joblib
```