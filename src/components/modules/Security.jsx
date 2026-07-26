import { ModuleHeader, TheJob, DiyTavilyToggle, DiyLens, OwnershipLedger, DiyStrengthCallout } from '../ui'
import TavilySecurity from '../tavily/TavilySecurity'
import DiySecurity from '../diy/DiySecurity'
import { ledger } from '../../data/claims'

export default function Security() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Walkthrough · 05"
        title="Security & compliance"
        intro="A web layer touches third-party content, external vendors, and credentials at scale. Whoever owns the stack owns the audit. This module walks the same security review through both worlds."
      />

      <DiyTavilyToggle
        tavily={<TavilySecurity />}
        diy={<DiySecurity />}
        note="Same review questions. Switch to see who has to produce the answers."
      />

      <DiyLens
        title="What owning the compliance surface adds to your plate"
        intro="The DIY compliance cost is quiet: it does not fail a build or page anyone. It shows up as weeks of audit work, retention policies to enforce, and legal review, repeated as the stack and the rules change."
      />

      <TheJob>
        Pass the security review, and keep passing it, without making your own team the compliance owner for a
        scraping stack.
      </TheJob>

      <OwnershipLedger items={ledger.security} title="What you'd own yourself" />

      <DiyStrengthCallout>
        Organizations with strict data-locality rules or in-house security teams that must control every byte in
        flight sometimes cannot delegate this layer, and building is the honest answer for them. For everyone
        else, the question is whether this audit surface is worth owning.
      </DiyStrengthCallout>
    </div>
  )
}
