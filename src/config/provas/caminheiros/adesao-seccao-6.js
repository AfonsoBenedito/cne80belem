import { areas } from '../../provasShared';

// Each área's objetivos educativos finais, in the Caderno de Pista IV's order (its page 11: F1 to
// F6, A1 to A6, C1 to C8, E1 to E8, I1 to I7, S1 to S7), each by its code and name, as the wheel
// numbers them
const objetivos = [
  ['Exercício', 'Relação com o corpo', 'Diferenças fisiológicas', 'Equilíbrio', 'Higiene', 'Comportamentos de risco'],
  ['Afetos', 'Respeito', 'Sexualidade e relação amorosa', 'Emoções', 'Personalidade', 'Confiança'],
  ['Valores', 'Decisão', 'Aperfeiçoamento', 'Compromisso', 'Perseverança', 'Responsabilidade', 'Consistência', 'Coerência'],
  ['Pai/Felicidade', 'Filho/Amor', 'Espírito Santo/Igreja', 'Oração', 'Compromisso', 'Identidade', 'Unidade', 'Missão'],
  ['Aprendizagem', 'Filtrar', 'Rumo', 'Adaptação', 'Estratégia', 'Criatividade', 'Expressividade'],
  ['Cidadania', 'Participação', 'Democracia', 'Serviço', 'Tolerância', 'Equipa', 'Liderança'],
];

export default {
  title: 'Objetivos educativos da IVª Secção',
  // The Caderno de Pista IV asks "Já conheces os objetivos educativos que te são propostos?". As
  // the Exploradores' and Pioneiros' Áreas e Trilhos, told for the Clã: from the Caderno de
  // Pista IV (the forty-two objectives, by área; the Caminho, before the Promessa; the objectives validated in reunião de Tribo, the etapa in Conselho de Guias; the
  // anilha) and the Manual do Dirigente (the etapas Comunidade, Serviço and Partida; two to three
  // objectives of each área an etapa, at least two of each to complete it; the insígnia at the
  // start of each etapa; the Chefe de Clã and the Guia helping to choose; the PPV's open part; an
  // objective met only when it shows constantly; all forty-two by the end). The objectives by code
  // and name only: the Caderno's own statements are misplaced for I5 to I7 (I5 carries
  // Criatividade's, I6 and I7 the same one); its codes are right
  sections: [
    {
      heading: 'Seis áreas, quarenta e dois objetivos',
      // The Caderno's own wheel of the objectives, under the text that introduces them, at a
      // size its codes can be read (beside the text it was 176px)
      media: 'rodaProgresso',
      mediaAfter: true,
      text: 'O Escutismo quer que cada um cresça em todos os aspetos da sua pessoa. Por isso, o progresso organiza‑se em seis **áreas de desenvolvimento**, as FACEIS (Físico, Afetivo, Carácter, Espiritual, Intelectual e Social).\n\nNos Caminheiros, cada área tem os seus **objetivos educativos finais**, quarenta e dois ao todo.',
    },
    {
      castSide: areas.castSide,
      castColumn: areas.castColumn,
      // Each área's objetivos as a list of their own (`objectives`), instead of its trilhos' line,
      // and their codes' range under its icon (`range`, "F1–F6"): the wheel's slices carry the
      // same icons
      cast: areas.cast.map(({ line: _trilhos, ...a }, i) => ({
        ...a,
        range: `${'FACEIS'[i]}1–${'FACEIS'[i]}${objetivos[i].length}`,
        objectives: objetivos[i].map((name, k) => ({ code: `${'FACEIS'[i]}${k + 1}`, name })),
      })),
    },
    {
      heading: 'As etapas',
      text: 'O progresso do caminheiro começa no **Caminho**, a etapa de quem chega, como Aspirante ou Noviço. Depois da Promessa vêm três etapas: a **Comunidade**, o **Serviço** e a **Partida**.\n\nEm cada uma, o caminheiro escolhe dois a três objetivos de cada área, e a etapa só fica completa quando atinge pelo menos dois de cada uma. No fim das três etapas, terá atingido os quarenta e dois: recebe a anilha de mérito, que pode usar até à cerimónia da Partida.\n\nNo início de cada uma das quatro etapas, a insígnia de progresso ganha uma peça.',
    },
    { media: 'progresso' },
    {
      heading: 'Escolher e validar os objetivos',
      numbered: true,
      steps: [
        { title: 'Escolher', text: 'Em cada etapa, o caminheiro escolhe os seus objetivos, com o apoio do Chefe de Clã e do Guia de Tribo, e escreve‑os na parte aberta do seu Projeto Pessoal de Vida, que partilha com a Tribo.' },
        { title: 'Viver', text: 'Para cada objetivo, procura oportunidades educativas, dentro e fora do Clã: na escola, no trabalho, na família e na comunidade. Uma especialidade também pode ser uma oportunidade para progredir.' },
        { title: 'Validar o objetivo', text: 'Um objetivo só está atingido quando o caminheiro mostra, de forma constante, que cresceu nele. A validação faz‑se de forma contínua, em reunião de Tribo.' },
        { title: 'Validar a etapa', text: 'Atingidos os objetivos da etapa, o Conselho de Guias valida‑a.' },
      ],
      more: 'Projeto Pessoal de Vida (PPV)',
    },
  ],
};
