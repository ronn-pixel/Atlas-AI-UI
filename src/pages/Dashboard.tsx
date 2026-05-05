import * as React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Inbox, 
  Layers, 
  ArrowUpRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Zap,
  Activity,
  Users,
  Truck,
  FileText,
  ClipboardList,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';

import { useTheme } from '@/app/ThemeContext';

const memberGrowthData = [
  { name: 'Jan', value: 8500 },
  { name: 'Feb', value: 9200 },
  { name: 'Mar', value: 8900 },
  { name: 'Apr', value: 10500 },
  { name: 'May', value: 11200 },
  { name: 'Jun', value: 12482 },
];

const claimsOverviewData = [
  { name: 'Jan', total: 120, approved: 95, denied: 25 },
  { name: 'Feb', total: 150, approved: 110, denied: 40 },
  { name: 'Mar', total: 140, approved: 120, denied: 20 },
  { name: 'Apr', total: 180, approved: 145, denied: 35 },
  { name: 'May', total: 160, approved: 130, denied: 30 },
  { name: 'Jun', total: 190, approved: 160, denied: 30 },
];

const plansOverviewData = [
  { name: 'Jan', active: 45, new: 5, usage: 70 },
  { name: 'Feb', active: 48, new: 8, usage: 65 },
  { name: 'Mar', active: 52, new: 12, usage: 80 },
  { name: 'Apr', active: 55, new: 6, usage: 75 },
  { name: 'May', active: 62, new: 15, usage: 85 },
  { name: 'Jun', active: 65, new: 10, usage: 90 },
];

const activityLogs = [
  { id: 1, type: 'claim', desc: 'New claim initialized for CASE-1024', time: '2m ago', icon: Zap, color: 'text-blue-500' },
  { id: 2, type: 'case', desc: 'Operational case #CASE-1022 updated', time: '15m ago', icon: Activity, color: 'text-purple-500' },
  { id: 3, type: 'vendor', desc: 'Valenz responding to secondary inquiry', time: '45m ago', icon: Truck, color: 'text-orange-500' },
  { id: 4, type: 'member', desc: 'New group registration: BlueCorp Intel', time: '2h ago', icon: Users, color: 'text-green-500' },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <Card className="p-6 flex flex-col justify-between h-36 bg-card-bg shadow-soft border-none relative transition-all hover:bg-accent/5 group rounded-xl">
     <div className="flex justify-between items-start">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg", color)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-1 text-success text-[10px] font-black uppercase tracking-widest">
           <ArrowUpRight className="w-3 h-3" /> {change}
        </div>
     </div>
     <div className="space-y-1">
       <div className="text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">{value}</div>
       <div className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-[0.2em]">{title}</div>
     </div>
  </Card>
);

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridColor = isDark ? '#27272a' : '#F1F5F9';
  const labelColor = isDark ? '#71717a' : '#64748B';
  const tooltipBg = isDark ? '#18181b' : '#FFFFFF';
  const tooltipText = isDark ? '#f4f4f5' : '#111827';

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <StatCard title="Total Members" value="12,482" change="+3.2%" icon={Users} color="bg-blue-600" />
        <StatCard title="Active Vendors" value="84" change="+2" icon={Truck} color="bg-purple-600" />
        <StatCard title="Active Plans" value="65" change="+5" icon={ShieldCheck} color="bg-orange-600" />
        <StatCard title="Total Claims" value="2,842" change="+14%" icon={FileText} color="bg-indigo-600" />
        <StatCard title="Reports Gen." value="1,143" change="+22" icon={ClipboardList} color="bg-slate-600" />
        <StatCard title="Retention Rate" value="98.2%" change="+0.4%" icon={Activity} color="bg-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CLAIMS OVERVIEW */}
        <Card className="lg:col-span-2 p-8 bg-card-bg border-none shadow-soft rounded-xl hover:bg-accent/5 transition-all">
           <div className="flex justify-between items-center mb-8">
             <div className="space-y-1">
                <h3 className="font-black text-[11px] text-text-primary tracking-[0.2em] uppercase">Monthly Claims Overview</h3>
                <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">Adjudication Status Matrix</p>
             </div>
             <div className="flex gap-4">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-[8px] font-black uppercase text-text-muted tracking-widest">Total</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-[8px] font-black uppercase text-text-muted tracking-widest">Approved</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[8px] font-black uppercase text-text-muted tracking-widest">Denied</span></div>
             </div>
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={claimsOverviewData} barGap={8}>
                   <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={gridColor} />
                   <XAxis dataKey="name" stroke={labelColor} fontSize={10} fontWeight="900" axisLine={false} tickLine={false} dy={10} />
                   <YAxis stroke={labelColor} fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                   <Tooltip 
                      contentStyle={{ backgroundColor: tooltipBg, color: tooltipText, borderRadius: '16px', border: 'none', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                   />
                   <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                   <Bar dataKey="approved" fill="#10B981" radius={[4, 4, 0, 0]} />
                   <Bar dataKey="denied" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>

        {/* MEMBER GROWTH */}
        <Card className="p-8 bg-card-bg border-none shadow-soft rounded-xl hover:bg-accent/5 transition-all">
           <div className="flex justify-between items-center mb-8">
             <div className="space-y-1">
                <h3 className="font-black text-[11px] text-text-primary tracking-[0.2em] uppercase">Member Growth Trend</h3>
                <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">Temporal Scale Analysis</p>
             </div>
             <Badge className="bg-bg-app text-text-muted border-none uppercase tracking-widest text-[9px] px-3">6 month scale</Badge>
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={memberGrowthData}>
                   <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={gridColor} />
                   <XAxis dataKey="name" stroke={labelColor} fontSize={10} fontWeight="900" axisLine={false} tickLine={false} dy={10} />
                   <YAxis stroke={labelColor} fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                   <Tooltip 
                      contentStyle={{ backgroundColor: tooltipBg, color: tooltipText, borderRadius: '16px', border: 'none', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                   />
                   <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PLANS OVERVIEW */}
        <Card className="lg:col-span-2 p-8 bg-card-bg border-none shadow-soft rounded-xl hover:bg-accent/5 transition-all">
           <div className="flex justify-between items-center mb-8">
             <div className="space-y-1">
                <h3 className="font-black text-[11px] text-text-primary tracking-[0.2em] uppercase">Monthly Plans Overview</h3>
                <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">Benefit Tier & Usage Telemetry</p>
             </div>
             <div className="flex gap-4">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500" /><span className="text-[8px] font-black uppercase text-text-muted tracking-widest">Active</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent" /><span className="text-[8px] font-black uppercase text-text-muted tracking-widest">Enrollments</span></div>
             </div>
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={plansOverviewData}>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={gridColor} />
                    <XAxis dataKey="name" stroke={labelColor} fontSize={10} fontWeight="900" axisLine={false} tickLine={false} dy={10} />
                    <YAxis stroke={labelColor} fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: tooltipBg, color: tooltipText, borderRadius: '16px', border: 'none', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Bar dataKey="active" fill="#6366F1" radius={[20, 20, 20, 20]} barSize={20} />
                    <Bar dataKey="new" fill="#2563EB" radius={[20, 20, 20, 20]} barSize={20} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>

        {/* RECENT ACTIVITY */}
        <Card className="p-8 bg-card-bg border-none shadow-soft rounded-xl hover:bg-accent/5 transition-all">
           <div className="flex justify-between items-center mb-10">
             <h3 className="font-black text-[11px] text-text-primary tracking-[0.2em] uppercase">Recent Activity</h3>
             <button className="text-[9px] font-black text-accent uppercase tracking-widest hover:underline">View All</button>
           </div>
           <div className="space-y-6">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex gap-5 group cursor-default">
                   <div className={cn("w-12 h-12 rounded-2xl bg-bg-app flex items-center justify-center shrink-0 transition-all group-hover:scale-110")}>
                      <log.icon className={cn("w-5 h-5", log.color)} />
                   </div>
                   <div className="flex-1 space-y-1.5 py-1">
                      <p className="text-[11px] font-bold text-text-primary leading-relaxed tracking-tight">{log.desc}</p>
                      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-text-muted">
                        <span>Source: Enterprise Matrix</span>
                        <span className="tabular-nums opacity-40">{log.time}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-12">
              <Card className="p-6 bg-bg-app border-none rounded-2xl flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-black text-text-primary uppercase tracking-widest">Network Stability</p>
                    <p className="text-[8px] font-black text-success uppercase tracking-[0.4em] mt-1">Operational &bull; 99.98%</p>
                 </div>
                 <Badge className="bg-success/10 text-success border-none text-[8px] font-black uppercase px-2">Secure</Badge>
              </Card>
           </div>
        </Card>
      </div>
    </div>
  );
}
