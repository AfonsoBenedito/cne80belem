export const tagCategories = [
  {
    key: 'tema',
    label: 'Tema',
    tags: [
      { value: 'oração', label: 'Oração' },
      { value: 'animação', label: 'Animação' },
      { value: 'louvor', label: 'Louvor' },
    ],
  },
  {
    key: 'ocasião',
    label: 'Ocasião',
    tags: [
      { value: 'missa', label: 'Missa' },
      { value: 'acampamento', label: 'Acampamento' },
      { value: 'encontro', label: 'Encontro' },
      { value: 'promessa', label: 'Promessa' },
    ],
  },
  {
    key: 'momento-missa',
    label: 'Momento da Missa',
    tags: [
      { value: 'entrada', label: 'Entrada' },
      { value: 'perdão', label: 'Perdão' },
      { value: 'ofertório', label: 'Ofertório' },
      { value: 'santo', label: 'Santo' },
      { value: 'comunhão', label: 'Comunhão' },
      { value: 'cordeiro', label: 'Cordeiro' },
      { value: 'final', label: 'Final' },
    ],
  },
];

export const allTags = tagCategories.flatMap((c) => c.tags);
