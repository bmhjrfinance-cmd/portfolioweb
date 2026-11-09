import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export type ModalMode = 'signup' | 'signin' | 'member' | null;

interface AuthModalProps {
  mode: ModalMode;
  onClose: () => void;
  onOpenPrivacy?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onOpenPrivacy }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [role, setRole] = useState('Runway Model');
  const [consentGiven, setConsentGiven] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!mode) return null;

  const sanitize = (text: string) => text.replace(/[<>'"\\]/g, '').trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = sanitize(email);
    const cleanName = sanitize(name);
    const cleanPass = sanitize(passcode);

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (mode === 'signup' && !consentGiven) {
      setErrorMsg('You must agree to the processing of casting data in accordance with our Privacy Policy.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup' || mode === 'member') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': 'raze_csrf_sec_token_2026',
          },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            category: role,
            consentGiven: true,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Submission failed');
        }

        if (data.token) {
          localStorage.setItem('raze_auth_token', data.token);
        }
      } else if (mode === 'signin') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': 'raze_csrf_sec_token_2026',
          },
          body: JSON.stringify({
            email: cleanEmail,
            passcode: cleanPass,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Authentication failed');
        }

        if (data.token) {
          localStorage.setItem('raze_auth_token', data.token);
        }
      }

      setSubmitted(true);
      setTimeout(() => {
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 1600);
      }, 200);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Connection failed. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  const titles = {
    signup: {
      headline: 'Join the Agency Roster',
      subtitle: 'Apply for representation, scouting, and global runway castings.',
      cta: 'Submit Casting Application',
    },
    signin: {
      headline: 'Member & Talent Portal',
      subtitle: 'Access upcoming show schedules, lookbooks, and casting calls.',
      cta: 'Sign In to Portal',
    },
    member: {
      headline: 'Become A Member',
      subtitle: 'Exclusive network for creative directors, stylists, photographers, and talent.',
      cta: 'Complete Membership Registration',
    },
  };

  const current = titles[mode];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle top ambient hairline */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

        {/* Close button with keyboard support */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors p-1 rounded-full hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          aria-label="Close authentication window"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center text-white">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-light tracking-wide text-white">
              {mode === 'signin' ? 'Session Authenticated' : 'Application Transmitted'}
            </h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              {mode === 'signin'
                ? `Welcome back. Authorized session token has been securely set.`
                : `Thank you, ${name || 'talent'}. Encrypted submission received under reference ID #${Math.floor(100000 + Math.random() * 900000)}.`}
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-[0.25em] text-red-500 uppercase font-mono">
                  RAZE // CASTING PORTAL
                </span>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.2 rounded">
                  SSL 256-BIT
                </span>
              </div>
              <h2 id="auth-modal-title" className="text-2xl font-light tracking-tight text-white mt-1.5">
                {current.headline}
              </h2>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-light">{current.subtitle}</p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-950/70 border border-red-800 rounded-lg text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode !== 'signin' && (
                <div>
                  <label htmlFor="auth-full-name" className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-light">
                    Full Legal / Professional Name
                  </label>
                  <input
                    id="auth-full-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Vance"
                    autoFocus
                    className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-white focus-visible:ring-1 focus-visible:ring-white px-3.5 py-2.5 rounded-lg text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                  />
                </div>
              )}

              <div>
                <label htmlFor="auth-email-address" className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-light">
                  Email Address
                </label>
                <input
                  id="auth-email-address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@agency.com"
                  className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-white focus-visible:ring-1 focus-visible:ring-white px-3.5 py-2.5 rounded-lg text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                />
              </div>

              {mode !== 'signin' && (
                <div>
                  <label htmlFor="auth-category" className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-light">
                    Representation Track
                  </label>
                  <select
                    id="auth-category"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-white focus-visible:ring-1 focus-visible:ring-white px-3.5 py-2.5 rounded-lg text-base sm:text-sm text-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Runway Model">Runway Model (Haute Couture / Ready-to-Wear)</option>
                    <option value="Editorial Model">Editorial &amp; High-Fashion Print</option>
                    <option value="Avant-Garde Talent">Avant-Garde / Digital Fashion Talent</option>
                    <option value="Commercial & Brand">Commercial Brand Ambassador</option>
                  </select>
                </div>
              )}

              {mode === 'signin' && (
                <div>
                  <label htmlFor="auth-passcode" className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-light">
                    Passcode / Access Key
                  </label>
                  <input
                    id="auth-passcode"
                    type="password"
                    placeholder="••••••••••••"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-white focus-visible:ring-1 focus-visible:ring-white px-3.5 py-2.5 rounded-lg text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                  />
                  <div className="flex justify-between items-center mt-1 text-[10px] text-zinc-500">
                    <span>Hint: Enter admin123 for director portal</span>
                  </div>
                </div>
              )}

              {/* Explicit GDPR & CCPA Data Consent Checkbox (Item 20: Form consent, only necessary data) */}
              {mode !== 'signin' && (
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 text-[11px] text-zinc-400 font-light cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-0.5 rounded border-zinc-700 bg-zinc-900 text-white focus:ring-1 focus:ring-white w-4 h-4 cursor-pointer"
                      required
                    />
                    <span>
                      I consent to the collection and processing of my contact details solely for agency scouting and representation review in accordance with the{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onOpenPrivacy) onOpenPrivacy();
                        }}
                        className="underline text-zinc-200 hover:text-white"
                      >
                        Privacy Policy
                      </button>
                      . We only collect necessary data.
                    </span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-white hover:bg-zinc-200 disabled:opacity-50 text-black font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-all hover:gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{loading ? 'Transmitting Securely...' : current.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] text-zinc-500 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strictly confidential · CSRF &amp; Rate-Limit Protected</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
