// Comunidade 9 — Programa 2000/01.
// Fonte:
//   T3: Programas 3º trimestre.doc (programa da secção; o documento tem também os programas das equipas Tubarão Branco e Beija-Flor)
export default {
  year: '2000/01',
  trimesters: [
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2001',
      year: 2001,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 21, weekday: 'Sáb', events: ['Apresentação dos programas'] }],
            [{ day: 28, weekday: 'Sáb', events: ['S. Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Aprovação do programa final'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Ateliers de orientação e primeiros socorros'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Raid topográfico em Sintra'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 25, weekday: 'Sex', events: ['Reunião com o Sr. Prior', 'Ateliers de pioneirismo e arranjo de canoas'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Preparação das promessas'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Reunião', 'Vigília'] },
              { day: 17, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['Gincana na praia', 'Ida ao teatro'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Preparação do empreendimento'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 9, dayEnd: 14, weekdayStart: 'Seg', weekdayEnd: 'Sáb', events: ['Empreendimento'], highlight: true },
          ],
        },
      ],
    },
  ],
};
