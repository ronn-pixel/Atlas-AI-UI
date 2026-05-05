import * as fs from 'fs';

const filePath = 'src/pages/Members.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Match:
content = content.replace(
  /className="bg-transparent !mt-\[10px\] !pt-\[15px\] !pb-0 px-5 w-full"/g,
  'className="bg-transparent !mt-[10px] !pt-[15px] !pb-0 !px-6 w-full"'
);

fs.writeFileSync(filePath, content);
console.log('Final alignment applied successfully.');
