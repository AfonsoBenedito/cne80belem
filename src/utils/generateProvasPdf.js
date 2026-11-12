import { jsPDF } from 'jspdf';
import faviconUrl from '/favicon.png';
import { registerNunito, registerNunitoItalic } from './pdfFonts';
import { normalize } from './normalize';
import { toBlocks, leadsList, keepBook, keepLastPair } from './provaBlocks';
import { seccoes } from '../config/seccoes';
import { provas } from '../config/provas';
import { getProvaContent } from '../config/provasContent';
import { uniformes, uniformeDirigentesImg, dirigentes, badges, progresso } from '../config/provasMedia';

// One column, Nunito. The secção's colour is a thin band at the top and the headings' ink; the
// rest is black and gray on white, so a printed prova reads like the page it came from.
// A prova on its own is an A4 portrait page. All of a secção's come as A4 portrait, A4
// landscape (the text in two columns: one column that wide is too long a line to read) or a
// booklet of A5 pages, two to an A4 landscape sheet in folding order. One layout serves them
// all, scaled by `s`; the type by `t` where it differs: the booklet's pages are 0.82 of A4's,
// but its text only 0.96 (10pt body), as a Lobito holds it in their hands (at 0.82 the body
// was 8.6pt and the smallest labels 6.2pt); it runs to a few more pages instead
const A4 = { w: 210, h: 297, margin: 22, s: 1, cols: 1 };
const A4_LANDSCAPE = { w: 297, h: 210, margin: 20, s: 1, cols: 2 };
const A5 = { w: 148.5, h: 210, margin: 15, s: 0.82, t: 0.96, cols: 1 };
const COL_GAP = 12;
// The logo's longest side: it's drawn at most 5mm (the footer) to 14mm (the cover) wide
const LOGO_PX = 240;

const BLACK = [26, 26, 26];
const GRAY = [115, 115, 115];
// The page's --color-gray-700, for text that reads under a larger line (the Leis' notes)
const NOTE_GRAY = [64, 64, 64];
const GRAY_LIGHT = [220, 220, 220];

// Font sizes are in pt; jsPDF measures in mm, so a line of N pt is N × this tall at leading 1
const PT = 0.3528;
const BODY = 10.5;

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const fileSlug = (text) => normalize(text).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const shortNameOf = (section) => section.label.split(' - ').pop();

// PNG for the logo; the pictures go in as JPEG on white (their WebP isn't a format jsPDF
// reads, and PNG would make a poster several megabytes). `max` caps the longer side: the logo
// is drawn 5mm wide, and its 691px file went in as 1.3MB of raw pixels, half the PDF
function loadImage(url, type = 'image/png', max = Infinity) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.naturalWidth * k);
      canvas.height = Math.round(img.naturalHeight * k);
      const ctx = canvas.getContext('2d');
      if (type === 'image/jpeg') {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
      if (sec.media === 'dirigentes') dirigentes.cruzes.forEach((c) => urls.add(c.src));
      if (badges[sec.media]) badges[sec.media](seccao).forEach((f) => urls.add(f.src));
      sec.cast?.forEach((c) => badges[c.media]?.(seccao).forEach((f) => urls.add(f.src)));
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

// A wrapped line of a text with titles of works marked (`*…*`; `{en}` only matters on the page,
// and is taken out before the text is wrapped): drawn run by run, in Nunito Italic between the
// marks. `state` carries an open mark on to the next line
const MARKS = /(\*\*|\*|\^|~)/;
const MARK_KEY = { '**': 'bold', '*': 'italic', '^': 'cite', '~': 'quote' };
const toggle = (state, part) => {
  const key = MARK_KEY[part];
  if (key) state[key] = !state[key];
  return Boolean(key);
};
const runLook = (state, size, base = 'normal') => ({
  style: state.bold ? 'bold' : state.italic || state.quote ? 'italic' : base,
  at: state.cite ? size - 1 : size,
});
function drawRuns(draw, line, x, y, size, color, state) {
  let cx = x;
  // `**` toggles bold in the secção's ink (state.ink), `*` italics, `~` a passage's words
  // (italics in the ink), `^` its source (a step smaller, gray), as on the page; a run over a
  // wrap carries on
  for (let part of line.split(MARKS)) {
    if (toggle(state, part)) continue;
    if (!part) continue;
    part = part.replace(/\u00A0/g, ' ');
    const { style, at } = runLook(state, size);
    draw.text(part, cx, y, at, style, state.cite ? GRAY : (state.bold || state.quote) && state.ink ? state.ink : color);
    cx += draw.width(part, at, style);
  }
}

// The language marks are the page's only; a non-breaking hyphen (the page's "saber‑ser", kept
// whole) is a plain one on paper: jsPDF draws nothing for it, and its lines break at spaces only.
// A passage's source (`^…^`) breaks only after its book's name, as on the page: the book's
// spaces are no-break ones for the wrapping, and drawRuns draws them as plain ones
// …and its last two words joined by a no-break space, as the page joins them, so none prints alone
// on a last line ("fotografias." under the Avaliação)
// jsPDF draws nothing for a non-breaking hyphen: every line drawn or measured prints it plain, the
// headings', quotes' and sources' too ("B.‑P." had printed "B.P.")
const plainHyphens = (str) => (typeof str === 'string' ? str.replace(/\u2011/g, '-') : Array.isArray(str) ? str.map(plainHyphens) : str);
const unmarkLang = (text) => keepLastPair(text.replace(/\{[a-z]{2}\}/g, '').replace(/\u2011/g, '-').replace(/\^[^^]+\^/g, keepBook));

function setText(doc, size, style = 'normal', color = BLACK) {
  doc.setFont('Nunito', style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
}

// Pages are recorded as lists of drawing steps and drawn afterwards at an x offset: the
// booklet only knows where a page sits on its sheet once every page exists. Sizes given to it
// are A4's; `g.t` (or `g.s`) scales the fonts to the page.
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
    // Where the drawing has got to, and back to there (a prova tried in a column, and undone)
    mark() {
      return { pages: pages.length, ops: ops.length };
    },
    rollback(m) {
      pages.length = m.pages;
      ops = pages[m.pages - 1];
      ops.length = m.ops;
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
        setText(doc, size * (g.t ?? g.s), style, color);
        doc.text(plainHyphens(str), ox + x, y, opts);
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
    // A dot (a step of the Lobitismo's chain), or a swatch with an edge (a Bando's colour)
    circle(cx, cy, r, color, edge) {
      push((ox) => {
        doc.setFillColor(...color);
        if (edge) {
          doc.setDrawColor(...edge);
          doc.setLineWidth(0.3);
        }
        doc.circle(ox + cx, cy, r, edge ? 'FD' : 'F');
      });
    },
    // A losango (the dirigentes' level), outlined so the white one shows
    diamond(cx, cy, w, h, fill) {
      push((ox) => {
        doc.setFillColor(...hexToRgb(fill));
        doc.setDrawColor(...BLACK);
        doc.setLineWidth(0.2);
        doc.lines([[w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2], [w / 2, -h / 2]], ox + cx, cy - h / 2, [1, 1], 'FD', true);
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
    // Wraps at the size the text will be drawn at. A line with marks in it is wrapped by its
    // words as drawRuns draws them (the marks take no room, a source is a step smaller, bold and
    // italics their own widths): measured whole, the marks wrapped it early
    split(str, width, size, style = 'normal') {
      str = plainHyphens(str);
      if (!/[*^~]/.test(str)) {
        setText(doc, size * (g.t ?? g.s), style);
        return doc.splitTextToSize(str, width);
      }
      const measure = (text, at, st) => {
        setText(doc, at * (g.t ?? g.s), st);
        return doc.getTextWidth(text.replace(/\u00A0/g, ' '));
      };
      const state = {};
      const space = measure(' ', size, style);
      const lines = [];
      let line = null;
      let lineW = 0;
      for (const word of str.split(' ')) {
        let w = 0;
        for (const part of word.split(MARKS)) {
          if (toggle(state, part) || !part) continue;
          const look = runLook(state, size, style);
          w += measure(part, look.at, look.style);
        }
        if (line !== null && lineW + space + w > width) {
          lines.push(line);
          line = null;
        }
        lineW = line === null ? w : lineW + space + w;
        line = line === null ? word : `${line} ${word}`;
      }
      if (line !== null) lines.push(line);
      return lines;
    },
    // How wide a line is at the size it will be drawn at
    width(str, size, style = 'normal') {
      setText(doc, size * (g.t ?? g.s), style);
      return doc.getTextWidth(plainHyphens(str));
    },
  };
}

function band(draw, g, section) {
  draw.rect(0, 0, g.w, 5 * g.s, hexToRgb(section.color));
}

// Lays one prova out on the current (empty) page and the ones it needs after it; returns the
// index of its first page and where it ended (`col`, and that page's `colTop`). `header` adds the
// secção, the group and "Prova N de total": the booklet has them, a prova on its own is just its
// title. `at` starts it in a later column of the current page instead (the landscape layout's
// right column, left empty by the prova before), its title at the column's width
function layoutProva(draw, g, { seccao, prova, section, total, header, media, at }) {
  const { s, margin: M } = g;
  // Text sizes in mm (a line's height, its ascent) follow the type's scale, not the page's
  const ts = g.t ?? s;
  const textW = g.w - M * 2;
  const bottom = g.h - 24 * s;
  const ink = hexToRgb(section.ink);
  const lh = BODY * ts * PT * 1.55;
  const asc = (size) => size * ts * PT * 0.8;
  const first = draw.pages.length - 1;
  // The text flows down each column, then onto the next page; the title spans them all
  const colW = (textW - COL_GAP * (g.cols - 1)) / g.cols;
  // A sheet's measures (the PPV's open part), shared by its heading's keep and its drawing: a step
  // smaller than the body (9.5pt), an empty field one ruled line, so the whole sheet fits under the
  // page's text instead of leaving half a page above it
  const SHEET = { size: 9.5, label: 8.5, source: 8 };
  const sheetLh = SHEET.size * ts * PT * 1.5;
  const measureSheet = (sheet) => {
    const pad = 3.5 * s;
    const innerW = Math.min(colW, 150 * s) - 2 * pad;
    const labelLh = SHEET.label * ts * PT * 1.4;
    const fields = sheet.fields.map((f) => {
      const label = draw.split(unmarkLang(f.label), innerW, SHEET.label, 'bold');
      const value = f.text
        ? draw.split(unmarkLang(f.text), innerW, SHEET.size).map((line) => ({ line, x: 0 }))
        : f.list
          ? f.list.flatMap((item) => draw.split(unmarkLang(item), innerW - 4 * s, SHEET.size).map((line, i) => ({ line, x: 4 * s, bullet: i === 0 })))
          : null;
      return { label, value, h: 1 * s + label.length * labelLh + 0.6 * s + (value ? value.length : 1) * sheetLh + 1.2 * s };
    });
    const titleH = 12 * ts * PT * 1.4 + 1 * s;
    const source = sheet.source ? draw.split(unmarkLang(sheet.source), innerW, SHEET.source) : [];
    const sourceLh = SHEET.source * ts * PT * 1.4;
    const h = pad + titleH + fields.reduce((t, f) => t + f.h, 0) + (source.length ? 1 * s + source.length * sourceLh : 0) + pad;
    return { pad, innerW, labelLh, fields, titleH, source, sourceLh, h };
  };
  let col = at?.col ?? 0;
  let colTop;
  const left = () => M + col * (colW + COL_GAP);
  let y = at?.y ?? M + 4 * s;
  // Started in a later column, the title is that column's; on its own page it spans them all
  const titleX = left();
  const titleW = at ? colW : textW;

  if (!at) band(draw, g, section);

  if (header) {
    draw.text(`PROVAS DOS ${shortNameOf(section).toUpperCase()}  ·  ${prova.group.toUpperCase()}`, titleX, y, 8, 'bold', GRAY, { charSpace: 0.4 * s, maxWidth: titleW });
    y += 6 * s + asc(24);
  } else {
    y += 4 * s;
  }
  const titleLines = draw.split(prova.title, titleW, 24, 'bold');
  draw.text(titleLines, titleX, y, 24, 'bold', BLACK, { lineHeightFactor: 1.15 });
  y += (titleLines.length - 1) * 24 * ts * PT * 1.15;
  if (header) {
    y += 8 * s;
    draw.text(`Prova ${prova.n} de ${total}`, titleX, y, 9.5, 'normal', GRAY);
    y += 6 * s;
  } else {
    y += 7 * s;
  }
  draw.line(titleX, y, titleX + 18 * s, y, hexToRgb(section.color), 0.8 * s);
  y += 12 * s;
  colTop = y;

  // Continuation pages carry the title small, so a loose sheet still says what it is.
  // `alone`: a prova started in a column (`at`) had nothing but its title fit there
  let alone = false;
  const room = (h) => {
    if (y + h <= bottom) return;
    if (at && y === colTop && draw.pages.length - 1 === first) alone = true;
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
  const NAME_LINE = 8.5 * ts * PT * 1.25;
  const FUNCAO_ROW = 13 * s + 4 * s + NAME_LINE * 2;
  const PROGRESSO_H = 16 * s + 4 * s + NAME_LINE * 2 + 6 * s + 32 * s + 10 * s;
  const LABEL_H = 7 * s;
  const NIVEIS_H = LABEL_H + 12 * s + 4 * s + NAME_LINE + 6 * s;

  const content = getProvaContent(seccao, prova.slug);
  if (!content) {
    // Same wording as the page; in its column, so the next prova can take the one beside it
    const note = draw.split('Ainda estamos a escrever o texto desta prova. Até lá, fala com o teu Chefe.', colW - 6 * s, BODY);
    draw.rect(left(), y - 4 * s, 1.2 * s, 12 * s + note.length * lh, hexToRgb(section.color));
    draw.text('Texto em preparação', left() + 6 * s, y + 1 * s, 12, 'bold', BLACK);
    draw.text(note, left() + 6 * s, y + 8 * s, BODY, 'normal', GRAY, { lineHeightFactor: 1.55 });
    return { first, col, colTop, alone };
  }

  // A picture that the following text runs on beside (`wrap`, S. Tiago's), as on the page:
  // where it ends, on which page, and how wide the text beside it is
  let float = null;
  // A section's picture beside its text, and the room it takes: measured here once, for its
  // heading (kept with it) and for drawing it
  const asideOf = (sec) => {
    // Text with its picture beside it (the Promessa and its insígnia), as on the page: the
    // picture on the right of the text's first line, the text narrower to make room
    const asideItem = sec.text && !sec.mediaAfter && badges[sec.media] ? badges[sec.media](seccao)[0] : null;
    const aside = asideItem ? media.get(asideItem.src) : null;
    // 26mm tall (40mm for the hand sign, `large`; 14mm for a cargo's badge, `small`, as on the
    // page), or narrower for a wide picture (the handshake), so the text keeps two thirds
    const asideTall = (asideItem?.hero ? 58 : asideItem?.large ? 40 : asideItem?.small ? 14 : 26) * s;
    const imgW = aside ? Math.min((asideTall * aside.w) / aside.h, colW * 0.33) : 0;
    const imgH = aside ? (imgW * aside.h) / aside.w : 0;
    // Numbers on the drawing (the pilgrim's signs), as on the page, and what each is under it:
    // the block is as wide as the longest name, the drawing centred over it
    const marks = aside && asideItem.marks ? asideItem.marks : [];
    const MARK_R = 2.2 * s;
    const MARK_LINE = 5.5 * s;
    const asideW = marks.length ? Math.max(imgW, ...marks.map((m) => 2 * MARK_R + 2 * s + draw.width(m.label, 8.5, 'bold'))) : asideItem?.caption ? Math.max(imgW, 30 * s) : imgW;
    // Its caption (Vida de Baden-Powell's photographs), as on the page: small and gray, under it
    const capLines = aside && asideItem.caption && !marks.length ? draw.split(asideItem.caption, Math.max(imgW, 30 * s), 8) : [];
    const CAP_LINE = 8 * ts * PT * 1.35;
    const asideH = imgH + (marks.length ? 3 * s + marks.length * MARK_LINE : 0) + (capLines.length ? 2 * s + capLines.length * CAP_LINE : 0);
    return { asideItem, aside, imgW, imgH, marks, MARK_R, MARK_LINE, asideW, capLines, CAP_LINE, asideH };
  };

  // A badge grid's layout and measures (its rows, their heights, the whole grid's), shared by
  // the grid and by its heading, which asks for the whole grid when the grid moves whole
  const measureGrid = (items, { wide = false } = {}) => {
    // A grid of badges, each over its name, all at one height; drawings of a whole scout
    // (`large`, the saudações) taller, fewer to a row, each fitted to its cell. A scan set large
    // only on screen (`badge`, the Guia's fitas) prints at a badge's size: on paper 13mm shows
    // it whole, and the extra 21mm sent it to a page of its own
    const large = items[0].large && !items[0].badge;
    const imgH = (large ? 34 : 13) * s;
    const perRow = Math.max(1, Math.floor(colW / ((large ? 38 : 26) * s)));
    // `wide`: a short row whose names are long ("Sub-Guia de Tribo"), each cell wide enough to
    // hold its name on one line
    const cellW = Math.max(colW / perRow, wide ? 34 * s : 0);
    // A `group` (the fitas, then the cargos) starts its own row, as on the page, and its rows
    // are as even as they split, so none is left with one (7 cargos are 4 + 3, not 6 + 1)
    const rows = [];
    const groups = [];
    items.forEach((f, k) => (f.group === items[k - 1]?.group && k ? groups[groups.length - 1].push(f) : groups.push([f])));
    for (const g of groups) {
      const n = Math.ceil(g.length / Math.ceil(g.length / perRow));
      for (let i = 0; i < g.length; i += n) rows.push(g.slice(i, i + n));
    }
    // A name wider than its cell breaks after its hyphen ("Guarda- / Material"), not inside a
    // word ("Guarda-Materi / al"): the lines only break at spaces
    const nameW = cellW - 3 * s;
    const fit = (name) => name.split(' ').map((w) => (draw.width(w, 8.5, 'bold') > nameW ? w.replace(/-(?=\S)/g, '- ') : w)).join(' ');
    const measured = rows.map((row, r) => {
      const names = row.map((f) => (f.name ? draw.split(fit(f.name), nameW, 8.5, 'bold') : []));
      // A group's own heading (the Posições), as on the page, kept with its first row
      const heading = row[0].groupHeading && rows[r - 1]?.[0].group !== row[0].group ? row[0].groupHeading : null;
      return { names, heading, rowH: imgH + 4 * s + Math.max(...names.map((n) => n.length)) * 8.5 * ts * PT * 1.25 };
    });
    // A grid that fits a column moves whole (the four saudações had split two and two across a
    // page, the Noites de campo three and two); a taller one flows row by row, its last row never
    // starting a column alone
    const tall = (m) => m.rowH + (m.heading ? LABEL_H : 0);
    const whole = measured.reduce((t, m) => t + tall(m) + 5 * s, 0) - 5 * s;
    return { large, imgH, cellW, rows, measured, tall, whole };
  };

  for (const sec of content.sections) {
    // The page's overview (the Exploradores' five symbols, links to their parts) is a way around
    // the page: on paper the parts follow one another, so it isn't printed
    if (sec.overview) continue;
    // A part may head a section of its own with no heading (the História's word list)
    if (sec.heading || sec.part) {
      // A prova that is one recited text (the Oração do Caminheiro, the Promessa) is named by its
      // title, as on the page: its heading ("Oração") isn't printed under it
      const solo = content.sections.length === 1 && sec.recite;
      const lines = sec.heading && !solo ? draw.split(sec.heading, colW, 12.5, 'bold') : [];
      const h = lines.length * 12.5 * ts * PT * 1.25;
      // Keep a heading with at least two lines of its text, or with its pictures
      let keep = sec.media === 'dirigentes' ? NIVEIS_H : sec.media === 'progresso' ? PROGRESSO_H : badges[sec.media] && !sec.mediaAfter ? (badges[sec.media](seccao)[0].large ? 38 * s + NAME_LINE * 2 : FUNCAO_ROW) : lh * 2;
      // A section that is only a grid (the Guias e cargos) moves whole when it fits a column, so
      // its heading asks for the whole of it: for its first row only, the heading was left at a
      // column's foot with the grid in the next
      if (badges[sec.media] && !sec.text && !sec.mediaAfter && sec.media !== 'dirigentes' && sec.media !== 'progresso') {
        const { whole } = measureGrid(badges[sec.media](seccao));
        if (h + 3 * s + whole <= bottom - colTop) keep = Math.max(keep, whole);
      }
      // A picture beside the text (B.P. em rapaz's drawing and its caption) is drawn first, whole:
      // the heading asks for all of its room, or it was left alone at a page's foot
      if (sec.text && !sec.mediaAfter && badges[sec.media]) keep = Math.max(keep, asideOf(sec).asideH);
      // A heading keeps its first paragraph's opening: two lines, or all three of a paragraph of
      // three (which moves whole, below), so the two never part
      if (keep === lh * 2 && sec.text) {
        const firstBlock = toBlocks(sec.text)[0];
        if (firstBlock?.kind === 'p' && firstBlock.lines.length === 1 && draw.split(firstBlock.lines[0], colW, BODY).length === 3) keep = lh * 3;
      }
      // A quotation (the Última Mensagem): the heading takes its introduction and the passage's
      // first lines with it
      if (sec.quote) keep = (sec.intro ? draw.split(sec.intro, colW, BODY).length * lh + 3.5 * s : 0) + lh * 3 + 3.5 * s;
      // A sheet (the PPV's open part) is kept whole: its heading and lead go with it, never alone
      // at a page's foot above it (measureSheet, the drawing's own measures)
      if (sec.sheet) {
        const lead = sec.text ? toBlocks(sec.text).reduce((t, b) => t + b.lines.reduce((u, l) => u + draw.split(l, colW, BODY).length, 0) * lh + 3.5 * s, 0) : 0;
        keep = lead + measureSheet(sec.sheet).h + 2 * s;
      }
      // A short list of words (Caçadas e Covil: up to four) reads only whole: its heading asks for
      // room for the lead and every word, so it never splits across a page or a column; a longer
      // one (the Palavras dos nós) for its lead and first two words, so they're never apart
      if (sec.terms) {
        const lead = sec.text ? toBlocks(sec.text).reduce((t, b) => t + b.lines.reduce((u, l) => u + draw.split(l, colW, BODY).length, 0) * lh + 3.5 * s, 0) : 0;
        // Kept whole only when it's short (four words, eight lines at most) and fits where it is:
        // otherwise the lead and the first two go together and the rest follow (the conselhos'
        // three long rows, moved whole, left a third of a page blank above them)
        const termLines = (w) => draw.split(w.text, colW - draw.width(unmarkLang(w.term), BODY, 'bold') - 1.5 * s, BODY).length;
        const height = (list) => list.reduce((t, w) => t + termLines(w) * lh, 0);
        const short = sec.terms.length <= 4 && sec.terms.reduce((t, w) => t + termLines(w), 0) <= 8;
        const whole = h + 3 * s + lead + height(sec.terms);
        const terms = short && (y + whole <= bottom || whole > bottom - colTop) ? height(sec.terms) : height(sec.terms.slice(0, 2));
        if (h + 3 * s + lead + terms <= bottom - colTop) keep = lead + terms + 2 * s;
      }
      // The profiles (the units) keep their heading with the lead and their first row
      if (sec.profiles) {
        const lead = sec.text ? toBlocks(sec.text).reduce((t, b) => t + b.lines.reduce((u, l) => u + draw.split(l, colW, BODY).length, 0) * lh + 3.5 * s, 0) : 0;
        keep = lead + lh * 7 + 4 * s;
      }
      // A cast (the symbols, the characters) keeps its heading with its intro and its first row, so
      // "Os símbolos dos Exploradores" and its sentence never end a page alone
      if (sec.cast) {
        const lead = sec.text ? toBlocks(sec.text).reduce((t, b) => t + b.lines.reduce((u, l) => u + draw.split(l, colW, BODY).length, 0) * lh + 3.5 * s, 0) : 0;
        keep = lead + Math.max(18 * s, lh * 6);
      }
      // A chain of steps (the Lobitismo's Alcateia → CNE) reads best whole: its heading asks for
      // room for the lead and every step when they fit where it is; when not, for the lead and the
      // first step, and the rest follow, a step at a time (the CNE's four levels, moved whole, left
      // a third of a page blank)
      if (sec.steps && !sec.steps[0].label) {
        const tw = colW - 8 * s;
        const lead = sec.text ? toBlocks(sec.text).reduce((t, b) => t + b.lines.reduce((u, l) => u + draw.split(l, colW, BODY).length, 0) * lh + 3.5 * s, 0) : 0;
        const stepsH = (list) => list.reduce((t, st) => t + ((st.title ? draw.split(st.title, tw, BODY, 'bold').length : 0) + (st.text ? draw.split(st.text, tw, BODY).length : 0)) * lh + 3 * s, 0);
        const whole = h + 3 * s + lead + stepsH(sec.steps);
        const steps = y + whole <= bottom ? stepsH(sec.steps) : stepsH(sec.steps.slice(0, 1));
        if (h + 3 * s + lead + steps <= bottom - colTop) keep = lead + steps + 1 * s;
      }
      // A dated line of steps with no text of its own (the História's 1974–1983): its heading
      // asks for room for the first step, which is never split, so the two never part
      if (sec.steps && sec.steps[0].label && !sec.text) {
        const tw = colW - (sec.date ? 12 : 16) * s - 3 * s;
        const st = sec.steps[0];
        const lines = (st.title ? draw.split(st.title, tw, BODY, 'bold').length : 0) + (st.text ? draw.split(unmarkLang(st.text), tw, BODY).length : 0);
        keep = lines * lh + (sec.steps.length === 2 ? lh * 2 : 0);
      }
      // A recited prayer is kept whole (below), so its heading asks for room for all of it: on a
      // one-column page, and in a page's last column, where running on would mean the next page
      const first = (g.cols === 1 || col === g.cols - 1) && sec.recite && sec.text ? toBlocks(sec.text)[0] : null;
      if (first && first.kind === 'p' && first.lines.length > 1) {
        // Measured as it's drawn (below): alone on its page, 13.5pt, rows at 1.3 and a gap between
        // lines; with others, 11.5pt at an even 1.4
        const one = content.sections.length === 1;
        const rs = one ? 13.5 : 11.5;
        const rh = rs * ts * PT * (one ? 1.3 : 1.4);
        const whole = first.lines.reduce((t, line) => t + draw.split(line, colW - 1.25 * rs * ts * PT, rs).length * rh, 0) + (one ? (first.lines.length - 1) * 1.8 * s : 0);
        if (h + 3 * s + whole <= bottom - colTop) keep = whole;
      }
      // The years it covers (Vida de Baden-Powell's parts), as on the page: small, over it
      const dateH = sec.date ? 8.5 * ts * PT * 1.3 : 0;
      // A part of a prova told in parts (the História's "O Escutismo", "O CNE"), as on the page: a
      // step over the section headings, black, with the title's short rule in the secção's colour
      // under it; it asks for its first section's room too, so the two never part
      const partLines = sec.part ? draw.split(sec.part, colW, 15, 'bold') : null;
      const partH = partLines ? (y > colTop ? 6 * s : 0) + partLines.length * 15 * ts * PT * 1.2 + 9 * s : 0;
      room(partH + dateH + h + 3 * s + keep);
      if (partLines) {
        if (y > colTop) y += 6 * s;
        draw.text(partLines, left(), y + asc(15), 15, 'bold', BLACK, { lineHeightFactor: 1.2 });
        y += partLines.length * 15 * ts * PT * 1.2 + 3 * s;
        draw.line(left(), y, left() + 12 * s, y, hexToRgb(section.color), 0.8 * s);
        y += 6 * s;
      }
      if (sec.date) {
        draw.text(sec.date, left(), y + asc(8.5), 8.5, 'bold', ink);
        y += dateH;
      }
      if (lines.length) {
        draw.text(lines, left(), y + asc(12.5), 12.5, 'bold', ink, { lineHeightFactor: 1.25 });
        y += h + 3 * s;
      }
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
    // A grid of badges, each over its name (drawn alone, or under its text: the Guia's fitas)
    const badgeGrid = (items, opts = {}) => {
      const { imgH, cellW, rows, measured, tall, whole } = measureGrid(items, opts);
      if (rows.length > 1 && whole <= bottom - colTop) room(whole);
      rows.forEach((row, r) => {
        const { names, heading, rowH } = measured[r];
        const pairLast = rows.length > 2 && r === rows.length - 2 ? 5 * s + tall(measured[r + 1]) : 0;
        room(tall(measured[r]) + (pairLast && tall(measured[r]) + pairLast <= bottom - colTop ? pairLast : 0));
        if (heading) {
          draw.text(heading.toUpperCase(), left(), y + asc(7.5), 7.5, 'bold', GRAY, { charSpace: 0.4 * s });
          y += LABEL_H;
        }
        row.forEach((f, i) => {
          const img = media.get(f.src);
          const cx = left() + cellW * (i + 0.5);
          if (img) {
            const w = Math.min((imgH * img.w) / img.h, cellW - 4 * s);
            const h = (w * img.h) / img.w;
            draw.image(img.data, cx - w / 2, y + imgH - h, w, h, 'JPEG');
          }
          if (names[i].length) draw.text(names[i], cx, y + imgH + 4 * s, 8.5, 'bold', BLACK, { align: 'center', lineHeightFactor: 1.25 });
        });
        y += rowH + 5 * s;
      });
    };
    if (badges[sec.media] && !sec.text) badgeGrid(badges[sec.media](seccao));
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
      // The CNE's table drawn as the page draws it: a losango per level, then a cross per função
      const label = (text) => {
        draw.text(text.toUpperCase(), left(), y + asc(7.5), 7.5, 'bold', GRAY, { charSpace: 0.4 * s });
        y += LABEL_H;
      };
      room(NIVEIS_H);
      label('Pelo nível');
      const cellW = colW / dirigentes.niveis.length;
      dirigentes.niveis.forEach((n, i) => {
        const cx = left() + cellW * (i + 0.5);
        draw.diamond(cx, y + 6 * s, 8 * s, 12 * s, n.color);
        draw.text(n.name, cx, y + 12 * s + 4 * s + asc(8.5), 8.5, 'bold', BLACK, { align: 'center' });
      });
      y += NIVEIS_H - LABEL_H;
      const crossH = 11 * s;
      const crossRows = dirigentes.cruzes.map((c) => {
        const who = draw.split(c.who, colW - crossH - 6 * s, 8.5);
        return { c, who, rowH: Math.max(crossH, 10.5 * ts * PT * 1.3 + who.length * 8.5 * ts * PT * 1.35) };
      });
      // The three crosses are one small table: kept together with their label, so the last one
      // is never left alone on a page
      room(LABEL_H + crossRows.reduce((h, r) => h + r.rowH + 4 * s, 0));
      label('Pela função');
      for (const { c, who, rowH } of crossRows) {
        room(rowH + 4 * s);
        const img = media.get(c.src);
        if (img) draw.image(img.data, left(), y, crossH, crossH, 'JPEG');
        const tx = left() + crossH + 6 * s;
        draw.text(c.name, tx, y + asc(10.5) + 1 * s, 10.5, 'bold', BLACK);
        draw.text(who, tx, y + 10.5 * ts * PT * 1.3 + asc(8.5) + 1 * s, 8.5, 'normal', GRAY, { lineHeightFactor: 1.35 });
        y += rowH + 4 * s;
      }
      y += 2 * s;
    }
    // A recited section (the content's `recite`) is set larger, as on the page. 11.5pt: a step up
    // from the prose, and the Lobitos' three prayers still fit one A4 page. A prova that is one
    // prayer and nothing else (the Oração do Caminheiro, do Escuta) prints at 13.5pt on a page of
    // its own, filling it as a text to hold and say, not its top half
    const alone = g.cols === 1 && content.sections.length === 1;
    const size = sec.recite ? (alone ? 13.5 : 11.5) : BODY;
    const lineH = sec.recite ? size * ts * PT * 1.4 : lh;
    // A prayer alone on its page, as on the page: a wrapped row closer to its line, each new line a
    // small gap after the last. Prayers that share a page (the Lobitos' three) keep the even
    // rhythm: at 11.5pt their lines hardly wrap, and the gaps sent the Avé Maria to a second page
    const rowH = sec.recite && alone ? size * ts * PT * 1.3 : lineH;
    const verseGap = sec.recite && alone ? 1.8 * s : 0;
    const blocks = sec.text ? toBlocks(sec.text) : [];
    // A section with no heading whose picture follows its text (`mediaAfter`, the line that
    // introduces B.P.'s frontispiece): the text and the picture move together, never the line
    // alone at a page's foot with its picture on the next
    if (sec.mediaAfter && !sec.heading && !sec.part && sec.text && badges[sec.media] && !badges[sec.media](seccao)[0].badge) {
      const item = badges[sec.media](seccao)[0];
      const img = media.get(item.src);
      if (img) {
        const w = Math.min((item.natural ?? img.w) * 0.2646 * 1.4 * s, colW);
        const textH = blocks.reduce((t, b) => t + b.lines.reduce((u, l) => u + draw.split(unmarkLang(l), colW, BODY).length, 0) * lh + 3.5 * s, 0);
        const capH = item.caption ? draw.split(item.caption, w, 8.5).length * 8.5 * ts * PT * 1.4 : 0;
        const need = textH + 1 * s + (w * img.h) / img.w + 2 * s + capH;
        if (need <= bottom - colTop) room(need);
      }
    }
    // The prova's question to the scout (the Livro da Selva's), as on the page: bold, a step larger
    if (sec.lead) {
      const lines = draw.split(sec.lead, colW, 12, 'bold');
      room(lines.length * 12 * ts * PT * 1.35 + lh * 2);
      draw.text(lines, left(), y + asc(12), 12, 'bold', BLACK, { lineHeightFactor: 1.35 });
      y += lines.length * 12 * ts * PT * 1.35 + 2 * s;
    }
    const { aside, imgW, imgH, marks, MARK_R, MARK_LINE, asideW, capLines, CAP_LINE, asideH } = asideOf(sec);
    // A block that starts beside it is narrower; one that starts under it (or on a later page)
    // takes the full width
    const besideW = aside ? colW - asideW - 8 * s : colW;
    let asideTop = y;
    let asidePage = -1;
    if (aside) {
      room(asideH);
      asideTop = y;
      asidePage = draw.pages.length;
      const ax = left() + colW - asideW;
      const ix = ax + (asideW - imgW) / 2;
      draw.image(aside.data, ix, y, imgW, imgH, 'JPEG');
      const disc = (cx, cy, n) => {
        draw.circle(cx, cy, MARK_R + 0.5 * s, [255, 255, 255]);
        draw.circle(cx, cy, MARK_R, hexToRgb(section.surface));
        draw.text(String(n), cx, cy + asc(7) / 2, 7, 'bold', hexToRgb(section.onSurface), { align: 'center' });
      };
      marks.forEach((m, k) => disc(ix + m.x * imgW, y + m.y * imgH, k + 1));
      capLines.forEach((line, k) => draw.text(line, ax + asideW / 2, y + imgH + 2 * s + asc(8) + k * CAP_LINE, 8, 'normal', GRAY, { align: 'center' }));
      marks.forEach((m, k) => {
        const ly = y + imgH + 3 * s + k * MARK_LINE + MARK_R;
        disc(ax + MARK_R, ly, k + 1);
        draw.text(m.label, ax + 2 * MARK_R + 2 * s, ly + asc(8.5) / 2, 8.5, 'bold', BLACK);
      });
    }
    // A recited line wraps without leaving one word alone on its last row ("…possível / por:"):
    // narrower measures are tried until the last row holds two words
    const splitRecited = (text, width) => {
      let lines = draw.split(text, width, size);
      for (let w = width * 0.95; sec.recite && lines.length > 1 && !lines[lines.length - 1].includes(' ') && w > width * 0.7; w -= width * 0.05) {
        lines = draw.split(text, w, size);
      }
      return lines;
    };
    // Another prova that tells this part in full, as on the page, if this secção has it (in a
    // booklet of all the provas it's a few pages on; on its own, its name says where to look)
    const more = sec.more && numbered(seccao).find((p) => p.title === sec.more);
    // The pointer names the prova only: one still to be written says so in its own place (the
    // page's sidebar), not in the text that points to it
    const moreText = more && `Podes saber mais na prova ${more.n}, «${more.title}».`;
    // After the section's colours, words or steps when it has them (the História's 1908–1920),
    // as on the page: it points past the whole part, so it ends it
    const moreLast = Boolean(sec.swatches || sec.terms || sec.steps || sec.profiles || sec.moreAfterMedia);
    if (moreText && !moreLast) blocks.push({ kind: 'p', lines: [moreText] });
    // Someone else's words (the Manual do Dirigente), as on the page: our line saying whose, the
    // passage in from the text beside a rule in the secção's colour, its source under it, gray
    if (sec.quote) {
      // The rule is drawn whole, one piece per page the passage runs over (one per line showed
      // seams between them)
      let rule = null;
      const closeRule = () => {
        if (rule && y > rule.y) draw.onto(draw.pages[rule.page], () => draw.rect(rule.x, rule.y, 0.8 * s, y - rule.y, hexToRgb(section.color)));
        rule = null;
      };
      // `keep`: lines of the next paragraph to keep with this one (a one-line opening, «Caros
      // escuteiros:», never alone at a page's foot)
      // `dx`: in from the column's left edge, which room() may move to the next column or page
      const para = (text, dx, w, withRule, keep = 0) => {
        const lines = draw.split(text, w, BODY);
        lines.forEach((line, i) => {
          const last = lines.length - i;
          const page = draw.pages.length - 1;
          const wasCol = col;
          room(lh * ((lines.length > 1 && (i === 0 || last === 2) ? 2 : 1) + (last === 1 ? keep : 0)) + (last === 1 && keep ? 3.5 * s : 0));
          if (withRule && rule && (draw.pages.length - 1 !== page || col !== wasCol)) {
            // the passage went on to a new column or page: its rule there starts again at the top
            const was = y;
            y = rule.end;
            closeRule();
            y = was;
          }
          if (withRule && !rule) rule = { page: draw.pages.length - 1, x: left(), y };
          draw.text(line, left() + dx, y + asc(BODY), BODY, 'normal', BLACK);
          y += lh;
          if (rule) rule.end = y;
        });
      };
      if (sec.intro) {
        // kept with the passage's first lines: an introduction never ends a page
        para(sec.intro, 0, colW, false, 3);
        y += 3.5 * s;
      }
      const indent = 5 * s;
      toBlocks(sec.quote).forEach((block, i, all) => {
        const keep = all[i + 1] && draw.split(block.lines.join(' '), colW - indent, BODY).length === 1 ? Math.min(2, draw.split(all[i + 1].lines.join(' '), colW - indent, BODY).length) : 0;
        // A letter (B.P.'s last message), as on the page: its salutation bold, its sign-off on
        // the right, its two lines kept
        if (sec.letter && i === all.length - 1) {
          y += 2 * s;
          room(lh * block.lines.length);
          for (const line of block.lines) {
            draw.text(line, left() + colW, y + asc(BODY), BODY, 'bold', BLACK, { align: 'right' });
            y += lh;
          }
          if (rule) rule.end = y;
          return;
        }
        if (sec.letter && i === 0 && block.lines.length === 1) {
          room(lh * (1 + keep));
          if (!rule) rule = { page: draw.pages.length - 1, x: left(), y };
          draw.text(block.lines[0], left() + indent, y + asc(BODY), BODY, 'bold', BLACK);
          y += lh;
          rule.end = y;
          y += 3.5 * s;
          rule.end = y;
          return;
        }
        para(block.lines.join(' '), indent, colW - indent, true, keep);
        // the rule runs on between the passage's paragraphs
        if (i < all.length - 1) {
          y += 3.5 * s;
          if (rule) rule.end = y;
        }
      });
      closeRule();
      if (sec.source) {
        y += 2 * s;
        room(lh);
        draw.text(`- ${sec.source}`, left() + indent, y + asc(8.5), 8.5, 'bold', GRAY);
        y += lh;
      }
      y += 3.5 * s;
    }
    blocks.forEach((block, bi) => {
      const beside = (draw.pages.length === asidePage && y < asideTop + asideH) || (float && draw.pages.length === float.page && y < float.bottom);
      const textW = beside ? (float && !aside ? float.besideW : besideW) : colW;
      if (block.kind === 'h') {
        // A sub-heading inside the text ("### "), as on the page: bold, a step above its
        // paragraph, kept with its first lines
        y += bi ? 1.5 * s : 0;
        // as many as its paragraph will ask to start with (two, or three when it moves whole),
        // plus the gap under the heading: lh × 3 fell short of that, so "Construtor da Igreja"
        // ended page 1 of S. Pedro's prova alone
        const nextP = blocks[bi + 1]?.kind === 'p' ? splitRecited(unmarkLang(blocks[bi + 1].lines[0]), textW).length : 2;
        room(lh + 0.5 * s + lineH * (nextP === 3 ? 3 : Math.min(nextP, 2)));
        draw.text(block.lines[0], left(), y + asc(BODY), BODY, 'bold', BLACK);
        y += lh;
      } else if (sec.headingMedia && leadsList(blocks, bi)) {
        // A cargo's list label ("Ao Guia compete:"), as on the page: bold, in the secção's ink,
        // smaller, kept with the list's start: the room its first item will ask for (its lines and
        // the second's, two each at most, below) and the gap between; three lines fell short of
        // that, so "Ao Guia compete:" ended booklet pages with its list overleaf
        const items = blocks[bi + 1].lines;
        const itemLines = (k) => (items[k] ? Math.min(splitRecited(unmarkLang(items[k]), textW - (blocks[bi + 1].kind === 'ol' ? 7 : 5) * s).length, 2) : 0);
        room(lineH + 1.5 * s + lineH * (itemLines(0) + itemLines(1)));
        draw.text(block.lines[0], left(), y + asc(size - 1), size - 1, 'bold', ink);
        y += lineH;
      } else if (block.kind === 'p') {
        // Several lines (a prayer): a wrapped part sits indented under its line
        const verse = block.lines.length > 1;
        const hang = verse ? 1.25 * size * ts * PT : 0;
        // On a one-column page, a recited prayer that fits a page is never split: it moves whole to
        // the next page rather than leaving its last lines ("…da nossa morte. / Ámen.") on one of
        // their own. Two columns (the landscape layout) let it run on into the next, on the same
        // page; from the last column it would run onto the next page (the Lobitos' Pai Nosso, three
        // lines at page 14's foot), so there it moves whole too
        if (verse && sec.recite && (g.cols === 1 || col === g.cols - 1)) {
          const h = block.lines.reduce((t, line) => t + splitRecited(line, textW - hang).length * rowH, 0) + (block.lines.length - 1) * verseGap;
          if (h <= bottom - colTop) room(h);
        }
        const marks = { italic: false, bold: false, ink };
        // A section's last paragraph moves with the badges drawn under it and the pointer after
        // them (the Guia's fitas under "No bolso esquerdo…", then «Cargos da Tribo»): the sentence
        // that says what they show ended page 1 with them on page 2
        const grid = !verse && bi === blocks.length - 1 && sec.mediaAfter && badges[sec.media]?.(seccao)[0].badge;
        if (grid) {
          const h = splitRecited(unmarkLang(block.lines[0]), textW).length * lineH + 4.5 * s + FUNCAO_ROW + (moreText && sec.moreAfterMedia ? 2 * s + lh : 0);
          if (h <= bottom - colTop) room(h);
        }
        // A sentence that opens a list ("…pela Direção de Agrupamento:") keeps the list's first two
        // items with it: it ended page 1 with only "o Chefe de Agrupamento" under it
        const next = blocks[bi + 1];
        const intoList = !verse && block.lines[0].endsWith(':') && next && (next.kind === 'ul' || next.kind === 'ol');
        const listStart = intoList ? next.lines.slice(0, 2).reduce((t, item) => t + Math.min(splitRecited(unmarkLang(item), textW - 5 * s).length, 2), 0) : 0;
        block.lines.forEach((line, n) => {
          const lines = splitRecited(unmarkLang(line), textW - hang);
          // A prayer's last line ("Ámen.") never starts a page alone: its second-to-last line
          // asks for room for both
          const keepNext = verse && n === block.lines.length - 2 ? draw.split(block.lines[n + 1], textW - hang, size).length : listStart;
          // The pointer to another prova after this paragraph ("Podes saber mais na prova…") goes
          // with its last two lines: alone, it opened a page of its own (the PPV's, in the booklet)
          const pointer = !verse && n === block.lines.length - 1 && next?.kind === 'p' && next.lines[0] === moreText ? splitRecited(unmarkLang(moreText), textW).length : 0;
          lines.forEach((wrapped, i) => {
            // No paragraph starts or ends a page with a single line of it: two together at its
            // start and at its end, so a paragraph of three moves whole (two at the start, then two
            // at the end, left its first line alone at the foot of a page)
            const last = lines.length - i;
            const step = verse ? rowH : lineH;
            const need = lines.length === 3 && i === 0 ? 3 : lines.length > 1 && (i === 0 || last === 2) ? 2 : 1;
            room(step * (need + (last === 1 ? keepNext : 0) + (last === Math.min(lines.length, 2) && pointer ? pointer : 0)) + (last === Math.min(lines.length, 2) && pointer ? 3.5 * s : 0));
            drawRuns(draw, wrapped, left() + (i ? hang : 0), y + asc(size), size, BLACK, marks);
            y += step;
          });
          if (verse && n < block.lines.length - 1) y += verseGap;
        });
      } else {
        // Hanging indent: the marker in the secção's ink, the text aligned after it
        const indent = (block.kind === 'ol' ? 7 : 5) * s;
        block.lines.forEach((item, i) => {
          const wrapped = splitRecited(unmarkLang(item), textW - indent);
          const marks = { italic: false, bold: false, ink };
          // A list's first item never ends a page alone, nor its last starts one: the first asks for
          // room for the second too, and the one before the last for both
          const next = (i === 0 || i === block.lines.length - 2) && block.lines[i + 1] ? Math.min(splitRecited(block.lines[i + 1], textW - indent).length, 2) : 0;
          room(lineH * (Math.min(wrapped.length, 2) + next));
          draw.text(block.kind === 'ol' ? `${block.start + i}.` : '•', left(), y + asc(size), size, 'bold', ink);
          wrapped.forEach((w, k) => {
            if (k) room(lineH);
            drawRuns(draw, w, left() + indent, y + asc(size), size, BLACK, marks);
            y += lineH;
          });
          // What the item means (the Leis e Máximas' `notes`), under it: a step smaller, in the
          // page's gray-700 and a little further in, so on paper the line to learn stays the one
          // that stands out
          const note = sec.notes?.[i];
          if (note) {
            const noteSize = BODY - 1;
            const noteH = noteSize * ts * PT * 1.5;
            const noteIn = indent + 2 * s;
            y += 1 * s;
            for (const w of draw.split(note, textW - noteIn, noteSize)) {
              room(noteH);
              draw.text(w, left() + noteIn, y + asc(noteSize), noteSize, 'normal', NOTE_GRAY);
              y += noteH;
            }
            y += 1 * s;
          }
          // A recited list's items are sayings of their own: more room between them
          y += (sec.recite ? 2.5 : 1.2) * s;
        });
      }
      // A recited line that leads into a list sits as close to it as the list's own items
      y += block.kind === 'h' ? 0.5 * s : ((sec.recite || sec.headingMedia) && block.kind === 'p' && blocks[bi + 1] && blocks[bi + 1].kind !== 'p' ? 1.5 : 3.5) * s;
    });
    // A picture under its text (`mediaAfter`, the nós' diagrams): printed from the width the page
    // draws it at (`natural`, a CSS pixel to 0.26mm) and 1.4× that, so on paper, the sheet beside
    // the rope, its steps read at arm's length; the two diagrams keep their sizes to each other,
    // and neither is wider than the column
    // Badges under their text (`badge`, the Guia's fitas under the sentence that says what they
    // show): a grid, each named, as on the page
    if (sec.mediaAfter && badges[sec.media]?.(seccao)[0].badge) {
      y += 1 * s;
      badgeGrid(badges[sec.media](seccao), { wide: true });
    } else if (sec.mediaAfter && badges[sec.media]) {
      const item = badges[sec.media](seccao)[0];
      const img = media.get(item.src);
      if (img) {
        const w = Math.min((item.natural ?? img.w) * 0.2646 * 1.4 * s, colW);
        const h = (w * img.h) / img.w;
        y += 1 * s;
        // The diagram and its caption move together, never a caption alone atop a page
        const captionLines = item.caption ? draw.split(item.caption, w, 8.5) : [];
        room(h + 2 * s + captionLines.length * 8.5 * ts * PT * 1.4);
        draw.image(img.data, left(), y, w, h, 'JPEG');
        y += h + 2 * s;
        // Its caption of ours (the nó direito's step order), smaller and gray, under it
        if (captionLines.length) {
          for (const line of captionLines) {
            draw.text(line, left(), y + asc(8.5), 8.5, 'normal', GRAY);
            y += 8.5 * ts * PT * 1.4;
          }
          y += 1 * s;
        }
      }
    }
    // Colours with their names (the Bandos), as on the page: a round swatch, edged so the white
    // one shows, its name beside it, on one row that wraps
    if (sec.swatches) {
      const r = 2.6 * s;
      const rowH = 2 * r + 3 * s;
      room(rowH);
      let x = left();
      for (const c of sec.swatches) {
        const w = 2 * r + 2 * s + draw.width(c.name, BODY, 'bold') + 7 * s;
        if (x + w > left() + colW && x > left()) {
          y += rowH;
          room(rowH);
          x = left();
        }
        draw.circle(x + r, y + r, r, hexToRgb(c.color), GRAY_LIGHT);
        draw.text(c.name, x + 2 * r + 2 * s, y + r + asc(BODY) / 2 - 0.3 * s, BODY, 'bold', BLACK);
        x += w;
      }
      y += rowH + 1 * s;
    }
    // Words and what they mean (Caçadas, Covil): the word bold in the secção's ink, its meaning
    if (sec.terms) {
      // Numbers (the book's parts, I to VI) sit in a column of their own, as on the page
      const numbered = sec.terms.every((t) => t.term.length <= 4);
      const termW = (t) => (numbered ? 9 * s : draw.width(unmarkLang(t.term), BODY, 'bold') + 1.5 * s);
      // A word's meaning runs on after it, as on the page: its first line beside the word, the rest
      // back at the margin (hung under each word's end, a list's left edge went ragged: "Totem"
      // at 15mm, "Livro de Ouro" at 21mm). Numbers keep their column
      const lines = (t) => {
        const tw = termW(t);
        // a no-break hyphen ("Sub‑Guias", "JOTA‑JOTI") a plain one, in the word and its meaning, as
        // in the paragraphs: jsPDF draws nothing for it
        const text = unmarkLang(t.text);
        if (numbered) return draw.split(text, colW - tw, BODY).map((line) => ({ line, x: tw }));
        const words = text.split(' ');
        let n = 0;
        while (n < words.length && tw + draw.width(words.slice(0, n + 1).join(' '), BODY) <= colW) n++;
        const rest = n < words.length ? draw.split(words.slice(n).join(' '), colW, BODY) : [];
        return [{ line: words.slice(0, n).join(' '), x: tw }, ...rest.map((line) => ({ line, x: 0 }))];
      };
      const termLines = sec.terms.map((t) => lines(t).length);
      for (const [k, t] of sec.terms.entries()) {
        const rest = lines(t);
        // Never one word alone at a column's foot or head: the first two go together, and the
        // last two (a list of four or fewer moves whole, with its heading, above)
        const pair = k === 0 || k === sec.terms.length - 2 ? termLines[k + 1] ?? 0 : 0;
        room(lh * (rest.length + pair));
        draw.text(unmarkLang(t.term), left(), y + asc(BODY), BODY, 'bold', ink);
        rest.forEach(({ line, x }) => {
          draw.text(line, left() + x, y + asc(BODY), BODY, 'normal', BLACK);
          y += lh;
        });
        // A small gap between entries, as on the page, so a wrapped one reads as one
        if (k < sec.terms.length - 1) y += 1.2 * s;
      }
      y += 2 * s;
    }
    // A sheet as it's filled (the PPV's open part), as on the page: a hairline frame, its name
    // dark, each field its label small and gray over its entry (a list bulleted, an
    // empty field two ruled lines to write on), hairlines between; kept whole on its page
    if (sec.sheet) {
      const { pad, innerW, labelLh, fields, titleH, source, sourceLh, h: boxH } = measureSheet(sec.sheet);
      y += 1 * s;
      room(boxH);
      const x0 = left();
      const boxW = innerW + 2 * pad;
      const top = y;
      for (const [ax, ay, bx, by] of [[x0, top, x0 + boxW, top], [x0, top + boxH, x0 + boxW, top + boxH], [x0, top, x0, top + boxH], [x0 + boxW, top, x0 + boxW, top + boxH]]) {
        draw.line(ax, ay, bx, by, GRAY_LIGHT, 0.3);
      }
      y = top + pad;
      draw.text(unmarkLang(sec.sheet.label), x0 + pad, y + asc(12), 12, 'bold', BLACK);
      y += titleH;
      for (const f of fields) {
        draw.line(x0 + pad, y, x0 + pad + innerW, y, GRAY_LIGHT, 0.3);
        y += 1 * s;
        for (const line of f.label) {
          draw.text(line, x0 + pad, y + asc(SHEET.label), SHEET.label, 'bold', GRAY);
          y += labelLh;
        }
        y += 0.6 * s;
        if (f.value) {
          for (const { line, x, bullet } of f.value) {
            if (bullet) draw.text('•', x0 + pad + 1 * s, y + asc(SHEET.size), SHEET.size, 'normal', GRAY);
            draw.text(line, x0 + pad + x, y + asc(SHEET.size), SHEET.size, 'normal', BLACK);
            y += sheetLh;
          }
        } else {
          // A line to write on (the next field's hairline the second)
          draw.line(x0 + pad, y + sheetLh - 0.6 * s, x0 + pad + innerW, y + sheetLh - 0.6 * s, GRAY_LIGHT, 0.3);
          y += sheetLh;
        }
        y += 1.2 * s;
      }
      if (source.length) {
        y += 1 * s;
        for (const line of source) {
          draw.text(line, x0 + pad, y + asc(SHEET.source), SHEET.source, 'normal', GRAY);
          y += sourceLh;
        }
      }
      y = top + boxH + 3 * s;
    }
    // Things of one kind told the same way (the units), as on the page: two to a row, each its
    // name after a dot in its secção's colour, over its facts as label and value; a row kept whole
    if (sec.profiles) {
      const gutter = 8 * s;
      const cellW = (colW - gutter) / 2;
      const labelW = Math.max(...sec.profiles.flatMap((p) => p.facts.map(([l]) => draw.width(l, BODY - 1.5, "bold")))) + 4 * s;
      const r = 1.3 * s;
      const nameH = lh + 1 * s;
      const factLines = (p) => p.facts.map(([, v]) => draw.split(v, cellW - labelW, BODY));
      y += 2 * s;
      for (let i = 0; i < sec.profiles.length; i += 2) {
        const row = sec.profiles.slice(i, i + 2);
        const rowH = nameH + Math.max(...row.map((p) => factLines(p).reduce((t, l) => t + l.length, 0))) * lh;
        room(rowH + 2 * s);
        row.forEach((p, k) => {
          const x = left() + k * (cellW + gutter);
          let ty = y;
          draw.rect(x, ty, cellW, 0.25 * s, GRAY_LIGHT);
          ty += 2 * s;
          const dot = seccoes[p.seccao]?.color;
          if (dot) draw.circle(x + r, ty + asc(BODY) / 2 + 0.2 * s, r, hexToRgb(dot), GRAY_LIGHT);
          draw.text(p.name, x + 2 * r + 2 * s, ty + asc(BODY), BODY, 'bold', BLACK);
          ty += nameH;
          factLines(p).forEach((lines, n) => {
            draw.text(p.facts[n][0], x, ty + asc(BODY), BODY - 1.5, 'bold', GRAY);
            for (const line of lines) {
              draw.text(line, x + labelW, ty + asc(BODY), BODY, 'normal', BLACK);
              ty += lh;
            }
          });
        });
        // the rows' gap between them only: after the last, the section's own gap follows
        y += rowH + 2 * s + (i + 2 < sec.profiles.length ? 4 * s : 0);
      }
    }
    // The characters (the Livro da Selva's), as on the page and in the manual: each one's drawing
    // fitted to a box, their text beside it, its first line level with the drawing's top,
    // opening on their name in bold in the secção's ink. On a full-width page two to a row, the
    // drawings on the outside (left, then right, as the manual alternates them), so all ten fit
    // the page under the text, as in the manual; in a narrow column, one to a row, alternating
    if (sec.cast) {
      // `castSide: 'left'` (the Exploradores' five symbols): one to a row, every icon on the left,
      // as on the page; two to a row left the fifth alone with half a row empty
      const oneSide = sec.castSide === 'left';
      // Two to a row only for a long cast (the ten): two alone (the Jamboree's and the JOTA-JOTI's
      // logos) one to a row, at the body's size, so the logos aren't 13mm thumbnails
      // A cast whose pictures have captions (`caption`, A Caminho do Triunfo's drawings beside its
      // rocks): one to a row at the larger box, each caption under its picture, as on the page; two
      // to a row they printed as 13mm thumbnails, Dick and the Cristo dos Andes alike
      const captioned = sec.cast.some((c) => c.caption);
      const pairs = !oneSide && !captioned && sec.cast.length > 2 && colW >= 150 * s;
      // `castLarge` (the logos): a larger box, each on the text's left edge, so small lettering
      // ("World Scout") prints legibly
      // Icons beside short texts (`castSide: 'left'`, the symbols', the areas') at 15mm: at 18mm the
      // icon, not its two lines of text, set each row's height, and the areas' list pushed the
      // Exploradores' etapas onto a third page
      const box = (pairs ? 13 : sec.castLarge ? 26 : captioned ? 24 : oneSide ? 15 : 18) * s;
      const CAP = 7.5;
      const capLh = CAP * ts * PT * 1.3;
      const capLines = (c) => (c.caption && c.media ? draw.split(unmarkLang(c.caption), box, CAP) : []);
      const gap = (pairs ? 2.5 : 5) * s;
      const gutter = 5 * s;
      const cellW = pairs ? (colW - gutter) / 2 : colW;
      // In pairs a step smaller and tighter (9.5pt), as the manual sets them, so the ten fit
      const size = pairs ? 9.5 : BODY;
      const rowLh = pairs ? size * ts * PT * 1.42 : lh;
      const tw = cellW - box - gap;
      // The name's line is shorter by the name; the rest wrap at the full width
      // A row with no picture of its own (the Women's) takes the cell's whole width, as on the page
      const textW = (c) => (c.media ? tw : cellW);
      const measure = (c) => {
        const tw = textW(c);
        const nameW = draw.width(unmarkLang(c.name), size, 'bold');
        // Its titles' marks (the symbols' *scout*) drawn in italics, as on the page
        const text = unmarkLang(c.text);
        const words = text.trimStart().split(' ');
        const lead = text.startsWith(' ') ? ' ' : '';
        let n = 0;
        while (n < words.length && nameW + draw.width(lead + words.slice(0, n + 1).join(' '), size) <= tw) n++;
        const rest = n < words.length ? draw.split(words.slice(n).join(' '), tw, size) : [];
        // A line of its own under the text (`line`, an area's trilhos), as on the page
        if (c.line) rest.push(...draw.split(unmarkLang(c.line), tw, size));
        // Or a list (`objectives`, the Caminheiros' objetivos), as on the page: one a line, the
        // code in a slot of its own, two columns down when every name fits its column
        let obj = null;
        if (c.objectives) {
          const codeW = Math.max(...c.objectives.map((o) => draw.width(o.code, size, 'bold'))) + 2.5 * s;
          const colGap = 5 * s;
          const half = (tw - colGap) / 2;
          const cols = c.objectives.every((o) => codeW + draw.width(o.name, size) <= half) ? 2 : 1;
          obj = { codeW, colGap, colW: cols === 2 ? half : tw, rows: Math.ceil(c.objectives.length / cols) };
        }
        const textH = (1 + rest.length + (obj ? obj.rows : 0)) * rowLh + (obj ? 1.5 * s : 0);
        // Its codes' range under the icon (`range`, "F1–F6"), as on the page
        const caps = capLines(c);
        const iconH = c.media ? box + (c.range ? 4.5 * s : 0) + (caps.length ? 1.5 * s + caps.length * capLh : 0) : 0;
        return { c, nameW, first: lead + words.slice(0, n).join(' '), rest, obj, h: Math.max(iconH, textH) };
      };
      const cell = ({ c, nameW, first, rest, obj }, x, imageRight) => {
        const f = badges[c.media]?.(seccao)[0];
        const img = f && media.get(f.src);
        if (img) {
          const w = Math.min(box, (box * img.w) / img.h);
          const h = (w * img.h) / img.w;
          draw.image(img.data, (imageRight ? x + cellW - box : x) + (sec.castLarge ? 0 : (box - w) / 2), y, w, h, 'JPEG');
        }
        // Its caption under it, small and gray, centred on its picture
        capLines(c).forEach((line, k) => {
          draw.text(line, (imageRight ? x + cellW - box : x) + box / 2, y + box + 1.5 * s + k * capLh + asc(CAP), CAP, 'normal', GRAY, { align: 'center' });
        });
        if (c.range) {
          const rx = (imageRight ? x + cellW - box : x) + (box - draw.width(c.range, 8, 'bold')) / 2;
          draw.text(c.range, rx, y + box + 1.5 * s + asc(8), 8, 'bold', ink);
        }
        const tx = imageRight || !c.media ? x : x + box + gap;
        let ty = y;
        draw.text(unmarkLang(c.name), tx, ty + asc(size), size, 'bold', ink);
        const marks = { italic: false, bold: false, ink };
        drawRuns(draw, first, tx + nameW, ty + asc(size), size, BLACK, marks);
        for (const line of rest) {
          ty += rowLh;
          drawRuns(draw, line, tx, ty + asc(size), size, BLACK, marks);
        }
        if (obj) {
          const top = ty + rowLh + 1.5 * s;
          c.objectives.forEach((o, k) => {
            const ox = tx + Math.floor(k / obj.rows) * (obj.colW + obj.colGap);
            const oy = top + (k % obj.rows) * rowLh + asc(size);
            draw.text(o.code, ox, oy, size, 'bold', ink);
            draw.text(o.name, ox + obj.codeW, oy, size, 'normal', BLACK);
          });
        }
      };
      const per = pairs ? 2 : 1;
      y += (pairs ? 1 : 2) * s;
      for (let i = 0; i < sec.cast.length; i += per) {
        const row = sec.cast.slice(i, i + per).map(measure);
        const rowH = Math.max(...row.map((m) => m.h));
        // The last row never starts a page alone: the one before asks for room for both (the
        // Caminheiros' Fogo stood on page 3, apart from the other five symbols)
        const next = i + per < sec.cast.length && i + 2 * per >= sec.cast.length ? Math.max(...sec.cast.slice(i + per).map((c) => measure(c).h)) : 0;
        const both = rowH + (pairs ? 2 : 4) * s + next;
        room(next && both <= bottom - colTop ? both : rowH);
        row.forEach((m, j) => cell(m, left() + j * (cellW + gutter), oneSide ? false : pairs ? j === 1 : (i / per) % 2 === 1));
        // A gap between rows only: after the last, the section's own gap follows (both together
        // sent the Pioneiros' "O azul do céu e do mar" to a page of its own, 1.3mm short)
        y += rowH + (i + per < sec.cast.length ? (pairs ? 2 : 4) * s : 0);
      }
    }
    // Steps on one line (the Lobitismo), as on the page: a date or a dot in the secção's ink at
    // the left, a thin rail joining them, each step's name in bold and its text beside it
    if (sec.steps) {
      const dated = Boolean(sec.steps[0].label);
      // Under the section's own years (the História's "1908–1920"), the years at the text's size,
      // as on the page, so they don't match the heading's
      const labelSize = sec.date ? BODY : 12.5;
      // `numbered` (the Empreendimento's phases): each marker its number in a disc, as on the page
      const numbered = !dated && sec.numbered;
      const markW = (dated ? (sec.date ? 12 : 16) : numbered ? 6.5 : 5) * s;
      const tw = colW - markW - 3 * s;
      if (blocks.length) y += 1 * s;
      sec.steps.forEach((st, k) => {
        const title = st.title ? draw.split(st.title, tw, BODY, 'bold') : [];
        const text = st.text ? draw.split(unmarkLang(st.text), tw, BODY) : [];
        const h = (title.length + text.length) * lh;
        // A step is never split, and the last one never starts a page alone; the last takes the
        // pointer that follows the steps with it ("Podes saber mais na prova…", the Objetivos'
        // after Validar a etapa), which alone had opened a booklet page: the step's 3mm after it and
        // the pointer's 2mm before it, then its lines
        const pointerH = k === sec.steps.length - 1 && moreText && moreLast && !sec.profiles && !sec.moreAfterMedia ? 5 * s + draw.split(moreText, colW, BODY).length * lh : 0;
        room(h + (k === sec.steps.length - 2 ? lh * 2 : 0) + pointerH);
        // After room(): a step that moved on to the next column or page is set from its left edge
        const railX = left() + (dated ? 4.5 : numbered ? 2.4 : 1.25) * s;
        const tx = left() + markW + 3 * s;
        const top = y;
        if (dated) draw.text(st.label, left(), y + asc(labelSize), labelSize, 'bold', ink);
        else if (numbered) {
          const cy = y + asc(BODY) - 1.1 * s;
          draw.circle(railX, cy, 2.4 * s, hexToRgb(section.surface));
          draw.text(String(k + 1), railX, cy + asc(7.5) / 2, 7.5, 'bold', hexToRgb(section.onSurface), { align: 'center' });
        } else draw.circle(railX, y + asc(BODY) - 1.1 * s, 1.25 * s, ink);
        for (const t of title) {
          draw.text(t, tx, y + asc(BODY), BODY, 'bold', BLACK);
          y += lh;
        }
        const marks = { italic: false, bold: false, ink };
        for (const t of text) {
          drawRuns(draw, t, tx, y + asc(BODY), BODY, BLACK, marks);
          y += lh;
        }
        y += 3 * s;
        if (k < sec.steps.length - 1) draw.line(railX, top + (dated ? (sec.date ? 6 : 7) : numbered ? 4 : 2.5) * s, railX, y - 1 * s, GRAY_LIGHT, 0.5);
      });
    }
    if (moreText && moreLast) {
      const lines = draw.split(moreText, colW, BODY);
      y += 2 * s;
      room(lines.length * lh);
      for (const t of lines) {
        draw.text(t, left(), y + asc(BODY), BODY, 'normal', BLACK);
        y += lh;
      }
      y += 3.5 * s;
    }
    // A closing line of reference (`endNote`), as on the page: smaller and gray, kept whole
    if (sec.endNote) {
      const lines = draw.split(unmarkLang(sec.endNote), colW, 9);
      const noteH = 9 * ts * PT * 1.45;
      y += 1.5 * s;
      room(lines.length * noteH);
      for (const t of lines) {
        draw.text(t, left(), y + asc(9), 9, 'normal', GRAY);
        y += noteH;
      }
    }
    // Below the picture, if it is on this page: one left on the page before is no reason to
    // push the next section down (it sent Secretário to a new page, leaving one nearly empty)
    // A picture the next part runs on beside (`wrap`) doesn't push it down: the text keeps its
    // narrower width until the picture ends
    if (aside && sec.wrap) float = { page: asidePage, bottom: asideTop + asideH + 2 * s, besideW };
    else if (aside && draw.pages.length === asidePage) y = Math.max(y, asideTop + asideH + 4 * s);
    // A recited section gets a wider pause before the next one, as on the page
    y += (sec.recite ? 6 : 4) * s;
  }
  return { first, col, colTop, alone };
}

function footer(draw, g, page, { logo, label }) {
  const { s, margin: M } = g;
  const y = g.h - 14 * s;
  draw.onto(page, () => {
    draw.line(M, y - 5 * s, g.w - M, y - 5 * s, GRAY_LIGHT, 0.25);
    draw.image(logo, M, y - 3.4 * s, 5 * s);
    draw.text('Agrupamento 80 - Santa Maria de Belém', M + (logo ? 7 * s : 0), y, 7.5, 'bold', GRAY);
    if (label) draw.text(label, g.w - M, y, 7.5, 'normal', GRAY, { align: 'right' });
  });
}

// Whether any of these provas marks a title of a work (`*…*`), so the italic is needed
const hasItalics = (seccao, list) => list.some((p) => /(^|[^*])\*(?!\*)|~/.test(JSON.stringify(getProvaContent(seccao, p.slug) ?? '')));

async function newDoc(title, orientation) {
  // `compress`: text, fonts and the logo's pixels deflated (they went in raw)
  const doc = new jsPDF({ orientation, unit: 'mm', format: 'a4', compress: true });
  await registerNunito(doc);
  doc.setProperties({ title, author: 'Agrupamento 80 - Santa Maria de Belém' });
  // Screen readers and copied text use it (jsPDF knows "pt", not "pt-PT")
  doc.setLanguage('pt');
  return doc;
}

export async function generateProvaPdf(seccao, slug) {
  const section = seccoes[seccao];
  const prova = numbered(seccao).find((p) => p.slug === slug);
  const [doc, logo, media] = await Promise.all([newDoc(prova.title, 'portrait'), loadImage(faviconUrl, 'image/png', LOGO_PX), loadMedia(seccao, [prova])]);
  if (hasItalics(seccao, [prova])) await registerNunitoItalic(doc);

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
  // Text sizes in mm (a line's height, its ascent) follow the type's scale, not the page's
  const ts = g.t ?? s;
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
  y += (title.length - 1) * 32 * ts * PT * 1.1 + 9 * s;
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
  const [doc, logo, media] = await Promise.all([newDoc(`Provas dos ${shortName}`, orientation), loadImage(faviconUrl, 'image/png', LOGO_PX), loadMedia(seccao, all)]);
  if (hasItalics(seccao, all)) await registerNunitoItalic(doc);

  // Page 1 is the cover, filled in once the provas' page numbers are known
  const draw = recorder(doc, g);
  const starts = {};
  // In two columns (the landscape layout), a prova that ends in the left one leaves the right
  // one to the next, which starts there, under the first's title if they share its first page
  let end = null;
  for (const prova of all) {
    const at = end && end.col < g.cols - 1 ? { col: end.col + 1, y: end.colTop } : null;
    const opts = { seccao, prova, section, total: all.length, header: true, media };
    const mark = draw.mark();
    if (!at) draw.newPage();
    end = layoutProva(draw, g, { ...opts, at });
    // Only its title fit in the column (the posters of the Uniforme are taller): undone, and
    // laid out on a page of its own instead, so a title never stands alone
    if (end.alone) {
      draw.rollback(mark);
      draw.newPage();
      end = layoutProva(draw, g, opts);
    }
    starts[prova.slug] = end.first + 1;
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
