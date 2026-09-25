import { Fragment, useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { transposeChord, chordToSolfege } from '../../config/chords';
import ChordDiagram from '../ChordDiagram/ChordDiagram';
import styles from './LyricsWithChords.module.css';

const EDGE_MARGIN = 8;

// A chord opens its diagram three ways: mouse hover previews it; a tap, click or Enter pins it
// open (the only path on touch and keyboard); Escape or a tap elsewhere closes it.
function ChordLabel({ chord, semitones, solfege, variantMap, onChangeVariant }) {
  const transposed = transposeChord(chord, semitones);
  const display = chordName(chord, semitones, solfege);
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const anchorRef = useRef(null);
  const buttonRef = useRef(null);
  const open = hovering || pinned;

  useEffect(() => {
    if (!pinned) return;
    const onPointerDown = (e) => {
      if (!anchorRef.current?.contains(e.target)) setPinned(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [pinned]);

  // Keep the popup inside the viewport: nudged sideways near a screen edge, and opened below the
  // chord when above would put it under the sticky header or off the top of the screen
  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    anchor.style.setProperty('--popup-shift', '0px');
    delete anchor.dataset.below;
    if (!open) return;
    const popup = anchor.lastElementChild;
    if (!popup || popup === buttonRef.current) return;
    const r = popup.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    let shift = 0;
    if (r.left < EDGE_MARGIN) shift = EDGE_MARGIN - r.left;
    else if (r.right > vw - EDGE_MARGIN) shift = vw - EDGE_MARGIN - r.right;
    anchor.style.setProperty('--popup-shift', `${shift}px`);

    const ceiling = (document.querySelector('header')?.getBoundingClientRect().bottom ?? 0) + EDGE_MARGIN;
    const chord = anchor.getBoundingClientRect();
    const roomBelow = window.innerHeight - chord.bottom - EDGE_MARGIN;
    if (r.top < ceiling && roomBelow > chord.top - ceiling) anchor.dataset.below = '';
  }, [open]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      setPinned(false);
      setHovering(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <span
      ref={anchorRef}
      className={`${styles.chordAnchor} ${open ? styles.chordOpen : ''}`}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovering(true); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovering(false); }}
      onKeyDown={handleKeyDown}
      // Moving to another chord (or out of the lyrics) closes a diagram pinned from the keyboard
      onBlur={(e) => { if (pinned && !e.currentTarget.contains(e.relatedTarget)) setPinned(false); }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={styles.chord}
        data-chord=""
        aria-expanded={open}
        aria-label={`Acorde ${display}: mostrar diagrama`}
        onClick={() => setPinned((p) => !p)}
      >
        {display}
      </button>
      {open && (
        <ChordDiagram
          transposedChord={transposed}
          displayName={display}
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
  const parts = line.split(/\[([A-G][#b]?[a-z0-9]*(?:\/[A-G][#b]?)?)\]/);
  // parts alternates: text, chordName, text, chordName, text, ...
  // parts[0] is text before first chord (may be empty)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Even index = text segment
      if (i === 0 && parts[i]) {
        // Text before the first chord - no chord attached
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

  // A chord with no lyric after it (e.g. "…do [G]mundo  [Em]") must stay on the word
  // before it; otherwise the spaces between them let the chord wrap onto its own row.
  // Only that one junction is made non-breaking, so the rest of the line still wraps.
  // Between two lyric-less chords (an instrumental run: "[G]   [C]   [F]") the space stays
  // breakable, so a run wider than the line wraps between chords instead of being forced apart.
  for (let i = 1; i < segments.length; i++) {
    const prev = segments[i - 1];
    if (segments[i].chord && !segments[i].text.trim() && prev.text.trim()) {
      prev.text = prev.text.replace(/\s+$/, (ws) => '\u00A0'.repeat(ws.length));
    }
  }

  // If the line had no chords at all
  if (segments.length === 0) {
    segments.push({ chord: null, text: line });
  }

  return segments;
}

function chordName(chord, semitones, solfege) {
  const transposed = transposeChord(chord, semitones);
  return solfege ? chordToSolfege(transposed) : transposed;
}

function stripChords(line) {
  return line.replace(/\[([A-G][#b]?[a-z0-9]*(?:\/[A-G][#b]?)?)\]/g, '');
}

export default function LyricsWithChords({
  lyricsWithChords,
  showChords,
  semitones,
  solfege,
  scale = 1,
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

  // The chords are one tab stop, not one each (a song can have 90): Tab lands on the current
  // chord, arrows and Home/End move between chords, and a click or tap moves the stop there too.
  // Kept in the DOM so ChordLabel's hover/tap/Enter/Escape behaviour is untouched.
  const lyricsRef = useRef(null);
  const activeChord = useRef(0);
  useEffect(() => {
    const chords = lyricsRef.current?.querySelectorAll('button[data-chord]') ?? [];
    if (activeChord.current >= chords.length) activeChord.current = 0;
    chords.forEach((c, i) => { c.tabIndex = i === activeChord.current ? 0 : -1; });
  });

  function moveTo(chords, i) {
    chords[activeChord.current]?.setAttribute('tabindex', '-1');
    activeChord.current = i;
    chords[i].tabIndex = 0;
    chords[i].focus();
  }

  function onChordKey(e) {
    if (!e.target.matches?.('button[data-chord]')) return;
    const chords = [...lyricsRef.current.querySelectorAll('button[data-chord]')];
    const i = chords.indexOf(e.target);
    const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: chords.length - 1 }[e.key];
    if (next === undefined || next < 0 || next >= chords.length) return;
    e.preventDefault();
    moveTo(chords, next);
  }

  function onChordFocus(e) {
    if (!e.target.matches?.('button[data-chord]')) return;
    const chords = [...lyricsRef.current.querySelectorAll('button[data-chord]')];
    const i = chords.indexOf(e.target);
    if (i !== activeChord.current) moveTo(chords, i);
  }

  return (
    <div
      className={styles.lyrics}
      ref={lyricsRef}
      onKeyDown={onChordKey}
      onFocus={onChordFocus}
      style={scale !== 1 ? { '--lyrics-scale': scale } : undefined}
    >
      {stanzas.map((rawStanza, si) => {
        const isChorus = rawStanza.startsWith('{R}');
        const stanza = isChorus ? rawStanza.slice(3) : rawStanza;

        // Check for chord-only markers: {Intro: G Dm C Am}, {Bridge: Dm C Am}
        const markerMatch = stanza.match(/^\{(\w+):\s*(.+)\}$/);
        if (markerMatch) {
          if (!showChords) return null;
          const label = markerMatch[1];
          const tokens = markerMatch[2].trim().split(/\s+/);
          const chordPattern = /^[A-G][#b]?[a-z0-9]*(?:\/[A-G][#b]?)?$/;
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
          {isChorus && <p className={styles.chorusLabel}>Refrão</p>}
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
                {segments.map((seg, si2) => {
                  // A syllable narrower than its chord (a short word, no spaces to wrap at) holds the
                  // chord's width, so the next chord starts after this one instead of on top of it
                  const name = seg.chord && chordName(seg.chord, semitones, solfege);
                  const core = seg.text.replace(/\s+$/, '');
                  // Only a whole word may hold the chord's width: an inline-block can wrap on its own,
                  // so a syllable inside a word (ca·mi·nhar) must stay plain text or the word would split.
                  // Plain spaces only: a non-breaking space (see parseSegments) is glue, not a word gap.
                  const startsWord = si2 === 0 || /[ \t]$/.test(segments[si2 - 1].text);
                  const endsWord = si2 === segments.length - 1 || /[ \t]/.test(seg.text.slice(core.length));
                  const short = seg.chord && core && !/\s/.test(core) && core.length <= name.length + 1 && startsWord && endsWord;
                  // Spaces at the edge of an inline-block collapse, so the trailing one goes outside
                  const trail = short ? seg.text.slice(core.length) : '';
                  return (
                  <Fragment key={si2}>
                  <span
                    className={`${seg.chord ? styles.segment : styles.segmentPlain} ${short ? styles.segmentShort : ''}`}
                    style={short ? { '--chord-chars': name.length } : undefined}
                  >
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
                    {seg.chord && !seg.text.trim() ? (
                      // No lyric under this chord: hold room for its own name (as displayed,
                      // after transposing or Dó Ré Mi), so the next chord can't sit on top of it
                      <span
                        className={styles.chordSpace}
                        style={{ '--chord-chars': name.length }}
                      >
                        {'\u00A0'}
                      </span>
                    ) : (
                      <span>{short ? core : seg.text}</span>
                    )}
                  </span>
                  {trail && <span>{trail}</span>}
                  </Fragment>
                  );
                })}
              </div>
            );
          })}
        </div>
        );
      })}
    </div>
  );
}
