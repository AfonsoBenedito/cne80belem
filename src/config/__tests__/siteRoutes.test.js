import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { siteRoutes } from '../siteRoutes';
import { provas } from '../provas';
import { getProvaContent } from '../provasContent';
import { canonicalProvaSeccao } from '../canonical';

const routes = siteRoutes();
const byPath = new Map(routes.map((r) => [r.path, r]));

describe('siteRoutes', () => {
  it('lists each address once', () => {
    expect(byPath.size).toBe(routes.length);
  });

  // Each fixed path in App.jsx gets its own file; a new page left out here would answer 404
  it('covers every fixed route in App.jsx', () => {
    const app = readFileSync(new URL('../../App.jsx', import.meta.url), 'utf8');
    const fixed = [...app.matchAll(/<Route path="([^"]+)"/g)].map((m) => m[1]).filter((p) => !/[:*]/.test(p) && p !== '/links');
    for (const path of fixed) expect(byPath.has(path), path).toBe(true);
  });

  it.each(routes.filter((r) => r.canonical !== r.path).map((r) => [r.path, r]))(
    '%s points at an indexed page with the same text',
    (_, { path, canonical }) => {
      const target = byPath.get(canonical);
      expect(target?.index, `${canonical} is not in the sitemap`).toBe(true);
      const [, , seccao, , slug] = path.split('/');
      const [, , other] = canonical.split('/');
      expect(getProvaContent(other, slug)).toBe(getProvaContent(seccao, slug));
    },
  );

  it('keeps the secção-specific provas on their own page', () => {
    for (const seccao of Object.keys(provas)) {
      expect(canonicalProvaSeccao(seccao, 'adesao-movimento-7')).toBe(seccao);
    }
    expect(canonicalProvaSeccao('lobitos', 'adesao-movimento-nos')).toBe('lobitos');
    expect(canonicalProvaSeccao('pioneiros', 'adesao-movimento-1')).toBe('exploradores');
  });
});
