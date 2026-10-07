// Expedição 17 — Programa 2025/26.
// Fonte:
//   T1: Livro Unidade_Expedição 2025-2026.xlsx (folha Programa 1º Trimestre)
//   T2: Livro Unidade_Expedição 2025-2026.xlsx (folha Programa 2º Trimestre)
//   T3: Livro Unidade_Expedição 2025-2026.xlsx (folha Programa 3º Trimestre)
export default {
  year: '2025/26',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2025',
      year: 2025,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Abertura do Ano', 'Passagens', 'Missa de Agrupamento'] }],
            [
              { day: 11, weekday: 'Sáb', events: ['Planeamento do Ano Escutista 2025/2026'] },
              { day: 12, weekday: 'Dom', events: ['Campanha de angariação de fundos', 'Venda de Calendários'] },
            ],
            [{ day: 18, weekday: 'Sáb', events: ['Escolha da Aventura', 'Investidura de Guias'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Raid de Pistas'] }],
            { merged: true, dayStart: 31, dayEnd: 1, monthEnd: 11, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['Acantonamento de Halloween'], highlight: true },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 8, weekday: 'Sáb', events: ['Mini Golf'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Progresso', 'Missa de Agrupamento', 'Encontro de Guias do Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Guia Verde', 'Planeamento do ACANAT'] }],
            [
              { day: 29, weekday: 'Sáb', events: ['Banco Alimentar'] },
              { day: 30, weekday: 'Dom', events: ['Banco Alimentar'] },
            ],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Dia da Sede', 'Material de Campo', 'Atividade de Agrupamento - Advento'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Atividade Surpresa'] }],
            { merged: true, dayStart: 18, dayEnd: 21, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['ACANAT 2025'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2026',
      year: 2026,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Início do II trimestre', 'Ceia de Reis'] }],
            [
              { day: 17, weekday: 'Sáb', events: ['Preparação da Aventura', 'Missa de Agrupamento'] },
              { day: 18, weekday: 'Dom', events: ['Venda de Calendários'] },
            ],
            [{ day: 24, weekday: 'Sáb', events: ['Indaba'] }],
            [{ day: 31, weekday: 'Sáb', events: ['Preparação do ACACAR'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [
              { day: 7, weekday: 'Sáb', events: ['Progresso', 'Imaginário'] },
              { day: 8, weekday: 'Dom', events: ['Recolha de Bens - Tempestades'] },
            ],
            { merged: true, dayStart: 14, dayEnd: 16, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Acampamento de Carnaval'], highlight: true },
            [{ day: 21, weekday: 'Sáb', events: ['Momento Espiritual', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Raid de Bicicletas'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Preparação das Promessas', 'Jogos'] }],
            { merged: true, dayStart: 13, dayEnd: 15, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Lx Aventura'], highlight: true },
            [
              { day: 20, weekday: 'Sex', events: ['Vigília de Oração'] },
              { day: 21, weekday: 'Sáb', events: ['Promessas'] },
            ],
            { merged: true, dayStart: 28, dayEnd: 31, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2026',
      year: 2026,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Início do III trimestre'] }],
            [{ day: 18, weekday: 'Sáb', events: ['S. Jorge'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Logística & Gestão'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 2, weekday: 'Sáb', events: ['Raid de Orientação'] },
              { day: 3, weekday: 'Dom', events: ['Venda de Flores'] },
            ],
            [{ day: 9, weekday: 'Sáb', events: ['Momento Espiritual'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Indaba'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Dia de Núcleo'] }],
            [
              { day: 29, weekday: 'Sex', events: ['Dia dos Vizinhos'] },
              { day: 30, weekday: 'Sáb', events: ['Banco Alimentar'] },
            ],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Atividade Surpresa'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Ida ao PNEC'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Aniversário de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Atividade de Ligação'] }],
          ],
        },
      ],
    },
  ],
};
