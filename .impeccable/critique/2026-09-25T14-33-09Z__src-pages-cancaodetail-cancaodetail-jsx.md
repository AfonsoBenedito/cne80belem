---
target: CancaoDetail
total_score: 28
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/CancaoDetail/CancaoDetail.jsx"
target_fingerprint: "sha256:b83593e1ef4033e7f19e519e2235d63e552fdd352d3acbaf4bfda971fca8bbf6"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/CancaoDetail/CancaoDetail.jsx
timestamp: 2026-09-25T14-33-09Z
slug: src-pages-cancaodetail-cancaodetail-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Transposed key only in the sidebar on desktop; capo badge doesn't follow the key |
| 2 | Match System / Real World | 3 | Chorus marked only by green bold; capo + Tom ambiguous |
| 3 | User Control and Freedom | 3 | Transposition carries over to the next song (semitones not reset on slug change) |
| 4 | Consistency and Standards | 2 | Diagram titles "Dm" while the chord reads "Rém"; two toggle styles side by side |
| 5 | Error Prevention | 3 | Lyrics jump 60–76px when adding the song or transposing |
| 6 | Recognition Rather Than Recall | 3 | Tom and Dó Ré Mi under the video on desktop, away from Acordes |
| 7 | Flexibility and Efficiency | 2 | No text size, keep-awake or auto-scroll; repeated choruses printed in full |
| 8 | Aesthetic and Minimalist Design | 3 | 7–8 controls above the first lyric on a phone |
| 9 | Error Recovery | 3 | Clear report/PDF errors; report can't say which verse |
| 10 | Help and Documentation | 2 | Diagram has no legend (no ○, no fingers); capo unexplained |
| **Total** | | **28/40** | **Good** |

## Design Specificity Verdict
Behaviour authored for this songbook (syllable chords, capo, Tom, Dó Ré Mi, tags back to the list, the group's own recording on tap); the frame around the lyrics is generic. Detector: CLI clean; browser: diagram shape arrows 20×20 on touch (real), thin border + wide shadow on the popup (minor), footer inputGroup and popup-over-Tom occlusion false positives. No console errors, no overflow, 25–28 tab stops, chord tap areas ~27px, only low contrast is the header wordmark (3.83:1).

## Priority Issues
1. [P1] Chord diagram ignores Dó Ré Mi: ChordDiagram gets only transposedChord. Pass the display name; add ○ open strings and an SVG text alternative. /impeccable harden
2. [P1] Transposition carries over to the next song (only sourceOverride resets on slug). Reset semitones on slug change. /impeccable harden
3. [P1] Arm's-length reading on phones: lyrics 14px, chords in the chorus green. 16px+ lyrics, A−/A+ remembered, "Refrão" marker instead of green. /impeccable typeset
4. [P2] Reading settings mixed with actions; lyrics jump on add/transpose. One "play" bar; reserve reset space; count inside the add button. /impeccable distill
5. [P2] Capo and key don't reconcile. "Tom: C (soa Mi♭ com capo 3)". /impeccable clarify

## Persona Red Flags
- Casey: 14px lyrics; no keep-awake; diagram covers the current line; 20px diagram arrows; repeated choruses; FAB over line ends.
- Sam: silent diagram SVG; chorus by colour only; Tom/Dó Ré Mi after lyrics+recording in tab order on desktop; key change not announced.
- Jordan: capo unexplained; no diagram legend; PDF vs Adicionar unclear; "Sim"/"Mim" read as words.

## Minor Observations
- Onde Deus Te Levar defaults to TikTok; disabled "Canção" field in the report form; Anterior/Seguinte cards unbalanced; divider left alone when the Tom bar wraps ~390px; empty right half of the desktop lyrics panel; popup border + wide shadow.

## Questions to Consider
- A phone "modo roda" (large type, screen on, chorus collapsed after first)?
- Recording beside the lyrics, or a separate "learn" mode?
- A visible "Refrão" marker instead of brand green?
