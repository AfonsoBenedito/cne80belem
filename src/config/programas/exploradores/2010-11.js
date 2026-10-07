// Expedição 17 — Programa 2010/11.
// Fonte:
//   T1: Programa_1trimestre.pdf
//   T2: Programa_2trimestre.pdf
//   T3: Programa_3trimestre.pdf
export default {
  year: '2010/11',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2010',
      year: 2010,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Abertura do Ano'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Simbologia'] }],
            [{ day: 16, weekday: 'Sáb', events: ['JOTA-JOTI'] }],
            [{ day: 24, weekday: 'Dom', events: ['123 Explorador'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Propostas e Escolha da Aventura'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Jogo Mistério'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Raid Fotográfico', 'Missa de Agrupamento', 'Magusto de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Cross de Orientação'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Preparação do Acampamento', 'Festa de Natal da Paróquia'] }],
            { merged: true, dayStart: 18, dayEnd: 21, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2011',
      year: 2011,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 15, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Gincana em Belém - 95% água'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Acampamentos de Patrulha'], highlight: true }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Visita ao Aquário Vasco da Gama - Os caminhos da água'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Jogos Surpresa - Rega aos Jardins'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Velada de Armas'] },
              { day: 20, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Jogos de Praia - Dominar as Ondas'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 5, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Carnaval'], highlight: true },
            [{ day: 19, weekday: 'Sáb', events: ['Load Day', 'Missa de Agrupamento'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Espeleologia em Monsanto - Lx debaixo de Terra'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Preparação do ACAGRUP'] }],
            { merged: true, dayStart: 9, dayEnd: 13, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['ACAGRUP'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Maio a Junho 2011',
      year: 2011,
      months: [
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 8, weekday: 'Dom', events: ['S. Jorge'] }],
            { merged: true, dayStart: 14, dayEnd: 15, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Lx Aventura'], highlight: true },
            [{ day: 21, weekday: 'Sáb', events: ['Montagens do Arraial', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Gincana na Praia'] }],
            [
              { day: 18, weekday: 'Sáb', events: ['Velada de Armas'] },
              { day: 19, weekday: 'Dom', events: ['Promessas'] },
            ],
            { merged: true, dayStart: 23, dayEnd: 26, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['Acampamento de Verão'], highlight: true },
          ],
        },
      ],
    },
  ],
};
