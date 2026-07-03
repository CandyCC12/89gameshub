#!/usr/bin/env python3
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COURSE_PROD = Path(__file__).resolve().parent
DEFAULT_TABLE = COURSE_PROD / "candidate-table.json"
DEFAULT_REPORT = COURSE_PROD / "trial-report.json"

REQUIRED_EVENTS = [
    "primary_cta_click",
    "secondary_cta_click",
    "official_link_click",
    "interaction_start",
    "interaction_complete",
    "related_guide_click",
    "email_submit",
]

SPORTS_EXTRA_EVENTS = [
    "watch_finder_start",
    "watch_finder_complete",
    "streaming_platform_click",
    "schedule_source_click",
]


def slug_to_path(slug):
    return ROOT / slug.strip("/").replace("/", str(Path("/"))).lstrip("/")


def resolve_page_path(slug):
    relative = slug.strip("/")
    page_dir = ROOT / relative
    if page_dir.is_dir():
      return page_dir / "index.html"
    if page_dir.suffix:
      return page_dir
    return page_dir / "index.html"


def check_page(page_path, slug):
    text = page_path.read_text(encoding="utf-8")
    checks = {
        "page_exists": page_path.exists(),
        "has_h1": "<h1>" in text,
        "has_short_answer": "Short answer" in text,
        "has_last_checked": "Last checked:" in text,
        "has_sources_checked": "Sources checked" in text,
        "faq_count": text.count("<details data-faq-id="),
        "related_guides_count": text.count('data-event="related_guide_click"'),
        "official_links_count": len(re.findall(r'https://[^"]+', text)),
        "has_interaction_form": 'id="watchFinderForm"' in text or 'id="issueFinderForm"' in text,
    }

    required_events = list(REQUIRED_EVENTS)
    if "/guides/sports/" in slug:
        required_events.extend(SPORTS_EXTRA_EVENTS)
    checks["missing_events"] = [event for event in required_events if event not in text]
    checks["qa_pass"] = (
        checks["has_h1"]
        and checks["has_short_answer"]
        and checks["has_last_checked"]
        and checks["has_sources_checked"]
        and checks["faq_count"] >= 5
        and checks["related_guides_count"] >= 3
        and checks["has_interaction_form"]
        and not checks["missing_events"]
    )
    return checks


def check_sitemap(slug):
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    return f"https://89gameshub.com/{slug.strip('/')}/" in sitemap


def empty_page_checks():
    return {
        "page_exists": False,
        "has_h1": False,
        "has_short_answer": False,
        "has_last_checked": False,
        "has_sources_checked": False,
        "faq_count": 0,
        "related_guides_count": 0,
        "official_links_count": 0,
        "has_interaction_form": False,
        "missing_events": [],
        "qa_pass": False,
    }


def build_build_brief(data, selected):
    winner = next((candidate for candidate in data.get("candidates", []) if candidate.get("topic") == selected["topic"]), {})
    return {
        "topic": selected["topic"],
        "slug": selected["slug"],
        "page_type": selected["page_type"],
        "user_intent": winner.get("user_intent", ""),
        "monetization_path": winner.get("monetization_path", ""),
        "evidence_urls": winner.get("evidence_urls", []),
        "live_signal_titles": winner.get("live_signal_titles", []),
        "live_signal_sources": winner.get("live_signal_sources", []),
        "why_selected": selected.get("why_selected", []),
    }


def build_report(data, page_checks, sitemap_ok, status):
    selected = data["selected_topic"]
    top_candidate = data["candidates"][0] if data.get("candidates") else {}
    qa_result = "pass" if page_checks["qa_pass"] and sitemap_ok else "fail"
    if status == "pending_build":
        qa_result = "pending_build"
    return {
        "trial_date": data.get("trial_date", ""),
        "selected_topic": selected["topic"],
        "url": f"https://89gameshub.com/{selected['slug'].strip('/')}/",
        "page_type": selected["page_type"],
        "score": selected["score"],
        "selected_matches_top_candidate": selected["topic"] == top_candidate.get("topic") and selected["score"] == top_candidate.get("score"),
        "sitemap_updated": sitemap_ok,
        "qa_result": qa_result,
        "page_checks": page_checks,
        "build_brief": build_build_brief(data, selected) if status == "pending_build" else {},
        "measurement_plan": {
            "24h": [
                "confirm page loads and links still resolve",
                "confirm page is discoverable and tracking fires",
                "confirm no source correction is needed"
            ],
            "3d": [
                "check impressions and CTR",
                "check scroll depth and interaction completion",
                "check official link clicks"
            ],
            "7d": [
                "expand cluster if impressions, clicks, and interaction exist",
                "rewrite title and Short Answer if impressions exist but CTR is weak",
                "change result copy or CTA if interaction exists but outbound is weak"
            ]
        }
    }


def main():
    parser = argparse.ArgumentParser(description="Run QA/report generation for a closed-loop trial.")
    parser.add_argument("--table", default=str(DEFAULT_TABLE), help="Path to candidate-table.json")
    parser.add_argument("--report", default=str(DEFAULT_REPORT), help="Output path for trial report JSON")
    parser.add_argument("--write", action="store_true", help="Write report JSON to disk")
    args = parser.parse_args()

    table_path = Path(args.table)
    data = json.loads(table_path.read_text(encoding="utf-8"))
    selected = data.get("selected_topic")
    if not selected:
        raise SystemExit("candidate-table.json is missing selected_topic.")

    page_path = resolve_page_path(selected["slug"])
    status = "qa_checked"
    if not page_path.exists():
        page_checks = empty_page_checks()
        sitemap_ok = False
        status = "pending_build"
    else:
        page_checks = check_page(page_path, selected["slug"])
        sitemap_ok = check_sitemap(selected["slug"])

    report = build_report(data, page_checks, sitemap_ok, status)

    if args.write:
        report_path = Path(args.report)
        report_path.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(json.dumps(report, indent=2, ensure_ascii=False))
    raise SystemExit(0 if report["qa_result"] in {"pass", "pending_build"} else 1)


if __name__ == "__main__":
    main()
