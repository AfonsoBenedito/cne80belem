import { Link } from 'react-router-dom';
import buildingImg from '../../assets/images/building.png';
import styles from './UnderConstruction.module.css';

export default function UnderConstruction() {
  return (
    <main className={styles.page}>
      <div className="container">
        <img src={buildingImg} alt="Em construção" className={styles.image} />
        <h1 className={styles.title}>Esta página está em construção</h1>
        <p className={styles.description}>
          Estamos a trabalhar nesta página. Volta em breve!
        </p>
        <Link to="/" className={styles.backLink}>
          Voltar à página inicial
        </Link>
      </div>
    </main>
  );
}
