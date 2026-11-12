export default {
  title: 'Projeto Pessoal de Vida (PPV)',
  // The Caderno de Pista IV asks "Sabes o que é o PPV? Já fizeste o teu?". Ours, from the Manual do
  // Dirigente (C.4: the open part, with the objectives of the etapa, their actions and dates,
  // shared with the Tribo and the Chefe de Clã and shown in the Albergue; the closed part, shared
  // or not, best with someone older, the Chefe de Clã; the Carta de Clã from the open parts; the
  // Caminhada; its example of an open part, word for word in today's spelling) and the Caderno
  // (I3: objectives in the short or medium term and the means to reach them; made and reviewed
  // regularly; the relations, God and the Bem-Aventuranças in it)
  sections: [
    {
      heading: 'Um projeto para a vida',
      // B.-P.'s canoe beside it: each one steering his own
      media: 'ppvRemar',
      text: 'O Projeto Pessoal de Vida (PPV) é o plano em que cada caminheiro estabelece os seus objetivos, a curto ou médio prazo, e os meios para os atingir.\n\nO aspirante ou noviço faz o seu PPV ainda no Caminho, antes da Promessa. Depois, revê‑o com regularidade, à medida que atinge objetivos e escolhe outros.',
    },
    {
      heading: 'Duas partes',
      text: 'O PPV tem duas partes:',
      terms: [
        { term: 'Parte aberta', text: '- os objetivos educativos que o caminheiro escolheu para a etapa em que está, as ações concretas para os alcançar e as datas em que prevê atingi‑los. É partilhada com a Tribo e com o Chefe de Clã, e fica exposta no Albergue, para que todo o Clã o possa ajudar a progredir.' },
        { term: 'Parte fechada', text: '- os seus objetivos pessoais e íntimos, projetos e sonhos, os passos para os concretizar e as datas em que espera realizá‑los. Partilha‑a só se quiser, mas é aconselhável fazê‑lo com alguém mais velho e experiente que o possa orientar, de preferência o Chefe de Clã.' },
      ],
    },
    {
      heading: 'Um exemplo da parte aberta',
      // The Manual's own example (C.4.2, "Exemplo PPV Parte Aberta"), word for word in today's
      // spelling (its "– … –" as brackets: the site's text has no dashes), set as the sheet it
      // fills: the etapa and the date are fields the Manual names for the open part ("os
      // objectivos educativos … para atingir na etapa … e respectivas datas"), left blank, as it
      // gives none
      // No lead: the sheet's source line says whose example it is
      sheet: {
        label: 'Parte aberta',
        // What's the Manual's and what isn't: its example gives the objective and the actions;
        // the etapa and the date are the fields its description of the open part names
        source: 'Objetivo e ações: exemplo do Manual do Dirigente, CNE. Etapa e data: os campos que o Manual indica para a parte aberta.',
        fields: [
          { label: 'Etapa' },
          { label: 'Objetivo educativo final', text: 'Cultivar um estilo de vida saudável e equilibrado (alimentação, atividade física e repouso) adaptado a cada fase do seu desenvolvimento.' },
          { label: 'O que significa este objetivo para o jovem?' },
          { label: 'Ações concretas que ajudam a atingir o objetivo', list: ['Ir ao ginásio 1 vez por semana', 'Fazer 5 refeições por dia, variadas e nutritivas', 'Dormir, pelo menos, 7 horas diárias'] },
          { label: 'Data em que prevê atingi‑lo' },
        ],
      },
    },
    {
      heading: 'O PPV e o Clã',
      // B.-P.'s elephants beside it: the Clã helping each one carry his
      media: 'ppvElefantes',
      text: 'A partir do que cada caminheiro partilha da parte aberta, o Clã escreve a sua **Carta de Clã**. Os objetivos da parte aberta entram na **Caminhada**, e alguns da fechada podem entrar, para que cada um progrida também nela.\n\nO PPV abrange a pessoa toda: na sua elaboração, o caminheiro tem em conta as relações familiares e afetivas, a sua relação com Deus, vivida na oração, e a mensagem das Bem‑Aventuranças.',
      more: 'Objetivos educativos da IVª Secção',
    },
  ],
};
