// Expedição 17 — Programa 2022/23.
// Fonte:
//   T1: Programa_1trimestre.docx
//   T2: Programa 2T_2023.jpg
//   T3: Programa 3T_2023.pdf
export default {
  year: '2022/23',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2022',
      year: 2022,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Início do Ano Escutista'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Atividades ao Ar Livre'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Formação de Patrulhas'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Detetives em Aprendizagens'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Venda de Calendários'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Conselho de Guias', 'Ateliê de Nós e de Orientação'] }],
            [
              { day: 12, weekday: 'Sáb', events: ['Guia Verde'] },
              { day: 13, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            [{ day: 19, weekday: 'Sáb', events: ['Master Scout'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Preparação do Acampamento de Natal', 'Preparação da Festa de Natal da Paróquia'] }],
            [{ day: 11, weekday: 'Dom', events: ['Festa de Natal da Paróquia'] }],
            { merged: true, dayStart: 16, dayEnd: 18, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACANAT'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2023',
      year: 2023,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Ceia de Reis'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Arrumação', 'Listagem do Material (Guias e Sub-Guias)'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Escola da Cartuxa', 'Atelier de Orientação', 'Missa de Agrupamento'] }],
            [{ day: 28, weekday: 'Sáb', events: ['Raid de Orientação'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Tarde de Jogos', 'Provas'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Encontro de Guias em Agrupamento de manhã', 'Preparação do ACAGRUP em Agrupamento'] }],
            { merged: true, dayStart: 18, dayEnd: 21, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP 2023', 'Vigília e Promessas'], highlight: true },
            [{ day: 25, weekday: 'Sáb', events: ['Visita ao Comité Olímpico Português'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [
              { day: 11, weekday: 'Sáb', events: ['Raid de Bicicletas', 'Pioneirismo'] },
              { day: 12, weekday: 'Dom', events: ['Meia Maratona de Lisboa'] },
            ],
            [{ day: 18, weekday: 'Sáb', events: ['Plantação de Árvores em Monsanto', 'Momento Espiritual', 'Missa de Agrupamento'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Acampamento da Páscoa'], highlight: true }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Acampamento de Preparação do Jamboree'], highlight: true }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2023',
      year: 2023,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 15, weekday: 'Sáb', events: ['Início do III trimestre'] }],
            [{ day: 23, weekday: 'Dom', events: ['S. Jorge'] }],
            { merged: true, dayStart: 28, dayEnd: 1, monthEnd: 5, weekdayStart: 'Sex', weekdayEnd: 'Seg', events: ['Acampamento da Páscoa'], highlight: true },
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Banco Alimentar'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Lx Aventura'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Preparação para o Centenário', 'Jogos sobre o CNE', 'Missa de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Festa do Centenário'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Jogos de Água', 'Construções'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Preparação do Acampamento de Verão'] }],
            { merged: true, dayStart: 16, dayEnd: 17, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['Arraial de Agrupamento'], highlight: true },
            [
              { day: 24, weekday: 'Sáb', events: ['Vigília'] },
              { day: 25, weekday: 'Dom', events: ['Promessas'] },
            ],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 1, dayEnd: 8, weekdayStart: 'Sáb', weekdayEnd: 'Sáb', events: ['Acampamento de Verão'], highlight: true },
          ],
        },
      ],
    },
  ],
};
