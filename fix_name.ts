import * as fs from 'fs';
let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

content = content.replace(
  `{ l: 'Full Name', v: selectedMember.name, icon: User }`,
  `{ l: 'Full Name', v: \`\${selectedMember.name.split(' ').slice(-1)[0]}, \${selectedMember.name.split(' ').slice(0, -1).join(' ')} MI Extension\`, icon: User }`
);

fs.writeFileSync('src/pages/Members.tsx', content);
