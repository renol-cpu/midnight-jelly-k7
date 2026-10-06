// Rapid Fire corner: 20 random questions across all seven TOEIC parts, on a per-part clock, from the days unlocked so far.
import { useEffect, useMemo, useRef, useState } from 'react';
import { X, Timer, Lightning } from '@phosphor-icons/react';
import type { DayContent, QSet, Question } from '../content/types';
import { SetView } from './Question';
import { Jelly } from '../components/Jelly';
import { Tank } from '../components/Tank';
import { nextDay, recordAnswer, update, useProgress, feed } from '../game/store';
import { sfx } from '../game/sound';
import { speciesOf } from '../game/species';
import { useT, type Lang } from '../i18n';

const BASE = import.meta.env.BASE_URL;
const TOTAL = 20;
const SECONDS: Record<number, number> = { 1: 30, 2: 25, 3: 70, 4: 70, 5: 20, 6: 30, 7: 75 }; // listening sets need time for the audio

type Item = { set: QSet; q: Question };

// Every question becomes its own one-question set (audio and passages stay attached), then we deal round-robin by Part.
function deal(days: DayContent[]): Item[] {
  const byPart = new Map<number, Item[]>();
  for (const d of days) for (const s of [...d.listening, ...d.grammar, ...d.reading, ...(d.extra ?? [])]) {
    for (const q of s.questions) {
      const list = byPart.get(s.part) ?? [];
      list.push({ set: { ...s, questions: [q] }, q });
      byPart.set(s.part, list);
    }
  }
  for (const list of byPart.values()) list.sort(() => Math.random() - 0.5);
  const parts = [...byPart.keys()].sort(() => Math.random() - 0.5);
  const out: Item[] = [];
  while (out.length < TOTAL && parts.some((p) => byPart.get(p)!.length)) {
    for (const p of parts) { const it = byPart.get(p)!.pop(); if (it && out.length < TOTAL) out.push(it); }
  }
  return out.sort(() => Math.random() - 0.5);
}

export function Rapid({ lang, onExit }: { lang: Lang; onExit: () => void }) {
  const t = useT();
  const p = useProgress();
  const [items, setItems] = useState<Item[] | null>(null);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<Item[]>([]);
  const [left, setLeft] = useState(30);
  const [mood, setMood] = useState<'idle' | 'pulse' | 'doze'>('idle');
  const answered = useRef(false);
  const maxDay = Math.max(3, nextDay(p));
  const sp = useMemo(() => speciesOf(1 + Math.floor(Math.random() * 21)), []);

  useEffect(() => {
    Promise.all(Array.from({ length: maxDay }, (_, k) => fetch(`${BASE}content/day${String(k + 1).padStart(2, '0')}.json`).then((r) => r.json())))
      .then((ds: DayContent[]) => setItems(deal(ds)))
      .catch(() => setItems([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const done = items !== null && i >= items.length;
  useEffect(() => {
    if (!items || done) return;
    answered.current = false;
    setLeft(SECONDS[items[i].set.part]);
    const id = setInterval(() => setLeft((v) => {
      if (v <= 1) { clearInterval(id); if (!answered.current) answer(false); return 0; }
      return v - 1;
    }), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, items]);

  useEffect(() => {
    if (done && items) { sfx('fanfare'); update((s) => { s.rapidBest = Math.max(s.rapidBest, score); }); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function answer(correct: boolean) {
    if (!items || answered.current) return;
    answered.current = true;
    const it = items[i];
    recordAnswer(it.set, it.q, correct);
    sfx(correct ? 'correct' : 'wrong');
    setMood(correct ? 'pulse' : 'doze');
    if (correct) { setScore((s) => s + 1); feed(); } else setMissed((m) => [...m, it]);
    setTimeout(() => { setMood('idle'); setI((n) => n + 1); }, 450);
  }

  if (!items) return <div className="screen"><p className="muted">{t('loading')}</p></div>;

  if (done) {
    return (
      <div className="screen">
        <div className="sheet" style={{ margin: '8px auto' }}>
          <Jelly species={sp} mood="pulse" size={90} />
          <h2>Rapid Fire</h2>
          <p className="big num">{score}/{items.length}</p>
          <p className="muted num">{t('rapidBest')}: {Math.max(p.rapidBest, score)}</p>
          <button className="btn primary block" onClick={onExit}>{t('gotIt')}</button>
        </div>
        {missed.length > 0 && <h2 style={{ fontSize: '1.3rem' }}>{t('rapidReview')}</h2>}
        {missed.map(({ q }) => (
          <div key={q.id} className="placard">
            <p className="latin">Part {q.part}</p>
            {q.q && <p style={{ fontWeight: 600 }}>{q.q}</p>}
            <p style={{ marginTop: 6 }}><b>{'ABCD'[q.answer]}. {q.options[q.answer]}</b></p>
            <p style={{ marginTop: 6 }}>{lang === 'en' ? q.why.en : q.why.vi}</p>
          </div>
        ))}
      </div>
    );
  }

  const it = items[i];
  return (
    <div className="screen">
      <div className="guide" style={{ padding: 0 }}>
        <span><b>Rapid Fire</b> · Part {it.set.part} · <span className="num">{i + 1}/{items.length}</span></span>
        <button className="btn quiet" onClick={onExit} aria-label={t('quit')}><X size={20} /></button>
      </div>
      <Tank media={sp.media ?? 'v06'} still className="tank-band">
        <div className="band-jelly"><Jelly species={sp} mood={mood} size={84} /></div>
        <div className="gauges band-gauges">
          <span className="lightc" style={{ color: left <= 8 ? 'var(--flame)' : undefined }}><Timer size={18} weight="fill" /> <span className="num">{left}s</span></span>
          <span className="lightc"><Lightning size={18} weight="fill" /> <span className="num">{score}</span></span>
        </div>
      </Tank>
      <SetView key={it.q.id} set={it.set} lang={lang} exam onAnswer={(e) => answer(e.correct)} onDone={() => {}} />
    </div>
  );
}
