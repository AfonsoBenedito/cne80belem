// The uniforms, badges and progresso insígnias shown in the prova "Uniforme e distintivos dos dirigentes"
// (the CNE's own posters and badge scans)
import fardaLobitos from '../assets/images/distintivos/farda-lobitos.png';
import fardaExploradores from '../assets/images/distintivos/farda-exploradores.jpg';
import fardaPioneiros from '../assets/images/distintivos/farda-pioneiros.png';
import fardaCaminheiros from '../assets/images/distintivos/farda-caminheiros.jpg';
import uniformeDirigentes from '../assets/images/distintivos/uniforme-dirigentes.jpg';
import cruzCristo from '../assets/images/distintivos/cruzes/cruz-de-cristo.png';
import cruzJerusalem from '../assets/images/distintivos/cruzes/cruz-de-jerusalem.png';
import cruzFlorDeLisada from '../assets/images/distintivos/cruzes/cruz-flor-de-lisada.png';
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
import sfPatrono from '../assets/images/provas/sao-francisco/patrono.jpg';
import sfCrianca from '../assets/images/provas/sao-francisco/crianca.jpg';
import sfLobo from '../assets/images/provas/sao-francisco/lobo-de-gubio.jpg';

// w × h of each file, so the two posters can share one height before they load
export const uniformes = {
  lobitos: { src: fardaLobitos, w: 700, h: 920, alt: 'Uniforme dos Lobitos, com o lugar de cada insígnia e distintivo' },
  exploradores: { src: fardaExploradores, w: 679, h: 960, alt: 'Uniforme dos Exploradores, com o lugar de cada insígnia e distintivo' },
  pioneiros: { src: fardaPioneiros, w: 700, h: 920, alt: 'Uniforme dos Pioneiros, com o lugar de cada insígnia e distintivo' },
  caminheiros: { src: fardaCaminheiros, w: 679, h: 960, alt: 'Uniforme dos Caminheiros, com o lugar de cada insígnia e distintivo' },
};

export const uniformeDirigentesImg = { src: uniformeDirigentes, w: 700, h: 920, alt: 'Uniforme dos dirigentes, com o lugar de cada insígnia e distintivo' };

// The dirigentes' distintivos, from the CNE's table: a losango whose colour says the level, and a
// cross that says the função. The colours are the table's own
export const dirigentes = {
  niveis: [
    { name: 'Secção', color: '#21af5a' },
    { name: 'Agrupamento', color: '#fb1c19' },
    { name: 'Núcleo', color: '#ffff4c' },
    { name: 'Região', color: '#6e329b' },
    { name: 'Nacional', color: '#ffffff' },
  ],
  cruzes: [
    { name: 'Cruz de Cristo', who: 'Chefes de Unidade, Agrupamento, Núcleo, Região e Nacional, e Adjuntos', src: cruzCristo },
    { name: 'Cruz de Jerusalém', who: 'Secretários e Tesoureiros', src: cruzJerusalem },
    { name: 'Cruz Flor-de-Lisada', who: 'Assistentes', src: cruzFlorDeLisada },
  ],
};

// The Guia's and Sub-Guia's fitas on the pocket; the Caminheiros use the Pioneiros' (blue) ones
const guias = {
  lobitos: [{ name: 'Guia de Bando', src: guiaBando }, { name: 'Sub-Guia de Bando', src: subguiaBando }],
  exploradores: [{ name: 'Guia de Patrulha', src: guiaPatrulha }, { name: 'Sub-Guia de Patrulha', src: subguiaPatrulha }],
  pioneiros: [{ name: 'Guia de Equipa', src: guiaEquipa }, { name: 'Sub-Guia de Equipa', src: subguiaEquipa }],
  caminheiros: [{ name: 'Guia de Tribo', src: guiaEquipa }, { name: 'Sub-Guia de Tribo', src: subguiaEquipa }],
};

const cargos = [
  { name: 'Secretário', slug: 'secretario', src: secretario },
  { name: 'Tesoureiro', slug: 'tesoureiro', src: tesoureiro },
  { name: 'Guarda-Material', slug: 'guarda-material', src: guardaMaterial },
  { name: 'Cozinheiro', slug: 'cozinheiro', src: cozinheiro },
  { name: 'Socorrista', slug: 'socorrista', src: socorrista },
  { name: 'Animador', slug: 'animador', src: animador },
  { name: 'Relações Públicas', slug: 'relacoes-publicas', src: relacoesPublicas },
];

const files = import.meta.glob('../assets/images/distintivos/{promessa,seccoes,noites,saudacao}/*.{jpg,png}', { eager: true, import: 'default' });
const file = (path) => files[`../assets/images/distintivos/${path}`];

// The saudação drawings ship as they are (no image pipeline), so their w × h are written here, as
// the posters' are: the page reserves each one's box before it loads, and the text beside a hand
// doesn't jump when it arrives. A test checks them against the files
const drawingSizes = {
  'sinal-sem-boina': [333, 305],
  'saudacao-com-boina': [353, 307],
  'saudacao-com-chapeu': [267, 335],
  'saudacao-com-vara': [221, 609],
  'posicao-descansar': [258, 449],
  'posicao-sentido': [162, 468],
  'sinal-mao': [194, 428],
  'sinal-lobito': [185, 376],
  'aperto-de-mao': [518, 225],
};
const drawing = (name) => {
  const [w, h] = drawingSizes[name];
  return { src: file(`saudacao/${name}.png`), w, h };
};

// The badge grids, by `media` name, each a list of { name, src } for the open secção. A badge
// with no name is one the heading already names, so it carries its own alt text; `group` starts
// a row of its own (the fitas apart from the cargos); `current` marks the open secção's own
export const badges = {
  // The Lobitos have their own; every other secção has the CNE's
  promessa: (seccao) => [seccao === 'lobitos'
    ? { name: null, src: file('promessa/lobitos.jpg'), alt: 'Insígnia de Promessa dos Lobitos: a cabeça de lobo, com o lema «Da melhor vontade»' }
    : { name: null, src: file('promessa/cne.jpg'), alt: 'Insígnia de Promessa do CNE: a flor de lis com a cruz, com o lema «Alerta»' }],
  // All four, wherever it's open
  seccoes: (seccao) => ['lobitos', 'exploradores', 'pioneiros', 'caminheiros'].map((s) => ({
    name: { lobitos: 'Lobitos', exploradores: 'Exploradores', pioneiros: 'Pioneiros', caminheiros: 'Caminheiros' }[s],
    src: file(`seccoes/${s}.png`),
    current: s === seccao,
  })),
  // Guia and Sub-Guia first, then the cargos
  funcoes: (seccao) => [
    ...guias[seccao].map((g) => ({ ...g, group: 'guias' })),
    ...cargos.map((c) => ({ ...c, group: 'cargos' })),
  ],
  // The Cargos prova: each badge alone, beside its cargo's text (the heading names it), at the
  // grid's badge size (`small`): the cargo scans are only 60px
  // The Lobitos' Manual de Adesão's drawings of S. Francisco de Assis, one beside each part of
  // his prova (`large`: set as drawings; `zoom: false`: 166–294px wide, so not opened in the
  // viewer, which would show them no bigger; w × h kept, as the saudação's)
  sfPatrono: () => [{ name: null, src: sfPatrono, w: 166, h: 378, large: true, zoom: false, alt: 'S. Francisco de Assis, em desenho: de hábito castanho, cordão à cintura e sandálias, com um passarinho na cabeça' }],
  sfCrianca: () => [{ name: null, src: sfCrianca, w: 294, h: 418, large: true, zoom: false, alt: 'Francisco em criança, em desenho: de braços abertos e a sorrir, com uma túnica castanha remendada' }],
  sfLobo: () => [{ name: null, src: sfLobo, w: 225, h: 225, large: true, zoom: false, alt: 'S. Francisco e o lobo de Gúbio, em desenho, lado a lado e de braços abertos' }],
  // The grid that opens the Cargos prova: every badge, each a link to its cargo below
  cargosIndex: (seccao) => [
    { ...guias[seccao][0], href: '#guia', group: 'guias' },
    { ...guias[seccao][1], href: '#subguia', group: 'guias' },
    ...cargos.map((c) => ({ name: c.name, src: c.src, href: `#cargo-${c.slug}`, group: 'cargos' })),
  ],
  guia: (seccao) => [{ src: guias[seccao][0].src, name: null, small: true, alt: `Insígnia de ${guias[seccao][0].name}` }],
  subguia: (seccao) => [{ src: guias[seccao][1].src, name: null, small: true, alt: `Insígnia de ${guias[seccao][1].name}` }],
  ...Object.fromEntries(cargos.map((c) => [`cargo-${c.slug}`, () => [{ src: c.src, name: null, small: true, alt: `Insígnia de ${c.name}` }]])),
  noites: () => [25, 50, 75, 100, 200].map((n) => ({ name: `${n} noites`, src: file(`noites/${n}.jpg`) })),
  // The CNE sheet "Saudações e o seu Simbolismo": its drawings, named by their own captions.
  // `large`: drawings of a whole scout, set taller than a badge; each `alt` says the gesture, as
  // the drawing shows it. The two positions are whole figures standing, under their own
  // `groupHeading`, set taller (`tall`) so a figure isn't a sliver in its tile
  saudacoes: () => [
    ['sinal-sem-boina', 'Sinal Escutista (sem bóina)', 'Um escuteiro de cabeça descoberta, com a mão direita levantada ao lado do ombro, a fazer o sinal escutista'],
    ['saudacao-com-boina', 'Saudação Escutista (com bóina)', 'Um escuteiro de bóina, com a mão direita levada à testa, a fazer o sinal escutista junto à bóina'],
    ['saudacao-com-chapeu', 'Saudação Escutista (com chapéu)', 'Um escuteiro de chapéu de abas, com a mão direita levantada junto à cara, a fazer o sinal escutista'],
    ['saudacao-com-vara', 'Saudação Escutista (com vara)', 'Um escuteiro de pé, com a vara ao seu lado direito e a mão esquerda à frente do corpo, à altura da cintura'],
  ].map(([f, name, alt]) => ({ name, alt, ...drawing(f), group: 'saudacoes', large: true }))
    .concat([
      ['posicao-descansar', 'Posição «Descansar»', 'Um escuteiro de pé, com as pernas afastadas e a vara inclinada para fora, segura com a mão direita'],
      ['posicao-sentido', 'Posição «Sentido»', 'Um escuteiro de pé, direito, com os pés juntos e a vara junto ao corpo, segura com a mão direita'],
    ].map(([f, name, alt]) => ({ name, alt, ...drawing(f), group: 'posicoes', groupHeading: 'Posições', large: true, tall: true }))),
  sinal: () => [{ name: null, ...drawing('sinal-mao'), large: true, alt: 'O sinal escutista: a mão direita levantada, com os três dedos do meio estendidos e o polegar sobre o mindinho' }],
  sinalLobito: () => [{ name: null, ...drawing('sinal-lobito'), large: true, alt: 'A saudação do lobito: a mão direita levantada, com o indicador e o médio abertos e o polegar sobre o anelar e o mindinho' }],
  aperto: () => [{ name: null, ...drawing('aperto-de-mao'), alt: 'O aperto de mão escutista: duas mãos esquerdas que se apertam' }],
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
