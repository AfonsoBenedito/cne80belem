---
target: uniforme-e-distintivos-dos-dirigentes
total_score: 21
max_score: 36
na_heuristics: 5
p0_count: 0
p1_count: 3
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaMedia.jsx"
target_fingerprint: "sha256:9f0c472dde8c17a4c98ea45037be9963c459b261e79ee4a04c1190b2744db56b"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/ProvaDetail/ProvaMedia.jsx
timestamp: 2026-10-14T14-36-11Z
slug: src-pages-provadetail-provamedia-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser)

Design Health Score: 21/36 (heuristic 5 n/a: no input on the page)
1 Visibility 3 · 2 Real world 3 · 3 Control 3 · 4 Consistency 2 · 5 Error prevention n/a · 6 Recognition 1 · 7 Flexibility 2 · 8 Minimalist 3 · 9 Recovery 3 · 10 Help 1

Specificity: chrome authored (secção band/ink, sidebar, per-secção data); content zone reads as a gallery of mismatched CNE scans. Detector: 0 findings in ProvaDetail/ProvaMedia; overlay's one cramped-padding hit is the footer newsletter (out of scope); axe 0 violations x8 runs.

Priority issues
[P1] Posters are the lesson but unreadable at phone size and the tap-to-zoom isn't signposted; viewer bar says "1 de 2" without naming the uniform. -> clarify
[P1] Nothing links a badge to its place on the uniform (recognition 1/4). Picture-only fix: tap a badge -> poster opens zoomed on its spot, or numbered dots. -> layout
[P1] Screen readers never learn placements (poster descriptions generic). User declined a placement list (2026-10-14). -> harden (only if owner revisits)
[P2] Scans don't read as one set (grey vs white backgrounds, beige fitas, rasterised Arial table); page ends on the weakest element, the dirigentes table. Normalise badge tiles; redraw table in HTML/SVG; consider order. -> polish
[P3] Grouping: 9 items in "Guias e cargos" (fitas run into cargos); secção insígnias 3+1 on phones; lone Promessa badge; own secção not highlighted. -> layout

Personas: Jordan (title reads "for leaders"; Guia/Sub-Guia differ only by stripe count; Évora example); Casey (no tap cue; badges can't be enlarged; table text ~6px at 390; 3,300px scroll away from posters); Sam (generic poster descriptions).
Minor: completa caption baseline vs etapa names; etapa numbers faint; captions wrap unevenly at 390; double frame on grey posters; posters served same files to phone and desktop.
