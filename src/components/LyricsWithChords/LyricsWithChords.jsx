import { useState, useCallback } from 'react';
import { transposeChord, chordToSolfege } from '../../config/chords';
import ChordDiagram from '../ChordDiagram/ChordDiagram';
import styles from './LyricsWithChords.module.css';

function ChordLabel({ chord, semitones, solfege, variantMap, onChangeVariant }) {
  const transposed = transposeChord(chord, semitones);
  const display = solfege ? chordToSolfege(transposed) : transposed;
  const [hovering, setHovering] = useState(false);

  return (
    <span
      className={styles.chordAnchor}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <span className={styles.chord}>{display}</span>
      {hovering && (
        <ChordDiagram
          transposedChord={transposed}
          variantIndex={variantMap[transposed] || 0}
          onChangeVariant={(dir) => onChangeVariant(transposed, dir)}
        />
      )}
    </span>
  );
}

/**
 * Parse a line into segments: [{ chord: string|null, text: string }]
 * Each chord annotation [X] starts a new segment whose text runs
 * until the next chord or end of line.
 */
function parseSegments(line) {
  const segments = [];
  // Split by chord markers, keeping the captured chord name
  const parts = line.split(/\[([A-G][#b]?[a-z0-9]*)\]/);
  // parts alternates: text, chordName, text, chordName, text, ...
  // parts[0] is text before first chord (may be empty)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Even index = text segment
      if (i === 0 && parts[i]) {
        // Text before the first chord — no chord attached
        segments.push({ chord: null, text: parts[i] });
      }
      // If i > 0, this text belongs to the chord from parts[i-1],
      // already handled below
    } else {
      // Odd index = chord name; next part (i+1) is its text
      const chordName = parts[i];
      const text = (i + 1 < parts.length) ? parts[i + 1] : '';
      segments.push({ chord: chordName, text });
    }
  }

  // If the line had no chords at all
  if (segments.length === 0) {
    segments.push({ chord: null, text: line });
  }

  return segments;
}

function stripChords(line) {
  return line.replace(/\[([A-G][#b]?[a-z0-9]*)\]/g, '');
}

export default function LyricsWithChords({
  lyricsWithChords,
  showChords,
  semitones,
  solfege,
}) {
  const [variantMap, setVariantMap] = useState({});

  const handleChangeVariant = useCallback((chordName, dir) => {
    setVariantMap((prev) => {
      const current = prev[chordName] || 0;
      const next = ((current + dir) % 3 + 3) % 3;
      return { ...prev, [chordName]: next };
    });
  }, []);

  const stanzas = lyricsWithChords.split('\n\n');

  return (
    <div className={styles.lyrics}>
      {stanzas.map((rawStanza, si) => {
        const isChorus = rawStanza.startsWith('{R}');
        const stanza = isChorus ? rawStanza.slice(3) : rawStanza;

        // Check for chord-only markers: {Intro: G Dm C Am}, {Bridge: Dm C Am}
        const markerMatch = stanza.match(/^\{(\w+):\s*(.+)\}$/);
        if (markerMatch) {
          if (!showChords) return null;
          const label = markerMatch[1];
          const tokens = markerMatch[2].trim().split(/\s+/);
          const chordPattern = /^[A-G][#b]?[a-z0-9]*$/;
          return (
            <div key={si} className={styles.introLine}>
              <span className={styles.introLabel}>{label}:</span>
              {tokens.map((token, ci) =>
                chordPattern.test(token) ? (
                  <ChordLabel
                    key={ci}
                    chord={token}
                    semitones={semitones}
                    solfege={solfege}
                    variantMap={variantMap}
                    onChangeVariant={handleChangeVariant}
                  />
                ) : (
                  <span key={ci} className={styles.introAnnotation}>{token}</span>
                )
              )}
            </div>
          );
        }

        return (
        <div key={si} className={`${styles.stanza} ${isChorus ? styles.stanzaChorus : ''}`}>
          {stanza.split('\n').map((line, li) => {
            if (!showChords) {
              return (
                <div key={li} className={styles.lyricLine}>
                  {stripChords(line)}
                </div>
              );
            }

            const segments = parseSegments(line);
            const hasChords = segments.some((s) => s.chord);

            return (
              <div key={li} className={`${styles.lyricLine} ${hasChords ? styles.lyricLineWithChords : ''}`}>
                {segments.map((seg, si2) => (
                  <span key={si2} className={seg.chord ? styles.segment : styles.segmentPlain}>
                    {seg.chord && (
                      <span className={styles.chordAbove}>
                        <ChordLabel
                          chord={seg.chord}
                          semitones={semitones}
                          solfege={solfege}
                          variantMap={variantMap}
                          onChangeVariant={handleChangeVariant}
                        />
                      </span>
                    )}
                    <span>{seg.chord && !seg.text.trim()
                      ? '\u00A0'.repeat(Math.max(2, seg.text.length))
                      : seg.text}</span>
                  </span>
                ))}
              </div>
            );
          })}
        </div>
        );
      })}
    </div>
  );
}
