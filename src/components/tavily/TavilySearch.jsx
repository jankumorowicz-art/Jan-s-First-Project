import { useState } from 'react'
import { TerminalPlayer } from '../viz/Terminal'
import { CodeBlock, ProofPoint, SourceLink } from '../ui'
import { proofPoints, sources } from '../../data/claims'

// Interactive request builder: flip the documented parameters and watch the
// request JSON update. The terminal shows the same question answered in one
// call. Payload shapes follow the documented Search API.

const depths = [
  { key: 'basic', label: 'basic' },
  { key: 'advanced', label: 'advanced' },
]
const topics = [
  { key: 'general', label: 'general' },
  { key: 'news', label: 'news' },
]

const lines = [
  { text: '$ agent asks: "What changed in the EU AI Act implementation timeline?"', cls: 'term-dim', delay: 200 },
  { text: '→ POST https://api.tavily.com/search', cls: 'term-run', delay: 600 },
  { text: '✓ 200 OK: ranked results with extracted content and relevance scores', cls: 'term-ok', delay: 700 },
  { text: '✓ context ready: 1 request, 1 vendor, nothing else to operate', cls: 'term-ok', delay: 500 },
]

export default function TavilySearch() {
  const [depth, setDepth] = useState('basic')
  const [topic, setTopic] = useState('general')
  const [maxResults, setMaxResults] = useState(5)
  const [includeAnswer, setIncludeAnswer] = useState(true)

  const request = `{
  "query": "What changed in the EU AI Act implementation timeline?",
  "search_depth": "${depth}",
  "topic": "${topic}",
  "max_results": ${maxResults},
  "include_answer": ${includeAnswer}
}`

  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">One question, one call</h3>
      <p className="text-sm text-gray-500 mb-4">
        The parameters below are documented options on the Search endpoint, not code you maintain. Flip them and
        watch the request change.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">search_depth</div>
            <div className="seg-toggle">
              {depths.map(d => (
                <button key={d.key} onClick={() => setDepth(d.key)}
                  className={`seg-btn ${depth === d.key ? 'seg-btn-active' : ''}`}>{d.label}</button>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Basic costs 1 credit, advanced costs 2 and digs deeper. <SourceLink source={sources.credits} className="!inline" />
            </p>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">topic</div>
            <div className="seg-toggle">
              {topics.map(t => (
                <button key={t.key} onClick={() => setTopic(t.key)}
                  className={`seg-btn ${topic === t.key ? 'seg-btn-active' : ''}`}>{t.label}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
              max_results: <span className="text-gray-700">{maxResults}</span>
            </div>
            <input type="range" min="1" max="10" value={maxResults}
              onChange={e => setMaxResults(Number(e.target.value))}
              className="w-full accent-blue-600" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={includeAnswer} onChange={e => setIncludeAnswer(e.target.checked)}
              className="accent-blue-600" />
            include_answer <span className="text-gray-400 text-xs">(a short synthesized answer with the results)</span>
          </label>
        </div>

        <div>
          <CodeBlock title="POST /search">{request}</CodeBlock>
          <p className="text-[11px] text-gray-400 mt-2">
            Request shape per the Search API reference. <SourceLink source={sources.searchApi} className="!inline" />
          </p>
        </div>
      </div>

      <div className="mt-6">
        <TerminalPlayer
          title="tavily · one call"
          lines={lines}
          runLabel="Run query"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <ProofPoint point={proofPoints.latency} />
        <ProofPoint point={proofPoints.searchCost} />
      </div>
    </div>
  )
}
