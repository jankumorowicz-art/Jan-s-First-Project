import { ProofPoint } from '../ui'
import { proofPoints, totalOwnedComponents } from '../../data/claims'
import WebLayerMap from '../viz/WebLayerMap'
import MaturityJourney from '../viz/MaturityJourney'
import FeatureMatrix from '../viz/FeatureMatrix'

export default function Overview() {
  return (
    <div>
      {/* Framing */}
      <div className="max-w-3xl mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Overview</div>
        <h2 className="mb-4">Your agent is the easy part.</h2>
        <p className="text-lg text-gray-500">
          Any capable model can decide it needs the web. What is hard is everything between that decision and
          grounded context: search, fetching, rendering, extraction, ranking, and the infrastructure that keeps
          it all alive under real traffic. Build that layer from SERP APIs, scrapers, proxies, and parsers, and
          it becomes yours to operate. Tavily packages it as one API: Search, Extract, Crawl, and Map.
        </p>
      </div>

      {/* Interactive web-layer hero */}
      <WebLayerMap />

      <p className="mt-6 text-[15px] text-gray-600 max-w-3xl">
        Across this site the ownership ledger counts {totalOwnedComponents} components you would build and
        operate yourself. Added up, that is less a feature to ship than a standing infrastructure commitment,
        with real headcount behind it, and when it breaks at 2am there is no vendor SLA behind the fix.
      </p>

      {/* Maturity journey */}
      <div className="mt-10">
        <MaturityJourney />
      </div>

      {/* Published scale proof */}
      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          The scale behind the managed layer, as published by Tavily and Nebius
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <ProofPoint point={proofPoints.requests} />
          <ProofPoint point={proofPoints.developers} />
          <ProofPoint point={proofPoints.uptime} />
        </div>
      </div>

      {/* Feature comparison */}
      <div className="mt-10">
        <FeatureMatrix />
      </div>
    </div>
  )
}
