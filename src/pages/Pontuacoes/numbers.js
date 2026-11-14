// Points can come in halves (a Grito of 2,5), written the Portuguese way
const fmtr = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 1 });

export const fmt = (n) => fmtr.format(n);
export const signed = (n) => (n > 0 ? `+${fmt(n)}` : n < 0 ? `−${fmt(Math.abs(n))}` : '0');
export const pts = (n) => `${fmt(Math.abs(n))} ponto${Math.abs(n) === 1 ? '' : 's'}`;
