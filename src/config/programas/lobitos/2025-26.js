// Alcateia 16 — Programa 2025/26.
// Fonte:
//   T1: Livro Unidade_Alcateia 2025-2026.xlsx (folha Programa 1º Trimestre)
//   T2: Livro Unidade_Alcateia 2025-2026.xlsx (folha Programa 2º Trimestre)
//   T3: Livro Unidade_Alcateia 2025-2026.xlsx (folha Programa 3º Trimestre)
export default {
  year: '2025/26',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2025',
      year: 2025,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Abertura do Ano', 'Missa de Agrupamento'] }],
            [
              { day: 11, weekday: 'Sáb', events: ['Constituição dos Bandos'] },
              { day: 12, weekday: 'Dom', events: ['Venda de Calendários'] },
            ],
            [{ day: 18, weekday: 'Sáb', events: ['Bandos', 'Investidura Guias', 'Missa de Agrupamento', 'Encontro de Guias Agrup'] }],
            [{ day: 25, weekday: 'Sáb', events: ['"O Imaginário"'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Aqueduto Águas Livres'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Balú Ensina', 'Prep Acantonamento'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Jogo Pista'] }],
            { merged: true, dayStart: 21, dayEnd: 23, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acantonamento'], highlight: true },
            [
              { day: 29, weekday: 'Sáb', events: ['Banco Alimentar Contra a Fome'] },
              { day: 30, weekday: 'Dom', events: ['Banco Alimentar Contra a Fome'] },
            ],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Dia da Sede', 'Atividade de Advento'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Angariação Fundos', 'Prep Acampamento'] }],
            { merged: true, dayStart: 20, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2026',
      year: 2026,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Início do Trimestre', 'Ceia de Reis'] }],
            [
              { day: 17, weekday: 'Sáb', events: ['Conselho Guias', 'Reunião', 'Missa Agrupamento'] },
              { day: 18, weekday: 'Dom', events: ['Vendas Calendários'] },
            ],
            [{ day: 31, weekday: 'Sáb', events: ['Progresso e Caça ao Tesouro'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Prep. Acamp Carnaval', 'Gincana'] }],
            { merged: true, dayStart: 14, dayEnd: 17, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento Carnaval'], highlight: true },
            [{ day: 21, weekday: 'Sáb', events: ['Confeção de Bolachas', 'Missa Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Visita Museu do Terramoto'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Jogo de Pista'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Festa do Sol'] }],
            [
              { day: 20, weekday: 'Sex', events: ['Vigília de Oração'] },
              { day: 21, weekday: 'Sáb', events: ['Promessas Agrupamento'] },
            ],
            { merged: true, dayStart: 28, dayEnd: 31, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP 2026'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2026',
      year: 2026,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Prep 3º Trimestre'] }],
            [{ day: 18, weekday: 'Sáb', events: ['São Jorge 2026', 'Missa Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Jogo em Belém'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Visita Palácio Nacional Ajuda'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Atividade Espiritual'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Dia de Núcleo'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Banco Alimentar Contra a Fome'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Visita Palácio Nacional da Pena'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Construções Areia e Praia'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Aniversário Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Gincana'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 18, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['Acampamento Verão'], highlight: true },
          ],
        },
      ],
    },
  ],
};
