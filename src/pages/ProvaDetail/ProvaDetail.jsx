import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import { seccoes } from '../../config/seccoes';
import { provas } from '../../config/provas';
import { getProvaContent } from '../../config/provasContent';
import { useSEO } from '../../utils/useSEO';
import { toBlocks, leadsList, inlineRuns } from '../../utils/provaBlocks';
import ProvasPdfButton from '../../components/ProvasPdfButton/ProvasPdfButton';
import LoadErrorBoundary from '../../components/LoadErrorBoundary/LoadErrorBoundary';
import styles from './ProvaDetail.module.css';

// The pictures (badges, posters, their viewer) load only for a prova that has them
const ProvaMedia = lazy(() => import('./ProvaMedia'));

export default function ProvaDetail() {
  const { seccao, slug } = useParams();
  const section = seccoes[seccao];
  const sectionProvas = provas[seccao];

  // Find the prova in the groups (before any hooks)
  let provaItem = null;
  let provaGroup = null;
  let provaIndex = 0;
  // Numbers run straight across both groups, as on the list
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
    description: `${provaItem.title}: prova de ${provaGroup.group} da ${section.label} do Agrupamento 80.`,
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

  // A line with its titles of works in italics (`*…*`, English ones `*{en}…*`)
  const inline = (line) => inlineRuns(line).map((r, i) => (r.italic ? <i key={i} lang={r.lang}>{r.text}</i> : r.text));

  // A section's text: paragraphs (a prayer's lines each a row of their own) and real lists
  // `labels` (the Cargos prova): a line that opens a list ("Ao Guia compete:") is set as its label
  // `notes` (the Leis e Máximas): one per item of the list, what it means, folded under it: the
  // item itself opens it, so the list reads as the lines to learn and the meaning is a tap away
  const renderText = (text, labels = false, notes = null) => toBlocks(text).map((block, j, blocks) => {
    if (labels && leadsList(blocks, j)) {
      return (
        <p key={j} className={styles.listLabel} style={{ color: section.ink }}>
          {block.lines[0]}
        </p>
      );
    }
    if (block.kind === 'h') {
      return (
        <h3 key={j} className={styles.textSubheading}>
          {block.lines[0]}
        </h3>
      );
    }
    if (block.kind === 'p') {
      return (
        // Several lines (a prayer, a formula): each its own row, a wrapped
        // part indented under it, so a narrow screen doesn't add lines
        <p key={j} className={styles.paragraph}>
          {block.lines.length > 1
            ? block.lines.map((line, k) => <span key={k} className={styles.verseLine}>{inline(line)}</span>)
            : inline(block.lines[0])}
        </p>
      );
    }
    const List = block.kind;
    return (
      <List key={j} className={styles.list} start={block.start}>
        {block.lines.map((line, k) => (
          <li key={k}>
            {notes?.[k] ? (
              <details className={styles.itemDetails}>
                <summary className={styles.itemSummary}>
                  {line}
                  <FaChevronDown size={12} aria-hidden="true" className={styles.itemChevron} />
                </summary>
                <p className={styles.itemNote}>{notes[k]}</p>
              </details>
            ) : (
              inline(line)
            )}
          </li>
        ))}
      </List>
    );
  });

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
        <div className={styles.toolbar}>
          <Link
            to={`/seccao/${seccao}/provas`}
            className={styles.backLink}
            style={{ color: section.ink }}
          >
            <FaArrowLeft size={12} aria-hidden="true" /> Provas dos {shortName}
          </Link>
          <ProvasPdfButton seccao={seccao} slug={slug} label="Descarregar PDF" ink={section.ink} />
        </div>

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
                {/* Both groups, so the whole path is in view; h3s under an h2 the eye doesn't need */}
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
          {/* The secção's ink reaches the list markers through a variable, as the PDF draws them */}
          <article className={styles.article} style={{ '--section-ink': section.ink }}>
            {content ? (
              // If the pictures' chunk can't download, one note with a reload stands in for the
              // sections (only an all-picture prova has any); a new prova starts afresh
              <LoadErrorBoundary key={slug}>
                {content.sections.map((s, i) => (
                  <div key={i} className={`${styles.section} ${s.recite ? styles.recited : ''}`}>
                    {s.heading && s.headingMedia ? (
                      // The badge beside the heading (the Cargos prova); its box is held while the
                      // picture code loads, so the heading doesn't shift
                      <div className={styles.headingWithMedia}>
                        <span className={styles.headingMedia}>
                          <LoadErrorBoundary quiet>
                            <Suspense fallback={null}>
                              <ProvaMedia media={s.media} seccao={seccao} icon />
                            </Suspense>
                          </LoadErrorBoundary>
                        </span>
                        <h2 id={s.id} className={styles.sectionHeading} style={{ color: section.ink }}>
                          {s.heading}
                        </h2>
                      </div>
                    ) : s.heading && (
                      <h2
                        id={s.id}
                        className={styles.sectionHeading}
                        style={{ color: section.ink }}
                      >
                        {s.heading}
                      </h2>
                    )}
                    {s.headingMedia ? (
                      s.text && renderText(s.text, true)
                    ) : s.mediaAfter ? (
                      // The text, then its picture under it at the picture's own size (a wide
                      // diagram: the nós' steps)
                      <>
                        {s.text && renderText(s.text)}
                        <div className={styles.mediaAfter}>
                          <LoadErrorBoundary quiet>
                            <Suspense fallback={null}>
                              <ProvaMedia media={s.media} seccao={seccao} title={s.heading ?? content.title} />
                            </Suspense>
                          </LoadErrorBoundary>
                        </div>
                      </>
                    ) : s.media && s.text ? (
                      // Text with its picture beside it (the Promessa and its insígnia): the text
                      // leads, the picture sits on its right, or under it on phones. A picture
                      // that shows what the text explains (`mediaFirst`, the saudação's hands)
                      // comes first instead, in the reading order too, so on phones it sits
                      // under the heading, not after all the text. If the picture can't load,
                      // the text stands alone
                      <div className={`${styles.withMedia} ${s.mediaFirst ? styles.withMediaFirst : ''} ${s.wrap ? styles.withMediaWrap : ''}`}>
                        {!s.mediaFirst && <div className={styles.withMediaText}>{renderText(s.text)}</div>}
                        <div className={styles.withMediaAside}>
                          <LoadErrorBoundary quiet>
                            {/* A placeholder holds the column while the picture code loads, so
                                the column only gives way when there's nothing to show */}
                            <Suspense fallback={<span aria-hidden="true" />}>
                              <ProvaMedia media={s.media} seccao={seccao} title={s.heading ?? content.title} />
                            </Suspense>
                          </LoadErrorBoundary>
                        </div>
                        {s.mediaFirst && <div className={styles.withMediaText}>{renderText(s.text)}</div>}
                      </div>
                    ) : (
                      <>
                        {s.media && (
                          <Suspense fallback={null}>
                            <ProvaMedia media={s.media} seccao={seccao} title={s.heading ?? content.title} />
                          </Suspense>
                        )}
                        {/* The prova's own question to the scout (the Livro da Selva's
                            "Conheces…"), as the manual sets it under its title: bold, before the
                            text */}
                        {s.lead && <p className={styles.lead}>{s.lead}</p>}
                        {s.quote && (
                          // Someone else's words (the CNE's Manual do Dirigente on S. Tiago), word
                          // for word: a line of ours says whose, the passage set apart with a rule in
                          // the secção's colour, its source under it; the section's text after it
                          <>
                            {s.intro && <p className={styles.paragraph}>{s.intro}</p>}
                            <figure className={styles.quote}>
                              <blockquote className={styles.quoteText} style={{ borderColor: section.color }}>
                                {renderText(s.quote)}
                              </blockquote>
                              {s.source && <figcaption className={styles.quoteSource}>{s.source}</figcaption>}
                            </figure>
                          </>
                        )}
                        {s.text && renderText(s.text, false, s.notes)}
                        {s.swatches && (
                          // Colours with their names (the Bandos'): the name is the content, the
                          // swatch shows it
                          <ul className={styles.swatches}>
                            {s.swatches.map((c) => (
                              <li key={c.name} className={styles.swatch}>
                                <span className={styles.swatchColor} style={{ background: c.color }} aria-hidden="true" />
                                {c.name}
                              </li>
                            ))}
                          </ul>
                        )}
                        {s.terms && (
                          // Numbers (the book's parts, I to VI) sit in a column of their own, so
                          // the texts after them start on one line
                          <dl className={`${styles.terms} ${s.terms.every((t) => t.term.length <= 4) ? styles.termsNumbered : ''}`}>
                            {s.terms.map((t) => (
                              <div key={t.term} className={styles.termRow}>
                                <dt className={styles.term} style={{ color: section.ink }}>{t.term}</dt>
                                <dd className={styles.termText}>{t.text}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {s.cast && (
                          // The characters (the Livro da Selva's), as the manual sets them: each
                          // one's drawing beside them, their name in bold opening their text. The
                          // name is a heading (inline, so it still opens the sentence), so a screen
                          // reader can go from character to character. A drawing that can't load
                          // leaves its box empty, and the box gives way: the text stands alone
                          // (while the picture code loads, a placeholder holds the box)
                          <ul className={styles.cast}>
                            {s.cast.map((c) => (
                              <li key={c.name} className={styles.castRow}>
                                <span className={styles.castPicture}>
                                  <LoadErrorBoundary quiet>
                                    <Suspense fallback={<span aria-hidden="true" />}>
                                      <ProvaMedia media={c.media} seccao={seccao} picture />
                                    </Suspense>
                                  </LoadErrorBoundary>
                                </span>
                                <div className={styles.castText}>
                                  <h3 className={styles.castName} style={{ color: section.ink }}>{c.name}</h3>
                                  <p className={styles.castRest}>{c.text}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                        {s.steps && (
                          // Steps on one line, each joined to the next: dates (a history) or names
                          // (a chain, each part of the next)
                          <ol className={`${styles.steps} ${s.steps[0].label ? styles.stepsDated : ''}`}>
                            {s.steps.map((st, k) => (
                              <li key={k} className={styles.step}>
                                {st.label && <span className={styles.stepLabel} style={{ color: section.ink }}>{st.label}</span>}
                                <span className={styles.stepBody}>
                                  {st.title && <span className={styles.stepTitle}>{st.title}</span>}
                                  {/* A step can hold more than one paragraph (the book's 1908) */}
                                  {st.text && st.text.split('\n\n').map((t, n) => <span key={n} className={styles.stepText}>{inline(t)}</span>)}
                                </span>
                              </li>
                            ))}
                          </ol>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </LoadErrorBoundary>
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
