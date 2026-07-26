import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ------------------------------------------------------------
   Icons (inline SVG, no dependency)
   ------------------------------------------------------------ */

export function Icon({ name, className = 'w-4 h-4' }) {
  const paths = {
    wrench: <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.5 2.5-2-2 2.5-2.5Z" />,
    check: <path d="M20 6 9 17l-5-5" />,
    bolt: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    alert: <><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6A2 2 0 0 0 22 18L13.7 3.9a2 2 0 0 0-3.4 0Z" /></>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    server: <><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" /></>,
    shield: <path d="M12 3 4 6v6c0 4.5 3.2 7.7 8 9 4.8-1.3 8-4.5 8-9V6l-8-3Z" />,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="2.5" /></>,
    lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    rocket: <><path d="M12 3c3 1 6 4 6 9l-3 3H9l-3-3c0-5 3-8 6-9Z" /><path d="M9 15l-3 4M15 15l3 4M12 9.5v.01" /></>,
    sparkles: <><path d="M12 3v6M9 6h6" /><path d="M6 13v4M4 15h4" /><path d="M17 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" /></>,
    external: <><path d="M14 5h5v5" /><path d="M19 5l-8 8" /><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" /></>,
    dollar: <><path d="M12 2v20" /><path d="M17 6.5C17 4.6 14.8 3.5 12 3.5S7 4.6 7 6.5 9.2 9.5 12 9.5s5 1.1 5 3-2.2 3-5 3-5-1.1-5-3" /></>,
    gauge: <><path d="M12 13l4-3" /><path d="M4 18a8 8 0 1 1 16 0" /><circle cx="12" cy="13" r="1.4" fill="currentColor" stroke="none" /></>,
    play: <path d="M7 5v14l11-7-11-7Z" />,
    folder: <path d="M4 5h5l2 2h9v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />,
    file: <><path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v4h4" /></>,
    branch: <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M6 8.5v7M18 8.5c0 4-6 3-6 6.5" /></>,
    spider: <><circle cx="12" cy="12" r="3" /><path d="M12 9V4M12 15v5M9.5 10 5 6M14.5 10 19 6M9.5 14 5 18M14.5 14 19 18" /></>,
    plug: <><path d="M9 7V3M15 7V3" /><path d="M6 7h12v4a6 6 0 0 1-12 0V7Z" /><path d="M12 17v4" /></>,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name] || null}
    </svg>
  )
}

/* ------------------------------------------------------------
   Module scaffolding
   ------------------------------------------------------------ */

export function ModuleHeader({ eyebrow, title, intro }) {
  return (
    <div className="max-w-3xl mb-10">
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="mb-4">{title}</h2>
      <p className="text-lg text-gray-500">{intro}</p>
    </div>
  )
}

// Reusable sub-navigation used inside each walkthrough (phases / sections).
export function SubTabs({ tabs, active, onChange, description }) {
  return (
    <div className="mb-6">
      <div className="inline-flex flex-wrap gap-1 bg-gray-100 rounded-xl p-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => onChange(t.key)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              active === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}>
            {t.label}
          </button>
        ))}
      </div>
      {description && <p className="text-sm text-gray-500 mt-3 max-w-2xl">{description}</p>}
    </div>
  )
}

// Segmented toggle that swaps between the Tavily walkthrough and the DIY
// parallel. `tavily` / `diy` are render nodes.
export function DiyTavilyToggle({ tavily, diy, note = 'Same job. Switch to see what it takes when you assemble the stack yourself.' }) {
  const [mode, setMode] = useState('tavily')
  return (
    <div>
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="seg-toggle">
          <button onClick={() => setMode('tavily')}
            className={`seg-btn ${mode === 'tavily' ? 'seg-btn-active' : ''}`}>Tavily</button>
          <button onClick={() => setMode('diy')}
            className={`seg-btn ${mode === 'diy' ? 'seg-btn-active' : ''}`}>DIY stack</button>
        </div>
        <span className="text-xs text-gray-400 inline-flex items-center gap-1.5">
          <Icon name="arrow" className="w-3.5 h-3.5" /> {note}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={mode}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.3 }}>
          {mode === 'tavily' ? tavily : diy}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Divider that introduces the DIY addition beneath the Tavily walkthrough on
// each tab.
export function DiyLens({ title, intro }) {
  return (
    <div className="mt-14 mb-8 border-t border-gray-200 pt-8">
      <span className="pill pill-diy">build-it-yourself lens</span>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-3">{title}</h3>
      {intro && <p className="text-gray-500 mt-2 max-w-3xl">{intro}</p>}
    </div>
  )
}

export function TheJob({ children }) {
  return (
    <div className="glass-card p-5 mb-8 flex items-start gap-3">
      <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center">
        <Icon name="bolt" className="w-4 h-4" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">The job to be done</div>
        <p className="text-gray-700 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------
   Side-by-side comparison
   ------------------------------------------------------------ */

export function SplitCompare({ children }) {
  return <div className="grid md:grid-cols-2 gap-6 items-start">{children}</div>
}

export function ComparePanel({ variant = 'diy', title, subtitle, pillLabel, children }) {
  const isTavily = variant === 'tavily'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border bg-white overflow-hidden shadow-sm ${
        isTavily ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-200'
      }`}
    >
      <div className={`h-1.5 w-full ${isTavily ? 'bg-gradient-to-r from-blue-600 to-sky-400' : 'bg-gray-300'}`} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className={`pill ${isTavily ? 'pill-tavily' : 'pill-diy'}`}>
            {pillLabel || (isTavily ? 'Tavily' : 'DIY stack')}
          </span>
        </div>
        {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
        {children}
      </div>
    </motion.div>
  )
}

export function FeatureList({ variant = 'diy', items }) {
  const isTavily = variant === 'tavily'
  return (
    <ul className="space-y-3 mt-4">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
            isTavily ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
          }`}>
            <Icon name={isTavily ? 'check' : 'wrench'} className="w-3 h-3" />
          </span>
          <span className="text-sm text-gray-700 leading-snug">
            <span className="font-medium text-gray-900">{it.label}</span>
            {it.detail && <span className="text-gray-500">: {it.detail}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------
   Code / config block (dark, syntax-tinted)
   ------------------------------------------------------------ */

export function CodeBlock({ title, children }) {
  return (
    <div className="code-block mt-5">
      <div className="code-head">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </span>
        {title && <span className="ml-2">{title}</span>}
      </div>
      <pre className="code-body"><code>{children}</code></pre>
    </div>
  )
}

/* ------------------------------------------------------------
   Sourcing: honest attribution for every external claim
   ------------------------------------------------------------ */

export function SourceLink({ source, className = '' }) {
  return (
    <a href={source.url} target="_blank" rel="noopener noreferrer"
      className={`proof-src ${className}`} title={source.title}>
      <Icon name="external" className="w-3 h-3" />
      <span className="truncate max-w-[220px]">{source.title}</span>
    </a>
  )
}

// A clearly-labelled proof point, published by Tavily or Nebius.
export function ProofPoint({ point, className = '' }) {
  return (
    <div className={`proof ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="badge-published">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> published
        </span>
      </div>
      <div className="proof-stat mb-1">{point.stat}</div>
      <p className="text-sm text-gray-600 mb-3">{point.label}</p>
      <SourceLink source={point.source} />
    </div>
  )
}

/* ------------------------------------------------------------
   Honest nod: keeps the pain-forward framing credible
   ------------------------------------------------------------ */

export function DiyStrengthCallout({ children, title = 'When building it yourself is the right call' }) {
  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 flex items-start gap-3">
      <div className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-500 flex items-center justify-center">
        <Icon name="check" className="w-4 h-4" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">{title}</div>
        <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------
   Ownership ledger: what YOU operate vs. what's managed
   ------------------------------------------------------------ */

export function OwnershipLedger({ items, title = 'What you operate yourself' }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 mt-8">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">{title}</div>
        <span className="text-[11px] font-medium text-gray-400">{items.length} to own</span>
      </div>
      <p className="text-xs text-gray-400 mb-5">
        Each of these is yours to build, run, and keep alive when you assemble the web layer yourself.
      </p>

      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="shrink-0 w-6 h-6 rounded-md bg-gray-100 text-gray-500 flex items-center justify-center">
                  <Icon name="wrench" className="w-3.5 h-3.5" />
                </span>
                <span className="font-semibold text-gray-900 text-sm">{item.label}</span>
              </div>
              <span className="ledger-tag ledger-you shrink-0"><Icon name="wrench" className="w-3 h-3" /> you own it</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{item.work}</p>
            <div className="mt-2.5 flex items-start gap-1.5 text-xs text-blue-600 border-t border-gray-100 pt-2.5">
              <Icon name="check" className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span><span className="font-medium">With Tavily:</span> {item.tavily}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Building your own web layer means owning the SERP contracts, scraper fleet, proxy pools, parsers, and the
        operational tooling around them. Tavily packages that layer as one API.{' '}
        <SourceLink source={{ title: 'Tavily API reference: introduction', url: 'https://docs.tavily.com/documentation/api-reference/introduction' }} className="!inline" />
      </p>
    </div>
  )
}
