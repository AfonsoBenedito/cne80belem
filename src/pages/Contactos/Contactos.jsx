import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt, FaShareAlt, FaBed, FaChevronRight, FaCampground, FaTshirt } from 'react-icons/fa';
import { address, emails, mainEmail } from '../../config/contacts';
import { socialLinks } from '../../config/socialLinks';
import { useSEO } from '../../utils/useSEO';
import styles from './Contactos.module.css';

// The usual reasons to get in touch, each sent straight to where it's handled. Wording comes
// from the pages they lead to (Home's "Queres fazer parte?", the Banco de Fardas, Reservar Alojamento).
const shortcuts = [
  {
    Icon: FaCampground,
    title: 'Fazer parte',
    text: 'Escreve-nos e vem a uma atividade de sábado.',
    href: `mailto:${mainEmail}?subject=${encodeURIComponent('Inscrição no Agrupamento 80')}`,
  },
  {
    Icon: FaTshirt,
    title: 'Banco de Fardas',
    text: 'Entrega e recebe fardas em segunda mão.',
    to: '/agrupamento/banco-de-fardas',
  },
  {
    Icon: FaBed,
    title: 'Reservar Alojamento',
    text: 'Solicita a reserva do nosso espaço para o teu grupo ou organização.',
    to: '/recursos/reservar-alojamento',
  },
];

export default function Contactos() {
  useSEO({
    title: 'Contactos',
    description: 'Entra em contacto com o Agrupamento 80 - Santa Maria de Belém, CNE. Email, localização e redes sociais.',
  });

  // The map fades in over its grey placeholder once it has loaded, instead of popping in
  const [mapLoaded, setMapLoaded] = useState(false);

  // Focus inside the Google map belongs to its own document, so neither :focus nor :focus-within
  // matches here. The page sees it as the window losing focus with the iframe active, and draws
  // the site's focus ring on the map's frame until focus comes back.
  const mapRef = useRef(null);
  const [mapFocused, setMapFocused] = useState(false);
  useEffect(() => {
    const onBlur = () => setTimeout(() => setMapFocused(document.activeElement === mapRef.current));
    const onFocus = () => setMapFocused(false);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Contactos</h1>
          <p className={styles.subtitle}>
            Entra em contacto connosco ou visita-nos na nossa sede.
          </p>
        </header>

        {/* One panel, three columns: the facts read as reference, the shortcuts below as the actions */}
        <div className={styles.grid}>
          {/* A column whose config list is empty is left out, not shown as a bare heading */}
          {emails.length > 0 && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <FaEnvelope size={15} className={styles.cardTitleIcon} aria-hidden="true" />
              Email
            </h2>
            {/* With a second address, each one needs its label to say who it reaches */}
            {emails.map(({ label, email }) => (
              <p key={email} className={styles.emailItem}>
                {emails.length > 1 && <span className={styles.emailLabel}>{label}</span>}
                <a href={`mailto:${email}`} className={styles.cardLink}>
                  {email}
                </a>
              </p>
            ))}
          </div>
          )}

          {/* Address */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <FaMapMarkerAlt size={15} className={styles.cardTitleIcon} aria-hidden="true" />
              {address.label}
            </h2>
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
              Ver no Google Maps <FaExternalLinkAlt size={10} aria-hidden="true" />
              <span className={styles.srOnly}> (abre numa nova janela)</span>
            </a>
          </div>

          {socialLinks.length > 0 && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <FaShareAlt size={15} className={styles.cardTitleIcon} aria-hidden="true" />
              Redes Sociais
            </h2>
            <div className={styles.socialList}>
              {socialLinks.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                  <span className={styles.srOnly}> (abre numa nova janela)</span>
                </a>
              ))}
            </div>
          </div>
          )}
        </div>

        {/* Each reason to write, sent to where it's handled; booking the space isn't a way of emailing */}
        <ul className={styles.shortcuts} aria-label="Outros pedidos">
          {shortcuts.map(({ Icon, title, text, href, to }) => {
            const body = (
              <>
                <span className={styles.stayIcon} aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span className={styles.stayBody}>
                  <span className={styles.stayTitle}>{title}</span>
                  <span className={styles.stayText}>{text}</span>
                  {/* The envelope says it visually; this says it to a screen reader */}
                  {!to && <span className={styles.srOnly}> (abre o teu email)</span>}
                </span>
                {/* An envelope where the row opens the mail app, an arrow where it opens a page */}
                {to
                  ? <FaChevronRight size={14} className={styles.stayArrow} aria-hidden="true" />
                  : <FaEnvelope size={15} className={styles.stayArrow} aria-hidden="true" />}
              </>
            );
            return (
              <li key={title}>
                {to ? (
                  <Link to={to} className={styles.stay}>{body}</Link>
                ) : (
                  <a href={href} className={styles.stay}>{body}</a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Map */}
        <div className={`${styles.mapWrapper} ${mapFocused ? styles.mapFocused : ''}`}>
          <iframe
            ref={mapRef}
            title="Localização do Agrupamento 80"
            src={address.mapsEmbed}
            className={`${styles.map} ${mapLoaded ? styles.mapLoaded : ''}`}
            onLoad={() => setMapLoaded(true)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  );
}
