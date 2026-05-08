import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Truck, Activity, Zap, ShieldCheck, ChevronRight, Share2, Layers, Search, Filter } from 'lucide-react';
import { cn } from '@/utils/cn';

const ROUTES = [
  { id: 'RT-001', vendor: 'Valenz Health', logic: 'Overflow Redirect', threshold: '>$5k', status: 'Active' },
  { id: 'RT-002', vendor: 'Zelis', logic: 'Standard Batch', threshold: 'ALL', status: 'Active' },
  { id: 'RT-003', vendor: 'MultiPlan', logic: 'Network Gap', threshold: 'OON Only', status: 'Paused' },
  { id: 'RT-004', vendor: 'Change Healthcare', logic: 'Clearinghouse Primary', threshold: 'Digital Only', status: 'Active' },
];

export default function VendorRouting() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div>
        <h1 className="text-3xl font-black text-text-primary dark:text-white tracking-widest uppercase">Routing Logic</h1>
        <p className="text-text-muted dark:text-slate-500 text-[11px] font-black uppercase tracking-[0.4em] mt-2">Vendor Interchange & Neural Pathing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 p-0 overflow-hidden bg-white dark:bg-[#1F2937] border-none rounded-2xl shadow-soft flex flex-col">
            <div className="p-10 border-none flex justify-between items-center bg-slate-50/50 dark:bg-black/20">
               <h3 className="text-[12px] font-black text-text-muted dark:text-slate-500 uppercase tracking-[0.4em]">Interchange Manifest</h3>
               <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted opacity-30" />
                    <input type="text" placeholder="Filter paths..." className="bg-white dark:bg-[#111827] border-none rounded-2xl pl-12 pr-6 h-10 text-[10px] font-black tracking-widest uppercase w-48 outline-none" />
                  </div>
                  <Button variant="outline" className="h-10 w-10 p-0 border-none bg-white dark:bg-[#111827] rounded-2xl"><Filter className="w-4 h-4" /></Button>
               </div>
            </div>
            <div className="flex-1 overflow-x-auto no-scrollbar">
               <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10 shadow-[0_1px_0_0_theme(colors.border.subtle)] bg-card-bg">
<tr className="bg-slate-50/20 dark:bg-black/10">
                        <th className="h-[46px] py-0 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted dark:text-slate-600 text-left align-middle">Route ID</th>
                        <th className="h-[46px] py-0 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted dark:text-slate-600 text-left align-middle">Vendor Node</th>
                        <th className="h-[46px] py-0 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted dark:text-slate-600 text-left align-middle">Trigger Logic</th>
                        <th className="h-[46px] py-0 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted dark:text-slate-600 text-left align-middle">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                     {ROUTES.map((r, i) => (
                       <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300 group">
                          <td className="h-[54px] py-0 px-10 text-[11px] font-black text-trust dark:text-trust-light tracking-widest tabular-nums text-left">{r.id}</td>
                          <td className="h-[54px] py-0 px-10 ">
                             <div className="flex items-center justify-start gap-4">
                                <Truck className="w-5 h-5 text-text-muted" />
                                <span className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">{r.vendor}</span>
                             </div>
                          </td>
                          <td className="h-[54px] py-0 px-10 text-left">
                             <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-black text-text-primary dark:text-white uppercase tracking-tighter">{r.logic}</span>
                                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-40">Threshold: {r.threshold}</span>
                             </div>
                          </td>
                          <td className="h-[54px] py-0 px-10 text-left">
                             <Badge className={cn(
                               "text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 border-none shadow-none",
                               r.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                             )}>
                               {r.status}
                             </Badge>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

         <div className="space-y-8">
            <Card className="p-10 border-none bg-white dark:bg-[#1F2937] rounded-2xl shadow-soft group">
               <h3 className="text-[11px] font-black text-text-muted dark:text-slate-500 uppercase tracking-[0.4em] mb-10">Neural Map Status</h3>
               <div className="space-y-10">
                  <div className="flex items-center justify-center p-12 relative">
                     <div className="absolute inset-0 flex items-center justify-center opacity-10"><Share2 className="w-32 h-32" /></div>
                     <div className="relative w-40 h-40 rounded-full border-8 border-trust/5 flex items-center justify-center">
                        <div className="text-center">
                           <p className="text-4xl font-black text-text-primary dark:text-white tracking-widest">94%</p>
                           <p className="text-[8px] font-black text-text-muted uppercase tracking-[0.4em] mt-2">Utilization</p>
                        </div>
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                           <circle cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeWidth="8" className="text-trust" strokeDasharray="477" strokeDashoffset="28" />
                        </svg>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-50 dark:border-slate-800">
                     <div className="text-center">
                        <p className="text-[11px] font-black text-text-primary dark:text-white uppercase tracking-widest">842</p>
                        <p className="text-[8px] font-black text-text-muted uppercase tracking-[0.4em] mt-1">Endpoints</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[11px] font-black text-text-primary dark:text-white uppercase tracking-widest">1.2ms</p>
                        <p className="text-[8px] font-black text-text-muted uppercase tracking-[0.4em] mt-1">Latency</p>
                     </div>
                  </div>
               </div>
            </Card>

            <Card className="p-10 bg-slate-900 text-white border-none rounded-2xl shadow-xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-black" />
               <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-trust/10 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
               <div className="relative z-10 space-y-8 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                     <Layers className="w-10 h-10 text-trust" />
                     <Badge className="bg-white/5 text-white border-white/10 text-[8px] font-black uppercase tracking-[0.4em] px-4 py-1.5">Legacy Tier</Badge>
                  </div>
                  <div>
                     <h4 className="text-2xl font-black uppercase tracking-widest leading-tight">Secondary Carrier Link</h4>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-4">Manual override available for all T3 endpoints</p>
                  </div>
                  <Button className="w-full h-14 bg-white text-slate-900 hover:bg-slate-100 font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl shadow-none">
                     Configure Path
                  </Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
