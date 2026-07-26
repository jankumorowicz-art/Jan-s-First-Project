# Tavily vs. the alternatives

An interactive, talk-track-ready walkthrough of how teams give AI agents web
access, and how each road compares with **Tavily** (Search, Extract, Crawl,
and Map behind one API).

Tabs, one per alternative plus the trust layer:

1. **Overview**: the roads, the maturity journey, published scale proof,
   on-the-record quotes, and a needs-based decision matrix
2. **vs. SERP APIs & DIY** (build vs. buy): SERP APIs, DuckDuckGo, and other
   open endpoints plus the fetching, parsing, freshness and quality checking,
   agent wiring, and token math you own, in five phases
3. **vs. Model built-in** (replace what is already there): ChatGPT, Gemini,
   and Claude built-in search vs. a model-independent agentic search layer
4. **vs. Legacy search APIs** (buy vs. buy): Brave and You.com return links
   and snippets built for results pages; agentic search returns agent-ready
   content. Includes an eval framework for other agentic search providers
   (no third-party benchmark numbers, by design)
5. **Security & Scale**: the published scale record, the reliability and
   audit walkthroughs both ways, and named, clickable validation (IBM,
   Pillar, TechCrunch-named customers, Insight Partners)

## Sourcing rule

`src/data/claims.js` is the single source of truth for every claim on the site,
in two labelled classes:

- **Published** (blue badge): Tavily numbers, sourced only from tavily.com,
  docs.tavily.com, or nebius.com.
- **Independent** (gray badge): problem-sizing numbers from named third-party
  studies specific to web access: Imperva's Bad Bot Report 2026 (bot traffic),
  the Apify / Web Scraping Club practitioner survey 2026 (scraping costs), the
  HTTP Archive Web Almanac 2024 (page weight), and Columbia's Tow Center 2025
  (AI search citation accuracy). Each carries a visible scope caveat and a
  link to the original publisher. They size the problem space and never
  describe Tavily or a named competitor's performance.

Token consumption has no honest industry number, so the DIY tab ships a
calculator that models it entirely from the reader's own assumptions.
Simulator timings are labelled illustrative.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## Deploy

Pushes to `main` (or the working branch) deploy to GitHub Pages via
`.github/workflows/deploy.yml`.
