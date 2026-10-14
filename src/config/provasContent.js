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

  'adesao-movimento-1': {
    title: 'História do Escutismo e do CNE',
    sections: [
      {
        heading: 'O nascimento do Escutismo',
        text: 'O Escutismo nasceu em 1907, quando Robert Baden-Powell organizou o primeiro acampamento escutista na ilha de Brownsea, em Inglaterra, com cerca de 20 rapazes de diferentes classes sociais. A experiência foi um sucesso e, no ano seguinte, Baden-Powell publicou "Scouting for Boys", lançando oficialmente o Movimento Escutista mundial.',
      },
      {
        heading: 'A chegada a Portugal',
        text: 'Em Portugal, o Escutismo chegou em 1913, com a fundação dos primeiros grupos. O Corpo Nacional de Escutas (CNE), de inspiração católica, foi fundado a 27 de maio de 1923, por iniciativa do Cardeal Patriarca de Lisboa, D. António Mendes Belo. Desde então, o CNE tem vindo a crescer e é hoje a maior associação juvenil portuguesa, com mais de 70.000 membros espalhados por todo o país e ilhas.',
      },
      {
        heading: 'Princípios fundamentais',
        text: 'O Escutismo baseia-se em princípios de serviço ao próximo, vida ao ar livre, aprendizagem pela ação e desenvolvimento integral do jovem - corpo, mente, carácter e espírito. O método escutista assenta no sistema de patrulhas/equipas, na vida na natureza, na mística e simbologia próprias, e no compromisso pessoal assumido através da Promessa.',
      },
    ],
  },

  'adesao-movimento-2': {
    title: 'Organização do Agrupamento e do CNE',
    sections: [
      {
        heading: 'Organização do Agrupamento',
        text: 'O Agrupamento é a unidade base do CNE. É composto por quatro secções, organizadas por faixas etárias: Lobitos (I Secção, 6-10 anos), Exploradores (II Secção, 10-14 anos), Pioneiros (III Secção, 14-17 anos) e Caminheiros (IV Secção, 17-22 anos). Cada secção é liderada por um Chefe de Secção e os seus adjuntos.',
      },
      {
        heading: 'A Direção do Agrupamento',
        text: 'A Direção do Agrupamento é o órgão responsável pela gestão e coordenação de todo o Agrupamento. É composta pelo Chefe de Agrupamento, Chefe-Adjunto, Secretário, Tesoureiro e Assistente Religioso. A Direção garante que as atividades escutistas decorrem de acordo com os princípios do CNE e assegura a articulação entre as secções.',
      },
      {
        heading: 'Organização nacional do CNE',
        text: 'A nível nacional, o CNE organiza-se em Juntas Regionais (correspondentes aos distritos e regiões autónomas) e em Núcleos (que agrupam vários Agrupamentos de uma mesma zona). No topo, a Junta Central é o órgão máximo de direção, presidida pelo Jefe Nacional. O CNE está filiado na Organização Mundial do Movimento Escutista (OMME/WOSM) e na Conferência Internacional Católica do Escutismo (CICE).',
      },
    ],
  },

  'adesao-movimento-3': {
    title: 'Vida de Baden-Powell',
    sections: [
      {
        heading: 'Infância e juventude',
        text: 'Robert Stephenson Smyth Baden-Powell nasceu a 22 de fevereiro de 1857, em Londres, Inglaterra. Era o sexto de oito filhos. O pai, professor na Universidade de Oxford, faleceu quando B-P tinha apenas 3 anos. A mãe, Henrietta, criou os filhos sozinha, incentivando-os a explorar a natureza. Na escola, B-P não era um aluno brilhante, mas destacava-se nas atividades ao ar livre, no teatro e na música.',
      },
      {
        heading: 'Carreira militar',
        text: 'Aos 19 anos, ingressou no exército britânico e serviu na Índia e em África. Tornou-se famoso durante a Guerra dos Boers (1899-1900), ao defender a cidade de Mafeking com uma guarnição muito reduzida durante 217 dias, usando táticas criativas - incluindo o recrutamento de rapazes jovens para serviços de mensageiro e vigia, o que mais tarde inspiraria o Escutismo.',
      },
      {
        heading: 'O fundador do Escutismo',
        text: 'De regresso a Inglaterra como herói nacional, B-P apercebeu-se de que os rapazes liam avidamente o seu manual militar "Aids to Scouting". Decidiu então adaptá-lo para jovens e organizou o acampamento de Brownsea em 1907. Em 1908, publicou "Scouting for Boys", e o movimento cresceu rapidamente por todo o mundo. Em 1910, B-P reformou-se do exército para se dedicar exclusivamente ao Escutismo.',
      },
      {
        heading: 'Legado',
        text: 'Casou com Olave St Clair Soames em 1912, que se tornou Chefe-Guia Mundial. B-P recebeu o título de Lord Baden-Powell of Gilwell em 1929. Retirou-se para o Quénia, onde faleceu a 8 de janeiro de 1941, em Nyeri. Na sua lápide está gravado o sinal de "Missão Cumprida" - um círculo com um ponto no centro. Deixou uma última mensagem aos escuteiros de todo o mundo, exortando-os a serem felizes e a deixarem o mundo um pouco melhor do que o encontraram.',
      },
    ],
  },

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

  'adesao-movimento-6': {
    title: 'Livro "Escutismo para Rapazes"',
    sections: [
      {
        heading: 'Sobre o livro',
        text: '"Scouting for Boys" (Escutismo para Rapazes) foi publicado por Baden-Powell em 1908, em seis fascículos quinzenais. É considerado o livro fundador do Movimento Escutista e um dos livros mais vendidos do século XX. Foi traduzido para dezenas de línguas e continua a ser uma referência para escuteiros de todo o mundo.',
      },
      {
        heading: 'Conteúdo',
        text: 'O livro está organizado em "Fogos de Conselho" (capítulos) e aborda temas como: técnicas de observação e dedução, acampismo, vida na natureza, primeiros socorros, civismo, cavalaria e serviço ao próximo. Baden-Powell usou as suas experiências militares e de viagem para criar exercícios e jogos práticos que tornassem a aprendizagem divertida e envolvente.',
      },
      {
        heading: 'Importância para o Escutismo',
        text: 'Mais do que um manual técnico, "Escutismo para Rapazes" é um guia de formação de carácter. B-P acreditava que o melhor caminho para formar bons cidadãos era através da prática, da responsabilidade e do contacto com a natureza. O livro lançou as bases do método escutista que ainda hoje utilizamos: aprender fazendo, trabalhar em equipa e crescer ao serviço dos outros.',
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

  'adesao-movimento-8': {
    title: 'Saudação e o seu significado',
    sections: [
      {
        heading: 'A saudação escutista',
        text: 'A saudação escutista faz-se com a mão direita levantada à altura do ombro, com os três dedos do meio estendidos e unidos, o polegar sobre o mindinho dobrado. Esta saudação é utilizada entre escuteiros de todo o mundo como sinal de reconhecimento e fraternidade.',
      },
      {
        heading: 'Significado dos três dedos',
        text: 'Os três dedos levantados representam os três pontos da Promessa escutista - os três deveres fundamentais:\n\n1. Dever para com Deus - cumprir os seus deveres religiosos.\n2. Dever para com os outros - servir a Pátria e o próximo.\n3. Dever para consigo próprio - viver segundo a Lei do Escuta.\n\nO polegar sobre o mindinho simboliza que o mais forte protege o mais fraco.',
      },
      {
        heading: 'Quando se usa',
        text: 'A saudação usa-se em momentos formais como cerimónias, aberturas e encerramentos de atividades, ao içar ou arriar a bandeira, e quando se encontra outro escuteiro. O aperto de mão escutista faz-se com a mão esquerda - a mão mais próxima do coração - simbolizando confiança e amizade.',
      },
    ],
  },

  'adesao-movimento-9': {
    title: 'Fórmula da Promessa',
    sections: [
      {
        heading: 'Fórmula da Promessa',
        text: 'A fórmula da Promessa do CNE é:\n\n"Prometo, pela minha honra e com a graça de Deus, fazer todo o possível por: cumprir os meus deveres para com Deus e para com a minha Pátria; auxiliar o meu próximo em todas as circunstâncias; obedecer à Lei do Escuta."',
      },
      {
        heading: 'Significado de cada parte',
        text: '• "Pela minha honra" - é um compromisso pessoal, baseado na integridade e na palavra dada.\n• "Com a graça de Deus" - reconhece que precisamos da ajuda de Deus para cumprir os nossos compromissos.\n• "Fazer todo o possível" - não se exige perfeição, mas sim o máximo esforço pessoal.\n• "Deveres para com Deus e para com a minha Pátria" - viver a Fé e ser um bom cidadão.\n• "Auxiliar o meu próximo em todas as circunstâncias" - o serviço aos outros é o coração do Escutismo.\n• "Obedecer à Lei do Escuta" - viver de acordo com os 10 artigos da Lei.',
      },
      {
        heading: 'A cerimónia da Promessa',
        text: 'A Promessa é feita numa cerimónia especial, geralmente durante um acampamento ou atividade significativa. O escuteiro, perante os seus companheiros e chefes, faz o sinal escutista e recita a fórmula da Promessa. É o momento mais importante na vida escutista de cada membro, pois marca o compromisso voluntário de viver segundo os valores do Escutismo. A partir desse momento, o escuteiro tem o direito de usar o distintivo da Promessa no uniforme.',
      },
    ],
  },

  // ═══════════════════════════════════════
  // ADESÃO À SECÇÃO
  // ═══════════════════════════════════════

  'pioneiros/adesao-seccao-1': {
    title: 'Organização dos Pioneiros',
    sections: [
      {
        heading: 'A III Secção',
        text: 'Os Pioneiros constituem a III Secção do CNE, acolhendo jovens dos 14 aos 17 anos. Esta é uma etapa de transição da adolescência para a juventude adulta, marcada pela descoberta pessoal, pelo desenvolvimento de competências e pelo compromisso crescente com a comunidade.',
      },
      {
        heading: 'A Equipa',
        text: 'A unidade base dos Pioneiros é a Equipa, composta por 5 a 8 elementos. A Equipa é o espaço privilegiado de convivência, decisão e ação. É na Equipa que os Pioneiros aprendem a trabalhar em conjunto, a tomar decisões democráticas e a partilhar responsabilidades. Cada Equipa tem o seu nome, o seu patrono e os seus símbolos próprios.',
      },
      {
        heading: 'O Conselho de Equipas',
        text: 'O Conselho de Equipas reúne os Guias de todas as Equipas da secção e os Chefes. É o órgão de coordenação e decisão da secção, onde se planificam as atividades, se avaliam os projetos e se tomam decisões que afetam toda a secção. A Assembleia de Secção reúne todos os Pioneiros e é o fórum mais amplo de participação.',
      },
    ],
  },

  'pioneiros/adesao-seccao-2': {
    title: 'Cargos da Equipa',
    sections: [
      {
        heading: 'Guia de Equipa',
        text: 'O Guia é o líder da Equipa. Coordena as atividades, representa a Equipa no Conselho de Equipas e é responsável pela dinâmica e coesão do grupo. Deve ser um exemplo para os restantes elementos, exercitando a liderança com espírito de serviço.',
      },
      {
        heading: 'Sub-Guia',
        text: 'O Sub-Guia é o braço direito do Guia, substituindo-o na sua ausência. Apoia o Guia na coordenação da Equipa e partilha com ele a responsabilidade pela vida da Equipa. É um cargo de confiança e de preparação para a liderança.',
      },
      {
        heading: 'Outros cargos',
        text: 'Cada Equipa distribui ainda outros cargos entre os seus membros, de acordo com as necessidades e competências de cada um:\n\n• Secretário - responsável pelas atas e registos da Equipa.\n• Tesoureiro - gere os fundos da Equipa.\n• Intendente - responsável pelo material e pela logística.\n• Animador - promove a boa disposição, a mística e o espírito de Equipa.\n• Enfermeiro - conhece primeiros socorros e zela pela saúde dos elementos.\n\nA rotação de cargos é encorajada para que todos desenvolvam diferentes competências.',
      },
    ],
  },

  'pioneiros/adesao-seccao-3': {
    title: 'Símbolos e Mística',
    sections: [
      {
        heading: 'O Icthus',
        text: 'O símbolo principal dos Pioneiros é o Icthus (peixe), símbolo dos primeiros cristãos. A palavra ΙΧΘΥΣ (em grego) é um acrónimo de "Iesous Christos Theou Yios Soter" (Jesus Cristo, Filho de Deus, Salvador). Representa a identidade cristã dos Pioneiros e a sua capacidade de "nadar contra a corrente" - ou seja, de viver os valores do Evangelho mesmo quando o mundo propõe o contrário.',
      },
      {
        heading: 'A Gota de Água',
        text: 'A Gota de Água é outro símbolo forte dos Pioneiros. Representa a capacidade de cada jovem, mesmo parecendo pequeno e insignificante, de provocar mudança - como uma gota de água que, ao cair, gera ondas que se propagam. Simboliza o impacto que cada Pioneiro pode ter na sua comunidade.',
      },
      {
        heading: 'A Rosa dos Ventos e a Machada',
        text: 'A Rosa dos Ventos simboliza a orientação e a capacidade de encontrar o caminho certo, de tomar decisões e de definir um rumo para a vida. A Machada representa o trabalho, o esforço e a capacidade de "desbravar caminho" - de superar obstáculos e de construir algo novo. Juntos, estes símbolos representam o espírito pioneiro de aventura, serviço e compromisso.',
      },
      {
        heading: 'A cor azul',
        text: 'A cor identificativa dos Pioneiros é o azul, que simboliza a profundidade, a serenidade e a confiança. O azul está presente nos distintivos, na decoração do Abrigo (o local de reunião dos Pioneiros) e nos elementos visuais da secção.',
      },
    ],
  },

  'pioneiros/adesao-seccao-4': {
    title: 'Patrono: S. Pedro',
    sections: [
      {
        heading: 'São Pedro - Patrono dos Pioneiros',
        text: 'O patrono dos Pioneiros do CNE é São Pedro, o apóstolo a quem Jesus disse: "Tu és Pedro, e sobre esta Pedra edificarei a minha Igreja." São Pedro era um pescador da Galileia que foi chamado por Jesus para ser "pescador de homens". É um exemplo de coragem, de fé e de liderança ao serviço dos outros.',
      },
      {
        heading: 'Porque é São Pedro o patrono?',
        text: 'São Pedro é o patrono dos Pioneiros porque encarna muitas das qualidades que se esperam de um Pioneiro: era um homem de ação, corajoso e generoso, mas também imperfeito e capaz de reconhecer os seus erros. A sua vida mostra que é possível crescer, superar as fraquezas e colocar-se ao serviço de uma causa maior. O símbolo do peixe (Icthus) também está ligado a São Pedro, enquanto pescador.',
      },
    ],
  },



  'pioneiros/adesao-seccao-7': {
    title: 'Áreas e Trilhos',
    sections: [
      {
        heading: 'O sistema FACEIS',
        text: 'A progressão pessoal dos Pioneiros organiza-se em torno do sistema FACEIS - um acrónimo que representa as seis áreas de desenvolvimento integral do jovem:\n\n• F - Física (desenvolvimento do corpo)\n• A - Afetiva (gestão das emoções e relações)\n• C - Carácter (formação da personalidade e valores)\n• E - Espiritual (vivência da fé e da espiritualidade)\n• I - Intelectual (desenvolvimento do pensamento e do conhecimento)\n• S - Social (participação na comunidade e cidadania)',
      },
      {
        heading: 'As etapas de progressão',
        text: 'A progressão dos Pioneiros divide-se em três etapas:\n\n1. Integração - adaptação à secção e à Equipa. O Pioneiro conhece a dinâmica da secção e começa a participar ativamente.\n2. Conhecimento - o Pioneiro escolhe trilhos de desenvolvimento em cada área FACEIS, trabalhando competências específicas com autonomia crescente.\n3. Compromisso - fase de consolidação, em que o Pioneiro assume responsabilidades de liderança e serviço, preparando-se para a passagem aos Caminheiros.',
      },
      {
        heading: 'Escolher os Trilhos',
        text: 'Na etapa de Conhecimento, cada Pioneiro constrói o seu percurso pessoal, escolhendo trilhos (objetivos concretos) em cada uma das áreas FACEIS. Estes trilhos são propostos pela Equipa e pelo próprio Pioneiro, com o acompanhamento do Chefe de Secção. A ideia é que cada jovem trabalhe as áreas em que mais precisa de crescer, de forma equilibrada e progressiva. Os trilhos são registados e avaliados periodicamente.',
      },
    ],
  },

  'pioneiros/adesao-seccao-8': {
    title: 'Projetos dos Pioneiros',
    sections: [
      {
        heading: 'Projetos nacionais e regionais',
        text: 'O CNE promove diversos projetos dirigidos especificamente aos Pioneiros, que complementam as atividades do Agrupamento e proporcionam experiências enriquecedoras a nível nacional e internacional.',
      },
      {
        heading: 'Exemplos de projetos',
        text: '• ACANAC (Acampamento Nacional) - o grande encontro nacional do CNE, que reúne milhares de escuteiros de todo o país.\n• Eurojam / Jamboree - encontros internacionais que promovem a fraternidade entre escuteiros de diferentes países e culturas.\n• Campos de Férias e Campos de Trabalho - projetos de voluntariado e serviço à comunidade, muitas vezes em parceria com outras organizações.\n• Projetos diocesanos e regionais - atividades organizadas pela Junta Regional ou pelo Núcleo, como raids, encontros de formação e retiros espirituais.',
      },
      {
        heading: 'O valor dos projetos',
        text: 'Participar em projetos para além do Agrupamento permite ao Pioneiro alargar horizontes, conhecer outras realidades, desenvolver competências de autonomia e liderança, e reforçar o sentido de pertença ao grande Movimento Escutista. Cada projeto é uma oportunidade de crescimento pessoal e de serviço, que enriquece a experiência escutista de forma única.',
      },
    ],
  },
};

export const getProvaContent = (seccao, slug) =>
  provasContent[`${seccao}/${slug}`] ?? provasContent[slug] ?? null;
