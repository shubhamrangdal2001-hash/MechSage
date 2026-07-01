# 📘 MechSage Platform Design Guide
## A Beginner's Step-by-Step Guide to the Platform Architecture

This document breaks down the core platform components of MechSage—the **LLM Gateway, Model-Routing Table, Agent Registry, Memory & State**, and **Latency/Cost Ceilings**—explaining *what* they are, *why* we designed them this way, and *how* they work together. 

---

## 1. Finalizing Latency & Cost-Ceiling Numbers (PRD §10)

Before writing any design, we must establish our budget boundaries. In industrial operations, you cannot let compute costs run wild, nor can you wait hours for an emergency alert.

### 1.1 The Latency Budget (How fast it must run)
We split latency based on how critical and resource-heavy the task is:

```
[Incoming Telemetry] ──► Monitoring Engine (Rule/ML) ──► Anomaly Detected ──► Diagnosis & Planning
                           (Cheap Path: < 5s)                        (Escalated Path: < 30s)
```

1. **Cheap Path (Routine Screening): < 5 seconds**
   * *What it is:* The daily/hourly checks running on the 218 assets.
   * *Why:* This runs continuously. If it took 2 minutes per machine, checking 218 machines would take over 7 hours. It must be near-instantaneous.
2. **Escalated Path (Full Diagnostics): < 30 seconds**
   * *What it is:* Triggered only when a machine behaves abnormally. The system fetches manuals and analyzes historical sensor trends.
   * *Why:* 30 seconds is fast enough for a human engineer to receive a diagnostic alert during their shift without lag.
3. **Work-Order Drafting: < 60 seconds**
   * *What it is:* The Planner Agent writing the list of steps, parts, and safety measures.
   * *Why:* Writing long-form structured text takes more time and tokens, so we allow up to 1 minute.
4. **End-to-End Latency: < 120 seconds (2 minutes)**
   * *What it is:* Total time from detecting a sensor anomaly to presenting a draft work order to the supervisor.

### 1.2 The Cost Budget (How cheap it must be)
* **Monthly Per-Asset Limit: < $1.50**
  * For our fleet of 218 engines, this equals a **hard ceiling of $327 per month**.
* **Per-Escalation Limit: < $0.05**
  * Each time a machine acts up and we invoke a heavy LLM to diagnose it, that single run must cost less than 5 cents.

> 💡 **Beginner Analogy:** Think of this like heating a house. You don't run the heavy fireplace in every room all day (pure Hierarchical/LLM model). You use cheap, passive insulation (local ML rules) and only turn on the targeted electric space heater (Strong LLM) in the exact room where someone is cold (Anomaly).

---

## 2. The LLM Gateway (The Post Office)

### 2.1 What is an LLM Gateway?
Instead of having our agents connect directly to OpenAI or Gemini APIs using different libraries and keys, **all model calls go through a single gateway wrapper (LiteLLM)**. 

```
┌─────────────┐
│  Monitor    ├─────┐
└─────────────┘     │     ┌──────────────┐     ┌──────────────┐
┌─────────────┐     ├────►│ LLM Gateway  ├────►│ Gemini API   │
│  Diagnosis  ├─────┤     │ (LiteLLM)    │     ├──────────────┤
└─────────────┘     │     └──────────────┘     │ OpenAI API   │
┌─────────────┐     │                          └──────────────┘
│  Planner    ├─────┘
└─────────────┘
```

### 2.2 Step-by-Step Gateway Resiliency Functions

#### Step 1: Centralized Key Management
* *How it works:* The gateway loads API keys once from environment variables. Agents don't manage keys; they just ask the gateway: `"Run this prompt."`
* *Why:* Prevents developers from accidentally committing secret keys to GitHub.

#### Step 2: Timeouts
* *How it works:* If the Gemini API doesn't respond within **30 seconds** during a diagnostic run, the gateway terminates the request.
* *Why:* Prevents the system from hanging indefinitely, which would lock up resources.

#### Step 3: Retries with Exponential Backoff & Jitter
* *How it works:* If the gateway receives a network error (e.g., rate-limit 429), it waits 1 second, then tries again. If it fails again, it waits 2 seconds, then 4 seconds. We add a random decimal (jitter) so we don't spam the server at the exact same millisecond.
* *Why:* Temporary internet blips or rate limit spikes are solved automatically without crashing the application.

#### Step 4: Provider Fallback Chain
* *How it works:* If Gemini Pro fails 3 times, the gateway automatically redirects the prompt to GPT-4o. If GPT-4o is down, it routes to Claude 3.5 Sonnet.
* *Why:* Ensures high availability (99% uptime). If one provider goes down, the maintenance technicians still get their work orders.

#### Step 5: Semantic Caching
* *How it works:* The gateway stores previous inputs and outputs in a vector database. If a new anomaly has a $96\%$ match to a pattern we explained 10 minutes ago, the gateway serves the cached explanation instead of calling the LLM again.
* *Why:* **Saves up to 90% of token costs** on repetitive alarms.

---

## 3. The Model-Routing Table (The Traffic Cop)

### 3.1 What is Model Routing?
Different LLMs have different strengths and costs. Routing is the decision table that directs each sub-task to the correct model.

```
                  ┌───────────────────────────────┐
                  │      MODEL-ROUTING GATE       │
                  └───────────────┬───────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  Tier 3 (Local)  │    │ Tier 2 (Medium)  │    │  Tier 1 (Strong) │
│ - LightGBM / Rule│    │ - Gemini Flash   │    │ - Gemini Pro     │
│ - Telemetry check│    │ - Drafting steps │    │ - RCA/RUL explain│
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

### 3.2 Decision Table

| Task | Complexity | Why this Tier? | Model Selected | Fallback |
|---|---|---|---|---|
| **Routine Telemetry Check** | Low | Runs millions of times. Must be free. | **Local LightGBM (ML)** | Static thresholds |
| **RUL Regression** | Low | Math calculation on sensor values. | **Local LSTM Model** | Linear regression |
| **Root Cause Explanation** | High | Needs deep reasoning to connect sensor trends to manuals. | **Gemini 1.5 Pro (Tier 1)** | GPT-4o |
| **Work-Order Drafting** | Medium | Formatting structured text based on templates. | **Gemini 1.5 Flash (Tier 2)** | GPT-4o-mini |
| **Maintenance Scheduling** | Medium | Simple calendar parsing and constraint solving. | **Gemini 1.5 Flash (Tier 2)** | Python solver |

---

## 4. The Agent Registry (The Directory)

### 4.1 What is an Agent Registry?
In a basic system, you write your agent logic directly in the orchestrator. If you change the agent, you risk breaking the orchestrator. 
An **Agent Registry** is a catalog directory. The orchestrator doesn't hardcode agents; it looks them up dynamically.

```
1. Orchestrator looks up "DiagnosisAgent" version "1.2.0"
2. Registry returns endpoint URL, model tier, and input/output schemas
3. Orchestrator executes agent safely
```

### 4.2 Why this is important for beginners:
* **Decoupling:** You can rewrite the `DiagnosisAgent` code or change its model, and as long as it adheres to the contract, the rest of the application is untouched.
* **Versioning:** You can run `DiagnosisAgent v1.1` and `v1.2` side-by-side to perform A/B quality testing.

---

## 5. Memory & State Design (The Brain)

Agents need memory to behave intelligently. We design memory with two distinct layers:

### 5.1 Short-Term Memory (Session Context)
* **What it is:** The local notebook used during a single diagnostics session. 
* **How it works:** When an anomaly is detected on Engine 077, the orchestrator opens a new "state dictionary" (LangGraph State). As the Diagnosis Agent runs, it writes the RUL estimate to this dictionary. The Planner Agent then reads this value to choose a scheduling slot.
* **Lifecycle:** Once the final work order is drafted and sent for approval, this memory is deleted.

### 5.2 Long-Term Memory (The Database)
* **What it is:** The permanent archives.
* **How it works:** We write data to a SQL database (PostgreSQL):
  1. *Audit Logs:* Every prompt, response, cost, and latency is stored so Arjun (Platform Eng.) can inspect failures.
  2. *Feedback Logs:* Whether the Reliability Engineer approved or rejected the work order.
* **Why:** This data is used to retrain the anomaly models and optimize prompt layouts.

---

## 6. How it All Connects (Step-by-Step Flow)

Let's look at a concrete scenario: **Engine 077 has a degrading high-pressure compressor seal.**

```
[Raw Sensor Data]
       │ (Step 1: Ingested every cycle)
       ▼
[FleetMonitorAgent] (Tier 3 Local ML)
       │ (Step 2: Detects anomaly score = 0.82)
       ▼
[LangGraph Orchestrator] ──(Step 3: Consults Agent Registry)──► [Finds active DiagnosisAgent]
       │
       ├─► Calls [DiagnosisAgent] (Tier 1 Gemini Pro via LLM Gateway)
       │     │
       │     ├─► Runs Local RUL Regression (Returns: 22 cycles)
       │     └─► Queries ChromaDB vector database (Retrieves manual passages)
       │
       ├─► Confirms Confidence (0.88 >= 0.60 gate) ──► Approved to proceed
       │
       └─► Calls [PlannerAgent] (Tier 2 Gemini Flash via LLM Gateway)
             │
             ├─► Drafts steps & required parts
             └─► Checks calendar for low-impact slot
```

This modular platform architecture ensures MechSage is **cheap to run, highly resilient to API outages, and safe for critical machinery**.
