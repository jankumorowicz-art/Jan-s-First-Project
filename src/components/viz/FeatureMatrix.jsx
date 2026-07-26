import { Icon, SourceLink } from '../ui'
import { sources } from '../../data/claims'

// Capability-by-capability comparison. Mechanism descriptions only; the
// sourced numbers live in claims.js and render as ProofPoints elsewhere.
const rows = [
  {
    capability: 'Web search for agents',
    diy: 'SERP API returns links and snippets; you fetch and assemble content yourself',
    tavily: 'Search returns ranked results with content and relevance scores in one call',
    source: sources.searchApi,
  },
  {
    capability: 'Content extraction',
    diy: 'Headless browsers plus per-site parsers you write and maintain',
    tavily: 'Extract returns clean content from any URLs you pass it',
    source: sources.extractApi,
  },
  {
    capability: 'Site crawling',
    diy: 'A crawler you build: frontier, dedupe, politeness, robots.txt',
    tavily: 'Crawl traverses sites graph-style with extraction built in',
    source: sources.crawlApi,
  },
  {
    capability: 'Site mapping',
    diy: 'Sitemap parsing and link-graph code of your own',
    tavily: 'Map discovers site structure with parallel path exploration',
    source: sources.mapApi,
  },
  {
    capability: 'LLM-ready output',
    diy: 'Cleaning, dedupe, and token budgeting logic you own',
    tavily: 'Responses designed for RAG and agent workflows',
    source: sources.bestPractices,
  },
  {
    capability: 'Agent framework wiring',
    diy: 'Tool schemas per framework, written and versioned by you',
    tavily: 'Official LangChain and LlamaIndex integrations, plus a hosted MCP server',
    source: sources.mcp,
  },
  {
    capability: 'Compliance story',
    diy: 'Your scraping stack, your audit: retention, terms, and patching',
    tavily: 'SOC 2 compliance and zero data retention, documented by Tavily',
    source: sources.trust,
  },
]

export default function FeatureMatrix() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="p-6 pb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Capability by capability</div>
        <p className="text-sm text-gray-500">
          What each capability means in each world. Each row links to the Tavily or Nebius page that documents it.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-6 py-2.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">Capability</th>
              <th className="px-4 py-2.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">DIY stack</th>
              <th className="px-4 py-2.5 font-semibold text-blue-600 text-xs uppercase tracking-wide">Tavily</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map(r => (
              <tr key={r.capability} className="align-top">
                <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">{r.capability}</td>
                <td className="px-4 py-3 text-gray-500">
                  <span className="inline-flex items-start gap-1.5">
                    <Icon name="wrench" className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-400" />
                    {r.diy}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <span className="inline-flex items-start gap-1.5">
                    <Icon name="check" className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-500" />
                    {r.tavily}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <SourceLink source={r.source} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
