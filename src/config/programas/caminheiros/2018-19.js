// Clã 72 — Programa 2018/19.
// Fonte:
//   T1: Programa CLA T1 2018-2019.xlsx (folha Programa T1 2018-2019)
//   T2: Programa CLA T1 2018-2019.xlsx (folha Programa T2 2018-2019)
//   T3: Programa CLA T1 2018-2019.xlsx (folha Programa T3 2018-2019)
export default {
  year: '2018/19',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2018',
      year: 2018,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 13, weekday: 'Sáb', events: ['Abertura do Ano Escutista', 'Conselho de Tribo'] }],
            [
              { day: 18, weekday: 'Qui', events: ['Conselho de Guias de Tribo/Núcleo - Sede do Calhariz, Benfica'] },
              { day: 20, weekday: 'Sáb', events: ['Conselho de Clã', 'Preparar Jogos Agr 80 - Praia', 'Missa de Agrupamento'] },
            ],
            [{ day: 27, weekday: 'Sáb', events: ['Conselho de Guias de Agrupamento', 'Jogos de Agrupamento', 'Conselho de Agrupamento'] }],
            [{ day: 30, weekday: 'Ter', events: ['Salão Paroquial - Conselho de Pais'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [
              { day: 3, weekday: 'Sáb', events: ['"Chama" Atividade de Guias Núcleo'] },
              { day: 4, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            [{ day: 17, weekday: 'Sáb', events: ['Pastéis de Belém', 'Limpeza e arrumação da sala', 'Verificação do Material', 'Missa de Agrupamento'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Escalada e Progresso - Parque da Serafina'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Conselho de Clã', 'Atividade de Agrupamento - Advento', 'Banco Alimentar'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Reunião c/ o Padre Marcos', 'Preparação do Acanat', 'Conselho de Agrupamento'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Conselho de Clã', 'Jantar de Clã', 'Visionamento do Caminho do Triunfo'] }],
            { merged: true, dayStart: 26, dayEnd: 30, weekdayStart: 'Qua', weekdayEnd: 'Dom', events: ['ACANAT 2018 - Drave'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2019',
      year: 2019,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 12, weekday: 'Sáb', events: ['Conselho de Guias', 'Conselho de Clã', 'Elaboração do Programa', 'Missa de Agrupamento'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Organização Ceia de Reis - Igreja do Restelo', 'Ceia de Reis'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Dia de São Paulo', 'Atividade de Núcleo'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['"Painel Caminhada"', 'Progresso', 'Conselho de Guias'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Progresso', 'Torneio de Ping-pong', 'Apresentação da Equipa do Cenáculo', 'Missa de Agrupamento'] }],
            [
              { day: 23, weekday: 'Sáb', events: ['Conselho de Guias', 'Preparação do Acagrup', 'Caminhada "Casa"'] },
              { day: 24, weekday: 'Dom', events: ['Caminhada "Casa"'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 5, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP', 'Promessas', 'Atividade de Agrupamento'], highlight: true },
            { merged: true, dayStart: 8, dayEnd: 10, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Cenáculo', 'Atividade de Núcleo'], highlight: true },
            [{ day: 16, weekday: 'Sáb', events: ['Atividade de Angariação de Fundos', 'Missa de Agrupamento'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Preparação do ACAPAS', 'Progresso', 'Conselho de Guias'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Atividades de Secção', 'Atividade de Núcleo'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Trilhos noturnos - Trilho da Fórnea'] }],
            { merged: true, dayStart: 13, dayEnd: 16, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAPAS - Qtª Bom Sucesso "Casa"'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2019',
      year: 2019,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 28, weekday: 'Dom', events: ['São Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Conselho de Clã'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Tour Cultural', 'Conselho de Guias'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Ocean Plastics Lab in Lisboa', 'Missa de Agrupamento'] }],
            [
              { day: 23, weekday: 'Qui', events: ['6ª Tertúlia - Igreja Benfica'] },
              { day: 25, weekday: 'Sáb', events: ['Banco Alimentar'] },
              { day: 26, weekday: 'Dom', events: ['Banco Alimentar'] },
            ],
            [
              { day: 27, weekday: 'Seg', events: ['Santos-o-Velho - Conselho de Guias de Núcleo'], subtitle: '(Só para Guias)' },
              { day: 31, weekday: 'Sex', events: ['Agr - Dia dos Vizinhos'] },
            ],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Ir à Casa'] }],
            [
              { day: 8, weekday: 'Sáb', events: ['Agr - Arraial'] },
              { day: 9, weekday: 'Dom', events: ['Agr - Arraial'] },
            ],
            [{ day: 15, weekday: 'Sáb', events: ['Atividade de Ligação', 'Pintura do Muro "Nuno Álvares Pereira"', 'Aniversário do Agrupamento', 'Missa de Agrupamento'] }],
            [{ day: 21, weekday: 'Sex', events: ['Vigília', 'Promessas/Aniversário'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 19, dayEnd: 8, monthEnd: 8, weekdayStart: 'Sex', weekdayEnd: 'Qui', events: ['Jamboree'], highlight: true },
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 10, dayEnd: 17, weekdayStart: 'Sáb', weekdayEnd: 'Sáb', events: ['Rover'], highlight: true },
          ],
        },
      ],
    },
  ],
};
