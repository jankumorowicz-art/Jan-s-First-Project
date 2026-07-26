import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../ui'

// The security-review walkthrough, DIY edition: the questions an enterprise
// review asks, and what answering them takes when the web layer is yours.

const questions = [
  {
    key: 'data',
    q: 'What data does your web pipeline retain, and for how long?',
    a: 'Fetched pages, rendered snapshots, parser caches, and logs live in several stores you added at different times. Answering means auditing all of them, then building the retention and deletion jobs the answer promises.',
  },
  {
    key: 'thirdparty',
    q: 'Which third parties touch the data in flight?',
    a: 'The SERP provider, the proxy vendor, the CAPTCHA-solving service, and your cloud. Each has its own terms, sub-processors, and jurisdiction, and your review inherits all of them.',
  },
  {
    key: 'access',
    q: 'Who can access the scraped content and the credentials?',
    a: 'Keys for four vendors sit in your secrets store, and the scraped corpus is readable by whichever services you wired to it. Scoping, rotation, and audit trails are yours to implement and evidence.',
  },
  {
    key: 'patching',
    q: 'How do you patch the fleet?',
    a: 'Headless browsers, parser libraries, proxy clients, and their base images each have their own CVE feed. The patching cadence, and the proof of it, is your ops work.',
  },
]

export default function DiySecurity() {
  const [open, setOpen] = useState('data')

  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">The security review, DIY edition</h3>
      <p className="text-sm text-gray-500 mb-4">
        Sooner or later a customer, auditor, or your own counsel asks these questions about the web layer. Click
        each one to see what the answer costs when the stack is homegrown.
      </p>

      <div className="space-y-2">
        {questions.map(item => {
          const isOpen = open === item.key
          return (
            <div key={item.key} className={`rounded-xl border transition-colors duration-150 ${isOpen ? 'border-amber-300 bg-amber-50/50' : 'border-gray-200'}`}>
              <button onClick={() => setOpen(isOpen ? null : item.key)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left">
                <span className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center ${isOpen ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Icon name="shield" className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-semibold text-gray-900">{item.q}</span>
                <Icon name="arrow" className={`w-4 h-4 ml-auto shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="px-4 pb-4 pl-[52px] text-sm text-gray-600 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        None of these questions is unanswerable. Each one is simply a project, and the set of them is the
        compliance surface you took on by building the layer.
      </p>
    </div>
  )
}
