import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../ui'

// Decision matrix across the four ways teams get web access for agents.
// Qualitative by design: it compares mechanisms and ownership, not numbers.

const columns = [
  { key: 'native', label: 'Model-native search' },
  { key: 'searchapi', label: 'Index-first search API' },
  { key: 'diy', label: 'DIY stack' },
  { key: 'tavily', label: 'Tavily', highlight: true },
]

// cell: 'yes' | 'partial' | 'build' | 'no'
const rows = [
  {
    need: 'Grounded answers inside one chat product',
    cells: { native: 'yes', searchapi: 'build', diy: 'build', tavily: 'yes' },
    detail: 'Built-in search shines here: inside that provider\'s app or API, grounding is a switch you flip. With a search API or DIY stack you wire retrieval into the model yourself. With Tavily it is one tool call, in whichever model you use.',
  },
  {
    need: 'Same retrieval across every model you use',
    cells: { native: 'no', searchapi: 'yes', diy: 'yes', tavily: 'yes' },
    detail: 'Native search travels with its own model. Swap ChatGPT for Claude or Gemini, or run several side by side, and each brings different retrieval behavior you cannot align. Provider-independent layers give every model the same view of the web.',
  },
  {
    need: 'Full page content you can store and index',
    cells: { native: 'no', searchapi: 'partial', diy: 'build', tavily: 'yes' },
    detail: 'Native search returns an answer with citations, not a corpus: the retrieved content stays inside the provider\'s pipeline. Search APIs return links and snippets, sometimes more. Building your own RAG store needs the extracted content itself, which is what Extract returns.',
  },
  {
    need: 'Crawl or map a whole site',
    cells: { native: 'no', searchapi: 'no', diy: 'build', tavily: 'yes' },
    detail: 'Neither native search nor a search index API walks a specific site for you. DIY means writing a crawler. Tavily ships Crawl and Map as endpoints.',
  },
  {
    need: 'Control over retrieval (domains, depth, recency)',
    cells: { native: 'partial', searchapi: 'partial', diy: 'yes', tavily: 'yes' },
    detail: 'Native search exposes some knobs and they vary by provider. Search APIs give query-level control but the fetching and cleaning behind a result stays theirs. DIY gives total control at total cost. Tavily documents parameters like include_domains, search_depth, and time_range on the API.',
  },
  {
    need: 'Who operates the retrieval infrastructure',
    cells: { native: 'yes', searchapi: 'partial', diy: 'build', tavily: 'yes' },
    detail: 'Native search and Tavily are managed end to end. A search API manages the index but leaves the content layer (fetching pages, extraction, cleaning) on your side, which is most of the vs. DIY tab. DIY means all of it is yours.',
  },
]

const cellStyle = {
  yes: { icon: 'check', cls: 'bg-green-50 text-green-600 border-green-200', label: 'covered' },
  partial: { icon: 'alert', cls: 'bg-amber-50 text-amber-600 border-amber-200', label: 'partial' },
  build: { icon: 'wrench', cls: 'bg-gray-100 text-gray-500 border-gray-200', label: 'you build it' },
  no: { icon: 'alert', cls: 'bg-red-50 text-red-500 border-red-200', label: 'not what it does' },
}

export default function AlternativesMatrix() {
  const [open, setOpen] = useState(rows[1].need)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="p-6 pb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Pick your need, read across</div>
        <p className="text-sm text-gray-500">
          Four ways to give an agent the web, compared by mechanism and ownership. Click a row for the reasoning.
          Provider capabilities evolve, so treat the third-party columns as the shape of each approach, not a spec
          sheet, and check current docs before deciding.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-6 py-2.5 font-semibold text-gray-500 text-xs uppercase tracking-wide min-w-[220px]">The need</th>
              {columns.map(c => (
                <th key={c.key} className={`px-4 py-2.5 font-semibold text-xs uppercase tracking-wide whitespace-nowrap ${c.highlight ? 'text-blue-600' : 'text-gray-500'}`}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map(r => {
              const isOpen = open === r.need
              return [
                <tr key={r.need} onClick={() => setOpen(isOpen ? null : r.need)}
                  className={`align-top cursor-pointer transition-colors duration-150 ${isOpen ? 'bg-blue-50/40' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-3 font-medium text-gray-900">
                    <span className="inline-flex items-center gap-2">
                      <Icon name="arrow" className={`w-3.5 h-3.5 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                      {r.need}
                    </span>
                  </td>
                  {columns.map(c => {
                    const s = cellStyle[r.cells[c.key]]
                    return (
                      <td key={c.key} className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${s.cls}`}>
                          <Icon name={s.icon} className="w-3 h-3" /> {s.label}
                        </span>
                      </td>
                    )
                  })}
                </tr>,
                isOpen && (
                  <tr key={r.need + '-detail'} className="bg-blue-50/40">
                    <td colSpan={columns.length + 1} className="px-6 pb-4 pt-0">
                      <AnimatePresence>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="text-[13px] text-gray-600 leading-relaxed max-w-4xl pl-[22px]">
                          {r.detail}
                        </motion.p>
                      </AnimatePresence>
                    </td>
                  </tr>
                ),
              ]
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
