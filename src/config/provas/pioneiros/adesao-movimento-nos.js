import nos from '../adesao-movimento-nos';

const [direito, correr, palavras] = nos.sections;

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
      id: 'botao-em-esquadria',
      heading: 'Botão em Esquadria',
      media: 'botaoEmEsquadria',
      mediaAfter: true,
      text: 'Serve para unir duas varas em ângulo reto.\n\nFazer um nó de porco no poste, logo abaixo da travessa **(a)**. Passar a corda pela frente da travessa e por trás do poste **(b)**. Seguir esse percurso até completar três voltas, lado a lado **(c)**. Passar a corda duas vezes entre as varas para apertar as voltas **(d)**. Rematar com um nó de porco na travessa **(e)**.',
    },
    { ...palavras, id: 'palavras-dos-nos' },
  ],
};
