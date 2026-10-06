// The nightly memory fragment: story beats one tap at a time, then the new species joins the Jellydex.
import { useEffect, useRef, useState } from 'react';
import { SpeakerHigh, Sparkle } from '@phosphor-icons/react';
import type { DayContent } from '../content/types';
import { speciesOf } from '../game/species';
import { playClip } from '../game/audio';
import { Jelly } from '../components/Jelly';
import { Tank } from '../components/Tank';
import { useT, type Lang } from '../i18n';

const WHO: Record<string, string> = { M: 'M.', NOVA: 'NOVA', BAO: 'Thuyền trưởng Bảo', HUY: 'Huy', NARRATOR: '', BESUA: 'Bé Sứa' };

export function StoryView({ day, lang, onDone }: { day: DayContent; lang: Lang; onDone: () => void }) {
  const t = useT();
  const [n, setN] = useState(1);
  const [unlocked, setUnlocked] = useState(false);
  const [film, setFilm] = useState(false);
  const filmName = day.day === 14 ? 'twist' : day.day === 21 ? 'finale' : null;
  const beats = day.story;
  const sp = speciesOf(day.day);
  const allShown = n >= beats.length;
  const last = useRef<HTMLDivElement>(null);
  useEffect(() => { if (n > 1) last.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, [n]);

  if (film && filmName) return <FilmClip name={filmName} onDone={() => { setFilm(false); setUnlocked(true); }} />;

  if (unlocked) {
    return (
      <div className="stack">
        <Tank media={sp.media ?? 'v15'} className="tank-hero">
          <div style={{ display: 'grid', justifyItems: 'center', marginBottom: 12 }}><Jelly species={sp} mood="pulse" size={110} label={sp.name.en} /></div>
          <div className="placard">
            <div className="spec"><span>{t('newSpecies')}</span><span className="num">No. {String(sp.day).padStart(2, '0')}</span></div>
            <h2>{sp.name[lang]}</h2>
            <p className="latin">{sp.latin}</p>
            <p style={{ marginTop: 8 }}>{sp.fact}</p>
          </div>
        </Tank>
        <button className="btn primary block" onClick={onDone}><Sparkle size={18} weight="fill" /> {t('dayDone')}</button>
      </div>
    );
  }

  return (
    <div className="stack">
      <h2 style={{ fontSize: '1.7rem' }}>{day.title[lang] || day.title.vi}</h2>
      {beats.slice(0, n).map((b, k) => (
        <div key={k} ref={k === n - 1 ? last : undefined} className={`beat ${b.speaker}`}>
          {WHO[b.speaker] && <span className="who">{WHO[b.speaker]}</span>}
          <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'nowrap', alignItems: 'start' }}>
            <span className="en">{b.en}</span>
            <button className="btn quiet" style={{ minHeight: 36, padding: 4 }} aria-label={t('play')} onClick={() => playClip(`audio/s/d${String(day.day).padStart(2, '0')}-${k}.mp3`, b.en)}><SpeakerHigh size={20} /></button>
          </div>
          {lang === 'vi' && <span className="vi">{b.vi}</span>}
        </div>
      ))}
      {!allShown
        ? <button className="btn ghost block" onClick={() => setN(n + 1)}>{t('next')}</button>
        : <button className="btn love block" onClick={() => (filmName ? setFilm(true) : setUnlocked(true))}>{t('newSpecies')}</button>}
    </div>
  );
}

// Remotion-rendered story clips (video/), shown full-bleed in a tank frame.
export function FilmClip({ name, onDone }: { name: 'intro' | 'twist' | 'finale'; onDone: () => void }) {
  const t = useT();
  return (
    <div className="stack">
      <div className="tank" style={{ aspectRatio: '9 / 16', maxHeight: '74dvh', justifySelf: 'center', width: '100%' }}>
        <video src={`${import.meta.env.BASE_URL}film/${name}.mp4`} autoPlay playsInline controls onEnded={onDone} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <button className="btn ghost block" onClick={onDone}>{t('next')}</button>
    </div>
  );
}
