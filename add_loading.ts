import * as fs from 'fs';

let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

const replacement = `const [membersData, setMembersData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedMember, setSelectedMember] = React.useState<any>(null);`;

content = content.replace(/const.\[membersData,\ssetMembersData\].=.*ALL_MEMBERS\);[\s\S]*?const.\[selectedMember,\ssetSelectedMember\].=.*null\);/, replacement);

const effect = `
  React.useEffect(() => {
    let active = true;
    setTimeout(() => {
      if(active) {
        setMembersData(ALL_MEMBERS);
        setIsLoading(false);
      }
    }, 800);
    return () => { active = false; };
  }, []);
`;

content = content.replace(/(const totalPages = Math.ceil\(membersData\.length \/ pageSize\);)/, effect + '\n  $1');

// Now prevent rendering the entire UI during loading!
const uiStart = `  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">`;

const loadingState = `  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
         <div className="w-12 h-12 border-4 border-trust border-t-transparent rounded-full animate-spin"></div>
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">Loading Directory Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">`;

content = content.replace(uiStart, loadingState);

fs.writeFileSync('src/pages/Members.tsx', content);
