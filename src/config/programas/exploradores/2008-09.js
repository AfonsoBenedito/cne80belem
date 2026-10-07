// Expedição 17 — Programa 2008/09.
// Fonte:
//   T1: Programa_1trimestre.pdf (lido da imagem)
//   T2: programa_2trimestre.pdf (lido da imagem)
//   T3: Programa_3trimestre.pdf
export default {
  year: '2008/09',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2008',
      year: 2008,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Abertura do Ano'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Preparação do Trimestre'] }],
            [{ day: 18, weekday: 'Sáb', events: ['JOTA-JOTI'] }],
            { merged: true, dayStart: 24, dayEnd: 26, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['FESCUT - Casa Pia de Lisboa'], highlight: true },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [
              { day: 1, weekday: 'Sáb', events: ['Distribuição do Boletim e "Batalha de Mafeking"'] },
              { day: 2, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 8, weekday: 'Sáb', events: ['RoadBook em Monsanto e Escalada'] }],
            [{ day: 15, weekday: 'Sáb', events: ['"Proteção Civil"', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Raid em Sintra'] }],
            { merged: true, dayStart: 29, dayEnd: 1, monthEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Acampamento de Advento - Agrupamento'], highlight: true },
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Preparação do Acampamento de Natal'] }],
            { merged: true, dayStart: 19, dayEnd: 23, weekdayStart: 'Sex', weekdayEnd: 'Ter', events: ['Acampamento de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2009',
      year: 2009,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Elaboração do Programa', 'Missa de Agrupamento'] }],
            [{ day: 18, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Jogo de Agrupamento'] }],
            [{ day: 31, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta', 'Jogos em Belém - Popeye teme pela vida', 'Provas'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 1, weekday: 'Dom', events: ['Missa de Agrupamento'] }],
            [{ day: 7, weekday: 'Sáb', events: ['Raid Fotográfico - A Família do Popeye'] }],
            [
              { day: 14, weekday: 'Sáb', events: ['Preparação da Velada de Armas', 'Velada de Armas'] },
              { day: 15, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            { merged: true, dayStart: 21, dayEnd: 24, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Carnaval'], highlight: true },
            [{ day: 28, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Visita ao Museu da H2O - O Mapa da Aventura'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 1, weekday: 'Dom', events: ['Missa de Agrupamento'] }],
            { merged: true, dayStart: 7, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade de Animadores'], highlight: true },
            [{ day: 14, weekday: 'Sáb', events: ['Cross de Orientação - Brutos Vs Popeye', 'Missa de Agrupamento'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Jogos de Praia - Olívia vai à Praia'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Preparação do Acampamento da Páscoa'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 4, dayEnd: 7, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento da Páscoa'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2009',
      year: 2009,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 18, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            [{ day: 26, weekday: 'Dom', events: ['S. Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACAGRUP'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['Montagens do Arraial'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Lx Aventura'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Planetário - Popeye nas Estrelas'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [
              { day: 6, weekday: 'Sáb', events: ['Atividade em Alfama - Espinafres e Sardinhas'] },
              { day: 7, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 13, weekday: 'Sáb', events: ['Cross e escalada em Monsanto - Esticar as pernas'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['Velada de Armas'] },
              { day: 21, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 27, weekday: 'Sáb', events: ['Distribuição do Boletim', '"Preparação do Acampamento de Verão"'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 4, dayEnd: 7, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Verão'], highlight: true },
          ],
        },
      ],
    },
  ],
};
