// Comunidade 9 — Programa 2017/18.
// Fonte:
//   T1: Comunidade 9 - Programa (2017-2018).xlsx (folha Programa T1 2017-2018)
//   T2: 03 PIO Relatório Atividades 2017-2018.docx
//   T3: Comunidade 9 - Programa (2017-2018).xlsx (folha Programa T3 2017-2018, quase vazia); ACAREG: 03 PIO Relatório Atividades 2017-2018.docx
export default {
  year: '2017/18',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2017',
      year: 2017,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Abertura do Ano', 'Missa', 'Crismas'] }],
            [
              { day: 14, weekday: 'Sáb', events: ['Formação de Equipas', 'Planificação do trimestre', 'Missa de Agrupamento'] },
              { day: 15, weekday: 'Dom', events: ['Maratona'] },
            ],
            [{ day: 21, weekday: 'Sáb', events: ['Planificação do trimestre', 'Investidura de Guias', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Venda de Calendário'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [
              { day: 11, weekday: 'Sáb', events: ['101% Azul'] },
              { day: 12, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            [{ day: 18, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [
              { day: 2, weekday: 'Sáb', events: ['Banco Alimentar'] },
              { day: 3, weekday: 'Dom', events: ['Banco Alimentar'] },
            ],
            { merged: true, dayStart: 16, dayEnd: 17, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acanatal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Fevereiro a Março 2018',
      year: 2018,
      months: [
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 10, dayEnd: 13, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Carnaval - Pedra Amarela - Sintra'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Team Building - Alfeite'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Retiro'] }],
            { merged: true, dayStart: 27, dayEnd: 30, weekdayStart: 'Ter', weekdayEnd: 'Sex', events: ['ACAGRUP'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2018',
      year: 2018,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 14, weekday: 'Sáb', events: ['Atividade Núcleo'] }],
            [{ day: 22, weekday: 'Dom', events: ['S. Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Atividade de Ligação'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [
              { day: 2, weekday: 'Sáb', events: ['Banco Alimentar'] },
              { day: 3, weekday: 'Dom', events: ['Banco Alimentar'] },
            ],
            [
              { day: 16, weekday: 'Sáb', events: ['Aniversário'] },
              { day: 17, weekday: 'Dom', events: ['Promessas'] },
            ],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 31, dayEnd: 6, monthEnd: 8, weekdayStart: 'Ter', weekdayEnd: 'Seg', events: ['ACAREG'], highlight: true },
          ],
        },
      ],
    },
  ],
};
