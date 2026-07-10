# Final ML Report - FD001

- Dataset version: `4694059ff322`
- Features used: `129`
- Train rows: `1112`
- Validation rows: `192`
- Test rows: `312`

## Best Models
- Best RUL model: `LinearRegression` with test RMSE `34.5906`
- Best anomaly model: `IsolationForest` with test F1 `0.0000`

## Model Interpretability (SHAP Analysis)

### Remaining Useful Life (RUL) Regression Interpretability

Top features contributing to RUL predictions:

- `sensor_15_expanding_mean`: Shapley value magnitude `62.5704`
- `sensor_7_expanding_mean`: Shapley value magnitude `53.6777`
- `sensor_13_expanding_mean`: Shapley value magnitude `52.8146`
- `sensor_14_expanding_mean`: Shapley value magnitude `52.6766`
- `sensor_14_roll_mean_20`: Shapley value magnitude `52.6006`

SHAP explanation plots:
- [Summary Bar Plot](../artifacts/best_rul_shap_summary_bar_FD001.png)
- [Beeswarm Plot](../artifacts/best_rul_shap_summary_beeswarm_FD001.png)
- [Dependence Plot](../artifacts/best_rul_shap_dependence_FD001.png)

### Anomaly & Degradation Detection Interpretability

Top features contributing to anomaly classification:

- `sensor_3_expanding_mean`: Shapley value magnitude `0.0554`
- `sensor_4_roll_std_20`: Shapley value magnitude `0.0512`
- `sensor_13_roll_mean_20`: Shapley value magnitude `0.0503`
- `sensor_11`: Shapley value magnitude `0.0478`
- `sensor_15_expanding_mean`: Shapley value magnitude `0.0478`

SHAP explanation plots:
- [Summary Bar Plot](../artifacts/best_anomaly_shap_summary_bar_FD001.png)
- [Beeswarm Plot](../artifacts/best_anomaly_shap_summary_beeswarm_FD001.png)
- [Dependence Plot](../artifacts/best_anomaly_shap_dependence_FD001.png)


## MLflow

Run `mlflow ui --backend-store-uri ./mlruns` from this project folder, then open http://127.0.0.1:5000.

## Comparison Table

```
         Model name                                                                                                                                                                                                                                Best hyperparameters  Train score  Validation score  Test score Main metric  Runtime                    MLflow run ID                                                                                                                                                          Model artifact path              Task                                                                  Local model path                                                                                                                                                                                           Val metrics dict
   LinearRegression                                                                                                                                                            {"copy_X": true, "fit_intercept": true, "n_jobs": null, "positive": false, "tol": 1e-06}     8.288206         28.239515   34.590611        RMSE 0.193520 84c71a15e2ca47f5af1bd285c9384931 file:///D:/Capstone/MechSage/NASA_CMAPSS_RUL_Project/.pytest_tmp/0363b063e4b246e28cb86d713f720efa/mlruns/807943816054506708/84c71a15e2ca47f5af1bd285c9384931/artifacts/model    RUL Regression D:\Capstone\MechSage\NASA_CMAPSS_RUL_Project\models\LinearRegression_FD001.joblib                                                                                                                                                                                                        NaN
RandomForest_optuna                                                                                                                                                                 {"max_depth": 8, "max_features": "sqrt", "min_samples_leaf": 3, "n_estimators": 39}     1.069883         29.528365         NaN        RMSE 5.971283 7fa39352d01545b095ea74165802e6db file:///D:/Capstone/MechSage/NASA_CMAPSS_RUL_Project/.pytest_tmp/0363b063e4b246e28cb86d713f720efa/mlruns/807943816054506708/7fa39352d01545b095ea74165802e6db/artifacts/model    RUL Regression                                                                               NaN {'MAE': 22.14253151723743, 'MSE': 871.924340724886, 'RMSE': 29.528365019500928, 'R2': 0.501574990895922, 'Adjusted_R2': -0.5354705925625629, 'MAPE': 252707292.37861228, 'NASA_Score': 11815.684934039426}
    IsolationForest {"bootstrap": false, "contamination": 0.05, "fit_data": "nominal_train_rows", "max_features": 1.0, "max_samples": "auto", "n_estimators": 100, "n_jobs": 1, "random_state": 42, "threshold": 0.5449128243760192, "verbose": 0, "warm_start": false}     0.890244          0.967742    0.000000    F1_Score 0.286986 cd0c471c90db4ef2b7c8057e19642373 file:///D:/Capstone/MechSage/NASA_CMAPSS_RUL_Project/.pytest_tmp/0363b063e4b246e28cb86d713f720efa/mlruns/807943816054506708/cd0c471c90db4ef2b7c8057e19642373/artifacts/model Anomaly Detection  D:\Capstone\MechSage\NASA_CMAPSS_RUL_Project\models\IsolationForest_FD001.joblib                                                                                                                                                                                                        NaN
```