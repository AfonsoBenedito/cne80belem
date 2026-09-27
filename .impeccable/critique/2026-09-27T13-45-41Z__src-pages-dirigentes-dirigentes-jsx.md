---
target: Dirigentes
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Dirigentes/Dirigentes.jsx"
target_fingerprint: "sha256:1898c974c3dad5faf5f4e865b3e304818c3931951c2f645722f8f2bd2e9f571a"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Dirigentes/Dirigentes.jsx
timestamp: 2026-09-27T13-45-41Z
slug: src-pages-dirigentes-dirigentes-jsx
---
Method: single-agent (design review, then detector + browser pass)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Phone tab bar tracks the secção in view |
| 2 | Match System / Real World | 3 | Plain names; title promises Dirigentes *and* Animadores but nobody is marked as either |
| 3 | User Control and Freedom | 3 | Tabs jump to a secção |
| 4 | Consistency and Standards | 3 | Beatriz Costa (Chefe de Caminheiros on Direção) missing here |
| 5 | Error Prevention | 3 | n/a |
| 6 | Recognition Rather Than Recall | 2 | On phones the secção headings are hidden: 13 cards in one run, only the sticky tab says where one secção ends |
| 7 | Flexibility and Efficiency | 3 | Tab jump |
| 8 | Aesthetic and Minimalist Design | 2 | ~200px card per name; 4,056px on a phone for 13 names |
| 9 | Error Recovery | 3 | Placeholder avatar |
| 10 | Help and Documentation | 2 | No role distinction (dirigente vs animador) |
| **Total** | | **27/40** | **Acceptable** |

## Priority Issues
1. [P1] Phones hide the secção headings (display:none): no visual break between groups, and screen readers lose the h2s (axe heading-order).
2. [P1] Name-only cards ~200px tall: 4,056px phone page. Compact tiles (MemberCard phone="tile"), two per row.
3. [P2] Smooth scroll ignores reduced motion (CSS scroll-behavior + JS smooth); scroll handler with a hard-coded 72px header offset.
4. [P2] Dirigente vs Animador not shown (data has no role).
5. [P3] Column emblem alt repeats the heading ("Lobitos Lobitos"); Caminheiros missing (Beatriz Costa).
