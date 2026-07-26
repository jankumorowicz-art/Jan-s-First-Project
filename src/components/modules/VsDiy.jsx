import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ModuleHeader, TheJob, DiyTavilyToggle, OwnershipLedger, DiyStrengthCallout, TalkTrack } from '../ui'
import ResultComparator from '../viz/ResultComparator'
import FreshnessQuality from '../viz/FreshnessQuality'
import TavilySearch from '../tavily/TavilySearch'
import DiySearchPipeline from '../diy/DiySearchPipeline'
import TavilyExtract from '../tavily/TavilyExtract'
import DiyExtraction from '../diy/DiyExtraction'
import TavilyReliability from '../tavily/TavilyReliability'
import DiyReliability from '../diy/DiyReliability'
import TavilySecurity from '../tavily/TavilySecurity'
import DiySecurity from '../diy/DiySecurity'
import TavilyIntegration from '../tavily/TavilyIntegration'
import DiyIntegration from '../diy/DiyIntegration'
import { ledger } from '../../data/claims'

// One tab for the whole build-vs-buy argument: the SERP/DuckDuckGo call is
// step one of a stack, and each phase below is a piece of that stack.

const phases = [
  { key: 'search', label: 'Search' },
  { key: 'pages', label: 'Reading pages' },
  { key: 'fresh', label: 'Stale or good?' },
  { key: 'alive', label: 'Keeping it alive' },
  { key: 'audit', label: 'The audit' },
  { key: 'wiring', label: 'Agent wiring' },
]

const phaseDescs = {
  search: 'What one question costs in each world: the payloads, and the pipeline behind them.',
  pages: 'Search finds links. Something still has to render, clean, and read the pages, and at site scale that something is a crawler.',
  fresh: 'The quiet failure mode: nothing crashes when content is stale, junk, or duplicated. Someone has to decide what is good.',
  alive: 'Proxies get banned, quotas exhaust, sites redesign. Who carries the pager, and what does reliability look like as a product guarantee.',
  audit: 'Retention, third parties, credentials, patching: whoever owns the stack owns the security review.',
  wiring: 'A pipeline is not a tool. The MCP server and framework wrappers your agent actually calls have to come from somewhere.',
}

export default function VsDiy() {
  const [phase, setPhase] = useState('search')

  return (
    <div>
      <ModuleHeader
        eyebrow="Build vs. buy · 01"
        title="vs. the DIY stack"
        intro="SERP APIs, DuckDuckGo endpoints, and other open APIs are cheap to call and honest about what they are: link lists. The real cost is the stack you maintain around them: fetching, rendering, parsing, deciding what is stale or good, and keeping it all alive. Walk the phases; each one is a standing commitment."
      />

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
          {phase === 'fresh' && <FreshnessQuality />}
          {phase === 'alive' && (
            <DiyTavilyToggle
              tavily={<TavilyReliability />}
              diy={<DiyReliability />}
              note="Switch to walk through the incidents a self-built stack owns."
            />
          )}
          {phase === 'audit' && (
            <DiyTavilyToggle
              tavily={<TavilySecurity />}
              diy={<DiySecurity />}
              note="Same review questions. Switch to see who has to produce the answers."
            />
          )}
          {phase === 'wiring' && (
            <DiyTavilyToggle
              tavily={<TavilyIntegration />}
              diy={<DiyIntegration />}
              note="Same agent, same frameworks. Switch to see the wrapper work in the DIY world."
            />
          )}
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
            'The stack decays by default: proxies get banned, parsers rot when sites redesign, and stale or junk content degrades answers without ever throwing an error.',
            'Tavily collapses those nine standing components into one API call that returns scored, LLM-ready content, with the operating burden on the vendor.',
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
