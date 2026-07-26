import { ModuleHeader, SplitCompare, ComparePanel, FeatureList, DiyStrengthCallout, TalkTrack, SourceLink } from '../ui'
import { sources } from '../../data/claims'

// Buy vs. buy: Brave and You.com sell a real index behind an API. The
// question is how much of the agent's job the purchase actually covers.

export default function VsSearchApis() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Buy vs. buy · 03"
        title="vs. Brave & You.com"
        intro="Standalone search APIs are a legitimate buy: a real index, behind an API you control. The difference is scope. An index answers 'which pages?'. An agent needs 'give me the content, ranked for my question'. That second half is most of the DIY tab, and it stays on your plate."
      />

      <SplitCompare>
        <ComparePanel variant="diy" pillLabel="search API" title="Standalone search API" subtitle="Brave Search, You.com, and similar index APIs">
          <FeatureList variant="diy" items={[
            { label: 'An index, by design', detail: 'the product is search results: links, titles, snippets, sometimes summaries. It answers "which pages?", and that is its job' },
            { label: 'The content layer stays yours', detail: 'fetching pages, rendering JavaScript, extraction, and cleaning still happen on your side, with the browsers, proxies, and parsers that implies' },
            { label: 'Stale-or-good stays yours too', detail: 'freshness checking, quality filtering, and dedupe of what you fetched are still your code' },
            { label: 'Relevance tuned for search', detail: 'ranking targets a results page; packing a context window for a specific question is logic you add' },
            { label: 'No site-scale tools', detail: 'crawling or mapping a specific site is outside what an index API does' },
          ]} />
        </ComparePanel>

        <ComparePanel variant="tavily" title="A full web access layer" subtitle="Index plus retrieval, extraction, and site tools in one API">
          <FeatureList variant="tavily" items={[
            { label: 'Search returns content', detail: 'results arrive with extracted page content and a relevance score per result, not just links to go fetch' },
            { label: 'Rendering and cleaning included', detail: 'the browsers, anti-bot handling, and parsers live behind the endpoint' },
            { label: 'Freshness as a parameter', detail: 'topic and time_range scope results on the request; scores let your code threshold what is good' },
            { label: 'Site-scale endpoints', detail: 'Extract, Crawl, and Map cover the jobs an index cannot' },
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

      <TalkTrack
        question="We can just use the Brave API, it's a real index."
        points={[
          'It is, and if you need an index, it is a fine buy. But an index hands your agent links and snippets; you still build and run the fetching, rendering, cleaning, and ranking that turn those into usable context.',
          'That remainder is exactly the DIY stack from the previous tab, minus one box. The invoice changes; the engineering commitment mostly does not.',
          'Tavily sells the finished job: scored, LLM-ready content from one call, plus Extract, Crawl, and Map for the site-scale work no index API covers.',
        ]}
      />

      <DiyStrengthCallout title="When a standalone search API is the right call">
        If you are building search features for humans (a results page, autosuggest, site search) or you already
        operate a content pipeline and only lack an index, Brave or You.com fits exactly. The gap opens when the
        consumer is an agent that needs readable, ranked content, because then the index is the easy half.
      </DiyStrengthCallout>
    </div>
  )
}
