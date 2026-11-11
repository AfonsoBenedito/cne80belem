import { areas } from '../../provasShared';

export default {
  title: 'Áreas e Trilhos',
  // The Caderno de Pista III asks "Já conheces as Áreas e os Trilhos que terás que escolher na
  // tua etapa de Conhecimento?". From the Caderno de Pista III (the etapas, one trilho of each
  // area in each, the Equipa validating a trilho, the Conselho de Guias the etapa, the
  // especialidades, the Local de Acampamento and its anilha) and the Manual do Dirigente (the
  // areas and trilhos, B.2; the negociação)
  sections: [
    { heading: 'Seis áreas, dezoito trilhos', ...areas },
    {
      heading: 'As etapas',
      text: 'O progresso do pioneiro começa no **Desprendimento**, a etapa de quem chega, que não deve passar dos sete meses e prepara a Promessa. Depois da Promessa vêm três etapas: o **Conhecimento**, a **Vontade** e a **Construção**.\n\nEm cada uma, o pioneiro escolhe um trilho de cada área, seis ao todo, diferentes dos das etapas anteriores. Quando completa a Construção, já percorreu os dezoito trilhos: chegou ao fim do seu caminho, o **Local de Acampamento**, e recebe a anilha de mérito.\n\nNo início de cada etapa, a insígnia de progresso ganha uma peça.',
    },
    { media: 'progresso' },
    {
      heading: 'Escolher e validar os trilhos',
      numbered: true,
      steps: [
        { title: 'Escolher', text: 'Em cada etapa, o pioneiro escolhe, com a ajuda da Equipa de Animação, um trilho de cada área: é a negociação. Deve escolher o que o faz crescer, e não o que já faz com facilidade.' },
        { title: 'Viver', text: 'Para cada trilho, define ações concretas, as oportunidades educativas, que vive dentro e fora das atividades, na família e na comunidade. Uma especialidade também pode ser uma oportunidade para progredir num trilho.' },
        { title: 'Validar o trilho', text: 'Sempre que conclui um trilho, o pioneiro apresenta‑o na reunião de Equipa, que o valida.' },
        { title: 'Validar a etapa', text: 'Completados os seis trilhos da etapa, o Conselho de Guias valida‑a.' },
      ],
    },
  ],
};
