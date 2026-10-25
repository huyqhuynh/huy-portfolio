// Single source of truth for contact details and titles.
// Keep in sync with the resume PDF.
export const profile = {
  name: 'Huy Huynh',
  title: 'Senior Email Developer',
  tagline: 'Senior Email Developer | Marketing Automation Specialist',
  years: '13+',
  email: 'huyqhuynh@icloud.com',
  phone: '916-908-7440',
  phoneHref: 'tel:+19169087440',
  linkedin: 'https://www.linkedin.com/in/huyqhuynh102',
  onlineResume: 'https://huyqhuynhresume.netlify.app',
  resumePdf: '/resume/Huy-Huynh-Resume.pdf',
  hasResumePdf: __HAS_RESUME_PDF__,
} as const

export const resumeCta = profile.hasResumePdf
  ? { label: 'Download Resume', href: profile.resumePdf, download: true, external: false }
  : { label: 'View Resume', href: profile.onlineResume, download: false, external: true }

export const credentials = {
  education: {
    school: 'Westwood College of Technology',
    detail: "Bachelor's · Web & Multimedia Design",
    years: '2006 – 2010',
  },
  certification: {
    name: 'Google AI Professional Certificate',
    detail: 'Google · Coursera · Mar 2026',
    href: 'https://coursera.org/verify/professional-cert/JBNGQFAO0H5Y',
  },
}

export const experience = [
  {
    id: 'twm',
    org: 'Total Wine & More',
    role: 'Senior Email Specialist',
    kind: 'In-house · Retail',
    dates: 'Aug 2017 – Aug 2025',
    bullets: [
      'Hand-coded responsive HTML/CSS emails from scratch, and built reusable templates that held up in Outlook and on mobile.',
      'Built market-specific dynamic content in Salesforce Marketing Cloud with AMPscript and business rules.',
      'Wrote SQL to pull and segment audiences for personalized sends.',
      'Ran QA from start to finish: link checks, Litmus rendering tests, and approval tracking.',
      'Built and managed automated email workflows for high-volume sends, working with promotions, creative, and strategy teams.',
    ],
    stack: ['HTML/CSS', 'SFMC', 'AMPscript', 'SQL', 'Litmus'],
  },
  {
    id: 'shane',
    org: 'Shane Co.',
    role: 'Contract Email Development',
    kind: 'Contract · Retail',
    dates: null, // Add verified dates before publishing, e.g. 'Mar 2026 – Jun 2026'
    bullets: [
      'Contract email development during a move toward Klaviyo.',
    ],
    stack: ['HTML/CSS', 'Klaviyo'],
  },
  {
    id: 'merkle',
    org: 'Merkle',
    role: 'Senior Email Developer',
    kind: 'Agency · Enterprise clients',
    dates: 'Apr 2012 – Dec 2016',
    bullets: [
      'Built complex responsive campaigns and HTML templates for enterprise clients.',
      'Wrote AMPscript and SQL for personalization and dynamic content in Salesforce Marketing Cloud.',
      'Tested, troubleshot, and fixed rendering problems across email clients and devices.',
      'Produced modular templates on tight campaign schedules.',
    ],
    stack: ['HTML/CSS', 'ExactTarget / SFMC', 'AMPscript', 'SQL'],
    clients: ['Ford', 'Samsung', 'Volkswagen', 'iRobot', 'Shane Co.'],
  },
] as const
