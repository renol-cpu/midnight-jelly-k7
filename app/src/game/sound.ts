// Sound effects and generative underwater music, synthesised with Web Audio (no audio files, no licences).
// Music ducks while TOEIC audio or a film plays, so it never competes with a listening question.
import { getProgress } from './store';

let ctx: AudioContext | null = null;
let master: GainNode, musicBus: GainNode, sfxBus: GainNode, reverb: ConvolverNode;
let musicTimer = 0;
let mood: 'calm' | 'boss' | 'off' = 'off';
let ducked = false;

function ensure() {
  if (ctx) return ctx;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
  reverb = ctx.createConvolver(); reverb.buffer = impulse(ctx, 3.2); reverb.connect(master);
  musicBus = ctx.createGain(); musicBus.gain.value = 0; musicBus.connect(master); musicBus.connect(reverb);
  sfxBus = ctx.createGain(); sfxBus.gain.value = 0.8; sfxBus.connect(master);
  const wet = ctx.createGain(); wet.gain.value = 0.25; sfxBus.connect(wet); wet.connect(reverb);
  return ctx;
}

function impulse(c: AudioContext, sec: number) {
  const b = c.createBuffer(2, c.sampleRate * sec, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = b.getChannelData(ch);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.6);
  }
  return b;
}

// Browsers only allow audio after a real tap. iOS Safari counts touchend/click (not pointerdown) as a gesture,
// and mutes Web Audio when the ringer switch is on silent, so we also move the page into the "playback" audio session.
let keepAlive: HTMLAudioElement | null = null;
function unlock() {
  const c = ensure();
  if (!c) return;
  const nav = navigator as Navigator & { audioSession?: { type: string } };
  if (nav.audioSession) nav.audioSession.type = 'playback'; // Safari 16.4+: play even in silent mode
  else if (!keepAlive) {
    // Older iOS: a looping silent media element switches the session to playback.
    keepAlive = new Audio(`${import.meta.env.BASE_URL}silence.mp3`);
    keepAlive.loop = true;
    keepAlive.setAttribute('playsinline', '');
    keepAlive.play().catch(() => { keepAlive = null; });
  }
  if (c.state !== 'running') {
    c.resume().then(() => setMusic(mood === 'off' ? 'calm' : mood)).catch(() => {});
    // A one-sample silent buffer started inside the gesture fully unlocks older WebKit.
    const b = c.createBuffer(1, 1, 22050);
    const src = c.createBufferSource();
    src.buffer = b; src.connect(c.destination); src.start(0);
  }
}

export function unlockOnFirstTap() {
  for (const ev of ['touchend', 'click', 'keydown']) addEventListener(ev, unlock, { capture: true });
  // Resume after the phone locks or the app goes to the background.
  document.addEventListener('visibilitychange', () => { if (!document.hidden && ctx?.state !== 'running') ctx?.resume().catch(() => {}); });
  // A gentle bubble on every button press.
  addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('button:not([disabled])')) sfx('tap'); }, { capture: true });
}

function tone(freq: number, at: number, dur: number, type: OscillatorType, vol: number, bus: GainNode, glideTo?: number) {
  const c = ctx!;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, at);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, at + dur);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(vol, at + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g); g.connect(bus);
  o.start(at); o.stop(at + dur + 0.05);
}

const N = (semi: number) => 261.63 * Math.pow(2, semi / 12); // semitones from middle C

type Sfx = 'tap' | 'correct' | 'wrong' | 'streak' | 'bank' | 'push' | 'blackout' | 'unlock' | 'fanfare' | 'page' | 'boss';
export function sfx(name: Sfx) {
  if (!getProgress().sfx) return;
  const c = ensure();
  if (!c || c.state !== 'running') return;
  const t = c.currentTime + 0.01;
  switch (name) {
    case 'tap': tone(N(19), t, 0.09, 'sine', 0.12, sfxBus, N(26)); break;
    case 'page': tone(N(12), t, 0.12, 'triangle', 0.1, sfxBus, N(16)); break;
    case 'correct': [0, 4, 7, 12].forEach((s, i) => tone(N(12 + s), t + i * 0.07, 0.5, 'triangle', 0.22, sfxBus)); tone(N(36), t + 0.28, 0.6, 'sine', 0.08, sfxBus); break;
    case 'wrong': tone(N(2), t, 0.35, 'sine', 0.25, sfxBus, N(-7)); tone(N(-1), t + 0.12, 0.4, 'triangle', 0.12, sfxBus, N(-10)); break;
    case 'streak': for (let i = 0; i < 6; i++) tone(N(14 + i * 3), t + i * 0.05, 0.12, 'sine', 0.12, sfxBus, N(19 + i * 3)); break;
    case 'bank': [24, 28, 31, 36].forEach((s, i) => tone(N(s), t + i * 0.09, 0.7, 'sine', 0.16, sfxBus)); break;
    case 'push': tone(N(-12), t, 0.6, 'sawtooth', 0.06, sfxBus, N(12)); tone(N(7), t + 0.1, 0.4, 'triangle', 0.12, sfxBus, N(19)); break;
    case 'blackout': for (let i = 0; i < 3; i++) { tone(55, t + i * 0.8, 0.18, 'sine', 0.5, sfxBus); tone(52, t + i * 0.8 + 0.22, 0.2, 'sine', 0.4, sfxBus); } tone(N(-24), t, 2.4, 'triangle', 0.08, sfxBus, N(-31)); break;
    case 'unlock': [0, 7, 12, 16, 19, 24].forEach((s, i) => tone(N(12 + s), t + i * 0.11, 0.9, 'triangle', 0.18, sfxBus)); break;
    case 'fanfare': [[0, 4, 7], [5, 9, 12], [7, 11, 14], [12, 16, 19]].forEach((ch, i) => ch.forEach((s) => tone(N(s), t + i * 0.22, 0.8, 'triangle', 0.12, sfxBus))); break;
    case 'boss': tone(N(-24), t, 1.6, 'sine', 0.35, sfxBus, N(-26)); tone(N(-12), t + 0.4, 1.2, 'triangle', 0.08, sfxBus); break;
  }
}

// Music: a slow pad that changes chord every few seconds and a music-box melody drawn from a pentatonic scale.
const CALM = { chords: [[0, 4, 7], [-3, 0, 4], [-7, -3, 0], [-5, -1, 2]], scale: [0, 2, 4, 7, 9, 12, 14, 16, 19, 21], beat: 0.62, root: 12 };
const BOSS = { chords: [[-3, 0, 4], [-7, -3, 0], [-8, -5, -1], [-5, -2, 2]], scale: [-3, 0, 2, 4, 7, 9, 12, 14, 16], beat: 0.85, root: 0 };

export function setMusic(next: 'calm' | 'boss' | 'off') {
  mood = next;
  const c = ensure();
  if (!c) return;
  clearInterval(musicTimer);
  const on = next !== 'off' && getProgress().music;
  musicBus.gain.setTargetAtTime(on && !ducked ? 0.38 : 0, c.currentTime, 0.6);
  if (!on) return;
  const m = next === 'boss' ? BOSS : CALM;
  let step = 0;
  const tick = () => {
    if (c.state !== 'running') return;
    const t = c.currentTime + 0.05;
    const chord = m.chords[Math.floor(step / 8) % m.chords.length];
    if (step % 8 === 0) chord.forEach((s) => { tone(N(s - 12), t, m.beat * 8.5, 'sine', 0.12, musicBus); tone(N(s - 12) * 1.004, t, m.beat * 8.5, 'sine', 0.08, musicBus); });
    if (Math.random() < (next === 'boss' ? 0.45 : 0.6)) {
      const s = m.scale[Math.floor(Math.random() * m.scale.length)];
      tone(N(s + m.root), t, 1.6, 'triangle', 0.09, musicBus);
      if (Math.random() < 0.25) tone(N(s + m.root + 12), t + m.beat / 2, 1.2, 'sine', 0.05, musicBus);
    }
    if (next === 'boss' && step % 4 === 0) tone(55, t, 0.25, 'sine', 0.18, musicBus);
    step++;
  };
  musicTimer = window.setInterval(tick, m.beat * 1000);
}

// Lower the music while TOEIC audio, a story line or a film is playing.
export function duck(on: boolean) {
  ducked = on;
  if (!ctx) return;
  const playing = mood !== 'off' && getProgress().music;
  musicBus.gain.setTargetAtTime(on || !playing ? 0 : 0.38, ctx.currentTime, on ? 0.08 : 0.8);
}

export const refreshSound = () => setMusic(mood);
