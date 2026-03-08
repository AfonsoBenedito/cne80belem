import Carousel from '../../components/Carousel/Carousel';
import img01 from '../../assets/images/carousel/01.jpg';
import img02 from '../../assets/images/carousel/02.jpeg';
import img03 from '../../assets/images/carousel/03.jpg';
import img04 from '../../assets/images/carousel/04.jpg';
import img05 from '../../assets/images/carousel/05.jpg';
import styles from './Home.module.css';

const carouselImages = [img01, img02, img03, img04, img05];

export default function Home() {
  return (
    <main className={styles.home}>
      <Carousel images={carouselImages} />

      <section className={styles.welcome}>
        <div className="container">
          <h1 className={styles.title}>Agrupamento 80</h1>
          <h2 className={styles.subtitle}>Santa Maria de Belém</h2>
          <p className={styles.description}>
            Bem-vindos ao site do Agrupamento 80 do Corpo Nacional de Escutas.
            Somos uma comunidade de jovens e adultos unidos pelo escutismo, crescendo juntos em Belém.
          </p>
        </div>
      </section>
    </main>
  );
}
