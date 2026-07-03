#!/usr/bin/env python3
import json
import os
from datetime import date
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[2]
CATALOG = ROOT / "arcade-hub" / "games.json"
OUT = ROOT / "sitemap.xml"
ROBOTS = ROOT / "robots.txt"

site_url = os.environ.get("SITE_URL", "https://YOUR_DOMAIN_HERE").rstrip("/")
today = os.environ.get("SITEMAP_LASTMOD", date.today().isoformat())

def loc(path: str) -> str:
    return f"{site_url}/{path.lstrip('/')}"

with CATALOG.open("r", encoding="utf-8") as f:
    games = json.load(f)

playable = [g for g in games if g.get("auditStatus") != "启动失败"]
urls = [
    (loc(""), "1.0", "daily"),
    (loc("arcade-hub/index.html"), "1.0", "daily"),
]

static_content_pages = [
    ("ai-learning/index.html", "0.8", "weekly"),
    ("speaking-confidence/index.html", "0.8", "weekly"),
    ("focus-test/index.html", "0.8", "weekly"),
    ("learning-guides/how-to-speak-more-clearly/", "0.8", "weekly"),
    ("learning-guides/how-to-help-a-child-speak-clearly/", "0.8", "weekly"),
    ("learning-guides/how-to-stay-focused-while-studying/", "0.8", "weekly"),
    ("learning-guides/how-to-improve-memory/", "0.8", "weekly"),
    ("phone-deals/best-cheap-phone-plans/", "0.8", "weekly"),
    ("guides/apps/paybyphone-not-working/", "0.8", "weekly"),
    ("guides/apps/whatsapp-not-working/", "0.8", "weekly"),
    ("guides/apps/whatsapp-official-download/", "0.8", "weekly"),
    ("guides/apps/telegram-not-sending-code/", "0.8", "weekly"),
    ("guides/apps/telegram-safe-download/", "0.8", "weekly"),
    ("guides/apps/paypal-login-problems/", "0.8", "weekly"),
    ("guides/apps/paypal-payment-pending/", "0.8", "weekly"),
    ("guides/apps/cash-app-login-problems/", "0.8", "weekly"),
    ("guides/apps/is-cash-app-safe/", "0.8", "weekly"),
    ("guides/apps/waze-vs-google-maps/", "0.8", "weekly"),
    ("guides/sports/best-streaming-apps-live-sports/", "0.8", "weekly"),
    ("guides/sports/youtube-tv-vs-hulu-live-sling-fubo/", "0.8", "weekly"),
    ("guides/sports/watch-nfl-games-today/", "0.8", "daily"),
    ("guides/sports/world-cup-games-today/", "0.8", "daily"),
    ("guides/sports/how-to-watch-fifa-world-cup-2026-bracket-without-cable/", "0.8", "weekly"),
    ("guides/sports/best-apps-to-watch-world-cup-2026/", "0.8", "weekly"),
    ("guides/sports/where-to-watch-world-cup-2026/", "0.8", "daily"),
    ("guides/sports/watch-football-without-cable/", "0.8", "weekly"),
    ("arcade-hub/sports-quiz/", "0.7", "weekly"),
]

urls.extend((loc(path), priority, changefreq) for path, priority, changefreq in static_content_pages)

for page in ("about.html", "contact.html", "privacy.html", "terms.html", "dmca.html", "advertising.html", "territory-clash-live.html"):
    urls.append((loc(f"arcade-hub/{page}"), "0.6", "monthly"))

for theme in ("word-link", "block", "hello-stars"):
    urls.append((loc(f"arcade-hub/campaign.html?theme={theme}"), "0.9", "weekly"))

for lang in ("zh", "en"):
    for g in playable:
        gid = quote(g["id"], safe="")
        urls.append((loc(f"arcade-hub/detail.html?id={gid}&lang={lang}"), "0.8", "weekly"))
        urls.append((loc(f"arcade-hub/play.html?id={gid}&lang={lang}"), "0.7", "weekly"))

xml = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for url, priority, changefreq in urls:
    xml.extend([
        "  <url>",
        f"    <loc>{url}</loc>",
        f"    <lastmod>{today}</lastmod>",
        f"    <changefreq>{changefreq}</changefreq>",
        f"    <priority>{priority}</priority>",
        "  </url>",
    ])
xml.append("</urlset>")
OUT.write_text("\n".join(xml) + "\n", encoding="utf-8")

if ROBOTS.exists():
    robots = ROBOTS.read_text(encoding="utf-8")
    lines = []
    replaced = False
    for line in robots.splitlines():
        if line.startswith("Sitemap:"):
            lines.append(f"Sitemap: {site_url}/sitemap.xml")
            replaced = True
        else:
            lines.append(line)
    if not replaced:
        lines.append(f"Sitemap: {site_url}/sitemap.xml")
    ROBOTS.write_text("\n".join(lines) + "\n", encoding="utf-8")

print(f"Generated {OUT} with {len(urls)} URLs for {len(playable)} playable games.")
if "YOUR_DOMAIN_HERE" in site_url:
    print("Warning: SITE_URL is still a placeholder. Set SITE_URL=https://your-domain.com before production deploy.")
