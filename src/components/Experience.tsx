import { experience } from '../data/profile'
import { SectionHeading } from './ui'

export default function Experience() {
  return (
    <section id="experience" className="section border-t border-line bg-ink-900/40" aria-labelledby="exp-h">
      <div className="wrap">
        <SectionHeading id="exp-h" eyebrow="04 · Experience" title="Agency scale and in-house depth.">
          Enterprise client work at an agency, followed by eight years owning email production in-house.
        </SectionHeading>

        <ol className="relative space-y-6 border-l border-line pl-6 md:pl-10">
          {experience.map((e) => (
            <li key={e.id} className="relative">
              <span className="absolute -left-[1.95rem] top-2 h-3 w-3 rounded-full border-2 border-cyan bg-ink-950 md:-left-[2.95rem]" aria-hidden />
              <article className="card p-5 md:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold">{e.role}</h3>
                  {e.dates && <p className="font-mono text-sm text-cyan">{e.dates}</p>}
                </div>
                <p className="mt-1 text-slate-300">{e.org} <span className="text-muted">· {e.kind}</span></p>
                <ul className="mt-4 space-y-2 text-[15px] leading-7 text-slate-300">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3"><span className="mt-3 h-1 w-3 shrink-0 bg-cyan/70" aria-hidden />{b}</li>
                  ))}
                </ul>
                {'clients' in e && (
                  <p className="mt-4 text-sm leading-6 text-muted">
                    <span className="font-medium text-slate-300">Agency client programs:</span> {e.clients.join(', ')}. Work was delivered through Merkle for these clients, not as an employee of the brands.
                  </p>
                )}
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                  {e.stack.map((s) => <li key={s} className="chip font-mono !text-xs">{s}</li>)}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
