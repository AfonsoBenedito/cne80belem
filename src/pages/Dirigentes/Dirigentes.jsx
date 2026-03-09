import { dirigentes, sectionBadges } from '../../config/members';
import MemberCard from '../../components/MemberCard/MemberCard';
import styles from './Dirigentes.module.css';

const sections = [
  { key: 'lobitos', label: 'Lobitos' },
  { key: 'exploradores', label: 'Exploradores' },
  { key: 'pioneiros', label: 'Pioneiros' },
  { key: 'caminheiros', label: 'Caminheiros' },
];

export default function Dirigentes() {
  const activeSections = sections.filter(({ key }) =>
    dirigentes.some((m) => m.section === key)
  );

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Dirigentes e Animadores</h1>
          <p className={styles.subtitle}>
            A equipa que acompanha os nossos escuteiros em cada secção.
          </p>
        </header>

        <div className={styles.columns} style={{ '--col-count': activeSections.length }}>
          {activeSections.map(({ key, label }) => {
            const members = dirigentes.filter((m) => m.section === key);
            return (
              <div key={key} className={styles.column}>
                <div className={styles.columnHeader}>
                  <img src={sectionBadges[key]} alt={label} className={styles.columnBadge} />
                  <h2 className={styles.columnTitle}>{label}</h2>
                </div>
                <div className={styles.cards}>
                  {members.map((member) => (
                    <MemberCard key={member.name} {...member} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
