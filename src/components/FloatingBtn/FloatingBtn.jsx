import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { mainEmail } from '../../config/contacts';
import styles from './FloatingBtn.module.css';

const SCROLL_THRESHOLD = 300;

// One button, two jobs: at the top of the page it emails the agrupamento; once there is
// somewhere to go back to, the envelope turns into an arrow and it scrolls to the top.
export default function FloatingBtn() {
  const [scrolled, setScrolled] = useState(false);
  // Green on the green footer reads as a blob; over it the button takes the footer's own white
  const [overFooter, setOverFooter] = useState(false);
  const ref = useRef(null);
  // On phones the Cancioneiro list has its own way around (sticky search, A-Z picker) and a "+"
  // on the right of every row, which this button would sit on
  const { pathname } = useLocation();
  const onSongList = pathname.replace(/\/$/, '') === '/recursos/cancioneiro';
  // Contactos is the email: its own Email card sits right there, and the button covered the map
  const onContactos = pathname.replace(/\/$/, '') === '/contactos';

  const sentinelRef = useRef(null);

  // Observers instead of a scroll handler: nothing runs while scrolling until a line is crossed.
  // A 1px marker SCROLL_THRESHOLD down the page says when there is somewhere to go back to.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setScrolled(e.boundingClientRect.top < 0));
    if (sentinelRef.current) io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, []);

  // The footer is "under" the button once its top passes the button's centre line, so the
  // observer's viewport is cut off at that line. Rebuilt on resize and on each page, since the
  // button moves (or is hidden on the phone song list) and a hidden button measures as zero.
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer || !ref.current) return;
    let io;
    const watch = () => {
      io?.disconnect();
      const r = ref.current.getBoundingClientRect();
      const fromBottom = Math.round(window.innerHeight - (r.top + r.bottom) / 2);
      io = new IntersectionObserver(([e]) => setOverFooter(e.isIntersecting), { rootMargin: `0px 0px -${fromBottom}px 0px` });
      io.observe(footer);
    };
    watch();
    window.addEventListener('resize', watch);
    return () => {
      io?.disconnect();
      window.removeEventListener('resize', watch);
    };
  }, [pathname]);

  const handleClick = () => {
    if (!scrolled) {
      window.location.href = `mailto:${mainEmail}`;
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    // At the top the button becomes the email action, so hand keyboard focus to the content
    document.getElementById('conteudo')?.focus({ preventScroll: true });
  };

  const label = scrolled ? 'Voltar ao topo' : `Enviar email para ${mainEmail}`;

  return (
    <>
    {/* The marker stays even where the button doesn't: its observer is set up once, on first load */}
    <span ref={sentinelRef} className={styles.sentinel} style={{ top: SCROLL_THRESHOLD }} aria-hidden="true" />
    {!onContactos && (
    <button
      ref={ref}
      type="button"
      className={`${styles.fab} ${overFooter ? styles.fabOnDark : ''} ${onSongList ? styles.fabHideOnPhone : ''}`}
      onClick={handleClick}
      aria-label={label}
      title={label}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <FaEnvelope size={18} className={`${styles.icon} ${!scrolled ? styles.iconVisible : ''}`} />
        <FaArrowUp size={18} className={`${styles.icon} ${styles.iconUp} ${scrolled ? styles.iconVisible : ''}`} />
      </span>
    </button>
    )}
    </>
  );
}
