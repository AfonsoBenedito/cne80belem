import { useState, useMemo } from 'react';
import { useSEO } from '../../utils/useSEO';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { pt } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaUser, FaSlidersH, FaTimes, FaTh, FaList } from 'react-icons/fa';
import { noticias, sections, authors } from '../../config/noticias';
import styles from './Noticias.module.css';

function getScoutYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  // Scout year starts in October
  const startYear = month >= 9 ? year : year - 1;
  return {
    start: new Date(startYear, 9, 1),     // 1 Oct
    end: new Date(startYear + 1, 8, 30),  // 30 Sep
  };
}

function getScoutTrimester() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  // Oct-Dec, Jan-Mar, Apr-Sep
  if (month >= 9) return { start: new Date(year, 9, 1), end: new Date(year, 11, 31) };
  if (month <= 2) return { start: new Date(year, 0, 1), end: new Date(year, 2, 31) };
  return { start: new Date(year, 3, 1), end: new Date(year, 8, 30) };
}

function getLastMonth() {
  const now = new Date();
  return {
    start: new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
    end: now,
  };
}

const presets = [
  { label: 'Último Mês', getRange: getLastMonth },
  { label: 'Neste Trimestre', getRange: getScoutTrimester },
  { label: 'Neste Ano', getRange: getScoutYear },
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function toDateStr(date) {
  if (!date) return '';
  return date.toISOString().split('T')[0];
}

export default function Noticias({ fixedSection, hideHero }) {
  useSEO({
    title: fixedSection ? `Notícias — ${fixedSection}` : 'Notícias',
    description: fixedSection
      ? `Notícias e atividades da secção de ${fixedSection} do Agrupamento 80.`
      : 'Últimas notícias e atividades do Agrupamento 80 — Santa Maria de Belém, CNE.',
  });

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sectionFilter, setSectionFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState('cards');

  const effectiveSection = fixedSection || sectionFilter;
  const hasFilters = effectiveSection || authorFilter || startDate || endDate;
  const activeCount = [effectiveSection, authorFilter, startDate].filter(Boolean).length;

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const clearFilters = () => {
    setSectionFilter('');
    setAuthorFilter('');
    setStartDate(null);
    setEndDate(null);
  };

  const filtered = useMemo(() => {
    const from = toDateStr(startDate);
    const to = toDateStr(endDate);
    return noticias
      .filter((n) => {
        if (effectiveSection && n.section !== effectiveSection) return false;
        if (authorFilter && n.author !== authorFilter) return false;
        if (from && n.date < from) return false;
        if (to && n.date > to) return false;
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [effectiveSection, authorFilter, startDate, endDate]);

  return (
    <main className={styles.page}>
      {!hideHero && (
        <header className={styles.header}>
          <h1 className={styles.title}>Notícias</h1>
          <p className={styles.subtitle}>
            Acompanha as últimas novidades do Agrupamento 80.
          </p>
        </header>
      )}
      <div className="container">

        {/* Filter toolbar */}
        <div className={styles.toolbar}>
          <button
            className={`${styles.filterToggle} ${filtersOpen ? styles.filterToggleActive : ''}`}
            onClick={() => setFiltersOpen((prev) => !prev)}
          >
            <FaSlidersH size={14} />
            Filtros
            {activeCount > 0 && <span className={styles.filterBadge}>{activeCount}</span>}
          </button>

          {hasFilters && (
            <button className={styles.clearBtn} onClick={clearFilters}>
              <FaTimes size={11} />
              Limpar filtros
            </button>
          )}

          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${view === 'cards' ? styles.viewBtnActive : ''}`}
              onClick={() => setView('cards')}
              title="Ver em grelha"
            >
              <FaTh size={14} />
            </button>
            <button
              className={`${styles.viewBtn} ${view === 'list' ? styles.viewBtnActive : ''}`}
              onClick={() => setView('list')}
              title="Ver em lista"
            >
              <FaList size={14} />
            </button>
          </div>
        </div>

        {/* Filter panel — pushes content down */}
        {filtersOpen && (
          <div className={styles.filterPanel}>
            <div className={styles.filterRow}>
              {!fixedSection && (
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Secção</label>
                  <select
                    value={sectionFilter}
                    onChange={(e) => setSectionFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="">Todas</option>
                    {sections.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Autor</label>
                <select
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="">Todos</option>
                  {authors.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div className={`${styles.filterGroup} ${styles.filterGroupPeriod}`}>
                <label className={styles.filterLabel}>Período</label>
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecionar intervalo"
                  isClearable
                  locale={pt}
                  className={styles.filterSelect}
                  calendarClassName={styles.calendar}
                />
              </div>
            </div>

            <div className={styles.presets}>
              {presets.map(({ label, getRange }) => {
                const range = getRange();
                const isActive =
                  startDate?.getTime() === range.start.getTime() &&
                  endDate?.getTime() === range.end.getTime();
                return (
                  <button
                    key={label}
                    className={`${styles.preset} ${isActive ? styles.presetActive : ''}`}
                    onClick={() => {
                      setStartDate(range.start);
                      setEndDate(range.end);
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className={styles.empty}>Nenhuma notícia encontrada com os filtros selecionados.</p>
        ) : (
          <div className={view === 'cards' ? styles.grid : styles.list}>
            {filtered.map((noticia) => (
              <Link
                key={noticia.slug}
                to={`/agrupamento/noticias/${noticia.slug}`}
                className={view === 'cards' ? styles.card : styles.listCard}
              >
                <div className={view === 'cards' ? styles.cardImage : styles.listImage}>
                  <img src={noticia.cover} alt={noticia.title} />
                  <span className={styles.cardSection}>{noticia.section}</span>
                </div>
                <div className={view === 'cards' ? styles.cardBody : styles.listBody}>
                  <h2 className={styles.cardTitle}>{noticia.title}</h2>
                  <p className={styles.cardExcerpt}>{noticia.excerpt}</p>
                  <div className={styles.cardMeta}>
                    <span><FaUser size={11} /> {noticia.author}</span>
                    <span><FaCalendarAlt size={11} /> {formatDate(noticia.date)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
