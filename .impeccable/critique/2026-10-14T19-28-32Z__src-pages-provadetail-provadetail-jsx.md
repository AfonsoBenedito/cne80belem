---
target: Saudação e o seu significado
total_score: 21
max_score: 32
na_heuristics: 5,9
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaDetail.jsx"
target_fingerprint: "sha256:e85b406b1f866ff2776a29e434798bec0c5709720f766affc2f0fc1624d72d06"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaDetail.jsx
timestamp: 2026-10-14T19-28-32Z
slug: src-pages-provadetail-provadetail-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser)

Heuristics (8 scored, 5 and 9 n/a — read-only page): 1:3 2:3 3:3 4:3 6:2 7:2 8:3 10:2 = 21/32 (Good, 66%→Acceptable/Good border)

Specificity: authored (CNE sheet's drawings and wording, secção colour, distintivos tiles) but staged as a gallery, not a lesson.
Detector: CLI clean (0); browser 1 finding in footer newsletter (cramped-padding, false positive); axe: header wordmark 3.83:1 at 1280 (global, outside page).

Priority issues
- [P1] Hand sign (sinal) renders ~50×112px, noisiest drawing; the one thing to copy. Fix: larger single aside (12–14rem), lightbox on all drawings. /impeccable layout
- [P1] No "how / when" for each saudação; meaning explained after the grid. Fix: move O Sinal Escutista above the grid, or short agrupamento-marked how-to lines. /impeccable clarify
- [P2] Full-body figures are slivers in same-height tiles; Posições have no subheading; dead gap on desktop. /impeccable polish
- [P2] Phones: picture after all text (handshake ~900px below its heading). Fix: picture under heading at ≤600px. /impeccable adapt
- [P3] FAB covers "(com vara)" caption at 390. /impeccable harden

Minor: PDF page 2 holds 7 lines; the six tiles have alt="" (caption only); mixed quote styles; heading wrap at 390.
