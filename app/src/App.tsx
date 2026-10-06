import { useEffect, useState } from 'react';
import { Drop, BookOpenText, MaskSad, GearSix } from '@phosphor-icons/react';
import type { DayContent } from './content/types';
import { useProgress, nextDay, playedToday } from './game/store';
import { LangCtx, useT, type Lang } from './i18n';
import { Home } from './screens/Home';
import { Dive } from './screens/Dive';
import { Jellydex } from './screens/Jellydex';
import { Cracks, Settings } from './screens/Settings';

type Tab = 'tank' | 'dex' | 'log' | 'me';
const BASE = import.meta.env.BASE_URL;

export default function App() {
  const p = useProgress();
  const lang: Lang = p.lang;
  const [tab, setTab] = useState<Tab>('tank');
  const [dive, setDive] = useState<{ short: boolean } | null>(null);
  const [day, setDay] = useState<DayContent | null>(null);
  const [failed, setFailed] = useState(false);
  // While Huy has played today, the home tank keeps showing today's finished day until he chooses to go on.
  const target = p.resume?.day ?? (playedToday(p) && p.dayDone.length ? Math.max(...p.dayDone) : nextDay(p));
  const playDay = p.resume?.day ?? nextDay(p);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.motion = p.reduceMotion ? 'reduced' : '';
  }, [lang, p.reduceMotion]);

  useEffect(() => {
    let live = true;
    setFailed(false);
    fetch(`${BASE}content/day${String(dive ? playDay : target).padStart(2, '0')}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => live && setDay(d))
      .catch(() => live && setFailed(true));
    return () => { live = false; };
  }, [target, playDay, dive]);

  return (
    <LangCtx.Provider value={lang}>
      <div className="app">
        {dive && day ? (
          <Dive key={day.day} day={day} lang={lang} short={dive.short} onExit={() => { setDive(null); setTab('tank'); }} />
        ) : (
          <>
            <div />
            <main>
              {failed && tab === 'tank' && <FailNote />}
              {tab === 'tank' && <Home day={day} lang={lang} onStart={(short) => setDive({ short })} />}
              {tab === 'dex' && <Jellydex lang={lang} />}
              {tab === 'log' && <Cracks />}
              {tab === 'me' && <Settings />}
            </main>
            <Tabs tab={tab} setTab={setTab} />
          </>
        )}
      </div>
    </LangCtx.Provider>
  );
}

function FailNote() {
  const t = useT();
  return <p className="guide" role="alert">{t('loadFail')}</p>;
}

function Tabs({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const t = useT();
  const items: [Tab, typeof Drop, Parameters<typeof t>[0]][] = [['tank', Drop, 'tabTank'], ['dex', BookOpenText, 'tabDex'], ['log', MaskSad, 'tabLog'], ['me', GearSix, 'tabMe']];
  return (
    <nav className="tabs">
      {items.map(([id, Icon, label]) => (
        <button key={id} aria-current={tab === id ? 'page' : undefined} onClick={() => setTab(id)}>
          <Icon size={24} weight={tab === id ? 'fill' : 'regular'} />
          {t(label)}
        </button>
      ))}
    </nav>
  );
}
