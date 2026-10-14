// ── Conteúdo detalhado de cada prova ──
// Each entry has a title and sections (array of { heading?, text, recite? } or { heading?, media }; `recite`
// sets text that is said aloud from memory (prayers, the Lobito's Leis) in the larger reading style; media
// names pictures the page draws per secção, 'uniformes', 'progresso', 'dirigentes' or a badge grid, from config/distintivos.js;
// with text, `mediaFirst` puts a picture that shows what the text explains before it, so on phones it
// sits under the heading).
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
        recite: true,
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

  'adesao-movimento-9': {
    title: 'Fórmula da Promessa',
    // As the Exploradores, Pioneiros and Caminheiros make it; the Lobitos have their own, below
    sections: [
      {
        heading: 'A Promessa',
        recite: true,
        // The secção's Insígnia de Promessa beside the formula: what the Promessa earns
        media: 'promessa',
        text: 'Prometo, pela minha honra e com a graça de Deus, fazer todo o possível por:\n\n• Cumprir os meus deveres para com Deus, a Igreja e a Pátria;\n• Auxiliar o meu semelhante em todas as circunstâncias;\n• Obedecer à Lei do Escuta.',
      },
    ],
  },

  'adesao-movimento-8': {
    title: 'Saudação e o seu significado',
    // From the CNE's sheet "Saudações e o seu Simbolismo", as written, with the sign first (the saudações are its variations); the Lobitos have their own, below
    sections: [
      {
        heading: 'O Sinal Escutista',
        media: 'sinal',
        mediaFirst: true,
        text: 'Os 3 dedos fazem lembrar os 3 artigos da Promessa, assim como os 3 princípios do C.N.E. O polegar sobre o dedo mindinho fazem-nos lembrar que «o mais forte protege o mais fraco». A argola formada por estes dois dedos e a mão representa a união entre os escuteiros de todo o mundo.',
      },
      // After the sign they vary: the sheet's drawings of the saudações and the two positions, under the sheet's own heading
      { heading: 'As Saudações Escutistas', media: 'saudacoes' },
      {
        heading: 'O Aperto de Mão Escutista «Canhota»',
        media: 'aperto',
        mediaFirst: true,
        text: '"Owor Ogun" é o deus dos guerreiros e dos caçadores, e os caçadores africanos saudavam-se com a mão esquerda dizendo "Owor Ogun". Em todas as tribos da África Ocidental, a mão esquerda é um sinal de honra entre os homens de honra. Além disso, os guerreiros consideravam a mão esquerda muito leal, por ser a do lado do coração.\n\nOs guerreiros da África do Sul, que usavam lança e escudo, apertavam, para se saudarem, a mão esquerda, como sinal de grande confiança. Porquê? Os guerreiros pousavam o escudo, que lhes protegia o corpo, e assim podiam cumprimentar-se sem largarem a lança, que era a sua única defesa no meio hostil. Mostravam, assim, a confiança que tinham no guerreiro que cumprimentavam.\n\nAquando da queda de Kumassi, jovem rei dos Achantis, um dos chefes veio ao encontro de Baden-Powell e estendeu-lhe a mão esquerda. Baden-Powell apresentou-lhe a mão direita, mas o chefe disse: "Não! No meu país, aos mais bravo entre os bravos, cumprimenta-se com a mão esquerda."\n\nOs dedos mindinhos entrelaçados tornam o aperto de mão mais forte, mais unido, mais difícil de desfazer, lembrando a união e fraternidade entre todos os escuteiros do mundo.',
      },
    ],
  },

  // ═══════════════════════════════════════
  // ADESÃO À SECÇÃO
  // ═══════════════════════════════════════

  // The Lobitos' own saudação, in place of the shared one
  'lobitos/adesao-movimento-8': {
    title: 'Saudação e o seu significado',
    // As the CNE describes the I Secção's saudação
    sections: [
      {
        heading: 'A Saudação do Lobito',
        media: 'sinalLobito',
        mediaFirst: true,
        text: 'A saudação dos lobitos é diferente da dos escuteiros. Usar dois dedos abertos, que representam tanto os artigos da Lei do Lobito como as orelhas do lobo, quando está atento. Trata-se de um \'sinal secreto\' (B.P., Manual do Lobito, 23), cujo significado só os lobitos conhecem. Os membros da Equipa de Animação da Alcateia usam a saudação normal, menos quando saúdam os lobitos.',
      },
    ],
  },

  // The Lobitos' own Promessa, in place of the shared one
  'lobitos/adesao-movimento-9': {
    title: 'Fórmula da Promessa',
    sections: [
      {
        heading: 'A Promessa do Lobito',
        recite: true,
        // The secção's Insígnia de Promessa beside the formula: what the Promessa earns
        media: 'promessa',
        text: 'Prometo, da melhor vontade:\n\n• Ser amigo de Jesus, amando os outros;\n• Respeitar a Lei da Alcateia;\n• Praticar diariamente uma boa acção.',
      },
    ],
  },

  'lobitos/adesao-seccao-2': {
    title: 'Oração do Lobito, Pai Nosso e Avé Maria',
    // The three prayers alone: the Lobito's as the agrupamento says it, the other two as the
    // Church in Portugal prays them ("nos céus", "Avé", "na hora da nossa morte"). The Lobito's
    // "Amen." has no accent on purpose: that's how the agrupamento writes it; the others say "Ámen.
    sections: [
      {
        heading: 'Oração do Lobito',
        recite: true,
        text: 'Divino Menino Jesus.\nNós Vos oferecemos\ninteiramente o nosso coração.\nEnchei-o das Vossas virtudes,\ne ensinai-nos a imitar-Vos.\nNós queremos seguir o Vosso\nexemplo, com toda a boa vontade;\npara assim, com a ajuda da Vossa\nMãe, Maria Santíssima,\ncrescermos em graça e em idade.\nAmen.',
      },
      {
        heading: 'Pai Nosso',
        recite: true,
        text: 'Pai nosso, que estais nos céus,\nsantificado seja o vosso nome;\nvenha a nós o vosso reino;\nseja feita a vossa vontade,\nassim na terra como no céu.\nO pão nosso de cada dia nos dai hoje;\nperdoai-nos as nossas ofensas,\nassim como nós perdoamos\na quem nos tem ofendido;\ne não nos deixeis cair em tentação,\nmas livrai-nos do mal.\nÁmen.',
      },
      {
        heading: 'Avé Maria',
        recite: true,
        text: 'Avé Maria, cheia de graça,\no Senhor é convosco;\nbendita sois vós entre as mulheres\ne bendito é o fruto do vosso ventre, Jesus.\nSanta Maria, Mãe de Deus,\nrogai por nós pecadores,\nagora e na hora da nossa morte.\nÁmen.',
      },
    ],
  },

  'lobitos/adesao-seccao-3': {
    title: 'Leis e Máximas do Lobito',
    // Numbered, as the Lei e Princípios are
    sections: [
      {
        heading: 'As Leis do Lobito',
        recite: true,
        text: '1. O Lobito escuta «Aquelá».\n2. O Lobito não se escuta a si próprio.',
      },
      {
        heading: 'As Máximas do Lobito',
        recite: true,
        text: '1. O Lobito pensa primeiro no seu semelhante.\n2. O Lobito sabe ver e ouvir.\n3. O Lobito é asseado.\n4. O Lobito é verdadeiro.\n5. O Lobito é alegre.',
      },
    ],
  },
};

export const getProvaContent = (seccao, slug) =>
  provasContent[`${seccao}/${slug}`] ?? provasContent[slug] ?? null;
