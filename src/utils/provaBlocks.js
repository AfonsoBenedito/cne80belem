// The texts come as plain strings: "\n\n" between paragraphs, "\n" between lines. Runs of
// lines starting "• " or "1. " become real lists (they were typed characters in a <p>,
// with no list semantics and no hanging indent); other lines stay a paragraph with <br>s.
// The page and the PDF both read the texts through this.
const BULLET = /^•\s+/;
const NUMBER = /^(\d+)\.\s+/;
export function toBlocks(text) {
  const blocks = [];
  for (const para of text.split('\n\n')) {
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
