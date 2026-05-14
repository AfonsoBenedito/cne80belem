import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { dirigentes, sectionBadges } from '../../config/members';
import MemberCard from '../../components/MemberCard/MemberCard';
import { useSEO } from '../../utils/useSEO';
import styles from './Dirigentes.module.css';

const sections = [
  { key: 'lobitos', label: 'Lobitos' },
  { key: 'exploradores', label: 'Exploradores' },
  { key: 'pioneiros', label: 'Pioneiros' },
  { key: 'caminheiros', label: 'Caminheiros' },
];

export default function Dirigentes() {
  useSEO({
    title: 'Dirigentes e Animadores',
    description: 'Conheça os dirigentes e animadores do Agrupamento 80 — Santa Maria de Belém, CNE.',
  });

  const activeSections = sections.filter(({ key }) =>
    dirigentes.some((m) => m.section === key)
  );

  const [activeSection, setActiveSection] = useState(activeSections[0]?.key ?? null);
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [sliderStyle, setSliderStyle] = useState(null);

  useLayoutEffect(() => {
    const activeEl = itemRefs.current[activeSection];
    if (!activeEl) return;
    setSliderStyle({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
  }, [activeSection]);

  const getOffset = () =>
    72 + (navRef.current ? navRef.current.offsetHeight : 56);

  const handleNavClick = (e, key) => {
    e.preventDefault();
    const el = document.getElementById(`section-${key}`);
    if (!el) return;
    const offset = getOffset();
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    const keys = activeSections.map(({ key }) => key);

    const handleScroll = () => {
      const offset = getOffset();
      let current = keys[0];
      for (const key of keys) {
        const el = document.getElementById(`section-${key}`);
        if (el && el.getBoundingClientRect().top <= offset + 32) current = key;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Dirigentes e Animadores</h1>
          <p className={styles.subtitle}>
            A equipa que acompanha os nossos escuteiros em cada secção.
          </p>
        </header>

        <nav ref={navRef} className={styles.sectionNav}>
          {sliderStyle && <span className={styles.sectionNavSlider} style={sliderStyle} />}
          {activeSections.map(({ key, label }) => (
            <a
              key={key}
              ref={(el) => { itemRefs.current[key] = el; }}
              href={`#section-${key}`}
              onClick={(e) => handleNavClick(e, key)}
              className={`${styles.sectionNavItem} ${activeSection === key ? styles.sectionNavItemActive : ''}`}
            >
              <img src={sectionBadges[key]} alt={label} className={styles.sectionNavBadge} />
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.columns} style={{ '--col-count': activeSections.length }}>
          {activeSections.map(({ key, label }) => {
            const members = dirigentes.filter((m) => m.section === key);
            return (
              <div key={key} id={`section-${key}`} data-section={key} className={styles.column}>
                <div className={styles.columnHeader}>
                  <img src={sectionBadges[key]} alt={label} className={styles.columnBadge} />
                  <h2 className={styles.columnTitle}>{label}</h2>
                </div>
                <div className={styles.cards}>
                  {members.map((member) => (
                    <MemberCard key={member.name} {...member} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
