import { jsPDF } from 'jspdf';
import faviconUrl from '/favicon.png';
import { registerNunito } from './pdfFonts';
import { normalize } from './normalize';
import { toBlocks } from './provaBlocks';
import { seccoes } from '../config/seccoes';
import { provas } from '../config/provas';
import { getProvaContent } from '../config/provasContent';
import { uniformes, uniformeDirigentesImg, dirigentesImg, badges, progresso } from '../config/distintivos';

// One column, Nunito. The secção's colour is a thin band at the top and the headings' ink; the
// rest is black and gray on white, so a printed prova reads like the page it came from.
// A prova on its own is an A4 portrait page. All of a secção's come as A4 portrait, A4
// landscape (the text in two columns: one column that wide is too long a line to read) or a
// booklet of A5 pages, two to an A4 landscape sheet in folding order. One layout serves them
// all, scaled by `s`.
const A4 = { w: 210, h: 297, margin: 22, s: 1, cols: 1 };
const A4_LANDSCAPE = { w: 297, h: 210, margin: 20, s: 1, cols: 2 };
const A5 = { w: 148.5, h: 210, margin: 15, s: 0.82, cols: 1 };
const COL_GAP = 12;

const BLACK = [26, 26, 26];
const GRAY = [115, 115, 115];
const GRAY_LIGHT = [220, 220, 220];

// Font sizes are in pt; jsPDF measures in mm, so a line of N pt is N × this tall at leading 1
const PT = 0.3528;
const BODY = 10.5;

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const fileSlug = (text) => normalize(text).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const shortNameOf = (section) => section.label.split(' - ').pop();

// PNG for the logo; the pictures go in as JPEG on white (their WebP isn't a format jsPDF
// reads, and PNG would make a poster several megabytes)
function loadImage(url, type = 'image/png') {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (type === 'image/jpeg') {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      resolve(type === 'image/jpeg'
        ? { data: canvas.toDataURL(type, 0.9), w: img.naturalWidth, h: img.naturalHeight }
        : canvas.toDataURL(type));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

// The pictures the given provas draw, loaded once, by URL
async function loadMedia(seccao, list) {
  const urls = new Set();
  for (const prova of list) {
    for (const sec of getProvaContent(seccao, prova.slug)?.sections ?? []) {
      if (sec.media === 'uniformes') [uniformes[seccao], uniformeDirigentesImg].forEach((u) => urls.add(u.src));
      if (sec.media === 'dirigentes') urls.add(dirigentesImg.src);
      if (badges[sec.media]) badges[sec.media](seccao).forEach((f) => urls.add(f.src));
      if (sec.media === 'progresso') {
        const { etapas, completa } = progresso(seccao);
        etapas.forEach((e) => urls.add(e.src));
        urls.add(completa);
      }
    }
  }
  const loaded = await Promise.all([...urls].map((u) => loadImage(u, 'image/jpeg')));
  return new Map([...urls].map((u, i) => [u, loaded[i]]));
}

// Every prova of a secção with its number (straight through both groups, as on the site)
function numbered(seccao) {
  let n = 0;
  return provas[seccao].flatMap((group) =>
    group.items.map((item) => ({ ...item, group: group.group, n: ++n }))
  );
}

function setText(doc, size, style = 'normal', color = BLACK) {
  doc.setFont('Nunito', style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
}

// Pages are recorded as lists of drawing steps and drawn afterwards at an x offset: the
// booklet only knows where a page sits on its sheet once every page exists. Sizes given to it
// are A4's; `g.s` scales the fonts to the page.
function recorder(doc, g) {
  const pages = [[]];
  let ops = pages[0];
  const push = (op) => ops.push(op);
  return {
    pages,
    newPage() {
      ops = [];
      pages.push(ops);
    },
    // Draws onto an earlier page (the cover, the footers), then carries on where it was
    onto(page, fn) {
      const was = ops;
      ops = page;
      fn();
      ops = was;
    },
    text(str, x, y, size, style, color, opts) {
      push((ox) => {
        setText(doc, size * g.s, style, color);
        doc.text(str, ox + x, y, opts);
      });
    },
    rect(x, y, w, h, color) {
      push((ox) => {
        doc.setFillColor(...color);
        doc.rect(ox + x, y, w, h, 'F');
      });
    },
    line(x1, y1, x2, y2, color, width) {
      push((ox) => {
        doc.setDrawColor(...color);
        doc.setLineWidth(width);
        doc.line(ox + x1, y1, ox + x2, y2);
      });
    },
    box(x, y, size) {
      push((ox) => {
        doc.setDrawColor(...GRAY);
        doc.setLineWidth(0.3);
        doc.roundedRect(ox + x, y, size, size, 0.6, 0.6, 'S');
      });
    },
    link(x, y, w, h, pageNumber) {
      push((ox) => doc.link(ox + x, y, w, h, { pageNumber }));
    },
    image(data, x, y, w, h = w, format = 'PNG') {
      if (data) push((ox) => doc.addImage(data, format, ox + x, y, w, h));
    },
    // Wraps at the size the text will be drawn at
    split(str, width, size, style = 'normal') {
      setText(doc, size * g.s, style);
      return doc.splitTextToSize(str, width);
    },
  };
}

function band(draw, g, section) {
  draw.rect(0, 0, g.w, 5 * g.s, hexToRgb(section.color));
}

// Lays one prova out on the current (empty) page and the ones it needs after it; returns the
// index of its first page. `header` adds the secção, the group and "Prova N de total": the
// booklet has them, a prova on its own is just its title
function layoutProva(draw, g, { seccao, prova, section, total, header, media }) {
  const { s, margin: M } = g;
  const textW = g.w - M * 2;
  const bottom = g.h - 24 * s;
  const ink = hexToRgb(section.ink);
  const lh = BODY * s * PT * 1.55;
  const asc = (size) => size * s * PT * 0.8;
  const first = draw.pages.length - 1;
  // The text flows down each column, then onto the next page; the title spans them all
  const colW = (textW - COL_GAP * (g.cols - 1)) / g.cols;
  let col = 0;
  let colTop;
  const left = () => M + col * (colW + COL_GAP);
  let y = M + 4 * s;

  band(draw, g, section);

  if (header) {
    draw.text(`PROVAS DOS ${shortNameOf(section).toUpperCase()}  ·  ${prova.group.toUpperCase()}`, M, y, 8, 'bold', GRAY, { charSpace: 0.4 * s });
    y += 6 * s + asc(24);
  } else {
    y += 4 * s;
  }
  const titleLines = draw.split(prova.title, textW, 24, 'bold');
  draw.text(titleLines, M, y, 24, 'bold', BLACK, { lineHeightFactor: 1.15 });
  y += (titleLines.length - 1) * 24 * s * PT * 1.15;
  if (header) {
    y += 8 * s;
    draw.text(`Prova ${prova.n} de ${total}`, M, y, 9.5, 'normal', GRAY);
    y += 6 * s;
  } else {
    y += 7 * s;
  }
  draw.line(M, y, M + 18 * s, y, hexToRgb(section.color), 0.8 * s);
  y += 12 * s;
  colTop = y;

  // Continuation pages carry the title small, so a loose sheet still says what it is
  const room = (h) => {
    if (y + h <= bottom) return;
    if (col < g.cols - 1) {
      col += 1;
      y = colTop;
      return;
    }
    col = 0;
    draw.newPage();
    band(draw, g, section);
    draw.text(`${prova.title.toUpperCase()}  (CONT.)`, M, M - 2 * s, 8, 'bold', GRAY, { charSpace: 0.4 * s, maxWidth: textW });
    y = M + 10 * s;
    colTop = y;
  };

  // Heights of the picture blocks, for keeping a heading with them
  const NAME_LINE = 8.5 * s * PT * 1.25;
  const FUNCAO_ROW = 13 * s + 4 * s + NAME_LINE * 2;
  const PROGRESSO_H = 16 * s + 4 * s + NAME_LINE * 2 + 6 * s + 32 * s + 10 * s;

  const content = getProvaContent(seccao, prova.slug);
  if (!content) {
    // Same wording as the page
    const note = draw.split('Ainda estamos a escrever o texto desta prova. Até lá, fala com o teu Chefe.', textW - 6 * s, BODY);
    draw.rect(M, y - 4 * s, 1.2 * s, 12 * s + note.length * lh, hexToRgb(section.color));
    draw.text('Texto em preparação', M + 6 * s, y + 1 * s, 12, 'bold', BLACK);
    draw.text(note, M + 6 * s, y + 8 * s, BODY, 'normal', GRAY, { lineHeightFactor: 1.55 });
    return first;
  }

  for (const sec of content.sections) {
    if (sec.heading) {
      const lines = draw.split(sec.heading, colW, 12.5, 'bold');
      const h = lines.length * 12.5 * s * PT * 1.25;
      // Keep a heading with at least two lines of its text, or with its pictures
      const keep = sec.media === 'dirigentes' ? (colW * dirigentesImg.h) / dirigentesImg.w : sec.media === 'progresso' ? PROGRESSO_H : badges[sec.media] ? FUNCAO_ROW : lh * 2;
      room(h + 3 * s + keep);
      draw.text(lines, left(), y + asc(12.5), 12.5, 'bold', ink, { lineHeightFactor: 1.25 });
      y += h + 3 * s;
    }
    if (sec.media === 'uniformes') {
      // Side by side at one height, as on the page; lower than the page is tall if need be
      const pair = [
        { ...uniformes[seccao], caption: `Uniforme dos ${shortNameOf(section)}` },
        { ...uniformeDirigentesImg, caption: 'Uniforme dos dirigentes' },
      ];
      const gap = 6 * s;
      const capH = 8 * s;
      const h = Math.min((colW - gap) / pair.reduce((t, u) => t + u.w / u.h, 0), bottom - M - 10 * s - capH);
      room(h + capH);
      let x = left();
      for (const u of pair) {
        const w = (h * u.w) / u.h;
        draw.image(media.get(u.src)?.data, x, y, w, h, 'JPEG');
        draw.text(u.caption, x + w / 2, y + h + 5 * s, 8.5, 'bold', GRAY, { align: 'center' });
        x += w + gap;
      }
      y += h + capH + 6 * s;
    }
    if (badges[sec.media]) {
      // A grid of badges, each over its name, all at one height
      const imgH = 13 * s;
      const perRow = Math.max(1, Math.floor(colW / (26 * s)));
      const cellW = colW / perRow;
      const items = badges[sec.media](seccao);
      for (let r = 0; r < items.length; r += perRow) {
        const row = items.slice(r, r + perRow);
        const names = row.map((f) => (f.name ? draw.split(f.name, cellW - 3 * s, 8.5, 'bold') : []));
        const rowH = imgH + 4 * s + Math.max(...names.map((n) => n.length)) * 8.5 * s * PT * 1.25;
        room(rowH);
        row.forEach((f, i) => {
          const img = media.get(f.src);
          const cx = left() + cellW * (i + 0.5);
          if (img) {
            const w = (imgH * img.w) / img.h;
            draw.image(img.data, cx - w / 2, y, w, imgH, 'JPEG');
          }
          if (names[i].length) draw.text(names[i], cx, y + imgH + 4 * s, 8.5, 'bold', BLACK, { align: 'center', lineHeightFactor: 1.25 });
        });
        y += rowH + 5 * s;
      }
    }
    if (sec.media === 'progresso') {
      // The four etapas in a row, each piece at one height, then the whole insígnia under them
      const { etapas, completa } = progresso(seccao);
      const imgH = 16 * s;
      const bigH = 32 * s;
      const cellW = colW / etapas.length;
      const nameH = NAME_LINE * 2;
      room(PROGRESSO_H);
      etapas.forEach((e, i) => {
        const img = media.get(e.src);
        const cx = left() + cellW * (i + 0.5);
        if (img) {
          const w = Math.min((imgH * img.w) / img.h, cellW - 3 * s);
          const h = (w * img.h) / img.w;
          draw.image(img.data, cx - w / 2, y + (imgH - h) / 2, w, h, 'JPEG');
        }
        const name = draw.split(`${i + 1}. ${e.name}`, cellW - 3 * s, 8.5, 'bold');
        draw.text(name, cx, y + imgH + 4 * s, 8.5, 'bold', BLACK, { align: 'center', lineHeightFactor: 1.25 });
      });
      y += imgH + 4 * s + nameH + 6 * s;
      const img = media.get(completa);
      if (img) {
        const w = (bigH * img.w) / img.h;
        draw.image(img.data, left() + colW / 2 - w / 2, y, w, bigH, 'JPEG');
      }
      draw.text('A insígnia completa', left() + colW / 2, y + bigH + 5 * s, 8.5, 'bold', BLACK, { align: 'center' });
      y += bigH + 10 * s;
    }
    if (sec.media === 'dirigentes') {
      // The table across the column
      const h = (colW * dirigentesImg.h) / dirigentesImg.w;
      room(h);
      draw.image(media.get(dirigentesImg.src)?.data, left(), y, colW, h, 'JPEG');
      y += h + 6 * s;
    }
    for (const block of sec.text ? toBlocks(sec.text) : []) {
      if (block.kind === 'p') {
        for (const line of block.lines) {
          const lines = draw.split(line, colW, BODY);
          lines.forEach((wrapped, i) => {
            // No paragraph starts or ends a page with a single line of it
            const last = lines.length - i;
            room(lh * (lines.length > 1 && (i === 0 || last === 2) ? 2 : 1));
            draw.text(wrapped, left(), y + asc(BODY), BODY, 'normal', BLACK);
            y += lh;
          });
        }
      } else {
        // Hanging indent: the marker in the secção's ink, the text aligned after it
        const indent = (block.kind === 'ol' ? 7 : 5) * s;
        block.lines.forEach((item, i) => {
          const wrapped = draw.split(item, colW - indent, BODY);
          room(lh * Math.min(wrapped.length, 2));
          draw.text(block.kind === 'ol' ? `${block.start + i}.` : '•', left(), y + asc(BODY), BODY, 'bold', ink);
          wrapped.forEach((w, k) => {
            if (k) room(lh);
            draw.text(w, left() + indent, y + asc(BODY), BODY, 'normal', BLACK);
            y += lh;
          });
          y += 1.2 * s;
        });
      }
      y += 3.5 * s;
    }
    y += 4 * s;
  }
  return first;
}

function footer(draw, g, page, { logo, label }) {
  const { s, margin: M } = g;
  const y = g.h - 14 * s;
  draw.onto(page, () => {
    draw.line(M, y - 5 * s, g.w - M, y - 5 * s, GRAY_LIGHT, 0.25);
    draw.image(logo, M, y - 3.4 * s, 5 * s);
    draw.text('Agrupamento 80 — Santa Maria de Belém', M + (logo ? 7 * s : 0), y, 7.5, 'bold', GRAY);
    if (label) draw.text(label, g.w - M, y, 7.5, 'normal', GRAY, { align: 'right' });
  });
}

async function newDoc(title, orientation) {
  const doc = new jsPDF({ orientation, unit: 'mm', format: 'a4' });
  await registerNunito(doc);
  doc.setProperties({ title, author: 'Agrupamento 80 — Santa Maria de Belém' });
  return doc;
}

export async function generateProvaPdf(seccao, slug) {
  const section = seccoes[seccao];
  const prova = numbered(seccao).find((p) => p.slug === slug);
  const [doc, logo, media] = await Promise.all([newDoc(prova.title, 'portrait'), loadImage(faviconUrl), loadMedia(seccao, [prova])]);

  const draw = recorder(doc, A4);
  layoutProva(draw, A4, { seccao, prova, section, media });
  const n = draw.pages.length;
  draw.pages.forEach((page, i) => footer(draw, A4, page, { logo, label: n > 1 ? `${i + 1} / ${n}` : '' }));
  draw.pages.forEach((page, i) => {
    if (i) doc.addPage();
    page.forEach((op) => op(0));
  });
  doc.save(`${fileSlug(shortNameOf(section))}-${fileSlug(prova.title)}.pdf`);
}

// The cover lists every prova with a box to tick and the page it starts on. On a landscape
// page the title sits on the left half and the list on the right
function layoutCover(draw, g, { section, all, starts, logo, links }) {
  const { s, margin: M } = g;
  const wide = g.w > g.h;
  const headW = wide ? g.w / 2 - M - COL_GAP : g.w - M * 2;
  const ink = hexToRgb(section.ink);
  band(draw, g, section);

  let y = M + 2 * s;
  draw.image(logo, M, y, 14 * s);
  y += 26 * s;
  draw.text(section.label.split(' - ')[0].toUpperCase(), M, y, 8, 'bold', GRAY, { charSpace: 0.4 * s });
  const title = draw.split(`Provas dos ${shortNameOf(section)}`, headW, 32, 'bold');
  y += 14 * s;
  draw.text(title, M, y, 32, 'bold', BLACK, { lineHeightFactor: 1.1 });
  y += (title.length - 1) * 32 * s * PT * 1.1 + 9 * s;
  draw.text('Os passos até à tua Promessa', M, y, 11, 'normal', GRAY);
  y += 8 * s;
  draw.line(M, y, M + 18 * s, y, hexToRgb(section.color), 0.8 * s);
  y += 15 * s;

  const x = wide ? g.w / 2 : M;
  const listW = g.w - M - x;
  if (wide) y = M + 8 * s;
  // Rows share what's left above the footer, so the longest list still fits on the cover
  const groups = new Set(all.map((p) => p.group)).size;
  const avail = g.h - 24 * s - y - groups * 7 * s - (groups - 1) * 5 * s;
  const rowH = Math.min(10 * s, avail / all.length);
  const box = 4.2 * s;
  let group = null;
  for (const p of all) {
    if (p.group !== group) {
      if (group) y += 5 * s;
      group = p.group;
      draw.text(group.toUpperCase(), x, y, 8, 'bold', ink, { charSpace: 0.4 * s });
      y += 7 * s;
    }
    draw.box(x, y - box * 0.86, box);
    draw.text(String(p.n), x + 11 * s, y, 10.5, 'bold', ink, { align: 'right' });
    draw.text(draw.split(p.title, listW - 30 * s, 10.5)[0], x + 14 * s, y, 10.5, 'normal', BLACK);
    draw.text(String(starts[p.slug]), g.w - M, y, 9.5, 'normal', GRAY, { align: 'right' });
    if (links) draw.link(x, y - rowH * 0.7, listW, rowH, starts[p.slug]);
    y += rowH;
  }
}

// Sheet order for a folded booklet: each A4 side holds two A5 pages, the outer sheet first
function bookletPairs(total) {
  const pairs = [];
  for (let i = 0; i < total / 4; i++) {
    pairs.push([total - 2 * i, 2 * i + 1]);
    pairs.push([2 * i + 2, total - 2 * i - 1]);
  }
  return pairs;
}

const FORMATS = {
  vertical: { g: A4, orientation: 'portrait', suffix: '' },
  horizontal: { g: A4_LANDSCAPE, orientation: 'landscape', suffix: '-horizontal' },
  booklet: { g: A5, orientation: 'landscape', suffix: '-livro' },
};

// All of a secção's provas, after a cover: 'vertical', 'horizontal' or 'booklet'
export async function generateAllProvasPdf(seccao, format = 'booklet') {
  const { g, orientation, suffix } = FORMATS[format];
  const booklet = format === 'booklet';
  const section = seccoes[seccao];
  const shortName = shortNameOf(section);
  const all = numbered(seccao);
  const [doc, logo, media] = await Promise.all([newDoc(`Provas dos ${shortName}`, orientation), loadImage(faviconUrl), loadMedia(seccao, all)]);

  // Page 1 is the cover, filled in once the provas' page numbers are known
  const draw = recorder(doc, g);
  const starts = {};
  for (const prova of all) {
    draw.newPage();
    starts[prova.slug] = layoutProva(draw, g, { seccao, prova, section, total: all.length, header: true, media }) + 1;
  }
  // Folded, the pages aren't in the file's order, so links and bookmarks would land wrong
  draw.onto(draw.pages[0], () => layoutCover(draw, g, { section, all, starts, logo, links: !booklet }));
  draw.pages.forEach((page, i) => footer(draw, g, page, { logo, label: i ? String(i + 1) : '' }));

  if (!booklet) {
    draw.pages.forEach((page, i) => {
      if (i) doc.addPage();
      page.forEach((op) => op(0));
    });
    for (const p of all) doc.outline.add(null, `${p.n}. ${p.title}`, { pageNumber: starts[p.slug] });
  } else {
    // Blank pages fill the last sheet, the back of the booklet among them
    while (draw.pages.length % 4) draw.pages.push([]);
    bookletPairs(draw.pages.length).forEach(([l, r], i) => {
      if (i) doc.addPage();
      // Where to fold
      doc.setDrawColor(...GRAY_LIGHT);
      doc.setLineWidth(0.2);
      doc.line(A5.w, 0, A5.w, A5.h);
      draw.pages[l - 1].forEach((op) => op(0));
      draw.pages[r - 1].forEach((op) => op(A5.w));
    });
  }
  doc.save(`provas-${fileSlug(shortName)}${suffix}.pdf`);
}
