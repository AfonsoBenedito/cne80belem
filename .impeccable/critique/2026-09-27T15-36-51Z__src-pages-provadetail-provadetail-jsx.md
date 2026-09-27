---
target: ProvaDetail
total_score: 24
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaDetail.jsx"
target_fingerprint: "sha256:7b0681f82d7b47da07c3172a37c6c4f3b8ca5e0dbba888fa69beacd290f51cc7"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaDetail.jsx
timestamp: 2026-09-27T15-36-51Z
slug: src-pages-provadetail-provadetail-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser evidence)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | No "11 de 17"; no aria-current on active sidebar link |
| 2 | Match System / Real World | 3 | Questions in tu; lists typed as "•" |
| 3 | User Control and Freedom | 3 | Back link 22px |
| 4 | Consistency and Standards | 2 | "Texto em preparação" vs "O conteúdo… está a ser preparado"; Seguinte indented on phones |
| 5 | Error Prevention | 3 | Sidebar doesn't mark provas without text |
| 6 | Recognition Rather Than Recall | 2 | Sidebar shows only the current group |
| 7 | Flexibility and Efficiency | 2 | Phone: whole menu before text |
| 8 | Aesthetic and Minimalist Design | 3 | ~110ch lines; inert empty state |
| 9 | Error Recovery | 2 | Empty state dead end |
| 10 | Help and Documentation | 2 | No word on how a prova is completed |
| **Total** | | **24/40** | **Acceptable** |

Specificity: generic docs template in secção colours. Detector: CLI clean; browser low-contrast (Lobitos sidebarTitle 4.37:1, real), kicker-above-heading (design call), cramped-padding (footer, out of scope).

Priority issues:
- [P1] Phone: sidebar (order 0) pushes article to 834–917px on 844px screen. adapt.
- [P1] Fake lists ("•"/"N." in <p> with <br>, ProvaDetail.jsx:125-133); 104–116ch lines. typeset.
- [P2] A11y/touch: Lobitos sidebar title 4.37:1; no aria-current; unnamed prev/next nav; no focus/announce on navigation; no coarse block (back 22px, sidebar 40px); number runs into title. harden.
- [P2] Empty state dead end + wording mismatch; sidebar has no "em preparação" marker. clarify.
- [P3] Only one group visible in sidebar. clarify.

Minor: h1 text-shadow on yellow; Lobitos nav borders ~1.4:1; label repeated; empty-state text 18px; no press on sidebar links.
