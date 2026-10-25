import { useState } from 'react'
import { ChevronDown, Clock, GitBranch, LogIn, LogOut, Mail } from 'lucide-react'
import { journeyNodes, type JourneyNode } from '../../data/demos'
import CaseShell, { Block, NoteGrid } from '../CaseShell'

const icon: Record<JourneyNode['type'], typeof Mail> = { Entry: LogIn, Email: Mail, Wait: Clock, Split: GitBranch, Exit: LogOut }
const tone: Record<JourneyNode['type'], string> = {
  Entry: 'text-ok border-ok/40', Email: 'text-cyan border-cyan/40', Wait: 'text-muted border-line',
  Split: 'text-warn border-warn/40', Exit: 'text-muted border-line',
}

export default function Case6Journey() {
  const [open, setOpen] = useState<string>('entry')

  return (
    <CaseShell
      title="Marketing Automation Journey"
      summary="A welcome-and-first-purchase flow showing how entry criteria, waits, decision splits, and sends fit together. Open any step to see the data it uses and the logic behind it."
      skills={['Journey Builder', 'Decision splits', 'Segmentation', 'Personalization']}
      tag="Representative demo · not a client project"
    >
      <Block title="Journey map · select a step">
        <ol className="space-y-2">
          {journeyNodes.map((n, i) => {
            const Icon = icon[n.type]
            const isOpen = open === n.id
            return (
              <li key={n.id} className="relative">
                {i < journeyNodes.length - 1 && <span className="absolute left-[1.45rem] top-12 h-[calc(100%-1.5rem)] w-px bg-line" aria-hidden />}
                <div className="rounded-xl border border-line bg-ink-900">
                  <h5>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`jn-${n.id}`}
                      onClick={() => setOpen(isOpen ? '' : n.id)}
                      className="flex w-full items-center gap-3 p-3 text-left"
                    >
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border bg-ink-800 ${tone[n.type]}`}>
                        <Icon size={16} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">{n.type}</span>
                        <span className="block text-sm font-semibold">{n.title}</span>
                        <span className="block text-sm text-muted">{n.summary}</span>
                      </span>
                      <ChevronDown size={18} aria-hidden className={`shrink-0 text-muted transition ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </h5>
                  {isOpen && (
                    <dl id={`jn-${n.id}`} className="grid gap-3 border-t border-line p-4 text-sm leading-6 md:grid-cols-3">
                      {[['Data used', n.data], ['Logic', n.logic], ['In Journey Builder', n.maps]].map(([k, v]) => (
                        <div key={k}>
                          <dt className="font-mono text-[11px] uppercase tracking-wider text-cyan">{k}</dt>
                          <dd className="mt-1 text-slate-300">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </Block>

      <Block title="How data, personalization, and logic work together">
        <NoteGrid notes={[
          { title: 'Audience data', body: 'Entry rules and splits read from data extensions and engagement events. Clean data is what makes the branching trustworthy.' },
          { title: 'Personalization', body: 'AMPscript fills each email from the same record, with fallbacks for missing values.' },
          { title: 'Campaign logic', body: 'Waits and splits decide who receives what, and when. Exit rules stop further sends.' },
          { title: 'Testing', body: 'Test with records that take each branch, including empty data, before activating.' },
        ]} />
      </Block>
    </CaseShell>
  )
}
