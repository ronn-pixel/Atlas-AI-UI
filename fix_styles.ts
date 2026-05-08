const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'src/pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Unified corner radius for cards and panels
  content = content.replace(/\brounded-(lg|xl|3xl|\[[0-9.]+rem\])\b/g, 'rounded-2xl');
  content = content.replace(/\brounded-\[.*?rem\]\b/g, 'rounded-2xl');
  
  // Spacing standardizations
  content = content.replace(/\bgap-x-8 gap-y-6\b/g, 'gap-6');
  content = content.replace(/\bgap-\[10px\]\b/g, 'gap-4'); // Make small gaps standard gap-4
  content = content.replace(/\bgap-[89]\b/g, 'gap-6'); // Reduce 8 and 9 to 6
  content = content.replace(/\bgap-y-10 gap-x-12\b/g, 'gap-6');
  
  // Adjust flex gaps for some huge gaps
  content = content.replace(/\bgap-10\b/g, 'gap-6');
  content = content.replace(/\bgap-12\b/g, 'gap-6');
  content = content.replace(/\bgap-14\b/g, 'gap-8');
  content = content.replace(/\bgap-16\b/g, 'gap-8');

  fs.writeFileSync(filePath, content, 'utf-8');
}
console.log('Styles fixed');
