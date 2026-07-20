# Final ML Report - FD004

- Dataset version: `071b815ff8fc`
- Features used: `129`
- Train rows: `2231`
- Validation rows: `633`
- Test rows: `1231`

## Best Models
- Best RUL model: `LinearRegression` with test RMSE `18.3613`
- Best anomaly model: `LightGBM_Anomaly` with test F1 `0.5862`

## Model Interpretability (SHAP Analysis)

### Remaining Useful Life (RUL) Regression Interpretability

Top features contributing to RUL predictions:

- `sensor_8_roll_mean_20`: Shapley value magnitude `813.2594`
- `sensor_8_expanding_mean`: Shapley value magnitude `627.1709`
- `sensor_13_roll_mean_20`: Shapley value magnitude `574.3611`
- `sensor_13_expanding_mean`: Shapley value magnitude `551.7647`
- `op_setting_3`: Shapley value magnitude `439.1605`

SHAP explanation plots:
- [Summary Bar Plot](../artifacts/best_rul_shap_summary_bar_FD004.png)
- [Beeswarm Plot](../artifacts/best_rul_shap_summary_beeswarm_FD004.png)
- [Dependence Plot](../artifacts/best_rul_shap_dependence_FD004.png)

### Anomaly & Degradation Detection Interpretability

Top features contributing to anomaly classification:

- `sensor_14_roll_mean_20`: Shapley value magnitude `0.5225`
- `sensor_13_expanding_mean`: Shapley value magnitude `0.4993`
- `sensor_13`: Shapley value magnitude `0.3737`
- `sensor_11_roll_mean_20`: Shapley value magnitude `0.3382`
- `sensor_11_expanding_mean`: Shapley value magnitude `0.1857`

SHAP explanation plots:
- [Summary Bar Plot](../artifacts/best_anomaly_shap_summary_bar_FD004.png)
- [Beeswarm Plot](../artifacts/best_anomaly_shap_summary_beeswarm_FD004.png)
- [Dependence Plot](../artifacts/best_anomaly_shap_dependence_FD004.png)


## MLflow

Run `mlflow ui --backend-store-uri ./mlruns` from this project folder, then open http://127.0.0.1:5000.

## Comparison Table

```
      Model name                                                                                                                                                                                                                                                                                                                                                                                   Best hyperparameters  Train score  Validation score  Test score Main metric  Runtime                    MLflow run ID                                                                                                                                        Model artifact path              Task                                                                                       Local model path
LinearRegression                                                                                                                                                                                                                                                                                                               {"copy_X": true, "fit_intercept": true, "n_jobs": null, "positive": false, "tol": 1e-06}    11.263602         16.599996   18.361334        RMSE 0.017441 f17517c6582f4f36a59c45dc213a8027 file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/411289203571855365/f17517c6582f4f36a59c45dc213a8027/artifacts/model    RUL Regression C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\LinearRegression_FD004.joblib
    RandomForest {"bootstrap": true, "ccp_alpha": 0.0, "criterion": "squared_error", "max_depth": 5, "max_features": 1.0, "max_leaf_nodes": null, "max_samples": null, "min_impurity_decrease": 0.0, "min_samples_leaf": 1, "min_samples_split": 2, "min_weight_fraction_leaf": 0.0, "monotonic_cst": null, "n_estimators": 25, "n_jobs": 1, "oob_score": false, "random_state": 42, "verbose": 0, "warm_start": false}    17.479407         28.157217   22.387890        RMSE 3.441699 1cf9a5ee5107451b9b96f9d89dd8df91 file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/411289203571855365/1cf9a5ee5107451b9b96f9d89dd8df91/artifacts/model    RUL Regression     C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\RandomForest_FD004.joblib
 IsolationForest                                                                                                                                                    {"bootstrap": false, "contamination": 0.05, "fit_data": "nominal_train_rows", "max_features": 1.0, "max_samples": "auto", "n_estimators": 100, "n_jobs": 1, "random_state": 42, "threshold": 0.4323419939672807, "verbose": 0, "warm_start": false}     0.192308          0.179420    0.032070    F1_Score 0.175847 4ccf526203c9491da2a8a1890d9edb41 file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/411289203571855365/4ccf526203c9491da2a8a1890d9edb41/artifacts/model Anomaly Detection  C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\IsolationForest_FD004.joblib
LightGBM_Anomaly                                                                                                                                                                       {"class_weight": "balanced", "learning_rate": 0.05, "max_depth": 6, "n_estimators": 120, "n_jobs": 1, "num_leaves": 31, "random_state": 42, "threshold": 0.5151814730674342, "threshold_source": "validation_f1", "verbose": -1}     1.000000          0.600000    0.586207    F1_Score 0.668571 d32f132bfc224c0f90fd7cf06bedb917 file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/411289203571855365/d32f132bfc224c0f90fd7cf06bedb917/artifacts/model Anomaly Detection C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\LightGBM_Anomaly_FD004.joblib
```