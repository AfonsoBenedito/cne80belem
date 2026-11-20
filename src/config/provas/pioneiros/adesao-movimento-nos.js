import nos from '../adesao-movimento-nos';

const [direito, correr, palavras] = nos.sections;

// The Pioneiros and Caminheiros share the two basic knots and four more for field construction.
export default {
  title: 'Nós',
  sectionMenu: 'Ir para um nó',
  deferLaterImages: true,
  sections: [
    { ...direito, id: 'no-direito', glosses: { espias: 'Espia', chicotes: 'Ponta ou chicote', laçar: 'Laçar' } },
    { ...correr, id: 'no-de-correr', glosses: { cote: 'Cote', argola: 'Argola', seio: 'Seio' } },
    {
      id: 'no-de-tripe',
      heading: 'Nó de Tripé',
      media: 'noDeTripe',
      mediaBesideText: true,
      mediaAfter: true,
      text: 'Serve para ligar três varas e montar um tripé, por exemplo para pendurar um candeeiro.\n\nCom as três varas lado a lado, fazer um nó de porco numa das varas de fora (1). Entrelaçar a corda nas três varas (2), apertar as voltas entre elas (3) e rematar com um nó de porco na outra vara de fora. Abrir o tripé (4).',
    },
    {
      id: 'no-de-porco',
      heading: 'Nó de Porco',
      media: 'noDePorco',
      mediaAfter: true,
      text: 'Também se chama nó de barqueiro ou volta do fiel.\n\nDar uma volta à vara e cruzar o chicote sobre a corda (1). Dar outra volta, passar o chicote por baixo do cruzamento e apertar (2).',
    },
    {
      id: 'no-de-pedreiro',
      heading: 'Nó de Pedreiro',
      media: 'noDePedreiro',
      mediaAfter: true,
      text: 'Também se chama volta da ribeira.\n\nPassar a corda à volta do tronco e o chicote à volta da parte comprida da corda (1). Enrolar o chicote sobre si próprio por dentro da volta e puxar pela parte comprida para apertar (2).',
    },
    {
      id: 'botao-em-cruz',
      heading: 'Botão em Cruz',
      media: 'botaoEmCruz',
      mediaAfter: true,
      text: 'Serve para unir duas varas cruzadas que tendem a afastar-se, como as escoras de um cavalete.\n\nPrender as duas varas com um nó de pedreiro (a). Dar três voltas numa diagonal (b) e três na outra (c). Apertar as voltas passando a corda entre as varas e rematar com um nó de porco numa delas (d).',
    },
    { ...palavras, id: 'palavras-dos-nos' },
  ],
};
