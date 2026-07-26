import { CodeBlock, FeatureList, SourceLink } from '../ui'
import { sources } from '../../data/claims'

// The same decision as API parameters: freshness on the request, a relevance
// score on every result, thresholding in one line of your code.

export default function TavilyFreshness() {
  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Stale-or-good is a parameter</h3>
      <p className="text-sm text-gray-500 mb-4">
        Ask for the window you need on the request, and threshold what comes back by score. That is the whole
        pipeline.
      </p>

      <CodeBlock title="POST /search · freshness on the request">
{`{
  "query": "What changed in the EU AI Act implementation timeline?",
  "topic": "news",
  "time_range": "week",
  "search_depth": "advanced"
}

# every result arrives scored for the query; keep what clears your bar
results = [r for r in resp["results"] if r["score"] >= 0.5]`}
      </CodeBlock>
      <p className="text-[11px] text-gray-400 mt-2">
        Parameters and response fields per the Search API reference; tuning guidance in the best-practices docs.{' '}
        <SourceLink source={sources.searchApi} className="!inline" />{' '}
        <SourceLink source={sources.bestPractices} className="!inline" />
      </p>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">What the API owns for you</div>
        <FeatureList variant="tavily" items={[
          { label: 'Freshness controls on the request', detail: 'topic (general or news) and time_range scope results to the window you need' },
          { label: 'A relevance score per result', detail: 'threshold instead of guessing; no re-ranker to host' },
          { label: 'Content, not just pointers', detail: 'what you score is the extracted content the agent will actually read' },
        ]} />
      </div>
    </div>
  )
}
