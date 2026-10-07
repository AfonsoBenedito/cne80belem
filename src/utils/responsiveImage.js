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

// Each photo's proportions, read at build time from a tiny 64px variant: lets a component size its
// request to how the photo will actually be shown (a full-screen viewer is limited by height)
const shapes = import.meta.glob(['../assets/images/{carousel,noticias}/**/*.{jpg,jpeg,png}', '../assets/images/sections/*-group.*'], {
  eager: true,
  import: 'default',
  query: { w: '64', format: 'webp', as: 'meta:width;height' },
});

const byUrl = new Map(Object.entries(plain).map(([path, url]) => [url, srcsets[path]]));
const ratioByUrl = new Map(Object.entries(plain).map(([path, url]) => {
  const m = shapes[path];
  return [url, m?.width && m?.height ? m.width / m.height : undefined];
}));

export function srcSetFor(url) {
  return byUrl.get(url);
}

// Width ÷ height of a photo imported from one of the folders above (undefined for anything else)
export function aspectRatioFor(url) {
  return ratioByUrl.get(url);
}
