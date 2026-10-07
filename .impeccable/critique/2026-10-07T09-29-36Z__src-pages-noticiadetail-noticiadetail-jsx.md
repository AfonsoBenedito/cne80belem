---
target: NoticiaDetail
total_score: 23
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/NoticiaDetail/NoticiaDetail.jsx"
target_fingerprint: "sha256:cb4b0ae66614e9898ebf63f0ae1c284b093a1b628d5b0ebd6b446ad4818a0256"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/NoticiaDetail/NoticiaDetail.jsx
timestamp: 2026-10-07T09-29-36Z
slug: src-pages-noticiadetail-noticiadetail-jsx
closed: true
---
Method: dual-agent (A: design review sub-agent · B: detector + CDP browser sub-agent)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | No "Foto 2 de 4" in lightbox; unknown slug silently redirects to list |
| 2 | Match System / Real World | 3 | Natural pt-PT/CNE copy; formatDate lacks timeZone UTC (list uses it) |
| 3 | User Control and Freedom | 1 | Lightbox: no Escape, no swipe, background scrolls, 20x25px unnamed close |
| 4 | Consistency and Standards | 2 | Lightbox ignores dialog.module.css; badge ignores secção surface/onSurface; hardcoded values |
| 5 | Error Prevention | 3 | Fixed-height hero with overflow hidden clips long titles |
| 6 | Recognition Rather Than Recall | 2 | 5 identical icon links "Instagram 1-4"; "N fotos" is a span with onClick |
| 7 | Flexibility and Efficiency | n/a | Read surface with no repeated task |
| 8 | Aesthetic and Minimalist Design | 2 | Author/date/secção shown 2-3 times (hero meta, author card, dl) |
| 9 | Error Recovery | 1 | Bad slug: no "notícia não encontrada", no suggestion |
| 10 | Help and Documentation | 3 | Self-explanatory; no next step at article end |
| **Total** | | **23/36** | **Acceptable** |

## Design Specificity Verdict
LLM: mostly category-interchangeable. Dark photo hero + pill tag + sidebar card with generic avatar + article grid; CNE identity only from shared chrome and real content. Detail badge is always green-dark while the Notícias list uses each secção's surface/onSurface.
Detector: CLI on JSX clean; on directory 5 advisory CSS findings (heroTitle font-size off-ramp :58, literal text-shadow :61 vs --photo-text-shadow, radius 6px :196 and :323, lightbox rgba(0,0,0,0.9) :254). Missed by CLI: .heroOverlay literal gradient vs --photo-scrim tokens, border-radius 100px vs --radius-pill, literal rem spacing. Browser (headless Chrome via CDP, 4 articles, 1280 and 390): line-length 95-107 chars on body paragraphs (real), h1 → h3 "Galeria" skipped heading (real), h1 low-contrast 1:1 (false positive, white over photo+scrim), footer cramped-padding (false positive, out of scope).

## What's Working
- Typographic lede: larger, 600-weight first paragraph into gray-700 body at 1.85 line height.
- Image pipeline: srcSetFor with sizes, fetchPriority high hero, lazy thumbnails, NewsArticle JSON-LD.
- Graceful single-photo case (no gallery, no "N fotos"); social links meet 44px.

## Priority Issues
- [P1] Phones: article starts ~1032px down behind back link, duplicated author/dl card and gallery. Fix: delete author card (NoticiaDetail.jsx:98-114), order article before sidebar ≤768px, move gallery/links after the text. /impeccable distill, /impeccable adapt
- [P1] Lightbox not a dialog: no role/aria-modal, no Escape/arrows, focus not moved/trapped, unnamed 20x25 close, 75% image under arrows on phones, close over hamburger, no swipe, no scroll lock. Fix: rebuild on dialog grammar, Esc/arrow keys, focus return, body lock, aria labels + live counter, full-width ≤600px, 44px safe-area close. /impeccable harden
- [P1] Fixed-height hero clips long titles; 6rem dead bottom space; faces cropped by default object-position. Fix: min-height + height auto, token padding, text-wrap balance, object-position center 30% or per-article coverPosition. /impeccable harden
- [P2] ~105-char lines (detector agrees) and no reading end. Fix: max-width 68ch, blockquote for quotes, end block with next/related stories + "Queres fazer parte?" to Contactos. /impeccable typeset, /impeccable onboard
- [P2] Consistency: secção badge colours, UTC dates, "N fotos" as button, social group with h2 + text labels + new-window hint, :active press feedback, tokens for literal values, alt="" on decorative hero, h2 for Galeria. /impeccable polish

## Persona Red Flags
- Prospective parent on phone: first screen has no story; cramped lightbox; article ends with no next step.
- Accessibility-dependent user: lightbox can't be escaped, focus behind overlay, unnamed close, "Foto 1-4" alts, "N fotos" not tabbable, "Instagram 1/2/3/4", h1→h3.
- Distracted mobile user: FAB covers gallery thumbnail and lede; close X out of thumb reach over hamburger; back link only at top.

## Minor Observations
- Two stories reuse carousel photos as covers.
- heroMeta opacity 0.85 on photos without scrim token.
- .thumb:hover lacks (hover: hover) guard; lightbox dots lack aria-current.
- ~1000px empty sidebar on desktop below icons.
- JSON-LD image URL basename worth verifying.

## Questions to Consider
- If photos are what families come for, why are they in a 3-up sidebar and a modal?
- What should a parent do after reading? Today the answer is the footer newsletter.
- Why flatten every story to green when the list already shows secção colour?
