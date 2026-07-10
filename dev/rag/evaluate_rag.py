"""RAG Evaluation Harness for MechSage.

Loads 30-scenario golden test set (retrieve path) and out-of-corpus queries (abstain path),
runs the RAG pipeline, computes retrieval metrics (Hit Rate@1/3, Precision@1/3, Recall@1/3,
NDCG@1/3, MRR, Context Precision, Context Recall), verifies the guardrail threshold
(NO_RELEVANT_PASSAGE under 0.40 similarity), and outputs a markdown report.

RAGAS-style metrics computed without an LLM judge (retrieval-only evaluation):
  - Context Precision  = fraction of retrieved passages that are relevant
                         (1.0 if the expected doc is in top-k, weighted by position)
  - Context Recall     = fraction of relevant docs successfully retrieved
                         (1.0 if the expected doc is anywhere in retrieved results)

Note: Faithfulness and Answer Relevancy require a generated answer from an LLM and
are tracked separately in the evaluation plan (Sprint 2).
"""

from __future__ import annotations

import json
import math
import time
from pathlib import Path

import numpy as np

from dev.rag.config import RAGConfig
from dev.rag.rag_pipeline import MechSageRAGPipeline


def calculate_ndcg(rank: int, k: int) -> float:
    """Calculate Normalized Discounted Cumulative Gain (NDCG) for single relevant document.
    
    NDCG = DCG / iDCG. For a single relevant document:
    - DCG = 1 / log2(rank + 1) if rank <= k else 0
    - iDCG = 1 / log2(1 + 1) = 1.0 (since the ideal retrieval puts it at rank 1)
    """
    if rank == 0 or rank > k:
        return 0.0
    dcg = 1.0 / math.log2(rank + 1)
    idcg = 1.0 / math.log2(2)  # For single relevant doc, ideal is rank 1
    return dcg / idcg


def average_precision_at_k(rank: int, k: int) -> float:
    """Calculate Average Precision @ k for a single relevant document."""
    if rank == 0 or rank > k:
        return 0.0
    return 1.0 / rank


def context_precision_at_k(rank: int, k: int) -> float:
    """RAGAS-style Context Precision @ k.

    Measures the proportion of retrieved chunks that are relevant, weighted by position.
    For a single expected doc: 1/rank if rank <= k, else 0.
    This is identical to Precision@k for single-relevant-doc queries.
    """
    if rank == 0 or rank > k:
        return 0.0
    return 1.0 / rank  # precision at the rank position


def context_recall_at_k(rank: int, k: int) -> float:
    """RAGAS-style Context Recall @ k.

    Measures whether all necessary context was retrieved.
    For single-expected-doc: 1.0 if found anywhere in top-k, else 0.0.
    """
    return 1.0 if (0 < rank <= k) else 0.0


def check_retriever_success(retriever_results: list[dict], expected_id: str) -> bool:
    """Check if the expected document is present in the retriever results."""
    for res in retriever_results:
        meta = res.get("metadata", {})
        if meta.get("entry_id") == expected_id:
            return True
    return False


def run_evaluation() -> None:
    """Load test scenarios, execute searches, calculate metrics, and save report."""
    config = RAGConfig()

    # Initialize pipeline (forcing index rebuild to verify full clean setup)
    print("[Eval] Initializing RAG Pipeline and rebuilding index...")
    pipeline = MechSageRAGPipeline(config, rebuild_index=True)

    # Set min_relevance_score to 0.0 temporarily to collect raw scores for threshold sweep
    actual_threshold = config.min_relevance_score
    pipeline.config.min_relevance_score = 0.0

    # Paths via config (consistent, not hardcoded)
    test_queries_path = config.test_queries_path
    abstain_queries_path = config.abstain_queries_path
    robustness_queries_path = config.robustness_queries_path

    # Load test queries
    with open(test_queries_path, "r", encoding="utf-8") as f:
        test_cases = json.load(f)
    # Load abstain queries
    with open(abstain_queries_path, "r", encoding="utf-8") as f:
        abstain_cases = json.load(f)
    # Load robustness queries
    with open(robustness_queries_path, "r", encoding="utf-8") as f:
        robustness_cases = json.load(f)

    print(f"[Eval] Loaded {len(test_cases)} retrieve scenarios, {len(abstain_cases)} abstain scenarios, and {len(robustness_cases)} robustness scenarios.")

    # --- Part 1: Retrieve Path Evaluation ---
    results = []
    hit_at_1 = 0
    hit_at_3 = 0
    precision_1_sum = 0.0
    precision_3_sum = 0.0
    recall_1_sum = 0.0
    recall_3_sum = 0.0
    ndcg_1_sum = 0.0
    ndcg_3_sum = 0.0
    f1_1_sum = 0.0
    f1_3_sum = 0.0
    mrr_sum = 0.0
    ap_3_sum = 0.0  # MAP@3
    ctx_precision_3_sum = 0.0  # RAGAS Context Precision @ 3
    ctx_recall_3_sum = 0.0     # RAGAS Context Recall @ 3
    latencies = []
    scores = []
    raw_results_info = []  # For threshold sensitivity analysis

    # Dense vs Sparse analysis
    dense_hits = 0
    sparse_hits = 0
    both_hits = 0
    dense_only_hits = 0
    sparse_only_hits = 0

    for case in test_cases:
        cid = case["id"]
        query = case["query"]
        sensors = case.get("degrading_sensors", [])
        hypothesis = case.get("fault_hypothesis", "")
        expected = case["expected_id"]

        # Run query through RAG pipeline (raw, no thresholding)
        start = time.perf_counter()
        res = pipeline.search(
            query=query,
            degrading_sensors=sensors,
            fault_hypothesis=hypothesis,
            top_k=3
        )
        latency = (time.perf_counter() - start) * 1000

        # Dense vs Sparse Retrieval contribution check
        search_terms = []
        if query:
            search_terms.append(query)
        if hypothesis:
            search_terms.append(hypothesis)
        if sensors:
            search_terms.extend(sensors)
        combined_query = " ".join(search_terms) if search_terms else query

        dense_res = pipeline.retriever.retrieve_dense(combined_query, top_k=3)
        sparse_res = pipeline.retriever.retrieve_sparse(combined_query, top_k=3)
        
        has_dense = check_retriever_success(dense_res, expected)
        has_sparse = check_retriever_success(sparse_res, expected)

        if has_dense:
            dense_hits += 1
        if has_sparse:
            sparse_hits += 1
        if has_dense and has_sparse:
            both_hits += 1
        elif has_dense:
            dense_only_hits += 1
        elif has_sparse:
            sparse_only_hits += 1

        # Evaluate results
        raw_rank = 0
        top_score = 0.0
        matched_id = None

        if isinstance(res, dict) and "retrieved_passages" in res:
            passages = res["retrieved_passages"]
            if passages:
                top_score = passages[0]["relevance_score"]
                scores.append(top_score)

            # Check ranks in raw results
            for idx, passage in enumerate(passages):
                doc_ref = passage["doc_ref"]
                if doc_ref == expected:
                    raw_rank = idx + 1
                    break

            matched_id = passages[0]["doc_ref"] if passages else None

        raw_results_info.append({
            "top_score": top_score,
            "raw_rank": raw_rank
        })

        # Apply actual threshold
        if top_score >= actual_threshold:
            rank = raw_rank
            success = (rank > 0)
        else:
            rank = 0
            success = False

        mrr = 1.0 / rank if success else 0.0

        latencies.append(latency)
        mrr_sum += mrr

        # Standard retrieval metrics
        p_1 = 1.0 if rank == 1 else 0.0
        r_1 = 1.0 if rank == 1 else 0.0
        ndcg_1 = calculate_ndcg(rank, 1)
        f1_1 = 2 * (p_1 * r_1) / (p_1 + r_1) if (p_1 + r_1) > 0 else 0.0

        p_3 = 1.0 / 3.0 if (0 < rank <= 3) else 0.0
        r_3 = 1.0 if (0 < rank <= 3) else 0.0
        ndcg_3 = calculate_ndcg(rank, 3)
        f1_3 = 2 * (p_3 * r_3) / (p_3 + r_3) if (p_3 + r_3) > 0 else 0.0

        # MAP@3
        ap_3 = average_precision_at_k(rank, 3)
        ap_3_sum += ap_3

        # RAGAS-style Context Precision & Recall @ 3
        ctx_prec_3 = context_precision_at_k(rank, 3)
        ctx_rec_3 = context_recall_at_k(rank, 3)

        precision_1_sum += p_1
        precision_3_sum += p_3
        recall_1_sum += r_1
        recall_3_sum += r_3
        ndcg_1_sum += ndcg_1
        ndcg_3_sum += ndcg_3
        f1_1_sum += f1_1
        f1_3_sum += f1_3
        ctx_precision_3_sum += ctx_prec_3
        ctx_recall_3_sum += ctx_rec_3

        if success:
            hit_at_3 += 1
            if rank == 1:
                hit_at_1 += 1

        results.append({
            "id": cid,
            "query": query,
            "expected": expected,
            "matched": matched_id if success else None,
            "rank": rank if success else "Not found",
            "score": f"{top_score:.4f}" if top_score > 0 else "0.0000",
            "latency_ms": f"{latency:.1f}",
            "status": "PASS" if success else "FAIL",
            "ndcg_3": ndcg_3,
            "p_3": p_3,
            "ctx_prec_3": ctx_prec_3,
            "ctx_rec_3": ctx_rec_3,
        })

    n = len(test_cases)
    avg_hit_at_1 = hit_at_1 / n
    avg_hit_at_3 = hit_at_3 / n
    avg_mrr = mrr_sum / n
    avg_map_3 = ap_3_sum / n
    avg_latency = sum(latencies) / n
    avg_score = sum(scores) / len(scores) if scores else 0.0

    p50_latency = np.percentile(latencies, 50)
    p95_latency = np.percentile(latencies, 95)
    p99_latency = np.percentile(latencies, 99)

    avg_p1 = precision_1_sum / n
    avg_p3 = precision_3_sum / n
    avg_r1 = recall_1_sum / n
    avg_r3 = recall_3_sum / n
    avg_ndcg1 = ndcg_1_sum / n
    avg_ndcg3 = ndcg_3_sum / n
    avg_f1_1 = f1_1_sum / n
    avg_f1_3 = f1_3_sum / n
    avg_ctx_precision_3 = ctx_precision_3_sum / n
    avg_ctx_recall_3 = ctx_recall_3_sum / n

    # Score distribution stats
    min_score = min(scores) if scores else 0.0
    max_score = max(scores) if scores else 0.0
    std_score = np.std(scores) if scores else 0.0
    # Counts how many queries score close to the threshold (threshold to threshold + 0.05)
    near_threshold_passes = sum(1 for s in scores if actual_threshold <= s < actual_threshold + 0.05)

    # --- Part 2: Abstain Path Evaluation ---
    print(f"[Eval] Running {len(abstain_cases)} out-of-corpus queries through the pipeline...")
    abstain_results = []
    correct_abstains = 0
    near_miss_passes = 0
    abstain_latencies = []
    abstain_raw_scores = []

    for case in abstain_cases:
        cid = case["id"]
        query = case["query"]
        sensors = case.get("degrading_sensors", [])
        hypothesis = case.get("fault_hypothesis", "")
        is_near_miss = bool(case.get("note", ""))

        start = time.perf_counter()
        res = pipeline.search(
            query=query,
            degrading_sensors=sensors,
            fault_hypothesis=hypothesis,
            top_k=3
        )
        latency = (time.perf_counter() - start) * 1000
        abstain_latencies.append(latency)

        highest_score = 0.0
        if isinstance(res, dict) and "retrieved_passages" in res:
            passages = res["retrieved_passages"]
            if passages:
                highest_score = passages[0]["relevance_score"]

        abstain_raw_scores.append(highest_score)

        # Verify if guardrail caught it correctly under actual threshold
        abstained_correctly = (highest_score < actual_threshold)

        if abstained_correctly:
            correct_abstains += 1
            if is_near_miss:
                near_miss_passes += 1
            error_msg = "NO_RELEVANT_PASSAGE"
        else:
            error_msg = f"LEAKED (Score: {highest_score:.4f})"

        category = "Near-miss" if is_near_miss else "Off-domain"
        abstain_results.append({
            "id": cid,
            "query": query,
            "category": category,
            "highest_score": f"{highest_score:.4f}",
            "latency_ms": f"{latency:.1f}",
            "outcome": error_msg,
            "status": "PASS" if abstained_correctly else "FAIL"
        })

    total_abstain = len(abstain_cases)
    near_miss_total = sum(1 for c in abstain_cases if c.get("note", ""))
    off_domain_total = total_abstain - near_miss_total

    avg_abstain_success = correct_abstains / total_abstain
    avg_abstain_latency = sum(abstain_latencies) / len(abstain_latencies)
    abstain_p50 = np.percentile(abstain_latencies, 50)
    abstain_p95 = np.percentile(abstain_latencies, 95)
    abstain_p99 = np.percentile(abstain_latencies, 99)

    # --- Part 3: Robustness Path Evaluation ---
    print(f"[Eval] Running {len(robustness_cases)} robustness/adversarial queries through the pipeline...")
    robustness_results = []
    rob_hit_at_1 = 0
    rob_hit_at_3 = 0
    rob_mrr_sum = 0.0
    rob_ap_3_sum = 0.0
    rob_latencies = []
    rob_scores = []
    rob_results_info = []

    for case in robustness_cases:
        cid = case["id"]
        query = case["query"]
        sensors = case.get("degrading_sensors", [])
        hypothesis = case.get("fault_hypothesis", "")
        expected = case["expected_id"]
        category = case["category"]

        start = time.perf_counter()
        res = pipeline.search(
            query=query,
            degrading_sensors=sensors,
            fault_hypothesis=hypothesis,
            top_k=3
        )
        latency = (time.perf_counter() - start) * 1000
        rob_latencies.append(latency)

        raw_rank = 0
        top_score = 0.0
        matched_id = None

        if isinstance(res, dict) and "retrieved_passages" in res:
            passages = res["retrieved_passages"]
            if passages:
                top_score = passages[0]["relevance_score"]
                rob_scores.append(top_score)

            for idx, passage in enumerate(passages):
                doc_ref = passage["doc_ref"]
                if doc_ref == expected:
                    raw_rank = idx + 1
                    break

            matched_id = passages[0]["doc_ref"] if passages else None

        rob_results_info.append({
            "top_score": top_score,
            "raw_rank": raw_rank
        })

        if top_score >= actual_threshold:
            rank = raw_rank
            success = (rank > 0)
        else:
            rank = 0
            success = False

        mrr = 1.0 / rank if success else 0.0
        rob_mrr_sum += mrr

        if success:
            rob_hit_at_3 += 1
            if rank == 1:
                rob_hit_at_1 += 1

        ap_3 = average_precision_at_k(rank, 3)
        rob_ap_3_sum += ap_3

        robustness_results.append({
            "id": cid,
            "query": query,
            "category": category,
            "expected": expected,
            "matched": matched_id if success else None,
            "rank": rank if success else "Not found",
            "score": f"{top_score:.4f}" if top_score > 0 else "0.0000",
            "latency_ms": f"{latency:.1f}",
            "status": "PASS" if success else "FAIL"
        })

    rob_n = len(robustness_cases)
    avg_rob_hit_at_1 = rob_hit_at_1 / rob_n
    avg_rob_hit_at_3 = rob_hit_at_3 / rob_n
    avg_rob_mrr = rob_mrr_sum / rob_n
    avg_rob_map_3 = rob_ap_3_sum / rob_n
    avg_rob_latency = sum(rob_latencies) / rob_n
    rob_p50 = np.percentile(rob_latencies, 50)
    rob_p95 = np.percentile(rob_latencies, 95)
    rob_p99 = np.percentile(rob_latencies, 99)

    # --- Part 4: Threshold Sensitivity Sweep ---
    thresholds_to_sweep = [0.30, 0.35, 0.38, 0.40, 0.42, 0.45, 0.48, 0.50]
    sensitivity_data = []

    for t in thresholds_to_sweep:
        # 1. Retrieval success: expected doc is in top-3 and top_score >= t
        ret_successes = 0
        for info in raw_results_info:
            if info["top_score"] >= t and info["raw_rank"] > 0:
                ret_successes += 1
        ret_rate = ret_successes / n

        # 2. Guardrail success: abstain queries score < t
        guard_successes = 0
        for score in abstain_raw_scores:
            if score < t:
                guard_successes += 1
        guard_rate = guard_successes / total_abstain

        # 3. Robustness success
        rob_successes = 0
        for info in rob_results_info:
            if info["top_score"] >= t and info["raw_rank"] > 0:
                rob_successes += 1
        rob_rate = rob_successes / rob_n

        # Harmonic Mean of ret_rate and guard_rate
        if ret_rate + guard_rate > 0:
            h_mean = 2 * (ret_rate * guard_rate) / (ret_rate + guard_rate)
        else:
            h_mean = 0.0

        sensitivity_data.append({
            "threshold": t,
            "retrieval_success": ret_rate,
            "guardrail_success": guard_rate,
            "robustness_success": rob_rate,
            "harmonic_mean": h_mean
        })

    # Restore pipeline config just in case
    pipeline.config.min_relevance_score = actual_threshold

    # Print Console Summary
    print("\n" + "="*60)
    print("          RAG EVALUATION METRICS SUMMARY")
    print("="*60)
    print(f"Hit Rate @ 1 (Recall@1):       {avg_hit_at_1 * 100:.1f}%  (Target: >80%)")
    print(f"Hit Rate @ 3 (Recall@3):       {avg_hit_at_3 * 100:.1f}%  (Target: >90%)")
    print(f"Mean Reciprocal Rank (MRR):    {avg_mrr:.4f}  (Target: >0.85)")
    print(f"Mean Average Precision (MAP@3): {avg_map_3:.4f}")
    print(f"Average Relevance Score:       {avg_score:.4f}  (Target: >0.50)")
    print(f"  Score Std Dev:               {std_score:.4f}")
    print(f"  Near-Threshold Passes:       {near_threshold_passes}/{n}")
    print(f"Retrieve Latency P50 / P95 / P99: {p50_latency:.1f} / {p95_latency:.1f} / {p99_latency:.1f} ms")
    print("-"*60)
    print(f"RAGAS Context Precision @ 3:   {avg_ctx_precision_3:.4f}  (Target: >0.80)")
    print(f"RAGAS Context Recall @ 3:      {avg_ctx_recall_3:.4f}  (Target: >0.80)")
    print("-"*60)
    print(f"Abstain Guardrail Success:     {avg_abstain_success * 100:.1f}%  (Target: 100%)")
    print(f"Abstain Latency P50 / P95 / P99: {abstain_p50:.1f} / {abstain_p95:.1f} / {abstain_p99:.1f} ms")
    print("-"*60)
    print(f"Robustness Hit Rate @ 3:       {avg_rob_hit_at_3 * 100:.1f}%")
    print(f"Robustness MAP@3:              {avg_rob_map_3:.4f}")
    print(f"Robustness Latency P95:        {rob_p95:.1f} ms")
    print("="*60)

    # Generate Markdown Report
    report_content = f"""# 📊 MechSage RAG Evaluation Report

Generated: {time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())}

## Summary Metrics

### 1. Retrieval Path Metrics ({n} Paraphrased Queries)
| Metric | Target | Actual | Status |
|---|---|---|---|
| **Hit Rate @ 1 (Recall@1)** | > 80.0% | {avg_hit_at_1 * 100:.1f}% | {'✅ PASS' if avg_hit_at_1 >= 0.8 else '❌ FAIL'} |
| **Hit Rate @ 3 (Recall@3)** | > 90.0% | {avg_hit_at_3 * 100:.1f}% | {'✅ PASS' if avg_hit_at_3 >= 0.9 else '❌ FAIL'} |
| **Precision @ 1** | > 80.0% | {avg_p1 * 100:.1f}% | {'✅ PASS' if avg_p1 >= 0.8 else '❌ FAIL'} |
| **Precision @ 3** | > 30.0% | {avg_p3 * 100:.1f}% | {'✅ PASS' if avg_p3 >= 0.3 else '❌ FAIL'} |
| **F1-Score @ 1** | > 80.0% | {avg_f1_1 * 100:.1f}% | {'✅ PASS' if avg_f1_1 >= 0.8 else '❌ FAIL'} |
| **F1-Score @ 3** | > 45.0% | {avg_f1_3 * 100:.1f}% | {'✅ PASS' if avg_f1_3 >= 0.45 else '❌ FAIL'} |
| **NDCG @ 1** | > 0.8000 | {avg_ndcg1:.4f} | {'✅ PASS' if avg_ndcg1 >= 0.8 else '❌ FAIL'} |
| **NDCG @ 3** | > 0.8500 | {avg_ndcg3:.4f} | {'✅ PASS' if avg_ndcg3 >= 0.85 else '❌ FAIL'} |
| **Mean Reciprocal Rank (MRR)** | > 0.8500 | {avg_mrr:.4f} | {'✅ PASS' if avg_mrr >= 0.85 else '❌ FAIL'} |
| **Mean Average Precision (MAP@3)** | N/A | {avg_map_3:.4f} | ✅ DETECTED |
| **Average Relevance Score** | > 0.5000 | {avg_score:.4f} | {'✅ PASS' if avg_score >= 0.5 else '❌ FAIL'} |
| **Retrieve Latency (Avg)** | < 2000 ms | {avg_latency:.1f} ms | {'✅ PASS' if avg_latency < 2000 else '❌ FAIL'} |
| **Retrieve Latency P50 / P95 / P99** | N/A | {p50_latency:.1f} / {p95_latency:.1f} / {p99_latency:.1f} ms | ✅ MEASURED |

### 2. RAGAS-Style Context Quality Metrics
> Context Precision and Recall are computed from retrieval results only (no LLM judge required).
> Faithfulness and Answer Relevancy require a generation step and are deferred to Sprint 2.

| Metric | Target | Actual | Status |
|---|---|---|---|
| **RAGAS Context Precision @ 3** | > 0.80 | {avg_ctx_precision_3:.4f} | {'✅ PASS' if avg_ctx_precision_3 >= 0.80 else '❌ FAIL'} |
| **RAGAS Context Recall @ 3** | > 0.80 | {avg_ctx_recall_3:.4f} | {'✅ PASS' if avg_ctx_recall_3 >= 0.80 else '❌ FAIL'} |
| **RAGAS Faithfulness** | > 0.90 | N/A (Sprint 2) | ⏳ PENDING |
| **RAGAS Answer Relevancy** | > 0.85 | N/A (Sprint 2) | ⏳ PENDING |

### 3. Abstain Guardrail Path Metrics ({total_abstain} Queries: {off_domain_total} off-domain + {near_miss_total} near-miss)
| Metric | Target | Actual | Status |
|---|---|---|---|
| **Guardrail Success Rate (overall)** | 100.0% | {avg_abstain_success * 100:.1f}% | {'✅ PASS' if avg_abstain_success == 1.0 else '❌ FAIL'} |
| **Off-domain Abstain Rate** | 100.0% | {(correct_abstains - near_miss_passes)/off_domain_total * 100:.1f}% | {'✅ PASS' if (correct_abstains - near_miss_passes) == off_domain_total else '❌ FAIL'} |
| **Near-miss Abstain Rate** | 100.0% | {near_miss_passes/near_miss_total * 100:.1f}% | {'✅ PASS' if near_miss_passes == near_miss_total else '❌ FAIL'} |
| **Average Abstain Latency** | < 2000 ms | {avg_abstain_latency:.1f} ms | {'✅ PASS' if avg_abstain_latency < 2000 else '❌ FAIL'} |
| **Abstain Latency P50 / P95 / P99** | N/A | {abstain_p50:.1f} / {abstain_p95:.1f} / {abstain_p99:.1f} ms | ✅ MEASURED |

---

## 📈 Score Distribution & Threshold Sensitivity

### 1. Relevance Score Statistics
- **Minimum Score:** `{min_score:.4f}`
- **Maximum Score:** `{max_score:.4f}`
- **Standard Deviation:** `{std_score:.4f}`
- **Near-Threshold Passes (within 0.05 of threshold):** `{near_threshold_passes}/{n}` queries (fragile queries that may fail if the database or model changes).

### 2. Threshold Sweep Analysis
The table below shows the trade-off between retrieval success rate, guardrail success rate, and robustness query success rate across different similarity threshold values.

| Threshold | Retrieval Success (Hit@3) | Guardrail Success (Abstain Rate) | Robustness Success (Hit@3) | Harmonic Mean (Balance) |
|:---:|:---:|:---:|:---:|:---:|
"""

    for item in sensitivity_data:
        is_opt = " ⭐ OPTIMAL" if abs(item["threshold"] - 0.42) < 0.005 else ""
        report_content += (
            f"| {item['threshold']:.2f}{is_opt} | {item['retrieval_success']*100:.1f}% | "
            f"{item['guardrail_success']*100:.1f}% | {item['robustness_success']*100:.1f}% | "
            f"{item['harmonic_mean']:.4f} |\n"
        )

    report_content += f"""
---

## 🔍 Hybrid Retrieval Analysis (Dense vs Sparse)

This section evaluates the unique value added by combining semantic Vector search (Dense) and keyword BM25 search (Sparse) under a top-3 retrieval scenario.

- **Dense Retriever Success Rate:** {dense_hits / n * 100:.1f}% ({dense_hits}/{n} queries found expected document in top-3)
- **Sparse Retriever Success Rate:** {sparse_hits / n * 100:.1f}% ({sparse_hits}/{n} queries found expected document in top-3)
- **Retrieve Path Coverage (Both):** {both_hits / n * 100:.1f}% ({both_hits}/{n} queries found in both retrievers)
- **Unique Dense Hits:** {dense_only_hits / n * 100:.1f}% ({dense_only_hits}/{n} queries found *only* by vector search)
- **Unique Sparse Hits:** {sparse_only_hits / n * 100:.1f}% ({sparse_only_hits}/{n} queries found *only* by BM25 search)

---

## 🛡️ Robustness Path Evaluation ({rob_n} Variant Queries)

Robustness is assessed using spelling errors, abbreviations, and verbose inputs mapping to the golden set.

| Robustness Metric | Target | Actual | Status |
|---|---|---|---|
| **Robustness Hit Rate @ 3** | > 85.0% | {avg_rob_hit_at_3 * 100:.1f}% | {'✅ PASS' if avg_rob_hit_at_3 >= 0.85 else '❌ FAIL'} |
| **Robustness MAP@3** | > 0.8000 | {avg_rob_map_3:.4f} | {'✅ PASS' if avg_rob_map_3 >= 0.8 else '❌ FAIL'} |
| **Robustness MRR** | > 0.8000 | {avg_rob_mrr:.4f} | {'✅ PASS' if avg_rob_mrr >= 0.8 else '❌ FAIL'} |
| **Robustness Latency P95** | < 2000 ms | {rob_p95:.1f} ms | {'✅ PASS' if rob_p95 < 2000 else '❌ FAIL'} |

### Robustness Results by Category
- **Typo Variants Success Rate:** {sum(1 for r in robustness_results if r["category"] == "Typo" and r["status"] == "PASS") / sum(1 for r in robustness_results if r["category"] == "Typo") * 100:.1f}%
- **Abbreviation Variants Success Rate:** {sum(1 for r in robustness_results if r["category"] == "Abbreviation" and r["status"] == "PASS") / sum(1 for r in robustness_results if r["category"] == "Abbreviation") * 100:.1f}%
- **Verbose Variants Success Rate:** {sum(1 for r in robustness_results if r["category"] == "Verbose" and r["status"] == "PASS") / sum(1 for r in robustness_results if r["category"] == "Verbose") * 100:.1f}%

---

## Detailed Scenario Results (Retrieve Path)

| Scenario ID | Query | Expected ID | Top Match | Rank | NDCG@3 | Ctx Precision@3 | Ctx Recall@3 | Latency | Status |
|---|---|---|---|:---:|:---:|:---:|:---:|---|---|
"""

    for r in results:
        matched_str = f"`{r['matched']}`" if r['matched'] else "None"
        report_content += (
            f"| {r['id']} | {r['query']} | `{r['expected']}` | {matched_str} | {r['rank']} | "
            f"{r['ndcg_3']:.4f} | {r['ctx_prec_3']:.4f} | {r['ctx_rec_3']:.4f} | "
            f"{r['latency_ms']} ms | {'🟢 PASS' if r['status'] == 'PASS' else '🔴 FAIL'} |\n"
        )

    report_content += """
## Detailed Guardrail Results (Abstain Path)

| Scenario ID | Query | Category | Max Similarity Score | Latency | Outcome / Code | Status |
|---|---|---|:---:|---|---|---|
"""

    for r in abstain_results:
        report_content += (
            f"| {r['id']} | {r['query']} | {r['category']} | "
            f"{r['highest_score']} | {r['latency_ms']} ms | `{r['outcome']}` | "
            f"{'🟢 PASS' if r['status'] == 'PASS' else '🔴 FAIL'} |\n"
        )

    report_content += """
## Detailed Robustness Results

| Scenario ID | Category | Query | Expected ID | Match | Rank | Score | Latency | Status |
|---|---|---|---|---|---|---|---|---|
"""

    for r in robustness_results:
        matched_str = f"`{r['matched']}`" if r['matched'] else "None"
        report_content += (
            f"| {r['id']} | {r['category']} | {r['query']} | `{r['expected']}` | {matched_str} | "
            f"{r['rank']} | {r['score']} | {r['latency_ms']} ms | {'🟢 PASS' if r['status'] == 'PASS' else '🔴 FAIL'} |\n"
        )

    report_content += """
---

## Known Gaps (Sprint 2 Backlog)

| Gap | Owner | Sprint |
|---|---|---|
| RAGAS Faithfulness — requires LLM-generated answers | RAG team | Sprint 2 |
| RAGAS Answer Relevancy — requires LLM-generated answers | RAG team | Sprint 2 |
| LLM-as-judge explanation quality rubric (§3.4) | Evaluation team | Sprint 2 |
| Work-order usefulness approval rate measurement | Agent team | Sprint 2 |
| Early-detection lead time backtest on C-MAPSS FD001 | ML team | Sprint 2 |
"""

    # Write report file
    report_dir = Path(__file__).parent / "reports"
    report_dir.mkdir(parents=True, exist_ok=True)
    report_file_path = report_dir / "rag_evaluation_report.md"

    with open(report_file_path, "w", encoding="utf-8") as rf:
        rf.write(report_content)

    print(f"\n[Eval] Detailed evaluation report written to: {report_file_path.resolve()}")


if __name__ == "__main__":
    run_evaluation()
