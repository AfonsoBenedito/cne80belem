import { categorias, dayTotal } from '../../config/pontuacoes';
import { useCountUp } from './useCountUp';
import DivergingBar from './DivergingBar';
import { longDate } from './dates';
import styles from './DayBreakdown.module.css';


const signed = (n) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : '0');

// `cats`: the categories either patrulha scored in, the same rows in both cards so they line up
function PatrolCard({ patrulha, activity, cats, maxAbs, isBest, instant, index }) {
  const total = dayTotal(activity, patrulha.key);
  const counted = useCountUp(total, { delay: 250 + index * 150, instant });

  return (
    <article className={styles.card} style={{ '--patrol': patrulha.color, '--i': index }}>
      <header className={styles.cardHead} style={{ background: patrulha.surface, color: patrulha.onSurface }}>
        <span className={styles.cardEmoji} aria-hidden="true">{patrulha.emoji}</span>
        <h3 className={styles.cardName}>{patrulha.name}</h3>
        {isBest && <span className={styles.medal} aria-label="ganhou este dia">🏆</span>}
      </header>
      <p className={styles.cardTotal}>
        <span aria-hidden="true">{signed(counted)}</span>
        <span className={styles.srOnly}>{signed(total)} pontos</span>
        <span className={styles.cardUnit}>pontos</span>
      </p>
      {cats.length ? (
        <ul className={styles.cats}>
          {cats.map((c, r) => {
            const v = activity.points?.[patrulha.key]?.[c.key] ?? 0;
            return (
              <li key={c.key} className={styles.cat} style={{ '--r': r }}>
                <span className={styles.catLabel}><span aria-hidden="true">{c.emoji}</span> {c.label}</span>
                <span className={styles.catValue}>{signed(v)}</span>
                <span className={styles.bar}>
                  <DivergingBar neg={Math.min(0, v)} pos={Math.max(0, v)} max={maxAbs} color={patrulha.color} order={index + r * 2} />
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.none}>Sem pontos neste dia.</p>
      )}
    </article>
  );
}

export default function DayBreakdown({ activity, patrulhas, instant }) {
  const totals = patrulhas.map((p) => dayTotal(activity, p.key));
  const scored = patrulhas.some((p) => Object.keys(activity.points?.[p.key] ?? {}).length);
  const best = Math.max(...totals);
  const tie = totals.every((t) => t === best);
  const winner = patrulhas[totals.indexOf(best)];
  const maxAbs = Math.max(1, ...patrulhas.flatMap((p) => Object.values(activity.points?.[p.key] ?? {}).map(Math.abs)));
  const cats = categorias.filter((c) => patrulhas.some((p) => activity.points?.[p.key]?.[c.key]));

  return (
    <div className={`${styles.panel} ${instant ? styles.instant : ''}`}>
      <p className={styles.date}>{longDate(activity.date)}</p>
      <h2 id="atividade-titulo" className={styles.title}>{activity.name}</h2>

      {!scored ? (
        <div className={styles.empty}>
          <span className={styles.emptyEmoji} aria-hidden="true">🏕️</span>
          <p>Neste dia não houve pontos em jogo. Foi só para nos divertirmos!</p>
        </div>
      ) : (
        <>
          <p className={styles.verdict}>
            <span className={styles.verdictEmoji} aria-hidden="true">{tie ? '🤝' : '🎉'}</span>
            <span>{tie ? 'Empate! As duas patrulhas fizeram o mesmo.' : <>A patrulha <strong>{winner.name}</strong> ganhou este dia!</>}</span>
          </p>
          <div className={styles.cards}>
            {patrulhas.map((p, i) => (
              <PatrolCard
                key={p.key}
                patrulha={p}
                activity={activity}
                cats={cats}
                maxAbs={maxAbs}
                isBest={!tie && p === winner}
                instant={instant}
                index={i}
              />
            ))}
          </div>
        </>
      )}

      {activity.details && <Details details={activity.details} name={activity.name} patrulhas={patrulhas} />}
    </div>
  );
}

function Details({ details, name, patrulhas }) {
  const sums = patrulhas.map((p) =>
    details.groups.flatMap((g) => g.rows).reduce((s, r) => s + r[p.key].points, 0),
  );
  // Each row's place in the whole table, so they come in one after another
  const firstRow = details.groups.map((_, gi) => details.groups.slice(0, gi).reduce((n, g) => n + g.rows.length, 0));

  return (
    <section className={styles.details} aria-labelledby="detalhes-titulo">
      <h3 id="detalhes-titulo" className={styles.detailsTitle}>Como correu o {name}</h3>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col"><span className={styles.srOnly}>Prova</span></th>
              {patrulhas.map((p) => (
                <th key={p.key} scope="col" style={{ color: p.ink }}>
                  <span aria-hidden="true">{p.emoji}</span> {p.name}
                </th>
              ))}
            </tr>
          </thead>
          {details.groups.map((g, gi) => (
            <tbody key={g.label}>
              <tr className={styles.groupRow}>
                <th scope="colgroup" colSpan={patrulhas.length + 1}>{g.label}</th>
              </tr>
              {g.rows.map((r, ri) => {
                return (
                  <tr key={r.label} className={styles.row} style={{ '--r': firstRow[gi] + ri + 1 }}>
                    <th scope="row">{r.label}</th>
                    {patrulhas.map((p) => {
                      const cell = r[p.key];
                      return (
                        <td key={p.key}>
                          <span className={styles.result}>{cell.result}</span>
                          <span className={`${styles.pill} ${cell.points > 0 ? styles.pillUp : cell.points < 0 ? styles.pillDown : ''}`}>
                            {signed(cell.points)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          ))}
          <tfoot>
            <tr>
              <th scope="row">Pontos do {name}</th>
              {sums.map((s, i) => <td key={patrulhas[i].key}><strong>{s}</strong></td>)}
            </tr>
          </tfoot>
        </table>
      </div>
      {details.note && <p className={styles.note}>{details.note}</p>}
    </section>
  );
}
