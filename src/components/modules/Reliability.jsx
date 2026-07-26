import { ModuleHeader, TheJob, DiyTavilyToggle, DiyLens, OwnershipLedger, DiyStrengthCallout, ProofPoint } from '../ui'
import TavilyReliability from '../tavily/TavilyReliability'
import DiyReliability from '../diy/DiyReliability'
import { ledger, proofPoints } from '../../data/claims'

export default function Reliability() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Walkthrough · 03"
        title="Reliability & scale"
        intro="A demo needs the web to work once. A product needs it to work at 3am, under burst traffic, while a target site rolls out new bot defenses. This module is about who carries that pager."
      />

      <DiyTavilyToggle
        tavily={<TavilyReliability />}
        diy={<DiyReliability />}
        note="Switch to walk through the incidents a self-built stack owns."
      />

      <DiyLens
        title="What operating the web layer yourself adds to your plate"
        intro="None of the components in a DIY stack is exotic. What is expensive is keeping all of them healthy at once, forever, with your team as the single point of accountability."
      />

      <TheJob>
        Keep web access fast and available as usage grows, with failures detected, absorbed, and fixed by
        someone whose whole job it is.
      </TheJob>

      <div className="mb-2 sm:max-w-sm">
        <ProofPoint point={proofPoints.freeCredits} />
      </div>

      <OwnershipLedger items={ledger.reliability} title="What you'd operate yourself" />

      <DiyStrengthCallout>
        Teams with an existing platform group, hard data-residency constraints, or traffic so specialized that
        general web infrastructure does not fit can rationally run their own stack. The honest question is
        whether operating retrieval is a differentiator for your product or a tax on it.
      </DiyStrengthCallout>
    </div>
  )
}
