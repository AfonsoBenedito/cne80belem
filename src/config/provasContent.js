// ── Conteúdo detalhado de cada prova ──
// Each entry has a title and sections (array of { heading?, text, recite? } or { heading?, media }; `recite`
// sets text that is said aloud from memory (prayers, the Lobito's Leis) in the larger reading style; media
// names pictures the page draws per secção, 'uniformes', 'progresso', 'dirigentes' or a badge grid, from config/distintivos.js;
// with text, `mediaFirst` puts a picture that shows what the text explains before it, so on phones it
// sits under the heading; `notes`, one per list item, set what each item means under it; `steps`,
// [{ label?, title?, text? }], a vertical line of steps after the text: a date each (`label`, the
// Lobitismo's history) or a name each (`title`, its chain); `swatches`, [{ name, color }], colours
// with their names (the Bandos'); `terms`, [{ term, text }], words and what they mean).
// Adesão ao Movimento is the same for every secção, so it is keyed by slug alone. Adesão à
// Secção differs per secção (Bando, Patrulha, Equipa, Comunidade), so it is keyed
// "<secção>/<slug>": a bare 'adesao-seccao-1' once sent every secção to the Pioneiros text.
// A prova with no text for its secção shows "está a ser preparado" on its page.

// The secção's Cargos prova (Bando, Patrulha, Equipa, Tribo): each cargo beside its badge, from
// the Lobitos' Manual de Adesão (Agr. 80, 2021-2022), its "bando" made the secção's own unit, so
// one text serves the four. The Guia de Alcateia (Lobitos only, no badge) is left out; its
// Intendente is the Cozinheiro. The manual has no Relações Públicas: that one is from the
// Exploradores' ("Patrulha")
const units = {
  lobitos: { unit: 'Bando', o: 'o bando', do: 'do bando', ao: 'ao bando', others: 'outros bandos', group: 'a Alcateia', who: 'É o Lobito que' },
  exploradores: { unit: 'Patrulha', o: 'a patrulha', do: 'da patrulha', ao: 'à patrulha', others: 'outras patrulhas', group: 'a Expedição', who: 'É quem' },
  pioneiros: { unit: 'Equipa', o: 'a equipa', do: 'da equipa', ao: 'à equipa', others: 'outras equipas', group: 'a Comunidade', who: 'É quem' },
  caminheiros: { unit: 'Tribo', o: 'a tribo', do: 'da tribo', ao: 'à tribo', others: 'outras tribos', group: 'o Clã', who: 'É quem' },
};

const cargos = (seccao) => {
  const u = units[seccao];
  // Each cargo's badge beside its heading (`headingMedia`), the heading an anchor (`id`) for the
  // grid of all nine that opens the page
  const cargo = (heading, media, text) => ({ heading, media, headingMedia: true, id: media, text });
  return {
    sections: [
      { media: 'cargosIndex' },
      cargo(`Guia de ${u.unit}`, 'guia', `O cargo de Guia é muito importante, pela capacidade de liderança que implica. A Equipa de Animação tem no Guia o seu melhor aliado na condução ${u.do}: ele atua como intermediário entre a Equipa de Animação, o Conselho de Guias e os restantes elementos, competindo-lhe a liderança ${u.do}.\n\nAo Guia compete:\n\n• Dirigir e animar ${u.o};\n• Distribuir tarefas e cargos;\n• Transportar a bandeirola ${u.do};\n• Representar ${u.o} no Conselho de Guias.`),
      cargo(`Sub-Guia de ${u.unit}`, 'subguia', `O Guia é acompanhado, na sua função de liderança, pelo Sub-Guia, um elemento ${u.do} que o ajuda e também o substitui em caso de ausência. Esta função reveste-se, assim, de especial importância.\n\nAo Sub-Guia compete:\n\n• Auxiliar o Guia em todas as suas tarefas, acompanhando-o de forma próxima não apenas para o apoiar, mas também para ir desenvolvendo as suas capacidades de chefia.`),
      cargo('Secretário', 'cargo-secretario', `É o especialista ${u.do} na área da comunicação escrita, oral e audiovisual.\n\nAo Secretário compete:\n\n• Marcar as presenças ${u.do};\n• Arquivar os documentos ${u.do};\n• Escrever todos os resumos das atividades ${u.do}.`),
      cargo('Tesoureiro', 'cargo-tesoureiro', `É o especialista ${u.do} na área económica. Isto quer dizer que trata do dinheiro ${u.do}. Por isso deve ser organizado, atento, poupado e ainda gostar de contas e matemática.\n\nAo Tesoureiro compete:\n\n• Receber a quota ${u.do}, de cada elemento;\n• Ser responsável pela caixa do dinheiro ${u.do};\n• Conseguir prestar contas.`),
      cargo('Guarda-Material', 'cargo-guarda-material', `É o guardião dos materiais ${u.do}. É o perito ${u.do} na conservação do seu material e equipamento.\n\nAo Guarda-Material compete:\n\n• Saber qual é o equipamento e material ${u.do};\n• Cuidar do material ${u.do};\n• Controlar as saídas de material e em que estado estão.`),
      cargo('Cozinheiro', 'cargo-cozinheiro', `É o especialista ${u.do} na área alimentar: gosta de cozinhar e de gerir a cozinha durante as atividades.\n\nAo Cozinheiro compete:\n\n• Ouvir os outros elementos ${u.do} sobre os seus gostos;\n• Propor aos chefes uma ementa para as atividades;\n• Ajudar os chefes a elaborar a lista dos produtos alimentares.`),
      cargo('Socorrista', 'cargo-socorrista', `É o especialista e técnico de saúde ${u.do}, responsável pela mala de primeiros socorros.\n\nAo Socorrista compete:\n\n• Cuidar da mala de primeiros socorros;\n• Tratar pequenas feridas dos elementos ${u.do}, quando em atividade;\n• Zelar pela higiene e segurança física ${u.do} nas atividades.`),
      cargo('Animador', 'cargo-animador', `${u.who} se sente à vontade para animar ${u.o} ou ${u.group}, e memoriza facilmente músicas ou danças, assim como gritos de animação.\n\nAo Animador compete:\n\n• Saber danças e canções, ensinando-as ao resto ${u.do}.`),
      cargo('Relações Públicas', 'cargo-relacoes-publicas', `É o especialista ${u.do} nos contactos com o exterior: ${u.others}, secções, grupos, agrupamentos, entidades, etc.\n\nAo Relações Públicas compete:\n\n• Coordenar os contactos com o exterior ${u.do};\n• Entregar depois as informações ${u.ao} ou ao grupo.`),
    ],
  };
};

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

  'lobitos/adesao-seccao-5': {
    title: 'Lobitismo',
    // From the Alcateia 16's Manual de Adesão (2021-2022), "Prova 7 – O Lobitismo": its history as
    // dated `steps`, the secções as a list and the Alcateia's place as a chain (the manual has each
    // in sentences), its ages as it gives them
    sections: [
      {
        heading: 'Conhecer o Lobitismo',
        // The manual's three paragraphs as their three dates
        steps: [
          { label: '1907', text: 'Um senhor inglês chamado Robert Baden-Powell (a quem nós chamamos BP) criou os Escuteiros (há mais de 100 anos!), um movimento para jovens, com o objetivo de os ajudar a crescer através do trabalho em equipa, da vida na Natureza e de um conjunto de regras que cada um seguia voluntariamente.' },
          { label: '1914', text: 'Inicialmente, os Escuteiros eram só para rapazes dos 12 aos 17 anos, mas BP apercebeu-se de que também os irmãos mais novos partilhavam dos seus ideais e do gosto pelas atividades na Natureza. Assim, com a ajuda de uma amiga, Vera Barclay, e inspirado nos contos do "Livro da Selva", criou um grupo para os irmãos mais novos, a Alcateia, e chamou Lobitos aos seus elementos.' },
          { label: '1916', text: 'BP publicou o primeiro "Manual do Lobito".' },
        ],
      },
      {
        heading: 'As quatro secções',
        text: 'Atualmente os Escuteiros encontram-se divididos em quatro secções, de acordo com as suas idades:\n\n• I Secção, a Alcateia, dos Lobitos: meninos e meninas dos 6 aos 10 anos\n• II Secção, a Expedição, dos Exploradores: dos 10 aos 13\n• III Secção, a Comunidade, dos Pioneiros: dos 14 aos 17\n• IV Secção, o Clã, dos Caminheiros: dos 18 aos 22',
      },
      {
        heading: 'Os Bandos',
        text: 'Na Alcateia os Lobitos estão distribuídos em equipas de 5 a 8 elementos, a que chamamos Bandos, orientados por um Guia e um Sub-Guia, e onde cada elemento tem o seu papel a desempenhar. Cada Bando tem o nome de uma das cores que os lobos têm ao longo das suas vidas:',
        // The manual names the colours, not their shades: these are a wolf's coat, as near as a
        // swatch gets, to show which is which (the name always beside it)
        swatches: [
          { name: 'Branco', color: '#f2efe8' },
          { name: 'Cinzento', color: '#8c8c8c' },
          { name: 'Preto', color: '#262626' },
          { name: 'Castanho', color: '#7a5434' },
          { name: 'Ruivo', color: '#b4582c' },
        ],
      },
      {
        heading: 'Caçadas e Covil',
        text: 'Na Alcateia chamamos:',
        terms: [
          { term: 'Caçadas', text: 'às atividades' },
          { term: 'Covil', text: 'ao nosso espaço na sede do Agrupamento' },
        ],
      },
      {
        heading: 'Onde está a nossa Alcateia',
        // The manual's one sentence as its chain, each part of the next
        text: 'Do mais pequeno ao maior, cada um faz parte do seguinte:',
        steps: [
          { title: 'Alcateia 16 – Santa Maria de Belém', text: 'A nossa Alcateia, uma das secções do Agrupamento.' },
          { title: 'Agrupamento 80 – Santa Maria de Belém' },
          { title: 'Núcleo Lisboa Ocidental' },
          { title: 'Região de Lisboa' },
          { title: 'CNE – Corpo Nacional de Escutas', text: 'Escutismo Católico Português, a maior das associações de Escuteiros de Portugal.' },
        ],
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
    // Numbered, as the Lei e Princípios are. `notes`, one per item, say what each means, from the
    // agrupamento's "Explicação Leis e Máximas" (none for "O Lobito é alegre", which it leaves blank)
    sections: [
      {
        heading: 'As Leis do Lobito',
        recite: true,
        text: '1. O Lobito escuta «Aquelá».\n2. O Lobito não se escuta a si próprio.',
        notes: [
          'Tal como Máugli, na selva, escuta os conselhos do velho lobo sábio, o mesmo deve acontecer connosco: em casa devemos ouvir os nossos pais, na escola os professores e nos escuteiros os nossos animadores.',
          'Quer dizer que o Lobito escuta sempre os outros, a família e os amigos. Quando temos de cumprir uma obrigação e achamos que não vamos conseguir, é sempre bom ouvir os outros, pois eles ajudam-nos a cumprir os nossos deveres.',
        ],
      },
      {
        heading: 'As Máximas do Lobito',
        recite: true,
        text: '1. O Lobito pensa primeiro no seu semelhante.\n2. O Lobito sabe ver e ouvir.\n3. O Lobito é asseado.\n4. O Lobito é verdadeiro.\n5. O Lobito é alegre.',
        notes: [
          'O Lobito pensa sempre primeiro na pessoa que está ao seu lado, seja amigo, familiar ou alguém que precisa muito da nossa ajuda. Se eu tiver dois pães e vir que o meu amigo do lado não tem nenhum, dou-lhe um para ele não ter fome.',
          'O Lobito não sabe tudo, por isso ouve a família, os animadores e os seus professores, para assim ficar a saber muito mais coisas.',
          'Há coisas que um Lobito tem de fazer: lavar os dentes e o corpo e andar sempre limpo. O Lobito também não deita lixo para o chão.',
          'O Lobito, mesmo quando faz asneiras, deve ser sempre verdadeiro com a família, os professores ou os animadores, porque assim eles nunca vão deixar de confiar em nós.',
        ],
      },
    ],
  },
  'lobitos/adesao-movimento-cargos': cargos('lobitos'),
  'exploradores/adesao-seccao-3': cargos('exploradores'),
  'pioneiros/adesao-seccao-2': cargos('pioneiros'),
  'caminheiros/adesao-seccao-8': cargos('caminheiros'),
};

export const getProvaContent = (seccao, slug) =>
  provasContent[`${seccao}/${slug}`] ?? provasContent[slug] ?? null;
