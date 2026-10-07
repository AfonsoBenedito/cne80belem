// Alcateia 16 — Programa 2024/25.
// Fonte:
//   T1: Livro Unidade_ALC.xlsx (folha Programa 1º Trimestre)
//   T2: Livro Unidade_ALC.xlsx (folha Programa 2º Trimestre)
//   T3: Livro Unidade_ALC.xlsx (folha Programa 3º Trimestre)
export default {
  year: '2024/25',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2024',
      year: 2024,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Conselho de Agrupamento', 'Abertura do Ano', 'Passagens', 'Missa de Agrupamento'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Divisão de bandos e cargos'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Investiduras de guias'] }],
            [
              { day: 26, weekday: 'Sáb', events: ['Venda de calendários'] },
              { day: 27, weekday: 'Dom', events: ['Venda de calendários'] },
            ],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Encontro de Guias de Agrupamento'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Parque do Calhau', 'Atividade de Núcleo', 'Atividade guia Alcateia'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Hipotrip'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 1, weekday: 'Dom', events: ['Banco Alimentar'] }],
            [{ day: 7, weekday: 'Sáb', events: ['Dia da Sede e atividade de Advento'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Preparação, organização do ACANAT', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 21, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['ACANAT', 'Luz da Paz de Belém'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2025',
      year: 2025,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Atividade de organização da Sede', 'Programa'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Planificação de carros', 'Apresentação do Programa Educativo', 'Balú Ensina', 'Missa'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Indaba'], subtitle: '(Só para Animadores)' }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Construção de carros com material reciclado', 'Apresentação do ACAGRUP'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Corrida de carros e conclusão da atividade', 'Balú Ensina e Progresso'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Culinária - Bolachas', 'Venda das Bolachas e Reunião de Programa Educativo com os pais', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Preparação ACACAR', 'Concurso de Talentos'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 4, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACACAR'], highlight: true },
            [{ day: 8, weekday: 'Sáb', events: ['Hippotrip'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Preparação ACAPAS e Prep. Festa do Sol'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Festa do Sol'] }],
            [
              { day: 28, weekday: 'Sex', events: ['Vigília de Oração'] },
              { day: 29, weekday: 'Sáb', events: ['Missa de Agrupamento / Promessas'] },
            ],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 4, dayEnd: 6, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACAPAS'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2025',
      year: 2025,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 4, dayEnd: 6, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACAPAS'], highlight: true },
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 3, weekday: 'Sáb', events: ['São Jorge'] },
              { day: 4, weekday: 'Dom', events: ['Angariação de Fundos - Dia da Mãe, Venda de Flores'] },
            ],
            [{ day: 10, weekday: 'Sáb', events: ['Programa do 3.º trimestre', 'Jogos'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Festa do Sol'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Preparação da angariação de fundos - Porta-chaves'] }],
            [{ day: 31, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 1, weekday: 'Dom', events: ['Banco Alimentar'] }],
            [{ day: 7, weekday: 'Sáb', events: ['Karts', 'Angariação de fundos'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Preparação ACAVER'] }],
            { merged: true, dayStart: 21, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['ACAVER', 'Hipotrip'], highlight: true },
            [{ day: 28, weekday: 'Sáb', events: ['Aniversário do Agrupamento - 45 anos'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Preparação do ACAGRUP'] }],
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 3, dayEnd: 10, weekdayStart: 'Dom', weekdayEnd: 'Dom', events: ['ACAGRUP - Picos da Europa'], highlight: true },
          ],
        },
      ],
    },
  ],
};
