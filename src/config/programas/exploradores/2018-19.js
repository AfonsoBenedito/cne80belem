// Expedição 17 — Programa 2018/19.
// Fonte:
//   T1: Programa EXP 2018-2019.xlsx (folha EXP T1 2018-2019)
//   T2: Programa EXP 2018-2019.xlsx (folha EXP T2 2018-2019)
//   T3: Programa EXP 2018-2019.xlsx (folha EXP T3 2018-2019)
export default {
  year: '2018/19',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2018',
      year: 2018,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 13, weekday: 'Sáb', events: ['Abertura do Ano', 'Apresentação das EA\'s', 'Passagens de Secção'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Cargos', 'Programa do Trimestre', 'Missa de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Conselho de Guias de Agrupamento', 'Jogos de Agrupamento', 'Calendários'] }],
            [{ day: 30, weekday: 'Ter', events: ['Salão Paroquial - Reunião de Pais'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 4, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Apresentação e Escolha do Imaginário', 'Missa de Agrupamento'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Jogo de Orientação'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Advento', 'Progresso', 'Atividade de Guias'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Preparação do ACANAT'] }],
            { merged: true, dayStart: 15, dayEnd: 18, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACANAT', 'Luz da Paz de Belém'], highlight: true },
            [{ day: 22, weekday: 'Sáb', events: ['Partilha da Luz da Paz de Belém na Comunidade'] }],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2019',
      year: 2019,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 12, weekday: 'Sáb', events: ['Programa do Trimestre', 'Provas e Progresso', 'Missa de Agrupamento'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Quizz Escutista', 'Ceia de Reis'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Raid Fotográfico'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Voluntariado e Masterchef'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Salão Paroquial - Filme "A Volta ao Mundo em 80 dias"', 'Missa de Agrupamento'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Preparação do ACAGRUP'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 5, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP 2019', 'Promessas'], highlight: true },
            [{ day: 16, weekday: 'Sáb', events: ['Atelier de Orientação', 'Missa de Agrupamento'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Raid em Monsanto'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Dinâmica de Cargos', 'Preparação do Acampamento'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 7, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento da Páscoa'], highlight: true },
            [{ day: 28, weekday: 'Dom', events: ['São Jorge'] }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Maio a Julho 2019',
      year: 2019,
      months: [
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Preparação do trimestre', 'Escalada - Monsanto'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Vida de S. Tiago', 'Porta-Chaves'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Atividade Conjunta com os Marítimos - Belém', 'Missa de Agrupamento'] }],
            [
              { day: 25, weekday: 'Sáb', events: ['Banco Alimentar'] },
              { day: 26, weekday: 'Dom', events: ['Banco Alimentar'] },
            ],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Costa da Caparica - Pioneirismo'] }],
            { merged: true, dayStart: 8, dayEnd: 9, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Arraial do Agrupamento & 929'], highlight: true },
            [{ day: 15, weekday: 'Sáb', events: ['Atividade de Ligação Informal', 'Aniversário de Agrupamento', 'Jogos de Água', 'Missa de Agrupamento'] }],
            [
              { day: 21, weekday: 'Sex', events: ['Vigília de Oração'] },
              { day: 22, weekday: 'Sáb', events: ['Promessas'] },
            ],
            [{ day: 29, weekday: 'Sáb', events: ['Preparação do Acampamento de Verão'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 7, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Verão'], highlight: true },
          ],
        },
      ],
    },
  ],
};
