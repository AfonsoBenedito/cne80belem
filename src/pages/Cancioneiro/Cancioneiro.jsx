import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaChevronRight, FaSearch, FaBookOpen } from 'react-icons/fa';
import { cancoes } from '../../config/cancioneiro';
import { normalize } from '../../utils/normalize';
import SongbookBuilder from '../../components/SongbookBuilder/SongbookBuilder';
import styles from './Cancioneiro.module.css';

const sorted = [...cancoes].sort((a, b) => a.title.localeCompare(b.title, 'pt'));

export default function Cancioneiro() {
  const [search, setSearch] = useState('');
  const [showBuilder, setShowBuilder] = useState(false);

  const filtered = useMemo(
    () => sorted.filter((s) => normalize(s.title).includes(normalize(search))),
    [search],
  );

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

        <div className={styles.grid}>
          {filtered.length === 0 && (
            <p className={styles.empty}>Nenhuma canção encontrada.</p>
          )}
          {filtered.map((song) => (
            <Link
              key={song.slug}
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
        </div>
      </div>

      {showBuilder && <SongbookBuilder onClose={() => setShowBuilder(false)} />}
    </main>
  );
}
