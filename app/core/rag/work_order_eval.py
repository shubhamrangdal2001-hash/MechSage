"""Sprint 2 — Work-Order Usefulness Approval Rate Evaluation.

For each Ironside work order in the corpus, retrieves the relevant SOPs /
equipment profiles using the RAG pipeline, then uses Gemini Flash to score
how useful and accurate the work order is against the retrieved documentation.

Writes results to dev/rag/reports/work_order_eval_report.md.

Usage (from MechSage project root):
    python -m dev.rag.work_order_eval
"""

from __future__ import annotations

import time
from pathlib import Path

# Load .env from project root if present
try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).resolve().parents[2] / ".env"
    load_dotenv(dotenv_path=_env_path, override=False)
except ImportError:
    pass

from app.core.rag.config import RAGConfig
from app.core.rag.generator import MechSageGenerator
from app.core.rag.rag_pipeline import MechSageRAGPipeline

# Work order files live in data/ironside_rag_corpus/
_CORPUS_DIR = Path(__file__).resolve().parents[2] / "data" / "ironside_rag_corpus"
_WORK_ORDER_GLOB = "work_order_*.md"

# Usefulness threshold: work order is "approved" if score >= this value
_APPROVAL_THRESHOLD = 0.75


def load_work_orders() -> list[dict]:
    """Load all work order markdown files from the Ironside corpus."""
    orders = []
    for path in sorted(_CORPUS_DIR.glob(_WORK_ORDER_GLOB)):
        text = path.read_text(encoding="utf-8")
        # Extract asset ID from filename: work_order_ISM-HYD-002.md -> ISM-HYD-002
        asset_id = path.stem.replace("work_order_", "")
        orders.append({
            "work_order_id": asset_id,
            "file": path.name,
            "text": text,
        })
    return orders


def run_work_order_evaluation() -> None:
    """Run the work-order usefulness evaluation and write the report."""
    config = RAGConfig()

    print("[WorkOrderEval] Initializing RAG pipeline...")
    pipeline = MechSageRAGPipeline(config, rebuild_index=False)

    print("[WorkOrderEval] Initializing Gemini Flash judge...")
    gen = MechSageGenerator(model=config.gemini_model)

    work_orders = load_work_orders()
    if not work_orders:
        print(f"[WorkOrderEval] No work order files found in {_CORPUS_DIR}")
        return

    print(f"[WorkOrderEval] Evaluating {len(work_orders)} work orders...\n")

    results = []
    latencies = []

    for i, wo in enumerate(work_orders):
        wo_id = wo["work_order_id"]
        wo_text = wo["text"]

        start = time.perf_counter()

        # Build a query from the work order ID and file content (first 200 chars)
        query = f"maintenance procedure for {wo_id}"
        res = pipeline.search(
            query=query,
            asset_filter="ironside",
            top_k=3,
        )

        # Collect retrieved context
        passages = []
        if isinstance(res, dict) and "retrieved_passages" in res:
            passages = res["retrieved_passages"]

        retrieved_context = "\n\n".join(
            f"[{p.get('doc_ref', 'unknown')}]\n{p.get('text', '')}"
            for p in passages
        ) if passages else "No relevant documentation retrieved."

        # LLM usefulness judge
        result = gen.judge_work_order_usefulness(
            work_order_text=wo_text,
            retrieved_context=retrieved_context,
            work_order_id=wo_id,
        )

        latency_ms = (time.perf_counter() - start) * 1000
        latencies.append(latency_ms)
        result["latency_ms"] = f"{latency_ms:.1f}"
        result["retrieved_docs"] = [p.get("doc_ref", "?") for p in passages]
        results.append(result)

        status_str = "[PASS]" if result["pass"] else "[FAIL]"
        print(
            f"  [{i+1}/{len(work_orders)}] {wo_id} | "
            f"Score={result['score']:.4f} | {status_str}"
        )

    # Compute summary stats
    scores = [r["score"] for r in results]
    avg_score = sum(scores) / len(scores)
    n_passed = sum(1 for r in results if r["pass"])
    pass_rate = n_passed / len(results)
    avg_latency = sum(latencies) / len(latencies)

    print("\n[WorkOrderEval] Done.")
    print(f"  Average Usefulness Score: {avg_score:.4f}")
    print(f"  Approval Rate (>= {_APPROVAL_THRESHOLD}): {n_passed}/{len(results)} = {pass_rate*100:.1f}%")
    print(f"  Average Latency: {avg_latency:.1f} ms")

    # Build markdown report
    report = f"""# 🗂️ MechSage Work-Order Usefulness Evaluation Report

Generated: {time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())}

> **Approval Threshold:** Score >= {_APPROVAL_THRESHOLD}
> **Evaluation Method:** Gemini Flash LLM-as-judge rates each work order against retrieved SOPs and equipment profiles.

## Summary

| Metric | Value |
|---|---|
| **Work Orders Evaluated** | {len(results)} |
| **Approval Rate** | {n_passed}/{len(results)} = {pass_rate*100:.1f}% |
| **Average Usefulness Score** | {avg_score:.4f} |
| **Average Latency (retrieve + judge)** | {avg_latency:.1f} ms |
| **Approval Status** | {"✅ PASS — majority approved" if pass_rate >= 0.75 else "❌ FAIL — less than 75% approved"} |

---

## Per-Work-Order Results

| Work Order ID | Score | Pass | Retrieved Docs | Reasoning |
|---|---|---|---|---|
"""

    for r in results:
        docs_str = ", ".join(r["retrieved_docs"]) if r["retrieved_docs"] else "None"
        pass_icon = "✅" if r["pass"] else "❌"
        reasoning = r.get("reasoning", "").replace("|", "\\|")  # escape pipes for markdown
        report += (
            f"| **{r['work_order_id']}** | {r['score']:.4f} | {pass_icon} | "
            f"{docs_str} | {reasoning} |\n"
        )

    report += "\n---\n\n*Report generated by `dev/rag/work_order_eval.py` as part of Sprint 2.*\n"

    # Write report
    report_dir = Path(__file__).parent / "reports"
    report_dir.mkdir(parents=True, exist_ok=True)
    report_path = report_dir / "work_order_eval_report.md"
    report_path.write_text(report, encoding="utf-8")
    print(f"\n[WorkOrderEval] Report written to: {report_path.resolve()}")


if __name__ == "__main__":
    run_work_order_evaluation()
