import { Icon } from '../ui'

// The three DIY stages are a rising-effort curve; Tavily is the off-ramp
// teams take. Effort bars are qualitative, not measurements.
const diyStages = [
  { phase: 'Prototype', size: 'one agent, a demo, light traffic', note: 'A SERP key and a fetch loop work fine.', effort: 'w-1/3' },
  { phase: 'Growing', size: 'more use cases, more sources', note: 'Scrapers, parsers, and a re-ranker pile up around the SERP call.', effort: 'w-2/3' },
  { phase: 'Scaling pain', size: 'production traffic, real users', note: 'Bans, CAPTCHAs, silent parser rot, vendor sprawl, and on-call for all of it.', effort: 'w-full' },
]

export default function MaturityJourney() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">The path most agent teams take</div>
      <p className="text-sm text-gray-500 mb-5">
        On a self-built web layer, effort keeps climbing as you scale, but the agent does not get smarter for it.
        The managed layer is the off-ramp: the point where teams stop operating retrieval and go back to shipping
        the agent.
      </p>

      <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
        {/* Rising-effort DIY path */}
        <div className="lg:flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 mb-2">
            DIY stack: effort climbs, answers do not improve
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {diyStages.map((s, i) => (
              <div key={i} className="rounded-xl border border-amber-200 bg-amber-50/40 p-3 flex flex-col">
                <div className="font-semibold text-gray-900 text-sm leading-tight mb-1">{s.phase}</div>
                <div className="text-[11px] text-gray-500 mb-2">{s.size}</div>
                <div className="h-1.5 rounded-full bg-amber-100 overflow-hidden mb-2">
                  <div className={`h-full rounded-full bg-amber-500 ${s.effort}`} />
                </div>
                <p className="text-[12px] text-gray-600 leading-snug">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The shift */}
        <div className="flex lg:flex-col items-center justify-center gap-1 text-blue-600 shrink-0">
          <Icon name="arrow" className="w-6 h-6 rotate-90 lg:rotate-0" />
          <span className="text-[10px] font-semibold uppercase tracking-wide text-blue-600 whitespace-nowrap">the shift</span>
        </div>

        {/* Tavily destination */}
        <div className="lg:w-72 shrink-0 rounded-xl border-2 border-blue-300 ring-1 ring-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 flex flex-col">
          <span className="inline-flex items-center gap-1 self-start rounded-full bg-blue-600 text-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide mb-2">
            Where teams land
          </span>
          <div className="font-bold text-gray-900 text-base leading-tight mb-1">Tavily web layer</div>
          <p className="text-[12px] text-gray-600 leading-snug mb-3">
            Search, Extract, Crawl, and Map behind one API. Retrieval becomes a dependency you call, not a
            platform you staff.
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md bg-green-50 border border-green-200 px-2 py-1 text-[11px] font-medium text-green-700">↓ ops effort</span>
            <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 border border-blue-200 px-2 py-1 text-[11px] font-medium text-blue-700">↑ agent focus</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4 flex items-start gap-1.5">
        <Icon name="check" className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-500" />
        The question your agent asks never changes. What changes is how much machinery you personally operate
        between the question and a grounded answer.
      </p>
    </div>
  )
}
