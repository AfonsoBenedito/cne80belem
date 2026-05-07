import { useParams, Navigate } from 'react-router-dom';
import { FaQuoteLeft } from 'react-icons/fa';
import { seccoes } from '../../config/seccoes';
import styles from './Seccao.module.css';

export default function Seccao() {
  const { seccao } = useParams();
  const data = seccoes[seccao];

  if (!data) return <Navigate to="/" replace />;

  return (
    <main className={styles.page}>
      {/* Hero banner */}
      <section className={styles.hero} style={{ background: data.color }}>
        <img src={data.image} alt="" className={styles.heroBadge} />
        <div className="container">
          <p className={styles.heroLabel}>{data.label}</p>
          <h1 className={styles.heroTitle}>Secção</h1>
        </div>
      </section>

      {/* Group photo */}
      <section className={styles.imageSection}>
        {data.groupPhoto && <img src={data.groupPhoto} alt={data.label} className={styles.groupPhoto} />}
      </section>

      {/* Description */}
      <section className={styles.content}>
        <div className="container">
          <p className={styles.description}>{data.description}</p>

          {/* Quote */}
          <blockquote className={styles.quote} style={{ borderColor: data.color }}>
            <FaQuoteLeft className={styles.quoteIcon} style={{ color: data.color }} />
            <p className={styles.quoteText}>{data.quote.text}</p>
            <cite className={styles.quoteAuthor}>— {data.quote.author}</cite>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
