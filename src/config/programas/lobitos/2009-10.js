// Alcateia 16 — Programa 2009/10.
// Fonte:
//   T1: Programa do 1º Trimestre 2009-2010.xls
//   T2: Programa 2º Trimestre + Relação objectivos-actividades.xlsx
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
              { day: 11, weekday: 'Dom', events: ['Venda Calendários'] },
            ],
            [{ day: 17, weekday: 'Sáb', events: ['Reunião'] }],
            { merged: true, dayStart: 24, dayEnd: 25, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento Quinta do Bom Jardim'], highlight: true },
            [{ day: 31, weekday: 'Sáb', events: ['Reunião'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Visita ao Zoo de Lisboa'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Preparação dia de Núcleo, Aguarela e Missa de Agr.'] }],
            [
              { day: 21, weekday: 'Sáb', events: ['Aguarela'], subtitle: '(Só para Guias e Sub-Guias)' },
              { day: 22, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            { merged: true, dayStart: 28, dayEnd: 29, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento'], highlight: true },
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [
              { day: 5, weekday: 'Sáb', events: ['Atividade Animadores'] },
              { day: 6, weekday: 'Dom', events: ['Atividade Animadores'] },
            ],
            [{ day: 12, weekday: 'Sáb', events: ['Preparação Acampamento Natal', 'Festa de Natal - Monsanto'] }],
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
            [{ day: 9, weekday: 'Sáb', events: ['Programa', 'Organização administrativa', 'Apresentação desafio Hobbies'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Apresentação 2.ª Dentada', 'Construção cabeça de lobo', 'Missa Agrupamento'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Jogo de Pista: "Cá defende Maugli dos Banderlogues" - Monsanto'] }],
            [{ day: 30, weekday: 'Sáb', events: ['"Mogli na Parada Militar"', 'Atelier tendas e mochilas', 'Preparação acampamento'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['"As aventuras de Mogli com Balú"', 'Provas', 'Hobbie'] }],
            { merged: true, dayStart: 13, dayEnd: 16, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Carnaval'], highlight: true },
            [
              { day: 20, weekday: 'Sáb', events: ['Preparação Velada', 'Velada de Armas'] },
              { day: 21, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 27, weekday: 'Sáb', events: ['"Mogli, consegues guiar uma parada de búfalos?"', 'Atelier de cargos/trabalho em bando'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Jogo de Cidade'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Preparação acampamento', 'Hobbie', 'Fé: Páscoa', 'Missa de Agrupamento'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['Preparação Festa do Sol'] },
              { day: 21, weekday: 'Dom', events: ['Festa do Sol'] },
            ],
            { merged: true, dayStart: 27, dayEnd: 28, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento Páscoa / ACAGRUP'], highlight: true },
          ],
        },
      ],
    },
  ],
};
