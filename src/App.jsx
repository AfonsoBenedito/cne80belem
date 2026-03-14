import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Direcao from './pages/Direcao/Direcao';
import Dirigentes from './pages/Dirigentes/Dirigentes';
import BancoDeFardas from './pages/BancoDeFardas/BancoDeFardas';
import Documentos from './pages/Documentos/Documentos';
import Noticias from './pages/Noticias/Noticias';
import NoticiaDetail from './pages/NoticiaDetail/NoticiaDetail';
import NotFound from './pages/NotFound/NotFound';
import UnderConstruction from './pages/UnderConstruction/UnderConstruction';
import Seccao from './pages/Seccao/Seccao';
import Provas from './pages/Provas/Provas';
import ProvaDetail from './pages/ProvaDetail/ProvaDetail';
import Programa from './pages/Programa/Programa';
import Contactos from './pages/Contactos/Contactos';
import Cancioneiro from './pages/Cancioneiro/Cancioneiro';
import CancaoDetail from './pages/CancaoDetail/CancaoDetail';
import FloatingBtn from './components/FloatingBtn/FloatingBtn';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header />
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
        <Route path="/recursos/*" element={<UnderConstruction />} />
        <Route path="/links" element={<UnderConstruction />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <FloatingBtn />
    </BrowserRouter>
  );
}
