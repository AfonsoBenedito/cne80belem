---
target: Personagens do "Livro da Selva"
total_score: 22
max_score: 36
na_heuristics: 5
p0_count: 0
p1_count: 2
target_identity: "url:http://localhost:5173/cne80belem/seccao/lobitos/provas/adesao-seccao-1"
timestamp: 2026-10-15T16-26-23Z
slug: lem-seccao-lobitos-provas-adesao-seccao-1-57065f9b
closed: true
---
# Critique: Personagens do "Livro da Selva" (Lobitos, adesao-seccao-1)
Method: dual-agent. Score 22/36 (heuristic 5 n/a): H1 3, H2 3, H3 3, H4 3, H6 2, H7 2, H8 3, H9 1, H10 2.
Specificity: mostly authored (manual's cartoons beside its words, names in bold ink, phone float); generic part: ten identical framed tiles in one column read as a catalogue; the manual alternates sides, no frames.
Detector: 0 in ProvaDetail/; 9 design-system-color advisories in provasMedia/provasContent (losangos, Bandos swatches) = false positives; in-page: footer inputGroup cramped-padding (false positive); axe: header brand name only (logotype).
Priority issues:
1. [P1] Manual's question "Conheces as Personagens mais importantes do 'Livro da Selva'" missing -> restore verbatim as lead. /impeccable clarify
2. [P1] A failed image leaves a broken-image glyph + clipped alt in a framed tile -> onError, collapse tile/float. /impeccable harden
3. [P2] Phone drawings 36-54px in a 4rem tile -> ~5.5-6rem or no padding. /impeccable adapt
4. [P2] Catalogue column, empty desktop rows -> alternate sides on wide screens, drop frames, align text to tile top. /impeccable layout
5. [P3] PDF two pages, p2 two-thirds empty -> 14mm box, tighter rows, aim for one page. /impeccable optimize
Personas: child on phone (230 words before first animal, tiny Maugli); Chefe printing (2 pages, soft scans); screen reader (names twice, no headings).
Minor: soft on 2x (source limits); intro 82 chars/line on desktop; name ink 4.77:1; straight quotes in the title.
