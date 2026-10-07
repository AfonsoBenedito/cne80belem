// ── Programa (calendário trimestral) por secção ──
// Each secção has its scout years, newest first: { year: '2026/27', trimesters: [...] }, and
// each year its trimesters in order (the page shows a button per trimester, and only lets you
// open the current one and those before it). Past years are picked from "Ano escutista".
// id: '1' | '2' | '3' (used in the URL, ?ano=2025-26&trimestre=2)
// trimester: label for the trimester period
// year: the year of the dates, so the page can tell what is past and what comes next
// months: array of { name, month (1–12), weeks[] }
// each week: array of day entries { day, weekday, events[] } sharing one Mon–Sun week, or a
//   multi-day entry { merged: true, dayStart, dayEnd, weekdayStart, weekdayEnd, events[] }
//   - events with `highlight: true` are special (camps, retreats; every multi-day entry is)
//   - `subtitle` is a note under the day ("(Só para Animadores)")
//   - events carry no times: one line per part of the day's activity
//   - a range ending in a later month carries `monthEnd` (shown "30 – 1 Nov.")
// The years live one file each in src/config/programas/<secção>/<yyyy>-<yy>.js, listed newest
// first by src/config/programas/<secção>.js. programa.test.js checks every weekday against
// its real date.
//
// Thirty years of four secções is ~230 KB of data, so a secção's years are downloaded only when
// its page opens (one chunk per secção; the glob makes Vite build them).
const sections = import.meta.glob('./programas/*.js');

// The secção's years (newest first), or null when it has none
export function loadPrograma(seccao) {
  const load = sections[`./programas/${seccao}.js`];
  return load ? load().then((m) => m.default) : Promise.resolve(null);
}
