// Alcateia 16 — Programa 2021/22.
// Fonte:
//   T1: Programa Alcateia 16 - 2021-2022.xlsx (folha Programa T1 2021-2022)
//   T2: Programa Alcateia 16 - 2021-2022.xlsx (folha Programa T2 2021-2022)
//   T3: Programa Alcateia 16 - 2021-2022.xlsx (folha Programa T3 2021-2022)
export default {
  year: '2021/22',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2021',
      year: 2021,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 23, weekday: 'Sáb', events: ['Conselho de Agrupamento', 'Abertura do Ano Escutista 2021-2022', 'Missa de Agrupamento'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Reunião: Formação de Bandos'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Reunião: Escolha dos Cargos', 'Limpeza da Sede'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Cinema: O Livro da Selva', 'Quiz', 'Conselho de Pais'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Atividade com Assistência', 'Preparação do ACANTONAT', 'Explicação das Provas/Progresso', 'Investidura dos Guias e Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Dom', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            { merged: true, dayStart: 3, dayEnd: 5, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACANTONAT - Sede do Agrupamento 71 Parede'], highlight: true },
            [
              { day: 11, weekday: 'Sáb', events: ['Atividade de Advento', 'Vigília de Oração'] },
              { day: 12, weekday: 'Dom', events: ['Atividade de Advento / Missa de Agrupamento / Promessas'] },
            ],
            [{ day: 18, weekday: 'Sáb', events: ['Organização do Património e Limpeza da Sede', 'Luz da Paz de Belém'] }],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2022',
      year: 2022,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 15, weekday: 'Sáb', events: ['Viagem de Barco: imaginário e programa', 'Ensinamento dos nós de correr e direito', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Balú Ensina', 'Preparação do Imaginário'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Balú Ensina', 'Arrumação do Covil Olímpico', 'Verificação do Material da Alcateia'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Balú Ensina', 'Conhecer os Paralímpicos'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Balú Ensina', 'Judo', 'Missa de Agrupamento'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 5, dayEnd: 6, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento/Acantonamento - AGR 71 Parede'], highlight: true },
            [{ day: 12, weekday: 'Sáb', events: ['Retiro Quaresmal para Dirigentes', 'Hipismo'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Balú Ensina', 'Ginástica', 'Missa de Agrupamento'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Balú Ensina', 'Mini-golfe'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Peregrinação a Fátima em Agrupamento'] }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2022',
      year: 2022,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 30, weekday: 'Sáb', events: ['Verificação Material; Revisão de Provas e Sistema de Progresso; Jogos'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Dia de Núcleo'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Preparação Promessas'] }],
            { merged: true, dayStart: 21, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['ACAGRUP: Vigílias e Promessas'], highlight: true },
            { merged: true, dayStart: 28, dayEnd: 29, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Banco Alimentar'] },
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Equitação', 'Centro Hípico Militar'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Jogos na Praia'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Arrear da Bandeira', 'Comité Olímpico', 'Limpeza da Sede'] }],
          ],
        },
      ],
    },
  ],
};
