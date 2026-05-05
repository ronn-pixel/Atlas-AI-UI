import * as fs from 'fs';

const file = 'src/pages/Members.tsx';
let content = fs.readFileSync(file, 'utf8');

// replace mock activities to add agent
const newMockActivities = `const MOCK_ACTIVITIES = [
  { id: '1', description: 'Address updated via member portal', timestamp: '2024-05-01 14:30', status: 'Resolved', agent: 'Agent M. Roberts' },
  { id: '2', description: 'Inquiry regarding PPO Gold coverage limits', timestamp: '2024-05-01 11:15', status: 'FCR', agent: 'Agent J. Doe' },
  { id: '3', description: 'Coordinated benefit verification with BlueCorp Intel', timestamp: '2024-04-30 16:45', status: 'Resolved', agent: 'System Auto' },
  { id: '4', description: 'New dependent added to policy', timestamp: '2024-04-30 09:00', status: 'FCR', agent: 'Agent T. Swift' },
  { id: '5', description: 'Claim CLM-9921 status inquiry', timestamp: '2024-04-29 13:20', status: 'Resolved', agent: 'Agent P. Parker' },
  ...Array.from({ length: 45 }).map((_, i) => ({
    id: \`A-\${i + 6}\`,
    description: \`System automated activity log #\${i + 6}\`,
    timestamp: '2024-04-28 10:00',
    status: i % 2 === 0 ? 'FCR' : 'Resolved',
    agent: i % 3 === 0 ? 'Agent L. Croft' : 'System Auto'
  }))
];`;

content = content.replace(/const MOCK_ACTIVITIES = \[[\s\S]*?\];/, newMockActivities);

// remove the isEnrollModalOpen and add selectedActivity & selectedPolicy
content = content.replace('const [isEnrollModalOpen, setIsEnrollModalOpen] = React.useState(false);', `const [selectedActivity, setSelectedActivity] = React.useState<any>(null);
  const [selectedPolicy, setSelectedPolicy] = React.useState<any>(null);`);

// update ClientProfilePanel props
content = content.replace(/selectedPolicyId,\n\s*setSelectedPolicyId,/, `selectedPolicy,\n  setSelectedPolicy,\n  selectedActivity,\n  setSelectedActivity,`);

// find the ClientProfilePanel declaration and update type if it has it... wait, it might not have an interface.
content = content.replace(/selectedPolicyId: string \| null;\n\s*setSelectedPolicyId: \(id: string \| null\) => void;/, `selectedPolicy: any;\n  setSelectedPolicy: (policy: any) => void;\n  selectedActivity: any;\n  setSelectedActivity: (activity: any) => void;`);

fs.writeFileSync(file, content);
console.log("State replaced");
