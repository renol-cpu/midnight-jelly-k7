import fs from 'node:fs';
import path from 'node:path';
const out = path.resolve(import.meta.dirname, '../../content/src/p5a');
const days = {};
for (const f of fs.readdirSync(import.meta.dirname).filter(x=>/^d.*\.mjs$/.test(x))) Object.assign(days, (await import('./'+f)).default);
for (const [n, d] of Object.entries(days)) {
  const NN = String(n).padStart(2,'0');
  let k = 0;
  const grammar = [];
  const sizes = d.sets;
  let idx = 0;
  sizes.forEach((sz, si) => {
    const questions = d.items.slice(idx, idx+sz).map((it) => {
      const [lv, skill, q, key, ds, why, trap] = it;
      k++;
      const pos = (k*3 + Number(n)) % 4;
      const options = [...ds]; options.splice(pos, 0, key);
      const [vi, en] = why.split(' || ');
      const o = { id: `d${NN}-p5-${String(k).padStart(2,'0')}`, part: 5, skill: 'p5.'+skill, level: lv, q, options, answer: pos, why: { vi, en } };
      if (trap) o.trap = trap;
      return o;
    });
    idx += sz;
    grammar.push({ id: `d${NN}-p5-${'abc'[si]}`, part: 5, questions });
  });
  if (idx !== d.items.length) throw new Error('day '+n+' items '+d.items.length+' sets '+idx);
  const o = { grammar }; if (d.theory?.length) o.theory = d.theory.map((t,i)=>({id:`d${NN}-th-${i+1}`, ...t}));
  fs.writeFileSync(path.join(out, `day${NN}.json`), JSON.stringify(o, null, 1));
}
