import { useState, useMemo, useRef } from 'react';
import { useSEO } from '../../utils/useSEO';
import JsonLd from '../../components/JsonLd';
import { Link, useSearchParams } from 'react-router-dom';
import { FaChevronRight, FaSearch, FaBookOpen, FaLightbulb, FaTimes, FaPaperPlane, FaFilter, FaPlus, FaCheck } from 'react-icons/fa';
import { cancoes } from '../../config/cancioneiro';
import { tagCategories } from '../../config/tags';
import { normalize } from '../../utils/normalize';
import { matchesTags, facetCount, isKnownTag } from '../../utils/songFilters';
import SongbookBuilder from '../../components/SongbookBuilder/SongbookBuilder';
import { useModalDialog } from '../../utils/useModalDialog';
import { useSongbookDraft, toggleSong as toggleDraftSong } from '../../utils/songbookSelection';
import styles from './Cancioneiro.module.css';
import dialog from '../../styles/dialog.module.css';

const sorted = [...cancoes].sort((a, b) => a.title.localeCompare(b.title, 'pt'));

// Up to two tags per row, the most specific first: the Mass moment, then the occasion, then the theme
const TAG_ORDER = ['momento-missa', 'ocasião', 'seccao', 'tema'];
const tagLabel = new Map(tagCategories.flatMap((c) => c.tags.map((t) => [t.value, { label: t.label, rank: TAG_ORDER.indexOf(c.key) }])));
function rowMeta(song) {
  // A Mass moment already says Missa
  const hasMoment = song.tags?.some((t) => MASS_MOMENTS.has(t));
  const tags = (song.tags || [])
    .filter((t) => tagLabel.has(t) && !(hasMoment && t === 'missa'))
    .sort((a, b) => tagLabel.get(a).rank - tagLabel.get(b).rank)
    .slice(0, 2)
    .map((t) => tagLabel.get(t).label);
  return [song.author, song.capo && `Capo ${song.capo}`, ...tags].filter(Boolean).join(' · ');
}
const MASS_MOMENTS = new Set(tagCategories.find((c) => c.key === 'momento-missa').tags.map((t) => t.value));
// Chips that no song carries (e.g. a Mass moment nobody has tagged yet) stay out of the panel
const shownCategories = tagCategories
  .map((cat) => ({ ...cat, tags: cat.tags.filter((t) => cancoes.some((s) => s.tags?.includes(t.value))) }))
  .filter((cat) => cat.tags.length > 0);

const SEARCH_MAX = 80;
// Long enough for any title; a pasted paragraph would stretch the button past the screen
const clip = (t, n = 28) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Cancioneiro CNE - Músicas para Missa e Escutismo',
  description: 'Cancioneiro escuteiro com letras e acordes de guitarra para missa, oração e escutismo.',
  url: 'https://afonsobenedito.github.io/cne80belem/recursos/cancioneiro',
  itemListElement: sorted.map((song, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'MusicComposition',
      name: song.title,
      url: `https://afonsobenedito.github.io/cne80belem/recursos/cancioneiro/${song.slug}`,
    },
  })),
};

export default function Cancioneiro() {
  useSEO({
    rawTitle: 'Cancioneiro CNE - Músicas com Acordes para Missa e Escutismo',
    description: 'Cancioneiro escuteiro com letras e acordes de guitarra. Músicas para missa, oração, acampamentos e encontros de escuteiros CNE.',
    keywords: 'cancioneiro escuteiros, cancioneiro CNE, músicas missa escuteiros, acordes escutismo, letras e acordes missa, canções escuteiros portugal, músicas acampamento escuteiros, oração escuteiros',
  });

  // The search (?q=) and filters (?tags=) live in the URL, so a filtered list can be shared and
  // survives Back; Home links here with ?q= or ?montar=1 (open the PDF builder)
  const [searchParams, setSearchParams] = useSearchParams();
  // A shared link can carry any ?q=; the field itself caps typing at the same length
  const [search, setSearch] = useState(() => (searchParams.get('q') || '').slice(0, SEARCH_MAX));
  const [activeTags, setActiveTags] = useState(() =>
    (searchParams.get('tags') || '').split(',').filter(isKnownTag),
  );
  const [showFilters, setShowFilters] = useState(() => !!searchParams.get('tags'));

  function syncUrl(q, tags) {
    const next = new URLSearchParams(searchParams);
    if (q) next.set('q', q); else next.delete('q');
    if (tags.length) next.set('tags', tags.join(',')); else next.delete('tags');
    setSearchParams(next, { replace: true });
  }
  const [showBuilder, setShowBuilder] = useState(() => searchParams.get('montar') === '1');
  // null = closed; a string = open, with that title filled in (from an empty search)
  const [suggestTitle, setSuggestTitle] = useState(null);
  const { slugs: draftSlugs } = useSongbookDraft();
  const [draftMessage, setDraftMessage] = useState('');

  // Adding from the list fills the same songbook the builder opens with
  function toggleDraft(song) {
    const adding = !draftSlugs.includes(song.slug);
    toggleDraftSong(song.slug);
    const n = draftSlugs.length + (adding ? 1 : -1);
    setDraftMessage(`«${song.title}» ${adding ? 'adicionada ao' : 'retirada do'} teu cancioneiro (${n} ${n === 1 ? 'canção' : 'canções'})`);
  }

  // A new search or filter starts the list from the top again
  function setTags(next) {
    setActiveTags(next);
    syncUrl(search, next);
  }

  function toggleTag(tag) {
    let next = activeTags.includes(tag) ? activeTags.filter((t) => t !== tag) : [...activeTags, tag];
    // Turning Missa off hides its moments, so their chips can't keep filtering unseen
    if (tag === 'missa' && !next.includes('missa')) next = next.filter((t) => !MASS_MOMENTS.has(t));
    setTags(next);
  }

  const bySearch = useMemo(
    () => sorted.filter((s) => normalize(s.title).includes(normalize(search))),
    [search],
  );
  const filtered = useMemo(() => bySearch.filter((s) => matchesTags(s, activeTags)), [bySearch, activeTags]);
  const showMoments = activeTags.includes('missa') || activeTags.some((t) => MASS_MOMENTS.has(t));

  // An empty list says what emptied it, so the way out is obvious
  const term = search.trim();
  // Worded the way the filters combine: «ou» within a group, «e» across groups
  const tagText = tagCategories
    .map((c) => c.tags.filter((t) => activeTags.includes(t.value)).map((t) => t.label).join(' ou '))
    .filter(Boolean)
    .join(' e ');
  const emptyMessage = term && tagText
    ? `Nenhuma canção de ${tagText} tem «${term}» no título.`
    : term
      ? `Nenhuma canção tem «${term}» no título.`
      : `Nenhuma canção de ${tagText}.`;

  const empty = filtered.length === 0;
  // A group with a single chip is no choice at all, so it only shows while that chip is on (e.g.
  // arriving from a song page's tag). With no results, only the chips that are on stay: they're the
  // ones worth turning off, and a wall of zeros would push the message off the screen.
  const panelGroups = shownCategories
    .filter((cat) => cat.key !== 'momento-missa' || showMoments)
    .map((cat) => ({
      ...cat,
      tags: empty || cat.tags.length < 2 ? cat.tags.filter((t) => activeTags.includes(t.value)) : cat.tags,
    }))
    .filter((cat) => cat.tags.length > 0);

  const filterBtnRef = useRef(null);
  const contentRef = useRef(null);
  // Phones: the open panel fills the screen, so this closes it and lands on the first song
  function showResults() {
    setShowFilters(false);
    requestAnimationFrame(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      contentRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      filterBtnRef.current?.focus({ preventScroll: true });
    });
  }

  const availableLetters = useMemo(
    () => new Set(filtered.map((s) => s.title[0].toUpperCase())),
    [filtered],
  );

  const letters = ALPHABET.filter((l) => availableLetters.has(l));
  const [letterIdx, setLetterIdx] = useState(0);
  function onAlphabetKey(e) {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next;
    if (e.key in keys) next = Math.min(Math.max(Math.min(letterIdx, letters.length - 1) + keys[e.key], 0), letters.length - 1);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = letters.length - 1;
    else return;
    e.preventDefault();
    setLetterIdx(next);
    e.currentTarget.querySelectorAll('button')[next]?.focus();
  }

  // Jumps to the letter's first song and moves focus there, so keyboard users land where they look
  function scrollToLetter(letter) {
    requestAnimationFrame(() => {
      const el = document.getElementById(`letter-${letter}`);
      if (!el) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      el.focus({ preventScroll: true });
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
      <JsonLd data={itemListLd} />
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Cancioneiro</h1>
          <p className={styles.subtitle}>
            As canções que nos acompanham no caminho.
          </p>
        </header>

        {/* Desktop: the whole bar sticks under the header. Phones: only the filter + search row does
            (the toolbar becomes display: contents), and the builder button scrolls away below it */}
        <div className={styles.toolbar}>
          <div className={styles.searchRow}>
          <button
            ref={filterBtnRef}
            className={styles.filterBtn}
            onClick={() => setShowFilters((s) => !s)}
            aria-expanded={showFilters}
            aria-controls="cancioneiro-filtros"
            aria-label={activeTags.length > 0 ? `Filtros (${activeTags.length} ${activeTags.length === 1 ? 'ativo' : 'ativos'})` : 'Filtros'}
          >
            <FaFilter size={12} aria-hidden="true" />
            {activeTags.length > 0 && <span className={styles.countBadge} aria-hidden="true">{activeTags.length}</span>}
          </button>
          <div className={styles.searchWrapper}>
            <FaSearch size={14} className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              aria-label="Procurar canção pelo título"
              placeholder="Procurar pelo título"
              maxLength={SEARCH_MAX}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                syncUrl(e.target.value, activeTags);
              }}
              className={styles.searchInput}
            />
            {search && (
              <button
                className={styles.searchClear}
                onClick={(e) => {
                  setSearch('');
                  syncUrl('', activeTags);
                  e.currentTarget.parentElement.querySelector('input').focus();
                }}
                aria-label="Limpar pesquisa"
              >
                <FaTimes size={12} aria-hidden="true" />
              </button>
            )}
          </div>
          {/* Phones have no room for the A-Z sidebar: the native picker jumps just as fast */}
          <select
            className={styles.letterSelect}
            value=""
            onChange={(e) => { if (e.target.value) scrollToLetter(e.target.value); }}
            aria-label="Ir para a letra"
          >
            <option value="">A–Z</option>
            {ALPHABET.filter((l) => availableLetters.has(l)).map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          </div>
          <button
            className={styles.builderBtn}
            onClick={() => setShowBuilder(true)}
          >
            <FaBookOpen size={14} aria-hidden="true" />
            Faz o teu Cancioneiro
            {draftSlugs.length > 0 && (
              <span className={styles.countBadge}>
                {draftSlugs.length}
                <span className={styles.srOnly}> {draftSlugs.length === 1 ? 'canção escolhida' : 'canções escolhidas'}</span>
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className={styles.filters} id="cancioneiro-filtros">
            {panelGroups.map((cat) => (
              <div key={cat.key} className={styles.filterGroup} role="group" aria-labelledby={`filtro-${cat.key}`}>
                <span className={styles.filterLabel} id={`filtro-${cat.key}`}>{cat.label}</span>
                <div className={styles.filterTags}>
                  {cat.tags.map((tag) => {
                    const on = activeTags.includes(tag.value);
                    const count = facetCount(bySearch, activeTags, tag.value);
                    // A chip that would empty the list is dimmed and inert, unless it's already on
                    const dead = !on && count === 0;
                    return (
                      <button
                        key={tag.value}
                        className={`${styles.filterTag} ${on ? styles.filterTagActive : ''}`}
                        onClick={() => { if (!dead) toggleTag(tag.value); }}
                        aria-pressed={on}
                        aria-disabled={dead || undefined}
                        aria-label={`${tag.label} (${count} ${count === 1 ? 'canção' : 'canções'})`}
                      >
                        {tag.label}
                        <span className={styles.filterCount} aria-hidden="true">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {!empty && !showMoments && shownCategories.some((c) => c.key === 'momento-missa') && (
              <p className={styles.filterHint}>Escolhe Missa para filtrar pelo momento da celebração.</p>
            )}
            {/* With no results the empty message below carries «Limpar filtros» */}
            {!empty && (
              <div className={styles.filterFooter}>
                {activeTags.length > 0 && (
                  <button className={styles.filterClear} onClick={() => setTags([])}>
                    <FaTimes size={10} aria-hidden="true" /> Limpar filtros
                  </button>
                )}
                <button className={styles.filterDone} onClick={showResults}>
                  Mostrar {filtered.length} {filtered.length === 1 ? 'canção' : 'canções'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Announces the result count as the search or filters change */}
        <p className={styles.srOnly} aria-live="polite">{draftMessage}</p>
        <p className={styles.srOnly} aria-live="polite">
          {filtered.length === 0
            ? emptyMessage
            : `${filtered.length} ${filtered.length === 1 ? 'canção' : 'canções'}`}
        </p>

        <div className={styles.content} ref={contentRef}>
          {/* One tab stop, not one per letter: arrows (and Home/End) move between letters, Enter jumps */}
          <nav className={styles.alphabet} aria-label="Índice alfabético" onKeyDown={onAlphabetKey}>
            {letters.map((letter, i) => (
              <span key={letter}>
                {i > 0 && <span className={styles.letterDot} aria-hidden="true">·</span>}
                <button
                  className={styles.letterBtn}
                  onClick={() => { setLetterIdx(i); scrollToLetter(letter); }}
                  tabIndex={i === Math.min(letterIdx, letters.length - 1) ? 0 : -1}
                  aria-label={`Ir para a letra ${letter}`}
                >
                  {letter}
                </button>
              </span>
            ))}
          </nav>

          <div className={styles.grid}>
            {filtered.length === 0 && (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>{emptyMessage}</p>
                <div className={styles.emptyActions}>
                  {term && (
                    <button className={styles.emptyBtn} onClick={() => { setSearch(''); syncUrl('', activeTags); }}>
                      Limpar pesquisa
                    </button>
                  )}
                  {activeTags.length > 0 && (
                    <button className={styles.emptyBtn} onClick={() => setTags([])}>
                      Limpar filtros
                    </button>
                  )}
                  <button className={`${styles.emptyBtn} ${styles.emptyBtnPrimary}`} onClick={() => setSuggestTitle(term)}>
                    <FaLightbulb size={12} aria-hidden="true" />
                    {term ? `Sugerir «${clip(term)}»` : 'Sugerir uma canção'}
                  </button>
                </div>
              </div>
            )}
            {filtered.length > 0 && (
            <ul className={styles.list}>
            {filtered.map((song) => {
              const inDraft = draftSlugs.includes(song.slug);
              const meta = rowMeta(song);
              return (
                <li key={song.slug} className={styles.row}>
                  <Link
                    id={firstOfLetter[song.slug] ? `letter-${firstOfLetter[song.slug]}` : undefined}
                    to={`/recursos/cancioneiro/${song.slug}`}
                    className={styles.card}
                  >
                    <span className={styles.cardInfo}>
                      <span className={styles.cardTitle}>{song.title}</span>
                      {meta && <span className={styles.cardMeta}>{meta}</span>}
                    </span>
                    {/* Last in the markup so the title is read first; placed first by CSS */}
                    <span className={styles.cardKey}>
                      <span className={styles.srOnly}>Tom </span>{song.key}
                    </span>
                    <FaChevronRight size={12} className={styles.cardArrow} aria-hidden="true" />
                  </Link>
                  {/* Beside the link, not inside it: a button can't live in a link */}
                  <button
                    className={`${styles.addBtn} ${inDraft ? styles.addBtnOn : ''}`}
                    onClick={() => toggleDraft(song)}
                    // The name says what a tap does; the tick shows the state
                    aria-label={inDraft ? `Retirar «${song.title}» do teu cancioneiro` : `Adicionar «${song.title}» ao teu cancioneiro`}
                    title={inDraft ? 'Retirar do teu cancioneiro' : 'Adicionar ao teu cancioneiro'}
                  >
                    {inDraft ? <FaCheck size={13} aria-hidden="true" /> : <FaPlus size={13} aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
            </ul>
            )}
          </div>
        </div>

        <p className={styles.suggestText}>
          Não encontras a canção que procuras?{' '}
          <button className={styles.suggestLink} onClick={() => setSuggestTitle('')}>
            Sugere-nos <FaLightbulb size={11} aria-hidden="true" />
          </button>
        </p>
      </div>

      {showBuilder && <SongbookBuilder onClose={() => setShowBuilder(false)} />}
      {suggestTitle !== null && <SuggestModal initialTitle={suggestTitle} onClose={() => setSuggestTitle(null)} />}
    </main>
  );
}

function SuggestModal({ onClose, initialTitle = '' }) {
  const [title, setTitle] = useState(initialTitle);
  const [artist, setArtist] = useState('');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const panelRef = useRef(null);
  useModalDialog(panelRef, onClose);

  async function handleSubmit(e) {
    e.preventDefault();
    // "required" lets a title of spaces through
    if (!title.trim()) {
      setError('Escreve o título da canção antes de enviar.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('https://formspree.io/f/mpqoggqp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `🎵 Sugestão de canção: ${title.trim()}`,
          titulo: title.trim(),
          artista: artist || '-',
          link: link || '-',
          notas: notes || '-',
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        // The form is replaced by the thank-you; keep focus in the dialog
        requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
      } else {
        setError('Não foi possível enviar a sugestão. Tenta outra vez daqui a pouco.');
      }
    } catch {
      setError('Sem ligação à internet. A tua sugestão ficou guardada aqui; tenta outra vez.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={dialog.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        className={`${dialog.panel} ${dialog.panelScroll} ${styles.suggestPanel}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="suggest-title"
        tabIndex={-1}
      >
        <div className={styles.suggestHeader}>
          <h2 className={styles.suggestTitle} id="suggest-title">
            <FaLightbulb size={16} aria-hidden="true" /> Sugerir uma canção
          </h2>
          <button className={styles.suggestClose} onClick={onClose} aria-label="Fechar">
            <FaTimes size={14} aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className={styles.suggestSuccess} role="status">
            <p>Obrigado pela sugestão!</p>
            <p className={styles.suggestSuccessSub}>
              Recebemos «{title.trim()}» e vamos analisá-la.
            </p>
            <button className={styles.suggestDoneBtn} onClick={onClose}>Fechar</button>
          </div>
        ) : (
          <form className={styles.suggestForm} onSubmit={handleSubmit}>
            <div className={styles.suggestField}>
              <label className={styles.suggestLabel} htmlFor="suggest-titulo">Título da canção</label>
              <input
                id="suggest-titulo"
                type="text"
                required
                maxLength={120}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="O título como o conheces"
                className={styles.suggestInput}
              />
            </div>
            <div className={styles.suggestField}>
              <label className={styles.suggestLabel} htmlFor="suggest-artista">Artista ou autor (opcional)</label>
              <input
                id="suggest-artista"
                type="text"
                maxLength={120}
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className={styles.suggestInput}
              />
            </div>
            <div className={styles.suggestField}>
              <label className={styles.suggestLabel} htmlFor="suggest-link">Link (opcional)</label>
              <input
                id="suggest-link"
                type="text"
                maxLength={500}
                inputMode="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Um vídeo, ou a letra com acordes"
                className={styles.suggestInput}
              />
            </div>
            <div className={styles.suggestField}>
              <label className={styles.suggestLabel} htmlFor="suggest-notas">Notas (opcional)</label>
              <textarea
                id="suggest-notas"
                maxLength={1000}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Em que momento se canta, o tom, a letra..."
                className={styles.suggestTextarea}
                rows={2}
              />
            </div>
            {error && <p className={styles.suggestError} role="alert">{error}</p>}
            <button type="submit" className={styles.suggestSubmitBtn} disabled={submitting}>
              <FaPaperPlane size={12} aria-hidden="true" />
              {submitting ? 'A enviar...' : 'Enviar sugestão'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
