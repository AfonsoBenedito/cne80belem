export default {
  title: 'Projetos dos Pioneiros',
  // The Caderno de Pista III asks "Conheces os projetos existentes para os Pioneiros?": the
  // Empreendimento first, from the Manual do Dirigente ("A pedagogia do Projecto nos pioneiros:
  // o Empreendimento", C.4.3: what it is, who decides, its four phases, the comissões técnicas,
  // the funções and the Painel), its four phases as agrupamento 1351 names them; then the other
  // projects: the especialidades (Caderno de Pista III and the Manual), and World Scouting's
  // JOTA-JOTI and Jamboree, told without dates, each beside its logo (`cast`). From agrupamentos: 879 (serviço, aventura ou
  // cultura), 908's Auxiliar de Etapa Desprendimento (the função you ask for, the Plano de
  // Empreendimento) and the CNE's Diário de Vivências, as 65 and Viana do Castelo host it (the
  // Cruzeiro). The Manual's general "O método do Projecto" (III.3, every secção's) for what the
  // phases add: the Conselho de Guias' motivation first, its enrichment, and who evaluates and when
  sections: [
    {
      heading: 'O Empreendimento',
      text: 'O projeto dos Pioneiros chama‑se **Empreendimento**: um conjunto de atividades ligadas entre si, que os pioneiros escolhem, preparam, realizam e avaliam em Comunidade e com o apoio da Equipa de Animação.\n\nPode ser um projeto de serviço, de aventura ou de cultura, durar vários fins de semana e juntar reuniões, jogos, acampamentos, raides, ateliês, atividades com a comunidade paroquial ou viagens.\n\nAo longo do ano, a Comunidade pode viver vários Empreendimentos.\n\nNos Escuteiros Marítimos, o Empreendimento chama‑se Cruzeiro.',
    },
    {
      heading: 'As quatro fases',
      text: 'Cada Empreendimento passa por quatro fases:',
      numbered: true,
      steps: [
        { title: 'Idealização e Escolha', text: 'O Conselho de Guias motiva e orienta as Equipas. Depois, cada Equipa imagina uma proposta, com os objetivos, as atividades e o que é preciso para as fazer (custos, transporte, onde dormir), e apresenta‑a no Conselho de Empreendimento (o Conselho de Comunidade que o escolhe). Depois das perguntas, cada pioneiro vota, e a proposta mais votada passa a ser o Empreendimento da Comunidade.' },
        { title: 'Preparação', text: 'As Equipas e a Equipa de Animação sugerem melhorias à proposta escolhida, muitas vezes com ideias das outras, e o Conselho de Guias enriquece‑a e planeia os passos seguintes. O Plano de Empreendimento é apresentado a todos no Conselho de Comunidade, e as tarefas dividem‑se por todos: ninguém fica de fora.' },
        { title: 'Realização', text: 'É a altura de viver o que se preparou, no acampamento, no raide ou noutra atividade, o mais perto possível do que foi planeado.' },
        { title: 'Avaliação', text: 'Primeiro cada um, depois a Equipa, o Conselho de Guias e a Comunidade veem o que correu bem e o que correu mal, logo no fim e outra vez mais tarde. Registam o que avaliaram e o progresso de cada um. A Comunidade celebra o que fez, com uma festa, um jantar ou uma exposição de fotografias.' },
      ],
    },
    {
      heading: 'Comissões técnicas e funções',
      text: 'Para organizar o Empreendimento, o trabalho divide‑se em:',
      terms: [
        { term: 'Comissões técnicas', text: 'pequenos grupos de pioneiros de Equipas diferentes, criados pelo Conselho de Guias, cada um com uma missão: a animação, a logística, as finanças, a saúde e alimentação, e os contactos. Cada pioneiro está em apenas uma, e cada comissão tem um responsável.' },
        { term: 'Funções', text: 'responsabilidades temporárias que um pioneiro assume durante o Empreendimento, como cozinheiro, socorrista ou encarregado das compras. Ao contrário dos cargos da Equipa, acabam com o Empreendimento, e deixam‑no experimentar coisas novas.' },
      ],
    },
    {
      heading: 'O Painel do Empreendimento',
      text: 'No Abrigo, o **Painel do Empreendimento** mostra a toda a Comunidade o dia a dia do projeto: o nome, o lema e os objetivos, cada atividade com a data, o local e as fotografias, as comissões técnicas e as suas tarefas, e a lista do que falta fazer.',
    },
    {
      heading: 'O Empreendimento e o progresso pessoal',
      text: 'As atividades do Empreendimento são oportunidades para cada pioneiro progredir nos seus Trilhos. Quando a Equipa prepara a proposta, cada um pensa no que se comprometeu a fazer e inclui‑o nela.\n\nDepois da escolha, na Reunião de Equipa, cada pioneiro diz ao Guia que função gostava de assumir para cumprir o seu progresso, e o Guia leva esse pedido ao Conselho de Guias.',
      more: 'Áreas e Trilhos',
    },
    {
      heading: 'Outros projetos',
      text: 'Além do Empreendimento, os Pioneiros têm as **especialidades**: aptidões que um pioneiro desenvolve numa área e põe ao serviço da Equipa. Um pioneiro pode começar uma especialidade depois da Promessa, e ela pode servir para validar um Trilho.\n\nE podem viver dois grandes encontros do Escutismo mundial:',
      // Both logos on the left at the text's width (`castLarge`: at the characters' size)
      castSide: 'left',
      castLarge: true,
      cast: [
        { name: 'O JOTA‑JOTI', media: 'jotaJoti', text: ' é o Jamboree no Ar e na Internet: todos os anos, em outubro, escuteiros de todo o mundo falam entre si por rádio e pela Internet.' },
        { name: 'O Jamboree Mundial', media: 'jamboree2027', text: ' é o grande acampamento do Escutismo mundial, de quatro em quatro anos, para jovens dos 14 aos 17 anos, e por isso sobretudo para Pioneiros.' },
      ],
    },
  ],
};
