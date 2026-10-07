// Comunidade 9 — Programa 2025/26.
// Fonte:
//   T1: Livro Unidade_Comunidade.xlsx (folha Programa 1º Trimestre)
//   T2: Livro Unidade_Comunidade.xlsx (folha Programa 2º Trimestre)
//   T3: Livro Unidade_Comunidade.xlsx (folha Programa 3º Trimestre)
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
            [{ day: 4, weekday: 'Sáb', events: ['Abertura do Ano', 'Passagens', 'Missa de Agrupamento'] }],
            [{ day: 12, weekday: 'Dom', events: ['Angariação de Fundos', 'Venda de Calendários'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Empreendimento', 'Programa 1º trimestre', 'Investidura de Guias'] }],
            [{ day: 26, weekday: 'Dom', events: ['Campanha de Angariação de Fundos - Maratona de Lisboa'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Aqueduto das Águas Livres'] }],
            { merged: true, dayStart: 8, dayEnd: 9, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acantonamento'], highlight: true },
            [{ day: 15, weekday: 'Sáb', events: ['Venda de Bolachas', 'Missa de Agrupamento', 'Encontro de Guias do Agrupamento'] }],
            [{ day: 23, weekday: 'Dom', events: ['Raid'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Dia da Sede', 'Mat. de Campo', 'Ativ. Agr. Advento'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Preparação do ACANAT', 'Empreendimento', 'Reunião com a assistência do Agrupamento'] }],
            { merged: true, dayStart: 20, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACANAT 2025'], highlight: true },
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
            [{ day: 17, weekday: 'Sáb', events: ['Provas', 'Empreendimento', 'Missa de Agrupamento'] }],
            [{ day: 24, weekday: 'Sáb', events: ['INDABA'], subtitle: '(Só para Animadores)' }],
            [{ day: 31, weekday: 'Sáb', events: ['Preparação do Acampamento', 'Provas'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Atelier Vida de BP', 'Atelier Organização CNE e Agrupamento'] }],
            { merged: true, dayStart: 14, dayEnd: 17, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACACAR'], highlight: true },
            [{ day: 21, weekday: 'Sáb', events: ['Reunião Assistente de Agrupamento', 'Empreendimento', 'Progresso', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Atividade Serviço JFB'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Cinema', 'Provas', 'Preparação Vigília e Promessas', 'Coro'] }],
            [{ day: 13, weekday: 'Sex', events: ['Atelier de Técnica Escutista'] }],
            [
              { day: 20, weekday: 'Sex', events: ['Vigília de Oração'] },
              { day: 21, weekday: 'Sáb', events: ['Confissões', 'Missa de Agrupamento / Promessas'] },
            ],
            { merged: true, dayStart: 28, dayEnd: 31, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP 2026'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2026',
      year: 2026,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Início do Trimestre'] }],
            [{ day: 18, weekday: 'Sáb', events: ['São Jorge'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Raid de BTT', 'Preparação do Empreendimento'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 2, weekday: 'Sáb', events: ['Atelier de Sushi', 'Preparação do Empreendimento'] },
              { day: 3, weekday: 'Dom', events: ['Venda de Flores - Igreja São Francisco Xavier'] },
            ],
            [{ day: 9, weekday: 'Sáb', events: ['Momento espiritual - Fátima'] }],
            [{ day: 15, weekday: 'Sex', events: ['INDABA'], subtitle: '(Só para Animadores)' }],
            [
              { day: 22, weekday: 'Sex', events: ['Dia dos Vizinhos 2026'] },
              { day: 23, weekday: 'Sáb', events: ['Dia de Núcleo'] },
            ],
            [{ day: 30, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Torneio de Ténis'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Progresso', 'Preparação do Empreendimento'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Progresso', 'Preparação do Empreendimento', 'Missa de Agrupamento', 'Aniversário Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Praia', 'Atividade de Ligação'] }],
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 7, dayEnd: 12, weekdayStart: 'Sex', weekdayEnd: 'Qua', events: ['Empreendimento', 'ACAVER 2026'], highlight: true },
          ],
        },
      ],
    },
  ],
};
