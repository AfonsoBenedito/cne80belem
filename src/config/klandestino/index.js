// ── Klandestino: o jornal do Agrupamento (1993) ──
// One file per issue in ./issues/<slug>.js, loaded on demand when its page opens. Each issue is
// transcribed from the 1993 files (CorelDRAW pages for the titles, Word files for the articles)
// keeping the wording and spelling as printed.
//
// An issue:
//   slug: '6'                  // used in the URL, /agrupamento/klandestino/6
//   number: 6 | null           // the issue number on the masthead (null for a loose sheet)
//   title: 'Klãdestino'        // the name as printed on the masthead
//   label: 'Passatempos'       // only for a loose sheet: what it is
//   date: '1993-02-13'         // ISO, as printed (a loose sheet: the month, '1993-05')
//   dateLabel: '13 de Fevereiro de 1993'
//   volume: 'Ano II', frequency: 'Mensal', price: '100 Klãs'   // from the masthead, when printed
//   team: [{ name, role }]     // the ficha técnica, as printed
//   articles: [{
//     id: 'editorial',         // unique in the issue, kebab-case, the #anchor of the article
//     section: 'Editorial',    // the sumário's section, as printed ('Klarim', 'Kozinha'…)
//     title: 'Voltámos!',      // the article's own title, when it has one
//     page: 2,                 // its page, from the sumário
//     author: 'João Carvalhosa',
//     blocks: [...]            // see below
//   }]
//
// Blocks:
//   { type: 'p', text }                 a paragraph
//   { type: 'h', text }                 a heading inside the article
//   { type: 'list', items: [text] }     a list (the sources' "-" lines)
//   { type: 'quote', text, cite }       a quotation, cite optional
//   { type: 'verse', lines: [text] }    a poem, prayer or song: one line each
//   { type: 'song', lines: [text] }     a song with its chord lines above the words, spacing as typed
//                                       (shown in a fixed-width font so the chords line up)
//   { type: 'grid', rows: [text] }      a letter grid (sopa de letras): one row each, same length
//   { type: 'image', src, alt }         a puzzle drawing: src is the PNG imported at the top of the
//                                       issue's file (so only the issue that prints it ships it)
//   { type: 'note', text }              a boxed aside (a call for articles, a warning)
// One entry per issue for the index cards and the issue page's masthead, so neither waits for (or
// downloads) an issue's full text; the test checks each against its issue file.
//   highlights: three of the issue's article titles, for its card
//   puzzles: the id of its Passatempos article; solutions: the id of the article where it prints
//   the previous issue's solutions (the issue page links the two)
export const issueSummaries = [
  { slug: '6', number: 6, title: 'Klãdestino', date: '1993-02-13', dateLabel: '13 de Fevereiro de 1993',
    volume: 'Ano II', frequency: 'Mensal', price: '100 Klãs',
    highlights: ['Vergonhas Patrimoniais', 'O Castor', 'Mousse de chocolate'],
    puzzles: 'passatempos',
    sections: ['Secções', 'Opinião', 'Espaço Religião', 'InkonFormação', 'Extintores', 'Ekologia', 'Klarim', 'Passatempos', 'Kozinha'] },
  { slug: '7', number: 7, title: 'Klãdestino', date: '1993-03-13', dateLabel: '13 de Março de 1993',
    volume: 'Ano II', frequency: 'Mensal', price: '100 Klãs',
    highlights: ['Sementeiras Caseiras', 'Conceitos gerais de segurança', 'Pega e faz!'],
    puzzles: 'passatempos', solutions: 'solucoes',
    sections: ['Editorial', 'Secções', 'Opinião', 'Espaço Religião', 'InkonFormação', 'Prevenção e Segurança', 'Ekologia', 'Klarim', 'Passatempos', 'Kozinha', 'Pega & Faz', 'Kaminho a seguir'] },
  { slug: '8', number: 8, title: 'Klãdestino', date: '1993-04-17', dateLabel: '17 de Abril de 1993',
    volume: 'Ano II', frequency: 'Mensal', price: '100 Klãs',
    highlights: ['" Chinho ": Uma Mini Star de sucesso!', 'O que comem os animais?', 'Salame de Chocolate'],
    puzzles: 'passatempos', solutions: 'passatempos',
    sections: ['Editorial', 'Secções', 'Opinião', 'Prev & Seg.', 'Ekologi', 'Klarim', 'Passatempos', 'Kozinha', 'Pega & Faz'] },
  { slug: '9', number: 9, title: 'Klãdestino', date: '1993-05-15', dateLabel: '15 de Maio de 1993',
    volume: 'Ano II', frequency: 'Mensal', price: '100 Klãs',
    highlights: ['Entrevista com a Engª Eunice Silva', 'Iº Concurso de Fotografia - Belém / 93', "Who's the Boss ?"],
    puzzles: 'passatempos', solutions: 'solucoes',
    sections: ['Editorial', 'Secções', 'Opinião', 'Entrevista', 'Histórias', 'Espaço Religião', 'InkonFormação', 'O Concurso', 'KróniKa', 'Prev & Seg.', 'Ekologia', 'Passatempos', 'Kozinha', 'Klarim', 'Pega & Faz'] },
  { slug: 'passatempos', number: null, label: 'Passatempos', date: '1993-12', dateLabel: 'Dezembro de 1993',
    puzzles: 'cruzadex',
    sections: ['Passatempos'] },
];

export const issueSlugs = issueSummaries.map((i) => i.slug);

const files = import.meta.glob('./issues/*.js');

export function loadIssue(slug) {
  const load = files[`./issues/${slug}.js`];
  return load ? load().then((m) => m.default) : Promise.resolve(null);
}
