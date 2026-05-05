import { Claim, Member, Case, ActivityLog } from './types';

export const MOCK_MEMBERS: Member[] = [
  { id: '210010041700', firstName: 'John', lastName: 'Doe', dateOfBirth: '1985-05-15', gender: 'M', status: 'Active', planId: 'PPO-GOLD', coverageLevel: 'Individual', effectiveDate: '2023-01-01' },
  { id: '210010041701', firstName: 'Jane', lastName: 'Doe', dateOfBirth: '1987-08-22', gender: 'F', status: 'Active', planId: 'PPO-GOLD', coverageLevel: 'Spouse', effectiveDate: '2023-01-01' },
  { id: '254210088900', firstName: 'Robert', lastName: 'Smith', dateOfBirth: '1970-12-01', gender: 'M', status: 'Active', planId: 'HSA-SILVER', coverageLevel: 'Family', effectiveDate: '2023-06-01' },
];

export const MOCK_CLAIMS: Claim[] = [
  { id: 'CLM-88210', memberId: '210010041700', providerName: 'General Hospital', serviceDate: '2024-03-10', receivedDate: '2024-03-12', amountBilled: 1250, amountAllowed: 980, amountPaid: 0, status: 'Adjudication', serviceType: 'Outpatient Surgery', diagnosisCodes: ['Z01.81'] },
  { id: 'CLM-88211', memberId: '210010041701', providerName: 'Main Street Pharmacy', serviceDate: '2024-03-11', receivedDate: '2024-03-11', amountBilled: 120, amountAllowed: 85, amountPaid: 85, status: 'Paid', serviceType: 'Pharmacy', diagnosisCodes: ['R05'] },
  { id: 'CLM-88212', memberId: '254210088900', providerName: 'Urgent Care Plus', serviceDate: '2024-03-15', receivedDate: '2024-03-16', amountBilled: 450, amountAllowed: 0, amountPaid: 0, status: 'Editing', serviceType: 'Urgent Care', diagnosisCodes: ['J01.90'] },
];

export const MOCK_CASES: Case[] = [
  { id: 'CASE-001', claimId: 'CLM-88210', memberId: '210010041700', title: 'High Value Claim Review', description: 'Reviewing claim exceeding standard threshold for outpatient surgery.', status: 'Investigation', priority: 'High', assignedAgent: 'Agent Smith', createdAt: '2024-03-12T10:00:00Z', updatedAt: '2024-03-13T14:30:00Z' },
  { id: 'CASE-002', claimId: 'CLM-88212', memberId: '254210088900', title: 'Provider Network Verification', description: 'Confirming provider status at time of service.', status: 'Open', priority: 'Medium', assignedAgent: 'Agent Johnson', createdAt: '2024-03-16T09:15:00Z', updatedAt: '2024-03-16T09:15:00Z' },
];

export const MOCK_ACTIVITY: ActivityLog[] = [
  { id: 'LOG-001', caseId: 'CASE-001', timestamp: '2024-03-12T10:02:00Z', user: 'System', action: 'Case Created', message: 'Automated case generation for high value claim.', type: 'system' },
  { id: 'LOG-002', caseId: 'CASE-001', timestamp: '2024-03-12T10:05:00Z', user: 'Agent Smith', action: 'Data Review', message: 'Reviewed claim CLM-88210 history.', type: 'internal' },
  { id: 'LOG-003', caseId: 'CASE-001', timestamp: '2024-03-12T10:08:00Z', user: 'Agent Smith', action: 'Vendor Inquiry', message: 'Sent pricing verification to Context4 Healthcare.', type: 'vendor' },
];
