import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import { seccoes } from '../../config/seccoes';
import { provas } from '../../config/provas';
import { getProvaContent } from '../../config/provasContent';
import { useSEO } from '../../utils/useSEO';
import styles from './ProvaDetail.module.css';

// The texts come as plain strings: "\n\n" between paragraphs, "\n" between lines. Runs of
// lines starting "• " or "1. " become real lists (they were typed characters in a <p>,
// with no list semantics and no hanging indent); other lines stay a paragraph with <br>s.
const BULLET = /^•\s+/;
const NUMBER = /^(\d+)\.\s+/;
function toBlocks(text) {
  const blocks = [];
  for (const para of text.split('\n\n')) {
    for (const line of para.split('\n')) {
      const kind = BULLET.test(line) ? 'ul' : NUMBER.test(line) ? 'ol' : 'p';
      const last = blocks[blocks.length - 1];
      const item = kind === 'ul' ? line.replace(BULLET, '') : kind === 'ol' ? line.replace(NUMBER, '') : line;
      if (last && last.kind === kind && !last.closed) last.lines.push(item);
      else blocks.push({ kind, lines: [item], start: kind === 'ol' ? Number(line.match(NUMBER)[1]) : undefined });
    }
    if (blocks.length) blocks[blocks.length - 1].closed = true;
  }
  return blocks;
}

export default function ProvaDetail() {
  const { seccao, slug } = useParams();
  const section = seccoes[seccao];
  const sectionProvas = provas[seccao];

  // Find the prova in the groups (before any hooks)
  let provaItem = null;
  let provaGroup = null;
  let provaIndex = 0;
  // Numbers run 1–17 across both groups, as on the list
  let groupStart = 0;
  if (sectionProvas) {
    for (const group of sectionProvas) {
      const idx = group.items.findIndex((p) => p.slug === slug);
      if (idx !== -1) {
        provaItem = group.items[idx];
        provaGroup = group;
        provaIndex = idx;
        break;
      }
      groupStart += group.items.length;
    }
  }

  // Open for one prova only: moving to another closes it without an effect
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const menuOpen = menuOpenFor === slug;
  // Sidebar groups: the one holding this prova starts open, the other closed. Toggles are kept
  // per prova, so moving to another prova opens its own group again
  const [groupToggles, setGroupToggles] = useState({ slug: null, groups: [] });
  const toggled = groupToggles.slug === slug ? groupToggles.groups : [];
  const toggleGroup = (name) =>
    setGroupToggles({
      slug,
      groups: toggled.includes(name) ? toggled.filter((g) => g !== name) : [...toggled, name],
    });
  const titleRef = useRef(null);
  const toggleRef = useRef(null);
  const shownSlug = useRef(slug);

  // Moving to another prova keeps the page mounted: put focus on the new title, so a screen
  // reader announces it (focus stayed on "Seguinte" before)
  useEffect(() => {
    if (shownSlug.current === slug) return;
    shownSlug.current = slug;
    titleRef.current?.focus({ preventScroll: true });
  }, [slug]);

  useSEO(provaItem && section ? {
    title: `${provaItem.title} - ${section.label}`,
    description: `${provaItem.title} Prova de ${provaGroup.group} da ${section.label} do Agrupamento 80.`,
  } : {});

  if (!section || !sectionProvas) return <Navigate to="/" replace />;
  if (!provaItem) return <Navigate to={`/seccao/${seccao}/provas`} replace />;

  const content = getProvaContent(seccao, slug);

  // Prev/next run through all the provas in order, so the last of Adesão ao Movimento
  // leads on to the first of Adesão à Secção
  const allProvas = sectionProvas.flatMap((g) => g.items);
  const position = groupStart + provaIndex;
  // "Exploradores": the band and back link name the secção, which a shared link otherwise never says
  const shortName = section.label.split(' - ').pop();
  const prev = allProvas[position - 1] ?? null;
  const next = allProvas[position + 1] ?? null;

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ background: section.surface, color: section.onSurface }}>
        <img src={section.image} alt="" className={styles.heroBadge} />
        <div className="container">
          {/* On phones the two parts go on their own lines: in capitals they wrapped mid-phrase */}
          <p className={styles.heroLabel}>
            <span>{shortName}</span>
            <span className={styles.heroLabelSep} aria-hidden="true"> · </span>
            <span className={styles.srOnly}>, </span>
            <span>{provaGroup.group}</span>
          </p>
          <h1 ref={titleRef} tabIndex={-1} className={styles.heroTitle}>{provaItem.title}</h1>
          {/* Up to 1024px the folded list's button says this instead */}
          <p className={styles.heroMeta}>Prova {position + 1} de {allProvas.length}</p>
        </div>
      </section>

      {/* Body */}
      <div className="container">
        <Link
          to={`/seccao/${seccao}/provas`}
          className={styles.backLink}
          style={{ color: section.ink }}
        >
          <FaArrowLeft size={12} aria-hidden="true" /> Provas dos {shortName}
        </Link>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar} aria-labelledby="prova-lista-titulo">
            {/* Escape closes the folded list and hands focus back to its button, as the site's menus do */}
            <div
              className={styles.sidebarCard}
              onKeyDown={(e) => {
                if (e.key !== 'Escape' || !menuOpen) return;
                setMenuOpenFor(null);
                toggleRef.current?.focus();
              }}
            >
              {/* Up to 1024px: the list folds away so the text starts under the title */}
              <button
                ref={toggleRef}
                type="button"
                className={styles.sidebarToggle}
                aria-expanded={menuOpen}
                aria-controls="prova-lista"
                onClick={() => setMenuOpenFor(menuOpen ? null : slug)}
              >
                <span>
                  Prova {position + 1} de {allProvas.length}
                  <span className={styles.sidebarToggleHint}> · ver todas</span>
                </span>
                <FaChevronDown
                  size={12}
                  aria-hidden="true"
                  className={`${styles.sidebarToggleChevron} ${menuOpen ? styles.sidebarToggleChevronOpen : ''}`}
                />
              </button>
              <div id="prova-lista" className={`${styles.sidebarBody} ${menuOpen ? styles.sidebarBodyOpen : ''}`}>
                {/* Both groups, so the whole path (1–17) is in view; h3s under an h2 the eye doesn't need */}
                <h2 id="prova-lista-titulo" className={styles.srOnly}>Provas dos {shortName}</h2>
                {sectionProvas.map((group, gi) => {
                  const start = sectionProvas.slice(0, gi).reduce((t, g) => t + g.items.length, 0);
                  const groupOpen = (group === provaGroup) !== toggled.includes(group.group);
                  return (
                    <div key={group.group} className={styles.sidebarGroup}>
                      <h3 className={styles.sidebarTitle}>
                        <button
                          type="button"
                          className={styles.sidebarGroupToggle}
                          aria-expanded={groupOpen}
                          aria-controls={`prova-grupo-${gi}`}
                          onClick={() => toggleGroup(group.group)}
                        >
                          <span>
                            {group.group}
                            <span className={styles.srOnly}>, </span>
                            <span className={styles.sidebarGroupCount}>{group.items.length} provas</span>
                          </span>
                          <FaChevronDown
                            size={11}
                            aria-hidden="true"
                            className={`${styles.sidebarToggleChevron} ${groupOpen ? styles.sidebarToggleChevronOpen : ''}`}
                          />
                        </button>
                      </h3>
                      {/* Closed is `hidden`, so its links leave the tab order */}
                      <ul id={`prova-grupo-${gi}`} className={`${styles.sidebarList} ${toggled.includes(group.group) ? styles.sidebarListOpened : ''}`} hidden={!groupOpen}>
                        {group.items.map((item, i) => {
                          const current = item.slug === slug;
                          const n = start + i + 1;
                          return (
                            <li key={item.slug}>
                              <Link
                                to={`/seccao/${seccao}/provas/${item.slug}`}
                                aria-current={current ? 'page' : undefined}
                                className={`${styles.sidebarLink} ${current ? styles.sidebarLinkActive : ''}`}
                                style={current ? { color: section.ink, borderColor: section.color } : undefined}
                              >
                                <span
                                  className={styles.sidebarNumber}
                                  style={current ? { background: section.surface, color: section.onSurface } : undefined}
                                  aria-hidden="true"
                                >
                                  {n}
                                </span>
                                <span className={styles.sidebarText}>
                                  <span className={styles.srOnly}>{n}. </span>
                                  {item.title}
                                  {!getProvaContent(seccao, item.slug) && (
                                    <span className={styles.sidebarMeta}>Texto em preparação</span>
                                  )}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
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
                      style={{ color: section.ink }}
                    >
                      {s.heading}
                    </h2>
                  )}
                  {toBlocks(s.text).map((block, j) => {
                    if (block.kind === 'p') {
                      return (
                        <p key={j} className={styles.paragraph}>
                          {block.lines.map((line, k) => (
                            <span key={k}>
                              {line}
                              {k < block.lines.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      );
                    }
                    const List = block.kind;
                    return (
                      <List key={j} className={styles.list} start={block.start}>
                        {block.lines.map((line, k) => <li key={k}>{line}</li>)}
                      </List>
                    );
                  })}
                </div>
              ))
            ) : (
              <div className={styles.noContent} style={{ borderColor: section.color }}>
                <h2 className={styles.noContentTitle}>Texto em preparação</h2>
                <p>
                  Ainda estamos a escrever o texto desta prova. Até lá, fala com o teu Chefe
                  {next ? ' ou segue para a prova seguinte.' : '.'}
                </p>
              </div>
            )}

            {/* Prev / Next navigation */}
            <nav className={styles.nav} aria-label="Prova anterior e seguinte">
              {prev ? (
                <Link
                  to={`/seccao/${seccao}/provas/${prev.slug}`}
                  className={styles.navLink}
                  style={{ borderColor: section.color }}
                >
                  <span className={styles.navLabel}>Anterior</span>
                  <span
                    className={styles.navTitle}
                    style={{ color: section.ink }}
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
                    style={{ color: section.ink }}
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
