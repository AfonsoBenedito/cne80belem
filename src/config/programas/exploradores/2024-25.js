// Expedição 17 — Programa 2024/25.
// Fonte:
//   T1: Programa_1trimestre.xlsx
export default {
  year: '2024/25',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2024',
      year: 2024,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Início do Ano Escutista', 'Missa de Agrupamento'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Formação de Patrulha', 'Cargos, Totem, Grito'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Imaginário e Programa', 'Conselho de Guias', 'Investidura'] }],
            [
              { day: 26, weekday: 'Sáb', events: ['Venda de Calendários'] },
              { day: 27, weekday: 'Dom', events: ['Venda de Calendários'] },
            ],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Prep. ACANAT', '"La Pétanque" - Jogos Tradicionais Franceses'] }],
            [{ day: 9, weekday: 'Sáb', events: ['"À Descoberta de Itália" - Raid Alcântara', 'Ajuda'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Dia de Núcleo', 'Encontro de Guias de Núcleo'] }],
            [{ day: 23, weekday: 'Sáb', events: ['MasterChef - Carbonara à Italiana'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Banco Alimentar Contra a Fome'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 1, weekday: 'Dom', events: ['Banco Alimentar Contra a Fome'] }],
            [{ day: 7, weekday: 'Sáb', events: ['Dia da Sede'] }],
            [{ day: 14, weekday: 'Sáb', events: ['"Gâteaux" - Fazer Bolos', 'Vender', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 20, dayEnd: 22, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACANAT'], highlight: true },
          ],
        },
      ],
    },
  ],
};
