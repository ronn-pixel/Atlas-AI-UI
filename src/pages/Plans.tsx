import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { generatePlans } from '@/utils/dummyData';
import { 
  ShieldCheck, 
  Eye, 
  Edit, 
  Trash2, 
  Filter,
  DollarSign,
  Users,
  Activity,
  Layers,
  FileText,
  X,
  Plus
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';

const ALL_PLANS = generatePlans(105);

export default function Plans() {
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isConstructModalOpen, setIsConstructModalOpen] = React.useState(false);

  const totalPages = Math.ceil(ALL_PLANS.length / pageSize);
  const currentPlans = ALL_PLANS.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Benefit Architecture</h1>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-[0.4em] mt-2">Policy Registry & Election Control</p>
        </div>
        <Button 
          onClick={() => setIsConstructModalOpen(true)}
          size="sm" 
          className="h-14 bg-accent hover:opacity-90 text-white font-black uppercase text-[11px] tracking-[0.4em] px-12 shadow-xl shadow-accent/20 border-none rounded-2xl transition-all transform active:scale-95 flex items-center gap-3"
        >
          <Plus className="w-5 h-5" /> Construct Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        {[
          { label: 'Active Policies', val: '12,482', icon: FileText, color: 'bg-indigo-600' },
          { label: 'Avg Premium', val: '$412.50', icon: DollarSign, color: 'bg-success' },
          { label: 'Carrier Loss Ratio', val: '64.2%', icon: Activity, color: 'bg-orange-500' },
          { label: 'Open Enrollments', val: 432, icon: Users, color: 'bg-accent' },
        ].map(s => (
          <Card key={s.label} className="p-6 h-28 bg-card-bg border-none shadow-soft rounded-2xl flex items-center gap-6">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0", s.color)}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{s.label}</p>
              <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">{s.val}</h4>
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden bg-card-bg border-none rounded-xl shadow-soft flex flex-col flex-1 min-h-0">
        <div className="flex-1 overflow-auto no-scrollbar">
          <table className="w-full border-collapse table-fixed min-w-[1100px]">
            <thead className="sticky top-0 z-10 bg-bg-app">
              <tr className="bg-bg-app">
                <th className="px-4 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/8 text-left align-middle">Policy Number</th>
                <th className="px-4 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/8 text-left align-middle">Primary Member</th>
                <th className="px-4 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/8 text-left align-middle">Plan Type</th>
                <th className="px-4 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/8 text-left align-middle">Status</th>
                <th className="px-4 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/8 text-left align-middle">Coverage</th>
                <th className="px-4 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/8 text-left align-middle">Premium</th>
                <th className="px-4 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/8 text-left align-middle">Effective Date</th>
                <th className="px-10 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/8 text-center align-middle">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-[13px]">
              {currentPlans.map((p) => (
                <tr key={p.id} className="hover:bg-bg-app transition-all duration-300 group">
                  <td className="px-4 py-3 font-black text-accent uppercase tracking-[0.15em] text-[10px] tabular-nums text-left">{p.id}</td>
                  <td className="px-4 py-3 font-black text-text-primary uppercase tracking-tight text-sm truncate text-left">{p.name}</td>
                  <td className="px-4 py-3 text-text-muted font-bold uppercase tracking-widest text-[10px] truncate text-left">{p.type}</td>
                  <td className="px-4 py-3 text-left">
                    <Badge className={cn(
                      "text-[8.5px] font-black uppercase tracking-[0.2em] px-3 py-1 border-none shadow-none",
                      p.status === 'Active' ? 'bg-success/10 text-success' : p.status === 'Draft' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
                    )}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-left font-black text-text-primary uppercase tracking-widest text-[10px] tabular-nums">{p.tier}</td>
                  <td className="px-4 py-3 text-left font-black text-text-primary uppercase tracking-widest text-[10px] tabular-nums">{p.premium}</td>
                  <td className="px-4 py-3 text-text-muted font-black tracking-widest text-[10px] tabular-nums text-left">2024.01.01</td>
                  <td className="px-10 py-3 text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
                       <button className="p-2 text-text-muted hover:text-accent transition-all transform active:scale-90"><Eye className="w-3.5 h-3.5" /></button>
                       <button className="p-2 text-text-muted hover:text-accent transition-all transform active:scale-90"><Edit className="w-3.5 h-3.5" /></button>
                       <button className="p-2 text-text-muted hover:text-danger transition-all transform active:scale-90"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalRecords={ALL_PLANS.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          className="!mb-[5px]"
        />
      </Card>

      <AnimatePresence>
        {isConstructModalOpen && (
          <PlanModal 
            isOpen={true} 
            onClose={() => setIsConstructModalOpen(false)}
            onSave={(data) => {
              console.log('Creating plan:', data);
              setIsConstructModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PlanModal({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) {
  const [formData, setFormData] = React.useState({
    policyNumber: '',
    planName: '',
    planType: '',
    coverageDetails: '',
    premiumAmount: '',
    effectiveDate: '',
    expirationDate: '',
    status: ''
  });

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-6">
      <h3 className="text-[11px] font-black text-accent uppercase tracking-[0.4em] border-b border-border-subtle dark:border-white/5 pb-3">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value, type = 'text', options, placeholder }: { label: string; value: string; type?: string; options?: string[]; placeholder?: string }) => (
    <div className="space-y-1.5">
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</label>
      {options ? (
        <select 
          defaultValue={value}
          className="h-10 w-full px-4 bg-white dark:bg-slate-950 border border-border-subtle dark:border-white/10 rounded-xl text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-tight outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
        >
          <option value="" disabled>{placeholder || `Select ${label}`}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input 
          type={type} 
          defaultValue={value}
          placeholder={placeholder || `Enter ${label}`}
          className="h-10 w-full px-4 bg-white dark:bg-slate-950 border border-border-subtle dark:border-white/10 rounded-xl text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-tight outline-none focus:ring-2 focus:ring-accent/20" 
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-card-bg rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-10 py-8 border-b border-border-subtle dark:border-white/10 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">
              Construct New Plan
            </h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">
              Benefit Structural Engineering Terminal
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-12">
          <Section title="Plan Details">
            <Field label="Policy Number" value={formData.policyNumber} placeholder="POL-XXXXXX" />
            <Field label="Plan Name" value={formData.planName} placeholder="e.g. PPO Gold Plus" />
            <Field label="Plan Type" value={formData.planType} options={['PPO', 'HMO', 'EPO', 'POS', 'HDHP']} />
            <Field label="Coverage Details" value={formData.coverageDetails} placeholder="e.g. 90/10" />
            <Field label="Premium Amount" value={formData.premiumAmount} placeholder="$0.00" />
          </Section>

          <Section title="Validity">
            <Field label="Effective Date" value={formData.effectiveDate} type="date" />
            <Field label="Expiration Date" value={formData.expirationDate} type="date" />
            <Field label="Status" value={formData.status} options={['Active', 'Draft', 'Pending Approval', 'Retired']} />
          </Section>
        </div>

        {/* Modal Footer */}
        <div className="px-10 py-8 border-t border-border-subtle dark:border-white/10 flex justify-end gap-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="h-12 px-8 rounded-xl text-[11px] font-black uppercase tracking-widest border-border-subtle dark:border-white/10"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => onSave(formData)}
            className="h-12 px-10 bg-accent hover:opacity-90 text-white border-none rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-accent/20"
          >
            Create Plan
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
