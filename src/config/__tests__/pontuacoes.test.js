import { describe, it, expect } from 'vitest';
import { patrulhas, categorias, pontuacoes } from '../pontuacoes';

const KEYS = patrulhas.map((p) => p.key);
const CATS = categorias.map((c) => c.key);
const FALTAS = ['presencas', 'farda'];
const all = pontuacoes.trimesters.flatMap((t) => t.activities);
const scored = all.filter((d) => d.points);
const today = new Date().toISOString().slice(0, 10);

// The scores are typed in by hand (the add-pontuacao skill), so a typo must fail here rather
// than on the live page
describe('pontuações', () => {
  it('activities have a real ISO date and a name, in date order', () => {
    all.forEach((d) => {
      expect(d.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(d.date).toISOString().slice(0, 10)).toBe(d.date);
      expect(d.name).toBeTruthy();
    });
    const dates = all.map((d) => d.date);
    expect(dates).toEqual([...dates].sort());
  });

  it.each(scored.map((d) => [d.date, d.name, d]))('%s %s: points are valid', (_, __, d) => {
    if (!pontuacoes.mock) expect(d.date <= today).toBe(true);
    expect(Object.keys(d.points).sort()).toEqual([...KEYS].sort());
    KEYS.forEach((k) => {
      Object.entries(d.points[k]).forEach(([cat, n]) => {
        expect(CATS).toContain(cat);
        expect(Number.isInteger(n)).toBe(true);
        if (FALTAS.includes(cat)) expect(n).toBeLessThanOrEqual(0);
        if (cat === 'atividade') expect(n >= 0 && n <= 50).toBe(true);
      });
    });
  });

  it.each(all.filter((d) => d.details).map((d) => [d.name, d]))('%s: every details row has both patrulhas', (_, d) => {
    expect(d.points).toBeTruthy();
    d.details.groups.flatMap((g) => g.rows).forEach((row) => {
      expect(row.label).toBeTruthy();
      KEYS.forEach((k) => {
        expect(typeof row[k].result).toBe('string');
        expect(Number.isInteger(row[k].points)).toBe(true);
      });
    });
  });
});
