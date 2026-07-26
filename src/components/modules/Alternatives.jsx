import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ModuleHeader, SubTabs, SplitCompare, ComparePanel, FeatureList, DiyStrengthCallout, SourceLink } from '../ui'
import AlternativesMatrix from '../viz/AlternativesMatrix'
import { sources } from '../../data/claims'

// Buying is not one option either: model-native search and standalone search
// APIs are the other two roads. This module compares mechanisms and ownership.
// No third-party numbers appear here; the sourced-claims rule only covers
// Tavily and Nebius publications, so everything else stays qualitative.

const tabs = [
  { key: 'native', label: 'Model-native search' },
  { key: 'searchapi', label: 'Search APIs (Brave, You.com)' },
]

function NativeCompare() {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-5 max-w-3xl">
        ChatGPT, Gemini, and Claude can all ground answers with built-in web search, in their apps and through
        their APIs. For chat inside one provider, that is genuinely the shortest path. The trade appears the
        moment the web layer needs to be yours: portable across models, inspectable, and able to hand you the
        content itself.
      </p>

      <SplitCompare>
        <ComparePanel variant="diy" pillLabel="provider-native" title="Search built into the model" subtitle="ChatGPT, Gemini, Claude, and other providers with native web grounding">
          <FeatureList variant="diy" items={[
            { label: 'Bound to that provider', detail: 'retrieval works when calling that model, so a multi-model stack grounds inconsistently and switching providers changes what your agent sees' },
            { label: 'A closed pipeline', detail: 'you receive an answer with citations; what was fetched, how it was ranked, and the full page content mostly stay inside the provider' },
            { label: 'Chat-shaped, not corpus-shaped', detail: 'great for answering a user in the moment, but it does not hand you extracted content to store, index, or reuse in your own RAG pipeline' },
            { label: 'Search only', detail: 'no extraction of arbitrary URLs, no crawling or mapping of a specific site' },
            { label: 'Coupled pricing and limits', detail: 'web access rides on the model provider\'s pricing, quotas, and roadmap' },
          ]} />
        </ComparePanel>

        <ComparePanel variant="tavily" title="A model-independent web layer" subtitle="The same Tavily API in front of any model">
          <FeatureList variant="tavily" items={[
            { label: 'Works with every model', detail: 'the same Search, Extract, Crawl, and Map behind ChatGPT, Claude, Gemini, or an open-weights model, so grounding stays consistent when models change' },
            { label: 'Inspectable retrieval', detail: 'documented parameters (search_depth, include_domains, time_range) and per-result relevance scores you can threshold' },
            { label: 'Content you keep', detail: 'responses carry the extracted content itself, ready to store, index, and cite in your own pipeline' },
            { label: 'Beyond search', detail: 'Extract for URLs you already have, Crawl and Map for whole sites' },
            { label: 'Its own contract', detail: 'web access is priced and versioned independently of whichever model you run this quarter' },
          ]} />
        </ComparePanel>
      </SplitCompare>

      <p className="text-[11px] text-gray-400 mt-4">
        Tavily-side capabilities per the API reference and integration docs.{' '}
        <SourceLink source={sources.searchApi} className="!inline" />{' '}
        <SourceLink source={sources.mcp} className="!inline" />
      </p>

      <DiyStrengthCallout title="When model-native search is the right call">
        A chat product built entirely on one provider, where users just need grounded answers and you never
        touch the retrieved content, is well served by that provider's built-in search. The case for a separate
        web layer starts when you run more than one model, need the content itself, or need retrieval you can
        tune and audit.
      </DiyStrengthCallout>
    </div>
  )
}

function SearchApiCompare() {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-5 max-w-3xl">
        Independent search APIs like Brave Search and You.com give you a real index behind an API you control,
        which already beats scraping a SERP. The difference is scope: a search index answers "which pages?",
        while an agent needs "give me the content, ranked for my question". That second half is the part you
        still build, and it is most of modules 01 and 02.
      </p>

      <SplitCompare>
        <ComparePanel variant="diy" pillLabel="search API" title="Standalone search API" subtitle="Brave Search, You.com, and similar index APIs">
          <FeatureList variant="diy" items={[
            { label: 'An index, by design', detail: 'the product is search results: links, titles, snippets, sometimes summaries. It answers "which pages?", and that is its job' },
            { label: 'The content layer stays yours', detail: 'fetching pages, rendering JavaScript, extraction, and cleaning still happen on your side, with the browsers, proxies, and parsers that implies' },
            { label: 'Relevance tuned for search', detail: 'ranking targets a results page; packing a context window for a specific question is logic you add' },
            { label: 'No site-scale tools', detail: 'crawling or mapping a specific site is outside what an index API does' },
            { label: 'One piece of the stack', detail: 'it replaces the SERP box in the DIY diagram; the other seven boxes remain' },
          ]} />
        </ComparePanel>

        <ComparePanel variant="tavily" title="A full web access layer" subtitle="Index plus retrieval, extraction, and site tools in one API">
          <FeatureList variant="tavily" items={[
            { label: 'Search returns content', detail: 'results arrive with extracted page content and a relevance score per result, not just links to go fetch' },
            { label: 'Rendering and cleaning included', detail: 'the browsers, anti-bot handling, and parsers live behind the endpoint' },
            { label: 'Built for the context window', detail: 'responses are shaped for RAG and agent workflows, with URLs for citation' },
            { label: 'Site-scale endpoints', detail: 'Extract, Crawl, and Map cover the jobs an index cannot' },
            { label: 'Agent-native wiring', detail: 'a hosted MCP server and official LangChain and LlamaIndex packages' },
          ]} />
        </ComparePanel>
      </SplitCompare>

      <p className="text-[11px] text-gray-400 mt-4">
        Tavily-side capabilities per the Search, Extract, and Crawl references and best-practices docs.{' '}
        <SourceLink source={sources.searchApi} className="!inline" />{' '}
        <SourceLink source={sources.bestPractices} className="!inline" />
      </p>

      <DiyStrengthCallout title="When a standalone search API is the right call">
        If you are building search features for humans (a results page, autosuggest, site search) or you already
        operate a content pipeline and only lack an index, a search API like Brave or You.com fits exactly. The
        gap opens when the consumer is an agent that needs readable, ranked content, because then the index is
        the easy half.
      </DiyStrengthCallout>
    </div>
  )
}

export default function Alternatives() {
  const [tab, setTab] = useState('native')

  return (
    <div>
      <ModuleHeader
        eyebrow="Landscape · 06"
        title="The other ways to get the web"
        intro="Build vs. buy is not the whole map. Two other roads exist: the search built into the model providers themselves, and standalone search APIs. Both are real options, and both solve a different problem than a web access layer does."
      />

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      <AnimatePresence mode="wait">
        <motion.div key={tab}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}>
          {tab === 'native' ? <NativeCompare /> : <SearchApiCompare />}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10">
        <AlternativesMatrix />
      </div>
    </div>
  )
}
