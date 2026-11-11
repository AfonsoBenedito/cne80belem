import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FaChevronDown, FaRedo } from 'react-icons/fa';
import { seccoes } from '../../config/seccoes';
import { patrulhas, pontuacoes, dayTotal } from '../../config/pontuacoes';
import { useSEO } from '../../utils/useSEO';
import MarbleJar from './MarbleJar';
import { jarScale, buildJar, buildFill, pourSchedule, rand } from './jarMath';
import RaceChart from './RaceChart';
import ActivityDialog from './ActivityDialog';
import CategoryCompare from './CategoryCompare';
import TugOfWar from './TugOfWar';
import { prefersReducedMotion } from './useCountUp';
import { shortDate } from './dates';
import styles from './Pontuacoes.module.css';

const START_DELAY = 700;
const YEAR = 'Ano';
const CONTENTS = [
  { key: 'berlindes', label: 'Berlindes', emoji: '🔮' },
  { key: 'sumo', label: 'Sumo', emoji: '🧃' },
  { key: 'areia', label: 'Areia', emoji: '⏳' },
];
const CONTENT_KEY = 'pontuacoes-conteudo';
// After the pour, the lid closes (650ms); juice then celebrates (shake, crown, confetti) before
// its straw goes in, sand first plants its umbrella (~2.5s) and celebrates after
const CELEBRATE_AFTER = { berlindes: 0, sumo: 700, areia: 2600 };

// What fills the jars is a per-viewer choice, remembered on this device when storage allows
const savedContent = () => {
  try {
    const v = localStorage.getItem(CONTENT_KEY);
    return CONTENTS.some((c) => c.key === v) ? v : 'berlindes';
  } catch {
    return 'berlindes';
  }
};
const section = seccoes.exploradores;

const pad = (n) => String(n).padStart(2, '0');
const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};


const signed = (n) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : '0');

// Every activity of the year that already happened (or has points; with mock data, all of
// them), each with its trimester
function useDays() {
  return useMemo(() => {
    const today = localToday();
    return pontuacoes.trimesters.flatMap((t) =>
      t.activities
        .filter((a) => pontuacoes.mock || a.date <= today || a.points)
        .map((a) => ({ ...a, trimester: t.label })),
    );
  }, []);
}

// The trimesters that can be shown (started, or with points), and the current one: the first
// not yet over, like Programa (between two trimesters, the one about to start)
function usePeriods(days) {
  return useMemo(() => {
    const today = localToday();
    const list = pontuacoes.trimesters
      .map((t) => ({ label: t.label, first: t.activities[0]?.date, last: t.activities.at(-1)?.date }))
      .filter((t) => days.some((d) => d.trimester === t.label));
    const current = list.find((t) => today <= t.last) ?? list.at(-1);
    return { trimesters: list.map((t) => t.label), current: current?.label ?? YEAR };
  }, [days]);
}

const withTotals = (list) => {
  const cum = Object.fromEntries(patrulhas.map((p) => [p.key, 0]));
  return list.map((d) => {
    patrulhas.forEach((p) => { cum[p.key] += dayTotal(d, p.key); });
    return { ...d, cum: { ...cum } };
  });
};

// Saturated only: pale bits vanished on the cream behind the jars
const CONFETTI_COLORS = ['var(--color-yellow)', 'var(--color-green)', ...patrulhas.map((p) => p.color), 'var(--color-yellow-dark)', 'var(--color-green-dark)', ...patrulhas.map((p) => p.surface)];

const CONFETTI = Array.from({ length: 46 }, (_, i) => ({
  x: Math.round((rand(i + 101) - 0.5) * 520),
  y: Math.round(-120 - rand(i + 211) * 260),
  r: Math.round((rand(i + 307) - 0.5) * 900),
  d: Math.round(rand(i + 401) * 180),
  c: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  round: i % 3 === 0,
}));

function Confetti() {
  const bits = CONFETTI;
  return (
    <div className={styles.confetti} aria-hidden="true">
      {bits.map((b, i) => (
        <span
          key={i}
          className={b.round ? styles.confettiDot : styles.confettiBit}
          style={{ '--x': `${b.x}px`, '--y': `${b.y}px`, '--r': `${b.r}deg`, '--d': `${b.d}ms`, background: b.c }}
        />
      ))}
    </div>
  );
}

export default function Pontuacoes() {
  useSEO({
    title: `Pontuações - ${pontuacoes.unidade}`,
    description: `Quadro de pontuações das patrulhas da ${pontuacoes.unidade} ${pontuacoes.year}.`,
    noindex: true,
  });

  const days = useDays();
  const { trimesters, current } = usePeriods(days);
  const [view, setView] = useState(current);
  const [content, setContent] = useState(savedContent);
  const [instant] = useState(prefersReducedMotion);
  const [play, setPlay] = useState(0);
  const [done, setDone] = useState(instant);
  const [celebrate, setCelebrate] = useState(instant);
  // The activity whose breakdown is open (none until one is picked), and the tab stop in the list
  const [open, setOpen] = useState(null);
  const [chipFocus, setChipFocus] = useState(-1);
  const chipsRef = useRef(null);
  const chartRef = useRef(null);
  const jarsRef = useRef(null);
  const pageRef = useRef(null);
  const barRef = useRef(null);

  // The tabs stick right under the header as it is actually drawn (it grows with larger text, so
  // the fixed --header-height isn't enough), and stop sticking when header and tabs together would
  // cover more than 30% of the screen: large text, or a phone held sideways
  useEffect(() => {
    const page = pageRef.current;
    const header = document.querySelector('header');
    const bar = barRef.current;
    if (!page || !header || !bar) return undefined;
    const fit = () => {
      const h = header.getBoundingClientRect().height;
      const barH = bar.getBoundingClientRect().height;
      page.style.setProperty('--sticky-top', `${Math.round(h)}px`);
      page.style.setProperty('--bar-height', `${Math.round(barH)}px`);
      const tooTall = h + barH > window.innerHeight * 0.3;
      if (tooTall) page.dataset.unstick = '';
      else delete page.dataset.unstick;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(header);
    ro.observe(bar);
    window.addEventListener('resize', fit);
    return () => { ro.disconnect(); window.removeEventListener('resize', fit); };
  }, []);

  // The whole page follows the chosen period: a trimester's activities, counted from zero, or
  // the year
  const shown = useMemo(
    () => withTotals(view === YEAR ? days : days.filter((d) => d.trimester === view)),
    [days, view],
  );
  const totals = patrulhas.map((p) => shown.at(-1)?.cum[p.key] ?? 0);
  const best = Math.max(...totals);
  const tie = totals.every((t) => t === best);
  const leader = patrulhas[totals.indexOf(best)];
  const gap = best - Math.min(...totals);

  // The jars: in a trimester, a layer per activity; in the year, a layer per trimester (a year
  // of activities in one jar made layers too thin to see or tap)
  const jars = useMemo(() => {
    const layers = patrulhas.map((p) => (view === YEAR
      ? trimesters.map((label) => ({
        index: `t:${label}`,
        name: label,
        points: days.filter((d) => d.trimester === label).reduce((n, d) => n + dayTotal(d, p.key), 0),
      }))
      : shown.map((d, index) => ({ index, name: d.name, points: dayTotal(d, p.key) }))
    ).filter((l) => l.points > 0));
    const keys = [...new Set(layers.flat().map((l) => l.index))]
      .sort((a, b) => (view === YEAR ? trimesters.indexOf(a.slice(2)) - trimesters.indexOf(b.slice(2)) : a - b));
    const schedule = pourSchedule(keys);
    if (content !== 'berlindes') {
      const most = Math.max(...layers.map((ls) => ls.reduce((n, l) => n + l.points, 0)));
      return { value: null, list: layers.map((ls) => buildFill(ls, most, schedule)) };
    }
    const scale = jarScale(layers);
    return { value: scale.value, list: layers.map((ls) => buildJar(ls, scale, schedule)) };
  }, [days, shown, view, trimesters, content]);
  const { value } = jars;
  const fillMs = Math.max(...jars.list.map((j) => j.duration));

  // Both jars full: the lids close (done), then the winner is crowned (celebrate)
  useEffect(() => {
    if (instant) return undefined;
    const poured = START_DELAY + fillMs + 250;
    const t = setTimeout(() => setDone(true), poured);
    const c = setTimeout(() => setCelebrate(true), poured + CELEBRATE_AFTER[content]);
    return () => { clearTimeout(t); clearTimeout(c); };
  }, [play, fillMs, instant, content]);

  // The tickets open scrolled to the end, on the latest activity
  useLayoutEffect(() => {
    const row = chipsRef.current;
    if (row) row.scrollLeft = row.scrollWidth;
  }, [view]);

  // Walking the period in the dialog keeps that day's ticket in view in its row (without
  // scrolling the page)
  useEffect(() => {
    const row = chipsRef.current;
    const chip = open == null ? null : row?.children[open];
    if (!chip) return;
    const left = chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2;
    row.scrollTo({ left, behavior: instant ? 'auto' : 'smooth' });
  }, [open, instant]);

  const pick = (i) => {
    setOpen(i);
    setChipFocus(i);
  };

  // A new period pours its jars again
  const show = (v) => {
    setView(v);
    setOpen(null);
    setChipFocus(-1);
    if (!instant) { setDone(false); setCelebrate(false); }
    setPlay((n) => n + 1);
  };

  // A replay asked for from the jars' own controls is watched: if the jars aren't fully in view
  // (behind the sticky tabs, or below the screen), bring them up first. Switching trimester from
  // the tabs doesn't scroll; someone reading the categories stays where they are
  const revealJars = () => {
    const el = jarsRef.current;
    if (!el) return;
    const { top, bottom } = el.getBoundingClientRect();
    const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    if (top < offset - 1 || bottom > window.innerHeight) {
      el.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const pour = (c) => {
    setContent(c);
    try { localStorage.setItem(CONTENT_KEY, c); } catch { /* not remembered, still shown */ }
    if (!instant) { setDone(false); setCelebrate(false); }
    setPlay((n) => n + 1);
    revealJars();
  };

  const replay = () => {
    show(view);
    revealJars();
  };

  const pickLayer = (key) => {
    if (typeof key !== 'string') { pick(key); return; }
    show(key.slice(2));
    revealJars();
  };

  // The tab stop in the tickets: the last one until another is focused
  const focusAt = chipFocus < 0 ? shown.length - 1 : chipFocus;

  const onChipKey = (e) => {
    const move = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    const to = e.key === 'Home' ? 0 : e.key === 'End' ? shown.length - 1 : move != null ? focusAt + move : null;
    if (to == null || to < 0 || to >= shown.length) return;
    e.preventDefault();
    setChipFocus(to);
    chipsRef.current.children[to].focus();
  };

  const where = view === YEAR ? 'no ano' : `no ${view}`;
  const headline = tie
    ? `Empate ${where}! Está tudo em aberto.`
    : `${leader.name} vai à frente ${where} por ${gap} ponto${gap === 1 ? '' : 's'}!`;
  const periodTotal = (v, key) => days
    .filter((d) => v === YEAR || d.trimester === v)
    .reduce((n, d) => n + dayTotal(d, key), 0);
  const inPeriod = view === YEAR ? `no ano ${pontuacoes.year}` : `no ${view}`;
  const today = localToday();
  // The next chance to score comes from the real calendar, mock data or not
  const nextActivity = pontuacoes.trimesters.flatMap((t) => t.activities).find((a) => a.date > today) ?? null;
  const byTrimester = pontuacoes.trimesters.map((t) => ({ label: t.label, activities: days.filter((d) => d.trimester === t.label) }));

  return (
    <main ref={pageRef} className={styles.page}>
      <section className={styles.hero} style={{ background: section.surface, color: section.onSurface }}>
        <img src={section.image} alt="" className={styles.heroBadge} />
        <div className="container">
          <p className={styles.heroLabel}>
            {pontuacoes.unidade} · {pontuacoes.year}
            {pontuacoes.mock && <span className={styles.mockBadge}><span className={styles.mockWords}>Dados de </span>exemplo</span>}
          </p>
          <h1 className={styles.heroTitle}>Quem vai à frente?</h1>
          <p className={styles.heroLead}>Cada atividade enche o frasco da tua patrulha. Vê quem tem mais berlindes!</p>
        </div>
      </section>

      {/* ── The period: sticks under the header, since everything below follows it ── */}
      <div ref={barRef} className={styles.viewBar}>
        <div className="container">
          <div className={styles.views} role="group" aria-label="Ver os pontos de">
            {[...trimesters, YEAR].map((v) => {
              const on = v === view;
              return (
                <button
                  key={v}
                  type="button"
                  className={`${styles.viewBtn} ${on ? styles.viewBtnOn : ''}`}
                  style={on ? { background: section.surface, color: section.onSurface, borderColor: section.surface } : undefined}
                  aria-pressed={on}
                  onClick={() => { if (!on) show(v); }}
                >
                  <span className={styles.viewName}>
                    {v === YEAR
                      ? <>Ano<span className={styles.viewWord}> todo</span></>
                      : <>{v.split(' ')[0]}<span className={styles.viewWord}> Trimestre</span></>}
                    {v === current && <><span className={styles.nowDot} aria-hidden="true" /><span className={styles.srOnly}> (agora)</span></>}
                  </span>
                  <span className={styles.viewScore}>
                    {patrulhas.map((p) => (
                      <span key={p.key} className={styles.viewPoint}>
                        <span className={styles.chipDot} style={{ background: p.color }} aria-hidden="true" />
                        <span className={styles.srOnly}>{p.name} </span>
                        {periodTotal(v, p.key)}
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── The two jars ── */}
      <section ref={jarsRef} className={styles.jarsSection} aria-labelledby="frascos">
        <div className="container">
          <h2 id="frascos" className={styles.srOnly}>Pontos de cada patrulha {inPeriod}</h2>
          {/* The result leads, right under the tabs and above the crowns, so it's on the first
              screen of a phone; while the jars fill it says they're being counted */}
          <p className={`${styles.headline} ${celebrate ? styles.headlineIn : styles.headlineWait}`} aria-live="polite">
            {celebrate ? headline : 'A contar os pontos…'}
          </p>
          <div className={styles.jars} key={play}>
            {patrulhas.map((p, i) => (
              <div key={p.key} className={styles.jarSlot}>
                <MarbleJar
                  patrulha={p}
                  total={totals[i]}
                  jar={jars.list[i]}
                  content={content}
                  side={i === 0 ? 'left' : 'right'}
                  onPick={pickLayer}
                  picked={open}
                  startDelay={START_DELAY}
                  instant={instant}
                  done={done}
                  celebrate={celebrate}
                  leader={!tie && p === leader}
                  tie={tie}
                />
                {celebrate && !instant && !tie && p === leader && <Confetti />}
              </div>
            ))}
            <span className={styles.vs} aria-hidden="true">VS</span>
          </div>

          <div className={styles.jarFooter}>
            <div className={styles.contents} role="group" aria-label="Encher os frascos com">
              <span className={styles.contentsLabel} aria-hidden="true">Encher com</span>
              {CONTENTS.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className={`${styles.contentBtn} ${content === c.key ? styles.contentBtnOn : ''}`}
                  aria-pressed={content === c.key}
                  onClick={() => { if (content !== c.key) pour(c.key); }}
                >
                  <span aria-hidden="true">{c.emoji}</span> {c.label}
                </button>
              ))}
            </div>
            <p className={styles.legendNote}>
              {value
                ? <><span className={styles.legendMarble} aria-hidden="true" />Cada berlinde vale {value} ponto{value === 1 ? '' : 's'}</>
                : 'A altura de cada camada mostra os pontos dessa atividade'}
            </p>
            <p className={`${styles.layerHint} ${styles.layerHintIn}`}>
              👆 {view === YEAR
                ? 'Cada camada é um trimestre. Toca numa para a abrir!'
                : 'Cada camada é uma atividade. Toca numa para ver os pontos!'}
            </p>
            {!instant && (
              <button type="button" className={styles.replay} onClick={replay}>
                <FaRedo aria-hidden="true" /> Encher outra vez
              </button>
            )}
          </div>

          <button
            type="button"
            className={styles.scrollCue}
            onClick={() => chartRef.current?.scrollIntoView({ behavior: instant ? 'auto' : 'smooth' })}
          >
            Vê a corrida dos pontos
            <FaChevronDown aria-hidden="true" className={styles.scrollCueIcon} />
          </button>
        </div>
      </section>

      {/* ── The race, activity by activity ── */}
      <section ref={chartRef} className={styles.raceSection} aria-labelledby="corrida">
        <div className="container">
          <h2 id="corrida" className={styles.sectionTitle}>A corrida dos pontos <span aria-hidden="true">🏁</span></h2>
          <p className={styles.sectionLead}>Como os pontos foram crescendo {inPeriod}, atividade a atividade. Toca num dia para ver o que aconteceu.</p>

          {shown.length ? (
            <>
              <div className={styles.chartCard}>
                <RaceChart key={view} days={shown} patrulhas={patrulhas} selected={open} onSelect={pick} instant={instant} />
              </div>

              <div className={styles.chipsWrap}>
                <div ref={chipsRef} className={styles.chips} role="toolbar" aria-label="Atividades" onKeyDown={onChipKey}>
                  {shown.map((d, i) => (
                    <button
                      key={d.date + d.name}
                      type="button"
                      className={`${styles.chip} ${i === open ? styles.chipOn : ''}`}
                      aria-haspopup="dialog"
                      tabIndex={i === focusAt ? 0 : -1}
                      onFocus={() => setChipFocus(i)}
                      onClick={() => pick(i)}
                    >
                      <span className={styles.chipDate}>{shortDate(d.date)}</span>
                      <span className={styles.chipName}>{d.name}</span>
                      <span className={styles.chipPoints}>
                        {patrulhas.map((p) => (
                          <span key={p.key} className={styles.chipPoint}>
                            <span className={styles.chipDot} style={{ background: p.color }} aria-hidden="true" />
                            <span className={styles.srOnly}>{p.name} </span>
                            {signed(dayTotal(d, p.key))}
                          </span>
                        ))}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className={styles.sectionLead}>A corrida ainda não começou. Volta depois da primeira atividade!</p>
          )}
        </div>
      </section>

      {/* ── Where the points came from, and where they were lost ── */}
      <section className={styles.compareSection} aria-labelledby="categorias">
        <div className="container">
          <h2 id="categorias" className={styles.sectionTitle}>Onde ganhámos e perdemos pontos <span aria-hidden="true">📊</span></h2>
          <p className={styles.sectionLead}>Os pontos de cada patrulha {inPeriod}, por categoria. Toca numa para ver de que dias vieram.</p>
          <CategoryCompare key={view} days={shown} patrulhas={patrulhas} instant={instant} onPickDay={pick} />
        </div>
      </section>

      {/* ── The final whistle: who has to catch whom ── */}
      <section className={styles.compareSection} aria-labelledby="corda">
        <div className="container">
          <h2 id="corda" className={styles.sectionTitle}>Quem puxa mais? <span aria-hidden="true">🪢</span></h2>
          <p className={styles.sectionLead}>O jogo da corda {inPeriod}: quanto mais pontos, mais a corda vai para o teu lado.</p>
          <TugOfWar
            key={view}
            patrulhas={patrulhas}
            totals={totals}
            inPeriod={inPeriod}
            trimesters={byTrimester}
            view={view}
            onPickTrimester={(t) => { if (t !== view) show(t); }}
            next={nextActivity}
            instant={instant}
            today={today}
            mock={pontuacoes.mock}
          />
        </div>
      </section>

      {open != null && shown[open] && (
        <ActivityDialog
          days={shown}
          index={open}
          patrulhas={patrulhas}
          instant={instant}
          onClose={() => setOpen(null)}
          onGo={(i) => { if (i >= 0 && i < shown.length) pick(i); }}
        />
      )}
    </main>
  );
}
