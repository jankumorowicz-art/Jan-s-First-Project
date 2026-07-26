import { ModuleHeader, TheJob, DiyTavilyToggle, DiyLens, OwnershipLedger, DiyStrengthCallout } from '../ui'
import TavilyExtract from '../tavily/TavilyExtract'
import DiyExtraction from '../diy/DiyExtraction'
import { ledger } from '../../data/claims'

export default function ExtractionCrawling() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Walkthrough · 02"
        title="Extraction & crawling"
        intro="Search finds the pages; something still has to read them. Reading the modern web means rendering JavaScript, surviving anti-bot defenses, and cleaning every format into something an LLM can use. At site scale, that something is a crawler."
      />

      <DiyTavilyToggle
        tavily={<TavilyExtract />}
        diy={<DiyExtraction />}
        note="Same pages. Switch to see the fleet that reads them in the DIY world."
      />

      <DiyLens
        title="What building extraction yourself adds to your plate"
        intro="Extraction is not one problem, it is a family of problems that never stops changing: new frameworks to render, new defenses to clear, new redesigns that silently break parsers. Crawling adds distributed-systems problems on top."
      />

      <TheJob>
        Turn any URL, or any whole site, into clean, LLM-ready content on demand, without owning browsers,
        parsers, or crawler infrastructure.
      </TheJob>

      <OwnershipLedger items={ledger.extraction} title="What you'd build yourself" />

      <DiyStrengthCallout>
        If you extract from a handful of stable, internal, or API-friendly sites you control, a small scraper
        can be the pragmatic choice, and no vendor is needed. The calculus flips when sources are many, hostile,
        or constantly changing, which is the normal case for agents on the open web.
      </DiyStrengthCallout>
    </div>
  )
}
