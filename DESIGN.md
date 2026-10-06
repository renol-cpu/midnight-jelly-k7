---
name: Sứa Đêm
description: Huy's jellyfish room after closing time. Lit tanks and museum placards on a tank-room indigo ground.
colors:
  abyss: "#0a0d29"
  abyss-2: "#10163a"
  abyss-3: "#18204f"
  abyss-4: "#222c66"
  ink: "#eaf2ff"
  mist: "#a9b8da"
  moon: "#9cc8ff"
  moon-deep: "#5e93e6"
  coral: "#ff8a7a"
  flame: "#ff7a3d"
  rose: "#f06bb0"
  pearl: "#f3eedb"
  label: "#eef3ff"
  label-2: "#dfe7fb"
  label-ink: "#0a0d29"
  label-mist: "#46507a"
  stamp-red: "#b3261e"
  note-paper: "#ffe3ef"
  note-rose-ink: "#9c2662"
typography:
  display:
    fontFamily: "Baloo 2, Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "3.2rem"
    fontWeight: 800
    lineHeight: 1
  headline:
    fontFamily: "Baloo 2, Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Baloo 2, Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.08
  body:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  tank: "28px"
  ctl: "14px"
  placard: "6px"
  chip: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.moon}"
    textColor: "{colors.abyss}"
    rounded: "{rounded.ctl}"
    padding: "12px 22px"
    height: "52px"
  button-love:
    backgroundColor: "{colors.rose}"
    textColor: "#2a0718"
    rounded: "{rounded.ctl}"
    padding: "12px 22px"
    height: "52px"
  button-flame:
    backgroundColor: "{colors.flame}"
    textColor: "#2a0d02"
    rounded: "{rounded.ctl}"
    padding: "12px 22px"
    height: "52px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.ctl}"
    padding: "12px 22px"
  chip:
    textColor: "{colors.mist}"
    rounded: "{rounded.chip}"
    padding: "4px 12px"
  chip-on:
    backgroundColor: "{colors.moon}"
    textColor: "{colors.abyss}"
    rounded: "{rounded.chip}"
  placard:
    backgroundColor: "{colors.label}"
    textColor: "{colors.label-ink}"
    rounded: "{rounded.placard}"
    padding: "14px 16px"
  option:
    backgroundColor: "{colors.label}"
    textColor: "{colors.label-ink}"
    rounded: "{rounded.placard}"
    padding: "12px 14px"
    height: "54px"
  tank:
    backgroundColor: "{colors.abyss-3}"
    rounded: "{rounded.tank}"
  gauge-strip:
    backgroundColor: "{colors.abyss-2}"
    rounded: "{rounded.ctl}"
    padding: "10px 14px"
  note-on-glass:
    backgroundColor: "{colors.note-paper}"
    textColor: "#3a0c22"
    rounded: "{rounded.placard}"
    padding: "14px 16px"
---

# Design System: Sứa Đêm

## Overview

**Creative North Star: "The Room After Closing"**

Every screen is a lit aquarium window beside its museum label, in a dark tank room. The ground is indigo (#0a0d29 rising to #18204f at the top edge); colour does not live on the ground. It lives only inside lit tanks (footage, jellyfish, glow) and on plates (placards, option cards, Minh's note).

The system reads as a quiet museum for one person: cool white label stock with near-black type for everything the player must read and answer, luminous blue-white for the active state, and a few warm accents each tied to one meaning. Mobile-first single column, max 560px, centred; on wide screens the column is framed by a faint blue hairline and glow.

**Key Characteristics:**
- Dark indigo ground, colour quarantined to tanks and plates.
- Two surface families: lit tank (28px, rounded, atmospheric) and label stock (6px, square-ish, legible).
- Moon blue is the single action and "correct" colour; coral is the mistake colour; flame is streak and low oxygen; rose is Minh and love.
- Signature motion: jellyfish bell pulse on correct, dozing tilt on wrong.

## Colors

Cool night-water neutrals with one luminous blue and three warm, single-purpose accents.

### Primary
- **Moon-Jelly Ice Blue** (moon): primary actions, focus ring, selected and correct states, active tab, listening content.
- **Deep Moon** (moon-deep): selected and correct option key badge, habitat bars filled.

### Secondary
- **Reading Coral** (coral): wrong answers, trap notes, reading content.
- **Streak Flame** (flame): streak button, low-oxygen gauge.
- **Minh Rose** (rose): love button, Minh's story beats. Note-on-glass paper (note-paper) with rose ink (note-rose-ink) is the pinned-note treatment.

### Neutral
- **Abyss ground** (abyss, abyss-2, abyss-3, abyss-4): page ground, sheets and feedback, gradient top light, jellydex cells and tank depth.
- **Ink and Mist** (ink, mist): primary text on ground and secondary text.
- **Pearl** (pearl): light-count figure, Bé Sứa beat name.
- **Label stock** (label, label-2, label-ink, label-mist): placards, options, passages, tables; always black-indigo type on cool white.
- **Stamp red** (stamp-red): the WRONG stamp on an option only.

### Named Rules
**The Quarantine Rule.** Saturated colour appears only inside a tank or on a plate. The page ground stays indigo.
**The One Blue Rule.** Moon blue means "act here" or "right". Do not reuse it as decoration.
**The Label Ink Rule.** Text on label stock is label-ink or label-mist, never white and never an accent.

## Typography

**Display Font:** Baloo 2 (with Be Vietnam Pro, system-ui)
**Body Font:** Be Vietnam Pro (with system-ui, sans-serif)

**Character:** Rounded, friendly display weight over a clean Vietnamese-capable body face; Vietnamese diacritics are first class.

### Hierarchy
- **Display** (800, 3.2rem, 1): big numerals such as the Day number; tabular figures.
- **Headline** (800, 1.6rem, 1.08): placard species name and screen titles; word card uses 2rem.
- **Title** (800, 1.25rem, 1.08): feedback verdicts and sub-heads.
- **Body** (400, 1rem, 1.55): UI text; question stem is 500 at 1.12rem / 1.6; passages 0.97rem / 1.65.
- **Label** (500 to 600, 0.72 to 0.82rem): guide line at the head of each screen ("Ngày 3 · Part 5 · 4/10"), tab labels, placard specimen number, chips. Latin names on placards are italic.

### Named Rules
**The Guide Word Rule.** Orientation is a plain sentence-case guide line at the head of the screen, not decorative micro-labels.
**The Tabular Rule.** Every number that changes uses tabular-nums.

## Layout

Single column, max 560px, three-row grid (guide line, screen, sticky tab bar). Screen padding 12px 16px 24px; vertical gap 16px between blocks, 10 to 12px inside groups. Tab bar is four equal columns, 52px minimum tap height, with safe-area padding. Home hero tank is 62dvh minimum; the in-dive tank band is 176px so the question owns the viewport. Jellydex is a 3-column grid, 10px gap, 3:4 cells. Touch targets are at least 44px, primary controls 52px.

## Elevation & Depth

Hybrid: tonal layering on the ground plus one soft shadow for tanks and plates. Depth inside tanks comes from a radial gradient, a bottom darkening veil, and a slow caustic light sweep (screen blend).

### Shadow Vocabulary
- **Tank shadow** (`0 2px 4px rgba(4,6,24,0.4), 0 18px 40px -16px rgba(4,6,24,0.85)` plus 1px inner white 7% edge): tanks and photos.
- **Placard lift** (`0 12px 26px -14px rgba(0,0,0,0.7)` plus top inner highlight): placards.
- **Moon glow** (`0 10px 28px -12px rgba(156,200,255,0.75)`): primary button and right option only.

### Named Rules
**The Soft Light Rule.** Shadows are diffuse and tinted by the ground; no hard offset shadows.

## Shapes

Three radii carry meaning: tanks 28px (windows of water), controls 14px (buttons, gauges, feedback, beats), placards and options 6px (paper label stock). Chips and dots are full pill or circle. Jellydex cells use 18px. Habitat bar segments are 2px. Wrong answers get a slightly rotated rectangular stamp (4px radius, 2px red border).

## Components

### Buttons
- **Shape:** 14px radius, 52px min height, 12px 22px padding, 600 weight.
- **Primary:** moon fill with abyss text and moon glow. **Love:** rose fill, **Flame:** flame fill (dark brown-black text). **Ghost:** transparent with 28% line border. **Quiet:** mist text, no fill, 44px.
- **Press:** scale 0.98 in 150ms; disabled at 45% opacity, no glow. Focus: 2px moon outline, 3px offset.

### Chips
Pill, hairline border, mist text; selected fills moon with abyss text.

### Placard (signature)
Label stock, 6px radius: specimen number and tabular figures at top, headline name, italic Latin name, nine-segment habitat bar (filled segments take the rank colour).

### Option cards
Label stock rows with a 30px key badge. Selected: 3px moon ring. Right: moon ring plus glow. Wrong: rotated red stamp that stays.

### Tank
Lit window with footage or image, veil and caustics; hero and compact band variants. Gauges (oxygen cylinder pill, light count) sit on it as a translucent blurred strip.

### Note on the glass
Pale rose paper, rotated -1.2deg, translucent tape strip, rose signature.

### Jellyfish
SVG bell and tentacles drift and sway continuously; correct triggers a 0.9s bell contraction; wrong triggers a 1.4s doze tilt with dimming. A bloom of blue radial light marks a completed dive.

### Navigation
Sticky four-tab bar on blurred 92% abyss, hairline top border, mist labels, active tab moon at 600.

## Do's and Don'ts

### Do:
- **Do** keep reading and answering surfaces on label stock with label-ink type.
- **Do** keep colour inside tanks and plates; leave the ground indigo.
- **Do** use 28px, 14px and 6px radii for their stated surfaces.
- **Do** honour reduced motion (the stylesheet disables animation under the OS preference or the in-app setting).

### Don't:
- **Don't** make a cartoon quiz app with progress bars and confetti.
- **Don't** put accent colour on the ground or use moon blue as decoration.
- **Don't** let a mistake vanish; it is stamped and stays.
