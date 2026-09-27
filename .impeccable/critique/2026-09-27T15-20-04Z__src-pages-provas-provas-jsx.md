---
target: provas
total_score: 20
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Provas/Provas.jsx"
target_fingerprint: "sha256:f31ec5a00b805426e1bdc984fac1eee52047d8621d44d801c2429bd07d8e96f1"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Provas/Provas.jsx
timestamp: 2026-09-27T15-20-04Z
slug: src-pages-provas-provas-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser evidence)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 1 | No done/progress state; collapse buttons lack aria-expanded |
| 2 | Match System / Real World | 3 | Real CNE vocabulary in tu; numbers imply an unstated order |
| 3 | User Control and Freedom | 2 | No link back to the secção; collapsed groups still take focus |
| 4 | Consistency and Standards | 2 | Numbering restarts per group; accordion lacks the site's ARIA pattern |
| 5 | Error Prevention | 1 | Three secções open Pioneiros content |
| 6 | Recognition Rather Than Recall | 3 | Full questions scannable |
| 7 | Flexibility and Efficiency | 2 | 17 rows every visit, no jump |
| 8 | Aesthetic and Minimalist Design | 3 | Quiet; muddy text-shadow on yellow band |
| 9 | Error Recovery | 2 | Unknown secção silently redirects to Home |
| 10 | Help and Documentation | 1 | Nothing explains provas or the Promessa |
| **Total** | | **20/40** | **Acceptable** |

Design specificity: specific words, generic structure (FAQ-like list). Detector: CLI 1 layout-transition (Provas.module.css:91); browser 4 (layout-transition ×3, kicker-above-heading = design call, cramped-padding in footer = out of scope).

Priority issues:
- [P0] provasContent keyed by slug only; adesao-seccao-1..8 content is Pioneiros; Lobitos/Exploradores/Caminheiros open wrong text (provasContent.js:183). Fix: key by seccao+slug, test. harden.
- [P1] Collapsed groups stay focusable (max-height clip), no aria-expanded/aria-controls, h2 inside button (Provas.jsx:47-59, css:85-98). harden.
- [P1] No orientation or back link to the secção. clarify.
- [P2] 17 equal rows open by default; numbering restarts. distill.
- [P3] max-height transition, raw 300ms chevron, hover translateX, no :active, hero text-shadow. polish.

Personas: Jordan (wrong content, no framing, two "1"s); Casey (second group 2 screens down, FAB covers row 7 chevron, no press feedback); Sam (state not announced, hidden links focusable).

Minor: ProvaDetail SEO uses provaItem.name (undefined); cropped hero emblems; SEO says "progressão"; raw rem spacing.

Questions: caderno with tick-off progress? shared Movimento block + secção block? audience child vs parent?
