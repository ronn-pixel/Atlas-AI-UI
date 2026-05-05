import * as fs from 'fs';

const file = 'src/pages/Members.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Make the container flex-row-reverse so the list goes to the right and profile to the left when active
content = content.replace(
  `className="flex flex-col lg:flex-row gap-8 items-start relative min-h-[800px]"`,
  `className="flex flex-col lg:flex-row-reverse gap-8 items-start relative min-h-[800px]"`
);

// 2. Remove Action Column Header
const actionHeaderRegex = /<th className=\{cn\(\s*"[^"]*",\s*selectedMember \? "[^"]*" : "[^"]*"\s*\)\}>Action<\/th>/;
content = content.replace(actionHeaderRegex, '');

// Adjust Client header width to take remaining space
content = content.replace(
  `selectedMember ? "w-4/5" : "w-1/5"`,
  `selectedMember ? "w-full" : "w-1/3"`
);
content = content.replace(
  `<th className="px-6 py-4 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/5 text-left align-middle">Email</th>`,
  `<th className="px-6 py-4 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/3 text-left align-middle">Email</th>`
);
content = content.replace(
  `<th className="px-6 py-4 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/5 text-left align-middle">Status</th>`,
  `<th className="px-6 py-4 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/3 text-left align-middle">Status</th>`
);

// 3. Remove Action Column Cell
const actionCellRegex = /<td className=\{cn\([\s\S]*?<\/td>/;
content = content.replace(actionCellRegex, '');

// Also remove the "onEditProfile={() => setIsEnrollModalOpen(true)}" from ClientProfilePanel since we replaced state earlier
content = content.replace(/onEditProfile=\{\(\) => setIsEnrollModalOpen\(true\)\}/, `onEditProfile={() => {}}`);

fs.writeFileSync(file, content);
console.log("Modifications applied");
