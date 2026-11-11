import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { categorias } from '../../config/pontuacoes';
import { useCountUp } from './useCountUp';
import DivergingBar from './DivergingBar';
import { shortDate } from './dates';
import styles from './CategoryCompare.module.css';

const signed = (n) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : '0');
const pts = (n) => `${Math.abs(n)} ponto${Math.abs(n) === 1 ? '' : 's'}`;

// A number that counts up when its section comes into view. Screen readers get the final value
// straight away, never the 0 it starts from
function Value({ n, run, instant, delay, className = styles.value }) {
  const v = useCountUp(n, { run, instant, delay, duration: 800 });
  return (
    <span className={className}>
      <span aria-hidden="true">{signed(v)}</span>
      <span className={styles.srOnly}>{signed(n)}</span>
    </span>
  );
}

// One category opened: what it is, the duel, each patrulha's best (or worst) day, the days as
// little columns to tap, and a tip for whoever did worse
function CategoryDetail({ cat, sums, days, patrulhas, onPickDay, instant }) {
  const val = (d, p) => d.points?.[p.key]?.[cat.key] ?? 0;
  const losing = sums.every((n) => n <= 0) && sums.some((n) => n < 0);
  const [a, b] = sums;
  const tie = a === b;
  const win = a > b ? 0 : 1;
  const lose = 1 - win;
  const diff = Math.abs(a - b);
  const none = sums.every((n) => n === 0);

  const daysWith = days
    .map((d, i) => ({ d, i, vals: patrulhas.map((p) => val(d, p)) }))
    .filter((x) => x.vals.some((v) => v !== 0));
  const maxAbs = Math.max(1, ...daysWith.flatMap((x) => x.vals.map(Math.abs)));
  const hasPos = daysWith.some((x) => x.vals.some((v) => v > 0));
  const hasNeg = daysWith.some((x) => x.vals.some((v) => v < 0));
  // Each patrulha's day that counted most here: the best for gains, the worst for losses
  const standout = patrulhas.map((p, k) => daysWith.reduce((pick, x) => {
    const v = x.vals[k];
    if (losing ? v >= 0 : v <= 0) return pick;
    return !pick || (losing ? v < pick.v : v > pick.v) ? { name: x.d.name, v } : pick;
  }, null));

  let verdict;
  if (none) verdict = { emoji: '🌱', text: 'Ainda ninguém ganhou nem perdeu pontos aqui.' };
  else if (tie) verdict = { emoji: '🤝', text: `Empate! As duas patrulhas têm ${signed(a)}.` };
  else if (losing) verdict = { emoji: '🛡️', text: `${patrulhas[win].name} perdeu menos: ${pts(diff)} a menos que ${patrulhas[lose].name}!` };
  else verdict = { emoji: '🏆', text: `${patrulhas[win].name} ganhou aqui por ${pts(diff)}!` };

  return (
    <div className={styles.detailInner}>
      <p className={styles.about}>
        <span className={styles.aboutEmoji} aria-hidden="true">{cat.emoji}</span>
        {cat.about}
      </p>

      <div className={styles.duel}>
        {patrulhas.map((p, k) => (
          <div
            key={p.key}
            className={`${styles.duelSide} ${!tie && !none && k === win ? styles.duelWin : ''}`}
            style={{ '--patrol': p.color }}
          >
            {!tie && !none && k === win && <span className={styles.duelCrown} aria-hidden="true">👑</span>}
            <span className={styles.duelEmoji} aria-hidden="true">{p.emoji}</span>
            <span className={styles.duelName}>{p.name}</span>
            <Value n={sums[k]} run instant={instant} delay={150 + k * 120} className={styles.duelValue} />
          </div>
        ))}
        <span className={styles.duelVs} aria-hidden="true">VS</span>
      </div>

      <p className={styles.verdict}>
        <span className={styles.verdictEmoji} aria-hidden="true">{verdict.emoji}</span>
        {verdict.text}
      </p>

      {daysWith.length > 0 && (
        <>
          <ul className={styles.standouts}>
            {patrulhas.map((p, k) => standout[k] && (
              <li key={p.key}>
                <span className={styles.dot} style={{ background: p.color }} aria-hidden="true" />
                <span>
                  {losing ? 'Dia com mais faltas' : 'Melhor dia'} do {p.name}: <strong>{standout[k].name}</strong> ({signed(standout[k].v)})
                </span>
              </li>
            ))}
          </ul>

          <p className={styles.daysTitle}>Dia a dia <span>· toca numa coluna para veres esse dia</span></p>
          <div className={`${styles.cols} ${hasNeg && !hasPos ? styles.colsDown : ''}`}>
            {daysWith.map(({ d, i, vals }, n) => (
              <button
                key={d.date + d.name}
                type="button"
                className={styles.colBtn}
                aria-haspopup="dialog"
                aria-label={`${d.name}: ${patrulhas.map((p, k) => `${p.name} ${signed(vals[k])}`).join(', ')}`}
                onClick={() => onPickDay(i)}
                style={{ '--n': n }}
              >
                <span className={styles.colPair}>
                  {patrulhas.map((p, k) => (
                    <span key={p.key} className={styles.colSlot}>
                      {vals[k] !== 0 && (
                        <span
                          className={`${styles.col} ${vals[k] < 0 ? styles.colNeg : ''}`}
                          style={{ height: `${(Math.abs(vals[k]) / maxAbs) * 100}%`, '--c': p.color }}
                        >
                          <span className={styles.colVal}>{signed(vals[k])}</span>
                        </span>
                      )}
                    </span>
                  ))}
                </span>
                <span className={styles.colDate}>{shortDate(d.date)}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {!tie && !none && (
        <p className={styles.tip}>
          <span aria-hidden="true">💡</span> Dica para o {patrulhas[lose].name}: {cat.tip}
        </p>
      )}
    </div>
  );
}

// Gained and lost points per category, both patrulhas side by side on one centre line: what was
// lost to the left, what was gained to the right. A category opens to explain itself.
export default function CategoryCompare({ days, patrulhas, instant, onPickDay }) {
  const ref = useRef(null);
  const [run, setRun] = useState(instant);
  const [openCat, setOpenCat] = useState(null);

  // Bars grow when the section scrolls into view
  useEffect(() => {
    if (instant) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRun(true); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [instant]);

  const val = (d, p, c) => d.points?.[p.key]?.[c] ?? 0;
  const rows = categorias.map((c) => ({
    ...c,
    sums: patrulhas.map((p) => days.reduce((n, d) => n + val(d, p, c.key), 0)),
  }));
  const gained = patrulhas.map((p) => days.reduce((n, d) => n + Object.values(d.points?.[p.key] ?? {}).filter((v) => v > 0).reduce((a, v) => a + v, 0), 0));
  const lost = patrulhas.map((p) => days.reduce((n, d) => n + Object.values(d.points?.[p.key] ?? {}).filter((v) => v < 0).reduce((a, v) => a + v, 0), 0));
  // One scale for every category, eased (square root): Atividade principal's hundreds stay the
  // longest, the faltas' handful still shows, and categories differ from each other
  const catMax = Math.max(1, ...rows.flatMap((r) => r.sums.map(Math.abs)));
  const totalMax = Math.max(1, ...gained, ...lost.map(Math.abs));

  return (
    <div ref={ref} className={`${styles.wrap} ${run ? styles.run : ''} ${instant ? styles.instant : ''}`}>
      {/* Gained vs lost, the whole period */}
      <div className={styles.summary}>
        {patrulhas.map((p, i) => (
          <div key={p.key} className={styles.summaryCard} style={{ '--patrol': p.color }}>
            <p className={styles.summaryName}><span aria-hidden="true">{p.emoji}</span> {p.name}</p>
            <div className={styles.summaryNums}>
              <p className={styles.gain}>
                <span className={styles.summaryLabel}>Ganhou</span>
                <Value n={gained[i]} run={run} instant={instant} delay={i * 120} />
              </p>
              <p className={styles.loss}>
                <span className={styles.summaryLabel}>Perdeu</span>
                <Value n={lost[i]} run={run} instant={instant} delay={200 + i * 120} />
              </p>
            </div>
            <DivergingBar neg={lost[i]} pos={gained[i]} max={totalMax} color={p.color} order={i} run={run} sqrt />
          </div>
        ))}
      </div>

      <div className={styles.axisHead} aria-hidden="true">
        <span>← perdidos</span>
        <span>ganhos →</span>
      </div>

      <ul className={styles.rows}>
        {rows.map((r, ri) => {
          const isOpen = openCat === r.key;
          const best = Math.max(...r.sums);
          const someone = r.sums.some((n) => n !== 0);
          return (
            <li key={r.key} className={`${styles.row} ${isOpen ? styles.rowOpen : ''}`} style={{ '--r': ri }}>
              <button
                type="button"
                className={styles.rowBtn}
                aria-expanded={isOpen}
                aria-controls={`cat-${r.key}`}
                onClick={() => setOpenCat(isOpen ? null : r.key)}
              >
                <span className={styles.rowLabel}>
                  <span className={styles.rowEmoji} aria-hidden="true">{r.emoji}</span>
                  {r.label}
                  <FaChevronDown className={styles.chev} aria-hidden="true" />
                </span>
                <span className={styles.rowBars}>
                  {patrulhas.map((p, i) => (
                    <span key={p.key} className={styles.barLine}>
                      <span className={styles.srOnly}>{p.name}: </span>
                      <DivergingBar
                        neg={Math.min(0, r.sums[i])}
                        pos={Math.max(0, r.sums[i])}
                        max={catMax}
                        color={p.color}
                        order={2 + ri * 2 + i}
                        thin
                        run={run}
                        sqrt
                      />
                      <Value n={r.sums[i]} run={run} instant={instant} delay={ri * 90} />
                      <span className={styles.medal} aria-hidden="true">
                        {someone && r.sums[i] === best && r.sums[1 - i] !== best ? '🏅' : ''}
                      </span>
                    </span>
                  ))}
                </span>
              </button>

              <div id={`cat-${r.key}`} className={styles.detail} hidden={!isOpen}>
                {isOpen && (
                  <CategoryDetail cat={r} sums={r.sums} days={days} patrulhas={patrulhas} onPickDay={onPickDay} instant={instant} />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
