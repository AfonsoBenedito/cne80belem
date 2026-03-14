import { jsPDF } from 'jspdf';
import { transposeChord } from '../config/chords';
import faviconUrl from '/favicon.png';

const GREEN = [84, 155, 139];
const BLACK = [26, 26, 26];
const GRAY = [115, 115, 115];
const LIGHT_GREEN = [230, 243, 240];

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

export async function generateSongPdf(song, semitones = 0, showChords = true) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginLeft = 15;
  const marginRight = 15;
  const marginTop = 20;
  const contentW = pageW - marginLeft - marginRight;
  const colGap = 8;
  const colW = (contentW - colGap) / 2;
  const footerY = pageH - 16;

  const lyricsFontSize = 9;
  const chordFontSize = 5.5;
  const lineHeight = 4.5;
  const chordLineHeight = 3.5;
  const stanzaGap = 5;

  const logoData = await loadImage(faviconUrl);

  // ── Two-column state ──
  let col = 0; // 0 = left, 1 = right
  let y = 0;
  let colStartY = 0;
  let verseStartY = null; // Y after markers, so right col aligns with verses
  let usedRightCol = false;

  function colX() {
    return marginLeft + col * (colW + colGap);
  }

  function advanceColumn() {
    if (col === 0) {
      col = 1;
      usedRightCol = true;
      y = verseStartY != null ? verseStartY : colStartY;
      return false;
    }
    // Both columns used, new page
    doc.addPage();
    col = 0;
    y = marginTop;
    colStartY = marginTop;
    verseStartY = null;
    return true;
  }

  function checkSpace(needed) {
    if (y + needed > footerY) {
      advanceColumn();
    }
  }

  // ── Header bar ──
  const headerH = 22;
  doc.setFillColor(...GREEN);
  doc.rect(0, 0, pageW, headerH, 'F');

  if (logoData) {
    doc.addImage(logoData, 'PNG', pageW - marginRight - 17, 2.5, 17, 17);
  }
  const textX = marginLeft;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  const titleY = song.author ? 11 : 13;
  doc.text(song.title, textX, titleY);

  if (song.author) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(200, 210, 205);
    doc.text(song.author, textX, titleY + 4.5);
  }

  y = headerH + 10;
  colStartY = y;

  // ── Render stanzas ──
  const stanzas = song.lyricsWithChords.split('\n\n');

  stanzas.forEach((rawStanza) => {
    const isChorus = rawStanza.startsWith('{R}');
    const stanza = isChorus ? rawStanza.slice(3) : rawStanza;

    // Check for marker lines: {Intro: G Dm C Am}, {Bridge: ...}
    const markerMatch = stanza.match(/^\{(\w+):\s*(.+)\}$/);
    if (markerMatch) {
      if (!showChords) return;
      const label = markerMatch[1];
      const chords = markerMatch[2].trim().split(/\s+/);

      checkSpace(chordLineHeight + stanzaGap);

      const x = colX();
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(lyricsFontSize);
      doc.setTextColor(...GRAY);
      doc.text(`${label}:`, x, y);

      let cx = x + doc.getTextWidth(`${label}:`) + 3;
      doc.setFontSize(chordFontSize);
      chords.forEach((chord) => {
        const transposed = transposeChord(chord, semitones);
        const cw = doc.getTextWidth(transposed) + 2.5;
        doc.setFillColor(...LIGHT_GREEN);
        doc.roundedRect(cx, y - 2.5, cw, 3.5, 0.8, 0.8, 'F');
        doc.setTextColor(...GREEN);
        doc.text(transposed, cx + 1.25, y);
        cx += cw + 2;
      });

      y += chordLineHeight + stanzaGap;
      return;
    }

    // Record where verses start (after any intro/bridge markers)
    if (verseStartY == null && col === 0) {
      verseStartY = y;
    }

    const lines = stanza.split('\n');

    // Estimate stanza height to try to keep it together
    const hasChords = lines.some((l) => /\[[A-G]/.test(l));
    const estimatedHeight =
      lines.length * (lineHeight + (showChords && hasChords ? chordLineHeight : 0)) +
      stanzaGap;
    checkSpace(Math.min(estimatedHeight, footerY - colStartY));

    lines.forEach((line) => {
      const segments = parseSegments(line);
      const lineHasChords = showChords && segments.some((s) => s.chord);

      checkSpace(lineHeight + (lineHasChords ? chordLineHeight + 1 : 0));

      const x = colX();

      if (lineHasChords) {
        let cx = x;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(chordFontSize);

        segments.forEach((seg) => {
          if (seg.chord) {
            const transposed = transposeChord(seg.chord, semitones);
            const cw = doc.getTextWidth(transposed) + 2.5;
            doc.setFillColor(...LIGHT_GREEN);
            doc.roundedRect(cx, y - 2.5, cw, 3.5, 0.8, 0.8, 'F');
            doc.setTextColor(...GREEN);
            doc.text(transposed, cx + 1.25, y);
          }

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(lyricsFontSize);
          cx += doc.getTextWidth(seg.text);
        });

        y += chordLineHeight + 1;
      }

      // Draw lyrics line
      doc.setFont('helvetica', isChorus ? 'bold' : 'normal');
      doc.setFontSize(lyricsFontSize);
      doc.setTextColor(...(isChorus ? GREEN : BLACK));

      const plainText = line.replace(/\[([A-G][#b]?[a-z0-9]*)\]/g, '');
      doc.text(plainText, x, y);
      y += lineHeight;
    });

    y += stanzaGap;
  });

  // ── Column separator on each page ──
  const totalPages = doc.internal.getNumberOfPages();
  const sepX = marginLeft + colW + colGap / 2;

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Separator line (only if right column was used)
    if (usedRightCol) {
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.3);
      doc.line(sepX, headerH + 4, sepX, footerY);
    }

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...GRAY);
    doc.text(
      'Agrupamento 80 — Santa Maria de Belém  •  Cancioneiro',
      marginLeft,
      pageH - 10,
    );
    doc.text(`${i}`, pageW - marginRight, pageH - 10, { align: 'right' });

    doc.setDrawColor(...GREEN);
    doc.setLineWidth(0.5);
    doc.line(marginLeft, footerY, pageW - marginRight, footerY);
  }

  doc.save(`${song.slug}.pdf`);
}
