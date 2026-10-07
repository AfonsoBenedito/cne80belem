// Expedição 17 — Programa 2011/12.
// Fonte:
//   T1: Programa_1trimestre.pdf
//   T2: Programa_2trimestre.pdf
//   T3: Programa_3trimestre.pdf
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
            [{ day: 1, weekday: 'Sáb', events: ['Abertura do Ano'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Propostas e Escolha da Aventura'] }],
            [{ day: 15, weekday: 'Sáb', events: ['JOTA-JOTI'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Estandarte - Elaboração do Escudo de Guerra', 'Missa de Agrupamento'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Gincana - Lutando por Ceuta'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            { merged: true, dayStart: 4, dayEnd: 6, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento de Patrulhas - Em pleno Alto Mar'], highlight: true },
            [{ day: 13, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 19, weekday: 'Sáb', events: ['RoadBook em Monsanto - Expedição Militar ao interior de Arguin', 'Missa de Agrupamento'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Vida de S. Tiago Maior - Portugueses espalham a Fé Cristã', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 4, weekday: 'Dom', events: ['123 Explorador'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Preparação do Acampamento - Preparação do desafio das Tormentas'] }],
            { merged: true, dayStart: 17, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Natal'], highlight: true },
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
            [{ day: 7, weekday: 'Sáb', events: ['Preparação do Trimestre'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Visita ao Museu da Marinha - A nomeação de Vasco da Gama por D. Manuel I'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Gincana sobre personagens bíblicas - Portugueses Espalham a Fé Cristã', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Cross em Monsanto com Escalada - A feitoria de Moçambique'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Torneio desportivo no Estádio Nacional - A conquista de Mombaça'] }],
            [
              { day: 11, weekday: 'Sáb', events: ['Velada de Armas'] },
              { day: 12, weekday: 'Dom', events: ['Promessas'] },
            ],
            { merged: true, dayStart: 18, dayEnd: 21, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Carnaval'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Jogo de Cidade - Descoberta de Melinde'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Jogo de Tabuleiro - Um toque de Especiarias'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Load Day - Índia'] }],
            { merged: true, dayStart: 24, dayEnd: 28, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['ACAGRUP'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2012',
      year: 2012,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 22, weekday: 'Dom', events: ['"Canadá" - S. Jorge'] }],
            { merged: true, dayStart: 27, dayEnd: 28, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['"E.U.A." - Atividade com Marítimos', 'Missa de Agrupamento'], highlight: true },
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['"Brasil" - Atividade de ligação informal'] }],
            { merged: true, dayStart: 12, dayEnd: 13, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['"Rio Prata" - Lx Aventura'], highlight: true },
            [{ day: 19, weekday: 'Sáb', events: ['"Estreito de Magalhães" - Montagem do Arraial'] }],
            [{ day: 26, weekday: 'Sáb', events: ['"Austrália" - Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['"Nova Zelândia" - Volvo Ocean Race'] }],
            [{ day: 9, weekday: 'Sáb', events: ['"Ilhas Molucas" - Jogo de Vila em Sintra c/ Rappel e Escalada'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['"Nova Guiné" - Velada de Armas'] },
              { day: 17, weekday: 'Dom', events: ['"Tratado de Saragoça" - Promessas'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['"China" - Praia'] }],
            [{ day: 30, weekday: 'Sáb', events: ['"Japão" - Visita à Fragata D. Fernando II e Glória'] }],
          ],
        },
      ],
    },
  ],
};
