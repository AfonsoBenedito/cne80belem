---
target: home
total_score: 22
max_score: 32
na_heuristics: 10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Home/Home.jsx"
target_fingerprint: "sha256:0258585b346c7aaa6033ac8edabc01aa81da3a23d98b9185a065a00f7b20e137"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/Home/Home.jsx
timestamp: 2026-09-24T14-21-28Z
slug: src-pages-home-home-jsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score (8 heuristics scored, /32)
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Carousel progress pill is excellent; FAB silently switches email → back-to-top at 300px |
| 2 | Match System / Real World | 2 | "I Secção – Lobitos" insider labels, no ages anywhere; "Inscreve-te" lands on generic contacts |
| 3 | User Control and Freedom | 3 | Pause, swipe, Esc all work; no skip link (8 Tab stops before hero CTA) |
| 4 | Consistency and Standards | 2 | Name repeated header→hero; yellow twice in viewport (One Yellow Rule); h1→h4 heading skip |
| 5 | Error Prevention | 3 | Newsletter well guarded; FAB fires mailto: (dead on devices without mail app) |
| 6 | Recognition Rather Than Recall | 2 | Desktop gallery captions hidden until hover; no section heading |
| 7 | Flexibility and Efficiency | 2 | No shortcuts for returning members (Programa, Provas, Cancioneiro 2 taps deep) |
| 8 | Aesthetic and Minimalist Design | 2 | Minimal by thinness, not editing — generic copy, redundant hero title |
| 9 | Error Recovery | 3 | Specific pt-PT errors, email preserved |
| 10 | Help and Documentation | n/a | Persuade surface; onboarding covered under H2 |
| Total | | 22/32 (69%) | Acceptable (edge of Good) |

## Design Specificity Verdict: FAIL
Hero carousel + welcome paragraph + photo grid + footer is category-interchangeable; nothing says scouting (no secções ladder, ages, Promessa, rhythm), the cancioneiro (the product's differentiator) is absent, "O Caderno de Campo" not expressed on this surface. Detector: exit 0, 8 advisories (4 photo scrims/text-shadows intentional; 3 off-ramp carousel subtitle/title sizes real-minor; 1 hamburger 2px radius trivial). Browser overlay: 1 real finding on desktop+phone, skipped-heading (h1 → h4, no h2).

## Priority Issues
1. [P1] Home never answers "what is this, and is it for my child?" — add a secções band (4 cards, section surface colours, age ranges, link) + a 3-step "Como entrar" ending in Inscreve-te. /impeccable shape → layout → clarify
2. [P1] Cancioneiro invisible on Home — add a tool band with a real chord snippet + search + PDF builder entry. /impeccable bolder (+ delight)
3. [P1] Hero repeats the header name and breaks The One Yellow Rule (yellow subtitle + yellow pill) — value-statement h1, name as small label, subtitle out of yellow, anchor copy off faces. /impeccable typeset → quieter
4. [P2] Gallery unlabeled, no h2, page has no ending — h2 "Últimas aventuras" + "Ver todas", captions/dates at rest, exclude hero-duplicate photos, closing band. /impeccable layout
5. [P2] Nav overload: 7 top-level items / 27 destinations, no skip link — group secções, promote Cancioneiro, skip link, short labels. /impeccable distill

## Persona Red Flags
Jordan (new parent): section labels meaningless, no ages/schedule/cost/leaders, Inscreve-te → contacts page, FAB mailto may do nothing, desktop gallery unlabeled.
Casey (mobile): FAB sits on the 2nd gallery tile in the thumb zone and flips meaning while scrolling; no bottom CTA in thumb reach.
Riley (stress): 2-line caption clamp loses meaning ("…prepara ACAGRUP 2026 no…"); sparse grid with few news; h4-only outline breaks screen-reader heading nav; landscape phone gets desktop 3-up grid.

## Minor Observations
Welcome copy abstract; footer yellow Subscrever = second yellow moment; desktop footer columns leave a gap; gallery hover uses 0.3s literal not tokens, 12px radius hardcoded; Notícias CTA at 85% white reads disabled over bright photos; carousel alt text generic.

## Questions to Consider
- What one sentence should a parent remember after one scroll — and why is it currently the name they already read in the header?
- What if a song with chords were the second thing on the page?
- Could "field notebook" be the structure — next activity, last adventure, song of the month?
