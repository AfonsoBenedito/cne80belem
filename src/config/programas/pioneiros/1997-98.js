// Comunidade 9 — Programa 1997/98.
// Fonte:
//   T1: Programa da IIIª Secção 1º Trimestre.doc
//   T2: Programa da IIIª Secção 2º Trimestre.pdf (exportado do .doc)
export default {
  year: '1997/98',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 1997',
      year: 1997,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 18, weekday: 'Sáb', events: ['Jamboree no Ar - Campolide'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Animação da Fé com o Sr. Prior'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 2, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid 24 Horas BTT - Região de Lisboa'], highlight: true },
            [
              { day: 8, weekday: 'Sáb', events: ['Atelier de Formação'] },
              { day: 9, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 15, weekday: 'Sáb', events: ['Visita a um Museu - Lisboa / Alverca'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Raid em Sintra com Rappel e Slide - Sintra'] }],
            { merged: true, dayStart: 29, dayEnd: 1, monthEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Atividade do Ambiente'], highlight: true },
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['INDABA Regional 1997 - Alverca'], highlight: true, subtitle: '(Só para Animadores)' },
            [
              { day: 13, weekday: 'Sáb', events: ['Festa de Natal', 'Preparação do ACANAT 97'] },
              { day: 14, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            { merged: true, dayStart: 19, dayEnd: 23, weekdayStart: 'Sex', weekdayEnd: 'Ter', events: ['ACANAT 97'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 1998',
      year: 1998,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 18, weekday: 'Dom', events: ['Missa de Agrupamento'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Atelier ABC do Pioneiro', 'Reunião'] }],
            [{ day: 31, weekday: 'Sáb', events: ['Animação da Fé com o Sr. Prior', 'Teatro sobre S. João de Brito'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Visita à Fábrica da Nestlé - Carnaxide'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Reunião com prestação de provas', 'Festa de Carnaval'] }],
            { merged: true, dayStart: 21, dayEnd: 24, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Atividade de Carnaval - Quinta do Bom Jardim', 'Promessas de Agrupamento'], highlight: true },
            [{ day: 28, weekday: 'Sáb', events: ['Atividades de Risco'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Jogo de Cidade'] }],
            { merged: true, dayStart: 14, dayEnd: 15, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividades de Equipa'], highlight: true },
            [
              { day: 21, weekday: 'Sáb', events: ['Visita Parque Mafra', 'Rappel'] },
              { day: 22, weekday: 'Dom', events: ['Jogo de Futebol IIIª vs IVª'] },
            ],
            [{ day: 28, weekday: 'Sáb', events: ['Preparação ACAGRUP 98'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 4, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['ACAGRUP 98'], highlight: true },
          ],
        },
      ],
    },
  ],
};
