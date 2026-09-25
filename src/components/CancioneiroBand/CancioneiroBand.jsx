import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBookOpen, FaArrowRight } from 'react-icons/fa';
import LyricsWithChords from '../LyricsWithChords/LyricsWithChords';
import { cancoes } from '../../config/cancioneiro';
import styles from './CancioneiroBand.module.css';

const BASE = '/recursos/cancioneiro';
const FEATURED_SLUG = 'dar-mais';
const featured = cancoes.find((s) => s.slug === FEATURED_SLUG);
// The first chorus, read from the song itself so Home never drifts from the real lyrics.
// The {R} marker is dropped: song pages set choruses all-green to mark them within a song,
// but alone here that turns every line green and hides the chords; the "Refrão" label names it instead.
const chorus = featured?.lyricsWithChords.split('\n\n').find((stanza) => stanza.startsWith('{R}'))?.slice(3);

export default function CancioneiroBand() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = query.trim();
    navigate(term ? `${BASE}?q=${encodeURIComponent(term)}` : BASE);
  };

  return (
    <section className={styles.section} aria-labelledby="cancioneiro-band-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro}>
          <h2 id="cancioneiro-band-title" className={styles.title}>O nosso cancioneiro</h2>
          <p className={styles.line}>
            {cancoes.length} canções com acordes, prontas a tocar e a imprimir.
          </p>

          <form className={styles.search} role="search" onSubmit={handleSubmit}>
            <label htmlFor="band-song-search" className={styles.srOnly}>Procurar canção pelo título</label>
            <FaSearch className={styles.searchIcon} size={14} aria-hidden="true" />
            <input
              id="band-song-search"
              type="search"
              enterKeyHint="search"
              placeholder="Procurar pelo título"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn}>Procurar</button>
          </form>

          <Link to={`${BASE}?montar=1`} className={styles.builder}>
            <FaBookOpen size={14} aria-hidden="true" /> Faz o teu Cancioneiro em PDF
          </Link>
        </div>

        {chorus && (
          <figure className={styles.song}>
            <figcaption className={styles.songHead}>
              <h3 className={styles.songTitle}>{featured.title}</h3>
              <span className={styles.songMeta}>Refrão · Tom de {featured.key}</span>
            </figcaption>
            <LyricsWithChords lyricsWithChords={chorus} showChords semitones={0} solfege={false} />
            <Link to={`${BASE}/${featured.slug}`} className={styles.songLink}>
              Ver a canção completa <FaArrowRight size={11} aria-hidden="true" />
            </Link>
          </figure>
        )}
      </div>
    </section>
  );
}
