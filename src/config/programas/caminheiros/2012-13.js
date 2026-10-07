// Clã 72 — Programa 2012/13.
// Fonte:
//   T1: Programa 1º Trimestre - 2012-2013 Aprovado.xls
//   T2: Programa 2º Trimestre - 2012-2013 Aprovado.xls
//   T3: Programa 3º Trimestre - 2012-2013 Aprovado 1.xls
export default {
  year: '2012/13',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2012',
      year: 2012,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Abertura do Ano Escutista 2012/2013', 'Missa de Agrupamento'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Eleição de Guia', 'Def. de Cargos', 'Início da Elab. do Programa, Definição de Objetivos'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Continuação da elaboração do programa e definição de objetivos', 'Pinturas no Albergue Simbologia'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Rappel em Sintra'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Confeção de Doces', 'Pinturas no Albergue Simbologia'] }],
            [{ day: 11, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Filme "The Way" e Jantar em Tribo', 'Missa de Agrupamento'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Confeção de Chocolates', 'Conselho de Agrupamento'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Preparação do ACANAT', 'Venda de Doces e Chocolates', 'Banco Alimentar'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Hike BTT Belém Guincho'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Preparação do ACANAT', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 20, dayEnd: 23, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['ACANAT'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2013',
      year: 2013,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Elab. do Programa, Definição de Objetivos'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Elab. do Programa, Definição de Objetivos', 'Reunião Org. Acagrup 2013'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Missa de Agrupamento', 'Teatro', 'Jantar MC'] }],
            [
              { day: 25, weekday: 'Sex', events: ['São Paulo ao Rubro'] },
              { day: 26, weekday: 'Sáb', events: ['Reunião Organização Acagrup 2013'] },
            ],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Exposição no Bairro Alto "Mutações e Convivências Pacíficas"'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Pinturas da Sala, Projeto Caminhada'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Ponto de situação "Caminhada"'] }],
            [
              { day: 23, weekday: 'Sáb', events: ['Reunião de Tribo', 'Preparação das Promessas', 'Vigília'] },
              { day: 24, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 3, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Cenáculo de Núcleo'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['Últimos Preparativos ACAGRUP 2013'] }],
            { merged: true, dayStart: 16, dayEnd: 19, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP 2013'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2013',
      year: 2013,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Conselho de Guias', 'Conselho de Clã - Execução do relatório do 2º trimestre e do relatório do Acagrup 2013'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Conselho de Clã - Avaliação do 2º trimestre/outros - Elaboração do programa do 3º Trimestre'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Projeto Caminhada. Finalizar Pinturas no Albergue', 'Limpeza da Sede', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Dom', events: ['São Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Paraquedismo na Arrábida ou Caminhada com canoagem no Portinho da Arrábida'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Exposição Padrão dos Descobrimentos "Fotógrafos do mundo Português de 1940"'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Projeto Caminhada', 'Limpeza da Sede', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Progresso e Provas. Preparação do Dia da Criança'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Voluntariado - Dia da Criança com a associação Candeia', 'Banco Alimentar'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Praia do Guincho'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Acampamento de Agrupamento', 'Vigília e Promessas'], highlight: true }],
            [{ day: 22, weekday: 'Sáb', events: ['Últimos preparativos para a caminhada final "Costa Vicentina"'] }],
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 29, dayEnd: 2, monthEnd: 9, weekdayStart: 'Qui', weekdayEnd: 'Seg', events: ['Caminhada "Costa Vicentina"'], highlight: true },
          ],
        },
      ],
    },
  ],
};
