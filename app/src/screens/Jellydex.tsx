// The collection: one jelly per finished day. Species whose words are due for review dim until revived.
import { useState } from 'react';
import { SPECIES } from '../game/species';
import { useProgress, dueCards } from '../game/store';
import { Jelly } from '../components/Jelly';
import { Tank } from '../components/Tank';
import { useT, type Lang } from '../i18n';

export function Jellydex({ lang }: { lang: Lang }) {
  const t = useT();
  const p = useProgress();
  const [open, setOpen] = useState<number | null>(null);
  const dim = dueCards(50).length > 6; // many cards due: the newest jellies dim
  const latest = p.dayDone.length ? Math.max(...p.dayDone) : 0;
  const sp = open ? SPECIES.find((s) => s.day === open)! : null;

  return (
    <div className="screen">
      <h1 style={{ fontSize: '2rem' }}>{t('tabDex')} <span className="muted num" style={{ fontSize: '1rem' }}>{p.dayDone.length}/21</span></h1>
      {sp && (
        <Tank media={sp.media} className="tank-hero" still={!sp.media}>
          <div style={{ display: 'grid', justifyItems: 'center', marginBottom: 12 }}><Jelly species={sp} mood="pulse" size={110} label={sp.name.en} /></div>
          <div className="placard">
            <h2>{sp.name[lang]}</h2>
            <p className="latin">{sp.latin} · {dim && sp.day === latest ? t('dimmed') : t('glowing')}</p>
            <p style={{ marginTop: 8 }}>{sp.fact}</p>
          </div>
        </Tank>
      )}
      <div className="dex">
        {SPECIES.map((s) => {
          const got = p.dayDone.includes(s.day);
          return (
            <button key={s.day} className={`dexcell ${got ? '' : 'locked'} ${got && dim && s.day === latest ? 'dim' : ''}`} disabled={!got}
              onClick={() => setOpen(s.day)} aria-label={got ? s.name[lang] : t('locked')}>
              <span className="n">{String(s.day).padStart(2, '0')}</span>
              {got ? <Jelly species={s} size={56} /> : <Jelly species={{ hue: '#3a4580', shape: s.shape }} size={46} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
