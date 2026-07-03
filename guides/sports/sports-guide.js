(function () {
  const trackedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "matchtype", "country", "page_type", "creative_id", "experiment_id", "landing_name"];
  const searchParams = new URLSearchParams(window.location.search);
  const attribution = {};
  const body = document.body;

  const defaultContext = {
    landing_name: body.dataset.landingName || body.dataset.pageSlug || "sports_guide",
    page_category: body.dataset.pageCategory || "sports_guide",
    page_type: searchParams.get("page_type") || body.dataset.pageType || "sports_comparison_guide",
    landing_type: searchParams.get("page_type") || body.dataset.pageType || "sports_comparison_guide",
    content_type: body.dataset.pageCategory || "sports_guide",
    topic: body.dataset.topic || "sports_streaming",
    intent: body.dataset.intent || "sports_comparison",
    content_format: body.dataset.contentFormat || "seo_sports_guide",
    monetization_model: body.dataset.monetizationModel || "mixed",
    keyword_stage: body.dataset.keywordStage || "organic_validation",
    experiment_id: searchParams.get("experiment_id") || body.dataset.pageSlug || "sports_guide",
    creative_id: searchParams.get("creative_id") || searchParams.get("utm_content") || "",
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
    page_slug: body.dataset.pageSlug || ""
  };

  trackedParams.forEach((key) => {
    if (searchParams.has(key)) attribution[key] = searchParams.get(key);
  });

  const pageContext = Object.assign({}, defaultContext, attribution, {
    landing_name: attribution.landing_name || defaultContext.landing_name,
    page_type: attribution.page_type || defaultContext.page_type,
    landing_type: attribution.page_type || defaultContext.landing_type,
    experiment_id: attribution.experiment_id || defaultContext.experiment_id,
    creative_id: attribution.creative_id || defaultContext.creative_id
  });

  window.sportsGuideAttribution = pageContext;
  window.dataLayer = window.dataLayer || [];

  if (window.ArcadeHubAnalytics) {
    window.ArcadeHubAnalytics.setContext(pageContext);
  }

  function track(eventName, detail) {
    const payload = Object.assign({}, pageContext, detail || {}, {
      event_label: detail && detail.event_label ? detail.event_label : "",
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
      page_slug: pageContext.page_slug
    });

    if (window.ArcadeHubAnalytics) {
      window.ArcadeHubAnalytics.track(eventName, payload);
    } else {
      window.dataLayer.push(Object.assign({ event: eventName, arcade_event: eventName }, payload));
      if (typeof window.gtag === "function") window.gtag("event", eventName, payload);
    }
  }

  window.trackSportsGuideEvent = track;
  track("page_view", { event_label: pageContext.page_slug || "sports_guide" });

  document.querySelectorAll("a[data-preserve-params='true']").forEach((link) => {
    if (!searchParams.toString()) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    try {
      const url = new URL(href, window.location.origin);
      trackedParams.forEach((key) => {
        if (searchParams.has(key) && !url.searchParams.has(key)) {
          url.searchParams.set(key, searchParams.get(key));
        }
      });
      const isSameOrigin = url.origin === window.location.origin;
      link.href = isSameOrigin ? url.pathname + url.search + url.hash : url.toString();
    } catch (error) {
      console.warn("Could not preserve params for link", href, error);
    }
  });

  document.querySelectorAll("[data-event]").forEach((element) => {
    element.addEventListener("click", () => {
      const eventName = element.getAttribute("data-event");
      if (!eventName) return;
      track(eventName, {
        event_label: element.getAttribute("data-event-label") || element.textContent.trim().slice(0, 80),
        click_target: element.getAttribute("data-click-target") || "",
        content_type: element.getAttribute("data-content-type") || "",
        platform: element.getAttribute("data-platform") || "",
        section: element.getAttribute("data-section") || ""
      });
    });
  });

  document.querySelectorAll("details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;
      track("faq_expand", {
        event_label: detail.getAttribute("data-faq-id") || (detail.querySelector("summary") ? detail.querySelector("summary").textContent.trim() : "faq")
      });
    });
  });

  const emailForm = document.getElementById("emailForm");
  if (emailForm) {
    emailForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const result = document.getElementById("emailResult");
      if (result) {
        result.textContent = "Thanks. This form is ready for an email provider connection.";
      }
      track("email_submit", {
        event_label: body.dataset.pageSlug || "sports_email_capture",
        form_name: "email_capture"
      });
    });
  }

  const scrollMarks = { 50: false, 90: false };
  function handleScrollTracking() {
    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    const pct = (window.scrollY / total) * 100;
    if (!scrollMarks[50] && pct >= 50) {
      scrollMarks[50] = true;
      track("scroll_50", { event_label: body.dataset.pageSlug || "sports_guide" });
    }
    if (!scrollMarks[90] && pct >= 90) {
      scrollMarks[90] = true;
      track("scroll_90", { event_label: body.dataset.pageSlug || "sports_guide" });
    }
  }

  document.addEventListener("scroll", handleScrollTracking, { passive: true });
  handleScrollTracking();

  document.querySelectorAll(".adsbygoogle").forEach(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.warn("Adsbygoogle push skipped", error);
    }
  });
})();
