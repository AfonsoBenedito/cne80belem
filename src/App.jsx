import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import FloatingBtn from './components/FloatingBtn/FloatingBtn';
import styles from './App.module.css';

import { loadNoticias, loadContactos, loadCancioneiro, prefetchLikelyRoutes } from './utils/prefetchRoutes';

const Direcao = lazy(() => import('./pages/Direcao/Direcao'));
const Dirigentes = lazy(() => import('./pages/Dirigentes/Dirigentes'));
const BancoDeFardas = lazy(() => import('./pages/BancoDeFardas/BancoDeFardas'));
const Documentos = lazy(() => import('./pages/Documentos/Documentos'));
const Noticias = lazy(loadNoticias);
const NoticiaDetail = lazy(() => import('./pages/NoticiaDetail/NoticiaDetail'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const UnderConstruction = lazy(() => import('./pages/UnderConstruction/UnderConstruction'));
const Seccao = lazy(() => import('./pages/Seccao/Seccao'));
const Provas = lazy(() => import('./pages/Provas/Provas'));
const ProvaDetail = lazy(() => import('./pages/ProvaDetail/ProvaDetail'));
const Programa = lazy(() => import('./pages/Programa/Programa'));
const Contactos = lazy(loadContactos);
const Cancioneiro = lazy(loadCancioneiro);
const CancaoDetail = lazy(() => import('./pages/CancaoDetail/CancaoDetail'));
const ReservarAlojamento = lazy(() => import('./pages/ReservarAlojamento/ReservarAlojamento'));

// Home triggers the prefetch when its hero has loaded; any other entry page warms the
// same routes once the document has loaded.
function usePrefetchLikelyRoutes() {
  useEffect(() => {
    if (window.location.pathname.replace(import.meta.env.BASE_URL, '/') === '/') return;
    if (document.readyState === 'complete') prefetchLikelyRoutes();
    else window.addEventListener('load', prefetchLikelyRoutes, { once: true });
    return () => window.removeEventListener('load', prefetchLikelyRoutes);
  }, []);
}

export default function App() {
  usePrefetchLikelyRoutes();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Header />
      {/* Skip-link target: focusable so keyboard users land past the header */}
      <div id="conteudo" tabIndex={-1} className={styles.skipTarget}>
        <Suspense fallback={<main className={styles.routeFallback} aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agrupamento/direcao" element={<Direcao />} />
            <Route path="/agrupamento/dirigentes-e-animadores" element={<Dirigentes />} />
            <Route path="/agrupamento/banco-de-fardas" element={<BancoDeFardas />} />
            <Route path="/agrupamento/documentos" element={<Documentos />} />
            <Route path="/agrupamento/noticias" element={<Noticias />} />
            <Route path="/agrupamento/noticias/:slug" element={<NoticiaDetail />} />
            {/* Section pages */}
            <Route path="/seccao/:seccao" element={<Seccao />} />
            {/* Section news (covil/cabana/abrigo/base) */}
            <Route path="/seccao/lobitos/covil" element={<Noticias fixedSection="Lobitos" hideHero />} />
            <Route path="/seccao/exploradores/cabana" element={<Noticias fixedSection="Exploradores" hideHero />} />
            <Route path="/seccao/pioneiros/abrigo" element={<Noticias fixedSection="Pioneiros" hideHero />} />
            <Route path="/seccao/caminheiros/base" element={<Noticias fixedSection="Caminheiros" hideHero />} />
            {/* Section sub-pages */}
            <Route path="/seccao/:seccao/programa" element={<Programa />} />
            <Route path="/seccao/:seccao/provas" element={<Provas />} />
            <Route path="/seccao/:seccao/provas/:slug" element={<ProvaDetail />} />
            {/* Pages under construction */}
            <Route path="/seccao/:seccao/*" element={<UnderConstruction />} />
            <Route path="/recursos/cancioneiro" element={<Cancioneiro />} />
            <Route path="/recursos/cancioneiro/:slug" element={<CancaoDetail />} />
            <Route path="/recursos/reservar-alojamento" element={<ReservarAlojamento />} />
            <Route path="/recursos/*" element={<UnderConstruction />} />
            <Route path="/links" element={<UnderConstruction />} />
            <Route path="/contactos" element={<Contactos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <FloatingBtn />
    </BrowserRouter>
  );
}
