// Top level stays at four items. "Secções" opens one panel with a column per secção
// (`groups`); `key` links a group to its colour in seccoes.js.
export const navigation = [
  {
    label: 'Agrupamento',
    path: '/agrupamento',
    children: [
      { label: 'Banco de Fardas', path: '/agrupamento/banco-de-fardas' },
      { label: 'Direção', path: '/agrupamento/direcao' },
      { label: 'Dirigentes e Animadores', path: '/agrupamento/dirigentes-e-animadores' },
      { label: 'Documentos', path: '/agrupamento/documentos' },
      { label: 'Notícias', path: '/agrupamento/noticias' },
      { label: 'Reservar Alojamento', path: '/recursos/reservar-alojamento' },
    ],
  },
  {
    label: 'Secções',
    path: '/seccao',
    groups: [
      {
        key: 'lobitos',
        label: 'Lobitos',
        children: [
          { label: 'Secção', path: '/seccao/lobitos' },
          { label: 'Provas', path: '/seccao/lobitos/provas' },
          { label: 'Programa', path: '/seccao/lobitos/programa' },
          { label: 'Fotos', path: '/seccao/lobitos/fotos' },
          { label: 'Covil', path: '/seccao/lobitos/covil' },
        ],
      },
      {
        key: 'exploradores',
        label: 'Exploradores',
        children: [
          { label: 'Secção', path: '/seccao/exploradores' },
          { label: 'Provas', path: '/seccao/exploradores/provas' },
          { label: 'Programa', path: '/seccao/exploradores/programa' },
          { label: 'Fotos', path: '/seccao/exploradores/fotos' },
          { label: 'Cabana', path: '/seccao/exploradores/cabana' },
        ],
      },
      {
        key: 'pioneiros',
        label: 'Pioneiros',
        children: [
          { label: 'Secção', path: '/seccao/pioneiros' },
          { label: 'Provas', path: '/seccao/pioneiros/provas' },
          { label: 'Programa', path: '/seccao/pioneiros/programa' },
          { label: 'Fotos', path: '/seccao/pioneiros/fotos' },
          { label: 'Abrigo', path: '/seccao/pioneiros/abrigo' },
        ],
      },
      {
        key: 'caminheiros',
        label: 'Caminheiros',
        children: [
          { label: 'Secção', path: '/seccao/caminheiros' },
          { label: 'Provas', path: '/seccao/caminheiros/provas' },
          { label: 'Programa', path: '/seccao/caminheiros/programa' },
          { label: 'Fotos', path: '/seccao/caminheiros/fotos' },
          { label: 'Base', path: '/seccao/caminheiros/base' },
        ],
      },
    ],
  },
  {
    label: 'Cancioneiro',
    path: '/recursos/cancioneiro',
  },
  {
    label: 'Contactos',
    path: '/contactos',
  },
];
