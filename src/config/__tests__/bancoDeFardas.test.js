import { describe, it, expect } from 'vitest';
import { categories } from '../bancoDeFardas';

// The stock is edited by hand; these catch the edits that would break the page
// (an unparseable date throws in Intl.DateTimeFormat, a missing qty renders "NaN").
describe('bancoDeFardas', () => {
  it('has unique category keys', () => {
    const keys = categories.map((c) => c.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it.each(categories.map((c) => [c.label, c]))('%s: lastUpdated is a real ISO date', (_, cat) => {
    expect(cat.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(new Date(cat.lastUpdated).getTime())).toBe(false);
  });

  it.each(categories.map((c) => [c.label, c]))('%s: item names are unique', (_, cat) => {
    const names = cat.items.map((i) => i.name);
    expect(new Set(names).size).toBe(names.length);
  });

  const items = categories.flatMap((c) => c.items.map((item) => [`${c.label} / ${item.name}`, item]));

  it.each(items)('%s: stock is a list of unique sizes with whole, non-negative quantities', (_, item) => {
    expect(item.stock.length).toBeGreaterThan(0);
    const sizes = item.stock.map((s) => s.size);
    expect(new Set(sizes).size).toBe(sizes.length);
    for (const { size, qty } of item.stock) {
      expect(typeof size).toBe('string');
      expect(size.trim()).not.toBe('');
      expect(Number.isInteger(qty) && qty >= 0, `${size}: ${qty}`).toBe(true);
    }
  });
});
