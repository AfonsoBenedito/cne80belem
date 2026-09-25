import { useState, useEffect, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaMusic, FaGuitar, FaPlus, FaMinus, FaDownload, FaUndo, FaExclamationCircle, FaTimes, FaPaperPlane, FaYoutube, FaSoundcloud, FaTiktok, FaBookOpen, FaCheck, FaPlay } from 'react-icons/fa';
import { cancoes } from '../../config/cancioneiro';
import { transposeChord, chordToSolfege } from '../../config/chords';
import LyricsWithChords from '../../components/LyricsWithChords/LyricsWithChords';
const loadPdfGenerator = () => import('../../utils/generateSongPdf');
import { useSEO } from '../../utils/useSEO';
import { useSongbookDraft, toggleSong as toggleDraftSong } from '../../utils/songbookSelection';
import { useModalDialog } from '../../utils/useModalDialog';
import { tagCategories } from '../../config/tags';
import JsonLd from '../../components/JsonLd';
import styles from './CancaoDetail.module.css';
import dialog from '../../styles/dialog.module.css';

const sortedCancoes = [...cancoes].sort((a, b) => a.title.localeCompare(b.title, 'pt'));
const tagLabels = new Map(tagCategories.flatMap((c) => c.tags.map((t) => [t.value, t.label])));
// Reader's lyrics size, kept across songs and visits
const TEXT_SIZES = [0.875, 1, 1.125, 1.25, 1.5];
const TEXT_SIZE_KEY = 'cancioneiro-tamanho-letra';
function readTextSize() {
  try {
    const saved = localStorage.getItem(TEXT_SIZE_KEY);
    const i = saved === null ? NaN : Number(saved);
    return Number.isInteger(i) && i >= 0 && i < TEXT_SIZES.length ? i : 1;
  } catch {
    return 1;
  }
}

const SOURCE_NAMES = { youtube: 'YouTube', soundcloud: 'SoundCloud', tiktok: 'TikTok' };

export default function CancaoDetail() {
  const { slug } = useParams();
  const song = sortedCancoes.find((s) => s.slug === slug);

  const [showChords, setShowChords] = useState(true);
  // Every song opens in its own key: a transposition is dropped as soon as the song changes
  // (prev/next, a link, Back), so it never carries over, not even on the way back
  const [semitones, setSemitones] = useState(0);
  const [keySlug, setKeySlug] = useState(slug);
  if (keySlug !== slug) {
    setKeySlug(slug);
    setSemitones(0);
  }
  const [solfege, setSolfege] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [sourceOverride, setSourceOverride] = useState(null);
  // The players (YouTube ~1.2 MB, TikTok ~2 MB) load only when someone asks for them. Keyed by
  // song so moving to the next song starts from the light preview again.
  const [playingSlug, setPlayingSlug] = useState(null);
  const playing = playingSlug === slug;
  const focusPlayer = useRef(false);
  const playerRef = (el) => {
    if (el && focusPlayer.current) {
      focusPlayer.current = false;
      el.focus();
    }
  };
  function startPlayer() {
    focusPlayer.current = true;
    setPlayingSlug(slug);
  }
  const [pdfBusy, setPdfBusy] = useState(false);
  const settingsRef = useRef(null);
  const [barAway, setBarAway] = useState(false);
  useEffect(() => {
    const el = settingsRef.current;
    if (!el) return;
    const header = document.querySelector('header')?.getBoundingClientRect().height || 0;
    const io = new IntersectionObserver(
      ([e]) => setBarAway(!e.isIntersecting && e.boundingClientRect.top < header),
      { rootMargin: `-${Math.round(header)}px 0px 0px 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [slug]);
  const [pdfError, setPdfError] = useState('');
  const [draftMessage, setDraftMessage] = useState('');
  const [sizeIdx, setSizeIdx] = useState(readTextSize);
  function changeTextSize(dir) {
    const next = sizeIdx + dir;
    if (next < 0 || next >= TEXT_SIZES.length) return;
    setSizeIdx(next);
    try { localStorage.setItem(TEXT_SIZE_KEY, String(next)); } catch { /* private mode: this visit only */ }
    setDraftMessage(`Letra a ${Math.round(TEXT_SIZES[next] * 100)}%`);
  }
  // A ref, not the state: taps in the same frame would all still read pdfBusy as false
  const pdfRunning = useRef(false);
  const { slugs: draftSlugs } = useSongbookDraft();

  const tagContext = song?.tags?.length
    ? ` Indicado para: ${song.tags.join(', ')}.`
    : '';
  useSEO(song ? {
    rawTitle: `${song.title} - Letra e Acordes | Cancioneiro CNE Escuteiros`,
    description: `Letra e acordes de guitarra de "${song.title}"${song.author ? ` - ${song.author}` : ''}.${tagContext} Cancioneiro escuteiro CNE.`,
    keywords: `${song.title}, letra e acordes${song.author ? `, ${song.author}` : ''}, cancioneiro escuteiros, cancioneiro CNE, músicas missa escuteiros${song.tags?.length ? `, ${song.tags.join(', ')}` : ''}`,
  } : {});

  useEffect(() => { setSourceOverride(null); }, [slug]);

  if (!song) return <Navigate to="/recursos/cancioneiro" replace />;

  const sourceKeys = { youtubeId: 'youtube', soundcloudUrl: 'soundcloud', tiktokUrl: 'tiktok' };
  const mediaSources = Object.keys(song).filter(k => sourceKeys[k] && song[k]).map(k => sourceKeys[k]);
  const activeSource = mediaSources.includes(sourceOverride) ? sourceOverride : mediaSources[0] || null;

  const currentIndex = sortedCancoes.findIndex((s) => s.slug === slug);
  const prev = currentIndex > 0 ? sortedCancoes[currentIndex - 1] : null;
  const next = currentIndex < sortedCancoes.length - 1 ? sortedCancoes[currentIndex + 1] : null;

  // Same announcement as the list's "+", so the change is heard, not only seen
  function toggleDraft() {
    const adding = !draftSlugs.includes(song.slug);
    toggleDraftSong(song.slug);
    const n = draftSlugs.length + (adding ? 1 : -1);
    setDraftMessage(`«${song.title}» ${adding ? 'adicionada ao' : 'retirada do'} teu cancioneiro (${n} ${n === 1 ? 'canção' : 'canções'})`);
  }

  async function downloadPdf() {
    if (pdfRunning.current) return;
    pdfRunning.current = true;
    setPdfBusy(true);
    setPdfError('');
    try {
      const { generateSongPdf } = await loadPdfGenerator();
      await generateSongPdf(song, semitones, showChords);
    } catch (err) {
      // A failed dynamic import is a TypeError about fetching the module
      setPdfError(/fetch|import|module/i.test(err?.message || '')
        ? 'Não foi possível preparar o PDF. Verifica a ligação à internet e tenta outra vez.'
        : 'Não foi possível preparar o PDF. Tenta outra vez daqui a pouco.');
    } finally {
      pdfRunning.current = false;
      setPdfBusy(false);
    }
  }

  const currentKey = transposeChord(song.key, semitones);
  const displayKey = solfege ? chordToSolfege(currentKey) : currentKey;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicComposition',
    name: song.title,
    inLanguage: 'pt-PT',
    url: `https://afonsobenedito.github.io/cne80belem/recursos/cancioneiro/${song.slug}`,
    genre: ['Escutismo', 'Música Religiosa', 'Música de Acampamento'],
    ...(song.tags?.length && { keywords: song.tags.join(', ') }),
    ...(song.author && { composer: { '@type': 'Person', name: song.author } }),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://afonsobenedito.github.io/cne80belem/' },
      { '@type': 'ListItem', position: 2, name: 'Cancioneiro', item: 'https://afonsobenedito.github.io/cne80belem/recursos/cancioneiro' },
      { '@type': 'ListItem', position: 3, name: song.title, item: `https://afonsobenedito.github.io/cne80belem/recursos/cancioneiro/${song.slug}` },
    ],
  };

  // How the song reads: chords on/off, key, naming and text size, in one bar above the lyrics
  // (sticky under the header on desktop). Actions (PDF, songbook) stay in their own row.
  const tomGroup = (
    <div className={styles.transposeGroup}>
      <span className={styles.transposeLabel}>Tom:</span>
      <button
        className={styles.transposeBtn}
        onClick={() => setSemitones((s) => (s - 1) % 12)}
        aria-label="Descer meio tom"
      >
        <FaMinus size={10} aria-hidden="true" />
      </button>
      <span className={styles.transposeKey}>{displayKey}</span>
      <button
        className={styles.transposeBtn}
        onClick={() => setSemitones((s) => (s + 1) % 12)}
        aria-label="Subir meio tom"
      >
        <FaPlus size={10} aria-hidden="true" />
      </button>
      {/* Always in the row, hidden in the original key, so transposing never reflows the bar */}
      <button
        className={`${styles.transposeReset} ${semitones === 0 ? styles.transposeResetIdle : ''}`}
        onClick={() => setSemitones(0)}
        title="Voltar ao tom original"
        aria-label={`Voltar ao tom original (${solfege ? chordToSolfege(song.key) : song.key})`}
        aria-hidden={semitones === 0 || undefined}
        tabIndex={semitones === 0 ? -1 : undefined}
      >
        <FaUndo size={9} aria-hidden="true" />
      </button>
    </div>
  );

  // aria-disabled, not disabled, so focus stays put at the smallest or largest size
  const sizeGroup = (
    <div className={styles.sizeGroup} role="group" aria-label="Tamanho da letra">
      <button
        className={styles.sizeBtn}
        onClick={() => changeTextSize(-1)}
        aria-disabled={sizeIdx === 0 || undefined}
        aria-label="Letra mais pequena"
      >
        A<span aria-hidden="true">−</span>
      </button>
      <button
        className={`${styles.sizeBtn} ${styles.sizeBtnUp}`}
        onClick={() => changeTextSize(1)}
        aria-disabled={sizeIdx === TEXT_SIZES.length - 1 || undefined}
        aria-label="Letra maior"
      >
        A<span aria-hidden="true">+</span>
      </button>
    </div>
  );

  const settingsBar = (
    <div className={styles.settings} ref={settingsRef} role="group" aria-label="Como ler a canção">
      <button
        className={`${styles.controlBtn} ${showChords ? styles.controlBtnActive : ''}`}
        onClick={() => setShowChords(!showChords)}
        aria-pressed={showChords}
      >
        <FaGuitar size={14} aria-hidden="true" />
        Acordes
      </button>

      {showChords && (
        <>
          {tomGroup}

          <div className={styles.solfegeToggle}>
            <span className={`${styles.solfegeLabel} ${!solfege ? styles.solfegeLabelActive : ''}`}>C D E</span>
            <button
              className={`${styles.solfegeSwitch} ${solfege ? styles.solfegeSwitchOn : ''}`}
              onClick={() => setSolfege((s) => !s)}
              role="switch"
              aria-checked={solfege}
              aria-label="Acordes em Dó Ré Mi"
            >
              <span className={styles.solfegeThumb} />
            </button>
            <span className={`${styles.solfegeLabel} ${solfege ? styles.solfegeLabelActive : ''}`}>Dó Ré Mi</span>
          </div>
        </>
      )}

      {sizeGroup}
    </div>
  );

  // Phones: once the full bar has scrolled away, a one-row bar with only what changes mid-song
  // (key and text size) slides in under the header. Fixed, so it never moves the lyrics.
  const compactBar = (
    <div
      className={`${styles.compactBar} ${barAway ? styles.compactBarShown : ''}`}
      role="group"
      aria-label="Tom e tamanho da letra"
      aria-hidden={!barAway || undefined}
      inert={!barAway || undefined}
    >
      {showChords && tomGroup}
      {sizeGroup}
    </div>
  );

  return (
    <main className={styles.page}>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbLd} />
      <div className="container">
        <Link to="/recursos/cancioneiro" className={styles.backLink}>
          <FaArrowLeft size={12} aria-hidden="true" /> Cancioneiro
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{song.title}</h1>
          {song.author && <p className={styles.author}>{song.author}</p>}
          {song.capo && <p className={styles.capo}>Capo na {song.capo}ª casa</p>}
        </header>

        {/* Actions */}
        <div className={styles.controls}>
          <button
            className={styles.controlBtn}
            onClick={downloadPdf}
            aria-label={pdfBusy ? 'A preparar o PDF' : 'Descarregar PDF'}
            aria-disabled={pdfBusy || undefined}
          >
            <FaDownload size={12} aria-hidden="true" />
            {pdfBusy ? 'A preparar...' : 'PDF'}
          </button>

          {/* Adds this song to the songbook the Cancioneiro's builder prints */}
          <button
            className={`${styles.controlBtn} ${styles.draftBtn} ${draftSlugs.includes(song.slug) ? styles.controlBtnActive : ''}`}
            onClick={toggleDraft}
            aria-pressed={draftSlugs.includes(song.slug)}
          >
            {draftSlugs.includes(song.slug) ? <FaCheck size={12} aria-hidden="true" /> : <FaBookOpen size={12} aria-hidden="true" />}
            {draftSlugs.includes(song.slug) ? 'No teu cancioneiro' : 'Adicionar ao teu cancioneiro'}
          </button>
          {/* Always there (so adding a song never inserts a line above the lyrics) */}
          <Link to="/recursos/cancioneiro?montar=1" className={styles.draftLink}>
            {draftSlugs.length > 0 ? `Abrir o teu cancioneiro (${draftSlugs.length})` : 'Faz o teu Cancioneiro'}
          </Link>

        </div>
        {settingsBar}
        {compactBar}
        {pdfError && <p className={styles.pdfError} role="alert">{pdfError}</p>}
        <p className={styles.srOnly} aria-live="polite">{draftMessage}</p>

        <div className={styles.layout}>
          {/* Lyrics */}
          <article className={styles.content}>
            <LyricsWithChords
              lyricsWithChords={song.lyricsWithChords}
              showChords={showChords}
              semitones={semitones}
              solfege={solfege}
              scale={TEXT_SIZES[sizeIdx]}
            />

            <p className={styles.reportText}>
              Encontraste um erro na letra ou nos acordes?{' '}
              <button className={styles.reportLink} onClick={() => setShowReport(true)}>
                Reportar erro <FaExclamationCircle size={11} aria-hidden="true" />
              </button>
            </p>

          </article>

          {/* Video sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.videoSticky}>
              {mediaSources.length > 1 && (
                <div className={styles.mediaTabs}>
                  {mediaSources.map((source) => (
                    <button
                      key={source}
                      className={`${styles.mediaTab} ${activeSource === source ? styles.mediaTabActive : ''}`}
                      onClick={() => setSourceOverride(source)}
                      aria-pressed={activeSource === source}
                    >
                      {source === 'youtube' && <FaYoutube aria-hidden="true" />}
                      {source === 'soundcloud' && <FaSoundcloud aria-hidden="true" />}
                      {source === 'tiktok' && <FaTiktok aria-hidden="true" />}
                      {SOURCE_NAMES[source]}
                    </button>
                  ))}
                </div>
              )}

              {activeSource && !playing ? (
                <MediaFacade source={activeSource} song={song} onPlay={startPlayer} />
              ) : activeSource === 'youtube' ? (
                <div className={styles.videoWrapper}>
                  <iframe
                    ref={playerRef}
                    src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1`}
                    title={song.title}
                    className={styles.video}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : activeSource === 'soundcloud' ? (
                <div className={styles.soundcloudWrapper}>
                  <iframe
                    ref={playerRef}
                    title={song.title}
                    className={styles.soundcloud}
                    scrolling="no"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(song.soundcloudUrl)}&color=%23129648&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                  />
                </div>
              ) : activeSource === 'tiktok' ? (
                <div className={styles.tiktokWrapper}>
                  <iframe
                    ref={playerRef}
                    src={`https://www.tiktok.com/player/v1/${song.tiktokUrl.match(/video\/(\d+)/)?.[1]}`}
                    title={song.title}
                    className={styles.tiktok}
                    scrolling="no"
                    allow="encrypted-media"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className={styles.videoEmpty}>
                  <FaMusic size={32} aria-hidden="true" />
                  <p>Ainda não há gravação desta canção.</p>
                </div>
              )}

              {song.tags?.length > 0 && (
                <div className={styles.tags}>
                  {/* Each tag opens the Cancioneiro filtered by it */}
                  {song.tags.filter((t) => tagLabels.has(t)).map((t) => (
                    <Link
                      key={t}
                      to={`/recursos/cancioneiro?tags=${encodeURIComponent(t)}`}
                      className={styles.tag}
                      aria-label={`Mais canções de ${tagLabels.get(t)}`}
                    >
                      {tagLabels.get(t)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Prev / Next: its own grid area, so phones can show it after the video */}
          <nav className={styles.nav} aria-label="Canção anterior e seguinte">
            {prev ? (
              <Link to={`/recursos/cancioneiro/${prev.slug}`} className={styles.navLink}>
                <span className={styles.navLabel}>Anterior</span>
                <span className={styles.navTitle}>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/recursos/cancioneiro/${next.slug}`}
                className={`${styles.navLink} ${styles.navLinkNext}`}
              >
                <span className={styles.navLabel}>Seguinte</span>
                <span className={styles.navTitle}>{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </div>
      {showReport && <ReportModal songTitle={song.title} onClose={() => setShowReport(false)} />}
    </main>
  );
}

// A light stand-in for the player: the video's own thumbnail on YouTube, a plain panel for the
// others. One tap loads the real player in its place.
function MediaFacade({ source, song, onPlay }) {
  const Icon = { youtube: FaYoutube, tiktok: FaTiktok, soundcloud: FaSoundcloud }[source];
  const verb = source === 'soundcloud' ? 'Ouvir' : 'Ver';
  return (
    <button
      type="button"
      className={`${styles.facade} ${source === 'youtube' ? '' : styles.facadePlain}`}
      onClick={onPlay}
      aria-label={`${verb} a gravação de «${song.title}» no ${SOURCE_NAMES[source]}`}
    >
      {source === 'youtube' && (
        <img
          src={`https://i.ytimg.com/vi/${song.youtubeId}/hqdefault.jpg`}
          alt=""
          className={styles.facadeImg}
          loading="lazy"
          decoding="async"
        />
      )}
      <span className={styles.facadePlay} aria-hidden="true">
        <FaPlay size={16} />
      </span>
      <span className={styles.facadeLabel} aria-hidden="true">
        <Icon size={12} /> {verb} no {SOURCE_NAMES[source]}
      </span>
    </button>
  );
}

function ReportModal({ songTitle, onClose }) {
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const panelRef = useRef(null);
  useModalDialog(panelRef, onClose);

  async function handleSubmit(e) {
    e.preventDefault();
    // "required" lets a field of spaces through
    if (!description.trim()) {
      setError('Escreve o que está errado antes de enviar.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('https://formspree.io/f/mpqoggqp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `⚠️ Erro reportado: ${songTitle}`,
          musica: songTitle,
          descricao: description,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
      } else {
        setError('Não foi possível enviar o aviso. Tenta outra vez daqui a pouco.');
      }
    } catch {
      setError('Sem ligação à internet. O que escreveste continua aqui; tenta outra vez.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={dialog.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        className={`${dialog.panel} ${dialog.panelScroll} ${styles.reportPanel}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
        tabIndex={-1}
      >
        <div className={styles.reportHeader}>
          <h2 className={styles.reportTitle} id="report-title">
            <FaExclamationCircle size={16} aria-hidden="true" /> Reportar um erro
          </h2>
          <button className={styles.reportClose} onClick={onClose} aria-label="Fechar">
            <FaTimes size={14} aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className={styles.reportSuccess} role="status">
            <p>Obrigado pelo aviso!</p>
            <p className={styles.reportSuccessSub}>
              Vamos rever «{songTitle}» e corrigir o que estiver errado.
            </p>
            <button className={styles.reportDoneBtn} onClick={onClose}>Fechar</button>
          </div>
        ) : (
          <form className={styles.reportForm} onSubmit={handleSubmit}>
            <div className={styles.reportField}>
              <label className={styles.reportLabel} htmlFor="report-cancao">Canção</label>
              <input
                id="report-cancao"
                type="text"
                value={songTitle}
                disabled
                className={styles.reportInput}
              />
            </div>
            <div className={styles.reportField}>
              <label className={styles.reportLabel} htmlFor="report-descricao">O que está errado?</label>
              <textarea
                id="report-descricao"
                required
                maxLength={2000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: na segunda estrofe, o acorde em «caminho» é Am e não Em"
                className={styles.reportTextarea}
                rows={4}
              />
            </div>
            {error && <p className={styles.reportError} role="alert">{error}</p>}
            <button type="submit" className={styles.reportSubmitBtn} disabled={submitting}>
              <FaPaperPlane size={12} aria-hidden="true" />
              {submitting ? 'A enviar...' : 'Enviar aviso'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
