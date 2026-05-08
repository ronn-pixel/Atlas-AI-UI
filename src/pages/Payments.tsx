import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, Clock, Search, Filter, History } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function Payments() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-[20px] flex-1 min-w-0 mr-8">
          <div className="w-[380px] shrink-0 flex items-center gap-4">
            <div className="min-w-0 shrink">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-widest uppercase truncate">Financial Settlements</h1>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-[0.4em] mt-2 truncate">Capital Matrix & Disbursement Telemetry</p>
            </div>
            <div className="h-12 w-px bg-border-subtle dark:bg-white/10 shrink-0" />
          </div>
          <div className="flex flex-nowrap items-center gap-4 flex-1 min-w-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-10 border-none bg-white dark:bg-[#1F2937] rounded-2xl shadow-soft flex flex-col justify-between h-64">
           <div className="flex justify-between items-start">
              <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center">
                 <DollarSign className="w-7 h-7" />
              </div>
              <Badge className="bg-success/10 text-success border-none text-[9px] font-black uppercase tracking-widest px-3">Total Volume</Badge>
           </div>
           <div className="space-y-1">
              <h4 className="text-5xl font-black text-text-primary dark:text-white tracking-tighter tabular-nums">$2.4M</h4>
              <p className="text-[10px] font-black text-success uppercase tracking-widest flex items-center gap-2">
                 <ArrowUpRight className="w-4 h-4" /> 14.2% Growth Protocol
              </p>
           </div>
        </Card>

        <Card className="p-10 border-none bg-white dark:bg-[#1F2937] rounded-2xl shadow-soft flex flex-col justify-between h-64">
           <div className="flex justify-between items-start">
              <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center">
                 <CreditCard className="w-7 h-7" />
              </div>
              <Badge className="bg-trust/10 text-trust border-none text-[9px] font-black uppercase tracking-widest px-3">Upcoming Batches</Badge>
           </div>
           <div className="space-y-1">
              <h4 className="text-5xl font-black text-text-primary dark:text-white tracking-tighter tabular-nums">$842K</h4>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                 Next Disbursement: Tomorrow
              </p>
           </div>
        </Card>

        <Card className="p-10 border-none bg-slate-900 text-white rounded-2xl shadow-xl shadow-black/20 flex flex-col justify-between h-64 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
              <History className="w-32 h-32" />
           </div>
           <div className="relative z-10 flex justify-between items-start">
              <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center">
                 <Clock className="w-7 h-7" />
              </div>
              <Badge className="bg-white/10 text-white border-none text-[9px] font-black uppercase tracking-widest px-3">Pending Audit</Badge>
           </div>
           <div className="relative z-10 space-y-1">
              <h4 className="text-5xl font-black text-white tracking-tighter tabular-nums">12</h4>
              <p className="text-[10px] font-black text-danger-light uppercase tracking-widest">Awaiting Verification</p>
           </div>
        </Card>
      </div>

      <Card className="overflow-hidden bg-white dark:bg-[#1F2937] border-none rounded-2xl shadow-soft">
         <div className="p-10 flex items-center justify-between bg-slate-50/50 dark:bg-black/20">
            <h3 className="text-[12px] font-black text-text-muted dark:text-slate-500 uppercase tracking-[0.4em]">Settlement Ledger</h3>
            <div className="flex gap-4">
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted opacity-30" />
                  <input type="text" placeholder="Scan ledger..." className="bg-white dark:bg-[#111827] border-none rounded-2xl pl-12 pr-6 h-10 text-[10px] font-black tracking-widest w-64 uppercase outline-none" />
               </div>
               <Button variant="outline" className="h-10 w-10 p-0 border-none bg-white dark:bg-[#111827] rounded-2xl"><Filter className="w-4 h-4" /></Button>
            </div>
         </div>
         <div className="p-20 text-center space-y-6">
            <div className="w-24 h-24 bg-slate-50 dark:bg-black/20 rounded-2xl flex items-center justify-center mx-auto">
               <DollarSign className="w-10 h-10 text-slate-200 dark:text-slate-700" />
            </div>
            <div className="space-y-2">
               <h4 className="text-xl font-black text-text-primary dark:text-white uppercase tracking-widest">Financial Records Locked</h4>
               <p className="text-[11px] text-text-muted uppercase tracking-widest font-black opacity-40">Please authenticate higher tier privilege to access disbursement manifests</p>
            </div>
            <Button className="h-14 px-12 bg-trust text-white font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl shadow-xl shadow-trust/20">Elevate Access</Button>
         </div>
      </Card>
    </div>
  );
}
