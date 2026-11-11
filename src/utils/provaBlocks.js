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

// Inline marks inside a line: **…** is a word set in bold in the secção's ink (the Icthus
// acrostic's initials); *…* is the title of a work, set in italics; *{en}…* the same in
// another language (its code: {en} Scouting for Boys, {la} Campus stellae), so a screen reader
// says it in that language; ~…~ is a passage's own words, the Bible's (~«Tu és Pedro…»~), set in
// italics in the secção's ink; ^…^ is where a passage comes from, a book and its verses (^(São
// Mateus, 16,15-18)^), set smaller and gray so the words it follows stand out. The page draws the runs
// as <i>, the PDF in Nunito Italic. Only paragraphs, list items and steps read them (a test
// keeps them out of everything else)
const INLINE = /\*\*([^*]+)\*\*|\*(?:\{([a-z]{2})\})?([^*]+)\*|\^([^^]+)\^|~([^~]+)~/g;
// A source breaks only after its book's name, never inside it ("(São Mateus," / "16,15-18)"):
// the spaces before the comma are no-break ones, on the page and in the PDF. On the page its
// verses' hyphen is a no-break one too ("5,1-" / "11)" was a break the browser took)
export const keepBook = (cite) => cite.replace(/^[^,]*/, (book) => book.replace(/ /g, '\u00A0'));
// No word alone on a block's last line ("…com uma festa, um jantar ou uma exposição de /
// fotografias."): `text-wrap: pretty` leaves some in Chrome at 320px, so the last two words are
// joined. Only when they're short together (24 characters); a line of one or two words is left as
// it is. The PDF joins them with a no-break space; the page with `PAIR`, a mark it sets as a span
// that keeps the two together only while its column holds them (at 200% text on a 320px phone a
// no-break pair didn't fit, and the browser split "Interne / t." instead)
export const PAIR = '\uE000';
export const keepLastPair = (line, joiner = '\u00A0') => line.replace(/ (\S+ ?)$/, (m, last) => {
  const before = line.slice(0, line.length - m.length);
  const prev = before.slice(before.lastIndexOf(' ') + 1);
  return before.includes(' ') && (prev + last).length <= 24 ? joiner + last : m;
});
export function inlineRuns(line) {
  const runs = [];
  let at = 0;
  for (const m of line.matchAll(INLINE)) {
    if (m.index > at) runs.push({ text: line.slice(at, m.index) });
    runs.push(m[1] ? { text: m[1], bold: true } : m[4] ? { text: keepBook(m[4]).replace(/-/g, '\u2011'), cite: true } : m[5] ? { text: m[5], quote: true } : { text: m[3], italic: true, lang: m[2] });
    at = m.index + m[0].length;
  }
  if (at < line.length) runs.push({ text: line.slice(at) });
  return runs;
}
