# Before you publish

## You must supply
- [ ] Approved resume PDF → `public/resume/Huy-Huynh-Resume.pdf`
- [ ] Final live URL → `VITE_SITE_URL` (Netlify env var and `.env`)
- [ ] Shane Co. contract dates → `src/data/profile.ts` (entry `shane`, `dates`). It shows no dates until you add them.

## You must verify (I could not confirm these)
- [ ] **Job title at Total Wine & More.** Your brief says "Senior Email Specialist". Your two existing sites say "Email Producer". Resume, LinkedIn, and this site must match.
- [ ] **Years of experience.** Site says 13+ (Apr 2012 – Aug 2025). Existing sites say 10+.
- [ ] **Merkle client brands.** Your brief lists Samsung, Ford, Shane Co., Volkswagen, iRobot. Your existing sites mention only Ford. They are worded as agency client programs, not employers. Remove any you cannot stand behind.
- [ ] **Skill depth tags** (`src/data/skills.ts`): Hands-on / Working / Exposure are my judgment from your brief. Adjust to what is true. Check Journey Builder, CloudPages, A/B testing, SSJS, and Git/GitHub especially.
- [ ] **Education and Google AI certificate** are carried over from your existing resume site. Confirm they should appear.
- [ ] Phone number is public on the site. Remove it from `Contact.tsx` if you prefer.

## Already handled
- No metrics, testimonials, or client results are claimed.
- Demos are labeled illustrative; journey is labeled not a client project.
