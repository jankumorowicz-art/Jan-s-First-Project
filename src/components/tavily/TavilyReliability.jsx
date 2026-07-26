import { ProofPoint, FeatureList, SourceLink } from '../ui'
import { proofPoints, sources } from '../../data/claims'

// The managed side of reliability: published scale numbers, each with its
// source, and the shape of the operational contract.

export default function TavilyReliability() {
  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Reliability as a product guarantee</h3>
      <p className="text-sm text-gray-500 mb-5">
        When retrieval is a managed layer, its reliability is the vendor's full-time job, published and
        accountable, instead of a side effect of how well your scraper fleet is doing this week.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProofPoint point={proofPoints.uptime} />
        <ProofPoint point={proofPoints.latency} />
        <ProofPoint point={proofPoints.requests} />
        <ProofPoint point={proofPoints.developers} />
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">What the operational contract looks like</div>
        <FeatureList variant="tavily" items={[
          { label: 'One integration surface', detail: 'Search, Extract, Crawl, and Map on one documented API' },
          { label: 'Scaling by plan, not by re-architecture', detail: 'usage is metered in credits, from a free tier of 1,000 credits a month upward' },
          { label: 'Provider churn absorbed for you', detail: 'engine changes, site defenses, and rendering quirks are handled behind the endpoint' },
          { label: 'A vendor on the hook', detail: 'when web access degrades, it is Tavily’s pager that goes off, not yours' },
        ]} />
      </div>

      <p className="text-[11px] text-gray-400 mt-4">
        Scale figures above link to their Tavily and Nebius sources. Free-tier credit allowance per the pricing
        docs. <SourceLink source={sources.credits} className="!inline" />
      </p>
    </div>
  )
}
