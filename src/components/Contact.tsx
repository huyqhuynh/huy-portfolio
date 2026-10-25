import { Mail, Phone } from 'lucide-react'
import { Linkedin } from './icons'
import { profile } from '../data/profile'
import { SectionHeading } from './ui'

export default function Contact() {
  const items = [
    { Icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, ext: false },
    { Icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/huyqhuynh102', href: profile.linkedin, ext: true },
    { Icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref, ext: false },
  ]
  return (
    <section id="contact" className="section border-t border-line" aria-labelledby="contact-h">
      <div className="wrap">
        <SectionHeading id="contact-h" eyebrow="07 · Contact" title="Let's talk email development.">
          If you're hiring for email development or marketing technology, or just want to talk shop, I'd be glad to hear from you. Email is the fastest way to reach me.
        </SectionHeading>
        <ul className="grid gap-4 md:grid-cols-3">
          {items.map(({ Icon, label, value, href, ext }) => (
            <li key={label}>
              <a
                href={href}
                className="card group flex h-full flex-col gap-3 p-6 transition hover:border-cyan"
                {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon className="text-cyan" size={22} />
                <span className="font-mono text-xs uppercase tracking-wider text-muted">{label}</span>
                <span className="break-all text-base font-medium group-hover:text-cyan">
                  {value}{ext && <span className="sr-only"> (opens in a new tab)</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
