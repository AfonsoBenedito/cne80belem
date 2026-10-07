// Expedição 17 — Programa 2007/08.
// Fonte:
//   T1: Programa II ª Secção 2007-2008(1).xls (folha 1º Trimestre)
//   T2: Programa II ª Secção 2007-2008(1).xls (folha 2º Trimestre)
//   T3: Programa II ª Secção 2007-2008(1).xls (folha 3º Trimestre)
export default {
  year: '2007/08',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Setembro a Dezembro 2007',
      year: 2007,
      months: [
        {
          name: 'Setembro',
          month: 9,
          weeks: [
            [{ day: 22, weekday: 'Sáb', events: ['Elaboração do programa de atividades'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Apresentação da Aventura', 'Preparação do Acampamento'] }],
          ],
        },
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            { merged: true, dayStart: 5, dayEnd: 7, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento - Virtudes'], highlight: true },
            [{ day: 13, weekday: 'Sáb', events: ['Manutenção de Material'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['JOTA-JOTI', 'Provas'] },
              { day: 21, weekday: 'Dom', events: ['Missa do Agrupamento'] },
            ],
            [{ day: 27, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta', 'Preparação do Acampamento'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 4, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento - Belas'], highlight: true },
            [{ day: 11, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [
              { day: 17, weekday: 'Sáb', events: ['Reunião', 'Ateliers'] },
              { day: 18, weekday: 'Dom', events: ['Missa do Agrupamento'] },
            ],
            [{ day: 24, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta', 'Jogos em Monsanto'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Reunião', 'Ateliers'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Preparação do Acampamento de Natal'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Missa do Agrupamento - Festa da Paróquia'] }],
            { merged: true, dayStart: 16, dayEnd: 21, weekdayStart: 'Dom', weekdayEnd: 'Sex', events: ['Acampamento - Alcácer do Sal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2008',
      year: 2008,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Preparação do Programa do 2º Trimestre'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Preparação de Angariação de Fundos'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Raid BTT'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['123 Explorador'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 5, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['Raid Fotográfico'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Preparação da Velada de Armas', 'Velada de Armas'] },
              { day: 17, weekday: 'Dom', events: ['Missa de Agrupamento c/ Promessas'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Angariação de Fundos'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 2, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade de Guias'], highlight: true },
            [{ day: 8, weekday: 'Sáb', events: ['Atividade da Iª e Café Concerto da IVª'] }],
            { merged: true, dayStart: 15, dayEnd: 19, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['Acampamento Aventura'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Março a Junho 2008',
      year: 2008,
      months: [
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 29, weekday: 'Sáb', events: ['Distribuição do Boletim'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Jogo de Cidade'] }],
            [
              { day: 12, weekday: 'Sáb', events: ['Preparação do S. Jorge - Limpeza e Arrumação da Sede'] },
              { day: 13, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            { merged: true, dayStart: 19, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['São Jorge'], highlight: true },
            [{ day: 26, weekday: 'Sáb', events: ['Limpeza e Arrumação da Sede - Angariação de Fundos'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 1, weekday: 'Qui', events: ['Distribuição do Boletim'] },
              { day: 3, weekday: 'Sáb', events: ['Raid Topográfico'] },
              { day: 4, weekday: 'Dom', events: ['Banco Alimentar'] },
            ],
            [{ day: 10, weekday: 'Sáb', events: ['Atividade de Agrupamento'] }],
            [
              { day: 17, weekday: 'Sáb', events: ['Arraial - Montagem do Arraial - Preparação do Lx Aventura'] },
              { day: 18, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            { merged: true, dayStart: 23, dayEnd: 25, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Lx Aventura'], highlight: true },
            [{ day: 31, weekday: 'Sáb', events: ['Distribuição do Boletim - Montagem do Arraial'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 8, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acalvorex'], highlight: true },
            [{ day: 14, weekday: 'Sáb', events: ['Animação da Fé'] }],
            [
              { day: 21, weekday: 'Sáb', events: ['Vigília das Promessas'] },
              { day: 22, weekday: 'Dom', events: ['Missa de Agrupamento - Promessas e Aniversário'] },
            ],
            [{ day: 28, weekday: 'Sáb', events: ['Distribuição do Boletim - Raid Fotográfico'] }],
          ],
        },
      ],
    },
  ],
};
