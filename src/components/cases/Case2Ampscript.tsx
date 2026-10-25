import { ArrowRight } from 'lucide-react'
import AmpscriptDemo from '../AmpscriptDemo'
import CaseShell, { Block, NoteGrid } from '../CaseShell'

const flow = [
  { k: 'Data', v: 'Subscriber attributes: name, tier, points, city. Some will be empty.' },
  { k: 'Logic', v: 'AMPscript sets variables, applies fallbacks, and chooses content.' },
  { k: 'Email', v: 'The same template renders a different, complete message per person.' },
]

export default function Case2Ampscript() {
  return (
    <CaseShell
      title="Salesforce Marketing Cloud Personalization"
      summary="One template, many outcomes. This uses AMPscript for conditional content, derived values, and fallbacks, so nobody gets an email that opens with &quot;Hi ,&quot;."
      skills={['AMPscript', 'SFMC', 'Dynamic content', 'Fallback handling']}
    >
      <Block title="Data → logic → email">
        <ol className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          {flow.map((f, i) => (
            <li key={f.k} className="flex flex-1 items-center gap-3">
              <div className="flex-1 rounded-xl border border-line bg-ink-900 p-4">
                <p className="font-mono text-xs uppercase tracking-wider text-cyan">{f.k}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{f.v}</p>
              </div>
              {i < flow.length - 1 && <ArrowRight className="hidden shrink-0 text-muted md:block" size={18} aria-hidden />}
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Try it · same code, three different records">
        <AmpscriptDemo />
      </Block>

      <Block title="Technical decisions">
        <NoteGrid notes={[
          { title: 'Fallbacks first', body: 'Empty values are handled before they reach the email, so "Hi ," never ships.' },
          { title: 'Variables, then output', body: 'Logic runs in one block at the top. The body only prints variables, which keeps the markup readable.' },
          { title: 'Conditional content', body: 'The tier decides the offer line. Adding a tier means one new branch, not a new template.' },
          { title: 'Test the edges', body: 'Records with missing fields are part of QA, not an afterthought.' },
        ]} />
      </Block>
    </CaseShell>
  )
}
