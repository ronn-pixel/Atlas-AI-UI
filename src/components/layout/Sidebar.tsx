import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  ShieldCheck, 
  LayoutDashboard,
  Truck,
  ClipboardList,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  CreditCard,
  Briefcase
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Clients', path: '/clients' },
  { icon: Truck, label: 'Vendors', path: '/vendors' },
  { icon: ShieldAlert, label: 'Plans', path: '/plans' },
  { icon: FileText, label: 'Claims', path: '/claims' },
  { icon: Briefcase, label: 'Cases', path: '/cases' },
  { icon: ClipboardList, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const secondaryItems: any[] = [];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        'flex flex-col bg-bg-app transition-all duration-300 relative border-r border-border-subtle z-40',
        collapsed ? 'w-20' : 'w-72'
      )}
    >
      <div className="h-16 flex items-center px-6 overflow-hidden whitespace-nowrap border-b border-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center shrink-0 shadow-xl shadow-accent/20">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="font-black text-text-primary uppercase tracking-[0.2em] text-[13px]">Atlas <span className="text-accent">AI</span></span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-text-muted mt-0.5">Enterprise v4.0</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-8 px-4 space-y-10">
        <div>
          {!collapsed && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-4 mb-4 text-[10px] uppercase tracking-[0.4em] text-text-muted font-black"
            >
              Menu
            </motion.p>
          )}
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-4 px-4 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all relative rounded-2xl group',
                    isActive
                      ? 'bg-accent text-white shadow-xl shadow-accent/30'
                      : 'text-text-muted hover:bg-card-bg/50 hover:text-text-primary'
                  )
                }
              >
                <item.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110")} />
                {!collapsed && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {item.label}
                  </motion.span>
                )}
                {collapsed && (
                  <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-text-primary text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div>
           <nav className="space-y-1.5">
             {secondaryItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-4 px-4 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all relative rounded-2xl group',
                    isActive
                      ? 'bg-accent text-white shadow-xl shadow-accent/30'
                      : 'text-text-muted hover:bg-card-bg/50 hover:text-text-primary'
                  )
                }
              >
                <item.icon className="w-5 h-5 shrink-0 group-hover:rotate-12 transition-transform" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 bg-card-bg/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-14 flex items-center justify-center gap-3 px-4 py-1.5 text-text-muted hover:bg-card-bg transition-all text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-none"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span>Collapse Interface</span>}
        </button>
      </div>
    </aside>
  );
};
