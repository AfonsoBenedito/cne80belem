// The Expedição's (Exploradores) quadro de pontuações, from the sheet "Pontuações" of the Livro
// de Unidade 2026/2027. Each activity's `points` holds what each patrulha got in each of the
// sheet's columns (a column left out is 0); Presenças and Farda count faltas, so they're entered
// as negative numbers. `details` is an activity's own scoring sheet (the Raid), when it has one.
//
// Patrulha colours: `color` marks the jar, marbles and chart line (both checked for colour-blind
// separation on white); `surface` + `onSurface` is a fill carrying text, `ink` is text (AA 4.5:1).
export const patrulhas = [
  { key: 'lobo', name: 'Lobo', emoji: '🐺', color: '#3a6ea5', surface: '#2f5f91', onSurface: '#ffffff', ink: '#2f5f91' },
  { key: 'esquilo', name: 'Esquilo', emoji: '🐿️', color: '#d97a2b', surface: '#a4521a', onSurface: '#ffffff', ink: '#a4521a' },
];

// `about` says what the category is, in the patrulhas' own words; `tip` is said to whoever did
// worse in it
export const categorias = [
  { key: 'atividade', label: 'Atividade principal', emoji: '⭐', about: 'O jogo ou a prova grande de cada sábado. Vale até 50 pontos!', tip: 'Joguem em equipa e ouçam bem as regras antes de começar.' },
  { key: 'sala', label: 'Tarefa de sala', emoji: '🧩', about: 'As missões que a patrulha faz durante a reunião, na sede.', tip: 'Dividam bem as tarefas: cada um faz a sua parte.' },
  { key: 'casa', label: 'Tarefa de casa', emoji: '🏠', about: 'O desafio para fazer em casa e trazer na reunião seguinte.', tip: 'Combinem na reunião quem faz o quê durante a semana.' },
  { key: 'grito', label: 'Grito', emoji: '📣', about: 'O grito da patrulha: quanto mais alto e afinado, mais pontos!', tip: 'Ensaiem o grito juntos até sair bem alto!' },
  { key: 'presencas', label: 'Presenças', emoji: '🙋', about: 'Cada falta de um elemento da patrulha tira pontos.', tip: 'Lembrem-se uns aos outros das reuniões: cada falta conta!' },
  { key: 'farda', label: 'Farda', emoji: '👕', about: 'Vir sem a farda completa tira pontos à patrulha.', tip: 'Preparem a farda na véspera: lenço, camisa e tudo!' },
];

// `mock`: the points are invented, to try the page with a whole year of data (the Raid's are
// real). The page says so in its band; set it to false once the sheet's real points are in.
export const pontuacoes = {
  mock: true,
  unidade: 'Expedição',
  year: '2026/2027',
  trimesters: [
    {
      label: '1º Trimestre',
      activities: [
        { date: '2026-10-03', name: 'Abertura do Ano 2026/2027' },
        { date: '2026-10-10', name: 'Venda de Calendários', points: { lobo: { atividade: 25, sala: 10, grito: 1, presencas: -3, farda: -1 }, esquilo: { atividade: 50, sala: 5, grito: 3 } } },
        { date: '2026-10-17', name: 'Elaboração do Programa do Trimestre' },
        { date: '2026-10-24', name: 'Variedade de Jogos', points: { lobo: { atividade: 50, sala: 2, casa: 13, grito: 3 }, esquilo: { atividade: 30, casa: 2, presencas: -2 } } },
        { date: '2026-10-30', name: 'Acantonamento', points: { lobo: { atividade: 50, sala: 3, casa: 7, grito: 8, presencas: -2 }, esquilo: { atividade: 22, sala: 7, grito: 10, presencas: -5 } } },
        {
          date: '2026-11-07',
          name: 'Raid',
          points: { lobo: { atividade: 25 }, esquilo: { atividade: 50 } },
          details: {
            note: 'Quem fez mais pontos no Raid ganhou 50 pontos na Atividade principal; a outra patrulha ganhou 25.',
            groups: [
              {
                label: 'Tempo',
                rows: [
                  {
                    label: 'Chegada (hora limite 18:45)',
                    lobo: { result: '18:35, 10 min antes', points: 0 },
                    esquilo: { result: '18:50, 5 min atrasados', points: -5 },
                  },
                ],
              },
              {
                label: 'Vendas',
                rows: [
                  {
                    label: 'Calendários vendidos',
                    lobo: { result: '5 calendários', points: 10 },
                    esquilo: { result: '4 calendários', points: 8 },
                  },
                ],
              },
              {
                label: 'Perguntas',
                rows: [
                  { label: 'Pergunta 1', lobo: { result: 'Correta', points: 10 }, esquilo: { result: 'Não apareceu', points: -5 } },
                  { label: 'Pergunta 2', lobo: { result: 'Não apareceu', points: -5 }, esquilo: { result: 'Não apareceu', points: -5 } },
                  { label: 'Pergunta 3', lobo: { result: 'Não apareceu', points: -5 }, esquilo: { result: 'Correta', points: 10 } },
                  { label: 'Pergunta 4', lobo: { result: 'Não apareceu', points: -5 }, esquilo: { result: 'Correta', points: 10 } },
                  { label: 'Pergunta 5', lobo: { result: 'Não apareceu', points: -5 }, esquilo: { result: 'Correta', points: 10 } },
                ],
              },
              {
                label: 'Penalizações',
                rows: [
                  {
                    label: 'Penalização',
                    lobo: { result: 'Nenhuma', points: 0 },
                    esquilo: { result: 'Apanharam o autocarro', points: -5 },
                  },
                ],
              },
            ],
          },
        },
        { date: '2026-11-14', name: 'Atividade relacionada com o Imaginário', points: { lobo: { atividade: 25, sala: 2, casa: 4, grito: 2, presencas: -4, farda: -1 }, esquilo: { atividade: 50, sala: 8, casa: 6 } } },
        { date: '2026-11-21', name: 'Formação de Guias (Núcleo)' },
        { date: '2026-11-28', name: 'Banco Alimentar', points: { lobo: { atividade: 25, sala: 9, presencas: -2, farda: -2 }, esquilo: { atividade: 50, sala: 8, casa: 5, presencas: -1 } } },
        { date: '2026-12-05', name: 'Dia da Sede / Material de Campo', points: { lobo: { atividade: 50, sala: 6, casa: 7, grito: 7 }, esquilo: { atividade: 30, sala: 2, presencas: -4, farda: -1 } } },
        { date: '2026-12-12', name: "Preparação do ACANAT '26", points: { lobo: { atividade: 50, sala: 7, casa: 2, grito: 8, presencas: -1 }, esquilo: { atividade: 25, sala: 4, casa: 4, grito: 2, presencas: -2, farda: -2 } } },
        { date: '2026-12-19', name: "ACANAT '26", points: { lobo: { atividade: 50, sala: 14, casa: 4, grito: 6, presencas: -2 }, esquilo: { atividade: 20, sala: 13, casa: 2, grito: 7, presencas: -2, farda: -2 } } },
      ],
    },
    {
      label: '2º Trimestre',
      activities: [
        { date: '2027-01-09', name: 'Ceia de Reis', points: { lobo: { atividade: 50, sala: 7, casa: 3, grito: 3, presencas: -1 }, esquilo: { atividade: 20, sala: 9, casa: 2, grito: 3, presencas: -2, farda: -2 } } },
        { date: '2027-01-30', name: 'INDABA', points: { lobo: { atividade: 25, sala: 7, casa: 1, presencas: -4, farda: -2 }, esquilo: { atividade: 50, sala: 4, casa: 3, grito: 1 } } },
        { date: '2027-02-06', name: "ACACAR '27", points: { lobo: { atividade: 20, sala: 11, casa: 2, grito: 1, presencas: -2, farda: -2 }, esquilo: { atividade: 50, sala: 12, casa: 10, presencas: -2 } } },
        { date: '2027-03-05', name: 'Vigília' },
        { date: '2027-03-06', name: 'Promessas', points: { lobo: { atividade: 50, sala: 14, casa: 5, grito: 4, presencas: -1 }, esquilo: { atividade: 25, casa: 1, grito: 3, presencas: -2, farda: -1 } } },
        { date: '2027-03-20', name: "ACAGRUP '27", points: { lobo: { atividade: 25, sala: 3, casa: 6, grito: 1, presencas: -3, farda: -2 }, esquilo: { atividade: 51, sala: 2, casa: 2, grito: 10, presencas: -2, farda: -1 } } },
      ],
    },
    {
      label: '3º Trimestre',
      activities: [
        { date: '2027-04-10', name: 'Indaba' },
        { date: '2027-04-17', name: 'Início do Trimestre', points: { lobo: { atividade: 30, sala: 4, casa: 1, grito: 3, presencas: -5, farda: -2 }, esquilo: { atividade: 50, sala: 11, casa: 1, presencas: -2 } } },
        { date: '2027-04-24', name: 'São Jorge', points: { lobo: { atividade: 51, sala: 7, casa: 4, grito: 10, presencas: -1, farda: -1 }, esquilo: { atividade: 20, sala: 3, casa: 3, grito: 5, presencas: -3 } } },
        { date: '2027-05-01', name: 'Venda de Flores', points: { lobo: { atividade: 50, sala: 5, casa: 8, grito: 8, farda: -1 }, esquilo: { atividade: 25, sala: 3, casa: 2, presencas: -2 } } },
        { date: '2027-05-08', name: 'Lx Aventura', points: { lobo: { atividade: 25, sala: 8, grito: 1, presencas: -4 }, esquilo: { atividade: 50, sala: 12, casa: 6, grito: 7, presencas: -2, farda: -1 } } },
        { date: '2027-05-15', name: 'Momento Espiritual' },
        { date: '2027-05-29', name: 'Banco Alimentar', points: { lobo: { atividade: 30, sala: 2, presencas: -2, farda: -1 }, esquilo: { atividade: 50, sala: 1, casa: 3, grito: 9 } } },
        { date: '2027-06-05', name: 'Arraial de SFX', points: { lobo: { atividade: 59, sala: 3, casa: 10, grito: 10, presencas: -2 }, esquilo: { atividade: 20, sala: 2, presencas: -2 } } },
        { date: '2027-06-19', name: '47º Aniversário do Agrupamento' },
      ],
    },
  ],
};

export const dayTotal = (activity, key) =>
  Object.values(activity.points?.[key] ?? {}).reduce((sum, n) => sum + n, 0);
