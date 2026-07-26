import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ModuleHeader, TheJob, DiyTavilyToggle, OwnershipLedger, DiyStrengthCallout, TalkTrack } from '../ui'
import ResultComparator from '../viz/ResultComparator'
import WebLayerMap from '../viz/WebLayerMap'
import TavilyFreshness from '../tavily/TavilyFreshness'
import DiyFreshness from '../diy/DiyFreshness'
import TavilySearch from '../tavily/TavilySearch'
import DiySearchPipeline from '../diy/DiySearchPipeline'
import TavilyExtract from '../tavily/TavilyExtract'
import DiyExtraction from '../diy/DiyExtraction'
import TavilyIntegration from '../tavily/TavilyIntegration'
import DiyIntegration from '../diy/DiyIntegration'
import TokenMath from '../viz/TokenMath'
import { ledger } from '../../data/claims'

// One tab for the whole build-vs-buy argument: the SERP/DuckDuckGo call is
// step one of a stack, and each phase below is a piece of that stack.

const phases = [
  { key: 'search', label: 'Search' },
  { key: 'pages', label: 'Reading pages' },
  { key: 'fresh', label: 'Stale or good?' },
  { key: 'wiring', label: 'Agent wiring' },
  { key: 'tokens', label: 'The token bill' },
]

const phaseDescs = {
  search: 'What one question costs in each world: the payloads, and the pipeline behind them.',
  pages: 'Search finds links. Something still has to render, clean, and read the pages, and at site scale that something is a crawler.',
  fresh: 'The quiet failure mode: nothing crashes when content is stale, junk, or duplicated. Someone has to decide what is good.',
  wiring: 'A pipeline is not a tool. The MCP server and framework wrappers your agent actually calls have to come from somewhere.',
  tokens: 'Markup the model never needed is still billed at your input rate. Model the gap with your own assumptions.',
}

export default function VsDiy() {
  const [phase, setPhase] = useState('search')

  return (
    <div>
      <ModuleHeader
        eyebrow="Build vs. buy · 01"
        title="vs. SERP APIs & the DIY stack"
        intro="A SERP or DuckDuckGo call is cheap. The stack you maintain around it is not. Walk the phases; each one is a standing commitment."
      />

      <div className="mb-8">
        <WebLayerMap />
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        {phases.map(p => (
          <button key={p.key} onClick={() => setPhase(p.key)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
              phase === p.key ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}>
            {p.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 mb-6 max-w-3xl">{phaseDescs[phase]}</p>

      <AnimatePresence mode="wait">
        <motion.div key={phase}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}>
          {phase === 'search' && (
            <div className="space-y-8">
              <ResultComparator />
              <DiyTavilyToggle
                tavily={<TavilySearch />}
                diy={<DiySearchPipeline />}
                note="Same question. Switch to watch the DIY pipeline earn its answer."
              />
            </div>
          )}
          {phase === 'pages' && (
            <DiyTavilyToggle
              tavily={<TavilyExtract />}
              diy={<DiyExtraction />}
              note="Same pages. Switch to see the fleet that reads them in the DIY world."
            />
          )}
          {phase === 'fresh' && (
            <DiyTavilyToggle
              tavily={<TavilyFreshness />}
              diy={<DiyFreshness />}
              note="Same decision. Switch to see the code that makes it in the DIY world."
            />
          )}
          {phase === 'wiring' && (
            <DiyTavilyToggle
              tavily={<TavilyIntegration />}
              diy={<DiyIntegration />}
              note="Same agent, same frameworks. Switch to see the wrapper work in the DIY world."
            />
          )}
          {phase === 'tokens' && <TokenMath />}
        </motion.div>
      </AnimatePresence>

      <div className="mt-14 border-t border-gray-200 pt-8">
        <TheJob>
          Give the agent grounded, current web context for any question or any site, in a shape it can use
          directly, without a retrieval platform to staff.
        </TheJob>

        <OwnershipLedger items={ledger.diy} title="The DIY stack, as a ledger" />

        <TalkTrack
          question="A SERP key is $50 a month, why pay for a web layer?"
          points={[
            'The SERP call is the cheapest line in the pipeline. The links it returns still need fetching, rendering, parsing, dedupe, and ranking before an agent can use them, and that stack is yours to build and staff.',
            'The stack decays by design, not by accident: over half of web traffic is now automated and sites defend accordingly, and practitioners in the 2026 State of Web Scraping survey report rising proxy and infrastructure spend driven by anti-bot protections. That arms race is the recurring bill behind the cheap SERP key.',
            'Tavily collapses those nine standing components into one API call that returns scored, LLM-ready content, with the operating burden on the vendor, and the token bill drops because the model stops eating markup.',
          ]}
        />

        <DiyStrengthCallout>
          A handful of stable, friendly sources you control, or genuine SERP needs like rank tracking, are fine
          reasons to stay DIY. And if you need result-page metadata itself, a SERP API is the right product. The
          calculus flips when the consumer is an agent on the open web and the stack has to stay alive under
          real traffic.
        </DiyStrengthCallout>
      </div>
    </div>
  )
}
