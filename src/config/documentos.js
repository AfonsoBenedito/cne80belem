import promessas26 from '../assets/files/promessas26.pdf';
import inscricao from '../assets/files/inscricao.pdf';
import cerimonialPromessas from '../assets/files/cerimonial_das_promessas.pdf';
import regulamentoInterno from '../assets/files/regulamento_interno.pdf';
import cancioneiro from '../assets/files/cancioneiro.pdf';

export const documentos = [
  {
    name: 'Regulamento Interno',
    file: regulamentoInterno,
  },
  {
    name: 'Ficha de Inscrição',
    file: inscricao,
  },
  {
    name: 'Cerimonial das Promessas',
    file: cerimonialPromessas,
  },
  {
    name: 'Cancioneiro',
    file: cancioneiro,
  },
  {
    name: 'Promessas 2026',
    file: promessas26,
    date: '2026',
  },
];
