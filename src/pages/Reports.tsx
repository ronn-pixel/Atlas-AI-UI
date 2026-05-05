import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Search, 
  FileText, 
  Eye, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Download,
  Calendar,
  User,
  Clock,
  PieChart,
  BarChart,
  Activity,
  FileDown,
  X,
  Loader2,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';
import { Pagination } from '@/components/ui/Pagination';

const BASE_REPORTS = [
  { id: 'RPT-0019', name: 'Monthly Financial Reconciliation', user: 'Admin System', date: '2024.03.01', format: 'PDF', status: 'Ready', type: 'Financial' },
  { id: 'RPT-0020', name: 'Network Performance Audit', user: 'Sarah K.', date: '2024.03.05', format: 'XLSX', status: 'Generating', type: 'Operational' },
  { id: 'RPT-0021', name: 'Member Retention Projection', user: 'Michael B.', date: '2024.03.10', format: 'PDF', status: 'Ready', type: 'Analytical' },
  { id: 'RPT-0022', name: 'HIPAA Compliance Variance', user: 'Security Bot', date: '2024.03.12', format: 'JSON', status: 'Ready', type: 'Security' },
  { id: 'RPT-0023', name: 'Vendor SLA Response Delta', user: 'Logic Hub', date: '2024.03.15', format: 'CSV', status: 'Ready', type: 'Operational' },
  { id: 'RPT-0024', name: 'Claim Adjudication Velocity', user: 'System Task', date: '2024.03.18', format: 'PDF', status: 'Ready', type: 'Financial' },
];

const DUMMY_REPORTS = [
  ...BASE_REPORTS,
  ...Array.from({ length: 45 }).map((_, i) => ({
    id: `RPT-00${25 + i}`,
    name: i % 3 === 0 ? 'Quarterly Actuarial Summary' : i % 3 === 1 ? 'Provider Credentialing Check' : 'Utilization Management KPIs',
    user: i % 2 === 0 ? 'Automation Service' : 'James R.',
    date: `2024.03.${(i % 28 + 1).toString().padStart(2, '0')}`,
    format: i % 4 === 0 ? 'XLSX' : i % 4 === 1 ? 'CSV' : i % 4 === 2 ? 'JSON' : 'PDF',
    status: i % 5 === 0 ? 'Generating' : 'Ready',
    type: i % 3 === 0 ? 'Analytical' : i % 3 === 1 ? 'Security' : 'Operational'
  }))
];

export default function Reports() {
  const [isExecuteReportModalOpen, setIsExecuteReportModalOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const totalPages = Math.ceil(DUMMY_REPORTS.length / pageSize);
  const currentRecords = DUMMY_REPORTS.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Analytical Manifest</h1>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-[0.4em] mt-2">Enterprise Intelligence & Data Extraction</p>
        </div>
        <Button 
          onClick={() => setIsExecuteReportModalOpen(true)}
          size="sm" 
          className="h-14 bg-accent hover:opacity-90 text-white font-black uppercase text-[11px] tracking-[0.4em] px-12 shadow-xl shadow-accent/20 border-none rounded-2xl transition-all transform active:scale-95 flex items-center gap-3"
        >
          <FileDown className="w-5 h-5" /> Execute Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 shrink-0">
         {[
           { label: 'Financial Extracts', count: 124, icon: PieChart, color: 'bg-blue-600' },
           { label: 'Operational Audits', count: 86, icon: Activity, color: 'bg-purple-600' },
           { label: 'System Logs', count: 2140, icon: BarChart, color: 'bg-indigo-600' },
         ].map(c => (
           <Card key={c.label} className="p-5 h-24 bg-card-bg border-none shadow-soft rounded-2xl group cursor-pointer hover:translate-y-[-4px] transition-all flex items-center gap-6">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg", c.color)}>
                 <c.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 truncate">{c.label}</p>
                <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter mt-0.5 truncate">{c.count} Manifests</h4>
              </div>
           </Card>
         ))}
      </div>

      <Card className="overflow-hidden bg-card-bg border-none rounded-xl shadow-soft flex flex-col flex-1 min-h-0">
        <div className="flex-1 overflow-auto no-scrollbar">
          <table className="w-full border-collapse table-fixed min-w-[1000px]">
            <thead>
              <tr className="bg-bg-app">
                <th className="px-6 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/4 text-left align-middle">Report Identity</th>
                <th className="px-6 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/6 text-left align-middle">Originator</th>
                <th className="px-6 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/6 text-left align-middle">Date</th>
                <th className="px-6 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/6 text-left align-middle">Format</th>
                <th className="px-6 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/8 text-left align-middle">Status</th>
                <th className="px-10 py-3 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] w-1/8 text-center align-middle">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {currentRecords.map((r) => (
                <tr key={r.id} className="hover:bg-bg-app transition-all duration-300 group">
                  <td className="px-6 py-4">
                     <div className="flex items-center justify-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-bg-app flex items-center justify-center shrink-0 border border-border-subtle">
                           <FileText className="w-4 h-4 text-text-muted" />
                        </div>
                        <div className="text-left min-w-0">
                           <p className="font-black text-text-primary uppercase tracking-tight text-sm truncate max-w-[200px]">{r.name}</p>
                           <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-0.5 opacity-60">Type: {r.type}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4 font-black text-text-muted uppercase tracking-widest text-[11px] truncate text-left">{r.user}</td>
                  <td className="px-6 py-4 text-text-muted font-bold tracking-widest text-[11px] tabular-nums text-left">{r.date}</td>
                  <td className="px-6 py-4 text-left">
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest bg-bg-app border-none px-3 text-text-muted">
                      {r.format}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1">
                       <Badge className={cn(
                        "text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 border-none shadow-none",
                        r.status === 'Ready' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      )}>
                        {r.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-10 py-4 text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
                       <button className="p-2 text-text-muted hover:text-accent transition-all transform active:scale-90" disabled={r.status !== 'Ready'}><Download className="w-4.5 h-4.5" /></button>
                       <button className="p-2 text-text-muted hover:text-danger transition-all transform active:scale-90"><Trash2 className="w-4.5 h-4.5" /></button>
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
          totalRecords={DUMMY_REPORTS.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          className="!mb-[5px]"
        />
      </Card>

      <AnimatePresence>
        {isExecuteReportModalOpen && (
          <ExecuteReportModal 
            isOpen={true} 
            onClose={() => setIsExecuteReportModalOpen(false)}
            onSave={(data) => {
              console.log('Generating report:', data);
              setIsExecuteReportModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ExecuteReportModal({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [formData, setFormData] = React.useState({
    reportType: '',
    reportCategory: '',
    reportName: '',
    dateFrom: '',
    dateTo: '',
    statusFilter: 'All',
    memberFilter: '',
    vendorFilter: 'All Vendors',
    planFilter: 'All Plans',
    format: 'PDF',
    includeCharts: 'Yes',
    includeBreakdown: 'Yes',
    deliveryMethod: 'Download Immediately',
    emailAddress: ''
  });

  const [status, setStatus] = React.useState<'idle' | 'running' | 'success'>('idle');

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.reportType) newErrors.reportType = 'Required';
      if (!formData.reportCategory) newErrors.reportCategory = 'Required';
      if (!formData.reportName) newErrors.reportName = 'Required';
    } else if (step === 2) {
      if (!formData.dateFrom) newErrors.dateFrom = 'Required';
      if (!formData.dateTo) newErrors.dateTo = 'Required';
      if (formData.deliveryMethod === 'Send via Email' && !formData.emailAddress) {
        newErrors.emailAddress = 'Required for email delivery';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleRunReport = () => {
    setCurrentStep(4);
    setStatus('running');
    setTimeout(() => {
      setStatus('success');
      setCurrentStep(5);
    }, 2500);
  };

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

  const Field = ({ 
    label, 
    value, 
    type = 'text', 
    options, 
    placeholder, 
    onChange, 
    readOnly = false,
    error 
  }: { 
    label: string; 
    value: string; 
    type?: string; 
    options?: string[]; 
    placeholder?: string; 
    onChange?: (v: string) => void; 
    readOnly?: boolean;
    error?: string;
  }) => (
    <div className="space-y-1.5 text-left">
      <div className="flex justify-between items-center">
        <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</label>
        {error && <span className="text-[8px] font-black text-danger uppercase tracking-widest animate-pulse">{error}</span>}
      </div>
      {readOnly ? (
        <div className="h-10 flex items-center px-4 bg-slate-50 dark:bg-slate-900 border border-transparent rounded-xl text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
          {value || '---'}
        </div>
      ) : options ? (
        <select 
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "h-10 w-full px-4 bg-white dark:bg-slate-950 border rounded-xl text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-tight outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer transition-all",
            error ? "border-danger ring-danger/10" : "border-border-subtle dark:border-white/10"
          )}
        >
          <option value="" disabled>{placeholder || `Select ${label}`}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input 
          type={type} 
          value={value}
          placeholder={placeholder || `Enter ${label}`}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "h-10 w-full px-4 bg-white dark:bg-slate-950 border rounded-xl text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-tight outline-none focus:ring-2 focus:ring-accent/20 transition-all",
            error ? "border-danger ring-danger/10" : "border-border-subtle dark:border-white/10"
          )}
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
        onClick={status === 'running' ? undefined : onClose}
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
              Execute Intelligence Report
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                {currentStep === 4 ? "Processing Metadata" : currentStep === 5 ? "Extraction Complete" : `Navigation Step ${currentStep} of 3`}
              </p>
              {currentStep <= 3 && (
                <div className="h-1 w-24 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent transition-all duration-500" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>
          
          <button 
            disabled={status === 'running'}
            onClick={onClose}
            className={cn(
              "w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors",
              status === 'running' && "opacity-20 cursor-not-allowed"
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-12">
          {currentStep === 1 && (
            <Section title="Report Selection">
              <Field 
                label="Report Type" 
                value={formData.reportType} 
                options={['Financial reconciliation', 'Operational audit', 'Network performance', 'Compliance monitoring']} 
                onChange={v => setFormData({...formData, reportType: v})}
                error={errors.reportType}
              />
              <Field 
                label="Report Category" 
                value={formData.reportCategory} 
                options={['Adjudication', 'Membership', 'Provider Service', 'Utilization Management']} 
                onChange={v => setFormData({...formData, reportCategory: v})}
                error={errors.reportCategory}
              />
              <Field 
                label="Report Name" 
                value={formData.reportName} 
                placeholder="Custom identification tag" 
                onChange={v => setFormData({...formData, reportName: v})}
                error={errors.reportName}
              />
            </Section>
          )}

          {currentStep === 2 && (
            <div className="space-y-12">
              <Section title="Filters & Parameters">
                <Field label="Date From" value={formData.dateFrom} type="date" onChange={v => setFormData({...formData, dateFrom: v})} error={errors.dateFrom} />
                <Field label="Date To" value={formData.dateTo} type="date" onChange={v => setFormData({...formData, dateTo: v})} error={errors.dateTo} />
                <Field label="Status Filter" value={formData.statusFilter} options={['All', 'Active', 'Pending', 'Closed', 'Escalated']} onChange={v => setFormData({...formData, statusFilter: v})} />
                <Field label="Member / Client Filter" value={formData.memberFilter} placeholder="Specific ID or Group" onChange={v => setFormData({...formData, memberFilter: v})} />
                <Field label="Vendor Filter" value={formData.vendorFilter} options={['All Vendors', 'Valenz Health', 'Direct Care', 'Optum Pay']} onChange={v => setFormData({...formData, vendorFilter: v})} />
                <Field label="Plan Type Filter" value={formData.planFilter} options={['All Plans', 'PPO Gold', 'HMO Basic', 'Medicare Advantage']} onChange={v => setFormData({...formData, planFilter: v})} />
              </Section>

              <Section title="Output Settings">
                <Field label="Format" value={formData.format} options={['PDF', 'CSV', 'Excel', 'JSON']} onChange={v => setFormData({...formData, format: v})} />
                <Field label="Include Charts" value={formData.includeCharts} options={['Yes', 'No']} onChange={v => setFormData({...formData, includeCharts: v})} />
                <Field label="Include Detailed Breakdown" value={formData.includeBreakdown} options={['Yes', 'No']} onChange={v => setFormData({...formData, includeBreakdown: v})} />
              </Section>

              <Section title="Delivery Options">
                <Field label="Delivery Method" value={formData.deliveryMethod} options={['Download Immediately', 'Send via Email', 'Scheduled Task']} onChange={v => setFormData({...formData, deliveryMethod: v})} />
                {formData.deliveryMethod === 'Send via Email' && (
                  <Field label="Email Address" value={formData.emailAddress} type="email" placeholder="analytics@company.com" onChange={v => setFormData({...formData, emailAddress: v})} error={errors.emailAddress} />
                )}
              </Section>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <Section title="Review Report Manifest">
                  <Field label="Report Name" value={formData.reportName} readOnly />
                  <Field label="Type" value={formData.reportType} readOnly />
                  <Field label="Category" value={formData.reportCategory} readOnly />
               </Section>
               
               <Section title="Configured Parameters">
                  <Field label="Date Range" value={`${formData.dateFrom || 'N/A'} - ${formData.dateTo || 'N/A'}`} readOnly />
                  <Field label="Status Filter" value={formData.statusFilter || 'All'} readOnly />
                  <Field label="Member Filter" value={formData.memberFilter || 'All'} readOnly />
                  <Field label="Vendor Filter" value={formData.vendorFilter || 'All'} readOnly />
                  <Field label="Plan Filter" value={formData.planFilter || 'All'} readOnly />
               </Section>

               <Section title="Output Summary">
                  <Field label="Format" value={formData.format} readOnly />
                  <Field label="Delivery" value={formData.deliveryMethod} readOnly />
                  <Field label="Components" value={`Charts: ${formData.includeCharts} | Breakdown: ${formData.includeBreakdown}`} readOnly />
               </Section>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
               <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-3xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent shadow-2xl shadow-accent/5">
                     <Loader2 className="w-12 h-12 animate-spin" />
                  </div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-slate-900 rounded-xl shadow-lg flex items-center justify-center border border-accent/10"
                  >
                     <Activity className="w-5 h-5 text-accent animate-pulse" />
                  </motion.div>
               </div>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Running Analytical Extraction</h3>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-6 max-w-sm leading-relaxed">
                  Parsing enterprise data structures and calculating deltas. This process handles secure identity resolution and PHI compliance auditing.
               </p>
               <div className="mt-10 w-64 h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5 }}
                    className="h-full bg-accent shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                  />
               </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
               <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center text-success mb-8 shadow-2xl shadow-success/10">
                  <CheckCircle className="w-12 h-12" />
               </div>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Analysis Finalized</h3>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-3 mb-12">Your intelligence extract has been verified and is ready for acquisition</p>
               
               <div className="p-8 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-white/5 w-full max-w-md mb-12">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-md">
                      <FileCheck className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-left">
                       <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Report Reference</p>
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate max-w-[200px]">{formData.reportName}</p>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-10 py-8 border-t border-border-subtle dark:border-white/10 flex justify-end gap-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
          {currentStep <= 3 && (
            <>
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="h-12 px-8 rounded-xl text-[11px] font-black uppercase tracking-widest border-border-subtle dark:border-white/10"
                >
                  Back Step
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={onClose}
                className="h-12 px-8 rounded-xl text-[11px] font-black uppercase tracking-widest border-border-subtle dark:border-white/10"
              >
                Cancel Extraction
              </Button>
              {currentStep < 3 ? (
                <Button 
                  onClick={handleNext}
                  className="h-12 px-10 bg-accent hover:opacity-90 text-white border-none rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-accent/20"
                >
                  Proceed
                </Button>
              ) : (
                <Button 
                  onClick={handleRunReport}
                  className="h-12 px-10 bg-accent hover:opacity-90 text-white border-none rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-accent/20 flex items-center gap-3"
                >
                  <Activity className="w-4 h-4" />
                  Execute Extraction
                </Button>
              )}
            </>
          )}

          {currentStep === 4 && (
            <div className="h-12 flex items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Encryption in progress...</span>
            </div>
          )}

          {currentStep === 5 && (
            <>
              <Button 
                variant="outline"
                onClick={onClose}
                className="h-12 px-8 rounded-xl text-[11px] font-black uppercase tracking-widest border-border-subtle dark:border-white/10"
              >
                Close Terminal
              </Button>
              <Button 
                onClick={() => onSave(formData)}
                className="h-12 px-10 bg-accent hover:opacity-90 text-white border-none rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-accent/20 flex items-center gap-3"
              >
                <Download className="w-4 h-4" />
                Capture Data
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
