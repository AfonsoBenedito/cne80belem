// ── Conteúdo detalhado de cada prova ──
// Each entry has a title and sections (array of { heading?, text, recite? } or { heading?, media }; `recite`
// sets text that is said aloud from memory (prayers, the Lobito's Leis) in the larger reading style; media
// names pictures the page draws per secção, 'uniformes', 'progresso', 'dirigentes' or a badge grid, from config/provasMedia.js;
// with text, `mediaFirst` puts a picture that shows what the text explains before it, so on phones it
// sits under the heading; `mediaAfter` sets it under the text instead, at its own size (a wide
// diagram: the nós; badges as a grid), and `moreAfterMedia` puts the section's `more` after it;
// `endNote`, a plain closing line of reference, smaller and gray (the Marítimos' and Ar's names);
// `notes`, one per list item, set what each item means under it; `steps`,
// [{ label?, title?, text? }], a vertical line of steps after the text: a date each (`label`, the
// Lobitismo's history) or a name each (`title`, its chain); `swatches`, [{ name, color }], colours
// with their names (the Bandos'); `terms`, [{ term, text }], words and what they mean; `part`, a
// prova told in parts names each one over its first section, and its sections' headings step down).
// Adesão ao Movimento is the same for every secção, so it is keyed by slug alone. Adesão à
// Secção differs per secção (Bando, Patrulha, Equipa, Comunidade), so it is keyed
// "<secção>/<slug>": a bare 'adesao-seccao-1' once sent every secção to the Pioneiros text.
// A prova with no text for its secção shows "está a ser preparado" on its page.
//
// Each text is its own file in ./provas/: a shared one at provas/<slug>.js, a secção's own at
// provas/<secção>/<slug>.js, so its path is its key. Parts several texts share are in
// provasShared.js. A new file is picked up here on its own.

const files = import.meta.glob('./provas/**/*.js', { eager: true, import: 'default' });

export const provasContent = Object.fromEntries(
  Object.entries(files).map(([path, content]) => [path.slice('./provas/'.length, -'.js'.length), content]),
);

export const getProvaContent = (seccao, slug) =>
  provasContent[`${seccao}/${slug}`] ?? provasContent[slug] ?? null;
