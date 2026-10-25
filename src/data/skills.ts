export type Level = 'hands-on' | 'working' | 'exposure'

export const levels: Record<Level, { label: string; note: string }> = {
  'hands-on': { label: 'Hands-on', note: 'Used daily in production' },
  working: { label: 'Working knowledge', note: 'Used regularly, less depth' },
  exposure: { label: 'Exposure', note: 'Familiar, limited production use' },
}

export const skillGroups: { title: string; blurb: string; items: { name: string; level: Level }[] }[] = [
  {
    title: 'Email Development',
    blurb: 'The craft: code that survives every inbox.',
    items: [
      { name: 'HTML5', level: 'hands-on' },
      { name: 'CSS', level: 'hands-on' },
      { name: 'Responsive Email Design', level: 'hands-on' },
      { name: 'Table-Based Layouts', level: 'hands-on' },
      { name: 'Cross-Client Compatibility', level: 'hands-on' },
      { name: 'Outlook-Specific Fixes', level: 'hands-on' },
      { name: 'Email Accessibility', level: 'hands-on' },
      { name: 'Email Rendering QA', level: 'hands-on' },
    ],
  },
  {
    title: 'Salesforce Marketing Cloud',
    blurb: 'Data, logic, and automation behind the send.',
    items: [
      { name: 'SFMC / ExactTarget', level: 'hands-on' },
      { name: 'AMPscript', level: 'hands-on' },
      { name: 'SQL', level: 'hands-on' },
      { name: 'Automation Studio / Query Activities', level: 'hands-on' },
      { name: 'Email Studio', level: 'hands-on' },
      { name: 'Content Builder', level: 'hands-on' },
      { name: 'Journey Builder', level: 'working' },
      { name: 'CloudPages', level: 'working' },
      { name: 'SSJS', level: 'exposure' },
    ],
  },
  {
    title: 'QA & Optimization',
    blurb: 'Catching problems before subscribers do.',
    items: [
      { name: 'Litmus', level: 'hands-on' },
      { name: 'Rendering Testing', level: 'hands-on' },
      { name: 'Link Validation', level: 'hands-on' },
      { name: 'A/B Testing', level: 'working' },
      { name: 'Campaign Troubleshooting', level: 'hands-on' },
      { name: 'Modular Template Systems', level: 'hands-on' },
    ],
  },
  {
    title: 'Additional Technologies',
    blurb: 'Adjacent tools and platforms.',
    items: [
      { name: 'Klaviyo', level: 'exposure' },
      { name: 'Adobe Journey Optimizer', level: 'exposure' },
      { name: 'Git / GitHub', level: 'working' },
    ],
  },
]
