// Alcateia 16 — Programa 2008/09.
// Fonte:
//   T1: programa I-Alcateia.xls
export default {
  year: '2008/09',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2008',
      year: 2008,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 18, weekday: 'Sáb', events: ['Programa', 'Prep. S. Jorge - Pq. Serafina'] }],
            { merged: true, dayStart: 24, dayEnd: 26, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['FESCUT - Casa Pia'], highlight: true },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Visita a Local Histórico', 'Reunião de Pais'] }],
            { merged: true, dayStart: 8, dayEnd: 9, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento Técnico'], highlight: true },
            [{ day: 15, weekday: 'Sáb', events: ['Jogo de Cidade', 'Missa Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Teatro'] }],
            { merged: true, dayStart: 29, dayEnd: 1, monthEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Caminhada de Advento "Receber Jesus"'], highlight: true },
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Visita a Museu'] }],
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Sex', weekdayEnd: 'Seg', events: ['ACANAT'], highlight: true },
          ],
        },
      ],
    },
  ],
};
