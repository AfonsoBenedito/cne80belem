---
target: Oração do Lobito, Pai Nosso and Avé Maria for the Lobitos
total_score: 22
max_score: 28
na_heuristics: 5,9,10
p0_count: 0
p1_count: 1
target_identity: "url:http://localhost:5199/cne80belem/seccao/lobitos/provas/adesao-seccao-2"
timestamp: 2026-10-14T15-19-54Z
slug: lem-seccao-lobitos-provas-adesao-seccao-2-b4821eed
closed: true
---
Method: dual-agent (A: design review · B: detector + browser)

Score 22/28 (n/a: 5 error prevention, 9 error recovery, 10 help — a text-only prayer page the owner wants without prose)
1 Status 3 · 2 Real world 4 · 3 Control 3 · 4 Consistency 4 · 6 Recognition 3 · 7 Flexibility 2 · 8 Minimalist 3

Detector: 0 findings in ProvaDetail.jsx (16 project-wide advisories elsewhere, none on this page); overlay cramped-padding = footer newsletter (false positive); axe 0 violations at 1280/390/320; only "e bendito é o fruto do vosso ventre, Jesus." wraps (320px), indented.

Priority issues
[P1] Floating button covers line ends of the prayers on phones (48px FAB at x=326/390, x=256/320 over a 342/272px column). -> adapt
[P2] Verse set at 16px gray-700 like expository provas; recited by 6–10-year-olds over a phone. Larger, darker verse type for multi-line blocks. -> typeset
[P2] No breath grouping inside each prayer (11–12 uniform rows); white space only, wording untouched, needs owner approval. -> typeset
[P3] Prayers barely separated (32px between sections ≈ 1.2 line heights); last Ámen runs into nav. -> layout
[P3] Desktop: ~300px verse column in a 650px article, empty right half. -> layout

Personas: Lobito+parent (16px gray type; FAB over "idade."; owner's mid-phrase breaks "seguir o Vosso / exemplo"); distracted parent (Avé Maria 2.5 screens down; FAB overlap; PDF good); screen reader (fine: h1 + three h2, lines spaced in the accessible text).
Minor: Amen vs Ámen intentional but undocumented in content comment; PDF fits one A4 page.
