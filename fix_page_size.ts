import * as fs from 'fs';
let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

// For Main Members List Pagination
content = content.replace(
  `onPageChange={handlePageChange}`,
  `onPageChange={handlePageChange}\n              onPageSizeChange={setPageSize}`
);

// For activities, policies, claims, cases Pagination. 
// Do they use `<Pagination`?
content = content.replace(/<Pagination\s+currentPage=\{timelinePage\}[\s\S]*?\/>/, 
  `<Pagination minimal currentPage={timelinePage} totalPages={Math.ceil(activities.length / timelinePageSize)} pageSize={timelinePageSize} totalRecords={activities.length} onPageChange={setTimelinePage} onPageSizeChange={setTimelinePageSize} />`);

content = content.replace(/<Pagination\s+currentPage=\{policyPage\}[\s\S]*?\/>/, 
  `<Pagination minimal currentPage={policyPage} totalPages={Math.ceil(policies.length / policyPageSize)} pageSize={policyPageSize} totalRecords={policies.length} onPageChange={setPolicyPage} onPageSizeChange={setPolicyPageSize} />`);

content = content.replace(/<Pagination\s+currentPage=\{claimsPage\}[\s\S]*?\/>/, 
  `<Pagination minimal currentPage={claimsPage} totalPages={Math.ceil(claims.length / claimsPageSize)} pageSize={claimsPageSize} totalRecords={claims.length} onPageChange={setClaimsPage} onPageSizeChange={setClaimsPageSize} />`);

content = content.replace(/<Pagination\s+currentPage=\{casesPage\}[\s\S]*?\/>/, 
  `<Pagination minimal currentPage={casesPage} totalPages={Math.ceil(cases.length / casesPageSize)} pageSize={casesPageSize} totalRecords={cases.length} onPageChange={setCasesPage} onPageSizeChange={setCasesPageSize} />`);

fs.writeFileSync('src/pages/Members.tsx', content);
