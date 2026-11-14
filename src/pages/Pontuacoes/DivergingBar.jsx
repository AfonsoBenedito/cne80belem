import styles from './DivergingBar.module.css';

// One bar on a centre line: points lost grow to the left (hatched), points gained to the right.
// `max` is the largest value on the shared scale, so bars side by side compare. `sqrt` eases the
// scale so small values stay visible beside a much larger one (still longer = more).
// `oneSided`: nothing can be lost, so zero is the left end and gains get the whole track.
export default function DivergingBar({ neg = 0, pos = 0, max, color, order = 0, thin, run = true, sqrt, oneSided }) {
  const share = (n) => Math.abs(n) / Math.max(1, max);
  const half = (n) => `${(sqrt ? Math.sqrt(share(n)) : share(n)) * (oneSided ? 100 : 50)}%`;
  const grow = run ? styles.grow : styles.idle;
  return (
    <span className={`${styles.track} ${thin ? styles.thin : ''} ${oneSided ? styles.oneSided : ''}`} style={{ '--c': color, '--o': order }} aria-hidden="true">
      {neg < 0 && <span className={`${styles.fill} ${styles.neg} ${grow}`} style={{ width: half(neg) }} />}
      {pos > 0 && <span className={`${styles.fill} ${styles.pos} ${grow}`} style={{ width: half(pos) }} />}
      <span className={styles.zero} />
    </span>
  );
}
