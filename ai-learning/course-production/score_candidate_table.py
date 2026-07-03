#!/usr/bin/env python3
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DEFAULT_TABLE = ROOT / "candidate-table.json"

WEIGHTS = {
    "trend_strength": 25,
    "intent_clarity": 20,
    "commercial_value": 20,
    "page_reusability": 15,
    "geo_citation_fit": 10,
    "risk_safety": 10,
}


def compute_score(candidate):
    total = 0.0
    for key, weight in WEIGHTS.items():
        total += weight * float(candidate.get(key, 0))
    if candidate.get("build_support") not in {None, "", "ready_now"}:
        total -= 18
    return round(total, 2)


def action_for_score(score):
    if score >= 80:
        return "build"
    if score >= 65:
        return "watch"
    return "skip"


def build_selection(candidates, existing_selected=None):
    top = candidates[0]
    alternatives = [c["topic"] for c in candidates[1:3]]
    slug = top.get("slug")
    if not slug and existing_selected and existing_selected.get("topic") == top["topic"]:
        slug = existing_selected.get("slug")
    if not slug:
        slug = suggested_slug(top)
    return {
        "topic": top["topic"],
        "slug": slug,
        "page_type": top["page_type"],
        "score": top["score"],
        "why_selected": [
            f"Top scored candidate in this run at {top['score']}.",
            f"Intent: {top['user_intent']}.",
            f"Commercial path: {top['monetization_path']}.",
            f"Risk level: {top['risk']}."
        ],
        "why_not_top_alternatives": [
            f"{name} ranked below the winner in this run."
            for name in alternatives
        ],
    }


def suggested_slug(candidate):
    topic = candidate["topic"].lower()
    slug = "".join(ch if ch.isalnum() else "-" for ch in topic)
    slug = "-".join(part for part in slug.split("-") if part)
    page_type = candidate["page_type"]
    if "app" in page_type or "payment" in page_type or "regional_app" in page_type:
        return f"/guides/apps/{slug}/"
    return f"/guides/sports/{slug}/"


def main():
    parser = argparse.ArgumentParser(description="Score and rank closed-loop trial candidates.")
    parser.add_argument("--table", default=str(DEFAULT_TABLE), help="Path to candidate-table.json")
    parser.add_argument("--write", action="store_true", help="Write recomputed scores and selected topic back to the table")
    args = parser.parse_args()

    table_path = Path(args.table)
    data = json.loads(table_path.read_text(encoding="utf-8"))
    candidates = data.get("candidates", [])
    if not candidates:
        raise SystemExit("No candidates found in candidate table.")

    for candidate in candidates:
        candidate["score"] = compute_score(candidate)
        current_action = candidate.get("action", "")
        suggested = action_for_score(candidate["score"])
        if candidate.get("build_support") not in {None, "", "ready_now"} and current_action == "build_secondary":
            current_action = "watch_high"
        if current_action not in {"build_secondary", "watch_high", "skip_for_now"}:
            candidate["action"] = suggested
        elif current_action == "watch_high":
            candidate["action"] = "watch"
        else:
            candidate["action"] = current_action

    ranked = sorted(candidates, key=lambda item: item["score"], reverse=True)

    if args.write:
        data["candidates"] = ranked
        data["selected_topic"] = build_selection(ranked, data.get("selected_topic"))
        table_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print("Closed-loop candidate ranking")
    print("============================")
    for idx, candidate in enumerate(ranked, start=1):
        print(f"{idx:>2}. {candidate['topic']} | score={candidate['score']:.2f} | action={candidate['action']} | type={candidate['page_type']}")

    selected = build_selection(ranked, data.get("selected_topic"))
    print("\nSelected topic")
    print("--------------")
    print(json.dumps(selected, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
