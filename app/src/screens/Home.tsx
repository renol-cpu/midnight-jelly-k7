// First viewport: tonight's tank with Huy's own footage, Minh's note on the glass, the rank placard, one primary action.
import { Lightning, Fire, ArrowRight } from '@phosphor-icons/react';
import type { DayContent } from '../content/types';
import { useProgress, forecast, playedToday } from '../game/store';
import { rankFor, RANKS } from '../game/rank';
import { speciesOf } from '../game/species';
import { Tank } from '../components/Tank';
import { Letter } from './Dive';
import { pick, useT, type Lang } from '../i18n';

const TANK_MEDIA = ['v06', 'v12', 'v15', 'v07', 'v11', 'v04', 'v16', 'v13', 'v10', 'v01', 'v05', 'v14', 'v09', 'v02', 'v03', 'v08'];

export function Home({ day, lang, onStart }: { day: DayContent | null; lang: Lang; onStart: (short: boolean) => void }) {
  const t = useT();
  const p = useProgress();
  const f = forecast(p);
  const rank = rankFor(f?.total ?? null);
  const n = day?.day ?? 1;
  const sp = speciesOf(n);
  const resuming = p.resume?.day === n;
  const done = playedToday(p) && !resuming;
  const joke = day?.beSua?.[new Date().getDate() % Math.max(1, day.beSua.length)];

  return (
    <div className="screen home">
      <Tank media={TANK_MEDIA[(n - 1) % TANK_MEDIA.length]} className="tank-hero">
        {day?.letter && (
          <div className="note" style={{ position: 'absolute', top: 18, right: 14, maxWidth: '72%' }}>
            <Letter text={pick(day.letter, lang).split(/(?<=[.!?])\s/)[0]} />
            <span className="sig">Minh</span>
          </div>
        )}
        <div className="placard" style={{ ['--rank' as string]: rank.color }}>
          <h1 style={{ fontSize: '2.1rem', margin: '0 0 2px' }}>{day ? pick(day.title, lang) : t('loading')}</h1>
          <p className="latin">{sp.latin} · {day?.boss ? t('boss') : `${t('day')} ${n}/21`}</p>
          <div className="habitat" aria-label={`${t('rank')} ${rank[lang]}`}>
            {RANKS.map((r, i) => <i key={r.min} className={i <= rank.idx ? 'on' : ''} />)}
          </div>
          <div className="spec" style={{ marginTop: 6 }}>
            <span>{t('rank')}: <b style={{ color: 'var(--label-ink)' }}>{rank[lang]}</b></span>
            <span className="num">{f ? `${f.total} TOEIC` : t('noForecast')}</span>
          </div>
        </div>
      </Tank>

      {(p.light > 0 || p.streak.count > 0) && <div className="gauges">
        <span className="lightc"><Lightning size={18} weight="fill" /> <span className="num">{p.light}</span> <small>{t('light')}</small></span>
        <span className="lightc" style={{ color: 'var(--flame)' }}><Fire size={18} weight="fill" /> <span className="num">{p.streak.count}</span> <small>{t('streak')}</small></span>
      </div>}

      {done ? (
        <div className="stack">
          <p className="muted">{t('restDay')}</p>
          <button className="btn ghost block" onClick={() => onStart(false)} disabled={!day}>{t('playAhead')}</button>
        </div>
      ) : (
        <div className="stack">
          <button className="btn primary block" onClick={() => onStart(false)} disabled={!day}>
            {resuming ? t('continueShift') : t('startShift')} <ArrowRight size={18} weight="bold" />
          </button>
          {!day?.boss && !resuming && <button className="btn ghost block" onClick={() => onStart(true)} disabled={!day}>{t('shortShift')}</button>}
        </div>
      )}

      {joke && <div className="note" style={{ transform: 'rotate(0.6deg)', background: '#fff7d6', color: '#2c2203' }}>{joke}<span className="sig" style={{ color: '#7a5b00' }}>Bé Sứa</span></div>}
    </div>
  );
}
