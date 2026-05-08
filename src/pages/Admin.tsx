import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Shield, 
  Lock, 
  Users, 
  Key, 
  Database,
  Search,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  Globe,
  Zap,
  Activity
} from 'lucide-react';
import { cn } from '@/utils/cn';

const DUMMY_ACCESS = [
  { user: 'Ronn Aguilar', role: 'Principal Architect', status: 'Verified', lastActive: 'Active Now', level: 'Level 4' },
  { user: 'Sarah Wilson', role: 'Ops Lead', status: 'Verified', lastActive: '12m ago', level: 'Level 3' },
  { user: 'Admin Neural', role: 'System Engine', status: 'System', lastActive: 'Continuous', level: 'Level 5' },
  { user: 'Mark Thompson', role: 'Compliance Officer', status: 'Verified', lastActive: '1h ago', level: 'Level 3' },
  { user: 'Jessica Chen', role: 'Agent Supervisor', status: 'Verified', lastActive: '2d ago', level: 'Level 2' },
];

export default function Admin() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-[20px] flex-1 min-w-0 mr-8">
          <div className="w-[380px] shrink-0 flex items-center gap-4">
            <div className="min-w-0 shrink">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-widest uppercase truncate">Privacy Workspace</h1>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-[0.4em] mt-2 truncate">Security Tiers & Access Governance</p>
            </div>
            <div className="h-12 w-px bg-border-subtle dark:bg-white/10 shrink-0" />
          </div>
          <div className="flex flex-nowrap items-center gap-4 flex-1 min-w-0" />
        </div>
        <div className="flex gap-3">
           <Button variant="outline" size="sm" className="h-14 bg-card-bg border-none shadow-soft font-black px-8 uppercase tracking-widest text-[10px] rounded-2xl">Audit Manifest</Button>
           <Button size="sm" className="h-14 bg-accent hover:opacity-90 text-white font-black uppercase text-[11px] tracking-[0.4em] px-10 shadow-xl shadow-accent/20 border-none rounded-2xl transition-all transform active:scale-95">
             <ShieldCheck className="w-5 h-5 mr-3" /> Execute Protocol
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Sessions', val: 12, icon: Activity },
          { label: 'Neural Protocols', val: 842, icon: Database },
          { label: 'Privileged Nodes', val: 56, icon: Shield },
          { label: 'Integrity Rating', val: '99.9%', icon: Zap },
        ].map(s => (
          <Card key={s.label} className="p-6 h-28 bg-card-bg border-none shadow-soft rounded-2xl flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-accent/10 dark:bg-accent/20 text-accent shrink-0 shadow-sm">
              <s.icon className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 truncate">{s.label}</p>
              <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5 truncate">{s.val}</h4>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-0 overflow-hidden bg-card-bg border-none rounded-2xl shadow-soft flex flex-col">
           <div className="p-10 border-none flex justify-between items-center bg-bg-app">
              <h1 className="text-[12px] font-black text-text-muted uppercase tracking-[0.4em]">IAM Authority Registry</h1>
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted opacity-30" />
                 <input 
                   type="text" 
                   placeholder="Search node..."
                   className="bg-bg-app border-none rounded-2xl pl-12 pr-6 h-10 text-[10px] font-black tracking-widest uppercase w-64 focus:ring-2 focus:ring-accent/5 outline-none transition-all text-text-primary placeholder:opacity-30"
                 />
              </div>
           </div>
           <div className="flex-1 overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                 <thead className="sticky top-0 z-10 shadow-[0_1px_0_0_theme(colors.border.subtle)] bg-card-bg">
<tr className="bg-bg-app/50">
                       <th className="h-[46px] py-0 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-left align-middle">Identity Cluster</th>
                       <th className="h-[46px] py-0 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-left align-middle">Level</th>
                       <th className="h-[46px] py-0 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-left align-middle">Status</th>
                       <th className="h-[46px] py-0 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-left align-middle">Telemetry</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border-subtle">
                    {DUMMY_ACCESS.map((a, i) => (
                      <tr key={i} className="hover:bg-bg-app/50 transition-all duration-300">
                         <td className="h-[54px] py-0 px-10 ">
                            <div className="flex items-center gap-5">
                               <div className="w-11 h-11 rounded-2xl bg-bg-app flex items-center justify-center font-black text-accent text-[12px]">{a.user.split(' ').map(n=>n[0]).join('')}</div>
                               <div>
                                  <p className="text-[13px] font-black text-text-primary uppercase tracking-tight">{a.user}</p>
                                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1 opacity-60">{a.role}</p>
                               </div>
                            </div>
                         </td>
                         <td className="h-[54px] py-0 px-10 ">
                            <Badge variant="outline" className="text-[9px] font-black bg-bg-app border-none px-4 py-1 uppercase text-text-muted">{a.level}</Badge>
                         </td>
                         <td className="h-[54px] py-0 px-10 text-left">
                            <div className="flex justify-start items-center gap-2">
                               <div className={cn("w-2 h-2 rounded-full", a.status === 'Verified' ? 'bg-success' : 'bg-accent')} />
                               <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{a.status}</span>
                            </div>
                         </td>
                         <td className="h-[54px] py-0 px-10 text-right">
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] opacity-40 tabular-nums">{a.lastActive}</span>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </Card>

        <div className="space-y-8">
           <Card className="p-10 border-none bg-card-bg rounded-2xl shadow-soft">
              <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.4em] mb-10">Access Matrix</h3>
              <div className="space-y-6">
                 {[
                   { l: 'Network Firewalls', active: true },
                   { l: '2FA Enforcement', active: true },
                   { l: 'IP Address Locking', active: false },
                   { l: 'Automated Log Purge', active: true },
                 ].map(x => (
                   <div key={x.l} className="flex items-center justify-between p-5 bg-bg-app rounded-2xl">
                      <span className="text-[11px] font-black text-text-primary uppercase tracking-widest">{x.l}</span>
                      <div className={cn(
                        "w-10 h-5 rounded-full relative",
                        x.active ? "bg-accent" : "bg-border-subtle"
                      )}>
                        <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", x.active ? "right-1" : "left-1")} />
                      </div>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-10 bg-[#1E3A8A] text-white border-none rounded-2xl shadow-xl shadow-accent/20 relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-accent/20 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
              <div className="relative z-10 space-y-6">
                 <div className="flex justify-between items-start">
                    <ShieldCheck className="w-10 h-10 opacity-30" />
                    <Badge className="bg-white/10 text-white border-none text-[8px] font-black uppercase tracking-[0.3em] px-3">System Key</Badge>
                 </div>
                 <div>
                    <h4 className="text-2xl font-black uppercase tracking-widest leading-tight">Encryption Gateway Active</h4>
                    <p className="text-[9px] font-black opacity-40 uppercase tracking-[0.5em] mt-3">AES-256 Vector Protocol</p>
                 </div>
                 <Button className="w-full h-14 bg-white text-accent hover:bg-slate-100 font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl shadow-none mt-4 transition-all active:scale-95">
                    Rotate System Keys
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
