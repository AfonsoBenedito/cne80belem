---
name: Agrupamento 80 — Santa Maria de Belém
description: Warm, practical scout-green design system for the CNE Agrupamento 80 website and its field-ready cancioneiro.
colors:
  verde-escutista: "#129648"
  verde-mata: "#0e7a3a"
  verde-profundo: "#0b6630"
  verde-noite: "#0a4d27"
  verde-nevoeiro: "#e8f5ee"
  amarelo-flor-de-lis: "#FFD700"
  amarelo-fundo: "#fff9db"
  branco: "#ffffff"
  preto-tinta: "#1a1a1a"
  cinza-papel: "#fafafa"
  cinza-claro: "#f5f5f5"
  cinza-linha: "#e5e5e5"
  cinza-borda: "#d4d4d4"
  cinza-suave: "#a3a3a3"
  cinza-medio: "#6e6e6e"
  cinza-texto: "#525252"
  cinza-escuro: "#404040"
  cinza-noite: "#171717"
typography:
  display:
    fontFamily: "Nunito, sans-serif"
    fontSize: "clamp(1.6rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Nunito, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Nunito, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Nunito, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Nunito, sans-serif"
    fontSize: "0.65rem"
    fontWeight: 700
    letterSpacing: "0.5px"
rounded:
  line: "2px"
  mark: "4px"
  base: "8px"
  input: "10px"
  card: "12px"
  song-panel: "16px"
  pill: "100px"
  circle: "50%"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  3xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.verde-mata}"
    textColor: "{colors.branco}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.verde-profundo}"
  button-light:
    backgroundColor: "rgba(255, 255, 255, 0.85)"
    textColor: "{colors.preto-tinta}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 2rem"
  chip-filter:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.cinza-escuro}"
    rounded: "{rounded.base}"
    padding: "0.55rem 1.1rem"
  chip-filter-active:
    backgroundColor: "{colors.verde-nevoeiro}"
    textColor: "{colors.verde-mata}"
  badge-section:
    backgroundColor: "{colors.verde-mata}"
    textColor: "{colors.branco}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.7rem"
  card:
    backgroundColor: "{colors.branco}"
    rounded: "{rounded.card}"
  input-search:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.preto-tinta}"
    rounded: "{rounded.input}"
    padding: "0.75rem 1rem"
  nav-link:
    textColor: "{colors.cinza-escuro}"
    rounded: "{rounded.base}"
    padding: "0.5rem 1rem"
---

# Design System: Agrupamento 80 — Santa Maria de Belém

## Overview

**Creative North Star: "O Caderno de Campo"**

This is a scout's field notebook made digital: a working tool first, decorated second. Every surface assumes it may be read on a phone, outdoors, mid-activity — the cancioneiro sung around a fire, the programa checked on a trail. The system is warm and welcoming to the families evaluating the agrupamento, fresh and optimistic like the movement itself, and trustworthy enough to carry the CNE name. Practicality always wins: clarity of type, generous touch targets, and instant feedback outrank any flourish.

The palette is CNE identity worn honestly — Verde Escutista does the wayfinding, Amarelo Flor-de-Lis provides the rare spark, and everything else is quiet paper-and-ink neutrals. Nunito, rounded and friendly at every weight, keeps the voice approachable without losing officialdom. Depth is ambient and restrained: surfaces sit nearly flat at rest and lift only in response to the user.

**Key Characteristics:**
- Tool-first pragmatism: content and controls stay legible in the field, on small screens, in sunlight.
- One green voice: Verde Escutista is identity, wayfinding, and action — used with intent, never as wallpaper.
- Friendly and tactile: pill buttons, soft radii, instant press feedback (`scale(0.97)` on `:active`).
- Ambient depth: 1px hairline borders at rest; shadows appear on hover, overlays, and floating chrome.
- Motion is compositor-friendly and brief (150–300ms). Under `prefers-reduced-motion` nothing moves, but nothing goes dead: colour, border, shadow and opacity changes keep easing at their authored speed, transforms and spatial changes happen at once (so a move-and-fade becomes a plain fade), and keyframe entrances are cut unless a component supplies a still alternative.

## Colors

CNE identity over paper-and-ink neutrals: one confident green, one ceremonial yellow, and a full gray ramp doing the quiet work.

### Primary
- **Verde Escutista** (#129648): the CNE identity green. Large page titles and section headings (≥24px, or ≥18.66px bold), the header wordmark, icons, borders, focus rings. At 3.83:1 it fails AA for small text in either direction, so it never carries small text or sits behind it.
- **Verde Mata** (#0e7a3a): the working green. Small green text (links, nav hover, chips, labels) and every fill that carries white text — primary buttons, the FAB (except over the footer, where it turns white), section badges (5.44:1).
- **Verde Profundo** (#0b6630): hover/pressed state of Verde Mata fills (7.10:1), and the top of the footer ground.
- **Verde Noite** (#0a4d27): the bottom of the footer ground and the newsletter status chip.
- **Verde Nevoeiro** (#e8f5ee): tinted-surface state — hovered nav links, active filter chips, selected rows. The gentlest way to say "this is on".

### Secondary
- **Amarelo Flor-de-Lis** (#FFD700): the ceremonial accent. The carousel progress pill, rare highlights. Always on dark or as a filled shape — never as text on white (contrast fails).
- **Amarelo Fundo** (#fff9db): soft yellow tint for callout backgrounds.

### Tertiary
Section identity colors from `src/config/seccoes.js`, used only within each secção's own context: Lobitos **#f6db7e**, Exploradores **#549b8b**, Pioneiros **#217a9a**, Caminheiros **#ec4c4b**. Each section also defines contrast-checked derivatives: `surface` + `onSurface` for any fill that carries text (Lobitos keeps its yellow with dark olive text #564d2c; Exploradores and Caminheiros deepen one step so white passes) and `ink` for section-coloured text on white. The identity `color` itself is only for borders, tints and decorative icons.

### Neutral
- **Preto Tinta** (#1a1a1a): body text.
- **Cinza Noite** (#171717) → **Cinza Papel** (#fafafa): the full gray ramp (`--color-gray-{50…900}`). Cinza Escuro (#404040) for nav/control text, Cinza Médio (#6e6e6e — the lightest gray that passes 4.5:1 on every light surface) for subtitles, metadata and placeholders, Cinza Suave (#a3a3a3) for borders and decorative marks only — never text, Cinza Linha (#e5e5e5) for hairline borders, Cinza Claro (#f5f5f5) for recessed panels.
- **Branco** (#ffffff): the default page ground and card surface.

### Named Rules
**The One Yellow Rule.** Amarelo Flor-de-Lis appears at most once per viewport, on dark ground or as a filled shape. Its rarity is what makes it ceremonial; yellow text on white is banned outright. In the hero it is the carousel progress pill. The footer carries no yellow at all: its headings, focus ring and status icons are white on the green, and the Subscrever action is white with Verde Profundo text.

**The Small Green Rule.** Brand green is for size, Verde Mata is for reading. If green text is under 24px (18.66px bold), or white text sits on a green fill, it is Verde Mata or deeper. The one exception is the wordmark.

**The Verde Wayfinding Rule.** Green means "this is ours" or "this responds". Headings, actions, and active states — never large decorative fills or full-bleed green sections.

## Typography

**Display Font:** Nunito (with sans-serif fallback)
**Body Font:** Nunito — one family across the whole site, weights 400/600/700/800

**Character:** Rounded terminals and open counters make Nunito warm and legible at once — a hand-lettered notebook voice that still reads as official. Hierarchy comes from weight and scale, never from switching families.

### Hierarchy
- **Display** (800, `clamp(1.6rem, 5vw, 4rem)`, 1.05, −0.02em, `text-wrap: balance`; `--font-size-3xl` on phones and short landscape viewports): the hero headline — a warm invitation in the group's voice ("Vem crescer connosco."), never the group's name, which the header already carries. Always over a text shadow on photography.
- **Hero supporting line** (600, `--font-size-lg` / `--font-size-base` on phones, 1.55, +0.005em, white): names the group and who it is for. Light-on-dark compensation: more leading and a hair of tracking than body on paper.
- **Headline** (800, 2rem, 1.25, −0.01em): page titles, set in Verde Escutista, centered.
- **Title** (700–800, 1.25–1.5rem, 1.25): card titles, section headings, modal headers.
- **Lead** (600, `--font-size-xl` / `--font-size-lg` on phones, 1.45, Cinza Escuro, `text-wrap: balance`): the one-sentence standfirst under the hero. Same weight as the hero supporting line so it reads as the next beat; tighter leading than body because it is larger and only two lines.
- **Body** (400, 1rem, 1.6): running text; 600 for emphasis and subtitles.
- **Label** (700, 0.65–0.75rem, +0.5px, UPPERCASE): badges and chips only — the one place tracking goes positive.
- **Lyrics** (`--font-size-base`, 16px at every width, gray-700; line-height 1.8): scaled as a whole by the reader's A− / A+ (87.5–150%, remembered in localStorage as `cancioneiro-tamanho-letra`) through `--lyrics-scale`, chords included. The chorus is named, not coloured: a small uppercase Verde Mata "Refrão" label and bold gray-900 lines, so green stays the chords' colour. A chord over a lyric-less or shorter syllable reserves its own width, so neighbouring chords never overlap; a lyric-less chord stays on its word's row, and lines with chords are line-height 2.5 so wrapped rows keep their chords clear of the row above.
- **Chord label** (800, `--font-size-xs` at every width, Verde Mata on Verde Nevoeiro): the chord names over the lyrics. It stays 12px on phones (once 10.4px), because it is what a guitarist reads mid-song; on phones only the badge's side padding tightens (0.2em), which keeps adjacent chords on short syllables from colliding.
- **Chord diagram content:** titled with the chord as it reads on the page ("Rém" in Dó Ré Mi mode, the transposed name after transposing); × over a muted string and ○ over an open one; the drawing is a named image that reads every string ("Rém: Mi grave não tocar, Lá não tocar, Ré solta, …") and a shape change is announced ("Forma 2 de 3"). The shape arrows are 20px visuals with 44px touch areas.
- **Diagram marks** (the chord name and the ×/○ string marks inside a chord diagram, 10px in SVG units): the one exception to the ramp. The diagram's viewBox is drawn 1:1 in pixels, so its text is geometry, fixed so it never outgrows the grid at a larger text setting.
- **Diagram fret number** (700, `--font-size-xs`, Cinza Médio): the starting-fret marker inside a chord diagram, shown only for chords played above the second fret. It uses the smallest step on the ramp; nothing on the site is set smaller.

### Named Rules
**The Tighter-As-It-Grows Rule.** Large text gets negative tracking and tight leading (h1–h3: 1.25 / −0.01em; display: 1.05 / −0.02em). Positive letter-spacing is reserved for small uppercase labels.

## Layout

A single centered column, `max-width: 1200px`, with `1.5rem` side padding (`.container`). The header is sticky, at least 72px tall (`--header-height`; larger text grows it instead of spilling out) and the hero carousel fills `100vh − header` on desktop, 60vh on mobile. Spacing follows the rem scale (`--spacing-xs` 0.25rem → `--spacing-3xl` 4rem); page sections breathe at 3–4rem vertical.

**Home reads down one left edge**, matching the hero copy's lower-left anchor, with one centred pause: the lead paragraph (max 40rem, centred at every width; half a section gap below the hero and a full one after it, because it continues the hero rather than opening a section) → the Age Ladder ("Uma caminhada dos 6 aos 22 anos") → the invitation ("Queres fazer parte?", "Três passos, ao teu ritmo.", three steps and Inscreve-te, beside a supporting photo capped at 28rem) → "Últimas aventuras" (the latest story at double weight beside a 2×2 of the next four; equal grid rows so both columns end together; titles and dates always visible under the photos; each photo develops like a print the first time it has both loaded and come on screen — from a pale monochrome at 1.04 scale to full colour at rest, 1200ms ease-out with the fade done by 450ms, photos arriving together 90ms apart in reading order; under reduced motion they fade in (450ms), with no scale and no monochrome; cards press to 0.98) → the Cancioneiro band ("O nosso cancioneiro"). Who the group is and how to join come before what it has been doing. The address stays in the footer only. Heading outline: one `h1` (hero), `h2` per section (footer titles included), `h3` per story.

Breakpoints: **1024px** (nav collapses to hamburger; layouts begin stacking), **768px** (single-column, tighter type, bottom-sheet modals), **600px** (final compaction). Grids wrap and center — a last row of 2 cards centers under a row of 3. Touch devices (`hover: none`) get hover-revealed content (gallery captions) always visible.

## Elevation & Depth

Ambient and restrained. Surfaces are effectively flat at rest — white with a 1px Cinza Linha border — and elevation appears as a *response*: cards lift `translateY(-4px)` with `--shadow-lg` on hover, dropdowns and modals float with `--shadow-lg`, the sticky header carries `--shadow-sm` plus a translucent blur material (`rgba(255,255,255,0.78)` + `backdrop-filter: blur(20px) saturate(180%)`, with solid-white fallbacks for unsupporting browsers, `prefers-reduced-transparency`, and `prefers-contrast: more`).

### Shadow Vocabulary
- **Hairline** (`box-shadow: 0 1px 2px rgba(0,0,0,0.05)` / `--shadow-sm`): sticky header, subtle resting separation.
- **Floating** (`box-shadow: 0 4px 6px rgba(0,0,0,0.1)` / `--shadow-md`): mobile nav panel, mid-level popovers.
- **Lifted** (`box-shadow: 0 10px 25px rgba(0,0,0,0.15)` / `--shadow-lg`): hovered cards, dropdown menus, modal panels.
- **Switch thumb** (`--shadow-thumb`, `0 1px 2px` at 15%): lifts the white knob off the light gray track; shared by every switch (song page and builder).
- **FAB** (`box-shadow: 0 4px 16px rgba(0,0,0,0.2)`): the one always-elevated element, because it floats over content by definition.

### Over photography
Text and marks on the hero carousel sit on photos no palette controls, so they carry their own black-alpha depth, held as tokens in `variables.css` (`--photo-scrim`, `--photo-scrim-tall`, `--photo-text-shadow-lg`, `--photo-text-shadow`, `--photo-mark-shadow`, and the white dot fills `--photo-dot`, `--photo-dot-strong`, `--photo-dot-held`, `--photo-dot-track`):
- **Scrim** (`linear-gradient` to top, black 0.72 → 0.4 at 40% → 0.1 at 72% → 0.06; on phones, where the copy fills more of a short hero, 0.75 → 0.55 at 45% → 0.25 at 75% → 0.1): darkens only where the copy sits. It is what makes white hero text pass AA on every slide.
- **Headline shadow** (`text-shadow: 0 2px 12px rgba(0,0,0,0.5)`) and **supporting-line shadow** (`0 1px 8px rgba(0,0,0,0.55)`): a soft halo so letters hold their edge on bright patches the scrim leaves open.
- **Dot shadow** (`box-shadow: 0 1px 3px rgba(0,0,0,0.35)`): keeps the white page dots visible over pale photos.
These are the only literal blacks in the system; they belong to photography, never to paper surfaces.

### Named Rules
**The Ambient Response Rule.** Shadows are earned by state, not worn at rest. If an element isn't floating, hovered, or modal, a 1px border is its only edge.

## Shapes

Tokens (`src/styles/variables.css`): `--radius-xs` 4px, `--radius-sm` 8px (= `--border-radius`), `--radius-md` 10px, `--radius-lg` 12px, `--radius-xl` 16px, `--radius-pill` 100px; the Cancioneiro pages, the lyrics panel, the chord diagram and the home page components use them throughout. Soft, friendly geometry in four main tiers: **8px** base radius (`--border-radius`) for controls and nav links, **10px** for text inputs, **12px** for cards and panels (dialogs 16px), and **full pills (100px)** for CTAs and badges. Circles (50%) are reserved for dots, the FAB, and count badges. Three small exceptions, each tied to one element: **16px** for the lyrics panel (the song is the page's largest surface, so its corners open one step further than a card), **4px** for inline marks too small for 8px to read as a curve (the chord labels over lyrics, the chord diagram's arrow buttons), and **2px** round caps on the hamburger's bars. No sharp corners anywhere; no radius larger than a pill. Borders are always 1px hairlines — never 2px+ decorative strokes (the 2px white ring on carousel dots is the one deliberate exception, for contrast over photos).

## Components

### Buttons
Friendly and tactile: pills that respond the instant you touch them.
- **Shape:** full pill (100px radius) for CTAs; 8px radius for toolbar/utility buttons.
- **Primary:** Verde Mata fill, white text, 700 weight, `0.75rem 2rem` padding.
- **Light (over photography):** `rgba(255,255,255,0.85)` fill, Preto Tinta text; solidifies to white on hover.
- **Hover / Press:** hover darkens to Verde Profundo; every pressable element scales to `0.97` on `:active` (global rule), `0.95` on the FAB. Transitions use `--transition-interactive` (150ms, compositor-safe properties only).
- **FAB (email, then back to top):** 52px Verde Mata circle (48px on phones), fixed bottom-right, present on every page except Contactos (whose own Email card is right there, and where it covered the map), the prova pages and the Programa (`/seccao/*/provas/*`, `/seccao/*/programa`: reading pages where it sat on the text), a notícia on phones (≤768px, `/agrupamento/noticias/*`: the text and gallery fill the width; wider screens keep it in the margin beside the column) and the Cancioneiro list on phones (≤768px), where it would sit on every row's "+" and the filters' "Mostrar N canções"; the sticky search and A–Z picker cover getting around there. Near the top of the page it is the email action (envelope, `mailto:` the agrupamento); past 300px of scroll the envelope turns into an up arrow (a quarter-turn and scale crossover, 360ms ease-out; a plain crossfade under reduced motion) and it scrolls back to the top (instantly under reduced motion), moving focus to the content. Its accessible name follows the action. Grows `1.08` on hover (hover-capable pointers only), `0.95` on press. Both switches are driven by IntersectionObservers (a 1px marker 300px down the page; the footer crossing the button's centre line), not a scroll handler. While it sits over the footer's green it switches to the footer's own action colours — white fill, Verde Profundo icon, white focus ring — because a green circle on green reads as a blob.

### Chips
- **Style:** white fill, 1px Cinza Linha border, 8px radius, Cinza Escuro 700 text.
- **State:** hover tints border and text green; active state fills with Verde Nevoeiro. Count badges are 20px Verde Escutista circles with white 800 text.

### Cards / Containers
- **Corner Style:** 12px, `overflow: hidden` for edge-to-edge images.
- **Background:** Branco with 1px Cinza Linha border.
- **Shadow Strategy:** flat at rest; hover lifts −4px with `--shadow-lg` and zooms the 16:9 cover image to 1.05 (400ms).
- **Badges:** section pill overlaid top-left of the image — Verde Mata fill, uppercase 0.65rem label.
- **Internal Padding:** 1.25rem body.

### Inputs / Fields
- **Style:** white fill, 1px Cinza Linha border, 10px radius, left-padded 2.5rem when an icon leads (icon in Cinza Suave).
- **Focus:** border and a 1px ring of the same colour, both Verde Mata, read as a 2px edge — still no glow. (A 1px identity-green border alone was too faint to be the only focus cue.)
- **Placeholder / metadata:** Cinza Médio.

### Navigation
- **Desktop:** centered horizontal list; links are 600-weight small text in Cinza Escuro with 8px-radius padding boxes; hover/active turns text green over a Verde Nevoeiro tint. Dropdowns fade in (150ms, −4px rise) on white with Lifted shadow.
- **Header material:** translucent blur chrome (see Elevation); brand lockup pairs the logo with an 800-weight green wordmark. The subtitle ("Santa Maria de Belém") is Cinza Escuro, because the translucent bar sits over hero photos when scrolled and Cinza Médio fell to 3.3:1 there. The logo's alt is empty; the name beside it labels the home link.
- **You are here:** the current page's link carries `aria-current="page"` and reads in Verde Profundo (it stays ≥4.7:1 over photos, where Verde Mata did not). A dropdown trigger whose menu holds the current page is marked the same way (`aria-current="true"`), and inside the menu the current page is also 700 weight.
- **Structure:** four top-level items — Agrupamento ▾ · Secções ▾ · Cancioneiro · Contactos (config in `src/config/navigation.js`). "Secções" opens one panel with a column per secção (uppercase label + the section's identity-colour dot, then its five pages); on phones the columns stack as labelled groups. A "Saltar para o conteúdo" skip link slides in on first Tab and targets `#conteudo`.
- **Compact (header ≤1024px wide, or narrower than 50rem at the current text size):** a container query on the header, so a larger default font or text-only zoom collapses the bar before it breaks. The brand shrinks and wraps before the hamburger does. The hamburger (animated to X) opens a solid-white full-width panel — deliberately opaque, no nested blur. Dropdowns become inline indented lists.

### Hero Carousel (signature)
Full-bleed photography under a scrim that darkens only where the words sit (bottom-weighted; the top of the photo stays open). Copy anchors lower-left on the page container on desktop — clear of the faces that fill the centre of group photos — and centres over the lower third on phones. The only yellow in the first viewport is the progress pill (The One Yellow Rule); the supporting line is white.
- **Progress pill:** the active page dot becomes a 30px pill (24px on phones) that fills with Amarelo Flor-de-Lis over the 5s slide interval — the fill's `animationend` *is* the clock. Paused, the fill freezes mid-way so the state reads at a glance.
- **Pause:** the active pill *is* the pause control — no separate button. Tapping it (or Enter) holds the slide; a held pill freezes its fill and brightens its track (`rgba(255,255,255,0.75)`) so it never reads as "about to fill", and an "Em pausa" chip (white, pill, beside the dots so they don't shift) says it in words until the pill is tapped again. Choosing another photo while held stays held. Autoplay also pauses while the mouse is over the dots or the Inscreve-te / Notícias buttons (not the whole photo: the hero fills most of a desktop screen, so it would rarely move), on keyboard focus inside, when scrolled off-screen, and when the tab is hidden. Under `prefers-reduced-motion` there is no autoplay and the active pill is simply full (not a toggle).
- **Swipe (touch/pen):** 1:1 tracking after a 10px threshold, momentum-projected commit (Apple's `v/1000·d/(1−d)`, d = 0.998), rubber-banding past the first/last slide, and the release transition inherits the finger's velocity. A slide can be grabbed mid-transition without jumping; vertical drags scroll the page.
- **Settle:** `transform` only, `cubic-bezier(0.16, 1, 0.3, 1)`, 700ms for autoplay/dots, shorter when a flick hands over velocity.

### Age Ladder (signature)
The secções as one continuous path from 6 to 22 (`src/components/AgeLadder`), not a row of cards.
- **Four equal stretches:** one per secção, equal widths on the horizontal ruler; on phones the ruler turns vertical and all four stretches share the height of the tallest text, so they stay equal with no dead space. The ages are read off the ticks on the joints, not the bar lengths. Ages come from `ageMin`/`ageMax` in `seccoes.js`.
- **Colour:** each stretch fills with its section `surface` and carries its name in `onSurface`; ages and links use the section `ink`. Ticks sit on the joints (6 · 10 · 14 · 17 · 22).
- **Motion:** the bars draw in along the ruler (600ms ease-out, 110ms stagger) every time it rises into view from above, and retract in reverse (380ms ease-in, 70ms stagger, last bar first) when scrolling back up drops it below the trigger line. Scrolling down past it keeps it drawn. A ruler already on screen at load, and every ruler under reduced motion, simply renders drawn.
- **Target:** each whole stretch is one link to its section page.

### Cancioneiro Band (signature)
Home's last section before the footer (`src/components/CancioneiroBand`): the product's standout tool shown as itself, not described.
- **The song leads:** a real chorus (`Dar Mais`, read from its song file) rendered by `LyricsWithChords` in the same panel as the song page — chords above syllables; hover previews a diagram, and a tap, click or Enter pins it open. It takes the wider column.
- **Tools beside it:** a live count ("N canções com acordes…"), a search field that navigates to `/recursos/cancioneiro?q=`, and a secondary pill "Faz o teu Cancioneiro em PDF" → `?montar=1` (opens the builder). Both parameters are read by the Cancioneiro page.

### Song list (Cancioneiro index)
One white panel with hairline (Cinza Claro) dividers, read like the contents page of a caderno, not a stack of cards.
- **Row:** the song's key in a Verde Nevoeiro badge where a repeated note icon used to be (the first fact a guitarist needs), the title (700, `--font-size-base`, `--font-size-sm` on phones), and one quiet line under it: author · capo · up to two tags, most specific first (Mass moment, then occasion, then theme; "Missa" is dropped when a moment already implies it), truncated rather than wrapped. The key is last in the markup so screen readers hear the title first.
- **Density:** about 62px per row on desktop, 56px on phones.
- **Motion:** filtering or searching slides the songs that stay to their new place (FLIP via `useFlipList`, 280ms `cubic-bezier(0.16, 1, 0.3, 1)`) and fades in the ones that arrive (200ms); a change mid-slide continues from where each row is on screen, and rows far off screen aren't animated. An A–Z jump ends with a Verde Nevoeiro wash on the row it landed on (1.4s, after the scroll stops), kept under reduced motion since it's only colour; the slides are dropped there. A toggled "+" / tick arrives with a small turn and settle (240ms), only on the row just toggled.
- **Add toggle:** the row's last cell, a 3rem "+" separated by a hairline; filled Verde Mata with a tick once the song is in the songbook. Its name says what a tap does ("Adicionar «X» ao teu cancioneiro" / "Retirar «X» do teu cancioneiro"); the tick carries the state. On the song page the same add is a pressed toggle, and both announce the change with the running count. The song page's chords control is an "Acordes" toggle (`aria-pressed`, green when shown), matching the builder's "Acordes" switch.
- **Toolbar:** filter, search and "Faz o teu Cancioneiro" all 44px, sticky under the header. On phones only the filter + search row sticks (the toolbar is `display: contents` there), with an "A–Z" native picker in place of the sidebar index; the builder button sits full-width below and scrolls away, so a phone keeps one row of chrome. The search has its own clear button (the browser one is hidden). The whole list always shows; at 34 songs there is no "Ver Mais". Jumps land below both sticky bars (`scroll-margin-top`), and the desktop A–Z sidebar sticks below the header. The sidebar is one tab stop (roving tabindex): arrows and Home/End move between letters, Enter jumps and focuses that letter's first song.
- **Empty result:** names its cause, worded the way the filters combine ("Nenhuma canção de Missa e Entrada ou Comunhão tem «termo» no título.", also what the live region announces) and offers the way out right there: "Limpar pesquisa" and/or "Limpar filtros" as outline buttons, and a primary "Sugerir «termo»" that opens the suggest form with the title filled in.
- **Filters** (`src/utils/songFilters.js`): chips in the same group widen the list (Entrada *or* Comunhão), groups narrow it (Missa *and* Oração). Each chip shows how many songs it leads to given the other choices; a chip no song carries isn't shown, and one that would empty the list is dimmed and inert. "Momento da Missa" appears only once Missa is on (turning Missa off clears the moments). Groups: Tema, Ocasião, Secção, Momento da Missa. The search and filters are in the URL (`?q=`, `?tags=`), so a filtered list can be shared and survives Back; a link with filters opens the panel. A group with a single chip (Secção, today) is hidden unless that chip is on. On phones the panel ends in a sticky footer, "Limpar filtros" left and a Verde Mata "Mostrar N canções" right, which closes the panel and lands on the first song. With no results the panel keeps only the chips that are on, so the empty message stays on the first screen.
- **Song page, the song leads:** title, then an actions row (PDF, "Adicionar ao teu cancioneiro", and a songbook link that is always there: "Faz o teu Cancioneiro" or "Abrir o teu cancioneiro (N)"), then one settings bar (Acordes · Tom [− C +] · [C D E | Dó Ré Mi] · [A− | A+]) directly above the lyrics at every width. Every control in it is one height (40px, 44px on touch) with the same hairline border: the key is a joined stepper, the chord naming a two-button choice like the builder's, and once transposed the key itself is the reset ("Mi ↺", green-light), so no reset button takes space. Desktop: that one-row bar is sticky flush under the header. Phones (≤600px): two even rows, each pair pushed to the edges (Acordes | Tom, then names | size; with chords off, Acordes | size), and "Tom" is screen-reader-only at 380px and below; once it has scrolled away a one-row compact bar (Tom − C + and A− A+, about 55px, gray-100 with a hairline and small shadow) slides down from under the header; it is fixed, so appearing never moves the lyrics, and it is inert while hidden. Every song opens in its own key: a transposition is dropped whenever the song changes, including on the way back. Nothing appears or disappears above the lyrics while reading: the reset lives in the key (no button comes and goes) and on narrow phones the add button takes its own line, so adding a song or transposing never moves the lyrics. Desktop: lyrics left, a sticky sidebar right (recording, tags), prev/next under the lyrics; phones: lyrics, then recording and tags, then prev/next.
- **Recording on tap:** the song page never loads a player on arrival (YouTube ~1.2 MB, TikTok ~2 MB, several times the page itself). It shows a 16:9 preview button instead: the YouTube thumbnail (a Verde Noite panel for TikTok and SoundCloud), a white play disc and a white "Ver no YouTube" pill. One tap swaps in the player, autoplaying where allowed, and moves focus to it; the next song starts from the preview again.
- **Song page tags lead back:** each tag chip under the video is a link to the list filtered by it (`?tags=`), so a song page is never a dead end. With more than one recording, the source switch is a pair of named pill tabs (icon + "YouTube" / "TikTok"), the active one in Verde Nevoeiro.

### Songbook draft (signature)
One songbook is always being built, shared by the Cancioneiro list, the song pages and the "Faz o teu Cancioneiro" builder (`src/utils/songbookSelection.js`, kept in `localStorage`, so it survives closing the builder, a reload or a later visit; the cover image isn't kept).
- **Adding while browsing:** each list row has a 3rem "+" toggle beside its link (Verde Mata fill with a tick once added); a song page has an "Adicionar ao teu cancioneiro" control and, once anything is chosen, an "Abrir o teu cancioneiro (N)" link. The builder button carries a white count badge on its top-right corner (as does the filter button for active filters), so counts never change the buttons' width or shift the search field. Every add or remove is announced.
- **Builder picker:** search plus a "Mostrar" select ("Todas (34)" when unfiltered, kept short so the search hint fits on phones) grouped by Tema / Ocasião / Momento da Missa, offering only tags some song carries, each with its count.
- **Robust output:** the cover's song index flows into two or three columns before it shrinks, so every selection fits; any image the browser opens becomes a square 512px PNG for the cover (no stretching); a failed download says whether the connection or the generation failed, in the Amarelo Fundo callout.
- **Clearing is undoable:** "Retirar todas" empties the list and leaves "Retiraste N canções. Repor" in its place, focused, instead of asking for confirmation.
- **Labelled and explained:** a one-line lead under the title ("Escolhe as canções e descarrega-as num PDF pronto a imprimir."); visible labels on "Título da capa" (its placeholder is the real default, «Cancioneiro») and "Descrição (opcional)". The chord naming is a two-button choice, "C D E" / "Dó Ré Mi", styled like the format buttons, so the one switch left ("Acordes") means on/off. The builder column scrolls as one piece with Download pinned, on phones and desktop alike.
- **Formats explained in place:** one line under the format buttons says what the chosen format prints (Livro: an A5 booklet, two pages per A4 landscape sheet, folded in half).
- **Ready (signature moment):** after a download, a Verde Nevoeiro card rises in above the button, named like the cover: "«Acampamento de Verão» está pronto", then "4 canções · Livro A5 · acordes em C D E", then the one printing step that format needs (for Livro: double-sided, flipped on the short edge, folded in half; said here, not in the format hint). The button becomes "Descarregar outra vez". The builder column is one scroller at every size (settings, the chosen songs at full height, the card), with Download pinned at the bottom over a white band, so the card never squeezes the list. The card holds only while the draft matches what was printed: any change to songs or settings removes it, so it never vouches for a stale PDF. Announced as a status; no motion under reduced motion.

### Cancioneiro vocabulary
One word per idea, across the list, the builder, the song pages and their forms:
- **canção**, never "música", in the interface (SEO copy aside). **teu cancioneiro** is the one being built ("Adicionar ao teu cancioneiro", "No teu cancioneiro (N)"); **Cancioneiro** with a capital is the site's songbook and the "Faz o teu Cancioneiro" name.
- **Tom** for the key; transposing is "Subir / Descer meio tom".
- Search says what it searches: "Procurar pelo título...".
- Sentence case on buttons and dialog titles ("Sugerir uma canção", "Reportar um erro", "Enviar sugestão"). Required fields carry no asterisk; optional ones say "(opcional)".
- Send errors say what failed and what's kept: "Sem ligação à internet. O que escreveste continua aqui; tenta outra vez." Success names the thing received and promises nothing about timing.

### Direção (and `MemberCard`)
The leaders first (3 over 2, 260px cards), then the Chefes de Secção. `MemberCard` (shared with Dirigentes) is a white card with a round photo (100px), the name, the role as Verde Profundo semibold text right under it (a title, not a tag: the only pill is the secção's), and the dates, each value kept on one line. There is no hover lift, since the card isn't a link.
- **Secção in words:** a chefe's card takes `seccao` (a `seccoes.js` entry) and shows the secção name as a pill in its `surface` / `onSurface`. The emblem in the corner is decorative (`alt=""`), so it's never the only cue.
- **Outline:** the leaders sit under a screen-reader-only h2 "Direção de Agrupamento" so the names (h3) follow an h2.
- **Phones (≤600px), opt-in via `phone`:** `row` puts the photo (64px) beside name, role and dates; `tile` is a small centred card, two to a row. Direção uses `row` for the leaders and `tile` for the chefes; Dirigentes uses `compact` (the small tile at every width: 80px photo and name): desktop is a secção per column with its people two to a row; tablets (≤1024px) a secção per row with as many tiles as fit; phones two to a row, under a small emblem + name heading per secção; the portrait-phone tab bar jumps between secções and follows the one in view via an IntersectionObserver, instantly under reduced motion).
- **Dates:** written the pt-PT way, lowercase month, no leading zero ("1 de fevereiro de 1980").

### Contactos
Reference first, then actions, then the map.
- **Contact panel:** one white panel (Cinza Linha border, `--radius-xl`) with a column per section present: Email, Morada, Redes Sociais, split by hairlines. A section whose config list is empty is left out, and the others share the width. Headings carry a small green icon inline, with no round icon discs. Column content is centred vertically, so the short Email column doesn't hang from the top. On phones (≤768px) the columns stack as rows split by hairlines, left-aligned.
- **Outros pedidos:** the only cards on the page, three Verde Nevoeiro rows (dark-green icon disc, title, one line, then an arrow for a page or an envelope for email). "Fazer parte" opens an email with "Inscrição no Agrupamento 80" as the subject, "Banco de Fardas" and "Reservar Alojamento" open their pages. On hover the row fills dark green, on hover-capable pointers only. Phones: stacked, 8px apart and 24px below the panel.
- **Map:** the Google embed, lazy-loaded, fading in over a gray-100 placeholder once loaded. Its rounded wrapper would clip a focus ring, so the page draws the ring on the wrapper while focus is inside the map (it listens for the window losing focus to the iframe).
- **Links:** "Ver no Google Maps", Facebook and Instagram say "(abre numa nova janela)" to screen readers. The floating button is hidden on this page.

### Notícias list
The newest story leads as a full-width card (photo beside the text, up to 3fr/2fr; an ordinary first card on phones), then a grid of 16:9 cards. Secção badges use each secção's `surface` / `onSurface`, and "Agrupamento" keeps the site green.
- **Filters:** secção chips are shown up front (a colour dot each; the pressed chip takes its secção's colours), and author and period sit behind "Mais filtros" (`aria-expanded`, with a count of what's on inside). The chips and the toolbar share one line on desktop (chips, then "Mais filtros", the live "N notícias" count and the view switch). Where they don't fit, the chips take their own row and the rest wraps as one group, never the switch alone. On phones (≤600px) the chips become one row that scrolls sideways, bleeding to the screen edges with a fade, and an empty result offers "Limpar filtros" under the message. On touch the period calendar opens as a centred overlay without the keyboard (40px days, 34px at 360px and below), and the panel's fields are 16px and 44px tall. Period dates compare as local calendar days (never `toISOString()`), and dates are formatted in UTC.
- **Controls:** the secção and the view live in the URL (`?seccao=Lobitos&vista=lista`; an unknown secção is ignored), so a filtered list survives Back and can be shared. The grid/list buttons are named and `aria-pressed`, presets too. Each card's secção badge follows the title in the markup (read title first) and sits over the photo's corner by CSS. Hover is only on hover-capable pointers, and every control is 44px on touch. The secção pages (Covil, Cabana…) reuse the list without chips or a clear button.

### Notícia
The story comes first at every width (on phones the hero, the back link and the text are 32px and 24px apart, so the text starts about 450px down): "Todas as notícias", the text, then "Galeria" and "Nas redes sociais" (both `h2`). Phones reach the story on the first screen. From `64em` (1024px at the default text size: an `em` breakpoint, so a reader's larger browser text brings back the single column instead of a sideways scroll) the gallery and posts sit in a column beside the text (`minmax(0, 60ch)` + `minmax(16rem, 1fr)`: the side keeps room as text grows and the text column gives way first; thumbnails two across at about 215px) instead of under it; the DOM and focus order stay text first.
- **Hero:** at every width the cover fills it (min-height 400px, 300px ≤768px) under `--photo-scrim-tall`, cropped at `center 30%`, with the text shadow tokens; on phones `--photo-scrim-text` also sits right behind the text block (edge to edge, fading out above the badge). White title text stays at 5:1 or better even on a white cover at every width. The secção badge takes its secção's `surface` / `onSurface`. On wide screens a full-width strip crops covers hard (a square one keeps about 28% of its height), so the whole photo is always one tap away in the viewer. Title 800, `--font-size-2xl` → `--font-size-3xl`, balanced, with Portuguese hyphenation for words of 10+ letters (it only shows when a word can't fit, e.g. at 200% text on a phone; an acronym with no break point falls back to `overflow-wrap`); meta 600. The decorative photo has empty alt text. A meta button opens the viewer ("N fotos", or "Ver foto" for a story with one photo); a click or tap on the hero photo does the same as a pointer shortcut (`zoom-in` cursor), without adding a tab stop; on phones the title block lets taps through to the photo (`pointer-events: none`, the button excepted), so nearly the whole hero opens it.
- **Text:** 60ch (about 70 characters; a `ch` is wider than Nunito's average letter), body 1rem / 1.7 gray-700, paragraphs one line apart. The first paragraph is the lede (`--font-size-lg`, 600, gray-900). A paragraph that is wholly one quotation is a `blockquote`: one step larger, 600, set in by `--spacing-lg`, with pt-PT «» in Verde Mata; no italic (none is loaded) and no coloured rule.
- **Loading:** the gallery's photos (and the route prefetch) wait until the hero photo has loaded, the same rule as Home, so on a slow connection the photo at the top isn't sharing the bandwidth with photos far down the page (Fast 3G, emulated phone: LCP 9.5s → 4.4s); their squares hold a gray-100 placeholder, so nothing shifts. Pages without a hero prefetch 4s after load. The browser tab uses `public/favicon-64.png` (6KB); `public/favicon.png` stays as the PDF and share image.
- **Galeria:** square thumbnails, `auto-fit` at 120px minimum (two across on any phone, as many as there are photos on wide screens), each named "Abrir foto N de M"; they press to 0.97.
- **Viewer:** a history entry of its own (same address, router state `{ viewer: true }`), so a phone's Back closes it instead of leaving the article; close, Escape and a tap on the dark area step back through that entry, photo changes add none, and a reload that lands on a stale entry steps over it. It opens by focusing its trigger (the "N fotos" button when the photo itself was tapped), so focus always returns to a real control on touch screens too. A modal dialog on `useModalDialog` (Escape, focus kept inside and handed back, page scroll locked), on `--overlay-scrim-photo` (solid near-black: a translucent fill let the page read through). Three rows: a live "N de M" and a 44px close; the photo, held between the bars; then prev / thumbnails / next (phones: the photo edge to edge, thumbnails hidden, prev and next at the bottom corners). The photos sit side by side on one track (`src/pages/NoticiaDetail/Lightbox.jsx`, physics shared with the Carousel in `src/utils/swipePhysics.js`): a swipe moves the track 1:1, so the next photo is already arriving beside the current one, and on release it settles with a momentum-projected commit at the finger's own speed; grabbing a settling track holds it where it is. The ends don't loop: a drag past the first or last photo rubber-bands and springs back, and the arrow there is `aria-disabled` (focus kept) and leans the track 28px toward the missing photo. Arrow keys, arrows and thumbnails slide one photo in 420ms; under reduced motion the track jumps and the arriving photo fades in (150ms). A drag down closes: the photo follows the finger, the backdrop and controls thin with the distance (`--dismiss`, a registered property), and past 18% of the height or on a downward flick it carries on down and closes, otherwise it springs back. A zoom button beside close ("Ampliar foto" / "Reduzir foto", 44px, its tooltip and `aria-keyshortcuts` naming the key) toggles 2.5× around the centre; a pinch, a double tap or double-click (2.5×), Ctrl/⌘ + scroll, or the `+` / `-` / `0` keys also zoom the photo itself (up to 4×, around the fingers or cursor); a zoomed photo pans, with a little momentum, held to its edges, and swiping is off until it is back at 1×. When a zoom settles (a button, key or double tap, the end of a pinch, a pause in Ctrl/⌘ + scroll) a separate live region says "Foto ampliada a 250%" or "Foto no tamanho original"; a new photo clears it silently. The stage takes every touch (`touch-action: none`), so the page never zooms or scrolls underneath. A tap on the photo does nothing; a tap on the dark area closes. Closing, any way (close, Escape, a tap on the dark area, Back, a drag down), fades it out in 160ms, faster than its 200ms arrival, before it unmounts and hands focus back; a second Escape during the fade does nothing. A flick must travel 16px to change photo or close, however fast. Each photo is described as "Foto N: <story title>" (the live counter already says "N de M"). Layer: `--z-dialog` (1000), shared with the site's dialogs. Focus inside the viewer is a 2px white outline with a 4px dark ring outside it, so it reads over black or over a bright thumbnail. The track takes a compositor layer (`will-change`) only while it moves. On short screens (≤500px tall, landscape: a phone held sideways) the photo takes the full height and the controls float at its edges: counter and close in the top corners, prev/next at the side edges (where the thumbs rest), on `--overlay-scrim` fills with the text shadow, inside the notch safe areas; the thumbnails give way. With one photo the viewer is just that photo and its close button: no counter, arrows or thumbnails; a sideways drag rubber-bands. The photo either side of the current one is rendered (and so loaded) on the track. Each photo's `sizes` is its real shown width, the smaller of the screen width and the height left for it times its aspect ratio (`aspectRatioFor()` in `src/utils/responsiveImage.js`, read at build time), so a wide or landscape screen fetches the file it shows (e.g. 800w, not 1600w, for a portrait photo on a 1440×900 desktop); a browser that can't parse it falls back to `100vw`.
- **Nas redes sociais:** posts grouped by network. A network with one post is one pill ("Facebook"); one with several is named once ("Instagram · 4 publicações", 700, gray-700) above its own row of pills. A post with no label is numbered ("Publicação 1"); in the notícia config any link may be `{ url, label }` instead of a URL, and the label then names what the post shows ("Arborismo"). Each link tells screen readers its network and "(abre numa nova janela)"; pills are 44px tall on touch.
- **Unknown slug:** the 404 page with "Notícia não encontrada" and "Ver todas as notícias", not a silent redirect; its tab title says so and it carries `noindex` (as does the site-wide 404), removed again on the next page. Dates are formatted in UTC.
- **Viewer keys:** arrow keys with a modifier held (Alt+← is Back) are left to the browser; a swipe whose pointer capture is lost springs back.

### Reservar Alojamento
A one-column form that prepares an email, and says so: the button is "Preparar email", and the confirmation reads "O teu email está pronto… Só falta carregar em enviar." It never says "enviado". Under it, a fallback for when no mail app opened: the address, the request text ready to copy ("Copiar pedido", or the text selected if the clipboard is blocked), and "Abrir o email outra vez". A long request adds a note that the email may open cut short. The floating button is hidden on this page: the form is itself the email, and on a phone the button sat on "Preparar email". On phones the done panel has 24px sides, the two fallback buttons fill their row, and the request text is 16px on touch (iOS zooms into a smaller field when it's tapped).
- **Fields:** Organização, then Nome do responsável and Número de pessoas, Email and Telefone, the two dates (time optional), and Mensagem (optional). 16px, 48px tall, with autofill hints. Focus is a 2px dark-green edge (border + 1px ring). Two-column rows use `minmax(0, 1fr)`, and a time field drops under its date when large text leaves no room.
- **Validation:** the form is `noValidate` and checks every field itself, in Portuguese: each message sits under its field in the Amarelo Fundo callout (`aria-invalid` + `aria-describedby`), and focus goes to the first one. The browser's bubbles were in the browser's language and vanished on their own. A name of only spaces, a people count that isn't a number, an email with no domain, and dates before today or an exit before the entry are all caught. When a later entry clears the exit, a gray note under it says so (in a polite live region). When an error sends focus to a date, its calendar is closed straight away (`setOpen(false, true)`, which keeps focus) so it doesn't cover the message; ArrowDown opens it again. Not `preventOpenOnFocus`: that flag also turns off keyboard opening. The time lists step in half hours from the current one (`openToDate`). After "Fazer novo pedido" focus goes to Organização. The calendar's screen-reader labels are Portuguese ("Escolher data", "Escolher quarta-feira…", "Mês seguinte"): the library's are English even with the pt locale.
- **The email:** a request someone reads: "Olá, Gostaríamos de reservar o vosso espaço de alojamento.", then organização, number of people, entrada, saída, the message, who to answer (responsável, email, telefone), and the responsável's name under "Com os melhores cumprimentos".
- **Date and time pickers:** each date label is linked to its field and the time fields are named ("Hora de entrada/saída"). On desktop the calendar opens under the field and is kept on screen by a small middleware. On touch screens the fields are the phone's own (`<input type="date">` / `"time"`): its wheel or calendar, in its language, read properly by VoiceOver and TalkBack, styled like the other fields (48px, same border, `appearance: none`, value left-aligned). The entry date can't be before today and the exit before the entry (`min`), and a later entry still clears an earlier exit; the form keeps Date values either way, so the email reads the same. The mouse pickers live in `DesktopDateTime.jsx`, loaded with `lazy()` only when the pointer isn't coarse, so phones never download react-datepicker (~48 KB gzipped) or its CSS; while it loads, two field boxes of the same height stand in (`.inputLoading`). The theme is `datepicker-theme.css`, token-based and scoped to `.alojamentoCalendar`: a date-picker theme must never be a bare global, as Notícias' once restyled this page's calendar.

### Provas
The secção's band (surface/onSurface) carries the label, "Provas" and one lead line; under it a link back to the secção in `ink`. Two groups, Adesão ao Movimento then Adesão à Secção, numbered 1–17 straight through because they're done in that order (the detail page's sidebar uses the same numbers). Each group heading holds its toggle button (`aria-expanded`, with a gray "N provas" count); a closed list is `hidden`, so its links leave the tab order, and opening fades it in (no height animation). A prova whose text isn't written yet for that secção says "Texto em preparação" on its row. Texts live in `provasContent.js`: shared provas keyed by slug, secção provas by "<secção>/<slug>", which `provas.test.js` enforces.
- **Prova page:** the text is capped at 68ch. Lines starting "• " or "N. " in the content strings render as real `<ul>`/`<ol>` (`toBlocks` in `ProvaDetail.jsx`). The band is left-aligned on the page's edge: "<Secção> · <group>" label, a 32px title (24px on phones), and "Prova N de 17" on desktop. The back link names the secção ("Provas dos Lobitos"). The sidebar lists both groups, 1–17, each behind a toggle (`aria-expanded`, "N provas" count; the group holding the open prova starts open, the other closed, and moving to another prova resets that) (gray-700 group titles under a visually hidden "Provas dos …" h2, `aria-current` on the open prova, "Texto em preparação" under provas with no text); up to 1024px it folds into a "Prova 11 de 17 · ver todas" toggle so the text starts under the title. Previous/next run through all 17 provas, and moving to another prova puts focus on its h1. A prova with no text shows a dashed card in the secção colour: "Texto em preparação", then who to ask and the next step.

### Programa
The secção's trimester calendar, from `src/config/programa.js`, which loads a secção's years on demand (one chunk per secção, 5–12 KB gzipped; while it arrives the band and the back link are already there) from one file per secção and scout year in `src/config/programas/<secção>/<yyyy>-<yy>.js` (each with a `year` and numbered months; `programa.test.js` checks every weekday against its date). The past years were transcribed from the secções' own programas (Livros de Unidade, Programa sheets and PDFs back to the late 1990s), keeping their wording in today's spelling; a year that only left an activity report is a sparse calendar of the main activities it dates (the "Fonte" comment in each file says which); a time span ("09h00–18h00 - Venda de Calendários") gets a wider time column so it stays on one line. Same band as the prova pages, left-aligned: secção name, "Programa", the trimester, one lead line (on phones a shorter band, 1.5rem padding, with the trimester line for screen readers only, since the pressed button names it); then a back link naming the secção.
- **Years and trimesters:** each secção has its scout years, newest first, each with its trimesters (a secção with no programa for the current year opens on its latest one). Always three buttons in a row ("1.º Trimestre / Out.–Dez. 2026", `aria-pressed`, the chosen one in the secção fill) pick the calendar. Only the current trimester (the first not yet over, so in a break the one about to start) and those before it can be opened; later ones are dashed, disabled and read "Em breve". Past years are reached from an "Ano escutista" dropdown beside them (a native select dressed like the buttons: same hairline border, radius and 56px height, the year in 16px/800 tabular figures, a small chevron) (one toolbar: the three "Trimestre" buttons centred on the page and "Ano escutista" on the right, each under its label, at the same 56px height; the year comes first in the tab order, as the choice the trimesters depend on; when the toolbar is narrower than 52rem (a size container, so from about 832px at normal text, and earlier at larger text sizes) the select sits on its own line on the right and the buttons span the full width below, and at 600px and below the "Trimestre" label is for screen readers only), listing only years with something to open. Changing trimester or year fades the new months in (400ms, all together), only on a change the reader makes, never on arrival or a reload; with reduced motion it's a shorter fade. The choice is in the URL (`?ano=2025-26&trimestre=2`); the page opens on the current trimester, and changing the year keeps the trimester you picked (a year that doesn't have it shows its latest, but the pick carries over to the next year). A trimester not yet open in the URL falls back to the current one. At 400px and below the buttons read "1.º" (the word stays for screen readers).
- **Knows the date:** in the calendar, the next day (or the one on now) is framed in the secção ink, with its number filled; screen readers hear "(próxima atividade)" or "(hoje)". There is no separate "Próxima atividade" card (the owner didn't want one). Past days turn gray (gray-50 fill, gray-500 text: no opacity, so contrast holds), a month that is over gets a gray-200 bar (that gray is only for a trimester partly over: one entirely in the past, an archive someone opened, reads in full colour), and screen readers hear "(já passou)".
- **Day cells:** the date leads (number and weekday together, top-left), then the activities left-aligned, one line per part and no times (the sources' hours changed week to week and the weekly email carries them).
- **Dates:** each day is a `<time datetime>`; labels are 12px in rem (were 10px px); ranges use en dashes ("24–25", "Sáb–Dom").
- **Day numbers:** only the next day's number is filled in the secção colour; other days to come are ink numbers in a thin secção-colour ring, past days gray. Colour points at one thing.
- **Layout:** the months share a 12-track grid so any count fills its rows evenly: 3 thirds, 2 halves, 4 quarters, 5 as three thirds then two halves (a trimester that runs into July/August for a camp has 4 or 5 months). The grid is a size container and the column rules are container queries in rem, so they follow the text size as well as the screen: 4 quarters become two rows of two under 68rem of grid (a 1200px screen at normal text), 2 per row under 64rem with an odd last month taking the full row, 1 per row under 34rem (phones; at 200% text a 1280px screen still gets two per row). Past months fold at 768px and below. A trimester with no programa in a past year is a blocked button reading "Sem programa", like a future one's "Em breve". Each month's frame ends at its last day (a stretched last day left a blank half-cell that read as a missing activity); every day cell has the same small space above the date and under the last line. A camp that ends in the next month is one range in the month it starts, its end pill followed by that month ("30 – 1 Nov.", `monthEnd` in the data). Activities are one line per part (the sources' "A + B" is two lines), with a place or topic after a dash ("Acampamento de Carnaval - Óbidos", "Balú Ensina - Cargos"), the real activity before an imaginário title ("Planetário - Popeye nas Estrelas"), and no parenthetical notes except who a day is for (Guias, Sub-Guias, Chefes). The sede is the default place, so it isn't named ("Sede - Reunião" is "Reunião"; the same for the Alcateia's Covil and the Clã's Albergue); activities about the sede keep it ("Limpeza da Sede", "Dia da Sede"). A closed day says nothing (no "Não há escuteiros" / "Fechado" lines; the day is simply absent), and "Encerramento" is not an activity. "A / B" is two lines when it is two activities ("Abertura do Ano / Passagens"), one when it is one thing written two ways ("Missa de Agrupamento / Promessas", "Progresso/Provas", "Escalada/Rappel", "Elvas/Badajoz"); the sources' logistics tails ("5€, almoço e lanche") are dropped. Two days in one week (20/21 March) stack at the month's full width, split by a dashed rule so they still read as one week; months side by side end on one line. On phones, months already over fold behind "Ver os meses anteriores (…)", so the page opens at the current month. The floating button is hidden here, as on prova pages.

### Documentos
A list of PDFs with an inline viewer only where it fits: wide screens (≥769px) with a hover pointer, the same query in JS (`PREVIEW_QUERY`) and CSS. There, a row is a toggle (`aria-pressed`, green-light fill and green border when open) and the viewer beside it says "Seleciona um documento para o visualizar." until one is picked. Everywhere else (phones, tablets, narrow windows) a row is a link that opens the PDF in a new tab, marked by an external-link icon and "(abre numa nova janela)" for screen readers; no viewer is drawn. A browser without an inline PDF viewer (`navigator.pdfViewerEnabled` false) gets the links too. Closing the viewer returns focus to the document's row. Every row has a named download icon ("Descarregar {nome}") with a 44px tap area on touch; downloads are saved as "{nome}.pdf", not the hashed build name. Names wrap (hyphenated) rather than truncate. Under each name a gray line gives type and size ("PDF · 1,3 MB"), also in the download link's name; the size is read from the file at build time (`?bytes` import, a small plugin in `vite.config.js`), so it can't drift. No search: four documents don't need one.

### Banco de Fardas inventory
The inventory is the page's job; the explanation ("Como funciona?") stays short above it (three steps side by side down to 601px, icon-beside-text rows on phones).
- **Category switch:** a two-button pill group (`aria-pressed`) on equal columns, so the half-width Verde Mata slider sits exactly on either label.
- **Only what's on the shelf:** a card with stock lists its sizes as chips ("M ×2", Verde Mata count); an empty card is quieter (gray-50 fill, faded photo, gray-700 name) and says "Sem stock" once, then the sizes it comes in. Empty items sort after stocked ones. When a whole category is empty, one dashed notice says so ("De momento não há peças disponíveis nesta categoria.") with a link to the contact block, and the cards drop their "Sem stock".
- **Por secção:** a tile per secção (name, ages from `seccoes.js`, "N peças" when any) for the pieces that come in secção sizes (jarreteiras, lenços). The secção colour is a 4px top band drawn as a background layer so the corner radius clips it; a pressed tile takes a 16% tint of it. Tiles with pieces are filter toggles; the rest are plain.
- **Por tamanho:** chips appear only for sizes that have stock, so a filter never empties the grid. While a filter is on, a line above the grid says what it shows ("1 artigo no tamanho M" / "para Lobitos") with "Ver todos", which hands focus back to the control that set the filter. Every change is announced in the same words.
- **Phones (≤600px):** the grid becomes a one-column list, photo left, name and sizes right.
- **Motion:** the category switch's slider glides (300ms); a filter or category change slides the cards that stay to their new grid cell and fades in the ones that arrive, with the same `useFlipList` hook (`src/utils/useFlipList.js`) as the Cancioneiro list; the filter line fades in (200ms). Reduced motion keeps the fades and drops the slides.
- **Vocabulary:** *artigo* is an item in the list, *peça* a physical piece (the tile counts), *Sem stock* none on the shelf.
- **Data:** hand-edited in `src/config/bancoDeFardas.js`; `bancoDeFardas.test.js` guards the ISO `lastUpdated` date, unique names and sizes, and whole non-negative quantities.

### Modals & Sheets (signature)
One grammar, one file: `src/styles/dialog.module.css` (`overlay`, `panel`, and `panelScroll` for short forms), with each dialog adding only its size. Desktop: centred panel, 16px radius, `--shadow-dialog`, materialising at 300ms via `panelIn` (fade + `translateY(12px) scale(0.98)`) over a 200ms fading `--overlay-scrim`. Phones (≤768px): the same panel rises as a full-width bottom sheet (`sheetIn`, 48px along its dismissal axis, top corners only, safe-area padding at the bottom, at most 95dvh). The songbook builder, suggest a song and report an error all use it; a new dialog imports it rather than restyling one.

## Do's and Don'ts

### Do:
- **Do** use the tokens in `src/styles/variables.css` for every color, spacing, font size, radius, and shadow — no hardcoded values.
- **Do** use `--transition-interactive` for all hover/press/focus states — it transitions only compositor/paint-safe properties.
- **Do** give every pressable element instant press feedback (`scale(0.97)` on `:active`); links styled as buttons need it added explicitly.
- **Do** verify every surface at 1024px, 768px, and 600px, and give every control a 44px touch target in a `@media (pointer: coarse)` block (`min-height: 44px`, or an invisible `::after` inset when the visual is small by design); chords over lyrics are the one 24px exception.
- **Do** respect `prefers-reduced-motion` (globally, transitions keep only non-moving properties: opacity first, then colour, border, shadow, fill; keyframe animations are cut unless a component overrides with a still version), `prefers-reduced-transparency`, and `prefers-contrast: more` (header falls back to solid white).
- **Do** guard hover-dependent interactions with `@media (hover: none)` / `isTouchDevice()` — hover+click on one element causes double-tap bugs on mobile.

### Don't:
- **Don't** use `transition: all` — ever. It animates layout properties and causes jank.
- **Don't** set Amarelo Flor-de-Lis text on white backgrounds; the contrast fails. Yellow lives on dark photography, deep greens, or as filled shapes carrying dark text.
- **Don't** put small text in Verde Escutista or white text on a Verde Escutista fill (3.83:1). Use Verde Mata (The Small Green Rule).
- **Don't** use Cinza Suave (#a3a3a3) or lighter for text; it is 2.5:1.
- **Don't** nest `backdrop-filter` materials (the mobile nav panel is solid white on purpose).
- **Don't** animate layout properties (width, height, top, margin); move things with `transform` and fade with `opacity`.
- **Don't** introduce a second font family or positive letter-spacing on large text.
- **Don't** add resting shadows to in-flow content; elevation is a response, not a costume (The Ambient Response Rule).
