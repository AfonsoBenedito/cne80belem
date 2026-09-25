---
target: BancoDeFardas
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:/Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/BancoDeFardas/BancoDeFardas.jsx"
target_fingerprint: "sha256:01101ed74a06fde3be8a0053af564782d9f4a8e5e3e68463682445f50b55b929"
target_path: /Users/afcoelho/Desktop/Personal Projects/cne80belem/src/pages/BancoDeFardas/BancoDeFardas.jsx
timestamp: 2026-09-25T15-52-18Z
slug: src-pages-bancodefardas-bancodefardas-jsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Update date is small grey text, six months old, no staleness hint |
| 2 | Match System / Real World | 3 | CNE vocabulary; children's shirts in XS–XL; "10.5(37-39)" squeezed |
| 3 | User Control and Freedom | 3 | Category not in the URL |
| 4 | Consistency and Standards | 2 | "Distribuição" speaks only of fardas; switch highlight misaligned with its buttons |
| 5 | Error Prevention | 2 | No donation condition or exclusions stated |
| 6 | Recognition Rather Than Recall | 2 | Finding a size means scanning every card |
| 7 | Flexibility and Efficiency | 1 | No size/secção filter, no deep link, no pre-filled request email |
| 8 | Aesthetic and Minimalist Design | 2 | ~80 bold green zeros are the loudest thing on the page |
| 9 | Error Recovery | 2 | Empty state offers no next step |
| 10 | Help and Documentation | 3 | Clear steps; no amount for "valor simbólico", no hand-over time/place |
| **Total** | | **22/40** | **Acceptable** |

## Design Specificity Verdict
Content is CNE-specific (per-secção lenços/jarreteiras, EU sock sizes); the design is a generic donation template. Detector: CLI clean; browser only the footer inputGroup false positive. No console errors, no overflow, clean headings, ~53KB images, 44px targets on phones, contrast passes (hero and switch hand-checked). Real defect: switch slider is a fixed 50% pill over content-sized buttons (BancoDeFardas.module.css:118–128). Correction: "Sem stock" is valid pt-PT.

## Priority Issues
1. [P0] Empty inventory renders as 20 "SEM STOCK" cards and ~80 zeros. Fix: one honest empty state with a "Doar peças" action and an "o que aceitamos" strip; with stock, hide zero sizes and sort empties last. /impeccable onboard, /impeccable distill
2. [P1] Donation path buried and vague (email ~4000px down on phones, no where/when/condition). Fix: "Doar" block near the top with facts and pre-filled mailtos (donate, request a size). Needs facts from the user. /impeccable clarify, /impeccable onboard
3. [P1] No way to find a size. Fix: size chips filtering available items; compact list on phones. /impeccable layout
4. [P2] Zeros styled loudest; switch highlight misaligned. Fix: grey 0s; equal-width switch buttons or slider sized to the active one. /impeccable polish
5. [P2] Nothing recognisably this group. Fix: "farda por secção" explainer in section colours; a real photo hero. /impeccable bolder, /impeccable shape

## Persona Red Flags
- Parent donating on a phone: text before action; action ~4000px down; no when/where; unclear what's wanted.
- Sam: 20 identical "Sem stock" stops; announcement omits availability; step order lost; email button named only by address.
- Jordan: no farda composition; compulsory vs optional unclear; no price; no pointer to CNE sale.

## Minor Observations
- Inconsistent photo treatment; one update date would do; size rows don't align; mixed pill/rectangle shapes; switch labels wrap at 390px; FAB duplicates the CTA; empty .page {} rule.

## Questions to Consider
- Should the page's main job be collecting donations while the bank is empty?
- Replace the inventory with "tell us the size you need"?
- One assembled farda per secção instead of a grid of loose parts?
