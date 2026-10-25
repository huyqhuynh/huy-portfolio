import { ArrowRight, Mail, FileText, Code2, Building2, Layers } from 'lucide-react'
import { Linkedin } from './icons'
import { profile, resumeCta } from '../data/profile'

const facts = [
  { Icon: Code2, k: 'Experience', v: '13+ years hands-on, 2012 – 2025' },
  { Icon: Building2, k: 'Environments', v: 'Enterprise agency (Merkle) and in-house retail (Total Wine & More)' },
  { Icon: Layers, k: 'Core stack', v: 'HTML/CSS · SFMC · AMPscript · SQL · Litmus' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24" aria-labelledby="hero-title">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-azure/20 blur-[120px]" aria-hidden />

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.45fr_1fr]">
        <div className="rise">
          <p className="eyebrow mb-5">Huy Huynh · Senior Email Developer · 13+ years</p>
          <h1 id="hero-title" className="text-[clamp(2.25rem,5.4vw,3.9rem)] font-bold leading-[1.05] tracking-tight">
            Email Development That Goes{' '}
            <span className="bg-gradient-to-r from-cyan to-azure bg-clip-text text-transparent">Beyond the Inbox.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            I've been building email since 2012, back when getting Outlook to behave was practically a sport. These days I build responsive emails, reusable templates, and Salesforce Marketing Cloud automation that help marketing teams get campaigns out the door.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm text-cyan/90" aria-label="Specialties">
            {['Responsive HTML/CSS', 'SFMC personalization', 'SQL segmentation', 'Litmus QA'].map((t) => (
              <li key={t} className="whitespace-nowrap before:mr-4 before:text-muted first:before:hidden before:content-['/']">{t}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-primary">View My Work <ArrowRight size={18} aria-hidden /></a>
            <a
              href={resumeCta.href}
              className="btn btn-ghost"
              {...(resumeCta.external ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}
            >
              <FileText size={18} aria-hidden /> {resumeCta.label}
              {resumeCta.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a href="#contact" className="inline-flex items-center gap-2 text-slate-300 underline-offset-4 hover:text-cyan hover:underline">
              <Mail size={16} aria-hidden /> Contact Me
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-300 underline-offset-4 hover:text-cyan hover:underline">
              <Linkedin size={16} aria-hidden /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <aside className="card rise p-6 md:p-7" style={{ animationDelay: '.12s' }} aria-label="Profile summary">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan/40 bg-ink-900 font-mono text-xl font-bold" aria-hidden>
              <span>H</span><span className="text-cyan">H</span>
            </div>
            <div>
              <p className="text-lg font-semibold">{profile.name}</p>
              <p className="text-sm text-muted">{profile.title}</p>
            </div>
          </div>
          <dl className="mt-6 space-y-4">
            {facts.map(({ Icon, k, v }) => (
              <div key={k} className="flex gap-3">
                <Icon size={18} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{k}</dt>
                  <dd className="text-sm leading-6 text-slate-200">{v}</dd>
                </div>
              </div>
            ))}
          </dl>
          <pre className="mt-6 overflow-x-auto rounded-lg border border-line bg-ink-900 p-3 font-mono text-xs leading-5 text-slate-300" aria-hidden>
{`<table role="presentation" width="100%">
  <tr><td class="stack">`}<span className="cursor text-cyan">▍</span>
          </pre>
        </aside>
      </div>
    </section>
  )
}
