// Expedição 17 — Programa 2026/27.
// Fonte:
//   T1: Livro Unidade_Expedição 2026-2027.xlsx (folha Programa 1º Trimestre)
//   T2: Livro Unidade_Expedição 2026-2027.xlsx (folha Programa 2º Trimestre)
//   T3: Livro Unidade_Expedição 2026-2027.xlsx (folha Programa 3º Trimestre)
export default {
  year: '2026/27',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2026',
      year: 2026,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Abertura do Ano 2026/2027', 'Missa'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Venda de Calendários'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Elaboração do Programa do Trimestre', 'Investidura de Guias', 'Missa'] }],
            { merged: true, dayStart: 30, dayEnd: 1, monthEnd: 11, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acantonamento'], highlight: true },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Missa'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Encontro de Guias de Agrupamento'] }],
            [
              { day: 21, weekday: 'Sáb', events: ['Formação de Guias'] },
              { day: 22, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            [{ day: 28, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Dia da Sede', 'Material de Campo', 'Atividade do Advento'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Preparação do ACANAT \'26'] }],
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACANAT \'26'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2027',
      year: 2027,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Missa', 'Ceia de Reis'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Missa'] }],
            [{ day: 30, weekday: 'Sáb', events: ['INDABA'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 9, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACACAR \'27'], highlight: true },
            [{ day: 20, weekday: 'Sáb', events: ['Missa'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [
              { day: 5, weekday: 'Sex', events: ['Vigília'] },
              { day: 6, weekday: 'Sáb', events: ['Promessas'] },
            ],
            { merged: true, dayStart: 20, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP \'27'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2027',
      year: 2027,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Indaba'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Início do Trimestre', 'Missa'] }],
            [{ day: 24, weekday: 'Sáb', events: ['São Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 1, weekday: 'Sáb', events: ['Venda de Flores', 'Missa'] },
              { day: 2, weekday: 'Dom', events: ['Venda de Flores'] },
            ],
            [{ day: 8, weekday: 'Sáb', events: ['Lx Aventura'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Momento Espiritual'] }],
            [{ day: 21, weekday: 'Sex', events: ['Dia dos Vizinhos'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [
              { day: 4, weekday: 'Sex', events: ['Arraial de SFX'] },
              { day: 5, weekday: 'Sáb', events: ['Missa', 'Arraial de SFX'] },
            ],
            [{ day: 19, weekday: 'Sáb', events: ['47º Aniversário do Agrupamento', 'Missa'] }],
          ],
        },
      ],
    },
  ],
};
