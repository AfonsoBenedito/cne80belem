// Expedição 17 — Programa 2003/04.
// Fonte:
//   T1: relatorio de actividades.doc (programa do 1.º trimestre no Relatório de Atividades 2003/2004)
//   T2: relatorio de actividades.doc (programa do 2.º trimestre no Relatório de Atividades 2003/2004)
//   T3: relatorio de actividades.doc (programa do 3.º trimestre no Relatório de Atividades 2003/2004)
export default {
  year: '2003/04',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2003',
      year: 2003,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Abertura do Ano', 'Passagens de Secção'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Patrulhas', 'Programa'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Jamboree no Ar', 'Terço Vivo - Estádio Nacional'] }],
            { merged: true, dayStart: 25, dayEnd: 26, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Secção'], highlight: true },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Jogo "Houve um rapto"'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Visita ao Planetário'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Atividade de Núcleo', 'Missa', 'Jogo de Cidade em Lisboa Antiga'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Ateliers'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Raid'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Pavilhão do Conhecimento'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Festa de Natal', 'Apresentação de Brownsea'] }],
            { merged: true, dayStart: 20, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Atividade de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2004',
      year: 2004,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Programa do 2.º Trimestre'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Atividade de Cargos'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Jogos Paraolímpicos'] }],
            [{ day: 31, weekday: 'Sáb', events: ['"Missão MK2"'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Ateliers', 'Final de Etapas de Progresso'] }],
            [
              { day: 14, weekday: 'Sáb', events: ['Preparação da Vigília', 'Vigília de Oração'] },
              { day: 15, weekday: 'Dom', events: ['Promessas'] },
            ],
            { merged: true, dayStart: 21, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Atividade de Carnaval'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Rappel', 'Escalada'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Expedição'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Jogos Olímpicos'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Preparação do Acagrup'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 3, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Qui', events: ['ACAGRUP 2004'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Maio a Julho 2004',
      year: 2004,
      months: [
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Estágio da Seleção'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Corrida "Terry Fox"', 'Jogo no Parque das Nações'] }],
            [
              { day: 15, weekday: 'Sáb', events: ['Atividade de preparação do Acareg 2004'], subtitle: '(Só para Guias e Sub-Guias)' },
              { day: 16, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 22, weekday: 'Sáb', events: ['Jogo de Cidade'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Teatro'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Dia de Patrulha'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Por Portugal "Pára tudo!"'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Aniversário de Agrupamento', 'Velada de Armas'] },
              { day: 20, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Distribuição de Boletins', 'Atividade de bicicletas'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Festa de Final de Ano'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Preparação do Acareg 2004'] }],
            { merged: true, dayStart: 31, dayEnd: 7, monthEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Sáb', events: ['ACAREG 2004'], highlight: true },
          ],
        },
      ],
    },
  ],
};
