import { SectionHeading } from './ui'

const values = [
  ['Clean code', 'Readable, commented, and easy for the next person to pick up.'],
  ['Less repetition', 'Modules and checklists, so the second campaign is easier than the first.'],
  ['Debugging', 'I like tracing a weird rendering bug back to the one line causing it.'],
  ['Always improving', 'Every send teaches something. I keep the fixes and fold them into the templates.'],
]

export default function About() {
  return (
    <section id="about" className="section border-t border-line" aria-labelledby="about-h">
      <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading id="about-h" eyebrow="05 · About" title="I write the code, and I know what it's for." />
          <div className="space-y-4 text-base leading-8 text-slate-300">
            <p>
              I'm a hands-on email developer with 13+ years of experience turning marketing requirements into responsive, reliable email.
            </p>
            <p>
              I like the tricky stuff: rendering quirks, dynamic content, personalization logic, and figuring out why something works everywhere except that one email client.
            </p>
            <p>
              I've worked at an enterprise agency and in-house at a national retailer, so I know the code and what the marketing team needs it to do. If there's a repetitive task worth automating, I'm probably already thinking about it.
            </p>
          </div>
        </div>
        <ul className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {values.map(([t, b]) => (
            <li key={t} className="card p-5">
              <p className="font-semibold text-cyan">{t}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
