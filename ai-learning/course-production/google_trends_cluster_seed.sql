-- Google Trends bounded seed query
-- Purpose:
-- 1. Read only recent partitions to avoid full-table scans.
-- 2. Normalize the 4 public Google Trends tables into one stable shape.
-- 3. Leave topic clustering and page routing to Python, where iteration is easier.
--
-- Important:
-- Keep the refresh_date partition filter. Do not remove it.

WITH bounded_terms AS (
  SELECT
    'top_terms' AS source_table,
    refresh_date,
    'domestic' AS geo_scope,
    term,
    rank
  FROM `bigquery-public-data.google_trends.top_terms`
  WHERE refresh_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)

  UNION ALL

  SELECT
    'top_rising_terms' AS source_table,
    refresh_date,
    'domestic' AS geo_scope,
    term,
    rank
  FROM `bigquery-public-data.google_trends.top_rising_terms`
  WHERE refresh_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)

  UNION ALL

  SELECT
    'international_top_terms' AS source_table,
    refresh_date,
    'international' AS geo_scope,
    term,
    rank
  FROM `bigquery-public-data.google_trends.international_top_terms`
  WHERE refresh_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)

  UNION ALL

  SELECT
    'international_top_rising_terms' AS source_table,
    refresh_date,
    'international' AS geo_scope,
    term,
    rank
  FROM `bigquery-public-data.google_trends.international_top_rising_terms`
  WHERE refresh_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
),
normalized_terms AS (
  SELECT
    refresh_date,
    source_table,
    geo_scope,
    term,
    LOWER(TRIM(term)) AS term_lc,
    CAST(rank AS INT64) AS rank
  FROM bounded_terms
  WHERE term IS NOT NULL
),
clustered_terms AS (
  SELECT
    refresh_date,
    source_table,
    geo_scope,
    term,
    term_lc,
    rank,
    CASE
      WHEN REGEXP_CONTAINS(term_lc, r'(world cup|fifa|uefa|\bnfl\b|\bnba\b|\bmlb\b|\bnhl\b|wimbledon|\bufc\b|espn|fox sports|telemundo|where to watch|watch .* live|stream .* live|without cable|live sports)') THEN 'sports'
      WHEN REGEXP_CONTAINS(term_lc, r'(whatsapp|telegram|cash app|paypal|venmo|zelle|paybyphone|parkmobile|waze|google maps|signal app|login|verification code|not sending code|app not working|download app|official app)') THEN 'apps'
      WHEN REGEXP_CONTAINS(term_lc, r'(paypal|cash app|venmo|zelle|payment|refund|pending payment|bank transfer|wire transfer|money transfer)') THEN 'payment'
      WHEN REGEXP_CONTAINS(term_lc, r'(netflix|hulu|fubo|youtube tv|sling|disney\\+|prime video|peacock|streaming app|watch live)') THEN 'streaming_media'
      WHEN REGEXP_CONTAINS(term_lc, r'(paybyphone|parkmobile|parking|flight|airport|hotel|uber|lyft|maps|navigation|traffic|commute)') THEN 'travel_mobility'
      WHEN REGEXP_CONTAINS(term_lc, r'(duolingo|coursera|udemy|ielts|toefl|study app|learning app|english speaking|math app)') THEN 'education_learning'
      WHEN REGEXP_CONTAINS(term_lc, r'(deal|coupon|discount|cheap plan|phone plan|trade in|buy now pay later|best phone|prepaid plan|family plan|senior plan)') THEN 'commerce_deals'
      WHEN REGEXP_CONTAINS(term_lc, r'(steam|xbox|playstation|\bps5\b|nintendo|roblox|fortnite|minecraft|game pass)') THEN 'gaming'
      ELSE 'other'
    END AS topic_cluster
  FROM normalized_terms
)
SELECT
  DISTINCT
  refresh_date,
  source_table,
  geo_scope,
  topic_cluster,
  term,
  rank
FROM clustered_terms
WHERE topic_cluster != 'other'
  AND LENGTH(term_lc) BETWEEN 4 AND 80
  AND REGEXP_CONTAINS(term_lc, r'[a-z]')
  AND rank <= 25
  AND NOT REGEXP_CONTAINS(term_lc, r'(lottery|หวย|weather|temperature|translate|meaning of|definition of)')
ORDER BY refresh_date DESC, rank ASC, source_table ASC
LIMIT 500;
