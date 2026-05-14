import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { seccoes } from '../../config/seccoes';
import { provas } from '../../config/provas';
import { useSEO } from '../../utils/useSEO';
import styles from './Provas.module.css';

export default function Provas() {
  const { seccao } = useParams();
  const section = seccoes[seccao];
  const sectionProvas = provas[seccao];
  const [openGroups, setOpenGroups] = useState(() =>
    sectionProvas ? sectionProvas.map((g) => g.group) : []
  );

  useSEO(section ? {
    title: `Provas — ${section.label}`,
    description: `Provas e progressão da ${section.label} do Agrupamento 80.`,
  } : {});

  if (!section || !sectionProvas) return <Navigate to="/" replace />;

  const toggleGroup = (group) => {
    setOpenGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ background: section.color }}>
        <img src={section.image} alt="" className={styles.heroBadge} />
        <div className="container">
          <p className={styles.heroLabel}>{section.label}</p>
          <h1 className={styles.heroTitle}>Provas</h1>
        </div>
      </section>

      {/* Prova groups */}
      <div className="container">
        {sectionProvas.map((group) => {
          const isOpen = openGroups.includes(group.group);
          return (
            <section key={group.group} className={styles.group}>
              <button
                className={styles.groupHeader}
                onClick={() => toggleGroup(group.group)}
              >
                <h2 className={styles.groupTitle} style={{ color: section.color }}>
                  {group.group}
                </h2>
                <FaChevronDown
                  size={16}
                  className={`${styles.groupChevron} ${isOpen ? styles.groupChevronOpen : ''}`}
                  style={{ color: section.color }}
                />
              </button>

              <div className={`${styles.grid} ${isOpen ? styles.gridOpen : ''}`}>
                {group.items.map((prova, index) => (
                  <Link
                    key={prova.slug}
                    to={`/seccao/${seccao}/provas/${prova.slug}`}
                    className={styles.card}
                  >
                    <span
                      className={styles.cardNumber}
                      style={{ background: section.color }}
                    >
                      {index + 1}
                    </span>
                    <span className={styles.cardTitle}>{prova.title}</span>
                    <FaChevronRight size={12} className={styles.cardArrow} />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
