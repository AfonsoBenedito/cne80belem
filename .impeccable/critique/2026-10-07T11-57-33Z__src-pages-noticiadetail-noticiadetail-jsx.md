---
target: NoticiaDetail
total_score: 27
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/NoticiaDetail/NoticiaDetail.jsx"
target_fingerprint: "sha256:859546983744aa91800b0864acd6bb877681a2db2de114fe747f18c3da130cec"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/NoticiaDetail/NoticiaDetail.jsx
timestamp: 2026-10-07T11-57-33Z
slug: src-pages-noticiadetail-noticiadetail-jsx
closed: true
---
Method: dual-agent (A: design review sub-agent · B: detector + puppeteer browser sub-agent)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Live counter, yellow current thumb, focus rings; lazy thumbs show no placeholder |
| 2 | Match System / Real World | 3 | pt-PT dates and «»; scout terms (Alcateia 16, Fogo de Conselho) unexplained for families |
| 3 | User Control and Freedom | 3 | Escape/close/backdrop/focus return all work; "Todas as notícias" only at the top |
| 4 | Consistency and Standards | 3 | Badge matches list; body column left-hugs while page chrome is centred |
| 5 | Error Prevention | 3 | Modified arrows ignored, swipe-end tap doesn't close |
| 6 | Recognition Rather Than Recall | 3 | "Instagram 1–4" doesn't say what each post is |
| 7 | Flexibility and Efficiency | 3 | Arrows, strip, swipe; a photo can't be linked |
| 8 | Aesthetic and Minimalist Design | 3 | Calm, but half the desktop width is blank |
| 9 | Error Recovery | 3 | Real 404 with title + noindex; no latest notícias offered |
| 10 | Help and Documentation | n/a | No task needing help text on an article |
| **Total** | | **27/36** | **Good** |

## Design Specificity Verdict
LLM: carefully made but structurally a stock blog template; scout identity lives in details (secção badge colours, «», Nunito/CNE greens). No activity facts (date, place, secção ages), badge not a link, photos of kids are 130px thumbnails.
Detector: CLI 0 findings (file and dir). Browser (6 runs incl. viewer open): 3 identical findings, all false positives for this page — h1 and <time> "1:1 white on white" (photo + scrim invisible to detector; measured worst case passes except top line of very long titles on phones, ~2.7:1 at 390px on a pure-white photo), footer newsletter cramped-padding (out of scope, intended flush pair).

## What's Working
- Photo viewer: 1:1 swipe with threshold/flick, neighbour preload, full modal behaviour, directional slide / reduced-motion fade, thumb-reach controls.
- Reading typography: 60ch measure, distinct lede, pt-PT «» quotes.
- Honest edge states: real 404 with noindex, contrast-checked secção badges, decorative alt, real buttons.

## Priority Issues
- [P1] Desktop hero crops out the subject (min-height 400px full-width strip, object-position center 30%): child cut out on acagrup, forehead only on promessas. Fix: per-story coverPosition and/or taller or width-capped hero on wide screens; check every cover at 1440. /impeccable layout
- [P1] Article ends in a dead end: no next story, secção link, join action or bottom back link. (User earlier chose to leave the ending as is.) /impeccable onboard
- [P2] One-photo stories can't show their photo whole (no viewer when photos.length == 1). Fix: hero opens viewer or photo shown once at its proportions. /impeccable harden
- [P2] Half of the desktop width is blank (576px column at x=144). Fix: centre the column, or use the right side for a sticky facts block and a wider gallery at ≥1024px. /impeccable layout
- [P2] Social links "Instagram 1–4" are guesses. Fix: per-link labels in config, or one "Instagram (4 publicações)". /impeccable clarify

## Persona Red Flags
- Prospective parent on phone: Lobitos story's only image is a cropped adult selfie; terms unexplained; badge not tappable; no next step at the end; future-tense ACAGRUP story reads stale in October.
- Screen-reader user: viewer alts are only "Foto N de M"; no captions.
- Returning member: no next/previous story; photos not linkable.

## Minor Observations
- Viewer 0.96 backdrop shows the page faintly (computed value confirmed earlier this session; on purpose but could be solid).
- Cover is also photo 1 of the gallery; carousel photos reused across stories (content).
- Lede repeats the excerpt on some stories.
- Phone spacing between hero, back link and text could be tighter.
- Long-title top line on phones can drop below 3:1 on a bright photo.

## Questions to Consider
- Why are the photos thumbnails under the text instead of beside the paragraphs they illustrate?
- What should a parent do after reading a Lobitos promise story?
- Should a notícia carry its facts (date, place, secção, ages) as data, like a logbook entry?
