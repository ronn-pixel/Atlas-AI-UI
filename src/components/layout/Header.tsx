import * as React from 'react';
import { 
  Bell, 
  User, 
  Sun, 
  Moon, 
  Settings, 
  LogOut, 
  Search,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  ShieldCheck,
  Edit2,
  X,
  Check,
  Mail,
  Phone,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Camera,
  LogOut as SignOutIcon,
  Truck,
  FileText,
  Briefcase,
  ChevronRight,
  Loader2,
  History,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '@/app/ThemeContext';
import { cn } from '@/utils/cn';
import { AvatarIcon } from '@/components/ui/AvatarIcon';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/store/authStore';
import { useSearchStore } from '@/store/searchStore';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { generateMembers, generateVendors, generateClaims, generateCases, generatePlans } from '@/utils/dummyData';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { 
    searchQuery, 
    setSearchState, 
    searchResults, 
    searchHistory, 
    addToHistory,
    pendingSearchQuery,
    setPendingSearch,
    clearHistory,
    clearHistoryByScope
  } = useSearchStore();

  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [localSearchQuery, setLocalSearchQuery] = React.useState(searchQuery);
  const [derivedSearchResults, setDerivedSearchResults] = React.useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const [showHistory, setShowHistory] = React.useState(false);
  const [showHistoryModal, setShowHistoryModal] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  const [showSearchModal, setShowSearchModal] = React.useState(false);

  const groupedHistory = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups: { [key: string]: typeof searchHistory } = {
      Today: [],
      Yesterday: [],
      'Previous Dates': []
    };

    const sortedHistory = [...searchHistory].sort((a, b) => b.timestamp - a.timestamp);

    sortedHistory.forEach(item => {
      const date = new Date(item.timestamp);
      date.setHours(0, 0, 0, 0);

      if (date.getTime() === today.getTime()) {
        groups.Today.push(item);
      } else if (date.getTime() === yesterday.getTime()) {
        groups.Yesterday.push(item);
      } else {
        groups['Previous Dates'].push(item);
      }
    });

    return Object.entries(groups).filter(([_, items]) => items.length > 0);
  }, [searchHistory]);

  // Auto-restore search after login if there was a pending query
  React.useEffect(() => {
    if (user && pendingSearchQuery) {
      setLocalSearchQuery(pendingSearchQuery);
      setPendingSearch(null); // Clear it
      setShowSearchModal(true);
    }
  }, [user, pendingSearchQuery, setPendingSearch]);

  const searchRef = React.useRef<HTMLDivElement>(null);
  const notificationRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);

  // Initialize data for search (memoized)
  const masterData = React.useMemo(() => ({
    members: generateMembers(150),
    vendors: generateVendors(120),
    claims: generateClaims(100),
    plans: generatePlans(50),
    cases: generateCases(80)
  }), []);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  React.useEffect(() => {
    if (localSearchQuery.length < 2) {
      setDerivedSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const q = localSearchQuery.toLowerCase();
      const results: any[] = [];

      // Search Members
      masterData.members.forEach(m => {
        if (m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)) {
          results.push({ ...m, type: 'Member', icon: User, path: '/clients' });
        }
      });

      // Search Vendors
      masterData.vendors.forEach(v => {
        if (v.name.toLowerCase().includes(q) || v.id.toLowerCase().includes(q)) {
          results.push({ ...v, type: 'Vendor', icon: Truck, path: '/vendors' });
        }
      });

      // Search Claims
      masterData.claims.forEach(c => {
        if (c.id.toLowerCase().includes(q) || c.member.toLowerCase().includes(q)) {
          results.push({ ...c, name: c.id, type: 'Claim', icon: FileText, path: '/claims' });
        }
      });

      // Search Cases
      masterData.cases.forEach(ca => {
        if (ca.id.toLowerCase().includes(q) || ca.memberName.toLowerCase().includes(q)) {
          results.push({ ...ca, name: ca.id, subName: ca.memberName, type: 'Case', icon: Briefcase, path: '/cases' });
        }
      });

      // Search Plans
      masterData.plans.forEach(p => {
        if (p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)) {
          results.push({ ...p, type: 'Plan', icon: Palette, path: '/plans' });
        }
      });

      setDerivedSearchResults(results); 
      setShowSearchResults(true);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchQuery, masterData]);

  const handleResultClick = (result: any) => {
    const queryToSync = result.name || result.id;
    setLocalSearchQuery(queryToSync);
    setSearchState(queryToSync, derivedSearchResults);
    addToHistory(queryToSync);
    
    navigate(result.path);
    setShowSearchResults(false);
    setShowSearchModal(false);
    setShowHistoryModal(false);
  };

  const handleSearchSubmit = (e?: React.FormEvent, queryToUse?: string) => {
    if (e) e.preventDefault();
    const finalQuery = queryToUse || localSearchQuery;
    
    if (finalQuery.length >= 2) {
      if (!user) {
        setPendingSearch(finalQuery);
        navigate('/');
        return;
      }

      let resultsToUse = derivedSearchResults;

      if (queryToUse) {
        setLocalSearchQuery(queryToUse);
        // Instant search for history items
        const q = queryToUse.toLowerCase();
        const syncResults: any[] = [];
        masterData.members.forEach(m => {
          if (m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)) {
            syncResults.push({ ...m, type: 'Member', icon: User, path: '/clients' });
          }
        });
        masterData.vendors.forEach(v => {
          if (v.name.toLowerCase().includes(q) || v.id.toLowerCase().includes(q)) {
            syncResults.push({ ...v, type: 'Vendor', icon: Truck, path: '/vendors' });
          }
        });
        masterData.claims.forEach(c => {
          if (c.id.toLowerCase().includes(q) || c.member.toLowerCase().includes(q)) {
            syncResults.push({ ...c, name: c.id, type: 'Claim', icon: FileText, path: '/claims' });
          }
        });
        masterData.cases.forEach(ca => {
          if (ca.id.toLowerCase().includes(q) || ca.memberName.toLowerCase().includes(q)) {
            syncResults.push({ ...ca, name: ca.id, subName: ca.memberName, type: 'Case', icon: Briefcase, path: '/cases' });
          }
        });
        masterData.plans.forEach(p => {
          if (p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)) {
            syncResults.push({ ...p, type: 'Plan', icon: Palette, path: '/plans' });
          }
        });
        resultsToUse = syncResults;
        
        // If queryToUse resulted in a specific path (history item navigation)
        const firstMatch = resultsToUse[0];
        if (firstMatch) {
          navigate(firstMatch.path);
          setShowSearchResults(false);
          setShowHistory(false);
          setShowSearchModal(false);
          setShowHistoryModal(false);
          addToHistory(queryToUse);
          setSearchState(queryToUse, resultsToUse);
          return;
        }
      }
      
      setShowSearchResults(false);
      setShowHistory(false);
      setShowSearchModal(true);
      addToHistory(finalQuery);
      setSearchState(finalQuery, resultsToUse);
    }
  };

  const handleRestoreSearch = () => {
    if (searchQuery) {
      setLocalSearchQuery(searchQuery);
      setDerivedSearchResults(searchResults);
      setShowSearchModal(true);
    }
  };

  const [activeModal, setActiveModal] = React.useState<'profile' | 'edit' | 'settings' | 'preferences' | 'signout' | null>(null);

  const [notifications, setNotifications] = React.useState([
    { id: 1, title: 'New Case Assigned', desc: 'Case #CASE-2026-1024 initialized', time: '2m ago', type: 'alert', read: false },
    { id: 2, title: 'Vendor Response', desc: 'Valenz responded to claim inquiry', time: '15m ago', type: 'message', read: false },
    { id: 3, title: 'System Alert', desc: 'Nightly batch processing complete', time: '1h ago', type: 'system', read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMouseLeaveProfile = () => {
    setShowProfileMenu(false);
  };

  const handleMouseLeaveNotifications = () => {
    setShowNotifications(false);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <header className="h-16 bg-bg-app flex items-center justify-between px-8 z-30 transition-colors duration-300 border-b border-border-subtle">
      <div className="flex items-center gap-4 flex-1">
        <div 
          className="flex items-center gap-3 w-full max-w-lg group relative" 
          ref={searchRef}
          onMouseLeave={() => {
            setShowSearchResults(false);
            setShowHistory(false);
          }}
        >
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
              {isSearching ? <Loader2 className="w-4 h-4 text-accent animate-spin" /> : <Search className="w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />}
            </div>
            <input 
              type="text" 
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onFocus={() => {
                if (localSearchQuery.length >= 2) {
                  setShowSearchResults(true);
                } else if (searchHistory.length > 0) {
                  setShowHistory(true);
                }
              }}
              placeholder="Global search (Members, Vendors, Cases...)"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl pl-12 pr-4 h-11 text-[11px] font-black uppercase tracking-widest focus:ring-4 focus:ring-accent/10 focus:border-accent/40 outline-none transition-all text-text-primary placeholder:text-text-muted/60"
            />
            
            <AnimatePresence>
              {showHistory && searchHistory.length > 0 && !showSearchResults && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute left-0 top-full mt-3 w-full bg-card-bg rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border-subtle overflow-hidden z-50 p-2"
              >
                <div className="px-4 py-3 flex items-center justify-between border-b border-border-subtle mb-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Recent Search Intelligence</span>
                </div>
                
                <div className="max-h-[40vh] overflow-y-auto no-scrollbar">
                  {groupedHistory.slice(0, 5).map(([groupName, items]) => (
                    <div key={groupName} className="mb-2 last:mb-0">
                      <div className="px-4 py-2 bg-slate-50/50 dark:bg-slate-900/30">
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-text-muted/60">{groupName}</span>
                      </div>
                      {items.slice(0, 5).map((item, idx) => (
                        <button
                          key={`${groupName}-${idx}`}
                          type="button"
                          onClick={() => handleSearchSubmit(undefined, item.query)}
                          className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-all group text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-bg-app flex items-center justify-center text-text-muted/60 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                            <Search className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[11px] font-black text-text-primary uppercase tracking-tight flex-1">{item.query}</span>
                          <ChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="px-4 py-3 border-t border-border-subtle mt-1 text-center">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowHistoryModal(true);
                      setShowHistory(false);
                    }}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-accent hover:underline transition-colors"
                  >
                    View All History
                  </button>
                </div>
              </motion.div>
            )}

            {showSearchResults && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute left-0 top-full mt-3 w-full bg-card-bg rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border-subtle overflow-hidden z-50 p-2"
              >
                {derivedSearchResults.length > 0 ? (
                  <div className="space-y-1">
                    <div className="px-4 py-2 flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Direct Search Outcomes</span>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent/50">{derivedSearchResults.length} Records</span>
                    </div>
                    {derivedSearchResults.slice(0, 8).map((result, idx) => (
                      <button
                        key={`${result.type}-${result.id}-${idx}`}
                        type="button"
                        onClick={() => handleResultClick(result)}
                        className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-all group text-left"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform">
                          <result.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                             <span className="text-[12px] font-black text-text-primary uppercase tracking-tight truncate">{result.name}</span>
                             <Badge className={cn("text-[7px] font-black border-none px-2 py-0.5 uppercase tracking-widest", 
                               result.type === 'Member' ? 'bg-blue-500/10 text-blue-500' : 
                               result.type === 'Vendor' ? 'bg-purple-500/10 text-purple-500' :
                               result.type === 'Claim' ? 'bg-amber-500/10 text-amber-500' : 
                               result.type === 'Plan' ? 'bg-orange-500/10 text-orange-500' :
                               'bg-emerald-500/10 text-emerald-500'
                             )}>
                               {result.type}
                             </Badge>
                          </div>
                          <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest truncate mt-0.5">ID: {result.id}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                    {derivedSearchResults.length > 8 && (
                      <button 
                        type="button"
                        onClick={() => handleSearchSubmit()}
                        className="w-full py-3 text-center text-[10px] font-black uppercase tracking-widest text-accent hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-all border-t border-border-subtle"
                      >
                        View all matching records
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="p-10 text-center">
                    <Search className="w-8 h-8 text-text-muted/20 mx-auto mb-4" />
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">No Intelligence Matches Found</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          </form>
        </div>
      </div>


      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-card-bg/50 text-text-muted transition-all active:scale-95"
        >
          {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
        </button>

        {/* NOTIFICATIONS */}
        <div 
          className="relative" 
          onMouseLeave={handleMouseLeaveNotifications}
        >
          <button 
            onMouseEnter={() => setShowNotifications(true)}
            className="p-2.5 rounded-xl hover:bg-card-bg/50 text-text-muted relative transition-all active:scale-95"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-bg-app" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-card-bg rounded-3xl shadow-2xl overflow-hidden border border-border-subtle"
              >
                <div className="p-5 flex justify-between items-center bg-bg-app">
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Unread Alerts ({notifications.length})</span>
                  <button onClick={() => setNotifications([])} className="text-[10px] text-accent font-black uppercase tracking-widest hover:underline">Clear all</button>
                </div>
                <div className="max-h-96 overflow-y-auto no-scrollbar">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-border-subtle">
                      {notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => markAsRead(n.id)}
                          className="p-5 hover:bg-bg-app transition-all cursor-pointer group"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-[11px] font-black text-text-primary uppercase tracking-tight">{n.title}</h4>
                            <span className="text-[8px] text-text-muted opacity-40 uppercase font-black tabular-nums">{n.time}</span>
                          </div>
                          <p className="text-[10px] text-text-muted font-bold leading-relaxed">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                       <ShieldCheck className="w-8 h-8 text-text-muted/20 mx-auto mb-4" />
                       <p className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-relaxed opacity-40">System Secure<br/>Zero Operational Alerts</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-6 w-px bg-border-subtle mx-1" />

        {/* USER PROFILE */}
        <div 
          className="relative"
          onMouseLeave={handleMouseLeaveProfile}
        >
          <button 
            onMouseEnter={() => setShowProfileMenu(true)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-card-bg/50 transition-all group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-black text-text-primary leading-none uppercase">{user?.name}</p>
              <p className="text-[9px] text-text-muted font-black uppercase tracking-widest mt-1.5 opacity-50">{user?.role}</p>
            </div>
            <AvatarIcon 
              gender={user?.gender}
              seedString={user?.name || user?.email}
              className="w-10 h-10 rounded-xl overflow-hidden shadow-soft ring-2 ring-transparent group-hover:ring-accent/20 transition-all"
            />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-64 bg-card-bg rounded-3xl shadow-2xl overflow-hidden border border-border-subtle"
              >
                <div className="p-6 bg-bg-app">
                  <p className="text-[11px] font-black text-text-primary uppercase tracking-tight">{user?.name}</p>
                  <p className="text-[9px] text-text-muted font-black uppercase tracking-widest mt-1 opacity-60 truncate">{user?.email}</p>
                </div>
                <div className="p-3 space-y-1">
                  <button 
                    onClick={() => { setActiveModal('profile'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase text-text-muted hover:bg-bg-app hover:text-accent rounded-2xl transition-all"
                  >
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button 
                    onClick={() => { setActiveModal('settings'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase text-text-muted hover:bg-bg-app hover:text-accent rounded-2xl transition-all"
                  >
                    <Settings className="w-4 h-4" /> Account Settings
                  </button>
                  <button 
                    onClick={() => { setActiveModal('preferences'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase text-text-muted hover:bg-bg-app hover:text-accent rounded-2xl transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Preferences
                  </button>
                  <div className="h-px bg-border-subtle my-2" />
                  <button
                    onClick={() => { setActiveModal('signout'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-4 text-[11px] font-black uppercase text-danger hover:bg-danger/10 rounded-2xl transition-all"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {activeModal === 'profile' && <ProfileModal onClose={closeModal} onEdit={() => setActiveModal('edit')} />}
        {activeModal === 'edit' && <EditProfileModal onClose={closeModal} />}
        {activeModal === 'settings' && <AccountSettingsModal onClose={closeModal} />}
        {activeModal === 'preferences' && <PreferencesModal onClose={closeModal} />}
        {activeModal === 'signout' && <SignOutModal onClose={closeModal} onConfirm={logout} />}
        {showSearchModal && (
          <SearchModal 
            onClose={() => setShowSearchModal(false)} 
            results={searchResults} 
            query={searchQuery}
            onResultClick={handleResultClick}
          />
        )}
        {showHistoryModal && (
          <HistoryModal 
            onClose={() => setShowHistoryModal(false)}
            onSelect={(query) => handleSearchSubmit(undefined, query)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

function HistoryModal({ onClose, onSelect }: { onClose: () => void; onSelect: (q: string) => void }) {
  const { searchHistory, clearHistoryByScope } = useSearchStore();
  const [showManageDropdown, setShowManageDropdown] = React.useState(false);

  const groupedHistory = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups: { [key: string]: typeof searchHistory } = {
      Today: [],
      Yesterday: [],
      'Previous Dates': []
    };

    const sortedHistory = [...searchHistory].sort((a, b) => b.timestamp - a.timestamp);

    sortedHistory.forEach(item => {
      const date = new Date(item.timestamp);
      date.setHours(0, 0, 0, 0);

      if (date.getTime() === today.getTime()) {
        groups.Today.push(item);
      } else if (date.getTime() === yesterday.getTime()) {
        groups.Yesterday.push(item);
      } else {
        groups['Previous Dates'].push(item);
      }
    });

    return Object.entries(groups).filter(([_, items]) => items.length > 0);
  }, [searchHistory]);

  return (
    <ModalWrapper 
      title="Search Intelligence Archive" 
      subtitle="Complete Interaction Record" 
      onClose={onClose}
      maxWidth="max-w-xl"
      onMouseLeave={onClose}
      action={
        <div className="relative">
          <button 
            onClick={() => setShowManageDropdown(!showManageDropdown)}
            className="px-4 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-accent transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Manage History
          </button>
          
          <AnimatePresence>
            {showManageDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border-subtle z-[110] overflow-hidden p-2"
                onMouseLeave={() => setShowManageDropdown(false)}
              >
                {[
                  { label: 'Clear Today', scope: 'today' },
                  { label: 'Clear This Week', scope: 'week' },
                  { label: 'Clear This Month', scope: 'month' },
                  { label: 'Clear All', scope: 'all' },
                ].map((option) => (
                  <button
                    key={option.scope}
                    onClick={() => {
                      clearHistoryByScope(option.scope as any);
                      setShowManageDropdown(false);
                      if (option.scope === 'all') onClose();
                    }}
                    className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-muted hover:bg-slate-50 dark:hover:bg-white/5 hover:text-danger rounded-xl transition-all"
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      }
    >
      <div className="space-y-6">
        {searchHistory.length > 0 ? (
          groupedHistory.map(([groupName, items]) => (
            <div key={groupName} className="space-y-3">
              <div className="flex items-center gap-4">
                 <span className="text-[10px] font-black text-text-muted/40 uppercase tracking-[0.4em]">{groupName}</span>
                 <div className="flex-1 h-px bg-slate-100 dark:bg-white/5" />
              </div>
              <div className="grid grid-cols-1 gap-3">
                {items.map((item, idx) => (
                  <button 
                    key={`${groupName}-${idx}`}
                    onClick={() => onSelect(item.query)}
                    className="w-full flex items-center gap-4 p-4 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-800 rounded-2xl border border-transparent hover:border-border-subtle transition-all group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-bg-app flex items-center justify-center text-text-muted/40 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                      <Search className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] font-black text-text-primary uppercase tracking-tight group-hover:text-trust transition-colors">{item.query}</p>
                      <p className="text-[8px] font-black text-text-muted/40 uppercase tracking-widest mt-0.5 tabular-nums">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center space-y-4">
             <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mx-auto text-text-muted/20">
                <History className="w-8 h-8" />
             </div>
             <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em]">No interaction archive found</p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

// --- Profile Modal Components ---

function ModalWrapper({ children, onClose, title, subtitle, action, maxWidth = "max-w-2xl", onMouseLeave }: { children: React.ReactNode; onClose: () => void; title: string; subtitle?: string; action?: React.ReactNode; maxWidth?: string; onMouseLeave?: () => void }) {
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
        onMouseLeave={onMouseLeave}
        className={cn(
          "relative w-full max-h-[90vh] bg-card-bg rounded-xl shadow-2xl overflow-hidden flex flex-col",
          maxWidth
        )}
      >
        <div className="px-10 py-8 border-b border-border-subtle dark:border-white/10 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {action}
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function ProfileModal({ onClose, onEdit }: { onClose: () => void; onEdit: () => void }) {
  const { user } = useAuth();

  return (
    <ModalWrapper 
      title="Operator Profile" 
      subtitle="User Identification Terminal" 
      onClose={onClose}
      action={
        <button 
          onClick={onEdit}
          className="px-4 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-accent transition-colors flex items-center gap-2"
        >
          <Edit2 className="w-3 h-3" />
          Edit Credentials
        </button>
      }
    >
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="relative group">
          <AvatarIcon 
            gender={user?.gender}
            seedString={user?.name || user?.email}
            className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-accent/10"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-widest uppercase">{user?.name}</h3>
          <p className="text-sm font-black text-accent uppercase tracking-[0.3em]">{user?.role}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pt-8 divide-x dark:divide-white/5 divide-slate-100">
          <div className="space-y-1.5 p-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Email Address</span>
            <div className="flex items-center justify-center gap-3 text-[13px] font-bold text-slate-900 dark:text-white">
              <Mail className="w-4 h-4 text-accent" />
              {user?.email}
            </div>
          </div>
          <div className="space-y-1.5 p-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Contact Number</span>
            <div className="flex items-center justify-center gap-3 text-[13px] font-bold text-slate-900 dark:text-white">
              <Phone className="w-4 h-4 text-accent" />
              +1 (555) 012-3456
            </div>
          </div>
          <div className="space-y-1.5 p-4 md:col-span-2 border-t dark:border-white/5 border-slate-100">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Department / Team</span>
            <div className="flex items-center justify-center gap-3 text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-accent" />
              Operations & Case Adjudication
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

function EditProfileModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1500);
  };

  const Field = ({ label, value, type = "text", placeholder }: { label: string; value?: string; type?: string; placeholder?: string }) => (
    <div className="space-y-2">
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</label>
      <div className="relative group">
        <input 
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          className="w-full h-12 bg-white dark:bg-slate-950 border border-border-subtle dark:border-white/10 rounded-xl px-4 text-[11px] font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-accent/20 outline-none transition-all"
        />
      </div>
    </div>
  );

  return (
    <ModalWrapper title="Edit Profile" subtitle="Credential Modification Terminal" onClose={onClose}>
      <div className="space-y-8">
        <div className="flex items-center gap-8 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-border-subtle dark:border-white/5">
          <div className="relative group">
            <AvatarIcon 
              gender={user?.gender}
              seedString={user?.name || user?.email}
              className="w-20 h-20 rounded-2xl overflow-hidden"
            />
            <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center text-white">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Profile Avatar</h4>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">Recommended: 400x400 JPG/PNG</p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" className="h-8 rounded-lg text-[9px] font-black uppercase tracking-widest">Change</Button>
              <Button size="sm" variant="outline" className="h-8 rounded-lg text-[9px] font-black uppercase tracking-widest text-danger border-danger/20 hover:bg-danger/5">Remove</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Field label="First Name" value={user?.name.split(' ')[0]} />
          <Field label="Last Name" value={user?.name.split(' ')[1]} />
          <Field label="Email Address" value={user?.email} type="email" />
          <Field label="Phone Number" value="+1 (555) 012-3456" />
        </div>

        <div className="pt-6 flex gap-4">
          <Button 
             variant="outline" 
             onClick={onClose}
             className="flex-1 h-12 rounded-xl text-[11px] font-black uppercase tracking-widest"
          >
            Cancel
          </Button>
          <Button 
             onClick={handleSave}
             disabled={loading}
             className="flex-1 h-12 bg-accent text-white font-black uppercase text-[11px] tracking-widest rounded-xl shadow-xl shadow-accent/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

function AccountSettingsModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1500);
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
      <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] border-b border-border-subtle dark:border-white/5 pb-2">{title}</h3>
      {children}
    </div>
  );

  return (
    <ModalWrapper title="Account Settings" subtitle="System Authentication Control" onClose={onClose}>
      <div className="space-y-10">
        <Section title="Security Credentials">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 text-slate-500">Username</label>
              <input 
                type="text" 
                defaultValue={user?.email?.split('@')[0]}
                className="w-full h-12 bg-white dark:bg-slate-950 border border-border-subtle dark:border-white/10 rounded-xl px-4 text-[11px] font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              />
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-border-subtle dark:border-white/5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                   <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Security Password</h4>
                   <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Last changed 45 days ago</p>
                </div>
                <Button size="sm" variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest h-8 px-4">Update</Button>
              </div>

              <div className="space-y-4">
                <input type="password" placeholder="Current Password" className="w-full h-10 bg-white dark:bg-slate-950 border border-border-subtle dark:border-white/10 rounded-lg px-4 text-[10px] placeholder:text-slate-300 dark:placeholder:text-slate-700 outline-none focus:ring-1 focus:ring-accent/40" />
                <div className="grid grid-cols-2 gap-4">
                   <input type="password" placeholder="New Password" className="h-10 bg-white dark:bg-slate-950 border border-border-subtle dark:border-white/10 rounded-lg px-4 text-[10px] placeholder:text-slate-300 dark:placeholder:text-slate-700 outline-none focus:ring-1 focus:ring-accent/40" />
                   <input type="password" placeholder="Confirm New Password" className="h-10 bg-white dark:bg-slate-950 border border-border-subtle dark:border-white/10 rounded-lg px-4 text-[10px] placeholder:text-slate-300 dark:placeholder:text-slate-700 outline-none focus:ring-1 focus:ring-accent/40" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Active Sessions">
           <div className="space-y-3">
              {[
                { device: 'MacBook Pro 16"', location: 'New York, USA', current: true },
                { device: 'iPhone 15 Pro', location: 'New York, USA', current: false }
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-900/20 rounded-2xl border border-border-subtle dark:border-white/5">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400">
                         {session.device.includes('iPhone') ? <Smartphone className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                      </div>
                      <div>
                         <p className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white">{session.device}</p>
                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{session.location}</p>
                      </div>
                   </div>
                   {session.current ? (
                     <Badge className="bg-success/10 text-success border-none text-[8px] tracking-widest font-black uppercase">Current Session</Badge>
                   ) : (
                     <button className="text-[9px] font-black uppercase tracking-widest text-danger hover:underline">Revoke</button>
                   )}
                </div>
              ))}
           </div>
        </Section>

        <div className="pt-6 flex gap-4">
          <Button variant="outline" onClick={onClose} className="flex-1 h-12 rounded-xl text-[11px] font-black uppercase tracking-widest">Cancel</Button>
          <Button onClick={handleSave} disabled={loading} className="flex-1 h-12 bg-accent text-white font-black uppercase text-[11px] tracking-widest rounded-xl shadow-xl shadow-accent/20">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

function PreferencesModal({ onClose }: { onClose: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = React.useState({
    email: true,
    system: true,
    marketing: false
  });

  const Toggle = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-900/20 rounded-2xl border border-border-subtle dark:border-white/5">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300">{label}</span>
      <button 
        onClick={onClick}
        className={cn(
          "relative w-10 h-5 rounded-full transition-colors",
          active ? "bg-accent" : "bg-slate-200 dark:bg-slate-800"
        )}
      >
        <motion.div 
          animate={{ x: active ? 22 : 2 }}
          className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm"
        />
      </button>
    </div>
  );

  return (
    <ModalWrapper title="System Preferences" subtitle="Environment & Display Configuration" onClose={onClose}>
      <div className="space-y-10">
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] border-b border-border-subtle dark:border-white/5 pb-2">Visual Theme</h3>
          <div className="grid grid-cols-2 gap-4">
             <button 
               onClick={() => theme !== 'light' && toggleTheme()}
               className={cn(
                 "p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group",
                 theme === 'light' ? "border-accent bg-accent/5" : "border-border-subtle dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/20 grayscale opacity-40 hover:opacity-100 hover:grayscale-0"
               )}
             >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400">
                   <Sun className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Light Mode</span>
             </button>
             <button 
               onClick={() => theme !== 'dark' && toggleTheme()}
               className={cn(
                 "p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group",
                 theme === 'dark' ? "border-accent bg-accent/5" : "border-border-subtle dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/20 grayscale opacity-40 hover:opacity-100 hover:grayscale-0"
               )}
             >
                <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-slate-600">
                   <Moon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Dark Mode</span>
             </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] border-b border-border-subtle dark:border-white/5 pb-2">Notification Routing</h3>
          <div className="space-y-2">
            <Toggle label="Email Notifications" active={notifications.email} onClick={() => setNotifications({...notifications, email: !notifications.email})} />
            <Toggle label="System Alerts" active={notifications.system} onClick={() => setNotifications({...notifications, system: !notifications.system})} />
            <Toggle label="Secondary Communications" active={notifications.marketing} onClick={() => setNotifications({...notifications, marketing: !notifications.marketing})} />
          </div>
        </div>

        <div className="pt-6">
          <Button 
            onClick={onClose}
            className="w-full h-14 bg-accent text-white font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl shadow-xl shadow-accent/20"
          >
            Apply Preferences
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

function SignOutModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
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
        className="relative w-full max-w-md bg-card-bg rounded-[2rem] shadow-2xl overflow-hidden p-10 text-center"
      >
        <div className="w-20 h-20 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-8">
           <AlertTriangle className="w-10 h-10" />
        </div>
        
        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-widest leading-tight">Session Termination</h3>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-4 mb-10 leading-relaxed">
          Are you sure you want to sign out of the manifest system?
        </p>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={onConfirm}
            className="h-14 bg-danger hover:bg-danger/90 text-white font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl shadow-xl shadow-danger/20"
          >
            Sign Out
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="h-14 border-border-subtle font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl"
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

function SearchModal({ onClose, results, query, onResultClick }: { onClose: () => void; results: any[]; query: string; onResultClick: (result: any) => void }) {
  return (
    <ModalWrapper 
      title="Search Results" 
      subtitle={`Search outcomes for: "${query}"`} 
      onClose={onClose}
      maxWidth="max-w-4xl"
      onMouseLeave={onClose}
    >
      <div className="space-y-8">
        {results.length > 0 ? (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-bg-app border-b border-border-subtle">
                  <th className="px-6 py-4 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] text-left align-middle whitespace-nowrap">Name / Record Title</th>
                  <th className="px-6 py-4 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] text-left align-middle whitespace-nowrap">Type</th>
                  <th className="px-6 py-4 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] text-left align-middle whitespace-nowrap">Module Source</th>
                  <th className="px-6 py-4 font-black uppercase tracking-[0.3em] text-text-muted text-[10px] text-left align-middle whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {results.map((item, i) => (
                  <tr 
                    key={`${item.type}-${item.id}-${i}`}
                    onClick={() => onResultClick(item)}
                    className="hover:bg-bg-app transition-all duration-300 group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-bg-app flex items-center justify-center shrink-0 border border-border-subtle group-hover:border-accent group-hover:text-accent transition-colors">
                             <item.icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                             <span className="font-black text-text-primary dark:text-white uppercase tracking-tight text-[13px]">{item.name}</span>
                             <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest tabular-nums">ID: {item.id}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <Badge className={cn("text-[8px] font-black border-none px-2.5 py-0.5 uppercase tracking-widest", 
                         item.type === 'Member' ? 'bg-blue-500/10 text-blue-500' : 
                         item.type === 'Vendor' ? 'bg-purple-500/10 text-purple-500' :
                         item.type === 'Claim' ? 'bg-amber-500/10 text-amber-500' : 
                         item.type === 'Plan' ? 'bg-orange-500/10 text-orange-500' :
                         'bg-emerald-500/10 text-emerald-500'
                       )}>
                         {item.type}
                       </Badge>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">
                          {item.type} Module → {item.type === 'Claim' || item.type === 'Case' ? 'Detail' : 'Profile'} Page
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       {item.status ? (
                         <div className="flex items-center gap-2">
                            <div className={cn("w-1.5 h-1.5 rounded-full", 
                              item.status === 'Active' || item.status === 'Verified' ? 'bg-success' : 'bg-accent'
                            )} />
                            <span className="text-[9px] font-black text-text-primary dark:text-white uppercase tracking-widest">{item.status}</span>
                         </div>
                       ) : (
                         <span className="text-text-muted opacity-40">—</span>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center">
             <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-border-subtle dark:border-white/5">
                <Search className="w-10 h-10 text-text-muted/20" />
             </div>
             <h4 className="text-xl font-black text-text-primary dark:text-white uppercase tracking-widest">No Matches Identified</h4>
             <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mt-4 max-w-xs mx-auto leading-relaxed">
                The intelligence engine could not locate any records matching your specific search parameters.
             </p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

