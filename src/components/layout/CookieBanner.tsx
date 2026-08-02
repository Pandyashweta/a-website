import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X } from 'lucide-react';

interface CookieBannerProps {
  onNavigateToPrivacy?: () => void;
  onNavigateToCookiePolicy?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onNavigateToPrivacy,
  onNavigateToCookiePolicy,
}) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('skxie_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('skxie_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('skxie_cookie_consent', 'essential_only');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-md w-full select-none"
        >
          <div className="bg-[#0C0C10]/95 border border-[#22222A] backdrop-blur-md p-5 rounded-2xl shadow-2xl space-y-4 relative">
            <button
              onClick={handleDecline}
              className="absolute top-3.5 right-3.5 text-zinc-500 hover:text-white transition-colors cursor-pointer p-1 focus:outline-none"
              aria-label="Dismiss cookie notice"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start space-x-3.5 pr-6">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white flex-shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                  Privacy & Cookie Notice
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  We use essential technical cookies to ensure website performance and security. No advertising or tracking cookies are used.
                </p>
              </div>
            </div>

            <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="flex items-center space-x-3 text-[10px] text-zinc-400">
                {onNavigateToPrivacy && (
                  <button
                    onClick={onNavigateToPrivacy}
                    className="hover:text-white transition-colors underline cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                )}
                {onNavigateToCookiePolicy && (
                  <button
                    onClick={onNavigateToCookiePolicy}
                    className="hover:text-white transition-colors underline cursor-pointer"
                  >
                    Cookie Policy
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleDecline}
                  className="w-full sm:w-auto px-3.5 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors rounded-lg bg-[#16161D] border border-[#2A2A36] font-medium cursor-pointer"
                >
                  Essential Only
                </button>
                <button
                  onClick={handleAccept}
                  className="w-full sm:w-auto px-4 py-1.5 text-xs text-black bg-white hover:bg-zinc-200 transition-colors rounded-lg font-semibold cursor-pointer shadow-sm"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
