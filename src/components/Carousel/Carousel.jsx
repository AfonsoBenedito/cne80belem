import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { srcSetFor } from '../../utils/responsiveImage';
import styles from './Carousel.module.css';

// The slide interval lives in CSS (.progress animation-duration): the progress
// fill's animationend is the clock, so what the dot shows is exactly what happens.
const SETTLE_MS = 700;
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
// Initial slope of EASE_OUT (dy/dx at t=0 ≈ 1 / 0.16): used to hand the finger's
// velocity to the release transition so there's no seam between drag and settle.
const EASE_OUT_SLOPE = 6.25;
const DRAG_THRESHOLD = 10;

// Apple's momentum projection (Designing Fluid Interfaces): where a flick would come to rest
const project = (velocity, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate);
const rubberband = (overshoot, dimension, c = 0.55) =>
  (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export default function Carousel({ images, onFirstImageLoad }) {
  const [current, setCurrent] = useState(0);
  // Slides 2+ are off-screen: they wait until slide 1 has loaded so it gets the full bandwidth
  const [firstLoaded, setFirstLoaded] = useState(false);
  const markFirstLoaded = useCallback(() => {
    setFirstLoaded(true);
    onFirstImageLoad?.();
  }, [onFirstImageLoad]);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === 'visible');
  const [dragging, setDragging] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const drag = useRef(null);
  const settleMs = useRef(SETTLE_MS);

  const count = images.length;
  const autoplay = !reducedMotion && count > 1;
  const paused = userPaused || hovered || focused || !onScreen || !pageVisible || dragging;

  const next = useCallback(() => setCurrent((prev) => (prev + 1) % count), [count]);

  const place = useCallback((offsetPx, ms) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = ms ? `transform ${ms}ms ${EASE_OUT}` : 'none';
    track.style.transform = `translate3d(calc(${-current * 100}% + ${offsetPx}px), 0, 0)`;
  }, [current]);

  // Every slide change (autoplay, dots, swipe) settles from wherever the track is now
  useLayoutEffect(() => {
    if (drag.current?.active) return;
    place(0, settleMs.current);
    settleMs.current = SETTLE_MS;
  }, [place]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    const onVisibility = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // ── Swipe: 1:1 tracking, grab mid-flight, momentum-projected commit ──
  function onPointerDown(e) {
    if (e.pointerType === 'mouse' || count < 2 || e.target.closest('a, button')) return;
    const track = trackRef.current;
    const width = rootRef.current.offsetWidth;
    // Read the live (presentation) position so grabbing a moving slide never jumps
    const live = new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
    const startOffset = live + current * width;
    drag.current = {
      id: e.pointerId, x0: e.clientX, y0: e.clientY, startOffset, width,
      offset: startOffset, active: false, history: [{ x: e.clientX, t: e.timeStamp }],
    };
    if (Math.abs(startOffset) > 1) {
      drag.current.active = true;
      track.setPointerCapture(e.pointerId);
      setDragging(true);
      place(startOffset, 0);
    }
  }

  function onPointerMove(e) {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x0;
    const dy = e.clientY - d.y0;
    if (!d.active) {
      if (Math.abs(dy) > DRAG_THRESHOLD && Math.abs(dy) > Math.abs(dx)) { drag.current = null; return; }
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      d.active = true;
      d.x0 = e.clientX; // start tracking from the threshold so the slide doesn't jump 10px
      trackRef.current.setPointerCapture(e.pointerId);
      setDragging(true);
      return;
    }
    let offset = d.startOffset + dx;
    const atStart = current === 0 && offset > 0;
    const atEnd = current === count - 1 && offset < 0;
    if (atStart || atEnd) offset = rubberband(offset, d.width);
    d.offset = offset;
    d.history.push({ x: e.clientX, t: e.timeStamp });
    if (d.history.length > 6) d.history.shift();
    place(offset, 0);
  }

  function finishDrag(e, cancelled) {
    const d = drag.current;
    if (!d || (e && e.pointerId !== d.id)) return;
    drag.current = null;
    if (!d.active) return;
    setDragging(false);

    const h = d.history;
    const span = h.length > 1 ? h[h.length - 1].t - h[0].t : 0;
    const velocity = !cancelled && span > 0 ? ((h[h.length - 1].x - h[0].x) / span) * 1000 : 0;
    const projected = d.offset + project(velocity);

    let target = current;
    if (!cancelled && Math.abs(projected) > d.width / 2) {
      target = Math.min(count - 1, Math.max(0, current + (projected < 0 ? 1 : -1)));
    }
    const remaining = Math.abs((current - target) * d.width + d.offset);
    const ms = Math.abs(velocity) > 50
      ? Math.min(SETTLE_MS, Math.max(220, (EASE_OUT_SLOPE * remaining / Math.abs(velocity)) * 1000))
      : 450;

    if (target === current) {
      place(0, ms);
    } else {
      settleMs.current = ms;
      setCurrent(target);
    }
  }

  // Hover pauses only where the pointer is there on purpose (the dots and the two buttons). The
  // hero fills most of a desktop screen, so pausing on the whole photo meant it rarely moved.
  const hoverPause = {
    onPointerEnter: (e) => { if (e.pointerType === 'mouse') setHovered(true); },
    onPointerLeave: (e) => { if (e.pointerType === 'mouse') setHovered(false); },
  };

  const handleBlur = (e) => {
    if (!rootRef.current?.contains(e.relatedTarget)) setFocused(false);
  };

  return (
    <section
      ref={rootRef}
      className={styles.carousel}
      aria-roledescription="carrossel"
      aria-label="Fotografias do Agrupamento 80"
      onFocus={(e) => { if (e.target.matches(':focus-visible')) setFocused(true); }}
      onBlur={handleBlur}
    >
      <div
        ref={trackRef}
        className={`${styles.track} ${dragging ? styles.trackDragging : ''}`}
        aria-live={autoplay && !paused ? 'off' : 'polite'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => finishDrag(e, false)}
        onPointerCancel={(e) => finishDrag(e, true)}
        // Touch pointers start implicitly captured by the <img>; moving capture to the
        // track fires a bubbling lostpointercapture from the img that must not end the drag
        onLostPointerCapture={(e) => { if (e.target === e.currentTarget) finishDrag(e, false); }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={styles.slide}
            role="group"
            aria-roledescription="diapositivo"
            aria-label={`${index + 1} de ${count}`}
            aria-hidden={index !== current}
          >
            {(index === 0 || firstLoaded) && (
            <img
              ref={index === 0 ? (el) => { if (el?.complete && el.naturalWidth) markFirstLoaded(); } : undefined}
              src={src}
              srcSet={srcSetFor(src)}
              // Under a dark scrim with text on top, ~2× density is indistinguishable from 3×,
              // so phones request an 800w file instead of 1200w
              sizes="(max-width: 768px) 67vw, 100vw"
              onLoad={index === 0 ? markFirstLoaded : undefined}
              onError={index === 0 ? markFirstLoaded : undefined}
              alt={`Atividade do Agrupamento 80, fotografia ${index + 1} de ${count}`}
              className={styles.image}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding={index === 0 ? 'sync' : 'async'}
              draggable={false}
            />
            )}
          </div>
        ))}
      </div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Vem crescer connosco.</h1>
        <p className={styles.subtitle}>
          Agrupamento 80 · Santa Maria de Belém - escutismo para crianças e jovens dos 6 aos 22 anos.
        </p>
        <div className={styles.buttons} {...hoverPause}>
          <Link to="/contactos" className={styles.btnGreen}>Inscreve-te</Link>
          <Link to="/agrupamento/noticias" className={styles.btnWhite}>Notícias</Link>
        </div>
      </div>

      <div className={styles.controls} {...hoverPause}>
        {/* A pause from the active dot lasts until it is tapped again, so it is never silent */}
        {autoplay && userPaused && <span className={styles.heldHint} aria-hidden="true">Em pausa</span>}
        <div className={styles.dots}>
          {images.map((_, index) => {
            const active = index === current;
            // The active pill is also the pause control (WCAG 2.2.2): tapping it holds the slide
            const label = active && autoplay
              ? `${userPaused ? 'Retomar' : 'Pausar'} a apresentação (fotografia ${index + 1} de ${count})`
              : `Mostrar fotografia ${index + 1} de ${count}`;
            return (
              <button
                key={index}
                className={styles.dot}
                onClick={() => (active ? autoplay && setUserPaused((p) => !p) : setCurrent(index))}
                aria-label={label}
                aria-current={active ? 'true' : undefined}
              >
                <span
                  className={`${styles.dotMark} ${active ? styles.dotMarkActive : ''} ${active && userPaused ? styles.dotMarkHeld : ''}`}
                >
                  {active && (
                    <span
                      key={current}
                      className={`${styles.progress} ${autoplay ? styles.progressRunning : ''}`}
                      style={autoplay ? { animationPlayState: paused ? 'paused' : 'running' } : undefined}
                      onAnimationEnd={autoplay ? next : undefined}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
