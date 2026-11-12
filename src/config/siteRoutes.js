// Every address the site answers, for the build (scripts/static-routes.mjs): each gets its own
// HTML file, so a deep link answers 200 instead of GitHub Pages' 404, and the indexable ones,
// at their canonical address, make the sitemap. Keep it in step with the routes in App.jsx.
import { seccoes } from './seccoes';
import { provas } from './provas';
import { noticias } from './noticias';
import { cancoes } from './cancioneiro';
import { issueSlugs } from './klandestino';
import { provaCanonicalPath } from './canonical';

const NEWS_PAGE = { lobitos: 'covil', exploradores: 'base', pioneiros: 'abrigo', caminheiros: 'albergue' };
// The news pages' old addresses (the Exploradores' Cabana, now Base; the Caminheiros' Base, now
// Albergue): each still has its file, so an old link opens, and App.jsx sends it on; out of the
// sitemap, its canonical the new address
export const MOVED_NEWS_PAGE = { exploradores: 'cabana', caminheiros: 'base' };

// [{ path, canonical, index, noindex? }]: `index` false keeps a page out of the sitemap; `noindex`
// also bakes the robots tag the page sets into its file
export function siteRoutes() {
  const page = (path, extra = {}) => ({ path, canonical: path, index: true, ...extra });
  const routes = [
    page('/'),
    page('/agrupamento/direcao'),
    page('/agrupamento/dirigentes-e-animadores'),
    page('/agrupamento/banco-de-fardas'),
    page('/agrupamento/documentos'),
    page('/agrupamento/klandestino'),
    ...issueSlugs.map((s) => page(`/agrupamento/klandestino/${s}`)),
    page('/agrupamento/noticias'),
    ...noticias.map((n) => page(`/agrupamento/noticias/${n.slug}`)),
    page('/recursos/cancioneiro'),
    ...cancoes.map((c) => page(`/recursos/cancioneiro/${c.slug}`)),
    page('/recursos/reservar-alojamento'),
    page('/contactos'),
    page('/seccao/exploradores/pontuacoes', { index: false, noindex: true }),
  ];
  for (const seccao of Object.keys(seccoes)) {
    routes.push(
      page(`/seccao/${seccao}`),
      page(`/seccao/${seccao}/${NEWS_PAGE[seccao]}`),
      ...(MOVED_NEWS_PAGE[seccao] ? [page(`/seccao/${seccao}/${MOVED_NEWS_PAGE[seccao]}`, { canonical: `/seccao/${seccao}/${NEWS_PAGE[seccao]}`, index: false })] : []),
      page(`/seccao/${seccao}/programa`),
      page(`/seccao/${seccao}/provas`),
    );
    for (const { slug } of provas[seccao].flatMap((g) => g.items)) {
      const path = `/seccao/${seccao}/provas/${slug}`;
      const canonical = provaCanonicalPath(seccao, slug);
      routes.push({ path, canonical, index: canonical === path });
    }
  }
  return routes;
}
