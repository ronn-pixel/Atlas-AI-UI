import fs from 'fs';

const file = 'src/pages/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/h-\[250px\] w-full relative shrink-0/g, 'flex-1 min-h-0 w-full relative');
content = content.replace(/grid grid-cols-1 lg:grid-cols-3 gap-\[10px\] flex-1 min-h-\[250px\] mt-\[10px\]/g, 'grid grid-cols-1 lg:grid-cols-3 gap-[10px] mt-[10px] shrink-0');

fs.writeFileSync(file, content, 'utf8');
