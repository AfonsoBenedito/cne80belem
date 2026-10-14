---
target: klandestino
total_score: 22
max_score: 36
na_heuristics: 5
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Klandestino/KlandestinoIssue.jsx"
target_fingerprint: "sha256:7d4b70f642eead32929c645da5309fa95ec61b80c77188f983d3d2547df0abed"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Klandestino/KlandestinoIssue.jsx
timestamp: 2026-10-14T11-07-19Z
slug: src-pages-klandestino-klandestinoissue-jsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | 29–43k px issues, sumário never marks the current article |
| 2 | Match System / Real World | 3 | Newspaper conventions; SEO still says "duas folhas soltas" |
| 3 | User Control and Freedom | 3 | Passatempos sheet has no pager |
| 4 | Consistency and Standards | 2 | Ekologi/Ekologia; Klandestino/Klãdestino; Contas bullets; Bar da IIIª no page |
| 5 | Error Prevention | n/a | read-only |
| 6 | Recognition Rather Than Recall | 2 | puzzles not linked to solutions |
| 7 | Flexibility and Efficiency | 1 | no cross-issue search / names index |
| 8 | Aesthetic and Minimalist Design | 3 | restrained; repeated kickers on the loose sheet |
| 9 | Error Recovery | 3 | clear not-found |
| 10 | Help and Documentation | 3 | honest transcription lead, lost-drawing notes |
| **Total** | | **22/36** | **Acceptable** |

Detector: CLI 1 advisory (masthead clamp low end off ramp, intentional). Browser: line-length on index .lead (~91ch) and Nº9 .note (~93ch) at 1280 (real); cramped-padding on footer newsletter (out of scope). axe 0 on 6 routes; no overflow 320/390/1280; touch ≥44; contrast ≥5.1:1; sumário jump lands at 88px.

Priority issues:
- [P1] Wayfinding in very long issues (current-article state, phone "Sumário" return, "Voltar ao sumário"). layout
- [P1] Index cards don't distinguish issues (Nº + month large, one teaser instead of section list). layout/typeset
- [P2] No cross-issue search / names index. onboard
- [P2] Puzzles not linked to solutions; missing-solution notes. clarify
- [P3] SEO "duas folhas", pager on passatempos, Contas bullets, repeated kickers, Ekologi/Ekologia, .lead/.note measure. polish

Personas: 1993 member (no search, small signatures, ficha at bottom); phone first-timer (masthead line orphan, songs scroll with no hint, chords same weight, no way back); screen reader (chords read aloud, word-search table no caption, card link name too long).
