import { ModuleHeader, TheJob, DiyTavilyToggle, DiyLens, OwnershipLedger, DiyStrengthCallout } from '../ui'
import TavilyIntegration from '../tavily/TavilyIntegration'
import DiyIntegration from '../diy/DiyIntegration'
import { ledger } from '../../data/claims'

export default function AgentIntegration() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Walkthrough · 04"
        title="Agent integration"
        intro="Web access is only useful to an agent as a tool it can call. That last mile, MCP servers, framework packages, and output the model can actually use, is a product surface of its own. One of these worlds maintains it for you."
      />

      <DiyTavilyToggle
        tavily={<TavilyIntegration />}
        diy={<DiyIntegration />}
        note="Same agent, same frameworks. Switch to see the wrapper work in the DIY world."
      />

      <DiyLens
        title="What integrating it yourself adds to your plate"
        intro="The DIY cost here is not one wrapper, it is the matrix: every framework times every endpoint times every protocol revision, maintained for as long as the pipeline lives."
      />

      <TheJob>
        Let any agent, in any framework or MCP client, call web search and extraction as a first-class tool,
        with output it can ground on and cite.
      </TheJob>

      <OwnershipLedger items={ledger.integration} title="What you'd build yourself" />

      <DiyStrengthCallout>
        If your agent runs in one framework, calls one internal data source, and will never need MCP, a single
        thin wrapper is genuinely fine. The matrix cost only appears when frameworks, endpoints, or teams
        multiply, but for agent products, they usually do.
      </DiyStrengthCallout>
    </div>
  )
}
