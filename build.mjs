import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = process.argv[2] || path.join(here, '..', 'd1bcf6a5', 'duty_list.json');
const target = path.join(here, 'index.html');

const roster = JSON.parse(fs.readFileSync(src, 'utf8'));
const sorted = Object.fromEntries(Object.entries(roster).sort(([a], [b]) => a.localeCompare(b)));

let html = fs.readFileSync(target, 'utf8');
const marker = /(<script type="application\/json" id="roster">)[\s\S]*?(<\/script>)/;
if (!marker.test(html)) throw new Error('找不到 roster 数据块，index.html 结构被改过了？');
html = html.replace(marker, (m, open, close) => `${open}\n${JSON.stringify(sorted)}\n${close}`);
fs.writeFileSync(target, html);

const days = Object.keys(sorted);
console.log(`已注入 ${days.length} 天：${days[0]} .. ${days[days.length - 1]}`);
