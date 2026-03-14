// ── Provas por secção ──
// Each section has groups of provas. Each prova has a slug (for routing) and a title.

// Shared provas (Adesão ao Movimento is common across all sections)
const adesaoMovimento = {
  group: 'Adesão ao Movimento',
  items: [
    { slug: 'adesao-movimento-1', title: 'Sabes quando e como surgiu o Escutismo e o CNE?' },
    { slug: 'adesao-movimento-2', title: 'Sabes como se organiza o teu Agrupamento? E o CNE?' },
    { slug: 'adesao-movimento-3', title: 'Conheces a vida de Baden-Powell?' },
    { slug: 'adesao-movimento-4', title: 'Conheces a Lei, os Princípios e a Promessa?' },
    { slug: 'adesao-movimento-5', title: 'Já sabes rezar a oração do Escuta?' },
    { slug: 'adesao-movimento-6', title: 'Conheces o livro "Escutismo para Rapazes"?' },
    { slug: 'adesao-movimento-7', title: 'Conheces o uniforme e os distintivos de função dos dirigentes?' },
    { slug: 'adesao-movimento-8', title: 'Conheces a saudação e sabes o que ela significa?' },
    { slug: 'adesao-movimento-9', title: 'Conheces a fórmula da Promessa e o que significa?' },
  ],
};

export const provas = {
  lobitos: [
    adesaoMovimento,
    {
      group: 'Adesão à Secção',
      items: [
        { slug: 'adesao-seccao-1', title: 'Como se organizam os Lobitos?' },
        { slug: 'adesao-seccao-2', title: 'Quais são os cargos existentes no Bando?' },
        { slug: 'adesao-seccao-3', title: 'Quais os símbolos e qual a mística dos Lobitos?' },
        { slug: 'adesao-seccao-4', title: 'Conheces o Patrono dos Lobitos e o do teu Bando?' },
        { slug: 'adesao-seccao-5', title: 'Já sabes trabalhar e viver em Bando?' },
        { slug: 'adesao-seccao-6', title: 'Já participaste numa atividade típica de secção?' },
        { slug: 'adesao-seccao-7', title: 'Já conheces as Pistas que terás de seguir na tua Caçada?' },
        { slug: 'adesao-seccao-8', title: 'Conheces os projetos existentes para os Lobitos?' },
      ],
    },
  ],
  exploradores: [
    adesaoMovimento,
    {
      group: 'Adesão à Secção',
      items: [
        { slug: 'adesao-seccao-1', title: 'Como se organizam os Exploradores?' },
        { slug: 'adesao-seccao-2', title: 'Quais são os cargos existentes na Patrulha?' },
        { slug: 'adesao-seccao-3', title: 'Quais os símbolos e qual a mística dos Exploradores?' },
        { slug: 'adesao-seccao-4', title: 'Conheces o Patrono dos Exploradores e o da tua Patrulha?' },
        { slug: 'adesao-seccao-5', title: 'Já sabes trabalhar e viver em Patrulha?' },
        { slug: 'adesao-seccao-6', title: 'Já participaste numa atividade típica de secção?' },
        { slug: 'adesao-seccao-7', title: 'Já conheces as Provas e as Classes que terás de completar?' },
        { slug: 'adesao-seccao-8', title: 'Conheces os projetos existentes para os Exploradores?' },
      ],
    },
  ],
  pioneiros: [
    adesaoMovimento,
    {
      group: 'Adesão à Secção',
      items: [
        { slug: 'adesao-seccao-1', title: 'Como se organizam os Pioneiros?' },
        { slug: 'adesao-seccao-2', title: 'Quais são os cargos existentes na Equipa?' },
        { slug: 'adesao-seccao-3', title: 'Quais os símbolos e qual a mística dos Pioneiros?' },
        { slug: 'adesao-seccao-4', title: 'Conheces o Patrono dos Pioneiros e o da tua Equipa?' },
        { slug: 'adesao-seccao-5', title: 'Já sabes trabalhar e viver em Equipa?' },
        { slug: 'adesao-seccao-6', title: 'Já participaste numa atividade típica de secção?' },
        { slug: 'adesao-seccao-7', title: 'Já conheces as Áreas e os Trilhos que terás de escolher na tua etapa de Conhecimento?' },
        { slug: 'adesao-seccao-8', title: 'Conheces os projetos existentes para os Pioneiros?' },
      ],
    },
  ],
  caminheiros: [
    adesaoMovimento,
    {
      group: 'Adesão à Secção',
      items: [
        { slug: 'adesao-seccao-1', title: 'Como se organizam os Caminheiros?' },
        { slug: 'adesao-seccao-2', title: 'Quais são os cargos existentes na Comunidade?' },
        { slug: 'adesao-seccao-3', title: 'Quais os símbolos e qual a mística dos Caminheiros?' },
        { slug: 'adesao-seccao-4', title: 'Conheces o Patrono dos Caminheiros e o da tua Comunidade?' },
        { slug: 'adesao-seccao-5', title: 'Já sabes trabalhar e viver em Comunidade?' },
        { slug: 'adesao-seccao-6', title: 'Já participaste numa atividade típica de secção?' },
        { slug: 'adesao-seccao-7', title: 'Já conheces o Percurso e as Etapas da tua Caminhada?' },
        { slug: 'adesao-seccao-8', title: 'Conheces os projetos existentes para os Caminheiros?' },
      ],
    },
  ],
};
