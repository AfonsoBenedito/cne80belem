import { describe, it, expect } from 'vitest';
import { provas } from '../provas';
import { provasContent } from '../provasContent';
import { seccoes } from '../seccoes';
import { badges } from '../provasMedia';
import { toBlocks } from '../../utils/provaBlocks';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const slugsOf = (seccao) => provas[seccao].flatMap((g) => g.items.map((p) => p.slug));
const titlesOf = (slug) => new Set(Object.values(provas).flat().flatMap((g) => g.items).filter((p) => p.slug === slug).map((p) => p.title));

// A text keyed by slug alone is shown to every secção that lists that slug, so a bare key is only
// for a prova that is the same wherever it appears (same slug, same title): the shared Adesão ao
// Movimento provas. A bare 'adesao-seccao-*' once gave all four secções the Pioneiros text.
describe('provasContent', () => {
  it.each(Object.keys(provasContent))('%s belongs to a prova that lists it', (key) => {
    const [seccao, slug] = key.includes('/') ? key.split('/') : [null, key];
    if (seccao) {
      expect(seccoes[seccao], `unknown secção "${seccao}"`).toBeDefined();
      expect(slugsOf(seccao)).toContain(slug);
    } else {
      expect(titlesOf(slug).size, `"${slug}" is listed by no secção`).toBeGreaterThan(0);
      expect(titlesOf(slug).size, `"${slug}" means different provas in different secções: key it "<secção>/${slug}"`).toBe(1);
    }
  });

  it('gives a slug the same title in every secção that lists it', () => {
    const slugs = new Set(Object.keys(provas).flatMap(slugsOf));
    for (const slug of slugs) {
      if (slug.startsWith('adesao-movimento-')) expect(titlesOf(slug).size, slug).toBe(1);
    }
  });

  // Text said aloud from memory is set in the larger reading style only when its section says so
  // (`recite: true`); a prayer or a Lobito's law added without it would quietly render as prose
  const RECITED = /^(Oração|Pai Nosso|Avé Maria|As Leis do|As Máximas do|A Promessa)/;
  const sections = Object.entries(provasContent).flatMap(([key, c]) => c.sections.map((s) => [key, s]));

  const recitedHeadings = sections.filter(([, s]) => s.heading && RECITED.test(s.heading)).map(([key, s]) => [key, s.heading, s]);
  it.each(recitedHeadings)('%s: "%s" is marked recite', (key, heading, s) => {
    expect(s.recite, `${key} · ${heading}`).toBe(true);
  });

  // A note sits under its list item by position: one more note than items would never show
  it('gives no section more notes than list items', () => {
    for (const [key, s] of sections) {
      if (!s.notes) continue;
      const items = toBlocks(s.text).filter((b) => b.kind !== 'p').flatMap((b) => b.lines);
      expect(s.notes.length, `${key} · ${s.heading}`).toBeLessThanOrEqual(items.length);
    }
  });

  it('gives recite only to sections of text', () => {
    for (const [key, s] of sections) {
      if (s.recite) expect(typeof s.text, `${key} · ${s.heading}`).toBe('string');
    }
  });

  it('has unique slugs within each secção', () => {
    for (const seccao of Object.keys(provas)) {
      const slugs = slugsOf(seccao);
      expect(new Set(slugs).size, seccao).toBe(slugs.length);
    }
  });
});

// The saudação drawings carry their w × h (so the page reserves their box before they load);
// replacing a drawing without updating its size would stretch it
describe('saudação drawings', () => {
  const dir = 'src/assets/images/provas/saudacao/';
  const pngSize = (path) => {
    const b = readFileSync(path);
    return [b.readUInt32BE(16), b.readUInt32BE(20)];
  };
  const items = ['saudacoes', 'sinal', 'sinalLobito', 'aperto'].flatMap((m) => badges[m]('exploradores'));
  it.each(items.map((f) => [basename(f.src).split('?')[0], f]))('%s has its file\'s size', (name, f) => {
    expect([f.w, f.h]).toEqual(pngSize(dir + name));
  });
});
