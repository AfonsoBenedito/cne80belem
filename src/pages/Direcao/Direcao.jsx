import { direcao, chefesSecao, sectionBadges } from '../../config/members';
import MemberCard from '../../components/MemberCard/MemberCard';
import { useSEO } from '../../utils/useSEO';
import styles from './Direcao.module.css';

export default function Direcao() {
  useSEO({
    title: 'Direção',
    description: 'Conheça a direção do Agrupamento 80 — Santa Maria de Belém, CNE.',
  });

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Direção</h1>
          <p className={styles.subtitle}>
            Conheça a equipa que lidera o Agrupamento 80 — Santa Maria de Belém.
          </p>
        </header>

        <div className={styles.topRow}>
          {direcao.filter((m) =>
            ['Chefe de Agrupamento', 'Chefe de Agrupamento Adjunto', 'Assistente de Agrupamento'].includes(m.role)
          ).map((member) => (
            <MemberCard key={member.name} {...member} />
          ))}
        </div>
        <div className={styles.bottomRow}>
          {direcao.filter((m) =>
            ['Tesoureiro de Agrupamento', 'Secretário de Agrupamento'].includes(m.role)
          ).map((member) => (
            <MemberCard key={member.name} {...member} />
          ))}
        </div>

        <hr className={styles.divider} />

        <h2 className={styles.sectionTitle}>Chefes de Secção</h2>
        <div className={styles.grid}>
          {chefesSecao.map((member) => (
            <MemberCard key={member.name} {...member} badge={sectionBadges[member.section]} />
          ))}
        </div>
      </div>
    </main>
  );
}
