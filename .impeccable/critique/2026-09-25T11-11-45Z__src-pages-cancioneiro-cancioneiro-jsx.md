---
target: Cancioneiro
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Cancioneiro/Cancioneiro.jsx"
target_fingerprint: "sha256:2fe742d74d2d1116972768e8d090eadf5eb02c6ec37e169cd28dbddac43243d1"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Cancioneiro/Cancioneiro.jsx
timestamp: 2026-09-25T11-11-45Z
slug: src-pages-cancioneiro-cancioneiro-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Adding songs is well signalled; "Descarregar PDF" ends with no success state |
| 2 | Match System / Real World | 3 | Tom, Capo, Momentos fluent; "Esconder acordes" styled as an "on" state |
| 3 | User Control and Freedom | 4 | Undoable "Retirar todas", URL filters survive Back, empty state offers exits |
| 4 | Consistency and Standards | 2 | Song page mixes three button looks; two identical switches mean different things |
| 5 | Error Prevention | 3 | Dead chips inert, double taps guarded; builder title is placeholder-only |
| 6 | Recognition Rather Than Recall | 3 | Filter button icon-only everywhere |
| 7 | Flexibility and Efficiency | 3 | A–Z, deep links, add-from-list; prev/next ignore the filtered set |
| 8 | Aesthetic and Minimalist Design | 2 | No-results shows 16 zero chips above the message; ~800px of chrome above lyrics on phone |
| 9 | Error Recovery | 3 | Empty state and PDF errors name cause and recovery |
| 10 | Help and Documentation | 3 | In-place format hint; row "+" not explained until the builder opens |
| **Total** | | **29/40** | **Good** |

## Design Specificity Verdict
Behaviour is authored for this songbook (key badge first, Mass moments, capo, Dó Ré Mi, folded booklet, pt-PT voice); the look is category-generic (white panel, pills, gray toolbar), with little of DESIGN.md's "Caderno de Campo". The song page reads as a generic lyrics site. Detector: 0 CLI findings, no advisories; browser overlay 2 cramped-padding false positives (.builderBtn has min-height 44px; footer .inputGroup) and an expected column-overflow on the song page. No console errors, no overflow, all touch targets 44px.

## Priority Issues
1. [P0] Phone song page buries the lyrics: .sidebar order:-1 puts video, Tom bar and tags above the song; first lyric ~815px in an 844px viewport. Fix: lyrics first; one compact control bar (Acordes, Tom −/+, Dó Ré Mi) under the title; video/tags after the lyrics. /impeccable layout, then adapt.
2. [P1] Phone filters and empty state crowd out results: open panel pushes the list off-screen, no "Mostrar N canções" close; no-results shows 16 zero chips above the message. Fix: sticky "Mostrar N canções" that closes the panel; message above/instead of the panel when empty. /impeccable distill.
3. [P1] FAB covers the row "+" column on phones. Fix: hide or offset the FAB on Cancioneiro routes ≤768px, or bottom padding + move it. /impeccable adapt.
4. [P2] 19 A–Z tab stops before the first song on desktop. Fix: alphabet after the list in DOM, or roving tabindex; skip link. /impeccable harden.
5. [P2] Builder ends flat and has ambiguous controls: no success moment after download; Acordes vs Dó Ré Mi switches look alike; title/description placeholder-only labels. /impeccable delight + clarify.

## Persona Red Flags
- Casey: lyrics below the fold; 14px lyrics/10.4px chords with no size control; FAB over "+"; search placeholder truncates to "Procurar pelo títu".
- Sam: 19 A–Z tab stops; row add button always labelled "Adicionar" (relies on aria-pressed); song-page add/remove not announced; FaArrowLeft/FaGuitar lack aria-hidden; "Esconder acordes" has no aria-pressed.
- Jordan: icon-only filter button; row "+" doesn't say what it adds to; "Faz o teu Cancioneiro" doesn't say PDF; two PDF paths on the song page unexplained.

## Minor Observations
- Search width shifts when filter count/builder badge appear.
- "Secção" group shows only "Lobitos 1"; hide single-chip groups.
- 8 Missa songs have no moment tag (content gap).
- Row meta repeats "Missa" after the moment.
- Subtitle orphans "caminho." at 390px (text-wrap: balance).
- Song page left-aligned 1200px vs list centred ~640px.
- Formspree subject still says "Sugestão de música".
- Header wordmark 3.83:1 (logotype exemption; brand decision pending).

## Questions to Consider
- Should a phone "modo fogueira" exist: large type, controls at the bottom, screen kept awake, swipe to the next song in your songbook?
- Should the builder be a page with a live PDF preview, so the flow's peak is visible?
- Why doesn't the builder inherit the list's active filters?
