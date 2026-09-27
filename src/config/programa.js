// ── Programa (calendário trimestral) por secção ──
// Each secção has its scout years, newest first: { year: '2026/27', trimesters: [...] }, and
// each year its trimesters in order (the page shows a button per trimester, and only lets you
// open the current one and those before it). Past years are picked from "Ano escutista".
// id: '1' | '2' | '3' (used in the URL, ?ano=2025-26&trimestre=2)
// trimester: label for the trimester period
// year: the year of the dates, so the page can tell what is past and what comes next
// months: array of { name, month (1–12), weeks[] }
// each week: array of day entries { day, weekday, events[] }
//   - events with `highlight: true` are special (e.g. camps, retreats)
// programa.test.js checks every weekday against its real date

// ⚠️ MOCK: placeholder calendar so the 1.º Trimestre button has something to show.
// Replace with the real programa.
const trimestre1 = {
  id: '1',
  trimester: '1.º Trimestre - Outubro a Dezembro 2025',
  year: 2025,
  months: [
    {
      name: 'Outubro',
      month: 10,
      weeks: [
        [{ day: 4, weekday: 'Sáb', events: ['15h00 - Reunião de Secção'] }],
        [{ day: 11, weekday: 'Sáb', events: ['15h00 - Atividade de Secção'] }],
        [{ day: 18, weekday: 'Sáb', events: ['15h00 - Reunião de Secção'] }],
        { merged: true, dayStart: 25, dayEnd: 26, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Secção'], highlight: true },
      ],
    },
    {
      name: 'Novembro',
      month: 11,
      weeks: [
        [{ day: 8, weekday: 'Sáb', events: ['15h00 - Reunião de Secção'] }],
        [{ day: 15, weekday: 'Sáb', events: ['15h00 - Atividade de Secção'] }],
        [{ day: 22, weekday: 'Sáb', events: ['15h00 - Reunião de Secção'] }],
        [{ day: 29, weekday: 'Sáb', events: ['15h00 - Atividade de Secção'] }],
      ],
    },
    {
      name: 'Dezembro',
      month: 12,
      weeks: [
        [{ day: 6, weekday: 'Sáb', events: ['15h00 - Reunião de Secção'] }],
        [{ day: 13, weekday: 'Sáb', events: ['15h00 - Atividade de Secção'] }],
        [{ day: 20, weekday: 'Sáb', events: ['15h00 - Reunião de Secção'] }],
      ],
    },
  ],
};

// Shared calendar while sections don't have their own data
const trimestre2 = {
  id: '2',
  trimester: '2.º Trimestre - Janeiro a Março 2026',
  year: 2026,
  months: [
    {
      name: 'Janeiro',
      month: 1,
      weeks: [
        [
          { day: 10, weekday: 'Sáb', events: ['15h00 - Início do Trimestre', '19h30 - Ceia de Reis'] },
        ],
        [
          { day: 17, weekday: 'Sáb', events: ['15h00 - Provas + Empreendimento', '18h30 - Missa de Agrupamento'] },
        ],
        { merged: true, dayStart: 24, dayEnd: 25, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['INDABA'], highlight: true, subtitle: '(Só para Animadores)' },
        [
          { day: 31, weekday: 'Sáb', events: ['15h00 - Preparação do Acampamento + Provas'] },
        ],
      ],
    },
    {
      name: 'Fevereiro',
      month: 2,
      weeks: [
        [
          { day: 7, weekday: 'Sáb', events: ['15h00 - Atelier Vida de BP', 'Atelier Organização CNE e Agrupamento'] },
        ],
        { merged: true, dayStart: 14, dayEnd: 15, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['ACACAR'], highlight: true },
        [
          { day: 21, weekday: 'Sáb', events: ['15h00 - Reunião Assistente de Agrupamento', 'Empreendimento + Progresso', '18h30 - Missa de Agrupamento'] },
        ],
        [
          { day: 28, weekday: 'Sáb', events: ['09h00 - Sede - Atividade Serviço JFB'] },
        ],
      ],
    },
    {
      name: 'Março',
      month: 3,
      weeks: [
        [
          { day: 7, weekday: 'Sáb', events: ['14h00 - Sede - Cinema + Provas', 'Preparação Vigília e Promessas + Coro'] },
        ],
        [
          { day: 14, weekday: 'Sáb', events: ['15h00 - Atelier de Técnica Escutista'] },
        ],
        [
          { day: 20, weekday: 'Sex', events: ['21h00 - Vigília de Oração'] },
          { day: 21, weekday: 'Sáb', events: ['Jerónimos - Confissões', '15h00 - Missa de Agrupamento / Promessas'] },
        ],
        { merged: true, dayStart: 28, dayEnd: 31, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP 2026'], highlight: true },
      ],
    },
  ],
};

// ⚠️ MOCK: placeholder calendar so the 3.º Trimestre button has something to show.
// Replace with the real programa.
const trimestre3 = {
  id: '3',
  trimester: '3.º Trimestre - Abril a Junho 2026',
  year: 2026,
  months: [
    {
      name: 'Abril',
      month: 4,
      weeks: [
        [{ day: 11, weekday: 'Sáb', events: ['15h00 - Reunião de Secção'] }],
        [{ day: 18, weekday: 'Sáb', events: ['15h00 - Atividade de Secção'] }],
        [{ day: 25, weekday: 'Sáb', events: ['15h00 - Reunião de Secção'] }],
      ],
    },
    {
      name: 'Maio',
      month: 5,
      weeks: [
        [{ day: 9, weekday: 'Sáb', events: ['15h00 - Reunião de Secção'] }],
        [{ day: 16, weekday: 'Sáb', events: ['15h00 - Atividade de Secção'] }],
        { merged: true, dayStart: 23, dayEnd: 24, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Secção'], highlight: true },
        [{ day: 30, weekday: 'Sáb', events: ['15h00 - Reunião de Secção'] }],
      ],
    },
    {
      name: 'Junho',
      month: 6,
      weeks: [
        [{ day: 6, weekday: 'Sáb', events: ['15h00 - Atividade de Secção'] }],
        [{ day: 13, weekday: 'Sáb', events: ['15h00 - Reunião de Secção'] }],
        [{ day: 20, weekday: 'Sáb', events: ['15h00 - Fim do Trimestre'] }],
      ],
    },
  ],
};

// ⚠️ MOCK: builds a placeholder trimester of Saturday meetings, for the 2026/27 year below.
// months: [name, month, [Saturdays…], optional camp [start, end]]
const SAB_EVENTS = ['15h00 - Reunião de Secção', '15h00 - Atividade de Secção'];
function mockTrimester(id, label, year, months) {
  return {
    id,
    trimester: label,
    year,
    months: months.map(([name, month, saturdays, camp]) => ({
      name,
      month,
      weeks: [
        ...saturdays.map((day, i) => [{ day, weekday: 'Sáb', events: [SAB_EVENTS[i % 2]] }]),
        ...(camp
          ? [{ merged: true, dayStart: camp[0], dayEnd: camp[1], weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Acampamento de Secção'], highlight: true }]
          : []),
      ],
    })),
  };
}

// ⚠️ MOCK: the 2026/27 scout year. Replace with the real programa.
const ano2026 = [
  mockTrimester('1', '1.º Trimestre - Outubro a Dezembro 2026', 2026, [
    ['Outubro', 10, [3, 10, 17], [24, 25]],
    ['Novembro', 11, [7, 14, 21, 28]],
    ['Dezembro', 12, [5, 12, 19]],
  ]),
  mockTrimester('2', '2.º Trimestre - Janeiro a Março 2027', 2027, [
    ['Janeiro', 1, [9, 16, 23, 30]],
    ['Fevereiro', 2, [6, 13, 20], [27, 28]],
    ['Março', 3, [6, 13, 20]],
  ]),
  mockTrimester('3', '3.º Trimestre - Abril a Junho 2027', 2027, [
    ['Abril', 4, [10, 17, 24]],
    ['Maio', 5, [8, 15, 22], [29, 30]],
    ['Junho', 6, [5, 12, 19]],
  ]),
];

const anos = [
  { year: '2026/27', trimesters: ano2026 },
  { year: '2025/26', trimesters: [trimestre1, trimestre2, trimestre3] },
];

export const programa = {
  lobitos: anos,
  exploradores: anos,
  pioneiros: anos,
  caminheiros: anos,
};
