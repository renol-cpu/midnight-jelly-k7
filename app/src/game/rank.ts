// Score forecast and the Liên Quân-style rank ladder.
// ponytail: piecewise-linear raw% -> scaled score; ETS does not publish its tables, recalibrate after Huy's real scores.

const L_CURVE: [number, number][] = [[0, 5], [0.25, 100], [0.4, 200], [0.55, 280], [0.7, 360], [0.85, 440], [0.95, 495], [1, 495]];
const R_CURVE: [number, number][] = [[0, 5], [0.25, 60], [0.4, 140], [0.55, 230], [0.7, 320], [0.85, 410], [0.95, 480], [1, 495]];

function interp(curve: [number, number][], p: number) {
  for (let i = 1; i < curve.length; i++) {
    const [x0, y0] = curve[i - 1];
    const [x1, y1] = curve[i];
    if (p <= x1) return Math.round((y0 + ((y1 - y0) * (p - x0)) / (x1 - x0)) / 5) * 5;
  }
  return 495;
}

export const scaleListening = (p: number) => interp(L_CURVE, p);
export const scaleReading = (p: number) => interp(R_CURVE, p);

export const RANKS = [
  { min: 0, vi: 'Đồng', en: 'Bronze', color: '#C98A5B' },
  { min: 350, vi: 'Bạc', en: 'Silver', color: '#B9C4D6' },
  { min: 450, vi: 'Vàng', en: 'Gold', color: '#F2C14E' },
  { min: 500, vi: 'Bạch Kim', en: 'Platinum', color: '#8FE3D6' },
  { min: 600, vi: 'Kim Cương', en: 'Diamond', color: '#8EC5FF' },
  { min: 700, vi: 'Tinh Anh', en: 'Elite', color: '#C59BFF' },
  { min: 750, vi: 'Cao Thủ', en: 'Master', color: '#FF8FB1' },
  { min: 800, vi: 'Chiến Tướng', en: 'Grandmaster', color: '#FF7A45' },
  { min: 860, vi: 'Chiến Thần', en: 'Challenger', color: '#FFE38A' },
];

export function rankFor(score: number | null) {
  if (score == null) return { ...RANKS[0], next: RANKS[1], idx: 0 };
  let idx = 0;
  RANKS.forEach((r, i) => { if (score >= r.min) idx = i; });
  return { ...RANKS[idx], next: RANKS[idx + 1], idx };
}

// Depth on the map follows the forecast so the dive and the score move together.
export const depthFor = (score: number | null) => (score == null ? 0 : Math.max(0, Math.round((score - 250) * 7)));
