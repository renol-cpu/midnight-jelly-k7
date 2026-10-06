// Turns one day's content into the ordered steps of a shift.
import type { DayContent, QSet, TheoryCard, Word } from '../content/types';

export type Block = 'radio' | 'diary' | 'flashlight';
export type Step =
  | { kind: 'film'; name: 'intro' | 'twist' | 'finale' }
  | { kind: 'letter' }
  | { kind: 'map' }
  | { kind: 'directions'; part: number }
  | { kind: 'extraDone' }
  | { kind: 'warmup' }
  | { kind: 'theory'; card: TheoryCard }
  | { kind: 'set'; set: QSet; block: Block }
  | { kind: 'bank'; block: Block }
  | { kind: 'vocab'; words: Word[] }
  | { kind: 'result' }
  | { kind: 'story' };

const qCount = (sets: QSet[]) => sets.reduce((n, s) => n + s.questions.length, 0);

// Short shift: keep sets until roughly `max` questions.
function take(sets: QSet[], max: number) {
  const out: QSet[] = [];
  for (const s of sets) {
    if (qCount(out) >= max) break;
    out.push(s);
  }
  return out;
}

// Insert a directions card before the first set of each Part, like the real test booklet.
function withDirections(steps: Step[]): Step[] {
  const seen = new Set<number>();
  return steps.flatMap((s) => {
    if (s.kind !== 'set' || seen.has(s.set.part)) return [s];
    seen.add(s.set.part);
    return [{ kind: 'directions', part: s.set.part } as Step, s];
  });
}

export function buildSteps(d: DayContent, opts: { short: boolean; hasDue: boolean; extra?: boolean }): Step[] {
  if (opts.extra) return withDirections([...(d.extra ?? []).map((set) => ({ kind: 'set', set, block: set.part <= 4 ? 'radio' : 'diary' }) as Step), { kind: 'extraDone' }]);
  return withDirections(build(d, opts));
}

function build(d: DayContent, opts: { short: boolean; hasDue: boolean }): Step[] {
  const steps: Step[] = [];
  if (d.day === 1) steps.push({ kind: 'film', name: 'intro' });
  if (d.letter) steps.push({ kind: 'letter' });
  if (!opts.short) steps.push({ kind: 'map' });

  if (d.boss) {
    d.listening.forEach((set) => steps.push({ kind: 'set', set, block: 'radio' }));
    [...d.grammar, ...d.reading].forEach((set) => steps.push({ kind: 'set', set, block: set.part === 7 ? 'flashlight' : 'diary' }));
    steps.push({ kind: 'result' }, { kind: 'story' });
    return steps;
  }

  if (opts.hasDue) steps.push({ kind: 'warmup' });

  const listening = opts.short ? take(d.listening, 8) : d.listening;
  listening.forEach((set) => steps.push({ kind: 'set', set, block: 'radio' }));
  if (listening.length) steps.push({ kind: 'bank', block: 'radio' });

  const theory = opts.short ? d.theory.slice(0, 1) : d.theory;
  theory.forEach((card) => steps.push({ kind: 'theory', card }));
  const grammar = opts.short ? take(d.grammar, 10) : d.grammar;
  grammar.forEach((set) => steps.push({ kind: 'set', set, block: 'diary' }));
  if (grammar.length) steps.push({ kind: 'bank', block: 'diary' });

  if (!opts.short) {
    d.reading.forEach((set) => steps.push({ kind: 'set', set, block: 'flashlight' }));
    if (d.reading.length) steps.push({ kind: 'bank', block: 'flashlight' });
  }

  if (d.vocab.length) steps.push({ kind: 'vocab', words: opts.short ? d.vocab.slice(0, 6) : d.vocab });
  if (d.day === 1) steps.push({ kind: 'result' }); // the placement dive sets the first forecast
  steps.push({ kind: 'story' });
  return steps;
}

// Target seconds per question, used for the "inside exam time" light bonus.
export const TARGET_SECONDS: Record<number, number> = { 1: 8, 2: 8, 3: 12, 4: 12, 5: 22, 6: 30, 7: 55 };

// Boss time limits mirror the real test: Reading gets 75 minutes per 100 questions.
export const readingLimitSeconds = (n: number) => Math.round((75 * 60 * n) / 100);
