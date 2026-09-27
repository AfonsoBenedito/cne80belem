---
target: ReservarAlojamento
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 0
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ReservarAlojamento/ReservarAlojamento.jsx"
target_fingerprint: "sha256:6e4185d559b3f8882c6b0f846d53d4903659faa744831ad3532fba441a963b00"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ReservarAlojamento/ReservarAlojamento.jsx
timestamp: 2026-09-27T14-22-58Z
slug: reservaralojamento-reservaralojamento-jsx-3eaebc8a
---
Method: single-agent (design review, then detector + browser pass)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Confirmation now honest: "O teu email está pronto… Só falta carregar em enviar" |
| 2 | Match System / Real World | 3 | Plain pt-PT; dates picked, not typed, on phones |
| 3 | User Control and Freedom | 3 | Reopen the email, copy the request, start over |
| 4 | Consistency and Standards | 3 | Optional fields (Mensagem, the two times) aren't marked "(opcional)" as elsewhere on the site |
| 5 | Error Prevention | 3 | Blank names caught; impossible stays cleared |
| 6 | Recognition Rather Than Recall | 3 | Labels always visible |
| 7 | Flexibility and Efficiency | 3 | Autofill hints; pickers on touch |
| 8 | Aesthetic and Minimalist Design | 3 | Calm one-column form; generic icon disc over the title |
| 9 | Error Recovery | 3 | Address + copyable request when no mail app opens |
| 10 | Help and Documentation | 2 | Nothing about the space (deferred by the user) |
| **Total** | | **29/40** | **Acceptable** |

## Priority Issues
1. [P2] Optional fields not marked "(opcional)" (site rule: no asterisks, optional ones say so).
2. [P2, deferred] Nothing about the space (capacity, conditions).
3. [P3] Generic round icon above the title; the floating email button duplicates the form's purpose.
