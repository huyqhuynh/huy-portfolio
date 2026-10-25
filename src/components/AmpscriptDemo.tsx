import { useState } from 'react'
import { ampscriptSource, renderPersonalization, subscribers } from '../data/demos'
import CodeBlock from './CodeBlock'
import { Tabs } from './ui'

export default function AmpscriptDemo() {
  const [id, setId] = useState(subscribers[0].id)
  const sub = subscribers.find((s) => s.id === id) ?? subscribers[0]
  const out = renderPersonalization(sub)

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <CodeBlock code={ampscriptSource} lang="ampscript" label="personalization.ampscript" maxHeight="30rem" />

      <div className="space-y-4">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">1 · Pick a synthetic subscriber</p>
          <Tabs
            label="Subscriber"
            value={id}
            onChange={setId}
            tabs={subscribers.map((s) => ({ id: s.id, label: `${s.id} · ${s.note}` }))}
          />
        </div>

        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">2 · Data going in</p>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line text-sm">
            {(['FirstName', 'LoyaltyTier', 'PointsBalance', 'City'] as const).map((k) => (
              <div key={k} className="bg-ink-900 p-3">
                <dt className="font-mono text-[11px] text-muted">{k}</dt>
                <dd className="mt-0.5 font-mono text-slate-200">{sub[k] === '' ? <span className="text-bad">(empty)</span> : `"${sub[k]}"`}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">3 · Email the subscriber sees <span className="normal-case">(simulated)</span></p>
          <div className="rounded-xl bg-white p-5 text-[15px] leading-6 text-slate-800" aria-live="polite">
            <p>Hi {out.first},</p>
            <p className="mt-2">{out.offer}.</p>
            <p className="mt-2">{out.rewardLine}. {out.storeLine}.</p>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted">
            This output comes from a JavaScript copy of the same rules. It does not execute AMPscript, which only runs inside Marketing Cloud.
          </p>
        </div>
      </div>
    </div>
  )
}
