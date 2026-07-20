# Final ML Report - FD002

- Dataset version: `26efe536f436`
- Features used: `129`
- Train rows: `1428`
- Validation rows: `468`
- Test rows: `1132`

## Best Models
- Best RUL model: `LinearRegression` with test RMSE `27.1321`
- Best anomaly model: `LightGBM_Anomaly` with test F1 `0.5169`

## Model Interpretability (SHAP Analysis)

### Remaining Useful Life (RUL) Regression Interpretability

Top features contributing to RUL predictions:

- `sensor_12_expanding_mean`: Shapley value magnitude `1388.7601`
- `sensor_7_expanding_mean`: Shapley value magnitude `1142.5703`
- `sensor_8_expanding_mean`: Shapley value magnitude `657.7439`
- `sensor_13`: Shapley value magnitude `509.0126`
- `sensor_8`: Shapley value magnitude `423.2586`

SHAP explanation plots:
- [Summary Bar Plot](../artifacts/best_rul_shap_summary_bar_FD002.png)
- [Beeswarm Plot](../artifacts/best_rul_shap_summary_beeswarm_FD002.png)
- [Dependence Plot](../artifacts/best_rul_shap_dependence_FD002.png)

### Anomaly & Degradation Detection Interpretability

Top features contributing to anomaly classification:

- `sensor_15_expanding_mean`: Shapley value magnitude `1.2489`
- `sensor_11_roll_mean_20`: Shapley value magnitude `0.7585`
- `sensor_15_roll_mean_20`: Shapley value magnitude `0.6829`
- `sensor_14_expanding_mean`: Shapley value magnitude `0.6667`
- `sensor_4_roll_mean_20`: Shapley value magnitude `0.3944`

SHAP explanation plots:
- [Summary Bar Plot](../artifacts/best_anomaly_shap_summary_bar_FD002.png)
- [Beeswarm Plot](../artifacts/best_anomaly_shap_summary_beeswarm_FD002.png)
- [Dependence Plot](../artifacts/best_anomaly_shap_dependence_FD002.png)


## MLflow

Run `mlflow ui --backend-store-uri ./mlruns` from this project folder, then open http://127.0.0.1:5000.

## Comparison Table

```
      Model name                                                                                                                                                                                                                                                                                                                                                                                   Best hyperparameters  Train score  Validation score  Test score Main metric  Runtime                    MLflow run ID                                                                                                                                        Model artifact path              Task                                                                                       Local model path
LinearRegression                                                                                                                                                                                                                                                                                                               {"copy_X": true, "fit_intercept": true, "n_jobs": null, "positive": false, "tol": 1e-06}    12.939377         22.396447   27.132072        RMSE 0.030695 17b3da3b51d44d2f89fc83f085aa8f4f file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/474501012323104506/17b3da3b51d44d2f89fc83f085aa8f4f/artifacts/model    RUL Regression C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\LinearRegression_FD002.joblib
    RandomForest {"bootstrap": true, "ccp_alpha": 0.0, "criterion": "squared_error", "max_depth": 5, "max_features": 1.0, "max_leaf_nodes": null, "max_samples": null, "min_impurity_decrease": 0.0, "min_samples_leaf": 1, "min_samples_split": 2, "min_weight_fraction_leaf": 0.0, "monotonic_cst": null, "n_estimators": 25, "n_jobs": 1, "oob_score": false, "random_state": 42, "verbose": 0, "warm_start": false}    16.966293         32.749469   35.812024        RMSE 1.465034 a84b1a42517f4150a96fb1479ea35ff2 file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/474501012323104506/a84b1a42517f4150a96fb1479ea35ff2/artifacts/model    RUL Regression     C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\RandomForest_FD002.joblib
 IsolationForest                                                                                                                                                    {"bootstrap": false, "contamination": 0.05, "fit_data": "nominal_train_rows", "max_features": 1.0, "max_samples": "auto", "n_estimators": 100, "n_jobs": 1, "random_state": 42, "threshold": 0.4499495446959515, "verbose": 0, "warm_start": false}     0.245262          0.209459    0.082192    F1_Score 0.150271 0dc1b10635574a229418c5201513c4f7 file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/474501012323104506/0dc1b10635574a229418c5201513c4f7/artifacts/model Anomaly Detection  C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\IsolationForest_FD002.joblib
LightGBM_Anomaly                                                                                                                                                                       {"class_weight": "balanced", "learning_rate": 0.05, "max_depth": 6, "n_estimators": 120, "n_jobs": 1, "num_leaves": 31, "random_state": 42, "threshold": 0.9209352615971793, "threshold_source": "validation_f1", "verbose": -1}     1.000000          0.540146    0.516854    F1_Score 0.638489 301c4bef82664d02ab529759a1817fea file:///C:/Sudhanshu%20OG/IIT%20GN/Mech%20Sage/MechSage/ML/mlruns/474501012323104506/301c4bef82664d02ab529759a1817fea/artifacts/model Anomaly Detection C:\Sudhanshu OG\IIT GN\Mech Sage\MechSage\ML\models\LightGBM_Anomaly_FD002.joblib
```