import { useMemo, useState } from 'react'
import { allModules, buildEmail, moduleHtml, moduleMeta, variants, type ModuleId, type VariantId } from '../../data/emailModules'
import { productionFacts, productionModules } from '../../data/demos'
import CaseShell, { Block, NoteGrid } from '../CaseShell'
import CodeBlock from '../CodeBlock'
import EmailPreview from '../EmailPreview'
import { Tabs } from '../ui'

export default function Case4Modular() {
  const [variantId, setVariantId] = useState<VariantId>('seasonal')
  const [enabled, setEnabled] = useState<ModuleId[]>(allModules)
  const [inspect, setInspect] = useState<ModuleId>('cta')

  const variant = variants.find((v) => v.id === variantId) ?? variants[0]
  const html = useMemo(() => buildEmail(variant, enabled), [variant, enabled])

  const toggle = (id: ModuleId) =>
    setEnabled((cur) => (cur.includes(id) ? cur.filter((m) => m !== id) : [...cur, id]))

  const { id: _id, label: _label, ...inputs } = variant
  void _id; void _label

  return (
    <CaseShell
      title="Modular Email Template Architecture"
      summary="Reusable modules assembled into any campaign. Change the inputs, not the structure. The demo uses a fictional brand. Below it is the module map from my real production templates."
      skills={['Modular templates', 'Content Builder patterns', 'QA consistency', 'Scalability']}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="min-w-0 space-y-5">
          <Block title="1 · Campaign variation">
            <Tabs label="Campaign variation" value={variantId} onChange={setVariantId} tabs={variants.map((v) => ({ id: v.id, label: v.label }))} />
          </Block>

          <Block title="2 · Modules in this email">
            <ul className="space-y-2">
              {moduleMeta.map((m) => (
                <li key={m.id} className="rounded-xl border border-line bg-ink-900 p-3">
                  <div className="flex items-start gap-3">
                    <input
                      id={`mod-${m.id}`}
                      type="checkbox"
                      checked={enabled.includes(m.id)}
                      onChange={() => toggle(m.id)}
                      className="mt-1 h-4 w-4 accent-cyan"
                    />
                    <div className="min-w-0 flex-1">
                      <label htmlFor={`mod-${m.id}`} className="cursor-pointer text-sm font-semibold">{m.name}</label>
                      <p className="text-xs leading-5 text-muted">{m.purpose}</p>
                    </div>
                    <button
                      type="button"
                      aria-pressed={inspect === m.id}
                      onClick={() => setInspect(m.id)}
                      className={`shrink-0 rounded-md border px-2 py-1 font-mono text-xs ${inspect === m.id ? 'border-cyan text-cyan' : 'border-line text-muted hover:text-white'}`}
                    >
                      View code
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <Block title="3 · Assembled result">
          <EmailPreview html={html} title={`${variant.label} email built from modules`} height={480} />
        </Block>
      </div>

      <Block title={`Module source · ${inspect}`}>
        <CodeBlock code={moduleHtml(inspect, variant)} lang="html" label={`${inspect}.html`} maxHeight="18rem" />
      </Block>

      <Block title="From production · how my real templates were organized">
        <p className="mb-4 max-w-2xl text-sm leading-6 text-muted">
          Structure only, drawn from four production emails I built at Total Wine &amp; More. No copy, images, offers, or code from those emails appear on this site.
        </p>
        <ol className="grid gap-2 sm:grid-cols-2">
          {productionModules.map((m, i) => (
            <li key={m.name} className="flex gap-3 rounded-xl border border-line bg-ink-900 p-3">
              <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{m.name}</p>
                <p className="text-xs leading-5 text-muted">{m.role}</p>
              </div>
              <span className={`h-fit shrink-0 rounded-md border px-2 py-0.5 font-mono text-[11px] ${m.scope === 'shared' ? 'border-line text-muted' : 'border-cyan/50 text-cyan'}`}>
                {m.scope === 'shared' ? 'Shared' : 'Per campaign'}
              </span>
            </li>
          ))}
        </ol>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-muted marker:text-cyan">
          {productionFacts.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </Block>

      <Block title="What changes per campaign">
        <CodeBlock code={JSON.stringify(inputs, null, 2)} lang="text" label="campaign-inputs.json" maxHeight="14rem" />
        <p className="mt-2 text-sm text-muted">Everything else is shared. That is the whole point.</p>
      </Block>

      <Block title="Technical decisions">
        <NoteGrid notes={[
          { title: 'Maintainability', body: 'A fix to the button module is made once and every campaign inherits it.' },
          { title: 'QA consistency', body: 'Modules that already passed rendering tests need less re-testing. QA focuses on what is new.' },
          { title: 'Scalability', body: 'New campaign variations are new inputs. In Marketing Cloud these modules map naturally to Content Builder blocks.' },
          { title: 'Safe defaults', body: 'The footer carries legal and unsubscribe content, so it travels with every build.' },
        ]} />
      </Block>
    </CaseShell>
  )
}
