import { Link } from 'react-router-dom';
import { useSEO } from '../../utils/useSEO';
import styles from './NotFound.module.css';

// Defaults to the site-wide 404; a detail page passes its own wording and the list to return to
export default function NotFound({
  title = 'Página não encontrada',
  description = 'A página que procuras ainda não existe ou foi movida.',
  to = '/',
  linkLabel = 'Voltar à página inicial',
}) {
  useSEO({ title, description, noindex: true });

  return (
    <main className={styles.notFound}>
      <div className="container">
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>
          {description}
        </p>
        <Link to={to} className={styles.backLink}>
          {linkLabel}
        </Link>
      </div>
    </main>
  );
}
