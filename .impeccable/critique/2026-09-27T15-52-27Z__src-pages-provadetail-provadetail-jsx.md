---
target: ProvaDetail
total_score: 28
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaDetail.jsx"
target_fingerprint: "sha256:6295e97098ce9fd8bdc18c5c0ee18a693dbc7a2c3aee616048f00d137d704324"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaDetail.jsx
timestamp: 2026-09-27T15-52-27Z
slug: src-pages-provadetail-provadetail-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser evidence)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | "Prova N de 17" only ≤1024px |
| 2 | Match System / Real World | 3 | "ver todas" opens one group |
| 3 | User Control and Freedom | 3 | Prova 17 is a dead end |
| 4 | Consistency and Standards | 3 | Centred band vs left text; desktop/phone wayfinding differ |
| 5 | Error Prevention | 3 | "segue para a prova seguinte" can lead to another empty page |
| 6 | Recognition Rather Than Recall | 3 | Sidebar shows current group only |
| 7 | Flexibility and Efficiency | 2 | No cross-group jump, no saved place |
| 8 | Aesthetic and Minimalist Design | 3 | h1 24px vs h2 20px; group name twice |
| 9 | Error Recovery | 3 | Empty card names Chefe + next step |
| 10 | Help and Documentation | 2 | Nothing on how a prova is done |
| **Total** | | **28/40** | **Good** |

Specificity: usable, still generic in character. Detector: CLI clean; browser kicker-above-heading (design call), cramped-padding (footer). axe 0 violations; all measurements pass.

Priority issues:
- [P1] Last prova dead end (jsx:254); add closing card. delight/clarify.
- [P1] No secção named on the page; add to label/back link; "Prova N de 17" on desktop. clarify.
- [P2] Flat h1/h2 (24/20; 20/20 phone); centred band over left column. typeset/layout.
- [P2] Empty-state "prova seguinte" can be empty; 8 repeated sidebar markers. clarify.
- [P3] "ver todas" opens one group. clarify.

Minor: uneven prev/next widths; Lobitos borders ~1.4:1 (decorative); back link no :active; line-height 1.85 vs 1.7; " - " definitions could bold the term; aside unnamed; FAB covers text on phones.
