---
target: Lightbox in NoticiaDetail
total_score: 24
max_score: 32
na_heuristics: 9,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/NoticiaDetail/NoticiaDetail.jsx#Lightbox"
timestamp: 2026-10-07T12-33-15Z
slug: src-pages-noticiadetail-noticiadetail-jsx-lightbox
closed: true
---
Method: dual-agent (A: design review sub-agent · B: detector + puppeteer sub-agent). Mode: Experience.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | System status | 3 | Counter announced; nothing shows the next photo during a drag |
| 2 | Real world match | 3 | No swipe-down close, no pinch zoom, Back leaves |
| 3 | User control | 2 | Phone Back leaves the article (no history entry) |
| 4 | Consistency | 3 | Edge drag silently loops; release motion differs from drag |
| 5 | Error prevention | 3 | Commit from net distance/average speed: a reversed drag can still change photo |
| 6 | Recognition | 3 | Swipe never hinted on phones |
| 7 | Flexibility | 3 | Keys, strip, swipe; no zoom or swipe-to-close |
| 8 | Minimalism | 3 | Chrome never hides; landscape phone bars take 43% of height |
| 9 | Error recovery | n/a | No error states (no input, local photos) |
| 10 | Help | n/a | Experience surface |
| **Total** | | **24/32** | **Good** |

## Design Specificity Verdict
LLM: mostly generic viewer (black, counter, round close, chevrons, strip); site touches are the yellow active ring, pt-PT labels, solid near-black. Chrome doesn't recede; no captions.
Detector: CLI 0 findings; browser 4 runs, 3–4 findings each, none inside the dialog (hero title/time contrast false positives, footer newsletter padding, page layout overflow measurement). Measurements: all controls ≥44px, counter 19.8:1, focus trapped and ordered, scroll locked, no errors.

## What's Working
- Dialog basics: focus in/trap/return, Escape, scroll lock, modifier keys ignored.
- Clean layout: nothing on the photo, thumb-zone controls, edge-to-edge phone photo, ~81% height on desktop.
- Neighbour preload; reduced-motion fade.

## Priority Issues
- [P1] Swipe hand-off breaks the gesture: single img, black beside the photo while dragging, on release the photo vanishes and the next fades in from the opposite side; velocity discarded; edge drag loops without resistance; commit uses net distance/average speed. Fix: prev/current/next track, release velocity, spring to ±width carrying velocity, rubber-band ends. /impeccable animate
- [P1] Phone Back leaves the article. Fix: pushState on open, close on popstate, close/Escape/backdrop call history.back(). /impeccable harden
- [P2] Landscape phone photo is tiny (222px) because desktop chrome applies at 844×390. Fix: max-height:500px block hides strip, drops padding, overlays or auto-hides chrome. /impeccable adapt
- [P2] Tapping the hero photo on phones mostly does nothing (13% of the hero opens it vs 83% desktop): heroInfo and its ::before shade cover it. Fix: pointer-events none on heroInfo/::before, auto on the meta button. /impeccable harden
- [P2] Gestures stop at sideways swipe: pinch zooms the page, no double-tap zoom, no swipe-down close. /impeccable animate

## Persona Red Flags
- Parent on phone: hero tap dead, pinch zooms page, black beside swiped photo, Back leaves, landscape photo tiny.
- Screen-reader user: alt "Foto 2 de 4" duplicates the counter; no captions.
- Edge cases: loop without resistance; reversed slow drag commits; single-photo drag does nothing.

## Minor Observations
- No exit animation; open not anchored to the thumbnail.
- Grabbing mid-enter follows the finger but photo still fading in.
- Tap on photo/bars doesn't close (could toggle chrome).
- Hard-coded z-index 1000.
- Flick has no minimum distance.

## Questions to Consider
- Should controls fade after a moment and return on tap?
- Should the viewer caption the story title and date?
- Loop, or a soft stop at the last photo?
