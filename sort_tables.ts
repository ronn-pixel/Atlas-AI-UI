import * as fs from 'fs';
let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

// Sort claims and cases newest first
content = content.replace(
  `setClaims(prop_MOCK_CLAIMS);`,
  `setClaims([...prop_MOCK_CLAIMS].sort((a, b) => new Date(b.date || b.timestamp || 0).getTime() - new Date(a.date || a.timestamp || 0).getTime()));`
);

content = content.replace(
  `setCases(prop_MOCK_CASES);`,
  `setCases([...prop_MOCK_CASES].sort((a, b) => new Date(b.date || b.updatedAt || 0).getTime() - new Date(a.date || a.updatedAt || 0).getTime()));`
);

fs.writeFileSync('src/pages/Members.tsx', content);
