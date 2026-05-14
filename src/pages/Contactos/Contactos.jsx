import { Link } from 'react-router-dom';
import { FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt, FaShareAlt, FaBed } from 'react-icons/fa';
import { address, emails } from '../../config/contacts';
import { socialLinks } from '../../config/socialLinks';
import { useSEO } from '../../utils/useSEO';
import styles from './Contactos.module.css';

export default function Contactos() {
  useSEO({
    title: 'Contactos',
    description: 'Entra em contacto com o Agrupamento 80 — Santa Maria de Belém, CNE. Email, localização e redes sociais.',
  });

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Contactos</h1>
          <p className={styles.subtitle}>
            Entra em contacto connosco ou visita-nos na nossa sede.
          </p>
        </header>

        <div className={styles.grid}>
          {/* Email */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <FaEnvelope size={24} />
            </div>
            <h2 className={styles.cardTitle}>Email</h2>
            {emails.map(({ label, email }) => (
              <a key={email} href={`mailto:${email}`} className={styles.cardLink}>
                {email}
              </a>
            ))}
            <Link to="/recursos/reservar-alojamento" className={styles.accommodationCta}>
              <FaBed size={18} />
              <div>
                <span className={styles.accommodationTitle}>Reservar Alojamento</span>
                <span className={styles.accommodationText}>Solicita a reserva do nosso espaço.</span>
              </div>
            </Link>
          </div>

          {/* Address */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <FaMapMarkerAlt size={24} />
            </div>
            <h2 className={styles.cardTitle}>{address.label}</h2>
            <p className={styles.cardText}>
              {address.lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < address.lines.length - 1 && <br />}
                </span>
              ))}
            </p>
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              Ver no Google Maps <FaExternalLinkAlt size={10} />
            </a>
          </div>

          {/* Social */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <FaShareAlt size={24} />
            </div>
            <h2 className={styles.cardTitle}>Redes Sociais</h2>
            <div className={styles.socialList}>
              {socialLinks.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className={styles.mapWrapper}>
          <iframe
            title="Localização do Agrupamento 80"
            src={address.mapsEmbed}
            className={styles.map}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  );
}
