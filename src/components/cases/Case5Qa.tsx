import { useState } from 'react'
import { qaCases, qaWorkflow } from '../../data/demos'
import CaseShell, { Block } from '../CaseShell'
import CodeBlock from '../CodeBlock'
import { EmailFrame } from '../EmailPreview'
import { Tabs } from '../ui'

export default function Case5Qa() {
  const [id, setId] = useState(qaCases[0].id)
  const [view, setView] = useState<'before' | 'after'>('before')
  const c = qaCases.find((x) => x.id === id) ?? qaCases[0]

  return (
    <CaseShell
      title="Email QA and Cross-Client Debugging"
      summary="Four rendering problems I see again and again, with the cause and the fix. Where a browser can show the bug, the before and after render live. Where it only appears in Outlook, I say so."
      skills={['Litmus', 'Outlook fixes', 'Rendering QA', 'Troubleshooting']}
    >
      <Block title="Pick a problem">
        <Tabs label="Rendering problem" value={id} onChange={(v) => { setId(v); setView('before') }} tabs={qaCases.map((q) => ({ id: q.id, label: q.title }))} />
      </Block>

      <div className="grid gap-5 md:grid-cols-3">
        {[['Symptom', c.symptom], ['Cause', c.cause], ['Fix', c.fix]].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-line bg-ink-900 p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-cyan">{k}</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">{v}</p>
          </div>
        ))}
      </div>

      <Block title="Before and after">
        <div className="mb-3">
          <Tabs label="Version" value={view} onChange={setView} tabs={[{ id: 'before', label: 'Before (broken)' }, { id: 'after', label: 'After (fixed)' }]} />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <CodeBlock code={view === 'before' ? c.before : c.after} lang={c.lang} label={view === 'before' ? 'before.html' : 'after.html'} maxHeight="16rem" />
          {c.preview ? (
            <div className="min-w-0">
              <p className="mb-2 font-mono text-xs text-muted">Live render at {c.preview.width}px</p>
              <EmailFrame
                html={view === 'before' ? c.preview.before : c.preview.after}
                title={`${c.title}: ${view}`}
                width={c.preview.width}
                height={220}
              />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-line bg-ink-900 p-5 text-sm leading-6 text-muted">
              <p className="mb-1 font-semibold text-slate-200">Outlook-only issue</p>
              {c.previewNote}
            </div>
          )}
        </div>
      </Block>

      <Block title="QA workflow">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {qaWorkflow.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-line bg-ink-900 p-4">
              <p className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-1 text-sm font-semibold">{s.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Block>
    </CaseShell>
  )
}
