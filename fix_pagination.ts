import * as fs from 'fs';
let content = fs.readFileSync('src/components/ui/Pagination.tsx', 'utf8');

content = content.replace(`[10, 20, 30, 50, 100]`, `[10, 20, 50, 100]`);

fs.writeFileSync('src/components/ui/Pagination.tsx', content);
