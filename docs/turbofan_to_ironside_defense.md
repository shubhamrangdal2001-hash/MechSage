# MechSage — Turbofan-to-Ironside Transferability Defense

> **Purpose:** This document answers the capstone panel question: *"You trained on turbofan data — how can it apply to Ironside Manufacturing?"*
> **Audience:** Panel evaluators, client stakeholders, team reference.

---

## 1. The Core Argument

MechSage's ML brain never claims to know what an ISM-CNC-001 spindle looks like. It learns one universal truth from the C-MAPSS turbofan dataset: **rotating machinery degrades in mathematically predictable ways, regardless of what it makes**. The physics are the same — bearing spall, thermal runaway, oil starvation, and rotor imbalance all produce the same sensor signatures whether they occur inside a turbofan or a Pune gearbox.

The **RAG layer** is the Ironside-specific layer. It converts the abstract ML output (`"RUL=42, anomaly=1, s11↑, s3↑"`) into a concrete, plant-specific work order for ISM-GBX-003 using Ironside's own maintenance documents. The ML model does **not** need to know Ironside — the RAG corpus does.

```
┌──────────────────────────────────────────────────────────────────┐
│                        MechSage Architecture                     │
│                                                                  │
│   C-MAPSS Sensor Data ──► ML Model ──► Abstract Prediction      │
│   (turbofan physics)      (RUL, anomaly,  (RUL=42, s11 alert)   │
│                            degrading                              │
│                            sensors)                               │
│                                 │                                │
│                                 ▼                                │
│   Ironside Corpus ──────► RAG Pipeline ──► Ironside Work Order  │
│   (plant-specific docs)  (retrieves docs)  (ISM-GBX-003: check  │
│                           matching the      output shaft bearing) │
│                           abstract signal)                        │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Why the Physics Transfer

Both turbofan engines and manufacturing equipment are **rotating machinery with thermal loads**. The same physical degradation mechanisms govern both domains:

| Degradation Mechanism | C-MAPSS Turbofan | Ironside Equivalent | Shared Physics |
|---|---|---|---|
| **Bearing wear** | Fan + HPC shaft bearings | CNC spindle bearings, conveyor drive bearings | Hertzian contact fatigue, race spall |
| **Thermal overload** | HPC outlet temp rise (s3, s4) | Gearbox oil temperature, spindle housing heat | Viscosity breakdown, thermal expansion |
| **Oil/lubricant starvation** | Bleed system fault (s17, s20, s21) | Hydraulic seal degradation, gearbox oil level | Film thickness failure, adhesive wear |
| **Pressure anomaly** | HPC pressure loss (s7, s11) | Hydraulic press cylinder pressure, compressor discharge | Fluid dynamics instability |
| **Rotor/shaft imbalance** | Fan imbalance (s8, s13, s15) | Gearbox gear pitting, conveyor shaft misalignment | Unbalanced centrifugal forces |
| **Efficiency loss** | Core speed drop (s9, s14) | Drive motor current increase, belt slip | Power-to-load ratio degradation |

---

## 3. Sensor Mapping — C-MAPSS to Ironside

The 14 informative C-MAPSS sensors map conceptually to physical quantities at Ironside. This table is used when authoring Ironside corpus documents — every document includes both the sensor code and the physical description so the RAG retriever can match C-MAPSS-style queries to Ironside-specific content.

| C-MAPSS Sensor | Physical Meaning | Ironside Analogue | Relevant Machine(s) |
|---|---|---|---|
| **s2** | LPC outlet temperature | Coolant pump outlet temp | ISM-CNC-001, ISM-HYD-002 |
| **s3** | HPC outlet temperature | Spindle housing / bearing temperature | ISM-CNC-001, ISM-CMR-004 |
| **s4** | LPT outlet temperature | Gearbox oil temperature / compressor discharge temp | ISM-GBX-003, ISM-CMR-004 |
| **s7** | HPC outlet pressure | Hydraulic system pressure / compressor discharge pressure | ISM-HYD-002, ISM-CMR-004 |
| **s8** | Physical fan speed | Conveyor motor speed / spindle RPM | ISM-CVY-005, ISM-CNC-001 |
| **s9** | Physical core speed | Main drive shaft speed / gearbox output speed | ISM-GBX-003, ISM-CVY-005 |
| **s11** | Static HPC pressure | Vibration amplitude (RMS) at housing | ISM-CNC-001, ISM-GBX-003 |
| **s12** | Fuel flow ratio | Motor current draw / power consumption ratio | ISM-CNC-001, ISM-CVY-005 |
| **s13** | Corrected fan speed | Corrected conveyor speed (load-adjusted) | ISM-CVY-005 |
| **s14** | Corrected core speed | Load-corrected shaft speed | ISM-GBX-003 |
| **s15** | Bypass ratio | Coolant flow ratio / valve opening ratio | ISM-HYD-002 |
| **s17** | Bleed enthalpy | Hydraulic return line pressure / heat rejection | ISM-HYD-002 |
| **s20** | HPT coolant bleed | Compressor inter-stage cooling flow | ISM-CMR-004 |
| **s21** | LPT coolant bleed | Compressor aftercooler flow rate | ISM-CMR-004 |

---

## 4. How RAG Retrieval Bridges the Gap

### 4.1 The Query Flow

When the ML model fires, MechSage constructs a hybrid query that contains both the abstract sensor codes and the translated physical descriptions:

```
ML Output:  RUL=45, anomaly=1, asset=ISM-GBX-003, degrading=[s11, s12]

Query Built: "ISM-GBX-003 gearbox RUL 45 cycles anomaly vibration amplitude s11 
              motor current increase s12 output shaft bearing degradation"
```

### 4.2 Why Similarity Scores are High

The Ironside corpus documents are authored with **dual vocabulary** — they contain both C-MAPSS sensor tags and Ironside plant-specific language. This means:

- **Dense (semantic) retrieval**: Embedding the query and Ironside documents in the same vector space produces high cosine similarity because the vocabulary overlaps.
- **Sparse (BM25) retrieval**: Sensor tags like `s11`, `s12`, and machine IDs like `ISM-GBX-003` are exact keyword matches in the BM25 index.
- **Hybrid score (RRF)**: Both signals reinforce each other, pushing the correct Ironside document to rank 1.

### 4.3 Example Retrieval

```
Query:   "RUL 45 cycles gearbox bearing wear vibration s11 output shaft ISM-GBX-003"

Match 1: equipment_profile_ISM-GBX-003.md (score: 0.87)
         "At RUL < 50 cycles, output shaft bearing vibration (s11) exceeds 
          baseline. Schedule inspection immediately..."

Match 2: playbook_bearing_wear.md (score: 0.81)
         "ANOMALY-BEARING-WEAR: Rising vibration amplitude (s11) combined 
          with motor current draw (s12)..."

Match 3: RUL_Decision_Matrix.md (score: 0.76)
         "20 < RUL ≤ 50: WARNING — Schedule controlled shutdown within 24 hours..."
```

---

## 5. Addressing the Panel's Likely Questions

### Q: "Isn't a turbofan completely different from a CNC machine?"

**A:** At the component level, yes. At the physics level, no. A turbofan bearing and a CNC spindle bearing fail by the same mechanism — Hertzian contact fatigue that produces rising vibration (s11-equivalent) and heat (s3-equivalent). The ML model learns this degradation curve. The RAG layer then says: *"On a CNC machine, this curve means the spindle bearing needs replacement."*

### Q: "What if the RUL number doesn't translate?"

**A:** We explicitly define an Ironside-specific RUL-to-action matrix. The number is a planning unit, not a physical measurement. The decision matrix maps `RUL < 50 → schedule inspection` regardless of whether the unit is an engine cycle or a shift cycle. The client's team operates at ~6 cycles/shift, so 50 cycles ≈ 8 shifts ≈ 2.5 working days of lead time.

### Q: "Why not just get real Ironside data?"

**A:** Ironside Manufacturing does not yet have a sensor historian with run-to-failure records — they are transitioning from reactive to condition-based maintenance. C-MAPSS is the world's most cited run-to-failure benchmark. It lets us prove the architecture works; when Ironside deploys sensors and accumulates data, the ML layer can be fine-tuned on real data without changing the RAG or agent layers.

---

## 6. Summary

| Layer | Dataset | Responsibility |
|---|---|---|
| **ML Model** | NASA C-MAPSS (turbofan) | Learns degradation physics universally applicable to rotating machinery |
| **RAG Corpus** | Ironside synthetic documents | Translates abstract ML signals into Ironside-specific maintenance actions |
| **LLM (Generation)** | GPT-4o / Claude | Synthesizes retrieved passages into a plain-language work order |

The architecture is intentionally **decoupled**: the ML model is domain-agnostic; the RAG corpus is domain-specific. Swapping in a new client requires only updating the corpus — not retraining the model.

---

*This document feeds the MechSage Stage 7 (Verify) section on domain transferability. See also: `README.md` §8 Key Risks, `02_prd.md` §11 Risks.*
