import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { seccoes } from '../../config/seccoes';
import styles from './AgeLadder.module.css';

const ORDER = ['lobitos', 'exploradores', 'pioneiros', 'caminheiros'];
// seccoes labels read "I Secção - Lobitos"; the ruler only needs the name
const sections = ORDER.map((key) => ({ key, ...seccoes[key], name: seccoes[key].label.split(' - ')[1] }));
const FIRST_AGE = sections[0].ageMin;
const LAST_AGE = sections.at(-1).ageMax;

// One continuous 6→22 ruler in four equal stretches, one per secção; the ticks on the
// joints carry the ages, so a parent reads their child's age off the line.
export default function AgeLadder() {
  const ref = useRef(null);

  // Content ships drawn; the class toggles live on the DOM, not in state. The bars draw in
  // each time the ruler rises into view from below, and retract when scrolling back up
  // drops it below again. Leaving through the top keeps them drawn.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const startsBelowFold = el.getBoundingClientRect().top >= window.innerHeight;
    if (startsBelowFold) el.classList.add(styles.pending);
    let first = true;
    // Fire on position, not visible fraction: a ruler taller than the viewport may never reach a ratio
    const io = new IntersectionObserver(([entry]) => {
      // A ruler already on screen at load must not retract on the observer's first report
      const skip = first && !startsBelowFold;
      first = false;
      if (entry.isIntersecting) el.classList.remove(styles.pending);
      else if (entry.boundingClientRect.top > 0 && !skip) el.classList.add(styles.pending);
    }, { rootMargin: '0px 0px -20% 0px' });
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove(styles.pending);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="age-ladder-title">
      <div className="container">
        <h2 id="age-ladder-title" className={styles.title}>
          Uma caminhada dos {FIRST_AGE} aos {LAST_AGE} anos
        </h2>

        <ol
          ref={ref}
          className={styles.ladder}
          style={{ '--last': sections.length - 1 }}
        >
          {sections.map((s, i) => (
            <li
              key={s.key}
              className={styles.stretch}
              style={{
                '--i': i,
                '--surface': s.surface,
                '--on-surface': s.onSurface,
                '--ink': s.ink,
              }}
            >
              <Link to={`/seccao/${s.key}`} className={styles.stretchLink}>
                <span className={styles.tick} aria-hidden="true">{s.ageMin}</span>
                {i === sections.length - 1 && (
                  <span className={`${styles.tick} ${styles.tickEnd}`} aria-hidden="true">{s.ageMax}</span>
                )}
                <span className={styles.bar}>
                  <span className={styles.barName} aria-hidden="true">{s.name}</span>
                </span>
                <span className={styles.body}>
                  <span className={styles.name}>{s.name}</span>
                  <span className={styles.ages}>{s.ageMin}–{s.ageMax} anos</span>
                  <span className={styles.tagline}>{s.tagline}</span>
                  <span className={styles.more}>
                    Conhecer a secção <FaArrowRight size={10} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <p className={styles.schedule}>
          Encontramo-nos aos sábados à tarde, na sede - Capela Nossa Senhora das Dores.
        </p>
      </div>
    </section>
  );
}
