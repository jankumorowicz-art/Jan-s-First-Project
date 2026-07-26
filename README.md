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
4. **vs. Brave & You.com** (buy vs. buy): an index API vs. a full web access
   layer

## Sourcing rule

`src/data/claims.js` is the single source of truth for every claim on the site.
Every numeric claim carries a published source URL from tavily.com,
docs.tavily.com, or nebius.com. If a number is not published, the site shows
the mechanism without it. Third-party comparisons (model providers, Brave,
You.com) are qualitative by design and carry no numbers. Simulator timings are
labelled illustrative.

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
