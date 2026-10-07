// Comunidade 9 — Programa 1998/99.
// Fonte:
//   T1: Programa 1º Trimestre.doc
//   T3: Programa 3º Trimestre.doc
export default {
  year: '1998/99',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 1998',
      year: 1998,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Início do Ano'] }],
            [
              { day: 17, weekday: 'Sáb', events: ['Jamboree no Ar'] },
              { day: 18, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            { merged: true, dayStart: 24, dayEnd: 25, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid TT'], highlight: true },
            { merged: true, dayStart: 31, dayEnd: 4, monthEnd: 11, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['Atividades de Equipa'], highlight: true },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 7, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade de preparação Jamboree', 'Atelier de Fotografia', 'Jogo de Cidade'], highlight: true },
            [
              { day: 14, weekday: 'Sáb', events: ['Festa de Halloween'] },
              { day: 15, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 21, weekday: 'Sáb', events: ['Visita ao Parque das Nações'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Rappel'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Reunião', 'Ateliers'] }],
            [
              { day: 12, weekday: 'Sáb', events: ['Preparação Acampamento de Natal e Jamboree'] },
              { day: 13, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            { merged: true, dayStart: 18, dayEnd: 22, weekdayStart: 'Sex', weekdayEnd: 'Ter', events: ['Atividade de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 1999',
      year: 1999,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 24, weekday: 'Sáb', events: ['Colaboração com a AMI'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Atividades de Equipa'] }],
            { merged: true, dayStart: 7, dayEnd: 9, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Atividade Em Busca da Estrela III'], highlight: true },
            { merged: true, dayStart: 15, dayEnd: 16, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade Equipa Tubarão Branco', 'Jogos de Praia - Equipas Formiga e Koala'] },
            [{ day: 22, weekday: 'Sáb', events: ['Visita à Mãe d\'Água'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Escalada'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Preparação Acampamento de Verão'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Ateliers por Equipas'] }],
            { merged: true, dayStart: 19, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Vigília, Promessas e apresentação do Acampamento de Verão'] },
            { merged: true, dayStart: 25, dayEnd: 26, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['Raid Noturno com outros Agrupamentos'], highlight: true },
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 4, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento Equipa Tubarão Branco'], highlight: true },
          ],
        },
      ],
    },
  ],
};
