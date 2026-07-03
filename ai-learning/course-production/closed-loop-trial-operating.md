# Closed-Loop Trial Operating Guide

## Purpose

This document defines how one real SEO/GEO trial loop runs on `89gameshub.com`.

The goal is not to publish many pages. The goal is to prove that this system can repeatedly:

1. find candidate topics from live or durable sources
2. score them with one method
3. select one topic without manually pre-picking it
4. create or update one useful page
5. attach tracking and source freshness
6. publish through the current repo flow
7. review 24h, 3d, and 7d signals
8. improve the next round based on what happened

## Current Constraints

- Trial date: `2026-07-02`
- First execution lane: `guides/sports/`
- Template base:
  - `guides/sports/sports-guide.css`
  - `guides/sports/sports-guide.js`
  - `guides/sports/watch-nfl-games-today/index.html`
- Sitemap publishing hook:
  - `arcade-hub/scripts/generate_sitemap.py`
- Current tracking state is fragmented across Apps, Sports, and Learning guides, so this first loop stays inside one cluster instead of trying to unify the whole site first.

## Loop Stages

### Stage 1: Candidate discovery

Pull 10-20 candidate topics from at least three source types:

- live trend or recent news signals
- official event or platform windows
- historical paid keyword or stable evergreen demand

Use the candidate table artifact:

- `ai-learning/course-production/candidate-table.json`
- scoring script: `ai-learning/course-production/score_candidate_table.py`
- trial QA/report script: `ai-learning/course-production/run_closed_loop_trial.py`
- collector script: `ai-learning/course-production/trend_collector.py`
- builder script: `ai-learning/course-production/build_selected_topic.py`
- orchestrator script: `ai-learning/course-production/orchestrate_closed_loop_trial.py`
- source config: `ai-learning/course-production/trend-source-config.json`
- BigQuery fetcher: `ai-learning/course-production/google_trends_fetch.py`
- BigQuery candidate builder: `ai-learning/course-production/google_trends_candidate_builder.py`
- bounded SQL: `ai-learning/course-production/google_trends_cluster_seed.sql`

Rules:

- do not pre-select a topic before the table exists
- do not treat social posts as factual authority
- do not include topics with weak monetization or high factual risk unless there is a strategic reason

### Stage 2: Scoring

Each candidate gets a score out of 100:

```text
trend_score =
  25 * trend_strength
+ 20 * intent_clarity
+ 20 * commercial_value
+ 15 * page_reusability
+ 10 * geo_citation_fit
+ 10 * risk_safety
```

Each sub-score is `0-1`.

Decision thresholds:

- `80+` -> build or update now
- `65-79` -> watch or hold as secondary
- `<65` -> skip unless there is a clear strategic reason

### Stage 3: Topic selection

Selection rule:

- choose the highest-scoring candidate in the current run
- if two scores are close, prefer the topic with better reusability and lower factual risk
- document why the selected topic won and why the next two topics did not

### Stage 4: Page-type choice

Allowed page types:

- `update_page`
- `new_realtime_page`
- `evergreen_expansion_page`

Questions to answer:

- is there already a related page on the site?
- does the query require a "today" or freshness layer?
- can the page become evergreen after the event window?

### Stage 5: Page build

Every trial page must include:

- H1
- Short Answer
- visible `Last checked`
- visible `Sources checked`
- one useful table
- one lightweight interaction
- primary CTA
- secondary CTA
- Related Guides
- FAQ
- Article + FAQ schema

Interaction rules:

- useful without blocking static reading
- tracked with explicit event names
- leads to a sensible CTA

### Stage 6: Publish

Current publish flow:

1. add the new URL to `arcade-hub/scripts/generate_sitemap.py`
2. regenerate `sitemap.xml`
3. local QA for content, links, and interaction
4. commit only the intended files
5. push `main`

## Current Commands

Score and rank the candidate table:

```bash
python3 ai-learning/course-production/score_candidate_table.py --write
```

Run the current trial QA/report check:

```bash
python3 ai-learning/course-production/run_closed_loop_trial.py --write
```

Run the minimal end-to-end trial chain in seed mode:

```bash
python3 ai-learning/course-production/orchestrate_closed_loop_trial.py --seed-only
```

Run the Google Trends BigQuery path after exporting or fetching recent rows:

```bash
python3 ai-learning/course-production/orchestrate_closed_loop_trial.py \
  --trial-date 2026-07-03 \
  --bigquery-results-file ai-learning/course-production/google-trends-rows.json
```

Fetch bounded rows directly from BigQuery when the environment is ready:

```bash
python3 ai-learning/course-production/google_trends_fetch.py \
  --project-id my-project-web-501309 \
  --sql-file ai-learning/course-production/google_trends_cluster_seed.sql \
  --output ai-learning/course-production/google-trends-rows.json
```

Run the collector with prefetched live signals:

```bash
python3 ai-learning/course-production/orchestrate_closed_loop_trial.py \
  --trial-date 2026-07-03 \
  --signals-file ai-learning/course-production/mock-live-signals.json
```

Collector output now includes:

- `collection_summary`
- per-source `items` with title, link, published_at
- deduped live items
- `live_matches` with matched terms and source names
- candidate-level `live_signal_hits`, `live_signal_sources`, and `live_signal_titles`
- `pending_build` status when a newly selected topic does not have a page yet

Build the currently selected topic page:

```bash
python3 ai-learning/course-production/build_selected_topic.py
```

### Stage 7: Measurement

#### 24-hour check

- page loads correctly
- source links still work
- tracking events fire
- sitemap includes the URL
- no factual correction is immediately needed

#### 3-day check

- indexed or discovered
- impressions
- clicks
- CTR
- scroll depth
- interaction start / completion
- primary CTA and official link clicks

#### 7-day decision

- if impressions + clicks + interaction exist -> expand cluster
- if impressions but low CTR -> rewrite title, meta, and Short Answer
- if clicks but weak interaction -> move or simplify the tool module
- if interaction but weak outbound -> improve result copy and CTA
- if no impressions -> review topic choice, internal links, and page quality before building more pages in that lane

## Agent Split For Each Loop

### Agent A: Source scout

Output:

- source list
- 10-20 raw candidates
- short notes on why each topic is appearing now

### Agent B: Scoring analyst

Output:

- scored candidate table
- selected topic
- short rationale for the top three

### Agent C: Page strategist

Output:

- page type
- slug
- CTA pair
- interaction module choice
- internal links

### Agent D: Builder

Output:

- page implementation
- source links
- tracking attributes
- schema

### Agent E: QA and measurement

Output:

- QA checklist result
- event checklist
- 24h / 3d / 7d review plan

## First Trial Decision

For the `2026-07-02` run, the first artifact is the candidate table. The page does not get selected until the scored table is reviewed.

As of this run, the leading cluster is still `guides/sports/` because:

- it has the cleanest reusable page shell
- it already has a shared CSS/JS stack
- the legal source model is clearer than finance or app-status pages
- time-sensitive sports watch intent is easier to verify against official sources

## Exit Criteria

This loop counts as complete only when all of the following exist:

- candidate table
- scored selection
- one created or updated page
- tracking attached
- sitemap updated
- QA note
- 24h / 3d / 7d measurement plan
