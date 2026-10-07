// Alcateia 16 — Programa 2011/12.
// Fonte:
//   T1: 1ª Dentada_ 2011-2012.pdf
export default {
  year: '2011/12',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2011',
      year: 2011,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Abertura do Ano Escutista'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Introdução à Caçada - Praia da Torre'] }],
            [{ day: 16, weekday: 'Dom', events: ['Apresentação e Escolha dos Projetos'] }],
            { merged: true, dayStart: 22, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acantonamento'], highlight: true },
            [{ day: 29, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Atelier de Cozinha e Prep. do Acampamento'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 5, dayEnd: 6, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento'], highlight: true },
            [{ day: 13, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            { merged: true, dayStart: 19, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Aguarela'], highlight: true, subtitle: '(Só para Guias e Sub-Guias)' },
            [
              { day: 26, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Prep. do Acampamento'] },
              { day: 27, weekday: 'Dom', events: ['Banco Alimentar'] },
            ],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 4, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['Acampamento de Natal'], highlight: true },
            [{ day: 10, weekday: 'Sáb', events: ['Ter Vontade de Trabalhar'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Ser Amigo - Campanha de Solidariedade'] }],
          ],
        },
      ],
    },
  ],
};
