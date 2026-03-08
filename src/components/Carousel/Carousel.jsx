import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './Carousel.module.css';

const INTERVAL_MS = 5000;

export default function Carousel({ images }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className={styles.carousel}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className={styles.slide}>
            <img
              src={src}
              alt={`Agrupamento 80 - Foto ${index + 1}`}
              className={styles.image}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Agrupamento 80</h1>
        <p className={styles.subtitle}>Santa Maria de Belém</p>
        <div className={styles.buttons}>
          <a href="#" className={styles.btnGreen}>Inscreve-te</a>
          <Link to="/agrupamento/noticias" className={styles.btnWhite}>Notícias</Link>
        </div>
      </div>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
