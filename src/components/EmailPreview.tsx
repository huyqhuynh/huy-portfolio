import { useState } from 'react'
import { Monitor, Smartphone } from 'lucide-react'

export type Device = 'desktop' | 'mobile'

export function DeviceToggle({ device, onChange }: { device: Device; onChange: (d: Device) => void }) {
  const opts: { id: Device; label: string; Icon: typeof Monitor }[] = [
    { id: 'desktop', label: 'Desktop', Icon: Monitor },
    { id: 'mobile', label: 'Mobile', Icon: Smartphone },
  ]
  return (
    <div role="group" aria-label="Preview size" className="inline-flex rounded-lg border border-line bg-ink-800 p-0.5">
      {opts.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          aria-pressed={device === id}
          onClick={() => onChange(id)}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
            device === id ? 'bg-cyan text-ink-950' : 'text-muted hover:text-white'
          }`}
        >
          <Icon size={14} aria-hidden /> {label}
        </button>
      ))}
    </div>
  )
}

interface Props { html: string; title: string; device?: Device; width?: number; height?: number }

// The HTML is rendered inside a fully sandboxed iframe (no scripts, no navigation, no same-origin access).
export function EmailFrame({ html, title, device = 'desktop', width, height = 520 }: Props) {
  const w = width ?? (device === 'mobile' ? 375 : 640)
  return (
    <div className="rounded-xl border border-line bg-ink-900 p-3">
      <div className="mx-auto transition-[width] duration-300" style={{ width: w, maxWidth: '100%' }}>
        <iframe
          title={title}
          sandbox=""
          srcDoc={html}
          loading="lazy"
          className="w-full rounded-md bg-white"
          style={{ height }}
        />
      </div>
    </div>
  )
}

export default function EmailPreview({ html, title, height }: { html: string; title: string; height?: number }) {
  const [device, setDevice] = useState<Device>('desktop')
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted">{device === 'mobile' ? '375px' : '640px'} preview</span>
        <DeviceToggle device={device} onChange={setDevice} />
      </div>
      <EmailFrame html={html} title={title} device={device} height={height} />
    </div>
  )
}
