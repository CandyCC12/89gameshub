#!/usr/bin/env python3
import argparse
import json
import re
import subprocess
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COURSE_PROD = Path(__file__).resolve().parent
DEFAULT_TABLE = COURSE_PROD / "candidate-table.json"
SITEMAP_SCRIPT = ROOT / "arcade-hub" / "scripts" / "generate_sitemap.py"
SITE_URL = "https://89gameshub.com"


def get_candidate(data, topic):
    for candidate in data.get("candidates", []):
        if candidate.get("topic") == topic:
            return candidate
    return {}


def detect_sports_context(topic):
    topic_lc = topic.lower()
    if "world cup" in topic_lc or "fifa" in topic_lc:
        return {
            "eyebrow": "World Cup Watch Guide",
            "official_primary_label": "Official FIFA tournament page",
            "official_primary_url": "https://www.fifa.com/",
            "official_secondary_label": "Official FOX World Cup page",
            "official_secondary_url": "https://www.foxsports.com/soccer/fifa-world-cup",
            "official_tertiary_label": "Official Telemundo football page",
            "official_tertiary_url": "https://www.telemundo.com/deportes/futbol",
            "bundle_examples": [
                ("Official YouTube TV", "https://tv.youtube.com/"),
                ("Official Hulu + Live TV", "https://www.hulu.com/live-tv"),
                ("Official Fubo", "https://www.fubo.tv/"),
            ],
            "related": [
                ("/guides/sports/world-cup-games-today/", "World Cup Games Today: Where to Watch Legally"),
                ("/guides/sports/best-apps-to-watch-world-cup-2026/", "Best Apps to Watch World Cup 2026"),
                ("/guides/sports/watch-football-without-cable/", "Best Apps to Watch Football Without Cable"),
            ],
        }
    if "wimbledon" in topic_lc:
        return {
            "eyebrow": "Tennis Watch Guide",
            "official_primary_label": "Official Wimbledon source",
            "official_primary_url": "https://www.wimbledon.com/",
            "official_secondary_label": "Official ESPN tennis page",
            "official_secondary_url": "https://www.espn.com/tennis/",
            "official_tertiary_label": "Official BBC Sport tennis page",
            "official_tertiary_url": "https://www.bbc.com/sport/tennis",
            "bundle_examples": [
                ("Official YouTube TV", "https://tv.youtube.com/"),
                ("Official Hulu + Live TV", "https://www.hulu.com/live-tv"),
                ("Official Sling TV", "https://www.sling.com/"),
            ],
            "related": [
                ("/guides/sports/best-streaming-apps-live-sports/", "Best Streaming Apps for Live Sports"),
                ("/guides/sports/youtube-tv-vs-hulu-live-sling-fubo/", "YouTube TV vs Hulu Live vs Sling vs Fubo"),
                ("/guides/sports/watch-football-without-cable/", "Best Apps to Watch Football Without Cable"),
            ],
        }
    return {
        "eyebrow": "Live Sports Watch Guide",
        "official_primary_label": "Official event source",
        "official_primary_url": "https://www.espn.com/",
        "official_secondary_label": "Official broadcast source",
        "official_secondary_url": "https://www.foxsports.com/",
        "official_tertiary_label": "Official live TV source",
        "official_tertiary_url": "https://tv.youtube.com/",
        "bundle_examples": [
            ("Official YouTube TV", "https://tv.youtube.com/"),
            ("Official Hulu + Live TV", "https://www.hulu.com/live-tv"),
            ("Official Fubo", "https://www.fubo.tv/"),
        ],
        "related": [
            ("/guides/sports/best-streaming-apps-live-sports/", "Best Streaming Apps for Live Sports"),
            ("/guides/sports/youtube-tv-vs-hulu-live-sling-fubo/", "YouTube TV vs Hulu Live vs Sling vs Fubo"),
            ("/guides/sports/watch-nfl-games-today/", "How to Watch NFL Games Today"),
        ],
    }


def generic_sports_watch_html(selected, candidate, today):
    topic = selected["topic"]
    slug = selected["slug"]
    canonical = f"{SITE_URL}/{slug.strip('/')}/"
    page_slug = slug.strip("/").split("/")[-1]
    context = detect_sports_context(topic)
    title = topic
    description = f"Use this guide to compare legal ways to watch {topic.lower()}, check official sources, avoid fake streams, and choose the simplest viewing path."
    related_html = "".join(
        f'<a class="decision-card" href="{href}" data-event="related_guide_click" data-event-label="related_{href.strip("/").split("/")[-1]}" data-click-target="related_{href.strip("/").split("/")[-1]}" data-preserve-params="true">{label}</a>'
        for href, label in context["related"]
    )
    bundle_html = "".join(
        f'<a class="js-official-link" href="{href}" data-event="official_link_click" data-event-label="{label.lower().replace(" ", "_")}" data-click-target="{label.lower().replace(" ", "_")}" rel="noopener">{label}</a>'
        for label, href in context["bundle_examples"]
    )
    live_titles = candidate.get("live_signal_titles", [])
    live_title_html = "".join(f"<li>{item}</li>" for item in live_titles[:3]) or "<li>Recent sports search demand moved this topic into the current build lane.</li>"
    faq_topic = title.replace('"', "&quot;")
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content="{description}" />
    <link rel="canonical" href="{canonical}" />
    <meta property="og:site_name" content="89 Sports Guide" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="{title}" />
    <meta property="og:description" content="{description}" />
    <meta property="og:url" content="{canonical}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="{title}" />
    <meta name="twitter:description" content="{description}" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5502975373459743" crossorigin="anonymous"></script>
    <script src="../../../arcade-hub/tracking-config.js?v=5"></script>
    <script src="../../../arcade-hub/site-utils.js?v=14"></script>
    <link rel="stylesheet" href="../sports-guide.css" />
    <script type="application/ld+json">
      {{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{title}",
        "description": "{description}",
        "author": {{ "@type": "Organization", "name": "89 Sports Guide" }},
        "publisher": {{ "@type": "Organization", "name": "89 Sports Guide" }},
        "datePublished": "{today}",
        "dateModified": "{today}",
        "mainEntityOfPage": {{ "@type": "WebPage", "@id": "{canonical}" }}
      }}
    </script>
    <script type="application/ld+json">
      {{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {{
            "@type": "Question",
            "name": "Can I watch {faq_topic} without cable?",
            "acceptedAnswer": {{ "@type": "Answer", "text": "Often yes, but the right no-cable path depends on official rights, supported live channels, and whether your current bundle already covers the event." }}
          }},
          {{
            "@type": "Question",
            "name": "What should I check before opening a streaming app?",
            "acceptedAnswer": {{ "@type": "Answer", "text": "Check official rights, sign-in rules, local channel coverage, device support, and whether the app actually offers live access instead of only clips or schedules." }}
          }},
          {{
            "@type": "Question",
            "name": "Are unofficial sports streams safe?",
            "acceptedAnswer": {{ "@type": "Answer", "text": "No. Stick with official event pages, official broadcaster pages, and clearly licensed live TV services instead of APKs, copied mirror sites, or unclear stream apps." }}
          }},
          {{
            "@type": "Question",
            "name": "Should I use one app or a live TV bundle?",
            "acceptedAnswer": {{ "@type": "Answer", "text": "If you need broader coverage, a live TV bundle is usually safer. If you only need a narrower official path, one app may be enough." }}
          }},
          {{
            "@type": "Question",
            "name": "How do I compare the real monthly cost?",
            "acceptedAnswer": {{ "@type": "Answer", "text": "Compare the actual required channel coverage, trial rules, add-ons, and whether you already pay for a service that includes the event." }}
          }},
          {{
            "@type": "Question",
            "name": "Where should I verify schedules and access rules?",
            "acceptedAnswer": {{ "@type": "Answer", "text": "Use the official event page and the official broadcaster page first, then confirm whether the service you plan to use includes the needed match windows." }}
          }}
        ]
      }}
    </script>
  </head>
  <body
    data-landing-name="{page_slug}"
    data-page-category="sports_watch_guide"
    data-page-type="sports_watch_guide"
    data-topic="{page_slug}"
    data-intent="sports_watch_intent"
    data-content-format="seo_sports_guide"
    data-monetization-model="mixed"
    data-keyword-stage="organic_validation"
    data-page-slug="{page_slug}"
  >
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="../../../index.html" data-event="guide_cta_click" data-event-label="site_home" data-click-target="site_home">
          <strong>89 Sports Guide</strong>
          <span>Live watch guides</span>
        </a>
        <nav aria-label="Page navigation">
          <a href="#watch-finder">Watch finder</a>
          <a href="#compare">Compare paths</a>
          <a href="#official">Official links</a>
          <a href="#sources">Sources</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
    </header>
    <section class="hero">
      <div class="hero-inner">
        <div>
          <p class="eyebrow">{context["eyebrow"]}</p>
          <h1>{title}</h1>
          <p class="lede">Use this page to get to the simplest legal watch path faster, instead of bouncing between app listings, unofficial streams, and last-minute login surprises.</p>
          <div class="short-answer">
            <strong>Short answer</strong>
            <p>The fastest way to watch {topic.lower()} is to start with the official event or broadcaster source, then check whether you already have a live TV bundle or official app path that covers the matches you need. Most viewing mistakes happen because users compare app brands before they verify rights, local channel access, and sign-in rules.</p>
          </div>
          <p class="meta-note">Last checked: {today}</p>
        </div>
        <aside class="tool-card" aria-label="Watch path finder">
          <header>
            <strong>Watch Path Finder</strong>
            <p>Pick your setup first. That is usually faster than opening multiple apps and comparing them blindly.</p>
          </header>
          <div class="mini-picks">
            <div class="mini-pick">
              <strong>Start from official rights</strong>
              <span>That avoids fake apps, incomplete access, and dead links.</span>
            </div>
            <div class="mini-pick">
              <strong>Check bundle coverage before signing up again</strong>
              <span>You may already have the right channels in a service you pay for.</span>
            </div>
            <div class="hero-actions">
              <a class="button js-official-link" href="{context["official_primary_url"]}" data-event="primary_cta_click" data-event-label="official_source_primary" data-click-target="official_source_primary" rel="noopener">Open official source</a>
              <a class="button secondary" href="#watch-finder" data-event="secondary_cta_click" data-event-label="use_watch_finder" data-click-target="use_watch_finder">Use the watch finder</a>
            </div>
          </div>
        </aside>
      </div>
    </section>
    <div class="page-shell">
      <main>
        <section id="watch-finder">
          <h2>Quick Watch Finder</h2>
          <p>Use this first if you want a practical next step instead of a generic streaming list.</p>
          <form id="watchFinderForm">
            <div class="finder-grid">
              <label>
                Country or market
                <select id="watchCountry" name="country">
                  <option value="us" selected>United States</option>
                  <option value="other">Outside the United States</option>
                </select>
              </label>
              <label>
                Viewing setup
                <select id="watchMatch" name="match">
                  <option value="streaming" selected>Streaming only</option>
                  <option value="bundle">Already have a live TV bundle</option>
                  <option value="mobile">Mostly mobile viewing</option>
                  <option value="highlights">Need official highlights or schedule only</option>
                </select>
              </label>
              <label>
                Priority
                <select id="watchPreference" name="preference">
                  <option value="coverage" selected>Broad coverage</option>
                  <option value="price">Lower monthly cost</option>
                  <option value="simplicity">Simpler setup</option>
                  <option value="travel">Temporary or travel use</option>
                </select>
              </label>
            </div>
            <div class="hero-actions">
              <button class="button" type="submit">Show legal watch path</button>
            </div>
          </form>
          <div class="finder-result" id="watchFinderResult" hidden aria-live="polite"></div>
        </section>
        <section id="compare">
          <h2>Compare the Main Viewing Paths</h2>
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Path</th>
                <th>Best for</th>
                <th>What to check</th>
                <th>Main trade-off</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Official event or broadcaster source</td>
                <td>Users who want the cleanest legal path</td>
                <td>Rights, sign-in rules, and match-by-match live access</td>
                <td>Can still require a TV provider or separate subscription</td>
              </tr>
              <tr>
                <td>Live TV bundle</td>
                <td>Users who want broader coverage</td>
                <td>Included channels, trial terms, and local channel access</td>
                <td>Usually higher monthly cost</td>
              </tr>
              <tr>
                <td>Mobile-first app setup</td>
                <td>Phone and tablet viewers</td>
                <td>Device support, casting, login persistence, and blackout rules</td>
                <td>Can feel weaker on TV or group viewing</td>
              </tr>
              <tr>
                <td>Official highlights and schedule only</td>
                <td>Users who do not need full live coverage</td>
                <td>Whether clips, recaps, and reminders are enough</td>
                <td>Usually not enough for full-match viewing</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section id="guide">
          <h2>How to Choose More Efficiently</h2>
          <div class="step-list">
            <article class="step">
              <h3>1. Verify rights before comparing apps</h3>
              <p>The cleanest-looking app page is irrelevant if it does not hold the live rights you actually need.</p>
            </article>
            <article class="step">
              <h3>2. Check whether you already pay for the right channels</h3>
              <p>If your current bundle already covers the event, adding another app can be wasted spend.</p>
            </article>
            <article class="step">
              <h3>3. Separate schedule access from live access</h3>
              <p>Some official pages are perfect for schedules and alerts, but still not the final live viewing path.</p>
            </article>
            <article class="step">
              <h3>4. Test sign-in and device flow before the event window</h3>
              <p>The common failure mode is not price. It is getting blocked by login, local channel rules, or unsupported devices when the event starts.</p>
            </article>
          </div>
        </section>
        <section id="signals">
          <h2>Why This Topic Surfaced</h2>
          <div class="callout">
            <strong>Recent search and trend pattern</strong>
            <p>This topic moved into the build lane because recent trend signals pointed toward live viewing, app comparison, and no-cable sports watch decisions.</p>
            <ul>{live_title_html}</ul>
          </div>
        </section>
        <section id="official">
          <h2>Official Links to Check First</h2>
          <div class="link-list">
            <a class="js-official-link" href="{context["official_primary_url"]}" data-event="schedule_source_click" data-event-label="official_primary" data-click-target="official_primary" rel="noopener">{context["official_primary_label"]}</a>
            <a class="js-official-link" href="{context["official_secondary_url"]}" data-event="schedule_source_click" data-event-label="official_secondary" data-click-target="official_secondary" rel="noopener">{context["official_secondary_label"]}</a>
            <a class="js-official-link" href="{context["official_tertiary_url"]}" data-event="schedule_source_click" data-event-label="official_tertiary" data-click-target="official_tertiary" rel="noopener">{context["official_tertiary_label"]}</a>
            {bundle_html}
          </div>
        </section>
        <section id="related">
          <h2>Related Guides</h2>
          <div class="card-grid">{related_html}</div>
        </section>
        <section id="cta">
          <h2>Before You Open Another Trial</h2>
          <div class="callout">
            <strong>Compare the real access path, not just the app store listing.</strong>
            <p>Most wasted clicks happen when users skip rights, login rules, and channel coverage checks, then discover too late that the app does not actually solve the viewing problem.</p>
            <div class="hero-actions">
              <a class="button js-official-link" href="{context["official_primary_url"]}" data-event="primary_cta_click" data-event-label="cta_official_source" data-click-target="cta_official_source" rel="noopener">Open official source</a>
              <a class="button secondary js-official-link" href="{context["official_secondary_url"]}" data-event="secondary_cta_click" data-event-label="cta_broadcast_source" data-click-target="cta_broadcast_source" rel="noopener">Check broadcaster coverage</a>
            </div>
          </div>
        </section>
        <section id="faq">
          <h2>FAQ</h2>
          <details data-faq-id="watch_without_cable"><summary>Can I watch this without cable?</summary><p>Often yes, but the right path depends on official rights, included channels, and whether your existing streaming service already covers the event.</p></details>
          <details data-faq-id="official_vs_bundle"><summary>Should I use an official app or a live TV bundle?</summary><p>If you need broader coverage, a live TV bundle is usually safer. If you only need a narrower official path, a single app may be enough.</p></details>
          <details data-faq-id="mobile_viewing"><summary>Is mobile viewing enough?</summary><p>It can be, but you should verify sign-in stability, casting support, and whether the live feed is available on the devices you actually use.</p></details>
          <details data-faq-id="safe_streams"><summary>Are unofficial streams safe?</summary><p>No. Stay with official event pages, official broadcaster pages, and clearly licensed live TV services instead of APKs or copied mirror sites.</p></details>
          <details data-faq-id="check_cost"><summary>How should I compare cost?</summary><p>Compare the full live access path, not just headline price. Check whether you need extra channels, add-ons, or a separate login layer.</p></details>
          <details data-faq-id="verify_schedule"><summary>Where should I verify schedules and access rules?</summary><p>Use the official event source and the official broadcaster source first, then confirm whether the service you plan to use includes the match windows you need.</p></details>
        </section>
        <section id="email">
          <h2>Get Guide Updates</h2>
          <p>Leave an email if you want a short update when this watch guide is refreshed.</p>
          <form id="emailForm" class="cta-grid">
            <label>
              Email address
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>
            <button class="button" type="submit" data-event="email_submit" data-event-label="{page_slug}_email">Get updates</button>
          </form>
          <p class="note" id="emailResult" aria-live="polite"></p>
        </section>
        <section id="sources">
          <h2>Sources checked</h2>
          <ul class="source-list">
            <li><a href="{context["official_primary_url"]}" data-event="official_link_click" data-event-label="sources_primary" data-click-target="sources_primary" rel="noopener">{context["official_primary_label"]}</a></li>
            <li><a href="{context["official_secondary_url"]}" data-event="official_link_click" data-event-label="sources_secondary" data-click-target="sources_secondary" rel="noopener">{context["official_secondary_label"]}</a></li>
            <li><a href="{context["official_tertiary_url"]}" data-event="official_link_click" data-event-label="sources_tertiary" data-click-target="sources_tertiary" rel="noopener">{context["official_tertiary_label"]}</a></li>
          </ul>
        </section>
      </main>
      <aside class="toc" aria-label="Table of contents">
        <strong>On this page</strong>
        <a href="#watch-finder">Watch finder</a>
        <a href="#compare">Compare paths</a>
        <a href="#official">Official links</a>
        <a href="#sources">Sources</a>
        <a href="#faq">FAQ</a>
      </aside>
    </div>
    <footer>
      <div class="footer-inner">
        <div class="footer-links" aria-label="Site links">
          <a href="../../../arcade-hub/privacy.html">Privacy</a>
          <a href="../../../arcade-hub/terms.html">Terms</a>
          <a href="../../../arcade-hub/contact.html">Contact</a>
        </div>
      </div>
    </footer>
    <script src="../sports-guide.js"></script>
    <script>
      (function () {{
        const form = document.getElementById("watchFinderForm");
        const result = document.getElementById("watchFinderResult");
        const country = document.getElementById("watchCountry");
        const setup = document.getElementById("watchMatch");
        const preference = document.getElementById("watchPreference");
        const track = window.trackSportsGuideEvent || function () {{}};
        let started = false;
        function startInteractionOnce() {{
          if (started) return;
          started = true;
          track("interaction_start", {{ event_label: "watch_finder" }});
          track("watch_finder_start", {{ event_label: "{page_slug}" }});
        }}
        [country, setup, preference].forEach((field) => field.addEventListener("change", startInteractionOnce));
        form.addEventListener("submit", function (event) {{
          event.preventDefault();
          startInteractionOnce();
          const isUS = country.value === "us";
          const mode = setup.value;
          const pref = preference.value;
          let body = "";
          let ctaLabel = "Open official source";
          let ctaHref = "{context["official_primary_url"]}";
          if (!isUS) {{
            body = "Start with the official event source, then verify the licensed broadcaster and service path in your market before comparing bundles.";
          }} else if (mode === "bundle") {{
            body = "If you already have a live TV bundle, confirm that it includes the exact channels or rights you need before adding another app.";
            ctaHref = "{context["official_secondary_url"]}";
            ctaLabel = "Check broadcaster coverage";
          }} else if (mode === "mobile") {{
            body = "For mobile-first viewing, verify sign-in stability, live feed support, and casting before the event window starts.";
          }} else if (mode === "highlights") {{
            body = "If you mainly need clips, schedules, or alerts, stay with official event and broadcaster sources instead of adding a full live subscription.";
          }} else if (pref === "price") {{
            body = "Check whether one official path or your existing bundle already covers the event before opening another trial.";
          }} else {{
            body = "For the safest legal path, compare the official source with one live TV bundle that clearly includes the match windows you need.";
          }}
          result.hidden = false;
          result.innerHTML = "<strong>Recommended next step</strong><p>" + body + "</p><p><a class='button js-finder-official-link' href='" + ctaHref + "' rel='noopener'>" + ctaLabel + "</a></p>";
          const finderLink = result.querySelector(".js-finder-official-link");
          if (finderLink) {{
            finderLink.addEventListener("click", function () {{
              track("official_link_click", {{ event_label: "watch_finder_result_link", click_target: "watch_finder_result_link" }});
              track("streaming_platform_click", {{ event_label: "watch_finder_result_link", click_target: "watch_finder_result_link" }});
            }});
          }}
          track("interaction_complete", {{
            event_label: "watch_finder",
            selected_match: mode,
            selected_preference: pref,
            selected_country: country.value
          }});
          track("watch_finder_complete", {{
            event_label: "{page_slug}",
            selected_match: mode,
            selected_preference: pref,
            selected_country: country.value
          }});
        }});
      }})();
    </script>
  </body>
</html>
"""


def sports_page_html(selected, candidate, today):
    topic = selected["topic"]
    slug = selected["slug"]
    canonical = f"{SITE_URL}/{slug.strip('/')}/"
    page_slug = slug.strip("/").split("/")[-1]
    live_titles = candidate.get("live_signal_titles", [])
    live_title_html = "".join(f"<li>{title}</li>" for title in live_titles[:3])

    if topic == "Best Apps to Watch World Cup 2026":
        return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Best Apps to Watch World Cup 2026 Legally</title>
    <meta
      name="description"
      content="Compare the best legal apps to watch World Cup 2026, including official broadcaster apps, live TV bundles, mobile trade-offs, and what to check before kickoff."
    />
    <link rel="canonical" href="{canonical}" />
    <meta property="og:site_name" content="89 Sports Guide" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="Best Apps to Watch World Cup 2026 Legally" />
    <meta property="og:description" content="A practical World Cup 2026 app guide covering official broadcaster apps, live TV bundles, mobile use, and legal viewing trade-offs." />
    <meta property="og:url" content="{canonical}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Best Apps to Watch World Cup 2026 Legally" />
    <meta name="twitter:description" content="Compare legal World Cup 2026 app options, official sources, mobile caveats, and bundle trade-offs before match day." />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5502975373459743" crossorigin="anonymous"></script>
    <script src="../../../arcade-hub/tracking-config.js?v=5"></script>
    <script src="../../../arcade-hub/site-utils.js?v=14"></script>
    <link rel="stylesheet" href="../sports-guide.css" />
    <script type="application/ld+json">
      {{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Best Apps to Watch World Cup 2026 Legally",
        "description": "A practical guide to comparing legal World Cup 2026 app options, official broadcaster apps, and live TV bundle trade-offs.",
        "author": {{ "@type": "Organization", "name": "89 Sports Guide" }},
        "publisher": {{ "@type": "Organization", "name": "89 Sports Guide" }},
        "datePublished": "{today}",
        "dateModified": "{today}",
        "mainEntityOfPage": {{
          "@type": "WebPage",
          "@id": "{canonical}"
        }}
      }}
    </script>
    <script type="application/ld+json">
      {{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {{
            "@type": "Question",
            "name": "What is the best app to watch World Cup 2026?",
            "acceptedAnswer": {{
              "@type": "Answer",
              "text": "The best app depends on your country, whether you already pay for a live TV bundle, and whether you need mobile-only access or a full living-room setup."
            }}
          }},
          {{
            "@type": "Question",
            "name": "Can I watch World Cup 2026 without cable?",
            "acceptedAnswer": {{
              "@type": "Answer",
              "text": "Often yes, but the right no-cable option depends on official broadcaster rights in your market and whether your streaming plan includes the needed live channels."
            }}
          }},
          {{
            "@type": "Question",
            "name": "Do official broadcaster apps show every match live?",
            "acceptedAnswer": {{
              "@type": "Answer",
              "text": "Not always. Some apps depend on TV-provider login or market-specific rights, so confirm the match listing and sign-in rules before kickoff."
            }}
          }},
          {{
            "@type": "Question",
            "name": "Which app is best for mobile World Cup viewing?",
            "acceptedAnswer": {{
              "@type": "Answer",
              "text": "Mobile-first viewers should start with the official broadcaster app that holds rights in their market, then verify live access and device compatibility."
            }}
          }},
          {{
            "@type": "Question",
            "name": "Are free World Cup streaming apps safe?",
            "acceptedAnswer": {{
              "@type": "Answer",
              "text": "Only official broadcaster apps or officially licensed services should be treated as safe and legal. Avoid unclear APKs, fake stream apps, and copied mirror sites."
            }}
          }},
          {{
            "@type": "Question",
            "name": "Should I use a live TV bundle or a single app?",
            "acceptedAnswer": {{
              "@type": "Answer",
              "text": "If you want broad tournament coverage, a live TV bundle is usually safer. If you only need one market or one official broadcaster path, a single app may be enough."
            }}
          }}
        ]
      }}
    </script>
  </head>
  <body
    data-landing-name="best_apps_watch_world_cup_2026"
    data-page-category="sports_comparison_guide"
    data-page-type="sports_comparison_guide"
    data-topic="best_apps_watch_world_cup_2026"
    data-intent="world_cup_app_comparison"
    data-content-format="seo_sports_guide"
    data-monetization-model="mixed"
    data-keyword-stage="organic_validation"
    data-page-slug="{page_slug}"
  >
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="../../../index.html" data-event="guide_cta_click" data-event-label="site_home" data-click-target="site_home">
          <strong>89 Sports Guide</strong>
          <span>Live watch guides</span>
        </a>
        <nav aria-label="Page navigation">
          <a href="#app-finder">App finder</a>
          <a href="#table">Compare apps</a>
          <a href="#official">Official links</a>
          <a href="#sources">Sources</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
    </header>

    <section class="hero">
      <div class="hero-inner">
        <div>
          <p class="eyebrow">World Cup App Guide</p>
          <h1>Best Apps to Watch World Cup 2026 Legally</h1>
          <p class="lede">
            If you want the cleanest World Cup 2026 app setup, start with the official broadcaster in your market, then decide whether you need a single app, a live TV bundle, or a mobile-first fallback.
          </p>
          <div class="short-answer">
            <strong>Short answer</strong>
            <p>
              The best World Cup 2026 app is not one universal app. It depends on your country, whether you already pay for a live TV bundle, and whether you need full tournament coverage or just a simpler mobile path. For most U.S. viewers, the real decision is usually between an official broadcaster app, a live TV bundle app that includes the needed channels, and official highlights or schedule apps for backup planning. Before kickoff, confirm rights, login rules, local channel coverage, and device support.
            </p>
          </div>
          <p class="meta-note">Last checked: {today}</p>
        </div>

        <aside class="tool-card" aria-label="App path finder">
          <header>
            <strong>App Path Finder</strong>
            <p>Pick your setup first. That usually narrows the best legal app faster than comparing brand names in the abstract.</p>
          </header>
          <div class="mini-picks">
            <div class="mini-pick">
              <strong>Use the official broadcaster first</strong>
              <span>That is the cleanest way to avoid fake apps and dead links.</span>
            </div>
            <div class="mini-pick">
              <strong>Bundle users should check channel coverage</strong>
              <span>A cheap app is not useful if it misses the main match windows.</span>
            </div>
            <div class="hero-actions">
              <a class="button js-official-link" href="https://www.fifa.com/" data-event="primary_cta_click" data-event-label="official_world_cup_schedule_primary" data-click-target="official_world_cup_schedule_primary" rel="noopener">Open official World Cup source</a>
              <a class="button secondary" href="#app-finder" data-event="secondary_cta_click" data-event-label="use_app_finder" data-click-target="use_app_finder_secondary">Use the app finder</a>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <div class="page-shell">
      <main>
        <section id="app-finder">
          <h2>Quick App Finder</h2>
          <p>Use this to narrow your legal watch path before you compare apps or start free trials.</p>
          <form id="watchFinderForm">
            <div class="finder-grid">
              <label>
                Country or market
                <select id="watchCountry" name="country">
                  <option value="us" selected>United States</option>
                  <option value="other">Outside the United States</option>
                </select>
              </label>
              <label>
                Viewing setup
                <select id="watchMatch" name="match">
                  <option value="streaming" selected>Streaming only</option>
                  <option value="bundle">Already have a live TV bundle</option>
                  <option value="mobile">Mostly mobile viewing</option>
                  <option value="highlights">Need official highlights and schedule only</option>
                </select>
              </label>
              <label>
                Priority
                <select id="watchPreference" name="preference">
                  <option value="coverage" selected>Broad coverage</option>
                  <option value="price">Lower monthly cost</option>
                  <option value="simplicity">Simpler setup</option>
                  <option value="travel">Travel or temporary use</option>
                </select>
              </label>
            </div>
            <div class="hero-actions">
              <button class="button" type="submit">Show legal app path</button>
            </div>
          </form>
          <div class="finder-result" id="watchFinderResult" hidden aria-live="polite"></div>
        </section>

        <section id="table">
          <h2>World Cup App Options at a Glance</h2>
          <table class="comparison-table">
            <thead>
              <tr>
                <th>App type</th>
                <th>Best for</th>
                <th>What to check</th>
                <th>Main trade-off</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Official broadcaster app</td>
                <td>Fans who want the cleanest official match path</td>
                <td>Live access rules, TV-provider login, and market rights</td>
                <td>Not every official app works the same way in every country</td>
              </tr>
              <tr>
                <td>Live TV bundle app</td>
                <td>Viewers who want broader tournament coverage</td>
                <td>Included sports channels, local channel access, and trial terms</td>
                <td>Usually costs more than a single app</td>
              </tr>
              <tr>
                <td>Broadcaster highlights or schedule app</td>
                <td>Fans who mainly need clips, schedules, and reminders</td>
                <td>Whether full live viewing is included or not</td>
                <td>Often not enough for full-match coverage</td>
              </tr>
              <tr>
                <td>Mobile-first app setup</td>
                <td>Users who mainly watch on phone or tablet</td>
                <td>Device support, casting limits, and login persistence</td>
                <td>Living-room viewing can feel weaker</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="guide">
          <h2>How to Choose More Efficiently</h2>
          <div class="step-list">
            <article class="step">
              <h3>1. Start from rights, not app-store rankings</h3>
              <p>The best-looking app listing is useless if it does not hold the legal match rights in your market. Start from the official tournament and broadcaster pages first.</p>
            </article>
            <article class="step">
              <h3>2. Decide whether you need full coverage or just the key matches</h3>
              <p>If you only care about a smaller set of matches, a simpler official app path can be enough. If you expect to follow the whole tournament, broader channel coverage matters more.</p>
            </article>
            <article class="step">
              <h3>3. Check sign-in rules before match day</h3>
              <p>Some broadcaster apps feel straightforward until the match starts and the app asks for a TV-provider login or account link you did not prepare in advance.</p>
            </article>
            <article class="step">
              <h3>4. Treat mobile and TV as different use cases</h3>
              <p>A good mobile app can still be weak for family or big-screen viewing. If you care about both, test the real device flow before the tournament gets busy.</p>
            </article>
          </div>
        </section>

        <section id="signals">
          <h2>Why This Topic Was Surfacing</h2>
          <div class="callout">
            <strong>Recent signal pattern</strong>
            <p>This page was prioritized because recent source signals clustered around legal World Cup watch paths, streaming apps, and no-cable viewing decisions.</p>
            <ul>
              {live_title_html}
            </ul>
          </div>
        </section>

        <section id="official">
          <h2>Official Sources to Check</h2>
          <div class="link-list">
            <a class="js-schedule-source js-official-link" href="https://www.fifa.com/" data-event="schedule_source_click" data-event-label="official_fifa_home" data-click-target="official_fifa_home" rel="noopener">Official FIFA tournament page</a>
            <a class="js-schedule-source js-official-link" href="https://www.foxsports.com/soccer/fifa-world-cup" data-event="schedule_source_click" data-event-label="official_fox_world_cup" data-click-target="official_fox_world_cup" rel="noopener">Official FOX World Cup page</a>
            <a class="js-schedule-source js-official-link" href="https://www.telemundo.com/deportes/futbol" data-event="schedule_source_click" data-event-label="official_telemundo_futbol" data-click-target="official_telemundo_futbol" rel="noopener">Official Telemundo Deportes football page</a>
            <a class="js-official-link" href="https://tv.youtube.com/" data-event="official_link_click" data-event-label="official_youtube_tv" data-click-target="official_youtube_tv" rel="noopener">Official YouTube TV</a>
            <a class="js-official-link" href="https://www.hulu.com/live-tv" data-event="official_link_click" data-event-label="official_hulu_live" data-click-target="official_hulu_live" rel="noopener">Official Hulu + Live TV</a>
            <a class="js-official-link" href="https://www.fubo.tv/" data-event="official_link_click" data-event-label="official_fubo" data-click-target="official_fubo" rel="noopener">Official Fubo</a>
          </div>
        </section>

        <section id="related">
          <h2>Related Guides</h2>
          <div class="card-grid">
            <a class="decision-card" href="/guides/sports/world-cup-games-today/" data-event="related_guide_click" data-event-label="related_world_cup_games_today" data-click-target="related_world_cup_games_today" data-preserve-params="true">World Cup Games Today: Where to Watch Legally</a>
            <a class="decision-card" href="/guides/sports/where-to-watch-world-cup-2026/" data-event="related_guide_click" data-event-label="related_where_to_watch_world_cup_2026" data-click-target="related_where_to_watch_world_cup_2026" data-preserve-params="true">Where to Watch World Cup 2026</a>
            <a class="decision-card" href="/guides/sports/watch-football-without-cable/" data-event="related_guide_click" data-event-label="related_watch_football_without_cable" data-click-target="related_watch_football_without_cable" data-preserve-params="true">Best Apps to Watch Football Without Cable</a>
          </div>
        </section>

        <section id="cta">
          <h2>Before You Open a Trial</h2>
          <div class="callout">
            <strong>Check the real match path first.</strong>
            <p>For tournament viewing, the highest-friction problems usually come from rights, local channels, or last-minute login issues, not from the app brand itself.</p>
            <div class="hero-actions">
              <a class="button js-official-link" href="https://www.fifa.com/" data-event="primary_cta_click" data-event-label="official_schedule_cta_bottom" data-click-target="official_schedule_cta_bottom" rel="noopener">Open official schedule source</a>
              <a class="button secondary" href="https://www.foxsports.com/soccer/fifa-world-cup" data-event="secondary_cta_click" data-event-label="official_broadcaster_cta_bottom" data-click-target="official_broadcaster_cta_bottom" rel="noopener">Check broadcaster coverage</a>
            </div>
          </div>
        </section>

        <section id="faq">
          <h2>FAQ</h2>
          <details data-faq-id="best_world_cup_app">
            <summary>What is the best app to watch World Cup 2026?</summary>
            <p>The best app depends on your country, your existing subscription setup, and whether you need full tournament coverage or a smaller mobile-first watch path.</p>
          </details>
          <details data-faq-id="world_cup_without_cable">
            <summary>Can I watch World Cup 2026 without cable?</summary>
            <p>Yes in many markets, but the right option depends on official broadcaster rights and whether your streaming plan includes the needed live channels.</p>
          </details>
          <details data-faq-id="official_app_vs_bundle">
            <summary>Should I use an official broadcaster app or a live TV bundle?</summary>
            <p>If you want broad coverage, a live TV bundle is usually safer. If you only need one rights holder or one narrow setup, a single app may be enough.</p>
          </details>
          <details data-faq-id="world_cup_mobile_viewing">
            <summary>Is mobile viewing enough for World Cup matches?</summary>
            <p>It can be, but you should verify device support, casting options, and whether the app keeps live access stable on the devices you actually use.</p>
          </details>
          <details data-faq-id="free_world_cup_apps">
            <summary>Are free World Cup streaming apps safe?</summary>
            <p>Only official broadcaster apps or officially licensed services should be trusted. Avoid unclear APKs, fake app-store listings, and copied stream apps.</p>
          </details>
          <details data-faq-id="world_cup_schedule_source">
            <summary>Where should I verify the match schedule?</summary>
            <p>Use the official FIFA tournament source and the official broadcaster page for your market before kickoff.</p>
          </details>
        </section>

        <section id="email">
          <h2>Get Guide Updates</h2>
          <p>Leave an email if you want a short reminder when this World Cup app guide or related watch pages are refreshed.</p>
          <form id="emailForm" class="cta-grid">
            <label>
              Email address
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>
            <button class="button" type="submit" data-event="email_submit" data-event-label="best_apps_world_cup_email">Get updates</button>
          </form>
          <p class="note" id="emailResult" aria-live="polite"></p>
        </section>

        <section id="sources">
          <h2>Sources checked</h2>
          <ul class="source-list">
            <li><a href="https://www.fifa.com/" data-event="official_link_click" data-event-label="sources_fifa" data-click-target="sources_fifa" rel="noopener">FIFA official tournament source</a></li>
            <li><a href="https://www.foxsports.com/soccer/fifa-world-cup" data-event="official_link_click" data-event-label="sources_fox_world_cup" data-click-target="sources_fox_world_cup" rel="noopener">FOX Sports World Cup page</a></li>
            <li><a href="https://www.telemundo.com/deportes/futbol" data-event="official_link_click" data-event-label="sources_telemundo" data-click-target="sources_telemundo" rel="noopener">Telemundo Deportes football page</a></li>
            <li><a href="https://tv.youtube.com/" data-event="official_link_click" data-event-label="sources_youtube_tv" data-click-target="sources_youtube_tv" rel="noopener">YouTube TV official site</a></li>
          </ul>
        </section>
      </main>

      <aside class="toc" aria-label="Table of contents">
        <strong>On this page</strong>
        <a href="#app-finder">App finder</a>
        <a href="#table">Compare apps</a>
        <a href="#official">Official links</a>
        <a href="#sources">Sources</a>
        <a href="#faq">FAQ</a>
      </aside>
    </div>

    <footer>
      <div class="footer-inner">
        <div class="footer-links" aria-label="Site links">
          <a href="../../../arcade-hub/privacy.html">Privacy</a>
          <a href="../../../arcade-hub/terms.html">Terms</a>
          <a href="../../../arcade-hub/contact.html">Contact</a>
        </div>
      </div>
    </footer>

    <script src="../sports-guide.js"></script>
    <script>
      (function () {{
        const form = document.getElementById("watchFinderForm");
        const result = document.getElementById("watchFinderResult");
        const country = document.getElementById("watchCountry");
        const setup = document.getElementById("watchMatch");
        const preference = document.getElementById("watchPreference");
        const track = window.trackSportsGuideEvent || function () {{}};
        let started = false;

        function startInteractionOnce() {{
          if (started) return;
          started = true;
          track("interaction_start", {{ event_label: "watch_finder" }});
          track("watch_finder_start", {{ event_label: "{page_slug}" }});
        }}

        [country, setup, preference].forEach((field) => {{
          field.addEventListener("change", startInteractionOnce);
        }});

        form.addEventListener("submit", function (event) {{
          event.preventDefault();
          startInteractionOnce();

          const isUS = country.value === "us";
          const mode = setup.value;
          const pref = preference.value;
          let body = "";
          let ctaLabel = "Open official World Cup source";
          let ctaHref = "https://www.fifa.com/";

          if (!isUS) {{
            body = "Start with the official tournament source, then verify the licensed broadcaster and app path in your country before comparing bundles.";
          }} else if (mode === "bundle") {{
            body = "If you already have a live TV bundle, confirm that it includes the right World Cup channels in your market before downloading another app.";
            ctaHref = "https://www.foxsports.com/soccer/fifa-world-cup";
            ctaLabel = "Check official broadcaster page";
          }} else if (mode === "mobile") {{
            body = "For mobile-first viewing, use the official broadcaster app first and verify sign-in and casting support before kickoff.";
            ctaHref = "https://www.foxsports.com/soccer/fifa-world-cup";
            ctaLabel = "Check official app path";
          }} else if (mode === "highlights") {{
            body = "If you only need official clips and schedules, stay with the official tournament and broadcaster sources instead of opening a full live TV subscription.";
          }} else if (pref === "price") {{
            body = "Start by checking whether one official broadcaster app already covers your main matches. If not, compare the smallest live TV bundle that still includes the needed channels.";
          }} else {{
            body = "For the broadest legal setup, compare the official broadcaster app against one live TV bundle app that includes the main World Cup channels you need.";
            ctaHref = "https://www.foxsports.com/soccer/fifa-world-cup";
            ctaLabel = "Check official broadcaster coverage";
          }}

          result.hidden = false;
          result.innerHTML =
            "<strong>Recommended next step</strong>" +
            "<p>" + body + "</p>" +
            "<p><a class='button js-finder-official-link' href='" + ctaHref + "' rel='noopener'>" + ctaLabel + "</a></p>";

          const finderLink = result.querySelector(".js-finder-official-link");
          if (finderLink) {{
            finderLink.addEventListener("click", function () {{
              track("official_link_click", {{
                event_label: "watch_finder_result_link",
                click_target: "watch_finder_result_link"
              }});
              track("streaming_platform_click", {{
                event_label: "watch_finder_result_link",
                click_target: "watch_finder_result_link"
              }});
            }});
          }}

          track("interaction_complete", {{
            event_label: "watch_finder",
            selected_match: mode,
            selected_preference: pref,
            selected_country: country.value
          }});
          track("watch_finder_complete", {{
            event_label: "{page_slug}",
            selected_match: mode,
            selected_preference: pref,
            selected_country: country.value
          }});
        }});
      }})();
    </script>
  </body>
</html>
"""
    if selected.get("page_type") in {"sports_watch_guide", "sports_comparison_guide"}:
        return generic_sports_watch_html(selected, candidate, today)
    raise SystemExit(f"Unsupported selected topic for builder: {topic}")


def write_page(selected, candidate):
    page_path = ROOT / selected["slug"].strip("/") / "index.html"
    page_path.parent.mkdir(parents=True, exist_ok=True)
    html = sports_page_html(selected, candidate, str(date.today()))
    page_path.write_text(html, encoding="utf-8")
    return page_path


def ensure_sitemap_entry(slug):
    path = "guides/sports/" + slug.strip("/").split("/")[-1] + "/"
    script_text = SITEMAP_SCRIPT.read_text(encoding="utf-8")
    if path in script_text:
        return False

    marker = '    ("guides/sports/world-cup-games-today/", "0.8", "daily"),\n'
    insertion = marker + f'    ("{path}", "0.8", "weekly"),\n'
    if marker not in script_text:
        raise SystemExit("Could not find sitemap insertion marker.")
    updated = script_text.replace(marker, insertion, 1)
    SITEMAP_SCRIPT.write_text(updated, encoding="utf-8")
    return True


def regenerate_sitemap():
    result = subprocess.run(
        ["python3", str(SITEMAP_SCRIPT)],
        cwd=str(ROOT),
        env={"SITE_URL": SITE_URL, "SITEMAP_LASTMOD": str(date.today())},
        capture_output=True,
        text=True,
        check=True,
    )
    return result.stdout.strip()


def main():
    parser = argparse.ArgumentParser(description="Build the selected topic page for the closed-loop trial.")
    parser.add_argument("--table", default=str(DEFAULT_TABLE), help="Path to candidate-table.json")
    args = parser.parse_args()

    data = json.loads(Path(args.table).read_text(encoding="utf-8"))
    selected = data.get("selected_topic")
    if not selected:
        raise SystemExit("candidate-table.json is missing selected_topic.")

    candidate = get_candidate(data, selected["topic"])
    page_path = write_page(selected, candidate)
    sitemap_added = ensure_sitemap_entry(selected["slug"])
    sitemap_output = regenerate_sitemap()

    print(json.dumps({
        "selected_topic": selected["topic"],
        "page_path": str(page_path),
        "sitemap_added": sitemap_added,
        "sitemap_output": sitemap_output,
    }, indent=2))


if __name__ == "__main__":
    main()
