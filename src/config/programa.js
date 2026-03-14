// ── Programa (calendário trimestral) por secção ──
// trimester: label for the trimester period
// note: footnote shown below the calendar
// months: array of { name, weeks[] }
// each week: array of day entries { day, weekday, events[] }
//   - events with `highlight: true` are special (e.g. camps, retreats)

// Shared calendar while sections don't have their own data
const trimestre2 = {
  trimester: '2.º Trimestre — Janeiro a Março 2026',
  note: '*Confirmar as horas das atividades no email semanal',
  months: [
    {
      name: 'Janeiro',
      weeks: [
        [
          { day: 10, weekday: 'Sáb', events: ['15h00 — Início do Trimestre', '19h30 — Ceia de Reis'] },
        ],
        [
          { day: 17, weekday: 'Sáb', events: ['15h00 — Provas + Empreendimento', '18h30 — Missa de Agrupamento'] },
        ],
        { merged: true, dayStart: 24, dayEnd: 25, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['INDABA'], highlight: true, subtitle: '(Só para Animadores)' },
        [
          { day: 31, weekday: 'Sáb', events: ['15h00 — Preparação do Acampamento + Provas'] },
        ],
      ],
    },
    {
      name: 'Fevereiro',
      weeks: [
        [
          { day: 7, weekday: 'Sáb', events: ['15h00 — Atelier Vida de BP', 'Atelier Organização CNE e Agrupamento'] },
        ],
        { merged: true, dayStart: 14, dayEnd: 15, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['ACACAR'], highlight: true },
        [
          { day: 21, weekday: 'Sáb', events: ['15h00 — Reunião Assistente de Agrupamento', 'Empreendimento + Progresso', '18h30 — Missa de Agrupamento'] },
        ],
        [
          { day: 28, weekday: 'Sáb', events: ['09h00 — Sede — Atividade Serviço JFB'] },
        ],
      ],
    },
    {
      name: 'Março',
      weeks: [
        [
          { day: 7, weekday: 'Sáb', events: ['14h00 — Sede — Cinema + Provas', 'Preparação Vigília e Promessas + Coro'] },
        ],
        [
          { day: 14, weekday: 'Sáb', events: ['15h00 — Atelier de Técnica Escutista'] },
        ],
        [
          { day: 20, weekday: 'Sex', events: ['21h00 — Vigília de Oração'] },
          { day: 21, weekday: 'Sáb', events: ['Jerónimos — Confissões', '15h00 — Missa de Agrupamento / Promessas'] },
        ],
        { merged: true, dayStart: 28, dayEnd: 31, weekdayStart: 'Sáb', weekdayEnd: 'Ter', events: ['ACAGRUP 2026'], highlight: true },
      ],
    },
  ],
};

export const programa = {
  lobitos: trimestre2,
  exploradores: trimestre2,
  pioneiros: trimestre2,
  caminheiros: trimestre2,
};
