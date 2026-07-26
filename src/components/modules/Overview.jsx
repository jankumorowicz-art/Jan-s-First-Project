import { ProofPoint, Icon, SourceLink } from '../ui'
import { proofPoints, independentPoints, totalOwnedComponents, sources } from '../../data/claims'
import WebLayerMap from '../viz/WebLayerMap'
import MaturityJourney from '../viz/MaturityJourney'
import FeatureMatrix from '../viz/FeatureMatrix'
import AlternativesMatrix from '../viz/AlternativesMatrix'

// The three roads teams are actually on, each linking to its comparison tab.
const roads = [
  {
    tab: 'diy',
    framing: 'Build vs. buy',
    title: 'A DIY stack',
    desc: 'A SERP API or DuckDuckGo call plus the fetchers, parsers, freshness checks, and on-call you maintain around it.',
    icon: 'wrench',
  },
  {
    tab: 'native',
    framing: 'Replace what is already there',
    title: 'Model-native search',
    desc: 'ChatGPT, Gemini, and Claude already search. Enough for chat in one ecosystem; closed and model-bound beyond it.',
    icon: 'sparkles',
  },
  {
    tab: 'searchapis',
    framing: 'Buy vs. buy',
    title: 'Other search APIs',
    desc: 'Brave and You.com answer with links and snippets; agent-native ones come down to an eval on your own queries.',
    icon: 'search',
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
          Any capable model can decide it needs the web. What is hard is everything between that decision and
          grounded context: search, fetching, extraction, deciding what is stale or good, and keeping it all
          alive under real traffic. Teams get that layer one of three ways today, and each is a different
          conversation. Some of it is build vs. buy; some of it is replacing what is already there.
        </p>
      </div>

      {/* The three roads, each linking to its comparison */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
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

      {/* Interactive web-layer hero */}
      <WebLayerMap />

      <p className="mt-6 text-[15px] text-gray-600 max-w-3xl">
        The DIY tab keeps a ledger of {totalOwnedComponents} standing components you would build and operate
        yourself. Added up, that is less a feature to ship than a platform-engineering commitment, with real
        headcount behind it, and when it breaks at 2am there is no vendor SLA behind the fix.
      </p>

      {/* Maturity journey */}
      <div className="mt-10">
        <MaturityJourney />
      </div>

      {/* The problem, sized by independent studies */}
      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          The problem, sized by independent studies
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <ProofPoint point={independentPoints.botTraffic} variant="independent" />
          <ProofPoint point={independentPoints.proxySpend} variant="independent" />
          <ProofPoint point={independentPoints.citations} variant="independent" />
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Independent studies size the problem space; they are not claims about Tavily or any competitor. The
          other big line item, token consumption, has no honest industry number, so the DIY tab has a calculator
          that models it from your own assumptions, calibrated by the Web Almanac's page-weight data.
        </p>
      </div>

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
          <SourceLink source={sources.faq} className="!inline" />
        </p>
      </div>

      {/* Landscape decision matrix */}
      <div className="mt-10">
        <AlternativesMatrix />
      </div>

      {/* Capability comparison */}
      <div className="mt-10">
        <FeatureMatrix />
      </div>
    </div>
  )
}
