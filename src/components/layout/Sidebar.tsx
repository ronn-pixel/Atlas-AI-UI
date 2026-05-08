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
  PanelLeftClose,
  PanelLeftOpen,
  Database,
  FileText,
  CreditCard,
  Briefcase,
  Sun,
  Moon,
  Bell,
  User,
  LogOut,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/app/ThemeContext';
import { useAuth } from '@/store/authStore';
import { AvatarIcon } from '@/components/ui/AvatarIcon';

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
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const notificationRef = React.useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = React.useState([
    { id: 1, title: 'New Case Assigned', desc: 'Case #CASE-2026-1024 initialized', time: '2m ago', type: 'alert', read: false },
    { id: 2, title: 'Vendor Response', desc: 'Valenz responded to claim inquiry', time: '15m ago', type: 'message', read: false },
    { id: 3, title: 'System Alert', desc: 'Nightly batch processing complete', time: '1h ago', type: 'system', read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <aside
      className={cn(
        'flex flex-col bg-bg-app transition-all duration-300 relative border-r border-border-subtle z-50',
        collapsed ? 'w-24' : 'w-64'
      )}
    >
      <div className={cn("flex items-center overflow-hidden whitespace-nowrap border-b border-transparent shrink-0 mt-[20px] pb-4", collapsed ? "px-0 justify-center" : "px-6 justify-start")}>
        <div className="flex items-center gap-[10px]">
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

      <div className="flex-1 overflow-y-auto overflow-x-visible no-scrollbar pt-[20px] pb-8 px-4 space-y-10 min-h-0">
        <div>
          {!collapsed && (
            <div className="flex items-center justify-between px-4 mb-4 select-none">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] uppercase tracking-[0.4em] text-text-muted font-black shrink-0 flex-1"
              >
                Menu
              </motion.p>
              
              <div className="flex items-center justify-end shrink-0 ml-2 h-7 gap-1">
                <button 
                  onClick={toggleTheme}
                  className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors active:scale-95 rounded-lg hover:bg-card-bg/50"
                  title="Toggle Theme"
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>

                <div className="relative flex items-center justify-center h-full" ref={notificationRef}>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary relative transition-colors active:scale-95 rounded-lg hover:bg-card-bg/50"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-[3px] bg-danger rounded-full border border-bg-app flex items-center justify-center text-[7.5px] font-black text-white leading-none">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={cn("fixed w-80 bg-card-bg rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border-subtle z-[9999] overflow-hidden",
                            collapsed ? "left-[90px] top-[105px]" : "left-[240px] top-[105px]"
                        )}
                      >
                        <div className="p-4 border-b border-border-subtle bg-slate-50/50 dark:bg-slate-900/30">
                          <h3 className="text-[11px] font-black uppercase tracking-widest text-text-primary text-left">
                            Notifications
                          </h3>
                        </div>
                        <div className="flex flex-col max-h-[300px] overflow-y-auto no-scrollbar">
                          {notifications.map((n) => (
                            <div
                              key={n.id}
                              className="p-4 border-b border-border-subtle last:border-none hover:bg-accent/5 transition-colors cursor-pointer text-left"
                            >
                              <p className="text-[10px] font-black uppercase text-text-primary">
                                {n.title}
                              </p>
                              <p className="text-[11px] text-text-muted mt-1 leading-snug">
                                {n.desc}
                              </p>
                              <p className="text-[9px] font-black uppercase tracking-widest text-text-muted/60 mt-2">
                                {n.time}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
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
                    'flex items-center gap-4 px-4 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all relative rounded-2xl group shrink-0',
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

      <div className="mt-auto border-t border-border-subtle px-4 pb-6 pt-4 relative bg-bg-app z-40 shrink-0" onMouseLeave={() => setShowProfileMenu(false)}>
        <div className="absolute top-0 right-[-16px] -translate-y-1/2 z-50">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 bg-bg-app border border-border-subtle text-text-muted hover:text-text-primary hover:bg-accent hover:text-white hover:border-accent rounded-full flex items-center justify-center transition-all shadow-md group"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
             {collapsed ? <ChevronRight strokeWidth={3} className="w-5 h-5 transition-transform group-hover:translate-x-0.5" /> : <ChevronLeft strokeWidth={3} className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />}
          </button>
        </div>

        <button 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-full flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-card-bg/50 transition-all group relative"
        >
          {/* Enhanced Avatar with overlap effect */}
          <div className="absolute -top-12 bg-bg-app rounded-full p-1.5 ring-1 ring-border-subtle shadow-sm z-10 transition-transform group-hover:-translate-y-1">
             <AvatarIcon 
               gender={user?.gender}
               seedString={user?.name || user?.email}
               className="w-[60px] h-[60px] rounded-full overflow-hidden shadow-soft ring-2 ring-transparent group-hover:ring-accent/20 transition-all"
             />
          </div>
          
          <div className="h-6" /> {/* Spacer for overlapped avatar */}

          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center mt-2 w-full truncate"
            >
              <p className="text-[13px] font-black text-text-primary leading-none uppercase text-center tracking-tight truncate w-full">{user?.name || user?.email?.split('@')[0] || 'Agent 101'}</p>
              <p className="text-[9px] text-text-muted font-black uppercase tracking-[0.3em] mt-1.5 opacity-60 text-center truncate w-full">{user?.role || 'Agent'}</p>
            </motion.div>
          )}
        </button>

        <AnimatePresence>
          {showProfileMenu && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={cn(
                "absolute bottom-[calc(100%+16px)] bg-card-bg rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-border-subtle z-[100]",
                collapsed ? "left-full ml-4 w-60" : "left-4 right-4"
              )}
            >
              <div className="p-4 bg-bg-app border-b border-border-subtle">
                <p className="text-[12px] font-black text-text-primary uppercase tracking-tight truncate">{user?.name || user?.email?.split('@')[0] || 'Agent 101'}</p>
                <p className="text-[9px] text-text-muted font-black uppercase tracking-widest mt-1 opacity-60 truncate">{user?.role || 'Agent'}</p>
              </div>
              <div className="p-2 space-y-0.5">
                <button 
                  onClick={() => { window.dispatchEvent(new CustomEvent('open-modal', { detail: 'profile' })); setShowProfileMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[10px] font-black uppercase text-text-muted hover:bg-bg-app hover:text-accent rounded-lg transition-all"
                >
                  <User className="w-4 h-4 shrink-0" /> Profile
                </button>
                <button 
                  onClick={() => { window.dispatchEvent(new CustomEvent('open-modal', { detail: 'settings' })); setShowProfileMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[10px] font-black uppercase text-text-muted hover:bg-bg-app hover:text-accent rounded-lg transition-all"
                >
                  <Settings className="w-4 h-4 shrink-0" /> Account Settings
                </button>
                <button 
                  onClick={() => { window.dispatchEvent(new CustomEvent('open-modal', { detail: 'preferences' })); setShowProfileMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[10px] font-black uppercase text-text-muted hover:bg-bg-app hover:text-accent rounded-lg transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Preferences
                </button>
                <div className="h-px bg-border-subtle my-1" />
                <button
                  onClick={() => { window.dispatchEvent(new CustomEvent('open-modal', { detail: 'signout' })); setShowProfileMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[10px] font-black uppercase text-danger hover:bg-danger/10 rounded-lg transition-all"
                >
                  <LogOut className="w-4 h-4 shrink-0" /> Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </aside>
  );
};
