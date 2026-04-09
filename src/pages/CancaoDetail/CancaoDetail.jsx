import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaMusic, FaGuitar, FaPlus, FaMinus, FaDownload, FaUndo } from 'react-icons/fa';
import { cancoes } from '../../config/cancioneiro';
import { transposeChord, chordToSolfege } from '../../config/chords';
import LyricsWithChords from '../../components/LyricsWithChords/LyricsWithChords';
const loadPdfGenerator = () => import('../../utils/generateSongPdf');
import styles from './CancaoDetail.module.css';

const sortedCancoes = [...cancoes].sort((a, b) => a.title.localeCompare(b.title, 'pt'));

export default function CancaoDetail() {
  const { slug } = useParams();
  const song = sortedCancoes.find((s) => s.slug === slug);

  const [showChords, setShowChords] = useState(true);
  const [semitones, setSemitones] = useState(0);
  const [solfege, setSolfege] = useState(false);

  if (!song) return <Navigate to="/recursos/cancioneiro" replace />;

  const currentIndex = sortedCancoes.findIndex((s) => s.slug === slug);
  const prev = currentIndex > 0 ? sortedCancoes[currentIndex - 1] : null;
  const next = currentIndex < sortedCancoes.length - 1 ? sortedCancoes[currentIndex + 1] : null;

  const currentKey = transposeChord(song.key, semitones);
  const displayKey = solfege ? chordToSolfege(currentKey) : currentKey;

  return (
    <main className={styles.page}>
      <div className="container">
        <Link to="/recursos/cancioneiro" className={styles.backLink}>
          <FaArrowLeft size={12} /> Cancioneiro
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{song.title}</h1>
          {song.author && <p className={styles.author}>{song.author}</p>}
          {song.capo && <p className={styles.capo}>Capo na {song.capo}ª casa</p>}
        </header>

        {/* Chord controls */}
        <div className={styles.controls}>
          <button
            className={`${styles.controlBtn} ${showChords ? styles.controlBtnActive : ''}`}
            onClick={() => setShowChords(!showChords)}
          >
            <FaGuitar size={14} />
            {showChords ? 'Esconder Acordes' : 'Mostrar Acordes'}
          </button>

          <button
            className={styles.controlBtn}
            onClick={async () => {
              const { generateSongPdf } = await loadPdfGenerator();
              generateSongPdf(song, semitones, showChords);
            }}
          >
            <FaDownload size={12} />
            PDF
          </button>

        </div>

        <div className={styles.layout}>
          {/* Lyrics */}
          <article className={styles.content}>
            <LyricsWithChords
              lyricsWithChords={song.lyricsWithChords}
              showChords={showChords}
              semitones={semitones}
              solfege={solfege}
            />

            {/* Prev / Next */}
            <nav className={styles.nav}>
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
          </article>

          {/* Video sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.videoSticky}>
              {song.youtubeId ? (
                <div className={styles.videoWrapper}>
                  <iframe
                    src={`https://www.youtube.com/embed/${song.youtubeId}`}
                    title={song.title}
                    className={styles.video}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : song.soundcloudUrl ? (
                <div className={styles.soundcloudWrapper}>
                  <iframe
                    title={song.title}
                    className={styles.soundcloud}
                    scrolling="no"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(song.soundcloudUrl)}&color=%23129648&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                  />
                </div>
              ) : (
                <div className={styles.videoEmpty}>
                  <FaMusic size={32} />
                  <p>Video em breve</p>
                </div>
              )}

              {showChords && (
                <div className={styles.sidebarControls}>
                  <div className={styles.transposeGroup}>
                    <span className={styles.transposeLabel}>Tom:</span>
                    <button
                      className={styles.transposeBtn}
                      onClick={() => setSemitones((s) => s - 1)}
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className={styles.transposeKey}>{displayKey}</span>
                    <button
                      className={styles.transposeBtn}
                      onClick={() => setSemitones((s) => s + 1)}
                    >
                      <FaPlus size={10} />
                    </button>
                    {semitones !== 0 && (
                      <button
                        className={styles.transposeReset}
                        onClick={() => setSemitones(0)}
                        title="Tom original"
                      >
                        <FaUndo size={9} />
                      </button>
                    )}
                  </div>

                  <div className={styles.sidebarDivider} />

                  <div className={styles.solfegeToggle}>
                    <span className={`${styles.solfegeLabel} ${!solfege ? styles.solfegeLabelActive : ''}`}>C D E</span>
                    <button
                      className={`${styles.solfegeSwitch} ${solfege ? styles.solfegeSwitchOn : ''}`}
                      onClick={() => setSolfege((s) => !s)}
                      aria-label="Alternar notação solfejo"
                    >
                      <span className={styles.solfegeThumb} />
                    </button>
                    <span className={`${styles.solfegeLabel} ${solfege ? styles.solfegeLabelActive : ''}`}>Dó Ré Mi</span>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
