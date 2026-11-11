// After `vite build`: GitHub Pages answers 404 for any address without a file (the SPA got there
// only through 404.html), so search engines indexed nothing past the home page. This writes a
// copy of index.html for every route in src/config/siteRoutes.js, as `<route>.html` (Pages serves
// /a/b from a/b.html, with no trailing-slash redirect), with its canonical address baked in,
// and the sitemap from the same list. Unknown addresses still go through 404.html.
import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SITE = 'https://afonsobenedito.github.io/cne80belem';
const DIST = 'dist';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
let routes;
try {
  ({ siteRoutes: routes } = await vite.ssrLoadModule('/src/config/siteRoutes.js'));
  routes = routes();
} finally {
  await vite.close();
}

const shell = await readFile(join(DIST, 'index.html'), 'utf8');
const url = (path) => `${SITE}${path}`;

function page({ canonical, noindex }) {
  const head = `    <link rel="canonical" href="${url(canonical)}" />\n${noindex ? '    <meta name="robots" content="noindex" />\n' : ''}`;
  return shell
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url(canonical)}$2`)
    .replace('</head>', `${head}  </head>`);
}

for (const route of routes) {
  const file = route.path === '/' ? join(DIST, 'index.html') : join(DIST, `${route.path.slice(1)}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(route));
}

const locs = routes.filter((r) => r.index).map((r) => `  <url><loc>${url(r.path)}</loc></url>`);
await writeFile(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs.join('\n')}\n</urlset>\n`,
);
console.log(`static routes: ${routes.length} pages, ${locs.length} in the sitemap`);
