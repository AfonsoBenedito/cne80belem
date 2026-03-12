import { useState, useEffect } from 'react';
import { FaEnvelope, FaArrowUp } from 'react-icons/fa';
import styles from './FloatingBtn.module.css';

const SCROLL_THRESHOLD = 300;

export default function FloatingBtn() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (scrolled) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = 'mailto:geral@agrupamento80.pt';
    }
  };

  return (
    <button
      className={`${styles.fab} ${scrolled ? styles.fabScrolled : ''}`}
      onClick={handleClick}
      title={scrolled ? 'Voltar ao topo' : 'Enviar email'}
    >
      <span className={styles.iconWrap}>
        <FaEnvelope size={18} className={`${styles.icon} ${!scrolled ? styles.iconVisible : ''}`} />
        <FaArrowUp size={18} className={`${styles.icon} ${scrolled ? styles.iconVisible : ''}`} />
      </span>
    </button>
  );
}
