import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function NavDropdown({ item, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleLinkClick = () => {
    setOpen(false);
    onNavigate();
  };

  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  return (
    <li
      ref={ref}
      className={`${styles.navItem} ${styles.dropdown}`}
      onMouseEnter={() => { if (!isTouchDevice()) setOpen(true); }}
      onMouseLeave={() => { if (!isTouchDevice()) setOpen(false); }}
    >
      <button
        className={styles.navLink}
        onClick={handleToggle}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className={styles.labelFull}>{item.label}</span>
        <span className={styles.labelShort}>{item.shortLabel || item.label}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <ul className={styles.dropdownMenu}>
          {item.children.map((child) => (
            <li key={child.path}>
              <Link
                to={child.path}
                className={styles.dropdownLink}
                onClick={handleLinkClick}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
