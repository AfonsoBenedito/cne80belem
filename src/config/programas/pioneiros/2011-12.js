// Comunidade 9 — Programa 2011/12.
// Fonte:
//   T1: Programa 1º Trimestre.xls
//   T2: R.Act Comunidade.docx (relatório de atividades)
//   T3: R.Act Comunidade.docx (relatório de atividades)
export default {
  year: '2011/12',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Outubro a Dezembro 2011',
      year: 2011,
      months: [
        {
          name: 'Outubro',
          month: 10,
          weeks: [
            [{ day: 1, weekday: 'Sáb', events: ['Abertura do Ano'] }],
            [{ day: 8, weekday: 'Sáb', events: ['Preparação Empreendimento'] }],
            [{ day: 15, weekday: 'Sáb', events: ['Apresentação Empreendimento'] }],
            [{ day: 22, weekday: 'Sáb', events: ['Verificação do Material', 'Missa de Agrupamento'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Distribuição Boletim JF', 'Raid Fotográfico', 'Festa de Halloween'] }],
          ],
        },
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Conversa com Sr. Prior', 'Gravação Curtas-Metragens', 'Preparação FDS 18 e 19'] }],
            [{ day: 13, weekday: 'Dom', events: ['Dia de Núcleo'] }],
            { merged: true, dayStart: 18, dayEnd: 19, weekdayStart: 'Sex', weekdayEnd: 'Sáb', events: ['Apresentação Curtas-Metragens', 'Acantonamento', 'Magusto de Agrupamento'], highlight: true },
            [{ day: 26, weekday: 'Sáb', events: ['Distribuição Boletim JF', 'Prep. Acampamento de Natal', 'Banco Alimentar'] }],
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 3, weekday: 'Sáb', events: ['Prep. Acampamento de Natal', 'Quizz Escutista'] }],
            [{ day: 10, weekday: 'Sáb', events: ['Prep. Acampamento de Natal', 'Progresso Escutista'] }],
            { merged: true, dayStart: 16, dayEnd: 18, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['ACANAT - Guincho'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Fevereiro a Março 2012',
      year: 2012,
      months: [
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            { merged: true, dayStart: 18, dayEnd: 19, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Carnaval - Virtudes'], highlight: true },
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 24, weekday: 'Sáb', events: ['Cross em Monsanto'] }],
            { merged: true, dayStart: 29, dayEnd: 1, monthEnd: 4, weekdayStart: 'Qui', weekdayEnd: 'Dom', events: ['Acampamento de Páscoa'], highlight: true },
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Agosto 2012',
      year: 2012,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 22, weekday: 'Dom', events: ['S. Jorge'] }],
            { merged: true, dayStart: 28, dayEnd: 29, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Raid TT'], highlight: true },
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 19, weekday: 'Sáb', events: ['Montagens do Arraial'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Banco Alimentar'] }],
          ],
        },
        {
          name: 'Junho',
          month: 6,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Campanha de Angariação de Fundos - Liberty Seguros'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Raid de Cidade - Belém e Ajuda'] }],
            [{ day: 23, weekday: 'Sáb', events: ['Passagem Informal de Secção - Praia do Estoril'] }],
          ],
        },
        {
          name: 'Agosto',
          month: 8,
          weeks: [
            { merged: true, dayStart: 4, dayEnd: 10, weekdayStart: 'Sáb', weekdayEnd: 'Sex', events: ['ACANAC'], highlight: true },
          ],
        },
      ],
    },
  ],
};
