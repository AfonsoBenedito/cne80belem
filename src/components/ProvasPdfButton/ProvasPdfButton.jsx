import { useEffect, useId, useRef, useState } from 'react';
import { FaDownload, FaChevronDown } from 'react-icons/fa';
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
    setOpen(false);
    toggleRef.current?.focus();
    try {
      const { generateProvaPdf, generateAllProvasPdf } = await loadGenerator();
      await (slug ? generateProvaPdf(seccao, slug) : generateAllProvasPdf(seccao, format));
    } catch (err) {
      // A failed dynamic import is a TypeError about fetching the module
      setError(/fetch|import|module/i.test(err?.message || '')
        ? 'Não foi possível preparar o PDF. Verifica a ligação à internet e tenta outra vez.'
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
        <button type="button" className={styles.button} onClick={() => download()} aria-disabled={busy || undefined}>
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
        >
          <button
            ref={toggleRef}
            type="button"
            className={styles.button}
            aria-expanded={open}
            aria-controls={menuId}
            aria-disabled={busy || undefined}
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
      <p className={styles.error} role="alert" hidden={!error}>{error}</p>
    </>
  );
}
