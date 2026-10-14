import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useSEO } from '../../utils/useSEO';
import { issueSummaries, loadIssue } from '../../config/klandestino';
import { issueName } from './useIssues';
import styles from './Klandestino.module.css';

// Start downloading an issue's text when the reader points at, focuses or touches its card, so it's
// usually there by the time the page opens (the browser keeps the module; a repeat is free)
const prefetch = (slug) => {
  const go = () => { loadIssue(slug); };
  return { onPointerEnter: go, onFocus: go, onTouchStart: go };
};

export default function Klandestino() {
  useSEO({
    title: 'Jornal Klandestino',
    description: 'O Klandestino, o jornal do Agrupamento 80 em 1993: os números de Fevereiro a Maio e uma folha de passatempos, para ler online.',
  });
  const numbered = issueSummaries.filter((i) => i.number != null);
  const loose = issueSummaries.filter((i) => i.number == null);

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Klandestino</h1>
          <p className={styles.subtitle}>O jornal do Agrupamento, em 1993.</p>
          <p className={styles.lead}>
            Transcrito dos ficheiros originais: o texto é o que foi impresso, com a ortografia da época;
            dos desenhos, só os passatempos sobreviveram.
          </p>
        </header>

        <ol className={styles.issues}>
          {numbered.map((issue) => (
            <li key={issue.slug}>
              <Link
                to={issue.slug}
                className={styles.issue}
                aria-describedby={issue.highlights ? `klandestino-destaques-${issue.slug}` : undefined}
                {...prefetch(issue.slug)}
              >
                <span className={styles.masthead}>
                  {issue.title}
                  <span className={styles.mastheadVolume}>{issue.volume}</span>
                </span>
                <span className={styles.issueNumber}>{issueName(issue)}</span>
                <time dateTime={issue.date} className={styles.issueDate}>{issue.dateLabel}</time>
                {issue.highlights && (
                  // Read as the link's description, not its name: the name stays "Nº 6, date"
                  <span className={styles.highlights} id={`klandestino-destaques-${issue.slug}`} aria-hidden="true">
                    {issue.highlights.map((h) => <span key={h} className={styles.highlight}>{h}</span>)}
                  </span>
                )}
                <span className={styles.read}>
                  Ler o número <FaArrowRight size={12} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {loose.length > 0 && (
          <section className={styles.loose} aria-labelledby="klandestino-folhas">
            <h2 id="klandestino-folhas" className={styles.looseTitle}>{loose.length === 1 ? 'Folha solta' : 'Folhas soltas'}</h2>
            <ul className={styles.looseList}>
              {loose.map((issue) => (
                <li key={issue.slug}>
                  <Link to={issue.slug} className={styles.looseItem} {...prefetch(issue.slug)}>
                    <span className={styles.looseName}>{issue.label}</span>
                    <time dateTime={issue.date} className={styles.looseDate}>{issue.dateLabel}</time>
                    <FaArrowRight size={12} aria-hidden="true" className={styles.looseArrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
