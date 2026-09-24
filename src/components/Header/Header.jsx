import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navigation } from '../../config/navigation';
import NavDropdown from './NavDropdown';
import logo from '../../assets/images/logos/logo.png';
import styles from './Header.module.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const headerRef = useRef(null);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape' && !e.defaultPrevented) {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    // The panel is a disclosure, not a modal: a tap or focus anywhere outside the header closes it
    const handleOutside = (e) => {
      if (!headerRef.current?.contains(e.target)) setMobileOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('pointerdown', handleOutside);
    document.addEventListener('focusin', handleOutside);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerdown', handleOutside);
      document.removeEventListener('focusin', handleOutside);
    };
  }, [mobileOpen]);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#conteudo" className={styles.skipLink}>Saltar para o conteúdo</a>

        <Link to="/" className={styles.brand} onClick={closeMobile}>
          {/* The name beside it labels the link; alt text would read it twice */}
          <img src={logo} alt="" className={styles.logo} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Agrupamento 80</span>
            <span className={styles.brandSubtitle}>Santa Maria de Belém</span>
          </div>
        </Link>

        <button
          ref={hamburgerRef}
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMobile}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          aria-controls="main-nav"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-nav"
          aria-label="Navegação principal"
          className={`${styles.nav} ${mobileOpen ? styles.navOpen : ''}`}
        >
          <ul className={styles.navList}>
            {navigation.map((item) =>
              item.children || item.groups ? (
                <NavDropdown key={item.path} item={item} onNavigate={closeMobile} />
              ) : (
                <li key={item.path} className={styles.navItem}>
                  <NavLink to={item.path} className={styles.navLink} onClick={closeMobile}>
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
