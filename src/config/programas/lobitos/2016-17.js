// Alcateia 16 — Programa 2016/17.
// Fonte:
//   T1: Programa LOB 2016-2017 T1.pdf
//   T2: Programa LOB 2016-2017 T2.pdf
//   T3: Programa LOB 2016-2017 T3.pdf
export default {
  year: '2016/17',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2016',
      year: 2016,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 8, weekday: 'Sáb', events: ['Abertura do Ano Escutista', 'Missa de Agrupamento'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Reunião Bandos', 'Programa'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Tema da Caçada'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Investidura de Guias'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [
              { day: 12, weekday: 'Sáb', events: ['Aguarela (só Guias e Sub-Guias)'] },
              { day: 13, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            [{ day: 19, weekday: 'Sáb', events: ['Filme "Livro da Selva"', 'Missa de Agrupamento'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Artes'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Banco Alimentar'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Preparação do Acampamento'] }],
            { merged: true, dayStart: 17, dayEnd: 18, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento Natal - Quinta do Almaraz - Cacilhas'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2017',
      year: 2017,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Reunião'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Filme "Tintin"', 'Limpeza da Sede'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Teatro "Estavas à minha espera?"', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Jogos tradicionais'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Pavilhão do Conhecimento'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Celebração Penitencial', 'Fotoraid', 'Limpeza da Sede'] }],
            [
              { day: 18, weekday: 'Sáb', events: ['Preparação das Promessas', 'Vigília de Oração'] },
              { day: 19, weekday: 'Dom', events: ['Promessas de Agrupamento'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 11, dayEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento'], highlight: true },
            [{ day: 18, weekday: 'Sáb', events: ['Jogos', 'Culinária', 'Limpeza da sede', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Quinta Pedagógica, Lumiar'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Preparação do ACAGRUP'] }],
            { merged: true, dayStart: 6, dayEnd: 10, weekdayStart: 'Qui', weekdayEnd: 'Seg', events: ['ACAGRUP 2017'], highlight: true },
            [{ day: 23, weekday: 'Dom', events: ['Atividade Regional São Jorge'] }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Maio a Julho 2017',
      year: 2017,
      months: [
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 6, weekday: 'Sáb', events: ['Reunião de Alcateia'] },
              { day: 7, weekday: 'Dom', events: ['Venda de Flores'] },
            ],
            [{ day: 13, weekday: 'Sáb', events: ['Montagens no Arraial', 'Missa de Agrupamento'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Atividade de ligação', 'Progresso / Provas'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [
              { day: 3, weekday: 'Sáb', events: ['Conselho de Guias', 'Preparação da Vigília / Promessas', 'Vigília de Oração'] },
              { day: 4, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            [{ day: 24, weekday: 'Sáb', events: ['37.º Aniversário - Jogos em Agrupamento', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 30, dayEnd: 2, monthEnd: 7, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento com a Alcateia do Agrupamento 929'], highlight: true },
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 30, dayEnd: 6, monthEnd: 8, weekdayStart: 'Dom', weekdayEnd: 'Dom', events: ['ACANAC 2017 - Idanha-a-Nova'], highlight: true },
          ],
        },
      ],
    },
  ],
};
