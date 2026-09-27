---
target: ReservarAlojamento
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ReservarAlojamento/ReservarAlojamento.jsx"
target_fingerprint: "sha256:369270d3998142f4b586edd35bca53664c8e28b584af779e916bbaa7f5d0b305"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ReservarAlojamento/ReservarAlojamento.jsx
timestamp: 2026-09-27T14-00-17Z
slug: reservaralojamento-reservaralojamento-jsx-3eaebc8a
---
Method: single-agent (design review, then detector + browser pass)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | "Pedido enviado!" when nothing was sent: the form only opens the mail app |
| 2 | Match System / Real World | 3 | Clear fields, pt-PT dates |
| 3 | User Control and Freedom | 3 | "Fazer novo pedido" resets |
| 4 | Consistency and Standards | 3 | Title-case button; off-scale datepicker font sizes |
| 5 | Error Prevention | 3 | minDate stops past dates; exit before entry still possible after changing entry |
| 6 | Recognition Rather Than Recall | 3 | Labels visible |
| 7 | Flexibility and Efficiency | 3 | Short form |
| 8 | Aesthetic and Minimalist Design | 3 | Calm, one column; generic icon-disc header |
| 9 | Error Recovery | 2 | No fallback when no mail app opens (address not shown) |
| 10 | Help and Documentation | 2 | Nothing about the space (capacity, what's included, conditions) |
| **Total** | | **27/40** | **Acceptable** |

## Priority Issues
1. [P1] False success: "Pedido enviado!" though the request only becomes an email draft.
2. [P1] Phone datepicker popup runs off the left edge (day names and first column cut).
3. [P1] Date and time inputs have no programmatic label (label lacks htmlFor; time only has "HH:mm" placeholder).
4. [P2] No fallback when mailto does nothing; address not shown.
5. [P2] Nothing about the space itself (needs facts).
