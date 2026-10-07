// Comunidade 9 — Programa 2019/20.
// Fonte:
//   T1: IIIª PIO Relatório Atividades 2019-2020.pdf
//   T2: IIIª PIO Relatório Atividades 2019-2020.pdf
//   T3: IIIª PIO Relatório Atividades 2019-2020.pdf (#EscutismoEmCasa)
export default {
  year: '2019/20',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Setembro a Dezembro 2019',
      year: 2019,
      months: [
        {
          name: 'Setembro',
          month: 9,
          weeks: [
            [{ day: 28, weekday: 'Sáb', events: ['Abertura do Ano Escutista'] }],
          ],
        },
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 30, weekday: 'Qua', events: ['Procissão da Imagem Peregrina de Nossa Senhora'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Raid Urbano - Oeiras'] }],
            [
              { day: 9, weekday: 'Sáb', events: ['101% Azul - Liceu Passos Manuel'] },
              { day: 10, weekday: 'Dom', events: ['Dia de Núcleo - Benfica'] },
            ],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 1, weekday: 'Dom', events: ['Banco Alimentar'] }],
            { merged: true, dayStart: 14, dayEnd: 15, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acantonamento de Natal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Fevereiro 2020',
      year: 2020,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            { merged: true, dayStart: 11, dayEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Reis - Janas'], highlight: true },
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Jogo das Religiões - Monsanto'] }],
            { merged: true, dayStart: 22, dayEnd: 23, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Carnaval - Arrábida'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2020',
      year: 2020,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 18, weekday: 'Sáb', events: ['Hora do Chá'] }],
            [{ day: 25, weekday: 'Sáb', events: ['Atelier de Culinária'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 9, weekday: 'Sáb', events: ['Quiz'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Conselho de Comunidade'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Conversa Informal'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 20, weekday: 'Sáb', events: ['Atividade de Ligação Informal'] }],
          ],
        },
      ],
    },
  ],
};
