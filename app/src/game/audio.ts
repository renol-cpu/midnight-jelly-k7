// Plays the pre-rendered neural TTS file for a set (audio/<id>.mp3, made by scripts/tts.py).
// Falls back to the browser's speech voices only if the file is missing, so a gap never blocks a lesson.
import { useEffect, useRef, useState } from 'react';
import type { AudioLine } from '../content/types';
import { duck } from './sound';

const BASE = import.meta.env.BASE_URL;
const LANGS: Record<string, string> = { us: 'en-US', gb: 'en-GB', au: 'en-AU', ca: 'en-CA' };

export function useSetAudio(id: string, lines: AudioLine[] | undefined, src = `${BASE}audio/${id}.mp3`) {
  const el = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [plays, setPlays] = useState(0);

  useEffect(() => {
    const a = new Audio(src);
    a.preload = 'auto';
    a.onended = () => { setState('ended'); duck(false); };
    el.current = a;
    setState('idle');
    setPlays(0);
    return () => { a.pause(); a.src = ''; window.speechSynthesis?.cancel(); duck(false); };
  }, [src]);

  async function play() {
    if (!lines?.length) return;
    setPlays((n) => n + 1);
    setState('playing');
    duck(true);
    try {
      el.current!.currentTime = 0;
      await el.current!.play();
    } catch {
      speak(lines, () => { setState('ended'); duck(false); });
    }
  }
  return { play, state, plays };
}

function speak(lines: AudioLine[], done: () => void) {
  const synth = window.speechSynthesis;
  if (!synth) return done();
  synth.cancel();
  lines.forEach((l, i) => {
    const u = new SpeechSynthesisUtterance(l.text);
    u.lang = LANGS[l.voice.slice(0, 2)] ?? 'en-US';
    u.rate = 0.95;
    if (i === lines.length - 1) u.onend = done;
    synth.speak(u);
  });
}

// One-shot playback for a story line or a vocab word (audio/w/<slug>.mp3 when rendered).
export function playClip(src: string, fallbackText?: string) {
  const a = new Audio(`${BASE}${src}`);
  duck(true);
  a.onended = () => duck(false);
  a.play().catch(() => {
    duck(false);
    if (!fallbackText || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(fallbackText);
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
  });
}

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
