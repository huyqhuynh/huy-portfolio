import type { ReactNode } from 'react'

export function SectionHeading({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl md:mb-14">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 id={id} className="h2">{title}</h2>
      {children && <p className="mt-4 text-base leading-7 text-muted md:text-lg">{children}</p>}
    </div>
  )
}

export function DemoTag({ children = 'Illustrative demo' }: { children?: string }) {
  return <span className="tag-demo">{children}</span>
}

export function Tabs<T extends string>({
  tabs, value, onChange, label,
}: { tabs: { id: T; label: string }[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          aria-pressed={value === t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-lg border px-3 py-1.5 text-sm transition ${
            value === t.id
              ? 'border-cyan bg-cyan/10 text-cyan'
              : 'border-line bg-ink-800 text-muted hover:text-white'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
