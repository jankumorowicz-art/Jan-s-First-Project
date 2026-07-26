import { useEffect, useRef, useState } from 'react'
import { Icon } from '../ui'

// Reusable terminal player for the simulators. `lines` is an array of
// { text, cls, delay } where cls maps to the .term-* color classes and delay
// is the pause in ms before the line appears. Timings are illustrative
// pacing for the animation, not measurements.
export function TerminalPlayer({ title, lines, runLabel = 'Run', footer }) {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false)
  const timer = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    if (!running) return
    if (count >= lines.length) { setRunning(false); return }
    timer.current = setTimeout(() => setCount(c => c + 1), lines[count].delay ?? 260)
    return () => clearTimeout(timer.current)
  }, [running, count, lines])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [count])

  const start = () => { setCount(0); setRunning(true) }
  const done = !running && count >= lines.length && lines.length > 0

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <button onClick={start} disabled={running}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
            running ? 'bg-gray-100 text-gray-400 cursor-default' : 'bg-gray-900 text-white hover:opacity-90'
          }`}>
          <Icon name="play" className="w-3.5 h-3.5" />
          {running ? 'Running…' : done ? `${runLabel} again` : runLabel}
        </button>
        {done && (
          <span className="text-xs text-green-600 inline-flex items-center gap-1">
            <Icon name="check" className="w-3.5 h-3.5" /> finished
          </span>
        )}
      </div>
      <div className="terminal">
        <div className="terminal-head">
          <span className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
            <span className="w-2 h-2 rounded-full bg-green-400/70" />
          </span>
          {title && <span className="ml-1">{title}</span>}
        </div>
        <div ref={bodyRef} className="px-4 py-3 h-64 overflow-y-auto">
          {count === 0 && !running && (
            <div className="term-dim">press {runLabel} to start…</div>
          )}
          {lines.slice(0, count).map((l, i) => (
            <div key={i} className={l.cls || 'text-gray-300'}>{l.text}</div>
          ))}
          {running && <div className="term-dim animate-pulse">▍</div>}
        </div>
      </div>
      {footer && <p className="text-[11px] text-gray-400 mt-2">{footer}</p>}
      <p className="text-[11px] text-gray-300 mt-1">Pacing is illustrative of the steps involved, not a benchmark.</p>
    </div>
  )
}
