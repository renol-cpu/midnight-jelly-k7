// Progress lives in localStorage on Huy's phone. One tiny external store, subscribed with useSyncExternalStore.
import { useSyncExternalStore } from 'react';
import { createEmptyCard, fsrs, Rating, type CardInput } from 'ts-fsrs';
import { scaleListening, scaleReading } from './rank';
import type { Lang } from '../i18n';
import type { QSet, Question, Word } from '../content/types';

const KEY = 'suadem.v1';
const f = fsrs();

export interface Tally { l: number; lc: number; r: number; rc: number; at: string }
export interface Crack { misses: number; streak: number; closed: boolean; last: string }
export interface Progress {
  v: 1;
  lang: Lang;
  explain: 'both' | 'vi' | 'en';
  reduceMotion: boolean;
  music: boolean;
  fed: number; // jellyfish meals: one per right answer
  rapidBest: number;
  sfx: boolean;
  dayDone: number[];
  resume: { day: number; step: number } | null;
  light: number; // banked light (points)
  streak: { count: number; last: string | null; freezes: number };
  cards: Record<string, CardInput>; // "w:<word>" vocab, "q:<qid>" missed questions
  cracks: Record<string, Crack>; // keyed by skill tag
  lex: Record<string, { vi: string; ipa: string; en: string }>; // words met so far, for warm-up quizzes
  missed: Record<string, QSet>; // one-question sets to re-ask in the warm-up
  tests: Record<number, Tally>; // placement (day 1) and bosses (7, 14, 21)
  minutes: Record<string, number>; // yyyy-mm-dd -> active minutes
}

const today = () => new Date().toLocaleDateString('sv-SE'); // yyyy-mm-dd in local time

const fresh = (): Progress => ({
  v: 1, lang: 'vi', explain: 'both', reduceMotion: false, music: true, sfx: true, fed: 0, rapidBest: 0, dayDone: [], resume: null, light: 0,
  streak: { count: 0, last: null, freezes: 1 }, cards: {}, cracks: {}, lex: {}, missed: {}, tests: {}, minutes: {},
});

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...fresh(), ...JSON.parse(raw) } : fresh();
  } catch {
    return fresh();
  }
}

let state = load();
const subs = new Set<() => void>();

export function update(fn: (p: Progress) => Progress | void) {
  const copy = structuredClone(state);
  state = fn(copy) ?? copy;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full or blocked: keep in memory */ }
  subs.forEach((s) => s());
}

export const getProgress = () => state;
export function useProgress() {
  return useSyncExternalStore((cb) => (subs.add(cb), () => subs.delete(cb)), () => state);
}

// ---- answers, cracks, spaced repetition ----

export function recordAnswer(set: QSet, q: Question, correct: boolean) {
  const qid = q.id;
  const skill = q.skill;
  update((p) => {
    if (!correct) p.missed[qid] = { ...set, questions: [q] };
    const c = p.cracks[skill];
    if (!correct) {
      p.cracks[skill] = { misses: (c?.misses ?? 0) + 1, streak: 0, closed: false, last: today() };
      p.cards[`q:${qid}`] = createEmptyCard(new Date());
    } else if (c && !c.closed) {
      c.streak += 1;
      if (c.streak >= 2) c.closed = true; // two right in a row mends the crack
    }
    const card = p.cards[`q:${qid}`];
    if (card) p.cards[`q:${qid}`] = f.next(card, new Date(), correct ? Rating.Good : Rating.Again).card;
  });
}

export function addWords(words: Word[]) {
  update((p) => {
    for (const w of words) {
      p.cards[`w:${w.word}`] ??= createEmptyCard(new Date());
      p.lex[w.word] = { vi: w.vi, ipa: w.ipa, en: w.example.en };
    }
  });
}

export function reviewCard(key: string, correct: boolean) {
  update((p) => {
    const card = p.cards[key];
    if (card) p.cards[key] = f.next(card, new Date(), correct ? Rating.Good : Rating.Again).card;
  });
}

export function dueCards(limit = 15) {
  const now = Date.now();
  return Object.entries(state.cards)
    .filter(([, c]) => new Date(c.due as string | Date).getTime() <= now)
    .sort(([, a], [, b]) => new Date(a.due as string).getTime() - new Date(b.due as string).getTime())
    .slice(0, limit)
    .map(([k]) => k);
}

// ---- days, streak, tests, light ----

export function finishDay(day: number, light: number, minutes: number) {
  update((p) => {
    if (!p.dayDone.includes(day)) p.dayDone.push(day);
    p.resume = null;
    p.light += light;
    const t = today();
    p.minutes[t] = (p.minutes[t] ?? 0) + minutes;
    if (p.streak.last !== t) {
      const gap = p.streak.last ? Math.round((Date.parse(t) - Date.parse(p.streak.last)) / 864e5) : 1;
      if (gap === 1) p.streak.count += 1;
      else if (gap === 2 && p.streak.freezes > 0) { p.streak.freezes -= 1; p.streak.count += 1; }
      else p.streak.count = 1;
      if (p.streak.count % 7 === 0) p.streak.freezes = Math.min(2, p.streak.freezes + 1); // earned, never sold
      p.streak.last = t;
    }
  });
}

export function feed() {
  update((p) => { p.fed += 1; });
}

export function addLight(n: number) {
  update((p) => { p.light += n; });
}

export function saveTest(day: number, tally: Omit<Tally, 'at'>) {
  update((p) => { p.tests[day] = { ...tally, at: today() }; });
}

export function forecast(p: Progress = state) {
  const days = Object.keys(p.tests).map(Number).sort((a, b) => b - a);
  if (!days.length) return null;
  const t = p.tests[days[0]];
  const L = t.l ? scaleListening(t.lc / t.l) : 5;
  const R = t.r ? scaleReading(t.rc / t.r) : 5;
  return { total: L + R, L, R, day: days[0] };
}

export const nextDay = (p: Progress = state) => Math.min(21, (p.dayDone.length ? Math.max(...p.dayDone) : 0) + 1);
export const playedToday = (p: Progress = state) => p.streak.last === today();
export const daysAway = (p: Progress = state) => (p.streak.last ? Math.round((Date.parse(today()) - Date.parse(p.streak.last)) / 864e5) : 0);

// ---- export / import (no account; Huy can move phones) ----
export const exportCode = () => btoa(unescape(encodeURIComponent(JSON.stringify(state))));
export function importCode(code: string) {
  const data = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
  if (data?.v !== 1) throw new Error('bad version');
  update(() => ({ ...fresh(), ...data }));
}
