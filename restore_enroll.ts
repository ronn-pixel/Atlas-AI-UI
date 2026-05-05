import * as fs from 'fs';

let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

const enrollModalCode = `
export function EnrollModal({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) {
  const [formData, setFormData] = React.useState({
    name: '', email: '', phone: '', status: 'Active', plan: 'PPO Gold', dob: '', zip: '', enrollmentDate: ''
  });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111827] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/5">
        <div className="px-10 py-8 border-b border-border-subtle dark:border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Enroll / Edit Member</h2>
          <button onClick={onClose} className="text-slate-500">X</button>
        </div>
        <div className="p-10 space-y-6 max-h-[60vh] overflow-y-auto">
           <div className="grid grid-cols-2 gap-4">
             <input type="text" placeholder="Full Name" className="w-full border border-border-subtle p-3 rounded-xl bg-slate-50 text-[11px] font-black uppercase text-slate-700" />
             <input type="email" placeholder="Email Address" className="w-full border border-border-subtle p-3 rounded-xl bg-slate-50 text-[11px] font-black uppercase text-slate-700" />
             <input type="tel" placeholder="Phone Number" className="w-full border border-border-subtle p-3 rounded-xl bg-slate-50 text-[11px] font-black uppercase text-slate-700" />
           </div>
        </div>
        <div className="px-10 py-8 border-t border-border-subtle flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 border border-border-subtle rounded-xl text-[11px] font-black uppercase">Cancel</button>
          <button onClick={() => onSave(formData)} className="px-6 py-3 bg-trust text-white rounded-xl text-[11px] font-black uppercase shadow-lg shadow-trust/20">Save Member</button>
        </div>
      </div>
    </div>
  );
}
`;

if (!content.includes('function EnrollModal')) {
  const modalRender = `
         {isEnrollModalOpen && (
           <EnrollModal 
             isOpen={true} 
             onClose={() => setIsEnrollModalOpen(false)}
             onSave={(data) => {
               console.log('Operational update:', data);
               setIsEnrollModalOpen(false);
             }}
           />
         )}
      </AnimatePresence>`;
  content = content.replace('</AnimatePresence>', modalRender);
  content += '\n' + enrollModalCode;
  fs.writeFileSync('src/pages/Members.tsx', content);
}
