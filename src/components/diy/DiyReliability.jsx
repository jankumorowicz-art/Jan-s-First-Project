import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../ui'

// Failure-mode explorer: pick an incident and see its blast radius across the
// DIY stack. Qualitative by design; the point is who owns the fix.

const incidents = [
  {
    key: 'proxy',
    icon: 'layers',
    label: 'Proxy pool gets banned',
    blast: ['URL fetcher', 'Headless browsers', 'Crawler'],
    story: 'A target site flags your IP ranges. Fetch success rate drops across every pipeline that touches that site, and queues back up while you source and warm a new pool.',
    fix: 'You: rotate pools, renegotiate with the proxy vendor, re-run the backlog.',
  },
  {
    key: 'quota',
    icon: 'gauge',
    label: 'SERP quota exhausted mid-day',
    blast: ['SERP API', 'Every downstream step'],
    story: 'A traffic spike burns the daily quota by 2pm. Search silently returns errors, agents answer from stale knowledge, and nobody notices until a user does.',
    fix: 'You: emergency plan upgrade, provider failover code, and a postmortem on the missing alert.',
  },
  {
    key: 'redesign',
    icon: 'file',
    label: 'Top source site redesigns',
    blast: ['Parsers', 'Re-ranker inputs', 'Answer quality'],
    story: 'The parser does not crash, it returns empty or garbled text. Answers degrade quietly. This is the nastiest failure mode: nothing pages you.',
    fix: 'You: detect it (somehow), rewrite the parser, backfill the bad extractions.',
  },
  {
    key: 'browser',
    icon: 'server',
    label: 'Browser fleet OOMs at peak',
    blast: ['Headless browsers', 'JS-heavy extraction', 'Crawler throughput'],
    story: 'Memory-leaking renderer pods fall over under burst load. JS-heavy pages fail exactly when traffic is highest.',
    fix: 'You: page the on-call, recycle pods, retune memory limits, and revisit autoscaling.',
  },
]

export default function DiyReliability() {
  const [active, setActive] = useState('proxy')
  const inc = incidents.find(i => i.key === active)

  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Failure-mode explorer</h3>
      <p className="text-sm text-gray-500 mb-4">
        A DIY web layer is a chain of third parties and homegrown services, and each link fails in its own way.
        Pick an incident to trace its blast radius. Every fix lands on your team.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        {incidents.map(i => (
          <button key={i.key} onClick={() => setActive(i.key)}
            className={`rounded-xl border p-3 text-left transition-all duration-150 ${
              active === i.key
                ? 'border-amber-400 bg-amber-50 shadow-sm'
                : 'border-gray-200 bg-gray-50 hover:border-amber-300'
            }`}>
            <span className={`inline-flex w-6 h-6 rounded-md items-center justify-center mb-1.5 ${
              active === i.key ? 'bg-amber-500 text-white' : 'bg-white border border-gray-200 text-gray-500'
            }`}>
              <Icon name={i.icon} className="w-3.5 h-3.5" />
            </span>
            <div className="text-[13px] font-semibold text-gray-900 leading-tight">{i.label}</div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-700 self-center mr-1">blast radius:</span>
            {inc.blast.map(b => (
              <span key={b} className="px-2 py-0.5 rounded-md bg-white border border-amber-300 text-[11px] font-medium text-amber-800">{b}</span>
            ))}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">{inc.story}</p>
          <p className="text-[13px] text-gray-600 flex items-start gap-1.5">
            <Icon name="wrench" className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
            <span>{inc.fix}</span>
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 rounded-xl border border-gray-200 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">And the bill sprawls with the stack</div>
        <p className="text-sm text-gray-600 leading-relaxed">
          SERP API, proxy vendor, CAPTCHA solver, browser compute, and monitoring: separate invoices, separate
          pricing models, and no single lever to pull when the total climbs. Capacity planning means planning
          each of them independently.
        </p>
      </div>
    </div>
  )
}
