import lobitosImg from '../assets/images/sections/lobitos.png';
import exploradoresImg from '../assets/images/sections/exploradores.png';
import pioneirosImg from '../assets/images/sections/pioneiros.png';
import caminheirosImg from '../assets/images/sections/caminheiros.jpg';

import diogoCardosoImg from '../assets/images/members/diogo_cardoso.jpg';
import cocasImg from '../assets/images/members/cocas.jpg';
import bernardoSantosImg from '../assets/images/members/bernardo_santos.jpg';
import joseFerreiraImg from '../assets/images/members/jose_ferreira.jpg';
import marcoSilveiraImg from '../assets/images/members/marco_silveira.jpg';
import samuelSimaoImg from '../assets/images/members/samuel_simao.jpg';

export const sectionBadges = {
  lobitos: lobitosImg,
  exploradores: exploradoresImg,
  pioneiros: pioneirosImg,
  caminheiros: caminheirosImg,
};

// ── Direção ──
export const direcao = [
  {
    name: 'Marco Silveira',
    role: 'Chefe de Agrupamento',
    birthDate: '01 de Fevereiro de 1980',
    memberSince: '1992',
    photo: marcoSilveiraImg,
  },
  {
    name: 'Diogo Cardoso',
    role: 'Chefe de Agrupamento Adjunto',
    birthDate: '28 de Julho de 1986',
    memberSince: '1992',
    photo: diogoCardosoImg,
  },
  {
    name: 'Paulo "Cocas" Couceiro',
    role: 'Tesoureiro de Agrupamento',
    birthDate: '25 de Dezembro de 0000',
    memberSince: '5 d.c.',
    photo: cocasImg,
  },
  {
    name: 'Bernardo Santos',
    role: 'Secretário de Agrupamento',
    birthDate: '01 de Maio de 1980',
    memberSince: '2002',
    photo: bernardoSantosImg,
  },
  {
    name: 'Cón. José Manuel Ferreira',
    role: 'Assistente de Agrupamento',
    birthDate: '20 de Julho de 1953',
    memberSince: '1994',
    photo: joseFerreiraImg,
  },
];

// ── Chefes de Secção ──
export const chefesSecao = [
  { name: 'Diogo Cardoso', section: 'lobitos', photo: diogoCardosoImg },
  { name: 'Samuel Simão', section: 'exploradores', photo: samuelSimaoImg },
  { name: 'Marco Silveira', section: 'pioneiros', photo: marcoSilveiraImg },
  { name: 'Beatriz Costa', section: 'caminheiros' },
];

// ── Dirigentes e Animadores ──
// section: 'lobitos' | 'exploradores' | 'pioneiros' | 'caminheiros'
// role: 'Dirigente' | 'Animador'
export const dirigentes = [
  { name: 'Diogo Cardoso', section: 'lobitos', photo: diogoCardosoImg },
  { name: 'Bernardo Santos', section: 'lobitos', photo: bernardoSantosImg },
  { name: 'Paulo "Cocas" Couceiro', section: 'lobitos', photo: cocasImg },
  { name: 'André Milheiro', section: 'lobitos' },
  { name: 'Isaura Neves', section: 'lobitos' },
  { name: 'Samuel Simão', section: 'exploradores', photo: samuelSimaoImg },
  { name: 'João Borges', section: 'exploradores' },
  { name: 'Inês Pinto', section: 'exploradores' },
  { name: 'Sara Chalante', section: 'exploradores' },
  { name: 'Marco Silveira', section: 'pioneiros', photo: marcoSilveiraImg },
  { name: 'Afonso Benedito', section: 'pioneiros' },
  { name: 'João Carvalhosa', section: 'pioneiros' },
  { name: 'Daniel Roque', section: 'pioneiros' },
];
