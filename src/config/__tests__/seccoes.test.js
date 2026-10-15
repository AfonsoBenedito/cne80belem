import { describe, it, expect } from 'vitest';
import { seccoes } from '../seccoes';
import { provasContent } from '../provasContent';

const ORDER = ['lobitos', 'exploradores', 'pioneiros', 'caminheiros'];

// The ages live in three places: each secção's ageMin/ageMax (Home's age ladder, the Banco de
// Fardas), its description, and the Lobitismo prova's list of the secções. They once disagreed
// (Exploradores 10–14 on the site, 10–13 in the prova)
describe('secção ages', () => {
  it.each(ORDER)('%s: the description says ageMin and ageMax', (key) => {
    const { ageMin, ageMax, description } = seccoes[key];
    expect(description).toMatch(new RegExp(`\\b${ageMin}\\b.*\\b${ageMax}\\b`));
  });

  it('match the Lobitismo prova', () => {
    const list = provasContent['lobitos/adesao-seccao-5'].sections.find((s) => s.heading.includes('secções')).text;
    const ages = [...list.matchAll(/dos (\d+) aos (\d+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
    expect(ages).toEqual(ORDER.map((k) => [seccoes[k].ageMin, seccoes[k].ageMax]));
  });
});
