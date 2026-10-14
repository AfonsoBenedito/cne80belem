// ── Provas por secção ──
// Each secção has its own provas (only the ones the secção gives), in two groups. Each prova has
// a slug (for routing) and a title. When a secção's prova has the same content as one of the
// Adesão ao Movimento provas below, it is that prova: its name, its slug and so its page and text
// (a shared text is keyed by slug alone in provasContent.js). A secção's own prova gets its own
// slug, and a text for it is keyed "<secção>/<slug>".
// Titles are short names ("Lei e Princípios"), the same wherever two secções share a
// topic ("Símbolos e Mística", "Patrono: S. Tiago"). Adesão à Secção follows one order in every
// secção: organização, cargos, símbolos e mística, patrono, oração, livro/lei, progresso, the rest.
// Slugs never change with the order or the name, so links and texts keep their prova.

// The Adesão ao Movimento provas (Exploradores and Pioneiros take all nine)
const adesaoMovimento = {
  group: 'Adesão ao Movimento',
  items: [
    { slug: 'adesao-movimento-1', title: 'História do Escutismo e do CNE' },
    { slug: 'adesao-movimento-2', title: 'Organização do Agrupamento e do CNE' },
    { slug: 'adesao-movimento-3', title: 'Vida de Baden-Powell' },
    { slug: 'adesao-movimento-4', title: 'Lei e Princípios' },
    { slug: 'adesao-movimento-5', title: 'Oração do Escuta' },
    { slug: 'adesao-movimento-6', title: 'Livro "Escutismo para Rapazes"' },
    { slug: 'adesao-movimento-7', title: 'Uniforme e distintivos dos dirigentes' },
    { slug: 'adesao-movimento-8', title: 'Saudação e o seu significado' },
    { slug: 'adesao-movimento-9', title: 'Fórmula da Promessa' },
  ],
};

// The shared Adesão ao Movimento prova n (1–9)
const mov = (n) => adesaoMovimento.items[n - 1];

export const provas = {
  lobitos: [
    {
      group: 'Adesão ao Movimento',
      items: [
        mov(7),
        mov(8),
        mov(9),
        { slug: 'adesao-movimento-cargos', title: 'Cargos do Bando' },
        { slug: 'adesao-movimento-nos', title: 'Nó Direito e Nó de Correr' },
      ],
    },
    {
      group: 'Adesão à Secção',
      items: [
        { slug: 'adesao-seccao-5', title: 'Lobitismo' },
        { slug: 'adesao-seccao-1', title: 'Personagens do "Livro da Selva"' },
        { slug: 'adesao-seccao-4', title: 'Patrono: S. Francisco de Assis' },
        { slug: 'adesao-seccao-2', title: 'Oração do Lobito, Pai Nosso e Avé Maria' },
        { slug: 'adesao-seccao-3', title: 'Leis e Máximas do Lobito' },
      ],
    },
  ],
  exploradores: [
    adesaoMovimento,
    {
      group: 'Adesão à Secção',
      items: [
        { slug: 'adesao-seccao-2', title: 'Organização dos Exploradores' },
        { slug: 'adesao-seccao-3', title: 'Cargos da Patrulha' },
        { slug: 'adesao-seccao-4', title: 'Símbolos e Mística' },
        { slug: 'adesao-seccao-5', title: 'Patrono: S. Tiago' },
        { slug: 'adesao-seccao-7', title: 'Áreas de Desenvolvimento e Trilhos da etapa da Aliança' },
        { slug: 'adesao-seccao-1', title: 'Escutismo, uma fraternidade mundial' },
      ],
    },
  ],
  pioneiros: [
    adesaoMovimento,
    {
      group: 'Adesão à Secção',
      items: [
        { slug: 'adesao-seccao-1', title: 'Organização dos Pioneiros' },
        { slug: 'adesao-seccao-2', title: 'Cargos da Equipa' },
        { slug: 'adesao-seccao-3', title: 'Símbolos e Mística' },
        { slug: 'adesao-seccao-4', title: 'Patrono: S. Pedro' },
        { slug: 'adesao-seccao-7', title: 'Áreas e Trilhos' },
        { slug: 'adesao-seccao-8', title: 'Projetos dos Pioneiros' },
      ],
    },
  ],
  caminheiros: [
    {
      group: 'Adesão ao Movimento',
      // "Conhecer a organização do CNE. Saber quando e como surgiu o Escutismo e o CNE." is the
      // shared 1 and 2; "Conhecer as Leis e os Princípios do CNE." the shared 4
      items: [mov(1), mov(2), mov(3), mov(4), mov(5), mov(7), mov(9)],
    },
    {
      group: 'Adesão à Secção',
      items: [
        { slug: 'adesao-seccao-1', title: 'Organização da IVª Secção' },
        { slug: 'adesao-seccao-8', title: 'Cargos da Tribo' },
        { slug: 'adesao-seccao-2', title: 'Símbolos e Mística' },
        { slug: 'adesao-seccao-4', title: 'Patrono: S. Paulo' },
        { slug: 'adesao-seccao-3', title: 'Oração do Caminheiro' },
        { slug: 'adesao-seccao-5', title: 'Livro "A Caminho do Triunfo"' },
        { slug: 'adesao-seccao-6', title: 'Objetivos educativos da IVª Secção' },
        { slug: 'adesao-seccao-7', title: 'Projeto Pessoal de Vida (PPV)' },
      ],
    },
  ],
};
