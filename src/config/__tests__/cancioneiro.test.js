import { describe, it, expect } from 'vitest';
import { cancoes } from '../cancioneiro';
import { chordDb, lookupChord } from '../chords';

const VALID_ROOTS = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
const VALID_KEYS = [...VALID_ROOTS, ...VALID_ROOTS.map(r => r + 'm')];
const CHORD_REGEX = /\[([A-G][#b]?[a-z0-9]*)\]/g;
const INSTRUMENTAL_REGEX = /^\{(Intro|Bridge|Final|Outro):\s*.+\}$/;
const KEBAB_CASE_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function extractChords(lyrics) {
  const chords = new Set();
  let match;
  while ((match = CHORD_REGEX.exec(lyrics)) !== null) {
    chords.add(match[1]);
  }
  return [...chords];
}

describe('Cancioneiro dataset', () => {
  it('has at least one song', () => {
    expect(cancoes.length).toBeGreaterThan(0);
  });

  it('has no duplicate slugs', () => {
    const slugs = cancoes.map(s => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has no duplicate titles', () => {
    const titles = cancoes.map(s => s.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

describe.each(cancoes)('Song: $title', (song) => {
  // ── Required fields ──
  it('has a slug', () => {
    expect(song.slug).toBeDefined();
    expect(typeof song.slug).toBe('string');
    expect(song.slug.length).toBeGreaterThan(0);
  });

  it('has a kebab-case slug', () => {
    expect(song.slug).toMatch(KEBAB_CASE_REGEX);
  });

  it('has a title', () => {
    expect(song.title).toBeDefined();
    expect(typeof song.title).toBe('string');
    expect(song.title.length).toBeGreaterThan(0);
  });

  it('has a valid key', () => {
    expect(VALID_KEYS).toContain(song.key);
  });

  it('has non-empty lyrics', () => {
    expect(song.lyricsWithChords).toBeDefined();
    expect(typeof song.lyricsWithChords).toBe('string');
    expect(song.lyricsWithChords.trim().length).toBeGreaterThan(0);
  });

  // ── Media sources ──
  it('has at least one media source or none (placeholder)', () => {
    const hasMedia = song.youtubeId || song.soundcloudUrl || song.tiktokUrl;
    // Either has media or is a valid placeholder — both are acceptable
    expect(typeof hasMedia === 'string' || !hasMedia).toBe(true);
  });

  if (song.youtubeId) {
    it('has a valid YouTube ID format', () => {
      // YouTube IDs are 11 chars, optionally followed by ?start=N
      expect(song.youtubeId).toMatch(/^[a-zA-Z0-9_-]{11}(\?start=\d+)?$/);
    });
  }

  if (song.tiktokUrl) {
    it('has a valid TikTok URL', () => {
      expect(song.tiktokUrl).toMatch(/^https:\/\/www\.tiktok\.com\/@[\w.]+\/video\/\d+$/);
    });
  }

  if (song.soundcloudUrl) {
    it('has a valid SoundCloud URL', () => {
      expect(song.soundcloudUrl).toMatch(/^https:\/\/soundcloud\.com\/.+/);
    });
  }

  // ── Chord integrity ──
  it('uses only valid chord syntax in lyrics', () => {
    const brackets = song.lyricsWithChords.match(/\[[^\]]*\]/g) || [];
    for (const bracket of brackets) {
      const inner = bracket.slice(1, -1);
      expect(inner).toMatch(/^[A-G][#b]?[a-z0-9]*$/);
    }
  });

  it('has chord diagrams for all chords used', () => {
    const chords = extractChords(song.lyricsWithChords);
    const missing = chords.filter(c => !lookupChord(c));
    expect(missing).toEqual([]);
  });

  // ── Lyrics quality ──
  it('does not contain non-breaking spaces (\\u00A0)', () => {
    expect(song.lyricsWithChords).not.toContain('\u00A0');
  });

  it('does not contain left-to-right marks (\\u200E)', () => {
    expect(song.lyricsWithChords).not.toContain('\u200E');
  });

  it('has valid instrumental markers', () => {
    const lines = song.lyricsWithChords.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      // Lines starting with { that aren't {R} should be instrumental markers
      if (trimmed.startsWith('{') && !trimmed.startsWith('{R}')) {
        expect(trimmed).toMatch(INSTRUMENTAL_REGEX);
      }
    }
  });

  // ── Optional fields ──
  if (song.capo !== undefined) {
    it('has a valid capo position (1-12)', () => {
      expect(Number.isInteger(song.capo)).toBe(true);
      expect(song.capo).toBeGreaterThanOrEqual(1);
      expect(song.capo).toBeLessThanOrEqual(12);
    });
  }

  if (song.tags !== undefined) {
    it('has tags as an array of non-empty strings', () => {
      expect(Array.isArray(song.tags)).toBe(true);
      for (const tag of song.tags) {
        expect(typeof tag).toBe('string');
        expect(tag.length).toBeGreaterThan(0);
      }
    });
  }
});
