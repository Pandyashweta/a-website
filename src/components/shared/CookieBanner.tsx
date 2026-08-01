import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface CookieBannerProps {
  onNavigateToPrivacy?: () => void;
}

const DetailedCookieIcon = () => (
  <svg
    className="w-5 h-5 text-amber-400"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21.5 12a9.5 9.5 0 1 1-17.58-4.78 4 4 0 0 0 5.86-3.8 4 4 0 0 0 4-4A9.5 9.5 0 0 1 21.5 12z" />
    <circle cx="8.5" cy="8.5" r="1.3" fill="#3D2100" />
    <circle cx="15" cy="13.5" r="1.3" fill="#3D2100" />
    <circle cx="10" cy="15.5" r="1.3" fill="#3D2100" />
    <circle cx="16" cy="8.5" r="1" fill="#3D2100" />
    <circle cx="6.5" cy="12.5" r="1" fill="#3D2100" />
  </svg>
);

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigateToPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('skxie_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 800);
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
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 right-6 sm:right-12 z-50 w-[calc(100%-3rem)] sm:w-80 p-5 bg-[#0D0D10]/95 backdrop-blur-xl border border-[#22222A] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-white select-none pointer-events-auto"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0">
                <DetailedCookieIcon />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                  Cookie Notice
                </h4>
                <span className="text-[10px] text-zinc-400 block font-light">Preferences & Consent</span>
              </div>
            </div>
            <button
              onClick={handleDecline}
              className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-md cursor-pointer -mr-1 -mt-1"
              aria-label="Close cookie notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[12px] text-zinc-400 font-light leading-relaxed mb-4">
            We use cookies to personalize content and analyze site traffic.{' '}
            {onNavigateToPrivacy && (
              <button
                onClick={onNavigateToPrivacy}
                className="text-zinc-200 underline hover:text-white transition-colors cursor-pointer font-normal"
              >
                Privacy Policy
              </button>
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="flex-1 py-2 px-3 bg-white text-black hover:bg-zinc-200 transition-colors rounded-lg text-xs font-medium cursor-pointer shadow-sm"
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
