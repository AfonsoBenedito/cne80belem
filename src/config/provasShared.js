// Parts several prova texts (config/provas/) share: the Cargos prova, written once for the four
// secções' units, and the Áreas e Trilhos of the Exploradores and the Pioneiros.

// The secção's Cargos prova (Bando, Patrulha, Equipa, Tribo): each cargo beside its badge, from
// the Lobitos' Manual de Adesão (Agr. 80, 2021-2022), its "bando" made the secção's own unit, so
// one text serves the four. The Guia de Alcateia (Lobitos only, no badge) is left out; its
// Intendente is the Cozinheiro. The manual has no Relações Públicas: that one is from the
// Exploradores' ("Patrulha")
const units = {
  lobitos: { unit: 'Bando', o: 'o bando', do: 'do bando', ao: 'ao bando', others: 'outros bandos', group: 'a Alcateia', who: 'É o Lobito que' },
  exploradores: { unit: 'Patrulha', o: 'a patrulha', do: 'da patrulha', ao: 'à patrulha', others: 'outras patrulhas', group: 'a Expedição', who: 'É quem' },
  pioneiros: { unit: 'Equipa', o: 'a equipa', do: 'da equipa', ao: 'à equipa', others: 'outras equipas', group: 'a Comunidade', who: 'É quem' },
  caminheiros: { unit: 'Tribo', o: 'a tribo', do: 'da tribo', ao: 'à tribo', others: 'outras tribos', group: 'o Clã', who: 'É quem' },
};

export const cargos = (seccao) => {
  const u = units[seccao];
  // Each cargo's badge beside its heading (`headingMedia`), the heading an anchor (`id`) for the
  // grid of all nine that opens the page
  const cargo = (heading, media, text) => ({ heading, media, headingMedia: true, id: media, text });
  return {
    sections: [
      { media: 'cargosIndex' },
      cargo(`Guia de ${u.unit}`, 'guia', `O cargo de Guia é muito importante, pela capacidade de liderança que implica. A Equipa de Animação tem no Guia o seu melhor aliado na condução ${u.do}: ele atua como intermediário entre a Equipa de Animação, o Conselho de Guias e os restantes elementos, competindo-lhe a liderança ${u.do}.\n\nAo Guia compete:\n\n• Dirigir e animar ${u.o};\n• Distribuir tarefas e cargos;\n• Transportar a bandeirola ${u.do};\n• Representar ${u.o} no Conselho de Guias.`),
      cargo(`Sub-Guia de ${u.unit}`, 'subguia', `O Guia é acompanhado, na sua função de liderança, pelo Sub-Guia, um elemento ${u.do} que o ajuda e também o substitui em caso de ausência. Esta função reveste-se, assim, de especial importância.\n\nAo Sub-Guia compete:\n\n• Auxiliar o Guia em todas as suas tarefas, acompanhando-o de forma próxima não apenas para o apoiar, mas também para ir desenvolvendo as suas capacidades de chefia.`),
      cargo('Secretário', 'cargo-secretario', `É o especialista ${u.do} na área da comunicação escrita, oral e audiovisual.\n\nAo Secretário compete:\n\n• Marcar as presenças ${u.do};\n• Arquivar os documentos ${u.do};\n• Escrever todos os resumos das atividades ${u.do}.`),
      cargo('Tesoureiro', 'cargo-tesoureiro', `É o especialista ${u.do} na área económica. Isto quer dizer que trata do dinheiro ${u.do}. Por isso deve ser organizado, atento, poupado e ainda gostar de contas e matemática.\n\nAo Tesoureiro compete:\n\n• Receber a quota ${u.do}, de cada elemento;\n• Ser responsável pela caixa do dinheiro ${u.do};\n• Conseguir prestar contas.`),
      cargo('Guarda-Material', 'cargo-guarda-material', `É o guardião dos materiais ${u.do}. É o perito ${u.do} na conservação do seu material e equipamento.\n\nAo Guarda-Material compete:\n\n• Saber qual é o equipamento e material ${u.do};\n• Cuidar do material ${u.do};\n• Controlar as saídas de material e em que estado estão.`),
      cargo('Cozinheiro', 'cargo-cozinheiro', `É o especialista ${u.do} na área alimentar: gosta de cozinhar e de gerir a cozinha durante as atividades.\n\nAo Cozinheiro compete:\n\n• Ouvir os outros elementos ${u.do} sobre os seus gostos;\n• Propor aos chefes uma ementa para as atividades;\n• Ajudar os chefes a elaborar a lista dos produtos alimentares.`),
      cargo('Socorrista', 'cargo-socorrista', `É o especialista e técnico de saúde ${u.do}, responsável pela mala de primeiros socorros.\n\nAo Socorrista compete:\n\n• Cuidar da mala de primeiros socorros;\n• Tratar pequenas feridas dos elementos ${u.do}, quando em atividade;\n• Zelar pela higiene e segurança física ${u.do} nas atividades.`),
      cargo('Animador', 'cargo-animador', `${u.who} se sente à vontade para animar ${u.o} ou ${u.group}, e memoriza facilmente músicas ou danças, assim como gritos de animação.\n\nAo Animador compete:\n\n• Saber danças e canções, ensinando-as ao resto ${u.do}.`),
      cargo('Relações Públicas', 'cargo-relacoes-publicas', `É o especialista ${u.do} nos contactos com o exterior: ${u.others}, secções, grupos, agrupamentos, entidades, etc.\n\nAo Relações Públicas compete:\n\n• Coordenar os contactos com o exterior ${u.do};\n• Entregar depois as informações ${u.ao} ou ao grupo.`),
    ],
  };
};

// Áreas e Trilhos (the Exploradores' and the Pioneiros' prova 15): the six areas as the Manual do
// Dirigente sums them (B.2) and their three trilhos, the same names in every secção; each beside
// its icon from the Cadernos de Pista; the three trilhos a line of their own (`line`), each "·"
// held to the name before it (a no-break space), so a line never starts on one
export const areas = {
  text: 'O Escutismo quer que cada um cresça em todos os aspetos da sua pessoa. Por isso, o progresso organiza‑se em seis **áreas de desenvolvimento**, as FACEIS (Físico, Afetivo, Carácter, Espiritual, Intelectual e Social), e cada área tem três **trilhos**:',
  castSide: 'left',
  // Each icon in a column of its own, the text never running on under it
  castColumn: true,
  cast: [
    { name: 'Desenvolvimento físico', media: 'areaFisico', text: ' incentiva o conhecimento e o desenvolvimento do corpo.', line: 'Desempenho · Autoconhecimento · Bem‑estar físico' },
    { name: 'Desenvolvimento afetivo', media: 'areaAfetivo', text: ' favorece o equilíbrio dos afetos e a valorização pessoal.', line: 'Relacionamento e sensibilidade · Equilíbrio emocional · Autoestima' },
    { name: 'Desenvolvimento do carácter', media: 'areaCaracter', text: ' promove o aperfeiçoamento dos valores e das atitudes, e o ser mais.', line: 'Autonomia · Responsabilidade · Coerência' },
    { name: 'Desenvolvimento espiritual', media: 'areaEspiritual', text: ' aprofunda o sentido de Deus.', line: 'Descoberta · Aprofundamento · Serviço' },
    { name: 'Desenvolvimento intelectual', media: 'areaIntelectual', text: ' fomenta a exploração e a criatividade.', line: 'Procura do conhecimento · Resolução de problemas · Criatividade e expressão' },
    { name: 'Desenvolvimento social', media: 'areaSocial', text: ' estimula o encontro, a partilha e o sentido do outro.', line: 'Exercer ativamente a cidadania · Solidariedade e tolerância · Interação e cooperação' },
  ],
};
