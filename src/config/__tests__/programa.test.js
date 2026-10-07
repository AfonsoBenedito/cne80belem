import { describe, it, expect } from 'vitest';
import lobitos from '../programas/lobitos';
import exploradores from '../programas/exploradores';
import pioneiros from '../programas/pioneiros';
import caminheiros from '../programas/caminheiros';

// The page loads a secção's years on demand (programa.js); the test wants all of them at once
const programa = { lobitos, exploradores, pioneiros, caminheiros };

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const weekdayOf = (y, m, d) => WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];

// The calendar is typed by hand each trimester; these catch a wrong weekday or a missing
// year/month, which would also put "Próxima atividade" on the wrong day
const trimesters = Object.entries(programa).flatMap(([seccao, years]) =>
  years.flatMap((y) => y.trimesters.map((cal) => [`${seccao} ${y.year} ${cal.id}.º trimestre`, cal])),
);
const startOf = (c) => c.year * 100 + c.months[0].month;

describe.each(Object.entries(programa))('programa: %s', (_, years) => {
  it('lists its scout years newest first, with unique labels', () => {
    const labels = years.map((y) => y.year);
    expect(new Set(labels).size).toBe(labels.length);
    const firstStarts = years.map((y) => startOf(y.trimesters[0]));
    expect([...firstStarts].sort((a, b) => b - a)).toEqual(firstStarts);
  });

  it.each(years.map((y) => [y.year, y]))('%s: trimesters with unique ids, in date order', (_, y) => {
    const ids = y.trimesters.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    const starts = y.trimesters.map(startOf);
    expect([...starts].sort((a, b) => a - b)).toEqual(starts);
  });
});

describe.each(trimesters)('programa: %s', (_, cal) => {
  // The page reads each trimester's last day to know if it is over; an empty one would break it
  it('has at least one day', () => {
    expect(cal.months.some((m) => m.weeks.length > 0)).toBe(true);
  });

  it('has a year and numbered months', () => {
    expect(Number.isInteger(cal.year)).toBe(true);
    for (const m of cal.months) expect(m.month >= 1 && m.month <= 12, m.name).toBe(true);
  });

  it('gives every date its real weekday', () => {
    for (const m of cal.months) {
      for (const week of m.weeks) {
        if (Array.isArray(week)) {
          for (const e of week) expect(e.weekday, `${e.day} ${m.name}`).toBe(weekdayOf(cal.year, m.month, e.day));
        } else {
          // A range may end in a later month (monthEnd), even in January of the next year
          const endMonth = week.monthEnd ?? m.month;
          const endYear = endMonth < m.month ? cal.year + 1 : cal.year;
          const start = Date.UTC(cal.year, m.month - 1, week.dayStart);
          const end = Date.UTC(endYear, endMonth - 1, week.dayEnd);
          expect(start < end, `${week.dayStart} ${m.name}`).toBe(true);
          expect(week.weekdayStart, `${week.dayStart} ${m.name}`).toBe(weekdayOf(cal.year, m.month, week.dayStart));
          expect(week.weekdayEnd, `${week.dayEnd} ${m.name}`).toBe(weekdayOf(endYear, endMonth, week.dayEnd));
        }
      }
    }
  });
});
