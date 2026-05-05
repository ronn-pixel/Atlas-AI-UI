import * as fs from 'fs';

let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

// For claims table:
const claimsThRegex = /<th className="px-8 py-5 text-\[10px\] font-black uppercase tracking-\[0\.3em\] text-text-muted text-center">Action<\/th>/;
content = content.replace(claimsThRegex, '');

const claimsTrRegex = /<tr key=\{claim\.id\} className="hover:bg-slate-50\/30 dark:hover:bg-white\/5 transition-colors group">/;
content = content.replace(claimsTrRegex, '<tr key={claim.id} className="hover:bg-slate-50/30 dark:hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => setSelectedClaim(claim)}>');

const claimsActionTdRegex = /<td className="px-8 py-5 text-center">\s*<button[\s\S]*?<\/td>/;
content = content.replace(claimsActionTdRegex, '');

// For cases table:
const casesThRegex = claimsThRegex; 
content = content.replace(casesThRegex, '');

const casesTrRegex = /<tr key=\{item\.id\} className="hover:bg-slate-50\/30 dark:hover:bg-white\/5 transition-colors group">/;
content = content.replace(casesTrRegex, '<tr key={item.id} className="hover:bg-slate-50/30 dark:hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => setSelectedCase(item)}>');

const casesActionTdRegex = /<td className="px-8 py-5 text-center">\s*<button[\s\S]*?<\/td>/;
content = content.replace(casesActionTdRegex, '');

fs.writeFileSync('src/pages/Members.tsx', content);
