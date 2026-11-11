export default {
  title: 'Personagens do "Livro da Selva"',
  // From the Alcateia 16's Manual de Adesão (2021-2022), "Prova 1 – O Livro da Selva", word for
  // word and in its paragraphs: the book, then its people, each character beside the manual's
  // drawing of them
  sections: [
    // The manual's question under its title, the prova's one line to the Lobito
    { lead: 'Conheces as Personagens mais importantes do “Livro da Selva”' },
    {
      heading: 'O Livro da Selva',
      text: 'O “Livro da Selva” foi escrito em finais do século XIX, por um escritor inglês chamado Rudyard Kipling, e conta a história de um bébé que se perde dos pais durante um ataque de um Tigre, e que é adotado por uma Alcateia de Lobos, na Selva indiana de Seiouni.\n\nCom a ajuda de outros animais da Selva – entre os quais um Urso, uma Pantera e uma Cobra – esse menino vai sobrevivendo aos diversos perigos, enquanto cresce e aprende a Lei da Selva, acabando por superar todos os obstáculos, e por voltar à Aldeia dos Homens.',
    },
    {
      heading: 'O Povo da Selva',
      text: 'O Povo da Selva é constituído por animais que falam, pensam, experimentam, vivem em sociedade, submetidos à Lei da Selva. Cada animal representa uma qualidade, um aspeto, uma tendência, uma disposição de espírito humano. Mas mais ainda encontramos na Selva de Seiouni, uma sociedade organizada, com as suas leis, a que todos estão submetidos. Assim vamos conhecer de uma forma breve as personagens da Selva e as características que representam.',
      // Each character as the manual sets them: the name in bold opening its text (`text` runs on
      // from it), the manual's drawing of them beside
      cast: [
        { name: 'Maugli', media: 'selvaMaugli', text: ' é o menino criado pelos lobos, a quem foram ensinados todos os segredos da selva, tornando-se forte e destemido.' },
        { name: 'Áquelá', media: 'selvaAquela', text: ' é o Chefe da Alcateia, o responsável por liderá-la nas caçadas e por garantir que todos cumprem a Lei da Selva.' },
        { name: 'Pai Lobo', media: 'selvaPaiLobo', text: ' foi o lobo que encontrou Maugli quando este se tinha perdido dos pais e o levou para o meio da sua Alcateia.' },
        { name: 'Racxa', media: 'selvaRacxa', text: ', a Mãe Loba, é primeira a acolher Maugli, defendendo-o do Tigre, e adotando-o (com o Pai Lobo). É também ela a primeira a defender Maugli perante a Alcateia, na Rocha do Conselho.' },
        { name: 'Balú', media: 'selvaBalu', text: ' é o urso bom e sábio. Embora muito brincalhão e dorminhoco, é ele o grande Mestre da Lei da Selva, e quem a ensina a Maugli e a outras crias.' },
        { name: 'Baguera', media: 'selvaBaguera', text: ', a pantera negra, é uma caçadora astuta, valente e forte. É quem ensina Maugli a caçar e a viver na selva.' },
        { name: 'Haiti', media: 'selvaHaiti', text: ', um elefante grande e selvagem que deixa um grande rasto por onde quer que passa. Com a sua tromba anuncia os acontecimentos mais importantes da selva.' },
        { name: 'Cá', media: 'selvaCa', text: ', a serpente já velhota e simples, é um pouco lenta, mas muito voraz, e a principal inimiga dos macacos da Selva, ajudando Maugli a livrar-se deles.' },
        { name: 'Banderlogues', media: 'selvaBanderlogues', text: ' são os macacos da selva, um povo desorganizado, sem disciplina, nem Lei. São pouco asseados, muito barulhentos, indisciplinados e descuidados com as crias.' },
        { name: 'XerCane', media: 'selvaXerCane', text: ' o tigre velho, cruel e cobarde. É ele o principal inimigo de Maugli, sempre a tentar retirá-lo da proteção da Alcateia.' },
      ],
    },
  ],
};
