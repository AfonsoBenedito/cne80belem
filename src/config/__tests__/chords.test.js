import { describe, it, expect } from 'vitest';
import { transposeChord, chordToSolfege } from '../chords';

describe('transposeChord', () => {
  it('wraps around the octave in both directions', () => {
    expect(transposeChord('Am', 2)).toBe('Bm');
    expect(transposeChord('C', -1)).toBe(transposeChord('C', 11));
    expect(transposeChord('G7', 12)).toBe('G7');
  });

  it('moves the bass of a slash chord too', () => {
    expect(transposeChord('D/F#', 2)).toBe('E/G#');
    expect(transposeChord('C/G', -2)).toBe('A#/F');
  });
});

describe('chordToSolfege', () => {
  it('names both notes of a slash chord', () => {
    expect(chordToSolfege('D/F#')).toBe('Ré/Fá#');
    expect(chordToSolfege('Am7')).toBe('Lám7');
  });
});
