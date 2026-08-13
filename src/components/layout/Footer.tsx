import React from 'react';
import { motion } from 'motion/react';
import { SocialItem } from '../../types';
import { SolidIcon } from './SocialIcons';
import { Moon, Sun } from 'lucide-react';

interface FooterProps {
  skxieSocials: SocialItem[];
  bgMode?: 'black' | 'white';
  onBgModeChange?: (mode: 'black' | 'white') => void;
  onLegalClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onCookieClick?: () => void;
  onFaqsClick?: () => void;
  onNewsletterClick?: () => void;
  onContactClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  skxieSocials,
  bgMode = 'white',
  onBgModeChange,
  onLegalClick,
  onPrivacyClick,
  onTermsClick,
  onCookieClick,
  onNewsletterClick,
  onContactClick
}) => {
  const handleLegal = onLegalClick || onPrivacyClick || onTermsClick || onCookieClick;
  const isWhite = bgMode === 'white';

  // Filter out Discord from visible footer socials (Amazon and Goodreads are visible)
  const hiddenKeys = ['discord'];
  const visibleSocials = skxieSocials.filter(
    (social) =>
      !hiddenKeys.includes(social.icon.toLowerCase()) &&
      !hiddenKeys.includes(social.name.toLowerCase())
  );

  const footerGradient = isWhite
    ? 'bg-gradient-to-t from-white via-white/95 to-transparent'
    : 'bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/95 to-transparent';

  const textColor = isWhite ? 'text-zinc-800 hover:text-black' : 'text-[#CCCCCC] hover:text-white';
  const copyrightColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';

  // Capsule container background matching reference image
  const pillBg = isWhite
    ? 'bg-[#F2F2F4] border border-zinc-300/80 shadow-sm'
    : 'bg-[#16161B] border border-[#2B2B36] shadow-md';

  // Toggle between White and Black display modes
  const handlePillClick = () => {
    if (!onBgModeChange) return;
    onBgModeChange(bgMode === 'white' ? 'black' : 'white');
  };

  return (
    <footer className={`fixed bottom-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-5 md:px-6 pt-2.5 pb-3.5 sm:py-0 h-auto sm:h-20 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-0 transition-colors duration-300 ${footerGradient}`}>
      {/* ========================================================
          MOBILE VIEWPORT ONLY (< sm)
          ======================================================== */}
      {/* MOBILE ROW 1: BRAND COLORED SOCIALS (LEFT) & THEME TOGGLE (FAR RIGHT CORNER) */}
      <div className="w-full flex sm:hidden flex-row items-center justify-between pointer-events-auto z-10">
        {/* Brand Colored Social Icons */}
        <div className="flex flex-row items-center space-x-2.5 flex-nowrap">
          {visibleSocials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              title={`${social.name} (skxie)`}
              className="group relative p-1 transition-transform duration-200 hover:scale-125 focus:outline-none cursor-pointer flex-shrink-0"
            >
              <SolidIcon
                type={social.icon}
                useBrandColors={true}
                isWhite={isWhite}
                className="w-4 h-4 transition-all duration-200"
              />
            </a>
          ))}
        </div>

        {/* MOBILE THEME TOGGLE PILL AT FAR RIGHT (BLACK / WHITE 2-MODE) */}
        {onBgModeChange && (
          <div
            onClick={handlePillClick}
            className={`relative flex items-center p-0.5 rounded-full cursor-pointer select-none transition-all duration-300 ${pillBg}`}
            title="Click to toggle display mode (White <-> Black)"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBgModeChange('white');
              }}
              title="White Display Mode"
              className="relative z-10 p-1 rounded-full flex items-center justify-center cursor-pointer"
            >
              {bgMode === 'white' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 bg-black rounded-full shadow-md z-[-1]"
                />
              )}
              <Sun className={`w-3.5 h-3.5 ${bgMode === 'white' ? 'text-white' : isWhite ? 'text-zinc-600' : 'text-zinc-400'}`} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBgModeChange('black');
              }}
              title="Black Display Mode"
              className="relative z-10 p-1 rounded-full flex items-center justify-center cursor-pointer"
            >
              {bgMode === 'black' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 bg-white rounded-full shadow-md z-[-1]"
                />
              )}
              <Moon className={`w-3.5 h-3.5 ${bgMode === 'black' ? 'text-black' : isWhite ? 'text-zinc-600' : 'text-zinc-400'}`} />
            </button>
          </div>
        )}
      </div>

      {/* MOBILE ROW 2: LEGAL & CONTACT (LEFT) & COPYRIGHT (RIGHT) */}
      <div className="w-full flex sm:hidden flex-row items-center justify-between pointer-events-auto z-10 text-[9px]">
        <div className="flex items-center space-x-2">
          {handleLegal && (
            <button
              onClick={handleLegal}
              className={`uppercase tracking-[0.15em] font-semibold transition-colors focus:outline-none ${textColor}`}
            >
              Legal
            </button>
          )}
          {handleLegal && onContactClick && (
            <span className="text-zinc-400 select-none">|</span>
          )}
          {onContactClick && (
            <button
              onClick={onContactClick}
              className={`uppercase tracking-[0.15em] font-semibold transition-colors focus:outline-none ${textColor}`}
            >
              Contact
            </button>
          )}
          {onNewsletterClick && (
            <>
              <span className="text-zinc-400 select-none">|</span>
              <button
                onClick={onNewsletterClick}
                className={`uppercase tracking-[0.15em] font-semibold transition-colors focus:outline-none ${textColor}`}
              >
                Newsletter
              </button>
            </>
          )}
        </div>

        <div className={`tracking-wider font-medium select-none whitespace-nowrap ${copyrightColor}`}>
          &copy; {new Date().getFullYear()} skxie. All Rights Reserved.
        </div>
      </div>

      {/* ========================================================
          DESKTOP VIEWPORT ONLY (sm:flex >= 640px)
          ======================================================== */}
      {/* DESKTOP LEFT: BRAND COLORED SOCIAL LOGOS */}
      <div className="hidden sm:flex flex-row items-center space-x-4 md:space-x-6 pointer-events-auto z-10">
        {visibleSocials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={`${social.name} (skxie)`}
            className="group relative p-1 transition-transform duration-200 hover:scale-125 focus:outline-none cursor-pointer flex-shrink-0"
          >
            <SolidIcon
              type={social.icon}
              useBrandColors={true}
              isWhite={isWhite}
              className="w-5 h-5 transition-all duration-200"
            />
          </a>
        ))}
      </div>

      {/* DESKTOP CENTER: COPYRIGHT NOTICE */}
      <div className={`pointer-events-auto text-[10px] md:text-[11px] tracking-wider font-medium select-none whitespace-nowrap hidden sm:block absolute left-1/2 -translate-x-1/2 z-0 ${copyrightColor}`}>
        &copy; {new Date().getFullYear()} skxie. All Rights Reserved.
      </div>

      {/* DESKTOP RIGHT: LEGAL & CONTACT LINKS FIRST, TOGGLE CAPSULE LAST IN CORNER */}
      <div className="hidden sm:flex items-center space-x-3 md:space-x-4 pointer-events-auto z-10">
        {/* LEGAL & CONTACT LINKS */}
        <div className="flex items-center space-x-3">
          {handleLegal && (
            <button
              onClick={handleLegal}
              className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 cursor-pointer focus:outline-none ${textColor}`}
            >
              Legal
            </button>
          )}
          {handleLegal && onContactClick && (
            <span className="text-zinc-400 text-[10px] md:text-[11px] select-none">|</span>
          )}
          {onContactClick && (
            <button
              onClick={onContactClick}
              className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 cursor-pointer focus:outline-none ${textColor}`}
            >
              Contact
            </button>
          )}
          {onNewsletterClick && (
            <>
              <span className="text-zinc-400 text-[10px] md:text-[11px] select-none">|</span>
              <button
                onClick={onNewsletterClick}
                className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 cursor-pointer focus:outline-none ${textColor}`}
              >
                Newsletter
              </button>
            </>
          )}
        </div>

        {/* SINGLE CAPSULE TOGGLE BUTTON (LAST IN CORNER) */}
        {onBgModeChange && (
          <div
            onClick={handlePillClick}
            className={`relative flex items-center p-0.5 rounded-full cursor-pointer select-none transition-all duration-300 ${pillBg}`}
            title="Click to toggle display mode (White <-> Black)"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBgModeChange('white');
              }}
              title="White Display Mode"
              className="relative z-10 p-1.5 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none flex items-center justify-center"
            >
              {bgMode === 'white' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 bg-black rounded-full shadow-md z-[-1]"
                />
              )}
              <Sun
                className={`w-3.5 h-3.5 transition-colors duration-200 ${
                  bgMode === 'white' ? 'text-white' : isWhite ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBgModeChange('black');
              }}
              title="Black Display Mode"
              className="relative z-10 p-1.5 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none flex items-center justify-center"
            >
              {bgMode === 'black' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 bg-white rounded-full shadow-md z-[-1]"
                />
              )}
              <Moon
                className={`w-3.5 h-3.5 transition-colors duration-200 ${
                  bgMode === 'black' ? 'text-black' : isWhite ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};
