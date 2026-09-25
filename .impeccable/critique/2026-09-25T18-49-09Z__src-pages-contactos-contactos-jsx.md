---
target: Contactos
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 0
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Contactos/Contactos.jsx"
target_fingerprint: "sha256:8f7653d727fcf48eb983ffef29a863d50f496c29c9cb882e34f2639b5a91815c"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Contactos/Contactos.jsx
timestamp: 2026-09-25T18-49-09Z
slug: src-pages-contactos-contactos-jsx
---
Method: single-agent (design review, then detector + browser pass)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Map fades in once loaded |
| 2 | Match System / Real World | 3 | Address confirmed as 1300-216; Google's listing on the map still says 1300-014 |
| 3 | User Control and Freedom | 3 | New-tab links announced |
| 4 | Consistency and Standards | 3 | "Fazer parte" opens email but looks like the two page links beside it |
| 5 | Error Prevention | 3 | Fixed address; a visit still has no days or times (kept by choice) |
| 6 | Recognition Rather Than Recall | 3 | Facts and shortcuts in view |
| 7 | Flexibility and Efficiency | 3 | Shortcuts route joining, fardas, alojamento; joining email pre-filled |
| 8 | Aesthetic and Minimalist Design | 3 | Six same-size icon-circle cards in two rows: the page reads as a card grid |
| 9 | Error Recovery | 3 | Maps link survives a failed map |
| 10 | Help and Documentation | 2 | No opening days/times for the sede |
| **Total** | | **29/40** | **Acceptable** |

## Priority Issues
1. [P2] Six equal icon-circle cards in two rows (facts, then shortcuts): a template grid, and the facts and the actions look like the same kind of thing.
2. [P3] "Fazer parte" opens the mail app, but its chevron promises a page like its neighbours.
3. [P3] Google's business listing shows 1300-014 on the embedded map, off the site: update it in Google Business Profile.
