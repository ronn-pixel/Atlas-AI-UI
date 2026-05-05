export type ClaimStatus = 'Intake' | 'Repricing' | 'Editing' | 'Adjudication' | 'Funding' | 'Paid' | 'Denied' | 'Appealed';
export type CaseStatus = 'Open' | 'Investigation' | 'Vendor Inquiry' | 'Resolved' | 'Closed';
export type CasePriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Member {
  id: string; // Group(5) + Emp(5) + Dep(2)
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  status: 'Active' | 'Inactive';
  planId: string;
  coverageLevel: string;
  effectiveDate: string;
}

export interface Claim {
  id: string;
  memberId: string;
  providerName: string;
  serviceDate: string;
  receivedDate: string;
  amountBilled: number;
  amountAllowed: number;
  amountPaid: number;
  status: ClaimStatus;
  currentVendor?: string;
  diagnosisCodes: string[];
  serviceType: string;
}

export interface Case {
  id: string;
  claimId: string;
  memberId: string;
  title: string;
  description: string;
  status: CaseStatus;
  priority: CasePriority;
  assignedAgent: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  caseId: string;
  timestamp: string;
  user: string;
  action: string;
  message: string;
  type: 'system' | 'message' | 'vendor' | 'internal';
}
