import { useState } from 'react'
import { Icon } from '../ui'

// Time and headcount math with the reader's own assumptions. Like the token
// calculator, this publishes no vendor numbers: the ledger says what a DIY
// stack demands, the reader says what their engineers cost, and arithmetic
// does the rest.

const fmtUsd = n => '$' + Math.round(n).toLocaleString()

export default function OwnershipMath() {
  const [engineers, setEngineers] = useState(1.5)   // FTEs on the DIY stack
  const [cost, setCost] = useState(220)             // fully loaded $k / engineer / year
  const [tavilySpend, setTavilySpend] = useState(2000) // $ / month on Tavily

  const diyAnnual = engineers * cost * 1000
  const tavilyAnnual = tavilySpend * 12
  const delta = diyAnnual - tavilyAnnual

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 mt-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Headcount math, with your assumptions</div>
      <p className="text-sm text-gray-500 mb-5 max-w-3xl">
        The ledger above lists what a DIY stack demands. What that costs is your call: estimate the engineering
        time it would absorb at your team's rates, and compare it with what you would spend on the managed
        layer. No vendor numbers below; every input is yours.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
              Engineering time on the DIY stack: <span className="text-gray-700">{engineers} FTE</span>
            </div>
            <input type="range" min="0.25" max="4" step="0.25" value={engineers}
              onChange={e => setEngineers(Number(e.target.value))} className="w-full accent-blue-600" />
            <p className="text-[11px] text-gray-400 mt-1">Build plus the standing maintenance share, across the team.</p>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
              Fully loaded cost per engineer: <span className="text-gray-700">${cost}k / year</span>
            </div>
            <input type="range" min="120" max="400" step="10" value={cost}
              onChange={e => setCost(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
              Your Tavily spend, $ per month
            </div>
            <input type="number" min="0" step="100" value={tavilySpend}
              onChange={e => setTavilySpend(Math.max(0, Number(e.target.value)))}
              className="w-32 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-800" />
            <p className="text-[11px] text-gray-400 mt-1">Plans are credit-metered; put your real or quoted number here.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/40 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 mb-1">Running the DIY stack</div>
            <div className="text-2xl font-bold text-amber-700 leading-none mb-1">{fmtUsd(diyAnnual)} / year</div>
            <div className="text-sm text-gray-600">in engineering time, at your assumptions</div>
          </div>
          <div className="rounded-xl border border-blue-200 ring-1 ring-blue-100 bg-white p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-600 mb-1">Buying the layer</div>
            <div className="text-2xl font-bold text-blue-600 leading-none mb-1">{fmtUsd(tavilyAnnual)} / year</div>
            <div className="text-sm text-gray-600">at your stated monthly spend</div>
          </div>
          <div className="rounded-xl bg-gray-900 text-white p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1">The gap, at your assumptions</div>
            <div className="text-2xl font-bold leading-none mb-1">{fmtUsd(Math.abs(delta))} / year</div>
            <div className="text-sm text-gray-300 flex items-start gap-1.5">
              <Icon name="bolt" className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              {delta >= 0
                ? 'plus the engineers back on the product instead of the plumbing'
                : 'at these assumptions DIY is cheaper on paper; check the ledger for what the paper leaves out'}
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 mt-4">
        Arithmetic only: (FTEs × fully loaded cost) vs (monthly spend × 12). Opportunity cost, incident risk,
        and compliance work are not in the model; they all sit on the DIY side of it.
      </p>
    </div>
  )
}
