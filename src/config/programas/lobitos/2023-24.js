// Alcateia 16 — Programa 2023/24.
// Fonte:
//   T1: 1T.xlsx
//   T2: 2T.xlsx
//   T3: 3T.xlsx
export default {
  year: '2023/24',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Setembro a Dezembro 2023',
      year: 2023,
      months: [
        {
          name: 'Setembro',
          month: 9,
          weeks: [
            [{ day: 30, weekday: 'Sáb', events: ['Abertura do Ano Escutista', 'Jogo Conhecimento', 'Balú Ensina Livro Selva'] }],
          ],
        },
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Balú Ensina', 'Formação Bandos', 'Cargos', 'Imaginário'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Balú Ensina', 'Reunião Pais Alcateia', 'Act. Agr. Investidura de Guias', 'Programa'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Balú Ensina', 'Programa', 'Missa de Agrupamento'] }],
            [
              { day: 28, weekday: 'Sáb', events: ['Conselho Agr.', 'Visita ao Padrão dos Descobrimentos', 'Act. Guias AGR'] },
              { day: 29, weekday: 'Dom', events: ['Act. Guias AGR'] },
            ],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Andar a Cavalo ou Torre de Belém'] }],
            [
              { day: 11, weekday: 'Sáb', events: ['Dia de Núcleo'] },
              { day: 12, weekday: 'Dom', events: ['Atividade de Guias'] },
            ],
            [{ day: 18, weekday: 'Sáb', events: ['Arrumação da Sede', 'Animação da Fé', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Visita ao Castelo de S. Jorge com Jogo de Cidade'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 2, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['Banco Alimentar'] },
            [{ day: 9, weekday: 'Sáb', events: ['Raid no Bairro Casas do Lago'] }],
            { merged: true, dayStart: 16, dayEnd: 17, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Luz da Paz de Belém - Agr 80', 'ACANAT'], highlight: true },
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
            [{ day: 6, weekday: 'Sáb', events: ['Início 2.º Trimestre'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Ceia de Reis'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['INDABA'], subtitle: '(Só para Animadores)' }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 10, dayEnd: 13, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACACAR'], highlight: true },
            [{ day: 17, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 16, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            { merged: true, dayStart: 23, dayEnd: 26, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2024',
      year: 2024,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Festa do Sol'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Programa', 'CG Validação Programa'] }],
            [{ day: 21, weekday: 'Dom', events: ['S. Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Jogo Pista Progresso', 'Tour de France'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Adesão Informal', 'INDABA'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Primeiras Comunhões', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Jeu d\'Évasion - Dia todo', 'Escape Room', 'Angariação de Fundos'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Preparação ACAVER'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Aniversário do Agrupamento', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 21, dayEnd: 23, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACAVER'], highlight: true },
            [{ day: 29, weekday: 'Sáb', events: ['Zoo', 'Teatro'] }],
          ],
        },
      ],
    },
  ],
};
