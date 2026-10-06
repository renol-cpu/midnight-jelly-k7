// Renders one question set the way the real test does, one question at a time, with gentle feedback afterwards.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, ArrowClockwise, ArrowRight, Moon, Sparkle } from '@phosphor-icons/react';
import type { QSet, Question } from '../content/types';
import { useSetAudio } from '../game/audio';
import { getProgress } from '../game/store';
import { pick, useT, type Lang } from '../i18n';

const BASE = import.meta.env.BASE_URL;
const LETTERS = ['A', 'B', 'C', 'D'];

// Stable shuffle per question so printed options (Parts 3-7) do not cluster on one letter.
function order(q: Question): number[] {
  const idx = q.options.map((_, i) => i);
  if (q.part <= 2) return idx; // Parts 1-2 are read aloud as A, B, C(, D): keep the audio order
  let h = 0;
  for (const ch of q.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  for (let i = idx.length - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return idx;
}

export interface AnswerEvent { q: Question; correct: boolean; ms: number }

export function SetView({ set, exam, onAnswer, onDone }: { set: QSet; lang: Lang; exam: boolean; onAnswer: (e: AnswerEvent) => void; onDone: () => void }) {
  const t = useT();
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [tab, setTab] = useState(0);
  const started = useRef(Date.now());
  const audio = useSetAudio(set.id, set.audio);
  const q = set.questions[qi];
  const ord = useMemo(() => order(q), [q]);
  const listening = set.part <= 4;
  const hideText = set.part <= 2 && picked === null; // P1/P2 options are only heard
  const locked = listening && audio.plays === 0; // answers open once the audio has been started, as in the real test

  useEffect(() => { started.current = Date.now(); }, [qi, set.id]);

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    onAnswer({ q, correct: i === q.answer, ms: Date.now() - started.current });
    if (exam) setTimeout(advance, 250);
  }
  function advance() {
    setPicked(null);
    if (qi + 1 < set.questions.length) setQi(qi + 1);
    else onDone();
  }

  const explain = getProgress().explain;
  const correct = picked !== null && picked === q.answer;

  return (
    <div className="qcard">
      {set.image && <img className="photo" src={`${BASE}${set.image.replace(/^\//, '')}`} alt={set.imageAlt ?? ''} />}

      {listening && (
        <div className="player">
          <button className={`playbtn ${audio.state === 'playing' ? 'on' : ''}`} onClick={audio.play} aria-label={audio.plays ? t('replay') : t('play')} disabled={exam && audio.plays > 0}>
            {audio.plays ? <ArrowClockwise size={26} weight="bold" /> : <Play size={26} weight="fill" />}
          </button>
          <div className="meta">
            <b>Part {set.part}{set.part === 2 ? '' : set.questions.length > 1 ? ` · ${set.questions.length} câu` : ''}</b>
            <span>{audio.plays === 0 ? t('tapPlay') : audio.state === 'playing' ? t('playing') : exam ? t('timed') : t('replay')}</span>
          </div>
        </div>
      )}

      {set.graphic && (
        <table className="graphic">
          <caption>{set.graphic.caption}</caption>
          <tbody>{set.graphic.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
        </table>
      )}

      {set.passages && (
        <div className="stack">
          {set.passages.length > 1 && (
            <div className="ptabs" role="tablist">
              {set.passages.map((p, i) => (
                <button key={i} role="tab" aria-selected={tab === i} className={`chip ${tab === i ? 'on' : ''}`} onClick={() => setTab(i)}>{p.title ?? `${i + 1}`}</button>
              ))}
            </div>
          )}
          <div className="passage" tabIndex={0}>
            {set.passages[tab].title && <span className="ptitle">{set.passages[tab].title}</span>}
            {set.passages[tab].text}
          </div>
        </div>
      )}

      {set.questions.length > 1 && <p className="muted num">{qi + 1} / {set.questions.length}</p>}
      {q.q && <p className="stem">{q.q}</p>}

      <div className="opts" role="group" aria-label="Answers">
        {ord.map((oi, pos) => {
          const isKey = oi === q.answer;
          const cls = picked === null ? '' : exam ? (picked === oi ? 'sel' : '') : isKey ? 'right' : picked === oi ? 'wrong' : '';
          return (
            <button key={oi} className={`opt ${cls} ${hideText ? 'hidden-text' : ''}`} disabled={picked !== null || locked} onClick={() => choose(oi)} data-stamp={t('wrong').split(' ').slice(0, 2).join(' ')}>
              <span className="k">{LETTERS[pos]}</span>
              <span>{hideText ? `(${LETTERS[pos]})` : q.options[oi]}</span>
            </button>
          );
        })}
      </div>

      {picked !== null && !exam && (
        <div className={`feedback ${correct ? 'good' : 'bad'}`} aria-live="polite">
          <h3>{correct ? <Sparkle size={22} weight="fill" color="var(--moon)" /> : <Moon size={22} weight="fill" color="var(--coral)" />}{correct ? t('correct') : t('wrong')}</h3>
          {explain !== 'en' && <p>{q.why.vi}</p>}
          {explain !== 'vi' && <p className={explain === 'both' ? 'en' : ''}>{q.why.en}</p>}
          {!correct && q.trap && <p className="trap"><b>{t('trap')}:</b> {q.trap}</p>}
          {listening && qi === set.questions.length - 1 && set.audio && (
            <details>
              <summary className="muted">{t('transcript')}</summary>
              <div className="transcript">{set.audio.map((l, i) => <span key={i}><b>{l.spk}:</b> {l.text}</span>)}</div>
            </details>
          )}
          <button className="btn primary block" onClick={advance} autoFocus>{t('next')} <ArrowRight size={18} weight="bold" /></button>
        </div>
      )}
    </div>
  );
}

export const langText = pick;
