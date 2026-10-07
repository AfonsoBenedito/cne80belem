// Alcateia 16 — Programa 2014/15.
// Fonte:
//   T1: 1º Trimestre.pdf
//   T2: 2º Trimestre.pdf
//   T3: 3º Trimestre.pdf
export default {
  year: '2014/15',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2014',
      year: 2014,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Abertura do Ano', 'Missa de Agrupamento'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Reunião'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Reunião Pe. José Manuel Ferreira', '"Banderloques no Espaço" - Ver um filme', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 25, dayEnd: 26, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['"Mougli em treinos" - Liceu Passos Manuel', 'Aguarela'], highlight: true, subtitle: '(Só para Guias e Sub-Guias)' },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['"Mougli descobre as estrelas"', 'Visita ao Planetário'] }],
            [{ day: 9, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 15, weekday: 'Sáb', events: ['"Via Láctea" - Jogo Pista', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 22, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['"Mougli, Ferramentas... Ação"', 'Acantonamento'], highlight: true },
            [{ day: 29, weekday: 'Sáb', events: ['"Missão de Abastecimentos"', 'Banco Alimentar Contra a Fome'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 13, weekday: 'Sáb', events: ['"Mougli planifica o treino"', 'Preparação Acampamento'] }],
            { merged: true, dayStart: 19, dayEnd: 21, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['"Mougli no Centro de Treino Espacial"', 'Acampamento de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2015',
      year: 2015,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 17, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Teatro', '"Mougli vê uma demonstração de treinos"', 'Limpeza da Sede'] }],
            [{ day: 31, weekday: 'Sáb', events: ['Caça ao Tesouro', '"1.º treino de observação e orientação"'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Prep. Acampamento', 'Gincana de Jogos tradicionais', '"Treino de Astúcia"'] }],
            { merged: true, dayStart: 14, dayEnd: 15, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acamp. Carnaval'], highlight: true },
            [
              { day: 21, weekday: 'Sáb', events: ['Vigília de Oração'] },
              { day: 22, weekday: 'Dom', events: ['Promessas'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Escalada', '"O espaço visto de cima"', 'Limpeza da Sede'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Prep. Acampamento', 'Jogo do Saco', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 21, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acamp. Páscoa'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2015',
      year: 2015,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 26, weekday: 'Dom', events: ['S. Jorge 2015'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACAGRUP 2015'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['Prep. Arraial 2015'] }],
            [{ day: 23, weekday: 'Sáb', events: ['"Mougli sobre rodas"'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Banco Alimentar Contra a Fome'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['"Parque Aventura"'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Atelier de Teatro'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Vigília e Promessas', 'Aniversário de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['"Mougli vai à Praia"'] }],
          ],
        },
      ],
    },
  ],
};
