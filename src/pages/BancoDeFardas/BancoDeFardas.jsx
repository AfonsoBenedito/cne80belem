import { useState } from 'react';
import { FaBoxOpen, FaRecycle, FaHandshake } from 'react-icons/fa';
import { categories } from '../../config/bancoDeFardas';
import { mainEmail } from '../../config/contacts';
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
    description: 'As fardas são disponibilizadas a quem precisa, de forma gratuita ou por um valor simbólico para manutenção do banco.',
  },
];

function StockCard({ name, image, stock }) {
  const totalQty = stock.reduce((sum, s) => sum + s.qty, 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className={styles.cardPlaceholder}>
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1zm-4.44-6.19l-2.35 3.02-1.96-1.71a.5.5 0 00-.72.04l-1.68 2.04c-.2.25-.02.6.29.6h9.72c.31 0 .49-.35.29-.6l-3.02-3.78a.5.5 0 00-.57-.11z" fill="currentColor"/>
          </svg>
        )}
      </div>
      <h3 className={styles.cardName}>{name}</h3>
      <span className={`${styles.badge} ${totalQty > 0 ? styles.badgeAvailable : styles.badgeEmpty}`}>
        {totalQty > 0 ? 'Disponível' : 'Sem stock'}
      </span>
      <ul className={styles.stockList}>
        {stock.map(({ size, qty }) => (
          <li key={size} className={styles.stockRow}>
            <span className={styles.stockQty}>{qty}</span>
            <span className={styles.stockDash}>—</span>
            <span className={styles.stockSize}>{size}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BancoDeFardas() {
  const [activeTab, setActiveTab] = useState(categories[0].key);
  const activeCategory = categories.find((c) => c.key === activeTab);

  return (
    <main className={styles.page}>
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
                  <Icon size={28} />
                  <span className={styles.stepNumber}>{i + 1}</span>
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
            <div className={styles.toggle} data-active={activeTab === categories[0].key ? 'left' : 'right'}>
              <div className={styles.toggleSlider} />
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`${styles.toggleOption} ${activeTab === cat.key ? styles.toggleActive : ''}`}
                  onClick={() => setActiveTab(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <p className={styles.updated}>
            Última atualização a <strong>{activeCategory.lastUpdated}</strong>
          </p>

          <div className={styles.grid}>
            {activeCategory.items.map((item) => (
              <StockCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.cta}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Queres contribuir ou precisas de ajuda?</h2>
          <p className={styles.ctaText}>Entra em contacto connosco através do email do agrupamento.</p>
          <a href={`mailto:${mainEmail}`} className={styles.ctaButton}>
            {mainEmail}
          </a>
        </div>
      </section>
    </main>
  );
}
