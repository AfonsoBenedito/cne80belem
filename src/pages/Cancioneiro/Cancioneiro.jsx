import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaChevronRight, FaSearch, FaBookOpen } from 'react-icons/fa';
import { cancoes } from '../../config/cancioneiro';
import { normalize } from '../../utils/normalize';
import SongbookBuilder from '../../components/SongbookBuilder/SongbookBuilder';
import styles from './Cancioneiro.module.css';

const sorted = [...cancoes].sort((a, b) => a.title.localeCompare(b.title, 'pt'));
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Cancioneiro() {
  const [search, setSearch] = useState('');
  const [showBuilder, setShowBuilder] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  const filtered = useMemo(() => {
    setVisibleCount(10);
    return sorted.filter((s) => normalize(s.title).includes(normalize(search)));
  }, [search]);

  const availableLetters = useMemo(
    () => new Set(filtered.map((s) => s.title[0].toUpperCase())),
    [filtered],
  );

  function scrollToLetter(letter) {
    setVisibleCount(filtered.length);
    requestAnimationFrame(() => {
      const el = document.getElementById(`letter-${letter}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Group filtered songs to detect first occurrence of each letter
  const firstOfLetter = useMemo(() => {
    const seen = new Set();
    const result = {};
    filtered.forEach((song) => {
      const letter = song.title[0].toUpperCase();
      if (!seen.has(letter)) {
        seen.add(letter);
        result[song.slug] = letter;
      }
    });
    return result;
  }, [filtered]);

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Cancioneiro</h1>
          <p className={styles.subtitle}>
            As canções que nos acompanham no caminho.
          </p>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <FaSearch size={14} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Procurar canção..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button
            className={styles.builderBtn}
            onClick={() => setShowBuilder(true)}
          >
            <FaBookOpen size={14} />
            Faz o teu Cancioneiro
          </button>
        </div>

        <div className={styles.content}>
          <nav className={styles.alphabet}>
            {ALPHABET.filter((l) => availableLetters.has(l)).map((letter, i, arr) => (
              <span key={letter}>
                {i > 0 && <span className={styles.letterDot}>·</span>}
                <button
                  className={styles.letterBtn}
                  onClick={() => scrollToLetter(letter)}
                >
                  {letter}
                </button>
              </span>
            ))}
          </nav>

          <div className={styles.grid}>
            {filtered.length === 0 && (
              <p className={styles.empty}>Nenhuma canção encontrada.</p>
            )}
            {filtered.slice(0, visibleCount).map((song) => (
              <Link
                key={song.slug}
                id={firstOfLetter[song.slug] ? `letter-${firstOfLetter[song.slug]}` : undefined}
                to={`/recursos/cancioneiro/${song.slug}`}
                className={styles.card}
              >
                <div className={styles.cardIcon}>
                  <FaMusic size={20} />
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardTitle}>{song.title}</span>
                </div>
                <FaChevronRight size={12} className={styles.cardArrow} />
              </Link>
            ))}
            {visibleCount < filtered.length && (
              <button
                className={styles.showMoreBtn}
                onClick={() => setVisibleCount((c) => c + 10)}
              >
                Ver Mais ({filtered.length - visibleCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {showBuilder && <SongbookBuilder onClose={() => setShowBuilder(false)} />}
    </main>
  );
}
