// Clã 72 — Programa 2020/21.
// Fonte:
//   T1: Programa CLA 72 2020-2021.xlsx (folha Programa T1 2020-2021)
//   T2: Programa CLA 72 2020-2021.xlsx (folha Programa T2 2020-2021)
//   T3: Programa CLA 72 2020-2021.xlsx (folha Programa T3 2020-2021)
export default {
  year: '2020/21',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2020',
      year: 2020,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 17, weekday: 'Sáb', events: ['Abertura do Ano Escutista 2020-2021'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Missa de Agrupamento/Promessas'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['"Chama" Atividade de Guias Núcleo', 'Elaboração do Programa'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Apanhar Varas Bifurcadas'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Team Building'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Conselho de Agrupamento', 'Progresso'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Varas', 'Progresso', 'Limpeza Albergue'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Jantar e Troca de Prendas'] }],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2021',
      year: 2021,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Conselho de Agrupamento'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Elaboração do Programa', 'Progresso/Provas'] }],
            [{ day: 24, weekday: 'Dom', events: ['Saúde e Bem Estar', 'Progresso/Provas'] }],
            [{ day: 31, weekday: 'Dom', events: ['Técnica Escutista', 'Progresso/Provas'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Skills em Gestão', 'Progresso/Provas'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Reunião Equipa Cenáculo', 'Progresso/Provas'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Atividade de Agrupamento', 'Ambiente e Sustentabilidade'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 13, weekday: 'Sáb', events: ['Escutismo Pelo Mundo', 'Progresso/Provas'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Animação e Criatividade', 'Progresso/Provas'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Espiritualidade', 'Progresso/Provas', 'Atividade de Agrupamento - Domingo de Ramos'] }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2021',
      year: 2021,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Elaboração do Programa', 'Organização e Inscrição do São Jorge', 'Progresso/Provas'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Hike Cultural - GeoGuessr'] }],
            [{ day: 24, weekday: 'Sáb', events: ['São Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 2, weekday: 'Dom', events: ['Hike'] }],
            [
              { day: 8, weekday: 'Sáb', events: ['Dia de Núcleo', 'Atividade de Núcleo - Lyga-te ao Zero'] },
              { day: 9, weekday: 'Dom', events: ['Atividade de Núcleo - Lyga-te ao Zero'] },
            ],
            [
              { day: 15, weekday: 'Sáb', events: ['Serviço no Agrupamento', 'Missa de Agrupamento'] },
              { day: 16, weekday: 'Dom', events: ['SWA'] },
            ],
            [{ day: 22, weekday: 'Sáb', events: ['Gincana de Jogos na Praia'] }],
            { merged: true, dayStart: 29, dayEnd: 30, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Cenáculo', 'Eleições JNLO/JRL'], highlight: true },
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 19, weekday: 'Sáb', events: ['Workshop sobre Saúde e Bem-estar'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Jantar de Clã', 'Missa de Agrupamento/Promessas'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 4, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Ida à Casa', 'Acampamento de Sobrevivência'], highlight: true },
          ],
        },
      ],
    },
  ],
};
