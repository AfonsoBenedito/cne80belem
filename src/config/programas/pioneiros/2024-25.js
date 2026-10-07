// Comunidade 9 — Programa 2024/25.
// Fonte:
//   T1: Livro Unidade_COM 2024_2025.xlsx (folha Programa 1º Trimestre)
//   T2: Livro Unidade_COM 2024_2025.xlsx (folha Programa 2º Trimestre)
//   T3: Livro Unidade_COM 2024_2025.xlsx (folha Programa 3º Trimestre)
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
            [
              { day: 5, weekday: 'Sáb', events: ['Conselho de Agrupamento', 'Abertura do Ano', 'Passagens', 'Missa de Agrupamento'] },
              { day: 6, weekday: 'Dom', events: ['Campanha de Angariação de Fundos - Maratona de Lisboa'] },
            ],
            [{ day: 12, weekday: 'Sáb', events: ['Elaboração do Programa', 'Cargos'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Atelier de Azimutes - Monsanto', 'Investidura de Guias'] }],
            [
              { day: 26, weekday: 'Sáb', events: ['Campanha de Angariação de Fundos', 'Venda de Calendários'] },
              { day: 27, weekday: 'Dom', events: ['Campanha de Angariação de Fundos', 'Venda de Calendários'] },
            ],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Progresso e Masterscout'] }],
            [
              { day: 9, weekday: 'Sáb', events: ['Atelier Preparação de Atividades'] },
              { day: 10, weekday: 'Dom', events: ['Campanha de Angariação de Fundos - Maratona Tech Run 2024'] },
            ],
            [{ day: 16, weekday: 'Sáb', events: ['Atividade de Núcleo - Parque do Calhau', 'Encontro de Guias de Núcleo'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Progresso'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Dia da Sede', 'Mat. de Campo', 'Ativ. Agr. Advento'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Preparação do ACANAT', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 21, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['ACANAT 2024'], highlight: true },
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
            [{ day: 11, weekday: 'Sáb', events: ['Ceia de Reis'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Angariação Fundos - venda de bolachas', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['INDABA'], subtitle: '(Só para Animadores)' }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Festa de Aniversário Marco', 'Progresso'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Raid - Cascais / Algés'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Totens', 'Preparação do ACAPAS 2025', 'Progresso', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Atelier de Pioneirismo', 'Preparação do ACAPAS 2025', 'Progresso'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 9, weekday: 'Dom', events: ['Campanha de Angariação de Fundos - Maratona de Lisboa'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Atelier Orientação', 'Preparação do ACAPAS 2025', 'Conselho de Guias'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Raid TT'] }],
            [
              { day: 28, weekday: 'Sex', events: ['Vigília de Oração'] },
              { day: 29, weekday: 'Sáb', events: ['Confissões', 'Missa de Agrupamento / Promessas'] },
            ],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 5, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAPAS 2025'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Maio a Agosto 2025',
      year: 2025,
      months: [
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 3, weekday: 'Sáb', events: ['CP Entrecampos - São Jorge'] },
              { day: 4, weekday: 'Dom', events: ['Venda de Flores - Igreja São Francisco Xavier'] },
            ],
            [{ day: 10, weekday: 'Sáb', events: ['Elaboração do Programa'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Venda de Bolachas'] }],
            [
              { day: 23, weekday: 'Sex', events: ['Dia dos Vizinhos 2025'] },
              { day: 24, weekday: 'Sáb', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 31, weekday: 'Sáb', events: ['Alcântara - Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Trabalhos no Abrigo'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Raid - Monsanto', 'Fim da Atividade'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Aniversário Agrupamento', 'Missa de Agrupamento', 'Jantar'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['INDABA (Só animadores)', 'Preparação do Acagrup 2025'] }],
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 3, dayEnd: 10, weekdayStart: 'Dom', weekdayEnd: 'Dom', events: ['Acagrup 2025'], highlight: true },
          ],
        },
      ],
    },
  ],
};
