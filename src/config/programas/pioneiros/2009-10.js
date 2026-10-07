// Comunidade 9 — Programa 2009/10.
// Fonte:
//   T1: Programa 1º Trimestre Aprovado.xls
//   T2: Programa 2º Trimestre Aprovado.xls
//   T3: Programa 3º Trimestre Aprovado.xls
export default {
  year: '2009/10',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2009',
      year: 2009,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Abertura do Ano Escutista 2009/2010. Constituição das equipas', 'Missa de Agrupamento'] }],
            [
              { day: 10, weekday: 'Sáb', events: ['Conselho de Grupo', 'Elaboração do programa. Atribuição dos distintivos de cargos'] },
              { day: 11, weekday: 'Dom', events: ['Escola Marquês de Pombal - Venda de Calendários'] },
            ],
            [
              { day: 17, weekday: 'Sáb', events: ['Rappel'] },
              { day: 18, weekday: 'Dom', events: ['INDABA'], subtitle: '(Só para Animadores e Dirigentes)' },
            ],
            [{ day: 24, weekday: 'Sáb', events: ['Atividade cultural'] }],
            [{ day: 31, weekday: 'Sáb', events: ['Trabalhos no Abrigo', 'Peditório Liga Contra o Cancro'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Jogos'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Atividade Aventura', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [
              { day: 5, weekday: 'Sáb', events: ['Raid'] },
              { day: 6, weekday: 'Dom', events: ['Atividade de Animadores'] },
            ],
            [{ day: 12, weekday: 'Sáb', events: ['Concurso de Talentos - Provas', 'Preparação Ativ. de Natal'] }],
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Atividade de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2010',
      year: 2010,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 8, weekday: 'Sex', events: ['Elaboração do Programa do 2º Trimestre'] }],
            { merged: true, dayStart: 16, dayEnd: 17, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['101% Azul'], highlight: true },
            [{ day: 23, weekday: 'Sáb', events: ['Conselho de Guias', 'Abrigo - Organização do Projeto "Enriquecer"'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Abrigo - Organização do Projeto "Enriquecer" - Provas'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Abrigo - Competição de Damas e Xadrez - Provas'] }],
            { merged: true, dayStart: 13, dayEnd: 16, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Carnaval'], highlight: true },
            [
              { day: 20, weekday: 'Sáb', events: ['Preparação das Promessas - Vigília'] },
              { day: 21, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            { merged: true, dayStart: 27, dayEnd: 28, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Abrigo - Raid de BTT'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 6, dayEnd: 7, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade de Animadores'], highlight: true },
            [{ day: 13, weekday: 'Sáb', events: ['Abrigo - Organização da Noite de Jogos', 'Missa de Agrupamento', 'Noite de Jogos'] }],
            { merged: true, dayStart: 20, dayEnd: 21, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid TT'], highlight: true },
            { merged: true, dayStart: 27, dayEnd: 30, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Páscoa'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2010',
      year: 2010,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 17, weekday: 'Sáb', events: ['Elaboração do Programa do 3º Trimestre', 'Missa de Agrupamento'] }],
            [
              { day: 24, weekday: 'Sáb', events: ['Missa de Agrupamento'] },
              { day: 25, weekday: 'Dom', events: ['São Jorge'] },
            ],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Estação Fluvial de Belém - Rally Paper'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Escalada no Monsanto', 'Arraial'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Angariação de fundos', 'Provas', 'Arraial'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Teatro'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Alcântara - Banco Alimentar', 'Noite de Fados'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['BTT / Praia'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Conselho de Guias', 'Provas', 'Angariação de Fundos'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Preparação das Promessas - Gala dos 30 Anos'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            { merged: true, dayStart: 26, dayEnd: 27, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Canoagem'], highlight: true },
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 24, dayEnd: 1, monthEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acagrup 2010 Bransea'], highlight: true },
          ],
        },
      ],
    },
  ],
};
