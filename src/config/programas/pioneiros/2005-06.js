// Comunidade 9 — Programa 2005/06.
// Fonte:
//   T1: Programa 1º Trimestre.doc
//   T2: Programa 2º Trimestre.xls
//   T3: Programa 3º Trimestre.xls
export default {
  year: '2005/06',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2005',
      year: 2005,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [
              { day: 8, weekday: 'Sáb', events: ['Abertura do Ano'] },
              { day: 9, weekday: 'Dom', events: ['Angariação de Fundos nas Autárquicas - Esc. Marquês de Pombal'] },
            ],
            [{ day: 15, weekday: 'Sáb', events: ['Início do Empreendimento', 'Programa'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Conclusão do Empreendimento', 'Remodelação do espaço comum'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Ludoteca do Monte Estoril'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Continuação dos trabalhos no espaço comum'] }],
            [
              { day: 12, weekday: 'Sáb', events: ['Espaço da Junta de Freguesia - Magusto da IVª'] },
              { day: 13, weekday: 'Dom', events: ['Dia de Núcleo'] },
            ],
            [
              { day: 19, weekday: 'Sáb', events: ['Atelier de BTT', 'Preparação do Acanatal'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Colombo - Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            { merged: true, dayStart: 3, dayEnd: 4, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Atividade Surpresa - Equipa de Animação'], highlight: true },
            [
              { day: 10, weekday: 'Sáb', events: ['Jogo Cidade', 'Jantar de Natal IVª'] },
              { day: 11, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
            { merged: true, dayStart: 17, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acanponatal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2006',
      year: 2006,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 14, weekday: 'Sáb', events: ['Oficinas', 'Jogos Lúdicos'] }],
            [{ day: 22, weekday: 'Dom', events: ['Angariação de Fundos nas Autárquicas - Esc. Marquês de Pombal'] }],
            [
              { day: 28, weekday: 'Sáb', events: ['Continuação dos trabalhos no Abrigo', 'Oficina do Material'] },
              { day: 29, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Casa de Stº António'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Animação da Fé', 'Preparação da Ludoteca'] }],
            [
              { day: 18, weekday: 'Sáb', events: ['Preparação da Vigília', 'Vigília'] },
              { day: 19, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            { merged: true, dayStart: 25, dayEnd: 1, monthEnd: 3, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['Empreendimento'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 11, weekday: 'Sáb', events: ['Ludoteca do Monte Estoril'] }],
            { merged: true, dayStart: 18, dayEnd: 19, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid TT'], highlight: true },
            [
              { day: 25, weekday: 'Sáb', events: ['Trabalhos no Abrigo'] },
              { day: 26, weekday: 'Dom', events: ['Mini e Meia Maratona EDP 2006'] },
            ],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Preparação do Acagrup'] }],
            { merged: true, dayStart: 8, dayEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['Acagrup 2006'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2006',
      year: 2006,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 22, weekday: 'Sáb', events: ['Elaboração do programa', 'Arraial'] }],
            [
              { day: 29, weekday: 'Sáb', events: ['Boletim da Junta', 'Preparação do S. Jorge', 'Arraial'] },
              { day: 30, weekday: 'Dom', events: ['Missa de Agrupamento'] },
            ],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 7, weekday: 'Dom', events: ['São Jorge'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Pedrouços - Arraial'] }],
            [{ day: 21, weekday: 'Dom', events: ['Missa de Agrupamento'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta', 'Arraial'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Trabalhos a nível geral p/ a Sec./Agr.'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Raid topográfico', 'Jogos na praia'] }],
            [
              { day: 17, weekday: 'Sáb', events: ['Preparação da Vigília', 'Vigília'] },
              { day: 18, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            [{ day: 24, weekday: 'Sáb', events: ['Distribuição do Boletim da Junta', 'Jantar de despedida'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            { merged: true, dayStart: 30, dayEnd: 4, monthEnd: 8, weekdayStart: 'Dom', weekdayEnd: 'Sex', events: ['1.º ACANUC 2006'], highlight: true },
          ],
        },
      ],
    },
  ],
};
