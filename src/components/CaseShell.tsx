import type { ReactNode } from 'react'
import { DemoTag } from './ui'

export default function CaseShell({
  title, summary, skills, children, tag,
}: { title: string; summary: string; skills: string[]; children: ReactNode; tag?: string }) {
  return (
    <div className="space-y-8">
      <header>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <DemoTag>{tag}</DemoTag>
        </div>
        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h3>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills demonstrated">
          {skills.map((s) => <li key={s} className="chip font-mono !text-xs text-cyan">{s}</li>)}
        </ul>
      </header>
      {children}
    </div>
  )
}

export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">{title}</h4>
      {children}
    </section>
  )
}

export function NoteGrid({ notes }: { notes: { title: string; body: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {notes.map((n) => (
        <li key={n.title} className="rounded-xl border border-line bg-ink-900 p-4">
          <p className="text-sm font-semibold text-white">{n.title}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{n.body}</p>
        </li>
      ))}
    </ul>
  )
}
