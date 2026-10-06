import { Composition } from 'remotion';
import { Film } from './Film';

// Duration = scenes x 4.5s minus 0.5s per fade, plus the 4.5s title card.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Intro"
        component={Film}
        fps={30}
        width={720}
        height={1280}
        durationInFrames={5 * 135 - 5 * 15 + 135}
        defaultProps={{
          sceneSeconds: 4.5,
          tint: '#9CC8FF',
          title: 'Sứa Đêm',
          subtitle: 'Midnight Jelly',
          voice: 'vo/intro.mp3',
          voiceAt: 20.5,
          finalImage: 'media/v16.mp4',
          scenes: [
            { clip: 'media/v06.mp4', en: 'Saigon, 11 p.m.', vi: 'Sài Gòn, 11 giờ đêm.' },
            { clip: 'media/v12.mp4', en: 'The café is closed. The tanks still glow.', vi: 'Quán đã đóng cửa. Bể sứa vẫn sáng.' },
            { clip: 'media/v15.mp4', en: 'One keeper stays behind.', vi: 'Một người giữ sứa ở lại.' },
            { clip: 'media/v02.mp4', en: 'Every night, he dreams of the deep.', vi: 'Mỗi đêm, em mơ về đáy biển.' },
            { clip: 'media/v04.mp4', en: 'Someone is calling him. In English.', vi: 'Có người đang gọi em. Bằng tiếng Anh.' },
          ],
        }}
      />
      <Composition
        id="Twist"
        component={Film}
        fps={30}
        width={720}
        height={1280}
        durationInFrames={4 * 135 - 4 * 15 + 135}
        defaultProps={{
          sceneSeconds: 4.5,
          tint: '#FF7A45',
          title: 'Abyssal Corp',
          subtitle: 'Người tốt không phải người tốt',
          voice: 'vo/twist.mp3',
          voiceAt: 9,
          finalImage: 'media/v13.mp4',
          scenes: [
            { clip: 'media/v10.mp4', en: 'The kind captain.', vi: 'Người thuyền trưởng tốt bụng.' },
            { clip: 'media/v05.mp4', en: 'The crates. The ledger.', vi: 'Những thùng hàng. Cuốn sổ.' },
            { clip: 'media/v08.mp4', en: 'It was him. All of it.', vi: 'Là ông ta. Tất cả.' },
            { clip: 'media/v03.mp4', en: 'Run, Huy.', vi: 'Chạy đi, Huy.' },
          ],
        }}
      />
      <Composition
        id="Finale"
        component={Film}
        fps={30}
        width={720}
        height={1280}
        durationInFrames={8 * 135 - 8 * 15 + 135}
        defaultProps={{
          sceneSeconds: 4.5,
          tint: '#F06BB0',
          title: 'Good morning, bé iu',
          subtitle: 'Mùa 2: Lặn cùng nhau',
          voice: 'vo/finale.mp3',
          voiceAt: 9,
          finalImage: 'huy-hello.jpg',
          scenes: [
            { clip: 'media/v07.mp4', en: 'Every signal you understood', vi: 'Mỗi tín hiệu em hiểu được' },
            { clip: 'media/v11.mp4', en: 'brought you closer to the surface.', vi: 'đưa em gần mặt nước hơn.' },
            { clip: 'media/v01.mp4', en: 'Huy, wherever you drift,', vi: 'Huy, dù em trôi về đâu,' },
            { clip: 'media/v06.mp4', en: 'my light stays on.', vi: 'đèn của anh vẫn sáng.' },
            { clip: 'media/v15.mp4', en: 'Even in the deepest dark,', vi: 'Dù ở nơi tối nhất,' },
            { clip: 'media/v12.mp4', en: 'follow my voice', vi: 'hãy đi theo giọng anh' },
            { clip: 'media/v16.mp4', en: 'and wake up, bé iu.', vi: 'và tỉnh dậy nhé, bé iu.' },
            { clip: 'media/v14.mp4', en: 'I was always here.', vi: 'Anh vẫn luôn ở đây.' },
          ],
        }}
      />
    </>
  );
};
