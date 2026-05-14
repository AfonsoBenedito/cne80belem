import { useParams, Navigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa';
import { seccoes } from '../../config/seccoes';
import { provas } from '../../config/provas';
import { provasContent } from '../../config/provasContent';
import { useSEO } from '../../utils/useSEO';
import styles from './ProvaDetail.module.css';

export default function ProvaDetail() {
  const { seccao, slug } = useParams();
  const section = seccoes[seccao];
  const sectionProvas = provas[seccao];

  // Find the prova in the groups (before any hooks)
  let provaItem = null;
  let provaGroup = null;
  let provaIndex = 0;
  if (sectionProvas) {
    for (const group of sectionProvas) {
      const idx = group.items.findIndex((p) => p.slug === slug);
      if (idx !== -1) {
        provaItem = group.items[idx];
        provaGroup = group;
        provaIndex = idx;
        break;
      }
    }
  }

  useSEO(provaItem && section ? {
    title: `${provaItem.name} — ${section.label}`,
    description: `Prova ${provaItem.name} da ${section.label} do Agrupamento 80.`,
  } : {});

  if (!section || !sectionProvas) return <Navigate to="/" replace />;
  if (!provaItem) return <Navigate to={`/seccao/${seccao}/provas`} replace />;

  const content = provasContent[slug];

  // Find prev/next within the same group
  const prev = provaIndex > 0 ? provaGroup.items[provaIndex - 1] : null;
  const next =
    provaIndex < provaGroup.items.length - 1
      ? provaGroup.items[provaIndex + 1]
      : null;

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ background: section.color }}>
        <img src={section.image} alt="" className={styles.heroBadge} />
        <div className="container">
          <p className={styles.heroLabel}>{provaGroup.group}</p>
          <h1 className={styles.heroTitle}>{provaItem.title}</h1>
        </div>
      </section>

      {/* Body */}
      <div className="container">
        <Link
          to={`/seccao/${seccao}/provas`}
          className={styles.backLink}
          style={{ color: section.color }}
        >
          <FaArrowLeft size={12} /> Todas as provas
        </Link>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3
                className={styles.sidebarTitle}
                style={{ color: section.color }}
              >
                {provaGroup.group}
              </h3>
              <ul className={styles.sidebarList}>
                {provaGroup.items.map((item, i) => (
                  <li key={item.slug}>
                    <Link
                      to={`/seccao/${seccao}/provas/${item.slug}`}
                      className={`${styles.sidebarLink} ${item.slug === slug ? styles.sidebarLinkActive : ''}`}
                      style={
                        item.slug === slug
                          ? { color: section.color, borderColor: section.color }
                          : undefined
                      }
                    >
                      <span
                        className={styles.sidebarNumber}
                        style={
                          item.slug === slug
                            ? { background: section.color }
                            : undefined
                        }
                      >
                        {i + 1}
                      </span>
                      <span className={styles.sidebarText}>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <article className={styles.article}>
            {content ? (
              content.sections.map((s, i) => (
                <div key={i} className={styles.section}>
                  {s.heading && (
                    <h2
                      className={styles.sectionHeading}
                      style={{ color: section.color }}
                    >
                      {s.heading}
                    </h2>
                  )}
                  {s.text.split('\n\n').map((paragraph, j) => (
                    <p key={j} className={styles.paragraph}>
                      {paragraph.split('\n').map((line, k, arr) => (
                        <span key={k}>
                          {line}
                          {k < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <div className={styles.noContent}>
                <p>O conteúdo desta prova está a ser preparado.</p>
              </div>
            )}

            {/* Prev / Next navigation */}
            <nav className={styles.nav}>
              {prev ? (
                <Link
                  to={`/seccao/${seccao}/provas/${prev.slug}`}
                  className={styles.navLink}
                  style={{ borderColor: section.color }}
                >
                  <span className={styles.navLabel}>Anterior</span>
                  <span
                    className={styles.navTitle}
                    style={{ color: section.color }}
                  >
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  to={`/seccao/${seccao}/provas/${next.slug}`}
                  className={`${styles.navLink} ${styles.navLinkNext}`}
                  style={{ borderColor: section.color }}
                >
                  <span className={styles.navLabel}>Seguinte</span>
                  <span
                    className={styles.navTitle}
                    style={{ color: section.color }}
                  >
                    {next.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>
        </div>
      </div>
    </main>
  );
}
