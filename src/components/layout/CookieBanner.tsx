import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';

interface CookieBannerProps {
  isWhite?: boolean;
  onNavigateToPrivacy?: () => void;
  onNavigateToCookiePolicy?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  isWhite = true,
  onNavigateToPrivacy,
  onNavigateToCookiePolicy,
}) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('arave_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('arave_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('arave_cookie_consent', 'essential_only');
    setShowBanner(false);
  };

  const pillContainer = isWhite
    ? 'bg-white/92 border-zinc-200/90 text-zinc-900 shadow-[0_14px_35px_-10px_rgba(0,0,0,0.15)]'
    : 'bg-[#121218]/92 border-[#262632] text-white shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85)]';

  const bodyText = isWhite ? 'text-zinc-600' : 'text-zinc-400';
  const iconColor = isWhite ? 'text-zinc-800' : 'text-zinc-300';
  const linkColor = isWhite ? 'text-zinc-500 hover:text-black' : 'text-zinc-400 hover:text-white';
  const closeColor = isWhite ? 'text-zinc-400 hover:text-black' : 'text-zinc-500 hover:text-white';

  const secondaryBtnStyle = isWhite
    ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200/80'
    : 'bg-[#181822] hover:bg-[#20202E] text-zinc-300 border border-[#2D2D3C]';

  const primaryBtnStyle = isWhite
    ? 'bg-black text-white hover:bg-zinc-800 shadow-sm'
    : 'bg-white text-black hover:bg-zinc-200 shadow-sm';

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.96 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-21 sm:bottom-22 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto max-w-2xl select-none pointer-events-auto"
        >
          <div className={`p-3 sm:px-5 sm:py-2.5 rounded-2xl sm:rounded-full border backdrop-blur-xl transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5 ${pillContainer}`}>
            {/* Left: Icon, brief copy & policy link */}
            <div className="flex items-center space-x-2.5 text-center sm:text-left">
              <Cookie className={`w-3.5 h-3.5 flex-shrink-0 ${iconColor}`} />
              <p className={`text-[11px] sm:text-xs font-light leading-snug whitespace-normal sm:whitespace-nowrap ${bodyText}`}>
                We use essential cookies for site security and performance.
              </p>
              {onNavigateToPrivacy && (
                <button
                  type="button"
                  onClick={onNavigateToPrivacy}
                  className={`hidden md:inline text-[10px] uppercase tracking-wider underline cursor-pointer focus:outline-none transition-colors ${linkColor}`}
                >
                  Privacy
                </button>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end flex-shrink-0">
              <button
                type="button"
                onClick={handleDecline}
                className={`px-3 py-1 text-[10px] sm:text-[11px] font-medium rounded-full transition-all duration-200 cursor-pointer active:scale-95 ${secondaryBtnStyle}`}
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className={`px-3.5 py-1 text-[10px] sm:text-[11px] font-semibold rounded-full transition-all duration-200 cursor-pointer active:scale-95 ${primaryBtnStyle}`}
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className={`p-1 rounded-full transition-colors cursor-pointer focus:outline-none ml-0.5 ${closeColor}`}
                aria-label="Dismiss cookie notice"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
