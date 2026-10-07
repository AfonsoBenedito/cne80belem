// Comunidade 9 — Programa 2020/21.
// Fonte:
//   T1: Relatório atividades PIO 9.docx (2020-2021)
//   T2: Relatório atividades PIO 9.docx (2020-2021)
//   T3: Relatório atividades PIO 9.docx (2020-2021)
export default {
  year: '2020/21',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2020',
      year: 2020,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 24, weekday: 'Sáb', events: ['Abertura do Ano Escutista'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Jogos de Confiança - Construção da Torre'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Orientação - Cascata em Sintra'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Comunicação - Equipas e Programa'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 6, weekday: 'Dom', events: ['Teambuilding'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Progresso'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Orientação'] }],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2021',
      year: 2021,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 10, weekday: 'Dom', events: ['Equipa e Programa'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Socorrismo'] }],
            [{ day: 24, weekday: 'Dom', events: ['Mística e Simbologia'] }],
            [{ day: 31, weekday: 'Dom', events: ['CHANGE - JRS Portugal'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 21, weekday: 'Dom', events: ['Escape Room - Mafeking'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Aniversário de BP'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Raid Digital'] }],
            [{ day: 21, weekday: 'Dom', events: ['O Futuro'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Domingo de Ramos'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 11, weekday: 'Dom', events: ['Quaresma'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Programa'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Programa'] }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Maio a Junho 2021',
      year: 2021,
      months: [
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Rota da Biodiversidade'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Aqueduto das Águas Livres'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Orientação - Alfragide'] }],
            [{ day: 23, weekday: 'Dom', events: ['Visita ao Templo Hindu'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            { merged: true, dayStart: 12, dayEnd: 13, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Casa da Emília - Fátima'], highlight: true },
            [{ day: 20, weekday: 'Dom', events: ['Minigolfe - Miraflores'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Promessas'] }],
          ],
        },
      ],
    },
  ],
};
