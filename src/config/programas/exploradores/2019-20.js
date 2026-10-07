// Expedição 17 — Programa 2019/20.
// Fonte:
//   T1: Programa EXP 2019-2020.xlsx (folha EXP T1 2019-2020)
//   T2: Programa EXP 2019-2020.xlsx (folha EXP T2 2019-2020)
export default {
  year: '2019/20',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Setembro a Dezembro 2019',
      year: 2019,
      months: [
        {
          name: 'Setembro',
          month: 9,
          weeks: [
            [{ day: 28, weekday: 'Sáb', events: ['Abertura do Ano', 'Apresentação das EA\'s', 'Passagens de Secção'] }],
          ],
        },
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [
              { day: 5, weekday: 'Sáb', events: ['Jogos Cargos'] },
              { day: 6, weekday: 'Dom', events: ['Venda de calendários'] },
            ],
            [{ day: 12, weekday: 'Sáb', events: ['Cargos e Imaginário'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Calendário', 'Reunião de Pais', 'Investidura de Guias', 'Missa'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [
              { day: 1, weekday: 'Sex', events: ['Visualização do Filme de Ficção'] },
              { day: 2, weekday: 'Sáb', events: ['Dinâmicas sobre o Imaginário', 'Raid'] },
            ],
            { merged: true, dayStart: 9, dayEnd: 10, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade de Guias de Núcleo', 'Dia de Núcleo'], highlight: true },
            [{ day: 16, weekday: 'Sáb', events: ['Jamor - Raid no Jamor', 'Missa', 'Atividade de Guias'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 1, weekday: 'Dom', events: ['Banco Alimentar'] }],
            [{ day: 7, weekday: 'Sáb', events: ['Preparação do Acampamento'] }],
            { merged: true, dayStart: 14, dayEnd: 15, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2020',
      year: 2020,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 18, weekday: 'Sáb', events: ['Missa de Agrupamento', 'Ceia de Reis'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Jamor - Raid de Pistas'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Cinemateca'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Preparação do Acampamento de Carnaval', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 22, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Carnaval'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Atividade com os Marítimos'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Jogo do Cluedo ou Atividade de Pioneirismo'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Preparação do Acampamento', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 28, dayEnd: 29, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Páscoa', 'Promessas'], highlight: true },
          ],
        },
      ],
    },
  ],
};
