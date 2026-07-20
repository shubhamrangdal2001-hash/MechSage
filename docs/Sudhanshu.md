# Mech Sage — Stage 3 (Design) · Sudhanshu's Tasks

**Owner:** Sudhanshu Biswas  
**Role:** Chief Agent Architect & Product Lead  
**Area:** Agent design & orchestration  
**Final deliverable:** `docs/03_design.md`

---

## Task 1 — Agent Topology *(item #7)*

Name and fully define every agent. For **each** agent specify:

- Name
- Single responsibility (one job only)
- Inputs it accepts
- Outputs it returns
- Tools it may call
- Model tier (cheap vs strong)

**Agents to define:** Fleet Supervisor / Orchestrator · Monitoring Agent (cheap, always-on) · Diagnosis Agent (RUL + explanation, RAG-grounded) · Planner Agent (work-order + schedule).

*Deliverable:* a topology table in `03_design.md`.

## Task 2 — Orchestration Decision Record (ADR) *(item #8)* ⭐ **KEY**

Write the ADR for how agents are arranged. Weigh three patterns:

1. **Hierarchical** — fleet supervisor → per-asset agents → diagnostic & planning sub-agents.
2. **Parallel** — many assets watched concurrently.
3. **Plan-and-execute** — the maintenance scheduler.

State clearly which is **adopted**, which **rejected**, and **why** — with **scale** as the deciding factor (must hold across a fleet of hundreds). *This is the highest-value artifact for reviewers.*

## Task 3 — Agent Contracts as Schemas *(item #9)*

Define each agent's input/output as a formal schema (e.g. JSON Schema) so any agent can be swapped without breaking the system. Cover:

- Request schema (inputs)
- Response schema (outputs)
- Error / **abstain** shape (what an agent returns when uncertain)
- Contract versioning

## Task 4 — Own & Assemble the Final Spec

- Merge all Stage 3 sections into a single coherent `docs/03_design.md`.
- Review the whole spec against the PRD; ensure **every requirement maps to a design decision**.

---

## Checklist

- [ ] Task 1 — Agent topology table
- [ ] Task 2 — Orchestration decision record (ADR)
- [ ] Task 3 — Agent contracts as schemas
- [ ] Task 4 — Merge & review `03_design.md`
