---
target: Programa
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Programa/Programa.jsx"
target_fingerprint: "sha256:488d375396454eeed62a087d73f252f271a19c357a93de5ead15dd5c97582686"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Programa/Programa.jsx
timestamp: 2026-09-27T16-51-25Z
slug: src-pages-programa-programa-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser evidence)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | No relative time |
| 2 | Match System / Real World | 3 | Acronyms unexplained |
| 3 | User Control and Freedom | 3 | Fine |
| 4 | Consistency and Standards | 3 | Ended card framed like next; Confirmar/Confirma |
| 5 | Error Prevention | 2 | Leaders-only entry can be "Próxima atividade" |
| 6 | Recognition Rather Than Recall | 3 | Distance to date computed by reader |
| 7 | Flexibility and Efficiency | 2 | No add-to-calendar |
| 8 | Aesthetic and Minimalist Design | 3 | Month bars repeat band colour; empty right half |
| 9 | Error Recovery | 2 | Ended state dead end |
| 10 | Help and Documentation | 2 | Weekly email unexplained |
| **Total** | | **26/40** | **Acceptable** |

Detector: CLI clean; browser kicker-above-heading (deliberate), cramped-padding (footer). axe 0; 200% text on phones clips "SÁB–DOM" in merged rows (.dayHeader no wrap).

Priority issues:
- [P1] Ended state dead end, same frame as next, band present tense. onboard/clarify.
- [P2] Leaders-only entry can be next; qualifier tiny. harden.
- [P2] No relative time; weak "Hoje"; hours note on camps. clarify.
- [P2] Merged-row date header clips at 200% on phones. adapt.
- [P3] Next/today frame visual only for SR. harden.
