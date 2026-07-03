#!/usr/bin/env python3
import argparse
import copy
import json
import re
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DEFAULT_CONFIG = ROOT / "trend-source-config.json"
DEFAULT_OUTPUT = ROOT / "candidate-table.json"


def normalize(text):
    return re.sub(r"\s+", " ", (text or "").lower()).strip()


def unique_preserve_order(values):
    seen = set()
    output = []
    for value in values:
        key = normalize(str(value))
        if not key or key in seen:
            continue
        seen.add(key)
        output.append(value)
    return output


def build_source_url(source, default_region):
    source_type = source.get("source_type", "rss")
    if source_type == "rss":
        return source["url"]
    if source_type == "google_news_rss":
        region = source.get("region", default_region)
        language = source.get("language", "en-US")
        ceid = source.get("ceid", "US:en")
        query = source["query"]
        encoded_query = urllib.parse.quote_plus(query)
        return (
            "https://news.google.com/rss/search"
            f"?q={encoded_query}&hl={language}&gl={region}&ceid={ceid}"
        )
    raise ValueError(f"Unsupported source_type: {source_type}")


def parse_rss_items(raw, limit):
    root = ET.fromstring(raw)
    items = []
    for item in root.findall(".//item"):
        title = (item.findtext("title") or "").strip()
        if not title:
            continue
        items.append({
            "title": title,
            "link": (item.findtext("link") or "").strip(),
            "published_at": (item.findtext("pubDate") or "").strip(),
        })
        if len(items) >= limit:
            break
    return items


def fetch_source_items(source, default_region, limit):
    url = build_source_url(source, default_region)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=10) as response:
        raw = response.read()
    return {
        "name": source["name"],
        "source_type": source.get("source_type", "rss"),
        "url": url,
        "query": source.get("query", ""),
        "trend_type": source.get("trend_type", ""),
        "region": source.get("region", default_region),
        "items": parse_rss_items(raw, limit),
    }


def normalize_signal_payload(payload):
    normalized = []
    for source in payload:
        raw_items = source.get("items")
        if raw_items is None:
            raw_items = [{"title": title} for title in source.get("titles", [])]

        items = []
        for item in raw_items:
            title = (item.get("title") or "").strip()
            if not title:
                continue
            items.append({
                "title": title,
                "link": (item.get("link") or "").strip(),
                "published_at": (item.get("published_at") or item.get("pubDate") or "").strip(),
            })

        normalized.append({
            "name": source.get("name", "unknown_source"),
            "source_type": source.get("source_type", "prefetched"),
            "url": source.get("url", ""),
            "query": source.get("query", ""),
            "trend_type": source.get("trend_type", ""),
            "region": source.get("region", ""),
            "error": source.get("error", ""),
            "items": items,
        })
    return normalized


def dedupe_signal_items(signals):
    seen = set()
    deduped = []
    duplicate_count = 0
    for signal in signals:
        unique_items = []
        for item in signal.get("items", []):
            dedupe_key = normalize(item.get("title", "")) + "|" + normalize(item.get("link", ""))
            if not dedupe_key.strip("|"):
                continue
            if dedupe_key in seen:
                duplicate_count += 1
                continue
            seen.add(dedupe_key)
            unique_items.append(item)
        cloned = copy.deepcopy(signal)
        cloned["items"] = unique_items
        cloned["titles"] = [item["title"] for item in unique_items]
        deduped.append(cloned)
    return deduped, duplicate_count


def item_matches_rule(item, rule):
    normalized_title = normalize(item.get("title", ""))
    match_any = [normalize(term) for term in rule.get("match_any", []) if normalize(term)]
    match_all = [normalize(term) for term in rule.get("match_all", []) if normalize(term)]
    exclude_any = [normalize(term) for term in rule.get("exclude_any", []) if normalize(term)]

    matched_any = [term for term in match_any if term in normalized_title]
    matched_all = [term for term in match_all if term in normalized_title]
    matched_excludes = [term for term in exclude_any if term in normalized_title]

    if match_any and not matched_any:
        return None
    if match_all and len(matched_all) != len(match_all):
        return None
    if matched_excludes:
        return None

    hit_count = len(matched_any) + len(matched_all)
    boost = min(rule.get("boost_per_hit", 0.02) * max(hit_count, 1), rule.get("max_boost", 0.1))
    return {
        "matched_any": matched_any,
        "matched_all": matched_all,
        "hit_count": hit_count,
        "boost": boost,
    }


def derive_live_matches(signals, rules):
    matches = []
    for signal in signals:
        if signal.get("error"):
            continue
        for item in signal.get("items", []):
            for rule in rules:
                result = item_matches_rule(item, rule)
                if not result:
                    continue
                matches.append({
                    "topic": rule["topic"],
                    "source_name": signal["name"],
                    "source_type": signal.get("source_type", ""),
                    "title": item["title"],
                    "link": item.get("link", ""),
                    "published_at": item.get("published_at", ""),
                    "matched_any": result["matched_any"],
                    "matched_all": result["matched_all"],
                    "hit_count": result["hit_count"],
                    "boost": result["boost"],
                })
    return matches


def apply_live_matches(seed_candidates, matches):
    candidates = copy.deepcopy(seed_candidates)
    by_topic = {candidate["topic"]: candidate for candidate in candidates}
    grouped = {}
    for match in matches:
        grouped.setdefault(match["topic"], []).append(match)

    for topic, topic_matches in grouped.items():
        candidate = by_topic.get(topic)
        if not candidate:
            continue

        total_boost = min(sum(item["boost"] for item in topic_matches), 0.18)
        unique_sources = sorted({item["source_name"] for item in topic_matches})
        candidate["trend_strength"] = round(min(1.0, float(candidate.get("trend_strength", 0)) + total_boost), 2)
        candidate["live_signal_hits"] = len(topic_matches)
        candidate["live_signal_sources"] = unique_sources
        candidate["live_signal_titles"] = unique_preserve_order([item["title"] for item in topic_matches])[:5]
        candidate["live_signal_terms"] = unique_preserve_order(
            [term for item in topic_matches for term in (item.get("matched_any", []) + item.get("matched_all", []))]
        )[:8]
        candidate["live_signal_links"] = unique_preserve_order([item.get("link", "") for item in topic_matches if item.get("link")])[:5]

        existing_source = candidate.get("source", "")
        live_suffix = "live:" + ",".join(unique_sources)
        candidate["source"] = f"{existing_source} + {live_suffix}" if existing_source else live_suffix

    return candidates


def summarize_collection(signals, matches, duplicate_count):
    successful_sources = [signal for signal in signals if signal.get("items")]
    failed_sources = [signal for signal in signals if signal.get("error")]
    total_items = sum(len(signal.get("items", [])) for signal in signals)
    return {
        "source_count": len(signals),
        "successful_source_count": len(successful_sources),
        "failed_source_count": len(failed_sources),
        "total_unique_items": total_items,
        "duplicate_item_count": duplicate_count,
        "matched_signal_count": len(matches),
        "matched_topics": sorted({match["topic"] for match in matches}),
        "failed_sources": [
            {
                "name": signal.get("name", ""),
                "url": signal.get("url", ""),
                "error": signal.get("error", ""),
            }
            for signal in failed_sources
        ],
    }


def configured_sources(config):
    return config.get("live_sources") or config.get("rss_sources") or []


def build_candidate_table(config, signals, trial_date, duplicate_count):
    successful_sources = [signal for signal in signals if signal.get("items")]
    failed_sources = [signal for signal in signals if signal.get("error")]
    matches = derive_live_matches(successful_sources, config.get("live_candidate_rules", []))
    candidates = apply_live_matches(config.get("seed_candidates", []), matches)
    collection_summary = summarize_collection(signals, matches, duplicate_count)

    notes = [
        "candidate table generated by trend_collector.py",
        "seed_candidates were used as the base structured source",
    ]
    if successful_sources:
        notes.append(f"live sources collected successfully from {len(successful_sources)} source(s)")
    else:
        notes.append("live source collection was unavailable, blocked, or disabled for this run")
    if failed_sources:
        notes.append(f"live source fetch failures recorded for {len(failed_sources)} source(s)")
    if duplicate_count:
        notes.append(f"duplicate live items removed: {duplicate_count}")
    if matches:
        notes.append(f"live titles matched {len(matches)} candidate signal hit(s)")

    return {
        "trial_date": trial_date,
        "site": config.get("site", "https://89gameshub.com"),
        "notes": notes,
        "collection_summary": collection_summary,
        "live_signals": signals,
        "live_matches": matches,
        "selected_topic": {},
        "candidates": candidates,
    }


def main():
    parser = argparse.ArgumentParser(description="Collect trend signals and seed a candidate table.")
    parser.add_argument("--config", default=str(DEFAULT_CONFIG), help="Path to trend-source-config.json")
    parser.add_argument("--output", default=str(DEFAULT_OUTPUT), help="Path to candidate-table.json")
    parser.add_argument("--trial-date", default=str(date.today()), help="Trial date string")
    parser.add_argument("--seed-only", action="store_true", help="Skip live fetching and use only configured seed candidates")
    parser.add_argument("--signals-file", help="Optional JSON file with pre-fetched live signals")
    parser.add_argument("--limit-per-source", type=int, default=10, help="Maximum number of RSS items to keep per source")
    args = parser.parse_args()

    config_path = Path(args.config)
    output_path = Path(args.output)
    config = json.loads(config_path.read_text(encoding="utf-8"))

    raw_signals = []
    if args.signals_file:
        raw_signals = normalize_signal_payload(json.loads(Path(args.signals_file).read_text(encoding="utf-8")))
    elif not args.seed_only:
        default_region = config.get("default_region", "US")
        for source in configured_sources(config):
            source_url = ""
            try:
                source_url = build_source_url(source, default_region)
                raw_signals.append(fetch_source_items(source, default_region, args.limit_per_source))
            except (urllib.error.URLError, TimeoutError, ET.ParseError, ValueError) as exc:
                raw_signals.append({
                    "name": source.get("name", "unknown_source"),
                    "source_type": source.get("source_type", "rss"),
                    "url": source_url or source.get("url", ""),
                    "query": source.get("query", ""),
                    "trend_type": source.get("trend_type", ""),
                    "region": source.get("region", default_region),
                    "error": str(exc),
                    "items": [],
                })

    signals, duplicate_count = dedupe_signal_items(raw_signals)
    table = build_candidate_table(config, signals, args.trial_date, duplicate_count)
    output_path.write_text(json.dumps(table, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print("Trend collector output")
    print("======================")
    print(json.dumps({
        "trial_date": args.trial_date,
        "seed_candidate_count": len(table["candidates"]),
        "live_source_count": len(signals),
        "successful_live_sources": table["collection_summary"]["successful_source_count"],
        "failed_live_sources": table["collection_summary"]["failed_source_count"],
        "total_unique_items": table["collection_summary"]["total_unique_items"],
        "duplicate_item_count": table["collection_summary"]["duplicate_item_count"],
        "live_match_count": len(table.get("live_matches", [])),
        "matched_topics": table["collection_summary"]["matched_topics"],
        "output": str(output_path),
    }, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
