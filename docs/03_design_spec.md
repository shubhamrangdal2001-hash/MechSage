# 🏛️ Stage 3 · Platform Design Specification
## Mech Sage — Platform Architecture: Gateway, Routing, Registry, Memory, & Metrics

This specification details the platform architecture of MechSage. It is structured to explain the system step-by-step, highlighting key design choices, reasons for those choices, and how the components interact—specifically tailored for a beginner in system design.

---

## 1. Finalizing Latency & Cost-Ceiling Metrics (PRD §10)

For any software system, especially an industrial operations platform, you must establish **Non-Functional Requirements (NFRs)**—constraints like speed (latency) and budget (cost) before building.

### 1.1 Step-by-Step Latency Budgets
In system design, we categorise tasks by their computational weight. We divide our system's work into two paths: **Routine Screening (Cheap/Fast)** and **Diagnostic Analysis (Heavy/Detailed)**.

```
                  ┌─────────────────────────────────────────┐
                  │          TELEMETRY FRAME INGEST         │
                  └────────────────────┬────────────────────┘
                                       │
                 ┌─────────────────────┴─────────────────────┐
                 ▼                                           ▼
       ┌──────────────────┐                        ┌──────────────────┐
       │   Cheap Path     │                        │  Escalated Path  │
       │(Routine screening)│                        │  (Diagnostics)   │
       │   Target: < 5s    │                        │  Target: < 30s   │
       └──────────────────┘                        └──────────────────┘
```

1. **Step 1: Routine screening latency (< 5 seconds)**
   * *What it is:* The time it takes to scan telemetry data from a single asset during normal operation.
   * *Why:* With 218 active engines, the system must perform this check in parallel. If screening were slow (e.g., 30s), normal checks would experience massive backlog delays.
2. **Step 2: Diagnostic analysis latency (< 30 seconds)**
   * *What it is:* The time elapsed when a sensor anomaly triggers a full investigation (fetching manuals via RAG, diagnosing the failure mode).
   * *Why:* This step is escalated. 30 seconds is fast enough for a reliability engineer to get an explanation without waiting too long, yet leaves enough time for complex database queries.
3. **Step 3: Work-order generation latency (< 60 seconds)**
   * *What it is:* The time the system takes to draft a complete, detailed instruction ticket for technicians.
   * *Why:* Writing long structured paragraphs using a medium model takes extra processing time.
4. **Step 4: End-to-end latency (< 120 seconds / 2 minutes)**
   * *What it is:* Total time elapsed from the first detection of an anomaly to the moment the finished draft is queued for human review.

### 1.2 Step-by-Step Cost Ceilings
* **Monthly fleet budget ceiling: < $327**
  * *Calculation:* With **218 assets** in the fleet, we assign a maximum budget of **$1.50 per asset per month**.
* **Per-escalation run ceiling: < $0.05**
  * *Why:* We can't use expensive models for every check. We allocate less than 5 cents per diagnostic run so we stay well within the monthly limit even if multiple anomalies occur.

---

## 2. LLM Gateway Design (The Communication Router)

### 2.1 What is an LLM Gateway?
A gateway is a single entry point for all API calls to external Language Models. Instead of every individual agent writing custom code to call Gemini or OpenAI directly, they call our central **LLM Gateway** (powered by LiteLLM).

```
  ┌─────────────────────────────────────────────────────────────┐
  │                         LLM GATEWAY                         │
  ├───────────────┬───────────────────┬───────────────┬─────────┤
  │ Rate Limiter  │ Timeout & Retries │ Failovers     │ Cache   │
  │ (Max 100 RPM) │ (10s/30s limits)  │ (Gemini $\rightarrow$ GPT)│ (Semantic)│
  └───────────────┴───────────────────┴───────────────┴─────────┘
```

### 2.2 Step-by-Step Gateway Operations

#### Step 1: Centralized Authentication
* *Concept:* All API keys (`GEMINI_API_KEY`, `OPENAI_API_KEY`) are managed inside the gateway environment configuration.
* *Why:* It protects secrets. Individual developers working on agents do not need access to master keys, preventing security leaks.

#### Step 2: Timeout Interception
* *Concept:* The gateway enforces a strict timer. If a screening call takes $> 10$ seconds or a diagnostic call takes $> 30$ seconds, the gateway terminates the connection.
* *Why:* Prevents the system from hanging and wasting resources on stalled requests.

#### Step 3: Exponential Backoff & Jitter Retries
* *Concept:* If the external API fails (e.g., HTTP 503 Service Unavailable or HTTP 429 Rate Limit), the gateway retries. It waits:
  $$\text{Delay} = 2^{\text{attempt}} + \text{random\_jitter}$$
* *Why:* If the network drops for a brief millisecond, the system recovers automatically without throwing errors to the user.

#### Step 4: Provider Fallback Chain
* *Concept:* If Gemini Pro fails 3 consecutive times, the gateway automatically intercepts the request and routes it to OpenAI's GPT-4o. If GPT-4o fails, it falls back to Claude 3.5 Sonnet.
* *Why:* High availability. We can maintain uptime even if an entire cloud provider goes down.

#### Step 5: Semantic Caching
* *Concept:* The gateway caches prompt responses. Before calling a model, it compares the new anomaly vector (e.g., s3, s11 sensor drifts) against previous queries. If there is a cosine similarity of $\ge 0.96$ (almost identical pattern), it returns the cached explanation.
* *Why:* **Saves up to 90% of token costs** on repeated alarms.

---

## 3. Model-Routing Table Design (The Resource Allocator)

### 3.1 What is Model Routing?
A model-routing policy acts like a decision table. It routes simple, repetitive jobs to cheap/local models, and reserves complex, reasoning-intensive tasks for premium models.

```
                          ┌──────────────────┐
                          │    LLM Gateway   │
                          └────────┬─────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌──────────────────┐     ┌──────────────────┐      ┌──────────────────┐
│  Tier 3 (Local)  │     │ Tier 2 (Medium)  │      │  Tier 1 (Strong) │
│ - Rules / ML     │     │ - Gemini Flash   │      │ - Gemini Pro     │
│ - Telemetry check│     │ - Work Orders    │      │ - RCA / Diagnostics│
└──────────────────┘     └──────────────────┘      └──────────────────┘
```

### 3.2 Routing Policy Table

| Task | Input Size | Primary Model | Fallback Model | SLA (Max Latency) | Design Goal |
|---|---|---|---|---|---|
| **Routine Telemetry Watch** | 21 sensors $\times$ 30 cycles | **Local LightGBM Classifier** | N/A (runs on local CPU) | < 0.05s | **Zero token cost** |
| **RUL Estimation** | 14 active sensors | **Local LSTM Regression** | Simple Linear Regression | < 0.5s | **Deterministic math** |
| **Root Cause Explanation (RCA)** | Telemetry + RAG Manual Chunks | **Gemini 1.5 Pro** | OpenAI GPT-4o | < 15.0s | **High reasoning & grounding** |
| **Work Order Drafting** | Diagnostic results | **Gemini 1.5 Flash** | OpenAI GPT-4o-mini | < 10.0s | **Fast formatting at low cost** |
| **Maintenance Scheduling** | Production Calendar + RUL | **Gemini 1.5 Flash** | Python constraint solver | < 5.0s | **Low-latency constraint matching** |

---

## 4. Agent Registry Design (The Discovery Hub)

### 4.1 What is an Agent Registry?
In standard agent systems, you hardcode which agent coordinates with which other agent. If you update the code for one agent, the entire system might break.
An **Agent Registry** is like a phone book or service directory. It decouples the Orchestrator from the individual agents.

```
1. Orchestrator looks up registry: "Who is the active DiagnosisAgent?"
2. Registry returns: Version 1.2.0 metadata + endpoint + input/output schemas
3. Orchestrator validates data structures and executes the agent
```

### 4.2 Registration Metadata Schema
Every agent registers itself using this structural schema. This tells the system how to call it:
```json
{
  "agent_name": "DiagnosisAgent",
  "version": "1.2.0",
  "description": "Explains failure modes by grounding sensor telemetry in manuals.",
  "routing_tier": "tier-1-strong",
  "input_schema_hash": "sha256-e3b0c442...",
  "output_schema_hash": "sha256-c89e02a1...",
  "endpoint": "/api/v1/agents/diagnosis",
  "average_cost": 0.015,
  "average_latency_ms": 7800
}
```

### 4.3 Why this is useful for beginners:
* **Plug-and-Play:** You can replace the underlying code for `DiagnosisAgent` completely. As long as the inputs and outputs match the registered schemas, the system continues to work.
* **A/B Testing:** The orchestrator can discover and split traffic between `DiagnosisAgent v1.1.0` and `v1.2.0` to see which produces better work orders.

---

## 5. Memory & State Design (The Brain)

A multi-agent system needs to remember what happened. We design state memory in two layers: **Short-Term (Session) State** and **Long-Term (Persistent) State**.

```
                  ┌───────────────────────────────┐
                  │         STATE ENGINE          │
                  └───────────────┬───────────────┘
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
┌──────────────────┐                             ┌──────────────────┐
│ Short-Term State │                             │ Long-Term State  │
│ - Ephemeral      │                             │ - Persistent DB  │
│ - LangGraph context                            │ - Audit logs     │
│ - Anomaly session│                             │ - Human feedback │
└──────────────────┘                             └──────────────────┘
```

### 5.1 Short-Term (Session Context)
* **What it is:** Ephemeral context that exists only during a single troubleshooting run.
* **How it works:** When an anomaly is detected on Engine 077, the orchestrator opens a new "state dictionary" (LangGraph State). As the Diagnosis Agent runs, it writes the RUL estimate to this dictionary. The Planner Agent then reads this value to choose a scheduling slot.
* **Lifecycle:** Once the final work order is drafted and sent for approval, this memory is deleted.

### 5.2 Long-Term (Persistent Audit & Learning)
* **What it is:** The permanent archives.
* **How it works:** We write data to a SQL database (PostgreSQL):
  1. *Audit Logs:* Every prompt, response, cost, and latency is stored so Arjun (Platform Eng.) can inspect failures.
  2. *Feedback Logs:* Whether the Reliability Engineer approved or rejected the work order.
* **Why:** This data is used to retrain the anomaly models and optimize prompt layouts.
