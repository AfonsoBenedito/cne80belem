// Clã 72 — Programa 2015/16.
// Fonte:
//   T1: Programa CLA T1 2015-2016.xlsx (folha Programa T1 2015-2016)
//   T2: Programa CLA T2 2015-2016.xlsx (folha Folha1)
//   T3: Programa CLA T3 2015-2016.xlsx
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
            [{ day: 17, weekday: 'Sáb', events: ['"Homem Novo"', 'Missa Agrupamento'] }],
            [{ day: 23, weekday: 'Sex', events: ['Atividade de formação das tribos', 'Limpeza da Sede'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Hike - "A Caminho do Triunfo"'] }],
            [{ day: 15, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Caminhada e Preparação do ACANAT', 'Missa de Agrupamento'] }],
            [
              { day: 28, weekday: 'Sáb', events: ['Jantar de Clã no Irish Pub "do Perry"'] },
              { day: 29, weekday: 'Dom', events: ['Banco Alimentar'] },
            ],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 12, weekday: 'Sáb', events: ['Caminhada', 'Preparação do ACANAT', 'Atividade de Serviço - Comida aos Sem-Abrigo'] }],
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Peregrinação a Fátima'], highlight: true },
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
            [{ day: 9, weekday: 'Sáb', events: ['Palestra sobre Experiências no Estrangeiro', 'PPV'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Elaboração do Programa', 'Preparação da Atividade com os Lobitos', 'Missa de Agrupamento'] }],
            [
              { day: 23, weekday: 'Sáb', events: ['Atividade com os Lobitos'] },
              { day: 24, weekday: 'Dom', events: ['Eleições', 'Campanha de Angariação de Fundos'] },
            ],
            [{ day: 30, weekday: 'Sáb', events: ['Senhor Prior, S. Paulo', 'Material', 'Caminhada', 'Provas'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Acampamento de Carnaval - Adraga ou Mafra'], highlight: true },
            [
              { day: 20, weekday: 'Sáb', events: ['Vigília de Oração', 'Limpeza da Sede'] },
              { day: 21, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 27, weekday: 'Sáb', events: ['Preparação da Caminhada', 'Atividade com o Santa Isabel'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Atelier de Orientação', 'Raid Preparado pelos Guias'] }],
            { merged: true, dayStart: 11, dayEnd: 13, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Cenáculo'], highlight: true },
            [{ day: 12, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Páscoa'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2016',
      year: 2016,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 16, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            [{ day: 23, weekday: 'Sáb', events: ['São Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 27, weekday: 'Sex', events: ['Vigília de Oração (Caminheiros e Dirigentes)'] },
              { day: 28, weekday: 'Sáb', events: ['Missa de Agrupamento', 'Promessas'] },
            ],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 18, weekday: 'Sáb', events: ['Aniversário de Agrupamento', 'Missa de Agrupamento'] }],
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 27, dayEnd: 4, monthEnd: 9, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Caminhada'], highlight: true },
          ],
        },
      ],
    },
  ],
};
