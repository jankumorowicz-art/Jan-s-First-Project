# Build vs. buy: the web layer for AI agents

An interactive walkthrough that contrasts assembling your own web access stack
(SERP APIs, scrapers, headless browsers, proxy pools, parsers) with using
**Tavily**, the web access layer for AI agents: Search, Extract, Crawl, and Map
behind one API.

Modules:

1. **Overview**: the maturity journey and the full ownership picture
2. **Search & Retrieval**: raw SERP JSON vs. LLM-ready results, side by side
3. **Extraction & Crawling**: parser fleets vs. Extract and Crawl
4. **Reliability & Scale**: failure modes you operate vs. a managed layer
5. **Agent Integration**: MCP, LangChain, and LlamaIndex wiring
6. **Security & Compliance**: the audit story in each world

## Sourcing rule

`src/data/claims.js` is the single source of truth for every claim on the site.
Every numeric claim carries a published source URL from tavily.com,
docs.tavily.com, or nebius.com. If a number is not published, the site shows
the mechanism without the number. Simulator timings are labelled illustrative.

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

Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`
(build with Vite, publish `dist/` with actions/deploy-pages).
