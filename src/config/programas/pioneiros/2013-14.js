// Comunidade 9 — Programa 2013/14.
// Fonte:
//   T1: Programa PIO T1 2013-2014.pdf
//   T2: Programa PIO T2 2013-2014.pdf
//   T3: Programa PIO T3 2013-2014.xlsx (folha Programa T3 2013-2014)
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
            [
              { day: 5, weekday: 'Sáb', events: ['Abertura do Ano Escutista', 'Missa de Agrupamento'] },
              { day: 6, weekday: 'Dom', events: ['Apoio Maratona'] },
            ],
            [{ day: 12, weekday: 'Sáb', events: ['Reunião Equipas', 'Programa'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Arrumação do Abrigo', 'Conselho de Guias', 'Missa de Agrupamento'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Propostas Empreendimento'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Raid', 'Jogos desafio'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Apresentação e Votação do Empreendimento', 'Missa de Agrupamento'] }],
            [{ day: 17, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Sistema de Progresso', 'Advento'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['101% Azul (Guias e Sub-Guias)', 'Preparação do Acampamento', 'Angariações de Fundos'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Atividades de Equipa', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['ACANAT 2013'], highlight: true },
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
            [{ day: 11, weekday: 'Sáb', events: ['Propostas Programas', 'Comissões', 'Empreendimento'] }],
            [{ day: 18, weekday: 'Sáb', events: ['Conselho de Guias', 'Validação de Trilhos', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Atividade de Orientação em Monsanto', 'Identificação das necessidades a reparar'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Início da Restauração da sala'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Dia de Manutenção'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Restauração da sala', 'Limpeza Sede', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Distribuição do Boletim', 'Loja Solidária - Visita e Campanha'] }],
            { merged: true, dayStart: 28, dayEnd: 2, monthEnd: 3, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACAGRUP - Vigília e Promessas'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 15, weekday: 'Sáb', events: ['Atividade entre Agrupamentos', 'Limpeza Sede', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Entrega dos elementos na Loja Solidária', 'Preparação Acampamento Páscoa'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 5, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Páscoa'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2014',
      year: 2014,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [
              { day: 25, weekday: 'Sex', events: ['Raid TT'] },
              { day: 26, weekday: 'Sáb', events: ['Regresso do Raid TT'] },
            ],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 1, weekday: 'Qui', events: ['São Jorge'] },
              { day: 3, weekday: 'Sáb', events: ['Distribuição Boletim'] },
            ],
            [{ day: 17, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [
              { day: 14, weekday: 'Sáb', events: ['Vigília de Oração'] },
              { day: 15, weekday: 'Dom', events: ['Promessas', 'Aniversário do Agrupamento'] },
            ],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Distribuição Boletim'] }],
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 2, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Sex', events: ['ACAREG 2014'], highlight: true },
          ],
        },
      ],
    },
  ],
};
