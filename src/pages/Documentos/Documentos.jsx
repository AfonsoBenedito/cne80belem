import { useState } from 'react';
import { FaFilePdf, FaTimes, FaDownload, FaSearch } from 'react-icons/fa';
import { useSEO } from '../../utils/useSEO';
import { documentos } from '../../config/documentos';
import { normalize } from '../../utils/normalize';
import styles from './Documentos.module.css';

export default function Documentos() {
  useSEO({
    title: 'Documentos',
    description: 'Documentos do Agrupamento 80 — regulamento interno, ficha de inscrição, cerimonial e mais.',
  });

  const [activeDoc, setActiveDoc] = useState(null);
  const [search, setSearch] = useState('');

  const handleSelect = (doc) => {
    if (navigator.maxTouchPoints > 0) {
      window.open(doc.file, '_blank', 'noopener,noreferrer');
      return;
    }
    setActiveDoc((prev) => (prev?.name === doc.name ? null : doc));
  };

  const filtered = documentos.filter((doc) =>
    normalize(doc.name).includes(normalize(search))
  );

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
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Pesquisar documento..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Document list */}
            <ul className={styles.list}>
              {filtered.map((doc) => (
              <li key={doc.name} className={styles.docRow}>
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
                <a
                  href={doc.file}
                  download
                  className={styles.docDownloadBtn}
                  title="Descarregar"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaDownload size={13} />
                </a>
              </li>
            ))}
            {filtered.length === 0 && (
              <p className={styles.noResults}>Nenhum documento encontrado.</p>
            )}
          </ul>
          </div>

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
