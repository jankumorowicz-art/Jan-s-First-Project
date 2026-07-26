import { Icon, SourceLink, FeatureList } from '../ui'
import { sources } from '../../data/claims'

// The managed compliance posture, stated only as far as Tavily documents it,
// with each claim linked to the docs.

const postures = [
  {
    icon: 'shield',
    label: 'SOC 2',
    body: 'Tavily documents SOC 2 compliance in its security and compliance docs, giving reviews a standard artifact to work from.',
    source: sources.trust,
  },
  {
    icon: 'lock',
    label: 'Zero data retention',
    body: 'Tavily documents a zero data retention posture for API usage: the retention question that costs a DIY stack an audit is answered by the vendor.',
    source: sources.faq,
  },
  {
    icon: 'eye',
    label: 'One vendor to review',
    body: 'The security review scopes to a single provider with published terms and docs, instead of a chain of scraping subcontractors.',
    source: sources.trust,
  },
]

export default function TavilySecurity() {
  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">A compliance posture you can point at</h3>
      <p className="text-sm text-gray-500 mb-5">
        With a managed layer, the same review questions get answered by vendor documentation. Everything below
        is stated only as far as Tavily publishes it, with the source linked.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        {postures.map(p => (
          <div key={p.label} className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 flex flex-col">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-3">
              <Icon name={p.icon} className="w-4 h-4" />
            </span>
            <div className="font-semibold text-gray-900 text-sm mb-1">{p.label}</div>
            <p className="text-[13px] text-gray-600 leading-relaxed mb-3">{p.body}</p>
            <div className="mt-auto"><SourceLink source={p.source} /></div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">What that changes operationally</div>
        <FeatureList variant="tavily" items={[
          { label: 'One credential', detail: 'a single API key with one rotation story, instead of a keyring of scraping vendors' },
          { label: 'Patching is the vendor’s job', detail: 'browsers, parsers, and infrastructure behind the API are maintained by Tavily' },
          { label: 'Terms you can hand to counsel', detail: 'published vendor terms in front of your web usage, instead of a per-site legal analysis' },
        ]} />
      </div>
    </div>
  )
}
