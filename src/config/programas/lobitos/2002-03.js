// Alcateia 16 — Programa 2002/03.
// Fonte:
//   T1: Programa 1º trimestre 02-03.doc
//   T2: Programa 2º trimestre 02-03.doc
//   T3: Programa 3º trimestre 02-03.doc
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
            [{ day: 12, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Gincana', 'Tiragem de provas'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Jamboree no Ar'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Atelier de caracterização facial', 'Preparação para o Acampamento', 'Tiragem de provas'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento na Estação Agronómica Nacional'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['Atividade de Núcleo', 'Tiragem de provas'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Atelier de 1.º Socorros', 'Tiragem de provas'] },
              { day: 17, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['Raid de pistas', 'Escalada/Rappel'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Atelier de Pioneirismo', 'Tiragem de provas'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [
              { day: 7, weekday: 'Sáb', events: ['Atelier de culinária'] },
              { day: 8, weekday: 'Dom', events: ['Febre Amarela'], subtitle: '(Só para Animadores)' },
            ],
            [{ day: 14, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Preparação para o Acantonatal', 'Tiragem de provas'] }],
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
            [{ day: 11, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Programação do trimestre'] }],
            { merged: true, dayStart: 18, dayEnd: 19, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Aguarela (Guias e Sub-Guias)', 'Missa de Agrupamento'], highlight: true },
            [{ day: 25, weekday: 'Sáb', events: ['Conselho de Guias', 'Partilha de ateliers do Aguarela', 'Atelier de Prevenção Rodoviária', 'Tiragem de provas'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Preparação do Acampamento de Alcateia', 'Tiragem de provas'] }],
            { merged: true, dayStart: 8, dayEnd: 9, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento com a Alcateia das Mercês'], highlight: true },
            [
              { day: 15, weekday: 'Sáb', events: ['Visita ao Planetário', 'Museu da Marinha', 'Tiragem de provas'] },
              { day: 16, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 22, weekday: 'Sáb', events: ['Preparação do Acampamento de Agrupamento'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 5, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['Acagrup 2003', 'Velada de Armas', 'Promessas'], highlight: true },
            [{ day: 8, weekday: 'Sáb', events: ['Conselho de Guias', 'Dia no Covil'] }],
            [
              { day: 15, weekday: 'Sáb', events: ['Escalada/Rappel'] },
              { day: 16, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 22, weekday: 'Sáb', events: ['Atividade de Núcleo - Festa do Sol', 'Tiragem de provas'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Visita ao Museu da Ciência', 'Tiragem de provas'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Preparação do Acampamento de Páscoa', 'Tiragem de provas'] }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Maio a Julho 2003',
      year: 2003,
      months: [
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 4, weekday: 'Dom', events: ['Atividade - Regional São Jorge'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Conselho de Guias', 'Programação do trimestre', 'Tiragem de provas'] }],
            [
              { day: 17, weekday: 'Sáb', events: ['Visita ao Oceanário'] },
              { day: 18, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            { merged: true, dayStart: 23, dayEnd: 25, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Atividade de Animadores'], highlight: true, subtitle: '(Só para Animadores)' },
            [{ day: 31, weekday: 'Sáb', events: ['Gincana de Percurso', 'Rappel'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Preparação do Acampamento de Alcateia', 'Tiragem de provas'] }],
            { merged: true, dayStart: 12, dayEnd: 15, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['Acampamento de Alcateia ACAVER 2003'], highlight: true },
            [
              { day: 21, weekday: 'Sáb', events: ['Preparação da Velada de Armas e das Promessas', 'Velada de Armas'] },
              { day: 22, weekday: 'Dom', events: ['Missa/Promessas de Agrupamento'] },
            ],
            [{ day: 28, weekday: 'Sáb', events: ['Praia', 'Tiragem de provas'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Trabalhos no Covil', 'Tiragem de provas'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Cross de Orientação - Santa Rita'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Avaliação do Ano Escutista', 'Festa'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
          ],
        },
      ],
    },
  ],
};
