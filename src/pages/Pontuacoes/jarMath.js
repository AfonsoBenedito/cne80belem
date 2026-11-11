// Marble packing for the jars. Rows alternate front and back (the back row sits in the dips of
// the front one, a little higher and in shade), so the pile reads as having depth. All sizes
// are in marble widths.
export const ROW_H = 0.62;
const ASPECT = 1.9;               // inner height / inner width
const MAX_MARBLES = 200;          // per jar, so a long year still animates smoothly
// The jars fill one activity at a time, not one marble at a time: each activity's marbles pour
// in as a single quick cascade, and both jars get the same activity at the same moment. The
// fill then lasts as long as the number of activities, however many marbles there are.
const FILL_MS = 2600;             // the whole fill aims for about this long…
const STEP_MIN = 220;             // …but each activity gets at least this,
const STEP_MAX = 450;             // and at most this
export const FALL = 700;          // one marble's fall
export const LAND = FALL * 0.7;   // when, in its fall, a marble touches down

// Deterministic "random": the same marbles land the same way every time
export const rand = (n) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const innerH = (cols) => cols * ASPECT;
const capacity = (cols) => {
  const rows = Math.floor((innerH(cols) - 1) / ROW_H) + 1;
  return Math.ceil(rows / 2) * cols + Math.floor(rows / 2) * (cols - 1);
};

const layerCount = (points, value) => (points <= 0 ? 0 : Math.max(1, Math.round(points / value)));

// One scale for both jars: points per marble (a friendly number) and marbles per row
export function jarScale(layersByJar) {
  const most = (value) => Math.max(...layersByJar.map((ls) => ls.reduce((n, l) => n + layerCount(l.points, value), 0)));
  const value = [1, 2, 5, 10, 20, 25, 50, 100].find((v) => most(v) <= MAX_MARBLES) ?? 200;
  const count = most(value);
  const cols = [5, 6, 7, 8, 9].find((c) => capacity(c) >= count) ?? 9;
  return { value, cols, count };
}

// When each activity starts pouring (ms), shared by both jars: `keys` in order
export function pourSchedule(keys) {
  const step = Math.min(STEP_MAX, Math.max(STEP_MIN, FILL_MS / Math.max(1, keys.length)));
  return { step, starts: new Map(keys.map((k, i) => [k, i * step])) };
}

// `layers`: this jar's activities with points, oldest first ({ index, name, points })
export function buildJar(layers, { value, cols }, { step, starts }) {
  const H = innerH(cols);
  const marbles = [];
  // A course is a front row and the back row behind it, filled together in a snake (left to
  // right, then back), so one activity's marbles stay together and the line between two layers
  // is a clean step
  let course = -1;
  let queue = [];
  const nextSlot = () => {
    if (!queue.length) {
      course += 1;
      const cells = [];
      for (let j = 0; j < cols; j += 1) {
        cells.push({ i: j, back: false });
        if (j < cols - 1) cells.push({ i: j, back: true });
      }
      queue = course % 2 ? cells.reverse() : cells;
    }
    const { i, back } = queue.shift();
    const x = (back ? i + 1 : i + 0.5) + (rand(marbles.length + 3) - 0.5) * 0.14;
    return { x, y: (course * 2 + (back ? 1 : 0)) * ROW_H, back };
  };

  const pour = step * 0.8;
  const bands = layers.map((layer, li) => {
    const n = layerCount(layer.points, value);
    const start = starts.get(layer.index) ?? 0;
    const own = [];
    for (let k = 0; k < n; k += 1) {
      const m = { ...nextSlot(), id: marbles.length, delay: start + (k / n) * pour, spin: Math.round((rand(marbles.length + 11) - 0.5) * 540) };
      marbles.push(m);
      own.push(m);
    }
    const y0 = Math.min(...own.map((m) => m.y));
    const y1 = Math.max(...own.map((m) => m.y)) + 1;
    return { ...layer, tint: li % 2, marbles: own, y0, y1, land: own.at(-1).delay + LAND };
  });

  return { H, cols, bands, duration: Math.max(0, ...bands.map((b) => b.land)) };
}

// Liquid and sand: each activity is a layer whose height is its points, exactly (no rounding into
// marbles), on one scale for both jars. The leader's fill reaches 78% of the glass, leaving room
// for the straw's end or the sun umbrella on top
export function buildFill(layers, maxTotal, { step, starts }) {
  const H = ASPECT;
  const per = (H * 0.78) / Math.max(1, maxTotal);
  let y = 0;
  const bands = layers.map((layer, li) => {
    const start = starts.get(layer.index) ?? 0;
    const y0 = y;
    y += layer.points * per;
    return { ...layer, tint: li % 2, shade: li % 3, y0, y1: y, start, pour: step * 0.85, land: start + step * 0.85 };
  });
  return { H, cols: 1, bands, duration: Math.max(0, ...bands.map((b) => b.land)) };
}

// Pouring with movement: the jug (or bucket) sweeps across the mouth, and what comes out falls
// as single drops (or clumps of grains), each from wherever the spout is when it leaves, landing
// on the level just as the layer reaches it. Times are ms from the jar's start.
export const SWEEP = { amp: 22, period: 1400, lead: 600 };
const sweepX = (t) => 50 + SWEEP.amp * Math.sin((2 * Math.PI * (t + SWEEP.lead)) / SWEEP.period);

export function pourDrops(bands, H, every) {
  const drops = [];
  bands.forEach((b) => {
    const n = Math.max(3, Math.floor(b.pour / every));
    for (let k = 0; k < n; k += 1) {
      const p = (k + 1) / n;
      const level = ((b.y0 + (b.y1 - b.y0) * p) / H) * 100;
      const fall = 220 + (100 - level) * 4.5;
      const at = Math.max(0, b.start + p * b.pour - fall);
      drops.push({ id: drops.length, x: sweepX(at), level, fall, at, wobble: rand(drops.length + 41) });
    }
  });
  return drops;
}
