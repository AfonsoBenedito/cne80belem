import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { FaMusic, FaTimes, FaGripVertical, FaPlus, FaCheck, FaDownload } from 'react-icons/fa';
import { cancoes } from '../../config/cancioneiro';
import styles from './SongbookBuilder.module.css';

const sorted = [...cancoes].sort((a, b) => a.title.localeCompare(b.title, 'pt'));

const loadCompilationPdf = () => import('../../utils/generateCompilationPdf');

export default function SongbookBuilder({ onClose }) {
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [layout, setLayout] = useState('vertical');
  const [generating, setGenerating] = useState(false);

  const dragSlug = useRef(null);
  const itemRefs = useRef({});
  const prevRects = useRef({});

  // Capture positions before React re-renders
  function captureRects() {
    const rects = {};
    for (const [slug, el] of Object.entries(itemRefs.current)) {
      if (el) rects[slug] = el.getBoundingClientRect();
    }
    prevRects.current = rects;
  }

  // After render, animate items from old position to new position (FLIP)
  useLayoutEffect(() => {
    const old = prevRects.current;
    if (!Object.keys(old).length) return;

    for (const [slug, el] of Object.entries(itemRefs.current)) {
      if (!el || !old[slug]) continue;
      const newRect = el.getBoundingClientRect();
      const deltaY = old[slug].top - newRect.top;
      if (deltaY === 0) continue;

      el.style.transition = 'none';
      el.style.transform = `translateY(${deltaY}px)`;

      requestAnimationFrame(() => {
        el.style.transition = 'transform 0.15s ease';
        el.style.transform = '';
      });
    }

    prevRects.current = {};
  }, [selected]);

  const setItemRef = useCallback((slug) => (el) => {
    if (el) itemRefs.current[slug] = el;
    else delete itemRefs.current[slug];
  }, []);

  function toggleSong(song) {
    setSelected((prev) => {
      const exists = prev.find((s) => s.slug === song.slug);
      if (exists) return prev.filter((s) => s.slug !== song.slug);
      return [...prev, song];
    });
  }

  function isSelected(slug) {
    return selected.some((s) => s.slug === slug);
  }

  function handleDragStart(e, song) {
    dragSlug.current = song.slug;
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragEnter(targetSlug) {
    if (!dragSlug.current || dragSlug.current === targetSlug) return;
    captureRects();
    setSelected((prev) => {
      const fromIdx = prev.findIndex((s) => s.slug === dragSlug.current);
      const toIdx = prev.findIndex((s) => s.slug === targetSlug);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const items = [...prev];
      const [dragged] = items.splice(fromIdx, 1);
      items.splice(toIdx, 0, dragged);
      return items;
    });
  }

  function handleDragEnd() {
    dragSlug.current = null;
  }

  async function handleGenerate() {
    if (selected.length === 0) return;
    setGenerating(true);
    try {
      const { generateCompilationPdf } = await loadCompilationPdf();
      await generateCompilationPdf({
        songs: selected,
        title: title || 'Cancioneiro',
        description,
        layout,
      });
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            <FaMusic size={16} /> Faz o teu Cancioneiro
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>

        <div className={styles.panelBody}>
          {/* Left: Song picker */}
          <div className={styles.pickerCol}>
            <h3 className={styles.colTitle}>Canções disponíveis</h3>
            <div className={styles.songList}>
              {sorted.map((song) => (
                <button
                  key={song.slug}
                  className={`${styles.songItem} ${isSelected(song.slug) ? styles.songItemSelected : ''}`}
                  onClick={() => toggleSong(song)}
                >
                  <span className={styles.songName}>{song.title}</span>
                  {isSelected(song.slug) ? (
                    <FaCheck size={12} className={styles.songCheck} />
                  ) : (
                    <FaPlus size={12} className={styles.songAdd} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Selected + settings */}
          <div className={styles.builderCol}>
            <div className={styles.settings}>
              <input
                type="text"
                placeholder="Título do cancioneiro"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
              />
              <textarea
                placeholder="Descrição (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
                rows={2}
              />
              <div className={styles.layoutPicker}>
                <span className={styles.layoutLabel}>Formato:</span>
                <button
                  className={`${styles.layoutBtn} ${layout === 'vertical' ? styles.layoutBtnActive : ''}`}
                  onClick={() => setLayout('vertical')}
                >
                  Vertical
                </button>
                <button
                  className={`${styles.layoutBtn} ${layout === 'horizontal' ? styles.layoutBtnActive : ''}`}
                  onClick={() => setLayout('horizontal')}
                >
                  Horizontal
                </button>
                <button
                  className={`${styles.layoutBtn} ${layout === 'booklet' ? styles.layoutBtnActive : ''}`}
                  onClick={() => setLayout('booklet')}
                >
                  Modo Livro
                </button>
              </div>
            </div>

            <h3 className={styles.colTitle}>
              Selecionadas ({selected.length})
            </h3>

            {selected.length === 0 ? (
              <p className={styles.emptyMsg}>
                Seleciona canções da lista à esquerda.
              </p>
            ) : (
              <div className={styles.selectedList}>
                {selected.map((song, idx) => (
                  <div
                    key={song.slug}
                    ref={setItemRef(song.slug)}
                    className={styles.selectedItem}
                    draggable
                    onDragStart={(e) => handleDragStart(e, song)}
                    onDragEnter={() => handleDragEnter(song.slug)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <FaGripVertical size={12} className={styles.grip} />
                    <span className={styles.selectedNum}>{idx + 1}.</span>
                    <span className={styles.selectedName}>{song.title}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => toggleSong(song)}
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              className={styles.generateBtn}
              disabled={selected.length === 0 || generating}
              onClick={handleGenerate}
            >
              <FaDownload size={14} />
              {generating ? 'A gerar...' : 'Descarregar PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
