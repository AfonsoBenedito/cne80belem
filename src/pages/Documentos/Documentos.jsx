import { useState } from 'react';
import { FaFilePdf, FaTimes, FaDownload } from 'react-icons/fa';
import { documentos } from '../../config/documentos';
import styles from './Documentos.module.css';

export default function Documentos() {
  const [activeDoc, setActiveDoc] = useState(null);

  const handleSelect = (doc) => {
    setActiveDoc((prev) => (prev?.name === doc.name ? null : doc));
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

        <div className={styles.layout}>
          {/* Document list */}
          <ul className={styles.list}>
            {documentos.map((doc) => (
              <li key={doc.name}>
                <button
                  className={`${styles.docItem} ${activeDoc?.name === doc.name ? styles.docItemActive : ''}`}
                  onClick={() => handleSelect(doc)}
                >
                  <FaFilePdf className={styles.docIcon} />
                  <div className={styles.docInfo}>
                    <span className={styles.docName}>{doc.name}</span>
                    {doc.date && <span className={styles.docDate}>{doc.date}</span>}
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {/* PDF viewer */}
          <div className={styles.viewer}>
            {activeDoc ? (
              <>
                <div className={styles.viewerHeader}>
                  <h2 className={styles.viewerTitle}>{activeDoc.name}</h2>
                  <div className={styles.viewerActions}>
                    <a
                      href={activeDoc.file}
                      download
                      className={styles.downloadBtn}
                      title="Descarregar"
                    >
                      <FaDownload size={14} />
                      Descarregar
                    </a>
                    <button
                      className={styles.closeBtn}
                      onClick={() => setActiveDoc(null)}
                      title="Fechar"
                    >
                      <FaTimes size={16} />
                    </button>
                  </div>
                </div>
                <iframe
                  src={activeDoc.file}
                  className={styles.pdf}
                  title={activeDoc.name}
                />
              </>
            ) : (
              <div className={styles.viewerEmpty}>
                <FaFilePdf size={48} className={styles.emptyIcon} />
                <p>Seleciona um documento para o visualizar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
