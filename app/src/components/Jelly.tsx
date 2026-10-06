// The signature: a procedural jellyfish. Correct answers make it pulse; wrong ones make it doze.
import type { Species } from '../game/species';

type Mood = 'idle' | 'pulse' | 'doze';

const BELLS: Record<Species['shape'], string> = {
  moon: 'M10 52 C10 22 30 8 50 8 C70 8 90 22 90 52 C78 48 66 54 50 54 C34 54 22 48 10 52 Z',
  nettle: 'M14 50 C12 24 30 6 50 6 C70 6 88 24 86 50 C74 45 62 52 50 52 C38 52 26 45 14 50 Z',
  spotted: 'M8 48 C8 20 28 6 50 6 C72 6 92 20 92 48 C80 52 66 50 50 50 C34 50 20 52 8 48 Z',
  box: 'M18 54 L18 18 C18 10 26 6 50 6 C74 6 82 10 82 18 L82 54 C70 50 60 54 50 54 C40 54 30 50 18 54 Z',
  comb: 'M28 70 C14 50 20 10 50 6 C80 10 86 50 72 70 C62 78 38 78 28 70 Z',
  crown: 'M10 50 C12 30 22 14 34 12 C38 4 62 4 66 12 C78 14 88 30 90 50 C76 46 64 52 50 52 C36 52 24 46 10 50 Z',
  flower: 'M6 44 C10 18 30 8 50 8 C70 8 90 18 94 44 C80 50 66 46 50 46 C34 46 20 50 6 44 Z',
};

export function Jelly({ species, mood = 'idle', size = 120, label }: { species: Pick<Species, 'hue' | 'shape'>; mood?: Mood; size?: number; label?: string }) {
  const { hue, shape } = species;
  const id = `g${shape}${hue.slice(1)}`;
  const tentacles = shape === 'comb' ? 0 : shape === 'box' ? 4 : 7;
  return (
    <svg className={`jelly ${mood === 'idle' ? '' : mood}`} width={size} height={size * 1.6} viewBox="0 0 100 160" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <defs>
        <radialGradient id={id} cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor={hue} stopOpacity="0.75" />
          <stop offset="100%" stopColor={hue} stopOpacity="0.18" />
        </radialGradient>
        <filter id={`${id}f`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <g className="tent" stroke={hue} strokeOpacity="0.55" strokeWidth="1.4" fill="none" strokeLinecap="round">
        {Array.from({ length: tentacles }, (_, i) => {
          const x = 20 + (60 / Math.max(1, tentacles - 1)) * i;
          const len = 70 + ((i * 37) % 40);
          return <path key={i} d={`M${x} 52 C${x - 8} ${52 + len * 0.35}, ${x + 8} ${52 + len * 0.7}, ${x - 2} ${52 + len}`} />;
        })}
        {shape !== 'box' && shape !== 'comb' && (
          <path d="M44 52 C40 80 54 96 46 128 M56 52 C60 78 48 98 56 124" stroke={hue} strokeOpacity="0.8" strokeWidth="4" />
        )}
      </g>
      <g className="bell">
        <path d={BELLS[shape]} fill={hue} opacity="0.35" filter={`url(#${id}f)`} />
        <path d={BELLS[shape]} fill={`url(#${id})`} stroke="#ffffff" strokeOpacity="0.5" strokeWidth="0.8" />
        {shape === 'moon' && [32, 44, 56, 68].map((cx) => <circle key={cx} cx={cx} cy="32" r="5.5" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.6" />)}
        {shape === 'spotted' && [[30, 26], [46, 18], [62, 24], [74, 34], [38, 38], [56, 36]].map(([cx, cy]) => <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="3" fill="#ffffff" fillOpacity="0.85" />)}
        {shape === 'comb' && [30, 40, 50, 60, 70].map((x) => <path key={x} d={`M${x} 14 C${x - 4} 40 ${x - 2} 60 ${x} 72`} stroke="#ffffff" strokeOpacity="0.8" strokeDasharray="2 3" />)}
      </g>
    </svg>
  );
}
