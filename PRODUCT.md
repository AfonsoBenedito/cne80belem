# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Current members and their families** — scouts and parents checking programa, provas, notícias, documentos, and section pages. Frequently on phones.
- **Prospective families** — parents evaluating whether to enroll their kids in the agrupamento; the site is their first impression of the group.
- **Other CNE groups and external visitors** — scouts from other agrupamentos using the cancioneiro as a reference/study resource or booking the alojamento.
- Leaders (dirigentes) use the cancioneiro and PDF tools, but the confirmed priority order is prospective families, current members/families, then external groups.

## Product Purpose

Official website of Agrupamento 80 — Santa Maria de Belém (Corpo Nacional de Escutas, Lisbon). Success means:

1. **Public face of the group** — news, photos, and section pages keep families engaged and present the agrupamento well.
2. **Useful in the field** — cancioneiro, programa, and provas actually get used during scout activities, often on phones outdoors.
3. **Grow membership** — the site helps convince new families to join.

## Positioning

The digital cancioneiro is the standout mechanism: searchable songs with positioned chords, chord diagrams, solfège ↔ standard notation toggle, capo badges, and a user-composed PDF songbook builder (three print layouts including booklet imposition). Neighboring agrupamento sites are static brochures; this one is a working tool other groups come to use.

## Operating Context

- Portuguese language (pt-PT), CNE scouting terminology throughout: secções (Lobitos, Exploradores, Pioneiros, Caminheiros), provas, promessas, banco de fardas, alojamento.
- Field use: songs read from phones during activities and campfires; PDFs printed as physical songbooks (A4 vertical/horizontal/booklet-fold).
- Content is maintained as static config files in `src/config/` (songs, notícias, programa, members, documentos) — no CMS; updates ship as commits.
- Deployed to GitHub Pages at `afonsobenedito.github.io/cne80belem` (SPA redirect pair `public/404.html` + `index.html` script is load-bearing).

## Capabilities and Constraints

- React 19 + Vite, React Router (basename for Pages subpath), CSS Modules, jsPDF with embedded Nunito fonts, react-datepicker for alojamento booking.
- Fully static: no backend, no auth, no database. Forms/booking flows must work within that constraint.
- Songs are per-file modules (`src/config/songs/<slug>.js`); chords stored in `[Standard]` notation, converted to solfège at render time.
- Some sections are still under construction (Fotos pages, section den pages).
- Mobile parity is a hard requirement: breakpoints 1024/768/600px, touch-safe interactions (no hover-dependent UI).

## Brand Commitments

**CNE identity is binding.** Official CNE green/yellow, logos, and section identity must stay; visual work happens within them. Design execution follows the project's `ui-design` skill (`.claude/skills/ui-design/SKILL.md`) — press feedback, compositor-friendly motion, materials, typography, reduced-motion support.

## Evidence on Hand

- Real content throughout: full cancioneiro, notícias with photos, member rosters with photos (`src/assets/images/members/`), section imagery, farda catalog, official documents.
- Logos in `src/assets/images/logos/`; carousel photography in `src/assets/images/carousel/`.
- No testimonials, metrics, or enrollment statistics on hand — do not fabricate any.

## Product Principles

1. **Tool first, brochure second** — the cancioneiro and field resources are the reason people return; never degrade their utility for visual flair.
2. **Works on a phone in a field** — every surface must hold up on small screens, slow connections, and touch input.
3. **Truthful and official** — this represents CNE and the agrupamento; no invented claims, placeholder people, or off-brand identity.
4. **Print is a first-class output** — the PDF songbooks are real deliverables, not an export afterthought.
5. **Low-maintenance by design** — static config files and GitHub Pages keep the site sustainable for volunteer maintainers.
