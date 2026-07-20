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

### 🎯 Success Metrics

| Target Metric | What it measures | Type |
|---|---|:--:|
| ⏱️ **Early-detection lead time** | How far ahead of failure a credible alert is raised | ⭐ north-star |
| 🔕 **False-alarm rate** | How often it cries wolf — trust depends on this | 🛡️ guardrail |
| 🧠 **RUL explanation quality** | Whether the RUL estimate & its reason are sound | ✅ supporting |
| 📝 **Work-order usefulness** | Whether a technician can act on the draft | ✅ supporting |
| 💸 **Cost per asset monitored** | The unit economics that decide whether this ships | 🛡️ guardrail |

> 📏 **Rule:** every metric carries a **baseline + target**. A target without a baseline cannot be judged.

### 🚧 Non-Functional Requirements

- **Latency budget** — per-asset analysis completes within the agreed window.
- **Cost ceiling** — hard per-asset budget with alarms; cheap models for routine monitoring.
- **Safety bar** — human approval required; the system **abstains when unsure** and degrades to a human path.

> **✅ Done looks like:** a PRD a stakeholder could approve and a team could build from on its own.

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

<!-- ===================== DEMO TERMINAL ===================== -->
## 🖥️ What it will feel like

```console
$ mech-sage watch --fleet ironside
✨ Monitoring 218 assets ...
⚠️  ASSET-077  degradation detected   · confidence 0.91  · RUL ~ 6.2 days
🗣️  cause: rising HPC outlet temp + vibration drift (sensor s_11, s_14)
📝  draft work-order #WO-2291 created  → awaiting human approval
📅  suggested slot: Sat 02:00–04:00 (low-load window)
💸  run cost: $0.0043 / asset   · budget OK ✅
```

<!-- ===================== TECH STACK ===================== -->
## 🧰 Planned Toolbox

<div align="center">

| Layer | Tool |
|---|---|
| 🤖 Agent orchestration | LangGraph / CrewAI / AutoGen |
| 🚪 LLM gateway | LiteLLM |
| 🧪 Dev models | DeepSeek · Qwen · Llama · Gemini Flash (free tiers) |
| 🗂️ Vector store | Chroma |
| 📐 Retrieval eval | RAGAS |
| 🎛️ Prompt/pipeline opt | DSPy |
| 🌐 Service & UI | FastAPI + light front end |
| ☁️ Deployment | Free cloud tier |

</div>

<!-- ===================== REPO STRUCTURE ===================== -->
## 📁 Repository Structure (planned)

```
MechSage/
├── docs/
│   ├── 01_discovery_brief.md      # Stage 1 output
│   ├── 02_prd.md                  # Stage 2 output
│   └── personas.md
├── data/                          # dataset cards & EDA (later sprint)
├── src/                           # agentic system (later sprint)
├── eval/                          # golden set, RAGAS (later sprint)
└── README.md
```

<!-- ===================== TEAM ===================== -->
## 👥 The Squad

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/238353480-219bcc70-f5dc-466b-9a60-29653d8e8433.gif" width="50"/>

| 🧑‍💻 Sudhanshu Biswas | 🧑‍💻 Ayush Patil | 🧑‍💻 Shubham Rangdal |
|:--:|:--:|:--:|
| <img src="https://img.shields.io/badge/Sudhanshu%20Biswas-Chief%20Agent%20Architect-2EE6D6?style=for-the-badge&labelColor=0F2027"/> | <img src="https://img.shields.io/badge/Ayush%20Patil-Reliability%20%26%20Data%20Alchemist-203A43?style=for-the-badge&labelColor=0F2027"/> | <img src="https://img.shields.io/badge/Shubham%20Rangdal-Platform%20%26%20Ops%20Commander-2C5364?style=for-the-badge&labelColor=0F2027"/> |
| *Orchestrates the agent swarm and owns the product vision* | *Turns raw sensor streams into early-failure foresight* | *Keeps the fleet live, cheap, and fully observable* |

*A small engineering squad sharing one codebase — IIT GN  AI Clinic · Capstone Project 04.*

</div>

<!-- ===================== BACK TO TOP ===================== -->
<div align="center">

<br/>

[![Back to top](https://img.shields.io/badge/⬆️%20Back%20to%20top-0F2027?style=for-the-badge)](#top)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2C5364,50:203A43,100:0F2027&height=130&section=footer" width="100%"/>

<sub>Built with ☕ + 🤖 for the IIT GN AI  Clinic · Ironside Manufacturing is a fictional persona for this engagement.</sub>
</div>
