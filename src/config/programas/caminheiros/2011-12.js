// Clã 72 — Programa 2011/12.
// Fonte:
//   T1: Programa 1º Trimestre - Aprovado.xls
//   T2: Programa 2º Trimestre - Aprovado.xls
//   T3: Programa 3º Trimestre - Aprovado.xls
export default {
  year: '2011/12',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2011',
      year: 2011,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Abertura do Ano Escutista 2011/2012', 'Programação do ano - Cargos, Objetivos e Programa'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Querido mudei o Albergue'] }],
            [
              { day: 14, weekday: 'Sex', events: ['Conselho de Agrupamento'] },
              { day: 15, weekday: 'Sáb', events: ['Hike de BTT'] },
            ],
            [{ day: 22, weekday: 'Sáb', events: ['Preparação do Halloween', 'Missa de Agrupamento'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Distribuição do BI da JF', 'Halloween'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Reunião com o Sr. Prior - Querido mudei o Albergue'] }],
            [{ day: 13, weekday: 'Dom', events: ['Dia de Núcleo - Benfica'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Reunião com o Sr. Prior', 'Missa de Agrupamento', 'Magusto'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Distribuição do BI da JF', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Querido mudei o Albergue'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Querido mudei o Albergue'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Querido mudei o Albergue', 'Preparação do Acanat 2011'] }],
            { merged: true, dayStart: 26, dayEnd: 30, weekdayStart: 'Seg', weekdayEnd: 'Sex', events: ['Atividade de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2012',
      year: 2012,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Reunião de Tribo', 'Elaboração do programa', 'Proj. Caminhada'] }],
            [{ day: 14, weekday: 'Sáb', events: ['"Querido Mudei o Albergue"', 'Preparação para as promessas'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Projeto Caminhada', 'Missa de Agrupamento'] }],
            [
              { day: 25, weekday: 'Qua', events: ['São Paulo ao Rubro'] },
              { day: 28, weekday: 'Sáb', events: ['"Mude" - Museu do Design e Moda'] },
            ],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['"Querido Mudei o Albergue"', 'Projeto Caminhada'] }],
            [
              { day: 11, weekday: 'Sáb', events: ['Reunião de Tribo', 'Preparação das Promessas', 'Vigília - Pernoita'] },
              { day: 12, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            { merged: true, dayStart: 18, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Atividade de Carnaval'], highlight: true },
            [{ day: 25, weekday: 'Sáb', events: ['Projeto Caminhada "Aprender no Terreno"'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Projeto Caminhada. "Querido Mudei o Albergue"'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Momento de Grupo - Caminhada, Jantar e Cinema'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Acagrup 2012'], highlight: true }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2012',
      year: 2012,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 14, weekday: 'Sáb', events: ['Reunião de Guias', 'Reunião de Tribo', 'Avaliação do 2º Trimestre', 'Elaboração do programa'] }],
            [{ day: 22, weekday: 'Dom', events: ['São Jorge'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Projeto Caminhada', 'Apresentação dos Objetivos Pessoais', 'Jantar/Teatro "As Mulheres Não Percebem"'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Atividade de Serviço', 'Procissão', 'Missa de Agrupamento'] }],
            [{ day: 12, weekday: 'Sáb', events: ['LX Aventura'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Parq. Desp. Pedrouços - Montagens Arraial', 'Projeto Caminhada'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Distribuição do BI da JF', 'Banco Alimentar', 'Limpezas da sede'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Hike BTT Belém/Guincho'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Preparação da Vigília e Promessas', 'Vigília'] },
              { day: 17, weekday: 'Dom', events: ['Missa de Agrupamento/Promessas'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['Distribuição do BI da JF', 'Pedra Amarela', 'Limpezas da sede'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Preparação da DRAVE'] }],
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 27, dayEnd: 31, weekdayStart: 'Seg', weekdayEnd: 'Sex', events: ['Drave - Base Nacional IV'], highlight: true },
          ],
        },
      ],
    },
  ],
};
