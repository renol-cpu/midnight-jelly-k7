# Renders every listening set, vocab word and story line to mp3 with neural voices (edge-tts).
# Usage: tools/.venv/bin/python scripts/tts.py   (skips files that already exist; delete one to re-render it)
import asyncio, json, os, re, subprocess, tempfile, glob
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, 'app/public')
OUT = os.path.join(PUB, 'audio')
VOICES = {
    'usM': 'en-US-AndrewNeural', 'usF': 'en-US-AvaNeural', 'gbM': 'en-GB-RyanNeural', 'gbF': 'en-GB-SoniaNeural',
    'auM': 'en-AU-WilliamMultilingualNeural', 'auF': 'en-AU-NatashaNeural', 'caM': 'en-CA-LiamNeural', 'caF': 'en-CA-ClaraNeural',
}
STORY = {'M': 'en-US-BrianMultilingualNeural', 'NOVA': 'en-US-EmmaNeural', 'BAO': 'en-GB-ThomasNeural', 'HUY': 'en-US-AndrewNeural',
         'NARRATOR': 'en-GB-SoniaNeural', 'BESUA': 'en-US-AnaNeural'}
sem = asyncio.Semaphore(8)


async def say(text, voice, path, rate='+0%'):
    async with sem:
        for attempt in range(4):
            try:
                await edge_tts.Communicate(text, voice, rate=rate).save(path)
                return
            except Exception:
                await asyncio.sleep(2 ** attempt)
        raise RuntimeError(f'TTS failed: {text[:40]}')


def silence(tmp, sec):
    p = os.path.join(tmp, f'sil{sec}.mp3')
    if not os.path.exists(p):
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', str(sec), '-q:a', '9', '-c:a', 'libmp3lame', p], check=True)
    return p


async def render_set(s, tmp):
    out = os.path.join(OUT, f"{s['id']}.mp3")
    if os.path.exists(out) or not s.get('audio'):
        return 0
    parts, letters = [], 'ABCD'
    lines = s['audio']
    for i, l in enumerate(lines):
        text = l['text']
        if s['part'] == 1:
            text = f'{letters[i]}. {text}' if i < 4 else text
        elif s['part'] == 2 and i > 0:
            text = f'{letters[i - 1]}. {text}'
        f = os.path.join(tmp, f"{s['id']}-{i}.mp3")
        await say(text, VOICES.get(l['voice'], 'en-US-AvaNeural'), f)
        parts.append(f)
        gap = 1.2 if (s['part'] == 2 and i == 0) else 0.9 if s['part'] <= 2 else 0.35
        parts.append(silence(tmp, gap))
    lst = os.path.join(tmp, f"{s['id']}.txt")
    with open(lst, 'w') as fh:
        fh.writelines(f"file '{p}'\n" for p in parts)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-ac', '1', '-c:a', 'libmp3lame', '-q:a', '6', out], check=True)
    return 1


def slug(s):
    return re.sub(r'^-|-$', '', re.sub(r'[^a-z0-9]+', '-', s.lower()))


async def main():
    os.makedirs(os.path.join(OUT, 'w'), exist_ok=True)
    os.makedirs(os.path.join(OUT, 's'), exist_ok=True)
    jobs = []
    with tempfile.TemporaryDirectory() as tmp:
        for f in sorted(glob.glob(os.path.join(PUB, 'content/day*.json'))):
            d = json.load(open(f))
            for key in ('listening', 'grammar', 'reading'):
                for s in d.get(key, []):
                    jobs.append(render_set(s, tmp))
            for w in d.get('vocab', []):
                p = os.path.join(OUT, 'w', f"{slug(w['word'])}.mp3")
                if not os.path.exists(p):
                    jobs.append(say(w['word'], 'en-US-AvaNeural', p, '-10%'))
            for k, b in enumerate(d.get('story', [])):
                p = os.path.join(OUT, 's', f"d{d['day']:02d}-{k}.mp3")
                if not os.path.exists(p):
                    jobs.append(say(b['en'], STORY.get(b['speaker'], 'en-GB-SoniaNeural'), p, '-5%'))
        print(f'{len(jobs)} jobs')
        res = await asyncio.gather(*jobs, return_exceptions=True)
        errs = [r for r in res if isinstance(r, Exception)]
        print(f'done, {len(errs)} errors', *errs[:5], sep='\n')


asyncio.run(main())
