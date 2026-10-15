---
target: Descarregar todas em PDF
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/components/ProvasPdfButton/ProvasPdfButton.jsx"
target_fingerprint: "sha256:76357b7d67b66a9ca180b0c9e762949daebe754641187b05754e62b099a669f5"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/components/ProvasPdfButton/ProvasPdfButton.jsx
timestamp: 2026-10-15T16-56-17Z
slug: src-components-provaspdfbutton-provaspdfbutton-jsx
---
# Critique: "Descarregar todas em PDF" (ProvasPdfButton + generateProvasPdf)
Method: dual-agent. 25/40: H1 2, H2 3, H3 3, H4 2, H5 2, H6 3, H7 2, H8 3, H9 2, H10 3.
Specificity: PDFs authored (secção band, checklist cover, prayers whole, imposition right); the control is generic (white pill + dropdown, no "está pronto").
Detector: 0 in ProvasPdfButton/ and Provas/; live: menu thin-border + wide-shadow (target, taste), kicker in hero + footer findings (out of scope). axe: 0 in control.
Priority issues:
1. [P1] Placeholder provas take whole pages (Exploradores 9/23) -> omit from all-provas PDF, gray "em preparação" on cover, page count in options. /impeccable distill
2. [P1] "tenta outra vez" can't succeed (failed dynamic import cached; dev) -> offer reload. /impeccable harden
3. [P1] No busy/success announcement; Tab out leaves menu open -> aria-busy, min 600ms, role=status ready line with print steps, close on focusout. /impeccable harden
4. [P2] Booklet text 8.6pt (s 0.82) -> body >=10pt in A5, captions >=7pt. /impeccable typeset
5. [P2] Splits: Caçadas/Covil across pages, Horizontal mid-sentence column, every prova a new page -> keep small terms together, let short provas share in Horizontal. /impeccable layout
Personas: Chefe printing booklet (placeholders, small type, no print instructions in file); parent on phone (menu not file, silent download, duplicate); screen reader (busy/done not announced, menu open behind).
Minor: trigger label vs menu; ragged phone stack; option names merge tip; error strip full width; 2.54MB images; empty cover space.
