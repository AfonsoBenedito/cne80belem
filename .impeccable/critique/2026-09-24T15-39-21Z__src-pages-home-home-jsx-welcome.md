---
target: _welcome_11n42_5 (Home welcome section)
total_score: 12
max_score: 20
na_heuristics: 1,3,5,7,9
p0_count: 0
p1_count: 1
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Home/Home.jsx#welcome"
timestamp: 2026-09-24T15-39-21Z
slug: src-pages-home-home-jsx-welcome
---
Method: dual-agent (A: design review · B: detector + browser)
Target: Home welcome section (.welcome / .lead, src/pages/Home/Home.jsx)

## Design Health Score (5 heuristics scored, /20)
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | n/a | Static text |
| 2 | Match System / Real World | 2 | "Bem-vindos ao site…" talks about the website, not the group |
| 3 | User Control and Freedom | n/a | Nothing to control |
| 4 | Consistency and Standards | 3 | Tokens, left edge, contrast right; 1.7 leading at 20px loosens against Tighter-As-It-Grows |
| 5 | Error Prevention | n/a | No input |
| 6 | Recognition Rather Than Recall | 3 | Spells out Corpo Nacional de Escutas for newcomers |
| 7 | Flexibility and Efficiency | n/a | No interaction |
| 8 | Aesthetic and Minimalist Design | 2 | ~2/3 of the content repeats the hero (name ×3 in one scroll, Belém, "crescer") |
| 9 | Error Recovery | n/a | No error states |
| 10 | Help and Documentation | 2 | The only orientation text, yet says nothing about what scouting involves |
| Total | | 12/20 (60%) | Acceptable |

## Design Specificity Verdict: FAIL (copy, not styling)
Any Portuguese agrupamento could publish it verbatim; only "Corpo Nacional de Escutas" and "jovens e adultos" are new. Detector CLI clean (0 findings), overlay 0 findings desktop+phone. Measured: 20px/34px desktop (18/30.6 phone), 10.37:1, 52 avg chars/line desktop, 3 lines desktop / 5–6 phone, 64/64 (48/48) px spacing, no heading, no overflow.

## Priority Issues
1. [P1] Copy repeats the hero and says nothing specific — replace with what a child actually does / who it is for, using confirmed facts. /impeccable clarify
2. [P2] Equal spacing above and below leaves it floating between hero and news — belong to one, or remove the section. /impeccable layout
3. [P2] <section aria-label="Bem-vindos"> creates a heading-less region landmark around one paragraph — drop the label (or use a div). /impeccable harden
4. [P3] 1.7 leading at 20px and 400 weight make the lead read softer than body; "em Belém." orphans on phone. /impeccable typeset
5. [P3] Below the fold on desktop — cannot be the first impression there. /impeccable layout

## Persona Red Flags
Jordan: still no when/what/who-for; CNE's Catholic identity not signalled; "jovens e adultos" unclear for a 7-year-old. Casey: 5 lines of repeated content pushing news down. Riley: region landmark without heading; 1.7 leading grows fast with longer copy.

## Minor Observations
Voice shifts from hero (speaks to the child: "Vem…") to formal visitor greeting; "crescendo juntos" gerund is formal (pt-PT colloquial: "a crescer") — preference, not error.

## Questions to Consider
- If this section were deleted, would a parent notice?
- What is the first thing a parent at the gate on a Saturday is told — and why isn't it here?
- Should this block speak to the parent (method, volunteers, safety) while the hero speaks to the child?
