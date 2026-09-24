import lobitosImg from '../assets/images/sections/lobitos.png';
import exploradoresImg from '../assets/images/sections/exploradores.png';
import pioneirosImg from '../assets/images/sections/pioneiros.png';
import caminheirosImg from '../assets/images/sections/caminheiros.jpg';
import lobitosGroup from '../assets/images/sections/lobitos-group.jpg';
import exploradoresGroup from '../assets/images/sections/exploradores-group.png';
import pioneirosGroup from '../assets/images/sections/pioneiros-group.jpeg';

// color: identity (borders, decorative icons). surface/onSurface: any fill that carries text.
// ink: section-coloured text on white or light tints. Pairs are checked for WCAG AA (4.5:1).
// ageMin/ageMax repeat the ages in `description` as data (Home's age ladder); keep both in sync.
export const seccoes = {
  lobitos: {
    key: 'lobitos',
    label: 'I Secção - Lobitos',
    ageMin: 6,
    ageMax: 10,
    tagline: 'Aprendem através do jogo e vivem aventuras em bando.',
    color: '#f6db7e',
    surface: '#f6db7e',
    onSurface: '#564d2c',
    ink: '#807242',
    image: lobitosImg,
    groupPhoto: lobitosGroup,
    description:
      'Os Lobitos são os mais novos do Agrupamento, com idades entre os 6 e os 10 anos. Vivem aventuras em bando, aprendem através do jogo e descobrem o mundo à sua volta com curiosidade e entusiasmo. Cada atividade é uma oportunidade para crescer, partilhar e construir amizades que duram para sempre.',
    quote: {
      text: 'Ser Lobito é aprender em jogo, crescer e viver em bando. É aprender fazendo, e ao fazê-lo, descobrir o verdadeiro significado de ser sempre melhor.',
      author: 'Baden Powell',
    },
  },
  exploradores: {
    key: 'exploradores',
    label: 'II Secção - Exploradores',
    ageMin: 10,
    ageMax: 14,
    tagline: 'Vivem o escutismo em patrulha e superam desafios na natureza.',
    color: '#549b8b',
    surface: '#42796c',
    onSurface: '#ffffff',
    ink: '#42796c',
    image: exploradoresImg,
    groupPhoto: exploradoresGroup,
    description:
      'Os Exploradores têm entre 10 e 14 anos e vivem o Escutismo em patrulha. Aprendem a trabalhar em equipa, a liderar e a superar desafios na natureza. Através de acampamentos, caminhadas e provas de competência, desenvolvem autonomia, responsabilidade e espírito de entreajuda.',
    quote: {
      text: 'O Sistema de Patrulhas é o principal motor do Escutismo, permitindo a cada Escuteiro encontrar o seu lugar entre os outros.',
      author: 'Baden Powell',
    },
  },
  pioneiros: {
    key: 'pioneiros',
    label: 'III Secção - Pioneiros',
    ageMin: 14,
    ageMax: 17,
    tagline: 'Planificam os seus próprios projetos e assumem responsabilidades.',
    color: '#217a9a',
    surface: '#217a9a',
    onSurface: '#ffffff',
    ink: '#207695',
    image: pioneirosImg,
    groupPhoto: pioneirosGroup,
    description:
      'Os Pioneiros, com idades entre os 14 e os 17 anos, vivem uma etapa de descoberta pessoal e compromisso comunitário. Planificam e executam os seus próprios projetos, desenvolvem competências de liderança e assumem responsabilidades crescentes. A aventura é o caminho para o serviço ao próximo.',
    quote: {
      text: 'O melhor meio para alcançar a felicidade é contribuir para a felicidade dos outros.',
      author: 'Baden Powell',
    },
  },
  caminheiros: {
    key: 'caminheiros',
    label: 'IV Secção - Caminheiros',
    ageMin: 17,
    ageMax: 22,
    tagline: 'Vivem o escutismo como serviço à comunidade e ao mundo.',
    color: '#ec4c4b',
    surface: '#c43f3e',
    onSurface: '#ffffff',
    ink: '#c43f3e',
    image: caminheirosImg,
    description:
      'Os Caminheiros são os mais velhos do Agrupamento, com idades entre os 17 e os 22 anos. Vivem o Escutismo como um compromisso de serviço à comunidade e ao mundo. Através de projetos de voluntariado, viagens e reflexão, preparam-se para serem cidadãos ativos e construtores de um mundo melhor.',
    quote: {
      text: 'Os Caminheiros formam uma fraternidade do Ar Livre para Servir.',
      author: 'Baden Powell',
    },
  },
};
