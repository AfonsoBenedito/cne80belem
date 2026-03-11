import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <div className="container">
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.description}>
          A página que procuras ainda não existe ou foi movida.
        </p>
        <Link to="/" className={styles.backLink}>
          Voltar à página inicial
        </Link>
      </div>
    </main>
  );
}
