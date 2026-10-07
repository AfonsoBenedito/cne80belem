// Alcateia 16 — Programa 2004/05.
// Fonte:
//   T3: Programa 3º trimestre 04-05.pdf
export default {
  year: '2004/05',
  trimesters: [
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2005',
      year: 2005,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Jogos', 'Missa de Agrupamento'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Raid em Cacilhas'] },
              { day: 17, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 30, weekday: 'Sáb', events: ['Torre de Belém e Planetário'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 8, weekday: 'Dom', events: ['São Jorge'] }],
            [
              { day: 14, weekday: 'Sáb', events: ['Parque Aventura de Monsanto'] },
              { day: 15, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 21, weekday: 'Sáb', events: ['Preparação do Acampamento'] }],
            { merged: true, dayStart: 28, dayEnd: 29, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento'], highlight: true },
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Raid Vegetal', 'Missa de Agrupamento'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Parque das Nações'] }],
            [
              { day: 18, weekday: 'Sáb', events: ['Preparação da Vigília', 'Vigília'] },
              { day: 19, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 25, weekday: 'Sáb', events: ['Reunião Surpresa'] }],
          ],
        },
      ],
    },
  ],
};
