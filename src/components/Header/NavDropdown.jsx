import { useState, useRef, useEffect, useId } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { seccoes } from '../../config/seccoes';
import styles from './Header.module.css';

// Only one dropdown is open at a time: opening one closes the last straight away, so a delayed
// close never leaves two panels showing at once
let closeOpenDropdown = null;

export default function NavDropdown({ item, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const toggleRef = useRef(null);
  const closeTimer = useRef(null);
  const menuId = useId();

  // A mouse heading diagonally for the panel's outer columns briefly leaves the trigger; closing
  // on a short delay (cancelled when the pointer comes back) keeps the panel open for it
  const cancelClose = () => clearTimeout(closeTimer.current);
  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;
    const close = () => { cancelClose(); setOpen(false); };
    if (closeOpenDropdown && closeOpenDropdown !== close) closeOpenDropdown();
    closeOpenDropdown = close;
    return () => { if (closeOpenDropdown === close) closeOpenDropdown = null; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // pointerdown covers mouse, touch and pen; iOS skips mousedown on non-clickable targets
    const handlePointerOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerOutside);
    return () => document.removeEventListener('pointerdown', handlePointerOutside);
  }, [open]);

  // The trigger is marked current when the page is one of its own
  const { pathname } = useLocation();
  const childPaths = (item.children ?? item.groups.flatMap((g) => g.children)).map((c) => c.path);
  const holdsCurrent = childPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  const handleToggle = () => setOpen((prev) => !prev);

  // preventDefault tells the header's document-level Escape handler to leave the mobile panel open
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      setOpen(false);
      toggleRef.current?.focus();
    }
  };

  const handleBlur = (e) => {
    if (!ref.current?.contains(e.relatedTarget)) setOpen(false);
  };

  const handleLinkClick = () => {
    setOpen(false);
    onNavigate();
  };

  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  return (
    <li
      ref={ref}
      className={`${styles.navItem} ${styles.dropdown}`}
      onMouseEnter={() => { if (isTouchDevice()) return; cancelClose(); setOpen(true); }}
      onMouseLeave={() => {
        if (isTouchDevice()) return;
        closeTimer.current = setTimeout(() => {
          // Keyboard focus on one of the menu's links keeps it open: closing would unmount that link.
          // Blur or Escape close it instead. A mouse click's focus isn't focus-visible, so it doesn't count.
          const focused = document.activeElement;
          const inPanel = document.getElementById(menuId)?.contains(focused);
          if (!(inPanel && focused.matches(':focus-visible'))) setOpen(false);
        }, 250);
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={toggleRef}
        className={styles.navLink}
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-current={holdsCurrent ? 'true' : undefined}
      >
        {item.label}
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && !item.groups && (
        <ul id={menuId} className={styles.dropdownMenu}>
          {item.children.map((child) => (
            <li key={child.path}>
              <NavLink
                to={child.path}
                end
                className={styles.dropdownLink}
                onClick={handleLinkClick}
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}

      {open && item.groups && (
        <div id={menuId} className={styles.megaMenu}>
          {item.groups.map((group) => (
            <div key={group.key} className={styles.megaGroup}>
              <p className={styles.megaLabel} id={`${menuId}-${group.key}`}>
                <span
                  className={styles.megaDot}
                  style={{ background: seccoes[group.key]?.color }}
                  aria-hidden="true"
                />
                {group.label}
              </p>
              <ul aria-labelledby={`${menuId}-${group.key}`}>
                {group.children.map((child) => (
                  <li key={child.path}>
                    <NavLink
                      to={child.path}
                      end
                      className={styles.dropdownLink}
                      onClick={handleLinkClick}
                    >
                      {child.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}
