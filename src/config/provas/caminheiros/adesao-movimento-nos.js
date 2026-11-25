import nos from '../pioneiros/adesao-movimento-nos';

const botaoEmCruz = {
  id: 'botao-em-cruz',
  heading: 'Botão em Cruz',
  media: 'botaoEmCruz',
  mediaAfter: true,
  text: 'Serve para unir duas varas cruzadas que tendem a afastar-se, como as escoras de um cavalete.\n\nPrender as duas varas com um nó de pedreiro (a). Dar três voltas numa diagonal (b) e três na outra (c). Apertar as voltas passando a corda entre as varas e rematar com um nó de porco numa delas (d).',
};

export default {
  ...nos,
  sections: nos.sections.flatMap(section =>
    section.id === 'botao-em-esquadria' ? [botaoEmCruz, section] : [section]
  ),
};
