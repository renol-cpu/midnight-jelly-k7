// A lit tank window. Plays one of Huy's own jellyfish clips muted and looped, with marine snow drifting on top.
import { useEffect, useRef, type ReactNode } from 'react';

const BASE = import.meta.env.BASE_URL;

export function Tank({ media, children, className = '', still = false }: { media?: string; children?: ReactNode; className?: string; still?: boolean }) {
  return (
    <div className={`tank ${className}`}>
      {media && (still
        ? <img className="bg" src={`${BASE}media/${media}.jpg`} alt="" />
        : <LoopVideo src={`${BASE}media/${media}.mp4`} poster={`${BASE}media/${media}.jpg`} />)}
      <Snow />
      {children}
    </div>
  );
}

// Marine snow: a few dozen slow motes on a canvas, paused for reduced motion and when the tab is hidden.
function Snow() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced';
    const dpr = Math.min(2, devicePixelRatio || 1);
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize();
    const motes = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 1.6, v: 0.0004 + Math.random() * 0.0009, w: Math.random() * 6.28 }));
    let raf = 0;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const m of motes) {
        if (!reduce) { m.y -= m.v; if (m.y < -0.02) m.y = 1.02; }
        const x = (m.x + Math.sin(t / 2600 + m.w) * 0.01) * c.width;
        ctx.beginPath();
        ctx.arc(x, m.y * c.height, m.r * dpr, 0, 6.28);
        ctx.fillStyle = 'rgba(220, 235, 255, 0.45)';
        ctx.fill();
      }
      if (!reduce && !document.hidden) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const onVis = () => { if (!document.hidden && !reduce) raf = requestAnimationFrame(draw); };
    document.addEventListener('visibilitychange', onVis);
    addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', onVis); removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="snow" style={{ width: '100%', height: '100%' }} aria-hidden="true" />;
}

// React does not reliably set the `muted` attribute, which blocks autoplay; set it on the element and skip the dark first frame.
function LoopVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current!;
    v.muted = true;
    const start = () => { if (v.currentTime < 0.9) v.currentTime = 1; v.play().catch(() => {}); };
    if (v.readyState >= 1) start(); else v.addEventListener('loadedmetadata', start, { once: true });
  }, [src]);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline aria-hidden="true" />;
}
