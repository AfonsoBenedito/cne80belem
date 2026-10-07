// Comunidade 9 — Programa 2022/23.
// Fonte:
//   T1: Programa PIO 2022-2023.xlsx (folha Programa do 1º Trimestre)
//   T2: Programa PIO 2022-2023.xlsx (folha Programa do 2º Trimestre)
//   T3: Programa PIO 2022-2023.xlsx (folhas Programa do 3º Trimestre e Programa do 4º Trimestre)
export default {
  year: '2022/23',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2022',
      year: 2022,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Passagens'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Team-Building'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Jota-Joti'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Reunião', 'Investidura de Guias'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Venda de Calendários'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 4, dayEnd: 5, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['Bivaque de Orientação', 'Raid Noturno', 'Dormida'], highlight: true },
            [
              { day: 12, weekday: 'Sáb', events: ['Atividade de Guias de Núcleo'] },
              { day: 13, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            [{ day: 19, weekday: 'Sáb', events: ['Preparação do Acampamento'] }],
            [{ day: 27, weekday: 'Dom', events: ['Banco Alimentar', 'Provas'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['Desporto: Olimpíadas - Acampamento na Quinta do Álamo'], highlight: true },
            [{ day: 11, weekday: 'Dom', events: ['Festa de Natal da Paróquia'] }],
            { merged: true, dayStart: 16, dayEnd: 18, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Luz da Paz de Belém', 'Acampamento na Casa da Emília'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2023',
      year: 2023,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Reunião de Preparação do Trimestre', 'Missa de Agrupamento', 'Jantar de Reis'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Arrumações', 'Limpezas da Sede', 'Marcação do Material de Campo'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Provas', 'Progresso', 'Especialidades', 'Reflexão', 'Dinâmicas preparadas pelas Equipas', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Ateliê de Culinária - Masterscout'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Encontro de Guias de Agrupamento', 'Ida ao COP'] }],
            { merged: true, dayStart: 18, dayEnd: 21, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP', 'Vigília e Promessas'], highlight: true },
            [{ day: 25, weekday: 'Sáb', events: ['Preparação do Acampamento'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 4, dayEnd: 5, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento Quinta do Bonjardim'], highlight: true },
            [
              { day: 11, weekday: 'Sáb', events: ['Raid'] },
              { day: 12, weekday: 'Dom', events: ['Angariação de Fundos: Meia Maratona'] },
            ],
            [{ day: 18, weekday: 'Sáb', events: ['Atividade Espiritual', 'Plantação de Árvores', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Atividade: Visita a Santarém'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Encontro de Contingente - Jamboree 2023'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Páscoa'] }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2023',
      year: 2023,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [
              { day: 22, weekday: 'Sáb', events: ['Indaba'], subtitle: '(Só para Animadores)' },
              { day: 23, weekday: 'Dom', events: ['São Jorge 2023'] },
            ],
            [{ day: 29, weekday: 'Sáb', events: ['Preparação do Programa do 3º trimestre'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Banco Alimentar'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Raid TT - Sesimbra'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Reunião de Preparação para o Acampamento', 'Missa de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Centenário 2023 - Braga'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Atividade intercomunidades'] }],
            { merged: true, dayStart: 9, dayEnd: 11, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento de Comunidade - junto à praia'], highlight: true },
            { merged: true, dayStart: 16, dayEnd: 18, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Arraial de Agrupamento'], highlight: true },
            [{ day: 24, weekday: 'Sáb', events: ['Aniversário do Agrupamento', 'Vigília', 'Promessas'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Atividade de Ligação - ida à praia e Arraial Paróquia'] }],
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 8, weekdayStart: 'Ter', weekdayEnd: 'Ter', events: ['25th World Scout Jamboree'], highlight: true },
          ],
        },
      ],
    },
  ],
};
