import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Check, SlidersHorizontal } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieBannerProps {
  onOpenPolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true and locked
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('raze_cookie_consent_v1');
    if (!saved) {
      // Delay presentation slightly for non-intrusive loading
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (accepted: CookiePreferences) => {
    localStorage.setItem(
      'raze_cookie_consent_v1',
      JSON.stringify({
        ...accepted,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      role="region"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 text-white rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-fadeIn"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4 text-white" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Privacy &amp; Cookie Consent
            </h4>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded">
              GDPR / CCPA
            </span>
          </div>

          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            We use strictly necessary cookies to keep our platform secure. With your permission, we also use privacy-first telemetry to refine runway and spatial experiences.
          </p>

          {showPreferences ? (
            <div className="space-y-3 pt-3 border-t border-zinc-800 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-white block">Strictly Necessary</span>
                  <span className="text-[10px] text-zinc-500">Security, CSRF &amp; Session Auth</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Required</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-white block">Performance &amp; Analytics</span>
                  <span className="text-[10px] text-zinc-500">Anonymous rendering frame rates</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="rounded border-zinc-700 bg-zinc-900 text-white focus:ring-1 focus:ring-white w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-white block">Personalization</span>
                  <span className="text-[10px] text-zinc-500">Preferred portfolio track</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="rounded border-zinc-700 bg-zinc-900 text-white focus:ring-1 focus:ring-white w-4 h-4 cursor-pointer"
                />
              </div>

              <button
                onClick={handleSavePreferences}
                className="w-full mt-2 py-2 bg-white text-black text-xs font-medium uppercase tracking-wider rounded-lg hover:bg-zinc-200 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2 px-3 bg-white text-black text-xs font-medium rounded-lg hover:bg-zinc-200 transition-colors tracking-wide"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectAll}
                className="py-2 px-3 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white text-xs font-medium rounded-lg transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="p-2 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white rounded-lg transition-colors"
                title="Customize preferences"
                aria-label="Customize cookie preferences"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="pt-1 text-[11px] text-zinc-500">
            Read our{' '}
            <button
              onClick={onOpenPolicy}
              className="underline hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Cookies &amp; Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
