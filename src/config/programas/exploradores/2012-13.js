// Expedição 17 — Programa 2012/13.
// Fonte:
//   T1: Programa_1trimestre.pdf
//   T2: Programa_2trimestre.pdf
//   T3: Programa_3trimestre.pdf
export default {
  year: '2012/13',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2012',
      year: 2012,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Abertura do Ano'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Remodelação da Base'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Escolha da Aventura'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Segunda - EnCargos'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['Acampamento de Patrulhas'], highlight: true },
            [{ day: 11, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Filme "A volta ao Mundo em 80 dias"', 'Missa de Agrupamento'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Raid em Belém'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Progresso', 'Banco Alimentar'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Preparação do Acampamento de Natal', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 15, dayEnd: 18, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2013',
      year: 2013,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Preparação do Trimestre', 'Jantar de Cangurus'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Jogo de Cidade'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Visita aos Jerónimos', 'Missa de Agrupamento'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Atividade com os Marítimos'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [
              { day: 1, weekday: 'Sex', events: ['Atividade de Cangurus'] },
              { day: 2, weekday: 'Sáb', events: ['Preparação do ACACAR', 'Gincana em Belém'] },
            ],
            { merged: true, dayStart: 9, dayEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Carnaval'], highlight: true },
            [
              { day: 23, weekday: 'Sáb', events: ['Velada de Armas'] },
              { day: 24, weekday: 'Dom', events: ['Promessas'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['"Da Índia a Hong Kong - ou como perder o seu amo" - Raid Fotográfico'] }],
            [{ day: 9, weekday: 'Sáb', events: ['"Pelos Mares da China nada nos deterá até Yokohama" - Rappel em Sintra'] }],
            { merged: true, dayStart: 16, dayEnd: 19, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2013',
      year: 2013,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Preparação do Trimestre'] }],
            { merged: true, dayStart: 13, dayEnd: 14, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Lx Aventura'], highlight: true },
            [{ day: 20, weekday: 'Sáb', events: ['"Confronto de Fogg e Proctor em S. Francisco" - Vida de S. Tiago', 'Definição de Objetivos', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Dom', events: ['S. Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['"Atravessar a Ponte antes que caia" - Atelier de Pioneirismo', 'Verificação de Material'] }],
            [{ day: 11, weekday: 'Sáb', events: ['"Sequestro de Passepartout pela tribo Sioux" - Raid com Azimutes'] }],
            [{ day: 18, weekday: 'Sáb', events: ['"De trenó para Nova York" - Gincana', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['"Henrietta, o Barco do Atlântico" - Visita ao Museu do CNE, Comemoração dos 90 anos do CNE'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 2, weekday: 'Dom', events: ['Banco Alimentar'] }],
            [{ day: 8, weekday: 'Sáb', events: ['"Queenstown, Liverpool e Londres" - Praia'] }],
            [
              { day: 15, weekday: 'Sáb', events: ['Velada de Armas'] },
              { day: 16, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 22, weekday: 'Sáb', events: ['Atividade com os Marítimos'] }],
            [{ day: 29, weekday: 'Sáb', events: ['"Menos de 24h" - Preparação do Acampamento de Verão'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 11, dayEnd: 14, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['Acampamento de Verão'], highlight: true },
          ],
        },
      ],
    },
  ],
};
