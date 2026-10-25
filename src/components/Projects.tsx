import { useState, type ComponentType } from 'react'
import { SectionHeading } from './ui'
import Case1Responsive from './cases/Case1Responsive'
import Case2Ampscript from './cases/Case2Ampscript'
import Case3Sql from './cases/Case3Sql'
import Case4Modular from './cases/Case4Modular'
import Case5Qa from './cases/Case5Qa'
import Case6Journey from './cases/Case6Journey'

const cases: { id: string; short: string; line: string; Component: ComponentType }[] = [
  { id: 'responsive', short: 'Responsive Email System', line: 'HTML/CSS · Outlook · accessibility', Component: Case1Responsive },
  { id: 'ampscript', short: 'SFMC Personalization', line: 'AMPscript · fallbacks', Component: Case2Ampscript },
  { id: 'sql', short: 'SQL Audience Segmentation', line: 'SQL · Query Activities', Component: Case3Sql },
  { id: 'modular', short: 'Modular Template Architecture', line: 'Reusable modules · scale', Component: Case4Modular },
  { id: 'qa', short: 'QA and Cross-Client Debugging', line: 'Litmus · Outlook fixes', Component: Case5Qa },
  { id: 'journey', short: 'Marketing Automation Journey', line: 'Journey Builder · splits', Component: Case6Journey },
]

export default function Projects() {
  const [active, setActive] = useState(cases[0].id)
  const current = cases.find((c) => c.id === active) ?? cases[0]
  const Active = current.Component

  return (
    <section id="work" className="section border-t border-line bg-ink-900/40" aria-labelledby="work-h">
      <div className="wrap">
        <SectionHeading id="work-h" eyebrow="02 · Featured work" title="Work you can click around in.">
          Six demos of how I approach email problems. They use a fictional brand and made-up data, so they aren't client projects and don't show client code or results. The modular case study also shows how my real production templates were organized (structure only).
        </SectionHeading>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <nav aria-label="Case studies" className="lg:sticky lg:top-24 lg:self-start">
            <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
              {cases.map((c, i) => {
                const on = c.id === active
                return (
                  <li key={c.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      aria-current={on ? 'true' : undefined}
                      onClick={() => setActive(c.id)}
                      className={`w-60 rounded-xl border p-3 text-left transition lg:w-full ${
                        on ? 'border-cyan bg-cyan/10' : 'border-line bg-ink-800/60 hover:border-slate-500'
                      }`}
                    >
                      <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, '0')}</span>
                      <span className="block text-sm font-semibold">{c.short}</span>
                      <span className="block text-xs text-muted">{c.line}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div key={active} className="card min-w-0 rise p-5 md:p-8" role="region" aria-label={current.short}>
            <Active />
          </div>
        </div>
      </div>
    </section>
  )
}
