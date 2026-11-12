export default {
  title: 'Organização da IVª Secção',
  // As the Organização dos Exploradores and dos Pioneiros, told for the Clã, and general: any
  // Clã's caminheiros can study it. From the Regulamento Geral (2023, retificado a 01-10-2025:
  // art. 67.º, the Clã, the Tribo, its Patrono, the Guias, the three councils, the Projeto de
  // Desafio and the Partida; art. 26.º, the ages; arts. 57.º and 58.º, the Marítimos' and the
  // Escuteiros do Ar's names), the Regulamento dos Uniformes, Distintivos e Bandeiras (the red
  // fitas) and the Manual do Dirigente (what Clã and Guia mean; the Albergue; the Caminhada;
  // the Carta de Clã, from the PPV's open part; the Reunião de Tribo: the PPV's open part shared
  // with the Tribo, the Tribo idealizing the Caminhada). The cargos have their own prova
  sections: [
    {
      heading: 'O Clã',
      text: 'A unidade dos Caminheiros chama‑se Clã. Tem de **duas** a **cinco** Tribos, podendo funcionar só com uma, e é animada pela Equipa de Animação: o Chefe de Clã e o seu Adjunto, o Assistente de Agrupamento e os instrutores.\n\nClã foi o nome que Baden‑Powell deu aos caminheiros, por querer que tivessem entre si laços fortes como os das famílias dos clãs escoceses. Por isso o Caminheirismo é uma **Fraternidade**.\n\nO Clã reúne‑se no **Albergue**, a sua sede.\n\nCada Clã escreve a sua **Carta de Clã**, a partir do que cada caminheiro partilha do seu Projeto Pessoal de Vida e tendo presente a Lei do Escuta.',
    },
    {
      heading: 'A Tribo',
      text: 'No Clã, cada caminheiro faz parte de uma Tribo: um pequeno grupo de **4** a **8** elementos.\n\nCada Tribo tem:',
      terms: [
        { term: 'Patrono', text: 'um Santo da Igreja, Benemérito da Humanidade, Herói Nacional ou personalidade, cuja vida os caminheiros conhecem e tomam como modelo.' },
        { term: 'Grito e divisa', text: 'que a Tribo pode adotar, de acordo com o seu Patrono.' },
      ],
    },
    {
      heading: 'Guia, Sub-Guia e cargos',
      text: 'Cada Tribo é dirigida por um Guia, escolhido pelos seus membros, que preside à Tribo reunida, a anima e ajuda a progredir, e a representa no Conselho de Guias. Pede‑se‑lhe que seja guia para os outros, não um chefe autoritário. Para o ajudar, e substituir quando falta, o Guia escolhe um Sub‑Guia. Os outros elementos têm um cargo na Tribo.\n\nDe entre os Guias, o Clã elege, por voto secreto, o Guia de Clã.\n\nNo bolso esquerdo da camisa, o Guia de Tribo usa duas fitas vermelhas e o Sub‑Guia uma; o Guia de Clã usa três.',
      // The Guia's two red fitas and the Sub-Guia's one, under the sentence that says so, at the
      // larger tile size so the fitas can be counted (not zoomable: the scans are 116px); the
      // pointer to the Cargos prova after them, so it still ends the section
      media: 'guiasUnidade',
      mediaAfter: true,
      more: 'Cargos da Tribo',
      moreAfterMedia: true,
    },
    {
      heading: 'As reuniões e os conselhos',
      text: 'As decisões da Tribo e do Clã tomam‑se em Reunião de Tribo e nos conselhos que todas as unidades têm, aqui como o Clã os vive:',
      terms: [
        { term: 'Reunião de Tribo', text: 'só os elementos da Tribo, com o Guia a presidir. Nela cada um partilha a parte aberta do seu Projeto Pessoal de Vida, e a Tribo prepara as suas ideias para a Caminhada. O Guia leva as ideias da Tribo ao Conselho de Guias.' },
        { term: 'Conselho de Guias', text: 'os Guias e os Sub‑Guias de Tribo, com o Chefe de Clã, o seu Adjunto e o Assistente de Agrupamento. Decide a vida do dia a dia do Clã, a execução do plano e orçamento e o progresso das Tribos, e regista as suas decisões num livro próprio.' },
        { term: 'Conselho de Clã', text: 'todos os caminheiros, com a Equipa de Animação. Toma as grandes decisões do Clã, como escolher a Caminhada, aprovar a proposta do plano de atividades e aprovar a Partida de cada caminheiro.' },
        { term: 'Conselho da Lei', text: 'o Chefe de Clã, o Assistente de Agrupamento e os Guias de Tribo, que resolvem os casos de disciplina.' },
      ],
      // The councils are every unit's (prova 2 tells them for the whole Agrupamento): where to
      // read them so
      more: 'Organização do Agrupamento e do CNE',
    },
    {
      heading: 'A Caminhada',
      text: 'O projeto do Clã chama‑se Caminhada: ousada mas realista. As Tribos idealizam as propostas e o Conselho de Clã escolhe uma. Em conjunto escolhem as suas tarefas, e no fim avaliam‑na em Tribo e em Clã. A Equipa de Animação acompanha todas as fases.',
    },
    {
      heading: 'A Partida',
      text: 'No último ano no Clã, cada caminheiro prepara o seu **Projeto de Desafio**: um compromisso com uma causa, de preferência ao serviço da comunidade fora do Agrupamento, que idealiza, prepara, apresenta e partilha no Clã. Pode realizá‑lo ainda no Clã ou depois de sair.\n\nA **Partida** é o ato solene pelo qual o Clã declara o caminheiro iniciado na plena vida de Homem, como cristão e cidadão. É o próprio caminheiro que a propõe ao Conselho de Clã, que a aprova por dois terços, com o parecer favorável do Assistente de Agrupamento. Depois da Partida, o caminheiro deixa o Clã.',
      // The other branches' names, once, closing the page quietly: the Partida keeps the last word
      endNote: 'Nos Escuteiros Marítimos, os Caminheiros chamam‑se Companheiros, o Clã Comunidade, a Tribo Companha, o Guia Arrais e a Partida Largada; nos Escuteiros do Ar, chamam‑se Aeronautas, o Clã Esquadrão, a Tribo Formação, o Guia Asa e a Partida Salto.',
    },
  ],
};
