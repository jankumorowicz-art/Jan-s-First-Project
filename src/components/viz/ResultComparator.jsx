import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CodeBlock, Icon, SourceLink } from '../ui'
import { sources } from '../../data/claims'

// The centerpiece comparator: what an agent receives from a raw SERP call vs.
// what it receives from Tavily Search, for the same question. Payloads are
// illustrative; the Tavily shape follows the documented Search response.

const serpJson = `{
  "search_metadata": { "status": "Success", "total_results": 128000 },
  "organic_results": [
    {
      "position": 1,
      "title": "EU AI Act: next implementation phase confirmed",
      "link": "https://example-news.eu/ai-act-timeline",
      "displayed_link": "example-news.eu › policy",
      "snippet": "The European Commission confirmed that the next phase of the
                  AI Act will..."
    },
    {
      "position": 2,
      "title": "AI Act timeline: what businesses need to know",
      "link": "https://consultancy.example.com/insights/ai-act",
      "snippet": "With obligations phasing in, companies should..."
    }
  ],
  "related_questions": [ ... ],
  "ads": [ ... ],
  "pagination": { "next": "..." }
}`

const tavilyJson = `{
  "query": "What changed in the EU AI Act implementation timeline?",
  "answer": "A short, source-grounded summary of the change...",
  "results": [
    {
      "title": "EU AI Act: next implementation phase confirmed",
      "url": "https://example-news.eu/ai-act-timeline",
      "content": "Full extracted page content, cleaned of nav, ads,
                  and boilerplate, sized for an LLM context window...",
      "score": 0.94
    },
    {
      "title": "AI Act timeline: what businesses need to know",
      "url": "https://consultancy.example.com/insights/ai-act",
      "content": "...",
      "score": 0.87
    }
  ],
  "response_time": ...
}`

const serpNotes = [
  { key: 'links', label: 'Links, not content', body: 'The payload points at pages. Your agent still has to fetch, render, and parse every one before it can read a word.' },
  { key: 'snippets', label: 'Snippets cut mid-sentence', body: 'Preview text written for a human scanning a results page, truncated at display width, useless as grounding on its own.' },
  { key: 'rank', label: 'Ranked for clicks', body: 'Position 1 is what people click, not what best answers the question. Re-ranking for relevance is your job.' },
  { key: 'noise', label: 'SERP furniture', body: 'Ads, related questions, and pagination are part of the schema. Your parser filters them on every call.' },
]

const tavilyNotes = [
  { key: 'content', label: 'Content included', body: 'Each result carries extracted page content ready for a context window. There is no second fetch step.' },
  { key: 'score', label: 'Relevance score per result', body: 'Results are scored against the query intent, so the agent (or your code) can threshold and trim confidently.' },
  { key: 'answer', label: 'Optional direct answer', body: 'With include_answer, a short synthesized answer rides along with the sources that back it.' },
  { key: 'shape', label: 'One stable schema', body: 'The same response shape regardless of which sites the answer came from, documented in the API reference.' },
]

function NotePanel({ notes, active, setActive, tone }) {
  const isTavily = tone === 'tavily'
  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-1.5">
        {notes.map(n => (
          <button key={n.key} onClick={() => setActive(active === n.key ? null : n.key)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all duration-150 ${
              active === n.key
                ? isTavily ? 'bg-blue-600 text-white border-blue-600' : 'bg-amber-500 text-white border-amber-500'
                : isTavily ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
            }`}>
            {n.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {active && (
          <motion.p key={active}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-[13px] text-gray-600 leading-relaxed mt-2.5">
            {notes.find(n => n.key === active)?.body}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ResultComparator() {
  const [serpNote, setSerpNote] = useState('links')
  const [tavNote, setTavNote] = useState('content')

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Same question, two payloads</div>
      <p className="text-sm text-gray-500 mb-5 max-w-3xl">
        This is the heart of build vs. buy for search: what lands in your agent's hands after one API call.
        Click the chips under each payload to unpack what it means for the code you still have to write.
      </p>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div>
          <div className="flex items-center justify-between">
            <span className="pill pill-diy">raw SERP response</span>
            <span className="text-[11px] text-gray-400 inline-flex items-center gap-1">
              <Icon name="alert" className="w-3 h-3" /> step 1 of many
            </span>
          </div>
          <CodeBlock title="serp-provider · response.json">{serpJson}</CodeBlock>
          <NotePanel notes={serpNotes} active={serpNote} setActive={setSerpNote} tone="diy" />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="pill pill-tavily">Tavily Search response</span>
            <span className="text-[11px] text-green-600 inline-flex items-center gap-1">
              <Icon name="check" className="w-3 h-3" /> ready for the context window
            </span>
          </div>
          <CodeBlock title="api.tavily.com · response.json">{tavilyJson}</CodeBlock>
          <NotePanel notes={tavilyNotes} active={tavNote} setActive={setTavNote} tone="tavily" />
        </div>
      </div>

      <p className="text-[11px] text-gray-400 mt-5">
        Payloads are illustrative. The Tavily response shape (query, answer, results with title, url, content,
        score, and response_time) follows the documented Search API.{' '}
        <SourceLink source={sources.searchApi} className="!inline" />
      </p>
    </div>
  )
}
