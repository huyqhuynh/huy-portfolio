import { skillGroups, levels, type Level } from '../data/skills'
import { SectionHeading } from './ui'

const dot: Record<Level, string> = {
  'hands-on': 'bg-cyan',
  working: 'bg-azure',
  exposure: 'border border-slate-400 bg-transparent',
}

export default function Skills() {
  return (
    <section id="skills" className="section border-t border-line" aria-labelledby="skills-h">
      <div className="wrap">
        <SectionHeading id="skills-h" eyebrow="01 · Technical skills" title="What I work with, and how well.">
          Grouped by area and tagged by how much I actually use them. No percentage bars. The code below says more.
        </SectionHeading>

        <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Skill depth legend">
          {(Object.keys(levels) as Level[]).map((l) => (
            <li key={l} className="flex items-center gap-2 text-slate-300">
              <span className={`h-2.5 w-2.5 rounded-full ${dot[l]}`} aria-hidden />
              <span className="font-medium">{levels[l].label}</span>
              <span className="text-muted">· {levels[l].note}</span>
            </li>
          ))}
        </ul>

        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((g) => (
            <article key={g.title} className="card p-6">
              <h3 id={`sk-${g.title}`} className="text-lg font-semibold">{g.title}</h3>
              <p className="mt-1 text-sm text-muted">{g.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-labelledby={`sk-${g.title}`}>
                {g.items.map((s) => (
                  <li key={s.name} className="chip">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${dot[s.level]}`} aria-hidden />
                    {s.name}
                    <span className="sr-only"> ({levels[s.level].label})</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
