import { useMemo } from 'react'
import { buildEmail, variants } from '../../data/emailModules'
import { responsiveNotes, responsivePatterns } from '../../data/demos'
import CaseShell, { Block, NoteGrid } from '../CaseShell'
import CodeBlock from '../CodeBlock'
import EmailPreview from '../EmailPreview'

export default function Case1Responsive() {
  const html = useMemo(() => buildEmail(variants[0]), [])
  return (
    <CaseShell
      title="Responsive Enterprise Email System"
      summary="A table-based layout that holds up in Outlook and stacks cleanly on phones. Built from modules, so a new campaign is mostly new copy, not new code."
      skills={['HTML5', 'CSS', 'Table layouts', 'Outlook fixes', 'Accessibility']}
    >
      <Block title="Live preview · toggle the width">
        <EmailPreview html={html} title="Responsive sample email" height={520} />
      </Block>

      <Block title="Patterns that make it work">
        <div className="grid gap-5 md:grid-cols-2">
          {responsivePatterns.map((p) => (
            <div key={p.title} className="min-w-0 space-y-2">
              <p className="text-sm font-semibold">{p.title}</p>
              <CodeBlock code={p.code} lang={p.lang} label={p.lang} maxHeight="12rem" />
              <p className="text-sm leading-6 text-muted">{p.why}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Technical decisions">
        <NoteGrid notes={responsiveNotes} />
      </Block>
    </CaseShell>
  )
}
