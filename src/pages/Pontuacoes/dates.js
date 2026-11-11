// The page's two date forms: short ("14 nov", on the chart, the activity cards and the category
// columns) and long ("Sábado, 14 de novembro", in the dialog and the next-activity line)
const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export const shortDate = (iso) => {
  const [, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]}`;
};

export const longDate = (iso) => {
  const s = new Date(`${iso}T12:00:00`).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' });
  return s[0].toUpperCase() + s.slice(1);
};
