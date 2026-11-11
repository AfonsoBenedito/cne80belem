import { areas } from '../../provasShared';

export default {
  title: 'Áreas de Desenvolvimento e Trilhos da etapa da Aliança',
  // The Caderno de Pista II asks "Já conheces as áreas de desenvolvimento e os trilhos que terás
  // de escolher para a tua etapa da Aliança?". From the Caderno de Pista II (the etapas, the
  // Patrulha validating a trilho, the Conselho de Guias the etapa, the insígnias on the sleeve,
  // the anilha) and the Manual do Dirigente (the areas and trilhos, B.2; the negociação, the
  // oportunidades educativas and the especialidades, in its Expedição's Sistema de Progresso)
  sections: [
    { heading: 'Seis áreas, dezoito trilhos', ...areas },
    {
      heading: 'As etapas',
      // The Caderno's own drawing of the progress as a trail, beside the etapas (S. Tiago's float)
      media: 'jogoDePista',
      mediaFirst: true,
      wrap: true,
      text: 'O progresso do explorador é um **jogo de pista**. Começa no **Apelo**, a etapa de quem chega, que dura cerca de cinco meses e prepara a Promessa. Depois da Promessa vêm três etapas: a **Aliança**, o **Rumo** e a **Descoberta**.\n\nEm cada uma, o explorador escolhe um trilho de cada área, seis ao todo, diferentes dos das etapas anteriores. Quando completa a Descoberta, já percorreu os dezoito trilhos e chegou ao fim da pista, o **Local de Acampamento**, e o Conselho de Guias pode atribuir‑lhe a anilha de mérito.\n\nNo início de cada etapa, a insígnia de progresso ganha uma peça. Usa‑se na manga esquerda da camisa, pela ordem Apelo, Aliança, Rumo e Descoberta.',
    },
    // The insígnia piece by piece, on its own: beside a text its etapas' names broke ("Ali-ança")
    { media: 'progresso' },
    {
      heading: 'Escolher e validar os trilhos',
      numbered: true,
      steps: [
        { title: 'Escolher', text: 'Em cada etapa, o explorador escolhe, com a ajuda da Equipa de Animação, um trilho de cada área: é a negociação. Deve escolher o que o faz crescer, e não o que já faz com facilidade.' },
        { title: 'Viver', text: 'Para cada trilho, define ações concretas, as oportunidades educativas, que vive dentro e fora das atividades. Uma especialidade também pode ser uma oportunidade para progredir num trilho.' },
        { title: 'Validar o trilho', text: 'Quando acha que já tem as atitudes que o trilho pede, fala com a sua Patrulha, que o valida.' },
        { title: 'Validar a etapa', text: 'Completados os seis trilhos da etapa, o Conselho de Guias valida‑a.' },
      ],
    },
  ],
};
