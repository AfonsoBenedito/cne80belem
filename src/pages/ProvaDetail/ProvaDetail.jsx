import { Fragment, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import { seccoes } from '../../config/seccoes';
import { provas } from '../../config/provas';
import { getProvaContent } from '../../config/provasContent';
import { provaCanonicalPath } from '../../config/canonical';
import { useSEO } from '../../utils/useSEO';
import { toBlocks, leadsList, inlineRuns, keepLastPair, PAIR } from '../../utils/provaBlocks';
import ProvasPdfButton from '../../components/ProvasPdfButton/ProvasPdfButton';
import { TEXT_SIZES, readTextSize, saveTextSize, textSizeLabel } from '../../utils/textSize';
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
  // The reader's text size for recited provas (A− / A+, below), the songs' setting
  const [sizeIdx, setSizeIdx] = useState(readTextSize);
  const [sizeMessage, setSizeMessage] = useState('');
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
    canonicalPath: provaCanonicalPath(seccao, slug),
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

  // A pointer to another prova that tells a section's part in full (`more`, by title), if this
  // secção has that prova: after the text, in every kind of section (with a picture beside it,
  // or under it, too: drawn only in the plain branch, the fraternity's pointer was lost when its
  // section got a photograph)
  // A prova said aloud (a prayer, the Promessa, the Leis) gets the cancioneiro's text size, A− /
  // A+, one setting with the songs': only the recited text scales, the rest of the page stays
  const recited = content?.sections.some((s) => s.recite);
  const changeTextSize = (dir) => {
    const next = sizeIdx + dir;
    if (next < 0 || next >= TEXT_SIZES.length) return;
    setSizeIdx(next);
    saveTextSize(next);
    setSizeMessage(textSizeLabel(next));
  };

  // Section headings are h2, or h3 under the part headings of a prova told in parts
  const SectionH = content?.sections.some((s) => s.part) ? 'h3' : 'h2';
  // A character's or symbol's name, a step under its section's heading
  const CastH = SectionH === 'h3' ? 'h4' : 'h3';

  const moreLine = (s) => {
    const other = s.more && allProvas.find((p) => p.title === s.more);
    return other ? (
      <p className={styles.paragraph}>
        Podes saber mais na prova{' '}
        <Link to={`/seccao/${seccao}/provas/${other.slug}`} className={styles.moreLink} style={{ color: section.ink }}>
          {other.title}
        </Link>
.
      </p>
    ) : null;
  };

  // A line with its marks: titles of works in italics (`*…*`, English ones `*{en}…*`), a word in
  // bold in the ink (`**`), the Bible's words (`~`) and where they come from (`^`)
  // The block's last two words, joined (`keepLastPair`): a span that keeps them on one line while
  // its column holds them (`.keepPair`). A pair split across two marks ("de **fotografias**") is
  // joined by a no-break space instead
  const pair = (text) => {
    const k = text.indexOf(PAIR);
    if (k < 0) return text;
    const start = text.lastIndexOf(' ', k - 1) + 1;
    if (k === 0 || k === text.length - 1) return text.replace(PAIR, '\u00A0');
    return [text.slice(0, start), <span key="pair" className={styles.keepPair}>{text.slice(start).replace(PAIR, ' ')}</span>];
  };
  const inline = (line) => inlineRuns(keepLastPair(line, PAIR)).map((r, i) =>
    r.bold ? <strong key={i} className={styles.inlineStrong} style={{ color: section.ink }}>{pair(r.text)}</strong> : r.cite ? <span key={i} className={styles.inlineCite}>{pair(r.text)}</span> : r.quote ? <q key={i} className={styles.inlineQuote} style={{ color: section.ink }}>{pair(r.text)}</q> : r.italic ? <i key={i} lang={r.lang}>{pair(r.text)}</i> : <Fragment key={i}>{pair(r.text)}</Fragment>
  );

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
            {/* On phones the toolbar is one row: "Provas", its secção still read out. One span, so
                the words stay one flex item (two, the link's gap doubled the space between them) */}
            <FaArrowLeft size={12} aria-hidden="true" /> <span>Provas<span className={styles.wideOnly}> dos {shortName}</span></span>
          </Link>
          <div className={styles.toolbarActions}>
            {recited && (
              // aria-disabled, not disabled, so focus stays put at the smallest or largest size
              <div className={styles.sizeGroup} role="group" aria-label="Tamanho da letra">
                <button
                  type="button"
                  className={styles.sizeBtn}
                  onClick={() => changeTextSize(-1)}
                  aria-disabled={sizeIdx === 0 || undefined}
                  aria-label="Letra mais pequena"
                >
                  A<span aria-hidden="true">−</span>
                </button>
                <button
                  type="button"
                  className={`${styles.sizeBtn} ${styles.sizeBtnUp}`}
                  onClick={() => changeTextSize(1)}
                  aria-disabled={sizeIdx === TEXT_SIZES.length - 1 || undefined}
                  aria-label="Letra maior"
                >
                  A<span aria-hidden="true">+</span>
                </button>
              </div>
            )}
            <ProvasPdfButton seccao={seccao} slug={slug} label={<span><span className={styles.wideOnly}>Descarregar </span>PDF</span>} ink={section.ink} />
          </div>
          <p className={styles.srOnly} aria-live="polite">{sizeMessage}</p>
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
          <article className={styles.article} style={{ '--section-ink': section.ink, '--section-surface': section.surface, '--section-on-surface': section.onSurface, ...(recited && TEXT_SIZES[sizeIdx] !== 1 ? { '--recite-scale': TEXT_SIZES[sizeIdx] } : {}) }}>
            {content ? (
              // If the pictures' chunk can't download, one note with a reload stands in for the
              // sections (only an all-picture prova has any); a new prova starts afresh
              <LoadErrorBoundary key={slug}>
                {content.sections.map((s, i) => (
                  <Fragment key={i}>
                  {/* A prova told in parts (the História: the Escutismo, then the CNE) names each
                      part over its first section: the part is the h2, its sections h3 */}
                  {s.part && <h2 className={styles.partHeading} style={{ '--part-rule': section.color }}>{s.part}</h2>}
                  <div className={`${styles.section} ${s.recite ? styles.recited : ''}`}>
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
                        <SectionH id={s.id} className={styles.sectionHeading} style={{ color: section.ink }}>
                          {s.heading}
                        </SectionH>
                      </div>
                    ) : s.heading && (
                      <SectionH
                        id={s.id}
                        // A prova that is one recited text and nothing else (the Oração do Caminheiro,
                        // the Promessa) is named by its title: its "Oração" stays for screen readers'
                        // headings, out of sight, so the prayer starts under the title
                        className={content.sections.length === 1 && s.recite ? styles.srOnly : styles.sectionHeading}
                        style={{ color: section.ink }}
                      >
                        {/* The years then the name, a pause between them for a screen reader
                            ("1907 O acampamento de Brownsea", not "1907O acampamento") */}
                        {s.date && <span className={styles.sectionDate}>{s.date}<span className={styles.srOnly}> </span></span>}
                        {s.heading}
                      </SectionH>
                    )}
                    {s.headingMedia ? (
                      <>
                        {s.text && renderText(s.text, true)}
                        {moreLine(s)}
                      </>
                    ) : s.mediaAfter ? (
                      // The text, then its picture under it at the picture's own size (a wide
                      // diagram: the nós' steps)
                      <>
                        {s.text && renderText(s.text)}
                        {!s.moreAfterMedia && moreLine(s)}
                        <div className={styles.mediaAfter}>
                          <LoadErrorBoundary quiet>
                            <Suspense fallback={null}>
                              <ProvaMedia media={s.media} seccao={seccao} title={s.heading ?? content.title} />
                            </Suspense>
                          </LoadErrorBoundary>
                        </div>
                        {/* The pointer after the pictures when they belong to the text above it (the
                            Guia's fitas, then «Cargos da Tribo»), so it still ends the section */}
                        {s.moreAfterMedia && moreLine(s)}
                      </>
                    ) : s.media && s.text ? (
                      // Text with its picture beside it (the Promessa and its insígnia): the text
                      // leads, the picture sits on its right, or under it on phones. A picture
                      // that shows what the text explains (`mediaFirst`, the saudação's hands)
                      // comes first instead, in the reading order too, so on phones it sits
                      // under the heading, not after all the text. If the picture can't load,
                      // the text stands alone
                      <div className={`${styles.withMedia} ${s.mediaFirst ? styles.withMediaFirst : ''} ${s.wrap ? styles.withMediaWrap : ''}`}>
                        {!s.mediaFirst && <div className={styles.withMediaText}>{renderText(s.text)}{moreLine(s)}</div>}
                        <div className={styles.withMediaAside}>
                          <LoadErrorBoundary quiet>
                            {/* A placeholder holds the column while the picture code loads, so
                                the column only gives way when there's nothing to show */}
                            <Suspense fallback={<span aria-hidden="true" />}>
                              <ProvaMedia media={s.media} seccao={seccao} title={s.heading ?? content.title} />
                            </Suspense>
                          </LoadErrorBoundary>
                        </div>
                        {s.mediaFirst && <div className={styles.withMediaText}>{renderText(s.text)}{moreLine(s)}</div>}
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
                            <figure className={`${styles.quote} ${s.letter ? styles.letter : ''}`} style={{ '--quote-tint': section.color }}>
                              <blockquote className={styles.quoteText} style={{ borderColor: section.color }}>
                                {renderText(s.quote)}
                              </blockquote>
                              {s.source && <figcaption className={styles.quoteSource}>{s.source}</figcaption>}
                            </figure>
                          </>
                        )}
                        {s.overview && (
                          // A prova's things at a glance (the Exploradores' five symbols): each
                          // one's picture, name and what it stands for, a link to its own part
                          // below; the picture is the name's, so it says nothing of its own
                          // Its label shown, so a reader knows the row is the symbols to revise, and
                          // named from it for a screen reader
                          <nav className={styles.overview} aria-labelledby={`overview-${i}`}>
                            <p id={`overview-${i}`} className={styles.overviewLabel}>{s.overviewLabel}</p>
                            <ul className={styles.overviewList}>
                              {s.overview.map((o) => (
                                <li key={o.href}>
                                  <a href={o.href} className={styles.overviewLink}>
                                    <span className={styles.overviewIcon}>
                                      <LoadErrorBoundary quiet>
                                        <Suspense fallback={null}>
                                          <ProvaMedia media={o.media} seccao={seccao} icon />
                                        </Suspense>
                                      </LoadErrorBoundary>
                                    </span>
                                    <span className={styles.overviewName} style={{ color: section.ink }}>{o.name}</span>
                                    <span className={styles.overviewPhrase}>{o.phrase}</span>
                                    {/* What it stands for in a word (`tag`, the Pioneiros' verbs: Saber,
                                        Querer, Agir, Acreditar), at the row's end in the secção's ink;
                                        a pause before it for a screen reader */}
                                    {o.tag && <span className={styles.overviewTag} style={{ color: section.ink }}><span className={styles.srOnly}>, </span>{o.tag}</span>}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </nav>
                        )}
                        {s.text && renderText(s.text, false, s.notes)}
                        {!(s.swatches || s.terms || s.steps || s.profiles) && moreLine(s)}
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
                          <dl className={`${styles.terms} ${s.terms.every((t) => t.term.length <= 4) ? styles.termsNumbered : ''} ${s.termsColumns ? styles.termsColumns : ''}`}>
                            {s.terms.map((t) => (
                              <div key={t.term} className={styles.termRow}>
                                <dt className={styles.term} style={{ color: section.ink }}>{t.term}</dt>
                                <dd className={styles.termText}>{pair(keepLastPair(t.text, PAIR))}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {s.sheet && (
                          // A sheet as it's filled (`sheet`, the PPV's open part, the Manual's
                          // example): each field its label over its entry; a field the example
                          // leaves empty shows ruled lines, and says so to a screen reader
                          <figure className={styles.sheet}>
                            <figcaption className={styles.sheetLabel}>{s.sheet.label}</figcaption>
                            <dl className={styles.sheetFields}>
                              {s.sheet.fields.map((f) => (
                                <div key={f.label} className={styles.sheetField}>
                                  <dt className={styles.sheetFieldLabel}>{f.label}</dt>
                                  <dd className={styles.sheetValue}>
                                    {f.text ?? (f.list ? (
                                      <ul className={styles.sheetList}>
                                        {f.list.map((item) => <li key={item}>{item}</li>)}
                                      </ul>
                                    ) : (
                                      <span className={styles.sheetBlank}><span className={styles.srOnly}>Por preencher</span></span>
                                    ))}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                            {s.sheet.source && <p className={styles.sheetSource}>{s.sheet.source}</p>}
                          </figure>
                        )}
                        {s.profiles && (
                          // Things of one kind told the same way (the units: secção, ages, small
                          // groups, patrono, colour), so they can be compared: each its name, after
                          // a dot in its secção's colour, and its facts as label and value
                          <ul className={styles.profiles}>
                            {s.profiles.map((p) => (
                              <li key={p.name} className={styles.profile}>
                                <CastH className={styles.profileName}>
                                  <span className={styles.profileDot} style={{ background: seccoes[p.seccao]?.color }} aria-hidden="true" />
                                  {p.name}
                                </CastH>
                                <dl className={styles.profileFacts}>
                                  {p.facts.map(([label, value]) => (
                                    <div key={label} className={styles.profileFact}>
                                      <dt>{label}</dt>
                                      <dd>{value}</dd>
                                    </div>
                                  ))}
                                </dl>
                              </li>
                            ))}
                          </ul>
                        )}
                        {s.cast && ((NameH) => (
                          // The characters (the Livro da Selva's), as the manual sets them: each
                          // one's drawing beside them, their name in bold opening their text. The
                          // name is a heading (inline, so it still opens the sentence), so a screen
                          // reader can go from character to character. A drawing that can't load
                          // leaves its box empty, and the box gives way: the text stands alone
                          // (while the picture code loads, a placeholder holds the box)
                          // `castSide: 'left'`: every picture on the left (five like badges, the
                          // symbols', where alternating sides only made the eye hunt for each name)
                          <ul className={`${styles.cast} ${s.castSide === 'left' ? styles.castOneSide : ''} ${s.castLarge ? styles.castLarge : ''} ${s.castColumn ? styles.castColumn : ''}`}>
                            {s.cast.map((c) => (
                              // A row with no picture of its own (`media` left out, the Caminho do
                              // Triunfo's Women) keeps its column, so its text lines up with the rest
                              <li key={c.name} id={c.id} className={`${styles.castRow} ${c.media ? '' : styles.castRowBare}`}>
                                <span className={styles.castPicture}>
                                  <LoadErrorBoundary quiet>
                                    <Suspense fallback={<span aria-hidden="true" />}>
                                      <ProvaMedia media={c.media} seccao={seccao} picture zoom={c.zoom} title={c.name} caption={c.caption} kind={c.kind} />
                                    </Suspense>
                                  </LoadErrorBoundary>
                                  {/* Its codes' range under the icon (`range`, "F1–F6"), to find
                                      its slice on the wheel; the list under the text says them */}
                                  {c.range && <span className={styles.castRange} style={{ color: section.ink }} aria-hidden="true">{c.range}</span>}
                                  {/* A line of ours under the picture (`caption`: what B.-P.'s drawing
                                      shows, Dick beside the Horses), the viewer's too */}
                                  {c.media && c.caption && <span className={styles.castCaption}>{c.caption}</span>}
                                </span>
                                <div className={styles.castText}>
                                  <NameH className={styles.castName} style={{ color: section.ink }}>{c.name}</NameH>
                                  <p className={styles.castRest}>{inline(c.text)}</p>
                                  {/* A line of its own under the text (`line`: an area's three trilhos) */}
                                  {c.line && <p className={styles.castLine}>{inline(c.line)}</p>}
                                  {/* Or a list (`objectives`: the Caminheiros' objetivos, each by its
                                      code), one a line, so they can be read down and counted */}
                                  {c.objectives && (
                                    <ul className={styles.castObjectives}>
                                      {c.objectives.map((o) => (
                                        <li key={o.code}>
                                          <span className={styles.castCode} style={{ color: section.ink }}>{o.code}</span> {o.name}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        // Each name a step under its section's heading, or, in a part with no heading
                        // of its own (the symbols, under "A Simbologia"), the section level itself.
                        // A section with neither carries on the one before it (the Caminheiros'
                        // áreas, under their wheel): its names a step under that heading
                        ))(s.heading || (!s.part && i > 0) ? CastH : SectionH)}
                        {s.steps && (
                          // Steps on one line, each joined to the next: dates (a history) or names
                          // (a chain, each part of the next); `numbered`, a sequence to remember
                          // (the Empreendimento's four phases), each name's number in its marker
                          <ol className={`${styles.steps} ${s.steps[0].label ? styles.stepsDated : ''} ${s.numbered ? styles.stepsNumbered : ''}`}>
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
                        {/* After the colours, words or steps the section has (the História's
                            1908–1920): the pointer goes past the whole part, so it ends it */}
                        {(s.swatches || s.terms || s.steps || s.profiles) && moreLine(s)}
                      </>
                    )}
                    {/* A line of reference that closes the section quietly (`endNote`, the
                        Marítimos' and the Ar's names after the Partida) */}
                    {s.endNote && <p className={styles.endNote}>{s.endNote}</p>}
                  </div>
                  </Fragment>
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
