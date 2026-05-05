import * as fs from 'fs';

let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

// I also need to fix `EnrollModal`, earlier I said "remove EnrollModal". Let's check if it exists in the file.
const enrollModalRegex = /function EnrollModal\([\s\S]*?\}([\n]*)$/; 
// Oh, the file ends after EnrollModal, we need to be careful.

const policyModalCode = `
export function PolicyModal({ policy, onClose, onDependentClick }: { policy: any; onClose: () => void; onDependentClick: (dep: any) => void }) {
  if (!policy) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-[#111827] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/5"
      >
        <div className="px-10 py-8 border-b border-border-subtle dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/20">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Policy Details</h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">{policy.id}</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
             >
               <X className="w-5 h-5" />
             </button>
          </div>
        </div>

        <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
               <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">Plan Type</label>
               <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">{policy.type}</p>
            </div>
            <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
               <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">Effective Date</label>
               <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">{policy.effectiveDate}</p>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-black/10 rounded-2xl p-6 border border-border-subtle">
             <h5 className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
               <Users className="w-4 h-4" /> Linked Dependents
             </h5>
             <div className="grid grid-cols-1 gap-4">
                {policy.dependents.length > 0 ? policy.dependents.map((dep: any) => (
                  <div key={dep.id} onClick={() => onDependentClick(dep)} className="flex items-center justify-between p-4 bg-white dark:bg-[#1F2937] border border-border-subtle rounded-xl cursor-pointer hover:border-trust transition-colors">
                     <div className="flex items-center gap-3">
                       <User className="w-4 h-4 text-trust" />
                       <div className="flex flex-col">
                         <span className="text-[11px] font-black uppercase tracking-widest text-text-primary dark:text-white">{dep.name}</span>
                         <span className="text-[9px] text-text-muted font-black uppercase tracking-widest">{dep.relation} • {dep.dob} • {dep.gender}</span>
                       </div>
                     </div>
                     <ChevronLeft className="w-4 h-4 rotate-180 opacity-50" />
                  </div>
                )) : (
                  <p className="text-[10px] font-black text-text-muted uppercase">No dependents linked to this policy.</p>
                )}
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
`;

content = content.replace(enrollModalRegex, policyModalCode);

fs.writeFileSync('src/pages/Members.tsx', content);

