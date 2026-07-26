import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SubTabs, CodeBlock, ProofPoint, SourceLink, Icon } from '../ui'
import { proofPoints, sources } from '../../data/claims'

// Extract, Crawl, and Map as three documented endpoints. The crawl view
// animates graph-style discovery; payloads are illustrative and follow the
// documented API shapes.

const tabs = [
  { key: 'extract', label: 'Extract' },
  { key: 'crawl', label: 'Crawl' },
  { key: 'map', label: 'Map' },
]

const crawlWaves = [
  { depth: 'seed', paths: ['docs.example.com/'] },
  { depth: 'depth 1', paths: ['/getting-started', '/api-reference', '/guides', '/changelog'] },
  { depth: 'depth 2', paths: ['/api-reference/auth', '/api-reference/errors', '/guides/quickstart', '/guides/webhooks', '/changelog/2026'] },
]

function CrawlViz() {
  const [wave, setWave] = useState(0)
  const shown = crawlWaves.slice(0, wave + 1)
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => setWave(w => (w + 1) % (crawlWaves.length + 1))}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:opacity-90 transition-all duration-150">
          <Icon name="play" className="w-3.5 h-3.5" />
          {wave >= crawlWaves.length - 1 ? 'Restart crawl' : 'Advance crawl'}
        </button>
        <span className="text-xs text-gray-400">graph-style traversal, explored in parallel waves</span>
      </div>
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 min-h-[180px]">
        {shown.map((w, wi) => (
          <div key={w.depth} className="mb-3 last:mb-0">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">{w.depth}</div>
            <div className="flex flex-wrap gap-1.5">
              <AnimatePresence>
                {w.paths.map((p, i) => (
                  <motion.span key={p}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07, duration: 0.2 }}
                    className={`px-2.5 py-1 rounded-md border font-mono text-[11px] ${
                      wi === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-blue-200'
                    }`}>
                    {p}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-gray-400 mt-2">
        Illustrative site. Tavily Crawl explores many paths in parallel with extraction built in, per the API
        reference. <SourceLink source={sources.crawlApi} className="!inline" />
      </p>
    </div>
  )
}

export default function TavilyExtract() {
  const [tab, setTab] = useState('extract')

  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Three endpoints instead of a fleet</h3>
      <p className="text-sm text-gray-500 mb-4">
        Reading pages, walking sites, and discovering structure are separate documented endpoints on the same
        API and the same key.
      </p>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      <AnimatePresence mode="wait">
        {tab === 'extract' && (
          <motion.div key="extract" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <p className="text-sm text-gray-500">
              Send URLs, get clean content back. Rendering, cleaning, and normalization happen behind the
              endpoint, and the response shape is the same for every site.
            </p>
            <CodeBlock title="POST /extract">
{`{
  "urls": [
    "https://example-news.eu/ai-act-timeline",
    "https://docs.example.com/guides/webhooks"
  ],
  "extract_depth": "basic",
  "format": "markdown"
}

// response (illustrative)
{
  "results": [
    { "url": "https://example-news.eu/ai-act-timeline",
      "raw_content": "# EU AI Act: next implementation phase...\\n..." },
    { "url": "https://docs.example.com/guides/webhooks",
      "raw_content": "# Webhooks\\nConfigure a webhook endpoint..." }
  ],
  "failed_results": []
}`}
            </CodeBlock>
            <p className="text-[11px] text-gray-400 mt-2">
              Shape per the Extract API reference. <SourceLink source={sources.extractApi} className="!inline" />
            </p>
            <div className="mt-4 sm:max-w-sm">
              <ProofPoint point={proofPoints.extractCost} />
            </div>
          </motion.div>
        )}

        {tab === 'crawl' && (
          <motion.div key="crawl" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <p className="text-sm text-gray-500 mb-4">
              Crawl walks a site like a graph and extracts as it goes. You describe what you want with
              parameters and natural-language instructions; the frontier logic is not your code.
            </p>
            <CrawlViz />
            <CodeBlock title="POST /crawl">
{`{
  "url": "docs.example.com",
  "max_depth": 2,
  "instructions": "Find all pages about the API and webhooks"
}`}
            </CodeBlock>
            <p className="text-[11px] text-gray-400 mt-2">
              Shape per the Crawl API reference and tutorial. <SourceLink source={sources.crawlTutorial} className="!inline" />
            </p>
          </motion.div>
        )}

        {tab === 'map' && (
          <motion.div key="map" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <p className="text-sm text-gray-500">
              Map answers "what is on this site?" without reading every page: use Map to find pages, then Crawl
              or Extract to read the ones that matter.
            </p>
            <CodeBlock title="POST /map">
{`{
  "url": "docs.example.com"
}

// response (illustrative)
{
  "base_url": "docs.example.com",
  "results": [
    "https://docs.example.com/",
    "https://docs.example.com/getting-started",
    "https://docs.example.com/api-reference",
    "https://docs.example.com/api-reference/auth",
    "https://docs.example.com/guides/quickstart"
  ]
}`}
            </CodeBlock>
            <p className="text-[11px] text-gray-400 mt-2">
              Shape per the Map API reference. <SourceLink source={sources.mapApi} className="!inline" />
            </p>
            <div className="mt-4 sm:max-w-sm">
              <ProofPoint point={proofPoints.mapCost} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
