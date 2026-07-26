// Single source of truth for sourced proof points and the ownership ledger.
// Hard rule: every numeric claim here is published by Tavily (tavily.com or
// docs.tavily.com) or by Nebius (nebius.com), and carries the `source` link so
// the UI can attribute it honestly. If a number is not published, we show the
// mechanism without the number. No stats are invented for this site.

export const sources = {
  // Company and scale
  home: {
    title: 'Tavily, the web access layer for AI agents',
    url: 'https://www.tavily.com/',
  },
  nebiusBlog: {
    title: 'Nebius and Tavily: Bringing agentic search into the production AI stack',
    url: 'https://nebius.com/blog/posts/bringing-agentic-search-into-the-production-ai-stack',
  },
  nebiusNews: {
    title: 'Nebius announces agreement to acquire Tavily',
    url: 'https://nebius.com/newsroom/nebius-announces-agreement-to-acquire-tavily-to-add-agentic-search-to-its-ai-cloud-platform',
  },
  joiningNebius: {
    title: 'Tavily is Joining Nebius',
    url: 'https://www.tavily.com/blog/tavily-is-joining-nebius',
  },

  // Product mechanism (docs)
  apiIntro: {
    title: 'Tavily API reference: introduction',
    url: 'https://docs.tavily.com/documentation/api-reference/introduction',
  },
  searchApi: {
    title: 'Tavily Search API reference',
    url: 'https://docs.tavily.com/documentation/api-reference/endpoint/search',
  },
  extractApi: {
    title: 'Tavily Extract API reference',
    url: 'https://docs.tavily.com/documentation/api-reference/endpoint/extract',
  },
  crawlApi: {
    title: 'Tavily Crawl API reference',
    url: 'https://docs.tavily.com/documentation/api-reference/endpoint/crawl',
  },
  mapApi: {
    title: 'Tavily Map API reference',
    url: 'https://docs.tavily.com/documentation/api-reference/endpoint/map',
  },
  crawlTutorial: {
    title: 'Website crawling and content extraction, Tavily Docs',
    url: 'https://docs.tavily.com/examples/quick-tutorials/crawl-api',
  },
  bestPractices: {
    title: 'Best practices for search, Tavily Docs',
    url: 'https://docs.tavily.com/documentation/best-practices/best-practices-search',
  },
  credits: {
    title: 'Credits and pricing, Tavily Docs',
    url: 'https://docs.tavily.com/documentation/api-credits',
  },

  // Integrations
  mcp: {
    title: 'Tavily MCP Server, Tavily Docs',
    url: 'https://docs.tavily.com/documentation/mcp',
  },
  langchain: {
    title: 'LangChain integration, Tavily Docs',
    url: 'https://docs.tavily.com/documentation/integrations/langchain',
  },
  llamaindex: {
    title: 'LlamaIndex integration, Tavily Docs',
    url: 'https://docs.tavily.com/documentation/integrations/llamaindex',
  },

  // Trust and security
  trust: {
    title: 'Security and compliance, Tavily Docs',
    url: 'https://docs.tavily.com/documentation/trust',
  },
  faq: {
    title: 'Frequently asked questions, Tavily Docs',
    url: 'https://docs.tavily.com/faq/faq',
  },
}

// Published proof points. Rendered by <ProofPoint> with a "published" label.
// Scale numbers come from the Nebius announcement post and tavily.com.
export const proofPoints = {
  requests: {
    stat: '300M+',
    label: 'API requests handled every month',
    source: sources.nebiusBlog,
  },
  developers: {
    stat: '2M+',
    label: 'developers served globally',
    source: sources.nebiusBlog,
  },
  uptime: {
    stat: '99.99%',
    label: 'uptime behind mission-critical agent systems',
    source: sources.home,
  },
  latency: {
    stat: '180 ms',
    label: 'median (p50) latency on Tavily Search',
    source: sources.home,
  },
  freeCredits: {
    stat: '1,000',
    label: 'free API credits every month, no credit card required',
    source: sources.credits,
  },
  searchCost: {
    stat: '1 credit',
    label: 'per basic search request (2 credits for advanced depth)',
    source: sources.credits,
  },
  extractCost: {
    stat: '1-2 credits',
    label: 'per 5 successfully extracted URLs, by extract depth',
    source: sources.credits,
  },
  mapCost: {
    stat: '1-2 credits',
    label: 'per 10 pages mapped, by depth',
    source: sources.mapApi,
  },
}

// Ownership ledger: the operational components you run yourself when you
// assemble the web layer from SERP APIs, scrapers, proxies, and parsers.
// Each item spells out the real work (`work`) so the burden is concrete, and
// the one-line Tavily equivalent (`tavily`). Keyed by module.
export const ledger = {
  search: [
    {
      label: 'SERP API contract',
      work: 'Pick and integrate a SERP provider, learn its query syntax and result schema, and watch the contract: rate limits, result caps, and terms that were designed for humans reading ranked links, not for agents consuming content.',
      tavily: 'One Search API designed for agents, with content included in the response.',
    },
    {
      label: 'Result fetching layer',
      work: 'A SERP result is a list of links. To get content an LLM can use, you build a second layer that fetches every URL, follows redirects, and handles timeouts, per result, per query.',
      tavily: 'Search returns ranked results with extracted content in a single call.',
    },
    {
      label: 'Snippet-to-context assembly',
      work: 'Write the logic that turns titles, snippets, and fetched HTML into clean context: dedupe near-identical results, trim boilerplate, and pack it into the token budget without cutting mid-sentence.',
      tavily: 'Results arrive as LLM-ready content with relevance scores, sized for RAG.',
    },
    {
      label: 'Relevance re-ranking',
      work: 'SERP rank optimizes for click-through, not for answering a question. You add an embedding or cross-encoder re-ranker, host it, and tune it per use case.',
      tavily: 'Each result carries a relevance score computed for the query intent.',
    },
    {
      label: 'Query strategy per engine',
      work: 'Operator syntax, freshness windows, and pagination differ per engine and change without notice. Someone owns keeping the query builder current.',
      tavily: 'Parameters like topic, time_range, and include_domains are stable API options.',
    },
  ],
  extraction: [
    {
      label: 'Headless browser fleet',
      work: 'Run and scale headless Chrome for JavaScript-heavy pages: memory leaks, zombie processes, version pinning against browser updates, and compute that sits idle between bursts.',
      tavily: 'Extract handles rendering behind the API. Send URLs, get content.',
    },
    {
      label: 'Parser maintenance',
      work: 'Every site template is a parser. Readability heuristics, CSS selectors, and regexes rot silently as sites redesign, and you find out when downstream answers degrade.',
      tavily: 'Extraction returns clean content in markdown or text without per-site parsers.',
    },
    {
      label: 'Anti-bot and CAPTCHA handling',
      work: 'Rotate user agents, manage cookie jars, integrate a CAPTCHA-solving service, and keep adapting as sites tighten defenses.',
      tavily: 'Access and retrieval are handled by the managed layer.',
    },
    {
      label: 'Crawl frontier logic',
      work: 'Breadth limits, depth limits, dedupe, robots.txt, politeness delays, and URL canonicalization: a real crawler is a distributed system, not a for-loop.',
      tavily: 'Crawl traverses sites graph-style with parallel path exploration built in.',
    },
    {
      label: 'Content normalization',
      work: 'HTML, PDFs, dynamic apps, and paywalled fragments all need different cleaning paths before an LLM can use them, and each path is code you own.',
      tavily: 'One response shape across Search, Extract, and Crawl.',
    },
  ],
  reliability: [
    {
      label: 'Proxy pool management',
      work: 'Source residential and datacenter proxies, monitor ban rates, rotate IPs, and renegotiate with vendors when a pool goes stale mid-quarter.',
      tavily: 'No proxy inventory to run. Access is part of the managed service.',
    },
    {
      label: 'Retry and fallback logic',
      work: 'Which failures retry, which fall back to a second provider, and which give up? You write that policy per provider and revisit it after every incident.',
      tavily: 'One API contract to integrate, with the retrieval stack operated for you.',
    },
    {
      label: 'Rate limit orchestration',
      work: 'Every provider in the chain has its own limits. You build the token buckets, queues, and backpressure that keep burst traffic from tripping them.',
      tavily: 'Plans scale by credits, and limits are part of one documented contract.',
    },
    {
      label: 'Monitoring and on-call',
      work: 'Dashboards for success rate, latency, and ban rate per provider, plus a rotation of humans who wake up when the scraper fleet dies at 2am.',
      tavily: 'The retrieval infrastructure is monitored and operated by Tavily.',
    },
    {
      label: 'Cost sprawl across vendors',
      work: 'SERP API plus proxy vendor plus CAPTCHA solver plus browser compute: four invoices, four pricing models, and no single lever to optimize.',
      tavily: 'One credit-based bill across Search, Extract, Crawl, and Map.',
    },
  ],
  integration: [
    {
      label: 'Tool schemas per framework',
      work: 'Wrap your homegrown stack as tools for each framework you use: define schemas, argument validation, and error surfaces for LangChain, LlamaIndex, and every agent runtime separately.',
      tavily: 'Official integrations for LangChain and LlamaIndex, maintained by Tavily.',
    },
    {
      label: 'MCP server',
      work: 'Write and host your own Model Context Protocol server that exposes search and extraction to Claude and other MCP clients, then keep it compatible as the protocol evolves.',
      tavily: 'A hosted Tavily MCP server with a remote URL, no local install required.',
    },
    {
      label: 'Output shaping for agents',
      work: 'Raw pipeline output has to be reshaped per consumer: token-budget aware truncation, citation formats, and structured fields your agent can parse.',
      tavily: 'Responses are already structured for agent consumption, with URLs for citation.',
    },
    {
      label: 'SDK upkeep',
      work: 'Client libraries, typed models, and versioning for every internal consumer of the pipeline are a small product of their own.',
      tavily: 'Official Python and JavaScript SDKs documented alongside the API.',
    },
  ],
  security: [
    {
      label: 'Compliance posture',
      work: 'A scraping stack touches third-party content at scale. Someone owns the audit story: what is fetched, what is stored, and whether the whole pipeline can pass a SOC 2 style review.',
      tavily: 'Tavily documents its SOC 2 compliance in its security docs.',
    },
    {
      label: 'Data retention policy',
      work: 'Fetched pages, caches, and logs accumulate content you may have no right to retain. You design and enforce the retention and deletion policy.',
      tavily: 'Tavily documents a zero data retention posture for API usage.',
    },
    {
      label: 'Credential and key management',
      work: 'Keys for the SERP API, proxy vendor, CAPTCHA solver, and browser grid live in your infrastructure, each one a rotation schedule and a leak risk.',
      tavily: 'One API key to manage, scoped to one provider.',
    },
    {
      label: 'Legal exposure review',
      work: 'Terms of service for engines and target sites, robots.txt policy, and jurisdiction questions all land on your legal team, per source.',
      tavily: 'A vendor contract with published terms stands in front of your usage.',
    },
    {
      label: 'Patching the stack',
      work: 'Headless browsers, parser libraries, proxy clients, and the OS under them all need security patches on your schedule.',
      tavily: 'The service is patched and operated by the vendor.',
    },
  ],
}

// Total components you operate yourself across every module.
export const totalOwnedComponents = Object.values(ledger)
  .reduce((sum, items) => sum + items.length, 0)

export const moduleOrder = ['search', 'extraction', 'reliability', 'integration', 'security']
