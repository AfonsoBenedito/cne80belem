---
target: Documentos
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Documentos/Documentos.jsx"
target_fingerprint: "sha256:f3a52f21a42c1a4b350cc0bad70ba630d88762bb28998a8dd85598eb4e15044c"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Documentos/Documentos.jsx
timestamp: 2026-09-27T14-59-40Z
slug: src-pages-documentos-documentos-jsx
---
Method: single-agent (design review, then detector + browser pass)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Active document highlighted (not announced) |
| 2 | Match System / Real World | 3 | Plain names |
| 3 | User Control and Freedom | 3 | Close and download in the viewer |
| 4 | Consistency and Standards | 2 | Touch devices (maxTouchPoints, incl. touchscreen laptops) silently open a new tab while the page says "Seleciona um documento para o visualizar" |
| 5 | Error Prevention | 3 | n/a |
| 6 | Recognition Rather Than Recall | 3 | Short list |
| 7 | Flexibility and Efficiency | 2 | Search box for four documents; no size/pages/date |
| 8 | Aesthetic and Minimalist Design | 2 | 600px empty viewer on arrival; red PDF icons off-palette |
| 9 | Error Recovery | 3 | "Nenhum documento encontrado" |
| 10 | Help and Documentation | 2 | Nothing says what each document is for (the Ficha de Inscrição is the joining step) |
| **Total** | | **26/40** | **Acceptable** |

## Priority Issues
1. [P1] Touch detection by navigator.maxTouchPoints: touchscreen laptops never get the viewer; phones get a viewer placeholder that never fills and no hint a tab opens.
2. [P1] Download icons 28x28 on touch, named only by title.
3. [P2] Empty 600px viewer on arrival; open the first document or show the list only.
4. [P2] No context per document (purpose, pages/size, date); search box unnecessary for four items.
5. [P2] Search input has no label; active document not exposed (aria-current).
