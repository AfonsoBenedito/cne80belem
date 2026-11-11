export default {
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
};
