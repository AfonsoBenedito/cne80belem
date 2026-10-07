// Comunidade 9 — Programa 2012/13.
// Fonte:
//   T1: Programa PIO T1 2012-2013.pdf
//   T2: Programa PIO T2 2012-2013.pdf
//   T3: Programa PIO T3 2012-2013.pdf
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
            [{ day: 6, weekday: 'Sáb', events: ['Abertura do Ano Escutista', 'Missa de Agrupamento'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Constituição das Equipas e Proposta de Programas do Trimestre'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Conselho de Guias', 'Empreendimento'] }],
            { merged: true, dayStart: 27, dayEnd: 28, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['101% Azul'], highlight: true },
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Prog. Educativo', 'Empreendimento'] }],
            [{ day: 11, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Atividade', 'Missa de Agrupamento', 'Cadetes de Mafeking'] }],
            [{ day: 24, weekday: 'Sáb', events: ['Apresentação do Empreendimento'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Cadetes de Mafeking', 'Preparação Acanat e Banco Alimentar'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Preparação do Material e Concurso de Panquecas', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 15, dayEnd: 18, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Natal', 'Cadetes de Mafeking'], highlight: true },
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
            [{ day: 5, weekday: 'Sáb', events: ['Conselho de Guias', 'Comissões'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Conselho de Guias', 'Def. Comissões'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Conselho de Guias', 'Prep. AcaCar', 'Proposta de Prog.'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Comissões'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Concurso culinária', 'Ang. Fundos'] }],
            { merged: true, dayStart: 9, dayEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Carnaval - Castelo de Palmela'], highlight: true },
            [{ day: 16, weekday: 'Sáb', events: ['Empreendimento'] }],
            [
              { day: 23, weekday: 'Sáb', events: ['Preparação e Vigília'] },
              { day: 24, weekday: 'Dom', events: ['Promessas'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Escalada - Castelo de Sintra'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Apoio ao ACAGRUP'] }],
            { merged: true, dayStart: 16, dayEnd: 19, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP 2013'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2013',
      year: 2013,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Arrumação Mat. Acagrup', 'Elaboração do Programa'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Atelier de Orientação'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['Raid Castelo S. Jorge', 'Missa Agrupamento', 'Venda de Bolos'] },
              { day: 21, weekday: 'Dom', events: ['Feira Belém'] },
            ],
            [{ day: 28, weekday: 'Dom', events: ['S. Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Crisma'] }],
            { merged: true, dayStart: 10, dayEnd: 11, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['Raid TT'], highlight: true },
            [{ day: 18, weekday: 'Sáb', events: ['Escalada em Sintra - Castelo', 'Missa Agrup. - Venda de Bolos'] }],
            [{ day: 26, weekday: 'Dom', events: ['Corrida da Mulher'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [
              { day: 1, weekday: 'Sáb', events: ['Venda Belém - Dia da Criança', 'Cinema'] },
              { day: 2, weekday: 'Dom', events: ['Banco Alimentar'] },
            ],
            [{ day: 8, weekday: 'Sáb', events: ['Xadrez Humano', 'Empreendimento'] }],
            [
              { day: 15, weekday: 'Sáb', events: ['Preparação e Vigília'] },
              { day: 16, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 22, weekday: 'Sáb', events: ['Praia', 'Concurso castelos na areia'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Empreendimento'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 27, dayEnd: 3, monthEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Sáb', events: ['Acampamento de Verão do Empreendimento'], highlight: true },
          ],
        },
      ],
    },
  ],
};
