import { Download, ExternalLink, FileText, GraduationCap, Award } from 'lucide-react'
import { credentials, resumeCta } from '../data/profile'
import { SectionHeading } from './ui'

export default function Resume() {
  return (
    <section id="resume" className="section border-t border-line bg-ink-900/40" aria-labelledby="resume-h">
      <div className="wrap">
        <SectionHeading id="resume-h" eyebrow="06 · Resume" title="Prefer a resume?" />
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="card flex flex-col items-start gap-5 p-6 md:p-8">
            <FileText className="text-cyan" size={32} aria-hidden />
            <p className="max-w-md text-base leading-7 text-slate-300">
              {resumeCta.download
                ? 'Same titles, dates, and skills as this site, in a PDF you can print or forward.'
                : 'My resume is online, with the same titles, dates, and skills as this site.'}
            </p>
            <a
              href={resumeCta.href}
              className="btn btn-primary"
              {...(resumeCta.external ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}
            >
              {resumeCta.download ? <Download size={18} aria-hidden /> : <ExternalLink size={18} aria-hidden />}
              {resumeCta.label}
              {resumeCta.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </div>
          <div className="card space-y-5 p-6 md:p-8">
            <div className="flex gap-3">
              <GraduationCap className="mt-1 shrink-0 text-cyan" size={20} aria-hidden />
              <div>
                <p className="font-semibold">{credentials.education.school}</p>
                <p className="text-sm text-muted">{credentials.education.detail} · {credentials.education.years}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Award className="mt-1 shrink-0 text-cyan" size={20} aria-hidden />
              <div>
                <p className="font-semibold">{credentials.certification.name}</p>
                <p className="text-sm text-muted">{credentials.certification.detail}</p>
                <a href={credentials.certification.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm text-cyan underline-offset-4 hover:underline">
                  Verify certificate <ExternalLink size={13} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
