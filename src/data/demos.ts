// All data here is synthetic and illustrative. No client code, no real customers.

/* ---------- AMPscript ---------- */
export const ampscriptSource = `%%[
/* Illustrative example · synthetic attributes · not client code */
VAR @first, @tier, @points, @toGo, @city, @offer, @rewardLine, @storeLine

SET @first  = ProperCase(AttributeValue("FirstName"))
SET @tier   = AttributeValue("LoyaltyTier")
SET @points = AttributeValue("PointsBalance")
SET @city   = AttributeValue("City")

/* 1. Fallbacks: never ship an empty greeting */
IF Empty(@first) THEN SET @first = "there" ENDIF
IF Empty(@points) THEN SET @points = 0 ENDIF

/* 2. Conditional content by tier */
IF @tier == "Gold" THEN
  SET @offer = "Free shipping on every order"
ELSEIF @tier == "Silver" THEN
  SET @offer = "Free shipping on orders over $50"
ELSE
  SET @offer = "Join Rewards to unlock free shipping"
ENDIF

/* 3. Derived value */
SET @toGo = Subtract(500, @points)
IF @toGo > 0 THEN
  SET @rewardLine = Concat(@toGo, " points to your next free bottle")
ELSE
  SET @rewardLine = "You have a free bottle waiting"
ENDIF

/* 4. Location with graceful fallback */
SET @storeLine = IIF(Empty(@city), "Find a shop near you", Concat("Pick up in ", @city))
]%%

<p>Hi %%=v(@first)=%%,</p>
<p>%%=v(@offer)=%%.</p>
<p>%%=v(@rewardLine)=%%. %%=v(@storeLine)=%%.</p>`

export interface Subscriber { id: string; FirstName: string; LoyaltyTier: string; PointsBalance: string; City: string; note: string }

export const subscribers: Subscriber[] = [
  { id: 'A', FirstName: 'maya', LoyaltyTier: 'Gold', PointsBalance: '620', City: 'Portland', note: 'Complete record' },
  { id: 'B', FirstName: '', LoyaltyTier: 'Silver', PointsBalance: '380', City: 'Austin', note: 'Missing first name' },
  { id: 'C', FirstName: 'Devon', LoyaltyTier: '', PointsBalance: '', City: '', note: 'Sparse record' },
]

// JavaScript mirror of the AMPscript above. It does NOT run AMPscript; it reproduces the same rules for the demo.
export function renderPersonalization(s: Subscriber) {
  const proper = (t: string) => t.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())
  const first = s.FirstName ? proper(s.FirstName) : 'there'
  const points = s.PointsBalance ? Number(s.PointsBalance) : 0
  const offer = s.LoyaltyTier === 'Gold' ? 'Free shipping on every order'
    : s.LoyaltyTier === 'Silver' ? 'Free shipping on orders over $50'
    : 'Join Rewards to unlock free shipping'
  const toGo = 500 - points
  const rewardLine = toGo > 0 ? `${toGo} points to your next free bottle` : 'You have a free bottle waiting'
  const storeLine = s.City ? `Pick up in ${s.City}` : 'Find a shop near you'
  return { first, offer, rewardLine, storeLine }
}

/* ---------- SQL segmentation ---------- */
export type Category = 'Wine' | 'Whiskey' | 'Beer' | 'Tequila'
export interface Member {
  key: string; email: string; category: Category
  optIn: boolean; ageVerified: boolean; purchaseDaysAgo: number; openDaysAgo: number
}

// Synthetic customers of a fictional wine & spirits retailer.
export const members: Member[] = [
  { key: 'C-1001', email: 'user01@example.com', category: 'Wine', optIn: true, ageVerified: true, purchaseDaysAgo: 75, openDaysAgo: 12 },
  { key: 'C-1002', email: 'user02@example.com', category: 'Whiskey', optIn: true, ageVerified: true, purchaseDaysAgo: 20, openDaysAgo: 5 },
  { key: 'C-1003', email: 'user03@example.com', category: 'Beer', optIn: true, ageVerified: true, purchaseDaysAgo: 140, openDaysAgo: 60 },
  { key: 'C-1004', email: 'user04@example.com', category: 'Wine', optIn: false, ageVerified: true, purchaseDaysAgo: 90, openDaysAgo: 30 },
  { key: 'C-1005', email: 'user05@example.com', category: 'Whiskey', optIn: true, ageVerified: true, purchaseDaysAgo: 64, openDaysAgo: 80 },
  { key: 'C-1006', email: 'user06@example.com', category: 'Tequila', optIn: true, ageVerified: true, purchaseDaysAgo: 110, openDaysAgo: 200 },
  { key: 'C-1007', email: 'user07@example.com', category: 'Beer', optIn: true, ageVerified: true, purchaseDaysAgo: 15, openDaysAgo: 3 },
  { key: 'C-1008', email: 'user08@example.com', category: 'Wine', optIn: true, ageVerified: true, purchaseDaysAgo: 61, openDaysAgo: 95 },
  { key: 'C-1009', email: 'user09@example.com', category: 'Tequila', optIn: true, ageVerified: true, purchaseDaysAgo: 33, openDaysAgo: 8 },
  { key: 'C-1010', email: 'user10@example.com', category: 'Whiskey', optIn: true, ageVerified: false, purchaseDaysAgo: 80, openDaysAgo: 20 },
  { key: 'C-1011', email: 'user11@example.com', category: 'Beer', optIn: true, ageVerified: true, purchaseDaysAgo: 200, openDaysAgo: 150 },
  { key: 'C-1012', email: 'user12@example.com', category: 'Whiskey', optIn: true, ageVerified: true, purchaseDaysAgo: 88, openDaysAgo: 40 },
]

export interface SegmentFilters { categories: string[]; lapsedDays: number; engagedDays: number | null }

export function matches(m: Member, f: SegmentFilters): boolean {
  if (!m.optIn || !m.ageVerified) return false
  if (f.categories.length && !f.categories.includes(m.category)) return false
  if (!(m.purchaseDaysAgo > f.lapsedDays)) return false
  if (f.engagedDays !== null && !(m.openDaysAgo <= f.engagedDays)) return false
  return true
}

export function buildSql(f: SegmentFilters): string {
  const lines = [
    '-- Illustrative example · synthetic data extension and field names',
    '-- Goal: consented, age-verified customers who have not purchased recently',
    'SELECT',
    '  c.SubscriberKey,',
    '  c.EmailAddress,',
    '  c.PreferredCategory',
    'FROM Customers c',
    'WHERE c.OptIn = 1',
    '  AND c.AgeVerified = 1',
  ]
  if (f.categories.length) lines.push(`  AND c.PreferredCategory IN (${f.categories.map((t) => `'${t}'`).join(', ')})`)
  lines.push(`  AND c.LastPurchaseDate < DATEADD(day, -${f.lapsedDays}, GETDATE())`)
  if (f.engagedDays !== null) lines.push(`  AND c.LastOpenDate >= DATEADD(day, -${f.engagedDays}, GETDATE())`)
  return lines.join('\n')
}

/* ---------- Responsive patterns (case study 1) ---------- */
export const responsivePatterns = [
  {
    title: 'Fluid container with a fixed ceiling',
    why: 'Width is 100% up to 600px, so there is nothing to overflow on narrow screens.',
    lang: 'html' as const,
    code: `<table class="container" role="presentation" width="600"
       style="width:100%;max-width:600px;">`,
  },
  {
    title: 'Outlook "ghost table" wrapper',
    why: 'Outlook for Windows ignores max-width, so a conditional table pins it at 600px there only.',
    lang: 'html' as const,
    code: `<!--[if mso]><table role="presentation" width="600" align="center"><tr><td><![endif]-->
  ...content...
<!--[if mso]></td></tr></table><![endif]-->`,
  },
  {
    title: 'Stack columns on small screens',
    why: 'Two columns on desktop. A media query turns each cell into a full-width block on mobile.',
    lang: 'css' as const,
    code: `@media (max-width:600px) {
  .stack { display:block !important; width:100% !important; }
  .px    { padding-left:20px !important; padding-right:20px !important; }
}`,
  },
  {
    title: 'Live-text hero with background color',
    why: 'Headline stays readable with images blocked, and nothing needs to be sliced or re-exported.',
    lang: 'html' as const,
    code: `<td bgcolor="#b45309" style="background:#b45309;padding:44px 32px;">
  <h1 class="h1" style="margin:0;font-size:38px;line-height:44px;">...</h1>
</td>`,
  },
]

export const responsiveNotes = [
  { title: 'Compatibility', body: 'Table layout, inline styles for critical rules, and conditional comments for Outlook. Media queries only enhance.' },
  { title: 'Maintainability', body: 'Sections are self-contained modules with named classes. Copy changes never touch structure.' },
  { title: 'Accessibility', body: 'lang attribute, role="presentation" on layout tables, real heading, descriptive link text, and contrast checked on every accent color.' },
  { title: 'Rendering QA', body: 'Checked in the preview here, then in Litmus across target clients before any send.' },
]

/* ---------- QA cases ---------- */
const svgImg = (w: number, h: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#1d4ed8"/><text x="50%" y="50%" fill="#fff" font-family="Arial" font-size="28" text-anchor="middle" dominant-baseline="middle">${w}×${h} hero image</text></svg>`)}`

const wrap = (inner: string) =>
  `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{margin:0;font-family:Arial,sans-serif;background:#fff}p{margin:0;padding:12px;font-size:15px}</style></head><body>${inner}</body></html>`

export interface QaCase {
  id: string; title: string; symptom: string; cause: string; fix: string
  before: string; after: string; lang: 'html'
  preview?: { before: string; after: string; width: number }
  previewNote?: string
}

export const qaCases: QaCase[] = [
  {
    id: 'overflow',
    title: 'Mobile overflow',
    symptom: 'On a phone the email scrolls sideways and the right edge is cut off.',
    cause: 'A hard-coded 600px wide table cannot shrink below 600px.',
    fix: 'Make the container fluid with a max-width ceiling.',
    before: `<table width="600" style="width:600px;">
  <tr><td>...</td></tr>
</table>`,
    after: `<table width="600" style="width:100%;max-width:600px;">
  <tr><td>...</td></tr>
</table>`,
    lang: 'html',
    preview: {
      width: 320,
      before: wrap(`<table width="600" style="width:600px;background:#dbeafe"><tr><td><p>Fixed 600px table. Resize the preview and the right edge falls off screen.</p></td></tr></table>`),
      after: wrap(`<table width="600" style="width:100%;max-width:600px;background:#dcfce7"><tr><td><p>Fluid table. Same content, fits the viewport.</p></td></tr></table>`),
    },
  },
  {
    id: 'image',
    title: 'Image scaling',
    symptom: 'A full-width hero image spills past the screen or keeps a stretched height.',
    cause: 'The image has a fixed pixel width and no rule telling it to scale down.',
    fix: 'Pair the width attribute (for Outlook) with width:100%, max-width, and height:auto.',
    before: `<img src="hero.jpg" width="600" height="200" alt="Fall wine picks">`,
    after: `<img src="hero.jpg" width="600" alt="Fall wine picks"
     style="display:block;width:100%;max-width:600px;height:auto;border:0;">`,
    lang: 'html',
    preview: {
      width: 320,
      before: wrap(`<img src="${svgImg(600, 200)}" width="600" height="200" alt="Hero image" style="display:block">`),
      after: wrap(`<img src="${svgImg(600, 200)}" width="600" alt="Hero image" style="display:block;width:100%;max-width:600px;height:auto;border:0">`),
    },
  },
  {
    id: 'spacing',
    title: 'Outlook spacing differences',
    symptom: 'Gaps between paragraphs look different in Outlook for Windows than in Apple Mail or Gmail.',
    cause: 'Outlook uses the Word rendering engine, which treats paragraph margins and line-height differently.',
    fix: 'Drive spacing with cell padding and set an exact line-height for Outlook.',
    before: `<td>
  <p style="margin:16px 0;line-height:1.5;">Body copy</p>
</td>`,
    after: `<td style="padding:16px 0;font-size:16px;
           line-height:24px;mso-line-height-rule:exactly;">
  Body copy
</td>`,
    lang: 'html',
    previewNote: 'Browsers render both versions almost identically. This class of bug only appears in Outlook desktop, which is why a real client test is a required QA step rather than an optional one.',
  },
  {
    id: 'button',
    title: 'Button rendering',
    symptom: 'The button looks like a plain text link in Outlook for Windows, with no padding or background.',
    cause: 'Outlook ignores padding on inline links, so the colored shape collapses.',
    fix: 'Put the background and padding on the table cell and keep the link inside it.',
    before: `<a href="https://example.com/shop"
   style="display:inline-block;padding:14px 28px;
          background:#b45309;color:#fff;border-radius:6px;">
  Shop the picks
</a>`,
    after: `<table role="presentation"><tr>
  <td bgcolor="#b45309"
      style="background:#b45309;border-radius:6px;padding:14px 28px;">
    <a href="https://example.com/shop"
       style="color:#fff;text-decoration:none;display:inline-block;">
      Shop the picks
    </a>
  </td>
</tr></table>`,
    lang: 'html',
    previewNote: 'Modern browsers show both buttons correctly. The Outlook failure is only visible in an Outlook render test.',
  },
]

export const qaWorkflow = [
  { title: 'Review the build', body: 'Compare against the design and spec. Check structure, copy, and module use before anything renders.' },
  { title: 'Validate and audit', body: 'HTML sanity pass plus accessibility basics: lang, alt text, heading order, contrast, link text.' },
  { title: 'Render across clients', body: 'Run Litmus for the target client list, including Outlook desktop, Gmail, Apple Mail, and mobile.' },
  { title: 'Validate links and tracking', body: 'Click every URL. Confirm tracking parameters, unsubscribe, and preference links.' },
  { title: 'Test personalization', body: 'Send seed records that include empty and unusual values, not just the happy path.' },
  { title: 'Approve and release', body: 'Collect sign-off, run the final checklist, then hand off for send.' },
]

/* ---------- Journey ---------- */
export interface JourneyNode {
  id: string; type: 'Entry' | 'Email' | 'Wait' | 'Split' | 'Exit'; title: string; summary: string
  data: string; logic: string; maps: string
}

export const journeyNodes: JourneyNode[] = [
  { id: 'entry', type: 'Entry', title: 'Joins Rewards', summary: 'Opted-in subscriber joins the program.',
    data: 'OptIn = true · JoinDate = today · LoyaltyTier assigned',
    logic: 'Enter once per subscriber. Exclude anyone on the suppression list.',
    maps: 'Journey entry source (data extension) with entry criteria and re-entry set to "no re-entry".' },
  { id: 'e1', type: 'Email', title: 'Email 1 · Welcome', summary: 'Explains how points work.',
    data: 'FirstName, LoyaltyTier',
    logic: 'AMPscript greeting with a fallback, tier-specific benefit line.',
    maps: 'Email activity using a Content Builder template and AMPscript.' },
  { id: 'w1', type: 'Wait', title: 'Wait 2 days', summary: 'Give the first email room.',
    data: 'None', logic: 'Fixed duration so the next decision uses fresh engagement data.',
    maps: 'Wait activity (duration).' },
  { id: 's1', type: 'Split', title: 'Opened Email 1?', summary: 'Two paths based on engagement.',
    data: 'Open event from Email 1',
    logic: 'Yes → how-it-works follow-up. No → resend with a new subject line and preheader.',
    maps: 'Engagement split on the Email 1 activity.' },
  { id: 'e2', type: 'Email', title: 'Email 2 · Two paths', summary: 'Follow-up or a retry, depending on the split.',
    data: 'Same profile fields, new content block',
    logic: 'Same template, different content module and subject. Modules keep both paths consistent.',
    maps: 'Two email activities reusing shared Content Builder blocks.' },
  { id: 'w2', type: 'Wait', title: 'Wait 3 days', summary: 'Pause before checking purchase.',
    data: 'None', logic: 'Allow time for a first purchase before sending an offer.',
    maps: 'Wait activity (duration).' },
  { id: 's2', type: 'Split', title: 'Made first purchase?', summary: 'Skip the offer if they already bought.',
    data: 'Order records (synthetic: FirstPurchaseDate is not null)',
    logic: 'Yes → exit to a post-purchase journey. No → send the offer.',
    maps: 'Decision split on a data extension attribute.' },
  { id: 'e3', type: 'Email', title: 'Email 3 · First-purchase offer', summary: 'Offer scaled by tier.',
    data: 'LoyaltyTier, PointsBalance, City',
    logic: 'Conditional offer by tier, derived "points to go" value, fallback for missing city.',
    maps: 'Email activity with the personalization block from the AMPscript example.' },
  { id: 'exit', type: 'Exit', title: 'Exit', summary: 'Journey ends. No further sends.',
    data: 'None', logic: 'Record the exit reason for reporting. Hand off to other programs.',
    maps: 'Journey goal / exit criteria.' },
]

/* ---------- Production module map (structure only, no client content) ---------- */
export const productionModules: { name: string; role: string; scope: 'shared' | 'varies' }[] = [
  { name: 'Preheader and spacing', role: 'Hidden preview text and fixed spacer blocks between modules.', scope: 'shared' },
  { name: 'Loyalty strip', role: 'Slim utility row above the logo with its own mobile spacing classes.', scope: 'shared' },
  { name: 'Logo', role: 'Linked logo cell that stays centered on mobile.', scope: 'shared' },
  { name: 'Five-item navigation', role: 'Desktop nav row with a separate mobile nav, toggled by visibility classes.', scope: 'shared' },
  { name: 'Hero / headline', role: 'Image or live-text headline for the campaign message.', scope: 'varies' },
  { name: 'Offer or product rows', role: 'Single or two-column blocks that stack on mobile, with a bulletproof button.', scope: 'varies' },
  { name: 'Value-prop strip', role: 'Short supporting message row, used when the campaign calls for it.', scope: 'varies' },
  { name: 'Link and legal footer', role: 'Footer links, disclaimers, and unsubscribe. Identical on every send.', scope: 'shared' },
]

export const productionFacts = [
  'Each email is a vertical stack of Content Builder blocks separated by spacer rows.',
  'One 600px container and one max-width:600px breakpoint drive the mobile layout.',
  'Shared class names handle mobile text size, centering, and show/hide behavior.',
  'Outlook conditionals and VML namespaces are in the shell, with lang set on the html tag.',
  'In the samples I reviewed, the top (preheader through navigation) and bottom (footer) modules were the same. Only the hero and offer modules changed.',
]
