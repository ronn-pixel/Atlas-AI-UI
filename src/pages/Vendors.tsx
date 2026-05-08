import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { generateVendors } from '@/utils/dummyData';
import { 
  Building2, 
  Eye, 
  Edit, 
  Trash2, 
  Filter,
  Star,
  Calendar,
  Activity,
  X,
  Plus,
  ChevronLeft,
  Shield,
  User,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';

const ALL_VENDORS = generateVendors(112);

export default function Vendors() {
  const [selectedVendor, setSelectedVendor] = React.useState<any>(null);
  const [pageSize, setPageSize] = React.useState(20);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isAddVendorModalOpen, setIsAddVendorModalOpen] = React.useState(false);

  const totalPages = Math.ceil(ALL_VENDORS.length / pageSize);
  const currentVendors = ALL_VENDORS.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (selectedVendor) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700 pb-12">
        <div className="flex items-center justify-between">
           <button 
            onClick={() => setSelectedVendor(null)}
            className="text-text-muted dark:text-slate-500 hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all"
           >
             <ChevronLeft className="w-4 h-4" /> Return to Network
           </button>
           <div className="flex gap-3">
             <Button variant="outline" size="sm" className="bg-white dark:bg-[#1F2937] border-none shadow-soft font-black h-12 px-8 uppercase tracking-widest text-[10px] hover:text-accent">
               <Edit className="w-4 h-4 mr-2" /> Edit Partner
             </Button>
           </div>
        </div>

        <Card className="p-10 border-none bg-white dark:bg-[#1F2937] rounded-2xl shadow-soft flex flex-col lg:flex-row gap-6 items-start">
           <div className="flex flex-col items-center gap-6 shrink-0">
              <div className="w-40 h-40 rounded-2xl bg-slate-50 dark:bg-black/20 flex items-center justify-center relative shadow-xl overflow-hidden group border-4 border-white dark:border-slate-800">
                  <Building2 className="w-20 h-20 text-accent" />
              </div>
              <div className="text-center">
                <Badge className="bg-success/10 text-success border-none text-[9px] px-4 py-1.5 font-black tracking-[0.2em] uppercase mb-3 text-center w-full">Verified Network Partner</Badge>
                <p className="text-[11px] text-text-muted font-black uppercase tracking-[0.3em]">NODE-{selectedVendor.id}</p>
              </div>
           </div>

           <div className="flex-1 space-y-10 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { l: 'Business Entity', v: selectedVendor.name, icon: Building2 },
                  { l: 'Point of Contact', v: selectedVendor.contact, icon: User },
                  { l: 'Service Protocol', v: selectedVendor.category, icon: Activity },
                  { l: 'Compliance Tier', v: 'Level 1 HIPAA', icon: Shield },
                  { l: 'Onboarding Date', v: '2023.11.14', icon: Calendar },
                  { l: 'Performance Index', v: '98.4%', icon: Star },
                ].map(x => (
                  <div key={x.l} className="space-y-3 group border-b border-slate-50 dark:border-white/5 pb-4">
                     <p className="text-[9px] uppercase tracking-[0.4em] text-text-muted dark:text-slate-600 font-black flex items-center gap-2">
                       <x.icon className="w-3 h-3 text-accent opacity-50" />
                       {x.l}
                      </p>
                     <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight leading-tight group-hover:text-accent transition-colors">{x.v}</p>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-accent/5 rounded-2xl border border-accent/10 flex items-center justify-between">
                 <div>
                    <h4 className="text-[11px] font-black text-accent uppercase tracking-widest">Active HIPAA Verification</h4>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight mt-1">This node is verified for PHI orchestration</p>
                 </div>
                 <Button 
                   variant="outline" 
                   className="h-12 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest border-accent/20 text-accent hover:bg-accent hover:text-white transition-all shadow-lg shadow-accent/5"
                 >
                   Verify Compliance Now
                 </Button>
              </div>
           </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Card className="p-8 bg-white dark:bg-[#1F2937] border-none rounded-2xl shadow-soft">
              <h3 className="font-black text-[12px] text-text-muted uppercase tracking-[0.4em] mb-8">Service Level Agreements (SLA)</h3>
              <div className="space-y-6">
                {[
                  { l: 'Uptime Commitment', v: '99.99%', p: 100 },
                  { l: 'Data Recovery Speed', v: '2.4 Hours', p: 85 },
                  { l: 'Encryption Integrity', v: 'AES-256', p: 95 },
                ].map(s => (
                  <div key={s.l} className="space-y-3">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-500">{s.l}</span>
                       <span className="text-accent">{s.v}</span>
                     </div>
                     <div className="h-1.5 bg-slate-100 dark:bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-accent shadow-sm" style={{ width: `${s.p}%` }} />
                     </div>
                  </div>
                ))}
              </div>
           </Card>

           <Card className="p-8 bg-white dark:bg-[#1F2937] border-none rounded-2xl shadow-soft">
              <h3 className="font-black text-[12px] text-text-muted uppercase tracking-[0.4em] mb-8">Node Telemetry</h3>
              <div className="space-y-6">
                {[
                  { l: 'Last Handshake', v: '14ms ago', s: 'success' },
                  { l: 'System Integrity', v: 'Vaulted', s: 'success' },
                  { l: 'PHI Access Log', v: '24 Events', s: 'neutral' },
                ].map(s => (
                  <div key={s.l} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-black/10 rounded-2xl border border-transparent hover:border-accent/10 transition-all">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.l}</span>
                     <Badge className={cn(
                       "text-[8px] font-black uppercase tracking-widest px-3",
                       s.s === 'success' ? 'bg-success/10 text-success' : 'bg-trust/10 text-trust'
                     )}>
                       {s.v}
                     </Badge>
                  </div>
                ))}
              </div>
           </Card>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-widest uppercase truncate">Vendor Network</h1>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-[0.4em] mt-2 truncate">Operational Service Providers</p>
            </div>
          </div>
          <div className="w-[20px] shrink-0" />
          <div className="h-12 w-px bg-border-subtle dark:bg-white/10 shrink-0" />
          <div className="w-[20px] shrink-0" />
          <div className="flex flex-nowrap items-center gap-4 flex-1 min-w-0">
             {[
               { label: 'Total Vendors', val: 84, icon: Building2 },
               { label: 'Avg Performance', val: '92%', icon: Star },
               { label: 'Contract Renewals', val: 12, icon: Calendar },
               { label: 'Critical Node Alerts', val: 2, icon: Activity },
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
          onClick={() => setIsAddVendorModalOpen(true)}
        >
          <Plus className="w-5 h-5 flex-shrink-0" /> ADD VENDOR
        </Button>
      </div>

      <Card className="overflow-hidden bg-card-bg border-none rounded-2xl shadow-soft flex flex-col h-[900px] shrink-0 m-0">
        <div className="w-full flex-1 overflow-auto min-h-0 relative">
          <table className="w-full border-collapse table-fixed min-w-[1200px]">
            <thead className="bg-bg-app sticky top-0 z-10 shadow-[0_1px_0_0_theme(colors.border.subtle)]">
              <tr className="bg-bg-app">
                <th className="h-[46px] py-0 px-6 font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 text-[10px] w-1/5 text-left align-middle">Company Name</th>
                <th className="h-[46px] py-0 px-6 font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 text-[10px] w-1/5 text-left align-middle">Contact Person</th>
                <th className="h-[46px] py-0 px-6 font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 text-[10px] w-1/5 text-left align-middle">Service Type</th>
                <th className="h-[46px] py-0 px-6 font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 text-[10px] w-1/5 text-left align-middle">Status</th>
                <th className="h-[46px] py-0 px-10 font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 text-[10px] w-1/5 text-center align-middle">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-[13px]">
              {currentVendors.map((v) => (
                <tr key={v.id} className="hover:bg-bg-app transition-all duration-300 group">
                  <td className="h-[54px] py-0 px-6 font-black text-text-primary uppercase tracking-tight text-sm truncate text-left">{v.name}</td>
                  <td className="h-[54px] py-0 px-6 font-black text-text-primary uppercase tracking-widest text-[11px] tabular-nums text-left">{v.contact}</td>
                  <td className="h-[54px] py-0 px-6 text-text-muted font-bold uppercase tracking-widest text-[10px] truncate text-left">{v.category}</td>
                  <td className="h-[54px] py-0 px-6 text-left">
                    <Badge className={cn(
                      "text-[8.5px] font-black uppercase tracking-[0.2em] px-3 py-1 border-none shadow-none",
                      v.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    )}>
                      {v.status}
                    </Badge>
                  </td>
                  <td className="h-[54px] py-0 px-10 text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
                       <button 
                         onClick={() => setSelectedVendor(v)}
                         className="p-2 text-text-muted hover:text-accent transition-all transform active:scale-90"
                       >
                         <Eye className="w-3.5 h-3.5" />
                       </button>
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
          totalRecords={ALL_VENDORS.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Card>

      <AnimatePresence>
        {isAddVendorModalOpen && (
          <VendorModal 
            isOpen={true} 
            onClose={() => setIsAddVendorModalOpen(false)}
            onSave={(data) => {
              console.log('Adding vendor:', data);
              setIsAddVendorModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function VendorModal({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) {
  const [formData, setFormData] = React.useState({
    companyName: '',
    serviceType: '',
    contactPerson: '',
    contactNumber: '',
    email: '',
    contractStart: '',
    contractEnd: '',
    status: '',
    performanceRating: ''
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
              Operational Entity Intake
            </h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">
              Vendor Network Expansion Terminal
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
          <Section title="Company Information">
            <Field label="Company Name" value={formData.companyName} />
            <Field label="Service Type" value={formData.serviceType} options={['Cost Containment', 'Payment Integrity', 'Network Access', 'Clearinghouse', 'Pharmacy Benefits']} />
            <Field label="Contact Person" value={formData.contactPerson} />
            <Field label="Contact Number" value={formData.contactNumber} placeholder="+1 (555) 000-0000" />
            <Field label="Email" value={formData.email} type="email" placeholder="vendor@corporate.com" />
          </Section>

          <Section title="Contract Details">
            <Field label="Contract Start Date" value={formData.contractStart} type="date" />
            <Field label="Contract End Date" value={formData.contractEnd} type="date" />
            <Field label="Status" value={formData.status} options={['Active', 'On Hold', 'Terminated', 'Under Review']} />
            <Field label="Performance Rating" value={formData.performanceRating} placeholder="0-100%" />
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
            Add Vendor
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
