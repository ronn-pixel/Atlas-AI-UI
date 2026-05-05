import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Lock, X, Check, HelpCircle, ShieldAlert, ChevronRight, Search, Activity, User, Briefcase, FileSearch, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { PROVIDERS } from '@/utils/dummyData';
import { motion, AnimatePresence } from 'motion/react';

interface HipaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (method: string) => void;
  actionType?: 'Edit' | 'Delete' | null;
}

export const HipaModal = ({ isOpen, onClose, onVerify, actionType }: HipaModalProps) => {
  const [method, setMethod] = React.useState<'password' | 'otp' | null>(null);
  const [value, setValue] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setMethod(null);
      setValue('');
      setIsVerifying(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate verification delay
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      
      // Simulate audit log
      const auditLog = {
        user: "Current User", // In a real app, this would be the logged-in user
        action: actionType,
        timestamp: new Date().toISOString(),
        method: method === 'password' ? 'Password' : 'OTP'
      };
      console.log('Audit Log Created:', auditLog);

      setTimeout(() => {
        onVerify(method === 'password' ? 'Password' : 'OTP');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-white dark:bg-[#111827] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/10"
      >
        {/* Header Section */}
        <div className="px-10 py-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/20">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-danger/10 text-danger flex items-center justify-center shrink-0 shadow-lg shadow-danger/10">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Access Verification</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Identity Confirmation Required</p>
            </div>
          </div>
          <button 
            disabled={isVerifying}
            onClick={onClose} 
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-10 space-y-8">
          {isSuccess ? (
            <div className="text-center py-12 animate-in zoom-in duration-500">
               <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-success mx-auto mb-6 shadow-2xl shadow-success/10">
                  <Check className="w-10 h-10" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Verification successful</h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-4">Authorization sequence finalized</p>
            </div>
          ) : isVerifying ? (
            <div className="text-center py-12">
               <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-6 shadow-2xl shadow-accent/10">
                  <Loader2 className="w-10 h-10 animate-spin" />
               </div>
               <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest animate-pulse">Checking Credentials</h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-4">Cross-referencing enterprise identity</p>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-white/5 text-center">
                <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">“For security reasons, please verify your identity”</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMethod('password')}
                  className={cn(
                    "p-6 rounded-2xl border-2 transition-all group flex flex-col items-center gap-3",
                    method === 'password' ? "bg-accent/5 border-accent shadow-xl shadow-accent/5" : "bg-white dark:bg-slate-900 border-border-subtle dark:border-white/5 hover:border-accent/30"
                  )}
                >
                  <Lock className={cn("w-6 h-6", method === 'password' ? "text-accent" : "text-text-muted group-hover:text-accent")} />
                  <span className={cn("text-[10px] font-black uppercase tracking-widest", method === 'password' ? "text-accent" : "text-text-muted")}>Password</span>
                </button>
                <button
                  onClick={() => setMethod('otp')}
                  className={cn(
                    "p-6 rounded-2xl border-2 transition-all group flex flex-col items-center gap-3",
                    method === 'otp' ? "bg-accent/5 border-accent shadow-xl shadow-accent/5" : "bg-white dark:bg-slate-900 border-border-subtle dark:border-white/5 hover:border-accent/30"
                  )}
                >
                  <Activity className={cn("w-6 h-6", method === 'otp' ? "text-accent" : "text-text-muted group-hover:text-accent")} />
                  <span className={cn("text-[10px] font-black uppercase tracking-widest", method === 'otp' ? "text-accent" : "text-text-muted")}>OTP Code</span>
                </button>
              </div>

              <AnimatePresence>
                {method && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                      {method === 'password' ? 'User Identity Secret' : 'Verification Token'}
                    </label>
                    <input 
                      type={method === 'password' ? 'password' : 'text'}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder={method === 'password' ? 'Enter corporate password' : 'Enter 6-digit OTP'}
                      className="h-12 w-full px-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 transition-all font-mono"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!isSuccess && !isVerifying && (
          <div className="px-10 py-8 border-t border-slate-100 dark:border-white/5 flex gap-4 bg-slate-50/50 dark:bg-slate-900/20">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="h-14 flex-1 border-slate-200 dark:border-white/10 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl"
            >
              Cancel Access
            </Button>
            <Button 
              disabled={!method || !value}
              onClick={handleVerify}
              className="h-14 flex-1 bg-accent hover:bg-accent/90 text-white font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl shadow-xl shadow-accent/20 border-none flex items-center justify-center gap-3"
            >
              Verify Identity
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};