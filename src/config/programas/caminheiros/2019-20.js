// Clã 72 — Programa 2019/20.
// Fonte:
//   T1: Programa CLA 72 2019-2020.xlsx (folha Programa T1 2019-2020)
export default {
  year: '2019/20',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Setembro a Novembro 2019',
      year: 2019,
      months: [
        {
          name: 'Setembro',
          month: 9,
          weeks: [
            [{ day: 14, weekday: 'Sáb', events: ['Conselho de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Abertura do Ano', 'Missa de Agrupamento'] }],
          ],
        },
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 6, weekday: 'Dom', events: ['Eleições - Campanha do calendário'] }],
            [{ day: 20, weekday: 'Dom', events: ['EDP - Maratona de Lisboa'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [
              { day: 9, weekday: 'Sáb', events: ['"Chama" Atividade de Guias Núcleo'] },
              { day: 10, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['Escalada e Progresso - Parque da Serafina'] }],
          ],
        },
      ],
    },
  ],
};
