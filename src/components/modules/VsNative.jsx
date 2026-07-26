import { ModuleHeader, SplitCompare, ComparePanel, FeatureList, DiyStrengthCallout, TalkTrack, SourceLink, ProofPoint } from '../ui'
import { sources, independentPoints } from '../../data/claims'

// Not build vs. buy: the model providers already ship search. This tab is
// about when the built-in is enough and when the web layer should be yours.
// No third-party numbers; the sourcing rule covers Tavily and Nebius only.

export default function VsNative() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Replace what is already there · 02"
        title="vs. the model's built-in search"
        intro="ChatGPT, Gemini, and Claude already search the web. The question is what you get by owning the web layer instead of renting the one welded to your model."
      />

      <SplitCompare>
        <ComparePanel variant="diy" pillLabel="provider-native" title="Search built into the model" subtitle="ChatGPT, Gemini, Claude, and other providers with native web grounding">
          <FeatureList variant="diy" items={[
            { label: 'Bound to that provider', detail: 'retrieval works when calling that model; a multi-model stack grounds inconsistently, and switching providers changes what your agent sees' },
            { label: 'A closed pipeline', detail: 'you receive an answer with citations; what was fetched, how it was ranked, and the full page content mostly stay inside the provider' },
            { label: 'Chat-shaped, not corpus-shaped', detail: 'built to answer a user in the moment, not to hand you content to store, index, or reuse in your own RAG pipeline' },
            { label: 'Search only', detail: 'no extraction of arbitrary URLs, no crawling or mapping of a specific site' },
            { label: 'Coupled pricing and roadmap', detail: 'web access rides on the model provider\'s pricing, quotas, and priorities' },
          ]} />
        </ComparePanel>

        <ComparePanel variant="tavily" title="A model-independent web layer" subtitle="The same Tavily API in front of any model">
          <FeatureList variant="tavily" items={[
            { label: 'Works with every model', detail: 'the same Search, Extract, Crawl, and Map behind ChatGPT, Claude, Gemini, or an open-weights model, so grounding stays consistent when models change' },
            { label: 'Inspectable retrieval', detail: 'documented parameters (search_depth, include_domains, time_range) and per-result relevance scores you can threshold' },
            { label: 'Content you keep', detail: 'responses carry the extracted content itself, ready to store, index, and cite in your own pipeline' },
            { label: 'Beyond search', detail: 'Extract for URLs you already have, Crawl and Map for whole sites' },
            { label: 'Its own contract', detail: 'web access is priced and versioned independently of whichever model you run this quarter' },
          ]} />
        </ComparePanel>
      </SplitCompare>

      <p className="text-[11px] text-gray-400 mt-4">
        Tavily-side capabilities per the API reference and integration docs.{' '}
        <SourceLink source={sources.searchApi} className="!inline" />{' '}
        <SourceLink source={sources.mcp} className="!inline" />
        {' '}Provider capabilities evolve; check current docs before deciding.
      </p>

      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Why "trust the built-in" deserves scrutiny, in the public record</div>
        <p className="text-sm text-gray-500 mb-4 max-w-3xl">
          The structural problem with a closed retrieval pipeline is that when it is wrong, nothing tells you,
          and you cannot tune it. The largest independent test of consumer AI search products to date found
          exactly that pattern.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <ProofPoint point={independentPoints.citations} variant="independent" />
          <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600 leading-relaxed">
            The point is not that any one product is bad; results ranged widely by tool and these products keep
            improving. The point an exec should take: retrieval quality varies a lot, is invisible from the
            outside, and inside a closed pipeline there is no relevance score to threshold, no parameter to
            tune, and no retrieved content to audit. Owning the web layer turns that from a hope into a dial.
          </div>
        </div>
      </div>

      <TalkTrack
        question="Doesn't ChatGPT already search the web?"
        points={[
          'It does, for ChatGPT. The moment you run a second model, or want the option to, each provider grounds differently and none of them shows you what was retrieved. A web layer you own gives every model the same view of the web.',
          'Trust needs receipts: an independent Tow Center test found consumer AI search products answered over 60 percent of 1,600 citation queries incorrectly, with a huge range between tools. Closed retrieval fails silently; owned retrieval gives you scores, parameters, and the content itself to audit.',
          'And it stops at search: pointing at a specific site, extracting known URLs, or crawling docs is a different product, which is what Extract, Crawl, and Map are for.',
        ]}
      />

      <DiyStrengthCallout title="When model-native search is the right call">
        A chat product built entirely on one provider, where users just need grounded answers and you never
        touch the retrieved content, is well served by the built-in search. The case for owning the layer starts
        when you run more than one model, need the content itself, or need retrieval you can tune and audit.
      </DiyStrengthCallout>
    </div>
  )
}
