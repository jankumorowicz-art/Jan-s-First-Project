import { CodeBlock, FeatureList } from '../ui'

// How stale-or-good actually gets decided when the pipeline is SERP plus
// your own code: date archaeology, quality heuristics, and dedupe you tune.

export default function DiyFreshness() {
  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Stale-or-good is your code</h3>
      <p className="text-sm text-gray-500 mb-4">
        A SERP result does not tell you a page is a year old, a content farm, or the same wire story you already
        have. Deciding all of that looks roughly like this, forever.
      </p>

      <CodeBlock title="freshness_and_quality.py (yours to maintain)">
{`def is_stale(page):
    date = meta_date(page) or sitemap_date(page.url) or header_date(page)
    if date is None:
        return None                 # much of the web is undated. now what?
    return age_days(date) > TTL[page.domain]   # a TTL table you tune

def quality_score(page):
    score = domain_authority.get(page.domain, UNKNOWN)  # a list you curate
    score -= boilerplate_ratio(page) * W1
    score -= looks_like_content_farm(page) * W2   # a classifier you train
    return score

docs = simhash_dedupe(docs)   # the same wire story on 12 domains

# plus the cron that re-fetches on your cadence, and the eval
# that tells you whether any of these thresholds still work`}
      </CodeBlock>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">What that code owns</div>
        <FeatureList variant="diy" items={[
          { label: 'Date archaeology', detail: 'pages rarely declare their age; you infer it from markup, sitemaps, and headers' },
          { label: 'Quality and authority scoring', detail: 'content farms and SEO spam rank fine on a SERP; filtering them is a model you maintain' },
          { label: 'Dedupe', detail: 'near-duplicate detection so the agent does not read the same story a dozen times' },
          { label: 'Re-fetch cadence', detail: 'a TTL policy per source, and the compute bill for re-crawling on it' },
        ]} />
      </div>
    </div>
  )
}
