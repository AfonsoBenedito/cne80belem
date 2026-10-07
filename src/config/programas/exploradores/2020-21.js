// Expedição 17 — Programa 2020/21.
// Fonte:
//   T1: Relatório Atividades Expedição 2020-2021 VF.docx (tabela de atividades)
//   T2: Relatório Atividades Expedição 2020-2021 VF.docx (tabela de atividades)
//   T3: Relatório Atividades Expedição 2020-2021 VF.docx (tabela de atividades)
export default {
  year: '2020/21',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2020',
      year: 2020,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 17, weekday: 'Sáb', events: ['Abertura do Ano'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Promessas'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Patrulhas e Cargos'] }],
            [{ day: 15, weekday: 'Dom', events: ['Imaginário', 'Missa'] }],
            [{ day: 22, weekday: 'Dom', events: ['Imaginário', 'Jogo', 'Missa'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Quiz e Lanche'] }],
            [{ day: 13, weekday: 'Dom', events: ['Raid Fotográfico'] }],
            [{ day: 20, weekday: 'Dom', events: ['MasterScout', 'Missa'] }],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2021',
      year: 2021,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 10, weekday: 'Dom', events: ['Avaliação do 1.º Trimestre'] }],
            [{ day: 17, weekday: 'Dom', events: ['Quiz Ásia'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Escola da Cartuxa', 'Conselho de Guias'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Atelier de Cozinha'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Escola da Cartuxa', 'Nó da Amizade'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Jogos'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Escape Mafeking'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Atividade de Agrupamento'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Conversas Informais'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Conversas Informais'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Raid'] }],
            [{ day: 28, weekday: 'Dom', events: ['Atividade de Páscoa de Agrupamento'] }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2021',
      year: 2021,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 24, weekday: 'Sáb', events: ['Batalha Naval'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Raid - Monsanto'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Lx Aventura'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Vólei de Pano'] }],
            [{ day: 22, weekday: 'Sáb', events: ['MasterScout'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Progresso'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 19, weekday: 'Sáb', events: ['Conselho de Guias', 'Provas'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Promessas'] }],
          ],
        },
      ],
    },
  ],
};
