import { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { FaMusic, FaTimes, FaGripVertical, FaPlus, FaCheck, FaDownload, FaImage, FaSearch, FaBookOpen, FaFileAlt, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { cancoes } from '../../config/cancioneiro';
import { tagCategories } from '../../config/tags';
import { useModalDialog } from '../../utils/useModalDialog';
import { useSongbookDraft, updateDraft, toggleSong as toggleDraftSong } from '../../utils/songbookSelection';
import { normalize } from '../../utils/normalize';
import styles from './SongbookBuilder.module.css';
import dialog from '../../styles/dialog.module.css';

const sorted = [...cancoes].sort((a, b) => a.title.localeCompare(b.title, 'pt'));
const bySlug = new Map(cancoes.map((s) => [s.slug, s]));

// "Mostrar" filter for the picker: only tags that some song carries, with their counts, so an
// option never leads to an empty list
const pickerGroups = tagCategories
  .map((cat) => ({
    ...cat,
    tags: cat.tags
      .map((t) => ({ ...t, count: cancoes.filter((s) => s.tags?.includes(t.value)).length }))
      .filter((t) => t.count > 0),
  }))
  .filter((cat) => cat.tags.length > 0);

// What each format prints, shown under the choice
const FORMAT_HINTS = {
  vertical: 'Folhas A4 ao alto, com as canções em duas colunas.',
  horizontal: 'Folhas A4 deitadas, com uma a três colunas conforme o tamanho de cada canção.',
  booklet: 'Um livrinho A5: cada folha A4 deitada leva duas páginas lado a lado, para dobrar ao meio. Como imprimir, dizemos-te quando o PDF estiver pronto.',
};

// How the confirmation names each format, and the one printing step each needs
const FORMAT_DONE = {
  vertical: { name: 'Vertical', tip: 'Imprime em A4, ao alto.' },
  horizontal: { name: 'Horizontal', tip: 'Imprime em A4, com a folha deitada.' },
  booklet: { name: 'Livro A5', tip: 'Imprime frente e verso, virando pela margem curta, e dobra as folhas ao meio: fica um livrinho.' },
};

const loadCompilationPdf = () => import('../../utils/generateCompilationPdf');

// Any image the browser can open becomes a square PNG of at most 512px: the PDF places the cover
// image as a PNG in a square, so a portrait photo would be stretched and a camera file weigh megabytes
function toCoverPng(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      // An SVG without width/height reports 0 × 0
      const w = img.naturalWidth || 512;
      const h = img.naturalHeight || 512;
      const side = Math.min(512, Math.max(w, h));
      const k = side / Math.max(w, h);
      const canvas = document.createElement('canvas');
      canvas.width = side;
      canvas.height = side;
      canvas.getContext('2d').drawImage(img, (side - w * k) / 2, (side - h * k) / 2, w * k, h * k);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('unreadable image'));
    };
    img.src = url;
  });
}

export default function SongbookBuilder({ onClose }) {
  // Chosen songs and settings live in the shared draft: they survive closing the builder and are
  // also filled from the song list and the song pages
  const draft = useSongbookDraft();
  const { title, description, layout, includeChords, solfege } = draft;
  const selected = draft.slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
  const setSelected = (next) => {
    const items = typeof next === 'function' ? next(selected) : next;
    updateDraft({ slugs: items.map((song) => song.slug) });
  };
  const setTitle = (v) => updateDraft({ title: v });
  const setDescription = (v) => updateDraft({ description: v });
  const setLayout = (v) => updateDraft({ layout: v });
  const setIncludeChords = (fn) => updateDraft((d) => ({ includeChords: fn(d.includeChords) }));
  const setSolfege = (fn) => updateDraft((d) => ({ solfege: fn(d.solfege) }));
  const [pickerTag, setPickerTag] = useState('');
  const [generating, setGenerating] = useState(false);
  // Guards double taps within one frame, before the disabled state renders
  const generatingRef = useRef(false);
  const [customLogo, setCustomLogo] = useState(null);
  const [logoError, setLogoError] = useState('');
  const [search, setSearch] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [generateError, setGenerateError] = useState('');
  // The songs a «Retirar todas» took away, so one tap can put them back
  const [cleared, setCleared] = useState(null);
  // What the last PDF was made from. The confirmation stays only while the draft still matches,
  // so it never vouches for a PDF that no longer reflects the songs or settings on screen.
  const [madeFrom, setMadeFrom] = useState(null);
  const doneRef = useRef(null);
  const draftKey = JSON.stringify([draft.slugs, title, description, layout, includeChords, solfege, !!customLogo]);
  const done = madeFrom === draftKey;
  // On phones the builder column scrolls, and the confirmation can land below the fold
  useEffect(() => {
    if (done) doneRef.current?.scrollIntoView({ block: 'nearest' });
  }, [done]);
  const undoRef = useRef(null);
  const panelRef = useRef(null);
  useModalDialog(panelRef, onClose);

  const logoInputRef = useRef(null);
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
  }, [draft.slugs]);

  const setItemRef = useCallback((slug) => (el) => {
    if (el) itemRefs.current[slug] = el;
    else delete itemRefs.current[slug];
  }, []);

  function toggleSong(song) {
    setCleared(null);
    toggleDraftSong(song.slug);
  }

  function clearAll() {
    setCleared(draft.slugs);
    setSelected([]);
    // The button goes with the list; the undo takes its place in the tab order
    requestAnimationFrame(() => undoRef.current?.focus());
  }

  function undoClear() {
    updateDraft({ slugs: cleared });
    setAnnouncement(`${cleared.length} ${cleared.length === 1 ? 'canção reposta' : 'canções repostas'}`);
    setCleared(null);
  }

  function isSelected(slug) {
    return draft.slugs.includes(slug);
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

  // Drag only works with a mouse; these buttons reorder by touch and keyboard too
  function moveSong(idx, dir) {
    const to = idx + dir;
    if (to < 0 || to >= selected.length) return;
    captureRects();
    const items = [...selected];
    const [song] = items.splice(idx, 1);
    items.splice(to, 0, song);
    setSelected(items);
    setAnnouncement(`«${song.title}» na posição ${to + 1} de ${items.length}`);
  }

  async function handleLogoUpload(e) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    try {
      setCustomLogo(await toCoverPng(file));
      setLogoError('');
    } catch {
      setLogoError('Não foi possível abrir esta imagem. Experimenta um PNG ou um JPG.');
    }
    // Picking the same file again after an error still fires a change
    input.value = '';
  }

  async function handleGenerate() {
    if (selected.length === 0 || generatingRef.current) return;
    generatingRef.current = true;
    setGenerating(true);
    setGenerateError('');
    let generateCompilationPdf;
    try {
      ({ generateCompilationPdf } = await loadCompilationPdf());
    } catch {
      // The generator is loaded on demand, so an offline tap fails here
      setGenerateError('Não foi possível carregar o gerador de PDF. Verifica a ligação à internet e tenta outra vez.');
      generatingRef.current = false;
      setGenerating(false);
      return;
    }
    try {
      await generateCompilationPdf({
        songs: selected,
        title: title || 'Cancioneiro',
        description,
        layout,
        includeChords,
        solfege,
        customLogo,
      });
      setMadeFrom(draftKey);
    } catch {
      setGenerateError(customLogo
        ? 'Não foi possível gerar o PDF. Tenta outra vez; se voltar a falhar, retira a imagem da capa.'
        : 'Não foi possível gerar o PDF. Tenta outra vez daqui a pouco.');
    } finally {
      generatingRef.current = false;
      setGenerating(false);
    }
  }

  return (
    <div className={dialog.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        className={`${dialog.panel} ${styles.panel}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="builder-title"
        aria-describedby="builder-lead"
        tabIndex={-1}
      >
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle} id="builder-title">
            <FaMusic size={16} aria-hidden="true" /> Faz o teu Cancioneiro
          </h2>
          <p className={styles.panelLead} id="builder-lead">Escolhe as canções e descarrega-as num PDF pronto a imprimir.</p>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            <FaTimes size={16} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.panelBody}>
          {/* Left: Song picker */}
          <div className={styles.pickerCol}>
            <h3 className={styles.colTitle}>Canções disponíveis</h3>
            <div className={styles.pickerTools}>
            <div className={styles.searchWrapper}>
              <FaSearch size={12} className={styles.searchIcon} aria-hidden="true" />
              <input
                type="search"
                aria-label="Procurar canção pelo título"
                placeholder="Procurar pelo título"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <label className={styles.pickerFilter}>
              <span className={styles.srOnly}>Mostrar</span>
              <select
                value={pickerTag}
                onChange={(e) => setPickerTag(e.target.value)}
                className={styles.pickerSelect}
              >
                <option value="">Todas ({sorted.length})</option>
                {pickerGroups.map((cat) => (
                  <optgroup key={cat.key} label={cat.label}>
                    {cat.tags.map((t) => (
                      <option key={t.value} value={t.value}>{t.label} ({t.count})</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            </div>
            <div className={styles.songListWrapper}>
              <div className={styles.songList}>
                {sorted
                  .filter((song) => normalize(song.title).includes(normalize(search)))
                  .filter((song) => !pickerTag || song.tags?.includes(pickerTag))
                  .map((song) => (
                  <button
                    key={song.slug}
                    className={`${styles.songItem} ${isSelected(song.slug) ? styles.songItemSelected : ''}`}
                    onClick={() => toggleSong(song)}
                    aria-pressed={isSelected(song.slug)}
                  >
                    <span className={styles.songName}>{song.title}</span>
                    {isSelected(song.slug) ? (
                      <FaCheck size={12} className={styles.songCheck} aria-hidden="true" />
                    ) : (
                      <FaPlus size={12} className={styles.songAdd} aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Selected + settings */}
          <div className={styles.builderCol}>
            <div className={styles.settings}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Título da capa</span>
                {/* The placeholder is the real default: an empty title prints as «Cancioneiro» */}
                <input
                  type="text"
                  placeholder="Cancioneiro"
                  maxLength={60}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={styles.input}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Descrição (opcional)</span>
                <textarea
                  placeholder="Aparece na capa, por baixo do título"
                  maxLength={200}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={styles.textarea}
                  rows={2}
                />
              </label>
              <div className={styles.layoutPicker} role="group" aria-labelledby="builder-format">
                <span className={styles.layoutLabel} id="builder-format">Formato:</span>
                <button
                  className={`${styles.layoutBtn} ${layout === 'vertical' ? styles.layoutBtnActive : ''}`}
                  onClick={() => setLayout('vertical')}
                  aria-pressed={layout === 'vertical'}
                >
                  <FaFileAlt size={11} aria-hidden="true" />
                  Vertical
                </button>
                <button
                  className={`${styles.layoutBtn} ${layout === 'horizontal' ? styles.layoutBtnActive : ''}`}
                  onClick={() => setLayout('horizontal')}
                  aria-pressed={layout === 'horizontal'}
                >
                  <FaFileAlt size={11} style={{ transform: 'rotate(-90deg)' }} aria-hidden="true" />
                  Horizontal
                </button>
                <button
                  className={`${styles.layoutBtn} ${layout === 'booklet' ? styles.layoutBtnActive : ''}`}
                  onClick={() => setLayout('booklet')}
                  aria-pressed={layout === 'booklet'}
                >
                  <FaBookOpen size={11} aria-hidden="true" />
                  Livro
                </button>
              </div>
              <p className={styles.formatHint} aria-live="polite">{FORMAT_HINTS[layout]}</p>
              <div className={styles.optionsRow}>
                <div className={styles.logoUpload}>
                  <span className={styles.layoutLabel}>Capa:</span>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className={styles.hiddenInput}
                  />
                  <button
                    className={`${styles.layoutBtn} ${customLogo ? styles.layoutBtnActive : ''}`}
                    onClick={() => logoInputRef.current?.click()}
                  >
                    <FaImage size={11} aria-hidden="true" />
                    {customLogo ? 'Trocar imagem' : 'Trocar o logótipo'}
                  </button>
                  {customLogo && (
                    <>
                      <img src={customLogo} alt="Imagem escolhida para a capa" className={styles.logoPreview} />
                      <button
                        className={styles.removeLogoBtn}
                        onClick={() => { setCustomLogo(null); if (logoInputRef.current) logoInputRef.current.value = ''; }}
                        aria-label="Voltar ao logótipo do Agrupamento"
                      >
                        <FaTimes size={10} aria-hidden="true" />
                      </button>
                    </>
                  )}
                </div>
                {logoError && <p className={styles.logoError} role="alert">{logoError}</p>}
                <div className={styles.switchGroup}>
                  <div className={styles.switchRow}>
                    <span className={styles.switchLabel}>Acordes</span>
                    <button
                      className={`${styles.switch} ${includeChords ? styles.switchOn : ''}`}
                      onClick={() => setIncludeChords((v) => !v)}
                      role="switch"
                      aria-checked={includeChords}
                      aria-label="Incluir acordes"
                    >
                      <span className={styles.switchThumb} />
                    </button>
                  </div>
                  {/* A choice between two namings, not an on/off: two buttons, like the formats */}
                  {includeChords && (
                    <div className={styles.switchRow} role="group" aria-label="Nomes dos acordes">
                      <button
                        className={`${styles.layoutBtn} ${!solfege ? styles.layoutBtnActive : ''}`}
                        onClick={() => setSolfege(() => false)}
                        aria-pressed={!solfege}
                      >
                        C D E
                      </button>
                      <button
                        className={`${styles.layoutBtn} ${solfege ? styles.layoutBtnActive : ''}`}
                        onClick={() => setSolfege(() => true)}
                        aria-pressed={solfege}
                      >
                        Dó Ré Mi
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.selectedHeader}>
              <h3 className={styles.colTitle}>
                No teu cancioneiro ({selected.length})
              </h3>
              {selected.length > 0 && (
                <button className={styles.clearBtn} onClick={clearAll}>
                  Retirar todas
                </button>
              )}
            </div>

            {selected.length === 0 && cleared?.length > 0 ? (
              <p className={styles.emptyMsg} role="status">
                {cleared.length === 1 ? 'Retiraste 1 canção.' : `Retiraste ${cleared.length} canções.`}{' '}
                <button ref={undoRef} className={styles.undoBtn} onClick={undoClear}>Repor</button>
              </p>
            ) : selected.length === 0 ? (
              <p className={styles.emptyMsg}>
                Escolhe canções na lista, ou adiciona-as enquanto percorres o cancioneiro com o botão «+». Ficam guardadas aqui mesmo que feches esta janela.
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
                    <FaGripVertical size={12} className={styles.grip} aria-hidden="true" />
                    <span className={styles.selectedNum}>{idx + 1}.</span>
                    <span className={styles.selectedName}>{song.title}</span>
                    {/* aria-disabled, not disabled: a disabled button would drop focus as its song reaches the end */}
                    <button
                      className={styles.removeBtn}
                      onClick={() => moveSong(idx, -1)}
                      aria-disabled={idx === 0 || undefined}
                      aria-label={`Subir «${song.title}»`}
                    >
                      <FaChevronUp size={10} aria-hidden="true" />
                    </button>
                    <button
                      className={styles.removeBtn}
                      onClick={() => moveSong(idx, 1)}
                      aria-disabled={idx === selected.length - 1 || undefined}
                      aria-label={`Descer «${song.title}»`}
                    >
                      <FaChevronDown size={10} aria-hidden="true" />
                    </button>
                    <button
                      className={styles.removeBtn}
                      onClick={() => toggleSong(song)}
                      aria-label={`Remover «${song.title}»`}
                    >
                      <FaTimes size={10} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className={styles.srOnly} aria-live="polite">{announcement}</p>

            {done && (
              <div className={styles.done} role="status" ref={doneRef}>
                <FaCheck size={14} className={styles.doneIcon} aria-hidden="true" />
                <div>
                  <p className={styles.doneTitle}>«{title.trim() || 'Cancioneiro'}» está pronto</p>
                  <p className={styles.doneMeta}>
                    {selected.length} {selected.length === 1 ? 'canção' : 'canções'} · {FORMAT_DONE[layout].name}
                    {includeChords ? ` · acordes em ${solfege ? 'Dó Ré Mi' : 'C D E'}` : ' · só letras'}
                  </p>
                  <p className={styles.doneTip}>{FORMAT_DONE[layout].tip}</p>
                </div>
              </div>
            )}

            {generateError && (
              <p className={styles.generateError} role="alert">{generateError}</p>
            )}

            <button
              className={styles.generateBtn}
              disabled={selected.length === 0 || generating}
              onClick={handleGenerate}
            >
              <FaDownload size={14} aria-hidden="true" />
              {generating ? 'A preparar o PDF...' : done ? 'Descarregar outra vez' : 'Descarregar PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
