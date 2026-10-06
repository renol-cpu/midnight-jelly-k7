# 06 · Build blueprint: visuals, audio, tech, shipping

## Quality bar

Two earlier games are the floor, not the target: **Rắn công sở** (Saigon-river cutaway tower, rooms as a floor plan, elevator-door promotions, Remotion films) and **Delivered ✓✓** (a 14-day messenger with authored tick motion, calls, a floor map and stickers). Both commit to one world, one accent color, one signature motion and full light/dark theming. Midnight Jelly must beat them on three things they did not have: **real audio**, **a living animated world** (not static panels) and **a story twist that recontextualizes play**.

## Visual direction (the impeccable and taste skills are loaded at build time)

- **World:** a night dive. The UI is a dive computer/HUD floating in dark water, not a web page with a blue theme.
- **Palette:** abyss navy ground (#050B14 → #0B1A2A by depth), one committed accent of **bioluminescent cyan** (#5CF2E0) for what is lit, current or correct, and a warm **coral** (#FF7A6B) only for oxygen loss and errors, always paired with an icon. Light mode is "surface at dawn" (sea-glass and sand) and appears only above 0 m.
- **Type:** Be Vietnam Pro for UI (full Vietnamese diacritics), plus a narrow display face for depth numbers and titles, picked during the design pass.
- **Signature motion:** jellyfish **pulse** (a bell contraction with ease-out and a tentacle lag). Correct answers pulse the jellyfish and spawn a light bloom; wrong answers flicker the HUD and drop the oxygen ring.
- **The living world:** procedural SVG/canvas jellyfish (bell + verlet tentacles, a different species shape each), drifting "marine snow" particles, caustic light near the surface, a depth gradient that darkens as zones unlock. It is GPU-light and runs smoothly on a mid-range phone.
- **Jellydex:** ~60 species, each with a real CC/public-domain photo (Wikimedia Commons, NOAA), a short English fact, and its procedural in-game twin.
- **Accessibility:** reduced-motion mode, captions on all audio, 44px tap targets, and a dyslexia-friendly spacing toggle as in Rắn công sở.

## Video (Remotion skills loaded at build time)

- 4 story clips (week openings, Twist 1, Twist 2 / ending) at 20-40 s each, rendered to MP4/WebM at build time, so there is no runtime cost.
- A short "zone unlocked" sting (4-6 s) per zone.
- Footage: public-domain NOAA deep-sea clips plus procedural jellyfish layers. If Minh shares the jellyfish photos/videos Huy sent him on Zalo, they become the emotional core of the ending clip.

## Audio

- **TOEIC audio:** original scripts voiced with neural TTS in the 4 exam accents (US, UK, AU, CA), pre-generated at build time to compressed files with a manifest. Part 3 uses 2-3 distinct voices. Each item has normal and exam-speed variants.
- **Voice choice (needs Minh, see README):** Azure Neural TTS free tier is the most human and properly licensed, and needs an Azure key. edge-tts uses the same voices with no key, but its terms of service are a gray area. Kokoro (local, Apache-2.0) is free and clean but has US/UK accents only. The research is in [02-research](02-research.md). No robotic voices: every voice gets an ear test before batch generation.
- **Story voices:** M., Captain Bảo and NOVA (NOVA is deliberately slightly synthetic; it is a radio AI, and its glitches are clues).
- **Sound design:** an underwater ambient bed, sonar pings, bubbles, a heartbeat that rises as oxygen falls, and a silence beat before each story reveal. Sources are Freesound CC0 or synthesized with Web Audio.

## Tech stack (the lazy, durable version)

| Layer | Choice | Why |
|---|---|---|
| App | Vite + React + TypeScript, static build | Proven, fast, deploys anywhere |
| Content | JSON files per part/week, validated by a schema script | Easy for agents to generate and check |
| Progress | `localStorage` + "Export/Import progress" code; optional sync (see questions) | No server needed |
| SRS | FSRS (open-source, small) | Better than SM-2, already a library |
| Audio | Pre-rendered `.mp3`/`.opus` in `/public/audio` | Works offline, no keys in the repo |
| Video | Remotion project in `/video`, renders to `/public/video` | Build-time only |
| PWA | Installable on Huy's phone, offline after the first load | Plays like an app |

Progress data shape (synthetic example):

```json
{ "version": 1, "day": 5, "depthM": 180, "light": 2340, "oxygenTanks": 3,
  "streak": { "days": 4, "freezes": 1, "lastPlayed": "2026-10-10" },
  "cards": { "word:comply-with": { "due": "2026-10-12", "stability": 3.1 } },
  "cracks": [{ "type": "p5:word-form:adj-slot", "fixes": 1 }],
  "bosses": { "w1": { "score": 0.78, "estL": 240, "estR": 190 } } }
```

## How it ships

1. All work happens in `Claude projects/TOEIC game/` on Minh's laptop, with ruflo for agent coordination and graphify for the code map.
2. A new GitHub repo (public or private, see questions) gets **GitHub Pages** auto-deploy through a GitHub Action on every push to `main`.
3. Huy opens one link on his phone and taps "Add to Home Screen".
4. Content ships per week (week 1 first) so Huy can start while weeks 2-3 are produced.

## Token-saving build plan

- **Content is the expensive part** (~1,300 items). Items are generated by parallel Sonnet agents, one per part, from tight templates, then checked by a schema/key validator script and a second-pass review. The main session only orchestrates.
- Audio and video are rendered by local scripts, so they cost no tokens.
- Learner and research notes are written once (files 01 and 02) and reused; nothing is re-read from source.
- UI is built once as a design system (tokens + 8-10 components), then screens reuse it.

## Build phases (after Minh answers)

| Phase | Output |
|---|---|
| A | Design system + 3 hero screens (depth map, a listening dive, the Jellydex) for Minh's review |
| B | Game engine: dive loop, oxygen, bosses, SRS, VI/EN toggle, progress |
| C | Week 1 content + audio + opening clip → **ship to Huy** |
| D | Weeks 2-3 content, audio, Twist clips |
| E | QA on a phone, accessibility pass, final mock calibration |
