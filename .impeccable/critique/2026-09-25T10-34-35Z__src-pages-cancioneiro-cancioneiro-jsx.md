---
target: Cancioneiro
total_score: 20
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Cancioneiro/Cancioneiro.jsx"
target_fingerprint: "sha256:057c2a5137971bdf5dee995b40d04f87f12aeaba93315f3db5c99266e437e94b"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Cancioneiro/Cancioneiro.jsx
timestamp: 2026-09-25T10-34-35Z
slug: src-pages-cancioneiro-cancioneiro-jsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Result count is screen-reader only; on phones the list sits below the fold after filtering |
| 2 | Match System / Real World | 2 | Mass-structured tags are right, but search is title-only (no first line or author); "Livro" etc. unexplained |
| 3 | User Control and Freedom | 3 | Clear filters, Escape, clear search all work; filters not in the URL |
| 4 | Consistency and Standards | 2 | Index is a centred 640px column, the song page a 1200px layout; song-page tags are inert text |
| 5 | Error Prevention | 2 | "Final" chip returns 0 songs; AND-combined tags make "Entrada + Comunhão" always empty; escutismo (4) and lobitos (1) tags have no chip |
| 6 | Recognition Rather Than Recall | 2 | Title-only rows; builder picker has no filters, so a Mass booklet means recalling titles (A–Z and tags soften it on the index) |
| 7 | Flexibility and Efficiency | 2 | No A–Z on phones; no "add to songbook" from the list or song page; "Ver Mais" on 34 songs |
| 8 | Aesthetic and Minimalist Design | 2 | Clean but thin: identical music-note icon on 34 rows, 67–78px rows for one line of text |
| 9 | Error Recovery | 2 | "Nenhuma canção encontrada." doesn't name the cause or offer to clear/suggest inline |
| 10 | Help and Documentation | 1 | Builder never explains Livro (booklet fold) or the cover icon; no scope/size of the collection shown |
| **Total** | | **20/40** | **Acceptable** |

## Design Specificity Verdict
Mostly a generic search + card list in CNE green. The song page is authored (positioned chords, tom, solfège, capo); the index hides all of it: each row shows only the title, though all 34 songs carry a key and tags, 31 an author and 3 a capo. Deterministic scan: CLI clean for Cancioneiro and SongbookBuilder; in-page detector found nothing in the page, filters or either modal (one footer cramped-padding finding, known false positive; one body dark-glow caused by the detector's own overlays).

## Priority Issues
1. [P1] List rows carry no information scent: title only. Fix: key badge instead of the note icon, capo when set, one or two occasion tags, author; search first line and author too; denser rows. Command: /impeccable clarify then /impeccable layout.
2. [P1] Filters mislead the main Mass-prep path: AND within a group, a dead "Final" chip, missing escutismo/lobitos chips, all 14 chips shown at once. Fix: OR within a group / AND across groups, hide or disable empty chips, counts on chips, reveal Momento da Missa under Missa, filters in the URL. Command: /impeccable distill.
3. [P1] The builder can't find songs by purpose and gives no preview: no filters in the picker, no add-from-list, Livro unexplained, no page count, selection lost on close. Command: /impeccable onboard and /impeccable clarify.
4. [P2] Phone field use: first song ~450px down, no A–Z on phones, "Ver Mais" on 34 songs, search scrolls away, toolbar wrap mismatch. Command: /impeccable adapt.
5. [P2] Empty states are dead ends; suggest placeholder "Ex: Irei Ficar" is a song already in the list. Command: /impeccable harden.

## Persona Red Flags
- Jordan: no sense of scope ("34 canções"), funnel icon reads as decoration.
- Sam: result count only announced, never shown; A–Z gone at ≤768px (incl. zoomed desktop).
- Casey: filter top-left (hard thumb reach), search scrolls away, native blue search "×".
- Alex (dirigente): no filters in the builder, no add-from-list, selection lost on accidental close, no preview.
- Scout from another group via Google: song-page tags not links back to "more like this".

## Minor Observations
Toolbar heights mismatch on desktop (34 vs 44px); letters behind "Ver Mais" silently expand the list; song-page tags lowercase raw values; builder header icon differs from its trigger; .filterClear:hover same as rest; colon inconsistency in builder labels.

## Questions to Consider
1. Should the index open with the Mass structure (Entrada → Final) rather than A–Z?
2. What if the index were designed as the contents page of a printed caderno (title, key, first line)?
3. Should "Faz o teu Cancioneiro" be a persistent tray built while browsing, not a modal?
