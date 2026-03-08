import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navigation } from '../../config/navigation';
import NavDropdown from './NavDropdown';
import logo from '../../assets/images/logos/logo.png';
import styles from './Header.module.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} onClick={closeMobile}>
          <img src={logo} alt="Agrupamento 80 - Santa Maria de Belém" className={styles.logo} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Agrupamento 80</span>
            <span className={styles.brandSubtitle}>Santa Maria de Belém</span>
          </div>
        </Link>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMobile}
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`${styles.nav} ${mobileOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navigation.map((item) =>
              item.children ? (
                <NavDropdown key={item.path} item={item} onNavigate={closeMobile} />
              ) : (
                <li key={item.path} className={styles.navItem}>
                  <Link to={item.path} className={styles.navLink} onClick={closeMobile}>
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
