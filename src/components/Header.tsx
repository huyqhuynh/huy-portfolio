import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { resumeCta } from '../data/profile'

const links = [
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#lab', label: 'Email Lab' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled || open ? 'border-b border-line bg-ink-950/90 backdrop-blur' : ''}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-cyan focus:px-3 focus:py-2 focus:text-ink-950">
        Skip to content
      </a>
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm font-semibold" aria-label="Huy Huynh, back to top">
          <img src="/favicon.svg" alt="" width={28} height={28} className="rounded-md" />
          <span>huy<span className="text-cyan">.huynh</span></span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm text-muted transition hover:text-white">{l.label}</a>
          ))}
          <a
            href={resumeCta.href}
            {...(resumeCta.external ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}
            className="btn btn-ghost ml-2 !px-4 !py-2 !text-sm"
          >
            {resumeCta.label}
          </a>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="wrap grid gap-1 pb-4 lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base text-slate-200 hover:bg-ink-800">{l.label}</a>
          ))}
          <a
            href={resumeCta.href}
            {...(resumeCta.external ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}
            className="btn btn-primary mt-2 justify-center"
          >
            {resumeCta.label}
          </a>
        </nav>
      )}
    </header>
  )
}
