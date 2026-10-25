# Huy Huynh — Email Developer Portfolio

React + TypeScript + Vite + Tailwind CSS v4. Static site, no backend, no secrets.

## Setup
```bash
npm install
cp .env.example .env     # set VITE_SITE_URL to your live URL
npm run dev              # http://localhost:5173
```

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run typecheck` | TypeScript check |
| `npm run build` | Typecheck + production build to `dist/` |
| `npm run preview` | Serve the build locally |

## Where to edit
- `src/data/profile.ts` — contact info, titles, dates, timeline, education (single source of truth)
- `src/data/skills.ts` — skills and depth levels
- `src/data/emailModules.ts` — the sample email (fictional brand)
- `src/data/demos.ts` — AMPscript, SQL, QA cases, journey steps
- `index.html` — SEO and Open Graph tags
- `public/og-image.png` — social share image (1200×630)

## Resume PDF
Put your approved PDF at `public/resume/Huy-Huynh-Resume.pdf` and rebuild.
Until it exists, every resume button links to your online resume instead, so there is never a broken link.

## Deploy to Netlify
1. Push this folder to a GitHub repo.
2. Netlify → Add new site → Import from Git. Build command `npm run build`, publish directory `dist` (already in `netlify.toml`).
3. Site settings → Environment variables → add `VITE_SITE_URL` = your final URL (no trailing slash), then redeploy.
4. Or drag-and-drop: run `npm run build`, then drop the `dist` folder into Netlify.

After deploying, test the link in the LinkedIn Post Inspector to refresh the share preview.

## Safety notes
Email previews render inside a fully sandboxed iframe (no scripts). The AMPscript demo is a JavaScript simulation; nothing user-supplied is ever executed. All demo content uses a fictional brand, example.com links, and synthetic data.
