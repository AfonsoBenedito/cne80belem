import { useParams, Navigate } from 'react-router-dom';
import { seccoes } from '../../config/seccoes';
import { programa } from '../../config/programa';
import styles from './Programa.module.css';

export default function Programa() {
  const { seccao } = useParams();
  const section = seccoes[seccao];
  const cal = programa[seccao];

  if (!section) return <Navigate to="/" replace />;
  if (!cal) return <Navigate to={`/seccao/${seccao}`} replace />;

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ background: section.color }}>
        <img src={section.image} alt="" className={styles.heroBadge} />
        <div className="container">
          <p className={styles.heroLabel}>{section.label}</p>
          <h1 className={styles.heroTitle}>Programa</h1>
          <p className={styles.heroSub}>{cal.trimester}</p>
        </div>
      </section>

      {/* Calendar */}
      <div className="container">
        <div className={styles.calendar}>
          {cal.months.map((month) => (
            <div key={month.name} className={styles.month}>
              <h2
                className={styles.monthName}
                style={{ background: section.color }}
              >
                {month.name}
              </h2>

              <div className={styles.weeks}>
                {month.weeks.map((week, wi) => {
                  // Merged multi-day event (single object instead of array)
                  if (!Array.isArray(week)) {
                    const entry = week;
                    return (
                      <div key={wi} className={styles.weekMerged}>
                        <div
                          className={`${styles.dayMerged} ${entry.highlight ? styles.dayHighlight : ''}`}
                          style={{ background: `${section.color}12` }}
                        >
                          <div className={styles.dayHeader}>
                            <span className={styles.dayGroup}>
                              <span
                                className={styles.dayNumber}
                                style={{ background: section.color }}
                              >
                                {entry.dayStart}
                              </span>
                              <span className={styles.dayRange}>—</span>
                              <span
                                className={styles.dayNumber}
                                style={{ background: section.color }}
                              >
                                {entry.dayEnd}
                              </span>
                            </span>
                            <span className={styles.dayWeekday}>
                              {entry.weekdayStart} — {entry.weekdayEnd}
                            </span>
                          </div>
                          <ul className={styles.events}>
                            {entry.events.map((ev, ei) => (
                              <li key={ei} className={styles.event}>
                                {ev}
                              </li>
                            ))}
                          </ul>
                          {entry.subtitle && (
                            <p className={styles.subtitle}>{entry.subtitle}</p>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // Normal week (array of day entries)
                  return (
                    <div key={wi} className={styles.week}>
                      {week.map((entry) => {
                        const hasEvents = entry.events.length > 0;
                        return (
                          <div
                            key={`${entry.day}-${entry.weekday}`}
                            className={`${styles.day} ${hasEvents ? styles.dayActive : styles.dayEmpty} ${entry.highlight ? styles.dayHighlight : ''}`}
                            style={
                              entry.highlight
                                ? { background: `${section.color}12` }
                                : undefined
                            }
                          >
                            <div className={styles.dayHeader}>
                              <span
                                className={styles.dayNumber}
                                style={hasEvents ? { background: section.color } : undefined}
                              >
                                {entry.day}
                              </span>
                              <span className={styles.dayWeekday}>
                                {entry.weekday}
                                {entry.nextMonth && (
                                  <span className={styles.dayNextMonth}> *</span>
                                )}
                              </span>
                            </div>
                            {hasEvents && (
                              <ul className={styles.events}>
                                {entry.events.map((ev, ei) => (
                                  <li key={ei} className={styles.event}>
                                    {ev}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {entry.subtitle && (
                              <p className={styles.subtitle}>{entry.subtitle}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {cal.note && <p className={styles.note}>{cal.note}</p>}
      </div>
    </main>
  );
}
