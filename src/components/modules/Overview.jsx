import { ProofPoint, Icon, SourceLink, QuoteCard, BottomLine } from '../ui'
import { proofPoints, independentPoints, sources, voices } from '../../data/claims'
import MaturityJourney from '../viz/MaturityJourney'
import AlternativesMatrix from '../viz/AlternativesMatrix'

// The four roads, each linking to its comparison tab.
const roads = [
  {
    tab: 'diy',
    framing: 'Build vs. buy',
    title: 'SERP APIs & DIY',
    desc: 'A SERP or DuckDuckGo call plus the fetchers, parsers, and on-call you maintain around it.',
    icon: 'wrench',
  },
  {
    tab: 'native',
    framing: 'Replace what is already there',
    title: 'Model built-in search',
    desc: 'ChatGPT, Gemini, and Claude already search. Enough for chat in one ecosystem.',
    icon: 'sparkles',
  },
  {
    tab: 'searchapis',
    framing: 'Buy vs. buy',
    title: 'Legacy search APIs',
    desc: 'Brave and You.com answer with links and snippets built for results pages.',
    icon: 'search',
  },
  {
    tab: 'trust',
    framing: 'Before all of it',
    title: 'Enterprise Ready',
    desc: 'Scale record, SOC 2, zero data retention, safe search, PII filtering, prompt-injection protection.',
    icon: 'shield',
  },
]

export default function Overview({ onNavigate }) {
  return (
    <div>
      {/* Framing */}
      <div className="max-w-3xl mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Overview</div>
        <h2 className="mb-4">Your agent is the easy part.</h2>
        <p className="text-lg text-gray-500">
          Everything between "the agent needs the web" and grounded context is the web layer: search, fetching,
          extraction, freshness, uptime. Tavily's category for that layer is agentic search. Pick the comparison
          your team is actually facing.
        </p>
      </div>

      <BottomLine
        verdict="Web access is not a feature you add, it is infrastructure someone runs. The choice is whether that someone is your engineering team."
        chips={[
          'Two calculators for your own numbers',
          'Every Tavily figure links to its source',
          'Independent evidence labelled separately',
          'No competitor benchmarks',
        ]}
      />

      {/* The roads, each linking to its comparison */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {roads.map(r => (
          <button key={r.tab} onClick={() => onNavigate && onNavigate(r.tab)}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-left hover:border-blue-300 hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                <Icon name={r.icon} className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{r.framing}</span>
            </div>
            <div className="font-bold text-gray-900 mb-1">{r.title}</div>
            <p className="text-[13px] text-gray-500 leading-snug mb-3">{r.desc}</p>
            <span className="text-xs font-semibold text-blue-600 inline-flex items-center gap-1">
              See the comparison <Icon name="arrow" className="w-3.5 h-3.5" />
            </span>
          </button>
        ))}
      </div>

      {/* Maturity journey */}
      <MaturityJourney />

      {/* Published scale proof */}
      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          The scale behind the managed layer, as published by Tavily and Nebius
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProofPoint point={proofPoints.requests} />
          <ProofPoint point={proofPoints.developers} />
          <ProofPoint point={proofPoints.uptime} />
          <ProofPoint point={proofPoints.latency} />
        </div>
        <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5 flex-wrap">
          <Icon name="shield" className="w-3.5 h-3.5 text-blue-500" />
          Tavily also documents SOC 2 compliance and zero data retention.
          <SourceLink source={sources.trust} className="!inline" />
        </p>
      </div>

      {/* What it costs, and what the trend is */}
      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          Where the cost actually sits
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="font-semibold text-gray-900 text-sm mb-1">Engineering time</div>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              The DIY tab lists nine standing components and gives you a calculator: put in the engineering time
              your team would spend and its loaded cost, and compare it with your Tavily spend.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="font-semibold text-gray-900 text-sm mb-1">Token spend</div>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Raw page markup is billed at your input rate on every call. The token calculator models that gap
              from your own traffic and prices, with the Web Almanac's page-weight data to calibrate it.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="font-semibold text-gray-900 text-sm mb-1">The cost curve</div>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              DIY access gets more expensive over time, not less: practitioners report rising proxy and
              anti-bot spend as defenses tighten. The managed layer absorbs that curve.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <ProofPoint point={independentPoints.botTraffic} variant="independent" />
          <ProofPoint point={independentPoints.proxySpend} variant="independent" />
        </div>
      </div>

      {/* On the record */}
      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          On the record
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <QuoteCard voice={voices.weiss} />
          <QuoteCard voice={voices.chernin} />
        </div>
      </div>

      {/* Landscape decision matrix */}
      <div className="mt-10">
        <AlternativesMatrix />
      </div>
    </div>
  )
}
