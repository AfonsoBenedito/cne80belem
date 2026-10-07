// Alcateia 16 — Programa 2006/07.
// Fonte:
//   T1: Programas.doc + Copiar de Programa.xls (folha Iº Trimestre)
//   T2: Programas.doc + Copiar de Programa.xls (folha Iiº Trimestre)
//   T3: Programas.doc (IIIº Trimestre)
export default {
  year: '2006/07',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2006',
      year: 2006,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 15, weekday: 'Dom', events: ['Abertura do Agrupamento - Monsanto'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Introdução ao Lobitismo', 'Programa', 'Cargos', 'Caçada'] }],
            [
              { day: 28, weekday: 'Sáb', events: ['Jogo de Pista', 'Acantonamento'] },
              { day: 29, weekday: 'Dom', events: ['Missa Boa-Hora', 'Zoo'] },
            ],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Preparação do Dia de Núcleo'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Dia de Núcleo'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Monsanto Aventura'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Caçada', 'Preparação do ACANAT', 'Provas'] }],
            { merged: true, dayStart: 8, dayEnd: 10, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACANAT - Parede'], highlight: true },
            [{ day: 16, weekday: 'Sáb', events: ['Festa de Natal'] }],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2007',
      year: 2007,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 13, weekday: 'Sáb', events: ['Aguarela (Guias e Sub-Guias) - Calharis', 'Programa'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['Festa do Pijama'] },
              { day: 21, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 28, weekday: 'Dom', events: ['Distribuição do Boletim'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Jogo com as Famílias - Praça do Comércio'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Preparação do Acampamento', 'Provas'] }],
            { merged: true, dayStart: 17, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Carnaval - Óbidos'], highlight: true },
            [
              { day: 24, weekday: 'Sáb', events: ['Prep. Promessas', 'Velada de Armas'] },
              { day: 25, weekday: 'Dom', events: ['Promessas'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Distribuição do Boletim'] }],
            { merged: true, dayStart: 10, dayEnd: 11, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento Técnico'], highlight: true },
            [
              { day: 17, weekday: 'Sáb', events: ['Reunião', 'Caçada'] },
              { day: 18, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 24, weekday: 'Sáb', events: ['Prep. ACAGRUP'] }],
            { merged: true, dayStart: 31, dayEnd: 4, monthEnd: 4, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['ACAGRUP'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Maio a Julho 2007',
      year: 2007,
      months: [
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 5, weekday: 'Sáb', events: ['Preparação do Acampamento'] },
              { day: 6, weekday: 'Dom', events: ['Venda de Flores'] },
            ],
            { merged: true, dayStart: 11, dayEnd: 13, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento - P.N.E.C. - Costa da Caparica'], highlight: true },
            [{ day: 19, weekday: 'Sáb', events: ['Reunião/Provas'] }],
            [
              { day: 26, weekday: 'Sáb', events: ['Saída c/ Pais - Lobo Ibérico - Mafra'] },
              { day: 27, weekday: 'Dom', events: ['Missa Agrupamento'] },
            ],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Reunião', 'Campanha'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Reunião', 'Vigília'] },
              { day: 17, weekday: 'Dom', events: ['Promessas do Agrupamento'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['Jogos aquáticos'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Reunião/Provas'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 14, weekday: 'Sáb', events: ['Preparação Acampamento'] }],
            { merged: true, dayStart: 22, dayEnd: 28, weekdayStart: 'Dom', weekdayEnd: 'Sáb', events: ['Acampamento Final - Vila Nova do Ceira'], highlight: true },
          ],
        },
      ],
    },
  ],
};
