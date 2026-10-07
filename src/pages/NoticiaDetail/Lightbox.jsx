import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import { srcSetFor, aspectRatioFor } from '../../utils/responsiveImage';
import { useModalDialog } from '../../utils/useModalDialog';
import { EASE_OUT, project, rubberband, releaseVelocity, settleDuration } from '../../utils/swipePhysics';
import styles from './Lightbox.module.css';

const AXIS_LOCK = 8; // px a drag travels before it commits to swipe, dismiss or pan
const TAP_SLOP = 10; // px a press may wander and still count as a tap
const DOUBLE_TAP_MS = 300;
const DISMISS_DISTANCE = 0.18; // share of the stage height a downward drag needs to close
const DISMISS_VELOCITY = 900; // px/s: a downward flick closes from any distance
const MIN_FLICK = 16; // px a flick must travel to count, however fast
const MAX_ZOOM = 4;
const DOUBLE_TAP_ZOOM = 2.5;
const STEP_MS = 420; // arrow, key or thumbnail change: a settle across one photo
const ZOOM_MS = 320;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// How wide the photo will be shown, so the browser fetches that file and not one for the full
// width: it is held by the screen's width or by the height left for it (all of it on a short
// landscape screen, where the controls float; less about 168px of bars elsewhere), whichever is
// smaller for its shape. A browser that can't read this falls back to the full width.
const viewerSizes = (ratio) => {
  if (!ratio) return '100vw';
  const r = ratio.toFixed(3);
  return `(max-height: 500px) and (orientation: landscape) min(100vw, calc((100vh - 8px) * ${r})), min(100vw, calc((100vh - 168px) * ${r}))`;
};

// Full-screen photo viewer. A modal dialog (Escape, focus kept inside and handed back, page scroll
// locked) whose photos sit on one track: a swipe moves the track 1:1, so the next photo is already
// there, and on release it settles from the finger's own speed. The ends resist instead of
// looping. A drag down closes it, the backdrop thinning as it goes; a pinch, a double tap, or
// Ctrl/⌘ + scroll zooms the photo itself, and a zoomed photo pans.
export default function Lightbox({ photos, index, onIndex, onClose, title, leaving = false, onLeft }) {
  const panelRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const imgRef = useRef(null); // the current photo
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const zoom = useRef({ s: 1, x: 0, y: 0 });
  const lastTap = useRef(null);
  const moved = useRef(false); // the press that is ending was a gesture, not a tap
  const nextSettle = useRef(0); // how the track should arrive at the next index
  const [zoomed, setZoomed] = useState(false);
  // What a screen reader hears when a zoom settles (the "N de M" counter is its own live region)
  const [zoomNote, setZoomNote] = useState('');
  const wheelNote = useRef(0);
  const layerTimer = useRef(0);
  // Every deferred step (the end-of-row nudge, the close after a drag down) is tracked, so closing
  // the viewer first cancels it
  const timers = useRef(new Set());
  const later = (fn, ms) => {
    const id = setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
  };
  const total = photos.length;
  // One photo: just the photo and its close button; no counter, arrows or strip
  const single = total < 2;
  const atStart = index === 0;
  const atEnd = index === total - 1;

  useModalDialog(panelRef, onClose);

  // Closing (any way, Back included) fades the viewer out before it unmounts. The animation's end
  // is the signal; a timer covers a browser that never fires it.
  useEffect(() => {
    if (!leaving) return;
    const panel = panelRef.current;
    const done = () => onLeft?.();
    const timer = setTimeout(done, 400);
    panel?.addEventListener('animationend', done, { once: true });
    return () => {
      clearTimeout(timer);
      panel?.removeEventListener('animationend', done);
    };
  }, [leaving, onLeft]);

  // ── Applying positions (straight to the DOM: they change every frame of a gesture) ──
  // The track gets its own compositor layer only while it moves (a gesture, or a settle), not for as
  // long as the viewer is open
  const holdLayer = (ms) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.willChange = 'transform';
    clearTimeout(layerTimer.current);
    if (ms !== Infinity) {
      layerTimer.current = setTimeout(() => {
        if (trackRef.current) trackRef.current.style.willChange = '';
      }, ms + 60);
    }
  };

  const placeTrack = (dx, dy, ms) => {
    const track = trackRef.current;
    if (!track) return;
    if (ms) holdLayer(ms);
    else if (gesture.current?.type === 'swipe' || gesture.current?.type === 'dismiss') holdLayer(Infinity);
    track.style.transition = ms ? `transform ${ms}ms ${EASE_OUT}` : 'none';
    track.style.transform = `translate3d(calc(${-index} * (100% + var(--slide-gap)) + ${dx}px), ${dy}px, 0)`;
  };

  const setDismiss = (amount, ms) => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.style.transition = ms ? `--dismiss ${ms}ms ${EASE_OUT}` : 'none';
    panel.style.setProperty('--dismiss', String(amount));
  };

  const applyZoom = (ms) => {
    const img = imgRef.current;
    if (!img) return;
    const { s, x, y } = zoom.current;
    img.style.transition = ms ? `transform ${ms}ms ${EASE_OUT}` : 'none';
    img.style.transform = s === 1 && x === 0 && y === 0 ? '' : `translate3d(${x}px, ${y}px, 0) scale(${s})`;
  };

  // How far a photo at scale s may pan before its edge would come away from the stage's edge
  const panBounds = (s) => {
    const img = imgRef.current;
    const stage = stageRef.current;
    if (!img || !stage) return { x: 0, y: 0 };
    return {
      x: Math.max(0, (img.offsetWidth * s - stage.clientWidth) / 2),
      y: Math.max(0, (img.offsetHeight * s - stage.clientHeight) / 2),
    };
  };

  // Scale to s keeping the screen point (px, py) still under the finger or cursor
  const announceZoom = () => {
    const s = zoom.current.s;
    setZoomNote(s > 1 ? `Foto ampliada a ${Math.round(s * 100)}%` : 'Foto no tamanho original');
  };

  const zoomAround = (s, px, py, ms, announce = true) => {
    const img = imgRef.current;
    if (!img) return;
    const z = zoom.current;
    const next = clamp(s, 1, MAX_ZOOM);
    const r = img.getBoundingClientRect();
    const ox = px - (r.left + r.width / 2);
    const oy = py - (r.top + r.height / 2);
    const k = 1 - next / z.s;
    const b = panBounds(next);
    zoom.current = { s: next, x: clamp(z.x + ox * k, -b.x, b.x), y: clamp(z.y + oy * k, -b.y, b.y) };
    if (next === 1) zoom.current = { s: 1, x: 0, y: 0 };
    applyZoom(ms);
    setZoomed(next > 1);
    if (announce) announceZoom();
  };

  // The zoom button: in to DOUBLE_TAP_ZOOM around the centre, or back out
  const toggleZoom = () => {
    const r = stageRef.current.getBoundingClientRect();
    zoomAround(zoom.current.s > 1 ? 1 : DOUBLE_TAP_ZOOM, r.left + r.width / 2, r.top + r.height / 2, ZOOM_MS);
  };

  // Whether a screen point is on the current photo. Taken from the photo's box, not the event
  // target: once the stage captures a pointer, the browser reports the click on the stage.
  const onPhoto = (x, y) => {
    const r = imgRef.current?.getBoundingClientRect();
    return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  const resetZoom = () => {
    zoom.current = { s: 1, x: 0, y: 0 };
    applyZoom(0);
    setZoomed(false);
  };

  // ── Changing photo ──
  // Every change settles the track from wherever it is now: the finger's speed after a swipe,
  // a steady STEP_MS after an arrow, key or thumbnail
  useLayoutEffect(() => {
    zoom.current = { s: 1, x: 0, y: 0 };
    setZoomed(false);
    // A new photo starts at its normal size; clearing the note says nothing (it is not a change
    // the user made) and leaves no stale zoom level behind
    setZoomNote('');
    placeTrack(0, 0, nextSettle.current);
    nextSettle.current = STEP_MS;
    // placeTrack reads index; this runs exactly when it changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // An arrow at an end doesn't wrap: the track leans toward the missing photo and springs back
  const nudge = (step) => {
    placeTrack(step > 0 ? -28 : 28, 0, 140);
    later(() => placeTrack(0, 0, 360), 140);
  };

  const go = (step) => {
    if (single) return;
    const target = index + step;
    if (target < 0 || target >= total) {
      nudge(step);
      return;
    }
    onIndex(target);
  };

  // Keyboard: Alt+← is the browser's Back; a held modifier means the keys aren't meant for the photos
  const centre = () => {
    const r = stageRef.current.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2, ZOOM_MS];
  };
  const onKey = (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.defaultPrevented) return;
    if (e.key === 'ArrowLeft' && !e.shiftKey) go(-1);
    else if (e.key === 'ArrowRight' && !e.shiftKey) go(1);
    else if (e.key === '+' || e.key === '=') zoomAround(zoom.current.s * 1.6, ...centre());
    else if (e.key === '-') zoomAround(zoom.current.s / 1.6, ...centre());
    else if (e.key === '0') zoomAround(1, ...centre());
  };

  // Ctrl/⌘ + scroll (a trackpad pinch on a laptop) zooms around the cursor; plain scroll pans a
  // zoomed photo. Not passive, so the page itself doesn't zoom or scroll underneath.
  const onWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      zoomAround(zoom.current.s * Math.exp(-e.deltaY / 200), e.clientX, e.clientY, 0, false);
      // Scrolling zooms in many small steps: speak once it pauses
      clearTimeout(wheelNote.current);
      wheelNote.current = setTimeout(announceZoom, 400);
    } else if (zoom.current.s > 1) {
      e.preventDefault();
      const b = panBounds(zoom.current.s);
      const z = zoom.current;
      zoom.current = { ...z, x: clamp(z.x - e.deltaX, -b.x, b.x), y: clamp(z.y - e.deltaY, -b.y, b.y) };
      applyZoom(0);
    }
  };

  // The listeners are attached once; each call reaches the latest handlers (which close over the
  // current photo) through these refs
  const keyHandler = useRef(onKey);
  const wheelHandler = useRef(onWheel);
  useLayoutEffect(() => {
    keyHandler.current = onKey;
    wheelHandler.current = onWheel;
  });
  useEffect(() => {
    const stage = stageRef.current;
    const key = (e) => keyHandler.current(e);
    const wheel = (e) => wheelHandler.current(e);
    document.addEventListener('keydown', key);
    stage.addEventListener('wheel', wheel, { passive: false });
    return () => {
      document.removeEventListener('keydown', key);
      stage.removeEventListener('wheel', wheel);
    };
  }, []);

  useEffect(() => () => {
    clearTimeout(wheelNote.current);
    clearTimeout(layerTimer.current);
    timers.current.forEach(clearTimeout);
  }, []);

  // ── Gestures ──
  // The stage takes every touch (touch-action: none) and sorts it out here: one finger swipes,
  // dismisses or pans; two fingers pinch.
  const stagePoint = () => {
    const r = stageRef.current.getBoundingClientRect();
    return { w: r.width, h: r.height };
  };

  // The track's live offset from its resting place, so grabbing it mid-settle never jumps
  const liveTrack = () => {
    const t = new DOMMatrixReadOnly(getComputedStyle(trackRef.current).transform);
    const slide = trackRef.current.firstElementChild;
    const step = slide ? slide.offsetWidth + parseFloat(getComputedStyle(trackRef.current).columnGap || 0) : 0;
    return { dx: t.m41 + index * step, dy: t.m42 };
  };

  const startPinch = () => {
    const [a, b] = [...pointers.current.values()];
    const live = liveTrack();
    if (Math.abs(live.dx) > 1 || Math.abs(live.dy) > 1) {
      placeTrack(0, 0, 220);
      setDismiss(0, 220);
    }
    // The photo's untransformed centre, read once here rather than on every move of the pinch
    const r = imgRef.current?.getBoundingClientRect();
    gesture.current = {
      type: 'pinch',
      c0: r ? { x: r.left + r.width / 2 - zoom.current.x, y: r.top + r.height / 2 - zoom.current.y } : { x: 0, y: 0 },
      d0: Math.hypot(b.x - a.x, b.y - a.y) || 1,
      mid0: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
      z0: { ...zoom.current },
    };
    moved.current = true;
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.target.closest('button')) return;
    stageRef.current.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      startPinch();
      return;
    }
    if (pointers.current.size > 2) return;
    const live = liveTrack();
    moved.current = false;
    gesture.current = {
      type: 'pending',
      id: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      t0: e.timeStamp,
      startDx: live.dx,
      startZoom: { ...zoom.current },
      history: [{ x: e.clientX, y: e.clientY, t: e.timeStamp }],
    };
    // Grabbing a track that is still settling holds it where it is
    if (Math.abs(live.dx) > 1 && zoom.current.s === 1) {
      gesture.current.type = 'swipe';
      placeTrack(live.dx, 0, 0);
    }
  };

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;

    if (g.type === 'pinch') {
      const [a, b] = [...pointers.current.values()];
      if (!b) return;
      const s = clamp((g.z0.s * Math.hypot(b.x - a.x, b.y - a.y)) / g.d0, 0.85, MAX_ZOOM * 1.15);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      // Focal zoom around where the pinch began, plus the pinch's own drift
      const k = 1 - s / g.z0.s;
      zoom.current = {
        s,
        x: g.z0.x + (mid.x - g.mid0.x) + (g.mid0.x - (g.c0.x + g.z0.x)) * k,
        y: g.z0.y + (mid.y - g.mid0.y) + (g.mid0.y - (g.c0.y + g.z0.y)) * k,
      };
      applyZoom(0);
      return;
    }

    if (e.pointerId !== g.id) return;
    g.history.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
    if (g.history.length > 6) g.history.shift();
    const dx = e.clientX - g.x0;
    const dy = e.clientY - g.y0;
    if (Math.hypot(dx, dy) > TAP_SLOP) moved.current = true;

    if (g.type === 'pending') {
      if (Math.hypot(dx, dy) < AXIS_LOCK) return;
      if (zoom.current.s > 1) g.type = 'pan';
      else if (Math.abs(dx) > Math.abs(dy)) g.type = 'swipe';
      else g.type = 'dismiss';
      // Track from here, so the photo doesn't jump the lock distance
      g.x0 = e.clientX;
      g.y0 = e.clientY;
      return;
    }

    const { w, h } = stagePoint();
    if (g.type === 'swipe') {
      let offset = g.startDx + dx;
      if ((atStart && offset > 0) || (atEnd && offset < 0)) offset = rubberband(offset, w);
      g.offset = offset;
      placeTrack(offset, 0, 0);
    } else if (g.type === 'dismiss') {
      const pull = dy > 0 ? dy : rubberband(dy, h);
      g.offset = pull;
      placeTrack(0, pull, 0);
      setDismiss(clamp(pull / (h * 0.6), 0, 1), 0);
    } else if (g.type === 'pan') {
      const b = panBounds(zoom.current.s);
      const fit = (v, lim) => (Math.abs(v) <= lim ? v : Math.sign(v) * (lim + rubberband(Math.abs(v) - lim, lim + w)));
      zoom.current = { ...zoom.current, x: fit(g.startZoom.x + dx, b.x), y: fit(g.startZoom.y + dy, b.y) };
      applyZoom(0);
    }
  };

  const endPinch = () => {
    const z = zoom.current;
    if (z.s < 1.05) {
      zoom.current = { s: 1, x: 0, y: 0 };
    } else {
      const s = Math.min(z.s, MAX_ZOOM);
      const b = panBounds(s);
      zoom.current = { s, x: clamp(z.x, -b.x, b.x), y: clamp(z.y, -b.y, b.y) };
    }
    applyZoom(ZOOM_MS);
    setZoomed(zoom.current.s > 1);
    announceZoom();
  };

  const onTap = (e) => {
    // Two taps on the photo, close together in time and place: zoom in there, or back out
    if (!onPhoto(e.clientX, e.clientY)) return;
    const now = e.timeStamp;
    const prev = lastTap.current;
    if (prev && now - prev.t < DOUBLE_TAP_MS && Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < 30) {
      lastTap.current = null;
      moved.current = true; // not a click on the backdrop either
      if (zoom.current.s > 1) zoomAround(1, e.clientX, e.clientY, ZOOM_MS);
      else zoomAround(DOUBLE_TAP_ZOOM, e.clientX, e.clientY, ZOOM_MS);
      return;
    }
    lastTap.current = { t: now, x: e.clientX, y: e.clientY };
  };

  const finish = (e, cancelled) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.delete(e.pointerId);
    const g = gesture.current;
    if (!g) return;

    if (g.type === 'pinch') {
      if (pointers.current.size === 0) {
        gesture.current = null;
        endPinch();
      } else if (pointers.current.size === 1) {
        // One finger stays down after a pinch: carry on as a pan from where it is
        endPinch();
        const [[id, p]] = [...pointers.current.entries()];
        gesture.current = {
          type: zoom.current.s > 1 ? 'pan' : 'none', id, x0: p.x, y0: p.y, t0: e.timeStamp,
          startZoom: { ...zoom.current }, history: [{ x: p.x, y: p.y, t: e.timeStamp }],
        };
      }
      return;
    }
    if (e.pointerId !== g.id) return;
    gesture.current = null;
    const { w, h } = stagePoint();

    if (g.type === 'pending') {
      if (!cancelled) onTap(e);
      return;
    }
    if (g.type === 'swipe') {
      const v = cancelled ? 0 : releaseVelocity(g.history, 'x');
      const offset = g.offset ?? g.startDx;
      const projected = offset + project(v);
      let target = index;
      // A flick must also travel a little: a twitch of a few pixels doesn't change photo
      if (!cancelled && Math.abs(offset) >= MIN_FLICK && Math.abs(projected) > w / 2) {
        target = clamp(index + (projected < 0 ? 1 : -1), 0, total - 1);
      }
      const remaining = (target - index) * w + offset;
      const ms = settleDuration(remaining, v);
      if (target === index) placeTrack(0, 0, ms);
      else {
        nextSettle.current = ms;
        onIndex(target);
      }
      return;
    }
    if (g.type === 'dismiss') {
      const v = cancelled ? 0 : releaseVelocity(g.history, 'y');
      const pull = g.offset ?? 0;
      if (!cancelled && (pull > h * DISMISS_DISTANCE || (v > DISMISS_VELOCITY && pull >= MIN_FLICK))) {
        // Carry on down at the finger's speed and close once it's gone
        const ms = settleDuration(h - pull, v, { min: 160, max: 320, still: 240 });
        placeTrack(0, h, ms);
        setDismiss(1, ms);
        later(onClose, ms);
      } else {
        const ms = settleDuration(pull, v);
        placeTrack(0, 0, ms);
        setDismiss(0, ms);
      }
      return;
    }
    if (g.type === 'pan') {
      // A pan carries on a little with the flick, then stops at the photo's edges
      const z = zoom.current;
      const b = panBounds(z.s);
      const vx = cancelled ? 0 : releaseVelocity(g.history, 'x');
      const vy = cancelled ? 0 : releaseVelocity(g.history, 'y');
      zoom.current = { ...z, x: clamp(z.x + project(vx, 0.99), -b.x, b.x), y: clamp(z.y + project(vy, 0.99), -b.y, b.y) };
      applyZoom(400);
    }
  };

  // A tap on the dark area around the photo closes; the press that ends a gesture, or any tap on
  // the photo itself, does not
  const onBackdropClick = (e) => {
    if (moved.current) {
      moved.current = false;
      return;
    }
    if (e.target.closest('button, p') || onPhoto(e.clientX, e.clientY)) return;
    onClose();
  };

  return (
    <div
      ref={panelRef}
      className={`${styles.lightbox} ${leaving ? styles.lightboxLeaving : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${single ? 'Foto' : 'Fotos'}: ${title}`}
      tabIndex={-1}
      onClick={onBackdropClick}
    >
      <div className={styles.lightboxBar}>
        <p className={styles.lightboxCount} aria-live="polite">
          {single ? '' : `${index + 1} de ${total}`}
        </p>
        <div className={styles.lightboxActions}>
          {/* Zoom is also a pinch, a double tap or Ctrl/⌘ + scroll; the button makes it findable,
              and its tooltip and aria-keyshortcuts name the key */}
          <button
            type="button"
            className={styles.lightboxRound}
            onClick={toggleZoom}
            aria-label={zoomed ? 'Reduzir foto' : 'Ampliar foto'}
            aria-keyshortcuts={zoomed ? '0' : '+'}
            title={zoomed ? 'Reduzir (0)' : 'Ampliar (+)'}
          >
            {zoomed ? <FaSearchMinus size={18} aria-hidden="true" /> : <FaSearchPlus size={18} aria-hidden="true" />}
          </button>
          <button type="button" className={styles.lightboxRound} onClick={onClose} aria-label="Fechar">
            <FaTimes size={20} aria-hidden="true" />
          </button>
        </div>
        <p className={styles.srOnly} aria-live="polite">{zoomNote}</p>
      </div>

      <div
        ref={stageRef}
        className={`${styles.lightboxStage} ${zoomed ? styles.lightboxStageZoomed : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => finish(e, false)}
        onPointerCancel={(e) => finish(e, true)}
        // A touch starts captured by the photo; moving capture to the stage fires a bubbling
        // lostpointercapture from the photo that must not end the gesture
        onLostPointerCapture={(e) => { if (e.target === e.currentTarget) finish(e, true); }}
      >
        <div ref={trackRef} className={styles.lightboxTrack}>
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`${styles.lightboxSlide} ${i === index ? styles.lightboxSlideCurrent : ''}`}
              aria-hidden={i !== index}
            >
              {/* The photo and its neighbours: what a swipe will show next is already loaded */}
              {Math.abs(i - index) <= 1 && (
                <img
                  ref={i === index ? imgRef : undefined}
                  src={photo}
                  srcSet={srcSetFor(photo)}
                  sizes={viewerSizes(aspectRatioFor(photo))}
                  alt={single ? `Foto: ${title}` : `Foto ${i + 1}: ${title}`}
                  className={styles.lightboxImg}
                  decoding="async"
                  draggable={false}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {!single && (
        <div className={styles.lightboxControls}>
          <button
            type="button"
            className={styles.lightboxArrow}
            onClick={() => go(-1)}
            aria-label="Foto anterior"
            aria-disabled={atStart || undefined}
          >
            <FaChevronLeft size={20} aria-hidden="true" />
          </button>
          <div className={styles.lightboxStrip}>
            {photos.map((photo, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.lightboxDot} ${i === index ? styles.lightboxDotActive : ''}`}
                onClick={() => { if (i !== index) { resetZoom(); onIndex(i); } }}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              >
                <img src={photo} srcSet={srcSetFor(photo)} sizes="80px" alt="" decoding="async" />
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.lightboxArrow}
            onClick={() => go(1)}
            aria-label="Foto seguinte"
            aria-disabled={atEnd || undefined}
          >
            <FaChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
