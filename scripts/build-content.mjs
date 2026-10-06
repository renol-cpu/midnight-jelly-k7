// Merges content/src/<track>/dayNN.json fragments into app/public/content/dayNN.json (+ index.json).
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname)), '..');
const src = path.join(root, 'content/src');
const out = path.join(root, 'app/public/content');
fs.mkdirSync(out, { recursive: true });

const ARR = ['theory', 'listening', 'grammar', 'reading', 'vocab', 'story', 'beSua'];
const days = {};
for (const t of fs.readdirSync(src)) {
  for (const file of fs.readdirSync(path.join(src, t)).filter((x) => /^day\d\d\.json$/.test(x))) {
    const n = Number(file.slice(3, 5));
    const d = (days[n] ??= { day: n, week: Math.ceil(n / 7), boss: n % 7 === 0, title: { vi: '', en: '' } });
    const frag = JSON.parse(fs.readFileSync(path.join(src, t, file), 'utf8'));
    for (const [k, v] of Object.entries(frag)) {
      if (ARR.includes(k)) d[k] = [...(d[k] ?? []), ...v];
      else d[k] = v;
    }
  }
}
const index = [];
for (const d of Object.values(days)) {
  for (const k of ARR) d[k] ??= [];
  fs.writeFileSync(path.join(out, `day${String(d.day).padStart(2, '0')}.json`), JSON.stringify(d));
  const q = ['listening', 'grammar', 'reading'].reduce((a, k) => a + d[k].reduce((b, s) => b + s.questions.length, 0), 0);
  index.push({ day: d.day, week: d.week, boss: d.boss, title: d.title, questions: q, words: d.vocab.length });
}
index.sort((a, b) => a.day - b.day);
fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify(index));
console.log(index.map((d) => `day${d.day}: ${d.questions}q ${d.words}w`).join('\n'));
