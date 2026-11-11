export default {
  title: 'Organização do Agrupamento e do CNE',
  // One text for the Exploradores, Pioneiros and Caminheiros, and general on purpose: any
  // agrupamento's scouts can study it (no unit numbers, núcleo or região of ours). The
  // Agrupamento first, then the levels above it, each with who decides and who leads (roles, not
  // names). From the CNE's Estatutos (2020) and Regulamento Geral (2023, retificado a
  // 01-10-2025) and escutismo.pt; new_info's 1998 sheets only where today's rules say the same.
  // The ages as the Regulamento Geral gives them (art. 26.º), the secções' years overlapping
  sections: [
    {
      part: 'O Agrupamento',
      heading: 'O que é um agrupamento',
      text: 'O Agrupamento é a estrutura base do CNE. Nasce de uma comunidade da Igreja e atua, normalmente, na área de uma paróquia.\n\nCada agrupamento tem um número, dado pela ordem em que entrou no CNE, e o nome do seu patrono ou da sua paróquia.',
    },
    {
      heading: 'As unidades',
      // Sizes as the Regulamento Geral gives them (arts. 64.º to 67.º); the patronos its art. 63.º;
      // the colours the secções' own (their provas, the lenços). One profile each, the same
      // fields in the same order, so the four can be compared and learnt
      text: 'Cada secção vive numa unidade, com dois a cinco pequenos grupos. Um agrupamento tem uma ou duas unidades de cada secção:',
      profiles: [
        { name: 'Alcateia', seccao: 'lobitos', facts: [['Secção', 'Lobitos'], ['Idades', '6 a 10 anos'], ['Grupos', 'Bandos de 4 a 7'], ['Patrono', 'São Francisco de Assis'], ['Cor', 'Amarelo']] },
        { name: 'Expedição', seccao: 'exploradores', facts: [['Secção', 'Exploradores'], ['Idades', '10 a 14 anos'], ['Grupos', 'Patrulhas de 4 a 8'], ['Patrono', 'São Tiago Maior'], ['Cor', 'Verde']] },
        { name: 'Comunidade', seccao: 'pioneiros', facts: [['Secção', 'Pioneiros'], ['Idades', '14 a 18 anos'], ['Grupos', 'Equipas de 4 a 8'], ['Patrono', 'São Pedro'], ['Cor', 'Azul']] },
        { name: 'Clã', seccao: 'caminheiros', facts: [['Secção', 'Caminheiros'], ['Idades', '18 a 22 anos'], ['Grupos', 'Tribos de 4 a 8'], ['Patrono', 'São Paulo'], ['Cor', 'Vermelho']] },
      ],
    },
    {
      heading: 'Quem anima a unidade',
      text: 'Cada unidade é animada pela sua Equipa de Animação: o Chefe de Unidade e o seu Adjunto, o Assistente de Agrupamento e os instrutores. As decisões tomam-se em conselho:',
      terms: [
        { term: 'Conselho de Guias', text: 'os Guias e os Sub-Guias, com o Chefe de Unidade, o Adjunto e o Assistente de Agrupamento: decide a vida do dia a dia da unidade.' },
        { term: 'Conselho de Unidade', text: 'de Alcateia, de Expedição, de Comunidade ou de Clã: todos os elementos da unidade e a Equipa de Animação, que tomam as grandes decisões e aprovam o plano de atividades.' },
        { term: 'Conselho da Lei', text: 'o Chefe de Unidade, o Assistente de Agrupamento e os Guias, que resolvem os casos de disciplina.' },
      ],
    },
    {
      heading: 'Quem dirige o Agrupamento',
      text: 'O Agrupamento é dirigido pela Direção de Agrupamento:\n\n• o Chefe de Agrupamento\n• o Chefe de Agrupamento Adjunto\n• o Assistente de Agrupamento, em princípio o pároco\n• o Secretário de Agrupamento\n• o Tesoureiro de Agrupamento\n• o Chefe de cada unidade\n\nCom ela, há dois conselhos:',
      terms: [
        { term: 'Conselho de Agrupamento', text: 'todos os dirigentes, os jovens que se preparam para ser dirigentes e os caminheiros. Reúne-se pelo menos duas vezes por ano e elege o Chefe de Agrupamento, por três anos.' },
        { term: 'Conselho de Pais', text: 'os encarregados de educação, que aconselham o Agrupamento.' },
      ],
    },
    {
      part: 'O CNE',
      heading: 'Os quatro níveis',
      // The CNE's four levels as a chain, as the Lobitismo prova sets the Alcateia's place; each
      // with who decides and who leads it, so the levels are told once
      text: 'O CNE está organizado em quatro níveis. Em cada um, um conselho decide e uma equipa dirige. Do mais pequeno ao maior, cada nível faz parte do seguinte:',
      steps: [
        { title: 'Agrupamento', text: 'O nível local. Decide o Conselho de Agrupamento; dirige a Direção de Agrupamento, com o Chefe de Agrupamento.' },
        { title: 'Núcleo', text: 'Coordena o escutismo de uma parte da região e reúne os seus agrupamentos. É um nível opcional, que cada região decide ter ou não. Decide o Conselho de Núcleo; dirige a Junta de Núcleo, eleita por três anos, com o Chefe de Núcleo.' },
        { title: 'Região', text: 'As regiões correspondem, normalmente, às dioceses; o CNE tem 20. Decide o Conselho Regional; dirige a Junta Regional, eleita por três anos, com o Chefe Regional.' },
        { title: 'Nacional', text: 'O CNE – Corpo Nacional de Escutas, Escutismo Católico Português. Decide o Conselho Nacional: o Plenário, onde têm lugar todos os dirigentes em funções, é o órgão máximo e reúne-se de três em três anos. Dirige a Junta Central, eleita por três anos, com o Chefe Nacional. Há ainda agrupamentos fora de Portugal, que dependem diretamente da Junta Central.' },
      ],
    },
    {
      heading: 'Outras associações em Portugal',
      // The two the Regulamento Geral names as the CNE's fraternal ones (art. 6.º), and the CNE's
      // former members' own
      text: 'Além do CNE, há em Portugal outras associações ligadas ao escutismo:\n\n• a AEP (Associação dos Escoteiros de Portugal), que forma com o CNE a Federação Escutista de Portugal\n• a AGP (Associação Guias de Portugal), do movimento das Guias\n• a FNA (Fraternidade de Nuno Álvares), dos adultos que foram escuteiros do CNE',
    },
    {
      heading: 'Para lá de Portugal',
      text: 'O CNE faz parte da Organização Mundial do Movimento Escutista, através da Federação Escutista de Portugal. Como escutismo católico, pertence também à Conferência Internacional Católica do Escutismo, e ainda à Comunidade do Escutismo Lusófono.',
    },
    {
      // Ours, as the História's: the words the text uses that an Explorador may not know, in the
      // order they come; a part of its own, so it isn't read as the CNE's
      part: 'Palavras desta prova',
      text: 'Para te ajudar a ler o texto acima:',
      terms: [
        { term: 'Paróquia', text: '- a comunidade da Igreja de um lugar, com a sua igreja e o seu pároco.' },
        { term: 'Pároco', text: '- o padre que está à frente de uma paróquia.' },
        { term: 'Assistente', text: '- quem acompanha a vida de fé dos escuteiros, num agrupamento, núcleo ou região.' },
        { term: 'Instrutores', text: '- adultos que ajudam a Equipa de Animação a animar uma unidade.' },
        { term: 'Encarregados de educação', text: '- os pais, ou quem cuida de cada escuteiro menor de idade.' },
        { term: 'Diocese', text: '- a parte da Igreja à frente da qual está um bispo; junta muitas paróquias.' },
        { term: 'Junta', text: '- a equipa eleita que dirige um núcleo, uma região ou o CNE.' },
        { term: 'Plenário', text: '- a reunião de todos os membros de um conselho, e não só de representantes.' },
      ],
    },
  ],
};
