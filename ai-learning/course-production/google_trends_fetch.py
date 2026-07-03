#!/usr/bin/env python3
import argparse
import importlib.util
import json
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DEFAULT_SQL = ROOT / "google_trends_cluster_seed.sql"
DEFAULT_OUTPUT = ROOT / "google-trends-rows.json"


def read_query(sql_path):
    return Path(sql_path).read_text(encoding="utf-8")


def run_with_bigquery_client(query, project_id):
    from google.cloud import bigquery

    client = bigquery.Client(project=project_id)
    job = client.query(query)
    rows = [dict(row.items()) for row in job.result()]
    return rows


def run_with_bq_cli(query, project_id):
    command = [
        "bq",
        "query",
        "--use_legacy_sql=false",
        "--format=json",
        f"--project_id={project_id}",
        query,
    ]
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or "bq query failed")
    return json.loads(result.stdout or "[]")


def main():
    parser = argparse.ArgumentParser(description="Fetch bounded Google Trends rows from BigQuery.")
    parser.add_argument("--project-id", required=True, help="Google Cloud project id")
    parser.add_argument("--sql-file", default=str(DEFAULT_SQL), help="Path to the bounded query SQL")
    parser.add_argument("--output", default=str(DEFAULT_OUTPUT), help="Path to write JSON rows")
    args = parser.parse_args()

    query = read_query(args.sql_file)
    rows = None

    if importlib.util.find_spec("google.cloud.bigquery"):
        rows = run_with_bigquery_client(query, args.project_id)
    elif shutil.which("bq"):
        rows = run_with_bq_cli(query, args.project_id)
    else:
        raise SystemExit(
            "No BigQuery execution path found. Install google-cloud-bigquery or the bq CLI, "
            "and make sure your Google credentials are configured."
        )

    output_path = Path(args.output)
    output_path.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({
        "project_id": args.project_id,
        "row_count": len(rows),
        "output": str(output_path),
    }, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
