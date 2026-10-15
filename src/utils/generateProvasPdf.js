import { jsPDF } from 'jspdf';
import faviconUrl from '/favicon.png';
import { registerNunito } from './pdfFonts';
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
// all, scaled by `s`.
const A4 = { w: 210, h: 297, margin: 22, s: 1, cols: 1 };
const A4_LANDSCAPE = { w: 297, h: 210, margin: 20, s: 1, cols: 2 };
const A5 = { w: 148.5, h: 210, margin: 15, s: 0.82, cols: 1 };
const COL_GAP = 12;

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
      if (sec.media === 'dirigentes') dirigentes.cruzes.forEach((c) => urls.add(c.src));
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
      setText(doc, size * g.s, style);
      return doc.splitTextToSize(str, width);
    },
    // How wide a line is at the size it will be drawn at
    width(str, size, style = 'normal') {
      setText(doc, size * g.s, style);
      return doc.getTextWidth(str);
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
  const LABEL_H = 7 * s;
  const NIVEIS_H = LABEL_H + 12 * s + 4 * s + NAME_LINE + 6 * s;

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
      let keep = sec.media === 'dirigentes' ? NIVEIS_H : sec.media === 'progresso' ? PROGRESSO_H : badges[sec.media] && !sec.mediaAfter ? (badges[sec.media](seccao)[0].large ? 38 * s + NAME_LINE * 2 : FUNCAO_ROW) : lh * 2;
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
        const rh = 11.5 * s * PT * 1.4;
        const whole = first.lines.reduce((t, line) => t + draw.split(line, colW - 1.25 * 11.5 * s * PT, 11.5).length * rh, 0);
        if (h + 3 * s + whole <= bottom - colTop) keep = whole;
      }
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
        const names = row.map((f) => (f.name ? draw.split(f.name, cellW - 3 * s, 8.5, 'bold') : []));
        const rowH = imgH + 4 * s + Math.max(...names.map((n) => n.length)) * 8.5 * s * PT * 1.25;
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
        return { c, who, rowH: Math.max(crossH, 10.5 * s * PT * 1.3 + who.length * 8.5 * s * PT * 1.35) };
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
        draw.text(who, tx, y + 10.5 * s * PT * 1.3 + asc(8.5) + 1 * s, 8.5, 'normal', GRAY, { lineHeightFactor: 1.35 });
        y += rowH + 4 * s;
      }
      y += 2 * s;
    }
    // A recited section (the content's `recite`) is set larger, as on the page. 11.5pt: a step up
    // from the prose, and the Lobitos' three prayers still fit one A4 page
    const size = sec.recite ? 11.5 : BODY;
    const lineH = sec.recite ? size * s * PT * 1.4 : lh;
    const blocks = sec.text ? toBlocks(sec.text) : [];
    // Text with its picture beside it (the Promessa and its insígnia), as on the page: the
    // picture on the right of the text's first line, the text narrower to make room
    const asideItem = sec.text && !sec.mediaAfter && badges[sec.media] ? badges[sec.media](seccao)[0] : null;
    const aside = asideItem ? media.get(asideItem.src) : null;
    // 26mm tall (40mm for the hand sign, `large`; 14mm for a cargo's badge, `small`, as on the
    // page), or narrower for a wide picture (the handshake), so the text keeps two thirds
    const asideTall = (asideItem?.large ? 40 : asideItem?.small ? 14 : 26) * s;
    const asideW = aside ? Math.min((asideTall * aside.w) / aside.h, colW * 0.33) : 0;
    const asideH = aside ? (asideW * aside.h) / aside.w : 0;
    // A block that starts beside it is narrower; one that starts under it (or on a later page)
    // takes the full width
    const besideW = aside ? colW - asideW - 8 * s : colW;
    let asideTop = y;
    let asidePage = -1;
    if (aside) {
      room(asideH);
      asideTop = y;
      asidePage = draw.pages.length;
      draw.image(aside.data, left() + colW - asideW, y, asideW, asideH, 'JPEG');
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
    blocks.forEach((block, bi) => {
      const textW = draw.pages.length === asidePage && y < asideTop + asideH ? besideW : colW;
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
        const hang = verse ? 1.25 * size * s * PT : 0;
        // On a one-column page, a recited prayer that fits a page is never split: it moves whole to
        // the next page rather than leaving its last lines ("…da nossa morte. / Ámen.") on one of
        // their own. Two columns (the landscape layout) let it run on into the next, on the same page
        if (verse && sec.recite && g.cols === 1) {
          const h = block.lines.reduce((t, line) => t + splitRecited(line, textW - hang).length * lineH, 0);
          if (h <= bottom - colTop) room(h);
        }
        block.lines.forEach((line, n) => {
          const lines = splitRecited(line, textW - hang);
          // A prayer's last line ("Ámen.") never starts a page alone: its second-to-last line
          // asks for room for both
          const keepNext = verse && n === block.lines.length - 2 ? draw.split(block.lines[n + 1], textW - hang, size).length : 0;
          lines.forEach((wrapped, i) => {
            // No paragraph starts or ends a page with a single line of it
            const last = lines.length - i;
            room(lineH * ((lines.length > 1 && (i === 0 || last === 2) ? 2 : 1) + (last === 1 ? keepNext : 0)));
            draw.text(wrapped, left() + (i ? hang : 0), y + asc(size), size, 'normal', BLACK);
            y += lineH;
          });
        });
      } else {
        // Hanging indent: the marker in the secção's ink, the text aligned after it
        const indent = (block.kind === 'ol' ? 7 : 5) * s;
        block.lines.forEach((item, i) => {
          const wrapped = splitRecited(item, textW - indent);
          // A list's last item never starts a page alone: the one before it asks for room for both
          const next = i === block.lines.length - 2 ? Math.min(splitRecited(block.lines[i + 1], textW - indent).length, 2) : 0;
          room(lineH * (Math.min(wrapped.length, 2) + next));
          draw.text(block.kind === 'ol' ? `${block.start + i}.` : '•', left(), y + asc(size), size, 'bold', ink);
          wrapped.forEach((w, k) => {
            if (k) room(lineH);
            draw.text(w, left() + indent, y + asc(size), size, 'normal', BLACK);
            y += lineH;
          });
          // What the item means (the Leis e Máximas' `notes`), under it: a step smaller, in the
          // page's gray-700 and a little further in, so on paper the line to learn stays the one
          // that stands out
          const note = sec.notes?.[i];
          if (note) {
            const noteSize = BODY - 1;
            const noteH = noteSize * s * PT * 1.5;
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
        room(h + 2 * s + captionLines.length * 8.5 * s * PT * 1.4);
        draw.image(img.data, left(), y, w, h, 'JPEG');
        y += h + 2 * s;
        // Its caption of ours (the nó direito's step order), smaller and gray, under it
        if (captionLines.length) {
          for (const line of captionLines) {
            draw.text(line, left(), y + asc(8.5), 8.5, 'normal', GRAY);
            y += 8.5 * s * PT * 1.4;
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
      for (const t of sec.terms) {
        const tw = draw.width(t.term, BODY, 'bold') + 1.5 * s;
        const rest = draw.split(t.text, colW - tw, BODY);
        room(lh * rest.length);
        draw.text(t.term, left(), y + asc(BODY), BODY, 'bold', ink);
        rest.forEach((line) => {
          draw.text(line, left() + tw, y + asc(BODY), BODY, 'normal', BLACK);
          y += lh;
        });
      }
      y += 2 * s;
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
        const text = st.text ? draw.split(st.text, tw, BODY) : [];
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
        for (const t of text) {
          draw.text(t, tx, y + asc(BODY), BODY, 'normal', BLACK);
          y += lh;
        }
        y += 3 * s;
        if (k < sec.steps.length - 1) draw.line(railX, top + (dated ? 7 : 2.5) * s, railX, y - 1 * s, GRAY_LIGHT, 0.5);
      });
    }
    // Below the picture, if it is on this page: one left on the page before is no reason to
    // push the next section down (it sent Secretário to a new page, leaving one nearly empty)
    if (aside && draw.pages.length === asidePage) y = Math.max(y, asideTop + asideH + 4 * s);
    // A recited section gets a wider pause before the next one, as on the page
    y += (sec.recite ? 6 : 4) * s;
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
  // Screen readers and copied text use it (jsPDF knows "pt", not "pt-PT")
  doc.setLanguage('pt');
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
