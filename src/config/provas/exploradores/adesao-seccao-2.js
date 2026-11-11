export default {
  title: 'Organização dos Exploradores',
  // General, as the Organização do Agrupamento e do CNE: any Expedição's exploradores can study
  // it. From the Regulamento Geral (2023, retificado a 01-10-2025, art. 65.º: the Patrulha, the
  // Guias and the three councils), the CNE's Caderno de Descobertas (Secretaria Nacional
  // Pedagógica, 2010: the Patrulha's signs, the councils as an explorador meets them, the
  // Aventura), the Manual do Dirigente (the Base)
  // and new_info's "A tua Patrulha e o teu Agrupamento"; where they differ, the Regulamento
  // Geral. The cargos have their own prova (Cargos da Patrulha): here only that each has one. The
  // Reunião de Patrulha as agrupamentos 242 (Manual do Apelo) and 908 (Auxiliar de Etapa) give
  // it; who validates the Trilhos, the etapas and the Promessa as the
  // CNE's Caderno de Pista II (2019, src/assets/files) does; the Escuteiros do Ar's names as the
  // Regulamento Geral's art. 57.º
  // In the order an explorador meets them: the Expedição and the Patrulha, who leads, the
  // councils, then the Aventura they run
  sections: [
    {
      heading: 'A Expedição',
      text: 'A unidade dos Exploradores chama‑se Expedição. Tem de **duas** a **cinco** Patrulhas e é animada pela Equipa de Animação: o Chefe de Expedição e o seu Adjunto, o Assistente de Agrupamento e os instrutores.\n\nA Expedição reúne‑se na **Base**, o ponto de partida e de chegada das suas aventuras.',
    },
    {
      heading: 'A Patrulha',
      text: 'Na Expedição, cada explorador faz parte de uma Patrulha: um pequeno grupo de **4** a **8** rapazes e raparigas.\n\nCada Patrulha tem:',
      terms: [
        { term: 'Totem', text: 'o animal que lhe dá o nome, escolhido pelas suas características, com as quais todos se identificam.' },
        { term: 'Bandeirola', text: 'a bandeira da Patrulha, com a silhueta do seu totem.' },
        { term: 'Grito', text: 'o grito da Patrulha, usado nos jogos e reuniões.' },
        { term: 'Livro de Ouro', text: 'onde a Patrulha guarda a sua história ao longo dos anos.' },
        { term: 'Canto de Patrulha', text: 'o seu espaço na Base, decorado por todos, onde se reúne e guarda os seus materiais e troféus.' },
      ],
    },
    {
      heading: 'Guia, Sub-Guia e cargos',
      text: 'Cada Patrulha é dirigida por um Guia, escolhido pelos seus membros. Para o ajudar, e substituir quando falta, o Guia escolhe um Sub‑Guia.\n\nOs outros elementos têm um cargo na Patrulha.\n\nDe entre os Guias, a Expedição elege, por voto secreto, o Guia de Expedição.\n\nNos Escuteiros Marítimos, os Exploradores chamam‑se Moços, a Expedição Flotilha, a Patrulha Tripulação e o Guia Timoneiro; nos Escuteiros do Ar, chamam‑se Aventureiros, e o Guia chama‑se Asa.',
      more: 'Cargos da Patrulha',
    },
    {
      heading: 'As reuniões e os conselhos',
      text: 'As decisões da Patrulha e da Expedição tomam‑se em reunião e nos conselhos que todas as unidades têm, aqui como a Expedição os vive:',
      terms: [
        { term: 'Reunião de Patrulha', text: 'só os elementos da Patrulha, que nela marcam os seus objetivos e preparam as suas propostas e tarefas. Na Patrulha validam‑se também os Trilhos de cada um. O Guia leva depois as ideias da Patrulha ao Conselho de Guias.' },
        { term: 'Conselho de Guias', text: 'os Guias e os Sub‑Guias, com o Chefe de Expedição, o seu Adjunto e o Assistente de Agrupamento. Decide a vida do dia a dia da Expedição, o seu plano de atividades e o progresso das Patrulhas, e valida as etapas do progresso de cada um e a decisão de fazer a Promessa. Votam os Guias e os Sub‑Guias; o Chefe aconselha, e só pode vetar uma decisão por razões graves.' },
        { term: 'Conselho de Expedição', text: 'todos os exploradores, com a Equipa de Animação. Toma as grandes decisões da Expedição, como escolher a Aventura e aprovar o plano de atividades.' },
        { term: 'Conselho da Lei', text: 'o Chefe de Expedição, o Assistente de Agrupamento e os Guias, que resolvem os casos de disciplina.' },
      ],
      // The councils are every unit's (prova 2 tells them for the whole Agrupamento): where to
      // read them so
      more: 'Organização do Agrupamento e do CNE',
    },
    {
      heading: 'A Aventura',
      text: 'O projeto dos Exploradores chama‑se Aventura: um conjunto de atividades que a Expedição escolhe, prepara, vive e avalia.',
    },
  ],
};
