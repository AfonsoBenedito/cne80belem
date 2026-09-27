---
target: Noticias
total_score: 30
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 0
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Noticias/Noticias.jsx"
target_fingerprint: "sha256:7c00a6381b21e6444cbd9b84184154b2eb0fbf38a469199307fd98bf0b4735dd"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Noticias/Noticias.jsx
timestamp: 2026-09-27T14-36-09Z
slug: src-pages-noticias-noticias-jsx
---
Method: single-agent (design review, then detector + browser pass)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Live "N notícias" count; filter badge counts |
| 2 | Match System / Real World | 3 | Plain pt-PT |
| 3 | User Control and Freedom | 3 | Clear buttons everywhere; filters not in the URL |
| 4 | Consistency and Standards | 3 | Secção colours now match the site |
| 5 | Error Prevention | 3 | Period filter by local day |
| 6 | Recognition Rather Than Recall | 3 | Chips in view |
| 7 | Flexibility and Efficiency | 3 | Chips, presets, grid/list |
| 8 | Aesthetic and Minimalist Design | 3 | Lead story; but three rows of chrome before content, list rows stretch to a portrait cover |
| 9 | Error Recovery | 3 | Empty state has Limpar filtros |
| 10 | Help and Documentation | 2 | n/a mostly |
| **Total** | | **30/40** | **Acceptable** |

## Priority Issues
1. [P2] Phones: chips wrap to three rows, then "Mais filtros", then the count: first story starts 520px down.
2. [P2] List view: the ACAGRUP row stretches to 260px (portrait cover sets the row height) while others are ~195px.
3. [P3] Desktop chrome in three rows (chips / Mais filtros + view / count); filters not kept in the URL.
