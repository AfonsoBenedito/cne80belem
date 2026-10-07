// Clã 72 — Programa 2007/08.
// Fonte:
//   T2: 2º TRIMESTRE 2007_clã.doc
export default {
  year: '2007/08',
  trimesters: [
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2008',
      year: 2008,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta de Freguesia', 'Preparação do Programa do 2º Trimestre', 'Sessão de Provas para a Promessa'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Preparação do IX Fescut 2008', 'Preparação da Caminhada 2008', 'Sessão de Provas para a Promessa'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Revisão do Material da Secção'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Preparação do ACAGRUP 2008'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 5, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP 2008 - Cadaval, Quinta de Santo António'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['Realização da "Partida" de Elementos que saíram do Clã'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Preparação da Velada de Armas', 'Velada de Armas'] },
              { day: 17, weekday: 'Dom', events: ['Missa de Agrupamento - Promessas'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta de Freguesia', 'Preparação do IX Fescut 2008', 'Preparação da Caminhada 2008'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Atividade de Rapel em Monsanto'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Café Concerto'] }],
            [
              { day: 15, weekday: 'Sáb', events: ['Hike BTT em Sintra'] },
              { day: 16, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
          ],
        },
      ],
    },
  ],
};
