// The reader's text size (A− / A+), one setting for the songs and the recited provas, kept across
// pages and visits: an index into TEXT_SIZES, the scale of the text being read
export const TEXT_SIZES = [0.875, 1, 1.125, 1.25, 1.5];
const TEXT_SIZE_KEY = 'cancioneiro-tamanho-letra';

export function readTextSize() {
  try {
    const saved = localStorage.getItem(TEXT_SIZE_KEY);
    const i = saved === null ? NaN : Number(saved);
    return Number.isInteger(i) && i >= 0 && i < TEXT_SIZES.length ? i : 1;
  } catch {
    return 1;
  }
}

export function saveTextSize(i) {
  try { localStorage.setItem(TEXT_SIZE_KEY, String(i)); } catch { /* private mode: this visit only */ }
}

// What a screen reader hears at each step: "Letra a 112,5%", not a rounded "113%"
export function textSizeLabel(i) {
  return `Letra a ${(TEXT_SIZES[i] * 100).toLocaleString('pt-PT', { maximumFractionDigits: 1 })}%`;
}
