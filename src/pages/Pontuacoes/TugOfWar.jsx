import { useEffect, useRef, useState } from 'react';
import { dayTotal } from '../../config/pontuacoes';
import { longDate } from './dates';
import styles from './TugOfWar.module.css';

const pts = (n) => `${n} ponto${n === 1 ? '' : 's'}`;

// How far the knot moves for a lead: a 10% lead of all the points pulls it about a third of the
// way to that side, and it stays clear of the patrulhas at the rope's ends
const knotAt = (left, right) => {
  const sum = left + right;
  if (!sum) return 50;
  return Math.max(16, Math.min(84, 50 - ((left - right) / sum) * 50 * 3.2));
};

// The page's last word, as a scoreboard at the final whistle: the jogo da corda for the chosen
// period (how many points the trailing patrulha needs to pass, how many the leader defends), who
// leads each trimester, and the next chance to score
export default function TugOfWar({
  patrulhas, totals, inPeriod, trimesters, view, onPickTrimester, next, instant, today, mock,
}) {
  const ref = useRef(null);
  const [pulled, setPulled] = useState(instant);
  const [a, b] = totals;
  const tie = a === b;
  const lead = tie ? null : a > b ? 0 : 1;
  const behind = tie ? null : 1 - lead;
  const gap = Math.abs(a - b);

  // The tug starts when the band scrolls into view
  useEffect(() => {
    if (instant) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setPulled(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [instant]);

  return (
    <div ref={ref} className={`${styles.band} ${pulled ? styles.pulled : ''} ${instant ? styles.instant : ''}`}>
      {/* The rope: each patrulha pulls from its end; the knot settles toward the leader */}
      <div className={styles.rope} style={{ '--knot': `${knotAt(a, b)}%` }} aria-hidden="true">
        {patrulhas.map((p, i) => (
          <span
            key={p.key}
            className={`${styles.puller} ${i === 0 ? styles.pullerLeft : styles.pullerRight} ${lead === i ? styles.pullerLead : ''}`}
            style={{ '--patrol': p.color }}
          >
            {p.emoji}
          </span>
        ))}
        <span className={styles.line} />
        <span className={styles.middle} />
        <span className={styles.knot}>
          <span className={styles.ribbon} />
        </span>
      </div>

      <div className={styles.score}>
        {patrulhas.map((p, i) => (
          <p key={p.key} className={styles.side} style={{ '--patrol': p.ink }}>
            <span className={styles.sideName}>{p.name}</span>
            <span className={styles.sideTotal}>{totals[i]}</span>
          </p>
        ))}
      </div>

      <div className={styles.verdict}>
        {tie ? (
          <p className={styles.verdictMain}>Empate {inPeriod}! Quem marcar primeiro passa para a frente.</p>
        ) : (
          <>
            <p className={styles.verdictMain}>
              {patrulhas[behind].name} precisa de <strong>{pts(gap + 1)}</strong> para passar para a frente.
            </p>
            <p className={styles.verdictSub}>
              {patrulhas[lead].name} tem {pts(gap)} de vantagem para defender {inPeriod}.
            </p>
          </>
        )}
      </div>

      {/* Who leads each trimester; tapping one shows it */}
      <ul className={styles.trophies} aria-label="Cada trimestre">
        {trimesters.map((t) => {
          const sums = patrulhas.map((p) => t.activities.reduce((n, d) => n + dayTotal(d, p.key), 0));
          const scored = t.activities.some((d) => d.points);
          const over = !mock && t.last < today;
          const tTie = sums[0] === sums[1];
          const w = sums[0] > sums[1] ? 0 : 1;
          const status = !scored ? 'Por jogar' : tTie ? 'Empate' : over ? 'Ganhou' : 'Vai à frente';
          const on = view === t.label;
          return (
            <li key={t.label}>
              <button
                type="button"
                className={`${styles.trophy} ${on ? styles.trophyOn : ''} ${!scored ? styles.trophyEmpty : ''}`}
                aria-pressed={on}
                disabled={!scored}
                onClick={() => onPickTrimester(t.label)}
              >
                <span className={styles.trophyName}>
                  {t.label.split(' ')[0]}<span className={styles.phoneHide}> {t.label.split(' ').slice(1).join(' ')}</span>
                </span>
                <span className={styles.trophyIcon} aria-hidden="true">
                  {!scored ? '⏳' : tTie ? '🤝' : patrulhas[w].emoji}
                </span>
                <span className={styles.trophyWho}>
                  {!scored || tTie ? status : <>{patrulhas[w].name}<span className={`${styles.trophyStatus} ${styles.phoneHide}`}> {status.toLowerCase()}</span></>}
                </span>
                {scored && <span className={styles.trophyScore}>{sums[0]} – {sums[1]}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      <p className={styles.next}>
        {next ? (
          <>
            <span className={styles.nextLabel}>Próxima oportunidade</span>
            <span className={styles.nextWhat}>{longDate(next.date)} · {next.name}</span>
          </>
        ) : (
          <span className={styles.nextWhat}>Não há mais atividades este ano. Até ao próximo!</span>
        )}
      </p>
    </div>
  );
}
