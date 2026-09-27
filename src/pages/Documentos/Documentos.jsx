import { useRef, useState, useSyncExternalStore } from 'react';
import { FaFilePdf, FaTimes, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { useSEO } from '../../utils/useSEO';
import { documentos } from '../../config/documentos';
import styles from './Documentos.module.css';

// The inline viewer is for wide screens with a pointer that can hover. Phones, tablets and
// narrow windows open the PDF in the browser's own viewer instead. (Detecting "has a
// touchscreen" also caught touchscreen laptops, which then never got the viewer.)
// The CSS uses the same query for the layout. A browser that can't show PDFs inline
// (pdfViewerEnabled false, e.g. Chrome set to download them) gets the links too, instead of
// a viewer that stays blank.
const PREVIEW_QUERY = '(min-width: 769px) and (hover: hover)';
const subscribe = (cb) => {
  const mq = window.matchMedia(PREVIEW_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const canPreviewNow = () => window.matchMedia(PREVIEW_QUERY).matches && navigator.pdfViewerEnabled !== false;

// The built files are hashed (regulamento_interno-Bx3k.pdf); a download is named after the document
const fileName = (doc) => `${doc.name}.pdf`;

// "84 KB", "1,3 MB": the one file over a megabyte is worth knowing about on mobile data
const sizeFormat = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 1 });
const fileSize = (bytes) =>
  bytes >= 1024 * 1024
    ? `${sizeFormat.format(bytes / (1024 * 1024))} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export default function Documentos() {
  useSEO({
    title: 'Documentos',
    description: 'Documentos do Agrupamento 80 - regulamento interno, ficha de inscrição, cerimonial e mais.',
  });

  const canPreview = useSyncExternalStore(subscribe, canPreviewNow, () => true);
  const [activeDoc, setActiveDoc] = useState(null);
  const rowRefs = useRef({});

  // The close button goes away with the viewer; focus goes back to the document's row
  // instead of dropping to the top of the page
  const closeViewer = () => {
    const name = activeDoc?.name;
    setActiveDoc(null);
    if (name) rowRefs.current[name]?.focus();
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Documentos</h1>
          <p className={styles.subtitle}>
            Consulta e descarrega os documentos do agrupamento.
          </p>
        </header>

        <div className={`${styles.layout} ${canPreview ? '' : styles.listOnly}`}>
          <ul className={styles.list}>
            {documentos.map((doc) => {
              const open = canPreview && activeDoc?.name === doc.name;
              return (
                <li key={doc.name} className={styles.docRow}>
                  {canPreview ? (
                    <button
                      ref={(el) => { rowRefs.current[doc.name] = el; }}
                      type="button"
                      className={`${styles.docItem} ${open ? styles.docItemActive : ''}`}
                      aria-pressed={open}
                      onClick={() => setActiveDoc(open ? null : doc)}
                    >
                      <FaFilePdf className={styles.docIcon} aria-hidden="true" />
                      <span className={styles.docText}>
                        <span className={styles.docName}>{doc.name}</span>
                        <span className={styles.docMeta}>PDF · {fileSize(doc.bytes)}</span>
                      </span>
                    </button>
                  ) : (
                    // Opens in the browser's PDF viewer; says so, since it leaves the page
                    <a href={doc.file} target="_blank" rel="noopener noreferrer" className={styles.docItem}>
                      <FaFilePdf className={styles.docIcon} aria-hidden="true" />
                      <span className={styles.docText}>
                        <span className={styles.docName}>
                          {/* The icon rides on the last word, so it never wraps onto a line alone */}
                          {doc.name.slice(0, doc.name.lastIndexOf(' ') + 1)}
                          <span className={styles.nowrap}>
                            {doc.name.slice(doc.name.lastIndexOf(' ') + 1)}
                            <FaExternalLinkAlt size={11} className={styles.docOpens} aria-hidden="true" />
                          </span>
                          <span className={styles.srOnly}> (abre numa nova janela)</span>
                        </span>
                        <span className={styles.docMeta}>PDF · {fileSize(doc.bytes)}</span>
                      </span>
                    </a>
                  )}
                  <a
                    href={doc.file}
                    download={fileName(doc)}
                    className={styles.docDownloadBtn}
                    aria-label={`Descarregar ${doc.name} (PDF, ${fileSize(doc.bytes)})`}
                    title="Descarregar"
                  >
                    <FaDownload size={13} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* PDF viewer (wide screens with a hover pointer; hidden elsewhere by the same query) */}
          {canPreview && (
            <div className={styles.viewer}>
              {activeDoc ? (
                <>
                  <div className={styles.viewerHeader}>
                    <h2 className={styles.viewerTitle}>{activeDoc.name}</h2>
                    <div className={styles.viewerActions}>
                      <a href={activeDoc.file} download={fileName(activeDoc)} className={styles.downloadBtn}>
                        <FaDownload size={14} aria-hidden="true" />
                        Descarregar
                        <span className={styles.srOnly}> (PDF, {fileSize(activeDoc.bytes)})</span>
                      </a>
                      <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={closeViewer}
                        aria-label={`Fechar ${activeDoc.name}`}
                        title="Fechar"
                      >
                        <FaTimes size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <iframe src={activeDoc.file} className={styles.pdf} title={activeDoc.name} />
                </>
              ) : (
                <div className={styles.viewerEmpty}>
                  <FaFilePdf size={48} className={styles.emptyIcon} aria-hidden="true" />
                  <p>Seleciona um documento para o visualizar.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
