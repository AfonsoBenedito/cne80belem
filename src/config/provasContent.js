// ── Conteúdo detalhado de cada prova ──
// Each entry has a title and sections (array of { heading?, text, recite? } or { heading?, media }; `recite`
// sets text that is said aloud from memory (prayers, the Lobito's Leis) in the larger reading style; media
// names pictures the page draws per secção, 'uniformes', 'progresso', 'dirigentes' or a badge grid, from config/provasMedia.js;
// with text, `mediaFirst` puts a picture that shows what the text explains before it, so on phones it
// sits under the heading; `mediaAfter` sets it under the text instead, at its own size (a wide
// diagram: the nós); `notes`, one per list item, set what each item means under it; `steps`,
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

// The knots (Nó Direito e Nó de Correr), the same in every secção
const nos = {
    title: 'Nó Direito e Nó de Correr',
    // The same in every secção. From the Alcateia 16's Manual de Adesão (2021-2022), "Prova 4 –
    // Os nós", word for word (its opening line, about the Lobitos, only on theirs, below),
    // each knot's steps drawn under its text (`mediaAfter`: the diagrams are wide); the last
    // section, the knot words, is ours
    sections: [
      {
        heading: 'Nó Direito',
        media: 'noDireito',
        mediaAfter: true,
        text: 'O nó direito é utilizado para unir duas espias do mesmo tamanho.\n\nCruzar a ponta esquerda sobre a direita e laçar; cruzar de novo a ponta direita sobre a ponta esquerda e laçar.\n\nDe cada lado os chicotes ficam lado a lado.',
      },
      {
        heading: 'Nó de Correr',
        media: 'noDeCorrer',
        mediaAfter: true,
        text: 'O nó de correr serve para fixar rapidamente uma corda a um tronco, por exemplo. Com o nó de correr, quanto mais puxarmos, mais apertado fica o laço em torno do objeto.\n\nFazer um cote direto (1), e passar o chicote livre (2) por dentro da argola, dobrado, formando um seio.',
      },
      {
        // Ours, not the manual's: the knot words its text uses, for a Lobito meeting them first
        heading: 'Palavras dos nós',
        text: 'Para te ajudar a ler as explicações acima:',
        terms: [
          { term: 'Espia', text: '- uma corda.' },
          { term: 'Ponta ou chicote', text: '- a extremidade da corda, a parte que se mexe para fazer o nó.' },
          { term: 'Laçar', text: '- passar uma ponta à volta da outra, prendendo-as.' },
          { term: 'Argola', text: '- a volta fechada que a corda faz sobre si própria.' },
          { term: 'Cote', text: '- uma volta simples: a ponta passa por dentro de uma argola feita com a própria corda.' },
          { term: 'Seio', text: '- uma parte da corda dobrada ao meio, em forma de U, sem as pontas.' },
        ],
      },
    ],
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
    // Pictures only, each named: the secção's own, from config/provasMedia.js
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

  'adesao-movimento-nos': nos,

  'adesao-movimento-6': {
    title: 'Livro "Escutismo para Rapazes"',
    // What the book is, why it was written, how it's organised and what it teaches, short, for
    // the Exploradores and Pioneiros: ours, from the book itself (its 1908 parts: six parts, 28
    // camp fire yarns, the instructors' notes in italics, patrols of six to eight named after
    // animals, "Be Prepared" from B. P.) and what is known of its history; the two paragraphs on
    // its publication are the agrupamento's own text, word for word
    sections: [
      {
        heading: 'Um livro para rapazes',
        text: '*Escutismo para Rapazes* (em inglês, *{en}Scouting for Boys*) é o livro que Baden-Powell escreveu para os rapazes, e foi com ele que o Escutismo começou. Ensina a viver ao ar livre, a ser útil aos outros e a ser um bom cidadão, com aventuras, histórias e jogos.\n\nFoi escrito em 1908, para os rapazes do seu tempo; hoje, o Escutismo é de rapazes e raparigas.',
      },
      {
        heading: 'Porque foi escrito',
        // The story as its dates; 1908's text is the agrupamento's own, word for word
        steps: [
          { label: '1899', text: 'Baden-Powell escreveu um livro para soldados, *{en}Aids to Scouting*, que os ensinava a observar, a seguir pistas e a desenrascar-se no campo.' },
          { label: '1900', text: 'Depois do cerco de Mafeking, tornou-se um herói em Inglaterra e descobriu que muitos rapazes e professores usavam esse livro para aprender e para brincar.' },
          { label: '1907', text: 'Para escrever um livro só para os rapazes, que os ajudasse a crescer saudáveis, desembaraçados e prontos a ajudar, experimentou primeiro as suas ideias num acampamento com cerca de vinte rapazes, na ilha de Brownsea.' },
          { label: '1908', text: 'E a seguir, nos primeiros meses de 1908, publicou em seis prestações quinzenais, ilustradas por ele próprio, o seu manual de instrução sem sequer sonhar que este livro ia desencadear um movimento que havia de afectar os rapazes de todo o mundo.\n\nMal começara a aparecer nas livrarias e quiosques, começaram a surgir patrulhas e grupos escutistas, não apenas na Inglaterra, mas em muitos outros países.' },
        ],
      },
      {
        heading: 'Como está organizado',
        // The six parts as their numbers, the prose about them before the list
        text: 'O livro tem seis partes, uma por cada prestação. Ao longo delas há 28 conversas de fogueira (em inglês, *{en}camp fire yarns*), escritas como se Baden-Powell estivesse a falar com os rapazes à volta do fogo, com histórias, exemplos e conselhos, e jogos e exercícios para pôr em prática o que se aprendeu. As notas para os instrutores (hoje diríamos os dirigentes) aparecem em itálico.\n\nAs seis partes:',
        terms: [
          { term: 'I', text: 'O que fazem os escuteiros, a Lei e a Promessa, os sinais e as insígnias' },
          { term: 'II', text: 'Observar e seguir pistas; a natureza e os animais' },
          { term: 'III', text: 'Acampar e a vida no campo; pioneirismo e desenrascanço' },
          { term: 'IV', text: 'Resistência e saúde; coragem, cavalheirismo e disciplina' },
          { term: 'V', text: 'Salvar vidas e primeiros socorros; amor à pátria' },
          { term: 'VI', text: 'Jogos, competições e representações, e conselhos para os instrutores' },
        ],
      },
      {
        heading: 'O que se aprende nele',
        // What a scout will recognise from it, all in the 1908 text: the motto from B.-P.'s
        // initials, the daily good turn, patrols named after animals, Kim's game
        text: 'É no *Escutismo para Rapazes* que a Lei e a Promessa do escuteiro aparecem pela primeira vez escritas para os rapazes, e é nele que Baden-Powell explica as patrulhas: grupos de seis a oito rapazes com o seu guia, cada uma com o nome de um animal e o seu grito. O resto do livro ensina sobretudo a fazer coisas: observar e deduzir, orientar-se, acampar, fazer fogo e cozinhar, construir com cordas e paus, cuidar da saúde, prestar os primeiros socorros e ajudar quem precisa.\n\nDesde 1908, foi traduzido para dezenas de línguas e é um dos livros mais vendidos do século XX. Nas edições de hoje está dividido em capítulos, e não nas seis partes do início.\n\nMuito do que fazes na tua patrulha vem daqui: o lema «Be Prepared» («Está preparado»), que Baden-Powell tirou das suas iniciais, B. P., e que tem o mesmo espírito do nosso «Alerta»; a boa ação de cada dia; e o jogo de Kim, em que se olha para uns objetos e depois se tenta lembrar de todos.',
      },
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

  // The Lobitos' knots open with the manual's own line to them
  'lobitos/adesao-movimento-nos': {
    title: 'Nó Direito e Nó de Correr',
    sections: [
      {
        text: 'Ao longo dos anos que vais passar nos escuteiros vais aprender muitos nós. Como não podia deixar de ser, nos Lobitos vais ter que aprender dois nós muito simples.',
      },
      ...nos.sections,
    ],
  },

  'lobitos/adesao-seccao-1': {
    title: 'Personagens do "Livro da Selva"',
    // From the Alcateia 16's Manual de Adesão (2021-2022), "Prova 1 – O Livro da Selva", word for
    // word and in its paragraphs: the book, then its people, each character beside the manual's
    // drawing of them
    sections: [
      // The manual's question under its title, the prova's one line to the Lobito
      { lead: 'Conheces as Personagens mais importantes do “Livro da Selva”' },
      {
        heading: 'O Livro da Selva',
        text: 'O “Livro da Selva” foi escrito em finais do século XIX, por um escritor inglês chamado Rudyard Kipling, e conta a história de um bébé que se perde dos pais durante um ataque de um Tigre, e que é adotado por uma Alcateia de Lobos, na Selva indiana de Seiouni.\n\nCom a ajuda de outros animais da Selva – entre os quais um Urso, uma Pantera e uma Cobra – esse menino vai sobrevivendo aos diversos perigos, enquanto cresce e aprende a Lei da Selva, acabando por superar todos os obstáculos, e por voltar à Aldeia dos Homens.',
      },
      {
        heading: 'O Povo da Selva',
        text: 'O Povo da Selva é constituído por animais que falam, pensam, experimentam, vivem em sociedade, submetidos à Lei da Selva. Cada animal representa uma qualidade, um aspeto, uma tendência, uma disposição de espírito humano. Mas mais ainda encontramos na Selva de Seiouni, uma sociedade organizada, com as suas leis, a que todos estão submetidos. Assim vamos conhecer de uma forma breve as personagens da Selva e as características que representam.',
        // Each character as the manual sets them: the name in bold opening its text (`text` runs on
        // from it), the manual's drawing of them beside
        cast: [
          { name: 'Maugli', media: 'selvaMaugli', text: ' é o menino criado pelos lobos, a quem foram ensinados todos os segredos da selva, tornando-se forte e destemido.' },
          { name: 'Áquelá', media: 'selvaAquela', text: ' é o Chefe da Alcateia, o responsável por liderá-la nas caçadas e por garantir que todos cumprem a Lei da Selva.' },
          { name: 'Pai Lobo', media: 'selvaPaiLobo', text: ' foi o lobo que encontrou Maugli quando este se tinha perdido dos pais e o levou para o meio da sua Alcateia.' },
          { name: 'Racxa', media: 'selvaRacxa', text: ', a Mãe Loba, é primeira a acolher Maugli, defendendo-o do Tigre, e adotando-o (com o Pai Lobo). É também ela a primeira a defender Maugli perante a Alcateia, na Rocha do Conselho.' },
          { name: 'Balú', media: 'selvaBalu', text: ' é o urso bom e sábio. Embora muito brincalhão e dorminhoco, é ele o grande Mestre da Lei da Selva, e quem a ensina a Maugli e a outras crias.' },
          { name: 'Baguera', media: 'selvaBaguera', text: ', a pantera negra, é uma caçadora astuta, valente e forte. É quem ensina Maugli a caçar e a viver na selva.' },
          { name: 'Haiti', media: 'selvaHaiti', text: ', um elefante grande e selvagem que deixa um grande rasto por onde quer que passa. Com a sua tromba anuncia os acontecimentos mais importantes da selva.' },
          { name: 'Cá', media: 'selvaCa', text: ', a serpente já velhota e simples, é um pouco lenta, mas muito voraz, e a principal inimiga dos macacos da Selva, ajudando Maugli a livrar-se deles.' },
          { name: 'Banderlogues', media: 'selvaBanderlogues', text: ' são os macacos da selva, um povo desorganizado, sem disciplina, nem Lei. São pouco asseados, muito barulhentos, indisciplinados e descuidados com as crias.' },
          { name: 'XerCane', media: 'selvaXerCane', text: ' o tigre velho, cruel e cobarde. É ele o principal inimigo de Maugli, sempre a tentar retirá-lo da proteção da Alcateia.' },
        ],
      },
    ],
  },

  'lobitos/adesao-seccao-4': {
    title: 'Patrono: S. Francisco de Assis',
    // From the Alcateia 16's Manual de Adesão (2021-2022), "Prova 6 – São Francisco de Assis",
    // word for word and in its paragraphs, in three parts (why he is the Lobitos' patrono, his
    // life, the wolf of Gúbio), each beside one of the manual's drawings; his life's four
    // paragraphs each under a sub-heading of ours (the manual has none), its words untouched
    sections: [
      {
        heading: 'O Patrono dos Lobitos',
        media: 'sfPatrono',
        mediaFirst: true,
        text: 'S. Francisco de Assis é o Patrono dos Lobitos de todo o mundo, tendo sido escolhido para olhar pela nossa secção pelo seu grande exemplo de devoção a Deus, dedicação ao próximo, e respeito por toda a Criação de Deus.',
      },
      {
        heading: 'A vida de S. Francisco',
        media: 'sfCrianca',
        mediaFirst: true,
        text: '### Em Assis\n\nS. Francisco nasceu na cidade Italiana de Assis, no século XII. Os seus pais não eram nobres, mas viviam muito bem, pois eram importantes comerciantes de tecidos. Assim, Francisco teve uma infância boa e muito alegre.\n\n### A guerra e a Capela de S. Damião\n\nQuando era jovem, cantava e tocava em todas as festas da cidade e tinha muitos amigos. Era muito bom e quando alguém lhe pedia esmola ele não negava nunca ajuda. Mas, quando Francisco tinha 20 anos, rebentou a guerra entre Assis e Perusa, uma outra cidade Italiana, e ele foi combater ao lado das tropas da sua cidade. Foi feito prisioneiro, voltou a casa doente e nunca mais teve a mesma alegria. Em Assis havia uma linda capela em ruinas, a Capela de S. Damião, onde Francisco ia muitas vezes rezar ao pé do cruxifixo e onde um dia ouviu a voz de Deus: “Vai Francisco e reconstrói a minha Igreja”. Pensando que Deus queria que reconstruisse aquele templo, Francisco decidiu reconstruir a Capela de S. Damião.\n\n### Deixar tudo\n\nUm dia, na missa, ouviu as palavras do Evangelho, “Ide pelo mundo e anunciai o Reino de Deus. Não leveis nada para o caminho, nem bolsa, nem cajado…” e julgou que eram para si. Quando voltou a casa, repartiu todos os tecidos da loja e dinheiro pelos pobres. O seu pai ficou muito zangado e disse-lhe que tinha que lhe devolver tudo. Francisco despiu a roupa que tinha e disse ao pai que a partir daquele momento não mais lhe chamaria pai. A partir dali seria somente filho do Pai que está no Céu, de Deus.\n\n### Pela Itália\n\nDurante muito tempo, andou por toda a Itália a espalhar a palavra de Deus e juntou muitos amigos que deixavam tudo o que tinham para seguirem com ele. Viviam do que lhes davam e passavam a vida a falar sobre Deus e Jesus e a cantar cânticos de louvor, dormindo ao ar livre ou em cabanas.',
      },
      {
        heading: 'O lobo de Gúbio',
        media: 'sfLobo',
        mediaFirst: true,
        text: 'Francisco adorava todas as criaturas, considerando que se todos os animais eram filhos de Deus seriam também, por esse motivo, seus irmãos.\n\nCerto dia, ao passar por Gúbio, perto de Assis, ouviu falar de um lobo que atacava a população e o seu gado. Adiantando-se à multidão que se juntava para caçar e matar o lobo, Francisco foi até à montanha e falou com o animal que se tornou meigo e carinhoso e nunca mais atacou ninguém, passando a ser alimentado pelas próprias pessoas que assustava e que o pretendiam matar!',
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
  'exploradores/adesao-seccao-5': {
    title: 'Patrono: S. Tiago',
    // His life told for the Exploradores (10 to 13): ours, from the Gospels and the Acts (the
    // references given) and what tradition tells (said as tradition), in short parts under
    // sub-headings; then why he is their patrono, the CNE's Manual do Dirigente's own words
    sections: [
      {
        heading: 'Quem foi São Tiago',
        // The prova's one drawing, first: the pilgrim, his signs numbered (the Caminho part
        // below points back to it)
        media: 'saoTiagoSinais',
        mediaFirst: true,
        // Taller than its two paragraphs: the life runs on beside it
        wrap: true,
        text: 'São Tiago foi um dos doze Apóstolos, os amigos que Jesus escolheu para O acompanharem e para levarem a Sua mensagem a todo o mundo. Chamamos-lhe São Tiago Maior para não o confundirmos com outro apóstolo com o mesmo nome, São Tiago Menor.\n\nÉ o Patrono dos Exploradores: o santo que olha pela nossa secção e que queremos imitar.',
      },
      {
        heading: 'A vida de São Tiago',
        // Three parts, each a step of his life, so each heading is one to remember
        text: '### Pescador e chamado por Jesus\n\nTiago nasceu na Galileia, uma região no norte da Terra Santa, há cerca de dois mil anos. Era filho de Zebedeu e de Salomé e irmão de João, que também viria a ser apóstolo. Tal como o pai, os dois irmãos eram pescadores no lago de Genesaré, a que também se chama mar da Galileia.\n\nUm dia, Jesus passou junto ao lago e viu os dois irmãos no barco, a arranjar as redes com o pai. Chamou-os, e eles deixaram logo o barco e o pai e foram com Ele (Evangelho de São Marcos, 1,19-20). Jesus deu-lhes uma alcunha: «Boanerges», que quer dizer «filhos do trovão» (São Marcos, 3,17), talvez por terem um feitio forte e decidido.\n\n### Amigo de Jesus\n\nTiago, o irmão João e Pedro eram os três apóstolos que Jesus levava consigo nos momentos mais importantes. Estiveram com Ele quando devolveu a vida à filha de Jairo e quando se transfigurou no alto de um monte. Estiveram também no Jardim das Oliveiras, onde Jesus rezou na noite antes de morrer.\n\nDepois de Jesus morrer e ressuscitar, Tiago viu-O ressuscitado e, com os outros apóstolos, recebeu o Espírito Santo no dia de Pentecostes. A partir daí, deixou de ter medo e partiu a anunciar Jesus a toda a gente.\n\n### Até à Península Ibérica, e de volta\n\nSegundo a tradição, Tiago viajou até à Península Ibérica, onde hoje ficam Portugal e Espanha, para anunciar o Evangelho, sobretudo na Galiza e na região de Aragão. Conta também a tradição que, num dia em que estava desanimado, em Saragoça, Nossa Senhora lhe apareceu sobre um pilar para lhe dar coragem.\n\nMais tarde, Tiago voltou a Jerusalém. Por volta do ano 44, o rei Herodes Agripa mandou matá-lo à espada (Atos dos Apóstolos, 12,1-2). Foi o primeiro dos doze apóstolos a dar a vida por Jesus.',
      },
      {
        // After his life, what came of it: its own part
        heading: 'O Caminho de Santiago',
        text: 'Segundo a tradição, os seus discípulos levaram o seu corpo de barco até à Galiza e sepultaram-no ali. Muitos séculos depois, no século IX, um eremita chamado Pelágio viu umas luzes misteriosas sobre um campo, e foi aí que se encontrou o túmulo de São Tiago. À sua volta nasceu a cidade de Santiago de Compostela, onde hoje fica a sua catedral.\n\nDesde então, milhões de peregrinos de todo o mundo fazem a pé o Caminho de Santiago, e ainda hoje há caminhos que partem de Portugal. Levam uma concha de vieira, que se tornou o sinal do Caminho, um bordão para se apoiarem e uma cabaça com água. É assim que vês São Tiago no desenho, lá em cima: vestido de peregrino, a caminho, com os três sinais.\n\nTodos os anos, a 25 de julho, a Igreja celebra a festa de São Tiago.',
      },
      {
        heading: 'O nosso patrono',
        // The CNE's Manual do Dirigente (A acção pedagógica, p. 94), word for word, set as a
        // quotation between a line of ours that says whose words they are and one that turns them
        // to the Explorador
        intro: 'O Manual do Dirigente do CNE explica assim porque é que São Tiago é o nosso patrono:',
        source: 'Manual do Dirigente, CNE',
        text: 'Também tu, como Explorador, és chamado a pôr-te a caminho, como São Tiago, e a partilhar com os outros o que vais descobrindo.',
        quote: 'O exemplo do patrono da 2ª secção, São Tiago (Maior), pode servir de estímulo a todos quantos têm a coragem de se pôr a caminho, para partilhar com outros a descoberta que já fizeram.\n\nChamado por Cristo, São Tiago viu concretizadas as promessas de Deus ao seu Povo, ao testemunhar o poder da Ressurreição de Cristo. A partir daí, fortalecido pelo Espírito Santo, São Tiago assumiu a fé de forma destemida e aceitou testemunhá-la até às últimas consequências (Act. 12,1-2). Sendo originário da Galileia, São Tiago terá aceitado o desafio de partilhar com outros povos o tesouro da fé: segundo a tradição, teria vindo até à Península Ibérica, para evangelizar, tendo desenvolvido actividade sobretudo na Galiza e na zona hoje correspondente a Aragão.\n\nAssim, São Tiago foi um autêntico explorador, na medida em que aceitou pôr-se a caminho, guiado pela «estrela» da fé que o animava e fortalecido pelo desejo insaciável de a dar a conhecer. Mesmo sem saber que dificuldades iria encontrar, São Tiago partiu com o intuito de apontar, também aos outros, o caminho para a «Terra Prometida»: o caminho para Deus.',
      },
    ],
  },

  'exploradores/adesao-seccao-3': cargos('exploradores'),
  'pioneiros/adesao-seccao-2': cargos('pioneiros'),
  'caminheiros/adesao-seccao-8': cargos('caminheiros'),
};

export const getProvaContent = (seccao, slug) =>
  provasContent[`${seccao}/${slug}`] ?? provasContent[slug] ?? null;
