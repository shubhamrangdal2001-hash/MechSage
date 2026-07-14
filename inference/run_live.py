"""
run_live.py
-----------
Live simulation orchestrator.  Runs four synthetic engines (FD001-FD004)
simultaneously, feeding each cycle through the dual-model pipeline and
printing a live dashboard to the console.

Usage:
    python inference/run_live.py                      # stream all 4 engines
    python inference/run_live.py --cycles 50          # stop after 50 cycles
    python inference/run_live.py --fast               # no sleep between cycles
    python inference/run_live.py --save-log           # save payloads to JSONL

Output files (when --save-log):
    inference/logs/live_inference_<timestamp>.jsonl   <- every payload per cycle
"""

from __future__ import annotations

import argparse
import json
import sys
import time
import warnings
from datetime import datetime, timezone

# Suppress benign version mismatch and feature-name warnings from joblib/sklearn/LightGBM
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", message=".*InconsistentVersionWarning.*")
from pathlib import Path

# ── Path setup ────────────────────────────────────────────────────────────────
_REPO_ROOT = Path(__file__).resolve().parent.parent
_PROJECT_ROOT = _REPO_ROOT / "NASA_CMAPSS_RUL_Project"
if str(_PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(_PROJECT_ROOT))

from inference.synthetic_generator import create_engines
from inference.feature_builder import build_builders
from inference.predictor import load_all_models, predict_cycle
from inference.agent_feed import build_payload, format_console_row, to_json

DATASETS = ("FD001", "FD002", "FD003", "FD004")


# ── Argument parsing ──────────────────────────────────────────────────────────

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="MechSage — Live simultaneous inference for FD001-FD004"
    )
    parser.add_argument(
        "--cycles", type=int, default=200,
        help="Total number of cycles to simulate (default: 200)"
    )
    parser.add_argument(
        "--max-engines-cycles", type=int, default=200,
        help="Maximum engine lifespan in cycles before failure (default: 200)"
    )
    parser.add_argument(
        "--sleep", type=float, default=0.2,
        help="Seconds to sleep between cycles for visual pacing (default: 0.2)"
    )
    parser.add_argument(
        "--fast", action="store_true",
        help="Disable sleep — run at maximum speed"
    )
    parser.add_argument(
        "--save-log", action="store_true",
        help="Save each cycle's payload to a JSONL log file"
    )
    parser.add_argument(
        "--seed", type=int, default=42,
        help="Random seed for synthetic engines (default: 42)"
    )
    return parser.parse_args()


# ── Dashboard rendering ────────────────────────────────────────────────────────

def print_header() -> None:
    print("\n" + "=" * 80)
    print("  MechSage — Simultaneous Live Inference Dashboard")
    print("  Engines: SIM-FD001 | SIM-FD002 | SIM-FD003 | SIM-FD004")
    print("  Models:  LinearRegression (RUL) | LightGBM / IsolationForest (Anomaly)")
    print("=" * 80)
    print(f"  {'Dataset':<10} {'Cycle':>5}  {'RUL':>7}  Status        "
          f"{'Anomaly Score':>13}  Anomaly Status")
    print("  " + "-" * 76)


def print_cycle_block(cycle: int, rows: list[str]) -> None:
    print(f"\n  ── Cycle {cycle} ──────────────────────────────────────────────────────────────")
    for row in rows:
        print(row)


# ── Main simulation loop ───────────────────────────────────────────────────────

def run(args: argparse.Namespace) -> None:
    # Startup
    print("\n[1/3] Initialising models...")
    models = load_all_models()
    print("      All 8 models loaded.\n")

    print("[2/3] Fitting scalers and building feature pipelines...")
    builders = build_builders(DATASETS)
    print("      All scalers fitted.\n")

    print("[3/3] Creating synthetic engines...")
    engines = create_engines(
        datasets=list(DATASETS),
        max_cycles=args.max_engines_cycles,
        seed=args.seed,
    )
    print("      4 engines ready.\n")

    # Log file setup
    log_file = None
    if args.save_log:
        log_dir = _REPO_ROOT / "inference" / "logs"
        log_dir.mkdir(parents=True, exist_ok=True)
        ts_str = datetime.now().strftime("%Y%m%d_%H%M%S")
        log_path = log_dir / f"live_inference_{ts_str}.jsonl"
        log_file = open(log_path, "w", encoding="utf-8")
        print(f"Logging payloads to: {log_path}\n")

    print_header()

    agent_trigger_count = 0

    try:
        for cycle in range(1, args.cycles + 1):
            cycle_rows = []
            all_payloads = []

            for ds in DATASETS:
                engine = engines[ds]
                builder = builders[ds]

                # Skip if engine has already failed
                if engine.is_failed:
                    cycle_rows.append(
                        f"  [{ds} | cycle={cycle:>3}]  ⬛ ENGINE FAILED — simulation ended for this unit."
                    )
                    continue

                # Generate next raw sensor row
                raw_row = engine.next_cycle()

                # Build features
                feature_row = builder.add_cycle(raw_row)

                if feature_row is None:
                    # Still warming up
                    cycle_rows.append(
                        f"  [{ds} | cycle={cycle:>3}]  ⏳ Warming up "
                        f"({builder.n_cycles}/{builder.warmup_cycles} cycles)..."
                    )
                    continue

                # Run inference
                prediction = predict_cycle(
                    dataset_id=ds,
                    feature_row=feature_row,
                    models=models,
                    cycle=cycle,
                    machine_id=f"SIM-{ds}",
                )

                # Format payload
                payload = build_payload(prediction)
                all_payloads.append(payload)

                # Console row
                cycle_rows.append(format_console_row(payload))

                if payload["trigger_agent"]:
                    agent_trigger_count += 1

                # Write to log
                if log_file:
                    log_file.write(to_json(payload, indent=None) + "\n")

            print_cycle_block(cycle, cycle_rows)

            # Pacing
            if not args.fast:
                time.sleep(args.sleep)

    except KeyboardInterrupt:
        print("\n\n  [INTERRUPTED] Simulation stopped by user.")

    finally:
        if log_file:
            log_file.close()

    # Summary
    print("\n" + "=" * 80)
    print(f"  Simulation complete.  Cycles run: {cycle}")
    print(f"  Agent triggers fired: {agent_trigger_count}")
    if args.save_log and log_file:
        print(f"  Log saved: {log_path}")
    print("=" * 80 + "\n")


# ── Entrypoint ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    run(parse_args())
