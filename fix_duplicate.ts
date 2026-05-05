import * as fs from 'fs';
let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

const doubleActionRegex = /(<td className="px-6 py-4 text-center align-middle">\s*<div className="flex items-center justify-center gap-2">[\s\S]*?<\/div>\s*<\/td>\s*)<td className="px-6 py-4 text-center align-middle">[\s\S]*?<\/td>/;

content = content.replace(doubleActionRegex, '$1');

// Make sure that `actionTd` is ONLY shown when `!selectedMember`. Let's check where it ends up.
// Looking at the grep, it appears it is before `</>` which is the end of `{!selectedMember && ( <> ... </> )}`.
// So the duplicated td is inside the short circuit or outside?
fs.writeFileSync('src/pages/Members.tsx', content);
