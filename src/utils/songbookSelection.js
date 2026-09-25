import { useSyncExternalStore } from 'react';
import { cancoes } from '../config/cancioneiro';

// The songbook being built: the chosen songs (in order) and the builder's settings. Shared by the
// builder, the song list and the song pages, and kept in localStorage so a closed builder, a
// reload or a later visit picks up where the person left off. The cover image isn't kept: a
// data URL can outgrow the storage quota.
const KEY = 'cancioneiro-draft';
const DEFAULTS = { slugs: [], title: '', description: '', layout: 'vertical', includeChords: true, solfege: false };
const LAYOUTS = ['vertical', 'horizontal', 'booklet'];
const known = new Set(cancoes.map((s) => s.slug));

function read() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (!saved || !Array.isArray(saved.slugs)) return DEFAULTS;
    // A saved draft can outlive a song that was renamed or removed, or come from an older shape
    return {
      ...DEFAULTS,
      ...saved,
      slugs: [...new Set(saved.slugs)].filter((slug) => known.has(slug)),
      layout: LAYOUTS.includes(saved.layout) ? saved.layout : DEFAULTS.layout,
    };
  } catch {
    return DEFAULTS;
  }
}

let state = read();
const listeners = new Set();

function write(next) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Private mode or a full quota: the draft still lives for this visit
  }
  listeners.forEach((l) => l());
}

export function updateDraft(patch) {
  write({ ...state, ...(typeof patch === 'function' ? patch(state) : patch) });
}

export function toggleSong(slug) {
  updateDraft((s) => ({ slugs: s.slugs.includes(slug) ? s.slugs.filter((x) => x !== slug) : [...s.slugs, slug] }));
}

function subscribe(listener) {
  listeners.add(listener);
  // Another tab changed the draft
  const onStorage = (e) => { if (e.key === KEY) { state = read(); listener(); } };
  window.addEventListener('storage', onStorage);
  return () => { listeners.delete(listener); window.removeEventListener('storage', onStorage); };
}

export function useSongbookDraft() {
  return useSyncExternalStore(subscribe, () => state);
}
