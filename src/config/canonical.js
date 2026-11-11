import { provas } from './provas';
import { getProvaContent } from './provasContent';

// A shared Adesão ao Movimento prova has one page per secção with the same text, so search
// engines are pointed at one of them: the first secção here that gives it with the same text.
const CANONICAL_ORDER = ['exploradores', 'pioneiros', 'caminheiros', 'lobitos'];
// Shared text, but its pictures are the secção's own (uniformes, badges): each page is its own
const PER_SECCAO = new Set(['adesao-movimento-7']);

const offers = (seccao, slug) =>
  provas[seccao]?.some((g) => g.items.some((p) => p.slug === slug));

export function canonicalProvaSeccao(seccao, slug) {
  if (PER_SECCAO.has(slug)) return seccao;
  const content = getProvaContent(seccao, slug);
  if (!content) return seccao;
  return CANONICAL_ORDER.find((s) => offers(s, slug) && getProvaContent(s, slug) === content) ?? seccao;
}

export const provaCanonicalPath = (seccao, slug) =>
  `/seccao/${canonicalProvaSeccao(seccao, slug)}/provas/${slug}`;
