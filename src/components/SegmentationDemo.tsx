import { useMemo, useState } from 'react'
import { buildSql, matches, members } from '../data/demos'
import CodeBlock from './CodeBlock'

const allCategories = ['Wine', 'Whiskey', 'Beer', 'Tequila']

export default function SegmentationDemo() {
  const [categories, setCategories] = useState<string[]>(['Wine', 'Whiskey'])
  const [lapsedDays, setLapsedDays] = useState(60)
  const [engaged, setEngaged] = useState<number | null>(90)

  const filters = { categories, lapsedDays, engagedDays: engaged }
  const sql = useMemo(() => buildSql(filters), [categories, lapsedDays, engaged]) // eslint-disable-line react-hooks/exhaustive-deps
  const hit = members.filter((m) => matches(m, filters))

  const toggle = (t: string) => setCategories((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]))

  return (
    <div className="space-y-5">
      <div className="grid gap-4 rounded-xl border border-line bg-ink-900 p-4 sm:grid-cols-3">
        <fieldset>
          <legend className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">Preferred category</legend>
          <div className="flex flex-wrap gap-3">
            {allCategories.map((t) => (
              <label key={t} className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={categories.includes(t)} onChange={() => toggle(t)} className="h-4 w-4 accent-cyan" />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="lapsed" className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted">No purchase in</label>
          <select id="lapsed" value={lapsedDays} onChange={(e) => setLapsedDays(Number(e.target.value))} className="w-full rounded-lg border border-line bg-ink-800 px-3 py-2 text-sm">
            {[30, 60, 90].map((d) => <option key={d} value={d}>more than {d} days</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="engaged" className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted">Opened an email</label>
          <select
            id="engaged"
            value={engaged ?? 'any'}
            onChange={(e) => setEngaged(e.target.value === 'any' ? null : Number(e.target.value))}
            className="w-full rounded-lg border border-line bg-ink-800 px-3 py-2 text-sm"
          >
            <option value="30">within 30 days</option>
            <option value="90">within 90 days</option>
            <option value="180">within 180 days</option>
            <option value="any">any time</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <CodeBlock code={sql} lang="sql" label="segment.sql" />
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted" aria-live="polite">
            Synthetic Customers table · {hit.length} of {members.length} match
          </p>
          <div className="code-scroll max-h-[22rem] overflow-auto rounded-xl border border-line">
            <table className="w-full min-w-[30rem] text-left text-xs">
              <thead className="sticky top-0 bg-ink-800 font-mono text-muted">
                <tr>
                  <th className="p-2 font-medium">Key</th><th className="p-2 font-medium">Category</th><th className="p-2 font-medium">OptIn / 21+</th>
                  <th className="p-2 font-medium">Purchase</th><th className="p-2 font-medium">Open</th><th className="p-2 font-medium">Match</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => {
                  const ok = matches(m, filters)
                  return (
                    <tr key={m.key} className={`border-t border-line font-mono ${ok ? 'bg-cyan/10 text-white' : 'text-muted'}`}>
                      <td className="p-2">{m.key}</td><td className="p-2">{m.category}</td><td className="p-2">{m.optIn ? '1' : '0'} / {m.ageVerified ? '1' : '0'}</td>
                      <td className="p-2">{m.purchaseDaysAgo}d ago</td><td className="p-2">{m.openDaysAgo}d ago</td>
                      <td className="p-2">{ok ? 'Yes' : 'No'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
