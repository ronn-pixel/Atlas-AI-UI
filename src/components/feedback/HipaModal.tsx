import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Lock, X, Check, HelpCircle, ShieldAlert, ChevronRight, Search, Activity, User, Briefcase, FileSearch, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HipaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (method: string) => void;
  actionType?: 'Edit' | 'Delete' | 'View' | null;
}

const IDENTIFIERS = [
  "Member ID",
  "Full Name",
  "Date of Birth",
  "Address or ZIP Code",
  "Last 4 digits of SSN",
  "Phone number or email on file"
];

type VerificationMode = 'Member' | 'Provider' | 'Authorized Person' | 'Research';

export const HipaModal = ({ isOpen, onClose, onVerify, actionType }: HipaModalProps) => {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState<VerificationMode>('Member');
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  
  const [providerFields, setProviderFields] = React.useState({
    name: '',
    npi: '',
    tin: ''
  });

  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setMode('Member');
      setSelectedIds([]);
      setProviderFields({ name: '', npi: '', tin: '' });
      setIsVerifying(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleId = (idName: string) => {
    if (selectedIds.includes(idName)) {
      setSelectedIds(selectedIds.filter(i => i !== idName));
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, idName]);
      }
    }
  };

  const isFormValid = () => {
    if (mode === 'Research') return true;
    if (mode === 'Provider') {
      if (!providerFields.name || !providerFields.npi || !providerFields.tin) return false;
      if (selectedIds.length !== 3) return false;
      return true;
    }
    return selectedIds.length === 3;
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        onVerify(mode);
      }, 1500);
    }, 1500);
  };

  const handleCancelClick = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-[760px] bg-white dark:bg-[#111827] rounded-xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
      >
        {/* Header Section */}
        <div className="px-10 py-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/20 shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-danger/10 text-danger flex items-center justify-center shrink-0 shadow-lg shadow-danger/10">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">HIPAA Identity Verification Required</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Please confirm 3 identifiers to access Member PHI</p>
            </div>
          </div>
          <button 
            disabled={isVerifying || isSuccess}
            onClick={handleCancelClick} 
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center shrink-0 disabled:opacity-50 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 flex flex-col h-[520px]">
          {isSuccess ? (
            <div className="text-center m-auto animate-in zoom-in duration-500">
               <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success mx-auto mb-4 shadow-2xl shadow-success/10">
                  <Check className="w-8 h-8" />
               </div>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Access Granted</h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3">Authorization sequence finalized</p>
            </div>
          ) : isVerifying ? (
            <div className="text-center m-auto">
               <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4 shadow-2xl shadow-accent/10">
                  <Loader2 className="w-8 h-8 animate-spin" />
               </div>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Verifying Identity</h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3">Cross-referencing enterprise identity</p>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-500 flex flex-col h-full">
              
              {/* Mode Selector */}
              <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl shrink-0">
                {(['Member', 'Provider', 'Authorized Person', 'Research'] as const).map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setMode(option);
                      setSelectedIds([]);
                    }}
                    className={cn(
                      "flex-1 py-2 px-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-center leading-tight whitespace-nowrap",
                      mode === option 
                        ? "bg-white dark:bg-slate-700 shadow-sm text-accent" 
                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {mode === 'Research' && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-white/10 text-center space-y-4">
                  <FileSearch className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight leading-relaxed">
                    Research Mode: No HIPAA verification required. This access will not be auto-generated in notes.
                  </p>
                </div>
              )}

              {mode !== 'Research' && (
                <div className="space-y-4">
                  {mode === 'Provider' && (
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <User className="w-4 h-4" /> Provider Information *
                      </h4>
                      <div className="space-y-2">
                        <input 
                          type="text"
                          placeholder="Enter provider name"
                          value={providerFields.name}
                          onChange={e => setProviderFields({...providerFields, name: e.target.value})}
                          className="h-10 w-full px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-[11px] font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text"
                            placeholder="Enter NPI number"
                            value={providerFields.npi}
                            onChange={e => setProviderFields({...providerFields, npi: e.target.value})}
                            className="h-10 w-full px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-[11px] font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                          />
                          <input 
                            type="text"
                            placeholder="Enter TIN"
                            value={providerFields.tin}
                            onChange={e => setProviderFields({...providerFields, tin: e.target.value})}
                            className="h-10 w-full px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-[11px] font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={cn("space-y-3 border-slate-100 dark:border-white/5", mode === 'Provider' ? "border-t pt-3" : "")}>
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Select 3 Identifiers to Verify *
                      </h4>
                      <div className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-xl">
                        <span className="text-[9px] font-black uppercase tracking-widest text-accent tabular-nums">
                          {selectedIds.length}/3 selected • {selectedIds.length}/3 verified
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {IDENTIFIERS.map(idr => {
                        const isSelected = selectedIds.includes(idr);
                        return (
                          <div 
                            key={idr}
                            onClick={() => handleToggleId(idr)}
                            className={cn(
                              "flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer select-none",
                              isSelected 
                                ? "bg-accent/5 border-accent shadow-sm" 
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:border-accent/40"
                            )}
                          >
                            <div className={cn(
                              "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                              isSelected ? "bg-accent border-accent text-white" : "border-slate-300 dark:border-slate-600 bg-transparent"
                            )}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span className={cn(
                              "text-[11px] font-bold tracking-tight leading-tight",
                              isSelected ? "text-accent dark:text-accent" : "text-slate-700 dark:text-slate-300"
                            )}>
                              {idr}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-500/10 p-3 rounded-xl border border-amber-200 dark:border-amber-500/20 mt-auto">
                    <p className="text-[9px] font-bold text-amber-700 dark:text-amber-400 leading-relaxed uppercase tracking-widest">
                      Note: You must select and verify exactly 3 identifiers before accessing Protected Health Information (PHI).
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!isSuccess && !isVerifying && (
          <div className="px-10 py-8 border-t border-slate-100 dark:border-white/5 flex gap-4 bg-slate-50/50 dark:bg-slate-900/20 shrink-0">
            <Button 
              variant="outline" 
              onClick={handleCancelClick} 
              className="h-14 flex-1 border-slate-200 dark:border-white/10 text-[11px] font-black uppercase tracking-widest rounded-2xl"
            >
              Cancel
            </Button>
            <Button 
               disabled={!isFormValid()}
               onClick={handleVerify}
               className="h-14 flex-1 bg-accent hover:bg-accent/90 focus:bg-accent/90 text-white font-black uppercase text-[11px] tracking-widest rounded-2xl shadow-xl shadow-accent/20 border-none flex items-center justify-center gap-3 transition-opacity disabled:opacity-50"
            >
              Authorize & Access{mode === 'Research' ? '' : ' Data'}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
