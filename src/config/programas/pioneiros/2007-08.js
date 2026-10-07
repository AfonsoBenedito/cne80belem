// Comunidade 9 — Programa 2007/08.
// Fonte:
//   T1: Programa 1º Trimestre - Executado.xls
//   T2: Programa 2º Trimestre - Executado.xls
//   T3: Programa 3º Trimestre - Executado.xls
export default {
  year: '2007/08',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2007',
      year: 2007,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 5, weekday: 'Sex', events: ['Distribuição do Boletim da Junta', 'Camp. de PlayStation'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Jogo Cidade'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['Jamboree no Ar - Prazeres'] },
              { day: 21, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 27, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Cross de Orientação', 'Rappel', 'Escalada Serra de Monte Junto'] }],
            [{ day: 11, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [
              { day: 17, weekday: 'Sáb', events: ['Preparação do Raid de BTT'] },
              { day: 18, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 24, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta', 'Visita à exposição "Knojo"'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Raid BTT no Pisão', 'Banco Alimentar'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Preparação do AcantoNatal', 'Filme "Guerra dos Botões"'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Festa de Natal da Paróquia', 'Missa de Agrupamento'] }],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2008',
      year: 2008,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            { merged: true, dayStart: 4, dayEnd: 6, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Distribuição do Boletim da Junta', 'Acantonamento de Natal - jantar'], highlight: true },
            [{ day: 12, weekday: 'Sáb', events: ['Elaboração do Programa'] }],
            [{ day: 20, weekday: 'Dom', events: ['Missa de Agrupamento'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Preparação do Acagrup\' 2008'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 5, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acagrup\' 2008'], highlight: true },
            [{ day: 9, weekday: 'Sáb', events: ['Arrumação da sala e verificação do material'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Velada de Armas'] },
              { day: 17, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['Serviço de Ajuda à Junta de Freguesia'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 2, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['101% Azul'], highlight: true },
            [{ day: 8, weekday: 'Sáb', events: ['Atividade prep. pela Iª', 'Preparação da sede p/ as obras'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Preparação do Acampamento da Páscoa'] }],
            { merged: true, dayStart: 24, dayEnd: 27, weekdayStart: 'Seg', weekdayEnd: 'Qui', events: ['Acampamento da Páscoa'], highlight: true },
            { merged: true, dayStart: 29, dayEnd: 30, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Distribuição do Boletim da JF', 'Atividade de Animadores'] },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2008',
      year: 2008,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 5, dayEnd: 6, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid TT'], highlight: true },
            [
              { day: 12, weekday: 'Sáb', events: ['Reparação do Abrigo'] },
              { day: 13, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            { merged: true, dayStart: 25, dayEnd: 27, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acantonamento no Amioso'], highlight: true },
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 1, weekday: 'Qui', events: ['Distribuição do Boletim da JF'] },
              { day: 3, weekday: 'Sáb', events: ['Banco Alimentar'] },
            ],
            [{ day: 10, weekday: 'Sáb', events: ['Jogo de Agrupamento IIª Secção'] }],
            [
              { day: 17, weekday: 'Sáb', events: ['Arraial - Montagens do Arraial'] },
              { day: 18, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 22, weekday: 'Qui', events: ['Conselho de Grupo - Reparação do Abrigo'] }],
            [{ day: 31, weekday: 'Sáb', events: ['Cinema'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Atividades Radicais na Pedra Amarela'] }],
            { merged: true, dayStart: 13, dayEnd: 14, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['Descida do Rio Zêzere'], highlight: true },
            [
              { day: 21, weekday: 'Sáb', events: ['Conselho de Grupo - Vigília'] },
              { day: 22, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            [{ day: 28, weekday: 'Sáb', events: ['Distribuição do Boletim da JF', 'Preparação do Acaver', 'Jantar de Secção'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 5, dayEnd: 6, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['São Jorge'] },
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 25, dayEnd: 31, weekdayStart: 'Seg', weekdayEnd: 'Dom', events: ['Acampamento de Verão'], highlight: true },
          ],
        },
      ],
    },
  ],
};
