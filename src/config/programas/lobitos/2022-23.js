// Alcateia 16 — Programa 2022/23.
// Fonte:
//   T1: Programa Alcateia 16 - 2022-2023 - 1º Trimestre.pdf
//   T2: Programa Alcateia 16 - 2022-2023 - 2º Trimestre.pdf
//   T3: Programa Alcateia 16 - 2022-2023 - 3º Trimestre.pdf
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
            [{ day: 1, weekday: 'Sáb', events: ['Início do Ano', 'Passagens de Secção', 'Missa de Agrupamento'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Jogos de Alcateia'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Jogos de Alcateia'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Balú Ensina - Cargos', 'Divisão de Bandos & Eleição de Guias', 'Investidura de Guias'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Campanha do Calendário'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Balú Ensina - Cargos', 'Jogo de cargos'] }],
            [
              { day: 12, weekday: 'Sáb', events: ['Aguarela'] },
              { day: 13, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            [{ day: 19, weekday: 'Sáb', events: ['Livro da Selva - Filme', 'Jogo do Livro da Selva', 'Missa de Agrupamento'] }],
            [{ day: 27, weekday: 'Dom', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [
              { day: 3, weekday: 'Sáb', events: ['Preparação da Festa de Natal', 'Bumbo - Filme', 'Acantonamento da Alcateia'] },
              { day: 4, weekday: 'Dom', events: ['Circo de Natal'] },
            ],
            [{ day: 11, weekday: 'Dom', events: ['Festa de Natal - Ensaio', 'Missa', 'Festa de Natal da Paróquia'] }],
            { merged: true, dayStart: 16, dayEnd: 18, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Luz da Paz de Belém', 'ACANAT'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2023',
      year: 2023,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Balú Ensina - Nós', 'Missa de Agrupamento', 'Jantar de Reis 2023'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Atividade de Animadores'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Balú Ensina - S. Francisco de Assis', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Balú Ensina - Saudação', 'Balú Ensina - Insígnias e Cargos', 'Jogos - Saudação, Insígnias e Cargos'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Balú Ensina - Insígnias', 'Jogos - Insígnias', 'Balú Ensina - Mochila'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Preparação ACAGRUP'] }],
            { merged: true, dayStart: 18, dayEnd: 21, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP', 'Vigília e Promessas'], highlight: true },
            [{ day: 25, weekday: 'Sáb', events: ['Comité Olímpico de Portugal'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Ratatouille - Atelier de cozinha'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Atividade de Secção'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Atividade Espiritual em Agrupamento', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 24, dayEnd: 26, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento de Alcateia'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2023',
      year: 2023,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [
              { day: 22, weekday: 'Sáb', events: ['Indaba de Agrupamento'] },
              { day: 23, weekday: 'Dom', events: ['S. Jorge'] },
            ],
            [{ day: 29, weekday: 'Sáb', events: ['Oceanário', 'Jogos - Jardim de Água - Nemo', 'Final da Atividade'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 7, weekday: 'Dom', events: ['Banco Alimentar'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Moana - Havaiana - Filme e Manufatura dos colares'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Moana - Havaiana - Parque de campismo de Monsanto', 'Missa de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Centenário do CNE'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Atividade em Belém'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Atividade em Belém'] }],
            { merged: true, dayStart: 16, dayEnd: 18, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Arraial'], highlight: true },
            [
              { day: 24, weekday: 'Sáb', events: ['Aniversário de Agrupamento', 'Vigília'] },
              { day: 25, weekday: 'Dom', events: ['Aniversário de Agrupamento', 'Promessas'] },
            ],
            [{ day: 30, weekday: 'Sex', events: ['Noite - Apoio ao Arraial de S. Francisco'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [
              { day: 1, weekday: 'Sáb', events: ['Praia', 'Noite - Apoio ao Arraial de S. Francisco'] },
              { day: 2, weekday: 'Dom', events: ['Apoio ao Arraial de S. Francisco'] },
            ],
            { merged: true, dayStart: 7, dayEnd: 9, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento de Alcateia'], highlight: true },
          ],
        },
      ],
    },
  ],
};
