---
target: Contactos
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Contactos/Contactos.jsx"
target_fingerprint: "sha256:53282c1c56ae52f4d6f281446096e03978b79d69355c66dedabb1f15146c9ab6"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Contactos/Contactos.jsx
timestamp: 2026-09-25T18-44-56Z
slug: src-pages-contactos-contactos-jsx
---
Method: single-agent (design review, then detector + browser pass)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Map fades in once loaded; nothing else has state |
| 2 | Match System / Real World | 3 | Plain pt-PT; site says "1300-216", Google's card says "R. do Emb. 180, 1300-014" |
| 3 | User Control and Freedom | 3 | New-tab links now announced |
| 4 | Consistency and Standards | 3 | Three link styles in one row of cards (text link, pills, green row) |
| 5 | Error Prevention | 2 | "Visita-nos na nossa sede" with no days or times; postcode disagrees with the map |
| 6 | Recognition Rather Than Recall | 3 | Facts in plain view |
| 7 | Flexibility and Efficiency | 2 | No "who to write to for what"; no copy action for the address |
| 8 | Aesthetic and Minimalist Design | 3 | Empty space in the Email card; ~130px gap before the footer; the footer repeats the page |
| 9 | Error Recovery | 3 | "Ver no Google Maps" survives a failed map |
| 10 | Help and Documentation | 2 | Nothing on when the sede is open or how to reach it |
| **Total** | | **27/40** | **Acceptable** |

## Priority Issues
1. [P1] Postcode disagrees with the map: site 1300-216 (no street number), Google's card R. do Emb. 180, 1300-014. Needs the user's confirmation.
2. [P1] The subtitle invites a visit with no days/times. Needs facts, or drop "ou visita-nos".
3. [P2] One email for everything, no pointer for inscrições, fardas, alojamento.
4. [P2] The floating email button repeats the Email card and covers the map on desktop and phones.
5. [P3] Email card empty on desktop; phone social pills stack; large gap before the footer.
