#!/usr/bin/env python3
import argparse
import json
import re
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DEFAULT_INPUT = ROOT / "mock-google-trends-rows.json"
DEFAULT_OUTPUT = ROOT / "candidate-table.json"
SITE = "https://89gameshub.com"


def normalize(text):
    return re.sub(r"\s+", " ", (text or "").strip()).lower()


def slugify(text):
    slug = re.sub(r"[^a-z0-9]+", "-", normalize(text))
    return re.sub(r"-+", "-", slug).strip("-")


def titleize(term):
    parts = re.split(r"(\s+)", (term or "").strip())
    keep_lower = {"vs", "and", "or", "to", "for", "with", "without", "on", "in"}
    titled = []
    for idx, part in enumerate(parts):
        if not part.strip():
            titled.append(part)
            continue
        word = part.lower()
        if idx > 0 and word in keep_lower:
            titled.append(word)
        elif re.fullmatch(r"[A-Z0-9][A-Z0-9+.'/-]*", part):
            titled.append(part)
        else:
            titled.append(part[:1].upper() + part[1:])
    return "".join(titled)


def topic_cluster(term_lc):
    rules = [
        ("sports", r"(world cup|fifa|uefa|\bnfl\b|\bnba\b|\bmlb\b|\bnhl\b|wimbledon|\bufc\b|espn|fox sports|telemundo|where to watch|watch .* live|stream .* live)"),
        ("apps", r"(whatsapp|telegram|cash app|paypal|venmo|zelle|paybyphone|waze|google maps|signal app|login|verification code|app not working|download app)"),
        ("payment", r"(paypal|cash app|venmo|zelle|payment|refund|pending payment|bank transfer|wire transfer|money transfer)"),
        ("streaming_media", r"(netflix|hulu|fubo|youtube tv|sling|disney\+|prime video|peacock|streaming app|watch live)"),
        ("travel_mobility", r"(paybyphone|parkmobile|parking|flight|airport|hotel|uber|lyft|maps|navigation|traffic|commute)"),
        ("education_learning", r"(duolingo|coursera|udemy|ielts|toefl|study app|learning app|english speaking|math app)"),
        ("commerce_deals", r"(deal|coupon|discount|cheap plan|phone plan|trade in|buy now pay later|best phone)"),
        ("gaming", r"(steam|xbox|playstation|\bps5\b|nintendo|roblox|fortnite|minecraft|game pass)"),
        ("news_entertainment", r"(movie|series|celebrity|concert|festival|award show|episode)"),
    ]
    for cluster, pattern in rules:
        if re.search(pattern, term_lc):
            return cluster
    return "other"


def intent_shape(term_lc):
    if re.search(r"(not working|down|outage|error|failed|can.t log in|login problem|verification code|not sending code|pending)", term_lc):
        return "problem_solving"
    if re.search(r"(\bvs\b|versus|compare|comparison|better than|which is better)", term_lc):
        return "comparison"
    if re.search(r"(where to watch|watch live|without cable|stream live|best app to watch)", term_lc):
        return "watch_intent"
    if re.search(r"(download|install|official app|apk)", term_lc):
        return "download_intent"
    if re.search(r"(deal|coupon|cheap|best price|discount|plan)", term_lc):
        return "deal_intent"
    return "broad_interest"


def page_type_for(cluster, intent):
    if cluster == "sports":
        if intent == "watch_intent":
            return "sports_watch_guide"
        if intent == "comparison":
            return "sports_comparison_guide"
        return "sports_topic_guide"
    if cluster in {"apps", "payment", "travel_mobility"}:
        if intent == "problem_solving":
            return "app_problem_guide"
        if intent == "download_intent":
            return "app_download_guide"
        if intent == "comparison":
            return "app_comparison_guide"
        return "app_topic_guide"
    if cluster == "commerce_deals":
        return "deals_guide"
    if cluster == "education_learning":
        return "learning_guide"
    return "topic_watchlist"


def site_section_for(page_type):
    if page_type.startswith("sports_"):
        return "sports"
    if page_type.startswith("app_"):
        return "apps"
    if page_type == "deals_guide":
        return "deals"
    if page_type == "learning_guide":
        return "learning"
    return "watchlist"


def business_lane_for(cluster, intent):
    if cluster in {"sports", "apps", "payment", "travel_mobility", "streaming_media", "commerce_deals", "education_learning"}:
        if intent in {"problem_solving", "comparison", "watch_intent", "download_intent", "deal_intent"}:
            return "active_build"
        return "watchlist"
    return "watchlist"


def build_support_for(topic, cluster, intent):
    topic_lc = normalize(topic)
    if cluster == "sports" and intent == "watch_intent" and "world cup" in topic_lc:
        return "ready_now"
    return "backlog"


def looks_english_safe(term_lc):
    return bool(re.fullmatch(r"[a-z0-9 &'.,:/()+-]+", term_lc))


def has_english_sports_cue(term_lc):
    return bool(re.search(
        r"(world cup|wimbledon|nhl|nba|nfl|mlb|ufc|free agency|free agent|trades|results|schedule|ranking|fixtures|games|bracket|goal scorers|without cable|where to watch|watch live)",
        term_lc,
    ))


def sports_subtype(term_lc):
    if re.search(r"(where to watch|watch live|without cable|stream)", term_lc):
        return "broadcast_watch"
    if re.search(r"(bracket|fixtures|schedule|ranking|results|goal scorers|games|free agency|free agent|trades)", term_lc):
        return "event_structure"
    if re.search(r"(president|investigation|prank|queue surprise|physical contact|ballgirl|david beckham|renata zarazua|lamine yamal|caitlin clark|princess of wales|novak djokovic|alex eala)", term_lc):
        return "news_story"
    if re.search(r"(world cup|wimbledon|nhl|nba|nfl|mlb|ufc|fifa)", term_lc):
        return "macro_event"
    return "other"


def sports_news_noise(term_lc):
    return bool(re.search(
        r"(president|investigation|prank|queue surprise|physical contact|ballgirl|david beckham|renata zarazua|lamine yamal|caitlin clark|princess of wales|novak djokovic|alex eala|south korea)",
        term_lc,
    ))


def should_keep_candidate(cluster, intent, term_lc):
    if cluster == "other":
        return False
    if len(term_lc) < 4:
        return False
    if not re.search(r"[a-z]", term_lc):
        return False
    if not looks_english_safe(term_lc):
        return False
    if re.search(r"(lottery|weather|temperature|translate|meaning of|definition of)", term_lc):
        return False
    if cluster == "sports":
        if sports_news_noise(term_lc):
            return False
        subtype = sports_subtype(term_lc)
        if subtype in {"broadcast_watch", "event_structure", "macro_event"} and has_english_sports_cue(term_lc):
            return True
        return False
    if cluster in {"sports", "apps", "payment", "streaming_media", "travel_mobility"}:
        if intent == "broad_interest":
            return False
    return True


def risk_score_for(cluster, term_lc):
    if re.search(r"(symptom|doctor|disease|treatment|attorney|lawsuit|tax|credit score|loan approval)", term_lc):
        return 0.2
    if cluster == "payment":
        return 0.6
    return 0.9


def commercial_value_for(cluster, intent):
    if cluster in {"payment", "commerce_deals", "streaming_media"}:
        return 0.9
    if cluster in {"apps", "travel_mobility", "sports"}:
        return 0.82 if intent != "broad_interest" else 0.7
    if cluster == "education_learning":
        return 0.78
    return 0.45


def geo_fit_for(cluster, intent):
    if intent in {"problem_solving", "watch_intent", "comparison", "download_intent"}:
        return 0.9
    if cluster in {"commerce_deals", "payment"}:
        return 0.85
    return 0.7


def page_reusability_for(cluster, intent):
    if intent in {"problem_solving", "comparison", "download_intent"}:
        return 0.92
    if cluster in {"sports", "streaming_media"} and intent == "watch_intent":
        return 0.72
    if cluster in {"commerce_deals", "education_learning"}:
        return 0.88
    return 0.65


def intent_clarity_for(intent):
    weights = {
        "problem_solving": 0.96,
        "comparison": 0.93,
        "watch_intent": 0.9,
        "download_intent": 0.88,
        "deal_intent": 0.85,
        "broad_interest": 0.45,
    }
    return weights[intent]


def trend_strength_for(rank, source_tables):
    rank = max(1, int(rank or 50))
    base = 1.0 - min(rank, 50) / 70.0
    if any("rising" in table for table in source_tables):
        base += 0.12
    return round(min(base, 1.0), 2)


def monetization_path_for(cluster, intent):
    if cluster == "sports":
        return "official outbound, ads, email capture"
    if cluster in {"apps", "travel_mobility"}:
        return "official outbound, ads"
    if cluster == "payment":
        return "official outbound, ads, safety-led affiliate later"
    if cluster == "commerce_deals":
        return "affiliate, outbound, ads, email capture"
    if cluster == "education_learning":
        return "course outbound, email capture, ads"
    return "ads, outbound later"


def merge_rows(rows):
    grouped = {}
    for row in rows:
        term = (row.get("term") or "").strip()
        if not term:
            continue
        key = normalize(term)
        if key not in grouped:
            grouped[key] = {
                "term": term,
                "refresh_dates": set(),
                "source_tables": set(),
                "geo_scopes": set(),
                "best_rank": None,
            }
        bucket = grouped[key]
        bucket["refresh_dates"].add(row.get("refresh_date", ""))
        bucket["source_tables"].add(row.get("source_table", ""))
        bucket["geo_scopes"].add(row.get("geo_scope", ""))
        rank = row.get("rank")
        if rank is not None:
            try:
                rank = int(rank)
            except (TypeError, ValueError):
                rank = None
        if rank is not None and (bucket["best_rank"] is None or rank < bucket["best_rank"]):
            bucket["best_rank"] = rank
    return grouped


def build_candidate(term_data):
    term = term_data["term"]
    term_lc = normalize(term)
    cluster = topic_cluster(term_lc)
    intent = intent_shape(term_lc)
    if not should_keep_candidate(cluster, intent, term_lc):
        return None
    page_type = page_type_for(cluster, intent)
    site_section = site_section_for(page_type)
    topic = titleize(term)
    slug = f"/guides/{site_section}/{slugify(topic)}/" if site_section != "watchlist" else f"/guides/topics/{slugify(topic)}/"
    trend_strength = trend_strength_for(term_data["best_rank"], term_data["source_tables"])
    candidate = {
        "topic": topic,
        "slug": slug,
        "region": "US",
        "source": "google_trends_public_dataset",
        "source_tables": sorted(table for table in term_data["source_tables"] if table),
        "geo_scopes": sorted(scope for scope in term_data["geo_scopes"] if scope),
        "trend_type": "realtime" if any("rising" in table for table in term_data["source_tables"]) else "durable_recent",
        "user_intent": topic,
        "page_type": page_type,
        "site_section": site_section,
        "topic_cluster": cluster,
        "sports_subtype": sports_subtype(term_lc) if cluster == "sports" else "",
        "intent_shape": intent,
        "business_lane": business_lane_for(cluster, intent),
        "build_support": build_support_for(topic, cluster, intent),
        "monetization_path": monetization_path_for(cluster, intent),
        "risk": "medium" if cluster == "payment" else "low",
        "trend_strength": trend_strength,
        "intent_clarity": intent_clarity_for(intent),
        "commercial_value": commercial_value_for(cluster, intent),
        "page_reusability": page_reusability_for(cluster, intent),
        "geo_citation_fit": geo_fit_for(cluster, intent),
        "risk_safety": risk_score_for(cluster, term_lc),
        "action": "build_secondary" if business_lane_for(cluster, intent) == "active_build" else "watch_high",
        "best_rank": term_data["best_rank"] if term_data["best_rank"] is not None else 999,
        "evidence_urls": [],
    }
    if candidate["risk_safety"] < 0.4:
        candidate["action"] = "skip_for_now"
        candidate["business_lane"] = "hold"
    return candidate


def build_sports_event_expansions(term_data):
    term = term_data["term"]
    term_lc = normalize(term)
    if not looks_english_safe(term_lc):
        return []
    if sports_news_noise(term_lc):
        return []
    if sports_subtype(term_lc) not in {"event_structure", "macro_event"}:
        return []
    if not has_english_sports_cue(term_lc):
        return []

    source_tables = sorted(table for table in term_data["source_tables"] if table)
    geo_scopes = sorted(scope for scope in term_data["geo_scopes"] if scope)
    trend_strength = trend_strength_for(term_data["best_rank"], source_tables)
    base = {
        "region": "US",
        "source": "google_trends_public_dataset_expansion",
        "source_tables": source_tables,
        "geo_scopes": geo_scopes,
        "trend_type": "realtime" if any("rising" in table for table in source_tables) else "durable_recent",
        "site_section": "sports",
        "topic_cluster": "sports",
        "sports_subtype": "expanded_from_event",
        "business_lane": "active_build",
        "monetization_path": "official outbound, ads, email capture",
        "risk": "low",
        "trend_strength": trend_strength,
        "geo_citation_fit": 0.9,
        "risk_safety": 0.9,
        "best_rank": term_data["best_rank"] if term_data["best_rank"] is not None else 999,
        "evidence_urls": [],
        "build_support": "ready_now",
    }

    topic = titleize(term)
    expansions = [
        {
            **base,
            "topic": f"Where to Watch {topic} Live",
            "slug": f"/guides/sports/{slugify(f'where to watch {topic} live')}/",
            "user_intent": f"Where to Watch {topic} Live",
            "page_type": "sports_watch_guide",
            "intent_shape": "watch_intent",
            "intent_clarity": 0.95,
            "commercial_value": 0.82,
            "page_reusability": 0.78,
            "action": "build_secondary",
        },
        {
            **base,
            "topic": f"Best Apps to Watch {topic}",
            "slug": f"/guides/sports/{slugify(f'best apps to watch {topic}')}/",
            "user_intent": f"Best Apps to Watch {topic}",
            "page_type": "sports_comparison_guide",
            "intent_shape": "comparison",
            "intent_clarity": 0.93,
            "commercial_value": 0.84,
            "page_reusability": 0.82,
            "action": "build_secondary",
        },
        {
            **base,
            "topic": f"How to Watch {topic} Without Cable",
            "slug": f"/guides/sports/{slugify(f'how to watch {topic} without cable')}/",
            "user_intent": f"How to Watch {topic} Without Cable",
            "page_type": "sports_watch_guide",
            "intent_shape": "watch_intent",
            "intent_clarity": 0.94,
            "commercial_value": 0.85,
            "page_reusability": 0.8,
            "action": "build_secondary",
        },
    ]
    return expansions


def build_candidates_for_term(term_data):
    direct = build_candidate(term_data)
    candidates = []
    if direct:
        candidates.append(direct)
    if direct and direct["topic_cluster"] == "sports" and direct["intent_shape"] == "broad_interest":
        candidates.extend(build_sports_event_expansions(term_data))
    return candidates


def build_table(rows, trial_date):
    merged = merge_rows(rows)
    candidates = []
    for term_data in merged.values():
        candidates.extend(build_candidates_for_term(term_data))
    candidates.sort(key=lambda item: (-item["trend_strength"], item["best_rank"], item["topic"]))
    return {
        "trial_date": trial_date,
        "site": SITE,
        "notes": [
            "candidate table generated by google_trends_candidate_builder.py",
            "source rows came from bigquery-public-data.google_trends",
            "refresh_date partition filters must remain in the source query",
        ],
        "collection_summary": {
            "source_count": 1,
            "successful_source_count": 1,
            "failed_source_count": 0,
            "total_unique_items": len(rows),
            "duplicate_item_count": max(0, len(rows) - len(merged)),
            "matched_signal_count": len(candidates),
            "matched_topics": [candidate["topic"] for candidate in candidates[:20]],
            "failed_sources": [],
        },
        "live_signals": [],
        "live_matches": [],
        "raw_trend_rows": rows,
        "selected_topic": {},
        "candidates": candidates,
    }


def main():
    parser = argparse.ArgumentParser(description="Convert Google Trends query rows into a candidate table.")
    parser.add_argument("--input", default=str(DEFAULT_INPUT), help="Path to JSON rows exported from BigQuery")
    parser.add_argument("--output", default=str(DEFAULT_OUTPUT), help="Path to write candidate-table.json")
    parser.add_argument("--trial-date", default=str(date.today()), help="Trial date string")
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)
    rows = json.loads(input_path.read_text(encoding="utf-8"))
    if isinstance(rows, dict) and "rows" in rows:
        rows = rows["rows"]
    if not isinstance(rows, list):
        raise SystemExit("Input must be a JSON array of query result rows.")

    table = build_table(rows, args.trial_date)
    output_path.write_text(json.dumps(table, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print("Google Trends candidate builder output")
    print("====================================")
    print(json.dumps({
        "trial_date": args.trial_date,
        "input_rows": len(rows),
        "candidate_count": len(table["candidates"]),
        "top_candidates": [
            {
                "topic": candidate["topic"],
                "cluster": candidate["topic_cluster"],
                "intent": candidate["intent_shape"],
                "lane": candidate["business_lane"],
                "page_type": candidate["page_type"],
                "best_rank": candidate["best_rank"],
            }
            for candidate in table["candidates"][:10]
        ],
        "output": str(output_path),
    }, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
