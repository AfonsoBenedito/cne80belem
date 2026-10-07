// Comunidade 9 — Programa 2016/17.
// Fonte:
//   T1: Programa PIO 2016-2017.xlsx (folha Programa T1 2016-2017)
//   T2: Programa PIO 2016-2017.xlsx (folha Programa T2 2016-2017)
//   T3: Programa PIO 2016-2017.xlsx (folha Programa T3 2016-2017)
export default {
  year: '2016/17',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2016',
      year: 2016,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 8, weekday: 'Sáb', events: ['Abertura do Ano Escutista', 'Missa de Agrupamento'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Atelier Mística de Secção', 'Empreendimento', 'Equipas e Programa'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Conselho de Guias', 'Empreendimento', 'Progresso'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Planeamento Angariações de Fundos', 'Investidura de Guias'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 12, weekday: 'Sáb', events: ['101% Azul', 'Dia de Núcleo'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Angariação de Fundos', 'Missa de Agrupamento'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Conselho de Empreendimento'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Conselho de Guias', 'Conselho de Empreendimento', 'Banco Alimentar'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Preparação do Acanat'] }],
            { merged: true, dayStart: 17, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACANAT 2016'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2017',
      year: 2017,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Programa 2º trimestre', 'Painel de Empreendimento', 'Progresso Individual'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Jogos Japoneses', 'Construção de Bandeirolas', 'Insígnias de Equipa'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Progresso Pessoal', 'Teatro', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Cadetes de Mafeking', 'Angariação de Fundos na Baixa - Terços'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Celebração Penitencial', 'Preparação do Acacar', 'Progresso Pessoal', 'Conselho de Guias'] }],
            [
              { day: 18, weekday: 'Sáb', events: ['Vigília de Oração'] },
              { day: 19, weekday: 'Dom', events: ['Promessas'] },
            ],
            { merged: true, dayStart: 25, dayEnd: 28, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACACAR'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Raid'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Comissões do Empreendimento', 'Atelier de Sushi', 'Missa de Agrupamento', 'Jantar Asiático', 'Progresso Pessoal'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Angariação de Fundos - Terços'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Preparação do Acagrup'] }],
            { merged: true, dayStart: 6, dayEnd: 9, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['ACAGRUP'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2017',
      year: 2017,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 23, weekday: 'Dom', events: ['São Jorge'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Preparação Trimestre', 'Painel Empreendimentos'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Raid Fotográfico Cascais'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Montagens Arraial', 'Missa de Agrupamento'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Raid de BTT em Monsanto', 'Atividades de Ligação'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Montagens Arraial', 'Progresso', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [
              { day: 3, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Vigília de Oração'] },
              { day: 4, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 17, weekday: 'Sáb', events: ['Dia da Sede'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Aniversário de Agrupamento', 'Missa de Agrupamento'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 2, weekday: 'Dom', events: ['Jogo de Pistas e Praia para os Lobitos - Costa da Caparica'] }],
            { merged: true, dayStart: 31, dayEnd: 6, monthEnd: 8, weekdayStart: 'Seg', weekdayEnd: 'Dom', events: ['XXIII ACANAC'], highlight: true },
          ],
        },
      ],
    },
  ],
};
