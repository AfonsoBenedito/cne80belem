// Alcateia 16 — Programa 2012/13.
// Fonte:
//   T1: Atividades Alcateia 2012-2013.pdf (relatório: principais atividades realizadas)
//   T2: Atividades Alcateia 2012-2013.pdf (relatório: principais atividades realizadas)
//   T3: Atividades Alcateia 2012-2013.pdf (relatório: principais atividades realizadas)
export default {
  year: '2012/13',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2012',
      year: 2012,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Abertura do Ano'] }],
            { merged: true, dayStart: 27, dayEnd: 28, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Aguarela - Formação de Guias'], highlight: true, subtitle: '(Só para Guias e Sub-Guias)' },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['1.ª Noite de Campo - APIA'], highlight: true },
            [{ day: 11, weekday: 'Dom', events: ['Dia de Núcleo'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 2, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Bandos - Virtudes - Azambuja'], highlight: true },
            { merged: true, dayStart: 13, dayEnd: 17, weekdayStart: 'Qui', weekdayEnd: 'Seg', events: ['Acampamento de Natal - Évora'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Fevereiro a Março 2013',
      year: 2013,
      months: [
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Construção da Horta'] }],
            { merged: true, dayStart: 9, dayEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acantonamento de Carnaval - Apostiça'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Jogo de Pista - Monsanto'] }],
            { merged: true, dayStart: 23, dayEnd: 26, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Agrupamento - Quinta do Gaio de Baixo'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2013',
      year: 2013,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 7, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Pais - Santa Cruz'], highlight: true },
            [{ day: 28, weekday: 'Dom', events: ['São Jorge - Odivelas'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Festa do Sol - Monsanto'] }],
            { merged: true, dayStart: 29, dayEnd: 30, weekdayStart: 'Qua', weekdayEnd: 'Qui', events: ['Acampamento Técnico - PNEC'], highlight: true },
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 2, weekday: 'Dom', events: ['Banco Alimentar'] }],
            { merged: true, dayStart: 30, dayEnd: 7, monthEnd: 7, weekdayStart: 'Dom', weekdayEnd: 'Dom', events: ['Acampamento de Verão - Vila Nova do Ceira'], highlight: true },
          ],
        },
      ],
    },
  ],
};
