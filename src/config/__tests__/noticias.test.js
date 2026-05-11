import { describe, it, expect } from 'vitest';
import { noticias, sections, authors } from '../noticias';

const KEBAB_CASE_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const VALID_SECTIONS = ['Agrupamento', 'Lobitos', 'Exploradores', 'Pioneiros', 'Caminheiros'];

describe('Noticias dataset', () => {
  it('has at least one article', () => {
    expect(noticias.length).toBeGreaterThan(0);
  });

  it('has no duplicate slugs', () => {
    const slugs = noticias.map(n => n.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has no duplicate titles', () => {
    const titles = noticias.map(n => n.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('exports a non-empty sections list', () => {
    expect(Array.isArray(sections)).toBe(true);
    expect(sections.length).toBeGreaterThan(0);
  });

  it('exports a non-empty authors list', () => {
    expect(Array.isArray(authors)).toBe(true);
    expect(authors.length).toBeGreaterThan(0);
  });

  it('has all article sections present in the sections list', () => {
    for (const noticia of noticias) {
      expect(sections).toContain(noticia.section);
    }
  });
});

describe.each(noticias)('Noticia: $title', (noticia) => {
  // ── Required string fields ──
  it('has a slug', () => {
    expect(typeof noticia.slug).toBe('string');
    expect(noticia.slug.length).toBeGreaterThan(0);
  });

  it('has a kebab-case slug', () => {
    expect(noticia.slug).toMatch(KEBAB_CASE_REGEX);
  });

  it('has a title', () => {
    expect(typeof noticia.title).toBe('string');
    expect(noticia.title.length).toBeGreaterThan(0);
  });

  it('has a valid section', () => {
    expect(VALID_SECTIONS).toContain(noticia.section);
  });

  it('has an author', () => {
    expect(typeof noticia.author).toBe('string');
    expect(noticia.author.length).toBeGreaterThan(0);
  });

  it('has a valid ISO date (YYYY-MM-DD)', () => {
    expect(noticia.date).toMatch(ISO_DATE_REGEX);
    expect(new Date(noticia.date).toString()).not.toBe('Invalid Date');
  });

  it('has a non-empty excerpt', () => {
    expect(typeof noticia.excerpt).toBe('string');
    expect(noticia.excerpt.trim().length).toBeGreaterThan(0);
  });

  it('has a non-empty body', () => {
    expect(typeof noticia.body).toBe('string');
    expect(noticia.body.trim().length).toBeGreaterThan(0);
  });

  it('has a body longer than the excerpt', () => {
    expect(noticia.body.length).toBeGreaterThan(noticia.excerpt.length);
  });

  // ── Images ──
  it('has a cover image', () => {
    expect(noticia.cover).toBeDefined();
    expect(noticia.cover).toBeTruthy();
  });

  it('has a photos array with at least one entry', () => {
    expect(Array.isArray(noticia.photos)).toBe(true);
    expect(noticia.photos.length).toBeGreaterThan(0);
  });

  it('includes the cover in photos', () => {
    expect(noticia.photos).toContain(noticia.cover);
  });

  // ── Optional links ──
  if (noticia.links !== undefined) {
    it('has links as a plain object', () => {
      expect(typeof noticia.links).toBe('object');
      expect(noticia.links).not.toBeNull();
      expect(Array.isArray(noticia.links)).toBe(false);
    });

    if (noticia.links?.facebook) {
      it('has a valid Facebook URL', () => {
        expect(noticia.links.facebook).toMatch(/^https:\/\/(www\.)?facebook\.com\/.+/);
      });
    }

    if (noticia.links?.instagram) {
      it('has instagram as an array of valid URLs', () => {
        expect(Array.isArray(noticia.links.instagram)).toBe(true);
        expect(noticia.links.instagram.length).toBeGreaterThan(0);
        for (const url of noticia.links.instagram) {
          expect(url).toMatch(/^https:\/\/(www\.)?instagram\.com\/.+/);
        }
      });
    }

    if (noticia.links?.url) {
      it('has a valid external URL', () => {
        expect(noticia.links.url).toMatch(/^https?:\/\/.+/);
      });
    }
  }
});
