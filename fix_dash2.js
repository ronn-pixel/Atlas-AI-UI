import fs from 'fs';

const file = 'src/pages/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

// The first card was changed by npx replace-in-file, the remaining 5 were not matched if they had different classes, let's just make sure all 6 graphs get the class.
content = content.replace(/<Card className="p-6 bg-card-bg border-none shadow-soft rounded-lg hover:bg-accent\/5 transition-all flex flex-col">/g, '<Card className="h-[360px] p-6 bg-card-bg border-none shadow-soft rounded-lg hover:bg-accent/5 transition-all flex flex-col shrink-0">');
// Update the first one to include shrink-0 too
content = content.replace(/<Card className="h-\[360px\] p-6 bg-card-bg border-none shadow-soft rounded-lg hover:bg-accent\/5 transition-all flex flex-col">/g, '<Card className="h-[360px] p-6 bg-card-bg border-none shadow-soft rounded-lg hover:bg-accent/5 transition-all flex flex-col shrink-0">');

fs.writeFileSync(file, content, 'utf8');
