# Content guide for writers (Season 1, days 1-21)

Read first: `app/src/content/types.ts` (schema), `plan/05-curriculum-3-weeks.md` (what each day teaches), `plan/01-learner-profile.md` (Huy's level and errors), `zalo-private/huy-persona.md` (who Huy is), `zalo-private/memory-pearls.md` (real moments you may reuse).

## Output

Write one JSON file per day you own: `content/src/<track>/dayNN.json` (NN = 01..21), shaped as a partial `DayContent`, containing ONLY your keys, e.g. `{ "listening": [QSet...] }` or `{ "grammar": [...], "theory": [...] }`. Valid JSON, UTF-8, no comments. IDs: `dNN-p<part>-<letter or number>` unique across the season. Then run `node scripts/validate-content.mjs <track>` and fix every error it prints.

## Who plays

Huy, 2x, Vietnamese, TOEIC ~335-405 (Listening ~220 > Reading ~115). Works as a jellyfish-tank keeper at an aquarium café in HCMC. Strong: tenses, passive, if/wish. Weak: word form (noun/adj/adv slots), collocations/prepositions, no vs not, whom/whose, subject-verb agreement, real listening (only ever read transcripts), Part 7 keyword-matching trap.

## Realism (non-negotiable)

- Mirror ETS TOEIC format, register and length exactly. Business/daily-life contexts: offices, travel, shopping, restaurants, HR, facilities, events, shipping, finance, health, housing, tech. About 20% of items may be set in Huy's world (aquariums, marine exhibits, cafés, tours, school group bookings, maintenance), written in the same neutral TOEIC register.
- **Original writing only.** Never copy items from ETS, Hackers, Economy, websites or books. Inspiration from format is fine.
- Exactly one defensible key. Distractors follow real TOEIC trap logic: P1 similar-sounding words, wrong action, wrong object; P2 repeated word, similar sound, wrong question type (answering "when" to "where"), indirect correct answers ("I'll check the schedule"); P3/P4 paraphrase in the key, verbatim-but-wrong distractors; P5 all four options from one word family or one category; P7 keyword-match traps.
- Levels per day: weeks 1: 60% level 1, 35% level 2, 5% level 3. Week 2: 40/50/10. Week 3: 25/55/20. Bosses mirror their week.
- Lengths: P3 conversation 6-10 lines, 70-110 words; P4 talk 90-140 words; P7 single passage 80-220 words; P6 passage 110-160 words with 4 blanks (3 word/phrase blanks + 1 sentence-insertion blank whose options are whole sentences).
- Each P3 set and P4 set has exactly 3 questions; P6 sets exactly 4; P7 sets 2-5.
- Voices: rotate accents every set; per day use at least 3 of US/GB/AU/CA. P3 uses 2 distinct voices (3 for 3-speaker sets, spk "Man 2"). P1 and P2 options are spoken; P2 question voice differs from response voice.
- Explanations (`why`): Vietnamese first, natural and warm (anh/em is fine), max 2 short sentences each language, naming the rule or the paraphrase. `trap` (Vietnamese): why the most tempting wrong answer is wrong. No em-dash characters anywhere.

## Skill tags (use these prefixes)

`p1.people-action`, `p1.object-position`, `p1.scene`; `p2.wh-who/what/where/when/why/how`, `p2.yes-no`, `p2.choice`, `p2.suggestion`, `p2.statement`, `p2.indirect`; `p3.main-idea`, `p3.detail`, `p3.next-action`, `p3.implication`, `p3.graphic`, `p3.speaker-intent`; `p4.purpose`, `p4.detail`, `p4.next-action`, `p4.graphic`, `p4.speaker-intent`; `p5.wordform.noun|adj|adv|verb`, `p5.tense`, `p5.passive`, `p5.agreement`, `p5.pronoun`, `p5.relative`, `p5.prep`, `p5.conj`, `p5.collocation`, `p5.negation`, `p5.comparison`, `p5.participle`, `p5.wish-if`, `p5.vocab`; `p6.grammar`, `p6.vocab`, `p6.context`, `p6.sentence`; `p7.main-idea`, `p7.detail`, `p7.not-true`, `p7.inference`, `p7.vocab-in-context`, `p7.sentence-insert`, `p7.cross-ref`.

## Daily volume (non-boss days)

| Day | Listening (questions) | Grammar | Reading (P7) |
|---|---|---|---|
| 1 placement | P1 4, P2 8, P3 2 sets, P4 1 set | P5 10, P6 1 set | 1 single set (3 Qs) |
| 2 | P1 10, P2 10 | P5 2x10 | 2 single sets (text chains) |
| 3 | P1 10, P2 10 | P5 2x10 | 2 notices |
| 4 | P2 20 | P5 2x10 | 2 ads |
| 5 | P2 20 | P5 2x10 | 2 forms/invoices |
| 6 | P2 15, P1 5 | P5 2x10 | 2 short emails |
| 8 | P2 20 | P5 2x10 | 2 emails |
| 9 | P3 5 sets, P2 5 | P5 2x10 | 2 articles |
| 10 | P3 5 sets, P2 5 | P5 2x10 | 2 letters |
| 11 | P3 5 sets (2 are 3-speaker), P2 5 | P5 10, P6 2 sets | 2 schedules |
| 12 | P4 5 sets, P2 5 | P5 2x10 | 2 web pages |
| 13 | P4 4 sets, P3 2 sets | P5 10, P6 2 sets | 1 single + 1 double (5 Qs) |
| 15 | P3 4 sets with graphic, P4 2 sets | P5 3x10 timed | 2 doubles |
| 16 | P4 4 sets with graphic, P3 2 sets | P5 2x10, P6 1 set | 1 triple (5 Qs) + 1 single |
| 17 | P2 25 | P5 2x10, P6 1 set | 1 triple + 1 single |
| 18 | P3 3 sets, P4 3 sets | P5 10, P6 4 sets | 3 singles timed |
| 19 | P1 4, P2 8, P3 2 sets, P4 2 sets (Huy's weak spots) | P5 2x10 mixed weak spots | 1 double + 1 single |
| 20 | P2 10, P3 1 set, P4 1 set | P5 10 | 1 single |

## Bosses

| Day | Listening | Reading |
|---|---|---|
| 7 Moon Jelly | P1 6, P2 15 | P5 15, P7 1 set (4 Qs) |
| 14 Lion's Mane (half test) | P1 3, P2 12, P3 6 sets, P4 5 sets | P5 15, P6 2 sets, P7: 4 singles (15 Qs) + 2 doubles (10 Qs) |
| 21 Turritopsis (full test) | P1 6, P2 25, P3 13 sets, P4 10 sets | P5 30, P6 4 sets, P7: 10 singles (29 Qs) + 2 doubles (10) + 3 triples (15) |

## Part 1 images

Use Huy's own photos where they fit (`/media/p01.jpg`..`/media/p12.jpg`, `/media/v01.jpg`..`/media/v16.jpg`; Read them to see what they show) and CC0/CC-BY/public-domain workplace photos with people (Openverse API `https://api.openverse.org/v1/images/?q=...&license=cc0,by,pdm&page_size=10`). Download chosen photos to `app/public/img/p1/` (max 1200px wide), Read each one before writing statements so every statement is true or false of the actual picture, and append one line per photo to `app/public/img/ATTRIBUTION.md` (title, creator, license, source URL).

## Love and Huy's world

- Use the memory pearls in `zalo-private/memory-pearls.md` as material where they fit your part (for example "split shift", "tip/fee/fine/fare", "wish + could", the flame jelly talk, the preschool booking email, the cleanliness memo). Keep them in neutral TOEIC register; never mention Minh, family, money troubles, addresses or bank details.
- Story, letters and Bé Sứa jokes are the only places for romance and Huy's texting voice ("hihi", "dọ", ":33").
