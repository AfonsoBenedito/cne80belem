import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaChevronRight, FaSearch, FaBookOpen, FaLightbulb, FaTimes, FaPaperPlane, FaFilter } from 'react-icons/fa';
import { cancoes } from '../../config/cancioneiro';
import { tagCategories } from '../../config/tags';
import { normalize } from '../../utils/normalize';
import SongbookBuilder from '../../components/SongbookBuilder/SongbookBuilder';
import styles from './Cancioneiro.module.css';

const sorted = [...cancoes].sort((a, b) => a.title.localeCompare(b.title, 'pt'));
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Cancioneiro() {
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  const filtered = useMemo(() => {
    setVisibleCount(10);
    return sorted.filter((s) => {
      if (!normalize(s.title).includes(normalize(search))) return false;
      if (activeTags.length > 0 && !activeTags.every((t) => s.tags?.includes(t))) return false;
      return true;
    });
  }, [search, activeTags]);

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
          <button
            className={`${styles.filterBtn} ${activeTags.length > 0 ? styles.filterBtnActive : ''}`}
            onClick={() => setShowFilters((s) => !s)}
          >
            <FaFilter size={12} />
            {activeTags.length > 0 && <span>{activeTags.length}</span>}
          </button>
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

        {showFilters && (
          <div className={styles.filters}>
            {tagCategories.map((cat) => (
              <div key={cat.key} className={styles.filterGroup}>
                <span className={styles.filterLabel}>{cat.label}</span>
                <div className={styles.filterTags}>
                  {cat.tags.map((tag) => (
                    <button
                      key={tag.value}
                      className={`${styles.filterTag} ${activeTags.includes(tag.value) ? styles.filterTagActive : ''}`}
                      onClick={() => toggleTag(tag.value)}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {activeTags.length > 0 && (
              <button className={styles.filterClear} onClick={() => setActiveTags([])}>
                <FaTimes size={10} /> Limpar filtros
              </button>
            )}
          </div>
        )}

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

        <p className={styles.suggestText}>
          Não encontras a música que procuras?{' '}
          <button className={styles.suggestLink} onClick={() => setShowSuggest(true)}>
            Sugere-nos <FaLightbulb size={11} />
          </button>
        </p>
      </div>

      {showBuilder && <SongbookBuilder onClose={() => setShowBuilder(false)} />}
      {showSuggest && <SuggestModal onClose={() => setShowSuggest(false)} />}
    </main>
  );
}

function SuggestModal({ onClose }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('https://formspree.io/f/mpqoggqp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `🎵 Sugestão de música: ${title}`,
          titulo: title,
          artista: artist || '—',
          link: link || '—',
          notas: notes || '—',
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Erro ao enviar. Tenta novamente.');
      }
    } catch {
      setError('Erro de ligação. Verifica a internet.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.suggestOverlay} onClick={onClose}>
      <div className={styles.suggestPanel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.suggestHeader}>
          <h2 className={styles.suggestTitle}>
            <FaLightbulb size={16} /> Sugere uma Música
          </h2>
          <button className={styles.suggestClose} onClick={onClose}>
            <FaTimes size={14} />
          </button>
        </div>

        {submitted ? (
          <div className={styles.suggestSuccess}>
            <p>Obrigado pela sugestão!</p>
            <p className={styles.suggestSuccessSub}>
              A tua sugestão foi enviada com sucesso. Vamos analisá-la em breve.
            </p>
            <button className={styles.suggestDoneBtn} onClick={onClose}>Fechar</button>
          </div>
        ) : (
          <form className={styles.suggestForm} onSubmit={handleSubmit}>
            <div className={styles.suggestField}>
              <label className={styles.suggestLabel}>Título da música *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Irei Ficar"
                className={styles.suggestInput}
              />
            </div>
            <div className={styles.suggestField}>
              <label className={styles.suggestLabel}>Artista (opcional)</label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Ex: Escuteiros"
                className={styles.suggestInput}
              />
            </div>
            <div className={styles.suggestField}>
              <label className={styles.suggestLabel}>Link (opcional)</label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="YouTube, CifraClub, etc."
                className={styles.suggestInput}
              />
            </div>
            <div className={styles.suggestField}>
              <label className={styles.suggestLabel}>Notas (opcional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Alguma informação extra..."
                className={styles.suggestTextarea}
                rows={2}
              />
            </div>
            {error && <p className={styles.suggestError}>{error}</p>}
            <button type="submit" className={styles.suggestSubmitBtn} disabled={submitting}>
              <FaPaperPlane size={12} />
              {submitting ? 'A enviar...' : 'Enviar Sugestão'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
