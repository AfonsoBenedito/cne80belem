// Shared physics for swipe surfaces (the home Carousel, the notícia photo viewer), after Apple's
// Designing Fluid Interfaces: 1:1 tracking, rubber-banding at the ends, momentum-projected
// commits, and a settle that starts at the finger's speed so there is no seam on release.

export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
// Initial slope of EASE_OUT (dy/dx at t=0 ≈ 1 / 0.16): used to hand the finger's velocity to the
// release transition
export const EASE_OUT_SLOPE = 6.25;

// Where a flick would come to rest (velocity in px/s)
export const project = (velocity, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate);

// Resistance past an edge: the further the pull, the less it moves
export const rubberband = (overshoot, dimension, c = 0.55) =>
  (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));

// Release speed (px/s) along one axis from the last few pointer samples ({ x, y, t })
export function releaseVelocity(history, axis) {
  if (history.length < 2) return 0;
  const first = history[0];
  const last = history[history.length - 1];
  const span = last.t - first.t;
  return span > 0 ? ((last[axis] - first[axis]) / span) * 1000 : 0;
}

// How long an EASE_OUT settle over `remaining` px should take so it starts at `velocity` px/s
export function settleDuration(remaining, velocity, { min = 220, max = 700, still = 450 } = {}) {
  if (Math.abs(velocity) <= 50) return still;
  return Math.min(max, Math.max(min, ((EASE_OUT_SLOPE * Math.abs(remaining)) / Math.abs(velocity)) * 1000));
}
