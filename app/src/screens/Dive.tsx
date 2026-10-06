// One shift: the ordered steps of a day, with oxygen (lives), light (points), bank-or-push and gentle blackouts.
import { useEffect, useMemo, useRef, useState } from 'react';
import { X, SpeakerHigh, Lightning, Anchor } from '@phosphor-icons/react';
import type { DayContent, QSet } from '../content/types';
import { buildSteps, TARGET_SECONDS, type Block, type Step } from '../game/session';
import { addLight, recordAnswer, addWords, dueCards, getProgress, reviewCard, finishDay, saveTest, update, forecast } from '../game/store';
import { speciesOf } from '../game/species';
import { playClip, slug } from '../game/audio';
import { rankFor } from '../game/rank';
import { SetView, type AnswerEvent } from './Question';
import { StoryView, FilmClip } from './Story';
import { Jelly } from '../components/Jelly';
import { Tank } from '../components/Tank';
import { DIRECTIONS, pick, useT, type Lang } from '../i18n';
import { sfx } from '../game/sound';

const FULL_O2 = 12; // 3 tanks x 4 quarters

export function Dive({ day, lang, short, extra = false, onExit }: { day: DayContent; lang: Lang; short: boolean; extra?: boolean; onExit: () => void }) {
  const t = useT();
  const steps = useMemo(() => buildSteps(day, { short, hasDue: dueCards(1).length > 0, extra }), [day, short, extra]);
  const resume = getProgress().resume;
  const [i, setI] = useState(!extra && resume?.day === day.day ? Math.min(resume.step, steps.length - 1) : 0);
  const [o2, setO2] = useState(FULL_O2);
  const [light, setLight] = useState(0); // unbanked
  const [banked, setBanked] = useState(0);
  const [mult, setMult] = useState(1);
  const [streak, setStreak] = useState(0);
  const [mood, setMood] = useState<'idle' | 'pulse' | 'doze'>('idle');
  const [moodKey, setMoodKey] = useState(0);
  const [blackout, setBlackout] = useState(false);
  const [setKey, setSetKey] = useState(0);
  const [quit, setQuit] = useState(false);
  const tally = useRef({ l: 0, lc: 0, r: 0, rc: 0 });
  const startedAt = useRef(Date.now());
  const step = steps[i];
  const species = speciesOf(day.day);

  useEffect(() => { if (!extra) update((p) => { p.resume = { day: day.day, step: i }; }); }, [i, day.day, extra]);

  const go = () => setI((n) => Math.min(n + 1, steps.length - 1));

  function onAnswer(set: QSet, e: AnswerEvent) {
    recordAnswer(set, e.q, e.correct);
    const L = e.q.part <= 4;
    tally.current[L ? 'l' : 'r'] += 1;
    if (e.correct) tally.current[L ? 'lc' : 'rc'] += 1;
    sfx(e.correct ? 'correct' : 'wrong');
    setMood(e.correct ? 'pulse' : 'doze');
    setMoodKey((k) => k + 1);
    if (day.boss) return; // bosses are scored at the end, like the real test
    if (e.correct) {
      const fast = !L && e.ms <= TARGET_SECONDS[e.q.part] * 1000;
      const s = streak + 1;
      setStreak(s);
      setLight((v) => v + Math.round(10 * (fast ? 1.5 : 1) * (s >= 10 ? 2 : 1) * mult));
      if (s % 5 === 0) { setO2((v) => Math.min(FULL_O2, v + 1)); setTimeout(() => sfx('streak'), 450); }
    } else {
      setStreak(0);
      setO2((v) => {
        const n = v - 1;
        if (n <= 0) setTimeout(() => { sfx('blackout'); setBlackout(true); }, 700);
        return Math.max(0, n);
      });
    }
  }

  function wakeUp() {
    setBlackout(false);
    setO2(FULL_O2);
    setLight(0); // unbanked light is lost, learning is not
    setMult(1);
    setSetKey((k) => k + 1); // retry the same set
  }

  function bank(push: boolean) {
    sfx(push ? 'push' : 'bank');
    if (push) setMult((m) => Math.min(4, m * 2));
    else { setBanked((b) => b + light); setLight(0); setMult(1); }
    go();
  }

  function finish() {
    sfx('fanfare');
    const minutes = Math.max(1, Math.round((Date.now() - startedAt.current) / 60000));
    finishDay(day.day, banked + light, minutes);
    onExit();
  }

  const guide = step.kind === 'directions' ? `Part ${step.part}` : step.kind === 'map' ? t('todayMap') : step.kind === 'extraDone' ? t('extraPractice') : step.kind === 'film' ? t('storyTime') : step.kind === 'set' ? blockName(step.block, t) : step.kind === 'theory' ? t('theory') : step.kind === 'vocab' ? t('newJelly') : step.kind === 'warmup' ? t('warmup') : step.kind === 'story' ? t('storyTime') : step.kind === 'letter' ? t('letterFrom') : step.kind === 'bank' ? t('light') : t('score');

  return (
    <div className="screen">
      <div className="guide" style={{ padding: 0 }}>
        <span><b>{t('day')} {day.day}</b> · {guide} · <span className="num">{i + 1}/{steps.length}</span></span>
        <button className="btn quiet" onClick={() => setQuit(true)} aria-label={t('quit')}><X size={20} /></button>
      </div>

      {['map', 'set', 'vocab', 'warmup', 'theory', 'bank', 'directions'].includes(step.kind) && (
        <Tank media={species.media ?? 'v06'} still className="tank-band">
          <div key={moodKey} className="band-jelly"><Jelly species={species} mood={mood} size={84} /></div>
          {!day.boss && (
            <div className="gauges band-gauges">
              <div className="o2" aria-label={`${t('oxygen')} ${o2}/${FULL_O2}`}>
                {[0, 1, 2].map((k) => {
                  const fill = Math.max(0, Math.min(4, o2 - k * 4));
                  return <span key={k} className={`cyl ${o2 <= 4 ? 'low' : ''}`}><i style={{ transform: `scaleX(${fill / 4})` }} /></span>;
                })}
              </div>
              <div className="lightc"><Lightning size={18} weight="fill" /> <span className="num">{banked + light}</span>{mult > 1 && <small>x{mult}</small>}</div>
            </div>
          )}
        </Tank>
      )}
      {mood === 'pulse' && <div key={`b${moodKey}`} className="bloom" aria-hidden="true" />}

      {step.kind === 'film' && <FilmClip name={step.name} onDone={go} />}

      {step.kind === 'map' && <ShiftMap day={day} onDone={go} />}

      {step.kind === 'directions' && (
        <div className="stack">
          <div className="placard">
            <h2 style={{ fontSize: '2.2rem' }}>Part {step.part}</h2>
            <p style={{ fontSize: '1.05rem', marginTop: 6 }}>{DIRECTIONS[step.part].vi}</p>
            <p className="latin" style={{ marginTop: 8 }}>{DIRECTIONS[step.part].en}</p>
          </div>
          <div className="note" style={{ transform: 'rotate(0.6deg)', background: '#fff7d6', color: '#2c2203' }}>{DIRECTIONS[step.part].tip}<span className="sig" style={{ color: '#7a5b00' }}>Bé Sứa</span></div>
          <button className="btn primary block" onClick={go}>{t('startPart')} Part {step.part}</button>
        </div>
      )}

      {step.kind === 'extraDone' && (
        <div className="sheet" style={{ margin: '24px auto' }}>
          <Jelly species={species} mood="pulse" size={90} />
          <h2>{t('extraDone')}</h2>
          <p className="big num">{banked + light}</p>
          <button className="btn primary block" onClick={() => { sfx('fanfare'); addLight(banked + light); onExit(); }}>{t('gotIt')}</button>
        </div>
      )}

      {step.kind === 'letter' && day.letter && (
        <div className="stack">
          <Tank media={species.media ?? 'v06'} className="tank-hero" still>
            <div className="note"><Letter text={pick(day.letter, lang)} /><span className="sig">{t('mystery')}</span></div>
          </Tank>
          <button className="btn love block" onClick={go}>{t('gotIt')}</button>
        </div>
      )}

      {step.kind === 'warmup' && <Warmup lang={lang} onDone={go} />}

      {step.kind === 'theory' && (
        <div className="stack">
          <div className="placard">
            <h2 style={{ margin: '0 0 8px' }}>{pick(step.card.title, lang)}</h2>
            <p>{step.card.rule.vi}</p>
            {lang === 'en' || getProgress().explain !== 'vi' ? <p className="latin" style={{ marginTop: 6 }}>{step.card.rule.en}</p> : null}
            {step.card.formula && <p style={{ margin: '12px 0', fontWeight: 700, fontFamily: 'var(--f-disp)', fontSize: '1.15rem' }}>{step.card.formula}</p>}
            <div className="stack" style={{ gap: 8 }}>
              {step.card.examples.map((ex, k) => (
                <div key={k}><b>{ex.en}</b><br /><span className="latin">{ex.vi}</span></div>
              ))}
            </div>
          </div>
          <div className="note" style={{ transform: 'rotate(0.8deg)' }}>{step.card.tip}<span className="sig">Bé Sứa</span></div>
          <button className="btn primary block" onClick={go}>{t('gotIt')}</button>
        </div>
      )}

      {step.kind === 'set' && (
        <SetView key={`${step.set.id}-${setKey}`} set={step.set} lang={lang} exam={!!day.boss} onAnswer={(e) => onAnswer(step.set, e)} onDone={go} />
      )}

      {step.kind === 'bank' && (
        <div className="sheet" style={{ margin: '24px auto' }}>
          <Jelly species={species} mood="pulse" size={90} />
          <p className="big num">{light}</p>
          <p className="muted">{t('bankHint')}</p>
          <button className="btn primary block" onClick={() => bank(false)}><Anchor size={18} weight="bold" /> {t('bank')}</button>
          <button className="btn flame block" onClick={() => bank(true)} disabled={light === 0}><Lightning size={18} weight="fill" /> {t('push')}</button>
        </div>
      )}

      {step.kind === 'vocab' && <Vocab words={step.words} lang={lang} onDone={() => { addWords(step.words); go(); }} />}

      {step.kind === 'result' && <Result tally={tally.current} day={day.day} lang={lang} onDone={go} />}

      {step.kind === 'story' && <StoryView day={day} lang={lang} onDone={finish} />}

      {blackout && (
        <div className="overlay" role="alertdialog" aria-modal="true">
          <div className="sheet">
            <Jelly species={{ hue: '#FFE7F0', shape: 'moon' }} mood="doze" size={90} />
            <h2>{t('blackout')}</h2>
            <p className="muted">{t('blackoutSub')}</p>
            <button className="btn primary block" onClick={wakeUp}>{t('retry')}</button>
          </div>
        </div>
      )}

      {quit && (
        <div className="overlay" role="alertdialog" aria-modal="true">
          <div className="sheet">
            <p>{t('quitConfirm')}</p>
            <button className="btn primary block" onClick={() => setQuit(false)}>{t('continueShift')}</button>
            <button className="btn ghost block" onClick={onExit}>{t('quit')}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function blockName(b: Block, t: ReturnType<typeof useT>) {
  return b === 'radio' ? t('radio') : b === 'diary' ? t('diary') : t('flashlight');
}

// Minh's letters hide one CAPITALISED key word each; it is set apart so Huy can collect them.
export function Letter({ text }: { text: string }) {
  const re = /(?<!\p{L})(\p{Lu}{2,})(?!\p{L})/u;
  return <p>{text.split(/((?<!\p{L})\p{Lu}{2,}(?!\p{L}))/u).map((part, k) => (re.test(part) ? <strong key={k}>{part}</strong> : part))}</p>;
}

function Warmup({ lang, onDone }: { lang: Lang; onDone: () => void }) {
  const t = useT();
  const keys = useMemo(() => dueCards(12), []);
  const [k, setK] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const p = getProgress();
  const key = keys[k];
  const word = key?.startsWith('w:') ? key.slice(2) : '';
  const info = p.lex[word];
  const options = useOptions(word, info?.vi ?? '', Object.entries(p.lex).filter(([w]) => w !== word).map(([, v]) => v.vi));
  const next = () => { setPicked(null); if (k + 1 < keys.length) setK(k + 1); else onDone(); };
  if (!key) { queueMicrotask(onDone); return null; }

  if (key.startsWith('q:')) {
    const set = p.missed[key.slice(2)];
    if (!set) { queueMicrotask(next); return null; }
    return <SetView key={key} set={set} lang={lang} exam={false} onAnswer={(e) => reviewCard(key, e.correct)} onDone={next} />;
  }

  return (
    <div className="stack">
      <div className="placard word">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="w">{word}</span>
          <button className="btn quiet" onClick={() => playClip(`audio/w/${slug(word)}.mp3`, word)} aria-label={t('play')} style={{ color: 'var(--label-mist)' }}><SpeakerHigh size={24} /></button>
        </div>
        <span className="ipa" style={{ color: 'var(--label-mist)' }}>{info?.ipa}</span>
      </div>
      <p className="muted">{t('meaning')}</p>
      <div className="opts">
        {options.map((o, n) => (
          <button key={o} className={`opt ${picked ? (o === info?.vi ? 'right' : picked === o ? 'wrong' : '') : ''}`} disabled={!!picked} data-stamp={t('wrong').split(' ').slice(0, 2).join(' ')}
            onClick={() => { setPicked(o); reviewCard(key, o === info?.vi); }}>
            <span className="k">{'ABCD'[n]}</span><span>{o}</span>
          </button>
        ))}
      </div>
      {picked && <button className="btn primary block" onClick={next}>{t('next')}</button>}
    </div>
  );
}

function useOptions(word: string, right: string, pool: string[]) {
  return useMemo(() => {
    const others = [...new Set(pool)].filter((v) => v !== right).sort(() => Math.random() - 0.5).slice(0, 3);
    return [right, ...others].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word]);
}

function Vocab({ words, lang, onDone }: { words: DayContent['vocab']; lang: Lang; onDone: () => void }) {
  const t = useT();
  const [k, setK] = useState(0);
  const w = words[k];
  useEffect(() => { playClip(`audio/w/${slug(w.word)}.mp3`, w.word); }, [w.word]);
  return (
    <div className="stack">
      <div className="placard word">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="w">{w.word}</span>
          <button className="btn quiet" onClick={() => playClip(`audio/w/${slug(w.word)}.mp3`, w.word)} aria-label={t('play')} style={{ color: 'var(--label-mist)' }}><SpeakerHigh size={24} /></button>
        </div>
        <span className="ipa" style={{ color: 'var(--label-mist)' }}>{w.ipa} · {w.pos}</span>
        <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{w.vi}</p>
        <p>{w.example.en}</p>
        <p className="latin">{w.example.vi}</p>
        {w.family && <p className="latin">{w.family}</p>}
        {w.collocation && <p><b>{w.collocation}</b></p>}
      </div>
      <button className="btn primary block" onClick={() => (k + 1 < words.length ? setK(k + 1) : onDone())}>{k + 1 < words.length ? t('next') : t('gotIt')} <span className="num" style={{ opacity: 0.6 }}>{k + 1}/{words.length}</span></button>
      {lang === 'en' && <span className="sr">{w.word}</span>}
    </div>
  );
}

function Result({ tally, day, lang, onDone }: { tally: { l: number; lc: number; r: number; rc: number }; day: number; lang: Lang; onDone: () => void }) {
  const t = useT();
  useEffect(() => { saveTest(day, tally); }, [day, tally]);
  const f = forecast();
  const rank = rankFor(f?.total ?? null);
  return (
    <div className="sheet" style={{ margin: '12px auto' }}>
      <p className="muted">{t('forecast')}</p>
      <p className="big num" style={{ color: rank.color }}>{f?.total ?? '...'}</p>
      <p className="num">{t('listening')} {f?.L} · {t('reading')} {f?.R}</p>
      <p className="num muted">{tally.lc}/{tally.l} · {tally.rc}/{tally.r}</p>
      <div className="chip on" style={{ background: rank.color, borderColor: rank.color }}>{t('rank')}: {rank[lang]}</div>
      <p className="muted" style={{ fontSize: '0.82rem' }}>{t('forecastNote')}</p>
      <button className="btn primary block" onClick={onDone}>{t('next')}</button>
    </div>
  );
}

export type { Step };

// What tonight's shift covers, so the balance across TOEIC skills is visible before starting.
function ShiftMap({ day, onDone }: { day: DayContent; onDone: () => void }) {
  const t = useT();
  const n = (sets: QSet[], f: (p: number) => boolean) => sets.filter((s) => f(s.part)).reduce((a, s) => a + s.questions.length, 0);
  const rows: [string, number, string][] = [
    [t('mapL'), n(day.listening, () => true), 'var(--moon)'],
    [t('mapG'), n(day.grammar, () => true), 'var(--pearl)'],
    [t('mapR'), n(day.reading, () => true), 'var(--coral)'],
    [t('mapW'), day.vocab.length, 'var(--rose)'],
  ];
  return (
    <div className="stack">
      <div className="placard">
        <h2>{t('todayMap')}</h2>
        <div className="stack" style={{ marginTop: 12, gap: 10 }}>
          {rows.filter((r) => r[1] > 0).map(([label, count, color]) => (
            <div key={label} className="row" style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
              <span className="row" style={{ gap: 10, flexWrap: 'nowrap' }}><i style={{ width: 12, height: 12, borderRadius: 3, background: color, boxShadow: '0 0 0 1px rgba(10,13,41,.25)' }} />{label}</span>
              <b className="num">{count}</b>
            </div>
          ))}
        </div>
      </div>
      <button className="btn primary block" onClick={onDone}>{t('startShift')}</button>
    </div>
  );
}
