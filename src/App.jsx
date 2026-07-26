import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './components/ui'

import Overview from './components/modules/Overview'
import VsDiy from './components/modules/VsDiy'
import VsNative from './components/modules/VsNative'
import VsSearchApis from './components/modules/VsSearchApis'

const tabs = [
  { key: 'overview', label: 'Overview', component: Overview },
  { key: 'diy', label: 'vs. DIY stack', icon: 'wrench', component: VsDiy },
  { key: 'native', label: 'vs. Model-native search', icon: 'sparkles', component: VsNative },
  { key: 'searchapis', label: 'vs. Brave & You.com', icon: 'search', component: VsSearchApis },
]

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
}

export default function App() {
  const [tabKey, setTabKey] = useState('overview')
  const tab = tabs.find(t => t.key === tabKey)
  const ActiveComponent = tab.component

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [tabKey])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.16)_0%,_transparent_60%)]" />
        <div className="section-container py-6 relative text-center">
          <button onClick={() => setTabKey('overview')} className="inline-block">
            <h1 className="text-white text-2xl md:text-3xl">
              Tavily <span className="text-white/40 font-normal">vs.</span> the alternatives
            </h1>
          </button>
          <p className="text-white/50 text-sm mt-1.5">the web layer for AI agents, compared road by road</p>
        </div>
      </div>

      {/* Top-tab nav */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="section-container py-2 overflow-x-auto">
          <div className="flex gap-1 min-w-max justify-center">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTabKey(t.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  tabKey === t.key ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}>
                {t.icon && <Icon name={t.icon} className="w-4 h-4" />}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div key={tabKey} {...pageTransition}>
          <div className="section-container py-12 md:py-16">
            <ActiveComponent onNavigate={setTabKey} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="section-container py-8">
          <p className="text-sm text-gray-400 text-center">
            Tavily is a commercial web access API for AI agents, now part of Nebius. Every number on this site
            links to a published Tavily or Nebius source. Where a number is not published, we show the mechanism
            without one. Third-party comparisons are qualitative; provider capabilities evolve, so check current
            docs before deciding.
          </p>
        </div>
      </footer>
    </div>
  )
}
