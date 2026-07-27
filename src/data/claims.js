// Single source of truth for sourced proof points and the ownership ledger.
// Two classes of claim, and the UI labels them differently:
// 1. Tavily-published: numbers from tavily.com, docs.tavily.com, or
//    nebius.com, rendered with a "published" badge.
// 2. Independent: numbers from named third-party studies specific to web
//    access (Imperva, the Apify / Web Scraping Club survey, HTTP Archive,
//    Columbia's Tow Center), rendered with an "independent" badge
//    and a scope note. These size the problem space; they never describe
//    Tavily's own performance and never mention a competitor by name.
// If a number is not published by anyone credible, we show the mechanism
// without the number. No stats are invented for this site.

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
  pillar: {
    title: 'Tavily announces strategic partnership with Pillar to secure AI web access',
    url: 'https://www.tavily.com/blog/tavily-partners-with-pillar-to-deliver-enterprise-grade-ai-web-access-with-built-in-security-to-secure-ai-agents-web-access-2',
  },
  enterprise: {
    title: 'Tavily enterprise solutions',
    url: 'https://www.tavily.com/enterprise',
  },
  euEndpoint: {
    title: 'Tavily EU endpoint',
    url: 'https://www.eu.tavily.com/',
  },
}

// Enterprise capability cards. Feature descriptions are qualitative and each
// links to the Tavily page that carries it.
export const enterpriseFeatures = [
  {
    icon: 'lock',
    label: 'Zero data retention',
    detail: 'Queries and retrieved content are not retained, documented in the security docs and FAQ.',
    source: sources.trust,
  },
  {
    icon: 'shield',
    label: 'SOC 2',
    detail: 'Compliance documented in the trust docs, giving reviews a standard artifact to work from.',
    source: sources.trust,
  },
  {
    icon: 'eye',
    label: 'Safe search',
    detail: 'An enterprise feature on the Search endpoint that filters adult and unsafe content out of results.',
    source: sources.searchApi,
  },
  {
    icon: 'file',
    label: 'PII filtering and blocking',
    detail: 'Enterprise controls for keeping personally identifiable information out of what reaches your agents.',
    source: sources.enterprise,
  },
  {
    icon: 'alert',
    label: 'Prompt-injection protection',
    detail: 'Guardrails with Pillar Security protect agents from data manipulation, prompt injection, and misinformation in retrieved content.',
    source: sources.pillar,
  },
  {
    icon: 'globe',
    label: 'EU endpoint',
    detail: 'A dedicated European deployment for teams with data residency requirements.',
    source: sources.euEndpoint,
  },
]

// On-the-record voices and named third-party validation. Quotes are verbatim
// from the linked announcements; validation items are facts a prospect can
// click through and verify at the named publisher.
export const externalSources = {
  ibm: {
    title: 'IBM and Tavily partner for agentic AI solutions (ibm.com)',
    url: 'https://www.ibm.com/new/announcements/driving-smarter-data-enrichment-ibm-and-tavily-partner-for-agentic-ai-solutions',
  },
  techcrunch: {
    title: 'TechCrunch coverage of Tavily, August 2025',
    url: 'https://techcrunch.com/2025/08/06/tavily-raises-25m-to-connect-ai-agents-to-the-web/',
  },
  pillarSide: {
    title: 'Pillar partners with Tavily to secure web access for AI agents (pillar.security)',
    url: 'https://www.pillar.security/blog/pillar-partners-with-tavily-to-secure-web-access-for-ai-agents',
  },
}

export const voices = {
  weiss: {
    quote: 'Tavily is on a mission to onboard the next billion AI agents to the web. Agentic search is a multi-billion-dollar opportunity, and we believe the market is poised to grow exponentially as enterprises deploy autonomous AI systems.',
    name: 'Rotem Weiss',
    role: 'Founder and CEO, Tavily',
    source: sources.nebiusNews,
  },
  chernin: {
    quote: 'Tavily is solving a critical part of this stack with agentic search and has proven it with strong developer adoption. This acquisition brings the search layer directly into our stack, so developers can focus on their applications instead of managing multiple vendors.',
    name: 'Roman Chernin',
    role: 'Co-founder and Chief Business Officer, Nebius',
    source: sources.nebiusNews,
  },
}

export const validation = [
  {
    label: 'Groq, Cohere, MongoDB, Writer',
    detail: 'named by TechCrunch as companies whose agents run on Tavily',
    source: externalSources.techcrunch,
  },
  {
    label: 'IBM partnership',
    detail: 'announced on ibm.com for agentic AI data enrichment',
    source: externalSources.ibm,
  },
  {
    label: 'Pillar Security partnership',
    detail: 'security guardrails built into the web access layer',
    source: sources.pillar,
  },
  {
    label: 'Part of Nebius',
    detail: 'the AI infrastructure company acquired Tavily to make agentic search part of its platform',
    source: sources.nebiusNews,
  },
]

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

// Independent studies that size the problem, all specific to web access:
// bot traffic, scraping practice, page weight, and AI search accuracy.
// Rendered by <ProofPoint variant="independent"> with the caveat visible.
export const independentSources = {
  cloudflareBots: {
    title: 'Cloudflare, the agentic Internet bot report (2026)',
    url: 'https://blog.cloudflare.com/agentic-internet-bot-report/',
  },
  cloudflareCrawlers: {
    title: 'Cloudflare, AI crawler traffic by purpose and industry (2026)',
    url: 'https://blog.cloudflare.com/ai-crawler-traffic-by-purpose-and-industry/',
  },
  imperva: {
    title: 'Imperva (Thales) Bad Bot Report 2026',
    url: 'https://www.imperva.com/blog/bad-bot-report-2026-bots-agentic-age/',
  },
  apifySurvey: {
    title: 'Apify + The Web Scraping Club, State of Web Scraping 2026',
    url: 'https://blog.apify.com/web-scraping-report-2026/',
  },
  webAlmanac: {
    title: 'HTTP Archive, Web Almanac 2025: page weight',
    url: 'https://almanac.httparchive.org/en/2025/page-weight',
  },
  ebuBbc: {
    title: 'BBC and EBU, News Integrity in AI Assistants',
    url: 'https://www.ebu.ch/news/2025/10/ai-s-systemic-distortion-of-news-is-consistent-across-languages-and-territories-international-study-by-public-service-broadcaste',
  },
}

export const independentPoints = {
  botTraffic: {
    stat: 'Majority',
    label: 'of web traffic is now automated rather than human, measured across Cloudflare\'s network',
    scope: 'Cloudflare, 2026. Corroborated by the Imperva Bad Bot Report 2026. This is the arms race every automated fetcher operates inside: sites defend accordingly.',
    source: independentSources.cloudflareBots,
  },
  trainingCrawl: {
    stat: '52%',
    label: 'of AI crawler requests were for training as of June 2026, up from 22% in spring 2025',
    scope: 'Cloudflare, 2026. Crawl pressure on the open web is rising fast, and site defenses are tightening in response.',
    source: independentSources.cloudflareCrawlers,
  },
  proxySpend: {
    stat: '62%+',
    label: 'of scraping practitioners reported higher infrastructure spend, driven largely by stronger anti-bot protections',
    scope: 'Apify and The Web Scraping Club community survey of scraping practitioners, December 2025.',
    source: independentSources.apifySurvey,
  },
  proxyUsage: {
    stat: '65.8%',
    label: 'of scraping practitioners used more proxies in 2025 than the year before',
    scope: 'Same Apify / Web Scraping Club practitioner survey. The DIY access layer gets more expensive every year, not cheaper.',
    source: independentSources.apifySurvey,
  },
  pageWeight: {
    stat: '2.9 MB',
    label: 'median weight of a desktop page in 2025; the readable text an agent needs is a small fraction of it',
    scope: 'HTTP Archive Web Almanac, 2025 edition, measured across millions of real pages.',
    source: independentSources.webAlmanac,
  },
  citations: {
    stat: '45%',
    label: 'of AI assistant answers about news had at least one significant issue; 31% had serious sourcing problems',
    scope: 'BBC and EBU study of 3,000+ responses from ChatGPT, Copilot, Gemini, and Perplexity, run by 22 public broadcasters in 18 countries, October 2025. Capabilities evolve.',
    source: independentSources.ebuBbc,
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
      work: 'Pick a SERP provider or open endpoint, learn its query syntax and schema, and live with quotas, terms, and results designed for humans reading link lists.',
      tavily: 'One Search API designed for agents, with content included in the response.',
    },
    {
      label: 'Fetching and access',
      work: 'Turning links into pages means HTTP clients, redirects, timeouts, proxy pools, IP rotation, and CAPTCHA solving, in a permanent arms race with site defenses.',
      tavily: 'Access and retrieval happen behind the endpoint.',
    },
    {
      label: 'Rendering and parsing',
      work: 'JavaScript-heavy pages need a headless browser fleet you patch and scale, and per-site parsers rot silently as sites redesign.',
      tavily: 'Extract returns clean markdown or text from any URLs, with rendering handled.',
    },
    {
      label: 'Crawling at site scale',
      work: 'Frontier logic, dedupe, robots.txt, politeness, and loop guards: a real crawler is a distributed system, not a for-loop.',
      tavily: 'Crawl and Map traverse sites graph-style with extraction built in.',
    },
    {
      label: 'Freshness and quality control',
      work: 'Stale pages, junk sources, and syndicated duplicates degrade answers without throwing errors. Date detection, quality scoring, and dedupe are your code.',
      tavily: 'Freshness controls (topic, time_range) and a relevance score per result are API parameters.',
    },
    {
      label: 'Relevance and packing',
      work: 'Search rank optimizes clicks, not answers. A re-ranker and token-budget packing logic are yours to host and tune.',
      tavily: 'Results arrive scored for the query and shaped for a context window.',
    },
    {
      label: 'Reliability operations',
      work: 'Success-rate dashboards, retries, backpressure, an on-call rotation, and four vendor invoices with no single lever to optimize.',
      tavily: 'One credit-metered contract, with the infrastructure operated and monitored by Tavily.',
    },
    {
      label: 'Compliance and security',
      work: 'Retention policy for fetched content, a keyring of vendor credentials, patching, and the audit story, all owned by your team.',
      tavily: 'SOC 2 and zero data retention documented by the vendor, one key to manage.',
    },
    {
      label: 'Agent wiring',
      work: 'Tool schemas per framework, an MCP server you write and host, and SDK upkeep for every internal consumer.',
      tavily: 'A hosted MCP server plus official LangChain and LlamaIndex integrations.',
    },
  ],
}

export const totalOwnedComponents = ledger.diy.length
