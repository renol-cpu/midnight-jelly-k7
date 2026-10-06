// Merges content/src/<track>/dayNN.json fragments into app/public/content/dayNN.json (+ index.json),
// then rebalances normal days toward the real TOEIC mix: every day practises Parts 1-7,
// with Part 1/2 spread evenly across the season and surplus Part 2/5 moved to optional extra practice.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname)), '..');
const src = path.join(root, 'content/src');
const out = path.join(root, 'app/public/content');
fs.mkdirSync(out, { recursive: true });

const ARR = ['theory', 'listening', 'grammar', 'reading', 'vocab', 'story', 'beSua'];
const QUOTA = { 2: 7, 5: 10 }; // questions per normal day; the rest becomes extra practice
const days = {};
for (const t of fs.readdirSync(src).sort()) {
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
for (const d of Object.values(days)) { for (const k of ARR) d[k] ??= []; d.extra = []; }

// Spread Part 1 and Part 2 evenly (in their original order) over the normal days after the placement day.
const normal = Object.values(days).filter((d) => !d.boss && d.day !== 1).sort((a, b) => a.day - b.day);
for (const part of [1, 2]) {
  const pool = normal.flatMap((d) => d.listening.filter((s) => s.part === part));
  normal.forEach((d) => { d.listening = d.listening.filter((s) => s.part !== part); });
  pool.forEach((s, k) => normal[Math.floor((k * normal.length) / pool.length)].listening.push(s));
}

const qn = (sets) => sets.reduce((a, s) => a + s.questions.length, 0);
for (const d of normal) {
  // Real test order inside each section.
  d.listening.sort((a, b) => a.part - b.part);
  d.grammar.sort((a, b) => a.part - b.part);
  for (const [part, key] of [[2, 'listening'], [5, 'grammar']]) {
    const keep = [];
    for (const s of d[key].filter((x) => x.part === part)) (qn(keep) < QUOTA[part] ? keep : d.extra).push(s);
    d[key] = [...d[key].filter((x) => x.part < part), ...keep, ...d[key].filter((x) => x.part > part)];
  }
}

const index = [];
for (const d of Object.values(days)) {
  fs.writeFileSync(path.join(out, `day${String(d.day).padStart(2, '0')}.json`), JSON.stringify(d));
  const q = ['listening', 'grammar', 'reading'].reduce((a, k) => a + qn(d[k]), 0);
  const L = qn(d.listening);
  index.push({ day: d.day, week: d.week, boss: d.boss, title: d.title, questions: q, listening: L, reading: q - L, extra: qn(d.extra), words: d.vocab.length });
}
index.sort((a, b) => a.day - b.day);
fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify(index));
console.log(index.map((d) => `day${d.day}: L${d.listening} R${d.reading} +${d.extra} extra, ${d.words}w`).join('\n'));
