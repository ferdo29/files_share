import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const AUDIO_DIR = path.join(ROOT, 'audio');
const OUT = path.join(AUDIO_DIR, 'manifest.json');

// Укажите публичную базу URL (например, с Pages)
// или задайте через переменную окружения PUBLIC_BASE_URL
const BASE = process.env.PUBLIC_BASE_URL || 'https://<user>.github.io/<repo>/audio/';

function titleFromName(name) {
  const clean = name.replace(/\.[^/.]+$/, '');
  return clean.replace(/[\-_]+/g, ' ').trim();
}

const files = (await fs.readdir(AUDIO_DIR))
  .filter(f => f.toLowerCase().endsWith('.mp3'))
  .sort((a, b) => a.localeCompare(b, 'ru'));

const manifest = {
  baseUrl: BASE.endsWith('/') ? BASE : BASE + '/',
  files: files.map(name => ({ name, title: titleFromName(name) }))
};

await fs.writeFile(OUT, JSON.stringify(manifest, null, 2), 'utf8');
console.log('✅ manifest.json updated:', OUT);
