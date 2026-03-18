import { jsPDF } from 'jspdf';
import { transposeChord } from '../config/chords';
import { registerNunito } from './pdfFonts';
import faviconUrl from '/favicon.png';

const GREEN = [84, 155, 139];
const GREEN_DARK = [14, 122, 58];
const BLACK = [26, 26, 26];
const GRAY = [115, 115, 115];
const GRAY_LIGHT = [220, 220, 220];
const LIGHT_GREEN = [230, 243, 240];
const WHITE = [255, 255, 255];

function drawChordBadge(doc, chord, cx, y, chordFontSize) {
  doc.setFont('Nunito', 'bold');
  doc.setFontSize(chordFontSize);
  const cw = doc.getTextWidth(chord) + 2.5;
  doc.setFillColor(...LIGHT_GREEN);
  doc.roundedRect(cx, y - 2.5, cw, 3.5, 0.8, 0.8, 'F');
  doc.setTextColor(...GREEN);
  doc.text(chord, cx + 1.25, y);
  return cw;
}

function parseSegments(line) {
  const segments = [];
  const parts = line.split(/\[([A-G][#b]?[a-z0-9]*)\]/);

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (i === 0 && parts[i]) {
        segments.push({ chord: null, text: parts[i] });
      }
    } else {
      const text = i + 1 < parts.length ? parts[i + 1] : '';
      segments.push({ chord: parts[i], text });
    }
  }

  if (segments.length === 0) {
    segments.push({ chord: null, text: line });
  }

  return segments;
}

function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

// ══════════════════════════════════════════════
//  SHARED: Song header bar
// ══════════════════════════════════════════════

function drawSongHeader(doc, song, pageW, marginLeft, marginRight, logoData) {
  const barHeight = 28;

  doc.setFillColor(...GREEN);
  doc.rect(0, 0, pageW, barHeight, 'F');

  if (logoData) {
    doc.addImage(logoData, 'PNG', pageW - marginRight - 18, 4, 18, 18);
  }

  const textX = marginLeft;

  doc.setFont('Nunito', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...WHITE);
  const titleY = song.author ? 14 : 17;
  doc.text(song.title, textX, titleY);

  if (song.author) {
    doc.setFont('Nunito', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(200, 210, 205);
    doc.text(song.author, textX, titleY + 5);
  }

  return barHeight + 8;
}

// ══════════════════════════════════════════════
//  SHARED: Render marker line (Intro/Bridge)
// ══════════════════════════════════════════════

function renderMarkerLine(doc, label, chords, x, y, semitones, lyricsFontSize, chordFontSize) {
  doc.setFont('Nunito', 'bold');
  doc.setFontSize(lyricsFontSize);
  doc.setTextColor(...GRAY);
  doc.text(`${label}:`, x, y);

  let cx = x + doc.getTextWidth(`${label}:`) + 3;
  chords.forEach((chord) => {
    const transposed = transposeChord(chord, semitones);
    const cw = drawChordBadge(doc, transposed, cx, y, chordFontSize);
    cx += cw + 2;
  });
}

// ══════════════════════════════════════════════
//  SHARED: Two-column flowing song renderer
// ══════════════════════════════════════════════

function renderSongTwoCol(doc, song, marginLeft, colWidth, colGap, startY, maxY, pageW, opts, semitones = 0) {
  const { lyricsFontSize, chordFontSize, lineHeight, chordLineHeight, stanzaGap } = opts;
  const colMargin = 4;

  let col = 0;
  let y = startY;
  const rightX = marginLeft + colWidth + colGap;
  let verseStartY = null;
  const effectiveColWidth = colWidth - colMargin;
  const separatorPages = new Set();

  function getX() {
    return col === 0 ? marginLeft : rightX + colMargin;
  }

  function advance(needed) {
    if (y + needed > maxY) {
      if (col === 0) {
        col = 1;
        separatorPages.add(doc.internal.getNumberOfPages());
        y = verseStartY != null ? verseStartY : startY;
      } else {
        doc.addPage();
        col = 0;
        drawContinuationHeader(doc, song, pageW, marginLeft);
        y = 16;
        verseStartY = null;
      }
    }
  }

  const stanzas = song.lyricsWithChords.split('\n\n');

  stanzas.forEach((rawStanza) => {
    const isChorus = rawStanza.startsWith('{R}');
    const stanza = isChorus ? rawStanza.slice(3) : rawStanza;

    // Check for marker lines: {Intro: G Dm C Am}, {Bridge: ...}
    const markerMatch = stanza.match(/^\{(\w+):\s*(.+)\}$/);
    if (markerMatch) {
      const label = markerMatch[1];
      const chords = markerMatch[2].trim().split(/\s+/);

      advance(chordLineHeight + stanzaGap);
      renderMarkerLine(doc, label, chords, getX(), y, semitones, lyricsFontSize, chordFontSize);
      y += chordLineHeight + stanzaGap;
      return;
    }

    // Record where verses start (after any intro/bridge markers)
    if (verseStartY == null && col === 0) {
      verseStartY = y;
    }

    const lines = stanza.split('\n');
    const hasChords = lines.some((l) => /\[[A-G]/.test(l));
    const estimatedHeight =
      lines.length * (lineHeight + (hasChords ? chordLineHeight : 0)) + stanzaGap;

    if (y + estimatedHeight > maxY) {
      advance(estimatedHeight);
    }

    lines.forEach((line) => {
      const segments = parseSegments(line);
      const lineHasChords = segments.some((s) => s.chord);
      const needed = lineHeight + (lineHasChords ? chordLineHeight + 1 : 0);

      advance(needed);

      const x = getX();

      if (lineHasChords) {
        let cx = x;

        segments.forEach((seg) => {
          if (seg.chord) {
            const transposed = transposeChord(seg.chord, semitones);
            drawChordBadge(doc, transposed, cx, y, chordFontSize);
          }

          doc.setFont('Nunito', 'bold');
          doc.setFontSize(lyricsFontSize);
          cx += doc.getTextWidth(seg.text);
        });

        y += chordLineHeight + 1;
      }

      doc.setFont('Nunito', 'bold');
      doc.setFontSize(lyricsFontSize);
      doc.setTextColor(...(isChorus ? GREEN_DARK : BLACK));

      const plainText = line.replace(/\[([A-G][#b]?[a-z0-9]*)\]/g, '');
      const wrappedLines = doc.splitTextToSize(plainText, effectiveColWidth);
      wrappedLines.forEach((wl) => {
        advance(lineHeight);
        doc.text(wl, getX(), y);
        y += lineHeight;
      });
    });

    y += stanzaGap;
  });

  // Draw separators only on pages that used both columns
  const currentPage = doc.internal.getNumberOfPages();
  separatorPages.forEach((pageNum) => {
    doc.setPage(pageNum);
    drawColSeparator(doc, marginLeft, colWidth, colGap, startY, maxY);
  });
  doc.setPage(currentPage);

  return y;
}

function drawColSeparator(doc, marginLeft, colWidth, colGap, topY, bottomY) {
  const sepX = marginLeft + colWidth + colGap / 2;
  doc.setDrawColor(...GRAY_LIGHT);
  doc.setLineWidth(0.3);
  doc.line(sepX, topY, sepX, bottomY);
}

function drawContinuationHeader(doc, song, pageW, marginLeft) {
  doc.setFillColor(...LIGHT_GREEN);
  doc.rect(0, 0, pageW, 10, 'F');
  doc.setFont('Nunito', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...GREEN);
  doc.text(`${song.title} (cont.)`, marginLeft, 7);
}

// ══════════════════════════════════════════════
//  SHARED: Cover page (white, print-friendly)
// ══════════════════════════════════════════════

function drawCover(doc, songs, title, description, logoData, pageW, pageH, marginLeft, marginRight) {
  if (logoData) {
    doc.addImage(logoData, 'PNG', pageW / 2 - 18, 35, 36, 36);
  }

  doc.setDrawColor(...GREEN);
  doc.setLineWidth(0.8);
  doc.line(pageW / 2 - 35, 80, pageW / 2 + 35, 80);

  doc.setFont('Nunito', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(...BLACK);
  const titleLines = doc.splitTextToSize(title, pageW - 50);
  doc.text(titleLines, pageW / 2, 96, { align: 'center' });

  let descEndY = 96 + titleLines.length * 11;
  if (description) {
    doc.setFont('Nunito', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...GRAY);
    const descLines = doc.splitTextToSize(description, pageW - 70);
    doc.text(descLines, pageW / 2, descEndY + 2, { align: 'center' });
    descEndY += 2 + descLines.length * 5;
  }

  doc.setDrawColor(...GRAY_LIGHT);
  doc.setLineWidth(0.3);
  doc.line(pageW / 2 - 30, descEndY + 10, pageW / 2 + 30, descEndY + 10);

  const indexStartY = descEndY + 20;
  doc.setFontSize(8.5);
  songs.forEach((song, i) => {
    const itemY = indexStartY + i * 6;
    doc.setFont('Nunito', 'bold');
    doc.setTextColor(...GREEN);
    doc.text(String(i + 1).padStart(2, '0'), pageW / 2 - 32, itemY);
    doc.setTextColor(...GRAY_LIGHT);
    doc.text('·', pageW / 2 - 23, itemY);
    doc.setFont('Nunito', 'normal');
    doc.setTextColor(...BLACK);
    doc.text(song.title, pageW / 2 - 19, itemY);
  });

  doc.setDrawColor(...GREEN);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, pageH - 16, pageW - marginRight, pageH - 16);
  doc.setFont('Nunito', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  doc.text('Agrupamento 80 — Santa Maria de Belém', pageW / 2, pageH - 11, { align: 'center' });
}

// ══════════════════════════════════════════════
//  SHARED: Footer on song pages
// ══════════════════════════════════════════════

function drawPageFooter(doc, pdfTitle, pageNum, marginLeft, marginRight, pageW, pageH) {
  doc.setDrawColor(...GREEN);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, pageH - 13, pageW - marginRight, pageH - 13);

  doc.setFont('Nunito', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  doc.text(`${pdfTitle}  •  Agrupamento 80`, marginLeft, pageH - 9);

  doc.setFont('Nunito', 'bold');
  doc.setTextColor(...GREEN);
  doc.text(`${pageNum}`, pageW - marginRight, pageH - 9, { align: 'right' });
}

// ══════════════════════════════════════════════
//  BOOKLET: Render cover at arbitrary position
// ══════════════════════════════════════════════

function renderBookletCover(doc, songs, title, description, logoData, ox, oy, pw, ph) {
  const cx = ox + pw / 2;
  const margin = 10;

  if (logoData) {
    doc.addImage(logoData, 'PNG', cx - 14, oy + 18, 28, 28);
  }

  doc.setDrawColor(...GREEN);
  doc.setLineWidth(0.6);
  doc.line(cx - 25, oy + 52, cx + 25, oy + 52);

  doc.setFont('Nunito', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...BLACK);
  const tLines = doc.splitTextToSize(title, pw - margin * 2);
  doc.text(tLines, cx, oy + 64, { align: 'center' });

  let endY = oy + 64 + tLines.length * 8;

  if (description) {
    doc.setFont('Nunito', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...GRAY);
    const dLines = doc.splitTextToSize(description, pw - margin * 2 - 10);
    doc.text(dLines, cx, endY + 2, { align: 'center' });
    endY += 2 + dLines.length * 4;
  }

  doc.setDrawColor(...GRAY_LIGHT);
  doc.setLineWidth(0.2);
  doc.line(cx - 22, endY + 6, cx + 22, endY + 6);

  let listY = endY + 14;
  doc.setFontSize(7);
  songs.forEach((song, i) => {
    doc.setFont('Nunito', 'bold');
    doc.setTextColor(...GREEN);
    doc.text(String(i + 1).padStart(2, '0'), cx - 28, listY);
    doc.setTextColor(...GRAY_LIGHT);
    doc.text('·', cx - 20, listY);
    doc.setFont('Nunito', 'normal');
    doc.setTextColor(...BLACK);
    doc.text(song.title, cx - 16, listY);
    listY += 4.5;
  });

  doc.setDrawColor(...GREEN);
  doc.setLineWidth(0.4);
  doc.line(ox + margin, oy + ph - 12, ox + pw - margin, oy + ph - 12);
  doc.setFont('Nunito', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(...GRAY);
  doc.text('Agrupamento 80 — Santa Maria de Belém', cx, oy + ph - 8, { align: 'center' });
}

// ══════════════════════════════════════════════
//  BOOKLET: Measure stanza height for pagination
// ══════════════════════════════════════════════

function measureBookletStanzaH(doc, rawStanza, contentW) {
  const fontSize = 8;
  const lh = 3.5;
  const clh = 3;
  const stanzaGap = 4;

  const isChorus = rawStanza.startsWith('{R}');
  const stanza = isChorus ? rawStanza.slice(3) : rawStanza;

  const markerMatch = stanza.match(/^\{(\w+):\s*(.+)\}$/);
  if (markerMatch) return clh + stanzaGap;

  let h = 0;
  const lines = stanza.split('\n');

  lines.forEach((line) => {
    const segments = parseSegments(line);
    const hasChords = segments.some((s) => s.chord);
    if (hasChords) h += clh + 0.5;

    doc.setFont('Nunito', 'bold');
    doc.setFontSize(fontSize);
    const plain = line.replace(/\[([A-G][#b]?[a-z0-9]*)\]/g, '');
    const wrappedLines = doc.splitTextToSize(plain, contentW);
    h += wrappedLines.length * lh;
  });

  h += stanzaGap;
  return h;
}

// ══════════════════════════════════════════════
//  BOOKLET: Render a song page (stanza range)
// ══════════════════════════════════════════════

function renderBookletSongPage(doc, song, logoData, ox, oy, pw, ph, pageNum, stanzaStart, stanzaEnd, isContinuation) {
  const margin = 10;
  const contentX = ox + margin;
  const contentW = pw - margin * 2;
  const maxY = oy + ph - 12;

  let y;

  if (isContinuation) {
    const barH = 10;
    doc.setFillColor(...LIGHT_GREEN);
    doc.rect(ox, oy, pw, barH, 'F');
    doc.setFont('Nunito', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...GREEN);
    doc.text(`${song.title} (cont.)`, contentX, oy + 6.5);
    y = oy + barH + 4;
  } else {
    const barH = 16;
    doc.setFillColor(...GREEN);
    doc.rect(ox, oy, pw, barH, 'F');

    if (logoData) {
      doc.addImage(logoData, 'PNG', ox + pw - margin - 11, oy + 2.5, 11, 11);
    }

    doc.setFont('Nunito', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...WHITE);
    doc.text(song.title, contentX, oy + (song.author ? 7 : 9));

    if (song.author) {
      doc.setFont('Nunito', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(200, 210, 205);
      doc.text(song.author, contentX, oy + 11);
    }

    y = oy + barH + 5;
  }

  const fontSize = 8;
  const chordSize = 5.5;
  const lh = 3.5;
  const clh = 3;
  const gap = 4;

  const stanzas = song.lyricsWithChords.split('\n\n');

  for (let si = stanzaStart; si < stanzaEnd; si++) {
    const rawStanza = stanzas[si];
    const isChorus = rawStanza.startsWith('{R}');
    const stanza = isChorus ? rawStanza.slice(3) : rawStanza;

    const markerMatch = stanza.match(/^\{(\w+):\s*(.+)\}$/);
    if (markerMatch) {
      if (y > maxY) continue;
      const label = markerMatch[1];
      const chords = markerMatch[2].trim().split(/\s+/);
      renderMarkerLine(doc, label, chords, contentX, y, 0, fontSize, chordSize);
      y += clh + gap;
      continue;
    }

    const lines = stanza.split('\n');

    lines.forEach((line) => {
      if (y > maxY) return;

      const segments = parseSegments(line);
      const hasChords = segments.some((s) => s.chord);

      if (hasChords) {
        let cx = contentX;
        doc.setFont('Nunito', 'bold');
        doc.setFontSize(chordSize);

        segments.forEach((seg) => {
          if (seg.chord) {
            drawChordBadge(doc, seg.chord, cx, y, chordSize);
          }
          doc.setFont('Nunito', 'bold');
          doc.setFontSize(fontSize);
          cx += doc.getTextWidth(seg.text);
        });

        y += clh + 0.5;
      }

      doc.setFont('Nunito', 'bold');
      doc.setFontSize(fontSize);
      doc.setTextColor(...(isChorus ? GREEN_DARK : BLACK));
      const plain = line.replace(/\[([A-G][#b]?[a-z0-9]*)\]/g, '');
      const wrappedLines = doc.splitTextToSize(plain, contentW);
      wrappedLines.forEach((wl) => {
        if (y > maxY) return;
        doc.text(wl, contentX, y);
        y += lh;
      });
    });

    y += gap;
  }

  // Footer
  doc.setDrawColor(...GREEN);
  doc.setLineWidth(0.3);
  doc.line(ox + margin, oy + ph - 9, ox + pw - margin, oy + ph - 9);
  doc.setFont('Nunito', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(...GREEN);
  doc.text(`${pageNum}`, ox + pw - margin, oy + ph - 5.5, { align: 'right' });
}

// ══════════════════════════════════════════════
//  BOOKLET: Imposition order
// ══════════════════════════════════════════════

function getBookletPairs(totalPages) {
  const pairs = [];
  const sheets = totalPages / 4;

  for (let i = 0; i < sheets; i++) {
    pairs.push([totalPages - 2 * i, 2 * i + 1]);
    pairs.push([2 * i + 2, totalPages - 2 * i - 1]);
  }

  return pairs;
}

// ══════════════════════════════════════════════
//  MAIN EXPORT
// ══════════════════════════════════════════════

export async function generateCompilationPdf({ songs, title, description, layout, customLogo }) {
  const logoData = await loadImage(faviconUrl);
  const coverLogo = customLogo || logoData;

  // ── Booklet mode ──
  if (layout === 'booklet') {
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
    await registerNunito(doc);
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const halfW = pageW / 2;

    const margin = 10;
    const contentW = halfW - margin * 2;
    const firstHeaderH = 16 + 5;
    const contHeaderH = 10 + 4;
    const footerSpace = 12;

    // Build virtual page list with multi-page song support
    const vPages = [{ type: 'cover' }];

    songs.forEach((song, songIdx) => {
      const stanzas = song.lyricsWithChords.split('\n\n');
      let stanzaStart = 0;
      let isFirst = true;

      while (stanzaStart < stanzas.length) {
        const headerH = isFirst ? firstHeaderH : contHeaderH;
        const availableH = pageH - headerH - footerSpace;
        let usedH = 0;
        let stanzaEnd = stanzaStart;

        for (let i = stanzaStart; i < stanzas.length; i++) {
          const h = measureBookletStanzaH(doc, stanzas[i], contentW);
          if (usedH + h > availableH && i > stanzaStart) break;
          usedH += h;
          stanzaEnd = i + 1;
        }

        vPages.push({
          type: 'song',
          songIndex: songIdx,
          stanzaStart,
          stanzaEnd,
          isContinuation: !isFirst,
        });

        stanzaStart = stanzaEnd;
        isFirst = false;
      }
    });

    // Pad to multiple of 4
    const totalVPages = Math.ceil(vPages.length / 4) * 4;
    while (vPages.length < totalVPages) {
      vPages.push({ type: 'blank' });
    }

    const pairs = getBookletPairs(totalVPages);

    pairs.forEach(([leftVP, rightVP], idx) => {
      if (idx > 0) doc.addPage();

      doc.setDrawColor(...GRAY_LIGHT);
      doc.setLineWidth(0.2);
      doc.line(halfW, 0, halfW, pageH);

      // Render left half
      const leftPage = vPages[leftVP - 1];
      if (leftPage) {
        if (leftPage.type === 'cover') {
          renderBookletCover(doc, songs, title, description, coverLogo, 0, 0, halfW, pageH);
        } else if (leftPage.type === 'song') {
          renderBookletSongPage(doc, songs[leftPage.songIndex], logoData, 0, 0, halfW, pageH, leftVP - 1, leftPage.stanzaStart, leftPage.stanzaEnd, leftPage.isContinuation);
        }
      }

      // Render right half
      const rightPage = vPages[rightVP - 1];
      if (rightPage) {
        if (rightPage.type === 'cover') {
          renderBookletCover(doc, songs, title, description, coverLogo, halfW, 0, halfW, pageH);
        } else if (rightPage.type === 'song') {
          renderBookletSongPage(doc, songs[rightPage.songIndex], logoData, halfW, 0, halfW, pageH, rightVP - 1, rightPage.stanzaStart, rightPage.stanzaEnd, rightPage.isContinuation);
        }
      }
    });

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    doc.save(`${slug || 'cancioneiro'}-livro.pdf`);
    return;
  }

  // ── Vertical / Horizontal modes ──
  const isHorizontal = layout === 'horizontal';
  const orientation = isHorizontal ? 'landscape' : 'portrait';
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation });
  await registerNunito(doc);
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginLeft = 15;
  const marginRight = 15;
  const marginBottom = 18;
  const maxY = pageH - marginBottom;

  // Cover
  drawCover(doc, songs, title, description, coverLogo, pageW, pageH, marginLeft, marginRight);

  // Song pages
  const colGap = isHorizontal ? 12 : 10;
  const colWidth = (pageW - marginLeft - marginRight - colGap) / 2;
  const renderOpts = { lyricsFontSize: 9, chordFontSize: 5.5, lineHeight: 4, chordLineHeight: 3.5, stanzaGap: 5 };

  songs.forEach((song) => {
    doc.addPage();
    const startY = drawSongHeader(doc, song, pageW, marginLeft, marginRight, logoData);
    renderSongTwoCol(doc, song, marginLeft, colWidth, colGap, startY, maxY, pageW, renderOpts);
  });

  // Footers
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    drawPageFooter(doc, title, i - 1, marginLeft, marginRight, pageW, pageH);
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  doc.save(`${slug || 'cancioneiro'}.pdf`);
}
