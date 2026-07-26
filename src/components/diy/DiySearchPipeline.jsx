import { TerminalPlayer } from '../viz/Terminal'
import { FeatureList, CodeBlock } from '../ui'

// The DIY answer to "my agent needs web context": a SERP call is step one of
// many. The terminal walks the whole pipeline for a single query.

const lines = [
  { text: '$ agent asks: "What changed in the EU AI Act implementation timeline?"', cls: 'term-dim', delay: 200 },
  { text: '→ POST serp-provider.example/v1/search q="EU AI Act implementation timeline"', cls: 'term-run', delay: 600 },
  { text: '✓ 200 OK: 10 organic results (title, url, snippet)', cls: 'term-ok', delay: 500 },
  { text: '  snippets are 140-160 chars: not enough context to answer', cls: 'term-dim', delay: 500 },
  { text: '→ fetching result 1/10 …', cls: 'term-run', delay: 400 },
  { text: '✓ result 1: 200 OK (1.4 MB of HTML, nav, ads, cookie banner)', cls: 'term-ok', delay: 400 },
  { text: '→ fetching result 2/10 …', cls: 'term-run', delay: 350 },
  { text: '✗ result 2: 403 Forbidden (bot detection)', cls: 'term-fail', delay: 450 },
  { text: '→ retrying via proxy pool, rotating IP …', cls: 'term-warn', delay: 500 },
  { text: '✓ result 2: 200 OK on retry', cls: 'term-ok', delay: 400 },
  { text: '→ result 3 requires JavaScript: dispatching headless Chrome …', cls: 'term-warn', delay: 550 },
  { text: '✓ result 3: rendered after hydration', cls: 'term-ok', delay: 450 },
  { text: '✗ result 4: CAPTCHA challenge, sending to solver service', cls: 'term-fail', delay: 500 },
  { text: '→ results 5-10: fetched with 2 timeouts, 1 redirect loop', cls: 'term-warn', delay: 500 },
  { text: '→ parsing 8 pages: readability pass, strip boilerplate, fix encoding', cls: 'term-run', delay: 550 },
  { text: '  parser warning: site #6 redesigned, selector returned empty body', cls: 'term-warn', delay: 500 },
  { text: '→ dedupe near-identical syndicated articles (8 → 6 docs)', cls: 'term-run', delay: 450 },
  { text: '→ re-ranking 6 docs against query intent (self-hosted embedding model)', cls: 'term-run', delay: 500 },
  { text: '→ truncating to context budget without cutting mid-sentence', cls: 'term-run', delay: 450 },
  { text: '✓ context assembled: 6 documents, 9 network hops, 5 subsystems touched', cls: 'term-ok', delay: 500 },
  { text: '  every subsystem above is code you wrote and infrastructure you operate', cls: 'term-dim', delay: 400 },
]

export default function DiySearchPipeline() {
  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">One question, one pipeline run</h3>
      <p className="text-sm text-gray-500 mb-4">
        A SERP API answers with links. Everything after that, fetching, rendering, solving, parsing, ranking,
        and packing, is the pipeline you build. Run the simulation to watch a single query move through it.
      </p>

      <TerminalPlayer
        title="diy-web-layer · pipeline.log"
        lines={lines}
        runLabel="Run query"
        footer="Failure branches shown (403s, CAPTCHAs, parser rot) are the routine cases any production scraping stack handles, not worst cases."
      />

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">What you stitched together for that one answer</div>
        <FeatureList variant="diy" items={[
          { label: 'SERP provider account', detail: 'query syntax, rate limits, and a schema built for link lists' },
          { label: 'Fetcher + proxy pool', detail: 'retries, IP rotation, and ban-rate monitoring' },
          { label: 'Headless browser fleet', detail: 'for the JavaScript-only pages' },
          { label: 'Parser layer', detail: 'readability heuristics that rot as sites redesign' },
          { label: 'Re-ranker + packer', detail: 'relevance scoring and token budgeting you tune yourself' },
        ]} />
      </div>

      <CodeBlock title="what the agent actually received from the SERP call">
{`{
  "organic_results": [
    {
      "position": 1,
      "title": "EU AI Act: Implementation timeline update",
      "link": "https://example-news.eu/ai-act-timeline",
      "snippet": "The European Commission confirmed that the next phase of..."
    },
    { "position": 2, "title": "...", "link": "...", "snippet": "..." }
  ]
}`}
      </CodeBlock>
      <p className="text-[11px] text-gray-400 mt-2">
        Illustrative payload. Snippets end mid-sentence because they are preview text for humans, and the content
        behind each link is still unfetched.
      </p>
    </div>
  )
}
