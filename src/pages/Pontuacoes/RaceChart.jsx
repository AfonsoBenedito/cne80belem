import { useEffect, useRef, useState } from 'react';
import { shortDate } from './dates';
import styles from './RaceChart.module.css';

const PAD = { top: 28, right: 44, bottom: 40, left: 40 };
const DRAW_MS = 1800;


function niceTicks(max) {
  const step = [5, 10, 25, 50, 100, 200, 250, 500].find((s) => max / s <= 5) ?? 1000;
  const top = Math.max(step, Math.ceil(max / step) * step);
  return Array.from({ length: top / step + 1 }, (_, i) => i * step);
}

// The line drawn so far: every point reached, and the part of the next segment
function partial(pts, s) {
  const whole = Math.floor(s);
  const out = pts.slice(0, whole + 1);
  if (whole < pts.length - 1) {
    const f = s - whole;
    const [a, b] = [pts[whole], pts[whole + 1]];
    out.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]);
  }
  return out;
}

// `days`: the activities so far, each with `cum` (running totals per patrulha) and `trimester`
export default function RaceChart({ days, patrulhas, selected, onSelect, instant }) {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(instant ? 1 : 0);
  const [hover, setHover] = useState(null);
  const hitsRef = useRef(null);
  const pressRef = useRef(false);
  // Drawn at the plot's real width, so its text stays the same size on a phone and a desktop
  const plotRef = useRef(null);
  const [W, setW] = useState(640);
  const H = W < 500 ? 260 : 320;
  const n = days.length;

  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => setW(Math.round(entry.contentRect.width) || 640));
    ro.observe(plotRef.current);
    return () => ro.disconnect();
  }, []);

  // The race is run when the chart scrolls into view
  useEffect(() => {
    if (instant) { setProgress(1); return undefined; }
    let frame;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      let start;
      const tick = (now) => {
        start ??= now;
        const t = Math.min(1, (now - start) / DRAW_MS);
        setProgress(t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.45 });
    io.observe(wrapRef.current);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [instant]);

  const ticks = niceTicks(Math.max(0, ...days.flatMap((d) => patrulhas.map((p) => d.cum[p.key]))));
  const yMax = ticks.at(-1);
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const step = n > 1 ? plotW / (n - 1) : 0;
  const x = (i) => (n > 1 ? PAD.left + i * step : PAD.left + plotW / 2);
  const y = (v) => PAD.top + plotH - (Math.max(0, v) / yMax) * plotH;
  const s = progress * Math.max(0, n - 1);
  const labelEvery = Math.ceil(n / Math.max(2, Math.floor(plotW / 64)));
  const colW = n > 1 ? step : plotW;
  // A day's column, kept inside the chart at both ends
  const col = (i) => {
    const left = Math.max(0, x(i) - colW / 2);
    return [left, Math.min(W, x(i) + colW / 2) - left];
  };

  const lines = patrulhas.map((p) => {
    const pts = days.map((d, i) => [x(i), y(d.cum[p.key])]);
    return { p, pts, drawn: partial(pts, s) };
  });
  // Two avatars on the same spot are nudged apart, so both stay visible
  const heads = lines.map((l) => l.drawn.at(-1));
  if (heads.length === 2 && Math.abs(heads[0][1] - heads[1][1]) < 22) {
    const mid = (heads[0][1] + heads[1][1]) / 2;
    heads[0] = [heads[0][0], mid - 11];
    heads[1] = [heads[1][0], mid + 11];
  }

  // The day whose column is nearest the pointer
  const nearest = (e) => {
    const r = hitsRef.current.getBoundingClientRect();
    const xv = ((e.clientX - r.left) / r.width) * W;
    return n > 1 ? Math.max(0, Math.min(n - 1, Math.round((xv - PAD.left) / step))) : 0;
  };

  // With nothing picked, the last activity's column is highlighted; the callout is for hovering
  const marked = selected ?? n - 1;
  const shown = hover;

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <ul className={styles.legend} aria-hidden="true">
        {patrulhas.map((p) => (
          <li key={p.key}><span className={styles.swatch} style={{ background: p.color }} />{p.emoji} {p.name}</li>
        ))}
      </ul>

      <div ref={plotRef} className={styles.plot}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} role="img" aria-label={`Pontos acumulados de cada patrulha ao longo de ${n} atividades`}>
          {/* Selected day's column */}
          {n > 0 && (
            <rect
              className={styles.selCol}
              x={col(marked)[0]}
              y={PAD.top - 12}
              width={col(marked)[1]}
              height={plotH + 12}
              rx="8"
            />
          )}

          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className={t === 0 ? styles.baseline : styles.grid} />
              <text x={PAD.left - 8} y={y(t)} className={styles.yLabel}>{t}</text>
            </g>
          ))}

          {/* A new trimester starts here */}
          {days.map((d, i) => (i > 0 && d.trimester !== days[i - 1].trimester ? (
            <g key={`t${i}`}>
              <line x1={x(i) - step / 2} x2={x(i) - step / 2} y1={PAD.top - 14} y2={PAD.top + plotH} className={styles.trimLine} />
              <text x={x(i) - step / 2 + 6} y={PAD.top - 16} className={styles.trimLabel}>{d.trimester}</text>
            </g>
          ) : null))}

          {days.map((d, i) => (i % labelEvery === 0 || i === n - 1 || i === marked ? (
            <text key={d.date} x={x(i)} y={H - PAD.bottom + 22} className={`${styles.xLabel} ${i === marked ? styles.xLabelSel : ''}`}>
              {shortDate(d.date)}
            </text>
          ) : null))}

          {lines.map(({ p, drawn }) => (
            <polyline key={p.key} points={drawn.map((pt) => pt.join(',')).join(' ')} className={styles.line} style={{ stroke: p.color }} />
          ))}

          {lines.map(({ p, pts }) => pts.map((pt, i) => (i <= s + 0.001 ? (
            <circle
              key={`${p.key}${i}`}
              cx={pt[0]}
              cy={pt[1]}
              r={i === marked ? 6 : 4.5}
              className={styles.dot}
              style={{ fill: p.color }}
            />
          ) : null)))}

          {/* Each patrulha rides the front of its line */}
          {lines.map(({ p }, li) => (
            <g key={`h${p.key}`} transform={`translate(${heads[li][0]} ${heads[li][1]})`} className={styles.head}>
              <circle r="15" className={styles.headRing} style={{ stroke: p.color }} />
              <text className={styles.headEmoji}>{p.emoji}</text>
            </g>
          ))}
        </svg>

        {/* Mouse and touch pick the day nearest the pointer, so even a 22px-wide day on a phone is
            easy to hit: a finger can slide along the chart (the callout follows it) and lifting
            opens that day. A vertical swipe still scrolls the page. The cards below are the
            keyboard way */}
        <div
          ref={hitsRef}
          className={styles.hits}
          aria-hidden="true"
          onPointerDown={(e) => {
            pressRef.current = true;
            // Keep the drag even if the finger slides off the chart; the release comes back here
            e.currentTarget.setPointerCapture?.(e.pointerId);
            setHover(nearest(e));
          }}
          onPointerMove={(e) => { if (e.pointerType === 'mouse' || pressRef.current) setHover(nearest(e)); }}
          onPointerUp={(e) => {
            if (pressRef.current) onSelect(nearest(e));
            pressRef.current = false;
            if (e.pointerType !== 'mouse') setHover(null);
          }}
          onPointerCancel={() => { pressRef.current = false; setHover(null); }}
          onLostPointerCapture={(e) => { pressRef.current = false; if (e.pointerType !== 'mouse') setHover(null); }}
          onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHover(null); }}
        />

        {shown != null && (
          <div
            className={styles.tooltip}
            style={{ left: `${(x(shown) / W) * 100}%`, transform: shown > n / 2 ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)' }}
            aria-hidden="true"
          >
            <p className={styles.tipDate}>{shortDate(days[shown].date)}</p>
            <p className={styles.tipName}>{days[shown].name}</p>
            {patrulhas.map((p) => (
              <p key={p.key} className={styles.tipRow}>
                <span className={styles.swatch} style={{ background: p.color }} />
                {p.name} <strong>{days[shown].cum[p.key]}</strong>
              </p>
            ))}
            <p className={styles.tipHint}>Toca para ver o dia</p>
          </div>
        )}
      </div>
    </div>
  );
}
