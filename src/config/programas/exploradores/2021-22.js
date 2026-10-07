// Expedição 17 — Programa 2021/22.
// Fonte:
//   T1: Programa.xlsx (folha 1 Trimestre)
//   T2: Programa.xlsx (folha 2 Trimestre: planos das quatro patrulhas)
//   T3: Programa.xlsx (folha 3 Trimestre)
export default {
  year: '2021/22',
  trimesters: [
    {
      id: '1',
      trimester: '1.º Trimestre - Novembro a Dezembro 2021',
      year: 2021,
      months: [
        {
          name: 'Novembro',
          month: 11,
          weeks: [
            [{ day: 13, weekday: 'Sáb', events: ['Conselho de Guias', 'Progresso', 'Limpeza da Sede'] }],
            [{ day: 20, weekday: 'Sáb', events: ['Investidura de Guias', 'Missa de Agrupamento'] }],
            { merged: true, dayStart: 27, dayEnd: 28, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Banco Alimentar', 'Entrada no Advento'], highlight: true },
          ],
        },
        {
          name: 'Dezembro',
          month: 12,
          weeks: [
            [{ day: 4, weekday: 'Sáb', events: ['Dia com o Padre Miguel / Sr. Prior'] }],
            { merged: true, dayStart: 11, dayEnd: 12, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['Advento', 'Vigília de Oração e Promessas'], highlight: true },
            [
              { day: 14, weekday: 'Ter', events: ['Luz da Paz de Belém'] },
              { day: 18, weekday: 'Sáb', events: ['Possível Acampamento'], highlight: true },
            ],
          ],
        },
      ],
    },
    {
      id: '2',
      trimester: '2.º Trimestre - Janeiro a Abril 2022',
      year: 2022,
      months: [
        {
          name: 'Janeiro',
          month: 1,
          weeks: [
            [{ day: 22, weekday: 'Sáb', events: ['Patrulha Leão - Provas, progresso, Conselho de Guias, Criar um Herói', 'Patrulha Castor - Escola da Cartuxa', 'Patrulha Raposa - Escola da Cartuxa, progresso, jogos, vólei de pano, angariação de fundos', 'Patrulha Gorila - Raid fotográfico'] }],
            [{ day: 29, weekday: 'Sáb', events: ['Patrulha Leão - MasterScout', 'Patrulha Castor - Venda de Calendários', 'Patrulha Raposa - Cinema - Homem-Aranha', 'Patrulha Gorila - Arborismo'] }],
          ],
        },
        {
          name: 'Fevereiro',
          month: 2,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Patrulha Leão - Provas e progresso', 'Patrulha Castor - Raid de orientação em Monsanto', 'Patrulha Raposa - Aula de artes marciais nos Moinhos', 'Patrulha Gorila - Dia de desportos'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Patrulha Leão - Pavilhão do Conhecimento', 'Patrulha Castor - Escola da Cartuxa', 'Patrulha Raposa - Exposição e Oceanário', 'Patrulha Gorila - Escape Room'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Patrulha Leão - Banco Alimentar', 'Patrulha Castor - MasterScout', 'Patrulha Raposa - Raid interpretativo', 'Patrulha Gorila - Super-heróis das Provas'] }],
            [{ day: 26, weekday: 'Sáb', events: ['ACAGRUP'] }],
          ],
        },
        {
          name: 'Março',
          month: 3,
          weeks: [
            [{ day: 5, weekday: 'Sáb', events: ['Patrulha Leão - Filme "Captain America: The First Avenger" e perguntas', 'Patrulha Castor - Filme "The Avengers"', 'Patrulha Raposa - Concurso de culinária, progresso, provas', 'Patrulha Gorila - MasterScout'] }],
            [{ day: 12, weekday: 'Sáb', events: ['Patrulha Leão - Atelier de orientação', 'Patrulha Leão - Progresso', 'Patrulha Castor - Perguntas', 'Patrulha Raposa - Escalada em Monsanto e no Jamor, barra ao lenço, atletismo', 'Patrulha Gorila - Jogos temáticos'] }],
            [{ day: 19, weekday: 'Sáb', events: ['Patrulha Leão - Raid de orientação em Monsanto', 'Patrulha Castor - Escola da Cartuxa'] }],
            [{ day: 26, weekday: 'Sáb', events: ['Patrulha Leão - Raid fotográfico em Belém, reconhecimento do terreno', 'Patrulha Castor - Tiro ao arco', 'Patrulha Raposa - Frisbee, futebol humano, Cluedo', 'Patrulha Gorila - Filme "Spider-Man: No Way Home"'] }],
          ],
        },
        {
          name: 'Abril',
          month: 4,
          weeks: [
            [{ day: 2, weekday: 'Sáb', events: ['Patrulha Leão - Ida de bicicleta até à Margem Sul', 'Patrulha Leão - Arborismo', 'Patrulha Castor - Preparação do acampamento', 'Patrulha Raposa - Raid fotográfico, luta de balões de água', 'Patrulha Gorila - Atelier de carpintaria'] }],
            [{ day: 9, weekday: 'Sáb', events: ['Patrulha Leão - Acampamento', 'Patrulha Castor - Acampamento', 'Patrulha Gorila - Jogos de água'] }],
          ],
        },
      ],
    },
    {
      id: '3',
      trimester: '3.º Trimestre - Abril a Maio 2022',
      year: 2022,
      months: [
        {
          name: 'Abril',
          month: 4,
          weeks: [
            { merged: true, dayStart: 29, dayEnd: 1, monthEnd: 5, weekdayStart: 'Sex', weekdayEnd: 'Dom', events: ['Acampamento'], highlight: true },
          ],
        },
        {
          name: 'Maio',
          month: 5,
          weeks: [
            [{ day: 7, weekday: 'Sáb', events: ['Dia de Núcleo', 'Lx Aventura - Benfica'] }],
            [{ day: 14, weekday: 'Sáb', events: ['Procissão', 'Preparação do ACAGRUP', 'Progresso', 'Conselho de Guias', 'Reunião de Pais'] }],
            { merged: true, dayStart: 21, dayEnd: 22, weekdayStart: 'Sáb', weekdayEnd: 'Dom', events: ['ACAGRUP - Campo de Férias da Paróquia da Ajuda'], highlight: true },
            [{ day: 28, weekday: 'Sáb', events: ['Continente Bom Dia Restelo - Banco Alimentar', 'Caça ao Tesouro'] }],
          ],
        },
      ],
    },
  ],
};
