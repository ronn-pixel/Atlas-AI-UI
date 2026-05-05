/**
 * Generates dummy data for the application modules
 */

export const DIVERSE_FIRST_NAMES = [
  'John', 'Sarah', 'Michael', 'Emily', 'Daniel', 'Laura', 'Robert', 'Jessica', 'Kevin', 'Rachel',
  'David', 'Angela', 'Maria', 'James', 'Linda', 'William', 'Elizabeth', 'Richard', 'Barbara', 'Joseph',
  'Susan', 'Thomas', 'Margaret', 'Charles', 'Lisa', 'Christopher', 'Nancy', 'Matthew', 'Karen', 'Anthony',
  'Betty', 'Mark', 'Helen', 'Paul', 'Sandra', 'Steven', 'Donna', 'Andrew', 'Carol', 'Kenneth',
  'Ruth', 'Joshua', 'Sharon', 'George', 'Michelle', 'Brian', 'Rebecca', 'Edward', 'Shirley'
];

export const DIVERSE_LAST_NAMES = [
  'Smith', 'Garcia', 'Johnson', 'Rodriguez', 'Williams', 'Martinez', 'Brown', 'Hernandez', 'Jones', 'Lopez',
  'Miller', 'Gonzalez', 'Davis', 'Perez', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee',
  'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
  'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

export const generateMembers = (count: number = 115) => {
  const statuses = ['Active', 'Renewed', 'Terminated'];
  const initials = ['A.', 'M.', 'L.', 'S.', 'J.', 'K.', 'R.', 'T.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.', 'I.', 'N.', 'O.', 'P.', 'Q.'];
  const extensions = ['', '', '', 'Jr.', 'Sr.', 'III', '', '', '', ''];

  return Array.from({ length: count }, (_, i) => {
    const fName = DIVERSE_FIRST_NAMES[i % DIVERSE_FIRST_NAMES.length];
    const lName = DIVERSE_LAST_NAMES[(i * 3) % DIVERSE_LAST_NAMES.length];
    const mi = initials[(i * 7) % initials.length];
    const ext = extensions[i % extensions.length];
    const fullName = `${lName}, ${fName} ${mi}${ext ? ' ' + ext : ''}`;
    
    return {
      id: `MEM-${String(100000 + i).padStart(6, '0')}`,
      name: fullName,
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}@example.com`,
      status: statuses[i % 3],
      plan: 'PPO Gold',
      enrollmentDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
    };
  });
};

export const generateClaims = (count: number = 115) => {
  const types = ['Medical', 'Pharmacy', 'Dental', 'Vision'];
  const statuses = ['Approved', 'Pending', 'Denied', 'In Review'];
  const providers = ['General Hospital', 'CVS Pharmacy', 'City Dental', 'Urgent Care Plus', 'Optical Center', 'Specialist Clinic', 'Walgreens', 'Dentist Group', 'Radiology Assoc.'];
  
  const initials = ['A.', 'M.', 'L.', 'S.', 'J.', 'K.', 'R.', 'T.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.', 'I.', 'N.', 'O.', 'P.', 'Q.'];
  const extensions = ['', '', '', 'Jr.', 'Sr.', 'III', '', '', '', ''];

  return Array.from({ length: count }, (_, i) => {
    const fName = DIVERSE_FIRST_NAMES[i % DIVERSE_FIRST_NAMES.length];
    const lName = DIVERSE_LAST_NAMES[(i * 3) % DIVERSE_LAST_NAMES.length];
    const mi = initials[(i * 7) % initials.length];
    const ext = extensions[i % extensions.length];
    const fullName = `${lName}, ${fName} ${mi}${ext ? ' ' + ext : ''}`;

    return {
      id: `CLM-${String(1928 + i).padStart(6, '0')}`,
      member: fullName,
      type: types[i % 4],
      status: statuses[i % 4],
      provider: providers[i % providers.length],
      claimed: `$${(Math.random() * 5000 + 50).toFixed(2)}`,
      approved: i % 4 === 0 ? `$${(Math.random() * 4000 + 40).toFixed(2)}` : '-',
      date: `2024.03.${String((i % 20) + 1).padStart(2, '0')}`
    };
  });
};

export const generateVendors = (count: number = 105) => {
  const categories = ['Provider', 'Pharmacy', 'Lab', 'Network'];
  const regions = ['NorthEast', 'SouthWest', 'Central', 'Pacific'];
  return Array.from({ length: count }, (_, i) => ({
    id: `VND-${String(5000 + i).padStart(4, '0')}`,
    name: `${['MediCorp', 'HealthPath', 'BioLabs', 'PharmaCare', 'SafePoint', 'TotalHealth', 'PrimeMed', 'AlphaLabs', 'ZenithCare', 'OmniHealth'][i % 10]} ${i + 1}`,
    category: categories[i % 4],
    status: i % 10 === 9 ? 'Suspended' : 'Active',
    region: regions[i % 4],
    rating: (Math.random() * 2 + 3).toFixed(1),
    compliance: `${Math.floor(Math.random() * 15 + 85)}%`,
    contact: `admin@${['medicorp', 'healthpath', 'biolabs', 'pharma', 'safepoint'][i % 5]}.ai`
  }));
};

export const PROVIDERS = [
  { name: 'General Hospital', npi: '1029384756', tin: '99-1234567' },
  { name: 'CVS Pharmacy', npi: '1928374650', tin: '88-7654321' },
  { name: 'City Dental', npi: '1122334455', tin: '77-1122334' },
  { name: 'Urgent Care Plus', npi: '5566778899', tin: '66-5544332' },
  { name: 'Optical Center', npi: '6677889900', tin: '55-0099887' },
];

export const generatePlans = (count: number = 102) => {
  const types = ['PPO', 'HMO', 'EPO', 'POS'];
  const tiers = ['Gold', 'Silver', 'Bronze', 'Platinum'];
  return Array.from({ length: count }, (_, i) => ({
    id: `PLN-${String(100 + i).padStart(3, '0')}`,
    name: `${tiers[i % 4]} ${types[i % 4]} Advantage ${i + 1}`,
    type: types[i % 4],
    tier: tiers[i % 4],
    members: Math.floor(Math.random() * 5000 + 100),
    premium: `$${(Math.random() * 400 + 200).toFixed(2)}`,
    status: i % 15 === 0 ? 'Draft' : 'Active'
  }));
};

export const generateCases = (count: number = 110) => {
  const priorities = ['High', 'Critical', 'Medium', 'Low'];
  const statuses = ['New', 'In Review', 'Escalated to Vendor', 'Pending', 'Resolved', 'Closed'];
  const issueTypes = ['Claims Processing', 'Member Inquiry', 'Provider Dispute', 'System Anomaly', 'Vendor Escalation'];
  const getMemberName = (idx: number) => {
    const initials = ['A.', 'M.', 'L.', 'S.', 'J.', 'K.', 'R.', 'T.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.', 'I.', 'N.', 'O.', 'P.', 'Q.'];
    const extensions = ['', '', '', 'Jr.', 'Sr.', 'III', '', '', '', ''];
    const fName = DIVERSE_FIRST_NAMES[idx % DIVERSE_FIRST_NAMES.length];
    const lName = DIVERSE_LAST_NAMES[(idx * 3) % DIVERSE_LAST_NAMES.length];
    const mi = initials[(idx * 7) % initials.length];
    const ext = extensions[idx % extensions.length];
    return `${lName}, ${fName} ${mi}${ext ? ' ' + ext : ''}`;
  };

  const agents = ['Ronn A.', 'Agent Smith', 'Sarah W.'];

  const generateActivities = (caseId: string) => {
    const types: ('status' | 'email' | 'note' | 'call')[] = ['status', 'email', 'note', 'call'];
    const users = ['Ronn Aguilar', 'Sarah Agent', 'SYSTEM NODE 4', 'Agent 101'];
    return Array.from({ length: 10 }, (_, i) => ({
      id: `${caseId}-ACT-${i}`,
      type: types[i % 4],
      action: ['Case Escalated', 'Outbound Transmission', 'Internal Technical Assessment', 'Tele-Interface', 'Status Sync', 'Claim Review', 'Document Verification', 'Member Outreach', 'Verification Audit', 'Final Sync'][i % 10],
      user: users[i % 4],
      time: `${(10 + i) % 12 + 1}:00 ${i % 2 === 0 ? 'AM' : 'PM'}`,
      date: `2026.04.${String(20 + (i % 8)).padStart(2, '0')}`,
      details: `Specific operational sequence logged for ${caseId}. Sequence index: ${i}. Detailed audit trail preserved in security logs.`
    })).reverse();
  };

  const generateFiles = (caseId: string) => [
    { id: `${caseId}-FL-1`, name: `Claim_Form_${caseId}.pdf`, size: '2.4 MB', type: 'PDF', status: 'Active', archivePath: '' },
    { id: `${caseId}-FL-2`, name: `Provider_Invoice_${caseId}.docx`, size: '1.1 MB', type: 'DOCX', status: 'Active', archivePath: '' },
    { id: `${caseId}-FL-3`, name: `Member_ID_${caseId}.png`, size: '4.5 MB', type: 'PNG', status: 'Active', archivePath: '' }
  ];

  return Array.from({ length: count }, (_, i) => {
    const id = `CASE-2026-${String(1000 + i).padStart(4, '0')}`;
    return {
      id,
      memberId: `MBR-${String(21000 + i).padStart(5, '0')}`,
      memberName: getMemberName(i),
      claimId: `CLM-${String(50000 + i).padStart(5, '0')}`,
      issueType: issueTypes[i % issueTypes.length],
      priority: priorities[i % priorities.length],
      status: statuses[i % statuses.length],
      agent: agents[i % agents.length],
      createdDate: '2026-04-21 10:00 AM',
      lastUpdated: '2026-04-21 10:45 AM',
      description: 'Operational discrepancy identified during automated adjudication cycle. Requires manual review of provider credentials and service codes.',
      activities: generateActivities(id),
      files: generateFiles(id)
    };
  });
};
