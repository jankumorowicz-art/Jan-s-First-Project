import { CodeBlock, FeatureList } from '../ui'

// The DIY integration story: your pipeline is only useful to an agent once
// you wrap it as tools, per framework, and keep every wrapper current.

export default function DiyIntegration() {
  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Your pipeline is not a tool yet</h3>
      <p className="text-sm text-gray-500 mb-4">
        Agents consume tools, not pipelines. Between your homegrown web layer and every agent framework sits a
        wrapper: a schema, argument validation, error mapping, and output shaping, written separately for each
        runtime you support.
      </p>

      <CodeBlock title="internal-tools/web_search.py (yours to maintain)">
{`# One of N wrappers: this one is for LangChain. The MCP server,
# the LlamaIndex spec, and the internal REST client are separate.
class InternalWebSearch(BaseTool):
    name = "web_search"
    description = "Search the web via the internal retrieval pipeline"

    def _run(self, query: str) -> str:
        serp = serp_client.search(query)          # provider quirks live here
        pages = fetcher.fetch_all(serp.links)     # proxies, retries, browsers
        docs = parser.clean(pages)                # per-site parser museum
        ranked = reranker.score(query, docs)      # your model, your tuning
        return packer.to_context(ranked)          # token budget logic

    # TODO: streaming, TODO: structured citations,
    # TODO: async variant, TODO: rate-limit errors that agents understand`}
      </CodeBlock>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">The integration backlog that never empties</div>
        <FeatureList variant="diy" items={[
          { label: 'One wrapper per framework', detail: 'LangChain, LlamaIndex, and every internal runtime get their own schema and quirks' },
          { label: 'An MCP server of your own', detail: 'if Claude or other MCP clients need your pipeline, you write and host the server, and track the protocol as it evolves' },
          { label: 'Output shaping per consumer', detail: 'citations, truncation, and structured fields differ by agent and by use case' },
          { label: 'Versioning and docs', detail: 'every internal team consuming the pipeline needs a stable contract, which makes you an API vendor with one customer' },
        ]} />
      </div>
    </div>
  )
}
