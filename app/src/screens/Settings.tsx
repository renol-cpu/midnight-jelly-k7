// Cracks (mistake log) and settings: language, explanation language, motion, progress backup.
import { useState } from 'react';
import { useProgress, update, exportCode, importCode } from '../game/store';
import { refreshSound } from '../game/sound';
import { useT } from '../i18n';

const SKILL_VI: Record<string, string> = {
  p1: 'Part 1 · Mô tả tranh', p2: 'Part 2 · Hỏi đáp', p3: 'Part 3 · Hội thoại', p4: 'Part 4 · Bài nói',
  p5: 'Part 5 · Điền câu', p6: 'Part 6 · Điền đoạn văn', p7: 'Part 7 · Đọc hiểu',
};

export function Cracks() {
  const t = useT();
  const p = useProgress();
  const open = Object.entries(p.cracks).filter(([, c]) => !c.closed).sort((a, b) => b[1].misses - a[1].misses);
  return (
    <div className="screen">
      <h1 style={{ fontSize: '2rem' }}>{t('tabLog')}</h1>
      <p className="muted">{t('crackFix')}</p>
      {open.length === 0 && <p>{t('cracksEmpty')}</p>}
      {open.map(([skill, c]) => (
        <div key={skill} className="crack">
          <div><b>{skill.split('.').slice(1).join(' · ')}</b><br /><small>{SKILL_VI[skill.slice(0, 2)]}</small></div>
          <span className="num">{c.streak}/2</span>
        </div>
      ))}
    </div>
  );
}

export function Settings() {
  const t = useT();
  const p = useProgress();
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  return (
    <div className="screen">
      <h1 style={{ fontSize: '2rem' }}>{t('tabMe')}</h1>
      <div>
        <div className="toggle"><span>{t('lang')}</span>
          <div className="row">{(['vi', 'en'] as const).map((l) => <button key={l} className={`chip ${p.lang === l ? 'on' : ''}`} onClick={() => update((s) => { s.lang = l; })}>{l.toUpperCase()}</button>)}</div>
        </div>
        <div className="toggle"><span>{t('explainLevel')}</span>
          <div className="row">{(['both', 'vi', 'en'] as const).map((l) => (
            <button key={l} className={`chip ${p.explain === l ? 'on' : ''}`} onClick={() => update((s) => { s.explain = l; })}>
              {l === 'both' ? t('explainBoth') : l === 'vi' ? t('explainVi') : t('explainEn')}
            </button>))}
          </div>
        </div>
        <label className="toggle"><span>{t('musicOn')}</span>
          <input type="checkbox" checked={p.music} onChange={(e) => { update((s) => { s.music = e.target.checked; }); refreshSound(); }} style={{ width: 22, height: 22, accentColor: 'var(--moon)' }} />
        </label>
        <label className="toggle"><span>{t('sfxOn')}</span>
          <input type="checkbox" checked={p.sfx} onChange={(e) => update((s) => { s.sfx = e.target.checked; })} style={{ width: 22, height: 22, accentColor: 'var(--moon)' }} />
        </label>
        <label className="toggle"><span>{t('motion')}</span>
          <input type="checkbox" checked={p.reduceMotion} onChange={(e) => update((s) => { s.reduceMotion = e.target.checked; })} style={{ width: 22, height: 22, accentColor: 'var(--moon)' }} />
        </label>
      </div>
      <div className="stack">
        <button className="btn ghost" onClick={() => navigator.clipboard?.writeText(exportCode()).then(() => setMsg(t('copied')))}>{t('exportCode')}</button>
        <textarea className="code" value={code} onChange={(e) => setCode(e.target.value)} aria-label={t('importCode')} placeholder={t('importCode')} />
        <button className="btn ghost" disabled={!code} onClick={() => { try { importCode(code); setMsg(t('importOk')); setCode(''); } catch { setMsg(t('importBad')); } }}>{t('importCode')}</button>
        {msg && <p className="muted" role="status">{msg}</p>}
      </div>
    </div>
  );
}
