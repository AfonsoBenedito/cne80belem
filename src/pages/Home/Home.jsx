import { useState, useEffect, useRef } from 'react';
import { useSEO } from '../../utils/useSEO';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Carousel from '../../components/Carousel/Carousel';
import AgeLadder from '../../components/AgeLadder/AgeLadder';
import CancioneiroBand from '../../components/CancioneiroBand/CancioneiroBand';
import { srcSetFor } from '../../utils/responsiveImage';
import { prefetchLikelyRoutes } from '../../utils/prefetchRoutes';
import { noticias } from '../../config/noticias';
import { documentos } from '../../config/documentos';
import img01 from '../../assets/images/carousel/01.jpg';
import img02 from '../../assets/images/carousel/02.jpeg';
import img03 from '../../assets/images/carousel/03.jpg';
import img04 from '../../assets/images/carousel/04.jpg';
import img05 from '../../assets/images/carousel/05.jpg';
import acagrupCover from '../../assets/images/noticias/acagrup-2026/cover.jpg';
import joinPhoto from '../../assets/images/sections/exploradores-group.png';
import styles from './Home.module.css';

const fichaInscricao = documentos.find((d) => d.name === 'Ficha de Inscrição')?.file;

const carouselImages = [img01, acagrupCover, img02, img03, img04, img05];

const formatDate = (iso) =>
  new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));

// Latest news first, one story per article, each showing a photo that belongs to it.
// Articles share photos, so skip ones already on screen rather than repeating an image.
const STORY_COUNT = 5;
const DEVELOP_MS = 1200;
const DEVELOP_STAGGER_MS = 90;
const stories = (() => {
  const used = new Set();
  const list = [];
  for (const n of [...noticias].sort((a, b) => b.date.localeCompare(a.date))) {
    const src = [n.cover, ...n.photos].find((p) => p && !used.has(p));
    if (!src) continue;
    used.add(src);
    list.push({ src, slug: n.slug, title: n.title, date: n.date });
    if (list.length === STORY_COUNT) break;
  }
  return list;
})();

export default function Home() {
  useSEO({
    description: 'Site oficial do Agrupamento 80 - Santa Maria de Belém, Corpo Nacional de Escutas. Acompanha as últimas notícias, eventos e atividades.',
  });

  // Below-the-fold photos start only once the hero has loaded; on slow connections they
  // otherwise split the bandwidth with it and delay the first paint of the page.
  const [heroLoaded, setHeroLoaded] = useState(false);
  const storiesRef = useRef(null);

  // Each story photo develops once it has both loaded and come on screen. Photos that
  // qualify in the same frame develop in reading order, a stagger apart.
  useEffect(() => {
    if (!heroLoaded || !storiesRef.current) return;
    const imgs = [...storiesRef.current.querySelectorAll('img')];
    const state = new Map(imgs.map((img) => [img, { loaded: false, seen: false, done: false }]));
    const aborter = new AbortController();
    const timers = [];
    let queue = [];
    let raf = 0;

    const flush = () => {
      raf = 0;
      queue.sort((a, b) => imgs.indexOf(a) - imgs.indexOf(b)).forEach((img, k) => {
        img.style.transitionDelay = `${k * DEVELOP_STAGGER_MS}ms`;
        img.classList.add(styles.developed);
        // Hand the photo back to its hover zoom once developed (matches .developed in CSS)
        timers.push(setTimeout(() => {
          img.classList.remove(styles.developing, styles.developed);
          img.style.transitionDelay = '';
        }, k * DEVELOP_STAGGER_MS + DEVELOP_MS));
      });
      queue = [];
    };

    const tryDevelop = (img) => {
      const s = state.get(img);
      if (!s.loaded || !s.seen || s.done) return;
      s.done = true;
      queue.push(img);
      raf ||= requestAnimationFrame(flush);
    };

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        state.get(e.target).seen = true;
        io.unobserve(e.target);
        tryDevelop(e.target);
      }
    }, { threshold: 0.2 });

    for (const img of imgs) {
      const onLoad = () => { state.get(img).loaded = true; tryDevelop(img); };
      if (img.complete) onLoad();
      else {
        img.addEventListener('load', onLoad, { once: true, signal: aborter.signal });
        img.addEventListener('error', onLoad, { once: true, signal: aborter.signal });
      }
      io.observe(img);
    }

    return () => {
      io.disconnect();
      aborter.abort();
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [heroLoaded]);

  return (
    <main>
      <Carousel
        images={carouselImages}
        onFirstImageLoad={() => {
          setHeroLoaded(true);
          prefetchLikelyRoutes();
        }}
      />

      {/* Unnamed on purpose: a named section is a landmark, and one paragraph with no heading shouldn't be one */}
      <section className={styles.welcome}>
        <div className="container">
          <p className={styles.lead}>
            Vais acampar, partir em caminhadas e raides, e jogar e cantar com os teus amigos.
          </p>
        </div>
      </section>

      {stories.length > 0 && (
        <section className={styles.news} aria-labelledby="home-news-title">
          <div className="container">
            <div className={styles.sectionHead}>
              <h2 id="home-news-title" className={styles.sectionTitle}>Últimas aventuras</h2>
              <Link to="/agrupamento/noticias" className={styles.seeAll}>
                Ver todas as notícias <FaArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>

            <ul ref={storiesRef} className={styles.stories}>
              {stories.map((story, i) => (
                <li key={story.slug} className={i === 0 ? styles.storyLead : styles.story}>
                  <Link to={`/agrupamento/noticias/${story.slug}`} className={styles.storyLink}>
                    <span className={styles.storyMedia}>
                      {/* The title below names the link; a matching alt would be read twice */}
                      <img
                        src={heroLoaded ? story.src : undefined}
                        srcSet={heroLoaded ? srcSetFor(story.src) : undefined}
                        sizes={i === 0 ? '(max-width: 1024px) 100vw, 640px' : '(max-width: 1024px) 50vw, 300px'}
                        className={heroLoaded ? styles.developing : undefined}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <h3 className={styles.storyTitle}>{story.title}</h3>
                    <time dateTime={story.date} className={styles.storyDate}>{formatDate(story.date)}</time>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <AgeLadder />

      <section className={styles.join} aria-labelledby="home-join-title">
        <div className={`container ${styles.joinInner}`}>
          <div className={styles.joinText}>
            <h2 id="home-join-title" className={styles.joinTitle}>Queres fazer parte?</h2>
            <p className={styles.joinLine}>Fala connosco e vem conhecer o agrupamento.</p>
            <ol className={styles.steps}>
              <li className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">1</span>
                <span className={styles.stepText}>
                  Fala connosco
                  <Link to="/contactos" className={styles.stepLink}>Ver contactos</Link>
                </span>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">2</span>
                <span className={styles.stepText}>Vem a uma atividade de sábado</span>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">3</span>
                <span className={styles.stepText}>
                  Preenche a Ficha de Inscrição
                  {fichaInscricao && (
                    <a href={fichaInscricao} className={styles.stepLink} target="_blank" rel="noopener noreferrer">
                      Descarregar ficha (PDF)
                    </a>
                  )}
                </span>
              </li>
            </ol>
            <p className={styles.promessa}>A Promessa vem depois, quando já te sentires em casa.</p>
            <Link to="/contactos" className={styles.joinCta}>Inscreve-te</Link>
          </div>
          <img
            src={heroLoaded ? joinPhoto : undefined}
            srcSet={heroLoaded ? srcSetFor(joinPhoto) : undefined}
            sizes="(max-width: 768px) 100vw, 560px"
            alt="Exploradores do Agrupamento 80 numa atividade no bosque"
            className={styles.joinPhoto}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <CancioneiroBand />
    </main>
  );
}
