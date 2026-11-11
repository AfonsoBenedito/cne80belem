import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useModalDialog } from '../../utils/useModalDialog';
import DayBreakdown from './DayBreakdown';
import dialog from '../../styles/dialog.module.css';
import styles from './ActivityDialog.module.css';

// One activity's breakdown, over the page. Anterior / Seguinte walk through the year
export default function ActivityDialog({ days, index, patrulhas, instant, onClose, onGo }) {
  const panelRef = useRef(null);
  useModalDialog(panelRef, onClose);
  const activity = days[index];

  return (
    <div className={dialog.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        className={`${dialog.panel} ${dialog.panelScroll} ${styles.panel}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="atividade-titulo"
        tabIndex={-1}
      >
        <div className={styles.bar}>
          <button type="button" className={styles.nav} onClick={() => onGo(index - 1)} aria-disabled={index === 0}>
            <FaChevronLeft size={12} aria-hidden="true" /> Anterior
          </button>
          <span className={styles.count}>{index + 1} de {days.length}</span>
          <button type="button" className={styles.nav} onClick={() => onGo(index + 1)} aria-disabled={index === days.length - 1}>
            Seguinte <FaChevronRight size={12} aria-hidden="true" />
          </button>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
            <FaTimes size={16} aria-hidden="true" />
          </button>
        </div>
        <DayBreakdown key={activity.date + activity.name} activity={activity} patrulhas={patrulhas} instant={instant} />
      </div>
    </div>
  );
}
