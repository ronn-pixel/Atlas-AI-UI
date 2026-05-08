import React from 'react';
import { Lock, X, KeySquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/utils/cn';

interface SimpleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  actionType: 'Edit' | 'Delete' | null;
}

export const SimpleAuthModal = ({ isOpen, onClose, onVerify, actionType }: SimpleAuthModalProps) => {
  const [method, setMethod] = React.useState<'password' | 'otp'>('password');
  const [password, setPassword] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setMethod('password');
      setPassword('');
      setOtp('');
      setIsVerifying(false);
    }
  }, [isOpen]);

  const handleVerify = () => {
    if ((method === 'password' && !password) || (method === 'otp' && !otp)) return;
    
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerify();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-sm bg-card-bg rounded-lg shadow-2xl border border-border-subtle overflow-hidden flex flex-col"
      >
        <div className="px-6 py-4 flex items-center justify-between border-b border-border-subtle bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-bg-app border border-border-subtle flex items-center justify-center text-text-muted">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">{actionType} Authentication</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-accent hover:bg-bg-app rounded-md transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex bg-bg-app p-1 rounded-md mb-6 border border-border-subtle">
            <button
              onClick={() => setMethod('password')}
              className={cn(
                "flex-1 py-2 text-[11px] font-black uppercase tracking-widest rounded transition-all",
                method === 'password'
                  ? "bg-white dark:bg-slate-800 shadow text-text-primary"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              Password
            </button>
            <button
              onClick={() => setMethod('otp')}
              className={cn(
                "flex-1 py-2 text-[11px] font-black uppercase tracking-widest rounded transition-all",
                method === 'otp'
                  ? "bg-white dark:bg-slate-800 shadow text-text-primary"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              OTP Code
            </button>
          </div>

          <div className="space-y-4">
            {method === 'password' ? (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Manager Password</label>
                <div className="relative">
                  <KeySquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full h-10 pl-10 pr-4 bg-bg-app border border-border-subtle rounded-md text-[13px] font-semibold text-text-primary focus:border-accent outline-none transition-all placeholder:text-text-muted/50"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">6-Digit OTP</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full h-10 pl-10 pr-4 bg-bg-app border border-border-subtle rounded-md text-[13px] font-semibold text-text-primary focus:border-accent outline-none transition-all tracking-[0.2em]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-border-subtle bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-4 h-9 rounded-md text-[11px] font-black uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={isVerifying || (method === 'password' ? !password : !otp)}
            className="h-9 px-6 bg-accent hover:bg-accent/90 text-white rounded-md text-[11px] font-black uppercase tracking-widest disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {isVerifying ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                VERIFYING...
              </>
            ) : (
              'VERIFY'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
