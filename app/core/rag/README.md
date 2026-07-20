# MechSage RAG Pipeline

This directory contains the Retrieval-Augmented Generation (RAG) pipeline for the MechSage project. It uses a hybrid retrieval approach (Dense + Sparse) with cross-encoder reranking to fetch the most relevant maintenance manuals and troubleshooting guides based on live sensor telemetry.

## Prerequisites

Make sure you have all the required dependencies installed. From the root of the `MechSage` project, run:
```bash
pip install -r dev/rag/requirements.txt
```

*Note: The pipeline uses a local sentence-transformer model by default (`all-MiniLM-L6-v2`), so no API keys are required to run it.*

## How to Run the Demos

To see the RAG pipeline in action and how it integrates with the anomaly/RUL alerts, run the demo scripts from the **root of the MechSage project**.

### 1. C-MAPSS End-to-End Simulator
This demo simulates different degradation scenarios (like HPC degradation or Bearing wear) using real sensor data from the NASA dataset, formulates a query, and triggers the RAG retrieval.

```bash
python -m dev.rag.demo_cmapss_rag
```
*Alternatively:*
```bash
python dev/rag/demo_cmapss_rag.py
```

### 2. General AI4I Simulator
This demo runs simulated escalations for the Ironside milling machines.

```bash
python -m dev.rag.demo_ai4i_rag
```

## How to Evaluate the Pipeline
The RAG pipeline comes with a robust evaluation suite that tests for accuracy against standard queries, robustness (typos/weird phrasing), and abstention (making sure it says "I don't know" when the answer isn't in the database).

Run the evaluation script from the root directory:
```bash
python -m dev.rag.evaluate_rag
```
This will output a detailed metrics report to the terminal.
