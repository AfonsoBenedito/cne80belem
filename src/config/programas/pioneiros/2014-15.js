// Comunidade 9 — Programa 2014/15.
// Fonte:
//   T1: Programa PIO T1 2014-2015.pdf
//   T2: Programa PIO T2 2014-2015.pdf
//   T3: Programa PIO T3 2014-2015.pdf
export default {
  year: '2014/15',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2014',
      year: 2014,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Abertura do Ano Escutista', 'Missa de Agrupamento'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Progresso', 'Preparação do Empreendimento', 'Missa de Agrupamento'] }],
            [
              { day: 25, weekday: 'Sáb', events: ['Atividades de Núcleo'], subtitle: '(Só para Guias e Sub-Guias)' },
              { day: 26, weekday: 'Dom', events: ['Atividade de Núcleo'] },
            ],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Limpar a sede'] }],
            [{ day: 9, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Apresentação e Escolha do Empreendimento', 'Missa de Agrupamento', 'Atividade com os Marítimos'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Advento', 'Senhor Prior', 'Comissões'] }],
            [
              { day: 29, weekday: 'Sáb', events: ['Banco Alimentar'] },
              { day: 30, weekday: 'Dom', events: ['Venda de terços e dezenas', 'Ordenações'] },
            ],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [
              { day: 13, weekday: 'Sáb', events: ['Preparação do Acanat', 'Limpar a sede'] },
              { day: 14, weekday: 'Dom', events: ['Venda de Natal na Baixa'] },
            ],
            { merged: true, dayStart: 18, dayEnd: 21, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['ACANAT 2014', 'Missa de Agrupamento'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2015',
      year: 2015,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Propostas Programas', 'Comissões', 'Empreendimento'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Empreendimento', 'Exposição "7 Mil Milhões de Outros"', 'Missa de Agrupamento'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Raid fotográfico'] }],
            [{ day: 31, weekday: 'Sáb', events: ['Apresentação das insígnias', 'Team Building'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Campanha da Liberty'] }],
            { merged: true, dayStart: 14, dayEnd: 17, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Carnaval'], highlight: true },
            [
              { day: 21, weekday: 'Sáb', events: ['Vigília de Oração'] },
              { day: 22, weekday: 'Dom', events: ['Promessas'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Ateliês no PNEC'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Progresso', 'Panquecas', 'Missa de Agrupamento'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Preparação do ACAPAS'] }],
            { merged: true, dayStart: 28, dayEnd: 31, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento da Páscoa'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2015',
      year: 2015,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            { merged: true, dayStart: 18, dayEnd: 19, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid TT'], highlight: true },
            [{ day: 26, weekday: 'Dom', events: ['São Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACAGRUP'], highlight: true },
            { merged: true, dayStart: 9, dayEnd: 10, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Contingente'], highlight: true },
            [{ day: 23, weekday: 'Sáb', events: ['Distintivos de Equipa', 'Avaliação do Empreendimento', 'Progresso', 'Missa de Agrupamento'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Atividade de Ligação Informal - Raid Jamor'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Jogos de Água', 'Progresso'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['Vigília'] },
              { day: 21, weekday: 'Dom', events: ['Promessas e 35º Aniversário'] },
            ],
            { merged: true, dayStart: 27, dayEnd: 28, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento'], highlight: true },
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 27, dayEnd: 14, monthEnd: 8, weekdayStart: 'Seg', weekdayEnd: 'Sex', events: ['Jamboree Japão 2015'], highlight: true },
          ],
        },
      ],
    },
  ],
};
