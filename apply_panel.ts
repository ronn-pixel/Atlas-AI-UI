import * as fs from 'fs';

const file = 'src/pages/Members.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. replace selectedPolicyId with selectedPolicy state
// We already have `const [selectedPolicy, setSelectedPolicy] = React.useState<any>(null);`
// Oh wait, did we? Let's check.
content = content.replace(/const \[selectedPolicyId, setSelectedPolicyId\] = React.useState<string \| null>\(null\);/, '');

// Actually, I'll just change the props of ClientProfilePanel.
// Let's use Regex to replace all selectedPolicyId instances and selectedPolicy instances? Wait, no. Let's just fix the ClientProfilePanel declaration and call.

// Check the call site:
content = content.replace(/selectedPolicyId=\{selectedPolicyId\}/, `selectedPolicy={selectedPolicy}`);
content = content.replace(/setSelectedPolicyId=\{setSelectedPolicyId\}/, `setSelectedPolicy={setSelectedPolicy}`);
content = content.replace(/selectedActivity=\{selectedActivity\}/g, `selectedActivity={selectedActivity}`); // prevent duplicate if I run multiple times
content = content.replace(/setSelectedActivity=\{setSelectedActivity\}/g, `setSelectedActivity={setSelectedActivity}`);

// Add selectedActivity to call site:
if (!content.includes('selectedActivity={selectedActivity}')) {
  // Insert it before selectedDependent
  content = content.replace(/selectedDependent=\{selectedDependent\}/, `selectedActivity={selectedActivity}\n              setSelectedActivity={setSelectedActivity}\n              selectedDependent={selectedDependent}`);
}

// 2. Client Profile Panel Definition Props
// Since I can't be sure of the exact regex, let's find the component signature:
const profilePropsStart = content.indexOf('export function ClientProfilePanel({');
const profilePropsEnd = content.indexOf('}: {', profilePropsStart);
const profileTypesEnd = content.indexOf('}) {', profilePropsEnd);

if (profilePropsStart !== -1 && profilePropsEnd !== -1 && profileTypesEnd !== -1) {
  let propsText = content.substring(profilePropsStart, profilePropsEnd);
  let typesText = content.substring(profilePropsEnd, profileTypesEnd);

  // Replace selectedPolicyId
  propsText = propsText.replace(/selectedPolicyId,/g, 'selectedPolicy,');
  propsText = propsText.replace(/setSelectedPolicyId,/g, 'setSelectedPolicy,');
  if (!propsText.includes('selectedActivity,')) {
    propsText = propsText + '  selectedActivity,\n  setSelectedActivity,\n';
  }

  typesText = typesText.replace(/selectedPolicyId: string \| null;/g, 'selectedPolicy: any;');
  typesText = typesText.replace(/setSelectedPolicyId: \(id: string \| null\) => void;/g, 'setSelectedPolicy: (policy: any) => void;');
  if (!typesText.includes('selectedActivity: any;')) {
    typesText = typesText + '\n  selectedActivity: any;\n  setSelectedActivity: (activity: any) => void;';
  }

  content = content.substring(0, profilePropsStart) + propsText + content.substring(profilePropsEnd, profileTypesEnd) + typesText + content.substring(profileTypesEnd);
}

// 3. Tab contents
// For policies, it used to check `selectedPolicyId`. 
content = content.replace(/selectedPolicyId/g, 'selectedPolicy');
content = content.replace(/setSelectedPolicyId/g, 'setSelectedPolicy');

fs.writeFileSync(file, content);
console.log("Client profile panel props updated");
