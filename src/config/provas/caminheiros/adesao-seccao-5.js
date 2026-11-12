export default {
  title: 'Livro "A Caminho do Triunfo"',
  // What the book is, why it was written, how it's organised and what it teaches, as the
  // Escutismo para Rapazes prova does, for the Caminheiros: ours, from the book itself (Rovering
  // to Success, 1922; the 1930 revised edition's scan: its preface, the five rocks with their
  // dark and bright sides, the summary's antidotes, the Rovering part), its chapter names in
  // English beside ours (the CNE edition's own weren't to be found); B.-P.'s words in Portuguese
  // only as the Manual do Dirigente and the Caderno de Pista IV quote them, word for word in
  // today's spelling; the reading and the debate before the Promessa, the Manual's (C.2.5)
  sections: [
    {
      heading: 'Um livro para caminheiros',
      // B.-P.'s portage beside it: each his own pack and canoe
      media: 'ctPortagem',
      text: '*A Caminho do Triunfo* (em inglês, *{en}Rovering to Success*) é o livro que Baden‑Powell escreveu, em 1922, para os rapazes mais velhos, os caminheiros, no tempo em que passam da juventude à vida adulta. Chamou‑lhe um livro de «desporto da vida»: conselhos de quem já fez a viagem para quem a começa, sobre como ser feliz.\n\nFoi escrito para os rapazes do seu tempo; hoje, o Caminheirismo é de rapazes e raparigas.\n\nAntes da Promessa, o caminheiro lê o livro, publicado pelas Edições CNE, e promove um debate sobre ele com a Tribo ou o Clã, para tirar dúvidas e partilhar a sua leitura.',
    },
    {
      heading: 'A canoa e os escolhos',
      // "Paddle your own canoe, looking ahead" beside the paragraphs that say it, as the portage
      // beside the book's (under them, it and the frontispiece came one after the other)
      media: 'ctRemar',
      text: 'Baden‑Powell compara a vida a uma viagem de canoa. Conta como, uma vez, atravessou um lago no Canadá, numa canoa de casca de bétula, e foi apanhado por um temporal: tudo dependia de como se manejava o remo.\n\nPara ele, o verdadeiro triunfo não é o dinheiro nem o poder, é a **felicidade**. Para lá chegar, cada um tem de remar a sua própria canoa (em inglês, *{en}paddle your own canoe*), em vez de se deixar levar pela multidão, e evitar os escolhos que vai encontrar pelo caminho.',
    },
    {
      // The frontispiece under the line that tells it; no heading of its own, so it carries on
      // the canoe's
      media: 'canoa',
      mediaAfter: true,
      text: 'O desenho que abre o livro, feito por ele, é, nas suas palavras, «o índice do livro»: a canoa a caminho da Felicidade, entre cinco rochedos.',
    },
    {
      heading: 'Como está organizado',
      // The book's contents page (the preface, the five rocks, the summary, Rovering) and its
      // title page's "with 60 illustrations by the author"
      text: 'O livro abre com um prefácio sobre a viagem da vida e sobre como ser feliz, rico ou pobre. Segue‑se um capítulo para cada um dos cinco escolhos, um resumo que os junta, e, por fim, o Caminheirismo, a parte que põe tudo em prática. Tem sessenta desenhos do autor.',
    },
    {
      heading: 'Os cinco escolhos',
      // Each rock's two sides as its chapter opens with them ("The dark side of this Rock is…
      // The bright side…"): the bright side the good that comes of it, not a thing instead of it
      // ("there are good as well as dangerous points about these rocks", p. 14)
      text: 'Cada escolho tem um lado escuro, o perigo, e um lado luminoso, o bem que dele se pode tirar:',
      // Each beside B.-P.'s drawing from its chapter, as the Livro da Selva's characters, at their
      // size (the areas' icon column made them 4rem: the figures didn't read); the Women's has none
      // of them here, its text the row's
      cast: [
        { name: 'Cavalos', media: 'ctDick', zoom: true, kind: 'Desenho', caption: 'Dick, o cavalo de B.‑P.', text: ' (*{en}Horses*): perder o tempo a ver e a apostar. O lado luminoso: praticar desporto a sério, ter passatempos e ganhar a vida pelo próprio esforço.' },
        { name: 'Vinho', media: 'ctVinho', zoom: true, kind: 'Desenho', caption: 'Gordo de mais para montar a cavalo', text: ' (*{en}Wine*): a bebida e os outros excessos, que estragam a verdadeira felicidade. O lado luminoso: quem vence a tentação ganha força de carácter e um gosto maior pela vida.' },
        { name: 'Mulheres', text: ' (*{en}Women*): esquecer o respeito que lhes é devido. O lado luminoso: o cavalheirismo e a saúde do corpo e da mente.' },
        { name: 'Cucos e charlatães', media: 'ctCuco', zoom: true, kind: 'Desenho', caption: 'Abaixo tudo, e viva eu!', text: ' (*{en}Cuckoos and Humbugs*): deixar‑se levar por extremistas e por quem engana. O lado luminoso: educar‑se a si próprio e servir a comunidade.' },
        { name: 'Irreligião', media: 'ctAndes', zoom: true, kind: 'Desenho', caption: 'O Cristo dos Andes', text: ' (*{en}Irreligion*): perder a fé. O lado luminoso: descobrir Deus, com a ajuda da natureza, e servir os outros.' },
      ],
    },
    {
      heading: 'O Caminheirismo',
      media: 'ctCaminheiro',
      text: 'A última parte do livro (*{en}Rovering*) mostra como pôr tudo isto em prática: o Caminheirismo, uma fraternidade de jovens ao serviço dos outros, que tem nas caminhadas e na vida ao ar livre a sua escola. É também nela que Baden‑Powell explica como se organizam os caminheiros, a sua Lei e a sua Investidura.',
    },
    {
      heading: 'Nas palavras de B.‑P.',
      // The book's own words in Portuguese, as the Manual do Dirigente (A acção pedagógica: p. 52,
      // the Lei; C.4.4) and the Caderno de Pista IV (Carácter) quote them
      intro: 'Algumas passagens do livro, como o Manual do Dirigente e o Caderno de Pista do CNE as citam:',
      source: 'Baden‑Powell, A Caminho do Triunfo',
      quote: '«O fim da educação Caminheira é auxiliar os jovens a tornarem‑se cidadãos felizes, saudáveis e úteis e dar a cada um a possibilidade de se preparar para uma carreira que lhe seja útil.»\n\n«Como Caminheiro, o teu objetivo supremo é SERVIR. Sempre se pode confiar em que estarás pronto a sacrificar tempo, comodidades ou, sendo preciso, a própria vida, pelos outros.»\n\n«O caráter tem mais valor do que qualquer atributo na vida.»',
    },
  ],
};
