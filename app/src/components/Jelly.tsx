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
  lion: 'M8 50 C6 22 28 4 50 4 C72 4 94 22 92 50 C80 56 66 50 50 54 C34 50 20 56 8 50 Z',
  bloom: 'M4 40 C6 30 20 24 34 24 C38 12 62 12 66 24 C80 24 94 30 96 40 C82 46 66 42 50 44 C34 42 18 46 4 40 Z',
};

const TENTACLES: Record<Species['shape'], number> = { moon: 9, nettle: 6, spotted: 5, box: 4, comb: 0, crown: 7, flower: 8, lion: 18, bloom: 10 };

export function Jelly({ species, mood = 'idle', size = 120, label }: { species: Pick<Species, 'hue' | 'shape'>; mood?: Mood; size?: number; label?: string }) {
  const { hue, shape } = species;
  const id = `g${shape}${hue.slice(1)}`;
  const tentacles = TENTACLES[shape];
  const long = shape === 'lion' ? 1.7 : shape === 'bloom' ? 0.55 : 1;
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
      <g className="tent" stroke={hue} strokeOpacity={shape === 'lion' ? 0.4 : 0.55} strokeWidth={shape === 'lion' ? 0.9 : 1.4} fill="none" strokeLinecap="round">
        {Array.from({ length: tentacles }, (_, i) => {
          const x = 20 + (60 / Math.max(1, tentacles - 1)) * i;
          const len = (70 + ((i * 37) % 40)) * long;
          return <path key={i} d={`M${x} 52 C${x - 8} ${52 + len * 0.35}, ${x + 8} ${52 + len * 0.7}, ${x - 2} ${52 + len}`} />;
        })}
        {shape !== 'box' && shape !== 'comb' && shape !== 'bloom' && (
          <path d="M44 52 C40 80 54 96 46 128 M56 52 C60 78 48 98 56 124" stroke={hue} strokeOpacity="0.8" strokeWidth="4" />
        )}
      </g>
      <g className="bell">
        <path d={BELLS[shape]} fill={hue} opacity="0.35" filter={`url(#${id}f)`} />
        <path d={BELLS[shape]} fill={`url(#${id})`} stroke="#ffffff" strokeOpacity="0.5" strokeWidth="0.8" />
        {shape === 'moon' && [32, 44, 56, 68].map((cx) => <circle key={cx} cx={cx} cy="32" r="5.5" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.6" />)}
        {shape === 'spotted' && [[30, 26], [46, 18], [62, 24], [74, 34], [38, 38], [56, 36]].map(([cx, cy]) => <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="3" fill="#ffffff" fillOpacity="0.85" />)}
        {shape === 'bloom' && [[30, 30], [50, 22], [70, 30], [40, 36], [60, 36]].map(([cx, cy]) => <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="4.5" fill="#ffffff" fillOpacity="0.55" />)}
        {shape !== 'comb' && [16, 30, 44, 56, 70, 84].map((x, i) => <circle key={`r${x}`} className="rim" cx={x} cy={shape === 'bloom' ? 42 : 50} r="1.6" fill="#ffffff" style={{ animationDelay: `${i * 0.35}s` }} />)}
        {shape === 'comb' && [30, 40, 50, 60, 70].map((x) => <path key={x} d={`M${x} 14 C${x - 4} 40 ${x - 2} 60 ${x} 72`} stroke="#ffffff" strokeOpacity="0.8" strokeDasharray="2 3" />)}
      </g>
    </svg>
  );
}
