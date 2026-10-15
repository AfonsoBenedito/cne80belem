import { jsPDF } from 'jspdf';
import faviconUrl from '/favicon.png';
import { registerNunito, registerNunitoItalic } from './pdfFonts';
import { normalize } from './normalize';
import { toBlocks, leadsList } from './provaBlocks';
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
function drawRuns(draw, line, x, y, size, color, state) {
  let cx = x;
  for (const [n, part] of line.split('*').entries()) {
    if (n) state.italic = !state.italic;
    if (!part) continue;
    const style = state.italic ? 'italic' : 'normal';
    draw.text(part, cx, y, size, style, color);
    cx += draw.width(part, size, style);
  }
}

const unmarkLang = (text) => text.replaceAll('{en}', '');

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
    // Wraps at the size the text will be drawn at
    split(str, width, size, style = 'normal') {
      setText(doc, size * (g.t ?? g.s), style);
      return doc.splitTextToSize(str, width);
    },
    // How wide a line is at the size it will be drawn at
    width(str, size, style = 'normal') {
      setText(doc, size * (g.t ?? g.s), style);
      return doc.getTextWidth(str);
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
  for (const sec of content.sections) {
    if (sec.heading) {
      const lines = draw.split(sec.heading, colW, 12.5, 'bold');
      const h = lines.length * 12.5 * ts * PT * 1.25;
      // Keep a heading with at least two lines of its text, or with its pictures
      let keep = sec.media === 'dirigentes' ? NIVEIS_H : sec.media === 'progresso' ? PROGRESSO_H : badges[sec.media] && !sec.mediaAfter ? (badges[sec.media](seccao)[0].large ? 38 * s + NAME_LINE * 2 : FUNCAO_ROW) : lh * 2;
      // A quotation (the Última Mensagem): the heading takes its introduction and the passage's
      // first lines with it
      if (sec.quote) keep = (sec.intro ? draw.split(sec.intro, colW, BODY).length * lh + 3.5 * s : 0) + lh * 3 + 3.5 * s;
      // A short list of words (Caçadas e Covil: up to four) reads only whole: its heading asks for
      // room for the lead and every word, so it never splits across a page or a column; a longer
      // one (the Palavras dos nós) for its lead and first two words, so they're never apart
      if (sec.terms) {
        const lead = sec.text ? toBlocks(sec.text).reduce((t, b) => t + b.lines.reduce((u, l) => u + draw.split(l, colW, BODY).length, 0) * lh + 3.5 * s, 0) : 0;
        const kept = sec.terms.length <= 4 ? sec.terms : sec.terms.slice(0, 2);
        const terms = kept.reduce((t, w) => t + draw.split(w.text, colW - draw.width(w.term, BODY, 'bold') - 1.5 * s, BODY).length * lh, 0);
        if (h + 3 * s + lead + terms <= bottom - colTop) keep = lead + terms + 2 * s;
      }
      // A chain of steps (the Lobitismo's Alcateia → CNE) is short and reads only whole: its
      // heading asks for room for the whole section, lead and every step
      if (sec.steps && !sec.steps[0].label) {
        const tw = colW - 8 * s;
        const lead = sec.text ? toBlocks(sec.text).reduce((t, b) => t + b.lines.reduce((u, l) => u + draw.split(l, colW, BODY).length, 0) * lh + 3.5 * s, 0) : 0;
        const steps = sec.steps.reduce((t, st) => t + ((st.title ? draw.split(st.title, tw, BODY, 'bold').length : 0) + (st.text ? draw.split(st.text, tw, BODY).length : 0)) * lh + 3 * s, 0);
        if (h + 3 * s + lead + steps <= bottom - colTop) keep = lead + steps + 1 * s;
      }
      // A recited prayer is kept whole (below), so its heading asks for room for all of it
      const first = g.cols === 1 && sec.recite && sec.text ? toBlocks(sec.text)[0] : null;
      if (first && first.kind === 'p' && first.lines.length > 1) {
        const rh = 11.5 * ts * PT * 1.4;
        const whole = first.lines.reduce((t, line) => t + draw.split(line, colW - 1.25 * 11.5 * ts * PT, 11.5).length * rh, 0);
        if (h + 3 * s + whole <= bottom - colTop) keep = whole;
      }
      // The years it covers (Vida de Baden-Powell's parts), as on the page: small, over it
      const dateH = sec.date ? 8.5 * ts * PT * 1.3 : 0;
      room(dateH + h + 3 * s + keep);
      if (sec.date) {
        draw.text(sec.date, left(), y + asc(8.5), 8.5, 'bold', ink);
        y += dateH;
      }
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
    if (badges[sec.media] && !sec.text) {
      // A grid of badges, each over its name, all at one height; drawings of a whole scout
      // (`large`, the saudações) taller, fewer to a row, each fitted to its cell
      const items = badges[sec.media](seccao);
      const large = items[0].large;
      const imgH = (large ? 34 : 13) * s;
      const perRow = Math.max(1, Math.floor(colW / ((large ? 38 : 26) * s)));
      const cellW = colW / perRow;
      // A `group` (the fitas, then the cargos) starts its own row, as on the page, and its rows
      // are as even as they split, so none is left with one (7 cargos are 4 + 3, not 6 + 1)
      const rows = [];
      const groups = [];
      items.forEach((f, k) => (f.group === items[k - 1]?.group && k ? groups[groups.length - 1].push(f) : groups.push([f])));
      for (const g of groups) {
        const n = Math.ceil(g.length / Math.ceil(g.length / perRow));
        for (let i = 0; i < g.length; i += n) rows.push(g.slice(i, i + n));
      }
      rows.forEach((row, r) => {
        // A name wider than its cell breaks after its hyphen ("Guarda- / Material"), not inside a
        // word ("Guarda-Materi / al"): the lines only break at spaces
        const nameW = cellW - 3 * s;
        const fit = (name) => name.split(' ').map((w) => (draw.width(w, 8.5, 'bold') > nameW ? w.replace(/-(?=\S)/g, '- ') : w)).join(' ');
        const names = row.map((f) => (f.name ? draw.split(fit(f.name), nameW, 8.5, 'bold') : []));
        const rowH = imgH + 4 * s + Math.max(...names.map((n) => n.length)) * 8.5 * ts * PT * 1.25;
        // A group's own heading (the Posições), as on the page, kept with its first row
        const heading = row[0].groupHeading && rows[r - 1]?.[0].group !== row[0].group ? row[0].groupHeading : null;
        room(rowH + (heading ? LABEL_H : 0));
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
    // from the prose, and the Lobitos' three prayers still fit one A4 page
    const size = sec.recite ? 11.5 : BODY;
    const lineH = sec.recite ? size * ts * PT * 1.4 : lh;
    const blocks = sec.text ? toBlocks(sec.text) : [];
    // The prova's question to the scout (the Livro da Selva's), as on the page: bold, a step larger
    if (sec.lead) {
      const lines = draw.split(sec.lead, colW, 12, 'bold');
      room(lines.length * 12 * ts * PT * 1.35 + lh * 2);
      draw.text(lines, left(), y + asc(12), 12, 'bold', BLACK, { lineHeightFactor: 1.35 });
      y += lines.length * 12 * ts * PT * 1.35 + 2 * s;
    }
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
    if (more) blocks.push({ kind: 'p', lines: [`Podes saber mais na prova ${more.n}, «${more.title}».`] });
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
      const para = (text, x, w, withRule, keep = 0) => {
        const lines = draw.split(text, w, BODY);
        lines.forEach((line, i) => {
          const last = lines.length - i;
          const page = draw.pages.length - 1;
          room(lh * ((lines.length > 1 && (i === 0 || last === 2) ? 2 : 1) + (last === 1 ? keep : 0)) + (last === 1 && keep ? 3.5 * s : 0));
          if (withRule && rule && draw.pages.length - 1 !== page) {
            // the passage went on to a new page: its rule there starts again at the top
            const was = y;
            y = rule.end;
            closeRule();
            y = was;
          }
          if (withRule && !rule) rule = { page: draw.pages.length - 1, x: left(), y };
          draw.text(line, x, y + asc(BODY), BODY, 'normal', BLACK);
          y += lh;
          if (rule) rule.end = y;
        });
      };
      if (sec.intro) {
        // kept with the passage's first lines: an introduction never ends a page
        para(sec.intro, left(), colW, false, 3);
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
        para(block.lines.join(' '), left() + indent, colW - indent, true, keep);
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
        room(lh * 3);
        draw.text(block.lines[0], left(), y + asc(BODY), BODY, 'bold', BLACK);
        y += lh;
      } else if (sec.headingMedia && leadsList(blocks, bi)) {
        // A cargo's list label ("Ao Guia compete:"), as on the page: bold, in the secção's ink,
        // smaller, kept with the list's first item
        room(lineH * 3);
        draw.text(block.lines[0], left(), y + asc(size - 1), size - 1, 'bold', ink);
        y += lineH;
      } else if (block.kind === 'p') {
        // Several lines (a prayer): a wrapped part sits indented under its line
        const verse = block.lines.length > 1;
        const hang = verse ? 1.25 * size * ts * PT : 0;
        // On a one-column page, a recited prayer that fits a page is never split: it moves whole to
        // the next page rather than leaving its last lines ("…da nossa morte. / Ámen.") on one of
        // their own. Two columns (the landscape layout) let it run on into the next, on the same page
        if (verse && sec.recite && g.cols === 1) {
          const h = block.lines.reduce((t, line) => t + splitRecited(line, textW - hang).length * lineH, 0);
          if (h <= bottom - colTop) room(h);
        }
        const marks = { italic: false };
        block.lines.forEach((line, n) => {
          const lines = splitRecited(unmarkLang(line), textW - hang);
          // A prayer's last line ("Ámen.") never starts a page alone: its second-to-last line
          // asks for room for both
          const keepNext = verse && n === block.lines.length - 2 ? draw.split(block.lines[n + 1], textW - hang, size).length : 0;
          lines.forEach((wrapped, i) => {
            // No paragraph starts or ends a page with a single line of it
            const last = lines.length - i;
            room(lineH * ((lines.length > 1 && (i === 0 || last === 2) ? 2 : 1) + (last === 1 ? keepNext : 0)));
            drawRuns(draw, wrapped, left() + (i ? hang : 0), y + asc(size), size, BLACK, marks);
            y += lineH;
          });
        });
      } else {
        // Hanging indent: the marker in the secção's ink, the text aligned after it
        const indent = (block.kind === 'ol' ? 7 : 5) * s;
        block.lines.forEach((item, i) => {
          const wrapped = splitRecited(unmarkLang(item), textW - indent);
          const marks = { italic: false };
          // A list's last item never starts a page alone: the one before it asks for room for both
          const next = i === block.lines.length - 2 ? Math.min(splitRecited(block.lines[i + 1], textW - indent).length, 2) : 0;
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
    if (sec.mediaAfter && badges[sec.media]) {
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
          x = left();
          y += rowH;
          room(rowH);
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
      const termW = (t) => (numbered ? 9 * s : draw.width(t.term, BODY, 'bold') + 1.5 * s);
      const termLines = sec.terms.map((t) => draw.split(t.text, colW - termW(t), BODY).length);
      for (const [k, t] of sec.terms.entries()) {
        const tw = termW(t);
        const rest = draw.split(t.text, colW - tw, BODY);
        // Never one word alone at a column's foot or head: the first two go together, and the
        // last two (a list of four or fewer moves whole, with its heading, above)
        const pair = k === 0 || k === sec.terms.length - 2 ? termLines[k + 1] ?? 0 : 0;
        room(lh * (rest.length + pair));
        draw.text(t.term, left(), y + asc(BODY), BODY, 'bold', ink);
        rest.forEach((line) => {
          draw.text(line, left() + tw, y + asc(BODY), BODY, 'normal', BLACK);
          y += lh;
        });
      }
      y += 2 * s;
    }
    // The characters (the Livro da Selva's), as on the page and in the manual: each one's drawing
    // fitted to a box, their text beside it, its first line level with the drawing's top,
    // opening on their name in bold in the secção's ink. On a full-width page two to a row, the
    // drawings on the outside (left, then right, as the manual alternates them), so all ten fit
    // the page under the text, as in the manual; in a narrow column, one to a row, alternating
    if (sec.cast) {
      const pairs = colW >= 150 * s;
      const box = (pairs ? 13 : 18) * s;
      const gap = (pairs ? 2.5 : 5) * s;
      const gutter = 5 * s;
      const cellW = pairs ? (colW - gutter) / 2 : colW;
      // In pairs a step smaller and tighter (9.5pt), as the manual sets them, so the ten fit
      const size = pairs ? 9.5 : BODY;
      const rowLh = pairs ? size * ts * PT * 1.42 : lh;
      const tw = cellW - box - gap;
      // The name's line is shorter by the name; the rest wrap at the full width
      const measure = (c) => {
        const nameW = draw.width(c.name, size, 'bold');
        const words = c.text.trimStart().split(' ');
        const lead = c.text.startsWith(' ') ? ' ' : '';
        let n = 0;
        while (n < words.length && nameW + draw.width(lead + words.slice(0, n + 1).join(' '), size) <= tw) n++;
        const rest = n < words.length ? draw.split(words.slice(n).join(' '), tw, size) : [];
        return { c, nameW, first: lead + words.slice(0, n).join(' '), rest, h: Math.max(box, (1 + rest.length) * rowLh) };
      };
      const cell = ({ c, nameW, first, rest }, x, imageRight) => {
        const f = badges[c.media]?.(seccao)[0];
        const img = f && media.get(f.src);
        if (img) {
          const w = Math.min(box, (box * img.w) / img.h);
          const h = (w * img.h) / img.w;
          draw.image(img.data, (imageRight ? x + cellW - box : x) + (box - w) / 2, y, w, h, 'JPEG');
        }
        const tx = imageRight ? x : x + box + gap;
        let ty = y;
        draw.text(c.name, tx, ty + asc(size), size, 'bold', ink);
        draw.text(first, tx + nameW, ty + asc(size), size, 'normal', BLACK);
        for (const line of rest) {
          ty += rowLh;
          draw.text(line, tx, ty + asc(size), size, 'normal', BLACK);
        }
      };
      const per = pairs ? 2 : 1;
      y += (pairs ? 1 : 2) * s;
      for (let i = 0; i < sec.cast.length; i += per) {
        const row = sec.cast.slice(i, i + per).map(measure);
        const rowH = Math.max(...row.map((m) => m.h));
        room(rowH);
        row.forEach((m, j) => cell(m, left() + j * (cellW + gutter), pairs ? j === 1 : (i / per) % 2 === 1));
        y += rowH + (pairs ? 2 : 4) * s;
      }
    }
    // Steps on one line (the Lobitismo), as on the page: a date or a dot in the secção's ink at
    // the left, a thin rail joining them, each step's name in bold and its text beside it
    if (sec.steps) {
      const dated = Boolean(sec.steps[0].label);
      const markW = (dated ? 16 : 5) * s;
      const railX = left() + (dated ? 4.5 : 1.25) * s;
      const tx = left() + markW + 3 * s;
      const tw = colW - markW - 3 * s;
      if (blocks.length) y += 1 * s;
      sec.steps.forEach((st, k) => {
        const title = st.title ? draw.split(st.title, tw, BODY, 'bold') : [];
        const text = st.text ? draw.split(unmarkLang(st.text), tw, BODY) : [];
        const h = (title.length + text.length) * lh;
        // A step is never split, and the last one never starts a page alone
        room(h + (k === sec.steps.length - 2 ? lh * 2 : 0));
        const top = y;
        if (dated) draw.text(st.label, left(), y + asc(12.5), 12.5, 'bold', ink);
        else draw.circle(railX, y + asc(BODY) - 1.1 * s, 1.25 * s, ink);
        for (const t of title) {
          draw.text(t, tx, y + asc(BODY), BODY, 'bold', BLACK);
          y += lh;
        }
        const marks = { italic: false };
        for (const t of text) {
          drawRuns(draw, t, tx, y + asc(BODY), BODY, BLACK, marks);
          y += lh;
        }
        y += 3 * s;
        if (k < sec.steps.length - 1) draw.line(railX, top + (dated ? 7 : 2.5) * s, railX, y - 1 * s, GRAY_LIGHT, 0.5);
      });
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
const hasItalics = (seccao, list) => list.some((p) => JSON.stringify(getProvaContent(seccao, p.slug) ?? '').includes('*'));

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
