// Alcateia 16 — Programa 2010/11.
// Fonte:
//   T3: Programa 3º Trimestre - Alcateia 16.pdf
export default {
  year: '2010/11',
  trimesters: [
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2011',
      year: 2011,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 30, weekday: 'Sáb', events: ['Distribuição de Boletim'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 8, weekday: 'Dom', events: ['São Jorge'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Quinta Pedagógica', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 27, dayEnd: 29, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento de Pais'], highlight: true },
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Preparação de Acampamento'] }],
            { merged: true, dayStart: 11, dayEnd: 13, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Acampamento'], highlight: true },
            [
              { day: 18, weekday: 'Sáb', events: ['Vigília'] },
              { day: 19, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 25, weekday: 'Sáb', events: ['Distribuição Boletim JF', 'Preparação de Acampamento'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Sex', events: ['Acampamento Verão'], highlight: true },
          ],
        },
      ],
    },
  ],
};
