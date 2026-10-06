# 07 · Plan v2: the road from ~400 to 800 (product owner's view)

> The seat: 30 years shipping games, product management trained, live-ops at scale. This file upgrades files 03-06: it sets the product thesis, the emotional design, the learning engine that makes Huy learn fast, and the full season roadmap until he reaches 800.

## 1. Product thesis

**Huy will play every day if the game feels like it was made for him alone, and it was.** Generic apps (Duolingo, Elsa, TOEIC test apps) lose adults at week 3 because nothing in them is personal and progress feels fake. Midnight Jelly wins on three things no app can copy:

1. **It is about Huy and Minh.** Real moments from their chats, translated into English, become listening and reading material. Personal content is remembered far better than generic content (the self-reference effect), and it's the reason he'll open the app.
2. **Its score is honest.** The forecast comes from timed tests only, with a confidence band, so every point up is real.
3. **It has a story worth finishing,** with laughs every day, a twist every season and an ending that makes him cry.

**North-star metric:** forecast TOEIC score (a timed boss every 7 days).
**Input metrics:** active minutes/day (target 60, floor 20), accuracy inside exam time, cards due vs reviewed, cracks closed.

## 2. Emotional design: laugh, be moved, cry

| Feeling | Mechanism | Example |
|---|---|---|
| **Laugh (daily)** | **Bé Sứa**, a tiny jellyfish sidekick with Huy's own texting style ("hihiii", "dọ") who mistranslates English in funny ways and then teaches the correct form | "Bé Sứa: *'I am boring' = em đang chán* ❌ hihi, 'I am bored' mới đúng nha. 'I am boring' là em *nhàm chán* đó 😭" |
| **Laugh** | Gentle roasts of a wrong answer, never of Huy | "Đáp án B đẹp trai nhưng sai ngữ pháp 😌" |
| **Warmth** | **Ngọc ký ức** (memory pearls): milestones unlock a real moment from their chats, rewritten as an English mini-dialogue with audio | A Part 3 conversation built from a real "Chiều bé làm gì dọ" exchange |
| **Pride** | A depth-map moment when a zone opens, with a Remotion sting and the forecast jumping on screen | "You just passed 450. Your graduation line." |
| **Moved** | **Thư từ mặt nước**: letters from M. after each boss, optionally **recorded in Minh's own voice** | The most powerful lever in the game; it costs Minh 1 minute a week |
| **Cry (season finales)** | The twist pays off with real photos and videos of the jellyfish Huy shared, cut together in a Remotion montage | The Season 1 ending: "You were never lost. I was always here, reading your signals." |

Rules: humor every session, warmth every week, tears at most once a season (overused, they stop working).

## 3. The learning engine (how he learns fast)

| Lever | What the game does | Why it's the fastest path |
|---|---|---|
| **Skill graph** | ~120 skill nodes (e.g., "P5 adjective slot before noun", "P3 inference: speaker's next action", "L: /θ/ vs /t/"), each with a mastery score | Practice goes only where points are missing; no wasted minutes |
| **Dictation + shadowing** | 5 minutes a day: type what you hear, then repeat it at speed | The single biggest lever for low-intermediate listening; his weakest real skill |
| **FSRS spaced repetition** | Words, collocations and his own mistakes, scheduled for review | Vocabulary is the ceiling between 600 and 800 |
| **Interleaving** | Mixed item types after day 3 of each topic | Better transfer to the real exam, which is mixed |
| **Error extinction** | Each crack (an error type) needs 2 correct answers in a row in later sessions to close | Stops the same mistake from costing points on exam day |
| **Exam realism** | Every boss is timed in true format; from Season 3, monthly full 2-hour mocks | Endurance and pacing are worth 50-100 points at 700+ |
| **85% band** | Adaptive difficulty keeps live accuracy at 80-88% | Hard enough to grow, easy enough to stay fun |
| **Theory first, 10 at a time** | His proven format from the ChatGPT chats | It already worked for him |

## 4. Roadmap: five seasons to 800

Honest estimate: going from about 400 to 800 takes roughly **400-600 hours of focused study**. At 1 hour a day plus 2 longer weekend dives (~9 h/week), that is **about 11-12 months**. The seasons below fit that, with a forecast check every week; if he moves faster, the seasons shorten.

| Season | Weeks | Target | Learning focus | Story arc |
|---|---|---|---|---|
| **S1 · Sứa Đêm** | 1-3 | 405 → **450** | Real audio, Part 1-2, P5 weak spots, short P7 | The search for M.; twists: the captain, "you were the one lost" |
| **S2 · Rạn Ký Ức** (Memory Reef) | 4-11 | 450 → **550** | Part 3/4 full, P6, single P7, TSL words 1-600 | Huy and M. dive together to rebuild the memories the reset erased; each reef is a memory |
| **S3 · Hải Lưu** (Currents) | 12-23 | 550 → **650** | Exam speed, paraphrase, double/triple passages, 4 accents, TSL 600-1,200 | Abyssal Corp returns; a rescue across ocean currents, with M. on the radio as the guide |
| **S4 · Vực Thẳm** (Abyss) | 24-35 | 650 → **750** | Trap mastery, inference, P7 under 55 minutes, full mock every 2 weeks | The truth about *Turritopsis*; the hardest choice: reset a loss or live with it |
| **S5 · Hadal** | 36-48 | 750 → **800+** | Endurance, weekly 2-hour mocks, error extinction, exam booking and an exam-day plan | The deepest trench, together; the finale is **the real exam**, and the game becomes his exam-day companion |

Each season opens with a Remotion trailer and closes with a boss mock, a twist and a letter. After S5 the game shows his real score card next to the very first placement dive.

## 5. Production plan (to stay ahead of him)

- **Content is built one season ahead.** Season 1 ships first; Season 2 is produced during Season 1, and so on. Each season needs about 1,000-1,500 original items plus audio.
- **Content factory:** template → parallel Sonnet writers per part → automated validator (format, single correct answer, distractor rules, CEFR level of the vocab) → reviewer pass → TTS render → spot-check by ear.
- **Personal content pipeline:** Zalo chat (local and private) → pick 20-40 warm/funny moments per season → rewrite as English mini-dialogues and Part 7 texts → **Minh approves** each one before it goes in. Nothing personal goes in a public repo without Minh's yes.

## 6. Live ops: Minh as game master

- A weekly one-screen report for Minh: minutes, forecast, top 3 cracks, and the streak.
- Minh can drop in voice letters or a custom message for the next boss.
- This needs a small sync layer, which is decision #4 in the README.

## 7. Risks and how the design answers them

| Risk | Answer |
|---|---|
| He burns out in weeks 2-4 | 20-minute short dive still counts; a weekly rest day; streak freezes |
| The score plateaus around 550-600 | That's where vocab is the ceiling: S2-S3 push the TSL list hard with FSRS |
| He gets bored of the story | One twist per season, Bé Sứa's daily jokes, new jellyfish every week |
| Wrong answer keys | Validator + reviewer before anything ships |
| Privacy | Chat-based content stays local until Minh approves it |
