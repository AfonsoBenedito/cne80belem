import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { chordDb, lookupChord } from '../../config/chords';
import styles from './ChordDiagram.module.css';

const STRING_COUNT = 6;
const FRET_COUNT = 4;

function detectBarres(fingers, startFret) {
  const barres = [];
  // Find groups of consecutive strings at the same fret (typically startFret for barre chords)
  const candidates = new Map();
  fingers.forEach((fret, i) => {
    if (fret > 0) {
      if (!candidates.has(fret)) candidates.set(fret, []);
      candidates.get(fret).push(i);
    }
  });

  for (const [fret, strings] of candidates) {
    if (strings.length < 2) continue;
    // Find consecutive spans (ignoring muted strings in between)
    const from = strings[0];
    const to = strings[strings.length - 1];
    // Only draw barre if it spans at least 3 strings and is at the lowest fret (startFret)
    if (to - from >= 2 && fret === startFret) {
      barres.push({ fret, from, to });
    }
  }
  return barres;
}

function DiagramSVG({ name, fingers, startFret = 1 }) {
  const showNut = startFret <= 2;
  const w = 80;
  const h = 108;
  const padTop = 30;
  const padLeft = showNut ? 14 : 22;
  const padRight = 6;
  const fretH = (h - padTop - 8) / FRET_COUNT;
  const stringGap = (w - padLeft - padRight) / (STRING_COUNT - 1);

  const barres = detectBarres(fingers, startFret);
  const barreStringSet = new Set();
  barres.forEach((b) => {
    for (let s = b.from; s <= b.to; s++) {
      if (fingers[s] === b.fret) barreStringSet.add(`${b.fret}-${s}`);
    }
  });

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={styles.svg}>
      {/* Chord name */}
      <text x={w / 2} y={12} textAnchor="middle" className={styles.chordLabel}>
        {name}
      </text>

      {/* Nut or fret indicator */}
      {showNut ? (
        <rect
          x={padLeft - 1}
          y={padTop}
          width={stringGap * 5 + 2}
          height={3}
          fill="#1a1a1a"
          rx={1}
        />
      ) : (
        <text
          x={padLeft - 10}
          y={padTop + fretH / 2 + 4}
          textAnchor="middle"
          className={styles.fretNum}
        >
          {startFret}
        </text>
      )}

      {/* Fret lines */}
      {Array.from({ length: FRET_COUNT + 1 }).map((_, i) => (
        <line
          key={`f${i}`}
          x1={padLeft}
          y1={padTop + i * fretH}
          x2={padLeft + stringGap * 5}
          y2={padTop + i * fretH}
          stroke="#ccc"
          strokeWidth={i === 0 && !showNut ? 1.5 : 1}
        />
      ))}

      {/* String lines */}
      {Array.from({ length: STRING_COUNT }).map((_, i) => (
        <line
          key={`s${i}`}
          x1={padLeft + i * stringGap}
          y1={padTop}
          x2={padLeft + i * stringGap}
          y2={padTop + FRET_COUNT * fretH}
          stroke="#999"
          strokeWidth={1}
        />
      ))}

      {/* Barre bars */}
      {barres.map((b, bi) => {
        const displayFret = showNut ? b.fret : b.fret - startFret + 1;
        const cy = padTop + (displayFret - 0.5) * fretH;
        const x1 = padLeft + b.from * stringGap;
        const x2 = padLeft + b.to * stringGap;
        return (
          <rect
            key={`bar${bi}`}
            x={x1 - 4.5}
            y={cy - 4.5}
            width={x2 - x1 + 9}
            height={9}
            rx={4.5}
            fill="#1a1a1a"
          />
        );
      })}

      {/* Finger dots, mutes and opens */}
      {fingers.map((fret, i) => {
        const x = padLeft + i * stringGap;
        if (fret === -1) {
          return (
            <text
              key={i}
              x={x}
              y={padTop - 4}
              textAnchor="middle"
              className={styles.mute}
            >
              ×
            </text>
          );
        }
        if (fret === 0) return null;
        // Skip individual dots for strings covered by a barre
        if (barreStringSet.has(`${fret}-${i}`)) return null;
        const displayFret = showNut ? fret : fret - startFret + 1;
        const cy = padTop + (displayFret - 0.5) * fretH;
        return (
          <circle
            key={i}
            cx={x}
            cy={cy}
            r={4.5}
            fill="#1a1a1a"
          />
        );
      })}
    </svg>
  );
}

export default function ChordDiagram({ transposedChord, variantIndex, onChangeVariant }) {
  const variations = lookupChord(transposedChord);
  if (!variations) return null;

  const total = variations.length;
  const idx = (variantIndex || 0) % total;
  const v = variations[idx];

  return (
    <div className={styles.popup}>
      <div className={styles.inner}>
        <button
          className={styles.arrow}
          onMouseDown={(e) => { e.stopPropagation(); onChangeVariant(-1); }}
        >
          <FaChevronLeft size={10} />
        </button>
        <DiagramSVG
          name={transposedChord}
          fingers={v.fingers}
          startFret={v.startFret}
        />
        <button
          className={styles.arrow}
          onMouseDown={(e) => { e.stopPropagation(); onChangeVariant(1); }}
        >
          <FaChevronRight size={10} />
        </button>
      </div>
      <div className={styles.dots}>
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`} />
        ))}
      </div>
    </div>
  );
}
