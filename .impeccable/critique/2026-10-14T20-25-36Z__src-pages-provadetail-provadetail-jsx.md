---
target: Cargos
total_score: 20
max_score: 32
na_heuristics: 5,9
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaDetail.jsx"
target_fingerprint: "sha256:e5d39d05428fbaf84d84cea300a92ea02e217cbb6d4700429dd4a50c963e52ba"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaDetail.jsx
timestamp: 2026-10-14T20-25-36Z
slug: src-pages-provadetail-provadetail-jsx
---
Target: Cargos prova (cargos(seccao) in provasContent.js, rendered by ProvaDetail). Method: dual-agent.
Heuristics: 1:3 2:3 3:3 4:3 5:n/a 6:2 7:2 8:2 9:n/a 10:2 = 20/32 (Acceptable, 63%)
Detector: CLI clean; browser 1 footer false positive; axe 0; no overflow (320, 390, 390@200%); targets ok; 5.8k px at 390 (~7 screens); PDF 4 pages.
Priority:
- [P1] PDF: page 3 holds one bullet (Socorrista's last), Animador pushed to p4; p1 ~20% blank. /impeccable harden
- [P1] No overview/wayfinding over 9 identical sections; no intro on what a cargo is. Fix: badge grid (funcoes) linking to anchored sections, short intro only if the user supplies copy. /impeccable layout
- [P2] Badge tile far right of text on desktop; full row on phones (~900px); six cargo scans are 60px (soft at 2x). Fix: badge beside the h2. /impeccable layout
- [P2] "Ao X compete:" same weight as body; duties not signposted. Fix: small bold label tight to list. /impeccable typeset
- [P3] Alt "Insígnia de X" repeats the heading. Fix: alt="" (heading names it). /impeccable polish
Minor: single-item lists (Sub-Guia, Animador) thin; Guia paragraph is adult language (approved copy); no closing.
