// Alcateia 16 — Programa 2015/16.
// Fonte:
//   T1: LOB - Relatório Atividades 2015-2016.pdf (quadro de atividades)
//   T2: LOB - Relatório Atividades 2015-2016.pdf (quadro de atividades)
//   T3: LOB - Relatório Atividades 2015-2016.pdf (quadro de atividades)
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
            [{ day: 10, weekday: 'Sáb', events: ['Abertura do Ano'] }],
            { merged: true, dayStart: 31, dayEnd: 1, monthEnd: 11, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Aguarela 2015 - Liceu Passos Manuel'], highlight: true, subtitle: '(Só para Guias e Sub-Guias)' },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 7, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['1.º Acampamento - Bataria da Lage'], highlight: true },
            [{ day: 15, weekday: 'Dom', events: ['Dia de Núcleo'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            { merged: true, dayStart: 18, dayEnd: 20, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acantonamento de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2016',
      year: 2016,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 23, weekday: 'Sáb', events: ['Atividade com os Caminheiros - Monsanto'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 7, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Carnaval - Janas'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP 2016 - Ferreira do Zêzere'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2016',
      year: 2016,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 23, weekday: 'Sáb', events: ['São Jorge - Vila Franca de Xira'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Cinema Livro da Selva - Miraflores'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Preparação da Caçada a Assis', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 9, dayEnd: 10, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade de Verão - Quinta da Marinha'], highlight: true },
            { merged: true, dayStart: 16, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Sáb', events: ['III Caçada a Assis - Assis, Itália'], highlight: true },
          ],
        },
      ],
    },
  ],
};
