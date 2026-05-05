import * as fs from 'fs';

let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

const replacementState = `  const [activities, setActivities] = React.useState<any[]>([]);
  const [policies, setPolicies] = React.useState<any[]>([]);
  const [claims, setClaims] = React.useState<any[]>([]);
  const [cases, setCases] = React.useState<any[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    setIsLoadingProfile(true);
    setTimeout(() => {
      if(active) {
        setActivities(prop_MOCK_ACTIVITIES);
        setPolicies(prop_MOCK_POLICIES);
        setClaims(prop_MOCK_CLAIMS);
        setCases(prop_MOCK_CASES);
        setIsLoadingProfile(false);
      }
    }, 800);
    return () => { active = false; };
  }, [selectedMember.id, prop_MOCK_ACTIVITIES, prop_MOCK_POLICIES, prop_MOCK_CLAIMS, prop_MOCK_CASES]);
`;

// rename the props in the function signature to avoid conflict
const profilePropsStart = content.indexOf('export function ClientProfilePanel({');
const profilePropsEnd = content.indexOf('}: any', profilePropsStart);

if (profilePropsStart !== -1 && profilePropsEnd !== -1) {
  let propsText = content.substring(profilePropsStart, profilePropsEnd);
  propsText = propsText.replace('MOCK_ACTIVITIES,', 'MOCK_ACTIVITIES: prop_MOCK_ACTIVITIES,');
  propsText = propsText.replace('MOCK_POLICIES,', 'MOCK_POLICIES: prop_MOCK_POLICIES,');
  propsText = propsText.replace('MOCK_CLAIMS,', 'MOCK_CLAIMS: prop_MOCK_CLAIMS,');
  propsText = propsText.replace('MOCK_CASES,', 'MOCK_CASES: prop_MOCK_CASES,');
  
  content = content.substring(0, profilePropsStart) + propsText + content.substring(profilePropsEnd);
}

const profileStartRegex = /export function ClientProfilePanel\([\s\S]*?\{\n\s*return \(\n\s*<motion\.div/;
const match = content.match(profileStartRegex);
if (match) {
  content = content.replace(profileStartRegex, match[0].replace('return (', replacementState + `
  if (isLoadingProfile) {
    return (
      <motion.div 
        key={selectedMember.id + '-loading'}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="flex-1 w-full space-y-8 flex flex-col items-center justify-center min-h-[600px]"
      >
        <div className="w-12 h-12 border-4 border-trust border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted mt-4">Loading Profile Data...</p>
      </motion.div>
    );
  }

  return (`));
}

// Now we need to replace the usage of MOCK_ variables inside ClientProfilePanel, but ONLY inside ClientProfilePanel and NOT outside of it.
const panelStart = content.indexOf('export function ClientProfilePanel');
const panelEnd = content.indexOf('export default function Members()');

if (panelStart !== -1 && panelEnd !== -1) {
  let panelContent = content.substring(panelStart, panelEnd);
  panelContent = panelContent.replace(/MOCK_ACTIVITIES/g, 'activities');
  panelContent = panelContent.replace(/MOCK_POLICIES/g, 'policies');
  panelContent = panelContent.replace(/MOCK_CLAIMS/g, 'claims');
  panelContent = panelContent.replace(/MOCK_CASES/g, 'cases');
  // Wait, I renamed the props to `prop_MOCK_ACTIVITIES`. Replacing `MOCK_ACTIVITIES` will modify that.
  // Oh well, it will become `prop_activities`. That's fine since I'll just change the replace pattern.
  panelContent = panelContent.replace(/prop_activities/g, 'prop_MOCK_ACTIVITIES');
  panelContent = panelContent.replace(/prop_policies/g, 'prop_MOCK_POLICIES');
  panelContent = panelContent.replace(/prop_claims/g, 'prop_MOCK_CLAIMS');
  panelContent = panelContent.replace(/prop_cases/g, 'prop_MOCK_CASES');

  content = content.substring(0, panelStart) + panelContent + content.substring(panelEnd);
}

fs.writeFileSync('src/pages/Members.tsx', content);
