// The uniforms, badges and progresso insígnias shown in the prova "Uniforme e distintivos dos dirigentes"
// (the CNE's own posters and badge scans)
import fardaLobitos from '../assets/images/distintivos/farda-lobitos.png';
import fardaExploradores from '../assets/images/distintivos/farda-exploradores.jpg';
import fardaPioneiros from '../assets/images/distintivos/farda-pioneiros.png';
import fardaCaminheiros from '../assets/images/distintivos/farda-caminheiros.jpg';
import uniformeDirigentes from '../assets/images/distintivos/uniforme-dirigentes.jpg';
import dirigentesTabela from '../assets/images/distintivos/dirigentes.png';
import guiaBando from '../assets/images/distintivos/funcao/guia-bando.jpg';
import subguiaBando from '../assets/images/distintivos/funcao/subguia-bando.jpg';
import guiaPatrulha from '../assets/images/distintivos/funcao/guia-patrulha.jpg';
import subguiaPatrulha from '../assets/images/distintivos/funcao/subguia-patrulha.jpg';
import guiaEquipa from '../assets/images/distintivos/funcao/guia-equipa.jpg';
import subguiaEquipa from '../assets/images/distintivos/funcao/subguia-equipa.jpg';
import secretario from '../assets/images/distintivos/funcao/secretario.jpg';
import tesoureiro from '../assets/images/distintivos/funcao/tesoureiro.jpg';
import guardaMaterial from '../assets/images/distintivos/funcao/guarda-material.jpg';
import cozinheiro from '../assets/images/distintivos/funcao/cozinheiro.jpg';
import socorrista from '../assets/images/distintivos/funcao/socorrista.jpg';
import animador from '../assets/images/distintivos/funcao/animador.jpg';
import relacoesPublicas from '../assets/images/distintivos/funcao/relacoes-publicas.jpg';

// w × h of each file, so the two posters can share one height before they load
export const uniformes = {
  lobitos: { src: fardaLobitos, w: 700, h: 920, alt: 'Uniforme dos Lobitos, com o lugar de cada insígnia e distintivo' },
  exploradores: { src: fardaExploradores, w: 679, h: 960, alt: 'Uniforme dos Exploradores, com o lugar de cada insígnia e distintivo' },
  pioneiros: { src: fardaPioneiros, w: 700, h: 920, alt: 'Uniforme dos Pioneiros, com o lugar de cada insígnia e distintivo' },
  caminheiros: { src: fardaCaminheiros, w: 679, h: 960, alt: 'Uniforme dos Caminheiros, com o lugar de cada insígnia e distintivo' },
};

export const uniformeDirigentesImg = { src: uniformeDirigentes, w: 700, h: 920, alt: 'Uniforme dos dirigentes, com o lugar de cada insígnia e distintivo' };

// The CNE's table of the dirigentes' distintivos, the same for every secção
export const dirigentesImg = {
  src: dirigentesTabela,
  w: 2392,
  h: 1672,
  alt: 'Tabela dos distintivos dos dirigentes. Um losango pelo nível: verde para a Secção, vermelho para o Agrupamento, amarelo para o Núcleo, roxo para a Região e branco para o Nacional. Uma cruz pela função: a Cruz de Cristo para os Chefes de Unidade, Agrupamento, Núcleo, Região e Nacional e os seus Adjuntos; a Cruz de Jerusalém para os Secretários e Tesoureiros; a Cruz Flor-de-Lisada para os Assistentes.',
};

// The Guia's and Sub-Guia's fitas on the pocket; the Caminheiros use the Pioneiros' (blue) ones
const guias = {
  lobitos: [{ name: 'Guia de Bando', src: guiaBando }, { name: 'Sub-Guia de Bando', src: subguiaBando }],
  exploradores: [{ name: 'Guia de Patrulha', src: guiaPatrulha }, { name: 'Sub-Guia de Patrulha', src: subguiaPatrulha }],
  pioneiros: [{ name: 'Guia de Equipa', src: guiaEquipa }, { name: 'Sub-Guia de Equipa', src: subguiaEquipa }],
  caminheiros: [{ name: 'Guia de Tribo', src: guiaEquipa }, { name: 'Sub-Guia de Tribo', src: subguiaEquipa }],
};

const cargos = [
  { name: 'Secretário', src: secretario },
  { name: 'Tesoureiro', src: tesoureiro },
  { name: 'Guarda-Material', src: guardaMaterial },
  { name: 'Cozinheiro', src: cozinheiro },
  { name: 'Socorrista', src: socorrista },
  { name: 'Animador', src: animador },
  { name: 'Relações Públicas', src: relacoesPublicas },
];

const files = import.meta.glob('../assets/images/distintivos/{promessa,seccoes,noites}/*.{jpg,png}', { eager: true, import: 'default' });
const file = (path) => files[`../assets/images/distintivos/${path}`];

// The badge grids, by `media` name, each a list of { name, src } for the open secção (a badge
// with no name is one the heading already names)
export const badges = {
  // The Lobitos have their own; every other secção has the CNE's
  promessa: (seccao) => [{ name: null, src: file(seccao === 'lobitos' ? 'promessa/lobitos.jpg' : 'promessa/cne.jpg') }],
  // All four, wherever it's open
  seccoes: () => ['lobitos', 'exploradores', 'pioneiros', 'caminheiros'].map((s) => ({
    name: { lobitos: 'Lobitos', exploradores: 'Exploradores', pioneiros: 'Pioneiros', caminheiros: 'Caminheiros' }[s],
    src: file(`seccoes/${s}.png`),
  })),
  // Guia and Sub-Guia first, then the cargos
  funcoes: (seccao) => [...guias[seccao], ...cargos],
  noites: () => [25, 50, 75, 100, 200].map((n) => ({ name: `${n} noites`, src: file(`noites/${n}.jpg`) })),
};

// The progresso insígnia is one round badge built a piece per etapa: the centre, then three
// segments, until it is whole (the CNE's 1, 2A, 3A, 4A and 4B files)
const progressoFiles = import.meta.glob('../assets/images/distintivos/progresso/*.png', { eager: true, import: 'default' });
const progressoImg = (name) => progressoFiles[`../assets/images/distintivos/progresso/${name}.png`];

const etapas = {
  lobitos: ['Pata Tenra', 'Lobo Valente', 'Lobo Cortês', 'Lobo Amigo'],
  exploradores: ['Apelo', 'Aliança', 'Rumo', 'Descoberta'],
  pioneiros: ['Desprendimento', 'Conhecimento', 'Vontade', 'Construção'],
  caminheiros: ['Caminho', 'Comunidade', 'Serviço', 'Partida'],
};

export const progresso = (seccao) => ({
  etapas: etapas[seccao].map((name, i) => ({ name, src: progressoImg(`${seccao}-${i + 1}`) })),
  completa: progressoImg(`${seccao}-completa`),
});
