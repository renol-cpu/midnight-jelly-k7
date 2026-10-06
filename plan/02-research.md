# 02 Research: TOEIC jellyfish game

Scope: personal, non-commercial static web app on GitHub Pages. Legal notes are practical, not legal advice. Items marked (unverified) come from memory or secondary sources; re-check before relying on them.

## 1. Mechanics that make learning games sticky and effective

| Mechanic | Why it works | Game use | Source |
|---|---|---|---|
| Spaced repetition (SRS) | Reviewing just before forgetting beats massed practice | Leitner/SM-2-lite box per word and per question type; due items are "tides" that resurface | Duolingo half-life regression: https://aclanthology.org/P16-1174/ |
| Retrieval practice | Recall (testing) beats re-reading for retention | Never show the answer first; every card is a question | Roediger and Karpicke 2006: https://doi.org/10.1111/j.1467-9280.2006.01693.x |
| ~85% success rule | Learning is fastest at ~15% error | Adaptive difficulty: step up after 5 correct in a row, step down after 2 misses; target 80-90% | Wilson et al. 2019: https://www.nature.com/articles/s41467-019-12552-4 |
| Streak + streak freeze | Loss aversion; Duolingo reports freezes reduce churn | 1 earned freeze per week; a "rest day" token, never punishing | https://blog.duolingo.com/how-duolingo-streak-builds-habit/ |
| Collection / completion | Pokedex-style completeness drive | Jellyfish codex of ~40 species; each unlocks after mastering its word/grammar set | Overview: https://en.wikipedia.org/wiki/Completionism |
| Cliffhangers (Zeigarnik) | Unfinished tasks stay in mind | End each session on an unresolved clue; resolve it next day | https://en.wikipedia.org/wiki/Zeigarnik_effect |
| Variable reward / mystery box | Unpredictable rewards raise engagement (Skinner) | Surprise "deep-sea chest" after a session: lore, new species, cosmetic. Keep it cosmetic or story only | https://en.wikipedia.org/wiki/Variable-ratio_schedule |
| Daily quests | Short, specific goals lower the barrier to start | 3 quests/day (e.g. 10 Part 2, 1 Part 5 set, 5 SRS reviews) = ~1 hour | https://blog.duolingo.com/gamification-in-duolingo/ |
| Boss battles | Cumulative test with stakes gives a mastery check | A "Colossal Jelly" boss at the end of each week = mini TOEIC section; weak parts feed next week's plan | Game-design convention |
| Mastery feedback | Immediate, specific feedback; show progress to a goal | Show per-part accuracy and estimated TOEIC band; explain every wrong answer in simple English with Vietnamese gloss on tap | Self-determination theory (competence): https://selfdeterminationtheory.org/ |
| Juice / game feel | Sound, particles, and animation make actions feel good | Short chimes, bioluminescent pulse on correct, screen shake kept small, 200 ms or less | Talk "Juice it or lose it": https://www.youtube.com/watch?v=Fy0aCDmgnxg |

### Suspense/exploration framing
- Each day is a "dive": descent (warm-up SRS), exploration (listening and reading sets), encounter (boss or rare jelly). Sonar-ping hints, fog-of-war map that clears as parts are mastered.
- Pace for 3-4 weeks: Week 1 Parts 1, 2, 5 plus core vocab. Week 2 Parts 3, 6. Week 3 Parts 4, 7. Week 4 mixed review and a full mock. Aim for ~1 hour per day: 10 min SRS, 35 min new content, 10 min review, 5 min story.

### Pitfalls
- Dark patterns: guilt-trip notifications, streak loss that wipes progress, paywalled freezes, fake urgency. Use forgiving streaks and no punishing copy.
- Burnout: cap daily new items (~20 words), allow a rest day, stop the session after the hour with a cliffhanger rather than an endless loop.
- Gamification can hollow out learning (points without retention). Reward accuracy and review, not time-on-app. Do not let XP substitute for real comprehension checks.
- Vietnamese adult beginner: allow Vietnamese hints, but fade them as mastery grows.

## 2. Free and legal content for a personal non-commercial game

**Hard rule:** Copyrighted test-prep books (ETS Official guides, Hackers, Economy TOEIC, etc.) and their audio cannot be copied, transcribed, or redistributed in a public GitHub repo. A public GitHub Pages repo is redistribution. Write original questions modeled on the format, or use openly licensed text only.

| Resource | URL | License | What we can use | Caveats |
|---|---|---|---|---|
| ETS free TOEIC sample tests (PDF plus audio) | https://www.ets.org/toeic/test-takers.html | ETS copyright; items and keys are protected, no reuse without written permission | Download for the user's own private study; link out from the game | Do NOT commit or host it. Do not copy items into the game. (Terms per ETS handbook: https://www.ets.org/content/dam/ets-india/pdfs/toeic/toeic-listening-reading-test-examinee-handbook.pdf) |
| TOEIC Service List (TSL), ~1200 words, Browne and Culligan | https://www.newgeneralservicelist.com/toeic-service-list | CC BY-SA 4.0 | Word list as the vocab spine; add NGSL (2800 words) as base | Attribution required; derived word lists must be shared under CC BY-SA. Definitions and examples we write ourselves, but share them under the same license, or keep only our own data separate. Confirm the exact download terms on the page |
| NGSL core list | https://www.newgeneralservicelist.com/new-general-service-list | CC BY-SA 4.0 (verify) | Base vocab for a near-beginner | Same attribution rules |
| Tatoeba | https://tatoeba.org/ and https://tatoeba.org/en/downloads | Sentences CC BY 2.0 FR (some CC0); audio mostly CC BY 4.0, per-contributor | Short example sentences, some with real human audio | Attribution lists per sentence; audio quality and accents vary; many sentences are not business-themed |
| VOA Learning English | https://learningenglish.voanews.com/ | US government work, public domain, except some third-party photos or music | Slow-speed news and business English audio plus transcripts (good for Part 4 style talks) | Check each item's credit line; not TOEIC-formatted |
| LibriVox | https://librivox.org/ | Public domain recordings | Long-form narration for easy listening | Old literary English, off-theme for TOEIC |
| Wikimedia Commons | https://commons.wikimedia.org/ | Per-file (CC BY, CC BY-SA, CC0, PD) | Jellyfish photos, spectrograms, sounds | Check each file; keep an attribution file |
| NOAA / Ocean Exploration | https://oceanexplorer.noaa.gov/ and https://www.noaa.gov/protecting-your-privacy#copyright | Mostly public domain, but some images are credited to third parties | Real deep-sea jellyfish photos and video | Look for any "credit" line; do not imply NOAA endorsement |
| Pexels / Pixabay | https://www.pexels.com/license/ , https://pixabay.com/service/license-summary/ | Free to use and modify, attribution not required | Backgrounds, jelly footage | Not a CC license; do not redistribute the raw files as a standalone download. Fine inside a game, but re-check terms |
| Self-generated content (own questions, TTS audio) | n/a | Ours | Main source for TOEIC-style questions | Output of a TTS engine is generally ours if the engine licence allows |

Practical plan: spine = TSL/NGSL vocab (CC BY-SA, credited) plus original LLM-written, human-reviewed TOEIC-style items with TTS audio, plus CC/PD images. Keep an `ATTRIBUTION.md`. Use ETS samples only as an external link and a private benchmark.

## 3. Natural TTS for original dialogues (US, UK, AU, CA)

| Option | Quality | Accents | Cost | License / risk |
|---|---|---|---|---|
| Browser Web Speech API | Varies by OS/browser; robotic on some devices; not consistent | Depends on device | Free | No licence issue, but unreliable: do not use for graded listening |
| edge-tts (Python, Microsoft Edge neural voices) https://github.com/rany2/edge-tts | High, natural; many neural voices | en-US, en-GB, en-AU, en-CA, en-IN etc. | Free | Gray area: unofficial use of Microsoft's Edge read-aloud service; ToS do not explicitly grant this use; endpoint can break. OK for a personal project; avoid in anything commercial (unverified, check ToS) |
| Kokoro-82M https://huggingface.co/hexgrad/Kokoro-82M | Good, near-neural, runs locally on CPU/GPU | American and British voices; no AU/CA | Free | Apache-2.0 model and weights; fully clean |
| Piper https://github.com/rhasspy/piper | Decent, fast, local | en_US and en_GB voices; no real AU/CA | Free | MIT (original repo; the active fork may be GPL-3.0); each voice has its own licence, check |
| Azure Speech / Google Cloud TTS / OpenAI TTS / ElevenLabs | Best; officially supported | All four plus more | Small paid (a few $ for 500 short clips; Azure and Google have free tiers) | Clean commercial terms; needs an API key kept out of the repo |

**Recommendation**
- Primary: **Azure Neural TTS** via its free tier if the user is willing to create a key. It has the same voices as Edge (en-AU Natasha/William, en-CA Clara/Liam, en-GB Libby/Ryan, en-US Jenny/Guy) with a proper licence. If no cloud account is wanted, use **edge-tts** for a personal build.
- Fallback: **Kokoro-82M** (local, Apache-2.0) for US and UK voices if edge-tts breaks. AU/CA accents would then be missing, so label accent as a bonus rather than required in the early weeks.
- Do not rely on Web Speech API for graded items; only as an offline stopgap for single-word pronunciation.
- **Pre-generate at build time** (script writes `audio/<id>.mp3` or opus, plus a JSON manifest). Reasons: GitHub Pages is static, no runtime key exposure, consistent audio, offline play, instant playback. Keep clips under ~100-200 KB each, cache by content hash so regeneration is cheap, and mix two voices for Part 3 dialogues. Add slow/normal speed variants for beginners.

## 4. Real TOEIC Listening and Reading format

| Section | Part | Questions | Notes |
|---|---|---|---|
| Listening (45 min, 100 Q) | 1 Photographs | 6 | Pick the statement that best describes the photo |
| | 2 Question-Response | 25 | Short question, three choices (A-C) |
| | 3 Conversations | 39 (13 sets x 3) | Two or three speakers, includes graphics items |
| | 4 Talks | 30 (10 sets x 3) | Announcements, voicemail, tours, etc. |
| Reading (75 min, 100 Q) | 5 Incomplete Sentences | 30 | Grammar and vocab |
| | 6 Text Completion | 16 (4 passages x 4) | Fill gaps incl. whole sentence insertion |
| | 7 Reading Comprehension | 54 | 29 single, 25 multiple-passage (double and triple) |

- Total 200 questions in about 2 hours. The Listening audio plays once and cannot be paused. Accents used: US, UK, Australian, Canadian (plus recent additions). Since 2018 the Part 2 pace and Part 3 format changed (some graphics items, three-speaker conversations, implied-meaning questions).
- Scoring: Listening 5-495, Reading 5-495, total 10-990, scaled from raw correct answers (equating varies per test form).
- Typical bands (CEFR mapping from ETS-aligned tables, secondary sources: https://toeic.ai/to-cefr, https://edusynch.com/blog/test-prep/2025/06/08/how-toeic-scores-map-to-cefr-levels):
  - 120-224 A1; 225-549 A2; 550-784 B1; 785-944 B2; 945-990 C1.
  - **450**: A2, around 55-60% of raw listening/reading items correct (approximate, form-dependent). Typical employer minimum for entry-level roles in Vietnam.
  - **600**: low B1; needs about 65% correct overall.
  - **700-800**: mid-to-high B1 up to B2 entry (785); needs about 75-85% correct overall, and the Part 3/4/7 sets become decisive.
- Mirror this: mini-tests use the real part counts (scaled down), listen-once mode for "exam mode", and a final full 200-question mock with the real timer.

## Open items to verify before building
- Download page terms for TSL (CC BY-SA 4.0 per the site); decide whether game data inherits ShareAlike.
- Confirm the current Azure/Edge voice names and free-tier limits.
- Confirm raw-score-to-scaled-score tables (ETS does not publish them; use approximations and say so in the UI).
