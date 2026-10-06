// Usage: node scripts/validate-content.mjs [track]   (no track = all tracks)
// Checks the JSON fragments in content/src/<track>/dayNN.json against the rules in plan/content-guide.md.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname)), '..');
const src = path.join(root, 'content/src');
const only = process.argv[2];
const OPTS = { 1: 4, 2: 3, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4 };
const VOICES = new Set(['usM', 'usF', 'gbM', 'gbF', 'auM', 'auF', 'caM', 'caF']);
const errors = [];
const ids = new Map();
let count = 0;

const err = (f, id, msg) => errors.push(`${f} ${id ?? ''}: ${msg}`);
const dash = (s) => typeof s === 'string' && /[–—]/.test(s);

function checkSet(f, s) {
  if (!s.id) err(f, '?', 'set without id');
  if (ids.has(s.id)) err(f, s.id, `duplicate id (also in ${ids.get(s.id)})`);
  ids.set(s.id, f);
  if (s.part <= 4 && !(s.audio?.length)) err(f, s.id, 'listening set needs audio lines');
  for (const l of s.audio ?? []) {
    if (!VOICES.has(l.voice)) err(f, s.id, `bad voice ${l.voice}`);
    if (!l.text?.trim()) err(f, s.id, 'empty audio line');
  }
  if (s.part === 1) {
    if (!s.image) err(f, s.id, 'P1 needs image');
    else if (!fs.existsSync(path.join(root, 'app/public', s.image))) err(f, s.id, `image missing: ${s.image}`);
  }
  if ((s.part === 3 || s.part === 4) && s.questions.length !== 3) err(f, s.id, 'P3/P4 sets need exactly 3 questions');
  if (s.part === 6) {
    if (s.questions.length !== 4) err(f, s.id, 'P6 sets need exactly 4 questions');
    const t = (s.passages ?? []).map((p) => p.text).join(' ');
    for (const b of ['[1]', '[2]', '[3]', '[4]']) if (!t.includes(b)) err(f, s.id, `P6 passage missing blank ${b}`);
  }
  if (s.part === 7 && !(s.passages?.length)) err(f, s.id, 'P7 needs passages');
  if (s.part >= 6 && s.passages?.some((p) => dash(p.text))) err(f, s.id, 'em/en dash in passage');
  for (const q of s.questions ?? []) {
    count++;
    const qid = q.id;
    if (ids.has(qid)) err(f, qid, `duplicate id (also in ${ids.get(qid)})`);
    ids.set(qid, f);
    if (q.part !== s.part) err(f, qid, 'question part differs from set part');
    if (!String(q.skill).startsWith(`p${q.part}.`)) err(f, qid, `skill ${q.skill} does not match part`);
    if (![1, 2, 3].includes(q.level)) err(f, qid, 'level must be 1-3');
    if (q.options?.length !== OPTS[q.part]) err(f, qid, `needs ${OPTS[q.part]} options`);
    if (!(q.answer >= 0 && q.answer < (q.options?.length ?? 0))) err(f, qid, 'answer out of range');
    if (new Set(q.options).size !== q.options?.length) err(f, qid, 'duplicate options');
    if (q.part >= 3 && !q.q) err(f, qid, 'missing stem q');
    if (q.part === 5 && !/_{3,}|-{4,}/.test(q.q ?? '')) err(f, qid, 'P5 stem needs a blank ____');
    if (!q.why?.vi || !q.why?.en) err(f, qid, 'why.vi and why.en required');
    if ([q.q, q.trap, q.why?.vi, q.why?.en, ...(q.options ?? [])].some(dash)) err(f, qid, 'em/en dash');
  }
}

const tracks = fs.existsSync(src) ? fs.readdirSync(src).filter((t) => !only || t === only) : [];
for (const t of tracks) {
  for (const file of fs.readdirSync(path.join(src, t)).filter((x) => /^day\d\d\.json$/.test(x))) {
    const f = `${t}/${file}`;
    let d;
    try { d = JSON.parse(fs.readFileSync(path.join(src, t, file), 'utf8')); } catch (e) { err(f, '', `invalid JSON: ${e.message}`); continue; }
    for (const k of ['listening', 'grammar', 'reading']) for (const s of d[k] ?? []) checkSet(f, s);
    for (const w of d.vocab ?? []) if (!w.word || !w.vi || !w.example?.en || !w.ipa) err(f, w.word, 'vocab needs word, ipa, vi, example');
    for (const c of d.theory ?? []) if (!c.rule?.vi || !c.examples?.length) err(f, c.id, 'theory needs rule.vi and examples');
    for (const b of d.story ?? []) if (!b.en || !b.vi) err(f, '', 'story beat needs en and vi');
  }
}

if (errors.length) { console.log(errors.join('\n')); console.log(`\n${errors.length} error(s), ${count} questions checked`); process.exit(1); }
console.log(`OK: ${count} questions checked${only ? ` in ${only}` : ''}`);
