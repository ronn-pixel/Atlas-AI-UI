import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { generateCases } from '@/utils/dummyData';
import { 
  Search, Filter, Plus, ChevronRight, Inbox, Layers, 
  Send, Activity, Clock, Shield, User, CreditCard,
  Zap, ArrowRight, MessageSquare, Paperclip, MoreVertical, Mail,
  CheckCircle, AlertTriangle, AlertCircle, ChevronDown, Download, ChevronLeft,
  ExternalLink,
  History,
  TrendingUp,
  BarChart3,
  X,
  Edit2
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';

// Status color mapping
const STATUS_COLORS = {
  'New': 'bg-[#2563EB] text-white',
  'In Review': 'bg-[#F59E0B] text-white',
  'Escalated to Vendor': 'bg-[#9333EA] text-white',
  'Pending': 'bg-[#F97316] text-white',
  'Resolved': 'bg-[#16A34A] text-white',
  'Closed': 'bg-[#64748B] text-white',
};

const PRIORITY_COLORS = {
  'Critical': 'text-danger bg-danger/10 border-none',
  'High': 'text-orange-600 bg-orange-50 dark:bg-orange-950/20 border-none',
  'Medium': 'text-trust bg-trust/5 dark:bg-trust/10 border-none',
  'Low': 'text-text-muted bg-slate-50 dark:bg-slate-900 border-none',
};

const ALL_CASES = generateCases(150);

export default function Cases() {
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [cases, setCases] = React.useState(ALL_CASES);
  const [selectedCaseId, setSelectedCaseId] = React.useState<string>(ALL_CASES[0].id);
  
  // Derived state for selected case
  const selectedCase = React.useMemo(() => 
    cases.find(c => c.id === selectedCaseId) || cases[0],
    [cases, selectedCaseId]
  );

  const [selectedActivityId, setSelectedActivityId] = React.useState<string | null>(null);
  const [selectedFileId, setSelectedFileId] = React.useState<string | null>(null);
  
  const [caseTypeFilter, setCaseTypeFilter] = React.useState('All');
  const [caseStatusFilter, setCaseStatusFilter] = React.useState('All');
  const [casePage, setCasePage] = React.useState(1);
  const [casesPerPage, setCasesPerPage] = React.useState(10);
  
  const [isComposingEmail, setIsComposingEmail] = React.useState(false);
  const [emailSubject, setEmailSubject] = React.useState('');
  const [emailBody, setEmailBody] = React.useState('');
  const [timelinePage, setTimelinePage] = React.useState(1);
  const [timelineItemsPerPage, setTimelineItemsPerPage] = React.useState(10);

  // Responsive state
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isViewFullModalOpen, setIsViewFullModalOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  // Sync logic: Reset selections when switching cases
  React.useEffect(() => {
    setSelectedActivityId(null);
    setSelectedFileId(null);
    setIsComposingEmail(false);
    setTimelinePage(1);
  }, [selectedCaseId]);

  const filteredCases = cases.filter(c => 
    (caseTypeFilter === 'All' || c.issueType === caseTypeFilter) &&
    (caseStatusFilter === 'All' || c.status === caseStatusFilter)
  );
  
  const totalCasePages = Math.ceil(filteredCases.length / casesPerPage);
  const paginatedCases = filteredCases.slice((casePage - 1) * casesPerPage, casePage * casesPerPage);

  const filteredActivities = selectedCase.activities.filter(act => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Emails') return act.type === 'email';
    if (activeFilter === 'Calls') return act.type === 'call';
    if (activeFilter === 'Notes') return act.type === 'note';
    if (activeFilter === 'Status') return act.type === 'status';
    return true;
  });

  const totalPages = Math.ceil(filteredActivities.length / timelineItemsPerPage);
  const paginatedActivities = filteredActivities.slice((timelinePage - 1) * timelineItemsPerPage, timelinePage * timelineItemsPerPage);

  const selectedActivity = selectedCase.activities.find(a => a.id === selectedActivityId) || null;
  const selectedFile = selectedCase.files.find(f => f.id === selectedFileId) || null;

  const archiveFile = (id: string) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const archivePath = `${currentYear}_${selectedCase.id} / ${currentMonth}`;
    
    setCases(prev => prev.map(c => 
      c.id === selectedCaseId 
        ? { ...c, files: c.files.map(f => f.id === id ? { ...f, status: 'Archived', archivePath } : f) }
        : c
    ));
  };

  const deleteFile = (id: string) => {
    setCases(prev => prev.map(c => 
      c.id === selectedCaseId 
        ? { ...c, files: c.files.filter(f => f.id !== id) }
        : c
    ));
    if (selectedFileId === id) setSelectedFileId(null);
  };

  const updateCaseStatus = (id: string, newStatus: string) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };
  
  const sendEmail = () => {
    if (!emailSubject || !emailBody) return;
    const newEmail = {
      id: `${selectedCaseId}-ACT-${Date.now()}`,
      type: 'email' as const,
      action: emailSubject,
      user: 'Agent 101',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-ZA').replace(/\//g, '.'),
      details: emailBody
    };
    
    setCases(prev => prev.map(c => 
      c.id === selectedCaseId 
        ? { ...c, activities: [newEmail, ...c.activities] }
        : c
    ));
    
    setIsComposingEmail(false);
    setEmailSubject('');
    setEmailBody('');
  };

  const addNote = (noteText: string) => {
    const newNote = {
      id: `${selectedCaseId}-ACT-${Date.now()}`, 
      type: 'note' as const, 
      action: 'Internal Note Added', 
      user: 'Agent 101', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      date: new Date().toLocaleDateString('en-ZA').replace(/\//g, '.'), 
      details: noteText
    };
    
    setCases(prev => prev.map(c => 
      c.id === selectedCaseId 
        ? { ...c, activities: [newNote, ...c.activities] }
        : c
    ));
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Cases Logic Center</h1>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-[0.4em] mt-2">Lifecycle Management</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="h-14 bg-accent hover:opacity-90 text-white font-black uppercase text-[11px] tracking-[0.4em] px-10 shadow-xl shadow-accent/20 border-none rounded-2xl transition-all transform active:scale-95 flex items-center gap-3"
        >
          <Plus className="w-5 h-5" />
          CREATE NEW CASE
        </Button>
      </div>

      {/* TOP: Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 shrink-0 px-2 lg:px-0 h-24">
        {[
          { label: 'New Cases', value: cases.filter(c => c.status === 'New').length, icon: Inbox, color: 'bg-blue-600' },
          { label: 'In Review', value: cases.filter(c => c.status === 'In Review').length, icon: Search, color: 'bg-amber-500' },
          { label: 'Escalated to Vendor', value: cases.filter(c => c.status === 'Escalated to Vendor').length, icon: Zap, color: 'bg-purple-600' },
          { label: 'Pending', value: cases.filter(c => c.status === 'Pending').length, icon: Clock, color: 'bg-orange-600' },
          { label: 'Resolved Batch', value: cases.filter(c => c.status === 'Resolved').length, icon: CheckCircle, color: 'bg-success' },
          { label: 'System Closed', value: cases.filter(c => c.status === 'Closed').length, icon: Shield, color: 'bg-slate-600' },
        ].map(s => (
          <Card key={s.label} className="p-4 h-full bg-card-bg border-none shadow-soft rounded-2xl flex items-center gap-4 group hover:bg-accent/5 transition-all overflow-hidden">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md", s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 truncate">{s.label}</p>
              <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5 truncate">{s.value}</h4>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 items-stretch relative overflow-hidden">
        {/* MOBILE SIDEBAR TOGGLE */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="lg:hidden absolute top-4 left-4 z-50 h-10 w-10 p-0 rounded-xl bg-white dark:bg-slate-900 border-border-subtle shadow-lg"
        >
          {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
        </Button>

        {/* LEFT: Case Navigation Mini-Rail */}
      <aside className={cn(
        "bg-card-bg border border-border-subtle dark:border-white/10 shadow-soft rounded-xl p-6 flex flex-col gap-5 shrink-0 transition-all duration-300 z-40",
        "fixed inset-y-0 left-0 w-[85vw] sm:w-[380px] lg:relative lg:w-[380px] xl:w-[420px]",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0 lg:p-0 lg:opacity-0 lg:overflow-hidden"
      )}>
        
        <div className="flex items-center justify-between shrink-0">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2"><Filter className="w-3.5 h-3.5" /> Case Directory</h3>
           <div className="flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-lg">
             <span className="text-[11px] font-black text-accent">{filteredCases.length}</span>
             <span className="text-[9px] font-bold uppercase tracking-widest text-accent/80">Active Cases</span>
           </div>
        </div>

        {/* FILTER CONTROLS */}
        <div className="flex gap-3 shrink-0">
           <div className="flex-1 relative group">
             <select 
               value={caseTypeFilter}
               onChange={(e) => setCaseTypeFilter(e.target.value)}
               className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-border-subtle dark:border-white/10 rounded-xl px-3 py-2.5 text-[9px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
             >
               {['All', 'Claims Processing', 'Member Inquiry', 'Provider Dispute', 'System Anomaly', 'Vendor Escalation'].map(f => (
                 <option key={f} value={f}>{f === 'All' ? 'All Types' : f}</option>
               ))}
             </select>
             <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
           </div>

           <div className="flex-1 relative group">
             <select 
               value={caseStatusFilter}
               onChange={(e) => setCaseStatusFilter(e.target.value)}
               className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-border-subtle dark:border-white/10 rounded-xl px-3 py-2.5 text-[9px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
             >
               {['All', 'Open', 'In Progress', 'Pending Review', 'Escalated to Vendor'].map(f => (
                 <option key={f} value={f}>{f === 'All' ? 'All Statuses' : f}</option>
               ))}
             </select>
             <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
           </div>
        </div>

        {/* COMPACT TABLE HEADER */}
        <div className="flex items-center px-3 py-2 bg-slate-50/80 dark:bg-slate-900/50 rounded-xl shrink-0 w-full mb-1">
           <div className="w-24 text-[8px] font-black uppercase tracking-widest text-slate-400">Case No.</div>
           <div className="flex-1 text-[8px] font-black uppercase tracking-widest text-slate-400 truncate pr-2">Subscriber</div>
           <div className="w-[84px] text-[8px] font-black uppercase tracking-widest text-slate-400">Type</div>
           <div className="w-[72px] text-[8px] font-black uppercase tracking-widest text-slate-400 text-left">Status</div>
        </div>

        {/* LIST CONTENT */}
        <div className="flex-1 h-[600px] overflow-y-auto no-scrollbar space-y-1">
          {paginatedCases.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={cn(
                "flex items-center px-3 py-3 rounded-xl transition-all relative border group w-full text-left",
                selectedCaseId === c.id 
                  ? "bg-white dark:bg-slate-800 border-border-subtle dark:border-white/10 shadow-sm ring-1 ring-accent/5" 
                  : "bg-transparent border-transparent hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
              )}
            >
              <div className="w-24 text-[10px] font-black text-accent uppercase tracking-widest">{c.id.split('-')[2]}</div>
              <div className="flex-1 text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight truncate pr-2">{c.memberName}</div>
              <div className="w-[84px] text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest truncate">{c.issueType.split(' ')[0]}</div>
              <div className="w-[72px] flex justify-start">
                 <Badge className={cn("text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 max-w-full truncate", STATUS_COLORS[c.status as keyof typeof STATUS_COLORS])}>
                    {c.status === 'Escalated to Vendor' ? 'Vendor' : c.status}
                 </Badge>
              </div>

              {selectedCaseId === c.id && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-accent rounded-r-full"
                />
              )}
            </button>
          ))}
        </div>
        
        {/* PAGINATION */}
        <div className="pt-4 mt-auto">
          <Pagination 
            currentPage={casePage}
            totalPages={totalCasePages}
            pageSize={casesPerPage}
            totalRecords={filteredCases.length}
            onPageChange={(page) => setCasePage(page)}
            onPageSizeChange={(size) => {
              setCasesPerPage(size);
              setCasePage(1);
            }}
            minimal
          />
        </div>
      </aside>

      {/* RIGHT PANEL: Case Detail Workspace */}
      <motion.main 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 rounded-xl shadow-2xl flex flex-col overflow-hidden relative"
      >
         {/* HEADER ROWS: Case Details & Member Details combined */}
         <div className="bg-card-bg border border-border-subtle dark:border-white/10 rounded-xl shadow-soft flex flex-col xl:flex-row shrink-0 mb-3 w-full overflow-hidden min-h-[240px]">
           {/* CASE DETAILS */}
           <div className="flex-1 xl:flex-none xl:w-[72%] min-w-0 p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase">{selectedCase.id}</h2>
                </div>
                
                <div className="flex items-center gap-3 w-1/3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 shrink-0">Status:</span>
                  <select 
                    className="w-full text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent dark:bg-slate-900 outline-none cursor-pointer text-slate-900 dark:text-white hover:border-accent/40 transition-colors"
                    value={selectedCase.status}
                    onChange={(e) => updateCaseStatus(selectedCase.id, e.target.value)}
                  >
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value="New">New</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value="In Review">In Review</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value="Escalated to Vendor">Escalated to Vendor</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value="Pending">Pending</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value="Resolved">Resolved</option>
                    <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-y-4 gap-x-6 mb-5">
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block mb-1">Priority</span>
                    <span className={cn("text-[10px] font-black uppercase tracking-tight flex items-center h-[14px]", PRIORITY_COLORS[selectedCase.priority as keyof typeof PRIORITY_COLORS].split(' ')[0])}>
                      {selectedCase.priority}
                    </span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block mb-1">Type of Case</span>
                    <span className="text-[10px] font-black uppercase tracking-tight text-slate-700 dark:text-slate-300 flex items-center gap-1.5 h-[14px]"><Layers className="w-3.5 h-3.5 text-accent" />{selectedCase.issueType}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block mb-1">Assigned To</span>
                    <span className="text-[10px] font-black uppercase tracking-tight text-slate-700 dark:text-slate-300 flex items-center gap-1.5 h-[14px]"><User className="w-3.5 h-3.5 text-accent" />{selectedCase.agent}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block mb-1">Opened Date</span>
                    <span className="text-[10px] font-black uppercase tracking-tight text-slate-700 dark:text-slate-300 flex items-center h-[14px]">{selectedCase.createdDate}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block mb-1">Updated Date</span>
                    <span className="text-[10px] font-black uppercase tracking-tight text-slate-700 dark:text-slate-300 flex items-center h-[14px]">{selectedCase.lastUpdated}</span>
                 </div>
              </div>

              {/* ARROW PROGRESS BAR */}
              <div className="flex w-full pt-4 border-t border-border-subtle dark:border-white/5 drop-shadow-sm">
                {['New', 'In Review', 'Escalated to Vendor', 'Pending', 'Resolved', 'Closed'].map((step, i, arr) => {
                  const statusOrder = ['New', 'In Review', 'Escalated to Vendor', 'Pending', 'Resolved', 'Closed'];
                  const currentIdx = statusOrder.indexOf(selectedCase.status);
                  const active = i <= (currentIdx >= 0 ? currentIdx : 0);
                  const current = i === (currentIdx >= 0 ? currentIdx : 0);
                  
                  let clipPath = "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)";
                  if (i === 0) clipPath = "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)";
                  if (i === arr.length - 1) clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)";

                  return (
                    <div key={step} className="flex-1 relative group cursor-default" style={{ marginLeft: i === 0 ? '0' : '-8px', zIndex: 10 - i }}>
                      <div 
                        className={cn("h-8 flex items-center justify-center transition-all duration-500", 
                          active ? (current ? "bg-accent shadow-md text-white font-black scale-[1.02] z-20" : "bg-accent/20 dark:bg-accent/40 text-accent dark:text-white font-bold") : "bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500",
                          i !== 0 && "pl-4",
                          i !== arr.length - 1 && "pr-4"
                        )}
                        style={{ clipPath }}
                      >
                         <span className="text-[7.5px] font-black uppercase tracking-widest truncate">{step}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
           </div>

           {/* MEMBER DETAILS */}
           <div className="flex-1 xl:flex-none xl:w-[28%] min-w-0 border-t xl:border-t-0 xl:border-l border-border-subtle dark:border-white/10 p-5 flex flex-col bg-slate-50/50 dark:bg-slate-900/20">
              <div className="flex items-center gap-3 text-accent mb-4">
                 <User className="w-5 h-5" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Subscriber Identity</h3>
              </div>
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-lg font-black text-slate-900 dark:text-white uppercase shadow-sm">
                    {selectedCase.memberName[selectedCase.memberName.length - 1] === '.' ? selectedCase.memberName[0] + selectedCase.memberName[selectedCase.memberName.length - 2] : selectedCase.memberName[0]}
                 </div>
                 <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{selectedCase.memberName}</p>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-0.5">{selectedCase.memberId}</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200 dark:border-white/5 mb-4">
                 <div>
                    <p className="text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1">Contract Mode</p>
                    <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">PPO Gold Plus</p>
                 </div>
                 <div>
                    <p className="text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1">Registry</p>
                    <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                       {selectedCase.claimId}
                       <ExternalLink className="w-3 h-3 text-accent" />
                    </p>
                 </div>
              </div>
              <Button 
                onClick={() => setIsViewFullModalOpen(true)}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-black uppercase text-[10px] tracking-[0.3em] h-10 rounded-xl shadow-md transition-all active:scale-95 mt-auto"
              >
                 View Full Case
              </Button>
           </div>
         </div>

         {/* MAIN SPLIT VIEW: Layout-static structure */}
         <div className="flex-1 w-full mt-0 flex flex-col overflow-hidden relative">
             <div className="flex-1 flex flex-col overflow-hidden">
               {/* UNIFIED CONTAINER */}
               <div className="bg-card-bg rounded-xl border border-border-subtle dark:border-white/10 shadow-soft flex flex-col w-full flex-1 overflow-hidden">
             
             {/* TOP SECTION: Timeline & Viewer */}
             <div className="flex flex-1 flex-col xl:flex-row overflow-hidden border-b border-border-subtle dark:border-white/5">
                {/* LEFT: 75% TIMELINE */}
                <div className="flex-1 xl:flex-none xl:w-[72%] min-w-0 flex flex-col relative border-b xl:border-b-0 border-border-subtle dark:border-white/10 overflow-hidden">
                  {/* FILTER BAR FOR TIMELINE */}
                  <div className="flex items-center justify-between border-b border-border-subtle dark:border-white/5 px-6 py-0 h-[72px] shrink-0 bg-slate-50/50 dark:bg-slate-900">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 w-full">
                      {[
                        { label: 'All', count: selectedCase.activities.length },
                        { label: 'Emails', count: selectedCase.activities.filter(a => a.type === 'email').length },
                        { label: 'Calls', count: selectedCase.activities.filter(a => a.type === 'call').length },
                        { label: 'Notes', count: selectedCase.activities.filter(a => a.type === 'note').length },
                        { label: 'Status', count: selectedCase.activities.filter(a => a.type === 'status').length },
                        { label: 'Attachments', count: selectedCase.files.length }
                      ].map((f) => (
                        <button
                          key={f.label}
                          onClick={() => { setActiveFilter(f.label); setIsComposingEmail(false); }}
                          className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 shrink-0",
                            activeFilter === f.label 
                              ? "bg-accent text-white shadow-xl shadow-accent/30" 
                              : "bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10"
                          )}
                        >
                          {f.label}
                          <span className={cn(
                            "px-1.5 py-0.5 rounded text-[8px]",
                            activeFilter === f.label ? "bg-white/20" : "bg-slate-200 dark:bg-white/10"
                          )}>{f.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* TIMELINE OR FILESYSTEM */}
                  <div className="flex-1 min-h-[600px] h-[600px] max-h-[600px] overflow-y-auto no-scrollbar bg-slate-50/10 dark:bg-slate-900/10">
                    {activeFilter === 'Attachments' ? (
                      <div className="p-4 sm:p-8 bg-card-bg">
                        <div className="max-w-3xl mx-auto py-4">
                          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Active Directory</h3>
                          {selectedCase.files.filter(f => f.status === 'Active').length === 0 ? (
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No active files.</p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {selectedCase.files.filter(f => f.status === 'Active').map((f) => (
                                <div key={f.id} onClick={() => { setSelectedFileId(f.id); setSelectedActivityId(null); setIsComposingEmail(false); }} className={cn("p-4 border rounded-2xl cursor-pointer transition-all", selectedFileId === f.id ? "bg-slate-50 dark:bg-slate-800 border-accent/40 shadow-sm" : "border-border-subtle dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.02]")}>
                                  <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                                      <FileText className="w-5 h-5" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase text-accent bg-accent/10 px-2 py-0.5 rounded">{f.type}</span>
                                  </div>
                                  <h4 className="text-xs font-black text-slate-900 dark:text-white truncate mb-1">{f.name}</h4>
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{f.size}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="mt-12 pt-8 border-t border-border-subtle dark:border-white/5">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                              <History className="w-3.5 h-3.5"/> Archive Registry
                            </h3>
                            {selectedCase.files.filter(f => f.status === 'Archived').length === 0 ? (
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No archived records.</p>
                            ) : (
                              <div className="space-y-4">
                                {selectedCase.files.filter(f => f.status === 'Archived').map((f) => (
                                  <div key={f.id} className="p-4 border border-border-subtle dark:border-white/5 rounded-2xl flex items-center justify-between opacity-70">
                                    <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center"><Layers className="w-4 h-4"/></div>
                                      <div>
                                        <h4 className="text-xs font-black text-slate-600 dark:text-slate-300 truncate mb-1">{f.name}</h4>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{f.archivePath}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 sm:p-6">
                        <div className="max-w-3xl mx-auto space-y-6 py-2 border-l-2 border-slate-100 dark:border-white/5 ml-2 sm:ml-4 pl-6 sm:pl-8 relative">
                          <div className="space-y-4">
                            {paginatedActivities.map((act, i) => (
                              <div 
                                key={act.id}
                                className="relative group cursor-pointer"
                                onClick={() => {
                                  setSelectedActivityId(act.id);
                                  setIsComposingEmail(false);
                                  setSelectedFileId(null);
                                }}
                              >
                                <div className={cn(
                                  "absolute -left-[46px] top-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-md z-20 group-hover:scale-110 transition-transform duration-300",
                                  act.type === 'email' ? 'bg-indigo-500 text-white' : 
                                  act.type === 'call' ? 'bg-orange-500 text-white' : 
                                  act.type === 'note' ? 'bg-blue-500 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                )}>
                                  {act.type === 'email' && <Send className="w-3.5 h-3.5" />}
                                  {act.type === 'call' && <Activity className="w-3.5 h-3.5" />}
                                  {act.type === 'note' && <MessageSquare className="w-3.5 h-3.5" />}
                                  {act.type === 'status' && <Shield className="w-3.5 h-3.5" />}
                                </div>

                                <div className="flex justify-between items-start mb-1 group-hover:bg-slate-50/50 dark:group-hover:bg-slate-800/50 p-2 -my-2 -mx-2 rounded-xl transition-colors">
                                  <div className="space-y-0.5 pointer-events-none">
                                    <h4 className="text-xs font-black text-text-primary dark:text-white uppercase tracking-tight">{act.action}</h4>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[8px] font-black text-accent uppercase tracking-widest">{act.user}</span>
                                      <span className="text-[8px] font-bold text-text-muted uppercase opacity-40">&bull; {act.date}</span>
                                    </div>
                                  </div>
                                  <span className="text-[9px] font-black text-text-muted dark:text-slate-500 tabular-nums uppercase tracking-widest pointer-events-none">{act.time}</span>
                                </div>

                                <div className={cn("p-4 bg-slate-50/50 dark:bg-slate-900/20 border-none rounded-xl mt-2 transition-colors", selectedActivityId === act.id && "bg-white dark:bg-slate-800 shadow-sm border border-border-subtle dark:border-white/10")}>
                                  {act.type === 'email' ? (
                                    <p className="text-[11px] leading-relaxed font-medium text-text-muted dark:text-slate-400 line-clamp-2">
                                      {act.details}
                                    </p>
                                  ) : (
                                    <p className="text-[11px] leading-relaxed font-medium text-text-muted dark:text-slate-400">
                                      {act.details}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT: 25% VIEWER PANEL */}
                <div className="flex-1 xl:flex-none xl:w-[28%] min-w-0 border-l-0 xl:border-l border-border-subtle dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/20 flex flex-col relative z-10 overflow-hidden">
                  <div className="px-6 py-0 border-b border-border-subtle dark:border-white/5 shrink-0 flex justify-center items-center relative h-[72px] bg-white/50 dark:bg-slate-900/50">
                    {(selectedActivityId || isComposingEmail || selectedFileId) && (
                      <button onClick={() => { setSelectedActivityId(null); setIsComposingEmail(false); setSelectedFileId(null); }} className="absolute left-6 flex items-center gap-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline-block">Back</span>
                      </button>
                    )}
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Detail Viewer</h3>
                  </div>
            <div 
              className="flex-1 p-6 min-h-[600px] h-[600px] max-h-[600px] overflow-y-auto no-scrollbar bg-white/30 dark:bg-slate-950/30"
            >
              {isComposingEmail ? (
                      <div className="flex flex-col h-full">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 text-center">
                          {emailSubject.startsWith('Re:') ? 'Email Reply' : 'New Transmission'}
                        </h4>
                        <div className="space-y-4 flex-1 flex flex-col">
                          <div>
                            <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Subject</label>
                            <input type="text" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-[10px] font-black tracking-widest uppercase outline-none focus:ring-2 focus:ring-accent/20 text-slate-900 dark:text-white" />
                          </div>
                          <div className="flex-1 flex flex-col min-h-[200px]">
                            <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Message Body</label>
                            <textarea value={emailBody} onChange={e => setEmailBody(e.target.value)} className="w-full flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-3 text-xs font-medium resize-none outline-none focus:ring-2 focus:ring-accent/20 text-slate-900 dark:text-white leading-relaxed" placeholder="Type message..." />
                          </div>
                        </div>
                        <div className="pt-4 mt-auto border-t border-border-subtle dark:border-white/5 flex justify-end gap-2 shrink-0">
                          <Button onClick={() => setIsComposingEmail(false)} variant="outline" size="sm" className="text-[9px] font-black uppercase tracking-widest h-8">Discard</Button>
                          <Button onClick={sendEmail} size="sm" className="text-[9px] font-black uppercase tracking-widest h-8 bg-accent hover:bg-accent/90 text-white border-0">Send Email</Button>
                        </div>
                      </div>
                    ) : selectedActivity ? (
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                          <Badge className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-0">
                            {selectedActivity.type}
                          </Badge>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{selectedActivity.date} • {selectedActivity.time}</span>
                        </div>

                        {selectedActivity.type === 'email' ? (
                          <div className="flex flex-col gap-4">
                            <div className="pb-4 border-b border-border-subtle dark:border-white/5 space-y-3">
                              <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Sender:</p>
                                <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{selectedActivity.user}</p>
                              </div>
                              <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Subject:</p>
                                <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{selectedActivity.action}</p>
                              </div>
                            </div>
                            <div className="text-xs font-medium leading-[1.7] text-slate-700 dark:text-slate-300 whitespace-pre-wrap selection:bg-accent/20">
                              {selectedActivity.details}
                            </div>
                            <div className="flex gap-2 mt-6 pt-4 border-t border-border-subtle dark:border-white/5">
                              <Button variant="outline" className="flex-1 text-[9px] font-black uppercase tracking-widest h-8" onClick={() => { setIsComposingEmail(true); setEmailSubject(`Re: ${selectedActivity.action}`); }}>Reply</Button>
                              <Button variant="outline" className="flex-1 text-[9px] font-black uppercase tracking-widest h-8 bg-transparent">Reply All</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-4">
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{selectedActivity.action}</h4>
                            <div className="text-xs font-medium leading-[1.7] text-slate-700 dark:text-slate-300 whitespace-pre-wrap selection:bg-accent/20">
                              {selectedActivity.details}
                            </div>
                            <div className="pt-4 border-t border-border-subtle dark:border-white/5">
                              <p className="text-[9px] font-black tracking-widest uppercase text-slate-400">By: {selectedActivity.user}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : selectedFile && activeFilter === 'Attachments' ? (
                      <div className="flex flex-col gap-6 h-full">
                        <div className="w-full aspect-video bg-slate-100 dark:bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-border-subtle dark:border-white/5 relative overflow-hidden text-slate-300 dark:text-slate-600 gap-4 shrink-0">
                          <FileText className="w-12 h-12" />
                          <span className="text-[8px] font-black uppercase tracking-[0.3em]">No Preview Available</span>
                        </div>
                        <div className="space-y-2 text-center shrink-0">
                          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight break-all">{selectedFile.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedFile.type} • {selectedFile.size}</p>
                        </div>
                        <div className="pt-6 mt-auto border-t border-border-subtle dark:border-white/5 flex flex-col gap-3 shrink-0">
                          <Button onClick={() => archiveFile(selectedFile.id)} variant="outline" className="text-[9px] font-black uppercase tracking-widest h-10 w-full text-slate-600 dark:text-slate-300 transition-all rounded-xl border-border-subtle dark:border-white/10">Archive File</Button>
                          <Button onClick={() => deleteFile(selectedFile.id)} variant="outline" className="text-[9px] font-black uppercase tracking-widest h-10 w-full text-danger hover:text-white hover:bg-danger/80 transition-all rounded-xl border-danger/20">Delete File</Button>
                        </div>
                      </div>
                    ) : activeFilter === 'Emails' ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <Mail className="w-8 h-8 mb-4 text-slate-400 opacity-40 max-w-full" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 max-w-[170px]">Select an email to view or compose a new one</p>
                        <Button onClick={() => setIsComposingEmail(true)} size="sm" className="h-10 px-6 text-[10px] font-black uppercase tracking-widest bg-accent hover:bg-accent/90 text-white rounded-xl shadow-lg border-0 transition-transform active:scale-95">
                          Compose Email
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                        <Filter className="w-8 h-8 mb-4 max-w-full" />
                        <p className="text-[10px] font-black uppercase tracking-widest max-w-[140px]">Select timeline event to inspect</p>
                      </div>
                    )}
                  </div>
            </div>

             {/* UNIFIED FOOTER: Spans Timeline and Viewer */}
             <div className="bg-slate-50/50 dark:bg-black/20 border-t border-border-subtle dark:border-white/5 p-4 flex flex-col xl:flex-row items-center shrink-0 relative z-20 min-h-[84px]">
               
               {/* Left (Timeline Part): Input area */}
               <div className="flex-1 xl:flex-none xl:w-[72%] min-w-0 flex gap-3 items-center xl:pr-6 mb-4 xl:mb-0">
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="RECORD NOTES HERE"
                      className="w-full bg-white dark:bg-slate-950 border border-border-subtle dark:border-white/10 rounded-2xl pl-5 pr-14 h-11 text-[10px] font-black tracking-widest uppercase outline-none focus:ring-4 focus:ring-accent/10 transition-all text-slate-800 dark:text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          addNote(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-accent/5 text-accent rounded-xl hover:bg-accent hover:text-white transition-all transform active:scale-95">
                       <Paperclip className="w-4 h-4" />
                    </button>
                  </div>
                  <Button className="h-11 w-11 p-0 shrink-0 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all">
                      <Send className="w-5 h-5" />
                  </Button>
               </div>

               {/* Right (Viewer Part): Pagination & Page Size */}
               <div className="flex-1 xl:flex-none xl:w-[28%] min-w-0 flex items-center justify-center xl:justify-end border-t xl:border-t-0 pt-4 xl:pt-0 border-border-subtle dark:border-white/5">
                 <Pagination 
                   currentPage={timelinePage}
                   totalPages={totalPages}
                   pageSize={timelineItemsPerPage}
                   totalRecords={filteredActivities.length}
                   onPageChange={(page) => setTimelinePage(page)}
                   onPageSizeChange={(size) => {
                     setTimelineItemsPerPage(size);
                     setTimelinePage(1);
                   }}
                   minimal
                 />
               </div>
             </div>
             </div>
           </div>
         </div>
     </div>
   </motion.main>
 </div>

      <AnimatePresence>
        {(isCreateModalOpen || isViewFullModalOpen) && (
          <CaseModal 
            isOpen={true} 
            onClose={() => {
              setIsCreateModalOpen(false);
              setIsViewFullModalOpen(false);
              setIsEditing(false);
            }}
            caseData={isViewFullModalOpen ? selectedCase : null}
            isEditing={isEditing}
            onToggleEdit={() => setIsEditing(!isEditing)}
            onSave={(data) => {
              console.log('Saving case data:', data);
              setIsCreateModalOpen(false);
              setIsViewFullModalOpen(false);
              setIsEditing(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Structured Case Modal Component
interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData?: any;
  isEditing?: boolean;
  onToggleEdit?: () => void;
  onSave: (data: any) => void;
}

function CaseModal({ isOpen, onClose, caseData, isEditing = false, onToggleEdit, onSave }: CaseModalProps) {
  const isCreate = !caseData;
  const [formData, setFormData] = React.useState(caseData || {
    status: '',
    priority: '',
    issueType: '',
    subject: '',
    assignedTo: '',
    memberId: '',
    memberName: '',
    claimId: '',
    ticketOrigin: '',
    inquiryType: '',
    sendToEmail: '',
    dateTimeOpened: '',
    followUpDate: '',
    wasResolved: '',
    firstCallResolution: '',
    resolution: '',
    resolutionDetails: '',
    callerType: '',
    callerName: '',
    callerContact: '',
    facility: '',
    memberFirstName: '',
    memberLastName: '',
    accountName: '',
    groupNumber: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    claimStatus: '',
    claimReviewNeeded: '',
    dateOfService: '',
    amountBilled: '',
    description: '',
    createdBy: '',
    lastModifiedBy: '',
    dateTimeClosed: '',
    closureTime: '',
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

  const Field = ({ label, value, type = 'text', readOnly = !isCreate && !isEditing, options, placeholder }: { label: string; value: string; type?: string; readOnly?: boolean; options?: string[]; placeholder?: string }) => (
    <div className="space-y-1.5">
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</label>
      {readOnly ? (
        <div className="h-10 flex items-center px-4 bg-slate-50 dark:bg-slate-900 border border-transparent rounded-xl text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
          {value || '---'}
        </div>
      ) : options ? (
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
              {isCreate ? 'Initialize New Case' : `Case Terminal: ${caseData.id}`}
            </h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">
              {isCreate ? 'Enterprise Intake System' : 'Verified Data Record'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {!isCreate && onToggleEdit && (
              <Button 
                variant="outline" 
                onClick={onToggleEdit}
                className={cn(
                  "h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  isEditing ? "bg-accent text-white border-none" : "bg-white dark:bg-slate-900"
                )}
              >
                {isEditing ? <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Editing Mode</div> : <div className="flex items-center gap-2"><Edit2 className="w-4 h-4"/> Edit Record</div>}
              </Button>
            )}
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-12">
          <Section title="Ticket Information">
            <Field label="Ticket Owner" value={isCreate ? "" : (caseData?.ticketOwner || "Agent 101")} />
            <Field label="Ticket Number" value={isCreate ? "" : (caseData?.id || "---")} />
            <Field label="Ticket Origin" value={isCreate ? "" : (caseData?.ticketOrigin || "Manual Entry")} options={['Manual Entry', 'Direct Mail', 'Email Interface', 'Tele-Link']} />
            <Field label="Subject" value={isCreate ? "" : (caseData?.description?.slice(0, 30) || "")} />
            <Field label="Inquiry Type" value={isCreate ? "" : (caseData?.issueType || "")} options={['Claims Processing', 'Member Inquiry', 'Provider Dispute', 'System Anomaly', 'Vendor Escalation']} />
            <Field label="Assigned To" value={isCreate ? "" : (caseData?.agent || "Ronn A.")} />
            <Field label="Send To Email" value={isCreate ? "" : (caseData?.sendToEmail || "support@insurance-saas.com")} />
            <Field label="Date/Time Opened" value={isCreate ? "" : (caseData?.createdDate || "2026-04-29 10:00 AM")} />
            <Field label="Status" value={isCreate ? "" : (caseData?.status || "New")} options={['New', 'In Review', 'Escalated to Vendor', 'Pending', 'Resolved', 'Closed']} />
            <Field label="Priority" value={isCreate ? "" : (caseData?.priority || "Medium")} options={['Critical', 'High', 'Medium', 'Low']} />
            <Field label="Follow-Up Date" value={isCreate ? "" : (caseData?.followUpDate || "2026.05.02")} />
          </Section>

          <Section title="Resolution Details">
            <Field label="Was this case resolved?" value={isCreate ? "" : (caseData?.status === 'Resolved' ? 'YES' : 'NO')} options={['YES', 'NO']} />
            <Field label="First Call Resolution" value={isCreate ? "" : (caseData?.firstCallResolution || "NO")} options={['YES', 'NO']} />
            <Field label="Resolution" value={isCreate ? "" : (caseData?.resolution || "Pending Final Review")} options={['Pending Final Review', 'Adjustment Applied', 'Member Educated', 'Provider Notified']} />
            <Field label="Resolution Details" value={isCreate ? "" : (caseData?.resolutionDetails || "Awaiting vendor confirmation of credential audit.")} />
          </Section>

          <Section title="Caller Information">
            <Field label="Caller Type" value={isCreate ? "" : (caseData?.callerType || "Subscriber")} options={['Subscriber', 'Provider', 'Vendor Representative', 'Legal Council']} />
            <Field label="Caller Name" value={isCreate ? "" : (caseData?.memberName || "Anonymous")} />
            <Field label="Caller Contact #" value={isCreate ? "" : (caseData?.callerContact || "+1 (555) 902-1823")} />
            <Field label="Facility" value={isCreate ? "" : (caseData?.facility || "Main Street Medical")} />
          </Section>

          <Section title="Member Information">
            <Field label="Member Name" value={isCreate ? "" : (caseData?.memberName || "")} />
            <Field label="Member First Name" value={isCreate ? "" : (caseData?.memberName?.split(' ')[0] || "")} />
            <Field label="Member Last Name" value={isCreate ? "" : (caseData?.memberName?.split(' ')[1] || "")} />
            <Field label="Account Name" value={isCreate ? "" : (caseData?.accountName || "Corporate Plan Alpha")} />
            <Field label="Group #" value={isCreate ? "" : (caseData?.groupNumber || "GRP-X992-B")} />
            <Field label="Member ID" value={isCreate ? "" : (caseData?.memberId || "")} />
            <Field label="Date of Birth" value={isCreate ? "" : (caseData?.dateOfBirth || "1985.12.04")} />
            <Field label="Phone #" value={isCreate ? "" : (caseData?.phone || "+1 (555) 902-1823")} />
            <Field label="Address" value={isCreate ? "" : (caseData?.address || "123 Enterprise Way, Suite 400")} />
          </Section>

          <Section title="Claim Information">
            <Field label="Claim #" value={isCreate ? "" : (caseData?.claimId || "")} />
            <Field label="Claim Status" value={isCreate ? "" : (caseData?.claimStatus || "Active")} options={['Active', 'Denied', 'Paid', 'Archived']} />
            <Field label="Claim Review Needed" value={isCreate ? "" : (caseData?.claimReviewNeeded || "YES")} options={['YES', 'NO']} />
            <Field label="Date of Service" value={isCreate ? "" : (caseData?.dateOfService || "2026.04.15")} />
            <Field label="Amount Billed" value={isCreate ? "" : (caseData?.amountBilled || "$1,240.00")} />
            <Field label="Description of Ticket" value={isCreate ? "" : (caseData?.description || "")} />
          </Section>

          <Section title="System Metadata">
            <Field label="Created By" value={isCreate ? "" : (caseData?.createdBy || "Agent 101")} />
            <Field label="Last Modified By" value={isCreate ? "" : (caseData?.lastModifiedBy || "SYSTEM_DAEMON")} />
            <Field label="Date/Time Closed" value={isCreate ? "" : (caseData?.dateTimeClosed || "---")} />
            <Field label="Case Closure Time (Days)" value={isCreate ? "" : (caseData?.closureTime || "---")} />
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
          {(isCreate || isEditing) && (
            <Button 
              onClick={() => onSave(formData)}
              className="h-12 px-10 bg-accent hover:opacity-90 text-white border-none rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-accent/20"
            >
              {isCreate ? 'Save Case' : 'Save Changes'}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function FileText(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M13 13H8"/><path d="M13 17H8"/>
    </svg>
  );
}

function Settings(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38 a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V2h0Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
