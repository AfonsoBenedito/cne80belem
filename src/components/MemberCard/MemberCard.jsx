import styles from './MemberCard.module.css';

export default function MemberCard({ name, role, birthDate, memberSince, photo, badge }) {
  return (
    <div className={styles.card}>{badge && (
        <img src={badge} alt="" className={styles.badge} />
      )}
      <div className={styles.avatarWrapper}>
        {photo ? (
          <img src={photo} alt={name} className={styles.avatar} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            <svg viewBox="0 0 24 24" fill="none" className={styles.avatarIcon}>
              <path
                d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        {role && <span className={styles.role}>{role}</span>}
        {(birthDate || memberSince) && (
          <div className={styles.details}>
            {birthDate && <p><strong>Nascimento:</strong> {birthDate}</p>}
            {memberSince && <p><strong>No Agrupamento desde:</strong> {memberSince}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
