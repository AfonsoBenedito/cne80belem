import { useState, useSyncExternalStore } from 'react';
import { useParams, useSearchParams, Navigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import { seccoes } from '../../config/seccoes';
import { programa } from '../../config/programa';
import { useSEO } from '../../utils/useSEO';
import styles from './Programa.module.css';

const pad = (n) => String(n).padStart(2, '0');
const TIMED = /^(\d{1,2}h\d{2})\s*-\s*(.+)$/;
const isoDate = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;

function localToday() {
  const now = new Date();
  return isoDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

// A page left open overnight (a phone tab, say) re-reads the date when it's looked at again,
// so "Próxima atividade" doesn't stay on yesterday's
const onReturn = (cb) => {
  document.addEventListener('visibilitychange', cb);
  window.addEventListener('focus', cb);
  return () => {
    document.removeEventListener('visibilitychange', cb);
    window.removeEventListener('focus', cb);
  };
};

// Every calendar entry with its real start and end date (ISO strings compare in order), so the
// page knows what is past, what is today and what comes next
function withDates(cal) {
  return cal.months.map((month) => ({
    ...month,
    weeks: month.weeks.map((week) =>
      Array.isArray(week)
        ? week.map((e) => {
            const date = isoDate(cal.year, month.month, e.day);
            return { ...e, start: date, end: date };
          })
        : { ...week, start: isoDate(cal.year, month.month, week.dayStart), end: isoDate(cal.year, month.month, week.dayEnd) },
    ),
  }));
}

const shortMonth = (name) => `${name.slice(0, 3)}.`;

export default function Programa() {
  const { seccao } = useParams();
  const section = seccoes[seccao];
  const years = programa[seccao];
  const [searchParams, setSearchParams] = useSearchParams();
  // The phone "earlier months" fold is opened per trimester; switching trimester closes it
  const [showPastFor, setShowPastFor] = useState(null);
  const today = useSyncExternalStore(onReturn, localToday, localToday);

  useSEO(section ? {
    title: `Programa - ${section.label}`,
    description: `Programa de atividades da ${section.label} do Agrupamento 80.`,
  } : {});

  if (!section) return <Navigate to="/" replace />;
  if (!years?.length) return <Navigate to={`/seccao/${seccao}`} replace />;

  const shortName = section.label.split(' - ').pop();
  const yearSlug = (label) => label.replace('/', '-');
  // Every trimester of every year, oldest first, with its dates and a unique key
  const chrono = [...years].reverse().flatMap((y) =>
    y.trimesters.map((t) => ({ ...t, yearLabel: y.year, key: `${yearSlug(y.year)}:${t.id}`, months: withDates(t) })),
  );
  const entriesOf = (t) =>
    t.months.flatMap((m) =>
      m.weeks.flatMap((w) => (Array.isArray(w) ? w : [w]).map((e) => ({ ...e, monthName: m.name, trimKey: t.key }))),
    );
  const lastEnd = (t) => entriesOf(t).at(-1).end;

  // The next activity (framed in the calendar), whichever trimester is on screen
  const next = chrono.flatMap(entriesOf).find((e) => e.end >= today) ?? null;
  // The current trimester is the first not yet over (in a break between trimesters, the one
  // about to start). Only it and those before it can be opened; the ones after aren't out yet.
  const currentIndex = chrono.findIndex((t) => lastEnd(t) >= today);
  const current = currentIndex === -1 ? chrono.at(-1) : chrono[currentIndex];
  const openable = (t) => chrono.indexOf(t) <= chrono.indexOf(current);

  // Shown year and trimester: from the URL (?ano=2025-26&trimestre=2) when openable, else the
  // current trimester (or, for a past year, its last one)
  const yearsOpen = years.filter((y) => chrono.some((t) => t.yearLabel === y.year && openable(t)));
  const yearAsked = yearsOpen.find((y) => yearSlug(y.year) === searchParams.get('ano'));
  const shownYear = yearAsked?.year ?? current.yearLabel;
  const yearTrims = chrono.filter((t) => t.yearLabel === shownYear);
  const trimAsked = yearTrims.find((t) => t.id === searchParams.get('trimestre') && openable(t));
  const cal = trimAsked ?? (shownYear === current.yearLabel ? current : yearTrims.filter(openable).at(-1));
  const months = cal.months;
  const showPast = showPastFor === cal.key;
  const choose = (params) =>
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      Object.entries(params).forEach(([k, v]) => (v == null ? p.delete(k) : p.set(k, v)));
      return p;
    }, { replace: true });

  // Within the shown trimester: all past (gray), or the month holding the next activity (the
  // months before it are over, and on phones they fold away so the page opens at the current
  // one), or all still to come
  const ended = entriesOf(cal).every((e) => e.end < today);
  const nextMonthIndex = next && next.trimKey === cal.key ? months.findIndex((m) => m.name === next.monthName) : -1;
  const pastMonths = nextMonthIndex > 0 ? months.slice(0, nextMonthIndex) : [];

  // "15h00 - Início do Trimestre" becomes a time column and the activity beside it, so times
  // line up down the day. A line without a time (the second part of a session) sits in the
  // activity column; a day with no times at all (a camp) has no time column.
  const renderEvents = (entry) => {
    const lines = entry.events.map((ev) => {
      const m = ev.match(TIMED);
      return m ? { time: m[1], text: m[2] } : { time: null, text: ev };
    });
    const timed = lines.some((l) => l.time);
    return (
      <ul className={`${styles.events} ${timed ? styles.eventsTimed : ''}`}>
        {lines.map((l, i) => (
          <li key={i} className={styles.event}>
            {timed && <span className={styles.eventTime}>{l.time}</span>}
            <span className={styles.eventText}>{l.text}</span>
          </li>
        ))}
      </ul>
    );
  };

  // Day numbers: the secção fill is kept for the next day (and camps' ranges stay as outlines too),
  // so colour points at one thing; other days to come get an ink outline, past days go gray
  const pill = (past, isNext) =>
    past ? undefined
      : isNext ? { background: section.surface, color: section.onSurface }
      : { color: section.ink, boxShadow: `inset 0 0 0 1.5px ${section.color}`, background: 'var(--color-white)' };

  const pastNote = <span className={styles.srOnly}> (já passou)</span>;
  // The framed day's outline is visual only; this says the same to a screen reader
  const nextNote = <span className={styles.srOnly}>{next && next.start <= today ? ' (hoje)' : ' (próxima atividade)'}</span>;

  return (
    <main className={styles.page}>
      {/* Hero: left-aligned on the page's edge, like the prova pages */}
      <section className={styles.hero} style={{ background: section.surface, color: section.onSurface }}>
        <img src={section.image} alt="" className={styles.heroBadge} />
        <div className="container">
          <p className={styles.heroLabel}>{shortName}</p>
          <h1 className={styles.heroTitle}>Programa</h1>
          <p className={styles.heroSub}>{cal.trimester}</p>
          <p className={styles.heroLead}>O que fazemos em cada semana do trimestre.</p>
        </div>
      </section>

      <div className="container">
        <Link to={`/seccao/${seccao}`} className={styles.backLink} style={{ color: section.ink }}>
          <FaArrowLeft size={12} aria-hidden="true" /> {shortName}
        </Link>


        {/* The scout year (past years stay reachable), then one button per trimester; the
            calendar below follows the choice. Trimesters after the current one aren't open yet. */}
        {/* The wrapper is a size container: the toolbar stacks when its own width can't hold
            the centred trimesters plus the year, including at large text sizes */}
        <div className={styles.periodWrap}>
        <div className={styles.periodPicker}>
          {yearsOpen.length > 1 && (
            <label className={styles.yearPicker}>
              <span className={styles.yearLabel}>Ano escutista</span>
              {/* A native select (keyboard, phone wheel) dressed like the trimester buttons beside it */}
              <span className={styles.yearSelectWrap}>
                <select
                  className={styles.yearSelect}
                  value={yearSlug(shownYear)}
                  onChange={(e) => choose({ ano: e.target.value, trimestre: null })}
                >
                  {yearsOpen.map((y) => (
                    <option key={y.year} value={yearSlug(y.year)}>
                      {y.year}
                    </option>
                  ))}
                </select>
                <FaChevronDown size={11} aria-hidden="true" className={styles.yearChevron} />
              </span>
            </label>
          )}
          {/* Labelled like the year select beside it, so the toolbar reads as two labelled choices */}
          <div className={styles.trimesterField}>
            <span id="programa-trimestre" className={styles.yearLabel}>
              Trimestre<span className={styles.srOnly}> de {shownYear}</span>
            </span>
            <div className={styles.trimesters} role="group" aria-labelledby="programa-trimestre">
              {yearTrims.map((t) => {
                const on = t.key === cal.key;
                const open = openable(t);
                const first = t.months[0].name;
                const last = t.months[t.months.length - 1].name;
                return (
                  <button
                    key={t.key}
                    type="button"
                    className={`${styles.trimesterBtn} ${on ? styles.trimesterBtnOn : ''}`}
                    style={on ? { background: section.surface, color: section.onSurface, borderColor: section.surface } : undefined}
                    aria-pressed={on}
                    disabled={!open}
                    onClick={() => choose({ ano: yearSlug(t.yearLabel), trimestre: t.id })}
                  >
                    <span className={styles.trimesterName}>
                      {t.id}.º<span className={styles.trimesterWord}> Trimestre</span>
                    </span>
                    <span className={styles.trimesterPeriod}>
                      {open ? (
                        <>
                          {/* May break after the dash when the text is large; never inside a month */}
                        <span className={styles.nowrap}>{shortMonth(first)}–</span>
                        <wbr />
                        <span className={styles.nowrap}>{shortMonth(last)}</span> {t.year}
                        </>
                      ) : (
                        'Em breve'
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        </div>

        {pastMonths.length > 0 && (
          <button
            type="button"
            className={styles.pastToggle}
            aria-expanded={showPast}
            aria-controls={pastMonths.map((_, i) => `programa-mes-${i}`).join(' ')}
            onClick={() => setShowPastFor(showPast ? null : cal.key)}
          >
            {showPast ? 'Esconder' : 'Ver'} {pastMonths.length === 1 ? 'o mês anterior' : 'os meses anteriores'} (
            {pastMonths.map((m) => m.name).join(', ')})
            <FaChevronDown
              size={11}
              aria-hidden="true"
              className={`${styles.pastChevron} ${showPast ? styles.pastChevronOpen : ''}`}
            />
          </button>
        )}

        <div className={styles.calendar}>
          {months.map((month, mi) => {
            const monthPast = mi < nextMonthIndex;
            // A month that is over goes gray with its days, instead of a full-colour bar over gray cells
            const monthOver = ended || mi < nextMonthIndex;
            return (
              <div
                key={month.name}
                id={`programa-mes-${mi}`}
                className={`${styles.month} ${monthPast && !showPast ? styles.monthFolded : ''}`}
              >
                <h2
                  className={`${styles.monthName} ${monthOver ? styles.monthNameOver : ''}`}
                  style={monthOver ? undefined : { background: section.surface, color: section.onSurface }}
                >
                  {month.name}
                </h2>

                <div className={styles.weeks}>
                  {month.weeks.map((week, wi) => {
                    // Merged multi-day event (single object instead of array)
                    if (!Array.isArray(week)) {
                      const entry = week;
                      const past = entry.end < today;
                      const isNext = next && entry.start === next.start;
                      return (
                        <div key={wi} className={styles.weekMerged}>
                          <div
                            className={`${styles.dayMerged} ${past ? styles.dayPast : ''} ${isNext ? styles.dayNext : ''}`}
                            style={{
                              background: past ? undefined : `${section.color}12`,
                              ...(isNext ? { outlineColor: section.ink } : {}),
                            }}
                          >
                            <div className={styles.dayHeader}>
                              <span className={styles.dayGroup}>
                                <time
                                  dateTime={entry.start}
                                  className={styles.dayNumber}
                                  style={pill(past, isNext)}
                                >
                                  {entry.dayStart}
                                </time>
                                <span className={styles.dayRange} aria-hidden="true">–</span>
                                <span className={styles.srOnly}> a </span>
                                <time
                                  dateTime={entry.end}
                                  className={styles.dayNumber}
                                  style={pill(past, isNext)}
                                >
                                  {entry.dayEnd}
                                </time>
                              </span>
                              <span className={styles.dayWeekday}>
                                {entry.weekdayStart}–{entry.weekdayEnd}
                                {past && pastNote}
                                {isNext && nextNote}
                              </span>
                            </div>
                            {renderEvents(entry)}
                            {entry.subtitle && <p className={styles.subtitle}>{entry.subtitle}</p>}
                          </div>
                        </div>
                      );
                    }

                    // Normal week (array of day entries)
                    return (
                      <div key={wi} className={styles.week}>
                        {week.map((entry) => {
                          const hasEvents = entry.events.length > 0;
                          const past = entry.end < today;
                          const isNext = next && entry.start === next.start;
                          return (
                            <div
                              key={`${entry.day}-${entry.weekday}`}
                              className={`${styles.day} ${hasEvents ? styles.dayActive : styles.dayEmpty} ${entry.highlight ? styles.dayHighlight : ''} ${past ? styles.dayPast : ''} ${isNext ? styles.dayNext : ''}`}
                              style={{
                                ...(entry.highlight && !past ? { background: `${section.color}12` } : {}),
                                ...(isNext ? { outlineColor: section.ink } : {}),
                              }}
                            >
                              <div className={styles.dayHeader}>
                                <time
                                  dateTime={entry.start}
                                  className={styles.dayNumber}
                                  style={hasEvents ? pill(past, isNext) : undefined}
                                >
                                  {entry.day}
                                </time>
                                <span className={styles.dayWeekday}>
                                  {entry.weekday}
                                  {past && pastNote}
                                  {isNext && nextNote}
                                </span>
                              </div>
                              {hasEvents && renderEvents(entry)}
                              {entry.subtitle && <p className={styles.subtitle}>{entry.subtitle}</p>}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
