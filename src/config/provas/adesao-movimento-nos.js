// The knots, the same in every secção (the Lobitos' open with a line of their own:
// lobitos/adesao-movimento-nos.js)
export default {
  title: 'Nó Direito e Nó de Correr',
  // The same in every secção. From the Alcateia 16's Manual de Adesão (2021-2022), "Prova 4 –
  // Os nós", word for word (its opening line, about the Lobitos, only on theirs, below),
  // each knot's steps drawn under its text (`mediaAfter`: the diagrams are wide); the last
  // section, the knot words, is ours
  sections: [
    {
      heading: 'Nó Direito',
      media: 'noDireito',
      mediaAfter: true,
      text: 'O nó direito é utilizado para unir duas espias do mesmo tamanho.\n\nCruzar a ponta esquerda sobre a direita e laçar; cruzar de novo a ponta direita sobre a ponta esquerda e laçar.\n\nDe cada lado os chicotes ficam lado a lado.',
    },
    {
      heading: 'Nó de Correr',
      media: 'noDeCorrer',
      mediaAfter: true,
      text: 'O nó de correr serve para fixar rapidamente uma corda a um tronco, por exemplo. Com o nó de correr, quanto mais puxarmos, mais apertado fica o laço em torno do objeto.\n\nFazer um cote direto (1), e passar o chicote livre (2) por dentro da argola, dobrado, formando um seio.',
    },
    {
      // Ours, not the manual's: the knot words its text uses, for a Lobito meeting them first
      heading: 'Palavras dos nós',
      text: 'Para te ajudar a ler as explicações acima:',
      terms: [
        { term: 'Espia', text: '- uma corda.' },
        { term: 'Ponta ou chicote', text: '- a extremidade da corda, a parte que se mexe para fazer o nó.' },
        { term: 'Laçar', text: '- passar uma ponta à volta da outra, prendendo-as.' },
        { term: 'Argola', text: '- a volta fechada que a corda faz sobre si própria.' },
        { term: 'Cote', text: '- uma volta simples: a ponta passa por dentro de uma argola feita com a própria corda.' },
        { term: 'Seio', text: '- uma parte da corda dobrada ao meio, em forma de U, sem as pontas.' },
      ],
    },
  ],
};
