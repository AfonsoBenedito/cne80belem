import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Agrupamento 80 - Santa Maria de Belém';
const BASE_URL = 'https://afonsobenedito.github.io/cne80belem';
const DEFAULT_IMG = `${BASE_URL}/favicon.png`;

function setMeta(attr, name, content) {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
}

/**
 * Dynamically updates <title>, meta description, Open Graph, Twitter Card,
 * canonical <link>, and optionally meta keywords for the current page.
 *
 * @param {object} opts
 * @param {string} [opts.title]       Page-specific title (appended with SITE_NAME)
 * @param {string} [opts.rawTitle]    Verbatim title - skips SITE_NAME suffix
 * @param {string} [opts.description] Meta description
 * @param {string} [opts.image]       Absolute or root-relative OG image URL
 * @param {string} [opts.keywords]    Comma-separated keywords (used by Bing etc.)
 * @param {boolean} [opts.noindex]    Ask search engines not to index this address (not-found pages)
 * @param {string} [opts.canonicalPath] The page's canonical address when another page has the same
 *                                      content (a shared prova); the build bakes the same one into its file
 */
export function useSEO({ title, rawTitle, description, image, keywords, noindex = false, canonicalPath } = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = rawTitle || (title ? `${title} | ${SITE_NAME}` : SITE_NAME);
    const path = canonicalPath || (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname);
    const fullUrl = `${BASE_URL}${path}`;
    const fullImg = image
      ? image.startsWith('http')
        ? image
        : `${window.location.origin}${image}`
      : DEFAULT_IMG;

    document.title = fullTitle;

    setMeta('name', 'description', description || '');
    if (keywords) setMeta('name', 'keywords', keywords);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description || '');
    setMeta('property', 'og:url', fullUrl);
    setMeta('property', 'og:image', fullImg);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description || '');
    setMeta('name', 'twitter:image', fullImg);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // One SPA document serves every page, so the tag is added only while a not-found page shows
    if (noindex) setMeta('name', 'robots', 'noindex');

    return () => {
      document.title = SITE_NAME;
      if (noindex) document.querySelector('meta[name="robots"]')?.remove();
    };
  }, [title, rawTitle, description, image, keywords, noindex, canonicalPath, pathname]);
}
