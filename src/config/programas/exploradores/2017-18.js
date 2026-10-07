// Expedição 17 — Programa 2017/18.
// Fonte:
//   T1: Programa EXP 2017-2018.xlsx (folha Programa T1 2017-2018)
//   T2: Programa EXP 2017-2018.xlsx (folha EXP T2 2017-2018)
//   T3: Programa EXP 2017-2018.xlsx (folha EXP T3 2017-2018)
export default {
  year: '2017/18',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2017',
      year: 2017,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Abertura do Ano Escutista', 'Missa de Crisma'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Reunião Patrulhas', 'Programa'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Conselho de Guias', 'Investidura de Guias', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Venda de Calendários'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Conselho de Guias', 'Escola da Cartuxa', 'Revisão do Material de Campo'] }],
            [
              { day: 11, weekday: 'Sáb', events: ['Guia Verde'], subtitle: '(Só para Guias e Sub-Guias)' },
              { day: 12, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            [{ day: 18, weekday: 'Sáb', events: ['Conselho de Guias', 'Escola da Cartuxa', 'Jogo', 'Missa de Agrupamento'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Preparação do Acampamento', 'Banco Alimentar'] }],
            { merged: true, dayStart: 8, dayEnd: 10, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento de Natal'], highlight: true },
            [{ day: 16, weekday: 'Sáb', events: ['Atividade de Expedição'] }],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2018',
      year: 2018,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Reunião de Expedição - Abertura do Trimestre'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Conselho de Guias', 'Escola da Cartuxa', 'Reunião de Patrulha', 'Provas e Progresso'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Jogo - Missão QR Bond', 'Missa de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Conselho de Guias', 'Escola da Cartuxa', 'Jogos organizados por Patrulha'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Revisão do Material de Campo', 'Provas e Progresso'] }],
            { merged: true, dayStart: 10, dayEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Acampamento de Carnaval - Campo Base da Pedra Amarela - Sintra'], highlight: true },
            [
              { day: 24, weekday: 'Sáb', events: ['Preparação da Vigília', 'Vigília de Oração'] },
              { day: 25, weekday: 'Dom', events: ['Missa de Promessas'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Peddy Paper - Na pista de Bond'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Atelier de Cozinha'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Preparação do ACAGRUP', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 24, dayEnd: 27, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP 2018'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2018',
      year: 2018,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 14, weekday: 'Sáb', events: ['Início do 3º Trimestre'] }],
            [{ day: 22, weekday: 'Dom', events: ['São Jorge'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Conselho de Guias', 'Sistema de Progresso', 'Jogo'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Atividade de ligação informal'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Sistema de progresso e angariação de fundos', 'Missa de Agrupamento'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Bounce'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Banco Alimentar'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Jogo de tabuleiro', 'Progresso'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Vigília de Oração'] },
              { day: 17, weekday: 'Dom', events: ['Missa de Promessas'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['Jogos de Praia', 'Preparação do ACAREG'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Arborismo'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 29, dayEnd: 4, monthEnd: 8, weekdayStart: 'Dom', weekdayEnd: 'Sáb', events: ['ACAREG 2018 - Acampamento Regional'], highlight: true },
          ],
        },
      ],
    },
  ],
};
