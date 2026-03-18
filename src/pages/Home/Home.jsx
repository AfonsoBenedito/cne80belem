import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import { noticias } from '../../config/noticias';
import img01 from '../../assets/images/carousel/01.jpg';
import img02 from '../../assets/images/carousel/02.jpeg';
import img03 from '../../assets/images/carousel/03.jpg';
import img04 from '../../assets/images/carousel/04.jpg';
import img05 from '../../assets/images/carousel/05.jpg';
import styles from './Home.module.css';

const carouselImages = [img01, img02, img03, img04, img05];

export default function Home() {
  const photos = useMemo(() => {
    const seen = new Set();
    const all = [];
    noticias.forEach((n) => {
      n.photos.forEach((p) => {
        if (!seen.has(p)) {
          seen.add(p);
          all.push({ src: p, slug: n.slug, title: n.title });
        }
      });
    });
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all.slice(0, 5);
  }, []);

  return (
    <main className={styles.home}>
      <Carousel images={carouselImages} />

      <section className={styles.welcome}>
        <div className="container">
          <h1 className={styles.title}>Agrupamento 80</h1>
          <h2 className={styles.subtitle}>Santa Maria de Belém</h2>
          <p className={styles.description}>
            Bem-vindos ao site do Agrupamento 80 do Corpo Nacional de Escutas.
            Somos uma comunidade de jovens e adultos unidos pelo escutismo, crescendo juntos em Belém.
          </p>

          <div className={styles.gallery}>
            {photos.map((photo, i) => (
              <Link
                key={i}
                to={`/agrupamento/noticias/${photo.slug}`}
                className={styles.galleryItem}
              >
                <img src={photo.src} alt={photo.title} className={styles.galleryImg} loading="lazy" />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryCaption}>{photo.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
