import * as fs from 'fs';

const file = 'src/pages/Members.tsx';
let content = fs.readFileSync(file, 'utf8');

const startMarker = '{/* RIGHT: Client Profile Detail Panel */}';
const endMarker = '</AnimatePresence>\n      </div>\n\n      {/* MODALS */}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `{/* RIGHT: Client Profile Detail Panel */}
        <AnimatePresence mode="wait">
          {selectedMember && (
            <ClientProfilePanel
              selectedMember={selectedMember}
              onClose={() => setSelectedMember(null)}
              onEditProfile={() => setIsEnrollModalOpen(true)}
              timelinePage={timelinePage}
              setTimelinePage={setTimelinePage}
              timelinePageSize={timelinePageSize}
              setTimelinePageSize={setTimelinePageSize}
              claimsPage={claimsPage}
              setClaimsPage={setClaimsPage}
              claimsPageSize={claimsPageSize}
              setClaimsPageSize={setClaimsPageSize}
              casesPage={casesPage}
              setCasesPage={setCasesPage}
              casesPageSize={casesPageSize}
              setCasesPageSize={setCasesPageSize}
              selectedPolicyId={selectedPolicyId}
              setSelectedPolicyId={setSelectedPolicyId}
              selectedDependent={selectedDependent}
              setSelectedDependent={setSelectedDependent}
              selectedClaim={selectedClaim}
              setSelectedClaim={setSelectedClaim}
              selectedCase={selectedCase}
              setSelectedCase={setSelectedCase}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              renderMemberPagination={renderMemberPagination}
              MOCK_ACTIVITIES={MOCK_ACTIVITIES}
              MOCK_POLICIES={MOCK_POLICIES}
              MOCK_CLAIMS={MOCK_CLAIMS}
              MOCK_CASES={MOCK_CASES}
            />
          )}
        </AnimatePresence>
      </div>

      {/* MODALS */}`;
      
  content = content.substring(0, startIndex) + replacement + content.substring(endIndex + endMarker.length);
  fs.writeFileSync(file, content);
  console.log("Success");
} else {
  console.log("Indices not found: ", startIndex, endIndex);
}
