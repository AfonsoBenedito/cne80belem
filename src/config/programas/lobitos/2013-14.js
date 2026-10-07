// Alcateia 16 — Programa 2013/14.
// Fonte:
//   T1: 1º Trimestre 2013-2014.xlsx
//   T2: 2º Trimestre 2013-2014.xlsx
//   T3: 3º Trimestre 2013-2014.xlsx
export default {
  year: '2013/14',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2013',
      year: 2013,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Abertura do Ano'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Configuração dos Bandos'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Conselho de Guias', 'Reunião', 'Missa de Agrupamento'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Conselho de Guias', 'Jogo de Pistas por Belém', 'Reunião de Pais'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Balú Ensina - Aspirantes', 'Atividade'] }],
            { merged: true, dayStart: 9, dayEnd: 10, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acantonamento'], highlight: true },
            [{ day: 17, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Atividade de Guias', 'Balú Ensina', 'Escalada'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Balú Ensina', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            { merged: true, dayStart: 7, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Aguarela (Guias e Sub-Guias)'], highlight: true },
            [{ day: 14, weekday: 'Sáb', events: ['Balú Ensina', 'Prep. Acampamento de Natal'] }],
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['Acampamento Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2014',
      year: 2014,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 18, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Teatro "A vida de Ron como gato"'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Visionamento Filme "Aprender Magia"'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Dia de Manutenção'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Visita Museu dos Dinossauros "A história da Pedra Filosofal"', 'Missa Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Preparação ACAGRUP', 'Jogo sobre BP "Harry Potter apanha o feiticeiro"'] }],
            { merged: true, dayStart: 28, dayEnd: 2, monthEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACAGRUP'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 2, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Vigília e Promessas'], highlight: true },
            [{ day: 15, weekday: 'Sáb', events: ['Jogos Interbandos "Aula de Voo em Hogsmeade"', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Raid com Roadbook "À procura de OCROKX"'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Preparação Acampamento Páscoa'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 5, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Páscoa "Começar a luta com Voldemort"'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2014',
      year: 2014,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 26, weekday: 'Sáb', events: ['Elaboração do Programa'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 1, weekday: 'Qui', events: ['S. Jorge 2014'] },
              { day: 4, weekday: 'Dom', events: ['Venda de Flores'] },
            ],
            [{ day: 10, weekday: 'Sáb', events: ['Jogo em Belém'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Escalada', 'Missa de Agrupamento'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Festa do Sol'] }],
            [{ day: 31, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [
              { day: 14, weekday: 'Sáb', events: ['Vigília', 'Limpeza da Sede'] },
              { day: 15, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 21, weekday: 'Sáb', events: ['Atividade com os Escuteiros Marítimos'] }],
            [{ day: 28, weekday: 'Sáb', events: ['"Atividades Informais"'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Festa Final'] }],
          ],
        },
      ],
    },
  ],
};
