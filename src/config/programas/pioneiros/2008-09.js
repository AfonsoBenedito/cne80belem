// Comunidade 9 — Programa 2008/09.
// Fonte:
//   T1: Programa 1º Trimestre Aprovado.xls
//   T2: Programa 2º Trimestre Aprovado.xls
//   T3: Programa 3º Trimestre Aprovado.xls
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
            [{ day: 4, weekday: 'Sáb', events: ['Abertura do Ano Escutista 2008/2009'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Conselho de Grupo', 'Elaboração do programa'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Jamboree no Ar - Serafina'] }],
            { merged: true, dayStart: 25, dayEnd: 27, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Fescut 2008'], highlight: true },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [
              { day: 1, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta', 'Conselho de Guias', 'Iniciação do Empreendimento'] },
              { day: 2, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 8, weekday: 'Sáb', events: ['Empreendimento ou Ativ. de Grupos Pioneiros'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Empreendimento, definição das oficinas', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Preparação da Atividade do Advento, ou atividade de Grupos Pioneiros'] }],
            { merged: true, dayStart: 29, dayEnd: 1, monthEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Advento 2008'], highlight: true },
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Ida a uma exposição ou um teatro'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Atividade de Animadores'] }],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2009',
      year: 2009,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Elaboração do Programa do 2º Trimestre', 'Missa de Agrupamento'] }],
            [
              { day: 17, weekday: 'Sáb', events: ['Jantar', 'Cinema e pernoita no Abrigo'] },
              { day: 18, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            [{ day: 24, weekday: 'Sáb', events: ['Atividade de Agrupamento', 'Conselho de Grupo', 'Provas'] }],
            [{ day: 31, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta', 'Provas', 'Sr. Prior', 'Jogos de Mesa'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 1, weekday: 'Dom', events: ['Missa de Agrupamento'] }],
            [{ day: 7, weekday: 'Sáb', events: ['Slide e Rappel'] }],
            [
              { day: 14, weekday: 'Sáb', events: ['Velada de Armas. Pernoita no Abrigo', 'Preparação da Ativ. de Carnaval'] },
              { day: 15, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            { merged: true, dayStart: 21, dayEnd: 25, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['Carnaval'], highlight: true },
            [{ day: 28, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta', 'Arrumação do Abrigo - Provas'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 1, weekday: 'Dom', events: ['Missa de Agrupamento'] }],
            { merged: true, dayStart: 7, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade de Grupos Pioneiros'], highlight: true },
            { merged: true, dayStart: 14, dayEnd: 15, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade de Animadores'], highlight: true },
            { merged: true, dayStart: 21, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid BTT em Lx', 'Preparação do Acampamento de Páscoa'], highlight: true },
            [{ day: 28, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta', 'Preparação Ativ. de Páscoa', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 29, dayEnd: 2, monthEnd: 4, weekdayStart: 'Dom', weekdayEnd: 'Qui', events: ['Acampamento de Páscoa'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2009',
      year: 2009,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 18, weekday: 'Sáb', events: ['Conselho G. Pioneiro - Tiragem de Provas', 'Missa de Agrupamento'] }],
            [
              { day: 25, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta'] },
              { day: 26, weekday: 'Dom', events: ['São Jorge'] },
            ],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acagrup\' 2009'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['Arraial - Montagens'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Arraial - Montagens', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 23, dayEnd: 24, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade de Animadores'], highlight: true },
            [{ day: 30, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [
              { day: 6, weekday: 'Sáb', events: ['Exposição / Teatro'] },
              { day: 7, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 13, weekday: 'Sáb', events: ['Conselho G. Pioneiro - Tiragem de Provas', 'Prep. da Vigília - Preparação Atividade de Verão'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['Velada de Armas'] },
              { day: 21, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            { merged: true, dayStart: 26, dayEnd: 28, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento de Verão', 'Distribuição do Boletim da Junta'], highlight: true },
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Sáb', events: ['Acareg 2009'], highlight: true },
          ],
        },
      ],
    },
  ],
};
