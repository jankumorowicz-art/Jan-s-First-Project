# Tavily vs. the alternatives

An interactive, talk-track-ready walkthrough of how teams give AI agents web
access, and how each road compares with **Tavily** (Search, Extract, Crawl,
and Map behind one API).

Tabs, one per alternative:

1. **Overview**: the three roads, the maturity journey, published scale proof,
   and a needs-based decision matrix across all four approaches
2. **vs. DIY stack** (build vs. buy): SERP APIs, DuckDuckGo, and other open
   endpoints plus the fetching, parsing, freshness and quality checking,
   reliability, audit, and agent wiring you maintain around them, in six phases
3. **vs. Model-native search** (replace what is already there): ChatGPT,
   Gemini, and Claude built-in search vs. a model-independent web layer
4. **vs. Search APIs** (buy vs. buy): index-first APIs (Brave, You.com) vs. a
   full web access layer, plus an eval framework for agent-native search APIs
   (no third-party benchmark numbers, by design)

## Sourcing rule

`src/data/claims.js` is the single source of truth for every claim on the site,
in two labelled classes:

- **Published** (blue badge): Tavily numbers, sourced only from tavily.com,
  docs.tavily.com, or nebius.com.
- **Independent** (gray badge): problem-sizing numbers from named third-party
  studies (Monte Carlo/Wakefield 2022, Fivetran 2026 benchmark, Columbia Tow
  Center 2025), each with a visible scope caveat and a link to the original
  publisher. They size the problem space and never describe Tavily or a named
  competitor's performance.

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
