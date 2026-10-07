// Expedição 17 — Programa 2009/10.
// Fonte:
//   T1: Programa_1trimestre.xls
//   T2: Programa_2trimestre.pdf
//   T3: Programa_3trimestre.pdf
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
            [{ day: 3, weekday: 'Sáb', events: ['Abertura do Ano', 'Missa de Agrupamento'] }],
            [
              { day: 10, weekday: 'Sáb', events: ['Preparação do Trimestre'] },
              { day: 11, weekday: 'Dom', events: ['Venda de Calendários'] },
            ],
            [{ day: 17, weekday: 'Sáb', events: ['JOTA-JOTI - Abracurcix comunica com a aldeia'] }],
            [{ day: 24, weekday: 'Sáb', events: ['"Gauleses em Obras"'] }],
            [{ day: 31, weekday: 'Sáb', events: ['"1,2,3 Explorador"', 'Atividade de Cargos'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Raid Fotográfico - A Grande Travessia'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Filme - Imagens da Aldeia', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Banco Alimentar - Asterix e Obelix caçam Javalis'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 12, weekday: 'Sáb', events: ['Preparação do ACANAT - O banquete da Aldeia', 'Festa de Natal'] }],
            { merged: true, dayStart: 19, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Natal'], highlight: true },
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
            [{ day: 9, weekday: 'Sáb', events: ['Início do Trimestre'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Escalada em Monsanto - Escadinhas para o Céu'] }],
            [
              { day: 29, weekday: 'Sex', events: ['Atividade de Cangurus'] },
              { day: 30, weekday: 'Sáb', events: ['Gincana em Belém - Gauleses Vs Romanos'] },
            ],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Visita aos Jardins e ao Palácio de Belém - Gauleses tocam cavaquinho'] }],
            { merged: true, dayStart: 13, dayEnd: 16, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Carnaval'], highlight: true },
            [
              { day: 20, weekday: 'Sáb', events: ['Velada de Armas'] },
              { day: 21, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 27, weekday: 'Sáb', events: ['Jogo Batalha Naval - Em busca do caldeirão dourado'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 13, weekday: 'Sáb', events: ['Cinema - Asterix... Ação', 'Missa de Agrupamento'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Preparação do acampamento - Gauleses preparam a caçada'] }],
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
            [{ day: 17, weekday: 'Sáb', events: ['Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Dom', events: ['S. Jorge'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Rally Paper', 'Preparação do Lx Aventura'] }],
            { merged: true, dayStart: 8, dayEnd: 9, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Lx Aventura'], highlight: true },
            [{ day: 15, weekday: 'Sáb', events: ['Montagens do Arraial', 'Missa de Agrupamento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Projetos Load'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Banco Alimentar', 'Noite de Fados'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Atividade de Ligação Informal'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Jogos de água'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Velada de Armas'] },
              { day: 20, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Festa Final'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 3, dayEnd: 4, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Descida de Rio - Patrulha Canguru'], highlight: true },
          ],
        },
      ],
    },
  ],
};
