// ── Conteúdo detalhado de cada prova ──
// Each entry has a title and sections (array of { heading?, text } or { heading?, media }: media
// names pictures the page draws per secção, 'uniformes', 'progresso', 'dirigentes' or a badge grid, from config/distintivos.js).
// Adesão ao Movimento is the same for every secção, so it is keyed by slug alone. Adesão à
// Secção differs per secção (Bando, Patrulha, Equipa, Comunidade), so it is keyed
// "<secção>/<slug>": a bare 'adesao-seccao-1' once sent every secção to the Pioneiros text.
// A prova with no text for its secção shows "está a ser preparado" on its page.

export const provasContent = {
  // ═══════════════════════════════════════
  // ADESÃO AO MOVIMENTO
  // ═══════════════════════════════════════

  'adesao-movimento-4': {
    title: 'Lei e Princípios',
    sections: [
      {
        heading: 'Os 10 artigos da Lei',
        text: '1. A Honra do Escuta inspira confiança.\n2. O Escuta é Leal.\n3. O Escuta é útil e pratica diariamente uma boa acção.\n4. O Escuta é amigo de todos e irmão de todos os outros Escutas.\n5. O Escuta é delicado e respeitador.\n6. O Escuta protege as plantas e os animais.\n7. O Escuta é obediente.\n8. O Escuta tem sempre boa disposição de espírito.\n9. O Escuta é sóbrio, económico e respeitador do bem alheio.\n10. O Escuta é puro nos pensamentos, nas palavras e nas acções.',
      },
      {
        heading: 'Os Princípios',
        text: '1. O Escuta orgulha-se da sua Fé e por ela orienta toda a sua vida.\n2. O Escuta é filho de Portugal e bom cidadão.\n3. O dever do Escuta começa em casa.',
      },
    ],
  },

  'adesao-movimento-5': {
    title: 'Oração do Escuta',
    // The prayer alone, as the CNE words it
    sections: [
      {
        heading: 'Oração',
        text: 'Senhor Jesus\nEnsinai-me a ser generoso,\nA servir-Vos como Vós o mereceis,\nA dar-me sem medida,\nA combater sem cuidar das feridas,\nA trabalhar sem procurar descanso,\nA gastar-me sem esperar outra recompensa,\nSenão saber que faço a Vossa vontade santa,\nÁmen',
      },
    ],
  },

  'adesao-movimento-7': {
    title: 'Uniforme e distintivos dos dirigentes',
    // Pictures only, each named: the secção's own, from config/distintivos.js
    sections: [
      { media: 'uniformes' },
      { heading: 'Insígnia de Promessa', media: 'promessa' },
      { heading: 'Insígnias de secção', media: 'seccoes' },
      { heading: 'Guias e cargos', media: 'funcoes' },
      { heading: 'Insígnias de progresso', media: 'progresso' },
      { heading: 'Noites de campo', media: 'noites' },
      { heading: 'Distintivos dos dirigentes', media: 'dirigentes' },
    ],
  },

  // ═══════════════════════════════════════
  // ADESÃO À SECÇÃO
  // ═══════════════════════════════════════

  'lobitos/adesao-seccao-2': {
    title: 'Oração do Lobito, Pai Nosso e Avé Maria',
    // The three prayers alone: the Lobito's as the agrupamento says it, the other two as the
    // Church in Portugal prays them ("nos céus", "Avé", "na hora da nossa morte"). The Lobito's
    // "Amen." has no accent on purpose: that's how the agrupamento writes it; the others say "Ámen.
    sections: [
      {
        heading: 'Oração do Lobito',
        text: 'Divino Menino Jesus.\nNós Vos oferecemos\ninteiramente o nosso coração.\nEnchei-o das Vossas virtudes,\ne ensinai-nos a imitar-Vos.\nNós queremos seguir o Vosso\nexemplo, com toda a boa vontade;\npara assim, com a ajuda da Vossa\nMãe, Maria Santíssima,\ncrescermos em graça e em idade.\nAmen.',
      },
      {
        heading: 'Pai Nosso',
        text: 'Pai nosso, que estais nos céus,\nsantificado seja o vosso nome;\nvenha a nós o vosso reino;\nseja feita a vossa vontade,\nassim na terra como no céu.\nO pão nosso de cada dia nos dai hoje;\nperdoai-nos as nossas ofensas,\nassim como nós perdoamos\na quem nos tem ofendido;\ne não nos deixeis cair em tentação,\nmas livrai-nos do mal.\nÁmen.',
      },
      {
        heading: 'Avé Maria',
        text: 'Avé Maria, cheia de graça,\no Senhor é convosco;\nbendita sois vós entre as mulheres\ne bendito é o fruto do vosso ventre, Jesus.\nSanta Maria, Mãe de Deus,\nrogai por nós pecadores,\nagora e na hora da nossa morte.\nÁmen.',
      },
    ],
  },
};

export const getProvaContent = (seccao, slug) =>
  provasContent[`${seccao}/${slug}`] ?? provasContent[slug] ?? null;
