import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

// The resume button becomes a real PDF download only when this file exists.
// Until then it links to the online resume, so there is never a broken link.
const RESUME_PATH = 'public/resume/Huy-Huynh-Resume.pdf'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __HAS_RESUME_PDF__: JSON.stringify(existsSync(resolve(import.meta.dirname, RESUME_PATH))),
  },
  build: { target: 'es2022' },
})
