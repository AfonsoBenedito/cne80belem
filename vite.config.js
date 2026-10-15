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
  ['/images/distintivos/', 700],
  ['/images/building', 1080],
  ['/images/sections/', 1600],
  ['/images/', 2048],
]

function imageDefaults(url) {
  const path = decodeURIComponent(url.pathname)
  if (!path.includes('/src/assets/images/')) return new URLSearchParams()
  // The Klandestino's 1993 puzzles are 1-bit line art a few hundred pixels wide: lossy WebP
  // would blur the lines, so they ship as the PNGs they are
  if (path.includes('/images/klandestino/')) return new URLSearchParams()
  // The CNE sheet's saudação drawings are line art too, cleaned from a scan: they stay PNG
  if (path.includes('/images/provas/saudacao/')) return new URLSearchParams()
  // The Lobitos' Manual de Adesão's knot diagrams are grey line art as well
  if (path.includes('/images/provas/nos/')) return new URLSearchParams()
  // The badges are set by height (4rem; the progresso pieces up to 8rem, the Promessa's 7rem), so they are capped at 3×
  // that. imagetools never enlarges, so a scan smaller than that keeps its own size
  const badge = path.match(/\/images\/distintivos\/(funcao|progresso|promessa|seccoes|noites|cruzes)\//)
  if (badge) return new URLSearchParams({ h: badge[1] === 'progresso' || badge[1] === 'promessa' ? '384' : '192', format: 'webp', quality: '85' })
  // The secções' logos are only a faded badge in their page's header (~465px at most): 960px
  // covers that on a 2× screen. The group photos beside them in sections/ keep the larger cap
  if (/\/images\/sections\/(lobitos|exploradores|pioneiros|caminheiros)\.\w+$/.test(path)) {
    return new URLSearchParams({ w: '960', format: 'webp', quality: '75' })
  }
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
