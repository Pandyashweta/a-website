import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PrivacyPage } from './PrivacyPage';
import { TermsPage } from './TermsPage';
import { CookiePolicyPage } from './CookiePolicyPage';

interface LegalPageProps {
  isVisible: boolean;
  isWhite?: boolean;
  initialTab?: 'privacy' | 'terms' | 'cookies';
}

export const LegalPage: React.FC<LegalPageProps> = ({ isVisible, isWhite = false, initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies'>(initialTab);

  const tabs: Array<{ id: 'privacy' | 'terms' | 'cookies'; label: string }> = [
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'cookies', label: 'Cookie Policy' },
  ];

  if (!isVisible) return null;

  const topGradient = isWhite
    ? 'from-white via-white/90 to-transparent'
    : 'from-[#0A0A0B] via-[#0A0A0B]/95 to-transparent';

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const tabContainerBg = isWhite
    ? 'bg-zinc-100 border-zinc-300'
    : 'bg-[#0C0C10] border-[#22222A]';

  return (
    <>
      {/* Dynamic Top Gradient Fade */}
      <div className={`fixed top-0 left-0 right-0 h-24 sm:h-28 bg-gradient-to-b ${topGradient} z-40 pointer-events-none transition-colors duration-300`} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-5xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col justify-start relative z-10 select-none space-y-6"
      >
        {/* HEADER TITLE & RESPONSIVE TAB SWITCHER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
          <div>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-light font-serif-italic transition-colors duration-300 ${titleColor}`}>
              Legal Center
            </h1>
          </div>

          {/* Responsive Animated Segment Switcher */}
          <div className={`inline-flex items-center p-1 border rounded-xl self-start sm:self-auto shadow-inner flex-wrap max-w-full transition-colors duration-300 ${tabContainerBg}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-2.5 sm:px-4 py-1.5 text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.15em] font-semibold transition-colors duration-300 cursor-pointer focus:outline-none ${
                  activeTab === tab.id
                    ? 'text-black'
                    : isWhite ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeLegalTab"
                    className="absolute inset-0 bg-white rounded-lg shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE TAB CONTENT */}
        <div className="pt-2">
          {activeTab === 'privacy' && <PrivacyPage isVisible={true} isEmbedded={true} isWhite={isWhite} />}
          {activeTab === 'terms' && <TermsPage isVisible={true} isEmbedded={true} isWhite={isWhite} />}
          {activeTab === 'cookies' && <CookiePolicyPage isVisible={true} isEmbedded={true} isWhite={isWhite} />}
        </div>
      </motion.div>
    </>
  );
};
