// Alcateia 16 — Programa 2005/06.
// Fonte:
//   T1: Programa 1º trimestre 04-05.doc (na pasta 2004-2005; as datas e o rodapé são de 2005/2006)
//   T2: programa.doc (IIº Trimestre)
export default {
  year: '2005/06',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2005',
      year: 2005,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 29, weekday: 'Sáb', events: ['Ida ao CCB'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Atelier'] }],
            { merged: true, dayStart: 12, dayEnd: 13, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acantonamento', 'Dia de Núcleo'], highlight: true },
            [
              { day: 19, weekday: 'Sáb', events: ['Provas: Jardim de Belém'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Fim de Semana com os Pais'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Atelier de animação da fé "O Natal"'] }],
            [{ day: 8, weekday: 'Qui', events: ['Atelier de acampamento'] }],
            { merged: true, dayStart: 17, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Fevereiro a Abril 2006',
      year: 2006,
      months: [
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Animação da Fé'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Prep. das Promessas', 'Provas'] }],
            [
              { day: 18, weekday: 'Sáb', events: ['Velada de Armas'] },
              { day: 19, weekday: 'Dom', events: ['Promessas'] },
            ],
            { merged: true, dayStart: 24, dayEnd: 28, weekdayStart: 'Sex', weekdayEnd: 'Ter', events: ['ACACAR'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Ludoteca do Monte'] }],
            [
              { day: 18, weekday: 'Sáb', events: ['Festa do Sol'] },
              { day: 19, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 25, weekday: 'Sáb', events: ['Festa de Despedida'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 8, dayEnd: 9, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acagrup'], highlight: true },
          ],
        },
      ],
    },
  ],
};
