import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSEO } from '../../utils/useSEO';
import JsonLd from '../../components/JsonLd';
import { FaCalendarAlt, FaUser, FaTag, FaImages, FaArrowLeft, FaInstagram, FaFacebookF, FaExternalLinkAlt } from 'react-icons/fa';
import { noticias } from '../../config/noticias';
import { seccaoByName } from '../../config/seccoes';
import { srcSetFor } from '../../utils/responsiveImage';
import { prefetchLikelyRoutes } from '../../utils/prefetchRoutes';
import NotFound from '../NotFound/NotFound';
import Lightbox from './Lightbox';
import styles from './NoticiaDetail.module.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// A notícia's posts elsewhere, grouped by where they are. In the config each link is a URL or
// { url, label }, where the label says what that post shows ("Arborismo"); unlabelled posts in a
// group are numbered.
const asPost = (link) => (typeof link === 'string' ? { url: link } : link);
function postGroups(links = {}) {
  return [
    links.facebook && { platform: 'Facebook', Icon: FaFacebookF, posts: [asPost(links.facebook)] },
    links.instagram?.length && { platform: 'Instagram', Icon: FaInstagram, posts: links.instagram.map(asPost) },
    links.url && { platform: 'Link externo', Icon: FaExternalLinkAlt, posts: [asPost(links.url)] },
  ].filter(Boolean);
}

// The history entry the stale-viewer step-back last acted on (see NoticiaDetail)
let steppedOverKey = null;

const NOT_FOUND = {
  title: 'Notícia não encontrada',
  description: 'Esta notícia já não existe ou o endereço tem um erro.',
  to: '/agrupamento/noticias',
  linkLabel: 'Ver todas as notícias',
};

// A paragraph that is wholly one quotation ("…", “…” or «…») is set as a quote, in pt-PT «»
const QUOTE = /^\s*["“«]([\s\S]+?)["”»]\s*$/;

export default function NoticiaDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  // The gallery waits for the hero photo, so on a slow connection the photo at the top isn't
  // sharing the bandwidth with photos far down the page (the same rule as Home). Kept per story,
  // so moving to another notícia starts the wait again.
  const [heroLoadedFor, setHeroLoadedFor] = useState(null);
  const heroLoaded = heroLoadedFor === slug;
  const onHeroLoaded = () => {
    setHeroLoadedFor(slug);
    prefetchLikelyRoutes();
  };
  const photosButtonRef = useRef(null);

  // The viewer is a history entry of its own (same address, state { viewer: true }), so a phone's
  // Back closes it instead of leaving the article. It shows only while that entry is current;
  // every way of closing steps back through it.
  const viewerEntry = location.state?.viewer === true;
  // The viewer hands focus back to whatever had it when it opened. A tap doesn't focus a button on
  // touch screens, and the hero photo can't take focus, so focus the trigger (or, for the photo,
  // the "N fotos" button) first: closing then always lands on a real control.
  const openViewer = (i, trigger) => {
    (trigger instanceof HTMLButtonElement ? trigger : photosButtonRef.current)?.focus({ preventScroll: true });
    setLightboxIndex(i);
    if (!viewerEntry) navigate(location, { state: { ...location.state, viewer: true } });
  };
  // Only while the entry is current: a second Escape during the exit fade must not leave the page
  const closeViewer = () => { if (viewerEntry) navigate(-1); };

  // A reload restores history state but not the open viewer. That entry only ever comes from
  // opening the viewer, so step back over it: the next Back then leaves the article, as expected.
  useEffect(() => {
    // Once per entry: development StrictMode runs this effect twice, and two steps back would
    // leave the article
    if (location.state?.viewer && steppedOverKey !== location.key) {
      steppedOverKey = location.key;
      navigate(-1);
    }
    // Only on arrival: later changes to the entry are the viewer's own
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const noticia = noticias.find((n) => n.slug === slug);

  // Same values as the NotFound it renders: this effect runs after the child's and would win
  useSEO(noticia ? {
    title: noticia.title,
    description: noticia.excerpt,
    image: noticia.cover,
  } : {
    title: NOT_FOUND.title,
    description: NOT_FOUND.description,
    noindex: true,
  });

  if (!noticia) {
    return (
      <NotFound {...NOT_FOUND} />
    );
  }

  const paragraphs = noticia.body.split('\n\n');
  const hasPhotos = noticia.photos.length > 0;
  const extraPhotos = noticia.photos.length > 1;
  // The hero shows the cover, so opening from it starts on the cover (the first photo, as stories
  // are written today)
  const coverIndex = Math.max(0, noticia.photos.indexOf(noticia.cover));
  const postSets = postGroups(noticia.links);
  // The secção's text-safe pair colours the hero's badge. "Agrupamento" has no secção and falls
  // back to the site green in CSS.
  const seccao = seccaoByName(noticia.section);
  const heroVars = seccao ? { '--hero-surface': seccao.surface, '--hero-ink': seccao.onSurface } : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: noticia.title,
    description: noticia.excerpt,
    image: `${window.location.origin}${noticia.cover}`,
    datePublished: noticia.date,
    inLanguage: 'pt-PT',
    author: { '@type': 'Person', name: noticia.author },
    publisher: {
      '@type': 'Organization',
      name: 'Agrupamento 80 - Santa Maria de Belém',
      url: 'https://afonsobenedito.github.io/cne80belem',
    },
    url: `https://afonsobenedito.github.io/cne80belem/agrupamento/noticias/${noticia.slug}`,
  };

  return (
    <main className={styles.page}>
      <JsonLd data={jsonLd} />
      {/* Hero: the cover fills it, under the badge, title and meta */}
      <section className={styles.hero} style={heroVars}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroInfo}>
            <span className={styles.heroSection}>
              <FaTag size={11} aria-hidden="true" /> {noticia.section}
            </span>
            <h1 className={styles.heroTitle}>{noticia.title}</h1>
            <div className={styles.heroMeta}>
              <span><FaUser size={12} aria-hidden="true" /> {noticia.author}</span>
              <span>
                <FaCalendarAlt size={12} aria-hidden="true" />
                <time dateTime={noticia.date}>{formatDate(noticia.date)}</time>
              </span>
              {hasPhotos && (
                <button
                  ref={photosButtonRef}
                  type="button"
                  className={styles.heroPhotos}
                  onClick={(e) => openViewer(extraPhotos ? 0 : coverIndex, e.currentTarget)}
                >
                  <FaImages size={12} aria-hidden="true" />
                  {extraPhotos ? `${noticia.photos.length} fotos` : 'Ver foto'}
                </button>
              )}
            </div>
          </div>
          {/* A tap or click on the photo opens it too: a pointer shortcut only, since the meta
              button above already gives keyboard and screen-reader users the same action */}
          <div
            className={`${styles.heroFigure} ${hasPhotos ? styles.heroFigureOpen : ''}`}
            onClick={hasPhotos ? () => openViewer(coverIndex) : undefined}
          >
            <img
              src={noticia.cover}
              srcSet={srcSetFor(noticia.cover)}
              sizes="100vw"
              alt=""
              className={styles.heroImg}
              fetchPriority="high"
              onLoad={onHeroLoaded}
              onError={onHeroLoaded}
            />
          </div>
        </div>
      </section>

      {/* Article: the story first. From 1024px its photos and posts sit beside the text instead of
          under it; the reading and focus order stays text first at every width */}
      <section className={styles.body}>
        <div className="container">
          <Link to="/agrupamento/noticias" className={styles.backLink}>
            <FaArrowLeft size={12} aria-hidden="true" /> Todas as notícias
          </Link>

          <div className={styles.layout}>
            <article className={styles.article}>
              {paragraphs.map((p, i) => {
                const quote = p.match(QUOTE);
                return quote
                  ? <blockquote key={i} className={styles.quote}><p>{quote[1]}</p></blockquote>
                  : <p key={i}>{p}</p>;
              })}
            </article>

            {(extraPhotos || postSets.length > 0) && (
              <div className={styles.side}>
                {extraPhotos && (
                  <section className={styles.gallery} aria-labelledby="galeria">
                    <h2 id="galeria" className={styles.galleryTitle}>Galeria</h2>
                    <div className={styles.thumbGrid}>
                      {noticia.photos.map((photo, i) => (
                        <button
                          key={i}
                          type="button"
                          className={styles.thumb}
                          onClick={(e) => openViewer(i, e.currentTarget)}
                          aria-label={`Abrir foto ${i + 1} de ${noticia.photos.length}`}
                        >
                          <img
                            src={heroLoaded ? photo : undefined}
                            srcSet={heroLoaded ? srcSetFor(photo) : undefined}
                            sizes="(max-width: 600px) 50vw, (max-width: 1023px) 200px, 280px"
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {postSets.length > 0 && (
                  <section className={styles.posts} aria-labelledby="redes">
                    <h2 id="redes" className={styles.galleryTitle}>Nas redes sociais</h2>
                    <ul className={styles.postList}>
                      {postSets.map(({ platform, Icon, posts }) => (posts.length === 1 ? (
                        <li key={platform}>
                          <a href={posts[0].url} target="_blank" rel="noopener noreferrer" className={styles.postLink}>
                            <Icon size={15} aria-hidden="true" />
                            {posts[0].label ? `${platform}: ${posts[0].label}` : platform}
                            <span className={styles.srOnly}>(abre numa nova janela)</span>
                          </a>
                        </li>
                      ) : (
                        <li key={platform} className={styles.postGroup}>
                          <span className={styles.postGroupName} id={`redes-${platform}`}>
                            <Icon size={15} aria-hidden="true" /> {platform} · {posts.length} publicações
                          </span>
                          <ul className={styles.postList} aria-labelledby={`redes-${platform}`}>
                            {posts.map((post, i) => (
                              <li key={post.url}>
                                <a href={post.url} target="_blank" rel="noopener noreferrer" className={styles.postLink}>
                                  {post.label || `Publicação ${i + 1}`}
                                  <span className={styles.srOnly}>({platform}, abre numa nova janela)</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )))}
                    </ul>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Once its entry is gone (closed, or Back) the viewer stays just long enough to fade out */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={noticia.photos}
          index={lightboxIndex}
          onIndex={setLightboxIndex}
          onClose={closeViewer}
          leaving={!viewerEntry}
          onLeft={() => setLightboxIndex(null)}
          title={noticia.title}
        />
      )}
    </main>
  );
}
