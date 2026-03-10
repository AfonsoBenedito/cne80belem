import { useParams, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { FaCalendarAlt, FaUser, FaTag, FaImages, FaTimes, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { noticias } from '../../config/noticias';
import styles from './NoticiaDetail.module.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function NoticiaDetail() {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const noticia = noticias.find((n) => n.slug === slug);

  if (!noticia) return <Navigate to="/agrupamento/noticias" replace />;

  const paragraphs = noticia.body.split('\n\n');
  const extraPhotos = noticia.photos.length > 1;

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <img src={noticia.cover} alt={noticia.title} className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroInfo}>
            <span className={styles.heroSection}>
              <FaTag size={11} /> {noticia.section}
            </span>
            <h1 className={styles.heroTitle}>{noticia.title}</h1>
            <div className={styles.heroMeta}>
              <span><FaUser size={12} /> {noticia.author}</span>
              <span><FaCalendarAlt size={12} /> {formatDate(noticia.date)}</span>
              {extraPhotos && (
                <span
                  className={styles.heroPhotos}
                  onClick={() => setLightboxIndex(0)}
                >
                  <FaImages size={12} /> {noticia.photos.length} fotos
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className={styles.body}>
        <div className="container">
          <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <Link to="/agrupamento/noticias" className={styles.backLink}>
                <FaArrowLeft size={12} /> Todas as notícias
              </Link>

              <div className={styles.sidebarCard}>
                <div className={styles.authorRow}>
                  <div className={styles.authorAvatar}>
                    <FaUser size={18} />
                  </div>
                  <div>
                    <p className={styles.authorName}>{noticia.author}</p>
                    <p className={styles.authorRole}>{noticia.section}</p>
                  </div>
                </div>
                <dl className={styles.detailList}>
                  <dt>Data</dt>
                  <dd>{formatDate(noticia.date)}</dd>
                  <dt>Secção</dt>
                  <dd>{noticia.section}</dd>
                </dl>
              </div>

              {extraPhotos && (
                <div className={styles.sidebarCard}>
                  <h3 className={styles.sidebarTitle}>
                    <FaImages size={14} /> Galeria ({noticia.photos.length})
                  </h3>
                  <div className={styles.thumbGrid}>
                    {noticia.photos.map((photo, i) => (
                      <button
                        key={i}
                        className={styles.thumb}
                        onClick={() => setLightboxIndex(i)}
                      >
                        <img src={photo} alt={`Foto ${i + 1}`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* Article */}
            <article className={styles.article}>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </article>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className={styles.lightbox} onClick={() => setLightboxIndex(null)}>
          <button className={styles.lightboxClose}>
            <FaTimes size={20} />
          </button>

          {noticia.photos.length > 1 && (
            <button
              className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + noticia.photos.length) % noticia.photos.length);
              }}
            >
              <FaChevronLeft size={24} />
            </button>
          )}

          <img
            src={noticia.photos[lightboxIndex]}
            alt={`Foto ${lightboxIndex + 1}`}
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />

          {noticia.photos.length > 1 && (
            <button
              className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % noticia.photos.length);
              }}
            >
              <FaChevronRight size={24} />
            </button>
          )}

          <div className={styles.lightboxNav} onClick={(e) => e.stopPropagation()}>
            {noticia.photos.map((photo, i) => (
              <button
                key={i}
                className={`${styles.lightboxDot} ${i === lightboxIndex ? styles.lightboxDotActive : ''}`}
                onClick={() => setLightboxIndex(i)}
              >
                <img src={photo} alt={`Foto ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
