// Comunidade 9 — Programa 2015/16.
// Fonte:
//   T1: Programa PIO 2015-2016.xlsx (folha Programa T1 2015-2016)
//   T2: Programa PIO 2015-2016.xlsx (folha Programa T2 2015-2016)
//   T3: Programa PIO 2015-2016.xlsx (folha Programa T3 2015-2016)
export default {
  year: '2015/16',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2015',
      year: 2015,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Abertura do Ano Escutista', 'Missa de Agrupamento'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Equipas e Programa', 'Missa de Agrupamento'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Conselho de Guias', 'Reunião', 'Investidura de Guias'] }],
            { merged: true, dayStart: 30, dayEnd: 1, monthEnd: 11, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['101% Azul'], highlight: true },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Raid', 'Jogo da Troca'] }],
            [{ day: 15, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Apresentação Empreendimento', 'Progresso', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Conselho de Guias', 'Conselho Comunidade', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 12, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Conselho de Guias', 'Preparação do Acanat', 'Material', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACANAT 2015'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2016',
      year: 2016,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Conselho de Guias', 'Conselho Comunidade'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Conselho de Guias', 'Empreendimento e progresso', 'Missa de Agrupamento', 'Limpeza da sede'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Campanha de Angariação', 'Compotas'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Preparação do Acampamento'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['ACACAR'], highlight: true },
            [
              { day: 20, weekday: 'Sáb', events: ['Vigília de Oração'] },
              { day: 21, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 27, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Atelier de Artes', 'Limpeza da sede'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Real Bodies', 'Empreendimento e progresso'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Preparação do Acampamento', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAPAS'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2016',
      year: 2016,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Raid TT'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            [{ day: 23, weekday: 'Sáb', events: ['São Jorge'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Corrida Terry Fox'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Comissões Piodiversidade', 'Conselho de Guias'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Ação de Voluntariado c/ uma ONG', 'Comissões Piodiversidade'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Missa de Agrupamento / Promessas', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Raid e Rappel em Sintra', 'Atividade conjunta c/ o Clã 72'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Atividade de Ligação - Exploradores'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Jogo de Agrupamento', 'Aniversário do Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Comissões Piodiversidade'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 31, dayEnd: 6, monthEnd: 8, weekdayStart: 'Dom', weekdayEnd: 'Sáb', events: ['ACACAR 2016'], highlight: true },
          ],
        },
      ],
    },
  ],
};
