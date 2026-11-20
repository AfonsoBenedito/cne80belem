import { Fragment, Suspense, lazy, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaSearchPlus } from 'react-icons/fa';
import { seccoes } from '../../config/seccoes';
import { uniformes, uniformeDirigentesImg, dirigentes, badges, progresso } from '../../config/provasMedia';
import { srcSetFor } from '../../utils/responsiveImage';
import styles from './ProvaMedia.module.css';

// The photo viewer loads on the first press of a poster: the Promessa page shows an insígnia and
// never opens it
const Lightbox = lazy(() => import('../NoticiaDetail/Lightbox'));

// Badges per row, so no row is left with one: n items in rows of at most `max`, as even as they
// split (7 in rows of 5 is 4 + 3, not 5 + 2)
const perRow = (n, max) => Math.ceil(n / Math.ceil(n / max));

// A button's content is presentational and its aria-label is its whole name, so the picture's
// description would never be read from inside it: it follows the button, for screen readers.
// Tied to its button (`id`, the drawings' and photos'), it is the button's description, read with
// it, so it is hidden from reading on: one paragraph read twice was the same words again
function Description({ id, children }) {
  return id ? <p id={id} hidden>{children}</p> : <p className={styles.srOnly}>{children}</p>;
}

// The posters' labels are too small to read in place: this mark says a press enlarges them
// (the button is named "Ampliar: …", matching it, so the mark itself is hidden from screen readers)
function ZoomMark({ mobileOnly = false }) {
  return (
    <span className={mobileOnly ? `${styles.zoomMark} ${styles.mobileZoomCue}` : styles.zoomMark} aria-hidden="true">
      <FaSearchPlus size={11} /> <span className={styles.zoomMarkText}>Ampliar</span>
    </span>
  );
}

// The secção's uniform and the dirigentes', side by side at one height: each takes a share of
// the row in proportion to its width over height. The posters' labels are small, so a press
// opens them in the photo viewer (zoom, and a swipe to the other one)
function Uniformes({ seccao }) {
  const [viewer, setViewer] = useState(null);
  const pair = [
    { ...uniformes[seccao], caption: `Uniforme dos ${seccoes[seccao].label.split(' - ').pop()}` },
    { ...uniformeDirigentesImg, caption: 'Uniforme dos dirigentes' },
  ];
  return (
    <>
      {/* The page opens on the posters, so their heading is for heading navigation only */}
      <h2 className={styles.srOnly}>Uniformes</h2>
      <div className={styles.uniformes}>
        {pair.map((u, i) => (
          <figure key={u.caption} className={styles.uniforme} style={{ flexGrow: u.w / u.h }}>
            <button
              type="button"
              className={styles.uniformeButton}
              // A tap doesn't focus a button on touch screens: focus it, so closing returns here
              onClick={(e) => {
                e.currentTarget.focus({ preventScroll: true });
                setViewer({ index: i, leaving: false });
              }}
              aria-label={`Ampliar: ${u.caption}`}
            >
              <img src={u.src} alt="" width={u.w} height={u.h} className={styles.uniformeImg} />
              <ZoomMark />
            </button>
            <Description>{u.alt}</Description>
            <figcaption className={styles.uniformeCaption}>{u.caption}</figcaption>
          </figure>
        ))}
      </div>
      {viewer && (
        <Suspense fallback={null}>
          <Lightbox
            photos={pair.map((u) => u.src)}
            index={viewer.index}
            onIndex={(index) => setViewer({ index, leaving: false })}
            onClose={() => setViewer((v) => v && { ...v, leaving: true })}
            leaving={viewer.leaving}
            onLeft={() => setViewer(null)}
            title="Uniformes"
            captions={pair.map((u) => u.caption)}
            alts={pair.map((u) => u.alt)}
          />
        </Suspense>
      )}
    </>
  );
}

// The dirigentes' table, set as the page's own: a losango per level, then a cross per função
function Dirigentes() {
  return (
    <div className={styles.dirigentes}>
      <h3 className={styles.subheading}>Pelo nível</h3>
      <ul className={styles.funcoes} style={{ '--per-wide': perRow(5, 5), '--per-narrow': perRow(5, 3) }}>
        {dirigentes.niveis.map((n) => (
          <li key={n.name} className={styles.funcao}>
            <svg viewBox="0 0 20 30" className={styles.losango} aria-hidden="true">
              <polygon points="10,1 19,15 10,29 1,15" fill={n.color} />
            </svg>
            <span className={styles.funcaoName}>{n.name}</span>
          </li>
        ))}
      </ul>
      <h3 className={styles.subheading}>Pela função</h3>
      <ul className={styles.cruzes}>
        {dirigentes.cruzes.map((c) => (
          <li key={c.name} className={styles.cruz}>
            <img src={c.src} alt="" className={styles.cruzImg} />
            <span>
              <span className={styles.funcaoName}>{c.name}</span>
              <span className={styles.cruzWho}>{c.who}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// A drawing's width over its height (the saudação's carry their size), so a lone one can be given
// its width before it loads
const ratio = (f) => (f.w ? { '--ratio': f.w / f.h, '--natural': `${f.natural ?? f.w}px` } : undefined);

// A photograph (`photo`, the História's) is shown at the column's width (32rem, the screen's on
// phones) or, a portrait, at 26rem tall: the srcset's file for that width, fetched only near the
// screen (they're far down the page). The viewer opens the full file
const photoSources = (f) => {
  const w = `${(26 * f.w) / f.h}rem`;
  return {
    srcSet: srcSetFor(f.src),
    sizes: `(max-width: 600px) min(calc(100vw - 2rem), ${w}), min(32rem, ${w})`,
    loading: 'lazy',
    decoding: 'async',
  };
};

// A grid of badges, each over its name, all at one height. Items that share a `group` keep a row
// of their own; every group's rows are as wide as the largest group's, so the tiles line up.
// A lone badge (the Promessa) is set larger: it's the one the scout is working towards.
// The drawings (`large`, the saudações) are old photocopies, small in place: a press opens them
// in the photo viewer, as the uniform posters do
function Badges({ items: all, seccao, title, knotDiagrams, figureSlot, loading }) {
  const [viewer, setViewer] = useState(null);
  const descId = useId();
  const [loads, setLoads] = useState({});
  const fail = (src) => setLoads((prev) => ({ ...prev, [src]: { ...prev[src], status: 'failed' } }));
  const retry = (src) => {
    const url = new URL(src, document.baseURI);
    url.searchParams.set('retry', Date.now().toString());
    setLoads((prev) => ({ ...prev, [src]: { status: 'retrying', url: url.href } }));
  };
  const unavailable = (src) => loads[src]?.status === 'failed' || loads[src]?.status === 'retrying';
  const drawingLabel = (f) => f.name ?? (knotDiagrams ? title : f.caption);
  const items = knotDiagrams ? all : all.filter((f) => !unavailable(f.src));
  // A drawing smaller than the viewer would show it (`zoom: false`, the S. Francisco cartoons)
  // stays a plain picture: the viewer would only set it on black at the size it already has;
  // one that isn't a drawing tile but gains from it opts in (`zoom: true`, the knot diagrams)
  const zoomable = (f) => (f.large && f.zoom !== false) || f.zoom === true;
  if (!items.length) return null;
  const sideFigure = figureSlot && items.find((item) => item.besideText);
  const groups = [];
  for (const item of items) {
    if (item === sideFigure) continue;
    const last = groups[groups.length - 1];
    if (last && last[0].group === item.group) last.push(item);
    else groups.push([item]);
  }
  const pageOrder = sideFigure ? [sideFigure, ...groups.flat()] : items;
  const drawings = pageOrder.filter((f) => zoomable(f) && !unavailable(f.src));
  const namedDiagrams = items.length > 1 && items[0].natural;
  const largest = Math.max(...groups.map((g) => g.length));
  const vars = { '--per-wide': perRow(largest, 5), '--per-narrow': perRow(largest, 3) };
  const ink = seccoes[seccao].ink;
  const renderGroup = (group, besideText = false) => (
    <Fragment key={group[0].src}>
      {group[0].groupHeading && (
        <h3 className={`${styles.subheading} ${styles.groupHeading}`}>{group[0].groupHeading}</h3>
      )}
      <ul
        className={`${styles.funcoes} ${besideText ? styles.sideFigure : figureSlot ? styles.tyingFigures : ''} ${items.length === 1 ? styles.funcoesSingle : ''} ${items[0].large ? styles.funcoesLarge : ''} ${items[0].small ? styles.funcoesSmall : ''} ${items[0].natural ? styles.funcoesNatural : ''} ${group[0].tall ? styles.funcoesTall : ''} ${items[0].hero ? styles.funcoesHero : ''} ${items[0].photo ? styles.funcoesPhoto : ''}`}
        style={vars}
      >
        {group.map((f) => (
          <li
            key={f.src}
            className={`${styles.funcao} ${f.current ? styles.funcaoCurrent : ''}`}
            style={f.current ? { borderColor: seccoes[seccao].color } : undefined}
          >
            {namedDiagrams && f.name && <span className={styles.funcaoName}>{f.name}</span>}
            {f.href ? (
            // A link to its cargo below, stretched over the whole tile as the drawings' button is
            <a href={f.href} className={styles.funcaoZoom}>
              <img src={f.src} alt="" className={styles.funcaoImg} onError={() => fail(f.src)} />
              <span className={styles.srOnly}>{f.name}</span>
            </a>
          ) : zoomable(f) ? (
              <>
                {/* Stretched over the whole tile; the name below stays plain text */}
                <button
                  type="button"
                  className={unavailable(f.src) ? styles.retryDrawing : styles.funcaoZoom}
                  aria-disabled={loads[f.src]?.status === 'retrying' || undefined}
                  onClick={(e) => {
                    if (unavailable(f.src)) {
                      if (loads[f.src].status === 'failed') retry(f.src);
                      return;
                    }
                    e.currentTarget.focus({ preventScroll: true });
                    setViewer({ drawings, index: drawings.indexOf(f), leaving: false });
                  }}
                  // Named by what it shows: its name, or its caption (a photograph's), or the section
                  aria-label={unavailable(f.src) ? `Tentar novamente: ${f.name ?? title}` : `Ampliar: ${drawingLabel(f) ?? title}`}
                  aria-describedby={!unavailable(f.src) && f.alt ? `${descId}-${all.indexOf(f)}` : undefined}
                  style={f.photo ? ratio(f) : undefined}
                >
                  <img
                    src={loads[f.src]?.url ?? f.src}
                    loading={loads[f.src]?.url ? 'eager' : loading}
                    hidden={unavailable(f.src)}
                    onLoad={loads[f.src]?.status === 'retrying' ? () => setLoads((prev) => ({
                      ...prev, [f.src]: { ...prev[f.src], status: 'ready' },
                    })) : undefined}
                    alt=""
                    width={f.w}
                    height={f.h}
                    className={styles.funcaoImg}
                    style={ratio(f)}
                    onError={() => fail(f.src)}
                    {...(f.photo && photoSources(f))}
                  />
                  {/* A photograph (`photo`, the História's) reads as a picture to look at, not
                      one to press: the posters' mark says it opens larger */}
                  {unavailable(f.src) && (loads[f.src].status === 'retrying' ? 'A carregar…' : 'Tentar novamente')}
                  {(f.photo || f.mobileZoomCue) && !unavailable(f.src) && <ZoomMark mobileOnly={f.mobileZoomCue} />}
                </button>
                {unavailable(f.src) && <p role="status">A ilustração está indisponível. {f.alt}</p>}
                {!unavailable(f.src) && f.alt && <Description id={`${descId}-${all.indexOf(f)}`}>{f.alt}</Description>}
              </>
            ) : f.marks ? (
              // Numbers on the drawing (the pilgrim's signs), each named in the list under it:
              // the numbers are for the eye, the list says it to everyone
              <span className={styles.marked}>
                <img src={f.src} alt={f.alt ?? ''} width={f.w} height={f.h} className={styles.funcaoImg} style={ratio(f)} onError={() => fail(f.src)} />
                {f.marks.map((m, k) => (
                  <span
                    key={m.label}
                    className={styles.mark}
                    style={{ left: `${m.x * 100}%`, top: `${m.y * 100}%`, background: seccoes[seccao].surface, color: seccoes[seccao].onSurface }}
                    aria-hidden="true"
                  >
                    {k + 1}
                  </span>
                ))}
              </span>
            ) : (
              <img src={f.src} alt={f.alt ?? ''} width={f.w} height={f.h} className={styles.funcaoImg} style={ratio(f)} onError={() => fail(f.src)} />
            )}
            {f.caption && <span className={styles.funcaoCaption}>{f.caption}</span>}
            {f.marks && (
              <ol className={styles.markList}>
                {f.marks.map((m) => (
                  <li key={m.label} style={{ '--mark-bg': seccoes[seccao].surface, '--mark-fg': seccoes[seccao].onSurface }}>
                    {m.label}
                  </li>
                ))}
              </ol>
            )}
            {!namedDiagrams && f.name && (
              <span className={styles.funcaoName} style={f.current ? { color: ink } : undefined} aria-hidden={f.href ? true : undefined}>
                {f.name}
                {f.current && <span className={styles.srOnly}> (a tua secção)</span>}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Fragment>
  );
  return (
    <div className={styles.badgeGroups}>
      {sideFigure && createPortal(renderGroup([sideFigure], true), figureSlot)}
      {groups.map((group) => renderGroup(group))}
      {viewer && (
        <Suspense fallback={null}>
          <Lightbox
            photos={viewer.drawings.map((f) => loads[f.src]?.url ?? f.src)}
            index={viewer.index}
            onIndex={(index) => setViewer({ ...viewer, index, leaving: false })}
            onClose={() => setViewer((v) => v && { ...v, leaving: true })}
            leaving={viewer.leaving}
            onLeft={() => setViewer(null)}
            // A picture can name itself (`title`, the Exploradores' jogo de pista): by the section
            // heading alone it opened as "Desenho: As etapas"
            title={viewer.drawings[viewer.index]?.title ?? title}
            captions={viewer.drawings.map((f) => drawingLabel(f) ?? '')}
            note={knotDiagrams ? viewer.drawings[viewer.index]?.caption : undefined}
            alts={viewer.drawings.map((f) => f.alt)}
            drawings
            kind={viewer.drawings.every((f) => f.kind) ? viewer.drawings[0].kind : undefined}
          />
        </Suspense>
      )}
    </div>
  );
}

// The etapas in order, each adding its piece, then the whole insígnia
function Progresso({ seccao }) {
  const { etapas, completa } = progresso(seccao);
  const { surface, onSurface } = seccoes[seccao];
  return (
    <div className={styles.progresso}>
      {/* The etapas' own width decides four across or two by two (a container), not the screen's:
          beside the whole insígnia at 768px they had a phone's room */}
      <div className={styles.etapasBox}>
      <ol className={styles.etapas}>
        {etapas.map((e, i) => (
          <li key={e.name} className={styles.etapa}>
            <img src={e.src} alt="" className={styles.etapaImg} />
            {/* The number in the secção's colour, as the provas list numbers its provas; the
                <ol> already says the order, so it is hidden from screen readers */}
            <span className={styles.etapaNumber} style={{ background: surface, color: onSurface }} aria-hidden="true">
              {i + 1}
            </span>
            <span className={styles.funcaoName}>{e.name}</span>
          </li>
        ))}
      </ol>
      </div>
      <figure className={styles.completa}>
        <img src={completa} alt={`A insígnia de progresso completa, com as etapas ${etapas.map((e) => e.name).join(', ')}`} className={styles.completaImg} />
        <figcaption className={styles.funcaoName}>A insígnia completa</figcaption>
      </figure>
    </div>
  );
}

// A prova section's pictures, by its `media` name (config/provas/): its own chunk, with the
// images and the photo viewer, so a prova of plain text never downloads them
// A drawing alone, sized by the box it sits in (the Livro da Selva's characters). One that fails
// to load leaves nothing, so its box gives way to the text instead of holding a broken image
function Picture({ f, zoom = false, title, caption, kind }) {
  const [failed, setFailed] = useState(false);
  const [viewer, setViewer] = useState(null);
  const descId = useId();
  if (failed) return null;
  // A cast sits down the page (the Livro da Selva's ten, the Jamboree's logos), so its pictures
  // wait until they're near the screen; their width and height hold the box meanwhile
  const img = (alt) => <img src={f.src} alt={alt} width={f.w} height={f.h} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
  if (!zoom) return img(f.alt ?? '');
  // One too small to see in place (the first Jamboree's photo, ~110px) opens in the photo viewer
  // (`zoom` on its cast item): the button is named by its name, the picture described by its alt,
  // a magnifier in its corner says it opens, as the posters' mark does
  return (
    <>
      <button
        type="button"
        className={styles.pictureZoom}
        onClick={(e) => {
          e.currentTarget.focus({ preventScroll: true });
          setViewer({ leaving: false });
        }}
        aria-label={`Ampliar: ${title}`}
        aria-describedby={f.alt ? descId : undefined}
      >
        {img('')}
        <span className={styles.pictureZoomMark} aria-hidden="true">
          <FaSearchPlus size={11} />
        </span>
      </button>
      {f.alt && <Description id={descId}>{f.alt}</Description>}
      {/* At the page's root: inside the cast's box, its picture rules (7rem) sized the viewer's too */}
      {viewer && createPortal(
        <Suspense fallback={null}>
          <Lightbox
            photos={[f.src]}
            index={0}
            onIndex={() => {}}
            onClose={() => setViewer((v) => v && { ...v, leaving: true })}
            leaving={viewer.leaving}
            onLeft={() => setViewer(null)}
            title={title}
            captions={[caption ?? f.caption ?? '']}
            alts={[f.alt]}
            kind={kind}
          />
        </Suspense>,
        document.body,
      )}
    </>
  );
}

export default function ProvaMedia({ media, seccao, title, icon = false, picture = false, zoom = false, caption, kind, knotDiagrams = false, figureSlot, loading }) {
  // A badge set small beside its heading (the Cargos prova): the heading names it, so no alt
  if (icon && badges[media]) return <img src={badges[media](seccao)[0].src} alt="" className={styles.headingIcon} />;
  if (picture && badges[media]) return <Picture f={badges[media](seccao)[0]} zoom={zoom} title={title} caption={caption} kind={kind} />;
  if (media === 'uniformes') return <Uniformes seccao={seccao} />;
  if (media === 'progresso') return <Progresso seccao={seccao} />;
  if (media === 'dirigentes') return <Dirigentes />;
  if (badges[media]) return <Badges loading={loading} figureSlot={figureSlot} knotDiagrams={knotDiagrams} items={badges[media](seccao)} seccao={seccao} title={title} />;
  return null;
}
