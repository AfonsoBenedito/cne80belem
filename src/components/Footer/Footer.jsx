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
            <h2 className={styles.heading}>Contactos</h2>
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
                <span className={styles.srOnly}>(abre o mapa numa nova janela)</span>
              </a>
            </address>
            <div className={styles.email}>
              {emails.map(({ email }) => (
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
            <h2 className={styles.heading}>Redes Sociais</h2>
            <div className={styles.socials}>
              {socialLinks.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                >
                  <Icon size="1.15em" aria-hidden="true" />
                  {label}
                  <span className={styles.srOnly}>(abre numa nova janela)</span>
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
