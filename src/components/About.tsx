import { SectionHeading } from './ui'

const values = [
  ['Clean code', 'Readable, commented, and easy for the next developer to pick up.'],
  ['Efficient workflows', 'Modules and checklists so the second campaign takes less effort than the first.'],
  ['Problem solving', 'I like the rendering bug nobody can explain, and tracing it to the line that causes it.'],
  ['Continuous improvement', 'Every send teaches something. I keep the fixes and fold them into the templates.'],
]

export default function About() {
  return (
    <section id="about" className="section border-t border-line" aria-labelledby="about-h">
      <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading id="about-h" eyebrow="05 · About" title="A developer who understands the campaign." />
          <div className="space-y-4 text-base leading-8 text-slate-300">
            <p>
              I'm a hands-on email developer with 13+ years of experience turning marketing requirements into responsive, reliable email experiences.
            </p>
            <p>
              I enjoy solving the tricky stuff: rendering inconsistencies, dynamic content, reusable templates, personalization logic, and the technical details that make campaigns work across email clients.
            </p>
            <p>
              I've worked on both sides of the business: at an enterprise agency and in-house at a national retailer. That means I know the code, and I know what the marketing team needs it to do.
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
