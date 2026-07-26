import { ModuleHeader, SplitCompare, ComparePanel, FeatureList, DiyStrengthCallout, TalkTrack, SourceLink, ProofPoint, Icon } from '../ui'
import { sources, proofPoints } from '../../data/claims'

// Buy vs. buy, in two honest parts: search-results APIs (Brave, You.com)
// where the difference is what comes back to the agent, and the agent-native
// wave where quality talk is benchmark talk. This site publishes no
// third-party benchmarks, so that section hands the reader an eval framework
// instead of a claim. Note: the axis is NOT who has an index (Tavily runs
// its own); it is results built for a search page vs content built for a
// context window.

const bakeoff = [
  {
    icon: 'gauge',
    label: 'Answer quality, on your queries',
    body: 'Take a sample of real traffic and run it through both. Judge grounding, citations, and how much post-processing each response needs. The free tier of 1,000 monthly credits covers a real test.',
    source: sources.credits,
  },
  {
    icon: 'clock',
    label: 'Latency at your percentiles',
    body: 'Measure p50 and p95 from your region under your concurrency. Tavily publishes 180 ms median on Search as its own number; hold every vendor to a number they will publish.',
    source: sources.home,
  },
  {
    icon: 'layers',
    label: 'Surface area you will actually need',
    body: 'If the roadmap includes reading known URLs or whole sites, compare full stacks: search plus extraction plus crawling from one vendor, or glue code between two.',
    source: sources.apiIntro,
  },
  {
    icon: 'server',
    label: 'Production track record',
    body: 'Ask what scale and uptime the vendor operates at today and will commit to. Tavily and Nebius publish 300M+ monthly requests at 99.99% uptime.',
    source: sources.nebiusBlog,
  },
  {
    icon: 'shield',
    label: 'Compliance posture',
    body: 'SOC 2, data retention, and terms your counsel can review. Tavily documents SOC 2 and zero data retention.',
    source: sources.trust,
  },
  {
    icon: 'plug',
    label: 'Ecosystem fit',
    body: 'Check for a hosted MCP server and official framework packages maintained by the vendor, so the wiring is not another thing you own.',
    source: sources.mcp,
  },
]

export default function VsSearchApis() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Buy vs. buy · 03"
        title="vs. legacy search APIs"
        intro="Legacy search APIs like Brave and You.com differ from Tavily in what comes back: results built for a results page, versus content built for a context window. Other agentic search providers differ on quality, which only an eval on your own queries can settle."
      />

      {/* Legacy search APIs */}
      <div className="mb-3">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Legacy search APIs: Brave, You.com</h3>
        <p className="text-sm text-gray-500 max-w-3xl mb-5">
          This is not about who has an index; Tavily runs its own. The difference is what the API hands your
          agent: links and snippets, or ranked, extracted content. Closing that gap yourself is most of the DIY
          tab.
        </p>
      </div>

      <SplitCompare>
        <ComparePanel variant="diy" pillLabel="results API" title="Search-results API" subtitle="Brave Search, You.com, and similar APIs">
          <FeatureList variant="diy" items={[
            { label: 'Results-page output, by design', detail: 'links, titles, snippets, sometimes summaries. It answers "which pages?", and that is its job' },
            { label: 'The content layer stays yours', detail: 'fetching pages, rendering JavaScript, extraction, and cleaning still happen on your side, with the browsers, proxies, and parsers that implies' },
            { label: 'Stale-or-good stays yours too', detail: 'freshness checking, quality filtering, and dedupe of what you fetched are still your code' },
            { label: 'Relevance tuned for search pages', detail: 'ranking targets a list a human scans; packing a context window for a specific question is logic you add' },
            { label: 'No site-scale tools', detail: 'crawling or mapping a specific site is outside what a results API does' },
          ]} />
        </ComparePanel>

        <ComparePanel variant="tavily" title="A full web access layer" subtitle="Tavily's own search infrastructure, built for agents end to end">
          <FeatureList variant="tavily" items={[
            { label: 'Search returns content', detail: 'results arrive with extracted page content and a relevance score per result, not just links to go fetch' },
            { label: 'Rendering and cleaning included', detail: 'the browsers, anti-bot handling, and parsers live behind the endpoint' },
            { label: 'Freshness as a parameter', detail: 'topic and time_range scope results on the request; scores let your code threshold what is good' },
            { label: 'Site-scale endpoints', detail: 'Extract, Crawl, and Map cover the jobs a results API cannot' },
            { label: 'Agent-native wiring', detail: 'a hosted MCP server and official LangChain and LlamaIndex packages' },
          ]} />
        </ComparePanel>
      </SplitCompare>

      <p className="text-[11px] text-gray-400 mt-4">
        Tavily-side capabilities per the Search, Extract, and Crawl references and best-practices docs.{' '}
        <SourceLink source={sources.searchApi} className="!inline" />{' '}
        <SourceLink source={sources.bestPractices} className="!inline" />
        {' '}Provider capabilities evolve; check current docs before deciding.
      </p>

      <DiyStrengthCallout title="When a search-results API is the right call">
        If you are building search features for humans (a results page, autosuggest, site search) or you already
        operate a content pipeline and only need result links to feed it, Brave or You.com fits exactly. The gap
        opens when the consumer is an agent that needs readable, ranked content, because then the results list
        is the easy half.
      </DiyStrengthCallout>

      <TalkTrack
        question="We can just use the Brave API, it's real web search."
        points={[
          'It is, and this is not an index argument: Tavily runs its own search infrastructure too. The difference is what comes back. A results API hands your agent links and snippets; you still build and run the fetching, rendering, cleaning, and ranking that turn those into usable context.',
          'That remainder is exactly the DIY stack from the previous tab, minus one box. The invoice changes; the engineering commitment mostly does not.',
          'Tavily sells the finished job: scored, LLM-ready content from one call, plus Extract, Crawl, and Map for the site-scale work no results API covers.',
        ]}
      />

      {/* Other agentic search providers */}
      <div className="mt-14 border-t border-gray-200 pt-8 mb-3">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Other agentic search providers</h3>
        <p className="text-sm text-gray-500 max-w-3xl">
          Tavily helped define this category, and others play in it too. Within the category the comparison is
          result quality on your workload, which is settled by evals, not by a vendor's page. This site
          publishes no third-party benchmarks; here is the eval to run instead.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">The bake-off, in six questions</div>
        <p className="text-sm text-gray-500 mb-5">
          Run any agentic search contender and Tavily through the same six checks. Tavily's side of each check
          is published and linked; hold every vendor to the same standard.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bakeoff.map(b => (
            <div key={b.label} className="rounded-xl border border-gray-200 p-4 flex flex-col">
              <span className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center mb-2.5">
                <Icon name={b.icon} className="w-4 h-4" />
              </span>
              <div className="font-semibold text-gray-900 text-sm mb-1">{b.label}</div>
              <p className="text-[13px] text-gray-600 leading-relaxed mb-3">{b.body}</p>
              <div className="mt-auto"><SourceLink source={b.source} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <ProofPoint point={proofPoints.freeCredits} />
        <ProofPoint point={proofPoints.requests} />
      </div>

      <TalkTrack
        question="What about the other agentic search providers?"
        points={[
          'Real category, and quality there is workload-dependent, so we will not argue benchmarks from a slide. Run the eval on your own queries; the free tier of 1,000 monthly credits covers a real test, and we will help you set it up.',
          'Whatever the eval shows, the platform questions remain: one API covering search, extraction, crawling, and mapping, or glue code between vendors; a published record of 300M+ monthly requests at 99.99% uptime; SOC 2 and zero data retention on paper.',
          'And check who is standing behind the layer in three years: Tavily is part of Nebius, serving 2M+ developers in production today.',
        ]}
      />
    </div>
  )
}
