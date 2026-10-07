// Expedição 17 — Programa 2013/14.
// Fonte:
//   T1: Programa 1º Trimestre.pdf
//   T2: Planeamento 2º Trimestre.xlsx (folha Draft)
export default {
  year: '2013/14',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2013',
      year: 2013,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Abertura, passagens'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Constituição de Patrulhas', 'Explicação da Aventura'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Escolha da Aventura, programa'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Conselho de Guias', 'Construção das Naves'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Ida ao Planetário', 'Jogos'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Raid Fotográfico com jogo busca-busca'] }],
            [{ day: 17, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            { merged: true, dayStart: 22, dayEnd: 23, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['Acampamento de Patrulhas'], highlight: true },
            [{ day: 30, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Segunda - EnCargos - Atividade de Núcleo'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Preparação do Acampamento'] }],
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['Acampamento'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2014',
      year: 2014,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Início dos trabalhos'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Progresso', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Angariação de Fundos', 'Progresso', 'Jogo "Fotoespacial"'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Gincana em Belém'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Dia de Manutenção'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Jogo das Trocas', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Jogos de "Team Building"', 'Preparação do ACAGRUP'] }],
            { merged: true, dayStart: 28, dayEnd: 2, monthEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACAGRUP - Vigília e Promessas'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 15, weekday: 'Sáb', events: ['Jogos sem gravidade', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['"Preparação para o grande dia"'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Acampamento de Páscoa'], highlight: true }],
          ],
        },
      ],
    },
  ],
};
