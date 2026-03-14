import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { chordDb, lookupChord } from '../../config/chords';
import styles from './ChordDiagram.module.css';

const STRING_COUNT = 6;
const FRET_COUNT = 4;

function DiagramSVG({ name, fingers, startFret = 1 }) {
  const w = 80;
  const h = 100;
  const padTop = 22;
  const padLeft = 14;
  const padRight = 6;
  const fretH = (h - padTop - 8) / FRET_COUNT;
  const stringGap = (w - padLeft - padRight) / (STRING_COUNT - 1);

  const isOpen = startFret === 1;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={styles.svg}>
      {/* Chord name */}
      <text x={w / 2} y={12} textAnchor="middle" className={styles.chordLabel}>
        {name}
      </text>

      {/* Nut or fret indicator */}
      {isOpen ? (
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
          x={padLeft - 8}
          y={padTop + fretH / 2 + 4}
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
          strokeWidth={i === 0 && !isOpen ? 1.5 : 1}
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
        if (fret === 0) {
          return (
            <circle
              key={i}
              cx={x}
              cy={padTop - 6}
              r={3.5}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth={1.5}
            />
          );
        }
        const displayFret = isOpen ? fret : fret - startFret + 1;
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
