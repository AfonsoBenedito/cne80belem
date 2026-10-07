// Alcateia 16 — Programa 2007/08.
// Fonte:
//   T2: Programa.xls (folha Iº Trimestre, conteúdo 2º Trimestre 2007/2008)
export default {
  year: '2007/08',
  trimesters: [
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2008',
      year: 2008,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Distribuição de Boletim', 'Reunião'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Atelier de Cargos'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Mini Acampamento na JFB - Técnicas de Campo'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Preparação do ACAGRUP'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 5, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP - Cadaval'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['Jogo de Pistas'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Velada'] },
              { day: 17, weekday: 'Dom', events: ['Missa e Promessas'] },
            ],
            { merged: true, dayStart: 23, dayEnd: 24, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Aguarela'], subtitle: '(Só para Guias e Sub-Guias)' }],
            [{ day: 8, weekday: 'Sáb', events: ['Jogo de Agrupamento', 'Café Concerto'] }],
            { merged: true, dayStart: 15, dayEnd: 18, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Páscoa - Azambuja'], highlight: true },
          ],
        },
      ],
    },
  ],
};
