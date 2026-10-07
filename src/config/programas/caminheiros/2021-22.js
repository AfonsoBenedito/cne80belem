// Clã 72 — Programa 2021/22.
// Fonte:
//   T1: Programa CLA 72 2021-2022.xlsx (folha Programa T1 2021-2022)
//   T2: Programa CLA 72 2021-2022.xlsx (folha Programa T2 2021-2022)
//   T3: Programa CLA 72 2021-2022.xlsx (folha Programa T3 2021-2022)
export default {
  year: '2021/22',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2021',
      year: 2021,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 23, weekday: 'Sáb', events: ['Conselho de Agrupamento', 'Abertura do Ano Escutista 2021-2022', 'Missa de Agrupamento'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Conselho de Clã'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Dom', events: ['Conselho de Clã', 'Progresso e início da preparação da caminhada'] }],
            [{ day: 13, weekday: 'Sáb', events: ['"Chama" Atividade de Guias Núcleo - Parque do Calhau', 'Partida'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['Missa de Agrupamento', 'Investidura de Guias'] },
              { day: 21, weekday: 'Dom', events: ['Atividade de Pioneirismo - PNEC'] },
            ],
            [{ day: 28, weekday: 'Dom', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Conselho de Clã'] }],
            [
              { day: 11, weekday: 'Sáb', events: ['Preparação do ACANAT', 'Vigília de Oração'] },
              { day: 12, weekday: 'Dom', events: ['Missa de Agrupamento/Promessas'] },
            ],
            { merged: true, dayStart: 20, dayEnd: 22, weekdayStart: 'Seg', weekdayEnd: 'Qua', events: ['ACANAT'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2022',
      year: 2022,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 15, weekday: 'Sáb', events: ['Conselho de Clã', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Atividade de Núcleo - São Paulo'] }],
            [{ day: 30, weekday: 'Dom', events: ['Conselho de Clã', 'Carta de Clã', 'JNLO - 3ª Pegada'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 6, weekday: 'Dom', events: ['Boa Hora Futebol Clube - Padel'] }],
            [{ day: 13, weekday: 'Dom', events: ['Atividade de Serviço ao Agrupamento'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Preparação Acampamento de Páscoa', 'Missa de Agrupamento'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 4, dayEnd: 6, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['JNLO - XVI Ciclo - Cenáculo Ocidental'], highlight: true },
            [
              { day: 12, weekday: 'Sáb', events: ['Retiro Quaresmal (Só para Dirigentes)', 'Atividade com a Comunidade'] },
              { day: 13, weekday: 'Dom', events: ['Reunião Pe. Miguel - Tema: Vamos Partir'] },
            ],
            [{ day: 19, weekday: 'Sáb', events: ['Missa de Agrupamento', 'Jantar de Clã', 'Documentário sobre a Fronteira - Elvas'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 3, weekday: 'Dom', events: ['Preparação Acampamento de Páscoa'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Peregrinação a Fátima'] }],
            { merged: true, dayStart: 13, dayEnd: 15, weekdayStart: 'Qua', weekdayEnd: 'Sex', events: ['Acampamento de Páscoa - Elvas/Badajoz'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2022',
      year: 2022,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 23, weekday: 'Sáb', events: ['São Jorge'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Conselho de Clã', 'Progresso'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Dia de Núcleo - Parque Bensaúde'] }],
            [
              { day: 13, weekday: 'Sex', events: ['Procissão - Igr. São Francisco Xavier'] },
              { day: 14, weekday: 'Sáb', events: ['Preparação do Acagrup 2022', 'Progresso'] },
            ],
            [{ day: 21, weekday: 'Sáb', events: ['Acagrup 2022', 'Vigília/Promessas'], highlight: true }],
            [
              { day: 28, weekday: 'Sáb', events: ['Banco Alimentar'] },
              { day: 29, weekday: 'Dom', events: ['Banco Alimentar'] },
            ],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Dia de Serviço ao Agrupamento', 'Instalação da Internet'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Jamor'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Torneio de Agrupamento preparado pelo clã'] }],
          ],
        },
      ],
    },
  ],
};
