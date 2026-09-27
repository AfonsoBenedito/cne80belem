import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import { statSync } from 'node:fs'

// Every raster under src/assets/images ships as resized WebP, so camera
// originals can be committed as-is. Widths are ~2–3× the largest display size.
const MAX_WIDTH = [
  ['/images/logos/', 320],
  ['/images/members/', 320],
  ['/images/fardas/', 480],
  ['/images/building', 1080],
  ['/images/sections/', 1600],
  ['/images/', 2048],
]

function imageDefaults(url) {
  const path = decodeURIComponent(url.pathname)
  if (!path.includes('/src/assets/images/')) return new URLSearchParams()
  const [, w] = MAX_WIDTH.find(([dir]) => path.includes(dir))
  return new URLSearchParams({ w: String(w), format: 'webp', quality: '75' })
}

// `import size from './file.pdf?bytes'` is the file's size in bytes, read at build time,
// so the size a page shows can't drift from the file it links to
function fileBytes() {
  return {
    name: 'file-bytes',
    enforce: 'pre',
    load(id) {
      const [path, query] = id.split('?')
      if (query !== 'bytes') return
      this.addWatchFile(path)
      return `export default ${statSync(path).size}`
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [fileBytes(), react(), imagetools({ defaultDirectives: imageDefaults })],
  base: '/cne80belem/',
})
