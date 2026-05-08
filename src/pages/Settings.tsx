import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { AvatarIcon } from '@/components/ui/AvatarIcon';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Lock,
  ChevronRight,
  Monitor,
  Database,
  Mail,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '@/app/ThemeContext';
import { useAuth } from '@/store/authStore';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div>
        <h1 className="text-3xl font-black text-text-primary tracking-widest uppercase">System Preferences</h1>
        <p className="text-text-muted text-[11px] font-black uppercase tracking-[0.4em] mt-2">Personal Configuration & Security Tiers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="space-y-2">
          {[
            { label: 'Profile Interface', icon: User, active: true },
            { label: 'Security & Auth', icon: Lock },
            { label: 'Notifications', icon: Bell },
            { label: 'System Theme', icon: Monitor },
            { label: 'Network Access', icon: Globe },
          ].map(item => (
            <button 
              key={item.label}
              className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${
                item.active 
                  ? 'bg-accent text-white shadow-xl shadow-accent/20' 
                  : 'text-text-muted hover:bg-card-bg hover:text-text-primary'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className="w-5 h-5" />
                <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
              </div>
              <ChevronRight className={`w-4 h-4 opacity-30 ${item.active ? 'hidden' : ''}`} />
            </button>
          ))}
        </aside>

        <main className="md:col-span-2 space-y-8">
          <Card className="p-10 border-none bg-card-bg rounded-2xl shadow-soft">
            <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.4em] mb-10">Identity Metadata</h3>
            
            <div className="flex items-center gap-6 mb-12">
               <div className="relative group">
                 <AvatarIcon 
                    gender={user?.gender} 
                    seedString={user?.name || user?.email}
                    className="w-24 h-24 rounded-2xl overflow-hidden shadow-2xl transition-transform group-hover:scale-105" 
                 />
                  <button className="absolute -bottom-2 -right-2 p-3 bg-accent text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                     <Zap className="w-4 h-4" />
                  </button>
               </div>
               <div className="space-y-2">
                  <h4 className="text-2xl font-black text-text-primary tracking-widest uppercase">{user?.name || user?.email?.split('@')[0] || 'Agent 101'}</h4>
                  <div className="flex items-center gap-3">
                     <Badge className="bg-success/10 text-success border-none text-[8px] font-black uppercase tracking-widest px-3">{user?.role || 'Agent'}</Badge>
                     <span className="text-[11px] font-black text-text-muted opacity-40 uppercase tracking-widest">{user?.email}</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-border-subtle">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Display Identity</label>
                  <input 
                    type="text" 
                    defaultValue={user?.name || user?.email?.split('@')[0] || ''}
                    className="w-full h-12 bg-bg-app border-none rounded-2xl px-4 text-sm font-bold text-text-primary focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Interface Email</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email}
                    className="w-full h-12 bg-bg-app border-none rounded-2xl px-4 text-sm font-bold text-text-primary focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
                  />
               </div>
            </div>
            
            <div className="mt-12 flex justify-end">
               <Button className="bg-accent hover:opacity-90 h-14 px-12 text-white font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl shadow-xl shadow-accent/20 border-none transition-all active:scale-95">
                 Commit Metadata
               </Button>
            </div>
          </Card>

          <Card className="p-10 border-none bg-card-bg rounded-2xl shadow-soft">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.4em]">Visual Geometry</h3>
                <div className="flex items-center gap-3 py-1.5 px-4 bg-bg-app rounded-full">
                   <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                   <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.4em]">System Active</span>
                </div>
             </div>

             <div className="space-y-6">
                <div 
                  onClick={toggleTheme}
                  className="p-6 bg-bg-app rounded-2xl flex items-center justify-between cursor-pointer hover:bg-accent/5 group transition-all"
                >
                   <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-card-bg flex items-center justify-center shadow-soft border border-border-subtle">
                        {theme === 'light' ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-accent" />}
                      </div>
                      <div>
                         <p className="text-[11px] font-black text-text-primary uppercase tracking-widest">Atmospheric Interface</p>
                         <p className="text-[9px] text-text-muted uppercase font-black tracking-widest mt-1">Currently targeting: {theme === 'light' ? 'Light Spectrum' : 'Deep Space Blended'}</p>
                      </div>
                   </div>
                   <div className={cn(
                     "w-12 h-6 rounded-full relative transition-colors duration-500",
                     theme === 'dark' ? "bg-accent" : "bg-border-subtle"
                   )}>
                      <motion.div 
                        animate={{ x: theme === 'dark' ? 24 : 4 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg" 
                      />
                   </div>
                </div>

                <div className="p-6 bg-bg-app rounded-2xl flex items-center justify-between opacity-50 group pointer-events-none">
                   <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-card-bg flex items-center justify-center shadow-soft border border-border-subtle">
                        <Monitor className="w-5 h-5 text-text-muted" />
                      </div>
                      <div>
                         <p className="text-[11px] font-black text-text-primary uppercase tracking-widest">Motion Reducer</p>
                         <p className="text-[9px] text-text-muted uppercase font-black tracking-widest mt-1">Limit system-wide animated transitions</p>
                      </div>
                   </div>
                   <div className="w-12 h-6 rounded-full bg-border-subtle relative">
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg" />
                   </div>
                </div>
             </div>
          </Card>

          <Card className="p-10 border-none bg-danger/5 dark:bg-danger/10 rounded-2xl shadow-none flex items-center justify-between">
             <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-danger/10 text-danger rounded-2xl flex items-center justify-center shadow-none border-none">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                   <h4 className="text-[11px] font-black text-danger uppercase tracking-[0.4em]">Administrative Territory</h4>
                   <p className="text-[10px] font-bold text-danger/60 uppercase mt-1 tracking-widest">Destructive operations & Logic Reset</p>
                </div>
             </div>
             <Button variant="outline" className="h-14 px-10 border-danger/20 text-danger hover:bg-danger hover:text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-none">
               Purge Cache
             </Button>
          </Card>
        </main>
      </div>
    </div>
  );
}
