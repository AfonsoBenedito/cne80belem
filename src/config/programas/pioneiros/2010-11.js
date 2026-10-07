// Comunidade 9 — Programa 2010/11.
// Fonte:
//   T1: Relatorio de Actividade 1º Trimestre - Comunidade - 2010 - 2011.pdf
//   T2: Programa 2º Trimestre Aprovado .xls
//   T3: Programa 3º Trimestre - Comunidade 9.xlsx
export default {
  year: '2010/11',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2010',
      year: 2010,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Abertura do Ano 2010/2011'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Preparação do 1º Trimestre'] }],
            [{ day: 16, weekday: 'Sáb', events: ['Elaboração do Projeto Sala'] }],
            [{ day: 23, weekday: 'Sáb', events: ['101% Azul'], subtitle: '(Só para Guias e Sub-Guias)' }],
            [{ day: 30, weekday: 'Sáb', events: ['Projeto Sala'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 7, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Jogo de Cidade - Lisboa em Estado de Sítio', 'Investidura de Guias e Sub-Guias'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Jogos Didáticos', 'Magusto'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Preparação do Acampamento de Natal', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Raid de Orientação - Sintra'] }],
            [{ day: 11, weekday: 'Sáb', events: ['Preparação do Acampamento de Natal'] }],
            { merged: true, dayStart: 18, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['Acantonamento de Natal - Alcácer do Sal'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2011',
      year: 2011,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [
              { day: 22, weekday: 'Sáb', events: ['Apresentação Empreendimento'] },
              { day: 23, weekday: 'Dom', events: ['Eleições Presidenciais'] },
            ],
            { merged: true, dayStart: 29, dayEnd: 30, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acantonamento', 'Provas Team Building com Avaliação'], highlight: true },
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Atividade no Parque das Nações'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Preparação do AcaCar'] }],
            [
              { day: 19, weekday: 'Sáb', events: ['Preparação da Vigília', 'Vigília'] },
              { day: 20, weekday: 'Dom', events: ['Missa de Agrupamento / Promessas'] },
            ],
            [{ day: 26, weekday: 'Sáb', events: ['Conclusão Preparação do AcaCar'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            { merged: true, dayStart: 5, dayEnd: 9, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['AcaCar'], highlight: true },
            [{ day: 12, weekday: 'Sáb', events: ['Atelier de Teatro'] }],
            { merged: true, dayStart: 19, dayEnd: 20, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid TT'], highlight: true },
            [{ day: 26, weekday: 'Sáb', events: ['Atelier Cozinha', 'Conversa Padre Abel'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Prep. ACAGRUP'] }],
            { merged: true, dayStart: 9, dayEnd: 13, weekdayStart: 'Sáb', weekdayEnd: 'Qua', events: ['ACAGRUP'], highlight: true },
            { merged: true, dayStart: 16, dayEnd: 17, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acantonamento', 'Provas Team Building II com Avaliação'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Julho 2011',
      year: 2011,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 30, weekday: 'Sáb', events: ['Distribuição Boletim', 'Elaboração Programa'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 1, weekday: 'Dom', events: ['S. Jorge'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Dia Equipa Bear Grylls', 'Jogo do Lobisomem'] }],
            [{ day: 21, weekday: 'Sáb', events: ['Atelier de Liderança', 'Atelier de Orientação', 'Missa Agrupamento', 'Montagem Arraial'] }],
            [
              { day: 28, weekday: 'Sáb', events: ['Distribuição Boletim', 'Atelier de Cozinha', 'Banco Alimentar'] },
              { day: 29, weekday: 'Dom', events: ['Banco Alimentar'] },
            ],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Acamp. Contingente Jamboree - Prep. AcaVer'] }],
            { merged: true, dayStart: 11, dayEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid BTT'], highlight: true },
            [
              { day: 18, weekday: 'Sáb', events: ['Prep. Vigília', 'Velada de Armas'] },
              { day: 19, weekday: 'Dom', events: ['Promessas'] },
            ],
            [{ day: 25, weekday: 'Sáb', events: ['Distribuição Boletim', 'Avaliação', 'Prep. AcaVer e AcaFrança'] }],
          ],
        },
        {
          name: 'Julho',
          month: 7,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Atividade S. Pedro'] }],
            { merged: true, dayStart: 7, dayEnd: 10, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['AcaVerão'], highlight: true },
            [{ day: 16, weekday: 'Sáb', events: ['Acamp. Conj. c/ Franceses'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Atividade Conjunta IV Secção'] }],
          ],
        },
      ],
    },
  ],
};
