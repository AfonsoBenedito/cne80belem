import { describe, it, expect } from 'vitest';
import { provas } from '../provas';
import { provasContent } from '../provasContent';
import { seccoes } from '../seccoes';

const slugsOf = (seccao) => provas[seccao].flatMap((g) => g.items.map((p) => p.slug));
const sharedSlugs = Object.keys(provas).map(slugsOf).reduce((a, b) => a.filter((s) => b.includes(s)));

// A text keyed by slug alone is shown to every secção; only provas every secção shares
// may be keyed that way (a bare 'adesao-seccao-*' once gave all four the Pioneiros text).
describe('provasContent', () => {
  it.each(Object.keys(provasContent))('%s belongs to a prova that lists it', (key) => {
    const [seccao, slug] = key.includes('/') ? key.split('/') : [null, key];
    if (seccao) {
      expect(seccoes[seccao], `unknown secção "${seccao}"`).toBeDefined();
      expect(slugsOf(seccao)).toContain(slug);
    } else {
      expect(sharedSlugs, `"${slug}" isn't shared by every secção: key it "<secção>/${slug}"`).toContain(slug);
    }
  });

  it('has unique slugs within each secção', () => {
    for (const seccao of Object.keys(provas)) {
      const slugs = slugsOf(seccao);
      expect(new Set(slugs).size, seccao).toBe(slugs.length);
    }
  });
});
