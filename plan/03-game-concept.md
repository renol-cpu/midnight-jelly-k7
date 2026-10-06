# 03 · Game concept

> Written from two seats: a game designer with 30 years of loops, pacing and suspense, and a TOEIC teacher with 30 years of real tests and real mistakes. Inputs: [01-learner-profile](01-learner-profile.md), [02-research](02-research.md), [04-story-and-twist](04-story-and-twist.md).

## Name options

| Name | Why | Trade-off |
|---|---|---|
| **Sứa Đêm · Midnight Jelly** ⭐ | A night dive after glowing jellyfish; it carries the suspense and the romance | Recommended |
| Turritopsis | The immortal jellyfish, which is the story's twist | Hard to say and spells out the twist too early |
| Jellydex 990 | Pokédex energy, 990 = max TOEIC | Fun, but cold |
| Lặn Sâu · Deep Blue | Depth = score | Generic |

**Recommendation: Sứa Đêm · Midnight Jelly.** The world map is ocean depth: the deeper Huy dives, the darker it gets, the rarer the jellyfish and the higher his estimated score.

## One line

Huy is a young diver searching the deep for the person he loves, who vanished on a night dive. The only clues are English signals left by glowing jellyfish, and every signal he decodes brings him one depth closer, until he learns who was really lost.

## Why this concept teaches TOEIC (teacher's view)

- **Every TOEIC part has a reason to exist in the story.** A photo from the seabed is Part 1. Radio calls from the mother ship are Part 2 and Part 3. Announcements at the research station are Part 4. A torn diary is Parts 5 and 6. Emails, ship schedules and charter contracts are Part 7. The setting (research station, shipping company, science conference) is the same business register the real TOEIC uses, so practice never drifts away from the exam.
- **It starts where Huy actually is.** His last official score was 405, and a full mock scored 335 (L 220, R 115). Part 5 tenses and passive are already at 90%+. Word form, collocations, no/not and real listening are weak, and every listening exercise so far has been read as text. So the first week leans hard on real audio and the weak Part 5 slots. Details are in [05-curriculum](05-curriculum-3-weeks.md).
- **It keeps the formats he says worked:** theory before practice, 10-item blocks scored per block, an explanation for every wrong answer, a warm "anh/em" voice, and gates like "10/10 unlocks the next level."

## Depth = level

| Zone | Depth | Estimated band | Unlock rule |
|---|---|---|---|
| Bến cảng (Harbour) | 0 m | 300-400 | Placement dive |
| Sunlight | 0-200 m | 400-450 | ≥ 80% in the zone's boss |
| Twilight | 200-1,000 m | 450-550 | ≥ 80% boss + 3 days streak |
| Midnight | 1,000-4,000 m | 550-650 | Season 1 ends here (week 3) |
| Abyss / Hadal | 4,000 m+ | 650-850 | Season 2 (weeks 4+), the 700-800 path |

Depth rises only on accuracy, never on time spent, so Huy can't grind past a level he hasn't learned.

## Stakes: win, lose, points, lives

Minh asked for real gains and losses, so the game has stakes, but losing never deletes learning.

| Mechanic | How it works | Why |
|---|---|---|
| **Oxy (lives)** | Each dive starts with 3 tanks. A wrong answer costs ¼ tank, and a streak of 5 correct answers refills ¼. An empty tank means a **blackout**, and you wake at the last checkpoint. | Real tension, and the blackout is part of the story (see the twist) |
| **Ánh sáng (points)** | +10 per correct answer, ×1.5 if answered inside TOEIC time, ×2 on a 10-streak. −5 for a wrong answer in a boss. | A clear score Huy can push up |
| **Bank or push** | Mid-dive, Huy can surface to bank his light, or dive on for a ×2 multiplier and risk a blackout that drops unbanked light | The push-your-luck suspense loop |
| **Boss: giant jellyfish** | Weekly timed mini-test in real TOEIC format. Win: a new zone, a rare jellyfish and a story chapter. Lose: retry the next day with a "weak spot" warm-up first. | Real exam pressure, safely |
| **Nhật ký vết nứt** | Each wrong answer cracks the dive mask, and the crack closes after he gets that item type right twice later | Mistakes become concrete jobs |
| **Jellydex** | About 60 real species. Each one carries a vocab/grammar set and dims when its cards come due (SRS); reviewing makes it glow again. | Spaced repetition that feels like caring for a collection |
| **Đèn lồng (streak)** | One lantern per day with 20+ minutes played. One free "phao" (freeze) per week is earned, never sold. | Habit without punishment |
| **Rương ngọc trai** | Random cosmetic rewards (rare jellyfish photos, Remotion clips, flashlight skins), given only after a finished session | Variable reward with no dark patterns |

## Core loop (one session)

```
Choose a dive site on the depth map
  → a signal appears (a 3-8 minute exercise, 10 items)
  → decode it (instant scoring + a bilingual explanation for every miss)
  → light ↑ / oxygen ↓ / jellyfish glow or dim
  → bank or push deeper
  → story fragment unlocks at the end of the day (cliffhanger)
```

## Language

- The UI is **Vietnamese by default**. A **VI ⇄ EN** toggle in the top bar switches every menu, instruction and explanation.
- Test content is always in English, as on the real exam. Explanations come at three levels: EN only, EN + VI, or detailed VI. Week 1 defaults to detailed VI, and the game suggests stepping toward EN as accuracy rises.
- Tapping any English word plays its pronunciation, shows the Vietnamese meaning and adds it to the Jellydex.

## Design discipline (what it will not do)

- It won't break a streak over one busy day, and it won't send guilt notifications.
- It won't let him pass a zone by guessing, because zones need accuracy.
- It won't use copyrighted ETS, Hackers or Economy material in a public repo (see [02-research](02-research.md)).
- It won't let ChatGPT-style optimism set the target: the score estimate comes from timed bosses only.
