// Expedição 17 — Programa 2004/05.
// Fonte:
//   T1: Programa 1º trimestre 2004-2005.doc
export default {
  year: '2004/05',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2004',
      year: 2004,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [
              { day: 16, weekday: 'Sáb', events: ['Ateliers', 'Jogo'] },
              { day: 17, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['Distribuição', 'Sessão Especial', 'Reunião de Pais'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Distribuição', 'Restelo Trophy'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Atividades de Formação', 'Missa'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Dia de Núcleo'] }],
            [
              { day: 27, weekday: 'Sáb', events: ['Atividades de sede'] },
              { day: 28, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Jogo de Cidade', 'Missa'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Preparação do Acampamento de Natal', 'Festa de Natal'] }],
            { merged: true, dayStart: 18, dayEnd: 21, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Natal'], highlight: true },
          ],
        },
      ],
    },
  ],
};
