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
- Motion is compositor-friendly, brief (150–300ms), and fully disabled under `prefers-reduced-motion`.

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

**Home reads down one left edge**, matching the hero copy's lower-left anchor, with one centred pause: the lead paragraph (max 40rem, centred at every width; half a section gap below the hero and a full one after it, because it continues the hero rather than opening a section) → the Age Ladder ("Uma caminhada dos 6 aos 22 anos") → the invitation ("Queres fazer parte?", "Três passos, ao teu ritmo.", three steps and Inscreve-te, beside a supporting photo capped at 28rem) → "Últimas aventuras" (the latest story at double weight beside a 2×2 of the next four; equal grid rows so both columns end together; titles and dates always visible under the photos; each photo develops like a print the first time it has both loaded and come on screen — from a pale monochrome at 1.04 scale to full colour at rest, 1200ms ease-out with the fade done by 450ms, photos arriving together 90ms apart in reading order; under reduced motion they simply appear; cards press to 0.98) → the Cancioneiro band ("O nosso cancioneiro"). Who the group is and how to join come before what it has been doing. The address stays in the footer only. Heading outline: one `h1` (hero), `h2` per section (footer titles included), `h3` per story.

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
- **FAB (email, then back to top):** 52px Verde Mata circle (48px on phones), fixed bottom-right, present on every page except Contactos (whose own Email card is right there, and where it covered the map) and the Cancioneiro list on phones (≤768px), where it would sit on every row's "+" and the filters' "Mostrar N canções"; the sticky search and A–Z picker cover getting around there. Near the top of the page it is the email action (envelope, `mailto:` the agrupamento); past 300px of scroll the envelope turns into an up arrow (a quarter-turn and scale crossover, 360ms ease-out; a plain crossfade under reduced motion) and it scrolls back to the top (instantly under reduced motion), moving focus to the content. Its accessible name follows the action. Grows `1.08` on hover (hover-capable pointers only), `0.95` on press. Both switches are driven by IntersectionObservers (a 1px marker 300px down the page; the footer crossing the button's centre line), not a scroll handler. While it sits over the footer's green it switches to the footer's own action colours — white fill, Verde Profundo icon, white focus ring — because a green circle on green reads as a blob.

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
- **Song page, the song leads:** title, then an actions row (PDF, "Adicionar ao teu cancioneiro", and a songbook link that is always there: "Faz o teu Cancioneiro" or "Abrir o teu cancioneiro (N)"), then one settings bar (Acordes · Tom − C + ↺ · C D E / Dó Ré Mi · A− A+) directly above the lyrics at every width. Desktop: that one-row bar is sticky flush under the header. Phones: it wraps to two rows, so it stays in place, and once it has scrolled away a one-row compact bar (Tom − C + ↺ and A− A+, about 55px, gray-100 with a hairline and small shadow) slides down from under the header; it is fixed, so appearing never moves the lyrics, and it is inert while hidden. Every song opens in its own key: a transposition is dropped whenever the song changes, including on the way back. Nothing appears or disappears above the lyrics while reading: the ↺ reset keeps its place (hidden in the original key) and on narrow phones the add button takes its own line, so adding a song or transposing never moves the lyrics. Desktop: lyrics left, a sticky sidebar right (recording, tags), prev/next under the lyrics; phones: lyrics, then recording and tags, then prev/next.
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

### Contactos
Reference first, then actions, then the map.
- **Contact panel:** one white panel (Cinza Linha border, `--radius-xl`) with a column per section present: Email, Morada, Redes Sociais, split by hairlines. A section whose config list is empty is left out, and the others share the width. Headings carry a small green icon inline, with no round icon discs. Column content is centred vertically, so the short Email column doesn't hang from the top. On phones (≤768px) the columns stack as rows split by hairlines, left-aligned.
- **Outros pedidos:** the only cards on the page, three Verde Nevoeiro rows (dark-green icon disc, title, one line, then an arrow for a page or an envelope for email). "Fazer parte" opens an email with "Inscrição no Agrupamento 80" as the subject, "Banco de Fardas" and "Reservar Alojamento" open their pages. On hover the row fills dark green, on hover-capable pointers only. Phones: stacked, 8px apart and 24px below the panel.
- **Map:** the Google embed, lazy-loaded, fading in over a gray-100 placeholder once loaded. Its rounded wrapper would clip a focus ring, so the page draws the ring on the wrapper while focus is inside the map (it listens for the window losing focus to the iframe).
- **Links:** "Ver no Google Maps", Facebook and Instagram say "(abre numa nova janela)" to screen readers. The floating button is hidden on this page.

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
- **Do** respect `prefers-reduced-motion` (motion collapses to ~0ms globally), `prefers-reduced-transparency`, and `prefers-contrast: more` (header falls back to solid white).
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
