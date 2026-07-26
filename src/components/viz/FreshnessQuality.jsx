import { SplitCompare, ComparePanel, FeatureList, SourceLink, CodeBlock } from '../ui'
import { sources } from '../../data/claims'

// The quiet half of DIY web access: nothing crashes when content is stale or
// junk, the answers just get worse. Mechanism comparison, no invented numbers.

export default function FreshnessQuality() {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-5 max-w-3xl">
        The failure nobody pages you for: the pipeline runs green while it feeds the agent a cached article from
        last year, a content-farm page, and the same syndicated story three times. Deciding whether a result is
        stale or good is its own discipline, and someone owns it.
      </p>

      <SplitCompare>
        <ComparePanel variant="diy" title="Stale-or-good is your code" subtitle="Quality control you write, tune, and fund">
          <FeatureList variant="diy" items={[
            { label: 'Staleness detection', detail: 'pages rarely declare their age; you infer it from markup, sitemaps, and headers, and re-fetch on a cadence you choose and pay for' },
            { label: 'Quality and authority scoring', detail: 'content farms, SEO spam, and thin affiliate pages rank fine on a SERP; filtering them is a model or heuristic you maintain' },
            { label: 'Dedupe', detail: 'the same wire story appears on a dozen domains; without near-duplicate detection your agent reads it a dozen times' },
            { label: 'Recency vs. relevance trade-offs', detail: 'yesterday\'s so-so article or last year\'s great one? That policy is yours to encode, per use case' },
          ]} />
        </ComparePanel>

        <ComparePanel variant="tavily" title="Stale-or-good is a parameter" subtitle="Freshness and relevance as documented API options">
          <FeatureList variant="tavily" items={[
            { label: 'Freshness controls on the request', detail: 'topic (general or news) and time_range scope results to the window you need' },
            { label: 'A relevance score per result', detail: 'every result is scored against the query intent, so your code can threshold instead of guessing' },
            { label: 'Content, not just pointers', detail: 'what comes back is the extracted content itself, so what the agent reads is what was scored' },
            { label: 'Tuning guidance published', detail: 'the best-practices docs cover how to combine depth, topic, and time windows per use case' },
          ]} />
        </ComparePanel>
      </SplitCompare>

      <CodeBlock title="freshness as a request parameter">
{`{
  "query": "What changed in the EU AI Act implementation timeline?",
  "topic": "news",
  "time_range": "week",
  "search_depth": "advanced"
}`}
      </CodeBlock>
      <p className="text-[11px] text-gray-400 mt-2">
        Parameters per the Search API reference and best-practices docs.{' '}
        <SourceLink source={sources.searchApi} className="!inline" />{' '}
        <SourceLink source={sources.bestPractices} className="!inline" />
      </p>
    </div>
  )
}
