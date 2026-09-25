import { tagCategories } from '../config/tags';

const groupOf = new Map(tagCategories.flatMap((c) => c.tags.map((t) => [t.value, c.key])));
export const isKnownTag = (tag) => groupOf.has(tag);

// Tags in the same group widen the list (Entrada or Comunhão); tags in different groups narrow it
// (Missa and Entrada). A plain AND made any two Mass moments return nothing.
export function matchesTags(song, activeTags, ignoreGroup) {
  const byGroup = new Map();
  for (const tag of activeTags) {
    const g = groupOf.get(tag);
    if (!g || g === ignoreGroup) continue;
    if (!byGroup.has(g)) byGroup.set(g, []);
    byGroup.get(g).push(tag);
  }
  for (const tags of byGroup.values()) {
    if (!tags.some((t) => song.tags?.includes(t))) return false;
  }
  return true;
}

// How many songs a chip leads to, given the choices made in the other groups
export function facetCount(songs, activeTags, tag) {
  const g = groupOf.get(tag);
  return songs.filter((s) => s.tags?.includes(tag) && matchesTags(s, activeTags, g)).length;
}
