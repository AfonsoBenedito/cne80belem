import { useState, useMemo } from 'react';
import { useSEO } from '../../utils/useSEO';
import { Link, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { pt } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaUser, FaSlidersH, FaTimes, FaTh, FaList } from 'react-icons/fa';
import { noticias, sections, authors } from '../../config/noticias';
import { seccaoByName as seccaoOf, seccaoBadgeStyle as badgeStyle } from '../../config/seccoes';
import { srcSetFor } from '../../utils/responsiveImage';
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
  { label: 'Último mês', getRange: getLastMonth },
  { label: 'Neste trimestre', getRange: getScoutTrimester },
  { label: 'Neste ano', getRange: getScoutYear },
];

// Touch screens: the range calendar opens as a centred overlay and doesn't raise the keyboard
// (it used to be hidden on touch altogether, leaving only the presets)
const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
const touchPicker = isTouch ? { withPortal: true, customInput: <input inputMode="none" /> } : {};

function formatDate(dateStr) {
  // "2026-03-28" is read as UTC midnight: format it in UTC so it's the same day everywhere
  return new Date(dateStr).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// Local calendar date as YYYY-MM-DD. (toISOString() converts to UTC first, so in Portugal local
// midnight became the previous day for part of the year and the period filter was a day off.)
function toDateStr(date) {
  if (!date) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export default function Noticias({ fixedSection, hideHero }) {
  useSEO({
    title: fixedSection ? `Notícias - ${fixedSection}` : 'Notícias',
    description: fixedSection
      ? `Notícias e atividades da secção de ${fixedSection} do Agrupamento 80.`
      : 'Últimas notícias e atividades do Agrupamento 80 - Santa Maria de Belém, CNE.',
  });

  const [filtersOpen, setFiltersOpen] = useState(false);
  // Secção and view live in the URL (?seccao=Lobitos&vista=lista), as the Cancioneiro's search
  // does: a filtered list survives opening a story and pressing Back, and can be shared
  const [params, setParams] = useSearchParams();
  const sectionParam = params.get('seccao');
  const sectionFilter = sections.includes(sectionParam) ? sectionParam : '';
  const view = params.get('vista') === 'lista' ? 'list' : 'cards';
  const setParam = (key, value) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value); else next.delete(key);
      return next;
    }, { replace: true });
  };
  const setSectionFilter = (value) => setParam('seccao', value);
  const setView = (value) => setParam('vista', value === 'list' ? 'lista' : '');
  const [authorFilter, setAuthorFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const effectiveSection = fixedSection || sectionFilter;
  // A secção page's own secção is fixed, not a filter the visitor set
  const hasFilters = sectionFilter || authorFilter || startDate || endDate;
  // The secção is chosen with the chips in view; the panel only holds author and period
  const panelCount = [authorFilter, startDate].filter(Boolean).length;

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

        {/* One line of controls where it fits: secção chips, then the rarer filters, the count
            and the view switch. It wraps on narrower screens; phones scroll the chips instead. */}
        <div className={styles.toolbar}>
          {/* Secção first, one tap away and in each secção's colours; author and period are rarer,
              so they sit behind "Mais filtros" */}
          {!fixedSection && (
            <div className={styles.sectionChips} role="group" aria-label="Filtrar por secção">
              <button
                type="button"
                className={styles.sectionChip}
                aria-pressed={!sectionFilter}
                onClick={() => setSectionFilter('')}
              >
                Todas
              </button>
              {sections.map((s) => {
                const on = sectionFilter === s;
                return (
                  <button
                    key={s}
                    type="button"
                    className={styles.sectionChip}
                    aria-pressed={on}
                    style={on ? badgeStyle(s) : undefined}
                    onClick={() => setSectionFilter(on ? '' : s)}
                  >
                    <span
                      className={styles.chipDot}
                      style={{ background: seccaoOf(s)?.color ?? 'var(--color-green)' }}
                      aria-hidden="true"
                    />
                    {s}
                  </button>
                );
              })}
            </div>
          )}

          {/* Kept together: when the line runs out, these wrap as one group, never the switch alone */}
          <div className={styles.toolbarActions}>
          <button
            type="button"
            className={`${styles.filterToggle} ${filtersOpen ? styles.filterToggleActive : ''}`}
            onClick={() => setFiltersOpen((prev) => !prev)}
            aria-expanded={filtersOpen}
            aria-controls="noticias-filtros"
          >
            <FaSlidersH size={14} aria-hidden="true" />
            Mais filtros
            {panelCount > 0 && (
              <span className={styles.filterBadge}>
                {panelCount}
                <span className={styles.srOnly}> {panelCount === 1 ? 'ativo' : 'ativos'}</span>
              </span>
            )}
          </button>

          {hasFilters && (
            <button type="button" className={styles.clearBtn} onClick={clearFilters}>
              <FaTimes size={11} aria-hidden="true" />
              {/* On the narrowest phones only the ✕ shows; the words stay for screen readers */}
              <span className={styles.clearLabel}>Limpar filtros</span>
            </button>
          )}

          {/* On the toolbar's line, not a row of its own: one less band of chrome before the news */}
          <p className={styles.resultCount} aria-live="polite">
            {filtered.length === 1 ? '1 notícia' : `${filtered.length} notícias`}
          </p>

          <div className={styles.viewToggle} role="group" aria-label="Vista">
            <button
              type="button"
              className={`${styles.viewBtn} ${view === 'cards' ? styles.viewBtnActive : ''}`}
              onClick={() => setView('cards')}
              aria-label="Ver em grelha"
              aria-pressed={view === 'cards'}
              title="Ver em grelha"
            >
              <FaTh size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.viewBtn} ${view === 'list' ? styles.viewBtnActive : ''}`}
              onClick={() => setView('list')}
              aria-label="Ver em lista"
              aria-pressed={view === 'list'}
              title="Ver em lista"
            >
              <FaList size={14} aria-hidden="true" />
            </button>
          </div>
          </div>
        </div>

        {/* Filter panel - pushes content down */}
        {filtersOpen && (
          <div className={styles.filterPanel} id="noticias-filtros">
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} htmlFor="filtro-autor">Autor</label>
                <select
                  id="filtro-autor"
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
                <label className={styles.filterLabel} htmlFor="filtro-periodo">Período</label>
                <DatePicker
                  id="filtro-periodo"
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
                  {...touchPicker}
                />
              </div>
            </div>

            <div className={styles.presets} role="group" aria-label="Períodos rápidos">
              {presets.map(({ label, getRange }) => {
                const range = getRange();
                const isActive =
                  startDate?.getTime() === range.start.getTime() &&
                  endDate?.getTime() === range.end.getTime();
                return (
                  <button
                    key={label}
                    type="button"
                    className={`${styles.preset} ${isActive ? styles.presetActive : ''}`}
                    aria-pressed={isActive}
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
          <div className={styles.empty}>
            <p>Nenhuma notícia encontrada com os filtros selecionados.</p>
            <button type="button" className={styles.emptyBtn} onClick={clearFilters}>
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className={view === 'cards' ? styles.grid : styles.list}>
            {filtered.map((noticia, i) => {
              // The newest story leads, as a wide card, when the grid holds enough to lead
              const lead = view === 'cards' && i === 0 && filtered.length > 2;
              return (
                <Link
                  key={noticia.slug}
                  to={`/agrupamento/noticias/${noticia.slug}`}
                  className={view === 'cards' ? `${styles.card} ${lead ? styles.cardLead : ''}` : styles.listCard}
                >
                  <div className={view === 'cards' ? styles.cardImage : styles.listImage}>
                    <img
                      src={noticia.cover}
                      srcSet={srcSetFor(noticia.cover)}
                      sizes={lead
                        // Full width on phones; from 601px the photo is the lead card's 3fr column (~60%)
                        ? '(max-width: 600px) 100vw, (max-width: 1024px) 60vw, 720px'
                        : '(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 400px'}
                      // The title right after names the story; an alt repeating it is read twice
                      alt=""
                      loading={lead ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  <div className={view === 'cards' ? styles.cardBody : styles.listBody}>
                    <h2 className={styles.cardTitle}>{noticia.title}</h2>
                    {/* After the title in the markup, so the link is read title first; placed over
                        the photo's corner by CSS */}
                    <span className={styles.cardSection} style={badgeStyle(noticia.section)}>
                      {noticia.section}
                    </span>
                    <p className={styles.cardExcerpt}>{noticia.excerpt}</p>
                    <div className={styles.cardMeta}>
                      <span><FaUser size={11} aria-hidden="true" /> {noticia.author}</span>
                      <span><FaCalendarAlt size={11} aria-hidden="true" /> {formatDate(noticia.date)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
