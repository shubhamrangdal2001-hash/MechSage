# 🧑‍🔧 Persona Set — Mech Sage

**Sprint:** 0 · Discover & Probe
**Last updated:** 2026-06-19

---

## Persona 1 · Priya — Reliability Engineer *(Primary User)*

| Dimension | Detail |
|---|---|
| **Role** | Senior Reliability Engineer, Ironside Manufacturing |
| **Experience** | 8 years in industrial asset management |
| **Reports to** | Operations Lead (Meera) |
| **Tools today** | SCADA dashboards, Excel-based threshold logs, manual ticket creation |

### Goal
Catch degradation early enough to schedule a repair **before** the machine stops the line. Trust every alert she receives — no more false-alarm fatigue.

### Frustration
- Drowning in dashboards and threshold alerts — spends **60% of her day** triaging noise
- By the time a threshold fires, the machine is often **hours** from failure, not days
- No explanation of *why* a sensor reading is abnormal — just red/green lights
- Has to manually cross-reference multiple sensor trends to form a hypothesis

### Job To Be Done
> *"Tell me which asset is heading for failure, why, and how sure you are — before it stops the line."*

### What Mech Sage gives her
- **Early alerts** with 5–7 day lead time (vs. 12 hours today)
- **Plain-language explanations** citing specific sensors and degradation trends
- **Confidence scores** so she knows when to act immediately vs. monitor
- **Suppressed noise** — only alerts that meet a multi-sensor consensus threshold

---

## Persona 2 · Ravi — Maintenance Technician

| Dimension | Detail |
|---|---|
| **Role** | Lead Maintenance Technician, Ironside Manufacturing |
| **Experience** | 12 years hands-on with industrial rotating machinery |
| **Reports to** | Reliability Engineering team (Priya) |
| **Tools today** | Paper work orders, radio comms, wrench |

### Goal
Get a clear, complete work order he can act on **without** a follow-up call to engineering.

### Frustration
- Receives vague "check the machine" tickets that require **30 minutes of investigation** before he can even start
- No indication of which **specific component** to inspect
- No suggested **parts or tools** — has to figure it out from experience
- Sometimes gets dispatched to a machine that turns out to be fine (false alarm)

### Job To Be Done
> *"Hand me a work order I can act on without a follow-up call."*

### What Mech Sage gives him
- **Structured work orders** with: suspected fault mode, affected component, recommended inspection procedure, and suggested parts
- **Grounded reasoning** — the work order cites which sensors triggered and references maintenance manual passages
- **Severity ranking** so he prioritizes the right machine first
- **Fewer false dispatches** thanks to the < 5% false-alarm guardrail

---

## Persona 3 · Meera — Operations Lead

| Dimension | Detail |
|---|---|
| **Role** | Operations Lead / Plant Manager, Ironside Manufacturing |
| **Experience** | 15 years in manufacturing operations |
| **Reports to** | VP of Operations |
| **Tools today** | Production schedule spreadsheets, cost reports, gut instinct |

### Goal
Maximize uptime and minimize total maintenance cost. Approve repair schedules with **confidence**, not guesswork.

### Frustration
- No visibility into **cost-vs-risk tradeoffs** — she either approves every repair request (expensive) or delays and hopes for the best (risky)
- Cannot compare "repair now at $X" vs. "defer and risk $Y in unplanned downtime"
- Learns about critical issues from panicked phone calls, not from a system
- Month-end cost surprises from reactive maintenance spikes

### Job To Be Done
> *"Show me the cost-vs-risk picture so I can approve the schedule."*

### What Mech Sage gives her
- **RUL estimates** with confidence — she can see how many days each asset has
- **Scheduling suggestions** that target low-load windows to minimize production impact
- **Fleet-level dashboard** showing all assets ranked by urgency
- **Cost tracking** per asset to keep within the $1.50/asset/month budget

---

## Persona 4 · Arjun — ML / Platform Engineer

| Dimension | Detail |
|---|---|
| **Role** | ML Engineer / Platform Engineer, Ironside Manufacturing (IT team) |
| **Experience** | 4 years in ML ops and backend systems |
| **Reports to** | CTO / Engineering Lead |
| **Tools today** | Python scripts, Grafana (partial), manual log inspection |

### Goal
Keep the copilot system **observable, cheap, and easy to debug**. Sleep at night knowing there's a kill switch.

### Frustration
- Current ML pipelines are **black boxes** — no tracing, no cost tracking
- Token and API costs discovered only at **month-end** billing
- No way to A/B test or roll back a bad model/prompt change safely
- Debugging requires reading raw logs line-by-line

### Job To Be Done
> *"Give me traces, costs, and a kill switch — so I can sleep at night."*

### What Mech Sage gives him
- **Per-request tracing** with LangGraph/LangSmith observability
- **Real-time cost dashboard** with alerts at 80% of budget ceiling
- **Kill switch** (`DISABLE_AGENTS=true`) that instantly falls back to rule-based mode
- **Canary and rollback plan** for prompt/model changes
- **Structured logging** for every agent decision and tool call

---

## Persona Interaction Map

```
                    ┌──────────────┐
                    │   Meera      │
                    │  (Ops Lead)  │
                    │  Approves    │
                    └──────┬───────┘
                           │ approves schedule
                           ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Priya      │───▶│  Mech Sage   │───▶│   Ravi       │
│ (Reliability)│    │  (Copilot)   │    │ (Technician) │
│  Monitors    │    │  Detects,    │    │  Executes    │
│  fleet       │    │  Explains,   │    │  work order  │
└──────────────┘    │  Drafts WO   │    └──────────────┘
                    └──────┬───────┘
                           │ traces, costs, logs
                           ▼
                    ┌──────────────┐
                    │   Arjun      │
                    │ (ML/Platform)│
                    │  Operates    │
                    └──────────────┘
```
