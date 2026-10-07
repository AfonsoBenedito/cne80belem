// Expedição 17 — Programa 2015/16.
// Fonte:
//   T1: 1º Trimestre.xlsx
//   T3: 3º Trimestre.xlsx
export default {
  year: '2015/16',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2015',
      year: 2015,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Abertura do Ano', 'Missa de Agrupamento'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Reunião na Base', 'Missa de Agrupamento'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Reunião na Base'] }],
            [{ day: 31, weekday: 'Sáb', events: ['EnCargos - Liceu Passos Manuel'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Jogo de Cidade "Treino Duro, Missão Fácil"', 'Cinema'] }],
            [{ day: 15, weekday: 'Dom', events: ['Dia de Núcleo 2015 - Tapada das Necessidades'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Reunião da Base', 'Limpeza da Sede', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Banco Alimentar Contra a Fome'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 12, weekday: 'Sáb', events: ['Prep. Acampamento de Natal', 'Reunião na Base'] }],
            { merged: true, dayStart: 18, dayEnd: 21, weekdayStart: 'Sex', weekdayEnd: 'Seg', events: ['ACANAT 2015'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2016',
      year: 2016,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Lx Aventura 2016'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            [{ day: 23, weekday: 'Sáb', events: ['S. Jorge 2016 - Vila Franca de Xira'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Limpeza da Sede'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Tarde na Sede'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Atividade de Ligação', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Promessas'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Bounce'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Jogos de Praia'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Aniversário de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Prep. Acamp. de Verão'] }],
          ],
        },
      ],
    },
  ],
};
