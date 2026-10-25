import type { ReactNode } from 'react'

export type Lang = 'html' | 'ampscript' | 'sql' | 'css' | 'text'

type Rule = [RegExp, string]

const rules: Record<Lang, Rule[]> = {
  html: [
    [/<!--[\s\S]*?-->/y, 'c'],
    [/<\/?[a-zA-Z][\w:-]*/y, 't'],
    [/\/?>/y, 't'],
    [/[\w:-]+(?==)/y, 'a'],
    [/"[^"]*"|'[^']*'/y, 's'],
  ],
  css: [
    [/\/\*[\s\S]*?\*\//y, 'c'],
    [/[.#]?[a-zA-Z][\w-]*(?=\s*[{,])/y, 't'],
    [/[\w-]+(?=\s*:)/y, 'a'],
    [/"[^"]*"|'[^']*'|#[0-9a-fA-F]{3,8}\b|\d+(\.\d+)?(px|%|em|rem)?/y, 's'],
  ],
  ampscript: [
    [/\/\*[\s\S]*?\*\//y, 'c'],
    [/%%\[|\]%%|%%=|=%%/y, 'p'],
    [/@\w+/y, 'v'],
    [/\b(?:VAR|SET|IF|THEN|ELSEIF|ELSE|ENDIF|FOR|NEXT|DO|TO|AND|OR|NOT)\b/iy, 'k'],
    [/\b[A-Z][A-Za-z]+(?=\()/y, 'f'],
    [/"[^"]*"|'[^']*'/y, 's'],
    [/\b\d+\b/y, 'n'],
  ],
  sql: [
    [/--[^\n]*/y, 'c'],
    [/\b(?:SELECT|FROM|WHERE|AND|OR|NOT|JOIN|LEFT|INNER|ON|AS|GROUP BY|ORDER BY|HAVING|IN|IS|NULL|DISTINCT|CASE|WHEN|THEN|ELSE|END|EXISTS|LIKE)\b/iy, 'k'],
    [/\b(?:COUNT|MAX|MIN|SUM|DATEADD|GETDATE|LOWER|COALESCE)\b(?=\()/iy, 'f'],
    [/'[^']*'/y, 's'],
    [/\b\d+\b/y, 'n'],
  ],
  text: [],
}

const color: Record<string, string> = {
  c: 'text-slate-500 italic',
  t: 'text-sky-300',
  a: 'text-cyan-200',
  s: 'text-emerald-300',
  k: 'text-violet-300',
  f: 'text-amber-200',
  v: 'text-rose-300',
  n: 'text-orange-300',
  p: 'text-cyan-400',
}

// Tiny tokenizer. Output is plain React text nodes, so nothing is ever executed or injected as HTML.
export function highlight(code: string, lang: Lang): ReactNode[] {
  const out: ReactNode[] = []
  const rs = rules[lang]
  let i = 0
  let buf = ''
  let key = 0
  const flush = () => { if (buf) { out.push(buf); buf = '' } }
  while (i < code.length) {
    let hit: [string, string] | null = null
    for (const [re, cls] of rs) {
      re.lastIndex = i
      const m = re.exec(code)
      if (m && m.index === i && m[0].length > 0) { hit = [m[0], cls]; break }
    }
    if (hit) {
      flush()
      out.push(<span key={key++} className={color[hit[1]]}>{hit[0]}</span>)
      i += hit[0].length
    } else {
      buf += code[i++]
    }
  }
  flush()
  return out
}
