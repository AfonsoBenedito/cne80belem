---
target: Programa
total_score: 16
max_score: 36
na_heuristics: 9
p0_count: 1
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Programa/Programa.jsx"
target_fingerprint: "sha256:f42e4c7d7ef4846331d787cd6cd3377edc9d6604fc0516e3edc0118ac9f24d6f"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Programa/Programa.jsx
timestamp: 2026-09-27T16-20-20Z
slug: src-pages-programa-programa-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser evidence)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 1 | No today/next marker; stale trimester looks current |
| 2 | Match System / Real World | 2 | Unexplained acronyms; times inside text |
| 3 | User Control and Freedom | 2 | No back link, no jump to current month |
| 4 | Consistency and Standards | 2 | No back link/lead like Provas; hyphen ranges |
| 5 | Error Prevention | 2 | Hours caveat buried in footnote |
| 6 | Recognition Rather Than Recall | 2 | Scan 3 months to find today |
| 7 | Flexibility and Efficiency | 1 | No add-to-calendar/filter |
| 8 | Aesthetic and Minimalist Design | 3 | Tidy but flat |
| 9 | Error Recovery | n/a | No input/actions |
| 10 | Help and Documentation | 1 | No glossary/locations/contact |
| **Total** | | **16/36** | **Poor** |

Specificity: half; secção band only, stock calendar grid. Detector: CLI clean; browser 28× undersized-ui-text (10px hard-coded, css:121,177,191,219), kicker-above-heading (design call), cramped-padding (footer). axe 0 violations. 200% text clips the 20/21 March split row (.weeks overflow hidden). Data: one shared trimestre2 for all secções, all dates past (owner content).

Priority issues:
- [P0] No sense of time (today/next/past; stale state). harden/clarify.
- [P1] Flat hierarchy; camps don't stand out; centred text; time in string. bolder/layout.
- [P1] No back link/lead; hours caveat buried. clarify.
- [P2] 10px px-sized labels; no <time>; fragmented dates; 200% clipping. typeset.
- [P2] Mobile: squeezed 2-day week, FAB covers text, 500px cap at 768. adapt.

Minor: centred band vs left on prova pages; silent redirect for unknown secção; dead CSS; "*" footnote.
