import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="wrap flex flex-col justify-between gap-3 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name} · {profile.title}</p>
        <p className="font-mono text-xs">Demos use a fictional brand and made-up data.</p>
      </div>
    </footer>
  )
}
