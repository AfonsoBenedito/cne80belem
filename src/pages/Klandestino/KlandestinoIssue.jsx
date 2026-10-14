import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaListUl } from 'react-icons/fa';
import NotFound from '../NotFound/NotFound';
import { useSEO } from '../../utils/useSEO';
import { issueSlugs, issueSummaries } from '../../config/klandestino';
import { useIssues, issueName } from './useIssues';
import styles from './KlandestinoIssue.module.css';

const NOT_FOUND = {
  title: 'Número não encontrado',
  description: 'Não há nenhum número do Klandestino com este endereço.',
  to: '/agrupamento/klandestino',
  linkLabel: 'Ver todos os números',
};

// Lists whose items carry their own numbers or are sums ("1) Sou…", "1 - Televisão", "4□3□8=9")
const NUMBERED = /^\d/;
// A song's chord line: only chord names (letters or solfège) and spaces
const CHORD_LINE = /^\s*((?:[A-G]|Dó|Do|Ré|Re|Mi|Fá|Fa|Sol|Lá|La|Si)(?:#|b)?(?:m|maj|min|dim|sus|aug|M)?\d*(?:\/[A-G](?:#|b)?)?\s*)+$/;

function Block({ block }) {
  switch (block.type) {
    case 'h':
      return <h3 className={styles.subhead}>{block.text}</h3>;
    case 'list':
      // Items that carry their own numbers ("1) Sou um país…", "1 - Televisão") get no bullet too
      return (
        <ul className={`${styles.list} ${block.items.every((t) => NUMBERED.test(t)) ? styles.listNumbered : ''}`}>
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case 'quote':
      return (
        <blockquote className={styles.quote}>
          <p>{block.text}</p>
          {block.cite && <footer className={styles.cite}>{block.cite}</footer>}
        </blockquote>
      );
    case 'verse':
      return (
        <p className={styles.verse}>
          {block.lines.map((line, i) => <span key={i} className={styles.verseLine}>{line || ' '}</span>)}
        </p>
      );
    case 'song':
      // Chord lines sit over the words as typed in 1993: a fixed-width font keeps them in place. They
      // are drawn bolder and in green, and hidden from screen readers, which read just the words.
      return (
        <div className={styles.songWrap} tabIndex={0} role="group" aria-label="Letra com acordes">
          <pre className={styles.song}>
            {block.lines.map((line, i) => {
              const chords = line.trim() && CHORD_LINE.test(line);
              return (
                <span key={i} className={chords ? styles.chordLine : undefined} aria-hidden={chords ? 'true' : undefined}>
                  {line}
                  {'\n'}
                </span>
              );
            })}
          </pre>
        </div>
      );
    case 'grid':
      // A word search: each letter its own cell, so the columns line up whatever the font
      return (
        <div className={styles.gridWrap} tabIndex={0} role="group" aria-label="Sopa de letras">
          <table className={styles.grid}>
            <caption className={styles.srOnly}>
              Sopa de letras de {block.rows.length} linhas por {block.rows[0].length} colunas
            </caption>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {[...row].map((ch, c) => <td key={c}>{ch}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'image':
      return (
        <figure className={styles.figure}>
          <img src={block.src} alt={block.alt} className={styles.puzzle} />
        </figure>
      );
    case 'note':
      return <p className={styles.note}>{block.text}</p>;
    default:
      return <p className={styles.paragraph}>{block.text}</p>;
  }
}

// Under a puzzles article: where its solutions are (the next issue), or that none survived.
// Under a solutions article: back to the puzzles they answer.
function PuzzleLinks({ article, head }) {
  const run = issueSummaries.filter((i) => i.number != null);
  const at = run.indexOf(head);
  const next = at !== -1 ? run[at + 1] : null;
  const prev = at > 0 ? run[at - 1] : null;
  const links = [];
  if (article.id === head.solutions && prev?.puzzles) {
    links.push(
      <Link key="prev" to={`/agrupamento/klandestino/${prev.slug}#${prev.puzzles}`} className={styles.puzzleLink}>
        <FaArrowLeft size={12} aria-hidden="true" /> Os passatempos do Nº {prev.number}
      </Link>,
    );
  }
  if (article.id === head.puzzles) {
    links.push(next?.solutions ? (
      <Link key="next" to={`/agrupamento/klandestino/${next.slug}#${next.solutions}`} className={styles.puzzleLink}>
        As soluções saíram no Nº {next.number} <FaArrowRight size={12} aria-hidden="true" />
      </Link>
    ) : (
      <p key="none" className={styles.puzzleNone}>As soluções destes passatempos não se conservaram.</p>
    ));
  }
  return links.length ? <div className={styles.puzzleLinks}>{links}</div> : null;
}

export default function KlandestinoIssue() {
  const { slug } = useParams();
  const { hash } = useLocation();
  const known = issueSlugs.includes(slug);
  const [issue] = useIssues(known ? [slug] : []) ?? [];
  // Up to 1024px the sumário folds behind a toggle, so the issue's first article starts on screen;
  // opened for one issue, it closes when you move to another
  const [contentsOpenFor, setContentsOpenFor] = useState(null);
  const contentsOpen = contentsOpenFor === slug;
  // Closing the folded sumário moves the page, so the jump happens after it has closed; focus goes
  // to the article so keyboard and screen-reader users continue from there
  const goTo = (e, id) => {
    e.preventDefault();
    setContentsOpenFor(null);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView();
      target.focus({ preventScroll: true });
      window.history.replaceState(window.history.state, '', `#${id}`);
    });
  };
  // The masthead comes from the issue's summary, so it's on screen before the text arrives
  const head = issueSummaries.find((i) => i.slug === slug);
  const name = head ? issueName(head) : '';

  // Arriving at /7#solucoes (a puzzle link from another issue): go to that article once it's there
  useEffect(() => {
    if (!issue || !hash) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) {
      target.scrollIntoView();
      target.focus({ preventScroll: true });
    }
  }, [issue, hash]);

  // Where the reader is: the article crossing the top of the screen is marked in the sumário, and
  // on phones a "Sumário" button appears once the sumário itself has scrolled away
  const contentsRef = useRef(null);
  const listRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [contentsGone, setContentsGone] = useState(false);
  useEffect(() => {
    if (!issue) return undefined;
    const articles = [...document.querySelectorAll('article[id]')];
    const seen = new Map();
    const pick = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
      const first = articles.find((a) => seen.get(a.id));
      if (first) setCurrent(first.id);
    }, { rootMargin: '-96px 0px -55% 0px' });
    articles.forEach((a) => pick.observe(a));
    const away = new IntersectionObserver(([e]) => setContentsGone(!e.isIntersecting && e.boundingClientRect.top < 0));
    if (contentsRef.current) away.observe(contentsRef.current);
    return () => { pick.disconnect(); away.disconnect(); };
  }, [issue]);
  // Keep the marked entry in view inside the sticky sumário, without moving the page
  useEffect(() => {
    const list = listRef.current;
    const link = current && list?.querySelector(`[data-id="${current}"]`);
    if (!link || list.scrollHeight <= list.clientHeight) return;
    const box = list.getBoundingClientRect();
    const r = link.getBoundingClientRect();
    if (r.top < box.top || r.bottom > box.bottom) list.scrollTop += r.top - box.top - box.height / 3;
  }, [current]);
  const backToContents = () => {
    setContentsOpenFor(slug);
    requestAnimationFrame(() => {
      contentsRef.current?.scrollIntoView();
      contentsRef.current?.querySelector('button')?.focus({ preventScroll: true });
    });
  };

  // A sheet with one section (the December games) doesn't repeat it over every article
  const oneSection = issue ? new Set(issue.articles.map((a) => a.section)).size === 1 : false;
  const kickerOf = (a) => (!oneSection && a.section && a.title && a.section !== a.title ? a.section : null);

  useSEO(known ? {
    title: `Klandestino ${name}`,
    description: `Klandestino ${name}, ${head?.dateLabel}: o jornal do Agrupamento 80, transcrito dos ficheiros originais.`,
  } : { title: NOT_FOUND.title, description: NOT_FOUND.description, noindex: true });

  if (!known) return <NotFound {...NOT_FOUND} />;

  // Previous / next numbered issue (the loose sheets sit outside the run)
  const run = issueSlugs.filter((s) => /^\d+$/.test(s));
  const at = run.indexOf(slug);
  const prev = at > 0 ? run[at - 1] : null;
  const next = at !== -1 && at < run.length - 1 ? run[at + 1] : null;

  return (
    <main className={styles.page} aria-busy={issue ? undefined : 'true'}>
      <div className="container">
        <Link to="/agrupamento/klandestino" className={styles.backLink}>
          <FaArrowLeft size={12} aria-hidden="true" /> Todos os números
        </Link>

        <header className={styles.masthead}>
          <h1 className={styles.mastheadTitle}>
            {head.title ?? 'Klandestino'}
            <span className={styles.srOnly}> {name}</span>
          </h1>
          <p className={styles.mastheadLine}>
            {head.number == null && <span>{head.label}</span>}
            {head.frequency && <span>{head.frequency}</span>}
            {head.volume && <span>{head.volume}</span>}
            <time dateTime={head.date}>{head.dateLabel}</time>
            {head.number != null && <span>{name}</span>}
            {head.price && <span>Preço: {head.price}</span>}
          </p>
        </header>

        {issue && (
          <div className={styles.layout}>
            {issue.articles.length > 1 && (
              <nav className={styles.contents} aria-labelledby="klandestino-sumario" ref={contentsRef}>
                <h2 id="klandestino-sumario" className={styles.contentsTitle}>
                  <button
                    type="button"
                    className={styles.contentsToggle}
                    aria-expanded={contentsOpen}
                    aria-controls="klandestino-sumario-lista"
                    onClick={() => setContentsOpenFor(contentsOpen ? null : slug)}
                  >
                    Sumário
                    <span className={styles.contentsCount}>{issue.articles.length} artigos</span>
                    <FaChevronDown
                      size="0.8em"
                      aria-hidden="true"
                      className={`${styles.contentsChevron} ${contentsOpen ? styles.contentsChevronOpen : ''}`}
                    />
                  </button>
                  <span className={styles.contentsLabel}>Sumário</span>
                </h2>
                <ol
                  id="klandestino-sumario-lista"
                  ref={listRef}
                  className={`${styles.contentsList} ${contentsOpen ? styles.contentsListOpen : ''}`}
                >
                  {issue.articles.map((a) => (
                    <li key={a.id}>
                      <a
                        href={`#${a.id}`}
                        data-id={a.id}
                        className={`${styles.contentsLink} ${current === a.id ? styles.contentsLinkCurrent : ''}`}
                        aria-current={current === a.id ? 'location' : undefined}
                        onClick={(e) => goTo(e, a.id)}
                      >
                        <span className={styles.contentsText}>
                          {kickerOf(a) && <span className={styles.contentsSection}>{kickerOf(a)}</span>}
                          {a.title || a.section}
                        </span>
                        {a.page && <span className={styles.contentsPage}>{a.page}</span>}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className={styles.articles}>
              {issue.articles.map((a) => (
                <article key={a.id} id={a.id} className={styles.article} tabIndex={-1}>
                  <header className={styles.articleHeader}>
                    {kickerOf(a) && <p className={styles.kicker}>{kickerOf(a)}</p>}
                    <h2 className={styles.articleTitle}>{a.title || a.section}</h2>
                    {a.page && <p className={styles.pageNumber}>Pág. {a.page}</p>}
                  </header>
                  {a.blocks.map((b, i) => <Block key={i} block={b} />)}
                  {a.author && <p className={styles.author}>{a.author}</p>}
                  <PuzzleLinks article={a} head={head} />
                </article>
              ))}

              {issue.team?.length > 0 && (
                <section className={styles.team} aria-labelledby="klandestino-ficha">
                  <h2 id="klandestino-ficha" className={styles.teamTitle}>Ficha técnica</h2>
                  <dl className={styles.teamList}>
                    {issue.team.map((m) => (
                      <div key={m.name} className={styles.teamRow}>
                        <dt>{m.name}</dt>
                        <dd>{m.role}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              <nav className={styles.pager} aria-label="Outros números">
                  {at === -1 && (
                    <Link to="/agrupamento/klandestino" className={styles.pagerLink}>
                      <FaArrowLeft size={12} aria-hidden="true" /> Todos os números
                    </Link>
                  )}
                  {at !== -1 && (prev ? (
                    <Link to={`/agrupamento/klandestino/${prev}`} className={styles.pagerLink}>
                      <FaArrowLeft size={12} aria-hidden="true" /> Nº {prev}
                    </Link>
                  ) : <span />)}
                  {next && (
                    <Link to={`/agrupamento/klandestino/${next}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
                      Nº {next} <FaArrowRight size={12} aria-hidden="true" />
                    </Link>
                  )}
              </nav>
            </div>
          </div>
        )}

        {issue && issue.articles.length > 1 && contentsGone && (
          <button type="button" className={styles.contentsReturn} onClick={backToContents}>
            <FaListUl size={14} aria-hidden="true" /> Sumário
          </button>
        )}
      </div>
    </main>
  );
}
