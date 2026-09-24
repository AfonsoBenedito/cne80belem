import { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
      const footer = document.querySelector('footer');
      const btn = ref.current?.getBoundingClientRect();
      if (footer && btn) setOverFooter(footer.getBoundingClientRect().top < (btn.top + btn.bottom) / 2);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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
    <button
      ref={ref}
      type="button"
      className={`${styles.fab} ${overFooter ? styles.fabOnDark : ''}`}
      onClick={handleClick}
      aria-label={label}
      title={label}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <FaEnvelope size={18} className={`${styles.icon} ${!scrolled ? styles.iconVisible : ''}`} />
        <FaArrowUp size={18} className={`${styles.icon} ${styles.iconUp} ${scrolled ? styles.iconVisible : ''}`} />
      </span>
    </button>
  );
}
