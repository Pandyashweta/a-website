import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';

interface CookieBannerProps {
  onNavigateToPrivacy?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigateToPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('skxie_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(
      'skxie_cookie_consent',
      JSON.stringify({ consent: 'accepted', timestamp: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(
      'skxie_cookie_consent',
      JSON.stringify({ consent: 'essential_only', timestamp: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm p-5 bg-[#0D0D10]/95 backdrop-blur-xl border border-[#22222A] rounded-2xl shadow-2xl text-white select-none"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Cookie className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                Cookie Preferences
              </h4>
            </div>
            <button
              onClick={handleDecline}
              className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-md cursor-pointer"
              aria-label="Close cookie consent"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[12px] text-zinc-400 font-light leading-relaxed mb-4">
            We use essential cookies to ensure site functionality and improve your experience.{' '}
            {onNavigateToPrivacy && (
              <button
                onClick={onNavigateToPrivacy}
                className="text-zinc-200 underline hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="flex-1 py-2 px-3 bg-white text-black hover:bg-zinc-200 transition-colors rounded-lg text-xs font-medium cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="py-2 px-3 bg-[#18181D] hover:bg-[#22222A] border border-[#2B2B34] text-zinc-300 hover:text-white transition-colors rounded-lg text-xs font-medium cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
