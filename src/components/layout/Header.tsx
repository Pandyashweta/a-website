import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavItem } from '../../types';

interface HeaderProps {
  navItems: NavItem[];
  isWhite?: boolean;
  onNavClick: (id: 'books' | 'gallery' | 'about' | 'faqs' | 'contact' | 'newsletter') => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ navItems, isWhite = false, onNavClick, onLogoClick }) => {
  const navTextColor = isWhite
    ? 'text-zinc-800 hover:text-black font-semibold'
    : 'text-[#AAAAAA] hover:text-white font-medium';

  const logoSrc = isWhite ? '/skxie-black.png' : '/skxie.png';

  const topGradient = isWhite
    ? 'from-white via-white/85 to-transparent'
    : 'from-[#0A0A0B] via-[#0A0A0B]/85 to-transparent';

  return (
    <>
      {/* GLOBAL TOP FADE-IN GRADIENT OVERLAY FOR HEADER & MOBILE READABILITY */}
      <div className={`fixed top-0 left-0 right-0 h-20 sm:h-24 md:h-28 bg-gradient-to-b ${topGradient} z-40 pointer-events-none transition-colors duration-300`} />

      <header className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 px-4 sm:px-5 md:px-6 flex items-center justify-between bg-transparent border-none pointer-events-none">
      {/* LEFT SIDE CORNER LOGO WITH SMOOTH ANIMATED LOGO SWITCHING */}
      <div className="flex items-center pointer-events-auto">
        <button
          onClick={onLogoClick}
          className="hover:opacity-80 active:scale-95 transition-all focus:outline-none cursor-pointer p-1"
          aria-label="Home"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={logoSrc}
              src={logoSrc}
              alt="skxie logo"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              width="160"
              height="40"
              className="h-7 sm:h-9 md:h-10 w-auto object-contain select-none filter drop-shadow-sm"
            />
          </AnimatePresence>
        </button>
      </div>

      {/* RIGHT SIDE CORNER NAV LINKS */}
      <div className="flex items-center justify-end pointer-events-auto">
        <nav className="flex items-center space-x-3 sm:space-x-6 md:space-x-10">
          {navItems.map((item) => {
            const isInternal =
              item.url === '#' ||
              item.id === 'books' ||
              item.id === 'gallery' ||
              item.id === 'about' ||
              item.id === 'faqs' ||
              item.id === 'contact' ||
              item.id === 'newsletter';

            if (isInternal) {
              return (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id as 'books' | 'about' | 'faqs' | 'contact' | 'newsletter')}
                  className={`text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.3em] transition-colors duration-300 whitespace-nowrap cursor-pointer focus:outline-none ${navTextColor}`}
                >
                  {item.label}
                </button>
              );
            }

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.3em] transition-colors duration-300 whitespace-nowrap cursor-pointer no-underline ${navTextColor}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  </>
);
};
