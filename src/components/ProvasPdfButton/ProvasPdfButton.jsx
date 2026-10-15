import { useEffect, useId, useRef, useState } from 'react';
import { FaDownload, FaChevronDown, FaRedo } from 'react-icons/fa';
import styles from './ProvasPdfButton.module.css';

const loadGenerator = () => import('../../utils/generateProvasPdf');

// The same names and printing steps as the cancioneiro's builder
const FORMATS = [
  { value: 'vertical', name: 'Vertical', tip: 'Folhas A4 ao alto.' },
  { value: 'horizontal', name: 'Horizontal', tip: 'Folhas A4 deitadas, com o texto em duas colunas.' },
  { value: 'booklet', name: 'Livro A5', tip: 'Imprime frente e verso, virando pela margem curta, e dobra as folhas ao meio: fica um livrinho.' },
];

// One prova (with `slug`), or all of the secção's (without), in the format picked from a menu
export default function ProvasPdfButton({ seccao, slug, label, ink }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  // The PDF code itself failed to download: the browser keeps a failed import, so only a reload
  // can try again (as the site's LoadErrorBoundary says)
  const [stale, setStale] = useState(false);
  // Said to screen readers once the file is on its way (nothing changes on screen)
  const [done, setDone] = useState('');
  const [open, setOpen] = useState(false);
  const running = useRef(false);
  const wrapRef = useRef(null);
  const toggleRef = useRef(null);
  const menuId = useId();

  // A press outside closes the menu
  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  async function download(format) {
    if (running.current) return;
    running.current = true;
    setBusy(true);
    setError('');
    setDone('');
    setOpen(false);
    toggleRef.current?.focus();
    try {
      const { generateProvaPdf, generateAllProvasPdf } = await loadGenerator();
      await (slug ? generateProvaPdf(seccao, slug) : generateAllProvasPdf(seccao, format));
      setDone('PDF pronto.');
    } catch (err) {
      // A failed dynamic import (the generator, its fonts) is a TypeError about fetching the module
      const failedImport = /fetch|import|module/i.test(err?.message || '');
      setStale(failedImport);
      setError(failedImport
        ? 'Não foi possível preparar o PDF. A ligação pode ter falhado, ou o site foi atualizado entretanto. Recarregar resolve.'
        : 'Não foi possível preparar o PDF. Tenta outra vez daqui a pouco.');
    } finally {
      running.current = false;
      setBusy(false);
    }
  }

  const content = (
    <>
      <FaDownload size={12} aria-hidden="true" style={{ color: ink }} />
      {busy ? 'A preparar…' : label}
    </>
  );

  return (
    <>
      {slug ? (
        <button type="button" className={styles.button} onClick={() => download()} aria-disabled={busy || undefined} aria-busy={busy || undefined}>
          {content}
        </button>
      ) : (
        <div
          ref={wrapRef}
          className={styles.wrap}
          onKeyDown={(e) => {
            if (e.key !== 'Escape' || !open) return;
            setOpen(false);
            toggleRef.current?.focus();
          }}
          // Tabbing on past the last format closes the menu. Only when focus lands on something
          // else: a press on a format in Safari, which doesn't focus buttons, leaves it nowhere
          onBlur={(e) => {
            if (e.relatedTarget && !wrapRef.current?.contains(e.relatedTarget)) setOpen(false);
          }}
        >
          <button
            ref={toggleRef}
            type="button"
            className={styles.button}
            aria-expanded={open}
            aria-controls={menuId}
            aria-disabled={busy || undefined}
            aria-busy={busy || undefined}
            onClick={() => !busy && setOpen(!open)}
          >
            {content}
            <FaChevronDown size={10} aria-hidden="true" className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
          </button>
          <div id={menuId} className={styles.menu} hidden={!open}>
            <p className={styles.menuTitle}>Formato</p>
            {FORMATS.map((f) => (
              <button key={f.value} type="button" className={styles.option} onClick={() => download(f.value)}>
                <span className={styles.optionName}>{f.name}</span>
                <span className={styles.optionTip}>{f.tip}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className={styles.error} role="alert" hidden={!error}>
        <p className={styles.errorText}>{error}</p>
        {stale && (
          <button type="button" className={styles.reload} onClick={() => window.location.reload()}>
            <FaRedo size={11} aria-hidden="true" /> Recarregar
          </button>
        )}
      </div>
      <span className={styles.srOnly} role="status">{done}</span>
    </>
  );
}
