---
name: Alex — Senior Fullstack Portfolio
description: A cinematic bilingual portfolio told as a nine-part story deck or a skimmable text summary.
colors:
  surface-ink: "#06111f"
  surface-ink-soft: "#0b1728"
  card-veil: "rgba(2, 6, 23, 0.55)"
  line-cold: "#28415f"
  line-warm: "#8a6a42"
  instrument-amber: "#e7b867"
  instrument-amber-soft: "#fef3c7"
  signal-sky: "#7dd3fc"
  text-primary: "#f8fafc"
  text-secondary: "#cbd5e1"
  text-muted: "#94a3b8"
typography:
  display:
    fontFamily: "Aptos, Manrope, IBM Plex Sans, Segoe UI, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "0em"
  headline:
    fontFamily: "Aptos, Manrope, IBM Plex Sans, Segoe UI, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0em"
  title:
    fontFamily: "Aptos, Manrope, IBM Plex Sans, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.56
    letterSpacing: "0em"
  body:
    fontFamily: "Aptos, Manrope, IBM Plex Sans, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "0em"
  body-small:
    fontFamily: "Aptos, Manrope, IBM Plex Sans, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "0em"
  label:
    fontFamily: "Aptos, Manrope, IBM Plex Sans, Segoe UI, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.18em"
  control:
    fontFamily: "Aptos, Manrope, IBM Plex Sans, Segoe UI, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0.1em"
rounded:
  sm: "1rem"
  md: "1.5rem"
  lg: "1.75rem"
  xl: "2rem"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  button-secondary:
    backgroundColor: "rgba(2, 6, 23, 0.25)"
    textColor: "{colors.text-secondary}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  button-pause:
    backgroundColor: "rgba(231, 184, 103, 0.10)"
    textColor: "{colors.instrument-amber-soft}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  language-active:
    backgroundColor: "{colors.instrument-amber-soft}"
    textColor: "{colors.surface-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  language-idle:
    backgroundColor: "rgba(2, 6, 23, 0.20)"
    textColor: "{colors.text-secondary}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-stack:
    backgroundColor: "rgba(125, 211, 252, 0.06)"
    textColor: "{colors.text-primary}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  card-story:
    backgroundColor: "{colors.surface-ink-soft}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "32px"
  card-section:
    backgroundColor: "rgba(2, 6, 23, 0.35)"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "20px"
  icon-link:
    backgroundColor: "rgba(231, 184, 103, 0.10)"
    size: "44px"
    rounded: "{rounded.pill}"
  monogram:
    backgroundColor: "rgba(231, 184, 103, 0.10)"
    textColor: "{colors.instrument-amber}"
    typography: "{typography.control}"
    size: "36px"
    rounded: "{rounded.pill}"
---

# Design System: Alex — Senior Fullstack Portfolio

## Overview

**Creative North Star: "The Signal Room"**

The portfolio behaves like a dark instrument room tuned to two signals. Deep navy-black air fills the frame; a faint 44px grid fades in from the top; one narrow story card sits in the center like a console readout. Warm Instrument Amber marks attention and action, while cool Signal Sky marks system information and focus. The atmosphere is cinematic, but the content is operational: a progress rail ticks across nine segments, labels are uppercase and exact, and every claim is set in plain sight.

The system is built for a bilingual, credibility-first portfolio. It never assumes English string lengths, so Russian copy must fit the same frames without collapsing the rhythm. The story deck is deliberately narrow and viewport-locked; the text mode opens into a wider reading column. Both modes share the same ink surfaces, hairline borders, and two-signal palette, so switching modes changes density, not identity.

Density is low by design. One idea occupies each story frame; one section occupies each text card. Ornament is limited to atmospheric background washes, a single arc, a short gradient rule, and the progress rail. The interface recedes so the engineering narrative leads.

**Key Characteristics:**
- Deep ink surfaces with a warm-to-cool atmospheric wash and a masked 44px grid.
- Two accents only: warm Instrument Amber and cool Signal Sky, used as thin lines and small fills.
- Rounded instrument controls: pills, 1px luminous borders, uppercase micro-labels.
- One narrow story column, one wider text column, both built for English and Russian parity.
- Ambient depth: translucent cards, inset top light, and one structural shadow on the story stage.
- Motion is a quiet crossfade and a linear progress tick; reduced motion freezes the deck.

## Colors

The palette is a dark navy instrument panel with one warm readout and one cool signal, never a colorful interface.

### Primary
- **Instrument Amber** (#e7b867): The warm signal. Used for eyebrows, the pause control, monogram ring, hairline rules, the warm end of the progress gradient, and warm-accented highlight items. It carries attention without becoming a fill.
- **Soft Amber** (#fef3c7): The active-state fill. Used for the selected language pill and as pause-control text. This is the only large amber fill in the system.

### Secondary
- **Signal Sky** (#7dd3fc): The cool signal. Used for focus outlines, hover borders, stack chips, systems accents, cool rule shadows, and the cool middle of the progress gradient. It indicates system response, not action.

### Neutral
- **Deep Ink** (#06111f): Page base and the darkest end of the body gradient.
- **Ink Soft** (#0b1728): Raised card base and the lighter end of dark surfaces.
- **Card Veil** (rgba(2, 6, 23, 0.55)): Translucent fill for the text summary header; sections use the same ink at 35%.
- **Cold Line** (#28415f): Informational borders and dividers, usually applied at 30–65% opacity.
- **Warm Line** (#8a6a42): Warm hairline borders and the amber rule shadow at low opacity.
- **Text Primary** (#f8fafc): Headings and primary reading text.
- **Text Secondary** (#cbd5e1): Body copy, controls, and supporting labels.
- **Text Muted** (#94a3b8): Footer text and de-emphasized metadata.

### Named Rules
**The Rarity Rule.** Amber and sky are evidence, not decoration. Keep both accents under roughly 10% of any screen; large fields remain ink.

**The Two Signals Rule.** Amber means warmth, attention, and action; sky means system, information, and focus. Never swap their roles for variety.

## Typography

**Display Font:** Aptos, with Manrope, IBM Plex Sans, Segoe UI, and the system sans fallback
**Body Font:** The same stack
**Label Font:** The same stack, uppercase and tracked

**Character:** An operational grotesque. There is no second family and no serif. Personality comes from weight, scale, and tracking: semibold headings sit tight, body copy stays plain, and uppercase micro-labels act like instrument engraving. The system stack is deliberate: it renders natively, loads fast, and keeps the focus on the narrative.

### Hierarchy
- **Display** (600, clamp(1.25rem, 5vw, 1.875rem), 1.08): Story titles. Tight leading and a balanced measure; the largest type in the system.
- **Headline** (600, 1.875rem, 1.25): Text-mode page title. Slightly more open than story display because it is read, not performed.
- **Title** (600, 1.125rem, 1.56): Section headings in text mode.
- **Body** (400, 1rem, 1.625): Story lines and primary prose; story lines cap at 45ch.
- **Body Small** (400, 0.875rem, 1.43): Text-mode list items, descriptions, and footer copy.
- **Label** (700, 0.625rem, 0.18em, uppercase): Eyebrows such as "I'M ALEX", "PROFILE", and "CONTACT".
- **Control** (600, 0.6875rem, 0.1em, uppercase): Navigation buttons, language pills, and micro-controls.

### Named Rules
**The One Family Rule.** Use the system sans only. Build hierarchy with weight, size, and tracking; do not introduce a display face.

**The Micro-Label Rule.** Uppercase labels stay at 12px or below and carry at least 0.1em tracking. Never set an uppercase label in body size.

## Layout

Story mode is a viewport-locked experience: a `max-width: 72rem` shell with `100dvh`, a compact header row, a nine-segment progress rail, and a centered story column capped at `28rem`. The stage height is `min(74dvh, calc(100dvh - 210px))` with a `min-height` of `min(320px, calc(100dvh - 210px))`; the card is 448px wide on desktop and 358px at a 390px viewport. Text mode uses a `48rem` reading column with stacked rounded sections and a footer.

The spacing rhythm is 4, 8, 12, 16, 20, 24, and 32px. Card padding steps from 16px on small screens to 32px on desktop. Story titles step from 20px to 30px; text-mode sections step from 18px to 30px for the page title. The primary breakpoint is 640px.

**The One Column Rule.** Story content stays in a single narrow column. Do not split the story card into multi-column layouts at desktop; the narrow measure is the pacing.

## Elevation & Depth

Depth is atmospheric rather than stacked. The body carries three background layers: a warm 115° wash from the top left, a cool radial glow at 82% 12%, and a navy 135° base from `#172235` through `#06111f` to `#020614`. A 44px grid overlay sits above the base and fades out by 74% of the viewport height.

Cards use translucent ink, a 1px cold border, and an inset top light to read as raised. Only the story stage casts an outward shadow. There is no glass blur, no neon glow, and no shadow stack.

### Shadow Vocabulary
- **Stage** (`0 28px 90px rgba(0, 0, 0, 0.34)`): The single structural shadow, applied to the story stage.
- **Card Inset** (`inset 0 1px 0 rgba(255, 255, 255, 0.08)`): Top edge light on the story card and text header.
- **Section Inset** (`inset 0 1px 0 rgba(255, 255, 255, 0.05)`): Softer top edge light on text sections.
- **Warm Rule** (`inset 3px 0 0 rgba(231, 184, 103, 0.34)`): Left rule for leadership highlight items.
- **Cool Rule** (`inset 3px 0 0 rgba(125, 211, 252, 0.38)`): Left rule for emphasized philosophy lines.

### Named Rules
**The Single Structural Shadow Rule.** Only the story stage casts an outward shadow. Every other surface earns depth through translucency, borders, and inset edge light.

**The Still Air Rule.** Background washes and grid are fixed atmosphere, not per-card effects. Do not add a new glow to each component.

## Shapes

Pills dominate the control language: navigation buttons, language pills, stack chips, progress segments, monogram, and contact icons all use a full `9999px` radius. Cards use generous radii: 32px for the story stage, 28px for the text header, 24px for text sections, and 16px for inner tiles.

Borders are always hairlines, never heavy frames: 1px cold slate at 30–65% opacity, with amber or sky at 15–45% for accented rules. The only decorative geometry is a thin 44px arc in the top-right of the story card and a short horizontal gradient rule near the bottom-right. There are no sharp corners and no clipped edges.

## Components

### Buttons
- **Shape:** Full pill (`9999px`), 6px by 12px padding, 11px uppercase semibold label with 0.1em tracking.
- **Secondary:** Ink veil at 25% with a cold 60%-opacity border and secondary text. Used for Previous and Next.
- **Pause:** Amber tint at 10% with an amber border and soft-amber text. This is the one action-colored control.
- **Hover / Focus:** Border shifts to sky and text to white. Focus uses a 2px sky outline with a 2px offset.
- **Contact icons:** 44px amber-tinted circles with 1px amber borders and 20px inline icons.

### Chips
- **Stack chips:** Sky tint at 6% with a sky border at 25%, pill shape, 4px by 10px padding, centered 12px medium text.
- **Systems chips:** Neutral ink veil at 25% with a cold border; the systems diagram uses three accent tiles for API, Queue, and Data.
- **Highlight chips:** Warm amber tint at 5.5% with a warm left rule and 16px radius; problem cards use neutral tint with an inset top light.

### Cards / Containers
- **Story card:** 32px radius, translucent ink gradient per variant, 1px cold border, inset top light, and 16–32px padding. Content is top-aligned with generous empty space below.
- **Text section:** 24px radius, ink veil at 35%, 1px cold border at 30%, 20px padding, centered copy.
- **Text header:** 28px radius, ink veil at 55%, 24px padding, centered title and intro.

### Navigation
- **Header:** 36px circular LX monogram, language pills, and a 36px square icon link to the other mode. The row is compact and sits above the content.
- **Story controls:** A 12px counter on the left; Previous, Pause, and Next pills on the right. The same pill language carries into the footer contact links.
- **Language:** Current language is a soft amber fill with ink text; the inactive language is an ink veil with a cold border and secondary text.

### Signature Components
**Story Stage.** A 32px-radius card with a per-variant ink gradient, a faint 38px internal grid, a top-right arc, a bottom-right gradient rule, and an eyebrow/title/lines rhythm. Above it, the progress rail uses nine 4px segments with a cooled track and an amber-to-sky-to-white fill driven by requestAnimationFrame. The first three-fifths of the card is divided into invisible previous, pause, and next hit zones.

**Mode Switch.** A 36px circular icon link swaps between the story deck and the text summary with a shared `mode-toggle` transition. The icon changes from a document to a four-tile grid.

## Do's and Don'ts

### Do:
- **Do** keep surfaces ink and let amber and sky appear as thin lines, small fills, and labels.
- **Do** build hierarchy from weight, size, and tracking within the single system sans.
- **Do** keep the story column at `28rem` and the text column at `48rem`.
- **Do** use pill controls with 1px luminous borders and uppercase micro-labels.
- **Do** keep the 44px background grid with its top-down mask.
- **Do** use the 240ms opacity crossfade and freeze motion under `prefers-reduced-motion`.
- **Do** preserve the raised-card reading: 1px cold border plus inset top light.

### Don't:
- **Don't** fill large areas with amber or sky; their rarity is the point.
- **Don't** add a second display family, serif, or decorative script.
- **Don't** give every card an outward drop shadow; only the story stage casts one.
- **Don't** square the corners or remove the inset top light.
- **Don't** widen the story card into a multi-column layout.
- **Don't** use pure black or pure white as surface or body text; use ink and slate-white.
- **Don't** add glass blur, neon glow, or per-component background washes.