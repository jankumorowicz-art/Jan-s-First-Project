import { ModuleHeader, TheJob, DiyTavilyToggle, DiyLens, OwnershipLedger, DiyStrengthCallout } from '../ui'
import TavilySearch from '../tavily/TavilySearch'
import DiySearchPipeline from '../diy/DiySearchPipeline'
import ResultComparator from '../viz/ResultComparator'
import { ledger } from '../../data/claims'

export default function SearchRetrieval() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Walkthrough · 01"
        title="Search & retrieval"
        intro="An agent that cannot see the web guesses. The question is not whether to add search, it is how much machinery you want to own between a query and grounded context. Here is the same question answered both ways."
      />

      <ResultComparator />

      <div className="mt-10">
        <DiyTavilyToggle
          tavily={<TavilySearch />}
          diy={<DiySearchPipeline />}
          note="Same question. Switch to watch the DIY pipeline earn its answer."
        />
      </div>

      <DiyLens
        title="What building search yourself adds to your plate"
        intro="The SERP call is the cheapest line in the DIY pipeline. The expensive part is everything that turns links into context: the fetchers, browsers, parsers, and re-rankers that you write, host, and keep current."
      />

      <TheJob>
        Give the agent grounded, current web context for any question, in a shape it can drop straight into a
        context window, without a retrieval platform to operate.
      </TheJob>

      <OwnershipLedger items={ledger.search} title="What you'd build yourself" />

      <DiyStrengthCallout>
        If you need raw SERP features themselves, like tracking ranking positions for SEO or auditing ad
        placements, a SERP API is the right tool: that is what it is built for. The build vs. buy question here
        is about agents that need readable, relevant content, not result-page metadata.
      </DiyStrengthCallout>
    </div>
  )
}
