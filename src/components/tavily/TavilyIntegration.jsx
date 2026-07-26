import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SubTabs, CodeBlock, SourceLink, FeatureList } from '../ui'
import { sources } from '../../data/claims'

// The integration surface agents actually use: a hosted MCP server and
// official framework packages, each linked to its docs page.

const tabs = [
  { key: 'mcp', label: 'MCP' },
  { key: 'langchain', label: 'LangChain' },
  { key: 'llamaindex', label: 'LlamaIndex' },
]

export default function TavilyIntegration() {
  const [tab, setTab] = useState('mcp')

  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Meet your agent where it already lives</h3>
      <p className="text-sm text-gray-500 mb-4">
        The wiring is maintained by Tavily: a hosted MCP server for MCP clients like Claude, and official
        packages for the major agent frameworks.
      </p>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      <AnimatePresence mode="wait">
        {tab === 'mcp' && (
          <motion.div key="mcp" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <p className="text-sm text-gray-500">
              The Tavily MCP server exposes search and extraction to any MCP client. The hosted remote URL means
              there is nothing to install or run locally; a local npx setup is also documented.
            </p>
            <CodeBlock title="claude config · mcp servers">
{`{
  "mcpServers": {
    "tavily": {
      "command": "npx",
      "args": ["-y", "tavily-mcp@latest"],
      "env": { "TAVILY_API_KEY": "tvly-..." }
    }
  }
}`}
            </CodeBlock>
            <p className="text-[11px] text-gray-400 mt-2">
              Setup options, including the remote hosted URL, per the MCP docs.{' '}
              <SourceLink source={sources.mcp} className="!inline" />
            </p>
          </motion.div>
        )}

        {tab === 'langchain' && (
          <motion.div key="langchain" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <p className="text-sm text-gray-500">
              langchain-tavily is the official LangChain integration, covering Search, Extract, Map, and Crawl
              as ready-made tools.
            </p>
            <CodeBlock title="pip install langchain-tavily">
{`from langchain_tavily import TavilySearch

tool = TavilySearch(max_results=5, topic="general")

# hand it to any LangChain agent
agent = create_react_agent(llm, [tool])
agent.invoke({"messages": "What changed in the EU AI Act timeline?"})`}
            </CodeBlock>
            <p className="text-[11px] text-gray-400 mt-2">
              Per the LangChain integration docs. <SourceLink source={sources.langchain} className="!inline" />
            </p>
          </motion.div>
        )}

        {tab === 'llamaindex' && (
          <motion.div key="llamaindex" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <p className="text-sm text-gray-500">
              In LlamaIndex, Tavily is available as a tool spec that plugs into agents directly.
            </p>
            <CodeBlock title="pip install llama-index-tools-tavily-research">
{`from llama_index.tools.tavily_research import TavilyToolSpec

tavily_tool = TavilyToolSpec(api_key="tvly-...")
agent = FunctionAgent(
    tools=tavily_tool.to_tool_list(),
    llm=llm,
)`}
            </CodeBlock>
            <p className="text-[11px] text-gray-400 mt-2">
              Per the LlamaIndex integration docs. <SourceLink source={sources.llamaindex} className="!inline" />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">What that buys you</div>
        <FeatureList variant="tavily" items={[
          { label: 'Zero wrapper code', detail: 'the tool schemas, validation, and errors are maintained upstream' },
          { label: 'Protocol upkeep included', detail: 'MCP and framework API changes are absorbed by the official packages' },
          { label: 'Citable output by default', detail: 'results carry URLs, so agents can ground and cite what they used' },
        ]} />
      </div>
    </div>
  )
}
