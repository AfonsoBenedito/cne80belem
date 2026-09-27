import styles from './MemberCard.module.css';

// `seccao` (an entry of seccoes.js) names the secção in text, in its colours: the emblem badge
// alone is decorative, so a screen reader (or anyone who doesn't know the emblems) would miss it.
// `phone` opts into a phone layout (≤600px): 'row' puts the photo beside the text, 'tile' is a
// small centred card for a two-column grid. Without it the card keeps its one layout everywhere.
// `compact` is that small tile at every width, for pages that list many people (Dirigentes).
export default function MemberCard({ name, role, birthDate, memberSince, photo, badge, seccao, phone, compact }) {
  return (
    <div className={`${styles.card} ${phone === 'row' ? styles.phoneRow : ''} ${phone === 'tile' ? styles.phoneTile : ''} ${compact ? styles.compact : ''}`}>
      {badge && <img src={badge} alt="" className={styles.badge} loading="lazy" decoding="async" />}
      <div className={styles.avatarWrapper}>
        {photo ? (
          <img src={photo} alt={name} className={styles.avatar} loading="lazy" decoding="async" />
        ) : (
          <div className={styles.avatarPlaceholder}>
            <svg viewBox="0 0 24 24" fill="none" className={styles.avatarIcon} aria-hidden="true">
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
        {/* A role is a title, set as text; only the secção is a pill, where its colour means something */}
        {role && <span className={styles.roleTitle}>{role}</span>}
        {seccao && (
          <span
            className={styles.sectionPill}
            style={{ background: seccao.surface, color: seccao.onSurface }}
          >
            {seccao.label.split(' - ').at(-1)}
          </span>
        )}
        {(birthDate || memberSince) && (
          <div className={styles.details}>
            {/* Label above its value in the centred card, so every card reads the same way whatever
                the date's length; the phone row, with room to spare, sets them on one line */}
            {birthDate && (
              <p className={styles.detail}>
                <span className={styles.detailLabel}>Nascimento</span> <span className={styles.value}>{birthDate}</span>
              </p>
            )}
            {memberSince && (
              <p className={styles.detail}>
                <span className={styles.detailLabel}>No Agrupamento desde</span> <span className={styles.value}>{memberSince}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
