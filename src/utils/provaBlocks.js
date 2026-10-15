// The texts come as plain strings: "\n\n" between paragraphs, "\n" between lines. Runs of
// lines starting "• " or "1. " become real lists (they were typed characters in a <p>,
// with no list semantics and no hanging indent); a paragraph of one line starting "### " is a
// sub-heading inside its section (an h3); other lines stay a paragraph with <br>s.
// The page and the PDF both read the texts through this.
const BULLET = /^•\s+/;
const NUMBER = /^(\d+)\.\s+/;
const SUBHEADING = /^###\s+/;
export function toBlocks(text) {
  const blocks = [];
  for (const para of text.split('\n\n')) {
    if (SUBHEADING.test(para) && !para.includes('\n')) {
      blocks.push({ kind: 'h', lines: [para.replace(SUBHEADING, '')], closed: true });
      continue;
    }
    for (const line of para.split('\n')) {
      const kind = BULLET.test(line) ? 'ul' : NUMBER.test(line) ? 'ol' : 'p';
      const last = blocks[blocks.length - 1];
      const item = kind === 'ul' ? line.replace(BULLET, '') : kind === 'ol' ? line.replace(NUMBER, '') : line;
      if (last && last.kind === kind && !last.closed) last.lines.push(item);
      else blocks.push({ kind, lines: [item], start: kind === 'ol' ? Number(line.match(NUMBER)[1]) : undefined });
    }
    if (blocks.length) blocks[blocks.length - 1].closed = true;
  }
  return blocks;
}

// A one-line paragraph that ends in ":" and opens the list under it ("Ao Guia compete:"): the
// Cargos prova sets it as the list's label, not as a sentence of its own
export const leadsList = (blocks, i) =>
  blocks[i].kind === 'p' && blocks[i].lines.length === 1 && blocks[i].lines[0].endsWith(':') && blocks[i + 1] && blocks[i + 1].kind !== 'p';

// Inline marks inside a line: *…* is the title of a work, set in italics; *{en}…* the same in
// English, so a screen reader says it in English (Scouting for Boys). The page draws the runs
// as <i>, the PDF in Nunito Italic. Only paragraphs, list items and steps read them (a test
// keeps them out of everything else)
const INLINE = /\*(\{en\})?([^*]+)\*/g;
export function inlineRuns(line) {
  const runs = [];
  let at = 0;
  for (const m of line.matchAll(INLINE)) {
    if (m.index > at) runs.push({ text: line.slice(at, m.index) });
    runs.push({ text: m[2], italic: true, lang: m[1] ? 'en' : undefined });
    at = m.index + m[0].length;
  }
  if (at < line.length) runs.push({ text: line.slice(at) });
  return runs;
}
