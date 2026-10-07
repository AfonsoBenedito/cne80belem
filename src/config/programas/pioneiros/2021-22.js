// Comunidade 9 — Programa 2021/22.
// Fonte:
//   T1: Relatório atividades PIO 9_versãofinal.docx (2021-2022)
//   T2: Relatório atividades PIO 9_versãofinal.docx (2021-2022)
//   T3: Relatório atividades PIO 9_versãofinal.docx (2021-2022)
export default {
  year: '2021/22',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2021',
      year: 2021,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 23, weekday: 'Sáb', events: ['Abertura do Ano Escutista', 'Jogos de Quebra-Gelo - Inesperado'] }],
            [{ day: 30, weekday: 'Sáb', events: ['Inventário do Material e Escolha do Nome da Equipa - Conhecimento'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 6, weekday: 'Sáb', events: ['Raid de Orientação em Lisboa - Descoberta'] }],
            [{ day: 13, weekday: 'Sáb', events: ['Organização da Equipa e Cargos - Envolvimento'] }],
            [{ day: 20, weekday: 'Sáb', events: ['O Patrono São Pedro com o Padre Miguel - Equipa'] }],
            [{ day: 27, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Preparação do Acampamento'] }],
            [
              { day: 11, weekday: 'Sáb', events: ['Provas', 'Atividade do Advento', 'Vigília'] },
              { day: 12, weekday: 'Dom', events: ['Promessas e Investiduras'] },
            ],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2022',
      year: 2022,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 15, weekday: 'Sáb', events: ['Construções e Cozinha Selvagem - PNEC'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Preparação do Empreendimento - Caminho'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Cinema - Amoreiras'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Códigos e Morse'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Atelier de Orientação'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 12, weekday: 'Sáb', events: ['Raid - Cascais'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Porta-Chaves'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Ida à Praia - Oeiras'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Peregrinação a Fátima'] }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Junho 2022',
      year: 2022,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 30, weekday: 'Sáb', events: ['Provas e Programa'] }],
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            { merged: true, dayStart: 21, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['ACAGRUP - Sintra'], highlight: true },
            [{ day: 28, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Preparação do Acampamento'] }],
            { merged: true, dayStart: 25, dayEnd: 28, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['Acampamento de Verão - Salir do Porto'], highlight: true },
          ],
        },
      ],
    },
  ],
};
