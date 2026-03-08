import { socialLinks } from '../../config/socialLinks';
import { address, emails } from '../../config/contacts';
import NewsletterForm from './NewsletterForm';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.columns}>
          {/* Contacts */}
          <div className={styles.col}>
            <h4 className={styles.heading}>Contactos</h4>
            <address className={styles.address}>
              <strong>Morada:</strong>
              <a
                href={address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.addressLink}
              >
                {address.lines.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </a>
            </address>
            <div className={styles.email}>
              {emails.map(({ label, email }) => (
                <a key={email} href={`mailto:${email}`}>
                  {email}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className={styles.colCentered}>
            <NewsletterForm />
          </div>

          {/* Social */}
          <div className={styles.colEnd}>
            <h4 className={styles.heading}>Redes Sociais</h4>
            <div className={styles.socials}>
              {socialLinks.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Agrupamento 80 - Santa Maria de Belém. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
