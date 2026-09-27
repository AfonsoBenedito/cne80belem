import inscricao from '../assets/files/inscricao.pdf';
import inscricaoBytes from '../assets/files/inscricao.pdf?bytes';
import cerimonialPromessas from '../assets/files/cerimonial_das_promessas.pdf';
import cerimonialPromessasBytes from '../assets/files/cerimonial_das_promessas.pdf?bytes';
import regulamentoInterno from '../assets/files/regulamento_interno.pdf';
import regulamentoInternoBytes from '../assets/files/regulamento_interno.pdf?bytes';
import seguroEscutista from '../assets/files/seguro-escutista.pdf';
import seguroEscutistaBytes from '../assets/files/seguro-escutista.pdf?bytes';

// `bytes` comes from the file itself at build time (the ?bytes plugin in vite.config.js)
export const documentos = [
  {
    name: 'Regulamento Interno',
    file: regulamentoInterno,
    bytes: regulamentoInternoBytes,
  },
  {
    name: 'Ficha de Inscrição',
    file: inscricao,
    bytes: inscricaoBytes,
  },
  {
    name: 'Cerimonial das Promessas',
    file: cerimonialPromessas,
    bytes: cerimonialPromessasBytes,
  },
  {
    name: 'Seguro Escutista',
    file: seguroEscutista,
    bytes: seguroEscutistaBytes,
  },
];
