import { TerminalPlayer } from '../viz/Terminal'
import { FeatureList } from '../ui'

// The DIY extraction and crawling story: a browser fleet, a parser museum,
// and a crawler that is secretly a distributed system.

const lines = [
  { text: '$ job: extract 4 documentation pages + crawl docs.example.com', cls: 'term-dim', delay: 200 },
  { text: '→ url 1: static HTML, parsing with readability heuristics', cls: 'term-run', delay: 500 },
  { text: '✓ url 1: extracted, 42% of bytes were nav/footer/cookie banner', cls: 'term-ok', delay: 450 },
  { text: '→ url 2: React app, empty <body> without JS. Dispatching headless Chrome', cls: 'term-warn', delay: 550 },
  { text: '✓ url 2: rendered after 2 hydration waits (browser pod restarted once)', cls: 'term-ok', delay: 500 },
  { text: '✗ url 3: PDF. Routing to the separate PDF text pipeline', cls: 'term-warn', delay: 450 },
  { text: '✗ url 4: selector returned empty, site redesigned last week', cls: 'term-fail', delay: 500 },
  { text: '  filed ticket: rewrite parser #37 (third time this quarter)', cls: 'term-dim', delay: 450 },
  { text: '→ starting crawl of docs.example.com', cls: 'term-run', delay: 500 },
  { text: '→ frontier: 1 seed → 214 discovered URLs, deduping query-string variants', cls: 'term-run', delay: 500 },
  { text: '→ respecting robots.txt + politeness delay per host', cls: 'term-run', delay: 450 },
  { text: '✗ crawler trapped in /v1/…/v1/…/v1 recursion, adding loop guard', cls: 'term-fail', delay: 550 },
  { text: '→ re-queueing 31 failed fetches with backoff', cls: 'term-warn', delay: 450 },
  { text: '✓ crawl finished: 178 pages extracted, 36 skipped', cls: 'term-ok', delay: 500 },
  { text: '  the browser fleet, parsers, frontier logic, and loop guards are all yours to maintain', cls: 'term-dim', delay: 400 },
]

export default function DiyExtraction() {
  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Extraction as an engineering discipline</h3>
      <p className="text-sm text-gray-500 mb-4">
        Every page type is its own path: static HTML, JavaScript apps, PDFs, and the sites that redesigned
        yesterday. Crawling multiplies that by every page on a site. Run the job to watch it play out.
      </p>

      <TerminalPlayer
        title="diy-extractor · worker.log"
        lines={lines}
        runLabel="Run job"
        footer="Parser rot, hydration waits, and crawler traps are the routine failure modes of production extraction, not rare events."
      />

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">The standing infrastructure behind that job</div>
        <FeatureList variant="diy" items={[
          { label: 'Headless browser fleet', detail: 'provisioned, scaled, patched, and restarted when it leaks memory' },
          { label: 'Parser museum', detail: 'one cleaning path per content type, each rotting at its own pace' },
          { label: 'Crawl frontier service', detail: 'dedupe, depth limits, robots.txt, politeness, loop guards' },
          { label: 'Format normalizer', detail: 'HTML, PDF, and dynamic apps converging on one output shape' },
          { label: 'Failure queue', detail: 'retries, backoff, and the dashboard someone checks every morning' },
        ]} />
      </div>
    </div>
  )
}
