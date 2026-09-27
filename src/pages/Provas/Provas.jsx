import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FaChevronRight, FaChevronDown, FaArrowLeft } from 'react-icons/fa';
import { seccoes } from '../../config/seccoes';
import { provas } from '../../config/provas';
import { getProvaContent } from '../../config/provasContent';
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
    title: `Provas - ${section.label}`,
    description: `Provas de adesão da ${section.label} do Agrupamento 80.`,
  } : {});

  if (!section || !sectionProvas) return <Navigate to="/" replace />;

  const shortName = section.label.split(' - ').pop();

  const toggleGroup = (group) => {
    setOpenGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  // The provas are done in order across both groups, so they're numbered 1–17 straight through
  const starts = sectionProvas.map((_, i) =>
    sectionProvas.slice(0, i).reduce((n, g) => n + g.items.length, 0)
  );

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ background: section.surface, color: section.onSurface }}>
        <img src={section.image} alt="" className={styles.heroBadge} />
        <div className="container">
          <p className={styles.heroLabel}>{section.label}</p>
          <h1 className={styles.heroTitle}>Provas</h1>
          <p className={styles.heroLead}>
            Os passos até à tua Promessa
          </p>
        </div>
      </section>

      <div className="container">
        <Link to={`/seccao/${seccao}`} className={styles.backLink} style={{ color: section.ink }}>
          <FaArrowLeft size={12} aria-hidden="true" /> {shortName}
        </Link>

        {sectionProvas.map((group, gi) => {
          const isOpen = openGroups.includes(group.group);
          const listId = `provas-${gi}`;
          return (
            <section key={group.group} className={styles.group}>
              {/* The button sits inside the heading, so heading navigation still finds the group */}
              <h2 className={styles.groupHeading}>
                <button
                  type="button"
                  className={styles.groupHeader}
                  onClick={() => toggleGroup(group.group)}
                  aria-expanded={isOpen}
                  aria-controls={listId}
                >
                  {/* Title and count wrap together; the chevron keeps its own column on the right */}
                  <span className={styles.groupLabel}>
                    <span className={styles.groupTitle} style={{ color: section.ink }}>
                      {group.group}
                    </span>
                    {/* Nothing separates the two in the markup (its text reads "Movimento9 provas"); the comma makes the name read as two parts */}
                    <span className={styles.srOnly}>, </span>
                    <span className={styles.groupCount}>{group.items.length} provas</span>
                  </span>
                  <FaChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`${styles.groupChevron} ${isOpen ? styles.groupChevronOpen : ''}`}
                    style={{ color: section.ink }}
                  />
                </button>
              </h2>

              {/* Closed is `hidden`, not clipped: its links leave the tab order and the reading order */}
              <ol id={listId} className={styles.grid} hidden={!isOpen}>
                {group.items.map((prova, index) => {
                  const ready = !!getProvaContent(seccao, prova.slug);
                  return (
                    <li key={prova.slug}>
                      <Link to={`/seccao/${seccao}/provas/${prova.slug}`} className={styles.card}>
                        <span
                          className={styles.cardNumber}
                          style={{ background: section.surface, color: section.onSurface }}
                          aria-hidden="true"
                        >
                          {starts[gi] + index + 1}
                        </span>
                        <span className={styles.cardText}>
                          <span className={styles.cardTitle}>{prova.title}</span>
                          {!ready && <span className={styles.cardMeta}>Texto em preparação</span>}
                        </span>
                        <FaChevronRight size={12} className={styles.cardArrow} aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </main>
  );
}
