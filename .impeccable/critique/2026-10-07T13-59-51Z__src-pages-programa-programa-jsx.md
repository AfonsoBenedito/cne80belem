---
target: Programa
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Programa/Programa.jsx"
target_fingerprint: "sha256:ddb2b4df29177aa3bdac255dc8ea27b13e664991c41a2fe95dad956ebb93fbe5"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Programa/Programa.jsx
timestamp: 2026-10-07T13-59-51Z
slug: src-pages-programa-programa-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser evidence)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Next/today visual-only; choice changes not announced |
| 2 | Match System / Real World | 3 | "Em breve" gives no months |
| 3 | User Control and Freedom | 3 | URL state, reversible fold |
| 4 | Consistency and Standards | 3 | Band vs button label formats; desktop Tab order right-then-left |
| 5 | Error Prevention | 4 | Disabled future trimesters; URL fallback |
| 6 | Recognition Rather Than Recall | 3 | Frame meaning inferred |
| 7 | Flexibility and Efficiency | 2 | No add-to-calendar/print |
| 8 | Aesthetic and Minimalist Design | 3 | Band repeats button; tall on phones |
| 9 | Error Recovery | 3 | Little can go wrong |
| 10 | Help and Documentation | 2 | No contact route near calendar (FAB hidden) |
| **Total** | | **29/40** | **Good** |

Detector: CLI clean; browser cramped-padding (footer, false positive), kicker-above-heading (deliberate). axe 0 violations in 5 date scenarios × 3 widths; no overflow 1280–320; no clipping at 200%; toolbar centre/right edges exact.

Priority issues:
- [P1] Next activity has no visible words; Lobitos rings dilute the fill. clarify.
- [P1] Fully past trimester renders as disabled-looking gray. colorize.
- [P2] Tall phone band; trimester label repeated. distill.
- [P2] Year/trimester change not announced; desktop Tab order vs visual. harden.
- [P3] "Em breve" hides months. clarify.
