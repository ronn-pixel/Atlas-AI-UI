import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { generateClaims } from '@/utils/dummyData';
import { 
  Search, 
  FileText, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  Filter,
  DollarSign,
  Activity,
  AlertCircle,
  Briefcase,
  FileCheck,
  X,
  CheckCircle,
  Plus,
  Loader2,
  Check
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';

const ALL_CLAIMS = generateClaims(145);

export default function Claims() {
  const [pageSize, setPageSize] = React.useState(20);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isInitializeModalOpen, setIsInitializeModalOpen] = React.useState(false);
  const [batchState, setBatchState] = React.useState<'idle' | 'loading' | 'success'>('idle');

  const totalPages = Math.ceil(ALL_CLAIMS.length / pageSize);
  const currentClaims = ALL_CLAIMS.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleBatchProcess = () => {
    setBatchState('loading');
    setTimeout(() => {
      setBatchState('success');
      setTimeout(() => setBatchState('idle'), 3000);
    }, 2000);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-[10px] animate-in fade-in duration-700 pb-0 m-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0 mr-8">
          <div className="shrink-0 flex flex-col justify-center min-w-0 w-[270px] transition-all duration-300">
            <div className="min-w-0 shrink">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-widest uppercase truncate">Adjudication Feed</h1>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-[0.4em] mt-2 truncate">Claim Lifecycle & Financial Settlement</p>
            </div>
          </div>
          <div className="w-[20px] shrink-0" />
          <div className="h-12 w-px bg-border-subtle dark:bg-white/10 shrink-0" />
          <div className="w-[20px] shrink-0" />
          <div className="flex flex-nowrap items-center gap-4 flex-1 min-w-0">
            {[
              { label: 'Pending Adjudication', val: 142, icon: FileCheck },
              { label: 'Auto-Approval Rate', val: '84.5%', icon: Activity },
              { label: 'Potential Overpayment', val: '$12,402', icon: AlertCircle },
              { label: 'Settled Today', val: '$84,290', icon: DollarSign },
            ].map(s => (
              <Card key={s.label} className="px-5 py-4 flex flex-row items-center justify-start gap-4 h-[84px] bg-card-bg shadow-soft border-none relative transition-all hover:bg-accent/5 group rounded-2xl flex-1 min-w-0 shrink-0">
                <div className="flex flex-col justify-center">
                  <s.icon className="w-[30px] h-[30px] text-accent shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1 leading-none truncate">{s.label}</div>
                  <div className="text-[22px] font-black text-slate-900 dark:text-white tabular-nums tracking-tight leading-none truncate">{s.val}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Button 
          variant="primaryAction"
          size="primaryAction"
          style={{ width: '276px' }}
          onClick={() => setIsInitializeModalOpen(true)}
        >
          <Plus className="w-5 h-5 flex-shrink-0" /> INITIALIZE CLAIM
        </Button>
      </div>

      <Card className="overflow-hidden bg-card-bg border-none rounded-2xl shadow-soft flex flex-col h-[900px] shrink-0 m-0">
        <div className="w-full flex-1 overflow-auto min-h-0 relative">
          <table className="w-full border-collapse table-fixed min-w-[1200px]">
            <thead className="bg-bg-app sticky top-0 z-10 shadow-[0_1px_0_0_theme(colors.border.subtle)]">
              <tr className="bg-bg-app">
                <th className="h-[46px] py-0 px-4 font-black uppercase tracking-[0.3em] text-text-muted text-[9px] w-[10%] text-left align-middle">Claim ID</th>
                <th className="h-[46px] py-0 px-4 font-black uppercase tracking-[0.3em] text-text-muted text-[9px] w-[12%] text-left align-middle">Subscriber</th>
                <th className="h-[46px] py-0 px-4 font-black uppercase tracking-[0.3em] text-text-muted text-[9px] w-[10%] text-left align-middle">Type</th>
                <th className="h-[46px] py-0 px-4 font-black uppercase tracking-[0.3em] text-text-muted text-[9px] w-[10%] text-left align-middle">Status</th>
                <th className="h-[46px] py-0 px-4 font-black uppercase tracking-[0.3em] text-text-muted text-[9px] w-[15%] text-left align-middle">Provider Node</th>
                <th className="h-[46px] py-0 px-4 font-black uppercase tracking-[0.3em] text-text-muted text-[9px] w-[10%] text-left align-middle">Claimed</th>
                <th className="h-[46px] py-0 px-4 font-black uppercase tracking-[0.3em] text-text-muted text-[9px] w-[10%] text-left align-middle">Approved</th>
                <th className="h-[46px] py-0 px-4 font-black uppercase tracking-[0.3em] text-text-muted text-[9px] w-[12%] text-left align-middle">DOS Registry</th>
                <th className="h-[46px] py-0 px-10 font-black uppercase tracking-[0.3em] text-text-muted text-[9px] w-[11%] text-center align-middle">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-[13px]">
              {currentClaims.map((c) => (
                <tr key={c.id} className="hover:bg-bg-app transition-all duration-300 group">
                  <td className="h-[54px] py-0 px-4 font-black text-accent uppercase tracking-[0.15em] text-[10px] tabular-nums text-left">{c.id}</td>
                  <td className="h-[54px] py-0 px-4 font-black text-text-primary uppercase tracking-tight text-[12px] truncate text-left">{c.member}</td>
                  <td className="h-[54px] py-0 px-4 text-text-muted font-bold uppercase tracking-widest text-[9px] truncate text-left">{c.type}</td>
                  <td className="h-[54px] py-0 px-4 text-left">
                    <Badge className={cn(
                      "text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 border-none shadow-none",
                      c.status === 'Approved' ? 'bg-success/10 text-success' : c.status === 'Pending' ? 'bg-warning/10 text-warning' : c.status === 'Denied' ? 'bg-danger/10 text-danger' : 'bg-indigo-500/10 text-indigo-500'
                    )}>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="h-[54px] py-0 px-4 font-black text-text-primary uppercase tracking-widest text-[10px] truncate text-left">{c.provider}</td>
                  <td className="h-[54px] py-0 px-4 text-left font-black text-text-primary uppercase tracking-widest text-[10px] tabular-nums">{c.claimed}</td>
                  <td className="h-[54px] py-0 px-4 text-left font-black text-text-primary uppercase tracking-widest text-[10px] tabular-nums">{c.approved}</td>
                  <td className="h-[54px] py-0 px-4 text-text-muted font-black tracking-widest text-[10px] tabular-nums text-left">{c.date}</td>
                  <td className="h-[54px] py-0 px-10 text-center align-middle">
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
          totalRecords={ALL_CLAIMS.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Card>

      <AnimatePresence>
        {isInitializeModalOpen && (
          <ClaimModal 
            isOpen={true} 
            onClose={() => setIsInitializeModalOpen(false)}
            onSave={(data) => {
              console.log('Submitting claim:', data);
              setIsInitializeModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ClaimModal({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) {
  const [formData, setFormData] = React.useState({
    claimNumber: '',
    memberName: '',
    provider: '',
    claimType: '',
    dateOfService: '',
    amountClaimed: '',
    amountApproved: '',
    status: ''
  });

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-6">
      <h3 className="text-[11px] font-black text-accent uppercase tracking-[0.4em] border-b border-border-subtle dark:border-white/5 pb-3">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          className="h-10 w-full px-4 bg-white dark:bg-slate-950 border border-border-subtle dark:border-white/10 rounded-2xl text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-tight outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
        >
          <option value="" disabled>{placeholder || `Select ${label}`}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input 
          type={type} 
          defaultValue={value}
          placeholder={placeholder || `Enter ${label}`}
          className="h-10 w-full px-4 bg-white dark:bg-slate-950 border border-border-subtle dark:border-white/10 rounded-2xl text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-tight outline-none focus:ring-2 focus:ring-accent/20" 
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
        className="relative w-full max-w-6xl max-h-[90vh] bg-card-bg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-10 py-8 border-b border-border-subtle dark:border-white/10 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">
              Initialize New Claim
            </h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">
              Financial Adjudication Intake System
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-12">
          <Section title="Claim Information">
            <Field label="Claim Number" value={formData.claimNumber} placeholder="CLM-XXXXXX" />
            <Field label="Member Name" value={formData.memberName} />
            <Field label="Provider" value={formData.provider} placeholder="Medical Facility / Practitioner" />
            <Field label="Claim Type" value={formData.claimType} options={['Medical', 'Pharmacy', 'Dental', 'Vision', 'Other']} />
            <Field label="Date of Service" value={formData.dateOfService} type="date" />
          </Section>

          <Section title="Financial Details">
            <Field label="Amount Claimed" value={formData.amountClaimed} placeholder="$0.00" />
            <Field label="Amount Approved" value={formData.amountApproved} placeholder="$0.00" />
            <Field label="Status" value={formData.status} options={['Pending', 'Approved', 'Denied', 'In Review']} />
          </Section>
        </div>

        {/* Modal Footer */}
        <div className="px-10 py-8 border-t border-border-subtle dark:border-white/10 flex justify-end gap-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="h-12 px-8 rounded-2xl text-[11px] font-black uppercase tracking-widest border-border-subtle dark:border-white/10"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => onSave(formData)}
            className="h-12 px-10 bg-accent hover:opacity-90 text-white border-none rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-accent/20"
          >
            Submit Claim
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
