import * as fs from 'fs';
let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

// List empty state
content = content.replace(
  `{currentMembers.map((member) => (`,
  `{currentMembers.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-[11px] font-black uppercase tracking-widest text-text-muted">No records found.</td></tr>
                  ) : currentMembers.map((member) => (`
);

// Activities empty state - activities maps over slice
content = content.replace(
  `{activities.slice((timelinePage - 1) * timelinePageSize, timelinePage * timelinePageSize).map((event: any) => (`,
  `{activities.length === 0 ? (
                    <div className="py-12 text-center text-[10px] font-black uppercase tracking-widest text-text-muted">No activities recorded.</div>
                  ) : activities.slice((timelinePage - 1) * timelinePageSize, timelinePage * timelinePageSize).map((event: any) => (`
);

// Policies empty state
content = content.replace(
  `{policies.slice((policyPage - 1) * policyPageSize, policyPage * policyPageSize).map((policy: any) => (`,
  `{policies.length === 0 ? (
                    <div className="py-12 text-center text-[10px] font-black uppercase tracking-widest text-text-muted">No active policies found.</div>
                  ) : policies.slice((policyPage - 1) * policyPageSize, policyPage * policyPageSize).map((policy: any) => (`
);

// Claims empty state
content = content.replace(
  `{claims.slice((claimsPage - 1) * claimsPageSize, claimsPage * claimsPageSize).map((claim: any) => (`,
  `{claims.length === 0 ? (
                    <tr><td colSpan={4} className="px-8 py-12 text-center text-[10px] font-black uppercase tracking-widest text-text-muted">No claims filed.</td></tr>
                  ) : claims.slice((claimsPage - 1) * claimsPageSize, claimsPage * claimsPageSize).map((claim: any) => (`
);

// Cases empty state
content = content.replace(
  `{cases.slice((casesPage - 1) * casesPageSize, casesPage * casesPageSize).map((item: any) => (`,
  `{cases.length === 0 ? (
                    <tr><td colSpan={4} className="px-8 py-12 text-center text-[10px] font-black uppercase tracking-widest text-text-muted">No active cases.</td></tr>
                  ) : cases.slice((casesPage - 1) * casesPageSize, casesPage * casesPageSize).map((item: any) => (`
);

fs.writeFileSync('src/pages/Members.tsx', content);
