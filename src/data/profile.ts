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
      'Hand-coded responsive HTML/CSS email from scratch, including reusable modular templates built for Outlook and mobile.',
      'Built dynamic, market-specific content in Salesforce Marketing Cloud with AMPscript and business rules.',
      'Wrote SQL to extract and segment audiences for personalized sends.',
      'Ran QA end to end: link validation, Litmus rendering checks, and approval tracking.',
      'Maintained scalable production workflows alongside promotions, creative, and strategy teams.',
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
      'Contract email development supporting a platform transition toward Klaviyo.',
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
      'Developed complex, responsive email campaigns and templates for enterprise clients served by the agency.',
      'Supported personalization and dynamic content using AMPscript and SQL in Salesforce Marketing Cloud.',
      'Troubleshot rendering issues and ran testing and QA across clients and devices.',
      'Delivered modular template production on tight campaign schedules.',
    ],
    stack: ['HTML/CSS', 'ExactTarget / SFMC', 'AMPscript', 'SQL'],
    clients: ['Ford', 'Samsung', 'Volkswagen', 'iRobot', 'Shane Co.'],
  },
] as const
