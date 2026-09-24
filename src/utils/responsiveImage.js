// Maps a plain photo import (the URL config files already hold) to a WebP srcset,
// so components can serve phone-sized files without changing how photos are imported.
// Both globs must use the same pattern literal (import.meta.glob rejects variables).
const plain = import.meta.glob(['../assets/images/{carousel,noticias}/**/*.{jpg,jpeg,png}', '../assets/images/sections/*-group.*'], {
  eager: true,
  import: 'default',
});
const srcsets = import.meta.glob(['../assets/images/{carousel,noticias}/**/*.{jpg,jpeg,png}', '../assets/images/sections/*-group.*'], {
  eager: true,
  import: 'default',
  query: { w: '480;800;1200;1600;2048', format: 'webp', quality: '70', as: 'srcset' },
});

const byUrl = new Map(Object.entries(plain).map(([path, url]) => [url, srcsets[path]]));

export function srcSetFor(url) {
  return byUrl.get(url);
}
