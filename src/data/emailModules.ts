// Fictional brand, synthetic content. Every link points to example.com.
// The preview iframe and the source viewer both use the exact strings built here,
// so what you read is what renders.

export type VariantId = 'seasonal' | 'sale' | 'loyalty'
export type ModuleId = 'header' | 'hero' | 'content' | 'cta' | 'footer'

export interface Variant {
  id: VariantId
  label: string
  accent: string
  accentText: string
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
  preheader: string
  cards: { name: string; note: string; tone: string }[]
}

export const variants: Variant[] = [
  {
    id: 'seasonal',
    label: 'Seasonal picks',
    accent: '#9f1239',
    accentText: '#ffffff',
    eyebrow: 'New this fall',
    headline: 'Cellar picks for cooler nights.',
    body: 'Rich reds and warm-spiced spirits, chosen by our team for the season.',
    ctaLabel: 'Shop the picks',
    preheader: 'Our fall selections just arrived.',
    cards: [
      { name: 'Hers Red Blend', note: '750 ml · red wine', tone: '#7f1d1d' },
      { name: 'His Reserve Bourbon', note: '750 ml · bourbon', tone: '#78350f' },
    ],
  },
  {
    id: 'sale',
    label: 'Weekend offer',
    accent: '#0f766e',
    accentText: '#ffffff',
    eyebrow: 'This weekend only',
    headline: '20% off select cases.',
    body: 'Stock up on favorites. Offer runs Saturday and Sunday on selected wines.',
    ctaLabel: 'See the offer',
    preheader: 'Two days. Selected wines.',
    cards: [
      { name: 'Coastal White', note: '750 ml · case of 6', tone: '#115e59' },
      { name: 'Ridge Rosé', note: '750 ml · case of 6', tone: '#134e4a' },
    ],
  },
  {
    id: 'loyalty',
    label: 'Loyalty reminder',
    accent: '#1d4ed8',
    accentText: '#ffffff',
    eyebrow: 'Rewards',
    headline: 'You are close to a free bottle.',
    body: 'Your points are almost there. Redeem them on any bottle, online or in store.',
    ctaLabel: 'View my rewards',
    preheader: 'Your next bottle may be free.',
    cards: [
      { name: 'Earn 2x points', note: 'On featured picks', tone: '#1e3a8a' },
      { name: 'Redeem anywhere', note: 'Online or in store', tone: '#1e40af' },
    ],
  },
]

export const moduleMeta: { id: ModuleId; name: string; purpose: string }[] = [
  { id: 'header', name: 'Header', purpose: 'Logo lockup and optional web-view link. Same on every send.' },
  { id: 'hero', name: 'Hero', purpose: 'Live-text headline on a background color. No image dependency.' },
  { id: 'content', name: 'Content block', purpose: 'Two columns on desktop that stack on mobile.' },
  { id: 'cta', name: 'CTA', purpose: 'Bulletproof button. Padding lives on the cell for Outlook.' },
  { id: 'footer', name: 'Footer', purpose: 'Legal, address, and unsubscribe. Locked so it is never forgotten.' },
]

const font = "font-family:Arial,Helvetica,sans-serif;"

export function moduleHtml(id: ModuleId, v: Variant): string {
  switch (id) {
    case 'header':
      return `<!-- MODULE: header -->
<tr>
  <td class="px" style="padding:20px 32px;background:#ffffff;${font}font-size:18px;font-weight:bold;color:#1f1612;">
    Harbor &amp; <span style="color:${v.accent};">Hearth</span>
  </td>
</tr>`
    case 'hero':
      return `<!-- MODULE: hero (live text, no image needed) -->
<tr>
  <td class="px" bgcolor="${v.accent}" style="padding:44px 32px;background:${v.accent};${font}color:${v.accentText};">
    <p style="margin:0 0 8px;font-size:13px;letter-spacing:1px;text-transform:uppercase;">${v.eyebrow}</p>
    <h1 class="h1" style="margin:0 0 12px;font-size:38px;line-height:44px;">${v.headline}</h1>
    <p style="margin:0;font-size:16px;line-height:24px;">${v.body}</p>
  </td>
</tr>`
    case 'content':
      return `<!-- MODULE: content (2-up, stacks on mobile) -->
<tr>
  <td class="px" style="padding:28px 32px 8px;background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
${v.cards.map((c, i) => `        <td class="stack" width="50%" valign="top" style="padding:${i === 0 ? '0 8px 16px 0' : '0 0 16px 8px'};">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td bgcolor="${c.tone}" height="96" style="background:${c.tone};height:96px;"></td></tr>
            <tr><td style="padding-top:10px;${font}font-size:16px;font-weight:bold;color:#1f1612;">${c.name}</td></tr>
            <tr><td style="${font}font-size:14px;color:#6b5f57;">${c.note}</td></tr>
          </table>
        </td>`).join('\n')}
      </tr>
    </table>
  </td>
</tr>`
    case 'cta':
      return `<!-- MODULE: cta (bulletproof button) -->
<tr>
  <td class="px" style="padding:8px 32px 36px;background:#ffffff;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td bgcolor="${v.accent}" style="background:${v.accent};border-radius:6px;padding:14px 28px;">
          <a href="https://example.com/shop" style="${font}font-size:16px;font-weight:bold;color:${v.accentText};text-decoration:none;display:inline-block;">${v.ctaLabel}</a>
        </td>
      </tr>
    </table>
  </td>
</tr>`
    case 'footer':
      return `<!-- MODULE: footer -->
<tr>
  <td class="px" style="padding:24px 32px;background:#efe9e2;${font}font-size:12px;line-height:18px;color:#5f544c;">
    Harbor &amp; Hearth is a fictional brand used for this demonstration. Must be 21+ to purchase.<br>
    100 Example Street, Sample City<br>
    <a href="https://example.com/unsubscribe" style="color:#5f544c;">Unsubscribe</a> ·
    <a href="https://example.com/preferences" style="color:#5f544c;">Preferences</a>
  </td>
</tr>`
  }
}

const css = `    body { margin:0; padding:0; width:100% !important; -webkit-text-size-adjust:100%; }
    table { border-collapse:collapse; mso-table-lspace:0; mso-table-rspace:0; }
    img { border:0; display:block; max-width:100%; height:auto; }
    @media (max-width:600px) {
      .container { width:100% !important; }
      .stack { display:block !important; width:100% !important; padding:0 0 16px !important; }
      .px { padding-left:20px !important; padding-right:20px !important; }
      .h1 { font-size:30px !important; line-height:36px !important; }
    }`

export const allModules: ModuleId[] = ['header', 'hero', 'content', 'cta', 'footer']

export function buildEmail(v: Variant, enabled: ModuleId[] = allModules): string {
  const rows = allModules.filter((m) => enabled.includes(m)).map((m) => moduleHtml(m, v)).join('\n')
  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>${v.headline}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
${css}
  </style>
</head>
<body style="margin:0;padding:0;background:#efe9e2;">
  <div style="display:none;max-height:0;overflow:hidden;">${v.preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <!--[if mso]><table role="presentation" width="600" align="center"><tr><td><![endif]-->
        <table class="container" role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
${rows}
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`
}
