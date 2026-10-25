import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { highlight, type Lang } from '../lib/highlight'

interface Props { code: string; lang: Lang; label?: string; maxHeight?: string }

export default function CodeBlock({ code, lang, label, maxHeight = '22rem' }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable: leave the button unchanged */
    }
  }

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-ink-900">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line bg-ink-800/80 px-4 py-2">
        <span className="font-mono text-xs text-muted">{label ?? lang}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-muted transition hover:text-white"
          aria-label={`Copy ${label ?? lang} code`}
        >
          {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </figcaption>
      <pre
        tabIndex={0}
        className="code-scroll overflow-auto p-4 font-mono text-[13px] leading-6 text-slate-200"
        style={{ maxHeight }}
      >
        <code>{highlight(code, lang)}</code>
      </pre>
    </figure>
  )
}
