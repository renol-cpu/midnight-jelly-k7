// A portrait story clip: Huy's own jellyfish footage cross-fading under bilingual lines, optional voice-over and a title card.
import { Video, Audio } from '@remotion/media';
import { AbsoluteFill, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { loadFont as loadBaloo } from '@remotion/google-fonts/Baloo2';
import { loadFont as loadVN } from '@remotion/google-fonts/BeVietnamPro';

const { fontFamily: disp } = loadBaloo('normal', { weights: ['800'], subsets: ['latin', 'vietnamese'] });
const { fontFamily: ui } = loadVN('normal', { weights: ['400', '600'], subsets: ['latin', 'vietnamese'] });

export type Scene = { clip: string; en: string; vi: string };
export type FilmProps = {
  readonly scenes: Scene[];
  readonly sceneSeconds: number;
  readonly tint: string;
  readonly title: string;
  readonly subtitle: string;
  readonly voice: string;
  readonly voiceAt: number;
  readonly finalImage: string;
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

function Line({ en, vi, len }: { en: string; vi: string; len: number }) {
  const f = useCurrentFrame();
  const o = interpolate(f, [10, 30, len - 20, len], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', padding: '0 56px 190px', opacity: o, translate: `0px ${interpolate(f, [10, 40], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease })}px` }}>
      <div style={{ fontFamily: disp, fontWeight: 800, fontSize: 64, lineHeight: 1.08, color: '#EAF2FF', textShadow: '0 4px 30px rgba(4,6,24,.9)' }}>{en}</div>
      <div style={{ fontFamily: ui, fontSize: 34, marginTop: 14, color: '#A9B8DA', textShadow: '0 2px 20px rgba(4,6,24,.9)' }}>{vi}</div>
    </AbsoluteFill>
  );
}

function Clip({ clip, len }: { clip: string; len: number }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isImg = clip.endsWith('.jpg');
  const style = { position: 'absolute' as const, width: '100%', height: '100%', objectFit: 'cover' as const, scale: interpolate(f, [0, len], [1.04, 1.14]) };
  return isImg
    ? <Img src={staticFile(clip)} style={style} />
    : <Video src={staticFile(clip)} muted objectFit="cover" premountFor={fps} style={style} />;
}

export const Film = ({ scenes, sceneSeconds, tint, title, subtitle, voice, voiceAt, finalImage }: FilmProps) => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const len = sceneSeconds * fps;
  const titleFrom = durationInFrames - 4 * fps;
  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0D29' }}>
      <TransitionSeries>
        {scenes.map((s, i) => [
          <TransitionSeries.Sequence key={`s${i}`} durationInFrames={len} premountFor={fps}>
            <Clip clip={s.clip} len={len} />
            <AbsoluteFill style={{ background: `linear-gradient(180deg, ${tint}33 0%, rgba(10,13,41,0) 40%, rgba(10,13,41,.9) 100%)` }} />
            <Line en={s.en} vi={s.vi} len={len} />
          </TransitionSeries.Sequence>,
          <TransitionSeries.Transition key={`t${i}`} presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />,
        ])}
        <TransitionSeries.Sequence durationInFrames={4 * fps + 15} premountFor={fps}>
          {finalImage ? <Clip clip={finalImage} len={4 * fps} /> : null}
          <AbsoluteFill style={{ background: finalImage ? 'linear-gradient(180deg, rgba(10,13,41,0) 30%, rgba(10,13,41,.92))' : '#0A0D29' }} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 200, opacity: interpolate(frame, [titleFrom, titleFrom + 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease }) }}>
        <div style={{ fontFamily: disp, fontWeight: 800, fontSize: 112, color: tint, letterSpacing: '-0.01em', textShadow: `0 0 60px ${tint}88` }}>{title}</div>
        <div style={{ fontFamily: ui, fontWeight: 600, fontSize: 36, color: '#EAF2FF', marginTop: 8 }}>{subtitle}</div>
      </AbsoluteFill>

      <AbsoluteFill style={{ pointerEvents: 'none', boxShadow: 'inset 0 0 220px rgba(4,6,24,.85)' }} />
      {voice ? (
        <Sequence from={Math.round(voiceAt * fps)} premountFor={fps}>
          <Audio src={staticFile(voice)} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
