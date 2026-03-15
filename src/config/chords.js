// Guitar chord fingering data
// Each chord has up to 3 variations
// fingers: [E, A, D, G, B, e] — fret numbers, -1 = muted, 0 = open
// barres: [{ fret, fromString, toString }] — barre indicators
// startFret: starting fret for display (default 1)

export const chordDb = {
  C:  [
    { fingers: [-1, 3, 2, 0, 1, 0], startFret: 1 },
    { fingers: [-1, 3, 5, 5, 5, 3], startFret: 3 },
    { fingers: [8, 10, 10, 9, 8, 8], startFret: 8 },
  ],
  D:  [
    { fingers: [-1, -1, 0, 2, 3, 2], startFret: 1 },
    { fingers: [-1, 5, 7, 7, 7, 5], startFret: 5 },
    { fingers: [10, 12, 12, 11, 10, 10], startFret: 10 },
  ],
  E:  [
    { fingers: [0, 2, 2, 1, 0, 0], startFret: 1 },
    { fingers: [-1, 7, 9, 9, 9, 7], startFret: 7 },
    { fingers: [12, 14, 14, 13, 12, 12], startFret: 12 },
  ],
  F:  [
    { fingers: [1, 3, 3, 2, 1, 1], startFret: 1 },
    { fingers: [-1, -1, 3, 2, 1, 1], startFret: 1 },
    { fingers: [-1, 8, 10, 10, 10, 8], startFret: 8 },
  ],
  G:  [
    { fingers: [3, 2, 0, 0, 0, 3], startFret: 1 },
    { fingers: [3, 2, 0, 0, 3, 3], startFret: 1 },
    { fingers: [-1, -1, 5, 4, 3, 3], startFret: 3 },
  ],
  A:  [
    { fingers: [-1, 0, 2, 2, 2, 0], startFret: 1 },
    { fingers: [5, 7, 7, 6, 5, 5], startFret: 5 },
    { fingers: [-1, 0, 2, 2, 2, 0], startFret: 1 },
  ],
  B:  [
    { fingers: [-1, 2, 4, 4, 4, 2], startFret: 2 },
    { fingers: [7, 9, 9, 8, 7, 7], startFret: 7 },
    { fingers: [-1, 2, 4, 4, 4, 2], startFret: 2 },
  ],
  Am: [
    { fingers: [-1, 0, 2, 2, 1, 0], startFret: 1 },
    { fingers: [5, 7, 7, 5, 5, 5], startFret: 5 },
    { fingers: [-1, 0, 2, 2, 1, 0], startFret: 1 },
  ],
  Bm: [
    { fingers: [-1, 2, 4, 4, 3, 2], startFret: 2 },
    { fingers: [7, 9, 9, 7, 7, 7], startFret: 7 },
    { fingers: [-1, 2, 4, 4, 3, 2], startFret: 2 },
  ],
  Cm: [
    { fingers: [-1, 3, 5, 5, 4, 3], startFret: 3 },
    { fingers: [8, 10, 10, 8, 8, 8], startFret: 8 },
    { fingers: [-1, 3, 5, 5, 4, 3], startFret: 3 },
  ],
  Dm: [
    { fingers: [-1, -1, 0, 2, 3, 1], startFret: 1 },
    { fingers: [-1, 5, 7, 7, 6, 5], startFret: 5 },
    { fingers: [10, 12, 12, 10, 10, 10], startFret: 10 },
  ],
  Em: [
    { fingers: [0, 2, 2, 0, 0, 0], startFret: 1 },
    { fingers: [-1, 7, 9, 9, 8, 7], startFret: 7 },
    { fingers: [0, 2, 2, 0, 0, 0], startFret: 1 },
  ],
  Gm: [
    { fingers: [3, 5, 5, 3, 3, 3], startFret: 3 },
    { fingers: [-1, -1, 5, 3, 3, 3], startFret: 3 },
    { fingers: [3, 5, 5, 3, 3, 3], startFret: 3 },
  ],
  Dm7: [
    { fingers: [-1, -1, 0, 2, 1, 1], startFret: 1 },
    { fingers: [-1, 5, 7, 5, 6, 5], startFret: 5 },
    { fingers: [-1, -1, 0, 2, 1, 1], startFret: 1 },
  ],
  G7: [
    { fingers: [3, 2, 0, 0, 0, 1], startFret: 1 },
    { fingers: [-1, -1, 5, 7, 6, 7], startFret: 5 },
    { fingers: [3, 2, 0, 0, 0, 1], startFret: 1 },
  ],
  C7: [
    { fingers: [-1, 3, 2, 3, 1, 0], startFret: 1 },
    { fingers: [8, 10, 8, 9, 8, 8], startFret: 8 },
    { fingers: [-1, 3, 2, 3, 1, 0], startFret: 1 },
  ],
  A7: [
    { fingers: [-1, 0, 2, 0, 2, 0], startFret: 1 },
    { fingers: [5, 7, 5, 6, 5, 5], startFret: 5 },
    { fingers: [-1, 0, 2, 2, 2, 3], startFret: 1 },
  ],
  B7: [
    { fingers: [-1, 2, 1, 2, 0, 2], startFret: 1 },
    { fingers: [7, 9, 7, 8, 7, 7], startFret: 7 },
    { fingers: [-1, 2, 1, 2, 0, 2], startFret: 1 },
  ],
  Bb: [
    { fingers: [-1, 1, 3, 3, 3, 1], startFret: 1 },
    { fingers: [6, 8, 8, 7, 6, 6], startFret: 6 },
    { fingers: [-1, 1, 3, 3, 3, 1], startFret: 1 },
  ],
  Eb: [
    { fingers: [-1, -1, 1, 3, 4, 3], startFret: 1 },
    { fingers: [-1, 6, 8, 8, 8, 6], startFret: 6 },
    { fingers: [-1, -1, 1, 3, 4, 3], startFret: 1 },
  ],
  D9: [
    { fingers: [-1, -1, 0, 2, 1, 0], startFret: 1 },
    { fingers: [-1, 5, 4, 5, 5, 5], startFret: 5 },
    { fingers: [-1, -1, 0, 2, 1, 2], startFret: 1 },
  ],
  G9: [
    { fingers: [3, 0, 0, 0, 0, 1], startFret: 1 },
    { fingers: [-1, -1, 5, 4, 3, 5], startFret: 3 },
    { fingers: [3, 0, 0, 0, 0, 1], startFret: 1 },
  ],
  'F#m': [
    { fingers: [2, 4, 4, 2, 2, 2], startFret: 2 },
    { fingers: [-1, -1, 4, 2, 2, 2], startFret: 2 },
    { fingers: [2, 4, 4, 2, 2, 2], startFret: 2 },
  ],
  'C#m': [
    { fingers: [-1, 4, 6, 6, 5, 4], startFret: 4 },
    { fingers: [9, 11, 11, 9, 9, 9], startFret: 9 },
    { fingers: [-1, 4, 6, 6, 5, 4], startFret: 4 },
  ],
  'C#7': [
    { fingers: [-1, 4, 3, 4, 2, -1], startFret: 1 },
    { fingers: [9, 11, 9, 10, 9, 9], startFret: 9 },
    { fingers: [-1, 4, 6, 4, 6, 4], startFret: 4 },
  ],
  Em7: [
    { fingers: [0, 2, 0, 0, 0, 0], startFret: 1 },
    { fingers: [0, 2, 2, 0, 3, 0], startFret: 1 },
    { fingers: [0, 2, 0, 0, 3, 0], startFret: 1 },
  ],
  Am7: [
    { fingers: [-1, 0, 2, 0, 1, 0], startFret: 1 },
    { fingers: [5, 7, 5, 5, 5, 5], startFret: 5 },
    { fingers: [-1, 0, 2, 2, 1, 3], startFret: 1 },
  ],
  Bm7: [
    { fingers: [-1, 2, 4, 2, 3, 2], startFret: 2 },
    { fingers: [7, 9, 7, 7, 7, 7], startFret: 7 },
    { fingers: [-1, 2, 0, 2, 0, 2], startFret: 1 },
  ],
  C9: [
    { fingers: [-1, 3, 2, 0, 3, 0], startFret: 1 },
    { fingers: [-1, 3, 2, 0, 3, 3], startFret: 1 },
    { fingers: [8, 10, 8, 9, 8, 10], startFret: 8 },
  ],
};

// Reverse enharmonic: sharp → flat for chordDb lookup
const SHARP_TO_FLAT = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb' };

/**
 * Look up chord fingerings, trying enharmonic equivalents.
 * e.g. lookupChord('A#m') will find chordDb['Bbm'] if 'A#m' doesn't exist.
 */
export function lookupChord(chord) {
  if (chordDb[chord]) return chordDb[chord];
  const match = chord.match(/^([A-G][#b]?)(.*)/);
  if (!match) return null;
  const [, root, suffix] = match;
  const alt = SHARP_TO_FLAT[root];
  return alt ? chordDb[alt + suffix] || null : null;
}

// Chromatic scale for transposing (sharps preferred)
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Enharmonic equivalents — normalise flats to sharps for lookup
const ENHARMONIC = { 'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#' };

/**
 * Transpose a chord name by a number of semitones.
 * e.g. transposeChord('Am', 2) => 'Bm'
 */
export function transposeChord(chord, semitones) {
  if (semitones === 0) return chord;

  // Parse root note and suffix (m, 7, m7, 9, etc.)
  const match = chord.match(/^([A-G][#b]?)(.*)/);
  if (!match) return chord;

  let [, root, suffix] = match;
  const normalised = ENHARMONIC[root] || root;
  const idx = NOTES.indexOf(normalised);
  if (idx === -1) return chord;

  const newIdx = ((idx + semitones) % 12 + 12) % 12;
  return NOTES[newIdx] + suffix;
}

// Solfège mapping
const TO_SOLFEGE = { C: 'Dó', D: 'Ré', E: 'Mi', F: 'Fá', G: 'Sol', A: 'Lá', B: 'Si' };

/**
 * Convert a chord from letter notation to solfège.
 * e.g. 'C#m7' => 'Dó#m7', 'Am' => 'Lám'
 */
export function chordToSolfege(chord) {
  const match = chord.match(/^([A-G])([#b]?)(.*)/);
  if (!match) return chord;
  const [, root, accidental, suffix] = match;
  const solfege = TO_SOLFEGE[root];
  return solfege ? solfege + accidental + suffix : chord;
}
