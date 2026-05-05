import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Lock, ShieldCheck, AlertCircle, Eye, EyeOff, Loader2, Sparkles, Shield, UserCheck } from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/store/authStore';

export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [mode, setMode] = React.useState<'login' | 'signup' | 'forgot'>('login');
  
  const { login, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    // Mimic enterprise verification lag
    await new Promise(resolve => setTimeout(resolve, 800));
    await login(username, password);
    setIsAuthenticating(false);
  };

  const handleOAuth = async (provider: 'google' | 'x') => {
    setIsAuthenticating(true);
    console.log(`Initiating OAuth for ${provider}`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsAuthenticating(false);
    // In a real app, this would redirect or open a popup
  };

  const isFormValid = username.length > 0 && password.length > 0;

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center font-sans overflow-hidden p-6 selection:bg-accent/30">
      {/* ATMOSPHERIC MESH GRADIENT CANVAS (GLASS-DRIVEN) */}
      <div className="fixed inset-0 z-0 bg-slate-900 transition-colors duration-1000">
        <div className="absolute inset-0 opacity-60 mix-blend-overlay">
          <motion.div 
            animate={{ 
              background: [
                'radial-gradient(circle at 20% 30%, #2563eb 0%, transparent 60%)',
                'radial-gradient(circle at 80% 70%, #2563eb 0%, transparent 60%)',
                'radial-gradient(circle at 20% 30%, #2563eb 0%, transparent 60%)'
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
        </div>
        
        {/* Luminous Light Orbs for Enhanced Glass Visibility */}
        <motion.div 
          animate={{ x: [-120, 120, -120], y: [-60, 60, -60], scale: [1, 1.25, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[15%] w-[700px] h-[700px] bg-blue-400/30 blur-[160px] rounded-full"
        />
        <motion.div 
          animate={{ x: [120, -120, 120], y: [60, -60, 60], scale: [1.3, 1, 1.3], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] right-[15%] w-[600px] h-[600px] bg-cyan-400/20 blur-[200px] rounded-full"
        />
        <motion.div 
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/10 blur-[120px]"
        />

        {/* High-Resolution Technical Grid Overlay (Center-focused fade) */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{ 
               maskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
               WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)'
             }}>
          <div className="absolute inset-0 opacity-[0.25]" 
               style={{ backgroundImage: 'linear-gradient(#ffffff0f 1.5px, transparent 1.5px), linear-gradient(90deg, #ffffff0f 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }} />
          <div className="absolute inset-0 opacity-[0.35]" 
               style={{ backgroundImage: 'linear-gradient(#ffffff1a 2px, transparent 2px), linear-gradient(90deg, #ffffff1a 2px, transparent 2px)', backgroundSize: '100px 100px' }} />
        </div>

        {/* MINIMALIST ARCHITECTURAL ABSTRACTS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]">
          {/* Health-Specific: Digital ECG Pulse Wave */}
          <motion.svg 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute top-[40%] right-0 w-full h-[60px] text-blue-400 opacity-30"
            viewBox="0 0 1000 100"
          >
            <path 
              d="M0 50 L100 50 L120 20 L140 80 L160 50 L260 50 L280 20 L300 80 L320 50 L420 50 L440 20 L460 80 L480 50 L580 50 L600 20 L620 80 L640 50 L740 50 L760 20 L780 80 L800 50 L900 50 L920 20 L940 80 L960 50" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5" 
            />
          </motion.svg>

          {/* Health-Specific: Minimalist Hexagonal Medical Network */}
          <svg className="absolute top-[15%] left-[50%] w-[30%] h-[30%] text-white opacity-20" viewBox="0 0 100 100">
            <path d="M10 30 L30 10 L60 10 L80 30 L80 60 L60 80 L30 80 L10 60 Z" fill="none" stroke="currentColor" strokeWidth="0.1" />
            <circle cx="10" cy="30" r="1" fill="currentColor" />
            <circle cx="80" cy="30" r="1" fill="currentColor" />
            <circle cx="50" cy="50" r="2" fill="none" stroke="currentColor" strokeWidth="0.2" />
            <line x1="10" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="0.05" />
            <line x1="80" cy="30" x2="50" y2="50" stroke="currentColor" strokeWidth="0.05" />
          </svg>

          {/* Abstract Technical Polygons & Wireframes */}
          <motion.svg 
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[10%] w-[400px] h-[400px] text-white opacity-10"
            viewBox="0 0 100 100"
          >
            <path d="M10 10 L90 20 L70 90 Z" fill="none" stroke="currentColor" strokeWidth="0.05" />
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="0.02" />
          </motion.svg>

          <motion.svg 
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] text-white opacity-10"
            viewBox="0 0 100 100"
          >
            <path d="M20 10 L80 10 L90 80 L10 80 Z" fill="none" stroke="currentColor" strokeWidth="0.03" />
            <line x1="20" y1="10" x2="90" y2="80" stroke="currentColor" strokeWidth="0.01" />
            <line x1="80" y1="10" x2="10" y2="80" stroke="currentColor" strokeWidth="0.01" />
          </motion.svg>

          <motion.svg 
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] text-white"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 3" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.05" />
            <path d="M50 2 L50 10 M50 90 L50 98 M2 50 L10 50 M90 50 L98 50" stroke="currentColor" strokeWidth="0.2" />
          </motion.svg>

          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent h-[20%] w-full"
          />

          <svg className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] text-white opacity-40" viewBox="0 0 100 100">
            <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.05" />
            <line x1="10" y1="100" x2="100" y2="10" stroke="currentColor" strokeWidth="0.05" />
            <line x1="20" y1="100" x2="100" y2="20" stroke="currentColor" strokeWidth="0.05" />
            <line x1="-10" y1="100" x2="100" y2="-10" stroke="currentColor" strokeWidth="0.05" />
          </svg>
        </div>
      </div>

      {/* CENTRALIZED OPERATIONAL STACK */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-10 lg:gap-14">
        
        {/* TOP BRANDING & AUTH SECTION (MEETING IN THE MIDDLE) */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-12 lg:gap-16 w-full">
          
          {/* BRANDING PANEL (RESTORED TO LEFT & ALIGNED) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between text-center lg:text-left max-w-xl py-0"
          >
            {/* Top Aligned Identity */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-xl shadow-2xl">
                <ShieldCheck className="text-primary w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tighter">Atlas <span className="text-blue-300">AI</span></h2>
            </div>
            
            {/* Bottom Aligned Hero Text (Increased Size to fill gap) */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[0.9] uppercase">
                HEALTHCARE <br />
                INSURANCE <br />
                <span className="text-white/20">INTELLIGENCE</span>
              </h1>
              <p className="text-white/60 text-base lg:text-xl font-medium leading-relaxed max-w-md">
                Standard secure entry for the Atlas AI operational network. 
                Catastrophic risk orchestration and medical adjudication.
              </p>
            </div>
          </motion.div>

          {/* COMPACT SQUARE AUTHENTICATION BOX (RESTORED TO RIGHT) */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             className="w-full max-w-[480px]"
          >
            <Card className="aspect-square flex flex-col p-8 lg:p-10 bg-white/10 dark:bg-white/5 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_45px_150px_rgba(0,0,0,0.6)] border border-white/20 relative overflow-hidden justify-center group">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 bg-red-500/10 backdrop-blur-md border border-red-500/20 p-4 rounded-xl flex items-center gap-3"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <p className="text-[10px] font-black text-red-100 uppercase tracking-[0.2em]">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {mode === 'login' ? (
                  <div key="login-form" className="space-y-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 px-1">Username:</label>
                        <div className="relative">
                          <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input 
                            type="text" 
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); if (error) clearError(); }}
                            placeholder=""
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-xs font-bold tracking-tight focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/40 outline-none transition-all text-white placeholder:opacity-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 px-1">Password:</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); if (error) clearError(); }}
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-xs font-bold tracking-tight focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/40 outline-none transition-all text-white placeholder:opacity-10"
                            required
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="flex justify-end pr-1">
                          <button 
                            type="button" 
                            onClick={() => setMode('forgot')}
                            className="text-[9px] font-black text-blue-400/60 uppercase tracking-widest hover:text-white transition-colors"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button 
                          type="submit" 
                          disabled={!isFormValid || isAuthenticating}
                          className={cn(
                            "w-full h-14 bg-white text-black hover:bg-gray-100 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] transition-all transform active:scale-95 shadow-2xl",
                            (!isFormValid || isAuthenticating) && "opacity-50 grayscale"
                          )}
                        >
                          {isAuthenticating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                        </Button>
                      </div>

                      <div className="text-center">
                        <button 
                          type="button"
                          onClick={() => setMode('signup')}
                          className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] hover:text-blue-400 transition-all font-sans"
                        >
                          Need Access? <span className="text-blue-400 ml-1">Sign Up</span>
                        </button>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="relative flex items-center gap-3">
                          <div className="h-px bg-white/10 flex-1" />
                          <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] whitespace-nowrap font-sans">OR Authorize with</span>
                          <div className="h-px bg-white/10 flex-1" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button 
                            type="button" 
                            onClick={() => handleOAuth('google')}
                            className="flex items-center justify-center gap-2 h-11 rounded-xl border border-white/5 bg-white/[0.02] text-white hover:bg-white/[0.05] transition-all font-black text-[9px] uppercase tracking-widest font-sans"
                          >
                            <img src="https://www.google.com/favicon.ico" className="w-3.5 h-3.5 grayscale opacity-50" alt="Google" />
                            Google
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleOAuth('x')}
                            className="flex items-center justify-center gap-2 h-11 rounded-xl border border-white/5 bg-white/[0.02] text-white hover:bg-white/[0.05] transition-all font-black text-[9px] uppercase tracking-widest font-sans"
                          >
                            <div className="w-3.5 h-3.5 bg-white/20 rounded-sm flex items-center justify-center">
                              <span className="text-black text-[7px] font-black">X</span>
                            </div>
                            X.com
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : mode === 'signup' ? (
                  <div key="signup-form" className="space-y-8">
                    <div className="text-center">
                      <h4 className="text-2xl font-black text-white tracking-widest uppercase">Registry</h4>
                      <p className="text-[10px] font-black uppercase text-white/30 tracking-widest mt-2">Request Identification</p>
                    </div>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setMode('login'); }}>
                      <input 
                        type="text" 
                        placeholder="Full Name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-xs font-bold text-white focus:border-blue-400/40"
                        required
                      />
                      <input 
                        type="email" 
                        placeholder="Work Email"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-xs font-bold text-white focus:border-blue-400/40"
                        required
                      />
                      <Button className="w-full h-14 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest">
                        Submit
                      </Button>
                      <button 
                        type="button" onClick={() => setMode('login')}
                        className="w-full text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-white"
                      >
                        Return to Sign In
                      </button>
                    </form>
                  </div>
                ) : (
                  <div key="forgot-form" className="space-y-8">
                    <div className="text-center">
                      <h4 className="text-2xl font-black text-white tracking-widest uppercase">Recovery</h4>
                      <p className="text-[10px] font-black uppercase text-white/30 tracking-widest mt-2">Access Reset</p>
                    </div>
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setMode('login'); }}>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                          type="email" 
                          placeholder="Registered Identifier"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-5 text-xs font-bold text-white focus:border-blue-400/40"
                          required
                        />
                      </div>
                      <Button className="w-full h-14 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest">
                        Send Recovery
                      </Button>
                      <button 
                        type="button" onClick={() => setMode('login')}
                        className="w-full text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-white"
                      >
                        Return to Sign In
                      </button>
                    </form>
                  </div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>

        {/* BOTTOM MIDDLE TRUST CAPTIONS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl px-6"
        >
          <div className="flex items-center gap-5 p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
              <Shield className="w-5 h-5 text-white/40" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white/80">Security-First</h4>
              <p className="text-[9px] text-white/30 leading-tight font-bold uppercase tracking-tight">SOC2 Type II & HIPAA certified clusters.</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
              <Sparkles className="w-5 h-5 text-white/40" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white/80">AI Precision</h4>
              <p className="text-[9px] text-white/30 leading-tight font-bold uppercase tracking-tight">Neural claim scoring with 99.8% precision.</p>
            </div>
          </div>
        </motion.div>

        {/* SYSTEM STATUS FOOTER */}
        <div className="pt-6 border-t border-white/5 w-full text-center max-w-4xl opacity-40">
          <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.8em]">
            Operational Node: AAI-7742-X • Security Status: Optimal
          </p>
        </div>
      </div>
    </div>
  );
}
