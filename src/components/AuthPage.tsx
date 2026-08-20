import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  User, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Car,
  AlertCircle,
  KeyRound,
  ArrowRight
} from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
  onNavigate: (view: 'home' | 'login' | 'signup') => void;
}

export default function AuthPage({ initialMode = 'signup', onNavigate }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);

  // States for UX
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Calculate password strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-yellow-500' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-blue-500' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      if (!agreeTerms) {
        setErrorMessage('Please agree to the Terms and Conditions.');
        return;
      }
    }

    setIsLoading(true);

    // Simulate authentication API
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'signup') {
        setSuccessMessage('Account created successfully! Welcome to your Audi Vehicle Vault.');
      } else {
        setSuccessMessage('Welcome back! You have successfully signed in.');
      }

      setTimeout(() => {
        onNavigate('home');
      }, 1600);
    }, 900);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      return;
    }
    setForgotSent(true);
  };

  return (
    <div className="min-h-screen bg-grey-50 flex flex-col justify-between selection:bg-brand-red selection:text-white">
      {/* Top Navigation */}
      <header className="bg-brand-white border-b border-grey-200 px-6 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 bg-brand-black flex items-center justify-center rounded-sm text-brand-white font-black text-sm">
              A
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-brand-black group-hover:text-brand-red transition-colors">
                AudiWindowSticker
              </span>
              <span className="hidden sm:inline-block text-xs text-grey-500 ml-2 font-mono uppercase tracking-wider">
                Portal
              </span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 text-sm font-semibold text-grey-700 hover:text-brand-black transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to VIN Lookup</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-10 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-brand-white rounded-lg shadow-xl shadow-grey-300/40 border border-grey-200 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Panel: Audi Luxury Showcase */}
          <div className="lg:w-5/12 bg-brand-black text-brand-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Graphic */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-grey-800/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-grey-900 border border-grey-800 rounded-full text-xs font-bold uppercase tracking-wider text-brand-white mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
                Audi Member Garage
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight">
                {mode === 'signup' ? 'Access your factory specs & window stickers.' : 'Welcome back to your Audi Garage.'}
              </h2>

              <p className="text-sm text-grey-400 leading-relaxed mb-8">
                {mode === 'signup' 
                  ? 'Join thousands of Audi owners, buyers, and certified dealers who track original Monroney labels, MSRP options, and factory equipment.' 
                  : 'Log in to view your saved window stickers, previously decoded VINs, and real-time factory data sheets.'}
              </p>

              {/* Feature Points */}
              <div className="space-y-4">
                {[
                  {
                    icon: FileText,
                    title: 'Permanent Sticker Storage',
                    desc: 'Instant access to high-res PDF window stickers anytime.'
                  },
                  {
                    icon: Car,
                    title: 'Original Options & Packages',
                    desc: 'Verify Bang & Olufsen, Black Optic, S-Line & Sport packages.'
                  },
                  {
                    icon: ShieldCheck,
                    title: '100% Factory Match',
                    desc: 'Official MSRP data synchronized with factory production logs.'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-grey-900/60 border border-grey-800/80 p-3.5 rounded-sm">
                    <div className="p-2 bg-grey-800 text-brand-white rounded-sm shrink-0">
                      <item.icon size={16} className="text-brand-red" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-brand-white leading-snug">{item.title}</h3>
                      <p className="text-xs text-grey-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Quote & Trust Metric */}
            <div className="mt-8 pt-6 border-t border-grey-800 relative z-10">
              <div className="flex items-center justify-between text-xs text-grey-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-brand-red" /> 45,000+ Stickers Decoded
                </span>
                <span className="font-mono text-grey-500">256-bit Encrypted</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Form */}
          <div className="lg:w-7/12 p-8 sm:p-12 flex flex-col justify-center bg-brand-white">
            
            {/* Mode Switcher Tabs */}
            <div className="flex bg-grey-100 p-1 rounded-sm mb-8">
              <button
                type="button"
                onClick={() => { setMode('signup'); setErrorMessage(null); setSuccessMessage(null); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-sm transition-all ${
                  mode === 'signup' 
                    ? 'bg-brand-white text-brand-black shadow-sm' 
                    : 'text-grey-600 hover:text-brand-black'
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMessage(null); setSuccessMessage(null); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-sm transition-all ${
                  mode === 'login' 
                    ? 'bg-brand-white text-brand-black shadow-sm' 
                    : 'text-grey-600 hover:text-brand-black'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-black">
                {mode === 'signup' ? 'Create your account' : 'Sign in to your account'}
              </h1>
              <p className="text-sm text-grey-600 mt-1">
                {mode === 'signup' 
                  ? 'Save window stickers, track vehicle decodes, and print build sheets.'
                  : 'Enter your credentials to access your vehicle garage.'}
              </p>
            </div>

            {/* Status Messages */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-brand-red rounded-sm flex items-start gap-3 text-sm text-red-800 animate-fadeIn">
                <AlertCircle size={18} className="text-brand-red shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-sm flex items-start gap-3 text-sm text-emerald-800 animate-fadeIn">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}



            {/* Actual Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-grey-700 mb-1.5">
                    Full Name <span className="text-grey-400 lowercase font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-grey-400">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alexander Weber"
                      className="w-full pl-10 pr-4 py-3 bg-grey-50 border border-grey-200 rounded-sm text-sm font-medium text-brand-black focus:bg-brand-white focus:border-brand-red focus:ring-0 outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-grey-700 mb-1.5">
                  Email Address <span className="text-brand-red">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-grey-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-grey-50 border border-grey-200 rounded-sm text-sm font-medium text-brand-black focus:bg-brand-white focus:border-brand-red focus:ring-0 outline-none transition-colors"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-grey-700 mb-1.5">
                    Phone Number <span className="text-grey-400 lowercase font-normal">(optional for SMS alerts)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-grey-400">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 bg-grey-50 border border-grey-200 rounded-sm text-sm font-medium text-brand-black focus:bg-brand-white focus:border-brand-red focus:ring-0 outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-grey-700">
                    Password <span className="text-brand-red">*</span>
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)}
                      className="text-xs font-medium text-brand-red hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-grey-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-grey-50 border border-grey-200 rounded-sm text-sm font-medium text-brand-black focus:bg-brand-white focus:border-brand-red focus:ring-0 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-grey-400 hover:text-brand-black"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password Strength Meter for Signup */}
                {mode === 'signup' && password.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 grid grid-cols-4 gap-1 h-1.5 bg-grey-200 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.score >= 1 ? strength.color : 'bg-transparent'}`}></div>
                      <div className={`h-full ${strength.score >= 2 ? strength.color : 'bg-transparent'}`}></div>
                      <div className={`h-full ${strength.score >= 3 ? strength.color : 'bg-transparent'}`}></div>
                      <div className={`h-full ${strength.score >= 4 ? strength.color : 'bg-transparent'}`}></div>
                    </div>
                    <span className="text-xs font-bold text-grey-600">{strength.label}</span>
                  </div>
                )}
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-grey-700 mb-1.5">
                    Confirm Password <span className="text-brand-red">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-grey-400">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-3 bg-grey-50 border border-grey-200 rounded-sm text-sm font-medium text-brand-black focus:bg-brand-white focus:border-brand-red focus:ring-0 outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-grey-400 hover:text-brand-black"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Checkboxes */}
              <div className="pt-2 space-y-2">
                {mode === 'signup' ? (
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-grey-600 leading-normal">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded border-grey-300 text-brand-red focus:ring-brand-red"
                    />
                    <span>
                      I agree to the <a href="#" className="underline text-brand-black font-semibold">Terms and Conditions</a> and <a href="#" className="underline text-brand-black font-semibold">Privacy Policy</a>.
                    </span>
                  </label>
                ) : (
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-grey-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-grey-300 text-brand-red focus:ring-brand-red"
                    />
                    <span>Remember this device for 30 days</span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-brand-red hover:bg-red-700 text-brand-white font-bold py-3.5 px-6 rounded-sm transition-colors flex items-center justify-center gap-2 text-base shadow-lg shadow-brand-red/20 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Footer switcher */}
            <div className="mt-8 text-center text-xs text-grey-600">
              {mode === 'signup' ? (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => { setMode('login'); setErrorMessage(null); setSuccessMessage(null); }}
                    className="text-brand-red font-bold hover:underline"
                  >
                    Sign in here
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account yet?{' '}
                  <button
                    onClick={() => { setMode('signup'); setErrorMessage(null); setSuccessMessage(null); }}
                    className="text-brand-red font-bold hover:underline"
                  >
                    Create free account
                  </button>
                </p>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer className="py-6 px-6 text-center text-xs text-grey-500 border-t border-grey-200">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} AudiWindowSticker.com. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-brand-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-black transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-black transition-colors">Security</a>
          </div>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-brand-white rounded-lg max-w-md w-full p-6 border border-grey-200 shadow-2xl relative animate-scaleIn">
            <div className="w-10 h-10 rounded-full bg-red-50 text-brand-red flex items-center justify-center mb-4">
              <KeyRound size={20} />
            </div>

            <h3 className="text-xl font-bold text-brand-black mb-2">Reset your password</h3>
            <p className="text-sm text-grey-600 mb-6">
              Enter your email address and we'll send you a link to reset your account password.
            </p>

            {forgotSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 text-sm mb-6 flex items-start gap-2">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Reset link dispatched</p>
                  <p className="text-xs text-emerald-700 mt-1">If an account exists for {forgotEmail}, you will receive reset instructions shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-grey-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-grey-50 border border-grey-200 rounded-sm text-sm font-medium text-brand-black focus:bg-brand-white focus:border-brand-red focus:ring-0 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-red text-white font-bold py-3 rounded-sm hover:bg-red-700 transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => { setForgotPasswordOpen(false); setForgotSent(false); }}
                className="text-xs font-bold text-grey-600 hover:text-brand-black px-4 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
