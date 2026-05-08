import fs from 'fs';
import path from 'path';

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/flex-1 min-h-\[500px\]/g, 'h-[700px] shrink-0');

  fs.writeFileSync(file, content, 'utf8');
});
