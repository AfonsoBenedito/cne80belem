<p align="center">
  <img src="public/favicon.png" alt="Agrupamento 80 - Santa Maria de Belém" width="160" />
</p>

<h1 align="center">Agrupamento 80 — Santa Maria de Belém</h1>

<p align="center">
  <strong>Site oficial do Agrupamento 80 do Corpo Nacional de Escutas</strong>
</p>

<p align="center">
  <a href="https://github.com/AfonsoBenedito/cne80belem/actions/workflows/deploy.yml">
    <img src="https://github.com/AfonsoBenedito/cne80belem/actions/workflows/deploy.yml/badge.svg" alt="Deploy Status" />
  </a>
  <img src="https://img.shields.io/badge/react-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/vite-7-646CFF?logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

<p align="center">
  <a href="https://afonsobenedito.github.io/cne80belem/">Visitar o site</a> ·
  <a href="https://www.facebook.com/CNE80BELEM">Facebook</a> ·
  <a href="https://www.instagram.com/cne80belem/">Instagram</a>
</p>

---

## Sobre o Projeto

O **Agrupamento 80 — Santa Maria de Belém** é um grupo do [Corpo Nacional de Escutas (CNE)](https://escutismo.pt/) sediado na freguesia de Belém, Lisboa. Este site serve como ponto central de informação para escuteiros, dirigentes, pais e comunidade.

### Secções

| Secção | Nome | Faixa Etária | Cor |
|--------|------|-------------|-----|
| I Secção | Lobitos (Alcateia 16) | 6–10 anos | `#f6db7e` |
| II Secção | Exploradores (Grupo Explorador 17) | 10–14 anos | `#549b8b` |
| III Secção | Pioneiros (Grupo Pioneiro 9) | 14–18 anos | `#217a9a` |
| IV Secção | Caminheiros (Clã 72) | 18–22 anos | `#ec4c4b` |

### Contacto Geral

> **Morada:** Rua do Embaixador, Capela Nossa Senhora das Dores, 1300-216 Lisboa
>
> **Email:** geral@agr80.cne-escutismo.pt

---

## Funcionalidades

### Páginas

| Página | Descrição |
|--------|-----------|
| **Landing** | Carrossel de imagens com CTAs (Inscreve-te / Notícias) |
| **Direção** | Membros da direção e chefes de secção com fotografias |
| **Dirigentes e Animadores** | Equipa de cada secção organizada por colunas |
| **Banco de Fardas** | Inventário de uniformes e equipamento com estado de stock |
| **Documentos** | Lista de PDFs com visualizador integrado |
| **Notícias** | Listagem com filtros (secção, autor, período), vista grelha/lista |
| **Detalhe de Notícia** | Artigo completo com galeria de fotos e lightbox |
| **Secções (I–IV)** | Página de cada secção com descrição, foto e citação de B.P. |
| **Covil / Cabana / Abrigo / Base** | Notícias filtradas por secção |
| **Contactos** | Morada, email, telefone e botão de reserva de alojamento |
| **Reservar Alojamento** | Formulário de reserva com date/time pickers e envio por email |
| **Cancioneiro** | Lista pesquisável de canções com acordes |
| **Detalhe de Canção** | Letras com acordes interativos, transposição, toggle solfejo (C D E / Dó Ré Mi), diagramas de acordes com barra, exportação PDF e vídeo YouTube/SoundCloud |
| **Provas** | Requisitos das provas de classe e etapas de progressão |
| **Programa** | Calendário de atividades |

### Destaques

- **Config-driven** — toda a informação (membros, notícias, inventário, cancioneiro, navegação) vive em `src/config/`, fácil de atualizar sem tocar em componentes
- **Responsivo** — adaptado a desktop, tablet e mobile com hamburger menu
- **Filtros avançados** — notícias filtráveis por secção, autor e intervalo de datas com presets escutistas (trimestre, ano escutista Out–Set)
- **Pesquisa inteligente** — pesquisa sem acentos e espaços em canções e documentos (ex: "oracao" encontra "Oração")
- **Cancioneiro completo** — acordes inline com transposição, notação solfejo, diagramas de acordes com detecção de barras, e exportação PDF com Nunito font
- **Faz o teu Cancioneiro** — gerador de compilações PDF personalizadas com capa, ícone customizável e layouts vertical/horizontal
- **Galeria com lightbox** — navegação por setas e thumbnails
- **Toggle de vista** — alternância entre grelha e lista nas notícias
- **Botão flutuante** — email no topo, scroll-to-top ao descer
- **Scrollbars personalizadas** — estilo fino com cor do tema
- **Deploy automático** — GitHub Actions + GitHub Pages

---

## Tech Stack

| Tecnologia | Utilização |
|-----------|-----------|
| [React 19](https://react.dev/) | UI framework |
| [Vite 7](https://vite.dev/) | Build tool |
| [React Router 7](https://reactrouter.com/) | Routing |
| [React Icons](https://react-icons.github.io/react-icons/) | Iconografia |
| [React DatePicker](https://reactdatepicker.com/) | Seletor de datas |
| [date-fns](https://date-fns.org/) | Utilitários de datas (locale PT) |
| [jsPDF](https://github.com/parallax/jsPDF) | Geração de PDFs (canções e compilações) |
| [CSS Modules](https://github.com/css-modules/css-modules) | Estilos com scope |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |
| [GitHub Pages](https://pages.github.com/) | Hosting |

---

## Começar

```bash
# Clonar o repositório
git clone https://github.com/AfonsoBenedito/cne80belem.git
cd cne80belem

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Pré-visualizar o build
npm run preview
```

Ou com o Makefile:

```bash
make local-up      # npm install + npm run dev
make local-down    # Parar o servidor
make test-build    # Build de produção
```

---

## Estrutura do Projeto

```
src/
├── assets/
│   ├── files/                  # PDFs e documentos
│   ├── fonts/                  # Nunito Regular + ExtraBold (TTF)
│   └── images/
│       ├── carousel/           # Fotos do carrossel
│       ├── fardas/             # Fotos do banco de fardas
│       ├── logos/              # Logo do agrupamento
│       ├── members/            # Fotos dos membros
│       └── sections/           # Emblemas das secções
├── components/
│   ├── Carousel/               # Carrossel auto-rotativo com CTAs
│   ├── ChordDiagram/           # Diagrama SVG de acordes com detecção de barras
│   ├── FloatingBtn/            # Botão flutuante (email / scroll-to-top)
│   ├── Footer/                 # Footer com contactos, newsletter e redes sociais
│   ├── Header/                 # Navbar sticky com dropdowns e hamburger
│   ├── LyricsWithChords/       # Letras com acordes inline e transposição
│   ├── MemberCard/             # Card reutilizável para membros
│   ├── SongbookBuilder/        # Modal para criação de cancioneiros PDF personalizados
│   └── ui/                     # Componentes UI reutilizáveis
├── config/                     # Dados centralizados (editar aqui)
│   ├── bancoDeFardas.js        # Inventário do banco de fardas
│   ├── cancioneiro.js          # Canções com letras, acordes e metadados
│   ├── chords.js               # Base de dados de acordes e funções de transposição/solfejo
│   ├── contacts.js             # Morada e emails
│   ├── documentos.js           # Lista de documentos PDF
│   ├── members.js              # Direção, chefes de secção e dirigentes
│   ├── navigation.js           # Estrutura do menu
│   ├── noticias.js             # Artigos de notícias
│   ├── programa.js             # Calendário de atividades
│   ├── provas.js               # Provas de classe e etapas de progressão
│   ├── provasContent.js        # Conteúdo detalhado das provas
│   ├── seccoes.js              # Info das 4 secções (cores, descrições, citações)
│   └── socialLinks.js          # Links das redes sociais
├── pages/
│   ├── BancoDeFardas/          # Inventário com toggle entre categorias
│   ├── CancaoDetail/           # Canção individual com acordes, transposição e solfejo
│   ├── Cancioneiro/            # Lista pesquisável de canções
│   ├── Contactos/              # Contactos com morada, email e reserva de alojamento
│   ├── Direcao/                # Direção e chefes de secção
│   ├── Dirigentes/             # Dirigentes por secção
│   ├── Documentos/             # Visualizador de PDFs
│   ├── Home/                   # Landing page
│   ├── NoticiaDetail/          # Artigo individual com lightbox
│   ├── NotFound/               # Página 404
│   ├── Noticias/               # Listagem com filtros e vistas
│   ├── Programa/               # Calendário de atividades
│   ├── ProvaDetail/            # Detalhe de prova individual
│   ├── Provas/                 # Provas de classe e progressão
│   ├── ReservarAlojamento/     # Formulário de reserva com date/time pickers
│   ├── Seccao/                 # Página dinâmica de secção
│   └── UnderConstruction/      # Placeholder para páginas em construção
├── utils/
│   ├── generateCompilationPdf.js  # Geração de compilações PDF (capa, multi-canção)
│   ├── generateSongPdf.js         # Geração de PDF de canção individual
│   ├── normalize.js               # Normalização de texto (sem acentos) para pesquisa
│   └── pdfFonts.js                # Registo de fontes Nunito no jsPDF
├── styles/
│   ├── variables.css           # Paleta de cores, tipografia, espaçamentos
│   └── global.css              # Reset, estilos base e scrollbars personalizadas
├── App.jsx                     # Rotas e layout principal
└── main.jsx                    # Entry point
```

> **Para atualizar informação** (membros, notícias, inventário, etc.), basta editar os ficheiros em `src/config/` — o React trata do resto.

---

## Deploy

O deploy é **automático** — cada push/merge para `main` despoleta a GitHub Action que faz build e publica em GitHub Pages.

O site fica disponível em: **https://afonsobenedito.github.io/cne80belem/**

---

## Licença

Este projeto é mantido pelo Agrupamento 80 — Santa Maria de Belém, CNE.
