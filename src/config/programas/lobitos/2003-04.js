// Alcateia 16 — Programa 2003/04.
// Fonte:
//   T1: Programa 1º trimestre 03-04.doc
//   T2: Programa 2º trimestre 03-04.doc
//   T3: Programa 3º trimestre 03-04.doc
export default {
  year: '2003/04',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2003',
      year: 2003,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Início do Ano Escutista'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Elaboração do Programa de Atividades', 'Eleição de Guia dos Guias, do Guia e do Sub-Guia'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Jamboree no Ar na Sede dos escuteiros de Linda-a-Velha'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Conselho de Guias', 'Espaço do Bando', '1.ª e 5.ª Aprendizagem'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Conselho de Alcateia', '7.ª e 9.ª(a) Aprendizagem'] }],
            [{ day: 8, weekday: 'Sáb', events: ['2.ª Aprendizagem', 'Espaço do Bando'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Dia de Núcleo'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Preparação do Acantonamento de Natal', '4.ª e 9.ª(b) Aprendizagem'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Acampamento de Alcateia AcantoNatal 2003'], highlight: true },
            [
              { day: 13, weekday: 'Sáb', events: ['10.ª Aprendizagem', 'Conselho de Alcateia', 'Conselho de Guias'] },
              { day: 14, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 20, weekday: 'Sáb', events: ['Atividade de Animadores da I.ª Secção'] }],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2004',
      year: 2004,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 10, weekday: 'Sáb', events: ['Elaboração do plano de atividades'] }],
            { merged: true, dayStart: 17, dayEnd: 18, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade de Guias e Sub-Guias'], highlight: true },
            [{ day: 24, weekday: 'Sáb', events: ['Conselho de Guias', 'Limpeza geral ao Covil', 'Ponto da situação em relação às provas'] }],
            [{ day: 31, weekday: 'Sáb', events: ['Sr. Prior', '6.ª, 4.ª e 3.ª Aprendizagem'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Conselho de Alcateia', 'Atelier das profissões'] }],
            [
              { day: 14, weekday: 'Sáb', events: ['Preparação da velada', 'Velada de Armas'] },
              { day: 15, weekday: 'Dom', events: ['Missa de Agrupamento', 'Promessas'] },
            ],
            { merged: true, dayStart: 20, dayEnd: 22, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acantonamento'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Visita ao Aquário Vasco da Gama'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Conselho de Alcateia', '3.ª, 7.ª Aprendizagem'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['Conselho de Alcateia', '6.ª Aprendizagem'] },
              { day: 21, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 27, weekday: 'Sáb', events: ['Preparação para o Acagrup 03/04'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 3, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Qui', events: ['Acagrup 2003/2004'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2004',
      year: 2004,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 18, weekday: 'Dom', events: ['Missa do São Jorge', 'Escalada no Monsanto'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Conselho de Guias', 'Elaboração do plano de atividades', 'Verificação do material'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Visita ao Zoo'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Trabalho no Covil'] }],
            [
              { day: 15, weekday: 'Sáb', events: ['Visita à exposição de Dinossauros'] },
              { day: 16, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 22, weekday: 'Sáb', events: ['Jogos de Praia'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Atividade de preparação para o Acareg', 'Ateliers'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Cinema'] }],
            { merged: true, dayStart: 10, dayEnd: 13, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['Atividade no Exterior'], highlight: true },
            [
              { day: 19, weekday: 'Sáb', events: ['Preparação da velada', 'Velada de Armas'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento', 'Promessas'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Festa Final'] }],
          ],
        },
      ],
    },
  ],
};
