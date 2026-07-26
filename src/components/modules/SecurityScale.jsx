import { ModuleHeader, DiyTavilyToggle, TalkTrack, ProofPoint, ValidationCard, SourceLink } from '../ui'
import TavilyReliability from '../tavily/TavilyReliability'
import DiyReliability from '../diy/DiyReliability'
import TavilySecurity from '../tavily/TavilySecurity'
import DiySecurity from '../diy/DiySecurity'
import { proofPoints, independentPoints, validation, sources } from '../../data/claims'

// The trust tab: the two questions every enterprise prospect asks before the
// product questions. Can it carry production traffic, and will it pass our
// security review. Everything here is published or named.

export default function SecurityScale() {
  return (
    <div>
      <ModuleHeader
        eyebrow="The trust layer · 04"
        title="Security & scale"
        intro="Two questions come before the rest: can this layer carry production traffic, and will it pass a security review. Every answer here is published and linked."
      />

      {/* Published scale record */}
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          The scale record, as published by Tavily and Nebius
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProofPoint point={proofPoints.requests} />
          <ProofPoint point={proofPoints.uptime} />
          <ProofPoint point={proofPoints.latency} />
          <ProofPoint point={proofPoints.developers} />
        </div>
      </div>

      {/* Reliability walkthrough */}
      <div className="mb-3">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Who carries the pager</h3>
        <p className="text-sm text-gray-500 max-w-3xl mb-5">
          A demo needs the web to work once. A product needs it at 3am, while a target site rolls out new bot
          defenses. The web is now majority automated traffic and defenses respond; running your own access
          layer means fighting that trend yourself.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <ProofPoint point={independentPoints.botTraffic} variant="independent" />
        <ProofPoint point={independentPoints.proxyUsage} variant="independent" />
        <ProofPoint point={independentPoints.proxySpend} variant="independent" />
      </div>
      <DiyTavilyToggle
        tavily={<TavilyReliability />}
        diy={<DiyReliability />}
        note="Switch to walk through the incidents a self-built stack owns."
      />

      {/* Security walkthrough */}
      <div className="mt-14 border-t border-gray-200 pt-8 mb-3">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">The security review, both ways</h3>
        <p className="text-sm text-gray-500 max-w-3xl mb-5">
          Whoever owns the stack owns the audit. Tavily documents SOC 2 and zero data retention, and partners
          with Pillar Security on guardrails in the access layer itself.{' '}
          <SourceLink source={sources.pillar} className="!inline" />
        </p>
      </div>
      <DiyTavilyToggle
        tavily={<TavilySecurity />}
        diy={<DiySecurity />}
        note="Same review questions. Switch to see who has to produce the answers."
      />

      {/* Named validation */}
      <div className="mt-14 border-t border-gray-200 pt-8">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Named, public, clickable</div>
        <p className="text-sm text-gray-500 mb-4 max-w-3xl">
          Each of these is published by the named party, not by this site.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {validation.map(v => <ValidationCard key={v.label} item={v} />)}
        </div>
      </div>

      <TalkTrack
        question="Can we bet production on this layer?"
        points={[
          'The scale is published, not promised: 300M+ requests a month at 99.99% uptime with 180 ms median latency, serving 2M+ developers, per Tavily and Nebius.',
          'The compliance answer is on paper: SOC 2 and zero data retention in the docs, security guardrails with Pillar, one API key to govern instead of a keyring of scraping vendors.',
          'And the layer has named company behind it: customers like Groq, Cohere, MongoDB, and Writer in the press, an IBM partnership on ibm.com, and Nebius as the owner going forward.',
        ]}
      />
    </div>
  )
}
