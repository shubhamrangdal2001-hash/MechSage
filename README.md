# MechSage Observability Dashboard

A self-contained dark-theme dashboard for the MechSage ML pipeline and RAG evaluation.

## What's inside
```
mechsage-dashboard/
  index.html                     # the whole dashboard (self-contained: CSS + JS + SVG charts)
  data.js                        # embedded snapshot (fallback for local/file:// preview)
  data/
    ml_metrics_snapshot.json     # Dashboard 1 feed
    rag_metrics_snapshot.json    # Dashboard 2 feed
  gen_data.py                    # regenerates the two snapshots + data.js
```

## How data loads
On load the app first tries `fetch('./data/ml_metrics_snapshot.json')` and
`./data/rag_metrics_snapshot.json`. If that fails (e.g. opened as a local
`file://`), it falls back to the embedded `window.MECHSAGE_DATA` in `data.js`.
So it works both as a plain double-click preview AND as a deployed static site.

## Real vs sample data
- **Real numbers** (from the Antigravity data contract) power every KPI: RUL
  regression, anomaly metrics, the top-2 SHAP features, all RAGAS scores,
  retrieval@k, guardrails, and latency percentiles.
- **Sample series** (flagged `is_sample: true` in the JSON and shown with a
  small "sample" tag in the UI) stand in for exports that don't exist yet:
  RUL trajectories, per-feature drift, the latency histogram, the recall@k
  row, and the per-query table. Swap them the moment the repo emits real files.

## Deploy to GCP (Cloud Storage + CDN)
```bash
gsutil mb -l us-central1 gs://mechsage-dashboard        # once
gsutil -m cp -r index.html data.js data gs://mechsage-dashboard
gsutil web set -m index.html gs://mechsage-dashboard
gsutil iam ch allUsers:objectViewer gs://mechsage-dashboard
# (optional) put a Cloud CDN + HTTPS load balancer in front of the bucket
```
To refresh metrics: have the ML/RAG pipelines overwrite the two JSON files in
`data/`, re-upload them, and the dashboard shows the new numbers on reload.
