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

// Only secções with someone in them get a column (and a tab)
const activeSections = sections.filter(({ key }) => dirigentes.some((m) => m.section === key));

export default function Dirigentes() {
  useSEO({
    title: 'Dirigentes e Animadores',
    description: 'Conhece os dirigentes e animadores do Agrupamento 80 - Santa Maria de Belém, CNE.',
  });

  const [activeSection, setActiveSection] = useState(activeSections[0]?.key ?? null);
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [sliderStyle, setSliderStyle] = useState(null);

  useLayoutEffect(() => {
    const activeEl = itemRefs.current[activeSection];
    if (!activeEl) return;
    // Glides on transform only (no layout per frame); the width snaps to the new tab's
    setSliderStyle({ width: activeEl.offsetWidth, transform: `translateX(${activeEl.offsetLeft}px)` });
  }, [activeSection]);

  // Header plus the sticky tab bar: where a jumped-to secção should start
  const getOffset = () =>
    (document.querySelector('header')?.offsetHeight ?? 0) + (navRef.current?.offsetHeight ?? 0);

  const handleNavClick = (e, key) => {
    e.preventDefault();
    const el = document.getElementById(`section-${key}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - getOffset();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  };

  // The tab follows the secção under the bar. An observer watches a thin band just below the
  // header and tab bar, instead of measuring every column on each scroll event.
  useEffect(() => {
    const els = activeSections.map(({ key }) => document.getElementById(`section-${key}`)).filter(Boolean);
    if (!els.length) return;
    const offset = getOffset();
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActiveSection(hit.target.dataset.section);
      },
      { rootMargin: `-${offset}px 0px -${Math.max(window.innerHeight - offset - 48, 0)}px 0px` },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
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

        {/* Named, so screen readers can tell it from the header and footer navigation */}
        <nav ref={navRef} className={styles.sectionNav} aria-label="Secções">
          {sliderStyle && <span className={styles.sectionNavSlider} style={sliderStyle} />}
          {activeSections.map(({ key, label }) => (
            <a
              key={key}
              ref={(el) => { itemRefs.current[key] = el; }}
              href={`#section-${key}`}
              onClick={(e) => handleNavClick(e, key)}
              // The green underline shows the secção in view; this says it to a screen reader
              aria-current={activeSection === key ? 'true' : undefined}
              className={`${styles.sectionNavItem} ${activeSection === key ? styles.sectionNavItemActive : ''}`}
            >
              <img src={sectionBadges[key]} alt="" className={styles.sectionNavBadge} />
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
                  {/* The heading beside it names the secção; the emblem is decoration */}
                  <img src={sectionBadges[key]} alt="" className={styles.columnBadge} />
                  <h2 className={styles.columnTitle}>{label}</h2>
                </div>
                <div className={styles.cards}>
                  {members.map((member) => (
                    <MemberCard key={member.name} {...member} compact />
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
