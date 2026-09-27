---
target: Noticias
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Noticias/Noticias.jsx"
target_fingerprint: "sha256:d8697a4233058c334ff0a0cc57e7a1a3463b59fbb2b714c2f45202fa42ab1ebc"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Noticias/Noticias.jsx
timestamp: 2026-09-27T14-30-19Z
slug: src-pages-noticias-noticias-jsx
---
Method: single-agent (design review, then detector + browser pass)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Filter count badge; no result count |
| 2 | Match System / Real World | 3 | pt-PT dates; "Neste Trimestre" covers April to September |
| 3 | User Control and Freedom | 3 | "Limpar filtros"; filters not in the URL |
| 4 | Consistency and Standards | 2 | Every secção badge is the same green (seccoes colours unused); icon-only view buttons with no names |
| 5 | Error Prevention | 2 | Period filter compares UTC dates: a range can be off by a day |
| 6 | Recognition Rather Than Recall | 3 | Secção badge and meta on each card |
| 7 | Flexibility and Efficiency | 3 | Grid/list, filters, presets |
| 8 | Aesthetic and Minimalist Design | 2 | Seven equal cards, no lead story; a filter panel (secção, autor, período, 3 presets) for 7 posts |
| 9 | Error Recovery | 2 | Empty result has no way out beside it |
| 10 | Help and Documentation | 3 | n/a |
| **Total** | | **26/40** | **Acceptable** |

## Priority Issues
1. [P1] Period filter off-by-one: toISOString() turns local midnight into the previous UTC day.
2. [P1] View toggle buttons icon-only (title only), no pressed state; filter toggle has no aria-expanded.
3. [P2] No hierarchy: newest story is one of seven equal cards; secção badges all Verde Mata.
4. [P2] Heavy filters for a short list; author filter of six names.
5. [P2] Empty state lacks "Limpar filtros" beside the message.
