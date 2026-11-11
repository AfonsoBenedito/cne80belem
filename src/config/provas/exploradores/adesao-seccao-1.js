export default {
  title: 'Escutismo, uma fraternidade mundial',
  // The Caderno de Pista II asks "Reconheces que o Escutismo é uma fraternidade mundial?". From
  // the CNE's Caderno de Descobertas ("O Escutismo - Movimento Mundial"), the Regulamento Geral
  // (art. 6.º: the OMME, the CICE, the FEP, the Escutismo Lusófono, the AEP and the AGP),
  // escutismo.pt (its Internacional page: the OMME's three bodies, the Jamboree, the JOTA and
  // JOTI; and its page on the Insígnia Mundial, as the Wayback Machine keeps it); the Jamboree's
  // ages as the Pioneiros' Projetos have them. No numbers: the sources' (216 or 224 países e
  // territórios, 40 or 60 milhões) date as soon as they're printed. The OMME's three bodies by
  // name only, as escutismo.pt gives them; the CNE's other memberships are prova 2's
  sections: [
    {
      heading: 'Uma fraternidade mundial',
      text: 'O Escutismo é uma **fraternidade mundial**: um movimento que não olha a diferenças de classe, religião, país ou origem. Nunca parou de crescer desde que foi fundado, em 1907, e hoje junta milhões de escuteiros em quase todos os países do mundo.\n\nGraças a isso, os escuteiros podem fazer atividades internacionais e conhecer outros jovens, outros países e outras culturas. Sentem‑se assim parte de um grande movimento, com os mesmos ideais e símbolos.',
      media: 'mapaOmme',
      mediaAfter: true,
    },
    {
      heading: 'A OMME e o CNE',
      text: 'O Escutismo mundial é coordenado pela **Organização Mundial do Movimento Escutista** (OMME, ou WOSM, em inglês), uma organização internacional, independente dos governos. Tem três órgãos: a **Conferência Mundial**, que reúne as associações escutistas dos países membros e escolhe onde se faz cada Jamboree Mundial, o **Comité Mundial** e o **Bureau Mundial**.\n\nEm Portugal, o CNE e a AEP (Associação dos Escoteiros de Portugal) formam a **Federação Escutista de Portugal**, que os representa na OMME.',
      more: 'Organização do Agrupamento e do CNE',
    },
    {
      heading: 'A Insígnia Mundial',
      // The OMME's emblem at the drawings' size (13rem), its parts listed beside it, so each can
      // be found on it; it floats (`wrap`), the list running on under it (S. Tiago's signs)
      media: 'insigniaMundial',
      mediaFirst: true,
      wrap: true,
      text: 'A **Insígnia Mundial** é o símbolo da OMME. Os escuteiros de todo o mundo usam‑na para mostrar que pertencem ao movimento, e cada associação decide como se usa. A insígnia de hoje surgiu no 8.º Jamboree Mundial, em 1955.\n\nCada parte tem um significado:\n\n• **A flor‑de‑lis** indica o norte nos mapas, como o escuteiro mostra o caminho do serviço aos outros.\n• **As duas estrelas** são o conhecimento e a verdade.\n• **A ligação** é a família escutista.\n• **A corda** rodeia a flor‑de‑lis: é a família do movimento escutista em todo o mundo.\n• **O nó direito** é a força dessa família.\n• **As cores**: o branco é a pureza, e o roxo a liderança e o serviço.',
    },
    {
      heading: 'Encontros pelo mundo',
      text: 'Os escuteiros de todo o mundo encontram‑se em atividades internacionais, como estas:',
      // The JOTA-JOTI's logo and the first Jamboree's photo, at the text's width (`castLarge`): the
      // JOTA-JOTI first, the one an Expedição can take part in
      castSide: 'left',
      castLarge: true,
      cast: [
        { name: 'O JOTA‑JOTI', media: 'jotaJoti', text: ' é o Jamboree no Ar (desde 1957) e na Internet (desde 1996): todos os anos, no terceiro fim de semana de outubro, escuteiros de todo o mundo falam entre si por rádio e pela Internet.' },
        // Too small to see in place: it opens in the viewer, with a caption of its own
        { name: 'O Jamboree Mundial', media: 'bpJamboree', zoom: true, kind: 'Fotografia', caption: 'O primeiro Jamboree Mundial, em Londres, em 1920', text: ' é o grande acampamento do Escutismo mundial, de quatro em quatro anos, para jovens dos 14 aos 17 anos. O primeiro foi em 1920, em Londres, com escuteiros de 34 países.' },
      ],
    },
    {
      text: 'Em cada encontro vive‑se o 4.º artigo da Lei: «O Escuta é amigo de todos e irmão de todos os outros Escutas.»',
      more: 'Lei e Princípios',
    },
  ],
};
