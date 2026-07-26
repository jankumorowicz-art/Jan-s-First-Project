import { useState } from 'react'
import { Icon, SourceLink } from '../ui'
import { independentSources } from '../../data/claims'

// Token math with the reader's own assumptions. Deliberately publishes no
// vendor numbers: every input is a slider or field the reader controls, and
// the arithmetic is the argument. The default multiplier is an assumption to
// replace with your own measurement, and the UI says so.

const fmt = n => {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'k'
  return String(Math.round(n))
}
const fmtUsd = n => '$' + n.toLocaleString(undefined, { maximumFractionDigits: 0 })

export default function TokenMath() {
  const [queriesK, setQueriesK] = useState(100)      // thousands of queries per month
  const [pages, setPages] = useState(5)              // pages read per query
  const [cleanTokens, setCleanTokens] = useState(1500) // tokens per cleaned page
  const [multiplier, setMultiplier] = useState(5)    // raw-page overhead vs cleaned
  const [price, setPrice] = useState(3)              // $ per 1M input tokens

  const queries = queriesK * 1000
  const cleanMonthly = queries * pages * cleanTokens
  const rawMonthly = cleanMonthly * multiplier
  const cleanCost = (cleanMonthly / 1e6) * price
  const rawCost = (rawMonthly / 1e6) * price

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Token math, with your assumptions</div>
      <p className="text-sm text-gray-500 mb-5 max-w-3xl">
        Every token of page markup, navigation, and boilerplate that reaches the model is billed at your input
        rate, on every query, every scheduled run. There are no vendor numbers below: set each assumption
        yourself, and measure the overhead multiplier by tokenizing one raw page next to its cleaned text.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
              Agent queries per month: <span className="text-gray-700">{fmt(queries)}</span>
            </div>
            <input type="range" min="1" max="5000" value={queriesK}
              onChange={e => setQueriesK(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
              Pages read per query: <span className="text-gray-700">{pages}</span>
            </div>
            <input type="range" min="1" max="10" value={pages}
              onChange={e => setPages(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
              Tokens per cleaned page: <span className="text-gray-700">{cleanTokens.toLocaleString()}</span>
            </div>
            <input type="range" min="500" max="5000" step="100" value={cleanTokens}
              onChange={e => setCleanTokens(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
              Raw-page overhead multiplier: <span className="text-gray-700">{multiplier}x</span>
              <span className="normal-case font-normal text-gray-400"> (your assumption; measure it on your own pages)</span>
            </div>
            <input type="range" min="2" max="15" value={multiplier}
              onChange={e => setMultiplier(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
              Your model's input price, $ per 1M tokens
            </div>
            <input type="number" min="0" step="0.25" value={price}
              onChange={e => setPrice(Math.max(0, Number(e.target.value)))}
              className="w-28 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-800" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/40 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 mb-1">Feeding raw pages</div>
            <div className="text-2xl font-bold text-amber-700 leading-none mb-1">{fmt(rawMonthly)} tokens/mo</div>
            <div className="text-sm text-gray-600">about {fmtUsd(rawCost)} per month in input tokens</div>
          </div>
          <div className="rounded-xl border border-blue-200 ring-1 ring-blue-100 bg-white p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-600 mb-1">Feeding cleaned content</div>
            <div className="text-2xl font-bold text-blue-600 leading-none mb-1">{fmt(cleanMonthly)} tokens/mo</div>
            <div className="text-sm text-gray-600">about {fmtUsd(cleanCost)} per month in input tokens</div>
          </div>
          <div className="rounded-xl bg-gray-900 text-white p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1">The gap, at your assumptions</div>
            <div className="text-2xl font-bold leading-none mb-1">{fmtUsd(Math.max(0, rawCost - cleanCost))} / month</div>
            <div className="text-sm text-gray-300 flex items-start gap-1.5">
              <Icon name="bolt" className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              spent on markup, nav, and boilerplate the model never needed
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 mt-4">
        Arithmetic only: (queries × pages × tokens per page × price), with the raw side multiplied by your
        overhead assumption. Whether cleaning happens in your DIY pipeline or behind a managed API, the token
        saving is real; the difference is who builds and runs the cleaning. For calibrating the multiplier: the
        median desktop page weighs 2,652 KB per the Web Almanac's measurement of millions of real pages, while
        the readable text an agent needs is typically a few KB of that.{' '}
        <SourceLink source={independentSources.webAlmanac} className="!inline" />
      </p>
    </div>
  )
}
