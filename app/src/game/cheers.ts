// Love notes for streak milestones and "come back" nudges, written from real moments in Huy's chats
// (morning check-ins, "Love you a trillion", ice skating, the split shift, his home-made noodles). Signed by the Mystery Man.

export interface Cheer { text: string; media?: string }

// Shown at 3, 5, 10, 15, 20... correct answers in one shift.
export const MILESTONES = [3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100];

const CHEERS: Cheer[] = [
  { text: 'Ba câu đúng liền! Bé giỏi quó hihii.', media: 'p01' },
  { text: 'Năm câu rồi đó. Ăn sáng chưa dọ? Ăn rồi mới có sức lặn tiếp nha.', media: 'v06' },
  { text: 'Mười câu! Love you ten thousand... à không, a trillion :33', media: 'p05' },
  { text: 'Mười lăm câu! Giống hôm bé chà xong 3 hồ lớn: mỏi lưng mà phê luôn.', media: 'v12' },
  { text: 'Hai mươi câu! Thưởng bé một buổi trượt băng sáng Chủ nhật nè.', media: 'p08' },
  { text: 'Chạy xe thì dưới 50km/h, còn học thì cứ phóng nhanh vậy nha hihi.', media: 'v15' },
  { text: 'Mì tương đen bé tự chế ngon hơn quán. Tiếng Anh của bé cũng sắp xịn hơn sách rồi đó.', media: 'p10' },
  { text: 'Shương shương. Uống miếng nước, duỗi lưng một cái rồi làm tiếp nhé.', media: 'v07' },
  { text: 'Mấy bé sứa trong hồ đang vỗ tay bằng xúc tu cho bé đó.', media: 'p03' },
  { text: 'Khách Tây hỏi "Which one is the flame jelly?" là bé trả lời được liền rồi nè.', media: 'v10' },
  { text: 'Năm mươi câu! Huy giỏi nhất bể. Người bí ẩn đang mỉm cười nè.', media: 'v16' },
  { text: '30ml cốt cà phê + 1 hộp sữa tươi = năng lượng học TOEIC cả buổi chiều.', media: 'p11' },
  { text: 'Hôm nay nhiều khách hem? Dù đông hay vắng, bé vẫn học đều. Thương ghê.', media: 'v01' },
  { text: 'Ôm ôm bé một cái nè. Nice day bé iu!', media: 'p06' },
  { text: 'Không phải "I am lazy guy" đâu nha. Phải là "I am a hard-working guy" :33', media: 'v13' },
  { text: 'Hồ nào bé quản lý cũng sạch bong. Đầu bé giờ cũng sạch lỗi word form rồi.', media: 'p12' },
];

export function cheerFor(correctCount: number): Cheer | null {
  const i = MILESTONES.indexOf(correctCount);
  if (i < 0) return null;
  return CHEERS[i % CHEERS.length];
}

// Home-screen nudge, depending on how many days since Huy last played.
export function comeBack(daysAway: number): string | null {
  if (daysAway <= 0) return null;
  if (daysAway === 1) return 'Hôm nay bé chưa ghé bể nè. Mấy bé sứa đang chờ được cho ăn đó hihi.';
  if (daysAway <= 3) return `Bé iu ơi, ${daysAway} ngày rồi đó. Sứa mặt trăng nhớ bé quá trời. Ghé chơi ca ngắn 20 phút thôi nha?`;
  return 'Người bí ẩn nhớ bé nhiều lắm. Không cần học lâu đâu, vào cho sứa ăn một chút thôi cũng được nè. Shương shương.';
}

// A tiny note after each right answer, so every correct answer also feeds the jellies.
export const FEED_LINES = ['Măm măm', 'Sứa no rồi', 'Ngon quó', 'Thêm miếng nữa', 'Sứa vui ghê'];
