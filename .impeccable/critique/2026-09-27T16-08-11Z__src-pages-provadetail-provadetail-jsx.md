---
target: ProvaDetail
total_score: 31
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 0
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaDetail.jsx"
target_fingerprint: "sha256:efb8afeb97ccd8d249966051c5a055c004716236d6f59a2d17fcdbb802ecf5c4"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaDetail.jsx
timestamp: 2026-09-27T16-08-11Z
slug: src-pages-provadetail-provadetail-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser evidence)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Count moves from band to toggle ≤1024 |
| 2 | Match System / Real World | 4 | CNE words, tu, questions |
| 3 | User Control and Freedom | 3 | Group toggles reset per prova |
| 4 | Consistency and Standards | 3 | Numbering matches |
| 5 | Error Prevention | 3 | Unknown slug redirects |
| 6 | Recognition Rather Than Recall | 3 | 17 visible on desktop; behind toggle on phones |
| 7 | Flexibility and Efficiency | 3 | ~8 sidebar links before text |
| 8 | Aesthetic and Minimalist Design | 2 | "Texto em preparação" ×8 |
| 9 | Error Recovery | 3 | Empty state names next step |
| 10 | Help and Documentation | 3 | No explanation of provas |
| **Total** | | **31/40** | **Good** |

Detector: CLI clean; browser all-caps-body on Exploradores label (short label), cramped-padding (footer). axe clean at rest. Hover opacity 0.7 drops contrast: group count 2.67, back link 2.74–2.93, meta on hovered link ~4.0.

Priority issues:
- [P2] Hover opacity fades text below AA. harden.
- [P2] "Texto em preparação" repeated per row. distill.
- [P2] FloatingBtn covers text on phones. adapt.
- [P2] 12px sidebar titles on desktop. typeset.
- [P3] Band label wraps mid-phrase on phones. typeset.

Minor: Lobitos borders ~1.3:1; menuIn replays on load; hyphen definitions; sidebar not sticky.
