---
target: home
total_score: 23
max_score: 32
na_heuristics: 9,10
p0_count: 0
p1_count: 1
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Home/Home.jsx"
target_fingerprint: "sha256:0be91c7c5b3c023ec6b45d56af465dbb0d873770e21972e8c00722c141568eca"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Home/Home.jsx
timestamp: 2026-09-24T15-02-58Z
slug: src-pages-home-home-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score (8 heuristics scored, /32)
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Carousel pill/held state clear; newest news is 28 Mar (6 months old) — "is the group active this season?" |
| 2 | Match System / Real World | 3 | Warm pt-PT scout voice; Promessa, Covil/Cabana/Abrigo/Base unexplained for new parents |
| 3 | User Control and Freedom | 3 | Pause/swipe/dots/skip link work; FAB silently switches mailto → back-to-top |
| 4 | Consistency and Standards | 2 | "Inscreve-te" ×2 + "Ver contactos" all → /contactos (label oversells); FAB is a third contact route; footer shows two yellows |
| 5 | Error Prevention | 3 | Empty song search routes sensibly; mailto FAB fails silently without a mail client |
| 6 | Recognition Rather Than Recall | 3 | Ladder puts ages in view; Secções menu repeats Secção/Provas/Programa/Fotos ×4 unexplained |
| 7 | Flexibility and Efficiency | 3 | Search → results, ?montar=1 → builder; no member shortcut to programa/provas on Home |
| 8 | Aesthetic and Minimalist Design | 3 | Calm, on-token; welcome paragraph is filler; news grid outweighs the join block |
| 9 | Error Recovery | n/a | No error-bearing flow exercised on Home |
| 10 | Help and Documentation | n/a | Persuade surface (missing parent FAQ covered under Jordan) |
| Total | | 23/32 (72%) | Good |

## Design Specificity Verdict: PASS (narrowly)
AgeLadder (proportional 6→22 ruler in section colours) and CancioneiroBand (real chorus with chords) are unmistakably this group's. Hero, welcome paragraph, news grid and 3-step block remain category-generic; "O Caderno de Campo" isn't expressed outside the two signature modules. Detector: CLI exit 0, 4 advisories (3 intentional photo shadows, 1 hamburger 2px radius false positive). Overlay: 0 anti-patterns desktop + phone (skipped-heading fixed). CLS 0.0007, no console errors, focus visible at every stop.

## Priority Issues
1. [P1] Parent conversion path lacks concrete facts and the CTA oversells — Inscreve-te/Ver contactos all land on /contactos; no start time, enrolment period or cost. Fix: real facts line + honest CTA label. /impeccable clarify (needs user's real data)
2. [P2] News freshness — newest story 6 months old with a future-tense title; 2nd story thumbnail near-duplicates hero slide 1. /impeccable harden (+ content)
3. [P2] Persuasion order — news before the ladder, page ends on the cancioneiro tool rather than the invitation (both deliberate choices; worth revisiting). /impeccable layout
4. [P2] FAB redundant/ambiguous — mailto on load, back-to-top after 300px, covers text on phone. /impeccable distill
5. [P3] Details — chorus set entirely in green so chords and lyrics barely separate; footer two yellows (One Yellow Rule); cancioneiro columns not top-aligned; mobile footer tab order ≠ visual order; 22 tick hard to read at the Caminheiros bar end. /impeccable polish

## Persona Red Flags
Jordan: insider terms (Promessa, Covil…), no time/cost/what-to-bring/leaders, Inscreve-te → contacts page, stale news.
Casey: FAB over text in thumb zone; mobile Secções expands to 20 rows pushing Contactos down; vertical ladder ~1.5 screens.
Riley: stale future-tense news; duplicate hero/news photo; featured song hardcoded (band loses its song if slug removed); mobile footer tab order.

## Minor Observations
Hero copy grazes a face at slide 1's left edge on desktop; schedule line (most useful parent fact) is small body text; "Conhecer a secção" repeats ×4; join photo has no context; lead paragraph repeats the hero subline.

## Questions to Consider
- Does a parent reading the first viewport and the ladder know when to show up?
- Is Home three sites (recruiting brochure, member bulletin, songbook tool) — and should returning members get a faster path?
- What would make it an unmistakable caderno de campo — a dated log of last Saturday, a map of the sede, a leader's note?
