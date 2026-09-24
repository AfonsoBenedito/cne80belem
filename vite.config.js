import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imagetools({ defaultDirectives: imageDefaults })],
  base: '/cne80belem/',
})
