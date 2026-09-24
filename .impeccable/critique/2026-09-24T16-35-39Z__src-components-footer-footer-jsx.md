---
target: Footer
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/components/Footer/Footer.jsx"
target_fingerprint: "sha256:d88aa417335d1b0103a8a9d975c0f731d1c59a5cc0b369c2cfa630697df7a864"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/components/Footer/Footer.jsx
timestamp: 2026-09-24T16-35-39Z
slug: src-components-footer-footer-jsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Sending/success/error states exist, but the error chip looks identical to the success chip (same yellow icon on Verde Noite) |
| 2 | Match System / Real World | 2 | "Recebe as nossas notícias" never says what arrives; "Morada:" duplicates the heading; no scouting/CNE language at all |
| 3 | User Control and Freedom | 3 | Fine for a newsletter; no undo after subscribing |
| 4 | Consistency and Standards | 2 | Three control families in one band (white Subscrever, glassy pills, underlined link); ragged social pill widths |
| 5 | Error Prevention | 3 | Localised validation, honeypot |
| 6 | Recognition Rather Than Recall | 2 | No links to key places at the end of the page; must scroll back to the header |
| 7 | Flexibility and Efficiency | 2 | No shortcuts for returning members (Programa, Provas, Cancioneiro) |
| 8 | Aesthetic and Minimalist Design | 3 | Calm, but lopsided at desktop (~315px hole between newsletter and socials) |
| 9 | Error Recovery | 3 | Specific, kind error copy that keeps the typed email |
| 10 | Help and Documentation | 2 | Nothing tells a new family how to join or who to talk to |
| **Total** | | **25/40** | **Acceptable** |

## Design Specificity Verdict
Category-interchangeable: contacts / newsletter / socials in three columns plus a "Todos os direitos reservados" bar. Only the green ground and Nunito belong to this group; no logo, no "Agrupamento 80" wordmark, no CNE affiliation, no scouting vocabulary, nothing of "O Caderno de Campo". It is also the site's one full-bleed green band and spends that exception saying nothing specific.
Deterministic scan: CLI clean (0 findings) for Footer and FloatingBtn. In-page detector: 1 footer finding on every page, `cramped-padding` on the newsletter input group, a false positive (joined input+button that fill the bordered wrapper by design). `buried-raster` ×5 on Home story photos is by design (they develop when first seen; the detector jumped past them). Two further hits were caused by the detector's own overlays.

## Priority Issues
1. [P1] No identity at the end of every page. Fix: brand block (logo, "Agrupamento 80 · Santa Maria de Belém", "Corpo Nacional de Escutas" linked to CNE); replace "Todos os direitos reservados" with a line in the group's voice (confirmed facts only). Command: /impeccable bolder (or shape).
2. [P1] No path to join or to key pages from the footer; prospective families finishing a secção or notícia page have no next step. Fix: one join line to /contactos plus a short link list (Secções, Cancioneiro, Documentos, Reservar Alojamento). Command: /impeccable layout (or onboard).
3. [P2] Lopsided desktop composition: `1fr 1fr 1.2fr` + `margin-left:auto` leaves a ~315px hole; the newsletter underuses its column. Fix: content-driven grid (auto 1fr auto) or let the newsletter anchor. Command: /impeccable layout.
4. [P2] Newsletter promise vague; error and success chips look the same. Fix: one factual line of what is sent (if confirmed); give the error chip a distinct treatment. Command: /impeccable clarify.
5. [P3] FAB (Verde Mata) blends into the green footer ground and sits close to the Instagram pill at 1024px. Fix: white fill with Verde Profundo icon while over the footer, or a light ring. Command: /impeccable polish.

## Persona Red Flags
- Jordan: looks for "how do I join / who do I call" at the end; finds address, email, newsletter.
- Sam: heading outline is "Contactos / Recebe as nossas notícias / Redes Sociais" with no group name; email sits outside <address>.
- Casey: footer is ~603px on a phone, most of a screen; first thing is a three-line address, not an action.
- Prospective parent: no CNE affiliation, no secções/ages, no join line where trust signals are expected.

## Minor Observations
- "Morada:" redundant under "Contactos".
- Copyright uses a hyphen ("Agrupamento 80 - Santa Maria de Belém"); elsewhere "80 · Santa Maria de Belém".
- On /contactos the footer repeats the page's address.
- Bottom bar at 72% opacity makes the last line of every page read as an afterthought.

## Questions to Consider
1. With the address and colour removed, could anyone tell this footer belongs to a scout group?
2. Why does the end of every page not mention the cancioneiro, the site's standout tool?
3. Is the newsletter really the footer's primary action for a prospective family, or should it be "Inscreve-te"?
