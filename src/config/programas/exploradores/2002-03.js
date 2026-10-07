// Expedição 17 — Programa 2002/03.
// Fonte:
//   T1: Programa 1º Trimestre.doc
//   T2: Programa 2 Semestre.doc
export default {
  year: '2002/03',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2002',
      year: 2002,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 12, weekday: 'Sáb', events: ['Preparação do Painel da Aventura'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Jamboree no Ar - Linda-a-Velha'] }],
            [{ day: 27, weekday: 'Dom', events: ['Campanha Específica de Calendários'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento - Quinta de Santo António'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['Magusto'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Ateliers'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Dia de Patrulha'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Raid'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Preparação da Festa de Natal'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Festa de Natal'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Cinema - Senhor dos Anéis II'] }],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2003',
      year: 2003,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 18, weekday: 'Sáb', events: ['Do You Know England?'] }],
            { merged: true, dayStart: 25, dayEnd: 26, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade de Cargos'], highlight: true, subtitle: '(Fim de semana para os Guias; domingo para os restantes elementos)' },
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Traditional Games'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Raid'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Preparação da Vigília e do ACAGRUP'] }],
            [
              { day: 22, weekday: 'Sáb', events: ['Preparação da Vigília e Vigília'] },
              { day: 23, weekday: 'Dom', events: ['Promessas'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 4, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP'], highlight: true },
            [{ day: 15, weekday: 'Sáb', events: ['Atelier de Comida Inglesa'] }],
            [{ day: 22, weekday: 'Sáb', events: ['English Day'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Preparação da Browsea Expedition'] }],
            { merged: true, dayStart: 12, dayEnd: 19, weekdayStart: 'Sáb', weekdayEnd: 'Sáb', events: ['Browsea Expedition'], highlight: true },
          ],
        },
      ],
    },
  ],
};
