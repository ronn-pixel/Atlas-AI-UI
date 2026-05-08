import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  Shield, 
  Clock, 
  Lock, 
  Search, 
  UserPlus, 
  MoreHorizontal,
  Check,
  X,
  AlertTriangle,
  Settings,
  ShieldCheck,
  Activity,
  Key,
  Database,
  Terminal,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  MoreVertical,
  Fingerprint,
  Plus,
  Download
} from 'lucide-react';
import { cn } from '@/utils/cn';

const stats = [
  { label: 'Authorized Staff', value: '142', detail: 'Across 4 global hubs', icon: Users, color: 'trust' },
  { label: 'System Admins', value: '8', detail: 'Root level permissions', icon: Shield, color: 'primary' },
  { label: 'Active Sessions', value: '29', detail: 'Real-time verified users', icon: Activity, color: 'success' },
  { label: 'Audit Alerts', value: '2', detail: 'Pending high severity', icon: AlertTriangle, color: 'danger' },
  { label: 'RBAC Latency', value: '0.4ms', detail: 'Verified by Auth-Engine', icon: Terminal, color: 'trust' },
];

const users = [
  { id: 1, name: 'Adrian Sterling', email: 'adrian.s@atlasai.com', role: 'Super Admin', status: 'Active', activity: 'Just now', ip: '192.168.1.1' },
  { id: 2, name: 'Elena Rodriguez', email: 'elena.r@atlasai.com', role: 'Compliance Officer', status: 'Active', activity: '14m ago', ip: '192.168.1.42' },
  { id: 3, name: 'Marcus Thorne', email: 'marcus.t@atlasai.com', role: 'Lead Claims Agent', status: 'Active', activity: '2h ago', ip: '172.16.0.5' },
  { id: 4, name: 'Sarah Jenkins', email: 'sarah.j@atlasai.com', role: 'Support Specialist', status: 'Active', activity: '1d ago', ip: '10.0.0.24' },
  { id: 5, name: 'David Kim', email: 'david.k@atlasai.com', role: 'External Auditor', status: 'Suspended', activity: '5d ago', ip: '192.168.1.102' },
];

export default function AdminAccess() {
  const [activeTab, setActiveTab] = React.useState('users');

  const tabs = [
    { id: 'users', label: 'Authorized Identity' },
    { id: 'rbac', label: 'Policy Control (RBAC)' },
    { id: 'pending', label: 'Verification Queue', badge: 2 },
    { id: 'security', label: 'Hardening & Encryption' },
    { id: 'audit', label: 'Forensic Audit Log' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight uppercase">Platform Governance</h1>
          <p className="text-text-muted dark:text-slate-400 text-sm font-medium">Identity lifecycle and security fabric orchestration</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="h-9 px-4 gap-2 dark:border-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-widest bg-white dark:bg-slate-800">
            <Lock className="w-3.5 h-3.5" /> Emergency Lock
          </Button>
          <Button size="sm" className="h-9 px-6 bg-primary hover:bg-primary-dark font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
            System Config
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-4 border-subtle dark:border-slate-800 bg-white dark:bg-slate-800 shadow-lg relative overflow-hidden group">
            <div className={cn("absolute right-[-10%] top-[-10%] w-16 h-16 opacity-5 group-hover:scale-110 transition-transform", `text-${stat.color}`)}>
              <stat.icon className="w-full h-full" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted dark:text-slate-500">{stat.label}</p>
            <div className="mt-2">
              <div className="text-2xl font-black text-text-primary dark:text-white tracking-tighter tabular-nums">{stat.value}</div>
              <p className="text-[8px] text-text-muted dark:text-slate-500 font-bold uppercase mt-1 tracking-widest">{stat.detail}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex border-b border-subtle dark:border-slate-800 gap-6 overflow-x-auto no-scrollbar pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative px-1 whitespace-nowrap",
                activeTab === tab.id 
                  ? "text-trust" 
                  : "text-text-muted dark:text-slate-500 hover:text-text-primary dark:hover:text-white"
              )}
            >
              {tab.label}
              {tab.badge && (
                <span className="ml-2 bg-danger/10 text-danger border border-danger/20 px-1.5 py-0.5 rounded-full text-[8px] font-black">
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-trust rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.3)]" />}
            </button>
          ))}
        </div>

        {activeTab === 'users' && (
          <Card className="p-0 overflow-hidden bg-white dark:bg-slate-800 border-subtle dark:border-slate-800 shadow-xl">
            <div className="p-4 border-b border-subtle dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-black text-[10px] text-text-muted dark:text-slate-500 uppercase tracking-[0.2em]">Global Staff Register</h3>
                  <p className="text-[11px] text-text-primary dark:text-white font-black uppercase mt-1">Verified Directory</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search Directory..." 
                    className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-subtle dark:border-slate-700 rounded-2xl text-xs font-bold focus:ring-1 focus:ring-trust outline-none w-80 shadow-sm dark:text-white"
                  />
                </div>
                <Button size="sm" className="gap-2 bg-trust hover:bg-trust-dark font-black h-10 px-6 uppercase tracking-widest group">
                  <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" /> Provision Staff
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead className="sticky top-0 z-10 shadow-[0_1px_0_0_theme(colors.border.subtle)] bg-card-bg">
<tr className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-subtle dark:border-slate-700">
                    <th className="h-[46px] py-0 px-6 font-black uppercase tracking-widest text-text-muted dark:text-slate-500 text-[10px] text-left align-middle">Identified Entity</th>
                    <th className="h-[46px] py-0 px-6 font-black uppercase tracking-widest text-text-muted dark:text-slate-500 text-[10px] text-left align-middle">System Permissions</th>
                    <th className="h-[46px] py-0 px-6 font-black uppercase tracking-widest text-text-muted dark:text-slate-500 text-[10px] text-left align-middle">Security Status</th>
                    <th className="h-[46px] py-0 px-6 font-black uppercase tracking-widest text-text-muted dark:text-slate-500 text-[10px] text-left align-middle">Telemetry</th>
                    <th className="h-[46px] py-0 px-6 font-black uppercase tracking-widest text-text-muted dark:text-slate-500 text-[10px] text-center align-middle">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-subtle dark:divide-slate-700 font-medium">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors group">
                      <td className="h-[54px] py-0 px-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-subtle dark:border-slate-700 flex items-center justify-center font-black text-text-muted dark:text-slate-400 text-xs shadow-sm group-hover:border-trust transition-colors">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="text-left">
                          <div className="font-black text-text-primary dark:text-white uppercase tracking-tight">{user.name}</div>
                          <div className="text-[10px] text-text-muted dark:text-slate-500 font-bold lowercase">{user.email}</div>
                        </div>
                      </td>
                      <td className="h-[54px] py-0 px-6 text-left">
                        <div className="flex items-center gap-2">
                           <Shield className="w-3.5 h-3.5 text-trust" />
                           <span className="text-[10px] font-black uppercase tracking-tighter text-text-primary dark:text-white underline decoration-trust/30 underline-offset-4">{user.role}</span>
                        </div>
                      </td>
                      <td className="h-[54px] py-0 px-6 text-left">
                        <Badge 
                          variant={user.status === 'Active' ? 'success' : 'danger'} 
                          className="text-[9px] font-black uppercase tracking-widest px-3 shadow-sm"
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="h-[54px] py-0 px-6 text-left">
                         <div className="flex flex-col">
                            <span className="text-[10px] text-text-primary dark:text-white font-black">{user.activity}</span>
                            <span className="text-[8px] text-text-muted dark:text-slate-500 font-mono font-bold mt-1 uppercase tracking-tighter">{user.ip}</span>
                         </div>
                      </td>
                      <td className="h-[54px] py-0 px-6 text-center align-middle">
                        <div className="flex justify-center gap-2">
                           <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-subtle dark:border-slate-700 dark:text-slate-400 hover:text-trust hover:border-trust"><Edit className="w-3.5 h-3.5" /></Button>
                           <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-subtle dark:border-slate-700 text-danger/60 hover:text-danger hover:border-danger"><Trash2 className="w-3.5 h-3.5" /></Button>
                           <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-subtle dark:border-slate-700 dark:text-slate-400 group-hover:bg-slate-50 dark:group-hover:bg-slate-900"><MoreVertical className="w-3.5 h-3.5" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-subtle dark:border-slate-700 text-center">
               <button className="text-[9px] font-black text-text-muted dark:text-slate-500 uppercase tracking-[0.2em] hover:text-trust transition-colors">Load Extended Directory Ledger</button>
            </div>
          </Card>
        )}

        {activeTab === 'rbac' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 space-y-4">
                <Card className="p-0 overflow-hidden bg-white dark:bg-slate-800 border-subtle dark:border-slate-800 shadow-xl">
                   <div className="p-4 border-b border-subtle dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
                      <h3 className="font-black text-[10px] text-text-muted dark:text-slate-500 uppercase tracking-[0.2em]">Permission Matrix Matrix</h3>
                      <button className="text-[9px] font-black text-trust uppercase tracking-widest hover:underline">Edit Logic</button>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-[10px]">
                         <thead className="sticky top-0 z-10 shadow-[0_1px_0_0_theme(colors.border.subtle)] bg-card-bg">
<tr className="bg-slate-50/30 dark:bg-slate-900/10 border-b border-subtle dark:border-slate-700">
                               <th className="h-[46px] py-0 px-5 font-black uppercase tracking-widest text-text-muted dark:text-slate-500 text-left align-middle">Capability Endpoint</th>
                               <th className="h-[46px] py-0 px-5 font-black uppercase tracking-widest text-text-muted dark:text-slate-500 text-left align-middle">Admin</th>
                               <th className="h-[46px] py-0 px-5 font-black uppercase tracking-widest text-text-muted dark:text-slate-500 text-left align-middle">Agent</th>
                               <th className="h-[46px] py-0 px-5 font-black uppercase tracking-widest text-text-muted dark:text-slate-500 text-left align-middle">Auditor</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-subtle dark:divide-slate-700">
                            {[
                              { label: 'Member: Full PHI Read', admin: true, agent: true, audit: true },
                              { label: 'Member: PII Edit/Overwrite', admin: true, agent: true, audit: false },
                              { label: 'Claims: Monetary Disbursement', admin: true, agent: false, audit: false },
                              { label: 'Vendor: Routing Manipulation', admin: true, agent: false, audit: false },
                              { label: 'Reports: Forensic Export', admin: true, agent: true, audit: true },
                            ].map((perm, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors group">
                                 <td className="h-[54px] py-0 px-5 font-black text-text-primary dark:text-white uppercase tracking-tight">{perm.label}</td>
                                 <td className="h-[54px] py-0 px-5 text-center">
                                    {perm.admin ? <Check className="w-4 h-4 mx-auto text-success" /> : <X className="w-4 h-4 mx-auto text-text-muted" />}
                                 </td>
                                 <td className="h-[54px] py-0 px-5 text-center">
                                    {perm.agent ? <Check className="w-4 h-4 mx-auto text-success" /> : <X className="w-4 h-4 mx-auto text-text-muted" />}
                                 </td>
                                 <td className="h-[54px] py-0 px-5 text-center">
                                    {perm.audit ? <Check className="w-4 h-4 mx-auto text-success" /> : <X className="w-4 h-4 mx-auto text-text-muted" />}
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </Card>
             </div>
             <div>
                <Card className="p-5 border-subtle dark:border-slate-800 bg-white dark:bg-slate-800 shadow-xl space-y-6">
                   <h3 className="font-black text-[10px] text-text-muted dark:text-slate-500 uppercase tracking-[0.2em]">Defined Schema Roles</h3>
                   <div className="space-y-4">
                      {[
                        { name: 'Super Admin', count: 3, desc: 'Complete orchestration' },
                        { name: 'Claims Agent', count: 84, desc: 'Operational adjudication' },
                        { name: 'External Auditor', count: 12, desc: 'Read-only forensics' },
                        { name: 'Member Success', count: 15, desc: 'Engagement focus' },
                      ].map(role => (
                        <div key={role.name} className="p-3 border border-subtle dark:border-slate-700 rounded-2xl hover:border-trust transition-all cursor-pointer group">
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-text-primary dark:text-white uppercase tracking-tight">{role.name}</span>
                              <Badge variant="outline" className="text-[8px] font-mono dark:border-slate-700">{role.count}</Badge>
                           </div>
                           <p className="text-[9px] text-text-muted dark:text-slate-500 mt-1 font-medium">{role.desc}</p>
                        </div>
                      ))}
                   </div>
                   <Button variant="outline" className="w-full border-dashed dark:border-slate-700 h-10 text-[9px] font-black uppercase tracking-widest gap-2">
                     <Plus className="w-3.5 h-3.5" /> Define Custom Tier
                   </Button>
                </Card>
             </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <Card className="p-6 bg-white dark:bg-slate-800 border-subtle dark:border-slate-800 shadow-xl">
                <h3 className="font-black text-[11px] text-text-primary dark:text-white uppercase tracking-widest flex items-center gap-2 mb-8">
                   <Lock className="w-4 h-4 text-trust" /> Access Security Protocols
                </h3>
                <div className="space-y-8">
                   {[
                     { label: 'Multi-Factor Enforcement', desc: 'Hardware-key or biometrics mandated for all logins', status: 'Enabled' },
                     { label: 'Dynamic Session Rotation', desc: 'Rotate JWT tokens every 15 minutes of inactivity', status: 'Enabled' },
                     { label: 'IP Intelligence Guard', desc: 'Block access from non-sanctioned geolocation nodes', status: 'Enabled' },
                     { label: 'Brute-Force Lockout', desc: 'Temporary ID suspension after 3 failed handshakes', status: 'Policy Bound' },
                   ].map((s, i) => (
                     <div key={i} className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                           <div className="w-8 h-8 rounded bg-slate-50 dark:bg-slate-900 border border-subtle dark:border-slate-700 flex items-center justify-center shrink-0">
                              <Fingerprint className="w-4 h-4 text-text-muted" />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-text-primary dark:text-white uppercase tracking-tight">{s.label}</p>
                              <p className="text-[9px] text-text-muted dark:text-slate-500 mt-1 font-medium">{s.desc}</p>
                           </div>
                        </div>
                        <Badge variant="success" className="text-[8px] font-black uppercase tracking-widest px-2">{s.status}</Badge>
                     </div>
                   ))}
                </div>
             </Card>

             <Card className="p-6 bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute right-[-10%] bottom-[-10%] w-32 h-32 opacity-5 group-hover:scale-110 transition-transform duration-700">
                   <Database className="w-full h-full" />
                </div>
                <h3 className="font-black text-[11px] uppercase tracking-widest text-trust flex items-center gap-2 mb-8">
                   <Key className="w-4 h-4" /> Global Encryption Matrix
                </h3>
                <div className="space-y-6 relative z-10">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black uppercase tracking-tight">At-Rest: AES-256-GCM</span>
                         <Badge variant="success" className="bg-success text-white border-none text-[8px] font-black tracking-widest">ACTIVE</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black uppercase tracking-tight">In-Transit: TLS 1.3 (ChaCha20)</span>
                         <Badge variant="success" className="bg-success text-white border-none text-[8px] font-black tracking-widest">ACTIVE</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black uppercase tracking-tight">PHC Key Rotation Cycle</span>
                         <span className="text-[10px] font-black text-trust">72 HOURS</span>
                      </div>
                   </div>
                   
                   <div className="space-y-2">
                     <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Node Entropy Status</p>
                     <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-success w-[94%]" />
                     </div>
                     <p className="text-[8px] text-right text-success font-bold">HEALTHY: 94.2%</p>
                   </div>

                   <Button className="w-full bg-white text-slate-900 font-black h-11 uppercase tracking-widest text-[10px] hover:bg-slate-100 shadow-xl mt-4">
                      Recalculate Security Hash
                   </Button>
                </div>
             </Card>
          </div>
        )}

        {activeTab === 'audit' && (
          <Card className="p-0 overflow-hidden bg-white dark:bg-slate-800 border-subtle dark:border-slate-800 shadow-xl overflow-y-auto max-h-[600px]">
             <div className="p-4 border-b border-subtle dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                <h3 className="font-black text-[10px] text-text-muted dark:text-slate-500 uppercase tracking-[0.2em]">Forensic Intelligence Stream</h3>
             </div>
             <div className="p-4 space-y-3 font-mono text-[10px]">
                {[
                  { time: '2026-03-21 14:12:01', event: 'IDENTITY_CHALLENGE_SUCCESS', user: 'ADRIAN_S', note: 'MFA Verified via Biometric' },
                  { time: '2026-03-21 14:10:45', event: 'MEMBER_RECORD_EXPORT', user: 'MARCUS_T', note: 'Member ID: D-210172371231 | Reason: Claim Investigation' },
                  { time: '2026-03-21 13:58:22', event: 'SYSTEM_CONFIG_CHANGE', user: 'ADRIAN_S', note: 'Vendor Routing Logic RR-003 Modified' },
                  { time: '2026-03-21 13:45:30', event: 'AUTH_GATE_FAILURE', user: 'SYSTEM', note: 'Suspicious IP Blocked: 203.0.113.42' },
                  { time: '2026-03-21 13:30:12', event: 'PII_ACCESS_GRANTED', user: 'SARAH_J', note: 'Identity verification pass for member Sarah Johnson' },
                ].map((log, i) => (
                  <div key={i} className="p-3 rounded bg-slate-50 dark:bg-slate-900/50 border border-subtle/50 dark:border-slate-700 flex gap-4 transition-all hover:border-trust cursor-default group">
                     <span className="text-text-muted dark:text-slate-500 tabular-nums shrink-0">{log.time}</span>
                     <span className={cn("font-black shrink-0 w-48 truncate", 
                        log.event.includes('SUCCESS') || log.event.includes('GRANTED') ? 'text-success' : 
                        log.event.includes('FAILURE') ? 'text-danger' : 'text-trust'
                     )}>
                        {log.event}
                     </span>
                     <span className="text-text-primary dark:text-white font-black w-24 shrink-0">@{log.user}</span>
                     <span className="text-text-muted dark:text-slate-400 truncate flex-1">{log.note}</span>
                  </div>
                ))}
             </div>
             <div className="p-4 bg-slate-50 dark:bg-slate-900 text-center border-t border-subtle dark:border-slate-700">
                <Button variant="outline" className="bg-white dark:bg-slate-800 border-subtle dark:border-slate-700 h-9 font-black text-[9px] uppercase tracking-widest gap-2">
                   <Download className="w-3.5 h-3.5" /> Full Forensic Dump (.log)
                </Button>
             </div>
          </Card>
        )}
      </div>
    </div>
  );
}
