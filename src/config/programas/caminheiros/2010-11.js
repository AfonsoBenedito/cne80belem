// Clã 72 — Programa 2010/11.
// Fonte:
//   T1: Programa 1º Trimestre Aprovado.xls
//   T2: Programa 2º Trimestre Aprovado.xls
//   T3: Programa 3º Trimestre Aprovado.xls
export default {
  year: '2010/11',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2010',
      year: 2010,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Abertura do Ano Escutista 2010/2011', 'Constituição das equipas', 'Missa de Agrupamento'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Reunião de Tribo', 'Elaboração do programa, Caminhada. Atribuição dos distintivos de cargos'] }],
            [{ day: 15, weekday: 'Sex', events: ['Conselho de Agrupamento'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Dia do Halloween'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Caminhada', 'Progresso'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Animação de um lar de idosos', 'Missa de Agrupamento', 'Magusto'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Caminhada', 'Progresso'] }],
            { merged: true, dayStart: 18, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Atividade de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2011',
      year: 2011,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 8, weekday: 'Sáb', events: ['Reunião de Tribo', 'Elaboração do programa'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Reunião de Tribo', '"Caminhada"', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Reunião de Tribo', '"Promessas" e "Caminhada"'] }],
            [
              { day: 25, weekday: 'Ter', events: ['Atividade de Núcleo', 'São Paulo ao Rubro'] },
              { day: 29, weekday: 'Sáb', events: ['Reunião de Tribo', 'Provas', 'Cinema'] },
            ],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Reunião de Tribo', 'Provas'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Reunião de Tribo', '"Caminhada", Preparação da Vigília'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Reunião de Tribo', 'Preparação das Promessas', 'Vigília'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Reunião de Tribo', 'Campanha de Angariação de Fundos'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 12, weekday: 'Sáb', events: ['Reunião de Tribo', '"Caminhada"'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Animação de um lar de idosos', 'Missa de Agrupamento'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Reunião de Tribo', '"Caminhada"'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Reunião de Tribo', 'Preparação do Acagrup', 'Atividade Cultural'] }],
            { merged: true, dayStart: 9, dayEnd: 13, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['Acagrup 2011'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2011',
      year: 2011,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 30, weekday: 'Sáb', events: ['Distribuição do BI da JF', 'Elaboração do programa'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 7, weekday: 'Sáb', events: ['Projeto Sala'] },
              { day: 8, weekday: 'Dom', events: ['São Jorge'] },
            ],
            [{ day: 14, weekday: 'Sáb', events: ['LX Aventura'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Animação do Lar da Torre', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Distribuição do BI da JF', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Projeto Sala'] }],
            [
              { day: 18, weekday: 'Sáb', events: ['Reunião de Tribo', 'Preparação das Promessas', 'Vigília'] },
              { day: 19, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            [{ day: 25, weekday: 'Sáb', events: ['Distribuição do BI da JF', 'Praia'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Exposição "Jardins dos Budas Gigantes"'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Projeto Caminhada'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Atividade conjunta c/ a Comunidade - Sintra'] }],
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 23, dayEnd: 31, weekdayStart: 'Ter', weekdayEnd: 'Qua', events: ['Atividade de Verão - "A Caminho de Santiago"'], highlight: true },
          ],
        },
      ],
    },
  ],
};
