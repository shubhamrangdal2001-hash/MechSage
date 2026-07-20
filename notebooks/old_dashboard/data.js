window.MECHSAGE_DATA = {
  "ml": {
    "FD001": {
      "dataset": "FD001",
      "available_datasets": [
        "FD001",
        "FD002",
        "FD003",
        "FD004"
      ],
      "generated_at": "2026-07-20T13:50:36Z",
      "rul_regression": {
        "dataset_id": "FD001",
        "RMSE": 23.338121962118205,
        "MAE": 19.26556334325289,
        "R2": -3.108730427412917,
        "lead_time_cycles": 45
      },
      "anomaly_classification": {
        "model_name": "LightGBM_Anomaly",
        "threshold": 0.9198,
        "F1_Score": 0.0,
        "Accuracy": 1.0
      },
      "feature_importance": {
        "features": [
          [
            "sensor_17_roll_mean_20",
            15.331616232736769
          ],
          [
            "sensor_4_roll_mean_20",
            10.638396233601888
          ],
          [
            "sensor_12_roll_mean_10",
            2.947906955923204
          ],
          [
            "sensor_3_expanding_mean",
            2.646591524963427
          ],
          [
            "sensor_4_expanding_mean",
            1.8862799895756899
          ]
        ]
      },
      "data_drift": {
        "threshold": 0.2,
        "timestamp": "2026-07-16T10:50:56Z",
        "is_sample": true,
        "features": {
          "sensor_11": {
            "psi": 0.01,
            "status": "stable"
          }
        }
      },
      "rul_trajectories": {
        "is_sample": false,
        "units": [
          {
            "unit_number": "LIVE",
            "life": 81,
            "trajectory": [
              {
                "cycle": 20,
                "predicted_rul": 1780250.32
              },
              {
                "cycle": 21,
                "predicted_rul": 1780140.03
              },
              {
                "cycle": 22,
                "predicted_rul": 1780290.84
              },
              {
                "cycle": 23,
                "predicted_rul": 1780108.05
              },
              {
                "cycle": 24,
                "predicted_rul": 1779991.33
              },
              {
                "cycle": 25,
                "predicted_rul": 1779904.97
              },
              {
                "cycle": 26,
                "predicted_rul": 1780112.23
              },
              {
                "cycle": 27,
                "predicted_rul": 1779975.71
              },
              {
                "cycle": 28,
                "predicted_rul": 1780164.46
              },
              {
                "cycle": 29,
                "predicted_rul": 1780154.48
              },
              {
                "cycle": 30,
                "predicted_rul": 1780219.75
              },
              {
                "cycle": 31,
                "predicted_rul": 1780157.37
              },
              {
                "cycle": 32,
                "predicted_rul": 1780333.37
              },
              {
                "cycle": 33,
                "predicted_rul": 1780107.64
              },
              {
                "cycle": 34,
                "predicted_rul": 1780137.11
              },
              {
                "cycle": 35,
                "predicted_rul": 1780015.29
              },
              {
                "cycle": 36,
                "predicted_rul": 1780074.01
              },
              {
                "cycle": 37,
                "predicted_rul": 1779929.83
              },
              {
                "cycle": 38,
                "predicted_rul": 1780154.97
              },
              {
                "cycle": 39,
                "predicted_rul": 1780034.52
              },
              {
                "cycle": 40,
                "predicted_rul": 1779998.53
              },
              {
                "cycle": 41,
                "predicted_rul": 1779932.44
              },
              {
                "cycle": 42,
                "predicted_rul": 1780063.76
              },
              {
                "cycle": 43,
                "predicted_rul": 1779895.42
              },
              {
                "cycle": 44,
                "predicted_rul": 1780180.09
              },
              {
                "cycle": 45,
                "predicted_rul": 1779879.43
              },
              {
                "cycle": 46,
                "predicted_rul": 1780019.6
              },
              {
                "cycle": 47,
                "predicted_rul": 1779953.09
              },
              {
                "cycle": 48,
                "predicted_rul": 1780059.13
              },
              {
                "cycle": 49,
                "predicted_rul": 1780045.34
              },
              {
                "cycle": 50,
                "predicted_rul": 1779882.41
              },
              {
                "cycle": 51,
                "predicted_rul": 1780068.58
              },
              {
                "cycle": 52,
                "predicted_rul": 1780323.49
              },
              {
                "cycle": 53,
                "predicted_rul": 1780095.76
              },
              {
                "cycle": 54,
                "predicted_rul": 1780009.87
              },
              {
                "cycle": 55,
                "predicted_rul": 1779924.0
              },
              {
                "cycle": 56,
                "predicted_rul": 1779940.39
              },
              {
                "cycle": 57,
                "predicted_rul": 1779823.83
              },
              {
                "cycle": 58,
                "predicted_rul": 1779763.92
              },
              {
                "cycle": 59,
                "predicted_rul": 1779756.35
              },
              {
                "cycle": 60,
                "predicted_rul": 1779976.78
              },
              {
                "cycle": 61,
                "predicted_rul": 1779876.25
              },
              {
                "cycle": 62,
                "predicted_rul": 1779873.42
              },
              {
                "cycle": 63,
                "predicted_rul": 1779616.45
              },
              {
                "cycle": 64,
                "predicted_rul": 1779880.02
              },
              {
                "cycle": 65,
                "predicted_rul": 1779474.77
              },
              {
                "cycle": 66,
                "predicted_rul": 1779686.18
              },
              {
                "cycle": 67,
                "predicted_rul": 1779694.51
              },
              {
                "cycle": 68,
                "predicted_rul": 1779637.28
              },
              {
                "cycle": 69,
                "predicted_rul": 1779714.6
              },
              {
                "cycle": 70,
                "predicted_rul": 1779855.93
              },
              {
                "cycle": 71,
                "predicted_rul": 1779950.89
              },
              {
                "cycle": 72,
                "predicted_rul": 1780180.4
              },
              {
                "cycle": 73,
                "predicted_rul": 1779879.65
              },
              {
                "cycle": 74,
                "predicted_rul": 1779754.0
              },
              {
                "cycle": 75,
                "predicted_rul": 1779764.56
              },
              {
                "cycle": 76,
                "predicted_rul": 1779951.15
              },
              {
                "cycle": 77,
                "predicted_rul": 1779723.66
              },
              {
                "cycle": 78,
                "predicted_rul": 1779784.44
              },
              {
                "cycle": 79,
                "predicted_rul": 1779744.02
              },
              {
                "cycle": 80,
                "predicted_rul": 1779651.03
              },
              {
                "cycle": 81,
                "predicted_rul": 1779468.57
              },
              {
                "cycle": 82,
                "predicted_rul": 1779718.29
              },
              {
                "cycle": 83,
                "predicted_rul": 1779667.26
              },
              {
                "cycle": 84,
                "predicted_rul": 1779662.1
              },
              {
                "cycle": 85,
                "predicted_rul": 1779813.93
              },
              {
                "cycle": 86,
                "predicted_rul": 1779853.97
              },
              {
                "cycle": 87,
                "predicted_rul": 1780217.55
              },
              {
                "cycle": 88,
                "predicted_rul": 1779805.66
              },
              {
                "cycle": 89,
                "predicted_rul": 1779771.97
              },
              {
                "cycle": 90,
                "predicted_rul": 1779970.65
              },
              {
                "cycle": 91,
                "predicted_rul": 1779891.51
              },
              {
                "cycle": 92,
                "predicted_rul": 1780110.96
              },
              {
                "cycle": 93,
                "predicted_rul": 1780206.59
              },
              {
                "cycle": 94,
                "predicted_rul": 1780092.59
              },
              {
                "cycle": 95,
                "predicted_rul": 1779954.03
              },
              {
                "cycle": 96,
                "predicted_rul": 1780228.64
              },
              {
                "cycle": 97,
                "predicted_rul": 1780115.3
              },
              {
                "cycle": 98,
                "predicted_rul": 1779881.25
              },
              {
                "cycle": 99,
                "predicted_rul": 1779927.03
              },
              {
                "cycle": 100,
                "predicted_rul": 1780131.49
              }
            ]
          },
          {
            "unit_number": 1,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 113.46274247276317
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 118.76341792288044
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 121.53136616202329
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 120.40254911941678
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 122.29276784058631
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 110.07888710451199
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 104.8393616732012
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 102.1812306644124
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 111.77623344420334
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 113.4189260830156
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 111.92569308273701
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 118.41555835533305
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 119.00179942882389
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 120.45065649755132
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 117.67278579398355
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 116.07233846353621
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 115.23678290798067
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 111.27956524579733
              },
              {
                "cycle": 19,
                "true_rul": 124.0,
                "predicted_rul": 116.6159769608702
              },
              {
                "cycle": 20,
                "true_rul": 123.0,
                "predicted_rul": 110.78415750760996
              },
              {
                "cycle": 21,
                "true_rul": 122.0,
                "predicted_rul": 111.9027145257435
              },
              {
                "cycle": 22,
                "true_rul": 121.0,
                "predicted_rul": 111.31350969309011
              },
              {
                "cycle": 23,
                "true_rul": 120.0,
                "predicted_rul": 112.46842577458312
              },
              {
                "cycle": 24,
                "true_rul": 119.0,
                "predicted_rul": 121.67043523260631
              },
              {
                "cycle": 25,
                "true_rul": 118.0,
                "predicted_rul": 113.68917824267243
              },
              {
                "cycle": 26,
                "true_rul": 117.0,
                "predicted_rul": 111.81942732634458
              },
              {
                "cycle": 27,
                "true_rul": 116.0,
                "predicted_rul": 111.81942732634458
              },
              {
                "cycle": 28,
                "true_rul": 115.0,
                "predicted_rul": 122.78754775259424
              },
              {
                "cycle": 29,
                "true_rul": 114.0,
                "predicted_rul": 124.2110490673642
              },
              {
                "cycle": 30,
                "true_rul": 113.0,
                "predicted_rul": 123.96142030114775
              },
              {
                "cycle": 31,
                "true_rul": 112.0,
                "predicted_rul": 120.98133080071119
              }
            ]
          },
          {
            "unit_number": 2,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 101.14631438401179
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 106.6369526445073
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 107.12733541851789
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 100.23310694339729
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 102.62817019126057
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 108.22328242403732
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 100.23310694339729
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 94.30449732371368
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 91.3321549988293
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 93.50912230976151
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 100.23310694339729
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 100.23310694339729
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 99.28810826341869
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 99.28810826341869
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 99.28810826341869
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 95.59524537632713
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 96.48348422742312
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 94.07799285107461
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 94.07799285107461
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 94.07799285107461
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 95.23689523524015
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 101.18228253282307
              },
              {
                "cycle": 23,
                "true_rul": 124.0,
                "predicted_rul": 108.95859550165014
              },
              {
                "cycle": 24,
                "true_rul": 123.0,
                "predicted_rul": 106.28842883498349
              },
              {
                "cycle": 25,
                "true_rul": 122.0,
                "predicted_rul": 106.28842883498349
              },
              {
                "cycle": 26,
                "true_rul": 121.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 27,
                "true_rul": 120.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 28,
                "true_rul": 119.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 29,
                "true_rul": 118.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 30,
                "true_rul": 117.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 31,
                "true_rul": 116.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 32,
                "true_rul": 115.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 33,
                "true_rul": 114.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 34,
                "true_rul": 113.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 35,
                "true_rul": 112.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 36,
                "true_rul": 111.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 37,
                "true_rul": 110.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 38,
                "true_rul": 109.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 39,
                "true_rul": 108.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 40,
                "true_rul": 107.0,
                "predicted_rul": 100.29914790875301
              },
              {
                "cycle": 41,
                "true_rul": 106.0,
                "predicted_rul": 100.29914790875301
              },
              {
                "cycle": 42,
                "true_rul": 105.0,
                "predicted_rul": 100.29914790875301
              },
              {
                "cycle": 43,
                "true_rul": 104.0,
                "predicted_rul": 100.29914790875301
              },
              {
                "cycle": 44,
                "true_rul": 103.0,
                "predicted_rul": 98.41969500126379
              },
              {
                "cycle": 45,
                "true_rul": 102.0,
                "predicted_rul": 97.15504266245216
              },
              {
                "cycle": 46,
                "true_rul": 101.0,
                "predicted_rul": 97.99488899814956
              },
              {
                "cycle": 47,
                "true_rul": 100.0,
                "predicted_rul": 97.99488899814956
              },
              {
                "cycle": 48,
                "true_rul": 99.0,
                "predicted_rul": 97.99488899814956
              },
              {
                "cycle": 49,
                "true_rul": 98.0,
                "predicted_rul": 97.99488899814956
              }
            ]
          },
          {
            "unit_number": 3,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 103.99393811991415
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 105.06928414633882
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 114.18574856169309
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 109.89201275157959
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 102.64607657240015
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 111.21340623680871
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 107.09761747967214
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 107.09761747967214
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 107.09761747967214
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 107.09761747967214
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 93.0398698264667
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 107.09761747967214
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 93.87971616216412
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 93.0398698264667
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 93.87971616216412
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 93.87971616216412
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 94.99071616216412
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 95.72212626792205
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 91.80523012084709
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 92.96413250501263
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 95.07659171247184
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 92.28011201845692
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 95.03810578136634
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 95.72212626792205
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 95.72212626792205
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 64.34061152835542
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 62.48543906775272
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 65.39824161885315
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 66.64073208021085
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 60.579900375104444
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 92.35673499578013
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 92.35673499578013
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 92.75022880082567
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 88.33255976245157
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 90.41722127464828
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 90.46461089385053
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 89.4152847297841
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 87.22724777558786
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 90.04331939354252
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 93.3366683346025
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 88.66520277357266
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 89.66611621188629
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 89.73496696093997
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 79.37032875990911
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 84.55963083522266
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 87.78629413557265
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 81.68173677477824
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 80.5228343906127
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 81.23465257243089
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 83.77428191472686
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 92.05434317944099
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 95.45810942721342
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 94.21598149407296
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 95.45810942721342
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 95.45810942721342
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 94.77408894065773
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 95.45810942721342
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 95.45810942721342
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 94.77408894065773
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 94.77408894065773
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 87.98553381692616
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 95.52179456836336
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 90.13388047027281
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 97.76228192970179
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 97.76228192970179
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 97.76228192970179
              },
              {
                "cycle": 71,
                "true_rul": 124.0,
                "predicted_rul": 97.76228192970179
              },
              {
                "cycle": 72,
                "true_rul": 123.0,
                "predicted_rul": 97.76228192970179
              },
              {
                "cycle": 73,
                "true_rul": 122.0,
                "predicted_rul": 96.30275812017797
              },
              {
                "cycle": 74,
                "true_rul": 121.0,
                "predicted_rul": 94.24551835409609
              },
              {
                "cycle": 75,
                "true_rul": 120.0,
                "predicted_rul": 91.8570682886898
              },
              {
                "cycle": 76,
                "true_rul": 119.0,
                "predicted_rul": 63.224610291073496
              },
              {
                "cycle": 77,
                "true_rul": 118.0,
                "predicted_rul": 63.224610291073496
              },
              {
                "cycle": 78,
                "true_rul": 117.0,
                "predicted_rul": 56.94594029737056
              },
              {
                "cycle": 79,
                "true_rul": 116.0,
                "predicted_rul": 97.76228192970179
              },
              {
                "cycle": 80,
                "true_rul": 115.0,
                "predicted_rul": 94.99300088395016
              },
              {
                "cycle": 81,
                "true_rul": 114.0,
                "predicted_rul": 94.89410226067106
              },
              {
                "cycle": 82,
                "true_rul": 113.0,
                "predicted_rul": 97.76228192970179
              },
              {
                "cycle": 83,
                "true_rul": 112.0,
                "predicted_rul": 94.89410226067106
              },
              {
                "cycle": 84,
                "true_rul": 111.0,
                "predicted_rul": 93.37583339839601
              },
              {
                "cycle": 85,
                "true_rul": 110.0,
                "predicted_rul": 63.34601011593919
              },
              {
                "cycle": 86,
                "true_rul": 109.0,
                "predicted_rul": 63.85874429315438
              },
              {
                "cycle": 87,
                "true_rul": 108.0,
                "predicted_rul": 63.16831256272264
              },
              {
                "cycle": 88,
                "true_rul": 107.0,
                "predicted_rul": 93.37583339839601
              },
              {
                "cycle": 89,
                "true_rul": 106.0,
                "predicted_rul": 93.37583339839601
              },
              {
                "cycle": 90,
                "true_rul": 105.0,
                "predicted_rul": 89.64218484657762
              },
              {
                "cycle": 91,
                "true_rul": 104.0,
                "predicted_rul": 60.72497848400366
              },
              {
                "cycle": 92,
                "true_rul": 103.0,
                "predicted_rul": 49.76413077511604
              },
              {
                "cycle": 93,
                "true_rul": 102.0,
                "predicted_rul": 48.00129502263322
              },
              {
                "cycle": 94,
                "true_rul": 101.0,
                "predicted_rul": 46.42146410844937
              },
              {
                "cycle": 95,
                "true_rul": 100.0,
                "predicted_rul": 52.748818699366886
              },
              {
                "cycle": 96,
                "true_rul": 99.0,
                "predicted_rul": 89.25272959661193
              },
              {
                "cycle": 97,
                "true_rul": 98.0,
                "predicted_rul": 95.52179456836336
              },
              {
                "cycle": 98,
                "true_rul": 97.0,
                "predicted_rul": 92.17912790169669
              },
              {
                "cycle": 99,
                "true_rul": 96.0,
                "predicted_rul": 53.278194813448884
              },
              {
                "cycle": 100,
                "true_rul": 95.0,
                "predicted_rul": 50.74597156804569
              },
              {
                "cycle": 101,
                "true_rul": 94.0,
                "predicted_rul": 48.07704177291897
              },
              {
                "cycle": 102,
                "true_rul": 93.0,
                "predicted_rul": 50.894409294286476
              },
              {
                "cycle": 103,
                "true_rul": 92.0,
                "predicted_rul": 48.997098982796444
              },
              {
                "cycle": 104,
                "true_rul": 91.0,
                "predicted_rul": 48.98831023896564
              },
              {
                "cycle": 105,
                "true_rul": 90.0,
                "predicted_rul": 45.62241558581517
              },
              {
                "cycle": 106,
                "true_rul": 89.0,
                "predicted_rul": 46.096688876576906
              },
              {
                "cycle": 107,
                "true_rul": 88.0,
                "predicted_rul": 48.50443648262239
              },
              {
                "cycle": 108,
                "true_rul": 87.0,
                "predicted_rul": 46.59833742730155
              },
              {
                "cycle": 109,
                "true_rul": 86.0,
                "predicted_rul": 45.17985120821781
              },
              {
                "cycle": 110,
                "true_rul": 85.0,
                "predicted_rul": 48.478469326488636
              },
              {
                "cycle": 111,
                "true_rul": 84.0,
                "predicted_rul": 43.9180954195915
              },
              {
                "cycle": 112,
                "true_rul": 83.0,
                "predicted_rul": 41.876086587299916
              },
              {
                "cycle": 113,
                "true_rul": 82.0,
                "predicted_rul": 47.79174930628128
              },
              {
                "cycle": 114,
                "true_rul": 81.0,
                "predicted_rul": 83.24869675298285
              },
              {
                "cycle": 115,
                "true_rul": 80.0,
                "predicted_rul": 83.24869675298285
              },
              {
                "cycle": 116,
                "true_rul": 79.0,
                "predicted_rul": 82.86910685874078
              },
              {
                "cycle": 117,
                "true_rul": 78.0,
                "predicted_rul": 40.77179011109875
              },
              {
                "cycle": 118,
                "true_rul": 77.0,
                "predicted_rul": 40.01413191823713
              },
              {
                "cycle": 119,
                "true_rul": 76.0,
                "predicted_rul": 42.83149943960465
              },
              {
                "cycle": 120,
                "true_rul": 75.0,
                "predicted_rul": 41.26426260994979
              },
              {
                "cycle": 121,
                "true_rul": 74.0,
                "predicted_rul": 46.35614626871483
              },
              {
                "cycle": 122,
                "true_rul": 73.0,
                "predicted_rul": 48.352780066737544
              },
              {
                "cycle": 123,
                "true_rul": 72.0,
                "predicted_rul": 77.36382360279633
              },
              {
                "cycle": 124,
                "true_rul": 71.0,
                "predicted_rul": 43.36616568494423
              },
              {
                "cycle": 125,
                "true_rul": 70.0,
                "predicted_rul": 47.743514183251136
              },
              {
                "cycle": 126,
                "true_rul": 69.0,
                "predicted_rul": 44.87956601335145
              }
            ]
          },
          {
            "unit_number": 4,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 123.52722477634063
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 110.19623550604715
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 114.33583413184026
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 101.76974867487688
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 98.00199355337745
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 96.43123017586149
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 98.00199355337745
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 98.00199355337745
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 96.43123017586149
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 106.74910587689581
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 99.35020414422377
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 104.70480353171533
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 97.12032292556107
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 107.23895289771578
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 109.7602819971877
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 107.70304223110584
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 106.46091429796539
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 106.86319589540844
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 109.7602819971877
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 108.20089795266084
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 109.7602819971877
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 105.2883239398786
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 97.96706172630883
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 100.9786907216821
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 103.10474649880116
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 98.50286758269662
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 104.52003516982512
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 107.48907977084265
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 109.7602819971877
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 106.42837434661722
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 107.98775839114411
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 106.64923343514525
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 107.98775839114411
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 99.42702620416652
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 96.09285871744706
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 98.90951980259555
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 94.36477353065365
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 96.04118231639019
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 94.09410999758411
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 95.72212626792205
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 95.72212626792205
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 95.72212626792205
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 95.72212626792205
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 95.72212626792205
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 94.09410999758411
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 94.15086982646672
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 92.47446104073016
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 94.15086982646672
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 92.47446104073016
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 94.15086982646672
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 94.15086982646672
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 95.72212626792205
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 64,
                "true_rul": 124.0,
                "predicted_rul": 95.72212626792205
              },
              {
                "cycle": 65,
                "true_rul": 123.0,
                "predicted_rul": 106.64923343514525
              },
              {
                "cycle": 66,
                "true_rul": 122.0,
                "predicted_rul": 108.20861747967211
              },
              {
                "cycle": 67,
                "true_rul": 121.0,
                "predicted_rul": 108.20861747967211
              },
              {
                "cycle": 68,
                "true_rul": 120.0,
                "predicted_rul": 108.20861747967211
              },
              {
                "cycle": 69,
                "true_rul": 119.0,
                "predicted_rul": 99.42702620416652
              },
              {
                "cycle": 70,
                "true_rul": 118.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 71,
                "true_rul": 117.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 72,
                "true_rul": 116.0,
                "predicted_rul": 94.15086982646672
              },
              {
                "cycle": 73,
                "true_rul": 115.0,
                "predicted_rul": 93.46684933991101
              },
              {
                "cycle": 74,
                "true_rul": 114.0,
                "predicted_rul": 93.46684933991101
              },
              {
                "cycle": 75,
                "true_rul": 113.0,
                "predicted_rul": 93.46684933991101
              },
              {
                "cycle": 76,
                "true_rul": 112.0,
                "predicted_rul": 93.46684933991101
              },
              {
                "cycle": 77,
                "true_rul": 111.0,
                "predicted_rul": 93.46684933991101
              },
              {
                "cycle": 78,
                "true_rul": 110.0,
                "predicted_rul": 93.46684933991101
              },
              {
                "cycle": 79,
                "true_rul": 109.0,
                "predicted_rul": 91.79044055417448
              },
              {
                "cycle": 80,
                "true_rul": 108.0,
                "predicted_rul": 92.47446104073016
              },
              {
                "cycle": 81,
                "true_rul": 107.0,
                "predicted_rul": 93.46684933991101
              },
              {
                "cycle": 82,
                "true_rul": 106.0,
                "predicted_rul": 91.79044055417448
              },
              {
                "cycle": 83,
                "true_rul": 105.0,
                "predicted_rul": 92.67867940527047
              },
              {
                "cycle": 84,
                "true_rul": 104.0,
                "predicted_rul": 92.52185065993241
              },
              {
                "cycle": 85,
                "true_rul": 103.0,
                "predicted_rul": 93.20587114648812
              },
              {
                "cycle": 86,
                "true_rul": 102.0,
                "predicted_rul": 93.20587114648812
              },
              {
                "cycle": 87,
                "true_rul": 101.0,
                "predicted_rul": 94.89982968896946
              },
              {
                "cycle": 88,
                "true_rul": 100.0,
                "predicted_rul": 91.39930593443987
              },
              {
                "cycle": 89,
                "true_rul": 99.0,
                "predicted_rul": 92.1699261123356
              },
              {
                "cycle": 90,
                "true_rul": 98.0,
                "predicted_rul": 95.03810578136634
              },
              {
                "cycle": 91,
                "true_rul": 97.0,
                "predicted_rul": 92.1699261123356
              },
              {
                "cycle": 92,
                "true_rul": 96.0,
                "predicted_rul": 92.1699261123356
              },
              {
                "cycle": 93,
                "true_rul": 95.0,
                "predicted_rul": 92.1699261123356
              },
              {
                "cycle": 94,
                "true_rul": 94.0,
                "predicted_rul": 92.1699261123356
              },
              {
                "cycle": 95,
                "true_rul": 93.0,
                "predicted_rul": 95.03810578136634
              },
              {
                "cycle": 96,
                "true_rul": 92.0,
                "predicted_rul": 95.03810578136634
              },
              {
                "cycle": 97,
                "true_rul": 91.0,
                "predicted_rul": 95.03810578136634
              },
              {
                "cycle": 98,
                "true_rul": 90.0,
                "predicted_rul": 95.74992396318451
              },
              {
                "cycle": 99,
                "true_rul": 89.0,
                "predicted_rul": 92.77802649608815
              },
              {
                "cycle": 100,
                "true_rul": 88.0,
                "predicted_rul": 92.77802649608815
              },
              {
                "cycle": 101,
                "true_rul": 87.0,
                "predicted_rul": 92.25272735078902
              },
              {
                "cycle": 102,
                "true_rul": 86.0,
                "predicted_rul": 92.27027710753381
              },
              {
                "cycle": 103,
                "true_rul": 85.0,
                "predicted_rul": 91.16496512067012
              },
              {
                "cycle": 104,
                "true_rul": 84.0,
                "predicted_rul": 89.48855633493358
              },
              {
                "cycle": 105,
                "true_rul": 83.0,
                "predicted_rul": 90.46826255231883
              },
              {
                "cycle": 106,
                "true_rul": 82.0,
                "predicted_rul": 84.08198976965141
              }
            ]
          },
          {
            "unit_number": 5,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 69.77804636329174
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 68.6510225223202
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 101.86640319355523
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 104.51784735382803
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 104.226677268255
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 105.76565766041188
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 102.71630949321263
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 103.76786933185002
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 91.47025890290726
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 85.24619041190961
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 85.24619041190961
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 85.9302108984653
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 85.9302108984653
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 84.77130851429976
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 88.4684629597349
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 85.9302108984653
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 90.69991813398337
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 91.80523012084709
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 92.67178579103394
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 99.16543578233357
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 99.22190637056887
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 99.22190637056887
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 98.32454604668223
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 95.9465552084756
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 96.65837339029378
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 103.81656468061934
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 105.2883239398786
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 96.65837339029378
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 103.81656468061934
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 95.91643804816924
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 95.91643804816924
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 95.91643804816924
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 92.96413250501263
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 103.04827591056586
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 103.10474649880116
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 104.5765057580604
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 94.36477353065365
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 94.36477353065365
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 95.07659171247184
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 95.07659171247184
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 95.91643804816924
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 97.56409821833185
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 94.74743713318335
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 94.74743713318335
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 93.85919828208735
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 88.80540310471031
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 89.97987885192498
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 93.93650652727685
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 101.55919541861692
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 97.08723736130779
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 93.68440818296662
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 92.06652774818401
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 96.48487283879781
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 106.35651574941532
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 95.19181651659976
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 92.61157449403635
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 98.46243560024818
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 90.5139230805339
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 95.59409811404282
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 65,
                "true_rul": 124.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 66,
                "true_rul": 123.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 67,
                "true_rul": 122.0,
                "predicted_rul": 93.48163890658361
              },
              {
                "cycle": 68,
                "true_rul": 121.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 69,
                "true_rul": 120.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 70,
                "true_rul": 119.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 71,
                "true_rul": 118.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 72,
                "true_rul": 117.0,
                "predicted_rul": 93.20587114648812
              },
              {
                "cycle": 73,
                "true_rul": 116.0,
                "predicted_rul": 94.09410999758411
              },
              {
                "cycle": 74,
                "true_rul": 115.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 75,
                "true_rul": 114.0,
                "predicted_rul": 93.48163890658361
              },
              {
                "cycle": 76,
                "true_rul": 113.0,
                "predicted_rul": 92.34778375588634
              },
              {
                "cycle": 77,
                "true_rul": 112.0,
                "predicted_rul": 92.34778375588634
              },
              {
                "cycle": 78,
                "true_rul": 111.0,
                "predicted_rul": 91.61637365012841
              },
              {
                "cycle": 79,
                "true_rul": 110.0,
                "predicted_rul": 92.75022880082567
              },
              {
                "cycle": 80,
                "true_rul": 109.0,
                "predicted_rul": 94.99071616216412
              },
              {
                "cycle": 81,
                "true_rul": 108.0,
                "predicted_rul": 92.85394659889128
              },
              {
                "cycle": 82,
                "true_rul": 107.0,
                "predicted_rul": 90.88040855999289
              },
              {
                "cycle": 83,
                "true_rul": 106.0,
                "predicted_rul": 89.97657532316603
              },
              {
                "cycle": 84,
                "true_rul": 105.0,
                "predicted_rul": 92.12253649313335
              },
              {
                "cycle": 85,
                "true_rul": 104.0,
                "predicted_rul": 91.43851600657767
              },
              {
                "cycle": 86,
                "true_rul": 103.0,
                "predicted_rul": 92.12253649313335
              },
              {
                "cycle": 87,
                "true_rul": 102.0,
                "predicted_rul": 91.43851600657767
              },
              {
                "cycle": 88,
                "true_rul": 101.0,
                "predicted_rul": 90.02396494236825
              },
              {
                "cycle": 89,
                "true_rul": 100.0,
                "predicted_rul": 90.02396494236825
              },
              {
                "cycle": 90,
                "true_rul": 99.0,
                "predicted_rul": 90.02396494236825
              },
              {
                "cycle": 91,
                "true_rul": 98.0,
                "predicted_rul": 89.3938521722555
              },
              {
                "cycle": 92,
                "true_rul": 97.0,
                "predicted_rul": 88.30380053714362
              },
              {
                "cycle": 93,
                "true_rul": 96.0,
                "predicted_rul": 86.05118550558882
              },
              {
                "cycle": 94,
                "true_rul": 95.0,
                "predicted_rul": 94.19825944566894
              },
              {
                "cycle": 95,
                "true_rul": 94.0,
                "predicted_rul": 85.73329553620086
              },
              {
                "cycle": 96,
                "true_rul": 93.0,
                "predicted_rul": 84.59320105396351
              },
              {
                "cycle": 97,
                "true_rul": 92.0,
                "predicted_rul": 86.11595913873055
              },
              {
                "cycle": 98,
                "true_rul": 91.0,
                "predicted_rul": 81.62214125584626
              }
            ]
          },
          {
            "unit_number": 6,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 101.00890640610241
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 88.4684181220692
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 97.50437599578548
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 96.32914222955172
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 98.82756478515076
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 99.77548693354176
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 95.42978702842538
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 93.6759506868308
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 93.6759506868308
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 93.6759506868308
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 105.2883239398786
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 103.18143449608698
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 98.16422637053739
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 98.16422637053739
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 98.73820336034369
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 98.73820336034369
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 96.43394444974022
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 107.65339255339612
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 107.65339255339612
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 98.8718012778905
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 95.7025343439823
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 95.7025343439823
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 100.9786907216821
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 100.9786907216821
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 95.7025343439823
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 94.86268800828489
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 94.86268800828489
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 93.9176893283063
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 93.9176893283063
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 93.20587114648812
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 93.20587114648812
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 94.09410999758411
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 93.20587114648812
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 93.20587114648812
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 93.20587114648812
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 94.36477353065365
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 95.25301238174966
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 107.48907977084265
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 102.12514122127301
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 97.4691472486776
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 98.39721754423427
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 95.99172616788573
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 96.82828861792487
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 96.82828861792487
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 97.66813495362224
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 96.50923256945671
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 96.50923256945671
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 94.95652336894837
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 94.95652336894837
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 97.6838616154839
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 95.34904595038626
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 94.19014356622073
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 95.76090694373669
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 94.19014356622073
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 92.67289104096821
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 98.75684443182115
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 98.75684443182115
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 95.61482461284986
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 94.1171640115371
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 94.93741842329473
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 94.93741842329473
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 94.93741842329473
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 92.71603600760992
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 92.71603600760992
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 92.71603600760992
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 96.47377589420088
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 94.95652336894837
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 93.45653525248964
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 94.24470518713018
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 96.43394444974022
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 96.43394444974022
              },
              {
                "cycle": 74,
                "true_rul": 124.0,
                "predicted_rul": 96.43394444974022
              },
              {
                "cycle": 75,
                "true_rul": 123.0,
                "predicted_rul": 96.43394444974022
              },
              {
                "cycle": 76,
                "true_rul": 122.0,
                "predicted_rul": 96.43394444974022
              },
              {
                "cycle": 77,
                "true_rul": 121.0,
                "predicted_rul": 94.95652336894837
              },
              {
                "cycle": 78,
                "true_rul": 120.0,
                "predicted_rul": 94.24470518713018
              },
              {
                "cycle": 79,
                "true_rul": 119.0,
                "predicted_rul": 94.95652336894837
              },
              {
                "cycle": 80,
                "true_rul": 118.0,
                "predicted_rul": 94.95652336894837
              },
              {
                "cycle": 81,
                "true_rul": 117.0,
                "predicted_rul": 92.72083836487705
              },
              {
                "cycle": 82,
                "true_rul": 116.0,
                "predicted_rul": 92.72083836487705
              },
              {
                "cycle": 83,
                "true_rul": 115.0,
                "predicted_rul": 92.72083836487705
              },
              {
                "cycle": 84,
                "true_rul": 114.0,
                "predicted_rul": 93.40485885143278
              },
              {
                "cycle": 85,
                "true_rul": 113.0,
                "predicted_rul": 91.72845006569624
              },
              {
                "cycle": 86,
                "true_rul": 112.0,
                "predicted_rul": 92.61668891679223
              },
              {
                "cycle": 87,
                "true_rul": 111.0,
                "predicted_rul": 92.72083836487705
              },
              {
                "cycle": 88,
                "true_rul": 110.0,
                "predicted_rul": 92.72083836487705
              },
              {
                "cycle": 89,
                "true_rul": 109.0,
                "predicted_rul": 91.98942825911912
              },
              {
                "cycle": 90,
                "true_rul": 108.0,
                "predicted_rul": 92.67344874567483
              },
              {
                "cycle": 91,
                "true_rul": 107.0,
                "predicted_rul": 93.51329508137225
              },
              {
                "cycle": 92,
                "true_rul": 106.0,
                "predicted_rul": 93.40485885143278
              },
              {
                "cycle": 93,
                "true_rul": 105.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 94,
                "true_rul": 104.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 95,
                "true_rul": 103.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 96,
                "true_rul": 102.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 97,
                "true_rul": 101.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 98,
                "true_rul": 100.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 99,
                "true_rul": 99.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 100,
                "true_rul": 98.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 101,
                "true_rul": 97.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 102,
                "true_rul": 96.0,
                "predicted_rul": 94.88227993222465
              },
              {
                "cycle": 103,
                "true_rul": 95.0,
                "predicted_rul": 90.85626791878227
              },
              {
                "cycle": 104,
                "true_rul": 94.0,
                "predicted_rul": 92.98086601528445
              },
              {
                "cycle": 105,
                "true_rul": 93.0,
                "predicted_rul": 95.72212626792205
              }
            ]
          },
          {
            "unit_number": 7,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 120.23404627519345
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 123.4736313456922
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 123.83782098002048
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 123.3274235639726
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 121.36564371465191
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 121.4815294115935
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 121.96344471160008
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 121.96344471160008
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 121.96344471160008
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 121.96344471160008
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 124.5920994837823
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 124.48961582365159
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 123.07112934523755
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 123.88756288112064
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 123.88756288112064
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 124.48961582365159
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 124.23482098002049
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 123.96431589514202
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 117.61082854936203
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 122.82301563343428
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 117.33743795045963
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 123.96431589514202
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 124.47259551873276
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 124.47259551873276
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 123.85428383042107
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 123.85428383042107
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 123.85428383042107
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 123.85428383042107
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 124.27529264899088
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 124.74598611763517
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 123.07112934523755
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 123.07112934523755
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 123.0014626785709
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 123.37639774350596
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 123.14395589685414
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 123.12226683657939
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 119.72216656772987
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 115.57079124556249
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 114.94065612146943
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 116.8636266056703
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 117.29160452919515
              },
              {
                "cycle": 123,
                "true_rul": 125.0,
                "predicted_rul": 116.8636266056703
              },
              {
                "cycle": 124,
                "true_rul": 125.0,
                "predicted_rul": 117.48443988930298
              },
              {
                "cycle": 125,
                "true_rul": 125.0,
                "predicted_rul": 117.43367885935997
              },
              {
                "cycle": 126,
                "true_rul": 125.0,
                "predicted_rul": 116.06031204524841
              },
              {
                "cycle": 127,
                "true_rul": 124.0,
                "predicted_rul": 115.52949098385476
              },
              {
                "cycle": 128,
                "true_rul": 123.0,
                "predicted_rul": 116.06031204524841
              },
              {
                "cycle": 129,
                "true_rul": 122.0,
                "predicted_rul": 116.06031204524841
              },
              {
                "cycle": 130,
                "true_rul": 121.0,
                "predicted_rul": 116.06031204524841
              },
              {
                "cycle": 131,
                "true_rul": 120.0,
                "predicted_rul": 116.06031204524841
              },
              {
                "cycle": 132,
                "true_rul": 119.0,
                "predicted_rul": 116.02111291104927
              },
              {
                "cycle": 133,
                "true_rul": 118.0,
                "predicted_rul": 116.06031204524841
              },
              {
                "cycle": 134,
                "true_rul": 117.0,
                "predicted_rul": 116.06031204524841
              },
              {
                "cycle": 135,
                "true_rul": 116.0,
                "predicted_rul": 116.06031204524841
              },
              {
                "cycle": 136,
                "true_rul": 115.0,
                "predicted_rul": 116.06031204524841
              },
              {
                "cycle": 137,
                "true_rul": 114.0,
                "predicted_rul": 114.16731943545366
              },
              {
                "cycle": 138,
                "true_rul": 113.0,
                "predicted_rul": 103.6972162042227
              },
              {
                "cycle": 139,
                "true_rul": 112.0,
                "predicted_rul": 102.26664690602288
              },
              {
                "cycle": 140,
                "true_rul": 111.0,
                "predicted_rul": 104.16395511820832
              },
              {
                "cycle": 141,
                "true_rul": 110.0,
                "predicted_rul": 102.32982425956565
              },
              {
                "cycle": 142,
                "true_rul": 109.0,
                "predicted_rul": 100.47777404694463
              },
              {
                "cycle": 143,
                "true_rul": 108.0,
                "predicted_rul": 100.39561154936692
              },
              {
                "cycle": 144,
                "true_rul": 107.0,
                "predicted_rul": 99.1778293206625
              },
              {
                "cycle": 145,
                "true_rul": 106.0,
                "predicted_rul": 98.0028100456004
              },
              {
                "cycle": 146,
                "true_rul": 105.0,
                "predicted_rul": 98.00447671226706
              },
              {
                "cycle": 147,
                "true_rul": 104.0,
                "predicted_rul": 97.4591671480339
              },
              {
                "cycle": 148,
                "true_rul": 103.0,
                "predicted_rul": 97.95793907785847
              },
              {
                "cycle": 149,
                "true_rul": 102.0,
                "predicted_rul": 97.05513977755493
              },
              {
                "cycle": 150,
                "true_rul": 101.0,
                "predicted_rul": 97.10167741196352
              },
              {
                "cycle": 151,
                "true_rul": 100.0,
                "predicted_rul": 97.64026993055604
              },
              {
                "cycle": 152,
                "true_rul": 99.0,
                "predicted_rul": 97.59373229614745
              },
              {
                "cycle": 153,
                "true_rul": 98.0,
                "predicted_rul": 98.08398870640386
              },
              {
                "cycle": 154,
                "true_rul": 97.0,
                "predicted_rul": 98.13052634081245
              },
              {
                "cycle": 155,
                "true_rul": 96.0,
                "predicted_rul": 97.64026993055604
              },
              {
                "cycle": 156,
                "true_rul": 95.0,
                "predicted_rul": 97.59373229614745
              },
              {
                "cycle": 157,
                "true_rul": 94.0,
                "predicted_rul": 97.64026993055604
              },
              {
                "cycle": 158,
                "true_rul": 93.0,
                "predicted_rul": 97.42202049464957
              },
              {
                "cycle": 159,
                "true_rul": 92.0,
                "predicted_rul": 88.69292757228695
              },
              {
                "cycle": 160,
                "true_rul": 91.0,
                "predicted_rul": 84.07589850447857
              }
            ]
          },
          {
            "unit_number": 8,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 124.50691919546429
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 115.2354858356787
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 113.37634253914422
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 112.13105180108025
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 118.8128482451824
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 110.70631383316581
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 112.24529422532267
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 114.93572658367111
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 113.39674619151425
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 114.93572658367111
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 114.93572658367111
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 112.24529422532267
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 113.59362297552657
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 107.94712373370807
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 106.37636035619211
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 106.87494621477795
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 106.37636035619211
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 106.87494621477795
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 106.87494621477795
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 106.87494621477795
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 108.44570959229391
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 108.33447002430177
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 108.95859550165014
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 112.74550187875542
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 114.26275440400795
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 111.96338425878673
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 111.96338425878673
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 113.53414763630269
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 110.4461317335342
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 106.0053835857121
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 113.53414763630269
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 113.53414763630269
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 108.80224309801017
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 114.93572658367111
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 114.93572658367111
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 114.93572658367111
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 114.93572658367111
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 110.28704919101048
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 105.13773955519392
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 107.57485294227219
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 104.056887795344
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 111.31569436260008
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 101.08290490091805
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 102.48448384828647
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 101.08290490091805
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 99.3000839765719
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 98.4602376408745
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 103.5577606900892
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 110.49497843584899
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 105.9632520664377
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 106.8452299214095
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 104.89438358571209
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 107.52263611096461
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 103.40684735382803
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 103.40684735382803
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 103.40684735382803
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 96.14804078657191
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 96.98788712226931
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 99.61613964752185
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 106.87494621477795
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 96.98788712226931
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 105.1267319670374
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 104.28688563134
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 107.84759550165013
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 107.84759550165013
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 107.84759550165013
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 107.84759550165013
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 107.84759550165013
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 107.84759550165013
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 107.84759550165013
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 107.84759550165013
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 107.84759550165013
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 108.68744183734754
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 108.68744183734754
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 111.63450187875542
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 102.39866510040453
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 98.63090997890512
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 105.1209582467482
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 110.1749780692316
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 102.9161715019755
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 99.1484163804761
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 101.77666890572864
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 100.60794018999992
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 97.15504266245216
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 97.15504266245216
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 98.61456647197598
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 109.69858160234448
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 98.72300270191545
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 109.69858160234448
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 98.61456647197598
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 96.42363255669423
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 96.48251534057701
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 94.07799285107461
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 94.9662317021706
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 96.91330402097668
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 95.23689523524015
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 94.07799285107461
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 97.21392544633495
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 123,
                "true_rul": 125.0,
                "predicted_rul": 97.21392544633495
              },
              {
                "cycle": 124,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 125,
                "true_rul": 125.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 126,
                "true_rul": 125.0,
                "predicted_rul": 95.34975127992605
              },
              {
                "cycle": 127,
                "true_rul": 125.0,
                "predicted_rul": 90.88385405469062
              },
              {
                "cycle": 128,
                "true_rul": 125.0,
                "predicted_rul": 90.04400771899323
              },
              {
                "cycle": 129,
                "true_rul": 125.0,
                "predicted_rul": 92.15920888924053
              },
              {
                "cycle": 130,
                "true_rul": 125.0,
                "predicted_rul": 92.15920888924053
              },
              {
                "cycle": 131,
                "true_rul": 125.0,
                "predicted_rul": 85.29252852562401
              },
              {
                "cycle": 132,
                "true_rul": 125.0,
                "predicted_rul": 83.0430981102424
              },
              {
                "cycle": 133,
                "true_rul": 125.0,
                "predicted_rul": 75.55818964432103
              },
              {
                "cycle": 134,
                "true_rul": 125.0,
                "predicted_rul": 87.77833804943353
              },
              {
                "cycle": 135,
                "true_rul": 125.0,
                "predicted_rul": 75.55818964432103
              },
              {
                "cycle": 136,
                "true_rul": 125.0,
                "predicted_rul": 78.17950798600482
              },
              {
                "cycle": 137,
                "true_rul": 124.0,
                "predicted_rul": 75.9390206246664
              },
              {
                "cycle": 138,
                "true_rul": 123.0,
                "predicted_rul": 88.1591690297789
              },
              {
                "cycle": 139,
                "true_rul": 122.0,
                "predicted_rul": 90.48372148322137
              },
              {
                "cycle": 140,
                "true_rul": 121.0,
                "predicted_rul": 90.48372148322137
              },
              {
                "cycle": 141,
                "true_rul": 120.0,
                "predicted_rul": 95.53751666059843
              },
              {
                "cycle": 142,
                "true_rul": 119.0,
                "predicted_rul": 93.55269370577547
              },
              {
                "cycle": 143,
                "true_rul": 118.0,
                "predicted_rul": 93.55269370577547
              },
              {
                "cycle": 144,
                "true_rul": 117.0,
                "predicted_rul": 93.55269370577547
              },
              {
                "cycle": 145,
                "true_rul": 116.0,
                "predicted_rul": 95.22910249151201
              },
              {
                "cycle": 146,
                "true_rul": 115.0,
                "predicted_rul": 95.22910249151201
              },
              {
                "cycle": 147,
                "true_rul": 114.0,
                "predicted_rul": 95.22910249151201
              },
              {
                "cycle": 148,
                "true_rul": 113.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 149,
                "true_rul": 112.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 150,
                "true_rul": 111.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 151,
                "true_rul": 110.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 152,
                "true_rul": 109.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 153,
                "true_rul": 108.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 154,
                "true_rul": 107.0,
                "predicted_rul": 95.0229915310532
              },
              {
                "cycle": 155,
                "true_rul": 106.0,
                "predicted_rul": 86.88137139184175
              },
              {
                "cycle": 156,
                "true_rul": 105.0,
                "predicted_rul": 86.88137139184175
              },
              {
                "cycle": 157,
                "true_rul": 104.0,
                "predicted_rul": 88.96584651307955
              },
              {
                "cycle": 158,
                "true_rul": 103.0,
                "predicted_rul": 88.23443640732162
              },
              {
                "cycle": 159,
                "true_rul": 102.0,
                "predicted_rul": 87.10058125662437
              },
              {
                "cycle": 160,
                "true_rul": 101.0,
                "predicted_rul": 87.83199136238233
              },
              {
                "cycle": 161,
                "true_rul": 100.0,
                "predicted_rul": 88.96584651307955
              },
              {
                "cycle": 162,
                "true_rul": 99.0,
                "predicted_rul": 95.75440163681114
              },
              {
                "cycle": 163,
                "true_rul": 98.0,
                "predicted_rul": 88.96584651307955
              },
              {
                "cycle": 164,
                "true_rul": 97.0,
                "predicted_rul": 88.96584651307955
              },
              {
                "cycle": 165,
                "true_rul": 96.0,
                "predicted_rul": 87.83199136238233
              },
              {
                "cycle": 166,
                "true_rul": 95.0,
                "predicted_rul": 89.23263238802333
              }
            ]
          }
        ]
      }
    },
    "FD002": {
      "dataset": "FD002",
      "available_datasets": [
        "FD001",
        "FD002",
        "FD003",
        "FD004"
      ],
      "generated_at": "2026-07-20T13:50:36Z",
      "rul_regression": {
        "dataset_id": "FD002",
        "RMSE": 27.13207200080497,
        "MAE": 23.17683280134344,
        "R2": 0.237978148406375,
        "lead_time_cycles": 45
      },
      "anomaly_classification": {
        "model_name": "LightGBM_Anomaly",
        "threshold": 0.9198,
        "F1_Score": 0.5168539325842697,
        "Accuracy": 0.9620141342756183
      },
      "feature_importance": {
        "features": [
          [
            "sensor_12_expanding_mean",
            1388.7601178030275
          ],
          [
            "sensor_7_expanding_mean",
            1142.5703135051726
          ],
          [
            "sensor_8_expanding_mean",
            657.7438752053763
          ],
          [
            "sensor_13",
            509.0125721189307
          ],
          [
            "sensor_8",
            423.25858631990377
          ]
        ]
      },
      "data_drift": {
        "threshold": 0.2,
        "timestamp": "2026-07-16T10:50:56Z",
        "is_sample": true,
        "features": {
          "sensor_11": {
            "psi": 0.01,
            "status": "stable"
          }
        }
      },
      "rul_trajectories": {
        "is_sample": false,
        "units": [
          {
            "unit_number": "LIVE",
            "life": 81,
            "trajectory": [
              {
                "cycle": 20,
                "predicted_rul": 11175.61
              },
              {
                "cycle": 21,
                "predicted_rul": 11174.09
              },
              {
                "cycle": 22,
                "predicted_rul": 11175.15
              },
              {
                "cycle": 23,
                "predicted_rul": 11180.33
              },
              {
                "cycle": 24,
                "predicted_rul": 11183.08
              },
              {
                "cycle": 25,
                "predicted_rul": 11177.86
              },
              {
                "cycle": 26,
                "predicted_rul": 11177.32
              },
              {
                "cycle": 27,
                "predicted_rul": 11175.1
              },
              {
                "cycle": 28,
                "predicted_rul": 11177.25
              },
              {
                "cycle": 29,
                "predicted_rul": 11174.6
              },
              {
                "cycle": 30,
                "predicted_rul": 11172.65
              },
              {
                "cycle": 31,
                "predicted_rul": 11176.95
              },
              {
                "cycle": 32,
                "predicted_rul": 11173.45
              },
              {
                "cycle": 33,
                "predicted_rul": 11179.62
              },
              {
                "cycle": 34,
                "predicted_rul": 11177.18
              },
              {
                "cycle": 35,
                "predicted_rul": 11172.25
              },
              {
                "cycle": 36,
                "predicted_rul": 11174.58
              },
              {
                "cycle": 37,
                "predicted_rul": 11179.57
              },
              {
                "cycle": 38,
                "predicted_rul": 11178.86
              },
              {
                "cycle": 39,
                "predicted_rul": 11175.22
              },
              {
                "cycle": 40,
                "predicted_rul": 11177.36
              },
              {
                "cycle": 41,
                "predicted_rul": 11174.22
              },
              {
                "cycle": 42,
                "predicted_rul": 11176.56
              },
              {
                "cycle": 43,
                "predicted_rul": 11170.86
              },
              {
                "cycle": 44,
                "predicted_rul": 11176.82
              },
              {
                "cycle": 45,
                "predicted_rul": 11168.96
              },
              {
                "cycle": 46,
                "predicted_rul": 11176.7
              },
              {
                "cycle": 47,
                "predicted_rul": 11170.09
              },
              {
                "cycle": 48,
                "predicted_rul": 11179.52
              },
              {
                "cycle": 49,
                "predicted_rul": 11174.4
              },
              {
                "cycle": 50,
                "predicted_rul": 11176.36
              },
              {
                "cycle": 51,
                "predicted_rul": 11172.94
              },
              {
                "cycle": 52,
                "predicted_rul": 11172.12
              },
              {
                "cycle": 53,
                "predicted_rul": 11176.86
              },
              {
                "cycle": 54,
                "predicted_rul": 11173.35
              },
              {
                "cycle": 55,
                "predicted_rul": 11168.45
              },
              {
                "cycle": 56,
                "predicted_rul": 11175.91
              },
              {
                "cycle": 57,
                "predicted_rul": 11179.24
              },
              {
                "cycle": 58,
                "predicted_rul": 11175.69
              },
              {
                "cycle": 59,
                "predicted_rul": 11173.92
              },
              {
                "cycle": 60,
                "predicted_rul": 11172.78
              },
              {
                "cycle": 61,
                "predicted_rul": 11175.96
              },
              {
                "cycle": 62,
                "predicted_rul": 11171.31
              },
              {
                "cycle": 63,
                "predicted_rul": 11173.82
              },
              {
                "cycle": 64,
                "predicted_rul": 11173.7
              },
              {
                "cycle": 65,
                "predicted_rul": 11178.95
              },
              {
                "cycle": 66,
                "predicted_rul": 11175.82
              },
              {
                "cycle": 67,
                "predicted_rul": 11175.01
              },
              {
                "cycle": 68,
                "predicted_rul": 11173.32
              },
              {
                "cycle": 69,
                "predicted_rul": 11177.05
              },
              {
                "cycle": 70,
                "predicted_rul": 11177.73
              },
              {
                "cycle": 71,
                "predicted_rul": 11174.81
              },
              {
                "cycle": 72,
                "predicted_rul": 11175.8
              },
              {
                "cycle": 73,
                "predicted_rul": 11178.37
              },
              {
                "cycle": 74,
                "predicted_rul": 11172.57
              },
              {
                "cycle": 75,
                "predicted_rul": 11172.74
              },
              {
                "cycle": 76,
                "predicted_rul": 11174.35
              },
              {
                "cycle": 77,
                "predicted_rul": 11176.09
              },
              {
                "cycle": 78,
                "predicted_rul": 11174.66
              },
              {
                "cycle": 79,
                "predicted_rul": 11173.88
              },
              {
                "cycle": 80,
                "predicted_rul": 11172.6
              },
              {
                "cycle": 81,
                "predicted_rul": 11176.92
              },
              {
                "cycle": 82,
                "predicted_rul": 11175.06
              },
              {
                "cycle": 83,
                "predicted_rul": 11171.99
              },
              {
                "cycle": 84,
                "predicted_rul": 11175.83
              },
              {
                "cycle": 85,
                "predicted_rul": 11174.16
              },
              {
                "cycle": 86,
                "predicted_rul": 11172.12
              },
              {
                "cycle": 87,
                "predicted_rul": 11173.76
              },
              {
                "cycle": 88,
                "predicted_rul": 11171.57
              },
              {
                "cycle": 89,
                "predicted_rul": 11172.87
              },
              {
                "cycle": 90,
                "predicted_rul": 11166.71
              },
              {
                "cycle": 91,
                "predicted_rul": 11169.04
              },
              {
                "cycle": 92,
                "predicted_rul": 11171.1
              },
              {
                "cycle": 93,
                "predicted_rul": 11171.28
              },
              {
                "cycle": 94,
                "predicted_rul": 11169.01
              },
              {
                "cycle": 95,
                "predicted_rul": 11176.52
              },
              {
                "cycle": 96,
                "predicted_rul": 11173.76
              },
              {
                "cycle": 97,
                "predicted_rul": 11172.73
              },
              {
                "cycle": 98,
                "predicted_rul": 11174.38
              },
              {
                "cycle": 99,
                "predicted_rul": 11174.47
              },
              {
                "cycle": 100,
                "predicted_rul": 11174.98
              }
            ]
          },
          {
            "unit_number": 1,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 99.2456261226871
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 70.81310996082902
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 72.50558188201467
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 90.74915412148766
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 96.51286639563477
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 96.9254286942305
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 103.46155757027736
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 106.64396258516535
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 100.11241444127518
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 101.02125008971598
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 96.07763526171766
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 94.75570796512329
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 93.39410446137117
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 103.38272538042293
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 99.1959219935361
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 93.93586557776507
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 91.95065003559102
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 91.27926436589587
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 93.95484670649785
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 96.69449283563881
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 102.12111080105751
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 102.7708429299837
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 100.10347772366185
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 111.76711769404574
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 104.00376535983378
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 102.46619245009606
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 98.85896643636079
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 104.15375052774834
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 98.28751273862326
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 99.8235428735752
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 94.40363755808721
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 97.30439836018377
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 99.78235419487646
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 94.0615655507172
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 101.45448843055055
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 100.4934956572688
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 114.1191234856542
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 114.85312794737365
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 123.90606106158339
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 118.75847374460864
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 117.68313399519866
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 118.05485557413886
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 113.07863910225024
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 112.39157260062893
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 108.47602199513312
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 109.22454485005801
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 103.9993034380841
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 107.46839089384412
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 101.45555717414209
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 108.18284483075331
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 107.90483390086956
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 108.82585666522937
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 101.74288096568125
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 102.4203163046077
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 97.77247045128024
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 93.59646095793869
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 97.57958494918967
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 97.91287020119671
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 100.53066699819465
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 102.8302031573894
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 96.27420095387242
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 93.41541909328953
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 89.75027787491126
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 92.8322357260513
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 103.92566369487031
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 107.69030224992275
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 112.06501268224201
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 105.72372209937384
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 112.31068628594221
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 109.62977688859792
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 102.83534537504238
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 98.1655490358171
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 105.72690269796112
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 106.16193598151403
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 112.69163669622685
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 111.3415345598878
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 105.77542942197033
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 105.58728682866058
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 107.34126935975837
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 110.48914261063692
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 107.50547014070798
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 105.9311805963116
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 104.18030978841125
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 94.96567644358947
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 92.530979687941
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 90.0451055755475
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 89.46292989959329
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 84.139733715474
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 82.8818038944355
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 84.7746999717674
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 80.53394213901629
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 78.65161046167668
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 70.64807912214746
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 86.34822029732095
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 75.46549289293944
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 71.52743925039795
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 70.51488342962148
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 68.93605359499998
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 81.70242754490755
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 79.68150559383321
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 82.10647327269908
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 82.33414372554944
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 81.85358233181978
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 85.46156092862839
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 75.64968896446953
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 80.16493615305808
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 84.63308036330454
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 82.80072892625503
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 86.14432366085748
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 78.92323476485944
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 78.08482084860589
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 74.7433727833668
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 65.83674517253166
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 66.45462716462134
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 72.73188592873521
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 75.42816950779525
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 68.62256108380461
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 76.50286563157715
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 78.82531128228038
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 87.73729298672697
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 93.86596976698456
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 91.50427490770016
              },
              {
                "cycle": 123,
                "true_rul": 125.0,
                "predicted_rul": 95.40048267404563
              },
              {
                "cycle": 124,
                "true_rul": 125.0,
                "predicted_rul": 93.33341322142951
              },
              {
                "cycle": 125,
                "true_rul": 125.0,
                "predicted_rul": 91.73438459398494
              },
              {
                "cycle": 126,
                "true_rul": 125.0,
                "predicted_rul": 92.34904729107257
              },
              {
                "cycle": 127,
                "true_rul": 125.0,
                "predicted_rul": 96.32753346124991
              },
              {
                "cycle": 128,
                "true_rul": 125.0,
                "predicted_rul": 92.6883177272448
              },
              {
                "cycle": 129,
                "true_rul": 125.0,
                "predicted_rul": 85.54696675812556
              },
              {
                "cycle": 130,
                "true_rul": 125.0,
                "predicted_rul": 92.69033193860014
              },
              {
                "cycle": 131,
                "true_rul": 125.0,
                "predicted_rul": 90.72483151679444
              },
              {
                "cycle": 132,
                "true_rul": 125.0,
                "predicted_rul": 90.66967171225406
              },
              {
                "cycle": 133,
                "true_rul": 125.0,
                "predicted_rul": 91.85597961117674
              },
              {
                "cycle": 134,
                "true_rul": 125.0,
                "predicted_rul": 89.97224427541369
              },
              {
                "cycle": 135,
                "true_rul": 125.0,
                "predicted_rul": 95.5985807539364
              },
              {
                "cycle": 136,
                "true_rul": 125.0,
                "predicted_rul": 89.32435515907673
              },
              {
                "cycle": 137,
                "true_rul": 125.0,
                "predicted_rul": 90.69289579887482
              },
              {
                "cycle": 138,
                "true_rul": 125.0,
                "predicted_rul": 89.25762976212536
              },
              {
                "cycle": 139,
                "true_rul": 125.0,
                "predicted_rul": 86.48370862277989
              },
              {
                "cycle": 140,
                "true_rul": 125.0,
                "predicted_rul": 91.38282585327397
              },
              {
                "cycle": 141,
                "true_rul": 125.0,
                "predicted_rul": 87.50714630624134
              },
              {
                "cycle": 142,
                "true_rul": 125.0,
                "predicted_rul": 87.54721951571082
              },
              {
                "cycle": 143,
                "true_rul": 125.0,
                "predicted_rul": 88.73679925362558
              },
              {
                "cycle": 144,
                "true_rul": 125.0,
                "predicted_rul": 85.748410684997
              },
              {
                "cycle": 145,
                "true_rul": 125.0,
                "predicted_rul": 87.67738889334578
              },
              {
                "cycle": 146,
                "true_rul": 125.0,
                "predicted_rul": 85.95699643837725
              },
              {
                "cycle": 147,
                "true_rul": 125.0,
                "predicted_rul": 85.2717009005155
              },
              {
                "cycle": 148,
                "true_rul": 125.0,
                "predicted_rul": 84.44731517371292
              },
              {
                "cycle": 149,
                "true_rul": 125.0,
                "predicted_rul": 89.92362064122062
              },
              {
                "cycle": 150,
                "true_rul": 125.0,
                "predicted_rul": 90.83442617543551
              },
              {
                "cycle": 151,
                "true_rul": 125.0,
                "predicted_rul": 86.58948503340434
              },
              {
                "cycle": 152,
                "true_rul": 124.0,
                "predicted_rul": 81.59834968106952
              },
              {
                "cycle": 153,
                "true_rul": 123.0,
                "predicted_rul": 87.47457737300101
              },
              {
                "cycle": 154,
                "true_rul": 122.0,
                "predicted_rul": 83.99069643279654
              },
              {
                "cycle": 155,
                "true_rul": 121.0,
                "predicted_rul": 83.87671634983417
              },
              {
                "cycle": 156,
                "true_rul": 120.0,
                "predicted_rul": 83.35293991799517
              },
              {
                "cycle": 157,
                "true_rul": 119.0,
                "predicted_rul": 79.22525928962023
              },
              {
                "cycle": 158,
                "true_rul": 118.0,
                "predicted_rul": 68.51932098217367
              },
              {
                "cycle": 159,
                "true_rul": 117.0,
                "predicted_rul": 64.61655129226165
              },
              {
                "cycle": 160,
                "true_rul": 116.0,
                "predicted_rul": 60.930318724682365
              },
              {
                "cycle": 161,
                "true_rul": 115.0,
                "predicted_rul": 68.56179389458521
              },
              {
                "cycle": 162,
                "true_rul": 114.0,
                "predicted_rul": 63.8058141574802
              },
              {
                "cycle": 163,
                "true_rul": 113.0,
                "predicted_rul": 66.32914686291042
              },
              {
                "cycle": 164,
                "true_rul": 112.0,
                "predicted_rul": 62.18057544592193
              },
              {
                "cycle": 165,
                "true_rul": 111.0,
                "predicted_rul": 70.05914548927103
              },
              {
                "cycle": 166,
                "true_rul": 110.0,
                "predicted_rul": 67.45835887115572
              },
              {
                "cycle": 167,
                "true_rul": 109.0,
                "predicted_rul": 61.601493786158244
              },
              {
                "cycle": 168,
                "true_rul": 108.0,
                "predicted_rul": 56.13607584030069
              },
              {
                "cycle": 169,
                "true_rul": 107.0,
                "predicted_rul": 62.01131332922341
              },
              {
                "cycle": 170,
                "true_rul": 106.0,
                "predicted_rul": 61.64558814648626
              },
              {
                "cycle": 171,
                "true_rul": 105.0,
                "predicted_rul": 51.91834268342427
              },
              {
                "cycle": 172,
                "true_rul": 104.0,
                "predicted_rul": 60.42826340971624
              },
              {
                "cycle": 173,
                "true_rul": 103.0,
                "predicted_rul": 61.40785481187595
              },
              {
                "cycle": 174,
                "true_rul": 102.0,
                "predicted_rul": 59.481521326320944
              },
              {
                "cycle": 175,
                "true_rul": 101.0,
                "predicted_rul": 62.810090768727605
              },
              {
                "cycle": 176,
                "true_rul": 100.0,
                "predicted_rul": 70.9494020390066
              },
              {
                "cycle": 177,
                "true_rul": 99.0,
                "predicted_rul": 67.12531914876854
              },
              {
                "cycle": 178,
                "true_rul": 98.0,
                "predicted_rul": 68.13059408002118
              },
              {
                "cycle": 179,
                "true_rul": 97.0,
                "predicted_rul": 63.78545150716309
              },
              {
                "cycle": 180,
                "true_rul": 96.0,
                "predicted_rul": 62.77947023147135
              },
              {
                "cycle": 181,
                "true_rul": 95.0,
                "predicted_rul": 60.38657944854094
              },
              {
                "cycle": 182,
                "true_rul": 94.0,
                "predicted_rul": 58.83249320662799
              },
              {
                "cycle": 183,
                "true_rul": 93.0,
                "predicted_rul": 52.98599160778758
              },
              {
                "cycle": 184,
                "true_rul": 92.0,
                "predicted_rul": 60.52649114572523
              },
              {
                "cycle": 185,
                "true_rul": 91.0,
                "predicted_rul": 61.944078747454114
              },
              {
                "cycle": 186,
                "true_rul": 90.0,
                "predicted_rul": 54.647202423362614
              },
              {
                "cycle": 187,
                "true_rul": 89.0,
                "predicted_rul": 52.812842146546245
              },
              {
                "cycle": 188,
                "true_rul": 88.0,
                "predicted_rul": 56.90549637397271
              },
              {
                "cycle": 189,
                "true_rul": 87.0,
                "predicted_rul": 57.18726520088239
              },
              {
                "cycle": 190,
                "true_rul": 86.0,
                "predicted_rul": 58.595923441071136
              },
              {
                "cycle": 191,
                "true_rul": 85.0,
                "predicted_rul": 59.179752739519245
              },
              {
                "cycle": 192,
                "true_rul": 84.0,
                "predicted_rul": 62.78339257742846
              },
              {
                "cycle": 193,
                "true_rul": 83.0,
                "predicted_rul": 56.49308257942721
              },
              {
                "cycle": 194,
                "true_rul": 82.0,
                "predicted_rul": 49.68157647901353
              },
              {
                "cycle": 195,
                "true_rul": 81.0,
                "predicted_rul": 48.939115637251234
              },
              {
                "cycle": 196,
                "true_rul": 80.0,
                "predicted_rul": 47.00536965552601
              },
              {
                "cycle": 197,
                "true_rul": 79.0,
                "predicted_rul": 40.618689137709225
              },
              {
                "cycle": 198,
                "true_rul": 78.0,
                "predicted_rul": 41.446476835672
              },
              {
                "cycle": 199,
                "true_rul": 77.0,
                "predicted_rul": 37.56070712065775
              },
              {
                "cycle": 200,
                "true_rul": 76.0,
                "predicted_rul": 37.12847512472945
              },
              {
                "cycle": 201,
                "true_rul": 75.0,
                "predicted_rul": 35.67593818376554
              },
              {
                "cycle": 202,
                "true_rul": 74.0,
                "predicted_rul": 43.58482501070466
              },
              {
                "cycle": 203,
                "true_rul": 73.0,
                "predicted_rul": 52.320042465009465
              },
              {
                "cycle": 204,
                "true_rul": 72.0,
                "predicted_rul": 47.19120029367696
              },
              {
                "cycle": 205,
                "true_rul": 71.0,
                "predicted_rul": 44.702377077483106
              },
              {
                "cycle": 206,
                "true_rul": 70.0,
                "predicted_rul": 41.333649427131604
              },
              {
                "cycle": 207,
                "true_rul": 69.0,
                "predicted_rul": 38.27435127343415
              },
              {
                "cycle": 208,
                "true_rul": 68.0,
                "predicted_rul": 39.75604076331729
              },
              {
                "cycle": 209,
                "true_rul": 67.0,
                "predicted_rul": 44.927382998552275
              },
              {
                "cycle": 210,
                "true_rul": 66.0,
                "predicted_rul": 45.921729034920645
              },
              {
                "cycle": 211,
                "true_rul": 65.0,
                "predicted_rul": 31.289902963517306
              },
              {
                "cycle": 212,
                "true_rul": 64.0,
                "predicted_rul": 31.348529292969033
              },
              {
                "cycle": 213,
                "true_rul": 63.0,
                "predicted_rul": 27.92894879731466
              },
              {
                "cycle": 214,
                "true_rul": 62.0,
                "predicted_rul": 29.76416699465699
              },
              {
                "cycle": 215,
                "true_rul": 61.0,
                "predicted_rul": 31.061438401342457
              },
              {
                "cycle": 216,
                "true_rul": 60.0,
                "predicted_rul": 27.90869862364889
              },
              {
                "cycle": 217,
                "true_rul": 59.0,
                "predicted_rul": 38.65468865119874
              },
              {
                "cycle": 218,
                "true_rul": 58.0,
                "predicted_rul": 35.697981888148206
              },
              {
                "cycle": 219,
                "true_rul": 57.0,
                "predicted_rul": 41.026749418462714
              },
              {
                "cycle": 220,
                "true_rul": 56.0,
                "predicted_rul": 32.956763865495304
              },
              {
                "cycle": 221,
                "true_rul": 55.0,
                "predicted_rul": 34.95200234074946
              },
              {
                "cycle": 222,
                "true_rul": 54.0,
                "predicted_rul": 33.53794918793392
              },
              {
                "cycle": 223,
                "true_rul": 53.0,
                "predicted_rul": 28.553525506815276
              },
              {
                "cycle": 224,
                "true_rul": 52.0,
                "predicted_rul": 31.802827084953606
              },
              {
                "cycle": 225,
                "true_rul": 51.0,
                "predicted_rul": 31.2892150155767
              },
              {
                "cycle": 226,
                "true_rul": 50.0,
                "predicted_rul": 33.37295945237747
              },
              {
                "cycle": 227,
                "true_rul": 49.0,
                "predicted_rul": 40.369517057639314
              },
              {
                "cycle": 228,
                "true_rul": 48.0,
                "predicted_rul": 36.1727459587928
              },
              {
                "cycle": 229,
                "true_rul": 47.0,
                "predicted_rul": 30.833935073529574
              },
              {
                "cycle": 230,
                "true_rul": 46.0,
                "predicted_rul": 32.98283994390658
              },
              {
                "cycle": 231,
                "true_rul": 45.0,
                "predicted_rul": 38.06313858846079
              },
              {
                "cycle": 232,
                "true_rul": 44.0,
                "predicted_rul": 38.91463110316363
              },
              {
                "cycle": 233,
                "true_rul": 43.0,
                "predicted_rul": 29.97842012959518
              },
              {
                "cycle": 234,
                "true_rul": 42.0,
                "predicted_rul": 35.019269024953246
              },
              {
                "cycle": 235,
                "true_rul": 41.0,
                "predicted_rul": 42.581014420584324
              },
              {
                "cycle": 236,
                "true_rul": 40.0,
                "predicted_rul": 36.92572488766382
              },
              {
                "cycle": 237,
                "true_rul": 39.0,
                "predicted_rul": 30.3064092842651
              },
              {
                "cycle": 238,
                "true_rul": 38.0,
                "predicted_rul": 30.259326021605375
              },
              {
                "cycle": 239,
                "true_rul": 37.0,
                "predicted_rul": 25.53203126150038
              },
              {
                "cycle": 240,
                "true_rul": 36.0,
                "predicted_rul": 31.328426196230794
              },
              {
                "cycle": 241,
                "true_rul": 35.0,
                "predicted_rul": 28.23876615626068
              },
              {
                "cycle": 242,
                "true_rul": 34.0,
                "predicted_rul": 28.697616037319676
              },
              {
                "cycle": 243,
                "true_rul": 33.0,
                "predicted_rul": 34.133143343824486
              },
              {
                "cycle": 244,
                "true_rul": 32.0,
                "predicted_rul": 29.085111784603214
              },
              {
                "cycle": 245,
                "true_rul": 31.0,
                "predicted_rul": 16.2820548664331
              },
              {
                "cycle": 246,
                "true_rul": 30.0,
                "predicted_rul": 13.641197926372115
              },
              {
                "cycle": 247,
                "true_rul": 29.0,
                "predicted_rul": 12.244887508948523
              },
              {
                "cycle": 248,
                "true_rul": 28.0,
                "predicted_rul": 18.892713743181957
              },
              {
                "cycle": 249,
                "true_rul": 27.0,
                "predicted_rul": 19.088069878614988
              },
              {
                "cycle": 250,
                "true_rul": 26.0,
                "predicted_rul": 15.180209038109751
              },
              {
                "cycle": 251,
                "true_rul": 25.0,
                "predicted_rul": 15.615645325011428
              },
              {
                "cycle": 252,
                "true_rul": 24.0,
                "predicted_rul": 10.207692540365315
              },
              {
                "cycle": 253,
                "true_rul": 23.0,
                "predicted_rul": 10.230718720660661
              },
              {
                "cycle": 254,
                "true_rul": 22.0,
                "predicted_rul": 6.104605869521038
              },
              {
                "cycle": 255,
                "true_rul": 21.0,
                "predicted_rul": -5.948293252142321
              },
              {
                "cycle": 256,
                "true_rul": 20.0,
                "predicted_rul": -1.7030238902298152
              },
              {
                "cycle": 257,
                "true_rul": 19.0,
                "predicted_rul": -9.492403074000322
              },
              {
                "cycle": 258,
                "true_rul": 18.0,
                "predicted_rul": -11.32691343670922
              }
            ]
          },
          {
            "unit_number": 2,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 119.07361991053585
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 158.88771016969986
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 135.1310601800942
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 120.18305463301658
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 104.71901955164685
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 118.05145205158806
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 129.633628005442
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 122.54158790623842
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 115.08715378567285
              },
              {
                "cycle": 10,
                "true_rul": 124.0,
                "predicted_rul": 110.62238514596174
              },
              {
                "cycle": 11,
                "true_rul": 123.0,
                "predicted_rul": 119.29466102560036
              },
              {
                "cycle": 12,
                "true_rul": 122.0,
                "predicted_rul": 120.28230519325552
              },
              {
                "cycle": 13,
                "true_rul": 121.0,
                "predicted_rul": 125.55834036191845
              },
              {
                "cycle": 14,
                "true_rul": 120.0,
                "predicted_rul": 117.56178122964047
              },
              {
                "cycle": 15,
                "true_rul": 119.0,
                "predicted_rul": 117.85897665893572
              },
              {
                "cycle": 16,
                "true_rul": 118.0,
                "predicted_rul": 110.63479622227896
              },
              {
                "cycle": 17,
                "true_rul": 117.0,
                "predicted_rul": 112.05483512705541
              },
              {
                "cycle": 18,
                "true_rul": 116.0,
                "predicted_rul": 112.07239715758806
              },
              {
                "cycle": 19,
                "true_rul": 115.0,
                "predicted_rul": 116.28426173316984
              },
              {
                "cycle": 20,
                "true_rul": 114.0,
                "predicted_rul": 107.8728754919739
              },
              {
                "cycle": 21,
                "true_rul": 113.0,
                "predicted_rul": 119.97442775108539
              },
              {
                "cycle": 22,
                "true_rul": 112.0,
                "predicted_rul": 124.71024937633956
              },
              {
                "cycle": 23,
                "true_rul": 111.0,
                "predicted_rul": 119.69914403156508
              },
              {
                "cycle": 24,
                "true_rul": 110.0,
                "predicted_rul": 120.02020568111948
              },
              {
                "cycle": 25,
                "true_rul": 109.0,
                "predicted_rul": 123.85712207949655
              },
              {
                "cycle": 26,
                "true_rul": 108.0,
                "predicted_rul": 117.42498200673617
              },
              {
                "cycle": 27,
                "true_rul": 107.0,
                "predicted_rul": 111.55973518261453
              },
              {
                "cycle": 28,
                "true_rul": 106.0,
                "predicted_rul": 111.81736049187748
              },
              {
                "cycle": 29,
                "true_rul": 105.0,
                "predicted_rul": 110.66137795489703
              },
              {
                "cycle": 30,
                "true_rul": 104.0,
                "predicted_rul": 113.3671260212559
              },
              {
                "cycle": 31,
                "true_rul": 103.0,
                "predicted_rul": 108.06848742746115
              },
              {
                "cycle": 32,
                "true_rul": 102.0,
                "predicted_rul": 112.13845530599974
              },
              {
                "cycle": 33,
                "true_rul": 101.0,
                "predicted_rul": 115.70365345039136
              },
              {
                "cycle": 34,
                "true_rul": 100.0,
                "predicted_rul": 113.86452827947141
              },
              {
                "cycle": 35,
                "true_rul": 99.0,
                "predicted_rul": 113.89192096400257
              },
              {
                "cycle": 36,
                "true_rul": 98.0,
                "predicted_rul": 119.17963562389014
              },
              {
                "cycle": 37,
                "true_rul": 97.0,
                "predicted_rul": 114.30246026902387
              },
              {
                "cycle": 38,
                "true_rul": 96.0,
                "predicted_rul": 112.38252557994929
              },
              {
                "cycle": 39,
                "true_rul": 95.0,
                "predicted_rul": 116.4291233142394
              },
              {
                "cycle": 40,
                "true_rul": 94.0,
                "predicted_rul": 119.64048706521498
              },
              {
                "cycle": 41,
                "true_rul": 93.0,
                "predicted_rul": 116.4287292079025
              },
              {
                "cycle": 42,
                "true_rul": 92.0,
                "predicted_rul": 111.10816623378014
              },
              {
                "cycle": 43,
                "true_rul": 91.0,
                "predicted_rul": 108.2539033637131
              },
              {
                "cycle": 44,
                "true_rul": 90.0,
                "predicted_rul": 106.16713595494366
              },
              {
                "cycle": 45,
                "true_rul": 89.0,
                "predicted_rul": 91.34782521596935
              },
              {
                "cycle": 46,
                "true_rul": 88.0,
                "predicted_rul": 95.32924073262984
              },
              {
                "cycle": 47,
                "true_rul": 87.0,
                "predicted_rul": 85.55667796772104
              },
              {
                "cycle": 48,
                "true_rul": 86.0,
                "predicted_rul": 90.90131422959712
              },
              {
                "cycle": 49,
                "true_rul": 85.0,
                "predicted_rul": 96.79022536678349
              },
              {
                "cycle": 50,
                "true_rul": 84.0,
                "predicted_rul": 90.65104890771545
              },
              {
                "cycle": 51,
                "true_rul": 83.0,
                "predicted_rul": 96.66393913993306
              },
              {
                "cycle": 52,
                "true_rul": 82.0,
                "predicted_rul": 100.39301126687678
              },
              {
                "cycle": 53,
                "true_rul": 81.0,
                "predicted_rul": 104.09535560231416
              },
              {
                "cycle": 54,
                "true_rul": 80.0,
                "predicted_rul": 100.19626004100428
              },
              {
                "cycle": 55,
                "true_rul": 79.0,
                "predicted_rul": 99.48373972369154
              }
            ]
          },
          {
            "unit_number": 3,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 42.89073459382416
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 41.747258940391475
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 71.87485553151782
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 66.6616457995442
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 81.60521815612265
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 87.53952475968435
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 102.05498745936893
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 92.67032737428781
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 99.09454566758177
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 96.79574685285297
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 90.51195394803653
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 89.29480562352546
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 88.05703298079789
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 89.80761938316209
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 90.37813720893246
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 94.86402979848026
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 99.52816187078497
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 95.42567095707636
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 100.95060857205863
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 98.11615354443347
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 95.44234735529608
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 96.2112970228336
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 87.37429428549149
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 88.20266334186817
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 83.12068111692861
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 93.0799735982473
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 94.5449037416729
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 99.63491490281376
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 99.59771428115891
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 99.66839156145579
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 104.30616343822112
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 99.78176366432308
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 97.65323890012587
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 99.47605850793843
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 102.113844181893
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 99.504108018431
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 94.88267210075355
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 97.76193952128779
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 103.04712763173302
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 97.56583147440142
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 95.29632000779202
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 99.96997176249897
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 104.46603506780411
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 105.33008959746803
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 103.05741552535437
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 103.8047524124413
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 103.00153244292414
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 106.23363645138306
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 108.0577026797655
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 100.66789294155569
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 102.63919549467028
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 102.45498684258018
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 101.7627949963935
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 95.46801419471012
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 90.56062534234479
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 88.45216936082579
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 88.58832158313089
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 81.61063606356947
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 81.17297792991485
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 84.35675141943102
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 79.91546486728112
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 84.0032382309546
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 81.18974957485807
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 81.35920065648679
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 74.11565142939253
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 73.94097617117404
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 78.4084525196904
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 74.92594646004909
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 81.34256224595083
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 85.05774892573208
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 89.2996969066462
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 98.39530003182153
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 97.82663016763036
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 86.3163735380258
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 90.33955639952728
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 87.36320573263583
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 89.4371833956775
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 92.97158274627327
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 96.09199073302261
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 95.15010971340052
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 111.11264467457295
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 105.76944579039446
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 111.5910791109527
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 111.01980658450702
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 120.22305656979006
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 115.24655690118016
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 105.98261280758561
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 107.78418530138333
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 105.22923225150043
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 99.41822065567794
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 97.28838544695282
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 97.72895786349545
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 93.33674534437705
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 95.49072413852991
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 92.48597768148102
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 92.51174812633872
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 90.91527312904327
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 84.88595302221256
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 84.21409688737367
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 83.0619965026035
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 80.90186220864598
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 74.66267892862925
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 75.36135028234821
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 82.61274356044669
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 81.37840673796563
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 85.59082175272124
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 87.37061809025909
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 81.36198830991088
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 77.51535477273137
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 78.65904477138793
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 88.77610916594676
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 82.68197592038268
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 80.86844177648709
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 79.52557507976599
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 78.39447680122066
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 77.63813294137253
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 73.4710998048995
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 80.71894043072098
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 75.55301127721214
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 86.21191163723233
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 85.82708904749234
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 86.88397199507381
              },
              {
                "cycle": 123,
                "true_rul": 125.0,
                "predicted_rul": 82.97272522114872
              },
              {
                "cycle": 124,
                "true_rul": 125.0,
                "predicted_rul": 70.4258652646422
              },
              {
                "cycle": 125,
                "true_rul": 125.0,
                "predicted_rul": 67.96771754747715
              },
              {
                "cycle": 126,
                "true_rul": 125.0,
                "predicted_rul": 73.2709856754027
              },
              {
                "cycle": 127,
                "true_rul": 125.0,
                "predicted_rul": 73.65016606135396
              },
              {
                "cycle": 128,
                "true_rul": 125.0,
                "predicted_rul": 79.83584188417808
              },
              {
                "cycle": 129,
                "true_rul": 125.0,
                "predicted_rul": 74.62393446435271
              },
              {
                "cycle": 130,
                "true_rul": 125.0,
                "predicted_rul": 74.73885748100292
              },
              {
                "cycle": 131,
                "true_rul": 125.0,
                "predicted_rul": 77.76523912188532
              },
              {
                "cycle": 132,
                "true_rul": 125.0,
                "predicted_rul": 79.65894625316287
              },
              {
                "cycle": 133,
                "true_rul": 125.0,
                "predicted_rul": 78.0762499446264
              },
              {
                "cycle": 134,
                "true_rul": 125.0,
                "predicted_rul": 82.33262084357557
              },
              {
                "cycle": 135,
                "true_rul": 125.0,
                "predicted_rul": 85.92285015663765
              },
              {
                "cycle": 136,
                "true_rul": 125.0,
                "predicted_rul": 80.57832688979397
              },
              {
                "cycle": 137,
                "true_rul": 125.0,
                "predicted_rul": 81.71415917284685
              },
              {
                "cycle": 138,
                "true_rul": 125.0,
                "predicted_rul": 83.77223744695402
              },
              {
                "cycle": 139,
                "true_rul": 125.0,
                "predicted_rul": 82.86366934218677
              },
              {
                "cycle": 140,
                "true_rul": 125.0,
                "predicted_rul": 84.12651082186494
              },
              {
                "cycle": 141,
                "true_rul": 125.0,
                "predicted_rul": 79.6576923535431
              },
              {
                "cycle": 142,
                "true_rul": 125.0,
                "predicted_rul": 86.02950991069702
              },
              {
                "cycle": 143,
                "true_rul": 125.0,
                "predicted_rul": 87.45631691188646
              },
              {
                "cycle": 144,
                "true_rul": 125.0,
                "predicted_rul": 87.72018735510756
              },
              {
                "cycle": 145,
                "true_rul": 125.0,
                "predicted_rul": 86.80909903755128
              },
              {
                "cycle": 146,
                "true_rul": 125.0,
                "predicted_rul": 87.91095214514644
              },
              {
                "cycle": 147,
                "true_rul": 124.0,
                "predicted_rul": 88.49552892962492
              },
              {
                "cycle": 148,
                "true_rul": 123.0,
                "predicted_rul": 76.70161863964495
              },
              {
                "cycle": 149,
                "true_rul": 122.0,
                "predicted_rul": 79.4108917917074
              },
              {
                "cycle": 150,
                "true_rul": 121.0,
                "predicted_rul": 72.78812288679183
              },
              {
                "cycle": 151,
                "true_rul": 120.0,
                "predicted_rul": 72.5313178081542
              },
              {
                "cycle": 152,
                "true_rul": 119.0,
                "predicted_rul": 70.3054527299555
              },
              {
                "cycle": 153,
                "true_rul": 118.0,
                "predicted_rul": 73.31998310088602
              },
              {
                "cycle": 154,
                "true_rul": 117.0,
                "predicted_rul": 66.2575698217297
              },
              {
                "cycle": 155,
                "true_rul": 116.0,
                "predicted_rul": 69.37564949571606
              },
              {
                "cycle": 156,
                "true_rul": 115.0,
                "predicted_rul": 63.83215449985619
              },
              {
                "cycle": 157,
                "true_rul": 114.0,
                "predicted_rul": 67.38550873175154
              },
              {
                "cycle": 158,
                "true_rul": 113.0,
                "predicted_rul": 69.40560489938616
              },
              {
                "cycle": 159,
                "true_rul": 112.0,
                "predicted_rul": 71.96869454937769
              },
              {
                "cycle": 160,
                "true_rul": 111.0,
                "predicted_rul": 76.45886663821511
              },
              {
                "cycle": 161,
                "true_rul": 110.0,
                "predicted_rul": 72.612705300784
              },
              {
                "cycle": 162,
                "true_rul": 109.0,
                "predicted_rul": 68.82910474909295
              },
              {
                "cycle": 163,
                "true_rul": 108.0,
                "predicted_rul": 70.05266088147437
              },
              {
                "cycle": 164,
                "true_rul": 107.0,
                "predicted_rul": 59.515482919572605
              },
              {
                "cycle": 165,
                "true_rul": 106.0,
                "predicted_rul": 65.26443775366351
              }
            ]
          },
          {
            "unit_number": 4,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 59.898180690830486
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 92.40758676963196
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 100.04271314771904
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 100.42995143710323
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 107.90109046681937
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 108.55600455643435
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 122.24623401247482
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 118.15908021740688
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 94.86103972907222
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 86.7976620742993
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 87.71749408818323
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 89.49763202301256
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 89.23665541518676
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 89.80754542304385
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 91.82938205821847
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 90.76509065242863
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 93.50613978505316
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 91.76717294957052
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 108.30067026536562
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 98.03601462630104
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 98.0832687458169
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 103.82344864480547
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 101.73341859155153
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 94.80739385337438
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 99.19139747061854
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 97.79624394628445
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 98.03907761129813
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 97.33020222149389
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 100.06087355644377
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 92.9458969631014
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 88.14695208682497
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 89.35892084879742
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 89.89607822977996
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 96.92646622478242
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 96.46065433723925
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 92.66067317885427
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 89.28733818652654
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 94.36086802914724
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 93.98012478297824
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 91.59953170930203
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 93.88901460657144
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 92.89366819123279
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 100.92416479936946
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 99.09242713651656
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 101.35767048871094
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 102.07571044206452
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 100.75914123002076
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 95.22255799974118
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 101.11823571415152
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 95.33850308638102
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 92.93962370268491
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 86.36888241431006
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 83.59509232546043
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 85.43357987299896
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 79.39452537250872
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 90.11567165659653
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 83.1651673886081
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 83.60759261737621
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 85.36549939100587
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 87.65813601436821
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 90.15888570146672
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 92.50893601956886
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 94.29321295563204
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 91.49053375358562
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 93.67195867874761
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 93.96747302492622
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 89.4492991547886
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 90.71447094112045
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 80.98391073876883
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 87.09297979697658
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 86.76659000049222
              },
              {
                "cycle": 72,
                "true_rul": 124.0,
                "predicted_rul": 86.92188330806312
              },
              {
                "cycle": 73,
                "true_rul": 123.0,
                "predicted_rul": 84.38298898564244
              },
              {
                "cycle": 74,
                "true_rul": 122.0,
                "predicted_rul": 88.65847417630539
              },
              {
                "cycle": 75,
                "true_rul": 121.0,
                "predicted_rul": 84.85693625687964
              },
              {
                "cycle": 76,
                "true_rul": 120.0,
                "predicted_rul": 82.58514644862953
              },
              {
                "cycle": 77,
                "true_rul": 119.0,
                "predicted_rul": 91.03158535400871
              },
              {
                "cycle": 78,
                "true_rul": 118.0,
                "predicted_rul": 96.43861711898717
              },
              {
                "cycle": 79,
                "true_rul": 117.0,
                "predicted_rul": 98.51515636971453
              },
              {
                "cycle": 80,
                "true_rul": 116.0,
                "predicted_rul": 90.03763550484473
              },
              {
                "cycle": 81,
                "true_rul": 115.0,
                "predicted_rul": 88.4038147220308
              },
              {
                "cycle": 82,
                "true_rul": 114.0,
                "predicted_rul": 87.88395061871051
              },
              {
                "cycle": 83,
                "true_rul": 113.0,
                "predicted_rul": 83.89654551892636
              },
              {
                "cycle": 84,
                "true_rul": 112.0,
                "predicted_rul": 76.12756585185161
              },
              {
                "cycle": 85,
                "true_rul": 111.0,
                "predicted_rul": 82.61183041355252
              },
              {
                "cycle": 86,
                "true_rul": 110.0,
                "predicted_rul": 77.3562918641037
              }
            ]
          },
          {
            "unit_number": 5,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 171.6035287063587
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 206.2019203119562
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 189.03007181473004
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 166.60130367570855
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 127.33975014692078
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 133.69255323319885
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 145.39746992748587
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 137.67920944317848
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 133.69306376157874
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 137.06725097719573
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 132.28016995399412
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 129.52431080629322
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 128.855365042411
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 126.99334390003423
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 130.31794456579155
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 126.72059963255379
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 130.13957627006312
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 124.68697901791529
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 119.27880542545427
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 124.65405337953052
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 121.35579623157537
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 115.46416460162618
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 111.10554444872832
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 108.60827290266752
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 114.52355274113143
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 106.65210540565022
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 105.76284964314618
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 101.20656745497945
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 97.04340518816207
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 92.76400827191537
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 94.818755217113
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 94.79079818799983
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 90.68818806691343
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 97.49588430656331
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 98.61510061637637
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 97.94321512569513
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 96.45955546211735
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 99.74587843878362
              },
              {
                "cycle": 39,
                "true_rul": 124.0,
                "predicted_rul": 92.4425807900916
              },
              {
                "cycle": 40,
                "true_rul": 123.0,
                "predicted_rul": 96.46731771215127
              },
              {
                "cycle": 41,
                "true_rul": 122.0,
                "predicted_rul": 96.9731901063351
              },
              {
                "cycle": 42,
                "true_rul": 121.0,
                "predicted_rul": 93.42000094797368
              },
              {
                "cycle": 43,
                "true_rul": 120.0,
                "predicted_rul": 88.76351311019789
              },
              {
                "cycle": 44,
                "true_rul": 119.0,
                "predicted_rul": 83.66095944329572
              },
              {
                "cycle": 45,
                "true_rul": 118.0,
                "predicted_rul": 84.38913201684045
              },
              {
                "cycle": 46,
                "true_rul": 117.0,
                "predicted_rul": 86.19436352848788
              },
              {
                "cycle": 47,
                "true_rul": 116.0,
                "predicted_rul": 86.14949575749597
              },
              {
                "cycle": 48,
                "true_rul": 115.0,
                "predicted_rul": 84.6932694097759
              },
              {
                "cycle": 49,
                "true_rul": 114.0,
                "predicted_rul": 88.43380007264568
              },
              {
                "cycle": 50,
                "true_rul": 113.0,
                "predicted_rul": 92.06945164856734
              },
              {
                "cycle": 51,
                "true_rul": 112.0,
                "predicted_rul": 86.06793149597979
              },
              {
                "cycle": 52,
                "true_rul": 111.0,
                "predicted_rul": 87.59485189561201
              },
              {
                "cycle": 53,
                "true_rul": 110.0,
                "predicted_rul": 87.28485289666241
              },
              {
                "cycle": 54,
                "true_rul": 109.0,
                "predicted_rul": 93.3826675961227
              },
              {
                "cycle": 55,
                "true_rul": 108.0,
                "predicted_rul": 94.82757640502496
              },
              {
                "cycle": 56,
                "true_rul": 107.0,
                "predicted_rul": 98.12574697084528
              },
              {
                "cycle": 57,
                "true_rul": 106.0,
                "predicted_rul": 102.0182867140029
              },
              {
                "cycle": 58,
                "true_rul": 105.0,
                "predicted_rul": 105.35212590424089
              },
              {
                "cycle": 59,
                "true_rul": 104.0,
                "predicted_rul": 102.01835755491084
              },
              {
                "cycle": 60,
                "true_rul": 103.0,
                "predicted_rul": 94.42269925912296
              },
              {
                "cycle": 61,
                "true_rul": 102.0,
                "predicted_rul": 91.93544172458132
              },
              {
                "cycle": 62,
                "true_rul": 101.0,
                "predicted_rul": 94.6309190220054
              },
              {
                "cycle": 63,
                "true_rul": 100.0,
                "predicted_rul": 104.20737502237534
              },
              {
                "cycle": 64,
                "true_rul": 99.0,
                "predicted_rul": 101.04167171462905
              },
              {
                "cycle": 65,
                "true_rul": 98.0,
                "predicted_rul": 102.28948221322935
              },
              {
                "cycle": 66,
                "true_rul": 97.0,
                "predicted_rul": 93.64526603009472
              },
              {
                "cycle": 67,
                "true_rul": 96.0,
                "predicted_rul": 94.159358000883
              },
              {
                "cycle": 68,
                "true_rul": 95.0,
                "predicted_rul": 89.58344203762499
              },
              {
                "cycle": 69,
                "true_rul": 94.0,
                "predicted_rul": 94.9213954274419
              },
              {
                "cycle": 70,
                "true_rul": 93.0,
                "predicted_rul": 86.87302021734286
              },
              {
                "cycle": 71,
                "true_rul": 92.0,
                "predicted_rul": 84.28263204414543
              },
              {
                "cycle": 72,
                "true_rul": 91.0,
                "predicted_rul": 89.66633139791884
              },
              {
                "cycle": 73,
                "true_rul": 90.0,
                "predicted_rul": 85.42553216059059
              },
              {
                "cycle": 74,
                "true_rul": 89.0,
                "predicted_rul": 81.36337098648801
              },
              {
                "cycle": 75,
                "true_rul": 88.0,
                "predicted_rul": 86.92298373109043
              },
              {
                "cycle": 76,
                "true_rul": 87.0,
                "predicted_rul": 87.09906177418088
              },
              {
                "cycle": 77,
                "true_rul": 86.0,
                "predicted_rul": 84.33969927871112
              },
              {
                "cycle": 78,
                "true_rul": 85.0,
                "predicted_rul": 83.99671856370696
              },
              {
                "cycle": 79,
                "true_rul": 84.0,
                "predicted_rul": 81.15484785579065
              },
              {
                "cycle": 80,
                "true_rul": 83.0,
                "predicted_rul": 80.29318225951465
              },
              {
                "cycle": 81,
                "true_rul": 82.0,
                "predicted_rul": 76.51401832639021
              },
              {
                "cycle": 82,
                "true_rul": 81.0,
                "predicted_rul": 75.61027138546888
              },
              {
                "cycle": 83,
                "true_rul": 80.0,
                "predicted_rul": 74.26718468134823
              },
              {
                "cycle": 84,
                "true_rul": 79.0,
                "predicted_rul": 76.34368181679383
              },
              {
                "cycle": 85,
                "true_rul": 78.0,
                "predicted_rul": 80.51827963293181
              },
              {
                "cycle": 86,
                "true_rul": 77.0,
                "predicted_rul": 81.52364978604237
              },
              {
                "cycle": 87,
                "true_rul": 76.0,
                "predicted_rul": 80.17728245833132
              },
              {
                "cycle": 88,
                "true_rul": 75.0,
                "predicted_rul": 73.89231098989694
              },
              {
                "cycle": 89,
                "true_rul": 74.0,
                "predicted_rul": 67.93909497911227
              },
              {
                "cycle": 90,
                "true_rul": 73.0,
                "predicted_rul": 71.77231459933864
              },
              {
                "cycle": 91,
                "true_rul": 72.0,
                "predicted_rul": 77.25206887167951
              },
              {
                "cycle": 92,
                "true_rul": 71.0,
                "predicted_rul": 76.94007419929403
              },
              {
                "cycle": 93,
                "true_rul": 70.0,
                "predicted_rul": 79.54430720654818
              },
              {
                "cycle": 94,
                "true_rul": 69.0,
                "predicted_rul": 87.63522352439395
              },
              {
                "cycle": 95,
                "true_rul": 68.0,
                "predicted_rul": 85.69515005373796
              },
              {
                "cycle": 96,
                "true_rul": 67.0,
                "predicted_rul": 83.40522167541712
              },
              {
                "cycle": 97,
                "true_rul": 66.0,
                "predicted_rul": 82.27096872215225
              },
              {
                "cycle": 98,
                "true_rul": 65.0,
                "predicted_rul": 80.31055955076044
              },
              {
                "cycle": 99,
                "true_rul": 64.0,
                "predicted_rul": 82.24213877898183
              },
              {
                "cycle": 100,
                "true_rul": 63.0,
                "predicted_rul": 88.94265975901908
              },
              {
                "cycle": 101,
                "true_rul": 62.0,
                "predicted_rul": 88.31387093974263
              },
              {
                "cycle": 102,
                "true_rul": 61.0,
                "predicted_rul": 82.75933556373639
              },
              {
                "cycle": 103,
                "true_rul": 60.0,
                "predicted_rul": 87.05057625018708
              },
              {
                "cycle": 104,
                "true_rul": 59.0,
                "predicted_rul": 81.15940394677455
              },
              {
                "cycle": 105,
                "true_rul": 58.0,
                "predicted_rul": 80.50058601309138
              },
              {
                "cycle": 106,
                "true_rul": 57.0,
                "predicted_rul": 79.79873462433534
              },
              {
                "cycle": 107,
                "true_rul": 56.0,
                "predicted_rul": 77.4937889077737
              },
              {
                "cycle": 108,
                "true_rul": 55.0,
                "predicted_rul": 79.7893937814988
              },
              {
                "cycle": 109,
                "true_rul": 54.0,
                "predicted_rul": 77.19985895603168
              },
              {
                "cycle": 110,
                "true_rul": 53.0,
                "predicted_rul": 75.32134867855348
              },
              {
                "cycle": 111,
                "true_rul": 52.0,
                "predicted_rul": 79.99954198745581
              },
              {
                "cycle": 112,
                "true_rul": 51.0,
                "predicted_rul": 82.89402187567248
              },
              {
                "cycle": 113,
                "true_rul": 50.0,
                "predicted_rul": 78.62219388475023
              },
              {
                "cycle": 114,
                "true_rul": 49.0,
                "predicted_rul": 77.20375721916753
              },
              {
                "cycle": 115,
                "true_rul": 48.0,
                "predicted_rul": 67.51955001357965
              },
              {
                "cycle": 116,
                "true_rul": 47.0,
                "predicted_rul": 69.20030193727325
              },
              {
                "cycle": 117,
                "true_rul": 46.0,
                "predicted_rul": 77.37085725694669
              },
              {
                "cycle": 118,
                "true_rul": 45.0,
                "predicted_rul": 70.306428023845
              },
              {
                "cycle": 119,
                "true_rul": 44.0,
                "predicted_rul": 62.4384147474575
              },
              {
                "cycle": 120,
                "true_rul": 43.0,
                "predicted_rul": 64.43462636500044
              },
              {
                "cycle": 121,
                "true_rul": 42.0,
                "predicted_rul": 67.25174217788299
              },
              {
                "cycle": 122,
                "true_rul": 41.0,
                "predicted_rul": 62.72215613744265
              },
              {
                "cycle": 123,
                "true_rul": 40.0,
                "predicted_rul": 61.706565973441684
              },
              {
                "cycle": 124,
                "true_rul": 39.0,
                "predicted_rul": 63.85624932881001
              },
              {
                "cycle": 125,
                "true_rul": 38.0,
                "predicted_rul": 63.290916488873336
              },
              {
                "cycle": 126,
                "true_rul": 37.0,
                "predicted_rul": 66.61492207778247
              },
              {
                "cycle": 127,
                "true_rul": 36.0,
                "predicted_rul": 51.98647375143264
              },
              {
                "cycle": 128,
                "true_rul": 35.0,
                "predicted_rul": 56.38325863460159
              },
              {
                "cycle": 129,
                "true_rul": 34.0,
                "predicted_rul": 53.00878477533479
              },
              {
                "cycle": 130,
                "true_rul": 33.0,
                "predicted_rul": 55.43855593566332
              },
              {
                "cycle": 131,
                "true_rul": 32.0,
                "predicted_rul": 58.07073407643111
              },
              {
                "cycle": 132,
                "true_rul": 31.0,
                "predicted_rul": 59.45117127193771
              },
              {
                "cycle": 133,
                "true_rul": 30.0,
                "predicted_rul": 51.612413106586246
              },
              {
                "cycle": 134,
                "true_rul": 29.0,
                "predicted_rul": 55.122138873946824
              },
              {
                "cycle": 135,
                "true_rul": 28.0,
                "predicted_rul": 55.735372967516014
              },
              {
                "cycle": 136,
                "true_rul": 27.0,
                "predicted_rul": 59.14986204291927
              },
              {
                "cycle": 137,
                "true_rul": 26.0,
                "predicted_rul": 56.779498099211196
              },
              {
                "cycle": 138,
                "true_rul": 25.0,
                "predicted_rul": 49.3566406348491
              },
              {
                "cycle": 139,
                "true_rul": 24.0,
                "predicted_rul": 45.2257990306025
              },
              {
                "cycle": 140,
                "true_rul": 23.0,
                "predicted_rul": 41.00133315354469
              },
              {
                "cycle": 141,
                "true_rul": 22.0,
                "predicted_rul": 29.892536965757245
              },
              {
                "cycle": 142,
                "true_rul": 21.0,
                "predicted_rul": 33.49432429678927
              },
              {
                "cycle": 143,
                "true_rul": 20.0,
                "predicted_rul": 28.063064940630284
              },
              {
                "cycle": 144,
                "true_rul": 19.0,
                "predicted_rul": 28.570920078722338
              },
              {
                "cycle": 145,
                "true_rul": 18.0,
                "predicted_rul": 23.41810173196245
              },
              {
                "cycle": 146,
                "true_rul": 17.0,
                "predicted_rul": 15.823521108235582
              },
              {
                "cycle": 147,
                "true_rul": 16.0,
                "predicted_rul": 22.05770334511908
              },
              {
                "cycle": 148,
                "true_rul": 15.0,
                "predicted_rul": 18.50044390837502
              }
            ]
          },
          {
            "unit_number": 6,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 163.48818674979339
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 132.67596513793433
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 148.41576964481828
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 132.90962821071298
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 132.14784170803432
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 128.29277104915673
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 119.29573495897057
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 117.54515412453657
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 114.78599897199092
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 118.91784091766567
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 110.4559858459179
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 107.0683360239309
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 111.35660498277502
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 106.39321806533917
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 105.2249605478828
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 113.42424518367989
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 108.70489677837213
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 108.48225487106174
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 109.07651544498913
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 110.71428640445811
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 116.17417742220096
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 118.99863369783998
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 118.56993057700492
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 104.9480287250608
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 107.51137986287722
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 101.56942704452558
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 93.65483365838372
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 97.33686540442432
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 98.42871103048674
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 102.64445197881469
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 102.09465517944591
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 102.86641028454505
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 100.22958843551896
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 100.44119651558503
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 103.5083260881056
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 97.45944281772972
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 96.83691152655592
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 90.3800087343916
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 89.50800870166677
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 89.01186616284213
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 90.67647424634197
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 94.39560268278365
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 100.36512834377754
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 98.60022945477249
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 96.18633662114735
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 94.7997771919363
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 85.86148120746111
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 86.42998714539681
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 92.21679793315343
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 89.52120908608958
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 88.09946905728066
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 90.32546749959693
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 86.88141870176878
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 88.69206905866668
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 80.57726120796724
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 81.97538421148056
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 86.68356689887878
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 93.96781081794506
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 94.03386329362729
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 95.68723795202095
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 93.81910673374841
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 96.89089960053025
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 97.4839663215007
              }
            ]
          },
          {
            "unit_number": 7,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 97.64691659480377
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 124.36548321388727
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 120.85015733145337
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 112.50432653611097
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 99.02986732746103
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 104.48017965777763
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 116.2950749318261
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 120.5204502836732
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 120.93698730242795
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 117.26725848015849
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 115.48899060648546
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 113.83129264816671
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 113.58643165607464
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 120.06730784935644
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 122.76230916060013
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 120.94771636884616
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 121.66576661308318
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 119.05164760822845
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 125.13689897235054
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 121.6019933897096
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 119.04480904278353
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 118.48779040032241
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 120.71312043513535
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 119.99543713866296
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 118.87405742327246
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 116.05950737055173
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 111.01813818432856
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 109.92590841995661
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 113.28265697618008
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 110.21463417034101
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 111.69953918984902
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 112.0498934292682
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 103.77498750330778
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 104.38776511808828
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 103.97314752495367
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 107.95860698968136
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 116.62734602815726
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 121.60408014125096
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 118.29299106867802
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 122.22781287118414
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 122.5687267044068
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 124.16206983748998
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 126.23725456266766
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 126.59625326605055
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 130.9377309299016
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 127.55693667413834
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 136.07863190987518
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 134.11771535861772
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 127.67959129304472
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 126.01434260073256
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 126.72021069641232
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 129.8813061382716
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 127.31179785679888
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 125.79574436457187
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 118.04019934986536
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 109.56747015929068
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 115.20000511998296
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 102.46355016456619
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 104.01493491346628
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 99.42673281836323
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 101.36648736967618
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 99.38651594734074
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 99.6415185345104
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 96.81796852519619
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 101.98883444700368
              },
              {
                "cycle": 66,
                "true_rul": 124.0,
                "predicted_rul": 103.09624237628486
              },
              {
                "cycle": 67,
                "true_rul": 123.0,
                "predicted_rul": 101.4349141434559
              },
              {
                "cycle": 68,
                "true_rul": 122.0,
                "predicted_rul": 107.3399364420693
              },
              {
                "cycle": 69,
                "true_rul": 121.0,
                "predicted_rul": 105.72590377257984
              },
              {
                "cycle": 70,
                "true_rul": 120.0,
                "predicted_rul": 105.62272179241336
              },
              {
                "cycle": 71,
                "true_rul": 119.0,
                "predicted_rul": 106.27466752695
              },
              {
                "cycle": 72,
                "true_rul": 118.0,
                "predicted_rul": 98.39811504401769
              },
              {
                "cycle": 73,
                "true_rul": 117.0,
                "predicted_rul": 100.66012214534567
              },
              {
                "cycle": 74,
                "true_rul": 116.0,
                "predicted_rul": 97.42002501652314
              },
              {
                "cycle": 75,
                "true_rul": 115.0,
                "predicted_rul": 96.33726500333069
              },
              {
                "cycle": 76,
                "true_rul": 114.0,
                "predicted_rul": 96.09771258170076
              },
              {
                "cycle": 77,
                "true_rul": 113.0,
                "predicted_rul": 93.47754449221247
              },
              {
                "cycle": 78,
                "true_rul": 112.0,
                "predicted_rul": 96.45510833962362
              },
              {
                "cycle": 79,
                "true_rul": 111.0,
                "predicted_rul": 91.39682031901248
              },
              {
                "cycle": 80,
                "true_rul": 110.0,
                "predicted_rul": 93.10208611689268
              },
              {
                "cycle": 81,
                "true_rul": 109.0,
                "predicted_rul": 89.06257639527757
              },
              {
                "cycle": 82,
                "true_rul": 108.0,
                "predicted_rul": 93.22356773895626
              },
              {
                "cycle": 83,
                "true_rul": 107.0,
                "predicted_rul": 91.35141103757996
              },
              {
                "cycle": 84,
                "true_rul": 106.0,
                "predicted_rul": 92.62264912072897
              },
              {
                "cycle": 85,
                "true_rul": 105.0,
                "predicted_rul": 88.45745699386316
              },
              {
                "cycle": 86,
                "true_rul": 104.0,
                "predicted_rul": 94.8681867411633
              },
              {
                "cycle": 87,
                "true_rul": 103.0,
                "predicted_rul": 90.9910709944852
              },
              {
                "cycle": 88,
                "true_rul": 102.0,
                "predicted_rul": 94.27679860235912
              },
              {
                "cycle": 89,
                "true_rul": 101.0,
                "predicted_rul": 91.1512668685209
              },
              {
                "cycle": 90,
                "true_rul": 100.0,
                "predicted_rul": 84.67057521301831
              },
              {
                "cycle": 91,
                "true_rul": 99.0,
                "predicted_rul": 85.75043184298374
              },
              {
                "cycle": 92,
                "true_rul": 98.0,
                "predicted_rul": 82.58644312348042
              },
              {
                "cycle": 93,
                "true_rul": 97.0,
                "predicted_rul": 84.71852812036741
              },
              {
                "cycle": 94,
                "true_rul": 96.0,
                "predicted_rul": 81.97315875049026
              },
              {
                "cycle": 95,
                "true_rul": 95.0,
                "predicted_rul": 80.92998229592376
              },
              {
                "cycle": 96,
                "true_rul": 94.0,
                "predicted_rul": 77.6783893614629
              },
              {
                "cycle": 97,
                "true_rul": 93.0,
                "predicted_rul": 76.77864153816518
              },
              {
                "cycle": 98,
                "true_rul": 92.0,
                "predicted_rul": 76.27647704070114
              },
              {
                "cycle": 99,
                "true_rul": 91.0,
                "predicted_rul": 75.63252747322986
              },
              {
                "cycle": 100,
                "true_rul": 90.0,
                "predicted_rul": 78.01064123017386
              },
              {
                "cycle": 101,
                "true_rul": 89.0,
                "predicted_rul": 76.49737986660693
              },
              {
                "cycle": 102,
                "true_rul": 88.0,
                "predicted_rul": 71.18365139913658
              },
              {
                "cycle": 103,
                "true_rul": 87.0,
                "predicted_rul": 74.37544308607721
              },
              {
                "cycle": 104,
                "true_rul": 86.0,
                "predicted_rul": 74.66323880556229
              },
              {
                "cycle": 105,
                "true_rul": 85.0,
                "predicted_rul": 77.36982738458391
              },
              {
                "cycle": 106,
                "true_rul": 84.0,
                "predicted_rul": 83.34561979137652
              },
              {
                "cycle": 107,
                "true_rul": 83.0,
                "predicted_rul": 79.13084501989579
              },
              {
                "cycle": 108,
                "true_rul": 82.0,
                "predicted_rul": 77.26427501010403
              },
              {
                "cycle": 109,
                "true_rul": 81.0,
                "predicted_rul": 78.47897346203536
              },
              {
                "cycle": 110,
                "true_rul": 80.0,
                "predicted_rul": 75.98811743026272
              },
              {
                "cycle": 111,
                "true_rul": 79.0,
                "predicted_rul": 74.69803979224525
              },
              {
                "cycle": 112,
                "true_rul": 78.0,
                "predicted_rul": 75.97708677933406
              },
              {
                "cycle": 113,
                "true_rul": 77.0,
                "predicted_rul": 71.22094047013888
              },
              {
                "cycle": 114,
                "true_rul": 76.0,
                "predicted_rul": 69.01445846313072
              },
              {
                "cycle": 115,
                "true_rul": 75.0,
                "predicted_rul": 70.24927482501516
              },
              {
                "cycle": 116,
                "true_rul": 74.0,
                "predicted_rul": 81.54043103938784
              },
              {
                "cycle": 117,
                "true_rul": 73.0,
                "predicted_rul": 83.0952352910681
              },
              {
                "cycle": 118,
                "true_rul": 72.0,
                "predicted_rul": 82.2485969532463
              },
              {
                "cycle": 119,
                "true_rul": 71.0,
                "predicted_rul": 87.34649271950366
              },
              {
                "cycle": 120,
                "true_rul": 70.0,
                "predicted_rul": 87.17562349232867
              },
              {
                "cycle": 121,
                "true_rul": 69.0,
                "predicted_rul": 76.98373487795288
              },
              {
                "cycle": 122,
                "true_rul": 68.0,
                "predicted_rul": 74.11606287284849
              },
              {
                "cycle": 123,
                "true_rul": 67.0,
                "predicted_rul": 74.05646495902874
              },
              {
                "cycle": 124,
                "true_rul": 66.0,
                "predicted_rul": 78.52348647246617
              },
              {
                "cycle": 125,
                "true_rul": 65.0,
                "predicted_rul": 74.02302029508064
              },
              {
                "cycle": 126,
                "true_rul": 64.0,
                "predicted_rul": 72.47119308001493
              },
              {
                "cycle": 127,
                "true_rul": 63.0,
                "predicted_rul": 70.40048754461714
              },
              {
                "cycle": 128,
                "true_rul": 62.0,
                "predicted_rul": 70.40190157292272
              },
              {
                "cycle": 129,
                "true_rul": 61.0,
                "predicted_rul": 70.49321600156509
              },
              {
                "cycle": 130,
                "true_rul": 60.0,
                "predicted_rul": 68.75566015314689
              },
              {
                "cycle": 131,
                "true_rul": 59.0,
                "predicted_rul": 66.30680456758637
              },
              {
                "cycle": 132,
                "true_rul": 58.0,
                "predicted_rul": 70.60296758713594
              },
              {
                "cycle": 133,
                "true_rul": 57.0,
                "predicted_rul": 74.65242196530016
              },
              {
                "cycle": 134,
                "true_rul": 56.0,
                "predicted_rul": 69.1089065116812
              },
              {
                "cycle": 135,
                "true_rul": 55.0,
                "predicted_rul": 67.70160460350053
              },
              {
                "cycle": 136,
                "true_rul": 54.0,
                "predicted_rul": 65.67824621236832
              },
              {
                "cycle": 137,
                "true_rul": 53.0,
                "predicted_rul": 62.79790063105247
              },
              {
                "cycle": 138,
                "true_rul": 52.0,
                "predicted_rul": 61.9300360350062
              },
              {
                "cycle": 139,
                "true_rul": 51.0,
                "predicted_rul": 59.49301428196486
              },
              {
                "cycle": 140,
                "true_rul": 50.0,
                "predicted_rul": 57.32226290903964
              },
              {
                "cycle": 141,
                "true_rul": 49.0,
                "predicted_rul": 58.068177040910086
              },
              {
                "cycle": 142,
                "true_rul": 48.0,
                "predicted_rul": 61.31037034187102
              },
              {
                "cycle": 143,
                "true_rul": 47.0,
                "predicted_rul": 65.9402368483552
              },
              {
                "cycle": 144,
                "true_rul": 46.0,
                "predicted_rul": 44.36961426832386
              },
              {
                "cycle": 145,
                "true_rul": 45.0,
                "predicted_rul": 51.71609368923055
              },
              {
                "cycle": 146,
                "true_rul": 44.0,
                "predicted_rul": 46.11317283585595
              },
              {
                "cycle": 147,
                "true_rul": 43.0,
                "predicted_rul": 33.840936299913665
              },
              {
                "cycle": 148,
                "true_rul": 42.0,
                "predicted_rul": 42.60714231144266
              },
              {
                "cycle": 149,
                "true_rul": 41.0,
                "predicted_rul": 39.287549484623014
              },
              {
                "cycle": 150,
                "true_rul": 40.0,
                "predicted_rul": 29.496649335123948
              },
              {
                "cycle": 151,
                "true_rul": 39.0,
                "predicted_rul": 22.346205131598254
              },
              {
                "cycle": 152,
                "true_rul": 38.0,
                "predicted_rul": 20.672762986905582
              },
              {
                "cycle": 153,
                "true_rul": 37.0,
                "predicted_rul": 18.554606801388218
              },
              {
                "cycle": 154,
                "true_rul": 36.0,
                "predicted_rul": 25.330925238189593
              },
              {
                "cycle": 155,
                "true_rul": 35.0,
                "predicted_rul": 31.60513182945033
              },
              {
                "cycle": 156,
                "true_rul": 34.0,
                "predicted_rul": 24.324413759904928
              },
              {
                "cycle": 157,
                "true_rul": 33.0,
                "predicted_rul": 19.777095792736873
              },
              {
                "cycle": 158,
                "true_rul": 32.0,
                "predicted_rul": 20.90115854594478
              },
              {
                "cycle": 159,
                "true_rul": 31.0,
                "predicted_rul": 26.870862106534332
              },
              {
                "cycle": 160,
                "true_rul": 30.0,
                "predicted_rul": 25.15276959378025
              },
              {
                "cycle": 161,
                "true_rul": 29.0,
                "predicted_rul": 20.483602597323625
              },
              {
                "cycle": 162,
                "true_rul": 28.0,
                "predicted_rul": 21.647087396488132
              },
              {
                "cycle": 163,
                "true_rul": 27.0,
                "predicted_rul": 24.001216467086124
              },
              {
                "cycle": 164,
                "true_rul": 26.0,
                "predicted_rul": 27.41640951829504
              },
              {
                "cycle": 165,
                "true_rul": 25.0,
                "predicted_rul": 23.08420160555397
              },
              {
                "cycle": 166,
                "true_rul": 24.0,
                "predicted_rul": 22.3658785495536
              },
              {
                "cycle": 167,
                "true_rul": 23.0,
                "predicted_rul": 26.017802324035074
              },
              {
                "cycle": 168,
                "true_rul": 22.0,
                "predicted_rul": 29.51458484282739
              },
              {
                "cycle": 169,
                "true_rul": 21.0,
                "predicted_rul": 24.742600660209064
              },
              {
                "cycle": 170,
                "true_rul": 20.0,
                "predicted_rul": 14.858136269564056
              },
              {
                "cycle": 171,
                "true_rul": 19.0,
                "predicted_rul": 18.866396319497653
              },
              {
                "cycle": 172,
                "true_rul": 18.0,
                "predicted_rul": 21.240757290415786
              },
              {
                "cycle": 173,
                "true_rul": 17.0,
                "predicted_rul": 26.311281461392355
              },
              {
                "cycle": 174,
                "true_rul": 16.0,
                "predicted_rul": 13.364555375741475
              },
              {
                "cycle": 175,
                "true_rul": 15.0,
                "predicted_rul": 9.002803896157275
              },
              {
                "cycle": 176,
                "true_rul": 14.0,
                "predicted_rul": 9.781852681351666
              },
              {
                "cycle": 177,
                "true_rul": 13.0,
                "predicted_rul": 10.358369321409555
              },
              {
                "cycle": 178,
                "true_rul": 12.0,
                "predicted_rul": 12.181739218180155
              },
              {
                "cycle": 179,
                "true_rul": 11.0,
                "predicted_rul": 7.251494167494457
              },
              {
                "cycle": 180,
                "true_rul": 10.0,
                "predicted_rul": -7.456263599397062
              },
              {
                "cycle": 181,
                "true_rul": 9.0,
                "predicted_rul": -6.088116162431106
              },
              {
                "cycle": 182,
                "true_rul": 8.0,
                "predicted_rul": -6.926193772209444
              },
              {
                "cycle": 183,
                "true_rul": 7.0,
                "predicted_rul": -21.526167249454375
              },
              {
                "cycle": 184,
                "true_rul": 6.0,
                "predicted_rul": -15.101209295395165
              }
            ]
          },
          {
            "unit_number": 8,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 140.31876855783958
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 124.84418284636558
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 62.78156183622559
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 85.30443429929073
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 103.00606133451402
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 99.68599445739892
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 103.44370818191601
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 103.67108763265969
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 104.00595067813447
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 105.05381011277314
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 114.87689146808589
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 112.58872278456693
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 108.5236681333954
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 103.26254055854224
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 107.43786365223241
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 107.40985746886872
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 111.56735641885462
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 109.48751017870018
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 110.04141652751787
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 104.67970590779805
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 106.75646323267938
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 105.32473494486112
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 114.8896347645732
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 113.89702391174797
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 113.3755522465326
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 111.04121794358798
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 112.48408095752711
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 113.98593056351092
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 117.0748482047311
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 113.40614736570569
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 112.73674685035257
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 115.82485591003933
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 113.90271559319444
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 123.58319779553676
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 111.55170596565767
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 116.59721560455728
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 107.17808786576097
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 113.63088782116938
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 109.24818561561369
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 100.52612099576618
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 102.88328208468374
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 108.69778172105543
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 111.92798740296712
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 108.04402860815753
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 106.91374368180368
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 111.66352451938292
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 108.85389775213116
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 111.48932058406353
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 109.11428211432212
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 113.64906297922789
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 114.43649746648953
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 122.27607228236411
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 117.33705728835776
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 117.87990894273753
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 122.31526765877243
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 124.53460953398098
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 119.83058289189466
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 121.11579718828034
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 117.49300813814625
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 107.51577684513359
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 115.14525183443038
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 114.38243901043643
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 112.74128465479407
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 118.36720637276449
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 117.96071872515495
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 111.28099682370521
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 108.97560250466631
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 107.18688939493404
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 99.81835288819093
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 95.69554449252973
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 97.79029849517428
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 97.02628793699478
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 98.43404196087067
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 100.37746783172406
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 105.71052488721034
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 110.79605473310221
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 112.07381127642839
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 109.70907954347786
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 109.3234710106899
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 101.5788181881544
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 98.05243299527137
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 98.59184427472064
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 100.38568482190203
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 99.55161313821736
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 105.45527621407382
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 98.76547007834415
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 99.65032670420442
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 97.57245397012412
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 94.47501325441954
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 96.87172798385836
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 96.38123782849289
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 99.39283559410433
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 95.48473934510912
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 98.72158154543649
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 98.03972924396658
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 91.29971005873631
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 93.92802985779053
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 102.31149008317152
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 103.71761039990815
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 105.30543013178794
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 108.36926090321322
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 107.25030075931863
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 124.53713782930936
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 119.53424136764443
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 125.20272973155261
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 125.11926994713212
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 125.20322882155779
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 125.09203093269025
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 128.1899599415956
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 119.37923403750028
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 116.96666567522516
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 116.04149883820719
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 109.11632176095372
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 112.14714207008547
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 107.35212201384275
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 105.35706213229605
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 100.9659550641536
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 98.56330033726044
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 101.87665486604601
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 94.80985422896447
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 101.74793417703768
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 109.02735786276207
              },
              {
                "cycle": 123,
                "true_rul": 125.0,
                "predicted_rul": 111.25506054223843
              },
              {
                "cycle": 124,
                "true_rul": 125.0,
                "predicted_rul": 113.98981527724027
              },
              {
                "cycle": 125,
                "true_rul": 125.0,
                "predicted_rul": 106.46437239738952
              },
              {
                "cycle": 126,
                "true_rul": 125.0,
                "predicted_rul": 98.0875538813616
              },
              {
                "cycle": 127,
                "true_rul": 125.0,
                "predicted_rul": 99.630114564814
              },
              {
                "cycle": 128,
                "true_rul": 125.0,
                "predicted_rul": 94.88894502289804
              },
              {
                "cycle": 129,
                "true_rul": 125.0,
                "predicted_rul": 90.39557838259316
              },
              {
                "cycle": 130,
                "true_rul": 125.0,
                "predicted_rul": 88.12155539160267
              },
              {
                "cycle": 131,
                "true_rul": 125.0,
                "predicted_rul": 83.2582981041287
              },
              {
                "cycle": 132,
                "true_rul": 125.0,
                "predicted_rul": 92.43257398630885
              },
              {
                "cycle": 133,
                "true_rul": 125.0,
                "predicted_rul": 86.42481898975893
              },
              {
                "cycle": 134,
                "true_rul": 125.0,
                "predicted_rul": 93.71330199323347
              },
              {
                "cycle": 135,
                "true_rul": 125.0,
                "predicted_rul": 90.95336489654983
              },
              {
                "cycle": 136,
                "true_rul": 125.0,
                "predicted_rul": 97.47569324152573
              },
              {
                "cycle": 137,
                "true_rul": 125.0,
                "predicted_rul": 101.13484011148466
              },
              {
                "cycle": 138,
                "true_rul": 125.0,
                "predicted_rul": 100.52757516412203
              },
              {
                "cycle": 139,
                "true_rul": 124.0,
                "predicted_rul": 96.65820594959769
              },
              {
                "cycle": 140,
                "true_rul": 123.0,
                "predicted_rul": 89.84767145125079
              },
              {
                "cycle": 141,
                "true_rul": 122.0,
                "predicted_rul": 92.06680962473001
              },
              {
                "cycle": 142,
                "true_rul": 121.0,
                "predicted_rul": 85.43178919289858
              },
              {
                "cycle": 143,
                "true_rul": 120.0,
                "predicted_rul": 74.7713901764073
              },
              {
                "cycle": 144,
                "true_rul": 119.0,
                "predicted_rul": 72.08489577044747
              },
              {
                "cycle": 145,
                "true_rul": 118.0,
                "predicted_rul": 68.66210716629939
              },
              {
                "cycle": 146,
                "true_rul": 117.0,
                "predicted_rul": 79.6014874391858
              },
              {
                "cycle": 147,
                "true_rul": 116.0,
                "predicted_rul": 86.86663575204693
              },
              {
                "cycle": 148,
                "true_rul": 115.0,
                "predicted_rul": 83.14821149305499
              },
              {
                "cycle": 149,
                "true_rul": 114.0,
                "predicted_rul": 80.02304498320336
              },
              {
                "cycle": 150,
                "true_rul": 113.0,
                "predicted_rul": 78.72653459460162
              },
              {
                "cycle": 151,
                "true_rul": 112.0,
                "predicted_rul": 83.10356112929912
              },
              {
                "cycle": 152,
                "true_rul": 111.0,
                "predicted_rul": 84.26790918446022
              },
              {
                "cycle": 153,
                "true_rul": 110.0,
                "predicted_rul": 85.25213102942871
              },
              {
                "cycle": 154,
                "true_rul": 109.0,
                "predicted_rul": 82.2350470031779
              },
              {
                "cycle": 155,
                "true_rul": 108.0,
                "predicted_rul": 81.91855881370248
              },
              {
                "cycle": 156,
                "true_rul": 107.0,
                "predicted_rul": 80.77204659727613
              },
              {
                "cycle": 157,
                "true_rul": 106.0,
                "predicted_rul": 76.21889139961422
              },
              {
                "cycle": 158,
                "true_rul": 105.0,
                "predicted_rul": 72.59500884141198
              },
              {
                "cycle": 159,
                "true_rul": 104.0,
                "predicted_rul": 71.56678468426071
              },
              {
                "cycle": 160,
                "true_rul": 103.0,
                "predicted_rul": 72.96461800124234
              },
              {
                "cycle": 161,
                "true_rul": 102.0,
                "predicted_rul": 73.17880979948495
              },
              {
                "cycle": 162,
                "true_rul": 101.0,
                "predicted_rul": 72.62128896084505
              },
              {
                "cycle": 163,
                "true_rul": 100.0,
                "predicted_rul": 72.54803833377082
              },
              {
                "cycle": 164,
                "true_rul": 99.0,
                "predicted_rul": 71.84156696338687
              },
              {
                "cycle": 165,
                "true_rul": 98.0,
                "predicted_rul": 77.63174576470556
              },
              {
                "cycle": 166,
                "true_rul": 97.0,
                "predicted_rul": 79.82102003396176
              },
              {
                "cycle": 167,
                "true_rul": 96.0,
                "predicted_rul": 81.05154244551159
              },
              {
                "cycle": 168,
                "true_rul": 95.0,
                "predicted_rul": 80.48645535506876
              },
              {
                "cycle": 169,
                "true_rul": 94.0,
                "predicted_rul": 90.49339366320419
              },
              {
                "cycle": 170,
                "true_rul": 93.0,
                "predicted_rul": 91.69728432550801
              },
              {
                "cycle": 171,
                "true_rul": 92.0,
                "predicted_rul": 91.5542735002764
              },
              {
                "cycle": 172,
                "true_rul": 91.0,
                "predicted_rul": 83.054296425742
              },
              {
                "cycle": 173,
                "true_rul": 90.0,
                "predicted_rul": 79.08364943136439
              }
            ]
          }
        ]
      }
    },
    "FD003": {
      "dataset": "FD003",
      "available_datasets": [
        "FD001",
        "FD002",
        "FD003",
        "FD004"
      ],
      "generated_at": "2026-07-20T13:50:36Z",
      "rul_regression": {
        "dataset_id": "FD003",
        "RMSE": 16.172716066675704,
        "MAE": 12.478744097103297,
        "R2": 0.4876338121978534,
        "lead_time_cycles": 45
      },
      "anomaly_classification": {
        "model_name": "IsolationForest",
        "threshold": 0.9198,
        "F1_Score": 0.0,
        "Accuracy": 0.9966969446738233
      },
      "feature_importance": {
        "features": [
          [
            "sensor_12_expanding_mean",
            41.531726874486196
          ],
          [
            "sensor_7_expanding_mean",
            35.3682698409245
          ],
          [
            "sensor_15_expanding_mean",
            24.05828285947665
          ],
          [
            "sensor_14_expanding_mean",
            12.743332397603915
          ],
          [
            "sensor_13_expanding_mean",
            12.635665643731214
          ]
        ]
      },
      "data_drift": {
        "threshold": 0.2,
        "timestamp": "2026-07-16T10:50:56Z",
        "is_sample": true,
        "features": {
          "sensor_11": {
            "psi": 0.01,
            "status": "stable"
          }
        }
      },
      "rul_trajectories": {
        "is_sample": false,
        "units": [
          {
            "unit_number": "LIVE",
            "life": 81,
            "trajectory": [
              {
                "cycle": 20,
                "predicted_rul": 173090.41
              },
              {
                "cycle": 21,
                "predicted_rul": 173031.41
              },
              {
                "cycle": 22,
                "predicted_rul": 173007.05
              },
              {
                "cycle": 23,
                "predicted_rul": 173190.4
              },
              {
                "cycle": 24,
                "predicted_rul": 173203.9
              },
              {
                "cycle": 25,
                "predicted_rul": 173180.48
              },
              {
                "cycle": 26,
                "predicted_rul": 173072.4
              },
              {
                "cycle": 27,
                "predicted_rul": 173018.22
              },
              {
                "cycle": 28,
                "predicted_rul": 172884.07
              },
              {
                "cycle": 29,
                "predicted_rul": 173089.68
              },
              {
                "cycle": 30,
                "predicted_rul": 172969.42
              },
              {
                "cycle": 31,
                "predicted_rul": 173078.01
              },
              {
                "cycle": 32,
                "predicted_rul": 173305.61
              },
              {
                "cycle": 33,
                "predicted_rul": 173322.45
              },
              {
                "cycle": 34,
                "predicted_rul": 173039.84
              },
              {
                "cycle": 35,
                "predicted_rul": 173121.86
              },
              {
                "cycle": 36,
                "predicted_rul": 172863.7
              },
              {
                "cycle": 37,
                "predicted_rul": 172952.99
              },
              {
                "cycle": 38,
                "predicted_rul": 173164.83
              },
              {
                "cycle": 39,
                "predicted_rul": 172919.8
              },
              {
                "cycle": 40,
                "predicted_rul": 173143.2
              },
              {
                "cycle": 41,
                "predicted_rul": 173162.42
              },
              {
                "cycle": 42,
                "predicted_rul": 173113.07
              },
              {
                "cycle": 43,
                "predicted_rul": 173129.71
              },
              {
                "cycle": 44,
                "predicted_rul": 173124.58
              },
              {
                "cycle": 45,
                "predicted_rul": 173051.18
              },
              {
                "cycle": 46,
                "predicted_rul": 173022.64
              },
              {
                "cycle": 47,
                "predicted_rul": 173018.24
              },
              {
                "cycle": 48,
                "predicted_rul": 173323.17
              },
              {
                "cycle": 49,
                "predicted_rul": 173063.14
              },
              {
                "cycle": 50,
                "predicted_rul": 173012.73
              },
              {
                "cycle": 51,
                "predicted_rul": 173102.99
              },
              {
                "cycle": 52,
                "predicted_rul": 172994.6
              },
              {
                "cycle": 53,
                "predicted_rul": 173156.65
              },
              {
                "cycle": 54,
                "predicted_rul": 173032.69
              },
              {
                "cycle": 55,
                "predicted_rul": 172999.4
              },
              {
                "cycle": 56,
                "predicted_rul": 173216.49
              },
              {
                "cycle": 57,
                "predicted_rul": 172911.81
              },
              {
                "cycle": 58,
                "predicted_rul": 173106.73
              },
              {
                "cycle": 59,
                "predicted_rul": 172961.82
              },
              {
                "cycle": 60,
                "predicted_rul": 173210.69
              },
              {
                "cycle": 61,
                "predicted_rul": 173061.37
              },
              {
                "cycle": 62,
                "predicted_rul": 173112.06
              },
              {
                "cycle": 63,
                "predicted_rul": 173043.6
              },
              {
                "cycle": 64,
                "predicted_rul": 172971.56
              },
              {
                "cycle": 65,
                "predicted_rul": 172997.89
              },
              {
                "cycle": 66,
                "predicted_rul": 173155.55
              },
              {
                "cycle": 67,
                "predicted_rul": 173059.13
              },
              {
                "cycle": 68,
                "predicted_rul": 173006.58
              },
              {
                "cycle": 69,
                "predicted_rul": 173122.98
              },
              {
                "cycle": 70,
                "predicted_rul": 173134.95
              },
              {
                "cycle": 71,
                "predicted_rul": 173115.73
              },
              {
                "cycle": 72,
                "predicted_rul": 173048.55
              },
              {
                "cycle": 73,
                "predicted_rul": 173379.46
              },
              {
                "cycle": 74,
                "predicted_rul": 173179.36
              },
              {
                "cycle": 75,
                "predicted_rul": 173500.65
              },
              {
                "cycle": 76,
                "predicted_rul": 173077.93
              },
              {
                "cycle": 77,
                "predicted_rul": 173089.3
              },
              {
                "cycle": 78,
                "predicted_rul": 173184.48
              },
              {
                "cycle": 79,
                "predicted_rul": 173096.67
              },
              {
                "cycle": 80,
                "predicted_rul": 173206.46
              },
              {
                "cycle": 81,
                "predicted_rul": 173031.6
              },
              {
                "cycle": 82,
                "predicted_rul": 173030.3
              },
              {
                "cycle": 83,
                "predicted_rul": 173204.57
              },
              {
                "cycle": 84,
                "predicted_rul": 172869.91
              },
              {
                "cycle": 85,
                "predicted_rul": 173017.47
              },
              {
                "cycle": 86,
                "predicted_rul": 173133.49
              },
              {
                "cycle": 87,
                "predicted_rul": 173144.76
              },
              {
                "cycle": 88,
                "predicted_rul": 172995.55
              },
              {
                "cycle": 89,
                "predicted_rul": 172813.76
              },
              {
                "cycle": 90,
                "predicted_rul": 173325.14
              },
              {
                "cycle": 91,
                "predicted_rul": 173192.16
              },
              {
                "cycle": 92,
                "predicted_rul": 173038.46
              },
              {
                "cycle": 93,
                "predicted_rul": 172982.27
              },
              {
                "cycle": 94,
                "predicted_rul": 172934.45
              },
              {
                "cycle": 95,
                "predicted_rul": 172664.91
              },
              {
                "cycle": 96,
                "predicted_rul": 172880.21
              },
              {
                "cycle": 97,
                "predicted_rul": 173135.11
              },
              {
                "cycle": 98,
                "predicted_rul": 172639.13
              },
              {
                "cycle": 99,
                "predicted_rul": 173029.84
              },
              {
                "cycle": 100,
                "predicted_rul": 173040.27
              }
            ]
          },
          {
            "unit_number": 1,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 115.29876650345977
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 135.3867310186033
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 130.0713186673529
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 127.3059608086478
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 129.84037591749802
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 128.66426296223653
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 132.47513800684828
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 132.88395741509157
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 131.48561017902102
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 132.82553633616772
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 127.44249383441638
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 126.22736089557293
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 128.81828835289343
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 128.26111966453027
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 127.03143119555898
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 127.08952411211794
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 129.71553732120083
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 127.68229355107178
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 124.99233524443116
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 127.61252493833308
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 128.35263452594518
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 127.97006753153983
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 127.21691379405092
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 128.77347162074875
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 127.41122548634303
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 126.43851241495577
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 127.01588798759622
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 130.22196136042476
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 129.49035510316025
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 128.86695611124742
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 128.29164287968888
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 128.6177327480691
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 127.2552088862576
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 125.48248656914802
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 129.19975610479014
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 129.84143522242084
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 128.78494973041234
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 127.67754266184056
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 126.04829896680894
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 125.87642479990609
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 128.75325744372094
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 129.5398417598626
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 129.76207656576298
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 129.9421071159304
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 130.66173794170027
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 131.49477896213648
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 133.41562029600027
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 133.00200406240765
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 135.12340603012126
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 139.05770058947382
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 134.53187057410832
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 133.2270496756537
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 133.48475666725426
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 137.32827469083713
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 135.01112117775483
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 136.51696727945819
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 134.97886879500584
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 136.25925558625022
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 134.29945805534953
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 131.5297361300618
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 133.84202577435644
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 132.60216683868202
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 131.93768195639132
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 132.891405167029
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 134.8141652137274
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 133.08653956023045
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 131.64272914660978
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 132.4998780527967
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 131.68925722729182
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 129.3972934797639
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 132.29479370691115
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 131.8433199256542
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 130.16281225401326
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 127.44208948450978
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 129.3242954541638
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 128.04513443948235
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 125.10639895903296
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 121.47228923981311
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 122.18178434573929
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 120.98691068871995
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 120.58021565555828
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 122.2414900387812
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 124.10041558693047
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 127.07973381539341
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 125.30964206595672
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 122.95115129766054
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 124.01594837964512
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 120.02289752304205
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 119.62214527008473
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 116.59391099557979
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 116.80016300882562
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 116.28389549819985
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 118.84444885197445
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 119.3529381096887
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 121.28343108360423
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 119.31110771780368
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 122.48277339263586
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 124.59169302065857
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 124.94176673534093
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 124.26810885299346
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 126.79537304467522
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 127.16617381901597
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 125.37582497071708
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 122.04949644923909
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 123.16056183821638
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 121.47785156124155
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 119.5064103929326
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 125.09583205133094
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 124.41749584756326
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 122.97636067157146
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 121.42719464958645
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 121.10044925363036
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 119.94915506168036
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 121.82293257606216
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 118.81913244051975
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 118.53886232702644
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 119.08650408862741
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 119.68989814267843
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 115.88893910267507
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 118.18253930177889
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 119.11227382419747
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 117.61548625290743
              },
              {
                "cycle": 123,
                "true_rul": 125.0,
                "predicted_rul": 116.89081103753415
              },
              {
                "cycle": 124,
                "true_rul": 125.0,
                "predicted_rul": 115.75437700393377
              },
              {
                "cycle": 125,
                "true_rul": 125.0,
                "predicted_rul": 115.15678147081053
              },
              {
                "cycle": 126,
                "true_rul": 125.0,
                "predicted_rul": 118.69792052544653
              },
              {
                "cycle": 127,
                "true_rul": 125.0,
                "predicted_rul": 120.23098523687804
              },
              {
                "cycle": 128,
                "true_rul": 125.0,
                "predicted_rul": 119.62691745129996
              },
              {
                "cycle": 129,
                "true_rul": 125.0,
                "predicted_rul": 118.79247850293177
              },
              {
                "cycle": 130,
                "true_rul": 125.0,
                "predicted_rul": 117.78340478619793
              },
              {
                "cycle": 131,
                "true_rul": 125.0,
                "predicted_rul": 118.73774583803606
              },
              {
                "cycle": 132,
                "true_rul": 125.0,
                "predicted_rul": 118.61294013881707
              },
              {
                "cycle": 133,
                "true_rul": 125.0,
                "predicted_rul": 117.64273818299989
              },
              {
                "cycle": 134,
                "true_rul": 125.0,
                "predicted_rul": 116.84167899074964
              },
              {
                "cycle": 135,
                "true_rul": 125.0,
                "predicted_rul": 117.66915290040197
              },
              {
                "cycle": 136,
                "true_rul": 125.0,
                "predicted_rul": 113.41207687283168
              },
              {
                "cycle": 137,
                "true_rul": 125.0,
                "predicted_rul": 115.18059771182016
              },
              {
                "cycle": 138,
                "true_rul": 125.0,
                "predicted_rul": 117.50105979532236
              },
              {
                "cycle": 139,
                "true_rul": 125.0,
                "predicted_rul": 124.19830121973064
              },
              {
                "cycle": 140,
                "true_rul": 125.0,
                "predicted_rul": 122.61563342018053
              },
              {
                "cycle": 141,
                "true_rul": 125.0,
                "predicted_rul": 118.0355365719879
              },
              {
                "cycle": 142,
                "true_rul": 125.0,
                "predicted_rul": 116.43543943401892
              },
              {
                "cycle": 143,
                "true_rul": 125.0,
                "predicted_rul": 113.47611448247335
              },
              {
                "cycle": 144,
                "true_rul": 125.0,
                "predicted_rul": 113.62483544112183
              },
              {
                "cycle": 145,
                "true_rul": 125.0,
                "predicted_rul": 117.1117929291213
              },
              {
                "cycle": 146,
                "true_rul": 125.0,
                "predicted_rul": 113.85761264758185
              },
              {
                "cycle": 147,
                "true_rul": 125.0,
                "predicted_rul": 109.74957634104067
              },
              {
                "cycle": 148,
                "true_rul": 125.0,
                "predicted_rul": 108.84310655208537
              },
              {
                "cycle": 149,
                "true_rul": 125.0,
                "predicted_rul": 104.89597449288704
              },
              {
                "cycle": 150,
                "true_rul": 125.0,
                "predicted_rul": 105.1803361561033
              },
              {
                "cycle": 151,
                "true_rul": 125.0,
                "predicted_rul": 103.38243082951522
              },
              {
                "cycle": 152,
                "true_rul": 125.0,
                "predicted_rul": 104.97924338339362
              },
              {
                "cycle": 153,
                "true_rul": 124.0,
                "predicted_rul": 111.36710204844712
              },
              {
                "cycle": 154,
                "true_rul": 123.0,
                "predicted_rul": 112.29539965928416
              },
              {
                "cycle": 155,
                "true_rul": 122.0,
                "predicted_rul": 111.37682209696504
              },
              {
                "cycle": 156,
                "true_rul": 121.0,
                "predicted_rul": 111.56859898302355
              },
              {
                "cycle": 157,
                "true_rul": 120.0,
                "predicted_rul": 113.19440644825227
              },
              {
                "cycle": 158,
                "true_rul": 119.0,
                "predicted_rul": 111.38166582441772
              },
              {
                "cycle": 159,
                "true_rul": 118.0,
                "predicted_rul": 111.16252810557489
              },
              {
                "cycle": 160,
                "true_rul": 117.0,
                "predicted_rul": 114.00099969192524
              },
              {
                "cycle": 161,
                "true_rul": 116.0,
                "predicted_rul": 113.76418133534025
              },
              {
                "cycle": 162,
                "true_rul": 115.0,
                "predicted_rul": 115.2783329479862
              },
              {
                "cycle": 163,
                "true_rul": 114.0,
                "predicted_rul": 115.3760395940044
              },
              {
                "cycle": 164,
                "true_rul": 113.0,
                "predicted_rul": 115.36777762326528
              },
              {
                "cycle": 165,
                "true_rul": 112.0,
                "predicted_rul": 113.73252665653126
              },
              {
                "cycle": 166,
                "true_rul": 111.0,
                "predicted_rul": 116.61620540378499
              },
              {
                "cycle": 167,
                "true_rul": 110.0,
                "predicted_rul": 116.02057254000101
              },
              {
                "cycle": 168,
                "true_rul": 109.0,
                "predicted_rul": 117.37641481932951
              },
              {
                "cycle": 169,
                "true_rul": 108.0,
                "predicted_rul": 116.1456606008287
              },
              {
                "cycle": 170,
                "true_rul": 107.0,
                "predicted_rul": 115.51467194006545
              },
              {
                "cycle": 171,
                "true_rul": 106.0,
                "predicted_rul": 116.0009653386951
              },
              {
                "cycle": 172,
                "true_rul": 105.0,
                "predicted_rul": 115.07443442667136
              },
              {
                "cycle": 173,
                "true_rul": 104.0,
                "predicted_rul": 109.02218048326904
              },
              {
                "cycle": 174,
                "true_rul": 103.0,
                "predicted_rul": 109.62571809912333
              },
              {
                "cycle": 175,
                "true_rul": 102.0,
                "predicted_rul": 105.90242210103315
              },
              {
                "cycle": 176,
                "true_rul": 101.0,
                "predicted_rul": 108.55122837639647
              },
              {
                "cycle": 177,
                "true_rul": 100.0,
                "predicted_rul": 105.33012019045418
              },
              {
                "cycle": 178,
                "true_rul": 99.0,
                "predicted_rul": 102.19655769312521
              },
              {
                "cycle": 179,
                "true_rul": 98.0,
                "predicted_rul": 103.31681372478488
              },
              {
                "cycle": 180,
                "true_rul": 97.0,
                "predicted_rul": 103.80548333656043
              },
              {
                "cycle": 181,
                "true_rul": 96.0,
                "predicted_rul": 104.25871798273874
              },
              {
                "cycle": 182,
                "true_rul": 95.0,
                "predicted_rul": 105.02004348376067
              },
              {
                "cycle": 183,
                "true_rul": 94.0,
                "predicted_rul": 104.17269215476699
              },
              {
                "cycle": 184,
                "true_rul": 93.0,
                "predicted_rul": 104.86607277643634
              },
              {
                "cycle": 185,
                "true_rul": 92.0,
                "predicted_rul": 101.53522598490235
              },
              {
                "cycle": 186,
                "true_rul": 91.0,
                "predicted_rul": 100.7556143324764
              },
              {
                "cycle": 187,
                "true_rul": 90.0,
                "predicted_rul": 101.26164018915733
              },
              {
                "cycle": 188,
                "true_rul": 89.0,
                "predicted_rul": 95.67475862338324
              },
              {
                "cycle": 189,
                "true_rul": 88.0,
                "predicted_rul": 95.44408463701257
              },
              {
                "cycle": 190,
                "true_rul": 87.0,
                "predicted_rul": 94.29624419278116
              },
              {
                "cycle": 191,
                "true_rul": 86.0,
                "predicted_rul": 98.83287257628399
              },
              {
                "cycle": 192,
                "true_rul": 85.0,
                "predicted_rul": 98.27458413346903
              },
              {
                "cycle": 193,
                "true_rul": 84.0,
                "predicted_rul": 99.75647587495041
              },
              {
                "cycle": 194,
                "true_rul": 83.0,
                "predicted_rul": 96.84753295351402
              },
              {
                "cycle": 195,
                "true_rul": 82.0,
                "predicted_rul": 98.16074319809559
              },
              {
                "cycle": 196,
                "true_rul": 81.0,
                "predicted_rul": 93.33574933593627
              },
              {
                "cycle": 197,
                "true_rul": 80.0,
                "predicted_rul": 95.14536557646352
              },
              {
                "cycle": 198,
                "true_rul": 79.0,
                "predicted_rul": 95.93725233603618
              },
              {
                "cycle": 199,
                "true_rul": 78.0,
                "predicted_rul": 98.1601431395975
              },
              {
                "cycle": 200,
                "true_rul": 77.0,
                "predicted_rul": 97.99357933719875
              },
              {
                "cycle": 201,
                "true_rul": 76.0,
                "predicted_rul": 93.1789245667751
              },
              {
                "cycle": 202,
                "true_rul": 75.0,
                "predicted_rul": 94.11557008267846
              },
              {
                "cycle": 203,
                "true_rul": 74.0,
                "predicted_rul": 95.86440185867832
              },
              {
                "cycle": 204,
                "true_rul": 73.0,
                "predicted_rul": 93.26414201725856
              },
              {
                "cycle": 205,
                "true_rul": 72.0,
                "predicted_rul": 95.77077041516895
              },
              {
                "cycle": 206,
                "true_rul": 71.0,
                "predicted_rul": 94.34114993058029
              },
              {
                "cycle": 207,
                "true_rul": 70.0,
                "predicted_rul": 94.34802415294689
              },
              {
                "cycle": 208,
                "true_rul": 69.0,
                "predicted_rul": 96.54410806726082
              },
              {
                "cycle": 209,
                "true_rul": 68.0,
                "predicted_rul": 93.09550524337101
              },
              {
                "cycle": 210,
                "true_rul": 67.0,
                "predicted_rul": 93.66242174652871
              },
              {
                "cycle": 211,
                "true_rul": 66.0,
                "predicted_rul": 91.58852764472249
              },
              {
                "cycle": 212,
                "true_rul": 65.0,
                "predicted_rul": 89.41937656953814
              },
              {
                "cycle": 213,
                "true_rul": 64.0,
                "predicted_rul": 89.69865667185513
              },
              {
                "cycle": 214,
                "true_rul": 63.0,
                "predicted_rul": 85.82445969307446
              },
              {
                "cycle": 215,
                "true_rul": 62.0,
                "predicted_rul": 84.38453966545057
              },
              {
                "cycle": 216,
                "true_rul": 61.0,
                "predicted_rul": 84.21726394601865
              },
              {
                "cycle": 217,
                "true_rul": 60.0,
                "predicted_rul": 79.68737587120268
              },
              {
                "cycle": 218,
                "true_rul": 59.0,
                "predicted_rul": 80.10362681557308
              },
              {
                "cycle": 219,
                "true_rul": 58.0,
                "predicted_rul": 76.87265326778288
              },
              {
                "cycle": 220,
                "true_rul": 57.0,
                "predicted_rul": 73.49724427962792
              },
              {
                "cycle": 221,
                "true_rul": 56.0,
                "predicted_rul": 76.45844047315768
              },
              {
                "cycle": 222,
                "true_rul": 55.0,
                "predicted_rul": 72.8223972832202
              },
              {
                "cycle": 223,
                "true_rul": 54.0,
                "predicted_rul": 71.3934829220234
              },
              {
                "cycle": 224,
                "true_rul": 53.0,
                "predicted_rul": 72.06956807378447
              },
              {
                "cycle": 225,
                "true_rul": 52.0,
                "predicted_rul": 69.46342122874921
              },
              {
                "cycle": 226,
                "true_rul": 51.0,
                "predicted_rul": 69.61779270286206
              },
              {
                "cycle": 227,
                "true_rul": 50.0,
                "predicted_rul": 72.17224896114203
              },
              {
                "cycle": 228,
                "true_rul": 49.0,
                "predicted_rul": 73.43752112609218
              },
              {
                "cycle": 229,
                "true_rul": 48.0,
                "predicted_rul": 73.67221129394602
              },
              {
                "cycle": 230,
                "true_rul": 47.0,
                "predicted_rul": 73.92129324172856
              },
              {
                "cycle": 231,
                "true_rul": 46.0,
                "predicted_rul": 71.82489474702743
              },
              {
                "cycle": 232,
                "true_rul": 45.0,
                "predicted_rul": 70.18752280602348
              },
              {
                "cycle": 233,
                "true_rul": 44.0,
                "predicted_rul": 71.18672396033071
              }
            ]
          },
          {
            "unit_number": 2,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 141.7787973069062
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 145.58220344933216
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 138.1153375368158
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 138.6479825906281
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 130.36512038682122
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 133.57181088265497
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 130.85900478236726
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 131.7475524698093
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 133.68354645496584
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 132.8095700875274
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 133.7428993685171
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 138.34278511928278
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 134.7900449592853
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 134.94262521300698
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 138.3610499582719
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 138.4201844309573
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 134.08314982490265
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 132.8166675575776
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 133.71880861447426
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 138.35429299701354
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 136.8416880000441
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 136.77347680504317
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 134.3347855793836
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 134.3034425091755
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 133.73604547980358
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 130.99557366149384
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 131.75893359290785
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 129.35116862371797
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 129.96994744148105
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 129.41460009492585
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 128.13616534523317
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 127.1863955858862
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 131.10183902527206
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 128.2202220209001
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 124.19887107904651
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 123.85832067165757
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 125.78703332974692
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 126.96211307594785
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 123.65762796884519
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 123.46384258431499
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 124.05797118248302
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 124.35606946249027
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 123.85162784904242
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 123.00768537764088
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 120.59469281151542
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 125.26123411129811
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 124.87771297772997
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 124.45177774413605
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 128.0326874568418
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 125.12286388984649
              },
              {
                "cycle": 51,
                "true_rul": 124.0,
                "predicted_rul": 127.37594653433189
              },
              {
                "cycle": 52,
                "true_rul": 123.0,
                "predicted_rul": 129.55678913192241
              },
              {
                "cycle": 53,
                "true_rul": 122.0,
                "predicted_rul": 129.5966512003506
              },
              {
                "cycle": 54,
                "true_rul": 121.0,
                "predicted_rul": 128.55970865493873
              },
              {
                "cycle": 55,
                "true_rul": 120.0,
                "predicted_rul": 129.26573038261267
              },
              {
                "cycle": 56,
                "true_rul": 119.0,
                "predicted_rul": 128.14630580414087
              },
              {
                "cycle": 57,
                "true_rul": 118.0,
                "predicted_rul": 126.74053421345889
              },
              {
                "cycle": 58,
                "true_rul": 117.0,
                "predicted_rul": 123.50123163909302
              },
              {
                "cycle": 59,
                "true_rul": 116.0,
                "predicted_rul": 124.11620586924255
              },
              {
                "cycle": 60,
                "true_rul": 115.0,
                "predicted_rul": 121.37972251337487
              },
              {
                "cycle": 61,
                "true_rul": 114.0,
                "predicted_rul": 119.75873544879141
              },
              {
                "cycle": 62,
                "true_rul": 113.0,
                "predicted_rul": 119.39873677422293
              },
              {
                "cycle": 63,
                "true_rul": 112.0,
                "predicted_rul": 121.00938874098938
              },
              {
                "cycle": 64,
                "true_rul": 111.0,
                "predicted_rul": 117.51580086784088
              },
              {
                "cycle": 65,
                "true_rul": 110.0,
                "predicted_rul": 116.50893661685404
              },
              {
                "cycle": 66,
                "true_rul": 109.0,
                "predicted_rul": 117.10620766473585
              },
              {
                "cycle": 67,
                "true_rul": 108.0,
                "predicted_rul": 114.37368332472397
              },
              {
                "cycle": 68,
                "true_rul": 107.0,
                "predicted_rul": 112.77370555559173
              },
              {
                "cycle": 69,
                "true_rul": 106.0,
                "predicted_rul": 110.69017985457322
              },
              {
                "cycle": 70,
                "true_rul": 105.0,
                "predicted_rul": 112.92247464109096
              },
              {
                "cycle": 71,
                "true_rul": 104.0,
                "predicted_rul": 113.92082409164868
              },
              {
                "cycle": 72,
                "true_rul": 103.0,
                "predicted_rul": 114.73624551203102
              },
              {
                "cycle": 73,
                "true_rul": 102.0,
                "predicted_rul": 113.53595981249237
              },
              {
                "cycle": 74,
                "true_rul": 101.0,
                "predicted_rul": 114.94640593303484
              },
              {
                "cycle": 75,
                "true_rul": 100.0,
                "predicted_rul": 115.48903664050158
              },
              {
                "cycle": 76,
                "true_rul": 99.0,
                "predicted_rul": 117.54435687715886
              },
              {
                "cycle": 77,
                "true_rul": 98.0,
                "predicted_rul": 119.22181695958716
              },
              {
                "cycle": 78,
                "true_rul": 97.0,
                "predicted_rul": 117.21084189179237
              },
              {
                "cycle": 79,
                "true_rul": 96.0,
                "predicted_rul": 116.14804380736314
              },
              {
                "cycle": 80,
                "true_rul": 95.0,
                "predicted_rul": 113.34218275069725
              },
              {
                "cycle": 81,
                "true_rul": 94.0,
                "predicted_rul": 114.08556460851105
              },
              {
                "cycle": 82,
                "true_rul": 93.0,
                "predicted_rul": 112.8815031304257
              },
              {
                "cycle": 83,
                "true_rul": 92.0,
                "predicted_rul": 112.83086310111685
              },
              {
                "cycle": 84,
                "true_rul": 91.0,
                "predicted_rul": 114.56567145188455
              },
              {
                "cycle": 85,
                "true_rul": 90.0,
                "predicted_rul": 115.440823283192
              },
              {
                "cycle": 86,
                "true_rul": 89.0,
                "predicted_rul": 115.34897564104176
              },
              {
                "cycle": 87,
                "true_rul": 88.0,
                "predicted_rul": 112.76825396411004
              },
              {
                "cycle": 88,
                "true_rul": 87.0,
                "predicted_rul": 113.73920218148851
              },
              {
                "cycle": 89,
                "true_rul": 86.0,
                "predicted_rul": 112.76030812735553
              },
              {
                "cycle": 90,
                "true_rul": 85.0,
                "predicted_rul": 113.88443569059018
              },
              {
                "cycle": 91,
                "true_rul": 84.0,
                "predicted_rul": 110.01233506327844
              },
              {
                "cycle": 92,
                "true_rul": 83.0,
                "predicted_rul": 109.9664489167626
              },
              {
                "cycle": 93,
                "true_rul": 82.0,
                "predicted_rul": 111.85068571713055
              },
              {
                "cycle": 94,
                "true_rul": 81.0,
                "predicted_rul": 111.77901173816645
              },
              {
                "cycle": 95,
                "true_rul": 80.0,
                "predicted_rul": 111.08657902001869
              },
              {
                "cycle": 96,
                "true_rul": 79.0,
                "predicted_rul": 106.74881509042461
              },
              {
                "cycle": 97,
                "true_rul": 78.0,
                "predicted_rul": 105.57872567273444
              },
              {
                "cycle": 98,
                "true_rul": 77.0,
                "predicted_rul": 104.9177202147257
              },
              {
                "cycle": 99,
                "true_rul": 76.0,
                "predicted_rul": 105.98339889213094
              },
              {
                "cycle": 100,
                "true_rul": 75.0,
                "predicted_rul": 104.95682011015015
              },
              {
                "cycle": 101,
                "true_rul": 74.0,
                "predicted_rul": 103.9307612607081
              },
              {
                "cycle": 102,
                "true_rul": 73.0,
                "predicted_rul": 102.1308536719298
              },
              {
                "cycle": 103,
                "true_rul": 72.0,
                "predicted_rul": 106.72943026848952
              },
              {
                "cycle": 104,
                "true_rul": 71.0,
                "predicted_rul": 105.10768354200991
              },
              {
                "cycle": 105,
                "true_rul": 70.0,
                "predicted_rul": 104.01290755203809
              },
              {
                "cycle": 106,
                "true_rul": 69.0,
                "predicted_rul": 103.02245122732711
              },
              {
                "cycle": 107,
                "true_rul": 68.0,
                "predicted_rul": 100.07642678191769
              },
              {
                "cycle": 108,
                "true_rul": 67.0,
                "predicted_rul": 96.18539217769285
              },
              {
                "cycle": 109,
                "true_rul": 66.0,
                "predicted_rul": 96.54894441983197
              },
              {
                "cycle": 110,
                "true_rul": 65.0,
                "predicted_rul": 92.59437401566538
              },
              {
                "cycle": 111,
                "true_rul": 64.0,
                "predicted_rul": 94.4152425333159
              },
              {
                "cycle": 112,
                "true_rul": 63.0,
                "predicted_rul": 93.6621064163046
              },
              {
                "cycle": 113,
                "true_rul": 62.0,
                "predicted_rul": 89.9729288330418
              },
              {
                "cycle": 114,
                "true_rul": 61.0,
                "predicted_rul": 89.66604226123309
              },
              {
                "cycle": 115,
                "true_rul": 60.0,
                "predicted_rul": 88.95025362685556
              },
              {
                "cycle": 116,
                "true_rul": 59.0,
                "predicted_rul": 87.0053332078096
              },
              {
                "cycle": 117,
                "true_rul": 58.0,
                "predicted_rul": 86.32359607759281
              },
              {
                "cycle": 118,
                "true_rul": 57.0,
                "predicted_rul": 87.58356436784379
              },
              {
                "cycle": 119,
                "true_rul": 56.0,
                "predicted_rul": 86.6294430468406
              },
              {
                "cycle": 120,
                "true_rul": 55.0,
                "predicted_rul": 86.41829877800774
              },
              {
                "cycle": 121,
                "true_rul": 54.0,
                "predicted_rul": 83.93940476348507
              },
              {
                "cycle": 122,
                "true_rul": 53.0,
                "predicted_rul": 85.73914236674318
              },
              {
                "cycle": 123,
                "true_rul": 52.0,
                "predicted_rul": 80.34906969103031
              },
              {
                "cycle": 124,
                "true_rul": 51.0,
                "predicted_rul": 82.03514577570604
              }
            ]
          },
          {
            "unit_number": 3,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 97.52148628246505
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 105.99451797801885
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 97.94652988921735
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 121.79568714479683
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 119.1791394285392
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 123.42799923359416
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 124.76504228735575
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 126.00433378687012
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 129.98070371890208
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 127.61847820770345
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 130.58360750367865
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 131.00926672082278
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 125.77729528117925
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 129.31586477864766
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 131.25883041264024
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 131.75514223787468
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 133.18042404102744
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 131.58751141099492
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 129.128917087859
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 128.45239782627323
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 126.17518437979743
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 125.49108057154808
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 124.6828788149287
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 125.97514574669185
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 127.22050797694828
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 127.24817575322231
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 126.96545850721304
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 128.94843742717057
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 128.12359802352148
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 126.06964107096428
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 125.43070030974923
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 126.97070938645629
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 126.73796885737102
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 128.1786279073567
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 126.82918980176328
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 126.0586977895291
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 125.79650664003566
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 127.13783590841922
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 128.0144679057703
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 128.2529547283484
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 131.00576890894445
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 129.68818325849134
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 131.37167984328698
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 132.01899885383318
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 131.12674726347905
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 131.5862933791359
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 130.60760464606574
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 129.7167949306895
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 130.73571550589986
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 128.75748950670823
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 129.41377676383127
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 129.18478621117538
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 130.26107649377082
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 128.9433952990221
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 129.0040181860386
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 127.56737105504726
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 126.48977862819447
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 129.32123366376618
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 130.24032549952972
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 129.89466545780306
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 129.97030912849004
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 129.34252888464835
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 128.63034851045813
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 129.84638897911645
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 132.34589827118907
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 129.99021857380285
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 129.8377279926499
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 129.00211464983295
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 129.18723638981464
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 126.12222098480561
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 125.36409385371371
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 124.74205625095055
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 123.63051073328825
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 124.20253854698967
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 124.20208704989636
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 122.63721895604976
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 123.10070028007613
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 120.2664106922166
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 119.14672977215378
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 118.7124243353901
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 119.40052210559952
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 118.59046993855736
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 117.62584169727052
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 118.64228909937083
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 116.91857337864349
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 116.1577952436055
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 114.69932782126125
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 113.49472376669291
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 112.72827113379026
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 111.353686751856
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 109.85144294018392
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 109.64963183912914
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 108.95199792439234
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 106.58972219846328
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 107.64503331569722
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 105.4715926166391
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 104.84698572516209
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 102.72887845171499
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 104.48842622121447
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 103.73222912015626
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 102.71954298301716
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 107.06413921021158
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 106.46478664770257
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 106.61675808922155
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 106.00038246519398
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 107.80881850421429
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 107.34818693122361
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 106.46713114026352
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 105.85129841481103
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 104.44131773291156
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 107.34835294933873
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 108.57286332809599
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 111.13859352216241
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 109.35534403671045
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 107.27209468904766
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 108.3144103550294
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 107.73426007281523
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 114.35595082922373
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 113.17709556958289
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 113.26972187642241
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 111.66638272782438
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 107.83877802116331
              },
              {
                "cycle": 123,
                "true_rul": 125.0,
                "predicted_rul": 106.23260508515523
              },
              {
                "cycle": 124,
                "true_rul": 125.0,
                "predicted_rul": 107.18549995339708
              },
              {
                "cycle": 125,
                "true_rul": 125.0,
                "predicted_rul": 106.37378297216492
              },
              {
                "cycle": 126,
                "true_rul": 125.0,
                "predicted_rul": 106.72708510025404
              },
              {
                "cycle": 127,
                "true_rul": 125.0,
                "predicted_rul": 106.53647301875753
              },
              {
                "cycle": 128,
                "true_rul": 125.0,
                "predicted_rul": 108.35254828399047
              },
              {
                "cycle": 129,
                "true_rul": 125.0,
                "predicted_rul": 107.69292316187057
              },
              {
                "cycle": 130,
                "true_rul": 125.0,
                "predicted_rul": 109.56545113280299
              },
              {
                "cycle": 131,
                "true_rul": 125.0,
                "predicted_rul": 109.13310184355942
              },
              {
                "cycle": 132,
                "true_rul": 125.0,
                "predicted_rul": 107.60300152248237
              },
              {
                "cycle": 133,
                "true_rul": 125.0,
                "predicted_rul": 107.74940102864639
              },
              {
                "cycle": 134,
                "true_rul": 125.0,
                "predicted_rul": 108.78517859560088
              },
              {
                "cycle": 135,
                "true_rul": 125.0,
                "predicted_rul": 109.459193149145
              },
              {
                "cycle": 136,
                "true_rul": 125.0,
                "predicted_rul": 109.00904423676548
              },
              {
                "cycle": 137,
                "true_rul": 124.0,
                "predicted_rul": 106.18600400234573
              },
              {
                "cycle": 138,
                "true_rul": 123.0,
                "predicted_rul": 103.35840678829118
              },
              {
                "cycle": 139,
                "true_rul": 122.0,
                "predicted_rul": 104.26307162220473
              },
              {
                "cycle": 140,
                "true_rul": 121.0,
                "predicted_rul": 105.19739661601488
              },
              {
                "cycle": 141,
                "true_rul": 120.0,
                "predicted_rul": 104.15860424435232
              },
              {
                "cycle": 142,
                "true_rul": 119.0,
                "predicted_rul": 106.79001034147223
              },
              {
                "cycle": 143,
                "true_rul": 118.0,
                "predicted_rul": 109.70053901596111
              },
              {
                "cycle": 144,
                "true_rul": 117.0,
                "predicted_rul": 109.44335265425616
              },
              {
                "cycle": 145,
                "true_rul": 116.0,
                "predicted_rul": 111.94109844582272
              },
              {
                "cycle": 146,
                "true_rul": 115.0,
                "predicted_rul": 111.01594904076774
              },
              {
                "cycle": 147,
                "true_rul": 114.0,
                "predicted_rul": 111.42495096329367
              },
              {
                "cycle": 148,
                "true_rul": 113.0,
                "predicted_rul": 113.6519752360764
              },
              {
                "cycle": 149,
                "true_rul": 112.0,
                "predicted_rul": 112.54782144009368
              },
              {
                "cycle": 150,
                "true_rul": 111.0,
                "predicted_rul": 113.71589534840314
              },
              {
                "cycle": 151,
                "true_rul": 110.0,
                "predicted_rul": 113.24520858580945
              },
              {
                "cycle": 152,
                "true_rul": 109.0,
                "predicted_rul": 113.30317053219187
              },
              {
                "cycle": 153,
                "true_rul": 108.0,
                "predicted_rul": 109.96863562930957
              },
              {
                "cycle": 154,
                "true_rul": 107.0,
                "predicted_rul": 111.07011531153694
              },
              {
                "cycle": 155,
                "true_rul": 106.0,
                "predicted_rul": 112.20527955060243
              },
              {
                "cycle": 156,
                "true_rul": 105.0,
                "predicted_rul": 112.48575562809128
              },
              {
                "cycle": 157,
                "true_rul": 104.0,
                "predicted_rul": 116.12422932425397
              },
              {
                "cycle": 158,
                "true_rul": 103.0,
                "predicted_rul": 117.78806920713396
              },
              {
                "cycle": 159,
                "true_rul": 102.0,
                "predicted_rul": 118.1728249519947
              },
              {
                "cycle": 160,
                "true_rul": 101.0,
                "predicted_rul": 116.16179840941913
              },
              {
                "cycle": 161,
                "true_rul": 100.0,
                "predicted_rul": 116.94767651511938
              },
              {
                "cycle": 162,
                "true_rul": 99.0,
                "predicted_rul": 116.23620635463158
              },
              {
                "cycle": 163,
                "true_rul": 98.0,
                "predicted_rul": 115.54395388741978
              },
              {
                "cycle": 164,
                "true_rul": 97.0,
                "predicted_rul": 118.0377407586202
              },
              {
                "cycle": 165,
                "true_rul": 96.0,
                "predicted_rul": 115.1570389738772
              },
              {
                "cycle": 166,
                "true_rul": 95.0,
                "predicted_rul": 113.13825175649254
              },
              {
                "cycle": 167,
                "true_rul": 94.0,
                "predicted_rul": 113.56131907374947
              },
              {
                "cycle": 168,
                "true_rul": 93.0,
                "predicted_rul": 110.31500561680878
              },
              {
                "cycle": 169,
                "true_rul": 92.0,
                "predicted_rul": 110.16297790958197
              },
              {
                "cycle": 170,
                "true_rul": 91.0,
                "predicted_rul": 109.68460212901118
              },
              {
                "cycle": 171,
                "true_rul": 90.0,
                "predicted_rul": 113.60451439674944
              },
              {
                "cycle": 172,
                "true_rul": 89.0,
                "predicted_rul": 111.89441919876845
              },
              {
                "cycle": 173,
                "true_rul": 88.0,
                "predicted_rul": 113.97977284286753
              },
              {
                "cycle": 174,
                "true_rul": 87.0,
                "predicted_rul": 114.15672034944873
              },
              {
                "cycle": 175,
                "true_rul": 86.0,
                "predicted_rul": 114.76057269368903
              },
              {
                "cycle": 176,
                "true_rul": 85.0,
                "predicted_rul": 114.23305504160817
              },
              {
                "cycle": 177,
                "true_rul": 84.0,
                "predicted_rul": 110.60695378985838
              },
              {
                "cycle": 178,
                "true_rul": 83.0,
                "predicted_rul": 110.20145682283328
              },
              {
                "cycle": 179,
                "true_rul": 82.0,
                "predicted_rul": 108.41401167854201
              },
              {
                "cycle": 180,
                "true_rul": 81.0,
                "predicted_rul": 108.99236583942547
              },
              {
                "cycle": 181,
                "true_rul": 80.0,
                "predicted_rul": 107.27684790582862
              },
              {
                "cycle": 182,
                "true_rul": 79.0,
                "predicted_rul": 101.32655628409702
              },
              {
                "cycle": 183,
                "true_rul": 78.0,
                "predicted_rul": 101.11734991849517
              },
              {
                "cycle": 184,
                "true_rul": 77.0,
                "predicted_rul": 101.37139036890585
              },
              {
                "cycle": 185,
                "true_rul": 76.0,
                "predicted_rul": 102.72635151748545
              },
              {
                "cycle": 186,
                "true_rul": 75.0,
                "predicted_rul": 100.94678843702422
              },
              {
                "cycle": 187,
                "true_rul": 74.0,
                "predicted_rul": 99.0937619379547
              },
              {
                "cycle": 188,
                "true_rul": 73.0,
                "predicted_rul": 100.7297246795788
              },
              {
                "cycle": 189,
                "true_rul": 72.0,
                "predicted_rul": 101.31925113106263
              },
              {
                "cycle": 190,
                "true_rul": 71.0,
                "predicted_rul": 102.6164441150031
              },
              {
                "cycle": 191,
                "true_rul": 70.0,
                "predicted_rul": 101.30367035159725
              },
              {
                "cycle": 192,
                "true_rul": 69.0,
                "predicted_rul": 103.31054333495558
              },
              {
                "cycle": 193,
                "true_rul": 68.0,
                "predicted_rul": 102.43055293004727
              },
              {
                "cycle": 194,
                "true_rul": 67.0,
                "predicted_rul": 99.59625923546264
              },
              {
                "cycle": 195,
                "true_rul": 66.0,
                "predicted_rul": 96.03585746575845
              },
              {
                "cycle": 196,
                "true_rul": 65.0,
                "predicted_rul": 94.50453847710742
              },
              {
                "cycle": 197,
                "true_rul": 64.0,
                "predicted_rul": 96.15881568193436
              },
              {
                "cycle": 198,
                "true_rul": 63.0,
                "predicted_rul": 93.56260857312009
              },
              {
                "cycle": 199,
                "true_rul": 62.0,
                "predicted_rul": 93.76018678370747
              },
              {
                "cycle": 200,
                "true_rul": 61.0,
                "predicted_rul": 92.7342610269261
              },
              {
                "cycle": 201,
                "true_rul": 60.0,
                "predicted_rul": 91.74556583160302
              },
              {
                "cycle": 202,
                "true_rul": 59.0,
                "predicted_rul": 94.701772099128
              },
              {
                "cycle": 203,
                "true_rul": 58.0,
                "predicted_rul": 93.9154354451166
              },
              {
                "cycle": 204,
                "true_rul": 57.0,
                "predicted_rul": 90.77426592475967
              },
              {
                "cycle": 205,
                "true_rul": 56.0,
                "predicted_rul": 89.80748115407187
              },
              {
                "cycle": 206,
                "true_rul": 55.0,
                "predicted_rul": 90.59162577864481
              },
              {
                "cycle": 207,
                "true_rul": 54.0,
                "predicted_rul": 87.90252835123101
              },
              {
                "cycle": 208,
                "true_rul": 53.0,
                "predicted_rul": 88.6499964951945
              },
              {
                "cycle": 209,
                "true_rul": 52.0,
                "predicted_rul": 88.42281709672534
              },
              {
                "cycle": 210,
                "true_rul": 51.0,
                "predicted_rul": 86.81865593287512
              },
              {
                "cycle": 211,
                "true_rul": 50.0,
                "predicted_rul": 89.35397018611548
              },
              {
                "cycle": 212,
                "true_rul": 49.0,
                "predicted_rul": 87.0181082948402
              },
              {
                "cycle": 213,
                "true_rul": 48.0,
                "predicted_rul": 86.68025106898858
              },
              {
                "cycle": 214,
                "true_rul": 47.0,
                "predicted_rul": 84.92004075707518
              },
              {
                "cycle": 215,
                "true_rul": 46.0,
                "predicted_rul": 82.50799735356122
              },
              {
                "cycle": 216,
                "true_rul": 45.0,
                "predicted_rul": 81.2894075998629
              },
              {
                "cycle": 217,
                "true_rul": 44.0,
                "predicted_rul": 78.65753099261201
              },
              {
                "cycle": 218,
                "true_rul": 43.0,
                "predicted_rul": 77.54483162279939
              },
              {
                "cycle": 219,
                "true_rul": 42.0,
                "predicted_rul": 72.92360243754229
              },
              {
                "cycle": 220,
                "true_rul": 41.0,
                "predicted_rul": 72.35182995189098
              },
              {
                "cycle": 221,
                "true_rul": 40.0,
                "predicted_rul": 74.54191752808401
              },
              {
                "cycle": 222,
                "true_rul": 39.0,
                "predicted_rul": 71.24191904554027
              },
              {
                "cycle": 223,
                "true_rul": 38.0,
                "predicted_rul": 69.46167754172347
              },
              {
                "cycle": 224,
                "true_rul": 37.0,
                "predicted_rul": 71.39453863029485
              },
              {
                "cycle": 225,
                "true_rul": 36.0,
                "predicted_rul": 72.63527622947004
              },
              {
                "cycle": 226,
                "true_rul": 35.0,
                "predicted_rul": 70.18703472291236
              },
              {
                "cycle": 227,
                "true_rul": 34.0,
                "predicted_rul": 70.54961534426548
              },
              {
                "cycle": 228,
                "true_rul": 33.0,
                "predicted_rul": 65.32581991195912
              },
              {
                "cycle": 229,
                "true_rul": 32.0,
                "predicted_rul": 67.79763084382284
              },
              {
                "cycle": 230,
                "true_rul": 31.0,
                "predicted_rul": 65.14175808092114
              },
              {
                "cycle": 231,
                "true_rul": 30.0,
                "predicted_rul": 61.826406793203205
              },
              {
                "cycle": 232,
                "true_rul": 29.0,
                "predicted_rul": 60.5782502090442
              },
              {
                "cycle": 233,
                "true_rul": 28.0,
                "predicted_rul": 58.07431257900316
              },
              {
                "cycle": 234,
                "true_rul": 27.0,
                "predicted_rul": 58.95506841922179
              }
            ]
          },
          {
            "unit_number": 4,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 178.93834667789633
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 174.3735446643259
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 164.66665160557022
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 158.59325628436636
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 156.7875476180634
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 150.46485706992098
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 153.5250285619113
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 147.26003214798402
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 143.2099703415006
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 143.65339793663588
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 143.89760944864247
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 141.32568190750317
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 136.80617980472744
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 137.93676545325434
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 136.54382732664817
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 138.38604674927774
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 140.09531084663467
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 138.3620684723428
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 136.32017192066996
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 133.5919394431403
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 134.4864924933354
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 134.10544312398997
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 133.97645913175074
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 133.9502815353335
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 134.84873943508137
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 135.0238059934345
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 136.09818261495093
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 137.5247044917778
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 135.7776348857151
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 133.75266435582307
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 136.10216340591433
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 136.33729622187093
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 136.96502073796
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 136.75252734325477
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 138.19740747762262
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 140.1551572411554
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 139.92602208961034
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 137.88203468295978
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 136.0927487189474
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 135.17473242463893
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 133.21447955304757
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 133.57862864690833
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 132.803064221167
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 130.68613337448915
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 134.2010431161907
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 133.92610832015635
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 133.04101976999664
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 131.9994846000045
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 129.09632715626503
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 129.22537033105618
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 128.28462128341198
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 129.8431674306339
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 124.27380452121724
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 125.02803549577948
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 124.09183194977231
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 123.19094252111972
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 125.01332298156922
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 126.64098026233842
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 128.0258751923393
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 127.63117844620137
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 127.14460696859169
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 127.49620483146282
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 126.33189329240122
              },
              {
                "cycle": 64,
                "true_rul": 124.0,
                "predicted_rul": 125.26045847136993
              },
              {
                "cycle": 65,
                "true_rul": 123.0,
                "predicted_rul": 126.67091148599866
              },
              {
                "cycle": 66,
                "true_rul": 122.0,
                "predicted_rul": 127.90627947609755
              },
              {
                "cycle": 67,
                "true_rul": 121.0,
                "predicted_rul": 130.45138769669575
              },
              {
                "cycle": 68,
                "true_rul": 120.0,
                "predicted_rul": 131.76812827779213
              }
            ]
          },
          {
            "unit_number": 5,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 185.16243739478523
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 147.69010750140296
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 164.66522167509538
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 167.68523062820896
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 172.55217759523657
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 176.7594673743588
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 174.97086806970765
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 171.3684366729576
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 171.38154093007324
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 167.66094057820737
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 166.66242401179625
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 161.12150565953925
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 154.38455330592114
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 155.1557522342482
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 153.8185879442608
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 153.98259514771053
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 156.74233987141633
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 165.60581172737875
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 164.1147584329883
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 166.47883589961566
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 161.43137140219915
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 157.08869554966805
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 154.0839927761699
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 153.5917532039457
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 152.51298732167925
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 152.97263690867112
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 153.522125391406
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 156.04253792689997
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 153.25769577315077
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 150.9865330173052
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 152.7072580504173
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 148.60780716786394
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 144.46786808257457
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 144.65261127101257
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 135.16081075934926
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 136.86406188597903
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 140.6947899274528
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 139.53576746521867
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 141.06771645788103
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 142.62190453801304
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 142.76705123009742
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 143.7338218226796
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 144.35196597265895
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 142.76432415723684
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 142.465317556198
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 142.9739356364007
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 143.90387646702584
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 137.21328217099654
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 140.2205459207471
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 139.9131049629068
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 140.71633990373812
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 141.4428625291912
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 152.79816711132298
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 153.65648340931511
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 163.42958896633354
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 155.77025826578029
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 155.15399118809728
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 154.62426584705827
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 153.291966760793
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 151.42148401751183
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 156.04585519555258
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 157.87026813128614
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 156.23060603509657
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 156.56628341638134
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 158.7991214004287
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 163.23381092012278
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 160.58386094731395
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 158.2821247135289
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 158.77106171255582
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 162.46081059705466
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 153.59175444903667
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 155.5559920972737
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 156.51139688814874
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 158.90063343886868
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 158.90356843659538
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 166.83754468237748
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 167.06495036868728
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 154.54179639494396
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 151.51157320759376
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 144.72281789564295
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 138.5385407099384
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 138.50153536035214
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 138.31331642332952
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 137.1808499887411
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 131.98097398411483
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 130.3288362045423
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 131.86203798899078
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 131.78262664465
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 130.74223427355173
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 133.11456968510174
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 138.27542676744633
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 139.8159016308491
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 139.03226492510294
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 139.85203575532068
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 139.89775592825026
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 136.23164809992886
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 131.11390342592495
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 133.7113040756958
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 131.4048524699465
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 128.6451038834639
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 128.4121134216257
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 131.48359844248625
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 132.82546220032964
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 132.3031483121449
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 129.85832886392018
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 132.34112274021027
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 132.46130416949745
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 132.75953725120053
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 133.48152609582758
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 128.528509484604
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 123.39080358020146
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 124.86530052119633
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 123.00583379995078
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 122.70998116242117
              },
              {
                "cycle": 115,
                "true_rul": 124.0,
                "predicted_rul": 122.0858372146613
              },
              {
                "cycle": 116,
                "true_rul": 123.0,
                "predicted_rul": 122.84492335779942
              },
              {
                "cycle": 117,
                "true_rul": 122.0,
                "predicted_rul": 124.2885896024818
              },
              {
                "cycle": 118,
                "true_rul": 121.0,
                "predicted_rul": 123.04031856090296
              },
              {
                "cycle": 119,
                "true_rul": 120.0,
                "predicted_rul": 123.1464708817075
              },
              {
                "cycle": 120,
                "true_rul": 119.0,
                "predicted_rul": 125.46518770128023
              },
              {
                "cycle": 121,
                "true_rul": 118.0,
                "predicted_rul": 128.39695564485737
              },
              {
                "cycle": 122,
                "true_rul": 117.0,
                "predicted_rul": 127.52883304329589
              },
              {
                "cycle": 123,
                "true_rul": 116.0,
                "predicted_rul": 125.80420262124971
              },
              {
                "cycle": 124,
                "true_rul": 115.0,
                "predicted_rul": 126.04937572931522
              },
              {
                "cycle": 125,
                "true_rul": 114.0,
                "predicted_rul": 123.76792825013399
              },
              {
                "cycle": 126,
                "true_rul": 113.0,
                "predicted_rul": 121.08489139136509
              },
              {
                "cycle": 127,
                "true_rul": 112.0,
                "predicted_rul": 123.8535861983255
              },
              {
                "cycle": 128,
                "true_rul": 111.0,
                "predicted_rul": 123.12759588018525
              },
              {
                "cycle": 129,
                "true_rul": 110.0,
                "predicted_rul": 120.37346961940057
              },
              {
                "cycle": 130,
                "true_rul": 109.0,
                "predicted_rul": 122.7101100627915
              },
              {
                "cycle": 131,
                "true_rul": 108.0,
                "predicted_rul": 123.40373276907485
              },
              {
                "cycle": 132,
                "true_rul": 107.0,
                "predicted_rul": 119.8784205619886
              },
              {
                "cycle": 133,
                "true_rul": 106.0,
                "predicted_rul": 120.14993806340499
              },
              {
                "cycle": 134,
                "true_rul": 105.0,
                "predicted_rul": 121.46099685458466
              },
              {
                "cycle": 135,
                "true_rul": 104.0,
                "predicted_rul": 117.98950535620679
              },
              {
                "cycle": 136,
                "true_rul": 103.0,
                "predicted_rul": 117.37690667362767
              },
              {
                "cycle": 137,
                "true_rul": 102.0,
                "predicted_rul": 119.73783679754706
              },
              {
                "cycle": 138,
                "true_rul": 101.0,
                "predicted_rul": 120.14155905027292
              }
            ]
          },
          {
            "unit_number": 6,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 160.7405464143958
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 147.8156069063989
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 156.28022432347643
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 143.40843125546235
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 138.0498605806788
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 131.35288770121406
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 131.58358622455853
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 130.2485934504657
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 132.07156403234694
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 132.2894508500758
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 134.4462332453113
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 132.89062513125828
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 134.47895468727802
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 135.35449092221097
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 135.25102525524562
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 135.9164376698609
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 132.23843626849703
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 132.56334318732843
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 131.4288653237454
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 133.34555760823423
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 135.69770055849222
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 132.40422458876856
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 131.2325477481354
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 130.37628433306236
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 128.89456365531078
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 129.97743392706616
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 126.44467340174015
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 124.12175712391036
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 124.67950963426847
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 124.49905051852693
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 125.04304274296737
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 124.21704688534373
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 126.2107839785458
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 122.54435784099041
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 123.4081156954926
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 120.41930377762765
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 122.22498751193052
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 123.56044535548426
              },
              {
                "cycle": 39,
                "true_rul": 124.0,
                "predicted_rul": 130.41545954198227
              },
              {
                "cycle": 40,
                "true_rul": 123.0,
                "predicted_rul": 130.02000167348888
              },
              {
                "cycle": 41,
                "true_rul": 122.0,
                "predicted_rul": 130.1927063021576
              },
              {
                "cycle": 42,
                "true_rul": 121.0,
                "predicted_rul": 127.5921161735896
              },
              {
                "cycle": 43,
                "true_rul": 120.0,
                "predicted_rul": 125.09194839172415
              },
              {
                "cycle": 44,
                "true_rul": 119.0,
                "predicted_rul": 126.93405644583981
              },
              {
                "cycle": 45,
                "true_rul": 118.0,
                "predicted_rul": 125.4435412955936
              },
              {
                "cycle": 46,
                "true_rul": 117.0,
                "predicted_rul": 123.95159391473862
              },
              {
                "cycle": 47,
                "true_rul": 116.0,
                "predicted_rul": 124.82729593871045
              },
              {
                "cycle": 48,
                "true_rul": 115.0,
                "predicted_rul": 128.76051340135746
              },
              {
                "cycle": 49,
                "true_rul": 114.0,
                "predicted_rul": 126.54808032384608
              },
              {
                "cycle": 50,
                "true_rul": 113.0,
                "predicted_rul": 127.66839223157149
              },
              {
                "cycle": 51,
                "true_rul": 112.0,
                "predicted_rul": 127.28251134400489
              },
              {
                "cycle": 52,
                "true_rul": 111.0,
                "predicted_rul": 127.37901567015797
              },
              {
                "cycle": 53,
                "true_rul": 110.0,
                "predicted_rul": 128.0137032624043
              },
              {
                "cycle": 54,
                "true_rul": 109.0,
                "predicted_rul": 129.48526159627363
              },
              {
                "cycle": 55,
                "true_rul": 108.0,
                "predicted_rul": 132.2585872055788
              },
              {
                "cycle": 56,
                "true_rul": 107.0,
                "predicted_rul": 130.40672413702123
              },
              {
                "cycle": 57,
                "true_rul": 106.0,
                "predicted_rul": 131.79367501969682
              },
              {
                "cycle": 58,
                "true_rul": 105.0,
                "predicted_rul": 130.77236212595017
              },
              {
                "cycle": 59,
                "true_rul": 104.0,
                "predicted_rul": 124.21696516999509
              },
              {
                "cycle": 60,
                "true_rul": 103.0,
                "predicted_rul": 122.27380444452865
              },
              {
                "cycle": 61,
                "true_rul": 102.0,
                "predicted_rul": 121.98892653247458
              },
              {
                "cycle": 62,
                "true_rul": 101.0,
                "predicted_rul": 123.00402390790987
              },
              {
                "cycle": 63,
                "true_rul": 100.0,
                "predicted_rul": 121.98652829730418
              },
              {
                "cycle": 64,
                "true_rul": 99.0,
                "predicted_rul": 122.55698400078109
              }
            ]
          },
          {
            "unit_number": 7,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 134.50577561193495
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 118.0249885560479
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 123.80314855725737
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 113.8474666151742
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 110.47869446440018
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 113.0087953521288
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 123.23199998980272
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 123.0086889686645
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 126.41269844194176
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 123.47406512033194
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 121.6232177898637
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 123.18766480463091
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 124.93070969122346
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 121.34727829429903
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 121.53827763680601
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 119.01286612672266
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 115.18666004855186
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 114.7321636514389
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 112.01030742138391
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 113.15702817865531
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 113.32426285289694
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 113.0034578361956
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 117.43309759252588
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 117.41960260318592
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 117.66383740724996
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 116.95961382772657
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 116.49407364806393
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 112.4700465790811
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 112.92686933078221
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 114.45807130742469
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 114.73754477137118
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 116.71769554974162
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 115.04308753527584
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 116.80327514137025
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 117.27527463436127
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 118.48084746973473
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 119.37765655317344
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 119.51960719790077
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 120.60529729712289
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 121.95566997741116
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 122.84348411744577
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 119.00099288171623
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 118.61604414661997
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 117.59628727243398
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 116.73238207382383
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 116.41376683011185
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 116.06190473819152
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 116.67084414174315
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 116.63249958134838
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 112.51408219037694
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 113.89852744090604
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 113.63263203643146
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 115.21844563953346
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 113.31681012440822
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 114.01983747450868
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 111.38207902861177
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 112.7864480453427
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 115.36326183544588
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 114.15035735699348
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 113.67374248913256
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 110.22977548354538
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 110.03105371521087
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 111.4138939397235
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 111.32949580682907
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 111.42713760473998
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 112.72632236609934
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 115.1390481973649
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 120.53763048927067
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 119.13749288377585
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 120.16997116198763
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 119.39446574202157
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 118.79927779216086
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 119.63124750065617
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 118.28780410703621
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 118.34131267966586
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 116.83545781092835
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 119.59514378808672
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 119.82910598625313
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 119.70344038231997
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 118.36088041996118
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 120.31099755887408
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 114.22242972365348
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 114.99133663528482
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 117.43071885994868
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 117.56806775511359
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 116.50189597011195
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 113.61224506795406
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 109.90756473425427
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 111.68201364768902
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 106.61901741841575
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 107.71555377321783
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 104.7702876701951
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 104.6494846335263
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 106.97764144226676
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 106.23427837059717
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 102.51903731620405
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 103.68996074021561
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 102.06301860060194
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 102.82399354610243
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 106.02086663342197
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 106.05155493755592
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 111.5147630473657
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 111.05377080797916
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 107.85504463649704
              },
              {
                "cycle": 105,
                "true_rul": 124.0,
                "predicted_rul": 107.27775295230094
              },
              {
                "cycle": 106,
                "true_rul": 123.0,
                "predicted_rul": 105.39714487484889
              },
              {
                "cycle": 107,
                "true_rul": 122.0,
                "predicted_rul": 104.56593340798281
              },
              {
                "cycle": 108,
                "true_rul": 121.0,
                "predicted_rul": 104.17181021001306
              },
              {
                "cycle": 109,
                "true_rul": 120.0,
                "predicted_rul": 103.2109579280077
              },
              {
                "cycle": 110,
                "true_rul": 119.0,
                "predicted_rul": 103.96490707891644
              },
              {
                "cycle": 111,
                "true_rul": 118.0,
                "predicted_rul": 102.02720078715356
              },
              {
                "cycle": 112,
                "true_rul": 117.0,
                "predicted_rul": 100.94189422621275
              },
              {
                "cycle": 113,
                "true_rul": 116.0,
                "predicted_rul": 101.56751425348921
              },
              {
                "cycle": 114,
                "true_rul": 115.0,
                "predicted_rul": 100.68340871250257
              },
              {
                "cycle": 115,
                "true_rul": 114.0,
                "predicted_rul": 100.2391388785909
              },
              {
                "cycle": 116,
                "true_rul": 113.0,
                "predicted_rul": 102.46259523107437
              },
              {
                "cycle": 117,
                "true_rul": 112.0,
                "predicted_rul": 98.8774750145385
              },
              {
                "cycle": 118,
                "true_rul": 111.0,
                "predicted_rul": 98.68898486159742
              },
              {
                "cycle": 119,
                "true_rul": 110.0,
                "predicted_rul": 98.20968639891362
              },
              {
                "cycle": 120,
                "true_rul": 109.0,
                "predicted_rul": 95.68243744462961
              },
              {
                "cycle": 121,
                "true_rul": 108.0,
                "predicted_rul": 96.358854702994
              },
              {
                "cycle": 122,
                "true_rul": 107.0,
                "predicted_rul": 92.95703339247848
              },
              {
                "cycle": 123,
                "true_rul": 106.0,
                "predicted_rul": 92.53822826591204
              },
              {
                "cycle": 124,
                "true_rul": 105.0,
                "predicted_rul": 90.39092638262082
              },
              {
                "cycle": 125,
                "true_rul": 104.0,
                "predicted_rul": 91.73526663865778
              },
              {
                "cycle": 126,
                "true_rul": 103.0,
                "predicted_rul": 92.33124655165011
              },
              {
                "cycle": 127,
                "true_rul": 102.0,
                "predicted_rul": 92.74129231629195
              },
              {
                "cycle": 128,
                "true_rul": 101.0,
                "predicted_rul": 92.50055608109687
              },
              {
                "cycle": 129,
                "true_rul": 100.0,
                "predicted_rul": 92.00389580204501
              },
              {
                "cycle": 130,
                "true_rul": 99.0,
                "predicted_rul": 90.64491232484579
              },
              {
                "cycle": 131,
                "true_rul": 98.0,
                "predicted_rul": 92.96608073517564
              },
              {
                "cycle": 132,
                "true_rul": 97.0,
                "predicted_rul": 93.78037613414926
              },
              {
                "cycle": 133,
                "true_rul": 96.0,
                "predicted_rul": 95.047835835343
              },
              {
                "cycle": 134,
                "true_rul": 95.0,
                "predicted_rul": 95.46875542405178
              },
              {
                "cycle": 135,
                "true_rul": 94.0,
                "predicted_rul": 96.33042824681615
              },
              {
                "cycle": 136,
                "true_rul": 93.0,
                "predicted_rul": 94.86865130215301
              },
              {
                "cycle": 137,
                "true_rul": 92.0,
                "predicted_rul": 96.19387948335498
              },
              {
                "cycle": 138,
                "true_rul": 91.0,
                "predicted_rul": 97.19546095179976
              },
              {
                "cycle": 139,
                "true_rul": 90.0,
                "predicted_rul": 95.94574692900642
              },
              {
                "cycle": 140,
                "true_rul": 89.0,
                "predicted_rul": 97.94215564866317
              },
              {
                "cycle": 141,
                "true_rul": 88.0,
                "predicted_rul": 96.63089650621987
              },
              {
                "cycle": 142,
                "true_rul": 87.0,
                "predicted_rul": 98.97176756642875
              },
              {
                "cycle": 143,
                "true_rul": 86.0,
                "predicted_rul": 98.81576544209383
              },
              {
                "cycle": 144,
                "true_rul": 85.0,
                "predicted_rul": 98.73074865117087
              },
              {
                "cycle": 145,
                "true_rul": 84.0,
                "predicted_rul": 99.56690258262097
              },
              {
                "cycle": 146,
                "true_rul": 83.0,
                "predicted_rul": 98.50866759350174
              },
              {
                "cycle": 147,
                "true_rul": 82.0,
                "predicted_rul": 95.4776176433952
              },
              {
                "cycle": 148,
                "true_rul": 81.0,
                "predicted_rul": 96.8398375082179
              },
              {
                "cycle": 149,
                "true_rul": 80.0,
                "predicted_rul": 98.35495013024774
              },
              {
                "cycle": 150,
                "true_rul": 79.0,
                "predicted_rul": 100.885006797791
              },
              {
                "cycle": 151,
                "true_rul": 78.0,
                "predicted_rul": 98.9758730212634
              },
              {
                "cycle": 152,
                "true_rul": 77.0,
                "predicted_rul": 98.8432064546214
              },
              {
                "cycle": 153,
                "true_rul": 76.0,
                "predicted_rul": 96.86221536673838
              },
              {
                "cycle": 154,
                "true_rul": 75.0,
                "predicted_rul": 95.16500835839543
              },
              {
                "cycle": 155,
                "true_rul": 74.0,
                "predicted_rul": 97.41713677096413
              },
              {
                "cycle": 156,
                "true_rul": 73.0,
                "predicted_rul": 93.564155752043
              },
              {
                "cycle": 157,
                "true_rul": 72.0,
                "predicted_rul": 92.51126439176733
              },
              {
                "cycle": 158,
                "true_rul": 71.0,
                "predicted_rul": 90.09658468922134
              }
            ]
          },
          {
            "unit_number": 8,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 123.33233177565853
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 130.17049746928387
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 115.82041777650011
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 109.76040349132381
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 113.46659159124829
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 119.10957111296011
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 119.15419682263746
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 116.84670513845049
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 124.34550648569711
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 128.95114305370953
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 130.50797531878925
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 132.19482020370197
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 133.10722896596417
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 136.22289488525712
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 134.71000762082986
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 136.0920423886855
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 133.84014531198773
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 133.9975664780941
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 133.5113201723725
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 134.79197316095815
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 135.61424086484476
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 135.75447657326004
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 132.41460800051573
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 131.35858611750882
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 129.006593434955
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 130.23230816898285
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 131.46493933198508
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 131.79318010041607
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 130.64164240038372
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 130.16743041100563
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 128.21599484371836
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 130.9676359576697
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 130.97480827441905
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 129.0143076319364
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 129.169364482339
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 128.592036789516
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 128.82507156275096
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 127.7417359893443
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 127.61504209120176
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 129.47835949264118
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 128.02929907810176
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 128.7995371032739
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 126.9289446445764
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 129.9531751271861
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 127.86319908167934
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 129.50301248632604
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 132.53464178636204
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 130.47499985678587
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 132.09439322369872
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 129.84712506720098
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 131.11619035652257
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 128.86789854607196
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 126.54461169498973
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 125.37785366116441
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 123.5769431910303
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 125.07274958366179
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 124.47908494525473
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 124.9046601150767
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 126.12156058897381
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 124.80672158210655
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 127.26332421670668
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 126.91851291627972
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 127.36421257571783
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 126.76215754938312
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 126.57757064179168
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 124.348346793995
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 121.05046783009311
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 123.85080424003536
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 122.89175327279372
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 127.69476375810336
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 127.21463444223627
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 128.47842398032662
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 128.97158453933662
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 133.1003933220636
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 132.85364805947756
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 130.01572344699525
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 130.05866462434642
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 126.36184855335159
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 124.0745665373397
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 123.59039933717577
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 126.6315215267532
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 129.13935878645862
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 129.14199828336132
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 130.68287537721335
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 129.51233637184487
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 128.16794511734042
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 125.74469817595673
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 123.82908621817478
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 127.35016563386307
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 129.52793709372054
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 129.05202652374282
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 126.24432400384103
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 124.10329073603498
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 120.92624033993343
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 118.68997946562013
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 119.43209376817686
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 119.48475018184399
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 121.71478733845288
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 120.72660249011824
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 115.7840490140079
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 116.33459037507419
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 116.05494864450884
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 115.53061795356916
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 115.99704262238811
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 115.14831461431459
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 118.81030282037682
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 119.39906925571267
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 117.09184754287708
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 115.91023682279047
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 114.9111125615018
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 114.060503639339
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 113.17166783360881
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 112.54079068111605
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 111.58184230071492
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 113.0548719849321
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 111.76975301589118
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 108.80053731819498
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 107.1685416851542
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 107.18984736822313
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 110.53185153854429
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 107.558893166919
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 106.91011207041447
              },
              {
                "cycle": 123,
                "true_rul": 124.0,
                "predicted_rul": 109.58461065310985
              },
              {
                "cycle": 124,
                "true_rul": 123.0,
                "predicted_rul": 110.99444982633577
              },
              {
                "cycle": 125,
                "true_rul": 122.0,
                "predicted_rul": 110.24044277946814
              },
              {
                "cycle": 126,
                "true_rul": 121.0,
                "predicted_rul": 108.88677717579412
              },
              {
                "cycle": 127,
                "true_rul": 120.0,
                "predicted_rul": 108.61803155834787
              },
              {
                "cycle": 128,
                "true_rul": 119.0,
                "predicted_rul": 110.23312089766841
              },
              {
                "cycle": 129,
                "true_rul": 118.0,
                "predicted_rul": 110.31877745327074
              },
              {
                "cycle": 130,
                "true_rul": 117.0,
                "predicted_rul": 111.13164185651112
              },
              {
                "cycle": 131,
                "true_rul": 116.0,
                "predicted_rul": 109.95223463734146
              },
              {
                "cycle": 132,
                "true_rul": 115.0,
                "predicted_rul": 109.32202617486473
              },
              {
                "cycle": 133,
                "true_rul": 114.0,
                "predicted_rul": 110.79365059110569
              },
              {
                "cycle": 134,
                "true_rul": 113.0,
                "predicted_rul": 105.68142639595317
              },
              {
                "cycle": 135,
                "true_rul": 112.0,
                "predicted_rul": 105.38786926295143
              },
              {
                "cycle": 136,
                "true_rul": 111.0,
                "predicted_rul": 105.4586141128093
              },
              {
                "cycle": 137,
                "true_rul": 110.0,
                "predicted_rul": 106.32244223798625
              },
              {
                "cycle": 138,
                "true_rul": 109.0,
                "predicted_rul": 103.12428999552503
              },
              {
                "cycle": 139,
                "true_rul": 108.0,
                "predicted_rul": 100.79758925188798
              },
              {
                "cycle": 140,
                "true_rul": 107.0,
                "predicted_rul": 97.87185863539344
              },
              {
                "cycle": 141,
                "true_rul": 106.0,
                "predicted_rul": 102.5567083384667
              },
              {
                "cycle": 142,
                "true_rul": 105.0,
                "predicted_rul": 104.28252641388099
              },
              {
                "cycle": 143,
                "true_rul": 104.0,
                "predicted_rul": 104.94929736605263
              },
              {
                "cycle": 144,
                "true_rul": 103.0,
                "predicted_rul": 103.68651060314733
              },
              {
                "cycle": 145,
                "true_rul": 102.0,
                "predicted_rul": 102.41414666725905
              },
              {
                "cycle": 146,
                "true_rul": 101.0,
                "predicted_rul": 100.84260598185938
              },
              {
                "cycle": 147,
                "true_rul": 100.0,
                "predicted_rul": 99.32302332212566
              },
              {
                "cycle": 148,
                "true_rul": 99.0,
                "predicted_rul": 97.99634792859433
              },
              {
                "cycle": 149,
                "true_rul": 98.0,
                "predicted_rul": 98.55297370589687
              },
              {
                "cycle": 150,
                "true_rul": 97.0,
                "predicted_rul": 96.57546053928672
              },
              {
                "cycle": 151,
                "true_rul": 96.0,
                "predicted_rul": 98.6262095386628
              },
              {
                "cycle": 152,
                "true_rul": 95.0,
                "predicted_rul": 98.24511269613868
              },
              {
                "cycle": 153,
                "true_rul": 94.0,
                "predicted_rul": 98.7695127852785
              },
              {
                "cycle": 154,
                "true_rul": 93.0,
                "predicted_rul": 101.93174816088867
              },
              {
                "cycle": 155,
                "true_rul": 92.0,
                "predicted_rul": 98.21885441726772
              },
              {
                "cycle": 156,
                "true_rul": 91.0,
                "predicted_rul": 95.23783327717683
              },
              {
                "cycle": 157,
                "true_rul": 90.0,
                "predicted_rul": 93.15198402691749
              },
              {
                "cycle": 158,
                "true_rul": 89.0,
                "predicted_rul": 94.211060863483
              },
              {
                "cycle": 159,
                "true_rul": 88.0,
                "predicted_rul": 90.95425150779192
              },
              {
                "cycle": 160,
                "true_rul": 87.0,
                "predicted_rul": 88.53086261771386
              },
              {
                "cycle": 161,
                "true_rul": 86.0,
                "predicted_rul": 86.29912031060667
              },
              {
                "cycle": 162,
                "true_rul": 85.0,
                "predicted_rul": 87.8210000169347
              },
              {
                "cycle": 163,
                "true_rul": 84.0,
                "predicted_rul": 87.40902283298783
              },
              {
                "cycle": 164,
                "true_rul": 83.0,
                "predicted_rul": 88.59206980356248
              },
              {
                "cycle": 165,
                "true_rul": 82.0,
                "predicted_rul": 89.7365143946954
              },
              {
                "cycle": 166,
                "true_rul": 81.0,
                "predicted_rul": 85.42753829222056
              },
              {
                "cycle": 167,
                "true_rul": 80.0,
                "predicted_rul": 85.85605757785379
              },
              {
                "cycle": 168,
                "true_rul": 79.0,
                "predicted_rul": 88.0545205915696
              },
              {
                "cycle": 169,
                "true_rul": 78.0,
                "predicted_rul": 88.36338191508548
              },
              {
                "cycle": 170,
                "true_rul": 77.0,
                "predicted_rul": 89.37500277985237
              },
              {
                "cycle": 171,
                "true_rul": 76.0,
                "predicted_rul": 89.94867385519319
              },
              {
                "cycle": 172,
                "true_rul": 75.0,
                "predicted_rul": 87.08749638570589
              },
              {
                "cycle": 173,
                "true_rul": 74.0,
                "predicted_rul": 85.47651173910708
              },
              {
                "cycle": 174,
                "true_rul": 73.0,
                "predicted_rul": 85.94140478118788
              },
              {
                "cycle": 175,
                "true_rul": 72.0,
                "predicted_rul": 86.74481609213399
              },
              {
                "cycle": 176,
                "true_rul": 71.0,
                "predicted_rul": 86.91467478542472
              },
              {
                "cycle": 177,
                "true_rul": 70.0,
                "predicted_rul": 83.0599683538021
              },
              {
                "cycle": 178,
                "true_rul": 69.0,
                "predicted_rul": 80.12859557507909
              },
              {
                "cycle": 179,
                "true_rul": 68.0,
                "predicted_rul": 86.71788849594304
              },
              {
                "cycle": 180,
                "true_rul": 67.0,
                "predicted_rul": 90.14549841568805
              },
              {
                "cycle": 181,
                "true_rul": 66.0,
                "predicted_rul": 89.90770842923666
              },
              {
                "cycle": 182,
                "true_rul": 65.0,
                "predicted_rul": 87.76159704872407
              },
              {
                "cycle": 183,
                "true_rul": 64.0,
                "predicted_rul": 91.74823240481783
              },
              {
                "cycle": 184,
                "true_rul": 63.0,
                "predicted_rul": 89.48672734256252
              },
              {
                "cycle": 185,
                "true_rul": 62.0,
                "predicted_rul": 87.52194172693999
              },
              {
                "cycle": 186,
                "true_rul": 61.0,
                "predicted_rul": 86.05032048394787
              },
              {
                "cycle": 187,
                "true_rul": 60.0,
                "predicted_rul": 86.66550906025805
              },
              {
                "cycle": 188,
                "true_rul": 59.0,
                "predicted_rul": 77.29817249040934
              },
              {
                "cycle": 189,
                "true_rul": 58.0,
                "predicted_rul": 73.7592082459887
              },
              {
                "cycle": 190,
                "true_rul": 57.0,
                "predicted_rul": 70.68391227687243
              },
              {
                "cycle": 191,
                "true_rul": 56.0,
                "predicted_rul": 71.24908040315495
              },
              {
                "cycle": 192,
                "true_rul": 55.0,
                "predicted_rul": 74.57404203820624
              }
            ]
          }
        ]
      }
    },
    "FD004": {
      "dataset": "FD004",
      "available_datasets": [
        "FD001",
        "FD002",
        "FD003",
        "FD004"
      ],
      "generated_at": "2026-07-20T13:50:36Z",
      "rul_regression": {
        "dataset_id": "FD004",
        "RMSE": 18.36133379809933,
        "MAE": 13.788844757493429,
        "R2": 0.5196558654608742,
        "lead_time_cycles": 45
      },
      "anomaly_classification": {
        "model_name": "LightGBM_Anomaly",
        "threshold": 0.9198,
        "F1_Score": 0.5862068965517241,
        "Accuracy": 0.9805036555645816
      },
      "feature_importance": {
        "features": [
          [
            "sensor_8_roll_mean_20",
            813.2593988190317
          ],
          [
            "sensor_8_expanding_mean",
            627.1709461205593
          ],
          [
            "sensor_13_roll_mean_20",
            574.361123300035
          ],
          [
            "sensor_13_expanding_mean",
            551.7647161493901
          ],
          [
            "op_setting_3",
            439.1605217311664
          ]
        ]
      },
      "data_drift": {
        "threshold": 0.2,
        "timestamp": "2026-07-16T10:50:56Z",
        "is_sample": true,
        "features": {
          "sensor_11": {
            "psi": 0.01,
            "status": "stable"
          }
        }
      },
      "rul_trajectories": {
        "is_sample": false,
        "units": [
          {
            "unit_number": "LIVE",
            "life": 81,
            "trajectory": [
              {
                "cycle": 20,
                "predicted_rul": 0.0
              },
              {
                "cycle": 21,
                "predicted_rul": 0.0
              },
              {
                "cycle": 22,
                "predicted_rul": 0.0
              },
              {
                "cycle": 23,
                "predicted_rul": 0.0
              },
              {
                "cycle": 24,
                "predicted_rul": 0.0
              },
              {
                "cycle": 25,
                "predicted_rul": 0.0
              },
              {
                "cycle": 26,
                "predicted_rul": 0.0
              },
              {
                "cycle": 27,
                "predicted_rul": 0.0
              },
              {
                "cycle": 28,
                "predicted_rul": 0.0
              },
              {
                "cycle": 29,
                "predicted_rul": 0.0
              },
              {
                "cycle": 30,
                "predicted_rul": 0.0
              },
              {
                "cycle": 31,
                "predicted_rul": 0.0
              },
              {
                "cycle": 32,
                "predicted_rul": 0.0
              },
              {
                "cycle": 33,
                "predicted_rul": 0.0
              },
              {
                "cycle": 34,
                "predicted_rul": 0.0
              },
              {
                "cycle": 35,
                "predicted_rul": 0.0
              },
              {
                "cycle": 36,
                "predicted_rul": 0.0
              },
              {
                "cycle": 37,
                "predicted_rul": 0.0
              },
              {
                "cycle": 38,
                "predicted_rul": 0.0
              },
              {
                "cycle": 39,
                "predicted_rul": 0.0
              },
              {
                "cycle": 40,
                "predicted_rul": 0.0
              },
              {
                "cycle": 41,
                "predicted_rul": 0.0
              },
              {
                "cycle": 42,
                "predicted_rul": 0.0
              },
              {
                "cycle": 43,
                "predicted_rul": 0.0
              },
              {
                "cycle": 44,
                "predicted_rul": 0.0
              },
              {
                "cycle": 45,
                "predicted_rul": 0.0
              },
              {
                "cycle": 46,
                "predicted_rul": 0.0
              },
              {
                "cycle": 47,
                "predicted_rul": 0.0
              },
              {
                "cycle": 48,
                "predicted_rul": 0.0
              },
              {
                "cycle": 49,
                "predicted_rul": 0.0
              },
              {
                "cycle": 50,
                "predicted_rul": 0.0
              },
              {
                "cycle": 51,
                "predicted_rul": 0.0
              },
              {
                "cycle": 52,
                "predicted_rul": 0.0
              },
              {
                "cycle": 53,
                "predicted_rul": 0.0
              },
              {
                "cycle": 54,
                "predicted_rul": 0.0
              },
              {
                "cycle": 55,
                "predicted_rul": 0.0
              },
              {
                "cycle": 56,
                "predicted_rul": 0.0
              },
              {
                "cycle": 57,
                "predicted_rul": 0.0
              },
              {
                "cycle": 58,
                "predicted_rul": 0.0
              },
              {
                "cycle": 59,
                "predicted_rul": 0.0
              },
              {
                "cycle": 60,
                "predicted_rul": 0.0
              },
              {
                "cycle": 61,
                "predicted_rul": 0.0
              },
              {
                "cycle": 62,
                "predicted_rul": 0.0
              },
              {
                "cycle": 63,
                "predicted_rul": 0.0
              },
              {
                "cycle": 64,
                "predicted_rul": 0.0
              },
              {
                "cycle": 65,
                "predicted_rul": 0.0
              },
              {
                "cycle": 66,
                "predicted_rul": 0.0
              },
              {
                "cycle": 67,
                "predicted_rul": 0.0
              },
              {
                "cycle": 68,
                "predicted_rul": 0.0
              },
              {
                "cycle": 69,
                "predicted_rul": 0.0
              },
              {
                "cycle": 70,
                "predicted_rul": 0.0
              },
              {
                "cycle": 71,
                "predicted_rul": 0.0
              },
              {
                "cycle": 72,
                "predicted_rul": 0.0
              },
              {
                "cycle": 73,
                "predicted_rul": 0.0
              },
              {
                "cycle": 74,
                "predicted_rul": 0.0
              },
              {
                "cycle": 75,
                "predicted_rul": 0.0
              },
              {
                "cycle": 76,
                "predicted_rul": 0.0
              },
              {
                "cycle": 77,
                "predicted_rul": 0.0
              },
              {
                "cycle": 78,
                "predicted_rul": 0.0
              },
              {
                "cycle": 79,
                "predicted_rul": 0.0
              },
              {
                "cycle": 80,
                "predicted_rul": 0.0
              },
              {
                "cycle": 81,
                "predicted_rul": 0.0
              },
              {
                "cycle": 82,
                "predicted_rul": 0.0
              },
              {
                "cycle": 83,
                "predicted_rul": 0.0
              },
              {
                "cycle": 84,
                "predicted_rul": 0.0
              },
              {
                "cycle": 85,
                "predicted_rul": 0.0
              },
              {
                "cycle": 86,
                "predicted_rul": 0.0
              },
              {
                "cycle": 87,
                "predicted_rul": 0.0
              },
              {
                "cycle": 88,
                "predicted_rul": 0.0
              },
              {
                "cycle": 89,
                "predicted_rul": 0.0
              },
              {
                "cycle": 90,
                "predicted_rul": 0.0
              },
              {
                "cycle": 91,
                "predicted_rul": 0.0
              },
              {
                "cycle": 92,
                "predicted_rul": 0.0
              },
              {
                "cycle": 93,
                "predicted_rul": 0.0
              },
              {
                "cycle": 94,
                "predicted_rul": 0.0
              },
              {
                "cycle": 95,
                "predicted_rul": 0.0
              },
              {
                "cycle": 96,
                "predicted_rul": 0.0
              },
              {
                "cycle": 97,
                "predicted_rul": 0.0
              },
              {
                "cycle": 98,
                "predicted_rul": 0.0
              },
              {
                "cycle": 99,
                "predicted_rul": 0.0
              },
              {
                "cycle": 100,
                "predicted_rul": 0.0
              }
            ]
          },
          {
            "unit_number": 1,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 168.1128321918768
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 119.96730019537063
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 131.31872709194067
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 110.19715206059118
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 129.91754223484895
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 119.77293985883807
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 123.46872261742101
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 126.0299248516385
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 126.83993585555072
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 128.46201259351074
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 130.79083288199763
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 128.03728510061774
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 127.42780189767655
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 128.73878035179587
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 134.38791474954633
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 130.13096589165434
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 127.17316023443345
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 132.24019945817054
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 123.88344329829124
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 127.71761718635753
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 128.61477616222692
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 131.41033197593424
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 129.05035599767507
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 133.27341086355955
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 132.53745325879572
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 119.78796605397656
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 126.09895651694387
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 126.81622300950403
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 126.4473633988091
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 126.06148022818888
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 127.01968623087669
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 125.8019541681715
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 134.35675081286536
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 124.81890995466529
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 132.7656629025514
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 132.06170010368078
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 137.34306600665514
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 126.94745009606049
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 128.24170412780222
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 132.1386100875352
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 128.56166772361394
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 121.12648710373833
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 129.9773898260828
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 130.34870381414294
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 115.1522177351435
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 128.46577374040862
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 125.6949931075651
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 116.66477101838973
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 122.48993467085165
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 127.4331575348042
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 124.9791267334258
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 127.50619508169257
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 131.4359416481566
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 131.5380245368251
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 129.1184782095188
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 130.51942400886037
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 131.15512948746982
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 126.3507458949025
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 125.19783894358625
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 133.13926458817514
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 125.8573321987933
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 132.6009989717386
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 135.56047562248204
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 140.69437590314556
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 130.43644983206468
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 129.00185824259825
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 131.5520508940608
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 132.86692294650857
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 127.79019358456208
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 129.3317614766056
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 129.15274032367597
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 122.3285434206773
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 132.38279076105027
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 128.0768320515308
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 129.6519853999962
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 128.44339677359312
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 121.20441142200798
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 123.31076059770567
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 128.911999691245
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 125.56922934140312
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 128.24834560403906
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 127.8393885697842
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 118.26894941135834
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 118.16368484729901
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 121.7632621376215
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 119.87977692693676
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 119.92052388161756
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 119.48949217192785
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 117.25206002683262
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 117.40485524595351
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 119.7647081930736
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 115.02959827526138
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 116.06206008513254
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 120.09370771409885
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 117.57641233675531
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 108.22928901238993
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 111.7934573151033
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 119.965699618715
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 111.52204201235509
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 116.7405160354756
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 110.42566883659674
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 112.70215526351603
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 121.99389882770993
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 120.54761327242886
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 120.92936043860755
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 119.52741419781887
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 117.60413797071305
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 113.13163536247885
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 119.92721699618414
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 117.51958762389404
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 117.99887877763103
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 121.68339697568081
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 123.80061288849902
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 125.32416111118437
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 127.68489612412304
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 127.64307674483643
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 128.85518266306462
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 124.04213962435097
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 127.37885901123082
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 127.45789907296785
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 128.25906551262233
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 127.21064978907452
              },
              {
                "cycle": 123,
                "true_rul": 125.0,
                "predicted_rul": 127.84748956762269
              },
              {
                "cycle": 124,
                "true_rul": 125.0,
                "predicted_rul": 125.08012530759515
              },
              {
                "cycle": 125,
                "true_rul": 125.0,
                "predicted_rul": 119.90084190186826
              },
              {
                "cycle": 126,
                "true_rul": 125.0,
                "predicted_rul": 125.87783121512257
              },
              {
                "cycle": 127,
                "true_rul": 125.0,
                "predicted_rul": 122.86337666912368
              },
              {
                "cycle": 128,
                "true_rul": 124.0,
                "predicted_rul": 123.29035332260901
              },
              {
                "cycle": 129,
                "true_rul": 123.0,
                "predicted_rul": 126.03540333464116
              },
              {
                "cycle": 130,
                "true_rul": 122.0,
                "predicted_rul": 119.80628069916202
              },
              {
                "cycle": 131,
                "true_rul": 121.0,
                "predicted_rul": 124.72384300337217
              },
              {
                "cycle": 132,
                "true_rul": 120.0,
                "predicted_rul": 130.58219658109738
              },
              {
                "cycle": 133,
                "true_rul": 119.0,
                "predicted_rul": 122.09953061120177
              },
              {
                "cycle": 134,
                "true_rul": 118.0,
                "predicted_rul": 124.83862751444394
              },
              {
                "cycle": 135,
                "true_rul": 117.0,
                "predicted_rul": 124.69540303282702
              },
              {
                "cycle": 136,
                "true_rul": 116.0,
                "predicted_rul": 120.23174404878955
              },
              {
                "cycle": 137,
                "true_rul": 115.0,
                "predicted_rul": 133.3803928074958
              },
              {
                "cycle": 138,
                "true_rul": 114.0,
                "predicted_rul": 123.16554731962242
              },
              {
                "cycle": 139,
                "true_rul": 113.0,
                "predicted_rul": 126.64660216310222
              },
              {
                "cycle": 140,
                "true_rul": 112.0,
                "predicted_rul": 124.48130884889906
              },
              {
                "cycle": 141,
                "true_rul": 111.0,
                "predicted_rul": 124.1661622971078
              },
              {
                "cycle": 142,
                "true_rul": 110.0,
                "predicted_rul": 125.47717805816501
              },
              {
                "cycle": 143,
                "true_rul": 109.0,
                "predicted_rul": 128.31563475751682
              },
              {
                "cycle": 144,
                "true_rul": 108.0,
                "predicted_rul": 126.71438152865812
              },
              {
                "cycle": 145,
                "true_rul": 107.0,
                "predicted_rul": 120.53934437000498
              },
              {
                "cycle": 146,
                "true_rul": 106.0,
                "predicted_rul": 112.01442144407702
              },
              {
                "cycle": 147,
                "true_rul": 105.0,
                "predicted_rul": 118.22627237424604
              },
              {
                "cycle": 148,
                "true_rul": 104.0,
                "predicted_rul": 114.81586213834453
              },
              {
                "cycle": 149,
                "true_rul": 103.0,
                "predicted_rul": 113.99849371569508
              },
              {
                "cycle": 150,
                "true_rul": 102.0,
                "predicted_rul": 113.57959387674782
              },
              {
                "cycle": 151,
                "true_rul": 101.0,
                "predicted_rul": 118.40878925978541
              },
              {
                "cycle": 152,
                "true_rul": 100.0,
                "predicted_rul": 115.86356537858592
              },
              {
                "cycle": 153,
                "true_rul": 99.0,
                "predicted_rul": 117.99564141587325
              },
              {
                "cycle": 154,
                "true_rul": 98.0,
                "predicted_rul": 117.68711237380921
              },
              {
                "cycle": 155,
                "true_rul": 97.0,
                "predicted_rul": 120.60023736892254
              },
              {
                "cycle": 156,
                "true_rul": 96.0,
                "predicted_rul": 116.60031743556101
              },
              {
                "cycle": 157,
                "true_rul": 95.0,
                "predicted_rul": 114.42660472063653
              },
              {
                "cycle": 158,
                "true_rul": 94.0,
                "predicted_rul": 120.96644293379359
              },
              {
                "cycle": 159,
                "true_rul": 93.0,
                "predicted_rul": 122.82829130347454
              },
              {
                "cycle": 160,
                "true_rul": 92.0,
                "predicted_rul": 118.21089654861134
              },
              {
                "cycle": 161,
                "true_rul": 91.0,
                "predicted_rul": 119.49345853474733
              },
              {
                "cycle": 162,
                "true_rul": 90.0,
                "predicted_rul": 111.57955737132579
              },
              {
                "cycle": 163,
                "true_rul": 89.0,
                "predicted_rul": 110.21282492401951
              },
              {
                "cycle": 164,
                "true_rul": 88.0,
                "predicted_rul": 109.16312737900807
              },
              {
                "cycle": 165,
                "true_rul": 87.0,
                "predicted_rul": 107.40313154682735
              },
              {
                "cycle": 166,
                "true_rul": 86.0,
                "predicted_rul": 116.07159675144794
              },
              {
                "cycle": 167,
                "true_rul": 85.0,
                "predicted_rul": 110.70823929891048
              },
              {
                "cycle": 168,
                "true_rul": 84.0,
                "predicted_rul": 111.75580843684293
              },
              {
                "cycle": 169,
                "true_rul": 83.0,
                "predicted_rul": 108.39583915379626
              },
              {
                "cycle": 170,
                "true_rul": 82.0,
                "predicted_rul": 100.446016346752
              },
              {
                "cycle": 171,
                "true_rul": 81.0,
                "predicted_rul": 104.20182000052955
              },
              {
                "cycle": 172,
                "true_rul": 80.0,
                "predicted_rul": 98.83497093416008
              },
              {
                "cycle": 173,
                "true_rul": 79.0,
                "predicted_rul": 100.37313767894739
              },
              {
                "cycle": 174,
                "true_rul": 78.0,
                "predicted_rul": 98.01165035144732
              },
              {
                "cycle": 175,
                "true_rul": 77.0,
                "predicted_rul": 98.14164771377182
              },
              {
                "cycle": 176,
                "true_rul": 76.0,
                "predicted_rul": 99.0651879451143
              },
              {
                "cycle": 177,
                "true_rul": 75.0,
                "predicted_rul": 103.74461050133687
              },
              {
                "cycle": 178,
                "true_rul": 74.0,
                "predicted_rul": 99.47183750273689
              },
              {
                "cycle": 179,
                "true_rul": 73.0,
                "predicted_rul": 97.42660789809815
              },
              {
                "cycle": 180,
                "true_rul": 72.0,
                "predicted_rul": 99.84410559450407
              },
              {
                "cycle": 181,
                "true_rul": 71.0,
                "predicted_rul": 101.99913901657419
              },
              {
                "cycle": 182,
                "true_rul": 70.0,
                "predicted_rul": 103.00256793630979
              },
              {
                "cycle": 183,
                "true_rul": 69.0,
                "predicted_rul": 109.50799260433269
              },
              {
                "cycle": 184,
                "true_rul": 68.0,
                "predicted_rul": 104.40173005731776
              },
              {
                "cycle": 185,
                "true_rul": 67.0,
                "predicted_rul": 97.55173073098194
              },
              {
                "cycle": 186,
                "true_rul": 66.0,
                "predicted_rul": 101.04380454363854
              },
              {
                "cycle": 187,
                "true_rul": 65.0,
                "predicted_rul": 100.45914911175714
              },
              {
                "cycle": 188,
                "true_rul": 64.0,
                "predicted_rul": 97.39975259265339
              },
              {
                "cycle": 189,
                "true_rul": 63.0,
                "predicted_rul": 103.30900186287545
              },
              {
                "cycle": 190,
                "true_rul": 62.0,
                "predicted_rul": 102.40176303386033
              },
              {
                "cycle": 191,
                "true_rul": 61.0,
                "predicted_rul": 91.58492916998512
              },
              {
                "cycle": 192,
                "true_rul": 60.0,
                "predicted_rul": 100.73139719938627
              },
              {
                "cycle": 193,
                "true_rul": 59.0,
                "predicted_rul": 92.37917407076748
              },
              {
                "cycle": 194,
                "true_rul": 58.0,
                "predicted_rul": 95.30318491431535
              },
              {
                "cycle": 195,
                "true_rul": 57.0,
                "predicted_rul": 91.94119540080646
              },
              {
                "cycle": 196,
                "true_rul": 56.0,
                "predicted_rul": 89.06482283470177
              },
              {
                "cycle": 197,
                "true_rul": 55.0,
                "predicted_rul": 85.52477845698013
              },
              {
                "cycle": 198,
                "true_rul": 54.0,
                "predicted_rul": 83.28787088541503
              },
              {
                "cycle": 199,
                "true_rul": 53.0,
                "predicted_rul": 75.68962694999573
              },
              {
                "cycle": 200,
                "true_rul": 52.0,
                "predicted_rul": 75.72815365033966
              },
              {
                "cycle": 201,
                "true_rul": 51.0,
                "predicted_rul": 73.75727016813107
              },
              {
                "cycle": 202,
                "true_rul": 50.0,
                "predicted_rul": 72.98743700218984
              },
              {
                "cycle": 203,
                "true_rul": 49.0,
                "predicted_rul": 67.0822524550058
              },
              {
                "cycle": 204,
                "true_rul": 48.0,
                "predicted_rul": 70.7466619129591
              },
              {
                "cycle": 205,
                "true_rul": 47.0,
                "predicted_rul": 72.80875596288752
              },
              {
                "cycle": 206,
                "true_rul": 46.0,
                "predicted_rul": 66.15495379527783
              },
              {
                "cycle": 207,
                "true_rul": 45.0,
                "predicted_rul": 68.01224219960932
              },
              {
                "cycle": 208,
                "true_rul": 44.0,
                "predicted_rul": 66.96930292683828
              },
              {
                "cycle": 209,
                "true_rul": 43.0,
                "predicted_rul": 67.66521260407899
              },
              {
                "cycle": 210,
                "true_rul": 42.0,
                "predicted_rul": 76.37740221772401
              },
              {
                "cycle": 211,
                "true_rul": 41.0,
                "predicted_rul": 71.81420315226205
              },
              {
                "cycle": 212,
                "true_rul": 40.0,
                "predicted_rul": 75.91760262996468
              },
              {
                "cycle": 213,
                "true_rul": 39.0,
                "predicted_rul": 74.84167388147762
              },
              {
                "cycle": 214,
                "true_rul": 38.0,
                "predicted_rul": 68.98908855395712
              },
              {
                "cycle": 215,
                "true_rul": 37.0,
                "predicted_rul": 62.68705775657145
              },
              {
                "cycle": 216,
                "true_rul": 36.0,
                "predicted_rul": 65.42454480624292
              },
              {
                "cycle": 217,
                "true_rul": 35.0,
                "predicted_rul": 60.292236756569764
              },
              {
                "cycle": 218,
                "true_rul": 34.0,
                "predicted_rul": 63.24492972893131
              },
              {
                "cycle": 219,
                "true_rul": 33.0,
                "predicted_rul": 65.71916399129259
              },
              {
                "cycle": 220,
                "true_rul": 32.0,
                "predicted_rul": 58.07071588821782
              },
              {
                "cycle": 221,
                "true_rul": 31.0,
                "predicted_rul": 55.98139731348783
              },
              {
                "cycle": 222,
                "true_rul": 30.0,
                "predicted_rul": 52.26393730551354
              },
              {
                "cycle": 223,
                "true_rul": 29.0,
                "predicted_rul": 51.98918495142789
              },
              {
                "cycle": 224,
                "true_rul": 28.0,
                "predicted_rul": 49.50885637194733
              },
              {
                "cycle": 225,
                "true_rul": 27.0,
                "predicted_rul": 60.04227132714368
              },
              {
                "cycle": 226,
                "true_rul": 26.0,
                "predicted_rul": 47.00809794759698
              },
              {
                "cycle": 227,
                "true_rul": 25.0,
                "predicted_rul": 42.6016007474791
              },
              {
                "cycle": 228,
                "true_rul": 24.0,
                "predicted_rul": 39.40007719397181
              },
              {
                "cycle": 229,
                "true_rul": 23.0,
                "predicted_rul": 44.856296075173304
              },
              {
                "cycle": 230,
                "true_rul": 22.0,
                "predicted_rul": 44.607483620646235
              }
            ]
          },
          {
            "unit_number": 2,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 96.17932451533125
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 108.94527477588781
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 94.36478670279394
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 96.66356419182557
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 104.52163516755172
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 103.93209816466697
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 95.85531276520123
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 107.28267046274777
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 107.92040487710983
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 95.56726240990247
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 106.30551425572412
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 109.56892194377724
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 109.43447393583119
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 110.76974086175687
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 113.64958955569091
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 118.37065813639856
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 112.63983413860478
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 113.35862869923585
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 114.84868593342617
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 114.54142778062669
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 121.78869781194953
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 125.86124262575686
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 114.33389472279305
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 119.78426553170357
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 119.61528050984998
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 121.39352912723916
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 116.79803533274753
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 115.71425106015158
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 114.59274862689927
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 122.5841598847328
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 122.06668348637686
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 124.5338710665892
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 127.88125168301121
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 125.30956689754748
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 125.87352994689354
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 125.4078563466428
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 127.44893025014244
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 121.3872405941438
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 123.800747024663
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 114.35334392354707
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 120.94944259464319
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 118.43361996399108
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 123.3157288821385
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 122.61711071609534
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 121.24969734580372
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 115.76365817960686
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 125.14940356228544
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 115.85279571306091
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 115.9267293974699
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 117.76677421717977
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 121.0202943059885
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 124.5132341166136
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 128.2294114836186
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 122.63508612707301
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 122.80042752276131
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 124.85892594268807
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 123.65315030554484
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 122.9796730492344
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 120.65176314065684
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 121.91251612593987
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 122.60722264943615
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 123.15457680433246
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 128.22126146393202
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 123.78093202015953
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 125.72754923464163
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 120.20938248452512
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 117.89311342546716
              },
              {
                "cycle": 68,
                "true_rul": 124.0,
                "predicted_rul": 117.14922725056022
              },
              {
                "cycle": 69,
                "true_rul": 123.0,
                "predicted_rul": 114.36628588787062
              },
              {
                "cycle": 70,
                "true_rul": 122.0,
                "predicted_rul": 118.14045091913795
              },
              {
                "cycle": 71,
                "true_rul": 121.0,
                "predicted_rul": 114.34764341015034
              },
              {
                "cycle": 72,
                "true_rul": 120.0,
                "predicted_rul": 121.80013337986748
              },
              {
                "cycle": 73,
                "true_rul": 119.0,
                "predicted_rul": 111.67672994815075
              },
              {
                "cycle": 74,
                "true_rul": 118.0,
                "predicted_rul": 111.0183873591377
              },
              {
                "cycle": 75,
                "true_rul": 117.0,
                "predicted_rul": 112.73680691576737
              },
              {
                "cycle": 76,
                "true_rul": 116.0,
                "predicted_rul": 116.05893379998088
              },
              {
                "cycle": 77,
                "true_rul": 115.0,
                "predicted_rul": 108.08911961402919
              },
              {
                "cycle": 78,
                "true_rul": 114.0,
                "predicted_rul": 114.89770667488119
              },
              {
                "cycle": 79,
                "true_rul": 113.0,
                "predicted_rul": 113.24591712754773
              },
              {
                "cycle": 80,
                "true_rul": 112.0,
                "predicted_rul": 114.39781006144767
              },
              {
                "cycle": 81,
                "true_rul": 111.0,
                "predicted_rul": 114.29974514855712
              },
              {
                "cycle": 82,
                "true_rul": 110.0,
                "predicted_rul": 107.32492313803596
              },
              {
                "cycle": 83,
                "true_rul": 109.0,
                "predicted_rul": 110.41793520875945
              },
              {
                "cycle": 84,
                "true_rul": 108.0,
                "predicted_rul": 107.38878231549461
              },
              {
                "cycle": 85,
                "true_rul": 107.0,
                "predicted_rul": 110.04470690542803
              },
              {
                "cycle": 86,
                "true_rul": 106.0,
                "predicted_rul": 111.4398394934251
              },
              {
                "cycle": 87,
                "true_rul": 105.0,
                "predicted_rul": 117.5286164330937
              },
              {
                "cycle": 88,
                "true_rul": 104.0,
                "predicted_rul": 115.97336942424226
              },
              {
                "cycle": 89,
                "true_rul": 103.0,
                "predicted_rul": 114.95567907645818
              },
              {
                "cycle": 90,
                "true_rul": 102.0,
                "predicted_rul": 120.83073617191621
              },
              {
                "cycle": 91,
                "true_rul": 101.0,
                "predicted_rul": 108.90365853425465
              },
              {
                "cycle": 92,
                "true_rul": 100.0,
                "predicted_rul": 110.3056495310775
              },
              {
                "cycle": 93,
                "true_rul": 99.0,
                "predicted_rul": 114.43268817978242
              },
              {
                "cycle": 94,
                "true_rul": 98.0,
                "predicted_rul": 110.66806569645632
              },
              {
                "cycle": 95,
                "true_rul": 97.0,
                "predicted_rul": 113.31356283946297
              },
              {
                "cycle": 96,
                "true_rul": 96.0,
                "predicted_rul": 119.72104949518325
              },
              {
                "cycle": 97,
                "true_rul": 95.0,
                "predicted_rul": 121.58645951494327
              },
              {
                "cycle": 98,
                "true_rul": 94.0,
                "predicted_rul": 114.28087122393117
              },
              {
                "cycle": 99,
                "true_rul": 93.0,
                "predicted_rul": 123.71081718906134
              },
              {
                "cycle": 100,
                "true_rul": 92.0,
                "predicted_rul": 119.47778102451775
              },
              {
                "cycle": 101,
                "true_rul": 91.0,
                "predicted_rul": 119.05480372372404
              },
              {
                "cycle": 102,
                "true_rul": 90.0,
                "predicted_rul": 124.6879185054313
              },
              {
                "cycle": 103,
                "true_rul": 89.0,
                "predicted_rul": 124.45310635964779
              },
              {
                "cycle": 104,
                "true_rul": 88.0,
                "predicted_rul": 120.16448151260192
              },
              {
                "cycle": 105,
                "true_rul": 87.0,
                "predicted_rul": 122.8690568574857
              },
              {
                "cycle": 106,
                "true_rul": 86.0,
                "predicted_rul": 118.2810150825535
              },
              {
                "cycle": 107,
                "true_rul": 85.0,
                "predicted_rul": 116.6043074329973
              },
              {
                "cycle": 108,
                "true_rul": 84.0,
                "predicted_rul": 110.43317624351039
              },
              {
                "cycle": 109,
                "true_rul": 83.0,
                "predicted_rul": 111.10463679572786
              },
              {
                "cycle": 110,
                "true_rul": 82.0,
                "predicted_rul": 113.03673261605582
              },
              {
                "cycle": 111,
                "true_rul": 81.0,
                "predicted_rul": 110.1577707845754
              },
              {
                "cycle": 112,
                "true_rul": 80.0,
                "predicted_rul": 109.69453373389479
              },
              {
                "cycle": 113,
                "true_rul": 79.0,
                "predicted_rul": 109.5007945820289
              },
              {
                "cycle": 114,
                "true_rul": 78.0,
                "predicted_rul": 107.469163120546
              },
              {
                "cycle": 115,
                "true_rul": 77.0,
                "predicted_rul": 108.93390520706089
              },
              {
                "cycle": 116,
                "true_rul": 76.0,
                "predicted_rul": 108.1942793182352
              },
              {
                "cycle": 117,
                "true_rul": 75.0,
                "predicted_rul": 106.11021573013932
              },
              {
                "cycle": 118,
                "true_rul": 74.0,
                "predicted_rul": 102.81706742424285
              },
              {
                "cycle": 119,
                "true_rul": 73.0,
                "predicted_rul": 99.62664458941435
              },
              {
                "cycle": 120,
                "true_rul": 72.0,
                "predicted_rul": 100.07957401949898
              },
              {
                "cycle": 121,
                "true_rul": 71.0,
                "predicted_rul": 98.8872256419454
              },
              {
                "cycle": 122,
                "true_rul": 70.0,
                "predicted_rul": 96.05645415540857
              },
              {
                "cycle": 123,
                "true_rul": 69.0,
                "predicted_rul": 93.253407111868
              },
              {
                "cycle": 124,
                "true_rul": 68.0,
                "predicted_rul": 95.17498843934663
              },
              {
                "cycle": 125,
                "true_rul": 67.0,
                "predicted_rul": 94.36269560442088
              },
              {
                "cycle": 126,
                "true_rul": 66.0,
                "predicted_rul": 97.15157421741606
              },
              {
                "cycle": 127,
                "true_rul": 65.0,
                "predicted_rul": 92.62851310104452
              },
              {
                "cycle": 128,
                "true_rul": 64.0,
                "predicted_rul": 92.65754750759152
              },
              {
                "cycle": 129,
                "true_rul": 63.0,
                "predicted_rul": 90.72352973837042
              },
              {
                "cycle": 130,
                "true_rul": 62.0,
                "predicted_rul": 83.40377647091736
              },
              {
                "cycle": 131,
                "true_rul": 61.0,
                "predicted_rul": 90.95806938979149
              },
              {
                "cycle": 132,
                "true_rul": 60.0,
                "predicted_rul": 91.41343962086466
              },
              {
                "cycle": 133,
                "true_rul": 59.0,
                "predicted_rul": 93.30414453012418
              },
              {
                "cycle": 134,
                "true_rul": 58.0,
                "predicted_rul": 101.03884220936015
              },
              {
                "cycle": 135,
                "true_rul": 57.0,
                "predicted_rul": 95.35170202631707
              },
              {
                "cycle": 136,
                "true_rul": 56.0,
                "predicted_rul": 89.8587530538316
              },
              {
                "cycle": 137,
                "true_rul": 55.0,
                "predicted_rul": 90.93013068204164
              },
              {
                "cycle": 138,
                "true_rul": 54.0,
                "predicted_rul": 83.48811294603729
              },
              {
                "cycle": 139,
                "true_rul": 53.0,
                "predicted_rul": 86.70719327766346
              },
              {
                "cycle": 140,
                "true_rul": 52.0,
                "predicted_rul": 90.85729336385339
              },
              {
                "cycle": 141,
                "true_rul": 51.0,
                "predicted_rul": 90.2172164925978
              },
              {
                "cycle": 142,
                "true_rul": 50.0,
                "predicted_rul": 88.2489391004674
              },
              {
                "cycle": 143,
                "true_rul": 49.0,
                "predicted_rul": 90.69202925470381
              },
              {
                "cycle": 144,
                "true_rul": 48.0,
                "predicted_rul": 78.44203328511867
              },
              {
                "cycle": 145,
                "true_rul": 47.0,
                "predicted_rul": 80.3197680682897
              },
              {
                "cycle": 146,
                "true_rul": 46.0,
                "predicted_rul": 79.89387207176696
              },
              {
                "cycle": 147,
                "true_rul": 45.0,
                "predicted_rul": 80.13787518034951
              },
              {
                "cycle": 148,
                "true_rul": 44.0,
                "predicted_rul": 77.95579834290766
              },
              {
                "cycle": 149,
                "true_rul": 43.0,
                "predicted_rul": 75.57636629193439
              },
              {
                "cycle": 150,
                "true_rul": 42.0,
                "predicted_rul": 69.85102920493955
              },
              {
                "cycle": 151,
                "true_rul": 41.0,
                "predicted_rul": 64.36130634475921
              },
              {
                "cycle": 152,
                "true_rul": 40.0,
                "predicted_rul": 66.2979533407306
              },
              {
                "cycle": 153,
                "true_rul": 39.0,
                "predicted_rul": 71.39263510702222
              }
            ]
          },
          {
            "unit_number": 3,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 80.35912500832274
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 92.37328597271699
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 107.41377260759327
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 119.77463753657139
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 126.08572057986748
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 124.21766073239996
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 115.92091899628576
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 119.70050468530462
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 119.40583948486164
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 111.39052642462411
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 115.64538115578762
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 120.3513428109436
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 124.39958861625928
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 130.03793161057183
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 129.5127060982777
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 127.86676001275919
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 125.64012363898655
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 125.89667151328104
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 124.91884073249093
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 119.71187418833506
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 115.95947229781086
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 124.80428060396662
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 117.04904077523679
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 117.15104566041191
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 116.75477504917217
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 120.92859824372863
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 118.74934126471999
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 125.34999377222266
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 128.22842870868772
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 129.2193559464613
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 128.32264373242288
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 131.20446269627791
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 129.78552704587855
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 136.03872293510722
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 138.48280859391525
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 131.50245049441946
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 134.0999630234728
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 137.0372412753968
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 136.67636740099988
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 136.62794569872494
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 140.75327730335994
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 133.30794718519246
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 127.96173424639346
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 135.48843310996745
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 130.20368231611064
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 134.60787430716664
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 132.43718933719356
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 128.28561990449452
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 136.82719036696653
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 128.48491737386212
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 130.11846768122268
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 128.01352419846444
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 129.67703117127166
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 124.29213845550112
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 127.26192802049627
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 126.51561037679494
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 127.62379937429068
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 129.9642752006439
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 119.07227195219093
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 118.81898312804697
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 117.35270279404358
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 110.81287546332896
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 126.15600756699496
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 124.12495277178823
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 122.76557273399885
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 124.21922430209816
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 122.53268213346746
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 122.13358712175614
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 125.83794229138584
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 126.4499316853653
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 132.28111146997253
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 131.1217070046514
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 134.45824113594063
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 136.79220823340074
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 126.06051227930584
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 130.15850544347632
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 130.9633567031815
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 122.26744678734394
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 130.1347702680505
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 126.01626825891435
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 128.8040306979019
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 119.65914823929415
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 126.72117885418265
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 127.9639169533184
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 124.31360329156087
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 129.6334405628986
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 127.98681816752287
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 125.26527444747262
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 121.11276285869099
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 120.82599547390055
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 119.23487564284005
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 115.52537803828454
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 120.9396384525171
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 115.07257958414993
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 118.4047278760263
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 115.36082197612996
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 113.27157935333162
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 117.01239425085805
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 111.8327749250384
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 116.66587846586845
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 112.109116251464
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 111.56250599818304
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 106.802855799815
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 109.65273899821841
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 112.29959852707907
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 115.26156715687466
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 114.28693187580211
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 115.67710964792786
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 111.58043884877043
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 112.5493757362965
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 115.49198117740525
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 117.94115716647502
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 117.29360135338356
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 112.54462538110602
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 121.70386563078864
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 122.72253751617973
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 123.01501646436373
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 115.60016111889854
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 125.27573872002176
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 122.86256423416853
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 124.00446266950166
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 122.2934073685501
              },
              {
                "cycle": 123,
                "true_rul": 125.0,
                "predicted_rul": 125.73237725676881
              },
              {
                "cycle": 124,
                "true_rul": 124.0,
                "predicted_rul": 119.39858311478383
              },
              {
                "cycle": 125,
                "true_rul": 123.0,
                "predicted_rul": 122.00281126208574
              },
              {
                "cycle": 126,
                "true_rul": 122.0,
                "predicted_rul": 110.30431067462632
              },
              {
                "cycle": 127,
                "true_rul": 121.0,
                "predicted_rul": 116.93746527561962
              },
              {
                "cycle": 128,
                "true_rul": 120.0,
                "predicted_rul": 117.5938847336256
              },
              {
                "cycle": 129,
                "true_rul": 119.0,
                "predicted_rul": 116.23808729198208
              },
              {
                "cycle": 130,
                "true_rul": 118.0,
                "predicted_rul": 119.38932174399088
              },
              {
                "cycle": 131,
                "true_rul": 117.0,
                "predicted_rul": 117.33477112256514
              },
              {
                "cycle": 132,
                "true_rul": 116.0,
                "predicted_rul": 116.25083311196431
              },
              {
                "cycle": 133,
                "true_rul": 115.0,
                "predicted_rul": 116.98374193601921
              },
              {
                "cycle": 134,
                "true_rul": 114.0,
                "predicted_rul": 116.19223126902216
              },
              {
                "cycle": 135,
                "true_rul": 113.0,
                "predicted_rul": 115.58340943390795
              },
              {
                "cycle": 136,
                "true_rul": 112.0,
                "predicted_rul": 112.72085828850322
              },
              {
                "cycle": 137,
                "true_rul": 111.0,
                "predicted_rul": 114.48628354631364
              },
              {
                "cycle": 138,
                "true_rul": 110.0,
                "predicted_rul": 118.80093119750745
              },
              {
                "cycle": 139,
                "true_rul": 109.0,
                "predicted_rul": 108.54107595781534
              },
              {
                "cycle": 140,
                "true_rul": 108.0,
                "predicted_rul": 115.43318949926834
              },
              {
                "cycle": 141,
                "true_rul": 107.0,
                "predicted_rul": 106.97795163753108
              }
            ]
          },
          {
            "unit_number": 4,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 188.34689399057243
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 139.6182902430046
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 148.67949229962687
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 140.78795877633456
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 139.86523901691908
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 131.3968895982798
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 137.1653109134204
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 140.91489694359552
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 128.25475615352116
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 129.0843154923823
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 133.76578707336375
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 132.63877448063067
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 137.82482507149325
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 137.92359670352016
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 139.8262392462857
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 138.07327924928177
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 140.2317807577747
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 140.8342849252258
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 139.1619868980597
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 135.73982159191291
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 138.74076704815525
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 140.47421754207244
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 143.45078587815442
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 146.26731674472103
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 140.62230326024292
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 135.07415065129317
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 135.45741347455623
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 133.27131041578832
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 130.95584425695415
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 136.40994884375323
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 132.2926560928281
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 130.03332858296562
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 136.92116849994636
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 134.04247332915475
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 127.0094159583532
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 131.2493795807859
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 134.13912568272644
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 129.79969842347418
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 129.67419341564892
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 123.10090400368426
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 130.1874237342745
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 134.62700200915788
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 124.86040199762283
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 131.44913877449653
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 130.02070967305553
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 122.94689500400636
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 128.90357626325203
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 129.7291366037316
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 136.3074582163572
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 131.3427756783094
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 122.695084143048
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 130.88820995579226
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 139.09654045106072
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 137.96948926455298
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 129.85842721504378
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 134.59386009721857
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 136.91756851821265
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 125.05283019891431
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 132.58192591704938
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 126.03573751745353
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 132.03819220484365
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 126.7930193538632
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 134.01262211116773
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 125.90707556241978
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 128.2908110830831
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 122.24276104589444
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 126.67777000073693
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 126.92959908530247
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 133.5340333996137
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 127.98675284440105
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 128.65370834758141
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 129.16244142049982
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 125.1828108623813
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 122.6411421230514
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 117.8091411604255
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 117.20770959197398
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 118.62761725750897
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 125.277502878831
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 119.42093901342378
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 109.36406088227523
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 111.17595519180759
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 113.05624469725808
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 104.64087709764499
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 105.41217990521545
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 109.51229702358614
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 113.2950642764481
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 110.7305442917168
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 100.31953629179407
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 107.46286559042346
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 106.98973637372546
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 109.769686933505
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 116.01012816463845
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 114.88304978550877
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 111.7373229705845
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 112.57556447482057
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 116.68870177105782
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 118.62271460694683
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 123.28341078428639
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 124.3203971091134
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 132.9821756038691
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 125.75426599683487
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 137.28890093970404
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 130.5764070071018
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 130.68499081439222
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 130.27872993374694
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 124.33427034186752
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 122.11467509361682
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 120.31029708689675
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 120.02642370590911
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 121.1238132882645
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 116.05587315138837
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 112.56850441208371
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 111.695569763393
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 119.62460680058575
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 116.90127716064671
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 116.78791730712328
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 115.87509941932876
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 113.13407114796792
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 113.31779264660508
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 118.52368928146461
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 114.57138282570668
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 118.29475271385309
              },
              {
                "cycle": 123,
                "true_rul": 125.0,
                "predicted_rul": 109.55803743649813
              },
              {
                "cycle": 124,
                "true_rul": 125.0,
                "predicted_rul": 114.06841833167346
              },
              {
                "cycle": 125,
                "true_rul": 125.0,
                "predicted_rul": 110.21555895493657
              },
              {
                "cycle": 126,
                "true_rul": 125.0,
                "predicted_rul": 110.01255975118329
              },
              {
                "cycle": 127,
                "true_rul": 125.0,
                "predicted_rul": 115.93793775774247
              },
              {
                "cycle": 128,
                "true_rul": 125.0,
                "predicted_rul": 113.89823339560826
              },
              {
                "cycle": 129,
                "true_rul": 125.0,
                "predicted_rul": 114.00356159375588
              },
              {
                "cycle": 130,
                "true_rul": 125.0,
                "predicted_rul": 113.46903809915239
              },
              {
                "cycle": 131,
                "true_rul": 125.0,
                "predicted_rul": 113.7801757436464
              },
              {
                "cycle": 132,
                "true_rul": 125.0,
                "predicted_rul": 113.72774922773169
              },
              {
                "cycle": 133,
                "true_rul": 125.0,
                "predicted_rul": 114.1514964045382
              },
              {
                "cycle": 134,
                "true_rul": 125.0,
                "predicted_rul": 112.23571361787253
              },
              {
                "cycle": 135,
                "true_rul": 125.0,
                "predicted_rul": 117.57857453869292
              },
              {
                "cycle": 136,
                "true_rul": 125.0,
                "predicted_rul": 119.29786209348094
              },
              {
                "cycle": 137,
                "true_rul": 125.0,
                "predicted_rul": 117.43437950689986
              },
              {
                "cycle": 138,
                "true_rul": 125.0,
                "predicted_rul": 108.57848409307553
              },
              {
                "cycle": 139,
                "true_rul": 125.0,
                "predicted_rul": 112.09509058572075
              },
              {
                "cycle": 140,
                "true_rul": 125.0,
                "predicted_rul": 116.67902076052997
              },
              {
                "cycle": 141,
                "true_rul": 125.0,
                "predicted_rul": 114.68812545056426
              },
              {
                "cycle": 142,
                "true_rul": 125.0,
                "predicted_rul": 120.50962414401147
              },
              {
                "cycle": 143,
                "true_rul": 125.0,
                "predicted_rul": 119.44817127532588
              },
              {
                "cycle": 144,
                "true_rul": 125.0,
                "predicted_rul": 118.37515965438797
              },
              {
                "cycle": 145,
                "true_rul": 125.0,
                "predicted_rul": 117.74192727727495
              },
              {
                "cycle": 146,
                "true_rul": 125.0,
                "predicted_rul": 119.48450835581025
              },
              {
                "cycle": 147,
                "true_rul": 125.0,
                "predicted_rul": 115.1513876592071
              },
              {
                "cycle": 148,
                "true_rul": 125.0,
                "predicted_rul": 114.12512632021026
              },
              {
                "cycle": 149,
                "true_rul": 125.0,
                "predicted_rul": 116.97531241262186
              },
              {
                "cycle": 150,
                "true_rul": 125.0,
                "predicted_rul": 118.28915958353537
              },
              {
                "cycle": 151,
                "true_rul": 125.0,
                "predicted_rul": 125.58215212405412
              },
              {
                "cycle": 152,
                "true_rul": 125.0,
                "predicted_rul": 124.04590862283658
              },
              {
                "cycle": 153,
                "true_rul": 125.0,
                "predicted_rul": 121.22633488394058
              },
              {
                "cycle": 154,
                "true_rul": 125.0,
                "predicted_rul": 113.52462692181143
              },
              {
                "cycle": 155,
                "true_rul": 125.0,
                "predicted_rul": 114.88365676227113
              },
              {
                "cycle": 156,
                "true_rul": 125.0,
                "predicted_rul": 115.40794238308808
              },
              {
                "cycle": 157,
                "true_rul": 125.0,
                "predicted_rul": 114.60100879334277
              },
              {
                "cycle": 158,
                "true_rul": 125.0,
                "predicted_rul": 110.1802711887758
              },
              {
                "cycle": 159,
                "true_rul": 124.0,
                "predicted_rul": 113.71992512734869
              },
              {
                "cycle": 160,
                "true_rul": 123.0,
                "predicted_rul": 110.82011884054009
              },
              {
                "cycle": 161,
                "true_rul": 122.0,
                "predicted_rul": 117.17266904274948
              },
              {
                "cycle": 162,
                "true_rul": 121.0,
                "predicted_rul": 116.73916099262351
              },
              {
                "cycle": 163,
                "true_rul": 120.0,
                "predicted_rul": 112.24513497196313
              },
              {
                "cycle": 164,
                "true_rul": 119.0,
                "predicted_rul": 119.39810280657912
              },
              {
                "cycle": 165,
                "true_rul": 118.0,
                "predicted_rul": 114.84869155409615
              },
              {
                "cycle": 166,
                "true_rul": 117.0,
                "predicted_rul": 121.2942357109714
              },
              {
                "cycle": 167,
                "true_rul": 116.0,
                "predicted_rul": 119.53047011473609
              },
              {
                "cycle": 168,
                "true_rul": 115.0,
                "predicted_rul": 117.01888237016465
              },
              {
                "cycle": 169,
                "true_rul": 114.0,
                "predicted_rul": 119.70590480722967
              },
              {
                "cycle": 170,
                "true_rul": 113.0,
                "predicted_rul": 117.33251981696958
              },
              {
                "cycle": 171,
                "true_rul": 112.0,
                "predicted_rul": 118.52869794833532
              },
              {
                "cycle": 172,
                "true_rul": 111.0,
                "predicted_rul": 119.23259554339165
              },
              {
                "cycle": 173,
                "true_rul": 110.0,
                "predicted_rul": 117.78186571949118
              },
              {
                "cycle": 174,
                "true_rul": 109.0,
                "predicted_rul": 114.63835070039931
              },
              {
                "cycle": 175,
                "true_rul": 108.0,
                "predicted_rul": 115.30608327505252
              },
              {
                "cycle": 176,
                "true_rul": 107.0,
                "predicted_rul": 113.2641925696189
              },
              {
                "cycle": 177,
                "true_rul": 106.0,
                "predicted_rul": 115.89779896294567
              },
              {
                "cycle": 178,
                "true_rul": 105.0,
                "predicted_rul": 113.23124824486513
              },
              {
                "cycle": 179,
                "true_rul": 104.0,
                "predicted_rul": 110.96359546168969
              },
              {
                "cycle": 180,
                "true_rul": 103.0,
                "predicted_rul": 113.45981578201463
              },
              {
                "cycle": 181,
                "true_rul": 102.0,
                "predicted_rul": 105.11405244372872
              },
              {
                "cycle": 182,
                "true_rul": 101.0,
                "predicted_rul": 112.75782321821316
              },
              {
                "cycle": 183,
                "true_rul": 100.0,
                "predicted_rul": 100.92068928005756
              },
              {
                "cycle": 184,
                "true_rul": 99.0,
                "predicted_rul": 106.51827265394968
              },
              {
                "cycle": 185,
                "true_rul": 98.0,
                "predicted_rul": 103.3239672426389
              },
              {
                "cycle": 186,
                "true_rul": 97.0,
                "predicted_rul": 106.26289324552636
              },
              {
                "cycle": 187,
                "true_rul": 96.0,
                "predicted_rul": 102.50587113937581
              },
              {
                "cycle": 188,
                "true_rul": 95.0,
                "predicted_rul": 104.26404153670956
              },
              {
                "cycle": 189,
                "true_rul": 94.0,
                "predicted_rul": 100.71379871473255
              },
              {
                "cycle": 190,
                "true_rul": 93.0,
                "predicted_rul": 103.02888983464436
              },
              {
                "cycle": 191,
                "true_rul": 92.0,
                "predicted_rul": 99.47373727528975
              },
              {
                "cycle": 192,
                "true_rul": 91.0,
                "predicted_rul": 99.32650319817185
              },
              {
                "cycle": 193,
                "true_rul": 90.0,
                "predicted_rul": 99.33257497017985
              },
              {
                "cycle": 194,
                "true_rul": 89.0,
                "predicted_rul": 91.91137032473489
              },
              {
                "cycle": 195,
                "true_rul": 88.0,
                "predicted_rul": 100.04870028629375
              },
              {
                "cycle": 196,
                "true_rul": 87.0,
                "predicted_rul": 100.55071272866917
              },
              {
                "cycle": 197,
                "true_rul": 86.0,
                "predicted_rul": 100.87544692015945
              },
              {
                "cycle": 198,
                "true_rul": 85.0,
                "predicted_rul": 96.28751385348005
              },
              {
                "cycle": 199,
                "true_rul": 84.0,
                "predicted_rul": 98.50442270500571
              },
              {
                "cycle": 200,
                "true_rul": 83.0,
                "predicted_rul": 89.69178961588841
              },
              {
                "cycle": 201,
                "true_rul": 82.0,
                "predicted_rul": 93.94065624425639
              },
              {
                "cycle": 202,
                "true_rul": 81.0,
                "predicted_rul": 92.21385139474296
              },
              {
                "cycle": 203,
                "true_rul": 80.0,
                "predicted_rul": 95.73664801366613
              },
              {
                "cycle": 204,
                "true_rul": 79.0,
                "predicted_rul": 99.05460027951267
              },
              {
                "cycle": 205,
                "true_rul": 78.0,
                "predicted_rul": 100.65297815117083
              },
              {
                "cycle": 206,
                "true_rul": 77.0,
                "predicted_rul": 98.68794693430755
              },
              {
                "cycle": 207,
                "true_rul": 76.0,
                "predicted_rul": 97.55707371963945
              },
              {
                "cycle": 208,
                "true_rul": 75.0,
                "predicted_rul": 95.42644861134977
              }
            ]
          },
          {
            "unit_number": 5,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 93.77236378427187
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 110.10070293829995
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 100.60033410379765
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 124.17268416811203
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 123.9594192500299
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 138.31503855288975
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 131.33369148237398
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 127.10639380249995
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 117.60133125327775
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 120.00790101833263
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 120.29249417756
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 120.0835905084823
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 118.17356789500991
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 121.07308978588844
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 119.24973630372187
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 119.04730316169298
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 121.52598262066749
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 110.55290410934322
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 117.3986662937059
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 119.97635372450895
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 122.50535168343049
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 127.28883637621038
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 123.85540959606442
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 125.35693727405669
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 129.1443750147082
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 126.44332892533566
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 128.8520694332401
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 132.45269999212178
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 130.84621531934317
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 127.35431711445199
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 129.95679305368685
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 120.72863921984026
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 118.71803619154161
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 124.0633635876402
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 124.41450464169247
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 126.57772459013722
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 127.53356449109197
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 118.5166242171872
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 122.3861819788799
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 125.39258228055041
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 125.29833027684799
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 120.34743725275621
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 116.01544201285287
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 120.96673378245396
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 119.97101090400974
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 118.53238735033301
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 118.48155768141078
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 118.16124198947728
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 116.22840549076136
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 119.2752775831832
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 113.06574719898344
              }
            ]
          },
          {
            "unit_number": 6,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 151.4593993820563
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 124.98531597096371
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 140.1792896839761
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 131.08672973309513
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 113.11263538653657
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 126.53642682551072
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 130.84969384476062
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 129.03517995810034
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 136.9763024776621
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 141.4433036821465
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 134.7311316203013
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 129.4265539624903
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 130.68273411890914
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 127.53014512694062
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 128.26904147351524
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 123.61896769954546
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 128.03891482525796
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 120.48900106154542
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 125.76350145625474
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 130.18737140376106
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 128.5775296701322
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 118.16845810332961
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 127.95263799939858
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 123.94445129458836
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 123.81268931809609
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 129.2984314112182
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 133.4406379002612
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 132.1426543815105
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 133.1606287933755
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 122.93973694329543
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 122.69976963387671
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 124.02949636496851
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 120.5499262856938
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 115.96683647483587
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 120.94047645666797
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 124.38517851163488
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 127.58968838636792
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 129.3448896846312
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 130.77883065396236
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 139.36390128978746
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 139.00885957001447
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 140.79684412843199
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 132.5470157304626
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 132.55277030483194
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 135.7175845227648
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 134.4203549349877
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 135.96694678794665
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 136.90794193135298
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 132.90390290199502
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 131.07301990501946
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 126.62010850901424
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 129.64082552471882
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 131.0888733006832
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 128.35920216902377
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 131.21366821686752
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 128.22536069157286
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 125.27612167416737
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 126.03429076728207
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 120.0779834210989
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 127.91144217611509
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 128.36254849977195
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 129.3652837235859
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 128.50784757675865
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 122.69291434547995
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 121.49861211802636
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 136.250375999487
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 130.20332763935585
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 131.20962032970783
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 131.86649972379382
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 131.12774595595693
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 141.36293007605855
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 135.12318585779212
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 129.61436111884905
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 122.26673663604379
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 128.36298186127897
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 126.60484836158867
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 120.9810477570245
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 126.03302399819222
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 124.93881457822499
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 121.47691480327558
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 122.38036536873187
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 123.40613808763374
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 118.45574045925241
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 114.10498796996762
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 121.07734450304997
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 118.17482708197349
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 121.95610540174675
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 122.60860155841146
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 124.13093922631015
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 125.11047368562504
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 137.91197546285184
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 130.4774178731277
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 129.30937052170702
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 127.81505698790716
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 124.93961189459151
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 121.59966604045621
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 126.60767078495337
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 135.13143493347525
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 124.41457890438687
              },
              {
                "cycle": 100,
                "true_rul": 124.0,
                "predicted_rul": 133.75085252365534
              },
              {
                "cycle": 101,
                "true_rul": 123.0,
                "predicted_rul": 125.02436515887166
              },
              {
                "cycle": 102,
                "true_rul": 122.0,
                "predicted_rul": 126.72991193968119
              },
              {
                "cycle": 103,
                "true_rul": 121.0,
                "predicted_rul": 124.8075526901448
              },
              {
                "cycle": 104,
                "true_rul": 120.0,
                "predicted_rul": 126.8836874541521
              },
              {
                "cycle": 105,
                "true_rul": 119.0,
                "predicted_rul": 126.6225703331329
              },
              {
                "cycle": 106,
                "true_rul": 118.0,
                "predicted_rul": 120.9678746989448
              },
              {
                "cycle": 107,
                "true_rul": 117.0,
                "predicted_rul": 119.07117974546054
              },
              {
                "cycle": 108,
                "true_rul": 116.0,
                "predicted_rul": 120.9062199823893
              },
              {
                "cycle": 109,
                "true_rul": 115.0,
                "predicted_rul": 125.07367097355018
              },
              {
                "cycle": 110,
                "true_rul": 114.0,
                "predicted_rul": 120.94914510845774
              },
              {
                "cycle": 111,
                "true_rul": 113.0,
                "predicted_rul": 119.21470621839762
              },
              {
                "cycle": 112,
                "true_rul": 112.0,
                "predicted_rul": 118.54417396573626
              },
              {
                "cycle": 113,
                "true_rul": 111.0,
                "predicted_rul": 118.35924668201187
              },
              {
                "cycle": 114,
                "true_rul": 110.0,
                "predicted_rul": 117.6695733709821
              },
              {
                "cycle": 115,
                "true_rul": 109.0,
                "predicted_rul": 116.32269198033464
              },
              {
                "cycle": 116,
                "true_rul": 108.0,
                "predicted_rul": 122.72008564208954
              },
              {
                "cycle": 117,
                "true_rul": 107.0,
                "predicted_rul": 116.34621367357249
              },
              {
                "cycle": 118,
                "true_rul": 106.0,
                "predicted_rul": 119.34879139696204
              },
              {
                "cycle": 119,
                "true_rul": 105.0,
                "predicted_rul": 119.85100925679217
              },
              {
                "cycle": 120,
                "true_rul": 104.0,
                "predicted_rul": 112.32720563602925
              },
              {
                "cycle": 121,
                "true_rul": 103.0,
                "predicted_rul": 109.25229932256116
              },
              {
                "cycle": 122,
                "true_rul": 102.0,
                "predicted_rul": 109.18325093859312
              },
              {
                "cycle": 123,
                "true_rul": 101.0,
                "predicted_rul": 108.97598249817747
              },
              {
                "cycle": 124,
                "true_rul": 100.0,
                "predicted_rul": 105.77757999830283
              },
              {
                "cycle": 125,
                "true_rul": 99.0,
                "predicted_rul": 108.91905455214146
              },
              {
                "cycle": 126,
                "true_rul": 98.0,
                "predicted_rul": 104.83776185515671
              },
              {
                "cycle": 127,
                "true_rul": 97.0,
                "predicted_rul": 111.76901494594131
              },
              {
                "cycle": 128,
                "true_rul": 96.0,
                "predicted_rul": 106.59682329471616
              },
              {
                "cycle": 129,
                "true_rul": 95.0,
                "predicted_rul": 103.67623239751265
              },
              {
                "cycle": 130,
                "true_rul": 94.0,
                "predicted_rul": 107.19693386738436
              },
              {
                "cycle": 131,
                "true_rul": 93.0,
                "predicted_rul": 103.18763871355986
              },
              {
                "cycle": 132,
                "true_rul": 92.0,
                "predicted_rul": 105.0905330259884
              },
              {
                "cycle": 133,
                "true_rul": 91.0,
                "predicted_rul": 111.54385279824055
              },
              {
                "cycle": 134,
                "true_rul": 90.0,
                "predicted_rul": 108.62623215645726
              },
              {
                "cycle": 135,
                "true_rul": 89.0,
                "predicted_rul": 113.8884336180854
              },
              {
                "cycle": 136,
                "true_rul": 88.0,
                "predicted_rul": 110.87150919286432
              },
              {
                "cycle": 137,
                "true_rul": 87.0,
                "predicted_rul": 112.17333043224426
              },
              {
                "cycle": 138,
                "true_rul": 86.0,
                "predicted_rul": 110.82353783556391
              },
              {
                "cycle": 139,
                "true_rul": 85.0,
                "predicted_rul": 110.35925655407118
              },
              {
                "cycle": 140,
                "true_rul": 84.0,
                "predicted_rul": 103.8885597480803
              },
              {
                "cycle": 141,
                "true_rul": 83.0,
                "predicted_rul": 112.90979149033592
              },
              {
                "cycle": 142,
                "true_rul": 82.0,
                "predicted_rul": 107.7487737690717
              },
              {
                "cycle": 143,
                "true_rul": 81.0,
                "predicted_rul": 112.7955142194769
              },
              {
                "cycle": 144,
                "true_rul": 80.0,
                "predicted_rul": 111.20113277321434
              },
              {
                "cycle": 145,
                "true_rul": 79.0,
                "predicted_rul": 107.38887331512888
              },
              {
                "cycle": 146,
                "true_rul": 78.0,
                "predicted_rul": 103.38397307278137
              }
            ]
          },
          {
            "unit_number": 7,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 139.99316145720877
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 153.581313918261
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 122.40470353533237
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 139.01003531031165
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 139.843738725016
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 134.47171356964827
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 145.2304395678948
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 139.6852988724313
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 134.72350411682055
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 139.05358061557126
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 135.08051515185434
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 132.89243406889
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 136.62381588195785
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 137.40977004723027
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 135.8352728374557
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 134.50052039176808
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 135.36270845568652
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 130.61113881778874
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 130.5831030804511
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 120.93559703591745
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 128.02122085716837
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 124.66350932392379
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 126.38062413675652
              },
              {
                "cycle": 24,
                "true_rul": 124.0,
                "predicted_rul": 128.92272307414896
              },
              {
                "cycle": 25,
                "true_rul": 123.0,
                "predicted_rul": 125.54779655829407
              },
              {
                "cycle": 26,
                "true_rul": 122.0,
                "predicted_rul": 122.44383239736999
              },
              {
                "cycle": 27,
                "true_rul": 121.0,
                "predicted_rul": 126.82788206175246
              },
              {
                "cycle": 28,
                "true_rul": 120.0,
                "predicted_rul": 126.02023451124114
              },
              {
                "cycle": 29,
                "true_rul": 119.0,
                "predicted_rul": 131.51157750263155
              },
              {
                "cycle": 30,
                "true_rul": 118.0,
                "predicted_rul": 131.6182122711798
              },
              {
                "cycle": 31,
                "true_rul": 117.0,
                "predicted_rul": 129.2392239453875
              },
              {
                "cycle": 32,
                "true_rul": 116.0,
                "predicted_rul": 126.59749770116832
              },
              {
                "cycle": 33,
                "true_rul": 115.0,
                "predicted_rul": 121.6764070552199
              },
              {
                "cycle": 34,
                "true_rul": 114.0,
                "predicted_rul": 121.312424391479
              },
              {
                "cycle": 35,
                "true_rul": 113.0,
                "predicted_rul": 127.19041307144289
              },
              {
                "cycle": 36,
                "true_rul": 112.0,
                "predicted_rul": 134.53016581224801
              },
              {
                "cycle": 37,
                "true_rul": 111.0,
                "predicted_rul": 132.2664305330436
              },
              {
                "cycle": 38,
                "true_rul": 110.0,
                "predicted_rul": 131.01481540501482
              },
              {
                "cycle": 39,
                "true_rul": 109.0,
                "predicted_rul": 132.13085804427828
              },
              {
                "cycle": 40,
                "true_rul": 108.0,
                "predicted_rul": 128.92682305398557
              },
              {
                "cycle": 41,
                "true_rul": 107.0,
                "predicted_rul": 125.62807793911634
              },
              {
                "cycle": 42,
                "true_rul": 106.0,
                "predicted_rul": 128.54895311290602
              },
              {
                "cycle": 43,
                "true_rul": 105.0,
                "predicted_rul": 129.78578080939405
              },
              {
                "cycle": 44,
                "true_rul": 104.0,
                "predicted_rul": 129.46982637064502
              },
              {
                "cycle": 45,
                "true_rul": 103.0,
                "predicted_rul": 117.03889711241573
              },
              {
                "cycle": 46,
                "true_rul": 102.0,
                "predicted_rul": 116.88687436365217
              },
              {
                "cycle": 47,
                "true_rul": 101.0,
                "predicted_rul": 119.46537604403784
              },
              {
                "cycle": 48,
                "true_rul": 100.0,
                "predicted_rul": 118.08361509819952
              },
              {
                "cycle": 49,
                "true_rul": 99.0,
                "predicted_rul": 118.75079674199878
              },
              {
                "cycle": 50,
                "true_rul": 98.0,
                "predicted_rul": 117.88724974861543
              },
              {
                "cycle": 51,
                "true_rul": 97.0,
                "predicted_rul": 123.9659253730606
              },
              {
                "cycle": 52,
                "true_rul": 96.0,
                "predicted_rul": 121.37390551121644
              },
              {
                "cycle": 53,
                "true_rul": 95.0,
                "predicted_rul": 115.87575491186362
              },
              {
                "cycle": 54,
                "true_rul": 94.0,
                "predicted_rul": 122.14759720221628
              }
            ]
          },
          {
            "unit_number": 8,
            "is_sample": false,
            "trajectory": [
              {
                "cycle": 1,
                "true_rul": 125.0,
                "predicted_rul": 75.2994739934984
              },
              {
                "cycle": 2,
                "true_rul": 125.0,
                "predicted_rul": 97.89877646925379
              },
              {
                "cycle": 3,
                "true_rul": 125.0,
                "predicted_rul": 109.10384673295266
              },
              {
                "cycle": 4,
                "true_rul": 125.0,
                "predicted_rul": 92.76542910132048
              },
              {
                "cycle": 5,
                "true_rul": 125.0,
                "predicted_rul": 85.58921619614193
              },
              {
                "cycle": 6,
                "true_rul": 125.0,
                "predicted_rul": 79.8264491584996
              },
              {
                "cycle": 7,
                "true_rul": 125.0,
                "predicted_rul": 76.63850081116834
              },
              {
                "cycle": 8,
                "true_rul": 125.0,
                "predicted_rul": 81.61732397884771
              },
              {
                "cycle": 9,
                "true_rul": 125.0,
                "predicted_rul": 76.12805324881265
              },
              {
                "cycle": 10,
                "true_rul": 125.0,
                "predicted_rul": 76.80929638193993
              },
              {
                "cycle": 11,
                "true_rul": 125.0,
                "predicted_rul": 75.800151091109
              },
              {
                "cycle": 12,
                "true_rul": 125.0,
                "predicted_rul": 84.03396134996365
              },
              {
                "cycle": 13,
                "true_rul": 125.0,
                "predicted_rul": 95.62231004039131
              },
              {
                "cycle": 14,
                "true_rul": 125.0,
                "predicted_rul": 88.74906551206004
              },
              {
                "cycle": 15,
                "true_rul": 125.0,
                "predicted_rul": 90.0280944653714
              },
              {
                "cycle": 16,
                "true_rul": 125.0,
                "predicted_rul": 89.08600143146396
              },
              {
                "cycle": 17,
                "true_rul": 125.0,
                "predicted_rul": 87.50816706867408
              },
              {
                "cycle": 18,
                "true_rul": 125.0,
                "predicted_rul": 92.24282690928885
              },
              {
                "cycle": 19,
                "true_rul": 125.0,
                "predicted_rul": 91.18424783181763
              },
              {
                "cycle": 20,
                "true_rul": 125.0,
                "predicted_rul": 91.46323158204905
              },
              {
                "cycle": 21,
                "true_rul": 125.0,
                "predicted_rul": 96.40767133280679
              },
              {
                "cycle": 22,
                "true_rul": 125.0,
                "predicted_rul": 97.94954197377592
              },
              {
                "cycle": 23,
                "true_rul": 125.0,
                "predicted_rul": 99.81581592439397
              },
              {
                "cycle": 24,
                "true_rul": 125.0,
                "predicted_rul": 99.68805989631437
              },
              {
                "cycle": 25,
                "true_rul": 125.0,
                "predicted_rul": 98.38903644048332
              },
              {
                "cycle": 26,
                "true_rul": 125.0,
                "predicted_rul": 99.0753020604534
              },
              {
                "cycle": 27,
                "true_rul": 125.0,
                "predicted_rul": 102.73720910514021
              },
              {
                "cycle": 28,
                "true_rul": 125.0,
                "predicted_rul": 104.50649973639156
              },
              {
                "cycle": 29,
                "true_rul": 125.0,
                "predicted_rul": 102.11007514505764
              },
              {
                "cycle": 30,
                "true_rul": 125.0,
                "predicted_rul": 105.40540695036907
              },
              {
                "cycle": 31,
                "true_rul": 125.0,
                "predicted_rul": 99.54642625038468
              },
              {
                "cycle": 32,
                "true_rul": 125.0,
                "predicted_rul": 105.81905441152776
              },
              {
                "cycle": 33,
                "true_rul": 125.0,
                "predicted_rul": 96.12960585045221
              },
              {
                "cycle": 34,
                "true_rul": 125.0,
                "predicted_rul": 100.07047179655274
              },
              {
                "cycle": 35,
                "true_rul": 125.0,
                "predicted_rul": 96.9691912124581
              },
              {
                "cycle": 36,
                "true_rul": 125.0,
                "predicted_rul": 100.6871747184814
              },
              {
                "cycle": 37,
                "true_rul": 125.0,
                "predicted_rul": 95.47510666748349
              },
              {
                "cycle": 38,
                "true_rul": 125.0,
                "predicted_rul": 103.04951210991203
              },
              {
                "cycle": 39,
                "true_rul": 125.0,
                "predicted_rul": 96.97602672988432
              },
              {
                "cycle": 40,
                "true_rul": 125.0,
                "predicted_rul": 98.55702281376944
              },
              {
                "cycle": 41,
                "true_rul": 125.0,
                "predicted_rul": 100.3830349735108
              },
              {
                "cycle": 42,
                "true_rul": 125.0,
                "predicted_rul": 101.52906788093242
              },
              {
                "cycle": 43,
                "true_rul": 125.0,
                "predicted_rul": 102.18486930723884
              },
              {
                "cycle": 44,
                "true_rul": 125.0,
                "predicted_rul": 105.83988761826186
              },
              {
                "cycle": 45,
                "true_rul": 125.0,
                "predicted_rul": 104.44786338830818
              },
              {
                "cycle": 46,
                "true_rul": 125.0,
                "predicted_rul": 108.37038416818177
              },
              {
                "cycle": 47,
                "true_rul": 125.0,
                "predicted_rul": 109.63277598289642
              },
              {
                "cycle": 48,
                "true_rul": 125.0,
                "predicted_rul": 107.57588850504908
              },
              {
                "cycle": 49,
                "true_rul": 125.0,
                "predicted_rul": 107.35237058601706
              },
              {
                "cycle": 50,
                "true_rul": 125.0,
                "predicted_rul": 108.4373337326142
              },
              {
                "cycle": 51,
                "true_rul": 125.0,
                "predicted_rul": 107.6139316216213
              },
              {
                "cycle": 52,
                "true_rul": 125.0,
                "predicted_rul": 106.54761823563967
              },
              {
                "cycle": 53,
                "true_rul": 125.0,
                "predicted_rul": 110.33965514439114
              },
              {
                "cycle": 54,
                "true_rul": 125.0,
                "predicted_rul": 111.691581492345
              },
              {
                "cycle": 55,
                "true_rul": 125.0,
                "predicted_rul": 105.08820926617773
              },
              {
                "cycle": 56,
                "true_rul": 125.0,
                "predicted_rul": 113.40730166505818
              },
              {
                "cycle": 57,
                "true_rul": 125.0,
                "predicted_rul": 107.98402079005609
              },
              {
                "cycle": 58,
                "true_rul": 125.0,
                "predicted_rul": 96.39463974753016
              },
              {
                "cycle": 59,
                "true_rul": 125.0,
                "predicted_rul": 89.59506994059484
              },
              {
                "cycle": 60,
                "true_rul": 125.0,
                "predicted_rul": 93.18768279182405
              },
              {
                "cycle": 61,
                "true_rul": 125.0,
                "predicted_rul": 95.85268506003558
              },
              {
                "cycle": 62,
                "true_rul": 125.0,
                "predicted_rul": 88.32583058391538
              },
              {
                "cycle": 63,
                "true_rul": 125.0,
                "predicted_rul": 93.33385390816329
              },
              {
                "cycle": 64,
                "true_rul": 125.0,
                "predicted_rul": 92.77728382711575
              },
              {
                "cycle": 65,
                "true_rul": 125.0,
                "predicted_rul": 86.68166284850304
              },
              {
                "cycle": 66,
                "true_rul": 125.0,
                "predicted_rul": 91.39643277459618
              },
              {
                "cycle": 67,
                "true_rul": 125.0,
                "predicted_rul": 90.8501114270075
              },
              {
                "cycle": 68,
                "true_rul": 125.0,
                "predicted_rul": 89.56998310973358
              },
              {
                "cycle": 69,
                "true_rul": 125.0,
                "predicted_rul": 91.34230383587783
              },
              {
                "cycle": 70,
                "true_rul": 125.0,
                "predicted_rul": 92.68855746363988
              },
              {
                "cycle": 71,
                "true_rul": 125.0,
                "predicted_rul": 94.65274378294635
              },
              {
                "cycle": 72,
                "true_rul": 125.0,
                "predicted_rul": 102.6072237425833
              },
              {
                "cycle": 73,
                "true_rul": 125.0,
                "predicted_rul": 99.6726662895635
              },
              {
                "cycle": 74,
                "true_rul": 125.0,
                "predicted_rul": 99.80994041298254
              },
              {
                "cycle": 75,
                "true_rul": 125.0,
                "predicted_rul": 94.79731799067667
              },
              {
                "cycle": 76,
                "true_rul": 125.0,
                "predicted_rul": 98.63609664297837
              },
              {
                "cycle": 77,
                "true_rul": 125.0,
                "predicted_rul": 102.1295175469495
              },
              {
                "cycle": 78,
                "true_rul": 125.0,
                "predicted_rul": 99.21908406981674
              },
              {
                "cycle": 79,
                "true_rul": 125.0,
                "predicted_rul": 91.97097742193364
              },
              {
                "cycle": 80,
                "true_rul": 125.0,
                "predicted_rul": 101.97164722685193
              },
              {
                "cycle": 81,
                "true_rul": 125.0,
                "predicted_rul": 97.34368091439683
              },
              {
                "cycle": 82,
                "true_rul": 125.0,
                "predicted_rul": 97.49752955160147
              },
              {
                "cycle": 83,
                "true_rul": 125.0,
                "predicted_rul": 104.29940928548604
              },
              {
                "cycle": 84,
                "true_rul": 125.0,
                "predicted_rul": 98.65647910003099
              },
              {
                "cycle": 85,
                "true_rul": 125.0,
                "predicted_rul": 110.30042759139178
              },
              {
                "cycle": 86,
                "true_rul": 125.0,
                "predicted_rul": 106.36805446109793
              },
              {
                "cycle": 87,
                "true_rul": 125.0,
                "predicted_rul": 106.63458552789598
              },
              {
                "cycle": 88,
                "true_rul": 125.0,
                "predicted_rul": 105.06852580294071
              },
              {
                "cycle": 89,
                "true_rul": 125.0,
                "predicted_rul": 110.41265211713835
              },
              {
                "cycle": 90,
                "true_rul": 125.0,
                "predicted_rul": 103.66332359851003
              },
              {
                "cycle": 91,
                "true_rul": 125.0,
                "predicted_rul": 101.25029585831362
              },
              {
                "cycle": 92,
                "true_rul": 125.0,
                "predicted_rul": 98.81073344349352
              },
              {
                "cycle": 93,
                "true_rul": 125.0,
                "predicted_rul": 94.8024040426535
              },
              {
                "cycle": 94,
                "true_rul": 125.0,
                "predicted_rul": 85.98610103934334
              },
              {
                "cycle": 95,
                "true_rul": 125.0,
                "predicted_rul": 86.37986232414187
              },
              {
                "cycle": 96,
                "true_rul": 125.0,
                "predicted_rul": 84.94750340579412
              },
              {
                "cycle": 97,
                "true_rul": 125.0,
                "predicted_rul": 80.89452623185934
              },
              {
                "cycle": 98,
                "true_rul": 125.0,
                "predicted_rul": 81.23087867662252
              },
              {
                "cycle": 99,
                "true_rul": 125.0,
                "predicted_rul": 80.90958231407785
              },
              {
                "cycle": 100,
                "true_rul": 125.0,
                "predicted_rul": 80.0058855865791
              },
              {
                "cycle": 101,
                "true_rul": 125.0,
                "predicted_rul": 73.18723415123532
              },
              {
                "cycle": 102,
                "true_rul": 125.0,
                "predicted_rul": 84.20971436486434
              },
              {
                "cycle": 103,
                "true_rul": 125.0,
                "predicted_rul": 81.08993449515765
              },
              {
                "cycle": 104,
                "true_rul": 125.0,
                "predicted_rul": 78.20460061358608
              },
              {
                "cycle": 105,
                "true_rul": 125.0,
                "predicted_rul": 77.91319225538246
              },
              {
                "cycle": 106,
                "true_rul": 125.0,
                "predicted_rul": 82.81707348035343
              },
              {
                "cycle": 107,
                "true_rul": 125.0,
                "predicted_rul": 78.40371729229082
              },
              {
                "cycle": 108,
                "true_rul": 125.0,
                "predicted_rul": 87.38354345893458
              },
              {
                "cycle": 109,
                "true_rul": 125.0,
                "predicted_rul": 85.14420729266203
              },
              {
                "cycle": 110,
                "true_rul": 125.0,
                "predicted_rul": 86.73037983437825
              },
              {
                "cycle": 111,
                "true_rul": 125.0,
                "predicted_rul": 91.97926188496422
              },
              {
                "cycle": 112,
                "true_rul": 125.0,
                "predicted_rul": 92.28187553761745
              },
              {
                "cycle": 113,
                "true_rul": 125.0,
                "predicted_rul": 94.18472063564695
              },
              {
                "cycle": 114,
                "true_rul": 125.0,
                "predicted_rul": 94.02290682647799
              },
              {
                "cycle": 115,
                "true_rul": 125.0,
                "predicted_rul": 93.3403271889656
              },
              {
                "cycle": 116,
                "true_rul": 125.0,
                "predicted_rul": 91.30866905877701
              },
              {
                "cycle": 117,
                "true_rul": 125.0,
                "predicted_rul": 93.71942344247873
              },
              {
                "cycle": 118,
                "true_rul": 125.0,
                "predicted_rul": 93.68246889709553
              },
              {
                "cycle": 119,
                "true_rul": 125.0,
                "predicted_rul": 94.26527823683136
              },
              {
                "cycle": 120,
                "true_rul": 125.0,
                "predicted_rul": 93.33710987272207
              },
              {
                "cycle": 121,
                "true_rul": 125.0,
                "predicted_rul": 94.41813201957484
              },
              {
                "cycle": 122,
                "true_rul": 125.0,
                "predicted_rul": 86.02671838292736
              },
              {
                "cycle": 123,
                "true_rul": 125.0,
                "predicted_rul": 78.52251006511142
              },
              {
                "cycle": 124,
                "true_rul": 125.0,
                "predicted_rul": 83.55163401090977
              },
              {
                "cycle": 125,
                "true_rul": 125.0,
                "predicted_rul": 81.57355108380943
              },
              {
                "cycle": 126,
                "true_rul": 125.0,
                "predicted_rul": 79.28599773835231
              },
              {
                "cycle": 127,
                "true_rul": 125.0,
                "predicted_rul": 88.52414168120958
              },
              {
                "cycle": 128,
                "true_rul": 125.0,
                "predicted_rul": 80.56753511567513
              },
              {
                "cycle": 129,
                "true_rul": 125.0,
                "predicted_rul": 83.59930128257474
              },
              {
                "cycle": 130,
                "true_rul": 125.0,
                "predicted_rul": 81.06321711556666
              },
              {
                "cycle": 131,
                "true_rul": 125.0,
                "predicted_rul": 81.52276152095146
              },
              {
                "cycle": 132,
                "true_rul": 125.0,
                "predicted_rul": 77.84048001789415
              },
              {
                "cycle": 133,
                "true_rul": 125.0,
                "predicted_rul": 78.29146138271608
              },
              {
                "cycle": 134,
                "true_rul": 125.0,
                "predicted_rul": 74.08555330041054
              },
              {
                "cycle": 135,
                "true_rul": 125.0,
                "predicted_rul": 74.73695847021008
              },
              {
                "cycle": 136,
                "true_rul": 125.0,
                "predicted_rul": 75.35927659393928
              },
              {
                "cycle": 137,
                "true_rul": 125.0,
                "predicted_rul": 74.64474480640274
              },
              {
                "cycle": 138,
                "true_rul": 124.0,
                "predicted_rul": 71.29851161261467
              },
              {
                "cycle": 139,
                "true_rul": 123.0,
                "predicted_rul": 67.53800608608071
              },
              {
                "cycle": 140,
                "true_rul": 122.0,
                "predicted_rul": 73.21097476802606
              },
              {
                "cycle": 141,
                "true_rul": 121.0,
                "predicted_rul": 66.35092884532787
              },
              {
                "cycle": 142,
                "true_rul": 120.0,
                "predicted_rul": 76.82842155723847
              },
              {
                "cycle": 143,
                "true_rul": 119.0,
                "predicted_rul": 71.76269260435583
              },
              {
                "cycle": 144,
                "true_rul": 118.0,
                "predicted_rul": 69.37534895648787
              },
              {
                "cycle": 145,
                "true_rul": 117.0,
                "predicted_rul": 72.53475930630884
              },
              {
                "cycle": 146,
                "true_rul": 116.0,
                "predicted_rul": 76.95682231011597
              },
              {
                "cycle": 147,
                "true_rul": 115.0,
                "predicted_rul": 78.3820917115554
              },
              {
                "cycle": 148,
                "true_rul": 114.0,
                "predicted_rul": 77.52930449137784
              },
              {
                "cycle": 149,
                "true_rul": 113.0,
                "predicted_rul": 80.97726099413921
              },
              {
                "cycle": 150,
                "true_rul": 112.0,
                "predicted_rul": 72.57902606067364
              },
              {
                "cycle": 151,
                "true_rul": 111.0,
                "predicted_rul": 75.14762080409128
              },
              {
                "cycle": 152,
                "true_rul": 110.0,
                "predicted_rul": 78.42553802331167
              },
              {
                "cycle": 153,
                "true_rul": 109.0,
                "predicted_rul": 75.5494902107348
              },
              {
                "cycle": 154,
                "true_rul": 108.0,
                "predicted_rul": 78.30209517186813
              },
              {
                "cycle": 155,
                "true_rul": 107.0,
                "predicted_rul": 76.3808640360403
              },
              {
                "cycle": 156,
                "true_rul": 106.0,
                "predicted_rul": 77.70955368051364
              },
              {
                "cycle": 157,
                "true_rul": 105.0,
                "predicted_rul": 76.52963166275731
              },
              {
                "cycle": 158,
                "true_rul": 104.0,
                "predicted_rul": 69.03851973987912
              },
              {
                "cycle": 159,
                "true_rul": 103.0,
                "predicted_rul": 81.09091629621253
              },
              {
                "cycle": 160,
                "true_rul": 102.0,
                "predicted_rul": 81.57013003483007
              },
              {
                "cycle": 161,
                "true_rul": 101.0,
                "predicted_rul": 77.48092748420459
              },
              {
                "cycle": 162,
                "true_rul": 100.0,
                "predicted_rul": 74.06440172304428
              },
              {
                "cycle": 163,
                "true_rul": 99.0,
                "predicted_rul": 76.93270781232786
              },
              {
                "cycle": 164,
                "true_rul": 98.0,
                "predicted_rul": 73.48446757942656
              },
              {
                "cycle": 165,
                "true_rul": 97.0,
                "predicted_rul": 69.52917772450019
              },
              {
                "cycle": 166,
                "true_rul": 96.0,
                "predicted_rul": 71.85568074927869
              },
              {
                "cycle": 167,
                "true_rul": 95.0,
                "predicted_rul": 71.95699769788916
              },
              {
                "cycle": 168,
                "true_rul": 94.0,
                "predicted_rul": 74.02768166019086
              },
              {
                "cycle": 169,
                "true_rul": 93.0,
                "predicted_rul": 74.02878613453504
              },
              {
                "cycle": 170,
                "true_rul": 92.0,
                "predicted_rul": 76.46657444279117
              },
              {
                "cycle": 171,
                "true_rul": 91.0,
                "predicted_rul": 73.56761169435777
              },
              {
                "cycle": 172,
                "true_rul": 90.0,
                "predicted_rul": 69.29640865872716
              },
              {
                "cycle": 173,
                "true_rul": 89.0,
                "predicted_rul": 72.56588497935081
              },
              {
                "cycle": 174,
                "true_rul": 88.0,
                "predicted_rul": 69.82662428769981
              },
              {
                "cycle": 175,
                "true_rul": 87.0,
                "predicted_rul": 71.63357974625615
              },
              {
                "cycle": 176,
                "true_rul": 86.0,
                "predicted_rul": 70.18041571653521
              },
              {
                "cycle": 177,
                "true_rul": 85.0,
                "predicted_rul": 71.34887804095706
              },
              {
                "cycle": 178,
                "true_rul": 84.0,
                "predicted_rul": 68.60239032007303
              },
              {
                "cycle": 179,
                "true_rul": 83.0,
                "predicted_rul": 67.26069510508387
              },
              {
                "cycle": 180,
                "true_rul": 82.0,
                "predicted_rul": 65.46058073030144
              },
              {
                "cycle": 181,
                "true_rul": 81.0,
                "predicted_rul": 67.34217225694738
              },
              {
                "cycle": 182,
                "true_rul": 80.0,
                "predicted_rul": 66.35366169941699
              },
              {
                "cycle": 183,
                "true_rul": 79.0,
                "predicted_rul": 64.6370718525468
              },
              {
                "cycle": 184,
                "true_rul": 78.0,
                "predicted_rul": 69.51646638297461
              },
              {
                "cycle": 185,
                "true_rul": 77.0,
                "predicted_rul": 66.04913780546121
              },
              {
                "cycle": 186,
                "true_rul": 76.0,
                "predicted_rul": 63.02546478397562
              },
              {
                "cycle": 187,
                "true_rul": 75.0,
                "predicted_rul": 69.15449981405254
              },
              {
                "cycle": 188,
                "true_rul": 74.0,
                "predicted_rul": 67.31046189243716
              },
              {
                "cycle": 189,
                "true_rul": 73.0,
                "predicted_rul": 69.9428041370411
              },
              {
                "cycle": 190,
                "true_rul": 72.0,
                "predicted_rul": 64.34901739275665
              },
              {
                "cycle": 191,
                "true_rul": 71.0,
                "predicted_rul": 68.54521581904919
              },
              {
                "cycle": 192,
                "true_rul": 70.0,
                "predicted_rul": 67.31993199650242
              },
              {
                "cycle": 193,
                "true_rul": 69.0,
                "predicted_rul": 65.24500766036726
              },
              {
                "cycle": 194,
                "true_rul": 68.0,
                "predicted_rul": 68.44480970853692
              },
              {
                "cycle": 195,
                "true_rul": 67.0,
                "predicted_rul": 64.90544875207343
              },
              {
                "cycle": 196,
                "true_rul": 66.0,
                "predicted_rul": 64.15161943359999
              },
              {
                "cycle": 197,
                "true_rul": 65.0,
                "predicted_rul": 61.37352713506334
              },
              {
                "cycle": 198,
                "true_rul": 64.0,
                "predicted_rul": 60.64506093473756
              },
              {
                "cycle": 199,
                "true_rul": 63.0,
                "predicted_rul": 57.79157264779133
              },
              {
                "cycle": 200,
                "true_rul": 62.0,
                "predicted_rul": 54.98861529059286
              },
              {
                "cycle": 201,
                "true_rul": 61.0,
                "predicted_rul": 58.08650858834153
              },
              {
                "cycle": 202,
                "true_rul": 60.0,
                "predicted_rul": 55.433281540856115
              },
              {
                "cycle": 203,
                "true_rul": 59.0,
                "predicted_rul": 50.89818383893726
              },
              {
                "cycle": 204,
                "true_rul": 58.0,
                "predicted_rul": 52.32013879255828
              },
              {
                "cycle": 205,
                "true_rul": 57.0,
                "predicted_rul": 44.69190597679699
              },
              {
                "cycle": 206,
                "true_rul": 56.0,
                "predicted_rul": 51.837613461691944
              },
              {
                "cycle": 207,
                "true_rul": 55.0,
                "predicted_rul": 44.010138535235455
              },
              {
                "cycle": 208,
                "true_rul": 54.0,
                "predicted_rul": 45.64237942656109
              },
              {
                "cycle": 209,
                "true_rul": 53.0,
                "predicted_rul": 39.57182074205048
              },
              {
                "cycle": 210,
                "true_rul": 52.0,
                "predicted_rul": 39.42769322078311
              },
              {
                "cycle": 211,
                "true_rul": 51.0,
                "predicted_rul": 41.522350214319886
              },
              {
                "cycle": 212,
                "true_rul": 50.0,
                "predicted_rul": 43.77261227726922
              },
              {
                "cycle": 213,
                "true_rul": 49.0,
                "predicted_rul": 39.52896239155962
              },
              {
                "cycle": 214,
                "true_rul": 48.0,
                "predicted_rul": 44.30495092580895
              },
              {
                "cycle": 215,
                "true_rul": 47.0,
                "predicted_rul": 33.249746348497865
              },
              {
                "cycle": 216,
                "true_rul": 46.0,
                "predicted_rul": 37.34461070229736
              },
              {
                "cycle": 217,
                "true_rul": 45.0,
                "predicted_rul": 36.09866977412821
              },
              {
                "cycle": 218,
                "true_rul": 44.0,
                "predicted_rul": 36.45719181879031
              },
              {
                "cycle": 219,
                "true_rul": 43.0,
                "predicted_rul": 31.239651889271045
              },
              {
                "cycle": 220,
                "true_rul": 42.0,
                "predicted_rul": 37.95064362903213
              },
              {
                "cycle": 221,
                "true_rul": 41.0,
                "predicted_rul": 31.0977565955327
              },
              {
                "cycle": 222,
                "true_rul": 40.0,
                "predicted_rul": 26.378551505298674
              },
              {
                "cycle": 223,
                "true_rul": 39.0,
                "predicted_rul": 26.944003830885777
              },
              {
                "cycle": 224,
                "true_rul": 38.0,
                "predicted_rul": 26.204322277204483
              },
              {
                "cycle": 225,
                "true_rul": 37.0,
                "predicted_rul": 25.584149130369042
              },
              {
                "cycle": 226,
                "true_rul": 36.0,
                "predicted_rul": 24.330184094997094
              },
              {
                "cycle": 227,
                "true_rul": 35.0,
                "predicted_rul": 19.265829516065423
              },
              {
                "cycle": 228,
                "true_rul": 34.0,
                "predicted_rul": 25.74147018520671
              },
              {
                "cycle": 229,
                "true_rul": 33.0,
                "predicted_rul": 17.714641642101924
              },
              {
                "cycle": 230,
                "true_rul": 32.0,
                "predicted_rul": 17.946165971734445
              },
              {
                "cycle": 231,
                "true_rul": 31.0,
                "predicted_rul": 16.478513516300154
              },
              {
                "cycle": 232,
                "true_rul": 30.0,
                "predicted_rul": 13.857858185026998
              },
              {
                "cycle": 233,
                "true_rul": 29.0,
                "predicted_rul": 11.746792169669789
              },
              {
                "cycle": 234,
                "true_rul": 28.0,
                "predicted_rul": 16.03080610026518
              },
              {
                "cycle": 235,
                "true_rul": 27.0,
                "predicted_rul": 7.750190290280443
              },
              {
                "cycle": 236,
                "true_rul": 26.0,
                "predicted_rul": 15.103184712599614
              },
              {
                "cycle": 237,
                "true_rul": 25.0,
                "predicted_rul": 11.63711787534703
              },
              {
                "cycle": 238,
                "true_rul": 24.0,
                "predicted_rul": 7.170644903588254
              },
              {
                "cycle": 239,
                "true_rul": 23.0,
                "predicted_rul": 4.3296034412051085
              },
              {
                "cycle": 240,
                "true_rul": 22.0,
                "predicted_rul": 8.30377083989515
              },
              {
                "cycle": 241,
                "true_rul": 21.0,
                "predicted_rul": -5.902333550748153
              },
              {
                "cycle": 242,
                "true_rul": 20.0,
                "predicted_rul": -3.202102888997615
              },
              {
                "cycle": 243,
                "true_rul": 19.0,
                "predicted_rul": -4.453710469548241
              },
              {
                "cycle": 244,
                "true_rul": 18.0,
                "predicted_rul": -7.459849830265739
              },
              {
                "cycle": 245,
                "true_rul": 17.0,
                "predicted_rul": -5.921514148569258
              },
              {
                "cycle": 246,
                "true_rul": 16.0,
                "predicted_rul": -10.001176857793325
              },
              {
                "cycle": 247,
                "true_rul": 15.0,
                "predicted_rul": -12.110531960039225
              },
              {
                "cycle": 248,
                "true_rul": 14.0,
                "predicted_rul": -16.0576489500163
              }
            ]
          }
        ]
      }
    }
  },
  "rag": {
    "generated_at": "2026-07-17T13:19:25Z",
    "ragas_scores": {
      "context_precision_at_3": 0.95,
      "context_recall_at_3": 0.9666666666666667,
      "faithfulness": 1.0,
      "answer_relevancy": 0.5344827586206896
    },
    "retrieval_at_k": {
      "k_values": [
        1,
        3,
        5
      ],
      "hit_rate": [
        0.9333333333333333,
        0.9666666666666667,
        0.9666666666666667
      ],
      "precision": [
        0.9333333333333333,
        0.3222222222222222,
        0.1933333333333333
      ],
      "recall": [
        0.9333333333333333,
        0.9666666666666667,
        0.9666666666666667
      ],
      "mrr": 0.95
    },
    "guardrails": {
      "overall_success_rate": 1.0,
      "off_domain_abstain_rate": 1.0,
      "similarity_threshold_used": 0.42,
      "total_abstentions": 15
    },
    "latency": {
      "average_ms": 492.8373899892904,
      "p50_ms": 558.9350499794818,
      "p95_ms": 835.414014995331,
      "p99_ms": 874.1416749951895
    },
    "latency_histogram": {
      "is_sample": true,
      "bin_edges_ms": [
        0,
        500,
        1000,
        1500,
        2000
      ],
      "counts": [
        0,
        0,
        0,
        0
      ]
    },
    "queries": {
      "is_sample": false,
      "records": [
        {
          "query_id": 1,
          "query_text": "compressor running hot and showing signs of efficiency loss",
          "expected_doc": "MAN-HPC-01",
          "retrieved_docs": [
            "MAN-HPC-01"
          ],
          "reranker_scores": [
            0.707
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 2,
          "query_text": "clearance between blades and casing is failing in HPC",
          "expected_doc": "MAN-HPC-02",
          "retrieved_docs": [
            "MAN-HPC-02"
          ],
          "reranker_scores": [
            0.7081
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 3,
          "query_text": "blades wearing down due to dirt and needing a clean wash",
          "expected_doc": "MAN-HPC-03",
          "retrieved_docs": [
            "MAN-HPC-03"
          ],
          "reranker_scores": [
            0.586
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 4,
          "query_text": "surge or aerodynamic block in HPC requiring engine cut",
          "expected_doc": "MAN-HPC-04",
          "retrieved_docs": [
            "MAN-HPC-04"
          ],
          "reranker_scores": [
            0.6554
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 5,
          "query_text": "slow fan speed reading and air bypass ratio drops",
          "expected_doc": "MAN-FAN-01",
          "retrieved_docs": [
            "MAN-FAN-01"
          ],
          "reranker_scores": [
            0.7263
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 6,
          "query_text": "vibrations matching rotational frequency of the fan",
          "expected_doc": "MAN-FAN-02",
          "retrieved_docs": [
            "MAN-FAN-02"
          ],
          "reranker_scores": [
            0.7357
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 7,
          "query_text": "bird strike or debris hitting front engine blades",
          "expected_doc": "MAN-FAN-03",
          "retrieved_docs": [
            "MAN-FAN-03"
          ],
          "reranker_scores": [
            0.6511
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 8,
          "query_text": "shaft friction and housing heating up over cycles",
          "expected_doc": "MAN-BRG-01",
          "retrieved_docs": [
            "MAN-BRG-01"
          ],
          "reranker_scores": [
            0.7698
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 9,
          "query_text": "metal fragments found in lubrication system check",
          "expected_doc": "MAN-BRG-02",
          "retrieved_docs": [
            "MAN-BRG-02"
          ],
          "reranker_scores": [
            0.7038
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 10,
          "query_text": "borescope inspection of the lower turbine stages tip clearance",
          "expected_doc": "MAN-LPT-01",
          "retrieved_docs": [
            "MAN-LPT-01"
          ],
          "reranker_scores": [
            0.4823
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 11,
          "query_text": "cooling passages clogged or blocked in turbine section",
          "expected_doc": "MAN-LPT-02",
          "retrieved_docs": [
            "MAN-LPT-02"
          ],
          "reranker_scores": [
            0.6324
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 12,
          "query_text": "nozzle soot and combustion chamber liner cracks",
          "expected_doc": "MAN-COMB-01",
          "retrieved_docs": [
            "MAN-COMB-01"
          ],
          "reranker_scores": [
            0.5885
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 13,
          "query_text": "abrupt flatline output while redundant channels match normal",
          "expected_doc": "MAN-SEN-01",
          "retrieved_docs": [
            "MAN-SEN-01"
          ],
          "reranker_scores": [
            0.5748
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 14,
          "query_text": "gradual offset in measurement channel over time",
          "expected_doc": "MAN-SEN-02",
          "retrieved_docs": [
            "MAN-SEN-02"
          ],
          "reranker_scores": [
            0.587
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 15,
          "query_text": "loose wiring or connectors causing sporadic signal loss",
          "expected_doc": "MAN-SEN-03",
          "retrieved_docs": [
            "MAN-SEN-03"
          ],
          "reranker_scores": [
            0.6227
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 16,
          "query_text": "interacting degradation of the front fan and compressor stage",
          "expected_doc": "MAN-MULTI-01",
          "retrieved_docs": [
            "MAN-MULTI-01"
          ],
          "reranker_scores": [
            0.6404
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 17,
          "query_text": "correcting readings based on altitude or flight conditions",
          "expected_doc": "MAN-MULTI-02",
          "retrieved_docs": [
            "MAN-MULTI-02"
          ],
          "reranker_scores": [
            0.4901
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 18,
          "query_text": "cumulative wear across the whole engine fleet fuel flow increase",
          "expected_doc": "MAN-PERF-01",
          "retrieved_docs": [
            "MAN-PERF-01"
          ],
          "reranker_scores": [
            0.7495
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 19,
          "query_text": "high fuel consumption required to maintain baseline power",
          "expected_doc": "MAN-PERF-02",
          "retrieved_docs": [
            "MAN-PERF-02"
          ],
          "reranker_scores": [
            0.6275
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 20,
          "query_text": "air duct leak or failure in the bleed control valve",
          "expected_doc": "MAN-BLEED-01",
          "retrieved_docs": [
            "MAN-BLEED-01"
          ],
          "reranker_scores": [
            0.6314
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 21,
          "query_text": "exceeding tool operational time threshold on factory line",
          "expected_doc": "MAN-TWF-01",
          "retrieved_docs": [
            "MAN-TWF-01"
          ],
          "reranker_scores": [
            0.6655
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 22,
          "query_text": "insufficient temperature delta between ambient and process cooling",
          "expected_doc": "MAN-HDF-01",
          "retrieved_docs": [
            "MAN-HDF-02"
          ],
          "reranker_scores": [
            0.5382
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 23,
          "query_text": "workpiece processing torque exceeds electrical threshold bounds",
          "expected_doc": "MAN-PWF-01",
          "retrieved_docs": [
            "MAN-PWF-01"
          ],
          "reranker_scores": [
            0.537
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 24,
          "query_text": "worn cutting edge causing excessive motor load",
          "expected_doc": "MAN-OSF-01",
          "retrieved_docs": [
            "MAN-OSF-01"
          ],
          "reranker_scores": [
            0.6194
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 25,
          "query_text": "defect in manufacturing materials that cannot be predicted by speed",
          "expected_doc": "MAN-RNF-01",
          "retrieved_docs": [
            "MAN-RNF-01"
          ],
          "reranker_scores": [
            0.5576
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 26,
          "query_text": "monitoring sensor patterns over multiple operations cycles before trigger",
          "expected_doc": "MAN-GUIDE-01",
          "retrieved_docs": [
            "MAN-GUIDE-01"
          ],
          "reranker_scores": [
            0.556
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 27,
          "query_text": "ranking maintenance priorities critical vs non-critical failure risks",
          "expected_doc": "MAN-GUIDE-02",
          "retrieved_docs": [
            "MAN-GUIDE-02"
          ],
          "reranker_scores": [
            0.6103
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 28,
          "query_text": "safety margin for remaining useful life prediction planning maintenance schedule",
          "expected_doc": "MAN-GUIDE-03",
          "retrieved_docs": [
            "MAN-GUIDE-03"
          ],
          "reranker_scores": [
            0.6305
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 29,
          "query_text": "which variables are useful for health monitoring of jet engines",
          "expected_doc": "MAN-GUIDE-04",
          "retrieved_docs": [
            "MAN-GUIDE-04"
          ],
          "reranker_scores": [
            0.5004
          ],
          "abstained": false,
          "hit_at_3": true
        },
        {
          "query_id": 30,
          "query_text": "validation criteria for work orders generated by our agent pipeline",
          "expected_doc": "MAN-GUIDE-05",
          "retrieved_docs": [],
          "reranker_scores": [
            0.2487
          ],
          "abstained": false,
          "hit_at_3": false
        }
      ]
    }
  }
};
