---
target: reservar-alojamento
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ReservarAlojamento/ReservarAlojamento.jsx"
target_fingerprint: "sha256:e6b8efee4746505333d9e06b1daf50da80e9cefcd1e35889b8649c9ef4fdafb1"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ReservarAlojamento/ReservarAlojamento.jsx
timestamp: 2026-10-07T14-43-26Z
slug: reservaralojamento-reservaralojamento-jsx-3eaebc8a
---
Method: dual-agent (A: design review · B: detector + browser evidence)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | "Abrimos…" even when nothing opened; exit date cleared silently |
| 2 | Match System / Real World | 2 | No people count / contact name; email reads as a field dump |
| 3 | User Control and Freedom | 3 | No "Corrigir pedido"; new request wipes all |
| 4 | Consistency and Standards | 2 | Only Organização has a PT inline error; English native bubbles; calendar SR labels English |
| 5 | Error Prevention | 3 | Good min dates/space check; no capacity/lead-time guidance |
| 6 | Recognition Rather Than Recall | 3 | Labels + example placeholders |
| 7 | Flexibility and Efficiency | 3 | Autofill, typing, native pickers |
| 8 | Aesthetic and Minimalist Design | 3 | Clean but sparse (content missing) |
| 9 | Error Recovery | 2 | Desktop calendar opens over its own error bubble |
| 10 | Help and Documentation | 2 | No reply time / what happens next |
| **Total** | | **26/40** | **Acceptable** |

Detector: CLI clean; browser line-length (subtitle uncapped), cramped-padding (footer, out of scope). axe 0 violations in all states. Unverified (screenshots lost): 12px overflow at 320 touch; 200% text on phone rows don't stack; "Fazer novo pedido" drops focus to body.

Priority issues:
- [P0] Nothing about the space (owner content). clarify/layout.
- [P1] Missing people count + contact name; polite email body. clarify/harden.
- [P1] Inconsistent/English validation; calendar SR labels English; cleared exit not announced. harden.
- [P2] FAB collides with the form on phones. adapt.
- [P2] Done state: unverifiable "Abrimos", no reply time, no edit, focus lost on reset. clarify/harden.
- [P2] 320 overflow / 200% stacking (confirm first). adapt.
