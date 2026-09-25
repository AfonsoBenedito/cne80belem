import { useState, useRef } from 'react';
import { FaBoxOpen, FaRecycle, FaHandshake } from 'react-icons/fa';
import { categories } from '../../config/bancoDeFardas';
import { seccoes } from '../../config/seccoes';
import { mainEmail } from '../../config/contacts';
import { useSEO } from '../../utils/useSEO';
import { useFlipList } from '../../utils/useFlipList';
import styles from './BancoDeFardas.module.css';

const howItWorks = [
  {
    Icon: FaBoxOpen,
    title: 'Entrega',
    description: 'Entrega a farda ou equipamento que já não utilizas ao teu chefe de secção ou diretamente à direção do agrupamento.',
  },
  {
    Icon: FaRecycle,
    title: 'Triagem',
    description: 'As peças são verificadas, lavadas e organizadas por tipo e tamanho para garantir boas condições de uso.',
  },
  {
    Icon: FaHandshake,
    title: 'Distribuição',
    description: 'As peças são disponibilizadas a quem precisa, de forma gratuita ou por um valor simbólico para manutenção do banco.',
  },
];

// Same form as the news dates ("12 de março de 2026"). UTC so a bare date never slips a day
const formatDate = (iso) =>
  new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));

const totalOf = (item) => item.stock.reduce((sum, s) => sum + s.qty, 0);

// Stock sizes named after a secção (jarreteiras, lenços) map onto that secção's colours and ages
const SECCAO_BY_SIZE = {
  Lobito: seccoes.lobitos,
  Explorador: seccoes.exploradores,
  Pioneiro: seccoes.pioneiros,
  Caminheiro: seccoes.caminheiros,
};
const isSeccaoSize = (size) => size in SECCAO_BY_SIZE || size === 'Dirigente';

// "I Secção - Lobitos" → "Lobitos"; without a secção entry, the size in the plural
const seccaoName = (size) => SECCAO_BY_SIZE[size]?.label.split(' - ').at(-1) ?? `${size}s`;

// What a filter shows, in words: "no tamanho M" or "para Lobitos"
const filterPhrase = (size) => (isSeccaoSize(size) ? `para ${seccaoName(size)}` : `no tamanho ${size}`);
const countArtigos = (n) => `${n} ${n === 1 ? 'artigo' : 'artigos'}`;

const joinNames = (names) =>
  names.length > 1 ? `${names.slice(0, -1).join(', ')} e ${names.at(-1)}` : names[0];

function StockCard({ name, image, stock, categoryEmpty }) {
  const totalQty = stock.reduce((sum, s) => sum + s.qty, 0);
  const inStock = stock.filter((s) => s.qty > 0);
  // A lone "Unidade"/"Conjunto" says nothing about size, so it isn't listed
  const sizeRange = stock.length > 1 ? stock.map((s) => s.size).join(' · ') : null;

  return (
    <div className={`${styles.card} ${totalQty > 0 ? '' : styles.cardEmpty}`} data-flip-key={name}>
      <div className={styles.cardImage}>
        {image ? (
          // The item name follows as the card's heading; an alt repeating it would be read twice
          <img src={image} alt="" loading="lazy" decoding="async" />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className={styles.cardPlaceholder} aria-hidden="true">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1zm-4.44-6.19l-2.35 3.02-1.96-1.71a.5.5 0 00-.72.04l-1.68 2.04c-.2.25-.02.6.29.6h9.72c.31 0 .49-.35.29-.6l-3.02-3.78a.5.5 0 00-.57-.11z" fill="currentColor"/>
          </svg>
        )}
      </div>
      <div>
        <h3 className={styles.cardName}>{name}</h3>
        {/* The size chips already say "available", so only an empty item gets a word, and not
            when the whole category is empty: the notice above says it once for all of them */}
        {totalQty === 0 && !categoryEmpty && <p className={styles.outOfStock}>Sem stock</p>}
        {/* Only sizes on the shelf are listed; an empty item says which sizes it comes in instead of a column of zeros */}
        {totalQty > 0 ? (
          <ul className={styles.stockList}>
            {inStock.map(({ size, qty }) => (
              <li key={size} className={styles.stockChip}>
                {/* Read as "M: 2 unidades", not "M, 2" */}
                <span className={styles.srOnly}>{size}: {qty} {qty === 1 ? 'unidade' : 'unidades'}</span>
                <span aria-hidden="true">{size}</span>
                <span className={styles.stockQty} aria-hidden="true">×{qty}</span>
              </li>
            ))}
          </ul>
        ) : (
          sizeRange && <p className={styles.sizeRange}><span className={styles.srOnly}>Tamanhos: </span>{sizeRange}</p>
        )}
      </div>
    </div>
  );
}

export default function BancoDeFardas() {
  useSEO({
    title: 'Banco de Fardas',
    description: 'Banco de fardas e equipamento escutista do Agrupamento 80. Entrega e recebe fardas em segunda mão.',
  });

  const [activeTab, setActiveTab] = useState(categories[0].key);
  const activeCategory = categories.find((c) => c.key === activeTab);
  const [sizeFilter, setSizeFilter] = useState(null);
  const [announcement, setAnnouncement] = useState('');

  const { items } = activeCategory;
  const availableCount = items.filter((item) => totalOf(item) > 0).length;
  const qtyOfSize = (size) =>
    items.reduce((sum, item) => sum + (item.stock.find((s) => s.size === size)?.qty ?? 0), 0);

  // Every size the category uses, in the order the data lists them
  const allSizes = [...new Set(items.flatMap((item) => item.stock.map((s) => s.size)))];
  const seccaoSizes = allSizes.filter(isSeccaoSize);
  const seccaoPieces = items.filter((item) => item.stock.some((s) => isSeccaoSize(s.size))).map((i) => i.name);
  // Size chips only offer what is on the shelf, so a chip never leads to an empty grid.
  // A lone "Unidade"/"Conjunto" isn't a size to choose, so only items with a range count.
  const sizeChips = allSizes.filter((size) =>
    !isSeccaoSize(size) &&
    qtyOfSize(size) > 0 &&
    items.some((item) => item.stock.length > 1 && item.stock.some((s) => s.size === size)));

  // Items with stock first; sort is stable, so each group keeps the data's order
  const shown = (sizeFilter
    ? items.filter((item) => item.stock.some((s) => s.size === sizeFilter && s.qty > 0))
    : [...items]
  ).sort((a, b) => (totalOf(b) > 0) - (totalOf(a) > 0));

  // A filter or category change slides the cards that stay and fades in the ones that arrive
  const gridRef = useRef(null);
  useFlipList(gridRef, `${activeTab}|${sizeFilter}`);

  const chooseCategory = (cat) => {
    setActiveTab(cat.key);
    setSizeFilter(null);
    const available = cat.items.filter((item) => totalOf(item) > 0).length;
    setAnnouncement(`${cat.label}: ${available} de ${cat.items.length} artigos disponíveis`);
  };

  const chooseSize = (size) => {
    const next = size === sizeFilter ? null : size;
    setSizeFilter(next);
    const count = next
      ? items.filter((item) => item.stock.some((s) => s.size === next && s.qty > 0)).length
      : items.length;
    setAnnouncement(next ? `${countArtigos(count)} ${filterPhrase(next)}` : `Todos os artigos: ${count}`);
  };

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Banco de Fardas</h1>
          <p className={styles.heroText}>
            O Banco de Fardas do Agrupamento 80 é uma iniciativa solidária que permite a reutilização
            de uniformes e equipamentos escutistas. Se o teu educando cresceu e a farda já não serve,
            entrega-a para que outro escuteiro possa usá-la.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.howSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Como funciona?</h2>
          <div className={styles.steps}>
            {howItWorks.map(({ Icon, title, description }, i) => (
              <div key={title} className={styles.step}>
                <div className={styles.stepIcon}>
                  <Icon size={28} aria-hidden="true" />
                  <span className={styles.stepNumber} aria-hidden="true">{i + 1}</span>
                </div>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepText}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inventory */}
      <section className={styles.inventorySection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Inventário</h2>

          <div className={styles.toggleWrapper}>
            <div
              className={styles.toggle}
              data-active={activeTab === categories[0].key ? 'left' : 'right'}
              role="group"
              aria-label="Categoria do inventário"
            >
              <div className={styles.toggleSlider} />
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`${styles.toggleOption} ${activeTab === cat.key ? styles.toggleActive : ''}`}
                  onClick={() => chooseCategory(cat)}
                  aria-pressed={activeTab === cat.key}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <p className={styles.srOnly} aria-live="polite">{announcement}</p>

          <p className={styles.updated}>
            Última atualização a{' '}
            <strong><time dateTime={activeCategory.lastUpdated}>{formatDate(activeCategory.lastUpdated)}</time></strong>
          </p>

          {seccaoSizes.length > 0 && (
            <div className={styles.seccaoBlock}>
              <h3 className={styles.filterTitle}>Por secção</h3>
              <p className={styles.filterNote}>{joinNames(seccaoPieces.map((n, i) => (i ? n.toLowerCase() : n)))} são diferentes em cada secção.</p>
              <ul className={styles.seccaoList} aria-label="Filtrar por secção">
                {seccaoSizes.map((size) => {
                  const seccao = SECCAO_BY_SIZE[size];
                  const name = seccaoName(size);
                  const qty = qtyOfSize(size);
                  const content = (
                    <>
                      {qty > 0 && <span className={styles.srOnly}>Mostrar peças de </span>}
                      <span className={styles.seccaoName}>{name}</span>
                      {seccao && <span className={styles.seccaoAges}>{seccao.ageMin} a {seccao.ageMax} anos</span>}
                      {qty > 0 && <span className={styles.seccaoQty}>{qty} {qty === 1 ? 'peça' : 'peças'}</span>}
                    </>
                  );
                  return (
                    <li key={size} style={{ '--seccao-color': seccao?.color ?? 'var(--color-gray-300)' }}>
                      {/* A secção with pieces filters the inventory to them; one without has nothing to show */}
                      {qty > 0 ? (
                        <button
                          type="button"
                          className={`${styles.seccaoTile} ${styles.seccaoTileAction}`}
                          aria-pressed={sizeFilter === size}
                          data-filter={size}
                          onClick={() => chooseSize(size)}
                        >
                          {content}
                        </button>
                      ) : (
                        <div className={styles.seccaoTile}>{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {sizeChips.length > 0 && (
            <div className={styles.sizeBlock}>
              <h3 className={styles.filterTitle}>Por tamanho</h3>
              <div className={styles.sizeChips} role="group" aria-label="Filtrar por tamanho">
                <button
                  type="button"
                  className={styles.sizeChip}
                  aria-pressed={!sizeFilter}
                  onClick={() => chooseSize(null)}
                >
                  Todos
                </button>
                {sizeChips.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={styles.sizeChip}
                    aria-pressed={sizeFilter === size}
                    data-filter={size}
                    onClick={() => chooseSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {availableCount === 0 && (
            <div className={styles.emptyNotice}>
              <p className={styles.emptyTitle}>De momento não há peças disponíveis nesta categoria.</p>
              <p className={styles.emptyText}>
                Tens peças que já não servem? <a href="#contribuir" className={styles.emptyLink}>Entrega-as ao banco</a>.
              </p>
            </div>
          )}

          {sizeFilter && (
            <p className={styles.filterStatus}>
              <span>
                {countArtigos(shown.length)} <strong>{filterPhrase(sizeFilter)}</strong>
              </span>
              <button
                type="button"
                className={styles.clearFilter}
                onClick={() => {
                  // This button goes away with the filter, so focus returns to the control that set it
                  document.querySelector(`[data-filter="${CSS.escape(sizeFilter)}"]`)?.focus();
                  chooseSize(null);
                }}
              >
                Ver todos
              </button>
            </p>
          )}

          <div className={styles.grid} ref={gridRef}>
            {shown.map((item) => (
              <StockCard key={item.name} {...item} categoryEmpty={availableCount === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.cta} id="contribuir">
        <div className="container">
          <h2 className={styles.ctaTitle}>Queres doar peças ou precisas de alguma?</h2>
          <p className={styles.ctaText}>Escreve-nos para <strong className={styles.ctaEmail}>{mainEmail}</strong>.</p>
          <a href={`mailto:${mainEmail}`} className={styles.ctaButton}>
            Enviar email
          </a>
        </div>
      </section>
    </main>
  );
}
