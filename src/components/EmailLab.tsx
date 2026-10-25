import { useMemo, useState } from 'react'
import { buildEmail, variants, type VariantId } from '../data/emailModules'
import AmpscriptDemo from './AmpscriptDemo'
import CodeBlock from './CodeBlock'
import EmailPreview from './EmailPreview'
import SegmentationDemo from './SegmentationDemo'
import { DemoTag, SectionHeading, Tabs } from './ui'

type Panel = 'email' | 'ampscript' | 'sql'

const why: Record<Panel, { title: string; points: string[] }> = {
  email: {
    title: 'Why this email works',
    points: [
      'Fluid 100% width with a 600px ceiling, plus an Outlook-only ghost table.',
      'Columns stack through one media query, with inline styles as the baseline.',
      'Live-text hero on a background color, so it survives blocked images.',
      'Button padding sits on the table cell, which Outlook respects.',
    ],
  },
  ampscript: {
    title: 'Why this personalization works',
    points: [
      'Fallbacks run before output, so empty fields never reach the subscriber.',
      'Logic is separated from markup, which makes both easier to review.',
      'A derived value ("points to go") is calculated once and reused.',
    ],
  },
  sql: {
    title: 'Why this segment works',
    points: [
      'Consent is the first condition and is not optional.',
      'Each filter narrows a clear, explainable audience.',
      'Date windows are relative, so the same query stays valid next week.',
    ],
  },
}

export default function EmailLab() {
  const [panel, setPanel] = useState<Panel>('email')
  const [variantId, setVariantId] = useState<VariantId>('seasonal')
  const variant = variants.find((v) => v.id === variantId) ?? variants[0]
  const html = useMemo(() => buildEmail(variant), [variant])
  const w = why[panel]

  return (
    <section id="lab" className="section border-t border-line" aria-labelledby="lab-h">
      <div className="wrap">
        <SectionHeading id="lab-h" eyebrow="03 · Email lab" title="Read the source, then see what it does.">
          A small sandbox with a fictional brand and made-up data. Switch the email, resize the preview, and read the exact HTML behind it.
        </SectionHeading>

        <div className="card p-5 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Tabs
              label="Lab panel"
              value={panel}
              onChange={setPanel}
              tabs={[
                { id: 'email', label: 'Responsive email' },
                { id: 'ampscript', label: 'AMPscript personalization' },
                { id: 'sql', label: 'SQL segmentation' },
              ]}
            />
            <DemoTag>Fictional brand · synthetic data</DemoTag>
          </div>

          {panel === 'email' && (
            <div className="space-y-5">
              <Tabs label="Email variation" value={variantId} onChange={setVariantId} tabs={variants.map((v) => ({ id: v.id, label: v.label }))} />
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="min-w-0"><EmailPreview html={html} title={`${variant.label} sample email`} height={560} /></div>
                <div className="min-w-0">
                  <p className="mb-3 font-mono text-xs text-muted">HTML source · updates with the variation</p>
                  <CodeBlock code={html} lang="html" label="email.html" maxHeight="35rem" />
                </div>
              </div>
            </div>
          )}
          {panel === 'ampscript' && <AmpscriptDemo />}
          {panel === 'sql' && <SegmentationDemo />}

          <div className="mt-6 rounded-xl border border-line bg-ink-900 p-4">
            <p className="text-sm font-semibold">{w.title}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-muted marker:text-cyan">
              {w.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
