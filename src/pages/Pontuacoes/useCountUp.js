import { useEffect, useState } from 'react';

// Counts from 0 to `target` (ease-out) once `run` is true; with `instant`, shows the target at once
export function useCountUp(target, { run = true, duration = 900, delay = 0, instant = false } = {}) {
  const [value, setValue] = useState(instant ? target : 0);

  useEffect(() => {
    if (instant) { setValue(target); return undefined; }
    if (!run) { setValue(0); return undefined; }
    let frame;
    let start;
    const tick = (now) => {
      start ??= now + delay;
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      setValue(Math.round(target * (1 - (1 - t) ** 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run, duration, delay, instant]);

  return value;
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
