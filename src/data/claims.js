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

// Ownership ledger: the standing components you run yourself when you
// assemble the web layer from SERP APIs, open endpoints, scrapers, proxies,
// and parsers. One condensed list so the whole burden fits in one pitch.
// Each item spells out the real work (`work`) and the one-line Tavily
// equivalent (`tavily`).
export const ledger = {
  diy: [
    {
      label: 'The search contract',
      work: 'Pick and integrate a SERP provider, DuckDuckGo endpoints, or another open API; learn its query syntax and schema; and live with quotas, terms, and result shapes designed for humans reading link lists, not agents consuming content.',
      tavily: 'One Search API designed for agents, with content included in the response.',
    },
    {
      label: 'Fetching and access',
      work: 'A search result is a link. Getting the page behind it means HTTP clients, redirects, timeouts, proxy pools, IP rotation, user-agent games, and a CAPTCHA-solving service, in a permanent arms race with site defenses.',
      tavily: 'Access and retrieval happen behind the endpoint.',
    },
    {
      label: 'Rendering and parsing',
      work: 'JavaScript-heavy pages need a headless browser fleet you provision and patch. Every content type needs a cleaning path, and per-site parsers rot silently as sites redesign.',
      tavily: 'Extract returns clean markdown or text from any URLs, with rendering handled.',
    },
    {
      label: 'Crawling at site scale',
      work: 'Frontier logic, dedupe, depth limits, robots.txt, politeness delays, and loop guards: a real crawler is a distributed system you operate, not a for-loop.',
      tavily: 'Crawl and Map traverse sites graph-style with extraction built in.',
    },
    {
      label: 'Freshness and quality control',
      work: 'Nothing tells you a cached page is stale, a source is low quality, or six results are the same syndicated article. You build date detection, authority scoring, dedupe, and re-fetch cadences, and fund the compute behind them.',
      tavily: 'Freshness controls (topic, time_range) and a relevance score per result are API parameters.',
    },
    {
      label: 'Relevance and packing',
      work: 'Search rank optimizes clicks, not answers. You add and host a re-ranker, then write the logic that packs content into a token budget without cutting mid-sentence.',
      tavily: 'Results arrive scored for the query and shaped for a context window.',
    },
    {
      label: 'Reliability operations',
      work: 'Dashboards for success rate, latency, and ban rate per provider; retries, queues, and backpressure; an on-call rotation; and four vendor invoices with no single lever to optimize.',
      tavily: 'One credit-metered contract, with the infrastructure operated and monitored by Tavily.',
    },
    {
      label: 'Compliance and security',
      work: 'Retention policy for fetched content, a keyring of vendor credentials to rotate, patching for browsers and parsers, and the audit story for all of it, owned by your team.',
      tavily: 'SOC 2 and zero data retention documented by the vendor, one key to manage.',
    },
    {
      label: 'Agent wiring',
      work: 'Tool schemas per framework, an MCP server you write and host, output shaping per consumer, and SDK upkeep for every internal team that touches the pipeline.',
      tavily: 'A hosted MCP server plus official LangChain and LlamaIndex integrations.',
    },
  ],
}

export const totalOwnedComponents = ledger.diy.length
