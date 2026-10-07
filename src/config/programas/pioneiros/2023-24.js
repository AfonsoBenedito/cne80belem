// Comunidade 9 — Programa 2023/24.
// Fonte:
//   T1: 1º Trimestre/Programa PIO 2023-2024.xlsx (folha Programa do 1º Trimestre)
//   T2: 2º Trimestre/Programa PIO 2023-2024.xlsx (folha Programa do 2º Trimestre_v2)
//   T3: 3ª Trimestre/Programa PIO 2023-2024.xlsx (folha Programa do 3º trimestre)
export default {
  year: '2023/24',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2023',
      year: 2023,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 8, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acantonamento de Comunidade'], highlight: true },
            [{ day: 14, weekday: 'Sáb', events: ['Investidura de Guias'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Preparação do Programa do 1º trimestre', 'Missa de Agrupamento'] }],
            [
              { day: 28, weekday: 'Sáb', events: ['Painel de Empreendimento e de Competição', 'AGR: Encontro de Guias de Agrupamento'] },
              { day: 29, weekday: 'Dom', events: ['AGR: Encontro de Guias de Agrupamento'] },
            ],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Raid de preparação para a atividade de secção para os pais'] }],
            [
              { day: 11, weekday: 'Sáb', events: ['Dia de Núcleo'] },
              { day: 12, weekday: 'Dom', events: ['Atividade de Guias de Núcleo'] },
            ],
            [{ day: 18, weekday: 'Sáb', events: ['Dia de Organização da Sede e Limpeza da Sede', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Atividade de Secção para os Pais'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Atividade Espiritual e AGR: Banco Alimentar'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['MasterScout'] }],
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
            [{ day: 6, weekday: 'Sáb', events: ['Reunião de Preparação do 2º Trimestre e Painel de Empreendimento'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Atividade de Preparação para o ACACAR', 'Ceia de Reis'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Atividade Espiritual de Secção', 'Missa de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Indaba de Animadores'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Reunião de Preparação do Empreendimento', 'Preparação do ACACAR'] }],
            { merged: true, dayStart: 9, dayEnd: 11, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACACAR - Casa do Clã - Bombarral'], highlight: true },
            [{ day: 17, weekday: 'Sáb', events: ['Atividade Noturna: Limpeza da Sede para a Eq. c/ menos pontos no Painel de Competição', 'Missa de Agrupamento', 'Venda de Bolos', 'Raid de Preparação para o Raid TT - Zona à volta de Lisboa'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 3, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid TT'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['Atividade Espiritual de Agrupamento', 'Missa de Agrupamento', 'Venda de Bolos'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Reunião de Preparação do ACAGRUP'] }],
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
            [{ day: 6, weekday: 'Sáb', events: ['Avaliação do 2º Trimestre', 'Reunião de Preparação do 3º Trimestre e Painel de Empreendimento'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Verificar as tendas'] }],
            [{ day: 21, weekday: 'Dom', events: ['São Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Raid noturno c/ pernoita'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Preparação do Empreendimento', 'Angariação de Fundos na Missa de Agrupamento - venda de bolos', 'Masterscout'] }],
            [
              { day: 24, weekday: 'Sex', events: ['Dia do Vizinho'] },
              { day: 25, weekday: 'Sáb', events: ['Banco Alimentar'] },
            ],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 2, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Preparação para o Empreendimento'], highlight: true },
            [{ day: 15, weekday: 'Sáb', events: ['Angariação de Fundos - Venda de Bolos ou Lavagem de Carros', 'Aniversário do Agrupamento & Promessas'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Preparação do Empreendimento & Técnica Escutista'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 20, weekday: 'Sáb', events: ['Dois dias antes do Empreendimento preparar o material'] }],
            { merged: true, dayStart: 28, dayEnd: 3, monthEnd: 8, weekdayStart: 'Dom', weekdayEnd: 'Sáb', events: ['Empreendimento'], highlight: true },
          ],
        },
      ],
    },
  ],
};
