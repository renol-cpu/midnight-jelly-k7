// Content schema shared by the game engine and the content writers.
// Writers produce JSON fragments in content/src/<track>/dayNN.json; scripts/build-content.mjs merges them.

export type Voice = 'usM' | 'usF' | 'gbM' | 'gbF' | 'auM' | 'auF' | 'caM' | 'caF';
export type Part = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Bi = { vi: string; en: string };

export interface AudioLine {
  spk: string; // "Narrator", "Man", "Woman", "Man 2"...
  voice: Voice;
  text: string;
}

export interface Question {
  id: string; // "d03-p5-07"
  part: Part;
  skill: string; // dotted tag, e.g. "p5.wordform.adj-slot" (see plan/content-guide.md)
  level: 1 | 2 | 3; // 1 ≈ 300-450, 2 ≈ 450-650, 3 ≈ 650-850
  q?: string; // stem. Omitted for Part 1 and Part 2 (the stem is audio-only there)
  options: string[]; // P1: 4 spoken statements, P2: 3 spoken responses, else 4 printed options
  answer: number; // index into options
  why: Bi; // why the key is right, max 2 short sentences each
  trap?: string; // Vietnamese: why the most tempting wrong option fails
}

export interface Passage {
  kind: 'email' | 'notice' | 'text-chain' | 'article' | 'ad' | 'form' | 'review' | 'schedule' | 'memo' | 'letter' | 'web';
  title?: string;
  text: string; // P6 blanks are written [1] [2] [3] [4]; text-chain lines "Name (10:42 A.M.): ..."
}

export interface QSet {
  id: string; // "d03-p3-a"
  part: Part;
  image?: string; // P1 only: path under /media or /img
  imageAlt?: string;
  audio?: AudioLine[]; // P1-P4
  graphic?: { caption: string; rows: string[][] }; // P3/P4 "look at the graphic"
  passages?: Passage[]; // P6/P7 (2-3 for double/triple)
  questions: Question[];
}

export interface TheoryCard {
  id: string;
  title: Bi;
  rule: Bi; // one rule, 1-3 short sentences
  formula?: string; // e.g. "a/an/the + (adv) + ADJ + NOUN"
  examples: { en: string; vi: string }[]; // 2-3
  tip: string; // Vietnamese exam tip, playful "anh/em" voice allowed
}

export interface Word {
  word: string;
  pos: string; // n, v, adj, adv, phr
  ipa: string;
  vi: string;
  example: { en: string; vi: string };
  family?: string; // word family: "decide (v) / decision (n) / decisive (adj)"
  collocation?: string;
}

export interface StoryBeat {
  speaker: 'M' | 'NOVA' | 'BAO' | 'HUY' | 'NARRATOR' | 'BESUA';
  en: string;
  vi: string;
  voice?: Voice;
}

export interface DayContent {
  day: number;
  week: 1 | 2 | 3;
  boss?: boolean;
  title: Bi;
  theory: TheoryCard[];
  listening: QSet[];
  grammar: QSet[]; // Part 5 sets (10 items each) and Part 6 sets
  reading: QSet[]; // Part 7 sets
  vocab: Word[];
  story: StoryBeat[];
  letter?: Bi; // a short note "from Minh" shown on the tank glass
  beSua?: string[]; // 3-5 sidekick jokes in Huy's texting style (Vietnamese, teaching a real point)
  extra?: QSet[]; // optional extra practice (surplus Part 2/5 moved here by scripts/build-content.mjs)
}
