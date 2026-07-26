import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../ui'

// Interactive hero: the components of a self-built web layer, and the same
// surface area collapsed into one API. Click a component to see the work it
// hides. Mechanism only, no invented numbers.

const diyParts = [
  {
    key: 'serp', icon: 'search', label: 'SERP API',
    detail: 'A ranked list of links and snippets, built for humans clicking results. Query syntax, rate limits, and result schemas vary per provider and change without notice.',
  },
  {
    key: 'fetcher', icon: 'globe', label: 'URL fetcher',
    detail: 'Turns links into pages: HTTP clients, redirects, timeouts, retries, and content-type sniffing for every result of every query.',
  },
  {
    key: 'browser', icon: 'server', label: 'Headless browsers',
    detail: 'JavaScript-heavy pages need real rendering. A Chrome fleet to provision, scale, patch, and babysit.',
  },
  {
    key: 'proxies', icon: 'layers', label: 'Proxy pools',
    detail: 'Residential and datacenter IPs, rotation logic, and ban-rate monitoring, renegotiated with vendors as pools go stale.',
  },
  {
    key: 'captcha', icon: 'alert', label: 'Anti-bot handling',
    detail: 'CAPTCHA solving services, user-agent rotation, cookie management, and a permanent arms race with site defenses.',
  },
  {
    key: 'parsers', icon: 'file', label: 'Parsers & cleaners',
    detail: 'Readability heuristics, per-site selectors, and boilerplate stripping that rot silently as sites redesign.',
  },
  {
    key: 'ranker', icon: 'gauge', label: 'Re-ranking layer',
    detail: 'SERP order optimizes clicks, not answers. An embedding or cross-encoder re-ranker you host and tune.',
  },
  {
    key: 'ops', icon: 'clock', label: 'Monitoring & on-call',
    detail: 'Success-rate dashboards per provider and the humans who wake up when the pipeline dies at 2am.',
  },
]

const tavilyEndpoints = [
  { name: 'Search', desc: 'Ranked, scored, LLM-ready results with content included' },
  { name: 'Extract', desc: 'Clean page content from one or many URLs' },
  { name: 'Crawl', desc: 'Graph-style site traversal with built-in extraction' },
  { name: 'Map', desc: 'Fast discovery of a site’s structure' },
]

export default function WebLayerMap() {
  const [mode, setMode] = useState('diy')
  const [active, setActive] = useState(null)
  const activePart = diyParts.find(p => p.key === active)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          The web layer, two ways
        </div>
        <div className="seg-toggle">
          <button onClick={() => { setMode('diy'); setActive(null) }}
            className={`seg-btn ${mode === 'diy' ? 'seg-btn-active' : ''}`}>Build it</button>
          <button onClick={() => { setMode('tavily'); setActive(null) }}
            className={`seg-btn ${mode === 'tavily' ? 'seg-btn-active' : ''}`}>Buy it</button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-5">
        {mode === 'diy'
          ? 'Everything your agent needs between "I have a question" and "I have grounded context". Click a component to see the work it hides.'
          : 'The same surface area behind one API and one key. Four endpoints cover search, extraction, crawling, and site mapping.'}
      </p>

      <AnimatePresence mode="wait">
        {mode === 'diy' ? (
          <motion.div key="diy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {diyParts.map((p, i) => (
                <motion.button
                  key={p.key}
                  onClick={() => setActive(active === p.key ? null : p.key)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className={`rounded-xl border p-3 text-left transition-all duration-150 ${
                    active === p.key
                      ? 'border-amber-400 bg-amber-50 shadow-sm'
                      : 'border-gray-200 bg-gray-50 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                >
                  <span className={`inline-flex w-7 h-7 rounded-lg items-center justify-center mb-2 ${
                    active === p.key ? 'bg-amber-500 text-white' : 'bg-white border border-gray-200 text-gray-500'
                  }`}>
                    <Icon name={p.icon} className="w-4 h-4" />
                  </span>
                  <div className="text-[13px] font-semibold text-gray-900 leading-tight">{p.label}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">you build & run it</div>
                </motion.button>
              ))}
            </div>
            <AnimatePresence>
              {activePart && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4 flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                      <Icon name={activePart.icon} className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-0.5">{activePart.label}</div>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{activePart.detail}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div key="tavily" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="rounded-xl border-2 border-blue-300 ring-1 ring-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Icon name="bolt" className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-bold text-gray-900 leading-tight">api.tavily.com</div>
                  <div className="text-[11px] text-gray-500">one API key, one vendor, one contract</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-4 gap-3">
                {tavilyEndpoints.map((e, i) => (
                  <motion.div key={e.name}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="rounded-lg border border-blue-200 bg-white p-3">
                    <div className="font-mono text-[12px] text-blue-600 mb-1">/{e.name.toLowerCase()}</div>
                    <div className="text-[13px] font-semibold text-gray-900 leading-tight mb-1">{e.name}</div>
                    <p className="text-[12px] text-gray-500 leading-snug">{e.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
