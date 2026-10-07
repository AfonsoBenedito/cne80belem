// Expedição 17 — Programa 2023/24.
// Fonte:
//   T1: Programa_1trimestre.xlsx
//   T2: Programa_2trimestre.xlsx
//   T3: Programa_3trimestre.xlsx
export default {
  year: '2023/24',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Setembro a Dezembro 2023',
      year: 2023,
      months: [
        {
          name: 'Setembro',
          month: 9,
          weeks: [
            [{ day: 30, weekday: 'Sáb', events: ['Abertura do Ano'] }],
          ],
        },
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Imaginário', 'Progresso'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Conselho de Guias', 'Raid por Belém', 'Investidura de Guias'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Preparação do Acamp. Halloween', 'Missa de Agrupamento'] }],
            [
              { day: 28, weekday: 'Sáb', events: ['Angariação de Fundos', 'Encontro de Guias de Agrupamento'] },
              { day: 29, weekday: 'Dom', events: ['Encontro de Guias de Agrupamento'] },
            ],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 3, dayEnd: 5, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento de Halloween'], highlight: true },
            [
              { day: 11, weekday: 'Sáb', events: ['Dia de Núcleo'] },
              { day: 12, weekday: 'Dom', events: ['Atividade de Guias de Núcleo'] },
            ],
            [{ day: 18, weekday: 'Sáb', events: ['Dia da Sede', 'Jogo', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Raid de Pistas - Tapada das Necessidades'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Banco Alimentar'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Reunião com a Assistência do Agrup', 'Preparação do Acamp. de Natal'] }],
            { merged: true, dayStart: 16, dayEnd: 19, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACANAT'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2024',
      year: 2024,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Preparação do 2º Trimestre'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Jogos Tradicionais', 'Ceia de Reis'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Preparação do 2º Trimestre', 'Missa de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['INDABA'], subtitle: '(Só para Animadores)' }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Preparação do Acampamento de Carnaval'] }],
            { merged: true, dayStart: 9, dayEnd: 11, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento de Carnaval - Cadaval'], highlight: true },
            [{ day: 17, weekday: 'Sáb', events: ['Peddy Paper', 'Missa de Agrupamento'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Bubble Futebol'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Visita ao Estádio do Restelo'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Cinema', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 23, dayEnd: 26, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP', 'Vigília e Promessas'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2024',
      year: 2024,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 21, weekday: 'Dom', events: ['S. Jorge 2024'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Raid de Cidade - Oeiras'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Conselho de Guias', 'Reunião de Patrulhas'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Indaba Animadores'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Visita ao Estádio do Belenenses', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Banco Alimentar', 'Preparação do Acantonamento'] }],
            { merged: true, dayStart: 31, dayEnd: 2, monthEnd: 6, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acantonamento na Parede'], highlight: true },
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 8, weekday: 'Sáb', events: ['Angariação de Fundos - Venda de Bolos e Brigadeiros'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Aniversário do Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Preparação do Acampamento de Verão'] }],
            { merged: true, dayStart: 29, dayEnd: 2, monthEnd: 7, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Verão'], highlight: true },
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Avaliação Final do Ano', 'Arrumações finais'] }],
          ],
        },
      ],
    },
  ],
};
