// Comunidade 9 — Programa 2001/02.
// Fonte:
//   T2: 2º trimestre.doc
//   T3: 3º trimestre.doc
export default {
  year: '2001/02',
  trimesters: [
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2002',
      year: 2002,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 12, weekday: 'Sáb', events: ['Atelier de canoas'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Reunião com o Sr. Prior'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Acabar as obras na sala e apresentação de projetos para o empreendimento'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Preparação do acampamento de carnaval'] }],
            { merged: true, dayStart: 9, dayEnd: 11, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Acampamento de carnaval'], highlight: true },
            [{ day: 17, weekday: 'Dom', events: ['Atividade de BTT em Monsanto'] }],
            [
              { day: 23, weekday: 'Sáb', events: ['Vigília'] },
              { day: 24, weekday: 'Dom', events: ['Missa de Agrupamento', 'Promessas'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Tiragem de provas'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Jogo de cidade'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Preparação do ACAGRUP 2002'] },
              { day: 17, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            { merged: true, dayStart: 23, dayEnd: 29, weekdayStart: 'Sáb', weekdayEnd: 'Sex', events: ['ACAGRUP 2002'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2002',
      year: 2002,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Elaboração do programa'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Apresentação do programa'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['Apresentação do projeto de atividade de 4 de Maio por equipa'] },
              { day: 21, weekday: 'Dom', events: ['S. Jorge'] },
            ],
            [{ day: 27, weekday: 'Sáb', events: ['Arrumações'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Atividades de equipa', 'Tubarão Branco - Rappel em Cascais', 'Koala - BTT no Jamor'] }],
            { merged: true, dayStart: 10, dayEnd: 12, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento de Secção com raid noturno no Sardoal'], highlight: true },
            [
              { day: 18, weekday: 'Sáb', events: ['Ateliers e jogos'] },
              { day: 19, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 25, weekday: 'Sáb', events: ['Rappel'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Exposição no Pavilhão do Conhecimento'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Início da preparação do empreendimento'] }],
            [
              { day: 15, weekday: 'Sáb', events: ['Preparação da vigília e vigília'] },
              { day: 16, weekday: 'Dom', events: ['Promessas'] },
            ],
            { merged: true, dayStart: 22, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de secção'], highlight: true },
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 8, dayEnd: 13, weekdayStart: 'Seg', weekdayEnd: 'Sáb', events: ['Empreendimento'], highlight: true },
          ],
        },
      ],
    },
  ],
};
