/**
 * Normalize a string for accent-insensitive, trim-safe comparison.
 * Strips diacritics (é→e, ã→a, ç→c, etc.) and lowercases.
 */
export function normalize(str) {
  return str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
