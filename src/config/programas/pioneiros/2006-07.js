// Comunidade 9 — Programa 2006/07.
// Fonte:
//   T2: Programa 2º Trimestre.xls
//   T3: Programa 3º Trimestre.xls
export default {
  year: '2006/07',
  trimesters: [
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Março 2007',
      year: 2007,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 13, weekday: 'Sáb', events: ['Atelier de BTT'] }],
            [
              { day: 20, weekday: 'Sáb', events: ['Conselho de Grupo'] },
              { day: 21, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 27, weekday: 'Sáb', events: ['Distribuição do Boletim da JF - Atelier de BTT'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 3, dayEnd: 4, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['101% Azul'], highlight: true },
            [
              { day: 10, weekday: 'Sáb', events: ['Preparação do Acampamento de Carnaval'] },
              { day: 11, weekday: 'Dom', events: ['Apoio ao referendo - Não ir fardado'] },
            ],
            { merged: true, dayStart: 17, dayEnd: 19, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Acampamento'], highlight: true },
            [
              { day: 24, weekday: 'Sáb', events: ['Conselho de Grupo - Vigília'] },
              { day: 25, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Dist. do Boletim da JF - Visita a uma exposição fotográfica'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Raid fotográfico na Baixa'] }],
            [{ day: 17, weekday: 'Sáb', events: ['Fazer as almofadas da sala'] }],
            [
              { day: 24, weekday: 'Sáb', events: ['Apresentação de fotografias do Raid fotográfico - Preparação do Acagrup'] },
              { day: 25, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            { merged: true, dayStart: 31, dayEnd: 2, monthEnd: 4, weekdayStart: 'Sáb', weekdayEnd: 'Seg', events: ['Acagrup 2007'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2007',
      year: 2007,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 14, dayEnd: 15, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid TT'], highlight: true },
            [{ day: 22, weekday: 'Dom', events: ['São Jorge'] }],
            [
              { day: 28, weekday: 'Sáb', events: ['Conselho de Grupo'] },
              { day: 29, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [
              { day: 1, weekday: 'Ter', events: ['Distribuição do Boletim da JF'] },
              { day: 5, weekday: 'Sáb', events: ['Banco Alimentar'] },
            ],
            { merged: true, dayStart: 11, dayEnd: 13, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acantonamento em Mértola - Participação nos Festejos da Cidade'], highlight: true },
            { merged: true, dayStart: 19, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Preparação para o Jamboree'], highlight: true },
            [
              { day: 26, weekday: 'Sáb', events: ['Distribuição do Boletim da JF. Montagens do arraial'] },
              { day: 27, weekday: 'Dom', events: ['Missa de Agrupamento. Montagens do arraial'] },
            ],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Jogos de praia'] }],
            [
              { day: 16, weekday: 'Sáb', events: ['Conselho de Grupo - Vigília'] },
              { day: 17, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            [{ day: 23, weekday: 'Sáb', events: ['Atividade com os Pioneiros da Parede'] }],
          ],
        },
      ],
    },
  ],
};
