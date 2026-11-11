import { useEffect, useMemo, useRef, useState } from 'react';
import { FALL, SWEEP, pourDrops } from './jarMath';
import styles from './MarbleJar.module.css';

const signed = (n) => (n > 0 ? `+${n}` : `${n}`);

// A glass jar, one layer per activity. A layer is a button: it opens that
// activity's breakdown. Arrow keys move between the layers (one tab stop per jar).
// `done`: poured (the lid closes, the umbrella goes in); `celebrate`: the winner's moment, after
// that (the jar shakes, the crown lands, then the straw goes in)
// `content`: what fills it, 'berlindes' (marbles), 'sumo' (layered liquid) or 'areia' (sand art)
export default function MarbleJar({ patrulha, total, jar, content = 'berlindes', startDelay = 0, instant, done, celebrate, leader, tie, side, onPick, picked }) {
  const { H, cols, bands } = jar;
  const count = bands.length;
  const [landed, setLanded] = useState(instant ? count : 0);
  const [focusIdx, setFocusIdx] = useState(bands.length - 1);
  const layerRefs = useRef([]);
  const marbles = content === 'berlindes';
  const top = bands.at(-1);
  const drops = useMemo(() => (marbles || instant ? [] : pourDrops(bands, H, content === 'areia' ? 32 : 42)), [marbles, instant, bands, H, content]);
  // The umbrella leans a little, left or right, differently each time the jar fills
  const [tilt] = useState(() => (Math.random() < 0.5 ? -1 : 1) * (6 + Math.random() * 10));
  // The straw goes in at a random spot, 16–32% in from either side: never under the crown, which
  // sits in the middle of the lid
  const [strawX] = useState(() => {
    const v = 0.16 + Math.random() * 0.16;
    return Math.random() < 0.5 ? v : 1 - v;
  });

  // The score goes up by each activity's points as its layer lands
  useEffect(() => {
    if (instant) { setLanded(count); return undefined; }
    let frame;
    let start;
    let n = 0;
    const tick = (now) => {
      start ??= now + startDelay;
      while (n < count && now - start >= bands[n].land) n += 1;
      setLanded(n);
      if (n < count) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [bands, count, startDelay, instant]);

  // Days that lost points add no layer, so the last step lands on the real total
  const shown = landed === count ? total : bands.slice(0, landed).reduce((n, b) => n + b.points, 0);

  // The marbles are built once per pour: the score's step-by-step updates re-render the jar up to
  // ~30 times while it fills, and reusing the same elements lets React skip every marble (up to
  // ~200 per jar) on each of those
  const marbleEls = useMemo(() => bands.map((b) => {
    if (!marbles) return null;
    const span = b.y1 - b.y0;
    return b.marbles.map((m) => (
      <span
        key={m.id}
        className={`${styles.marble} ${styles[`tint${b.tint}`]} ${m.back ? styles.back : ''}`}
        style={{
          left: `${((m.x - 0.5) / cols) * 100}%`,
          width: `${100 / cols}%`,
          bottom: `${((m.y - b.y0) / span) * 100}%`,
          '--rise': H - m.y + 2,
          '--delay': `${startDelay + m.delay}ms`,
          '--fall': `${FALL}ms`,
          '--spin': `${m.spin}deg`,
          '--shade': m.id % 3,
        }}
      />
    ));
  }), [bands, marbles, cols, H, startDelay]);

  const onKeyDown = (e) => {
    const last = bands.length - 1;
    const to = { ArrowUp: focusIdx + 1, ArrowRight: focusIdx + 1, ArrowDown: focusIdx - 1, ArrowLeft: focusIdx - 1, Home: 0, End: last }[e.key];
    if (to == null) return;
    e.preventDefault();
    const i = Math.max(0, Math.min(last, to));
    setFocusIdx(i);
    layerRefs.current[i]?.focus();
  };

  return (
    <figure
      className={`${styles.jarWrap} ${celebrate && leader ? styles.winner : ''} ${instant ? styles.instant : ''} ${side === 'left' ? styles.sideLeft : ''}`}
      style={{ '--patrol': patrulha.color, '--patrol-surface': patrulha.surface, '--patrol-on': patrulha.onSurface }}
    >
      <div className={styles.crownSlot} aria-hidden="true">
        {celebrate && (leader || tie) && <span className={styles.crown}>{tie ? '⭐' : '👑'}</span>}
      </div>

      <div className={styles.jar}>
        <div className={`${styles.lid} ${done ? styles.lidClosed : ''}`}>
          <span className={styles.lidName}>{patrulha.name}</span>
        </div>

        <div className={styles.body}>
          <span className={styles.backWall} aria-hidden="true" />
          <div
            className={styles.inner}
            style={{ aspectRatio: `${cols} / ${H}` }}
            role="group"
            aria-label={`Frasco da patrulha ${patrulha.name}: uma camada por atividade`}
            onKeyDown={onKeyDown}
          >
            {bands.map((b, i) => {
              const span = b.y1 - b.y0;
              return (
                <button
                  key={b.index}
                  ref={(el) => { layerRefs.current[i] = el; }}
                  type="button"
                  className={`${styles.layer} ${marbles ? '' : styles.layerSolid} ${picked === b.index ? styles.layerPicked : ''} ${done && i === bands.length - 1 ? styles.layerHint : ''}`}
                  style={{ bottom: `${(b.y0 / H) * 100}%`, height: `${(span / H) * 100}%` }}
                  tabIndex={i === focusIdx ? 0 : -1}
                  aria-label={`${b.name}: ${signed(b.points)} pontos`}
                  onFocus={() => setFocusIdx(i)}
                  onClick={() => onPick(b.index)}
                >
                  {/* Juice rises inside its layer (a clip, so the wave on its front rides along);
                      sand piles up as a mound that spreads */}
                  {content === 'sumo' && (
                    <span className={styles.fillClip}>
                      <span
                        className={`${styles.fill} ${styles.sumo} ${styles[`shade${b.shade}`]}`}
                        style={{ '--start': `${startDelay + b.start}ms`, '--pour': `${b.pour}ms` }}
                      />
                    </span>
                  )}
                  {content === 'areia' && (
                    <span
                      className={`${styles.fill} ${styles.areia} ${styles[`shade${b.shade}`]}`}
                      style={{ '--start': `${startDelay + b.start}ms`, '--pour': `${b.pour}ms` }}
                    />
                  )}
                  {marbleEls[i]}
                  <span className={styles.tag} aria-hidden="true">
                    <span>{b.name}</span> <strong>{signed(b.points)}</strong>
                  </span>
                </button>
              );
            })}
          </div>
          {/* The liquid's moving surface and a few bubbles, on the top layer once it's poured: inside
              the glass, under the straw */}
          {content === 'sumo' && top && (
            <div className={styles.liquidTop} aria-hidden="true">
              <span
                className={styles.surface}
                style={{ bottom: `${(top.y1 / H) * 100}%`, '--start': `${startDelay + top.land}ms` }}
              />
              {[0, 1, 2, 3, 4].map((k) => (
                <span
                  key={k}
                  className={styles.bubble}
                  style={{ left: `${16 + k * 17}%`, '--top': `${(1 - top.y1 / H) * 100}%`, '--start': `${startDelay + top.land + k * 450}ms` }}
                />
              ))}
            </div>
          )}
          {/* The straw inside the glass: one straight piece, tinted by the juice below the surface's
              front edge. The hole, the straw's top and this part all sit at the same spot (--sx) */}
          {content === 'sumo' && top && celebrate && (
            <span className={styles.strawIn} style={{ '--sx': strawX, '--level': `${(top.y1 / H) * 100}%` }} aria-hidden="true">
              <span className={styles.strawInside} />
              <span className={styles.strawTint} />
            </span>
          )}
          {/* Inside the glass, on the sand: the sun umbrella, pushed in once the jar is full */}
          {top && done && content === 'areia' && (
            <div className={styles.scene} aria-hidden="true">
              {content === 'areia' && (
                <span className={styles.umbrella} style={{ bottom: `${(top.y1 / H) * 100}%`, '--tilt': `${tilt.toFixed(1)}deg` }}>
                  <svg viewBox="0 0 50 58" width="100%" height="100%">
                    <rect x="23.6" y="14" width="2.8" height="44" rx="1.4" fill="var(--color-gray-700)" />
                    <g className={styles.umbrellaTop}>
                      <path d="M2 20 Q25 -8 48 20 Q42 15 36.5 20 Q31 15 25 20 Q19 15 13.5 20 Q8 15 2 20Z" fill="var(--patrol-surface)" />
                      <path d="M13.5 20 Q19 15 25 20 Q25 2 25 4.5 Q15 6 13.5 20Z M36.5 20 Q31 15 25 20 Q25 2 25 4.5 Q35 6 36.5 20Z" fill="var(--color-white)" />
                      <circle cx="25" cy="4.5" r="2.2" fill="var(--color-yellow)" />
                    </g>
                  </svg>
                  {[0, 1, 2].map((k) => <span key={k} className={styles.puff} style={{ '--k': k }} />)}
                </span>
              )}
            </div>
          )}
          {/* An empty jar says so, instead of looking unfinished */}
          {done && !bands.length && <span className={styles.empty}>Ainda sem pontos</span>}
          <span className={styles.frontGlass} aria-hidden="true" />
          {/* Measuring-cup marks on the outer side of the glass: one where each activity's layer
              ends, appearing as it lands, so the layers can be told apart even in the marbles */}
          <div className={styles.ticks} aria-hidden="true">
            {bands.map((b) => (
              <span
                key={b.index}
                className={styles.tick}
                style={{ bottom: `${(b.y1 / H) * 100}%`, '--at': `${instant ? 0 : startDelay + b.land}ms` }}
              />
            ))}
          </div>
          {/* Liquid and sand pour from a jug or a bucket that sweeps across the mouth: drops (or
              clumps of grains) fall from wherever the spout is and land on the rising level */}
          {!marbles && !instant && (
            <>
              <span
                className={styles.pourTrack}
                style={{
                  '--sweep-at': `${startDelay - SWEEP.lead}ms`,
                  '--sweep-period': `${SWEEP.period}ms`,
                  '--sweep-times': Math.ceil((jar.duration + SWEEP.lead + 600) / SWEEP.period),
                  '--amp': `${SWEEP.amp}%`,
                }}
                aria-hidden="true"
              >
              <span
                className={`${styles.pourer} ${content === 'areia' ? styles.bucket : styles.jug}`}
                style={{ '--in': `${Math.max(0, startDelay - 350)}ms`, '--out': `${startDelay + jar.duration}ms` }}
              >
                {content === 'areia' ? (
                  <svg viewBox="0 0 60 56" width="100%" height="100%">
                    <path d="M6 8 H54 L48 52 Q47 55 44 55 H16 Q13 55 12 52Z" fill="var(--color-yellow)" stroke="var(--color-gray-700)" strokeWidth="2" />
                    <rect x="3" y="4" width="54" height="7" rx="3.5" fill="var(--color-yellow-dark)" stroke="var(--color-gray-700)" strokeWidth="2" />
                    <path d="M8 9 Q30 -14 52 9" fill="none" stroke="var(--color-gray-700)" strokeWidth="2.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 60 60" width="100%" height="100%">
                    <path d="M44 20 Q58 22 56 34 Q54 44 44 44" fill="none" stroke="var(--color-gray-700)" strokeWidth="3" />
                    <path d="M2 6 L14 4 H44 V54 Q44 58 40 58 H16 Q12 58 12 54 V14Z" fill="rgba(255,255,255,0.75)" stroke="var(--color-gray-700)" strokeWidth="2" />
                    <path d="M13 26 H43 V54 Q43 57 40 57 H16 Q13 57 13 54Z" fill="var(--patrol)" />
                  </svg>
                )}
              </span>
              </span>
              <div className={styles.rain} aria-hidden="true">
                {drops.map((d) => (
                  <span
                    key={d.id}
                    className={content === 'areia' ? styles.clump : styles.drop}
                    style={{
                      left: `${d.x}%`,
                      bottom: `${d.level}%`,
                      '--from': `-${(104 - d.level).toFixed(1)}cqh`,
                      '--fall': `${Math.round(d.fall)}ms`,
                      '--at': `${Math.round(startDelay + d.at)}ms`,
                      '--spin': `${Math.round((d.wobble - 0.5) * 300)}deg`,
                    }}
                  />
                ))}
              </div>
            </>
          )}
          {/* The hole in the lid and the straw's top coming out of it */}
          {content === 'sumo' && celebrate && (
            <>
              <span className={styles.lidHole} style={{ '--sx': strawX }} aria-hidden="true" />
              <span className={styles.straw} style={{ '--sx': strawX }} aria-hidden="true" />
            </>
          )}
          {/* Each activity's points pop up out of the jar as its layer lands */}
          {!instant && (
            <div className={styles.pops} aria-hidden="true">
              {bands.map((b) => (
                <span
                  key={b.index}
                  className={styles.pop}
                  style={{ bottom: `${(b.y1 / H) * 100}%`, '--at': `${startDelay + b.land}ms` }}
                >
                  {signed(b.points)}
                </span>
              ))}
            </div>
          )}
          <span className={styles.mouth} aria-hidden="true" />
          <span className={styles.label} aria-hidden="true">{patrulha.emoji}</span>
        </div>
        <span className={styles.floor} aria-hidden="true" />
      </div>

      <figcaption className={styles.caption}>
        <span className={styles.score} aria-hidden="true">
          <span key={landed} className={landed && !instant ? styles.bump : undefined}>{shown}</span>
        </span>
        <span className={styles.scoreUnit} aria-hidden="true">pontos</span>
        <span className={styles.srOnly}>Patrulha {patrulha.name}: {total} pontos</span>
      </figcaption>
    </figure>
  );
}
