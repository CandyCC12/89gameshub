#!/usr/bin/env python3
import argparse
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
COLLECTOR = ROOT / "trend_collector.py"
GOOGLE_TRENDS_BUILDER = ROOT / "google_trends_candidate_builder.py"
SCORER = ROOT / "score_candidate_table.py"
RUNNER = ROOT / "run_closed_loop_trial.py"
BUILDER = ROOT / "build_selected_topic.py"
DEFAULT_TABLE = ROOT / "candidate-table.json"
DEFAULT_REPORT = ROOT / "trial-report.json"


def run_step(label, command, allowed_failure_substrings=None):
    print(f"\n== {label} ==")
    result = subprocess.run(command, capture_output=True, text=True)
    if result.stdout:
        print(result.stdout.strip())
    if result.stderr:
        print(result.stderr.strip(), file=sys.stderr)
    if result.returncode != 0 and allowed_failure_substrings:
        combined = "\n".join(part for part in [result.stdout, result.stderr] if part)
        if any(token in combined for token in allowed_failure_substrings):
            return result
    if result.returncode != 0:
        raise SystemExit(result.returncode)
    return result


def main():
    parser = argparse.ArgumentParser(description="Run the minimal closed-loop trial orchestration.")
    parser.add_argument("--trial-date", default=None, help="Override trial date passed to the collector")
    parser.add_argument("--seed-only", action="store_true", help="Run collector in seed-only mode")
    parser.add_argument("--signals-file", help="Optional JSON file with pre-fetched live signals")
    parser.add_argument("--bigquery-results-file", help="Optional JSON rows exported from the Google Trends BigQuery query")
    args = parser.parse_args()

    if args.bigquery_results_file:
        collect_cmd = [
            "python3",
            str(GOOGLE_TRENDS_BUILDER),
            "--input",
            args.bigquery_results_file,
            "--output",
            str(DEFAULT_TABLE),
        ]
        if args.trial_date:
            collect_cmd.extend(["--trial-date", args.trial_date])
    else:
        collect_cmd = ["python3", str(COLLECTOR), "--output", str(DEFAULT_TABLE)]
        if args.trial_date:
            collect_cmd.extend(["--trial-date", args.trial_date])
        if args.seed_only:
            collect_cmd.append("--seed-only")
        if args.signals_file:
            collect_cmd.extend(["--signals-file", args.signals_file])

    score_cmd = ["python3", str(SCORER), "--table", str(DEFAULT_TABLE), "--write"]
    build_cmd = ["python3", str(BUILDER), "--table", str(DEFAULT_TABLE)]
    run_cmd = ["python3", str(RUNNER), "--table", str(DEFAULT_TABLE), "--report", str(DEFAULT_REPORT), "--write"]

    run_step("collect", collect_cmd)
    run_step("score", score_cmd)
    run_step("build", build_cmd, allowed_failure_substrings=["Unsupported selected topic for builder"])
    run_step("qa", run_cmd)

    report = json.loads(DEFAULT_REPORT.read_text(encoding="utf-8"))
    summary = {
        "selected_topic": report["selected_topic"],
        "url": report["url"],
        "score": report["score"],
        "qa_result": report["qa_result"],
        "sitemap_updated": report["sitemap_updated"],
        "selected_matches_top_candidate": report.get("selected_matches_top_candidate", False),
    }
    print("\n== summary ==")
    print(json.dumps(summary, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
